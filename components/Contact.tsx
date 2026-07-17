"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import SectionBand from "./SectionBand";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const meta = [
    { icon: Mail, label: "Email", value: personalInfo.email },
    { icon: Globe2, label: "Collaboration", value: "Remote worldwide" },
    { icon: Clock3, label: "Typical response", value: "Within 1 hour" },
  ];

  const socials = [
    { href: `mailto:${personalInfo.email}`, label: "Email", value: personalInfo.email },
    { href: personalInfo.linkedin, label: "LinkedIn", value: "linkedin.com/in/belal-abu-khadija" },
    { href: personalInfo.github, label: "GitHub", value: "github.com/belal-abukhadija" },
    { href: `https://wa.me/${personalInfo.whatsapp}`, label: "WhatsApp", value: personalInfo.whatsappDisplay },
  ];

  const iconSocials = [
    { href: personalInfo.github, icon: Github, label: "GitHub" },
    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `https://wa.me/${personalInfo.whatsapp}`, icon: WhatsAppIcon, label: "WhatsApp" },
    { href: `https://instagram.com/${personalInfo.instagram}`, icon: Instagram, label: "Instagram" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "your website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand index="05" meta="OPEN TO ROLES" word="LET'S TALK" title="Let's talk" />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="text-ink-soft text-base md:text-lg leading-relaxed mb-9 max-w-md"
              >
                Have an idea, a project, or just want to say hi? Drop me a message
                and I&apos;ll get back to you fast. Always open to interesting
                work and people.
              </motion.p>

              <div className="space-y-3 mb-10">
                {meta.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <span className="icon-tile w-11 h-11">
                      <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-display text-[0.65rem] font-semibold uppercase tracking-widest text-ink-faint">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-ink">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-line">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 border-b border-line hover:border-mint transition-colors"
                  >
                    <span className="font-display text-[0.65rem] font-semibold uppercase tracking-widest text-ink-faint w-24 shrink-0">
                      {s.label}
                    </span>
                    <span className="flex-1 text-sm font-medium text-ink group-hover:text-mint transition-colors truncate">
                      {s.value}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-mint group-hover:rotate-45 transition-all shrink-0" />
                  </a>
                ))}
              </div>

              <div className="pt-8">
                <p className="eyebrow mb-4">What I can help with</p>
                <div className="flex flex-wrap gap-2">
                  {["Frontend Dev", "Full-Stack Projects", "AI-assisted workflows", "Tool Building"].map(
                    (item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="card p-6 md:p-8"
            >
              <p className="eyebrow mb-6">Send a message</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-line pb-2">
                  <label htmlFor="name" className="block font-display text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-ink text-sm outline-none placeholder:text-ink-faint"
                    placeholder="Your name"
                  />
                </div>
                <div className="border-b border-line pb-2">
                  <label htmlFor="email" className="block font-display text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-ink text-sm outline-none placeholder:text-ink-faint"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="border-b border-line pb-2">
                  <label htmlFor="message" className="block font-display text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent text-ink text-sm outline-none resize-none placeholder:text-ink-faint"
                    placeholder="Tell me about your project"
                  />
                </div>
                <button type="submit" className="btn-primary group">
                  Send
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" strokeWidth={2} />
                </button>
                <p className="text-xs text-ink-faint">
                  Opens your mail client — or write direct to{" "}
                  <a href={`mailto:${personalInfo.email}`} className="text-mint">
                    {personalInfo.email}
                  </a>
                </p>
              </form>

              <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-3">
                {iconSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-tile w-10 h-10 hover:border-mint hover:text-mint"
                    aria-label={social.label}
                  >
                    <social.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
