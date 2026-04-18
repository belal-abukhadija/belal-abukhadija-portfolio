"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.02);
  });

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Tools", id: "tools" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed top-4 left-4 right-4 md:left-6 md:right-6 z-50 transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-surface/85 backdrop-blur-md shadow-[var(--shadow-neu)]"
            : "bg-transparent"
        }`}
      >
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="font-semibold text-sm md:text-base tracking-[0.14em] cursor-pointer select-none text-ink uppercase"
              onClick={() => scrollToSection("hero")}
            >
              {personalInfo.name}
              <span className="text-accent">.</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 mr-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-4 py-2 rounded-full text-ink-soft text-sm font-medium tracking-wide hover:text-accent transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-3">
                {[
                  { href: personalInfo.github, icon: Github, label: "GitHub" },
                  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
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
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="neu-pressable-accent px-5 py-3 text-sm font-semibold tracking-wide flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" strokeWidth={2.25} />
                  Hire Me
                </a>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden neu-pressable-accent w-11 h-11 flex items-center justify-center rounded-full"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={
              mobileOpen
                ? { height: "auto", opacity: 1, marginTop: "1rem" }
                : { height: 0, opacity: 0, marginTop: 0 }
            }
            className="md:hidden overflow-hidden"
          >
            <div className="neu-surface p-5">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-medium text-lg text-ink hover:text-accent transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3 pt-5" style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)" }}>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-pressable-accent w-12 h-12 flex items-center justify-center rounded-full"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" strokeWidth={2} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-pressable-accent w-12 h-12 flex items-center justify-center rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" strokeWidth={2} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="neu-pressable-accent flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                >
                  <Mail className="w-4 h-4" strokeWidth={2.25} />
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>
    </>
  );
}
