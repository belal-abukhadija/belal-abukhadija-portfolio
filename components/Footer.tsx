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
    <footer id="footer" className="relative bg-black text-white overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div ref={ctaRef} className="py-24 md:py-32 text-center border-b-4 border-white">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="max-w-4xl mx-auto p-10 md:p-14 bg-white text-black border-4 border-white transform rotate-1 transition-all hover:rotate-0"
          >
            <p className="text-lg font-black uppercase tracking-widest text-black mb-8">Build Something Distinct</p>
            <h2 className="text-5xl md:text-7xl leading-[0.85] font-black uppercase text-black mb-12">
              Let&apos;s craft a product
              <br />
              <span className="bg-hot-red text-white px-2 mt-4 inline-block -rotate-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                people remember
              </span>
            </h2>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-4 px-10 py-6 bg-vivid-yellow text-black border-4 border-black font-black uppercase tracking-widest text-2xl shadow-[8px_8px_0px_0px_#000] active:shadow-none active:translate-x-2 active:translate-y-2 hover:-translate-y-1 transition-all group"
            >
              Start Conversation
              <ArrowUpRight className="w-8 h-8 transition-transform group-hover:rotate-45" strokeWidth={4} />
            </a>
          </motion.div>
        </div>

        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-3xl font-black uppercase mb-6 inline-block border-b-4 border-white pb-2">{personalInfo.name.split(" ")[0]}_LAB</h3>
            <p className="text-white font-bold text-lg leading-relaxed max-w-xs uppercase">
              Utility-first products with bold visual systems and no bloat.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-vivid-yellow mb-6">Navigate</h4>
            <ul className="space-y-4">
              {[
                { label: "Home", id: "hero" },
                { label: "Tools", id: "tools" },
                { label: "About", id: "about" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-xl font-bold uppercase text-white hover:text-hot-red hover:translate-x-2 transition-all"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-vivid-yellow mb-6">Connect</h4>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-xl font-bold uppercase text-white hover:text-hot-red hover:translate-x-2 transition-all mb-8 block"
            >
              <Mail className="w-6 h-6" strokeWidth={3} />
              {personalInfo.email}
            </a>
            <div className="flex gap-4">
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub", color: "hover:bg-slate-blue" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:bg-hot-red" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 border-4 border-white bg-black flex items-center justify-center text-white ${social.color} hover:text-white transition-all`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" strokeWidth={3} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-white py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white font-bold uppercase text-sm tracking-widest">&copy; {currentYear} {personalInfo.name}</p>
          <p className="flex items-center gap-2 text-black font-bold uppercase text-sm tracking-widest bg-white text-black px-4 py-2 border-4 border-black">
            Built with <Heart className="w-4 h-4 text-hot-red fill-hot-red" /> for builders
          </p>
        </div>
      </div>
    </footer>
  );
}
