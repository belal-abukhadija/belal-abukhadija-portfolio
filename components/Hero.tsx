"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import dynamic from "next/dynamic";

const RubiksCube = dynamic(() => import("./RubiksCube"), { ssr: false });

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-x-clip bg-cream bg-grid-pattern"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Left Text Column */}
          <div className="relative">
            {/* Background Outline Text */}
            <div className="absolute -top-16 -left-8 md:-left-16 text-[8rem] md:text-[12rem] font-black uppercase text-stroke-sm md:text-stroke opacity-10 select-none pointer-events-none whitespace-nowrap -rotate-3">
              BELAL
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="inline-flex py-3 px-5 border-4 border-black bg-vivid-yellow font-black uppercase tracking-widest text-sm mb-12 shadow-[4px_4px_0px_0px_#000] -rotate-2">
                {personalInfo.role}
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
                  onClick={scrollToAbout}
                  className="px-8 py-5 border-4 border-black bg-slate-blue text-white group font-black text-xl uppercase tracking-widest shadow-[8px_8px_0px_0px_#000] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] hover:-translate-y-1 transition-all flex items-center gap-4"
                >
                  About Me
                  <ArrowDownRight className="w-8 h-8 group-hover:rotate-[-45deg] transition-transform" strokeWidth={3} />
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-8 py-5 border-4 border-black bg-hot-red text-black font-black text-xl uppercase tracking-widest shadow-[8px_8px_0px_0px_#000] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] hover:-translate-y-1 transition-all"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Column — Rubik's Cube */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:flex relative items-center justify-center"
          >
            <div className="w-full" style={{ height: 620 }}>
              <RubiksCube />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
