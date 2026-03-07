"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Footer() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-surface-950 text-white overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent-400/[0.08] rounded-full blur-[230px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={ctaRef} className="py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="section-frame panel-cut max-w-4xl mx-auto p-10 md:p-14"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-5">Build Something Distinct</p>
            <h2 className="text-4xl md:text-6xl leading-[0.95] font-display mb-8">
              Let&apos;s craft a product
              <br />
              <span className="gradient-text">people remember</span>
            </h2>
            <a
              href={`mailto:${personalInfo.email}`}
              className="panel-cut group inline-flex items-center gap-2 px-8 py-4 bg-primary-300 text-surface-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-primary-200 transition-colors"
            >
              Start Conversation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-display mb-3">{personalInfo.name.split(" ")[0]}_LAB</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Utility-first products with bold visual systems and no bloat.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "hero" },
                { label: "Tools", id: "tools" },
                { label: "About", id: "about" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-white/55 hover:text-primary-200 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-4">Connect</h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-primary-200 transition-colors mb-5"
            >
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </a>
            <div className="flex gap-2 mt-2">
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-cut w-10 h-10 border border-white/[0.12] bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-primary-200 hover:border-primary-300/55 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/33 text-xs">&copy; {currentYear} {personalInfo.name}</p>
          <p className="flex items-center gap-1.5 text-white/33 text-xs">
            Built with <Heart className="w-3 h-3 text-primary-300/80" /> for builders
          </p>
        </div>
      </div>
    </footer>
  );
}
