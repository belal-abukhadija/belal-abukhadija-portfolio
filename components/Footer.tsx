"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Heart, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Footer() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-surface text-ink overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div ref={ctaRef} className="py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="max-w-4xl mx-auto neu-surface-xl p-7 md:p-10 lg:p-14 text-center"
          >
            <p className="text-xs font-medium tracking-wide text-ink-subtle mb-6 uppercase">
              Got a project or an idea?
            </p>
            <h2 className="text-4xl md:text-6xl leading-[0.95] font-semibold tracking-tight text-ink mb-10">
              Let&apos;s make it
              <br />
              <span className="text-accent">real together</span>
            </h2>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-accent hover:bg-[var(--color-accent-deep)] text-white font-semibold tracking-tight text-lg shadow-[var(--shadow-neu)] hover:shadow-[var(--shadow-neu-lg)] active:shadow-[var(--shadow-neu-inset)] transition-all group"
            >
              Say Hello
              <ArrowUpRight
                className="w-5 h-5 transition-transform group-hover:rotate-45"
                strokeWidth={2.25}
              />
            </a>
          </motion.div>
        </div>

        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-4 text-ink">
              {personalInfo.name.split(" ")[0]}
              <span className="text-accent"> Abukhadija</span>
            </h3>
            <p className="text-ink-soft text-base leading-relaxed max-w-xs">
              Developer, builder, and creative - based in Palestine.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wide text-ink-subtle mb-5 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Tools", id: "tools" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-base font-medium text-ink-soft hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wide text-ink-subtle mb-5 uppercase">
              Connect
            </h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-base font-medium text-ink-soft hover:text-accent transition-colors mb-6"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              {personalInfo.email}
            </a>
            <div className="flex flex-wrap gap-3">
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `https://wa.me/${personalInfo.whatsapp}`, icon: WhatsAppIcon, label: "WhatsApp" },
                { href: `https://instagram.com/${personalInfo.instagram}`, icon: Instagram, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-pressable-accent w-11 h-11 flex items-center justify-center rounded-full"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)" }}>
          <p className="text-ink-soft text-xs font-medium tracking-wide">
            © {currentYear} {personalInfo.name}
          </p>
          <p className="neu-chip text-xs font-medium tracking-wide text-ink-soft inline-flex items-center gap-2">
            Built with
            <Heart
              className="w-3.5 h-3.5 text-accent"
              fill="currentColor"
              strokeWidth={0}
            />
            for builders
          </p>
        </div>
      </div>
    </footer>
  );
}
