"use client";

import { useState, type FormEvent } from "react";
import { personalInfo } from "@/lib/projects-data";

type Status = "idle" | "sending" | "sent" | "failed";

// What the pen writes in the empty chore field as it passes (see PageLine.tsx).
const PEN_WRITES = "I want to build a personal website";

const fieldClass =
  "w-full bg-transparent border-b-2 border-paper py-2 text-xl outline-none placeholder:text-paper/45 focus-visible:border-mark";

export default function Contact() {
  const [chore, setChore] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");
  // The pen's example sentence owns the empty field until it has been written
  // and cleared (PageLine.tsx), or until the visitor steps in first.
  const [penOff, setPenOff] = useState(false);
  const trimmed = chore.trim();

  const links = [
    { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: "WhatsApp", value: personalInfo.whatsappDisplay, href: `https://wa.me/${personalInfo.whatsapp}` },
    { label: "LinkedIn", value: "belal-abu-khadija", href: personalInfo.linkedin },
    { label: "GitHub", value: "belal-abukhadija", href: personalInfo.github },
    { label: "Instagram", value: personalInfo.instagram, href: `https://instagram.com/${personalInfo.instagram}` },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setProblem("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chore: trimmed, name, email, details, website }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "The message could not be sent.");
      }
      setStatus("sent");
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "The message could not be sent.");
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="on-ink gutter bg-ink text-paper pt-24 md:pt-36 pb-16">
      <h2 className="display size-title mb-4 max-w-[14ch]">What should I cross out next?</h2>
      <p className="text-lg md:text-xl max-w-[46ch] mb-12">
        Tell me the task you&apos;d happily never do again. I&apos;m open to roles
        and freelance work, remote worldwide, and usually reply within an hour.
      </p>

      {status === "sent" ? (
        <div className="mb-24 md:mb-32" role="status">
          <p className="display-light size-chore mb-6 break-words">{trimmed}</p>
          <p className="text-xl md:text-2xl font-medium max-w-[40ch]">
            Sent. Thanks, {name.trim()}. I&apos;ll reply to {email.trim()}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-24 md:mb-32">
          <label htmlFor="chore" className="label block mb-3">
            The chore
          </label>
          {/* While the field is empty, the page line's pen writes an example in
              it: PageLine uncovers this sentence left to right, then clears it.
              It is decoration only; the real field is the input on top. */}
          {/* `pen-writing` keeps "Type it here" hidden. PageLine removes the
              class once its sentence has gone, so the placeholder only
              appears afterwards. */}
          <div className={`relative display-light size-chore pb-3 ${penOff ? "" : "pen-writing"}`}>
            {!chore && !penOff && (
              <span
                data-pen-write
                aria-hidden="true"
                className="absolute left-0 bottom-3 whitespace-nowrap pointer-events-none transition-opacity duration-700 [clip-path:inset(0_100%_0_0)]"
              >
                {PEN_WRITES}
              </span>
            )}
            <input
              id="chore"
              type="text"
              required
              maxLength={60}
              autoComplete="off"
              value={chore}
              onChange={(e) => setChore(e.target.value)}
              onFocus={() => setPenOff(true)}
              placeholder="Type it here"
              className="relative w-full bg-transparent outline-none placeholder:text-paper/45 [font:inherit] [letter-spacing:inherit]"
            />
          </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="details" className="label block mb-1">
                Anything else I should know (optional)
              </label>
              <textarea
                id="details"
                rows={3}
                maxLength={4000}
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
            <button type="submit" className="btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Send it to Belal"}
            </button>
            {status === "failed" && (
              <p role="alert" className="font-medium max-w-[52ch]">
                {problem} Try again, or email{" "}
                <a href={`mailto:${personalInfo.email}`} className="link">
                  {personalInfo.email}
                </a>{" "}
                directly.
              </p>
            )}
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
