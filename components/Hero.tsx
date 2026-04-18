"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-x-clip bg-surface"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-[1fr_1fr] gap-8 items-center">
          <div className="relative">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="font-semibold tracking-tight leading-[0.95] mb-10 text-ink">
                <span className="block text-[clamp(4rem,10vw,8rem)]">
                  {personalInfo.name.split(" ")[0]}
                </span>
                <span className="block text-[clamp(3rem,8vw,6.5rem)] text-accent">
                  {personalInfo.name.split(" ")[1]}
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl font-normal text-ink-soft leading-relaxed neu-inset p-6 mb-12">
                {personalInfo.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToAbout}
                  className="neu-pressable-accent group px-7 py-4 text-base font-semibold tracking-wide flex items-center gap-3"
                >
                  About Me
                  <ArrowDownRight
                    className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform"
                    strokeWidth={2.25}
                  />
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="px-7 py-4 rounded-2xl text-base font-semibold tracking-wide text-white bg-accent hover:bg-[var(--color-accent-deep)] shadow-[var(--shadow-neu)] hover:shadow-[var(--shadow-neu-lg)] active:shadow-[var(--shadow-neu-inset)] transition-all"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:flex relative items-center justify-center"
          >
            <div className="w-full neu-inset-deep p-6 relative" style={{ height: 620 }}>
              <div className="relative w-full h-full overflow-hidden rounded-[20px]">
                <Image
                  src="/ds.png"
                  alt={`${personalInfo.name} - ${personalInfo.role}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 620px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
