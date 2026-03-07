"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, Mail, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-28 bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(21,206,255,0.12),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 w-80 h-80 rounded-full border border-primary-300/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-14 h-px bg-gradient-to-r from-primary-300 to-transparent" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary-200">Contact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="text-4xl md:text-6xl leading-[0.94] font-display text-white mb-7"
            >
              Let&apos;s build your next
              <br />
              <span className="gradient-text">practical product</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-white/60 leading-relaxed mb-8 max-w-lg"
            >
              Share your idea, challenge, or backlog. I&apos;ll reply with a clear scope,
              smart timeline, and direct next steps.
            </motion.p>

            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email },
                { icon: Globe2, label: "Collaboration", value: "Remote worldwide" },
                { icon: Clock3, label: "Typical response", value: "Within 24 hours" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.24 + i * 0.1 }}
                  className="panel-cut section-frame p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-accent-300/40 bg-accent-300/15 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-accent-100" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">{item.label}</p>
                      <p className="text-white/85">{item.value}</p>
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
            className="panel-cut section-frame p-7"
          >
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary-200 mb-3">Start Here</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="panel-cut w-full inline-flex items-center justify-between gap-3 border border-primary-300/45 bg-primary-300/15 px-5 py-4 hover:bg-primary-300/20 transition-colors"
              >
                <span className="text-white font-medium">Send project brief</span>
                <ArrowUpRight className="w-4 h-4 text-primary-200" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-cut border border-white/[0.14] bg-white/[0.03] p-4 hover:border-primary-300/45 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Github className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white">GitHub</span>
                </div>
                <p className="text-xs text-white/50">Code, open-source work, and experiments.</p>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-cut border border-white/[0.14] bg-white/[0.03] p-4 hover:border-primary-300/45 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Linkedin className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white">LinkedIn</span>
                </div>
                <p className="text-xs text-white/50">Professional updates and direct messaging.</p>
              </a>
            </div>

            <div className="panel-cut border border-white/[0.14] bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">What I can help with</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tool MVPs",
                  "Frontend architecture",
                  "UI redesign",
                  "Performance tuning",
                  "Automation utilities",
                ].map((item) => (
                  <span key={item} className="panel-cut border border-white/[0.14] bg-surface-900/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/65">
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
