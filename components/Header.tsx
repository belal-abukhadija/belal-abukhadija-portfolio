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

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-hot-red z-[60] origin-left border-b-4 border-black"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ${scrolled ? "bg-cream border-b-4 border-black translate-y-0" : "bg-cream border-b-4 border-black -translate-y-2 md:translate-y-0"
          }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <div className="font-black text-2xl uppercase tracking-tighter cursor-pointer select-none" onClick={() => scrollToSection("hero")}>
              {personalInfo.name.split(" ")[0]}<span className="text-hot-red"></span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-8 mr-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-black font-bold uppercase tracking-widest hover:text-hot-red hover:-translate-y-1 transition-transform relative before:absolute before:inset-x-0 before:-bottom-1 before:h-1 before:bg-black before:scale-x-0 overflow-hidden hover:before:scale-x-100 before:transition-transform before:origin-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4">
                {[
                  { href: personalInfo.github, icon: Github, label: "GitHub", color: "bg-slate-blue" },
                  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn", color: "bg-vivid-yellow" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 border-4 border-black ${social.color} flex items-center justify-center text-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-1 transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" strokeWidth={3} />
                  </a>
                ))}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-6 py-3 border-4 border-black bg-hot-red text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" strokeWidth={3} />
                  Hire Me
                </a>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-12 h-12 border-4 border-black bg-vivid-yellow flex items-center justify-center text-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" strokeWidth={3} /> : <Menu className="w-6 h-6" strokeWidth={3} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={mobileOpen ? { height: "auto", opacity: 1, marginTop: "1rem" } : { height: 0, opacity: 0, marginTop: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000]">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-black text-xl uppercase tracking-wider border-b-4 border-transparent hover:border-black w-fit transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 border-t-4 border-black pt-6">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-4 border-black bg-slate-blue flex items-center justify-center shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                >
                  <Github className="w-6 h-6" strokeWidth={3} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-4 border-black bg-vivid-yellow flex items-center justify-center shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                >
                  <Linkedin className="w-6 h-6" strokeWidth={3} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex-1 flex items-center justify-center gap-2 border-4 border-black bg-hot-red font-black uppercase tracking-widest p-2 shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                >
                  <Mail className="w-5 h-5" strokeWidth={3} />
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
