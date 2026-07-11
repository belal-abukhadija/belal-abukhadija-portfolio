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
    { label: "Tools", id: "tools" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const firstName = personalInfo.name.split(" ")[0];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? "bg-bg/80 backdrop-blur-md border-b border-line"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <nav className="max-w-6xl mx-auto py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="font-mono text-sm tracking-[0.14em] uppercase text-ink hover:text-amber transition-colors"
                >
                  {firstName}
                  <span className="text-amber">.work</span>
                </button>

                <div className="hidden md:flex items-center gap-1">
                  {navItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="group px-4 py-2 text-ink-soft text-sm font-medium hover:text-ink transition-colors"
                    >
                      <span className="font-mono text-amber/60 text-xs mr-1.5">
                        0{i + 1}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                  {[
                    { href: personalInfo.github, icon: Github, label: "GitHub" },
                    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                  ].map((social) => (
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
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="btn-primary text-sm ml-1 !py-2.5 !px-5"
                  >
                    <Mail className="w-4 h-4" strokeWidth={2} />
                    Hire me
                  </a>
                </div>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden icon-tile w-10 h-10 rounded-full"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Menu className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
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
                <div className="card p-5">
                  <div className="flex flex-col">
                    {navItems.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left font-medium text-lg text-ink hover:text-amber transition-colors py-2.5 flex items-center gap-3"
                      >
                        <span className="font-mono text-amber/50 text-xs">0{i + 1}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-line">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-tile w-11 h-11 rounded-full"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" strokeWidth={1.75} />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-tile w-11 h-11 rounded-full"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" strokeWidth={1.75} />
                    </a>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="btn-primary flex-1 justify-center text-sm"
                    >
                      <Mail className="w-4 h-4" strokeWidth={2} />
                      Hire me
                    </a>
                  </div>
                </div>
              </motion.div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
