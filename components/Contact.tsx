"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const meta = [
    { icon: Mail, label: "Email", value: personalInfo.email },
    { icon: Globe2, label: "Collaboration", value: "Remote worldwide" },
    { icon: Clock3, label: "Typical response", value: "Within 1 hour" },
  ];

  const socials = [
    { href: personalInfo.github, icon: Github, label: "GitHub", desc: "Code & experiments" },
    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn", desc: "Professional updates" },
    { href: `https://wa.me/${personalInfo.whatsapp}`, icon: WhatsAppIcon, label: "WhatsApp", desc: personalInfo.whatsappDisplay },
    { href: `https://instagram.com/${personalInfo.instagram}`, icon: Instagram, label: "Instagram", desc: `@${personalInfo.instagram}` },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
            >
              Contact
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] font-semibold tracking-tight text-ink mb-7"
            >
              Let&apos;s work
              <br />
              <span className="accent-word">together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="text-ink-soft text-base md:text-lg leading-relaxed mb-9 max-w-md"
            >
              Have an idea, a project, or just want to say hi? Drop me a message
              and I&apos;ll get back to you fast. Always open to interesting
              work and people.
            </motion.p>

            <div className="space-y-3">
              {meta.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <span className="icon-tile w-11 h-11">
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-ink">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="card p-6 md:p-8"
          >
            <p className="eyebrow mb-4">Start here</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group w-full flex items-center justify-between gap-4 btn-primary !rounded-2xl !py-5 mb-8"
            >
              <span className="font-display font-semibold text-lg md:text-xl tracking-tight">
                Send a project brief
              </span>
              <ArrowUpRight
                className="w-6 h-6 group-hover:rotate-45 transition-transform"
                strokeWidth={2}
              />
            </a>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover p-5 !rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="icon-tile w-9 h-9">
                      <s.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="font-display font-semibold text-ink">
                      {s.label}
                    </span>
                  </div>
                  <p className="font-mono text-[0.68rem] text-ink-faint truncate">
                    {s.desc}
                  </p>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-line">
              <p className="eyebrow mb-4">What I can help with</p>
              <div className="flex flex-wrap gap-2">
                {["Frontend Dev", "Full-Stack Projects", "UI Design", "Tool Building", "Freelance Work"].map(
                  (item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
