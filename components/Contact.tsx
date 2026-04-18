"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 lg:py-28 bg-surface overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-stretch">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="neu-divider w-16" />
              <span className="text-sm font-medium tracking-wide text-ink-soft">
                Contact
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] font-semibold tracking-tight text-ink mb-8"
            >
              Let&apos;s work
              <br />
              <span className="text-accent">together</span>
              <br />
              on something great
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-ink-soft text-base md:text-lg leading-relaxed mb-10 max-w-lg neu-inset p-5 md:p-6"
            >
              Have an idea, a project, or just want to say hi? Drop me a message
              and I&apos;ll get back to you fast. Always open to interesting
              work and people.
            </motion.p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email },
                { icon: Globe2, label: "Collaboration", value: "Remote worldwide" },
                { icon: Clock3, label: "Typical response", value: "Within 1 hour" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.24 + i * 0.1 }}
                  className="neu-surface p-5"
                >
                  <div className="flex items-center gap-5">
                    <span className="neu-icon w-12 h-12 text-accent">
                      <item.icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-xs font-medium tracking-wide text-ink-subtle mb-1">
                        {item.label}
                      </p>
                      <p className="text-base font-semibold text-ink">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="neu-surface-xl p-6 md:p-10 relative h-full flex flex-col"
          >
            <div className="mb-10">
              <p className="text-xs font-medium tracking-wide text-ink-subtle mb-4 uppercase">
                Start Here
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group w-full flex items-center justify-between gap-4 rounded-2xl bg-accent hover:bg-[var(--color-accent-deep)] px-6 py-5 text-white shadow-[var(--shadow-neu)] hover:shadow-[var(--shadow-neu-lg)] active:shadow-[var(--shadow-neu-inset)] transition-all"
              >
                <span className="font-semibold tracking-tight text-lg md:text-xl">
                  Send project brief
                </span>
                <ArrowUpRight
                  className="w-6 h-6 group-hover:rotate-45 transition-transform"
                  strokeWidth={2.25}
                />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-pressable p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="neu-icon w-10 h-10 text-accent">
                    <Github className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink">
                    GitHub
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  Code, open-source work, and experiments.
                </p>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-pressable p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="neu-icon w-10 h-10 text-accent">
                    <Linkedin className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink">
                    LinkedIn
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  Professional updates and direct messaging.
                </p>
              </a>

              <a
                href={`https://wa.me/${personalInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-pressable p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="neu-icon w-10 h-10 text-accent">
                    <WhatsAppIcon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink">
                    WhatsApp
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {personalInfo.whatsappDisplay} - fastest way to reach me.
                </p>
              </a>

              <a
                href={`https://instagram.com/${personalInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-pressable p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="neu-icon w-10 h-10 text-accent">
                    <Instagram className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink">
                    Instagram
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  @{personalInfo.instagram} - behind the scenes.
                </p>
              </a>
            </div>

            <div className="mt-auto pt-8" style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)" }}>
              <p className="text-xs font-medium tracking-wide text-ink-subtle mb-4 uppercase">
                What I can help with
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Frontend Dev",
                  "Full-Stack Projects",
                  "UI Design",
                  "Tool Building",
                  "Freelance Work",
                ].map((item) => (
                  <span
                    key={item}
                    className="neu-chip text-xs font-medium tracking-wide text-ink-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
