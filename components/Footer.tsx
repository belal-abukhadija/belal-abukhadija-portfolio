"use client";

import { Github, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Footer() {
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

  const navItems = [
    { label: "Work", id: "work" },
    { label: "Articles", id: "articles" },
    { label: "Skills", id: "skills" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer id="footer" className="relative border-t border-line md:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="icon-tile w-8 h-8 !rounded-md font-display font-black text-sm text-mint">
                {personalInfo.name[0]}
              </span>
              <span className="font-display text-sm tracking-[0.1em] uppercase text-ink">
                {personalInfo.name.split(" ")[0]}
                <span className="text-ink-faint font-medium">.work</span>
              </span>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs">
              {personalInfo.headline}, based in {personalInfo.location}.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[0.65rem] font-semibold tracking-widest text-ink-faint mb-5 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm font-medium text-ink-soft hover:text-mint transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[0.65rem] font-semibold tracking-widest text-ink-faint mb-5 uppercase">
              Connect
            </h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-sm font-medium text-ink-soft hover:text-mint transition-colors mb-6"
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
                  className="icon-tile w-10 h-10 hover:border-mint hover:text-mint"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-line">
          <p className="font-display text-[0.7rem] tracking-wide text-ink-faint">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection("hero")}
            className="font-display text-[0.7rem] tracking-wide text-ink-faint hover:text-mint transition-colors inline-flex items-center gap-2"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}
