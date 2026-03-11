"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, LayoutTemplate, Zap, ShieldCheck } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Hero() {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-cream bg-grid-pattern"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="relative">
            {/* Background Outline Text */}
            <div className="absolute -top-16 -left-8 md:-left-16 text-[8rem] md:text-[12rem] font-black uppercase text-stroke-sm md:text-stroke opacity-10 select-none pointer-events-none whitespace-nowrap -rotate-3">
              CREATOR
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="inline-flex py-3 px-5 border-4 border-black bg-vivid-yellow font-black uppercase tracking-widest text-sm mb-12 shadow-[4px_4px_0px_0px_#000] -rotate-2">
                Utility over noise
              </div>

              <h1 className="font-black uppercase tracking-tighter leading-[0.85] mb-12 text-black">
                <span className="block text-[clamp(4.5rem,11.5vw,9rem)]">
                  {personalInfo.name.split(" ")[0]}
                </span>
                <span className="block text-[clamp(3.5rem,9.5vw,7.5rem)] text-hot-red mt-2">
                  {personalInfo.name.split(" ")[1]}
                </span>
              </h1>

              <p className="max-w-xl text-xl md:text-2xl font-bold bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] mb-14 transform rotate-1">
                {personalInfo.description}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={scrollToTools}
                  className="px-8 py-5 border-4 border-black bg-slate-blue text-white group font-black text-xl uppercase tracking-widest shadow-[8px_8px_0px_0px_#000] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] hover:-translate-y-1 transition-all flex items-center gap-4"
                >
                  Explore Work
                  <ArrowDownRight className="w-8 h-8 group-hover:rotate-[-45deg] transition-transform" strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:block relative"
          >
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              {/* Back card */}
              <div className="absolute inset-0 border-4 border-black bg-hot-red translate-x-12 translate-y-12 shadow-[8px_8px_0px_0px_#000]" />
              {/* Middle card */}
              <div className="absolute inset-0 border-4 border-black bg-vivid-yellow rotate-6 shadow-[8px_8px_0px_0px_#000]" />
              {/* Front content card */}
              <div className="absolute inset-0 border-4 border-black bg-white -rotate-3 shadow-[12px_12px_0px_0px_#000] flex flex-col p-10 overflow-hidden bg-halftone">
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="w-20 h-20 border-4 border-black bg-slate-blue mb-8 flex items-center justify-center rotate-12 shadow-[4px_4px_0px_0px_#000]">
                      <LayoutTemplate className="w-10 h-10 text-white" strokeWidth={3} />
                    </div>
                    <h3 className="text-5xl font-black uppercase leading-none">Strict<br />Design<br />Systems</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 border-4 border-black p-4 bg-cream shadow-[4px_4px_0px_0px_#000] transform -rotate-1">
                      <Zap className="w-8 h-8 text-hot-red" strokeWidth={3} />
                      <span className="font-bold uppercase tracking-wider text-lg">High Performance</span>
                    </div>
                    <div className="flex items-center gap-4 border-4 border-black p-4 bg-cream shadow-[4px_4px_0px_0px_#000] transform rotate-1">
                      <ShieldCheck className="w-8 h-8 text-slate-blue" strokeWidth={3} />
                      <span className="font-bold uppercase tracking-wider text-lg">Privacy First</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-16 -top-16 opacity-10 pointer-events-none">
                  <LayoutTemplate className="w-80 h-80 text-black" strokeWidth={1} />
                </div>
              </div>
            </div>

            {/* Floating Sticker */}
            <motion.div
              animate={{ rotate: [12, -12, 12] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-4 border-black bg-slate-blue flex items-center justify-center text-white font-black uppercase text-center shadow-[6px_6px_0px_0px_#000] leading-tight text-xl z-20"
            >
              100%<br />Local<br />Storage
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
