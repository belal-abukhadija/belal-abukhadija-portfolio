import { NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmationEmail } from "@/lib/contact-emails";
import { personalInfo } from "@/lib/projects-data";

const LIMITS = { chore: 60, name: 80, email: 200, details: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The form sends an automatic reply to whatever address is typed in, so it
// could be used to send mail to strangers. This caps how many messages one
// visitor can send. It lives in memory, so it resets on restart and is per
// server instance: a brake on casual abuse, not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function allowed(who: string) {
  const now = Date.now();
  const times = (recent.get(who) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) {
    recent.set(who, times);
    return false;
  }
  times.push(now);
  recent.set(who, times);
  // Keep the map from growing without bound.
  if (recent.size > 5000) recent.clear();
  return true;
}

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The form data arrived damaged." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Answer as if it sent.
  if (field(body.website, 200)) {
    return NextResponse.json({ ok: true, confirmation: false });
  }

  const chore = field(body.chore, LIMITS.chore);
  const name = field(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const details = field(body.details, LIMITS.details);

  if (!chore || !name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Add the chore, your name, and a valid email address." },
      { status: 400 }
    );
  }

  const who = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allowed(who)) {
    return NextResponse.json(
      { error: "That's a lot of messages in a short time. Wait a few minutes before sending another." },
      { status: 429 }
    );
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.");
    return NextResponse.json({ error: "Email delivery is not set up on this site yet." }, { status: 503 });
  }

  const resend = new Resend(RESEND_API_KEY);
  // A bare address shows up in inboxes as just "contact". Give it a name.
  const from = CONTACT_FROM_EMAIL.includes("<")
    ? CONTACT_FROM_EMAIL
    : `${personalInfo.name} <${CONTACT_FROM_EMAIL}>`;

  // The message to the site owner. This is the one that has to arrive.
  const { error } = await resend.emails.send({
    from,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `A chore worth deleting: ${chore}`,
    text: [`Chore: ${chore}`, `From: ${name} <${email}>`, "", details || "(No further details.)"].join("\n"),
  });

  if (error) {
    console.error("Contact form: Resend rejected the message.", error);
    return NextResponse.json({ error: "The mail service turned it down." }, { status: 502 });
  }

  // The automatic reply to the visitor. Their message is already delivered,
  // so a failure here is reported to the form rather than treated as an error.
  // It echoes only their name and the short chore line, never the free-text
  // details, to limit what a misused form could put in a stranger's inbox.
  const reply = confirmationEmail({
    name,
    chore,
    owner: {
      name: personalInfo.name,
      role: personalInfo.headline,
      location: personalInfo.location,
      domain: personalInfo.domain,
      linkedin: personalInfo.linkedin,
      github: personalInfo.github,
      whatsapp: personalInfo.whatsapp,
    },
  });
  let confirmation = true;
  try {
    const sent = await resend.emails.send({
      from,
      to: email,
      // Replies to the confirmation go to the owner's real inbox.
      replyTo: CONTACT_TO_EMAIL,
      subject: reply.subject,
      text: reply.text,
      html: reply.html,
    });
    if (sent.error) {
      confirmation = false;
      console.error("Contact form: the confirmation email was rejected.", sent.error);
    }
  } catch (err) {
    confirmation = false;
    console.error("Contact form: the confirmation email failed.", err);
  }

  return NextResponse.json({ ok: true, confirmation });
}
