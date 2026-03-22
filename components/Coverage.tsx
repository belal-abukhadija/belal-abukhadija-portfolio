"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Wifi, Clock, Globe2 } from "lucide-react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

const highlights = [
  {
    icon: MapPin,
    title: "Based in Jordan",
    desc: "Middle East headquarters",
  },
  {
    icon: Globe2,
    title: "Global Clients",
    desc: "Across all 7 continents",
  },
  {
    icon: Wifi,
    title: "Fully Remote",
    desc: "Seamless async collaboration",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "Adapting to your timezone",
  },
];

export default function Coverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="coverage"
      className="relative py-24 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Left — Text Content */}
          <motion.div
            ref={ref}
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex py-3 px-5 border-4 border-white bg-hot-red text-black font-black uppercase tracking-widest text-sm mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] -rotate-1">
              Worldwide Coverage
            </div>

            <h2 className="font-black uppercase tracking-tighter text-5xl md:text-6xl leading-[0.9] mb-6">
              Working
              <br />
              <span className="text-hot-red">Globally,</span>
              <br />
              From Jordan
            </h2>

            <p className="text-lg text-gray-300 max-w-md mb-10 font-medium leading-relaxed">
              I collaborate with teams and clients worldwide. No matter where
              you are, I&apos;ll adapt to your workflow, timezone, and
              communication style.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="border-4 border-white/20 bg-white/5 p-4 hover:border-hot-red hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-vivid-yellow mb-2" strokeWidth={3} />
                  <div className="font-black uppercase tracking-wider text-sm">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-medium">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Globe */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
