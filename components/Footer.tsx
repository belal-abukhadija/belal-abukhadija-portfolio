"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Footer() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const socials = [
    { href: personalInfo.github, icon: Github, label: "GitHub" },
    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `https://wa.me/${personalInfo.whatsapp}`, icon: WhatsAppIcon, label: "WhatsApp" },
    { href: `https://instagram.com/${personalInfo.instagram}`, icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer id="footer" className="relative border-t border-line">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={ctaRef} className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="eyebrow justify-center mb-6">Got a project or an idea?</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.98] font-semibold tracking-tight text-ink mb-10">
              Let&apos;s make it
              <br />
              <span className="accent-word">real together</span>
            </h2>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-primary text-lg !px-8 !py-5 group"
            >
              Say hello
              <ArrowUpRight
                className="w-5 h-5 transition-transform group-hover:rotate-45"
                strokeWidth={2}
              />
            </a>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto py-14 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-line">
          <div>
            <h3 className="font-mono text-sm tracking-[0.14em] uppercase mb-4 text-ink">
              {personalInfo.name.split(" ")[0]}
              <span className="text-amber">.work</span>
            </h3>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs">
              Developer, builder, and toolmaker based in {personalInfo.location}.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] tracking-widest text-ink-faint mb-5 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "hero" },
                { label: "Tools", id: "tools" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm font-medium text-ink-soft hover:text-amber transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] tracking-widest text-ink-faint mb-5 uppercase">
              Connect
            </h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-sm font-medium text-ink-soft hover:text-amber transition-colors mb-6"
            >
              <Mail className="w-4 h-4" strokeWidth={1.75} />
              {personalInfo.email}
            </a>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-tile w-10 h-10 rounded-full hover:border-amber hover:text-amber"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-8 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-line">
          <p className="font-mono text-[0.7rem] tracking-wide text-ink-faint">
            © {currentYear} {personalInfo.name}
          </p>
          <p className="font-mono text-[0.7rem] tracking-wide text-ink-faint">
            Designed &amp; built in {personalInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
