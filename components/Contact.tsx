"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, Mail, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-28 bg-vivid-yellow overflow-hidden border-b-4 border-black bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-16 h-2 bg-black" />
              <span className="text-xl font-black uppercase tracking-widest text-black">Contact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="text-5xl md:text-7xl leading-[0.85] font-black uppercase text-black mb-10"
            >
              Let&apos;s build
              <br />
              <span className="bg-white text-black px-2 mt-3 inline-block -rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                practical
              </span>
              <br />
              products
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-black text-xl font-bold leading-relaxed mb-12 max-w-lg bg-cream border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] rotate-1"
            >
              Share your idea, challenge, or backlog. I&apos;ll reply with a clear scope,
              smart timeline, and direct next steps.
            </motion.p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email, color: "bg-hot-red" },
                { icon: Globe2, label: "Collaboration", value: "Remote worldwide", color: "bg-slate-blue" },
                { icon: Clock3, label: "Typical response", value: "Within 24 hours", color: "bg-cream" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.24 + i * 0.1 }}
                  className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 border-4 border-black ${item.color} flex items-center justify-center shadow-[2px_2px_0px_0px_#000]`}>
                      <item.icon className="w-6 h-6 text-black" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest text-black mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-black">{item.value}</p>
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
            className="border-4 border-black bg-white p-8 md:p-10 shadow-[12px_12px_0px_0px_#000] -rotate-1 relative"
          >
            <div className="mb-10">
              <p className="text-lg font-black uppercase tracking-widest text-black mb-4">Start Here</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full flex items-center justify-between gap-4 border-4 border-black bg-hot-red px-6 py-5 hover:-translate-y-1 active:translate-y-1 shadow-[6px_6px_0px_0px_#000] active:shadow-none transition-all group"
              >
                <span className="text-black font-black uppercase text-xl md:text-2xl">Send project brief</span>
                <ArrowUpRight className="w-8 h-8 text-black group-hover:rotate-45 transition-transform" strokeWidth={3} />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-black bg-slate-blue p-6 hover:-translate-y-1 active:translate-y-1 shadow-[4px_4px_0px_0px_#000] active:shadow-none transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Github className="w-8 h-8 text-white" strokeWidth={3} />
                  <span className="text-xl font-black uppercase text-white">GitHub</span>
                </div>
                <p className="text-sm font-bold text-white">Code, open-source work, and experiments.</p>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-black bg-cream p-6 hover:-translate-y-1 active:translate-y-1 shadow-[4px_4px_0px_0px_#000] active:shadow-none transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Linkedin className="w-8 h-8 text-black" strokeWidth={3} />
                  <span className="text-xl font-black uppercase text-black">LinkedIn</span>
                </div>
                <p className="text-sm font-bold text-black">Professional updates and direct messaging.</p>
              </a>
            </div>

            <div className="border-t-4 border-black pt-8">
              <p className="text-sm font-black uppercase tracking-widest text-black mb-4">What I can help with</p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Tool MVPs",
                  "Frontend architecture",
                  "UI redesign",
                  "Performance tuning",
                  "Automation utilities",
                ].map((item) => (
                  <span key={item} className="border-4 border-black bg-white px-3 py-1 text-sm font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_0px_#000]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Abstract Sticker */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-black bg-black rounded-full flex items-center justify-center -rotate-12 shadow-[4px_4px_0px_0px_#FF6B6B]">
               <span className="text-white font-black text-2xl">HIRE<br/>ME</span>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
