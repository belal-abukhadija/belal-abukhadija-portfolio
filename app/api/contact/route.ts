import { NextResponse } from "next/server";
import { Resend } from "resend";

const LIMITS = { chore: 60, name: 80, email: 200, details: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The message could not be read." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Answer as if it sent.
  if (field(body.website, 200)) {
    return NextResponse.json({ ok: true });
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

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.");
    return NextResponse.json({ error: "Email delivery is not set up yet." }, { status: 503 });
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `A chore worth deleting: ${chore}`,
    text: [`Chore: ${chore}`, `From: ${name} <${email}>`, "", details || "(No further details.)"].join("\n"),
  });

  if (error) {
    console.error("Contact form: Resend rejected the message.", error);
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
