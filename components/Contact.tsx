"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { personalInfo } from "@/lib/projects-data";
import Strike from "./Strike";

type Status = "idle" | "sending" | "sent" | "failed";

const fieldClass =
  "w-full bg-transparent border-b-2 border-paper py-2 text-xl outline-none placeholder:text-paper/45 focus-visible:border-mark disabled:opacity-60";

export default function Contact() {
  const [chore, setChore] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");
  // Whether the automatic confirmation email to the visitor went out too.
  const [confirmed, setConfirmed] = useState(true);
  const outcome = useRef<HTMLDivElement>(null);
  const trimmed = chore.trim();
  const sending = status === "sending";

  // Move focus to the result, so keyboard and screen reader users land on it
  // instead of being left on a button that no longer exists.
  useEffect(() => {
    if (status === "sent" || status === "failed") outcome.current?.focus();
  }, [status]);

  const links = [
    { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: "WhatsApp", value: personalInfo.whatsappDisplay, href: `https://wa.me/${personalInfo.whatsapp}` },
    { label: "LinkedIn", value: "belal-abu-khadija", href: personalInfo.linkedin },
    { label: "GitHub", value: "belal-abukhadija", href: personalInfo.github },
    { label: "Instagram", value: personalInfo.instagram, href: `https://instagram.com/${personalInfo.instagram}` },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setStatus("sending");
    setProblem("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chore: trimmed, name, email, details, website }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error ?? "Something went wrong on the way.");
      setConfirmed(data?.confirmation !== false);
      setStatus("sent");
    } catch (error) {
      // fetch itself throws a TypeError when the network is down.
      setProblem(
        error instanceof TypeError
          ? "The connection dropped before it could be sent."
          : error instanceof Error
            ? error.message
            : "Something went wrong on the way."
      );
      setStatus("failed");
    }
  };

  const sendAnother = () => {
    setChore("");
    setDetails("");
    setStatus("idle");
  };

  return (
    <section id="contact" className="on-ink gutter bg-ink text-paper pt-24 md:pt-36 pb-16">
      <h2 className="display size-title mb-4 max-w-[14ch]">What should I cross out next?</h2>
      <p className="text-lg md:text-xl max-w-[46ch] mb-12">
        Tell me the task you&apos;d happily never do again. I&apos;m open to roles
        and freelance work, remote worldwide, and usually reply within an hour.
      </p>

      {status === "sent" ? (
        <div ref={outcome} tabIndex={-1} role="status" className="mb-24 md:mb-32 outline-none">
          <p className="label mb-3">Message sent</p>
          {/* One Strike per word, so a long chore can wrap. The page line's pen
              comes back and crosses these out (PageLine.tsx). */}
          <p dir="auto" className="display-light size-title mb-8 flex flex-wrap gap-x-[0.24em]">
            {trimmed.split(/\s+/).map((word, i) => (
              <Strike key={i}>{word}</Strike>
            ))}
          </p>
          <h3 className="display text-4xl md:text-5xl mb-6 max-w-[18ch]">
            Got it, {name.trim()}. It&apos;s on my list.
          </h3>
          <div className="text-lg md:text-xl space-y-3 max-w-[52ch] mb-10">
            <p>Your message is in my inbox.</p>
            {confirmed ? (
              <p>
                A confirmation is on its way to <strong className="font-bold">{email.trim()}</strong>. If
                it hasn&apos;t arrived in a few minutes, check your spam folder.
              </p>
            ) : (
              <p>
                I couldn&apos;t send a confirmation to <strong className="font-bold">{email.trim()}</strong>,
                so double-check that address. Your message itself did arrive.
              </p>
            )}
            <p>I&apos;ll reply to you myself, usually within an hour.</p>
          </div>
          <button type="button" className="btn" onClick={sendAnother}>
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-24 md:mb-32" aria-busy={sending}>
          <label htmlFor="chore" className="label block mb-1">
            The chore
          </label>
          {/* A field sized for typing in, a step larger than the others because
              it is the main one. It always stops short of the right edge: the
              page line's pen draws its arrow in that space, pointing at the
              field (PageLine.tsx measures #chore) but never over it.
              dir="auto" lets right-to-left text such as Arabic align itself. */}
          <input
            id="chore"
            type="text"
            dir="auto"
            required
            maxLength={60}
            autoComplete="off"
            disabled={sending}
            value={chore}
            onChange={(e) => setChore(e.target.value)}
            placeholder="Type it here"
            className={`${fieldClass} max-w-[min(56rem,calc(100%-4.75rem))] text-[clamp(1.5rem,2.4vw,2rem)] font-medium`}
          />

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-10 max-w-4xl">
            <div>
              <label htmlFor="name" className="label block mb-1">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={80}
                autoComplete="name"
                disabled={sending}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="label block mb-1">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                disabled={sending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
              <p className="mt-2 text-paper/75">I&apos;ll reply here, and send a confirmation straight away.</p>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="details" className="label block mb-1">
                Anything else I should know (optional)
              </label>
              <textarea
                id="details"
                rows={3}
                maxLength={4000}
                disabled={sending}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`${fieldClass} resize-y`}
              />
            </div>
            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {status === "failed" && (
            <div
              ref={outcome}
              tabIndex={-1}
              role="alert"
              className="mt-10 max-w-2xl border-2 border-mark p-5 outline-none"
            >
              <p className="text-xl font-bold mb-1">Your message was not sent.</p>
              <p>
                {problem} Nothing you typed is lost: press the button to try again, or email{" "}
                <a href={`mailto:${personalInfo.email}`} className="link font-bold">
                  {personalInfo.email}
                </a>{" "}
                directly.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
            <button type="submit" className="btn" disabled={sending}>
              {sending && <span className="spinner mr-3" aria-hidden="true" />}
              {sending ? "Sending" : status === "failed" ? "Try sending again" : "Send it to Belal"}
            </button>
            {/* Always in the page so screen readers announce it when it fills */}
            <p aria-live="polite" className="font-medium">
              {sending ? "Sending your message to Belal. This takes a few seconds." : ""}
            </p>
          </div>
        </form>
      )}

      <ul className="flex flex-wrap gap-x-14 gap-y-8">
        {links.map((link) => (
          <li key={link.label}>
            <p className="label mb-1">{link.label}</p>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-lg font-medium"
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
