"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/projects-data";

const navItems = [
  { label: "PROJECTS", id: "work" },
  { label: "ARTICLES", id: "articles" },
  { label: "SKILLS", id: "skills" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" },
];

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

  const firstName = personalInfo.name.split(" ")[0];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-colors duration-300 ${
            scrolled ? "bg-bg border-b border-line" : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <nav className="max-w-7xl mx-auto py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="group"
                >
                  <span className="font-display text-sm tracking-[0.1em] uppercase text-ink group-hover:text-mint transition-colors">
                    {firstName}
                    <span className="text-ink-faint font-medium">.work/2026</span>
                  </span>
                </button>

                <div className="hidden lg:flex items-center gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="group px-3 py-2 text-ink-soft text-xs font-semibold tracking-widest hover:text-ink transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="hidden lg:flex items-center">
                  <a href={`mailto:${personalInfo.email}`} className="btn-primary text-sm !py-2.5 !px-5">
                    Get in touch
                  </a>
                </div>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden icon-tile w-10 h-10"
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
                className="lg:hidden overflow-hidden"
              >
                <div className="card p-5">
                  <div className="flex flex-col">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left font-semibold text-base text-ink hover:text-mint transition-colors py-2.5 flex items-center gap-3"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="btn-primary w-full justify-center text-sm mt-4"
                  >
                    Get in touch
                  </a>
                </div>
              </motion.div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
