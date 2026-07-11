"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Wifi, Clock, Globe2 } from "lucide-react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

const highlights = [
  { icon: MapPin, title: "Based in Jordan", desc: "Middle East · GMT+3" },
  { icon: Globe2, title: "Global clients", desc: "Across every continent" },
  { icon: Wifi, title: "Fully remote", desc: "Seamless async collaboration" },
  { icon: Clock, title: "Flexible hours", desc: "Adapting to your timezone" },
];

export default function Coverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="coverage" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute inset-0 amber-glow opacity-70" />
            <div className="relative w-full flex items-center justify-center aspect-square lg:aspect-auto lg:h-[540px]">
              <Globe />
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ x: 30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="eyebrow mb-6">Worldwide coverage</div>

            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[0.98] mb-6 text-ink">
              Working <span className="accent-word">globally</span>,
              <br />
              from Jordan
            </h2>

            <p className="text-base md:text-lg text-ink-soft max-w-md mb-10 leading-relaxed">
              I collaborate with teams and clients worldwide. Wherever you are,
              I&apos;ll adapt to your workflow, timezone, and communication style.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 16, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="card card-hover p-4"
                >
                  <span className="icon-tile w-10 h-10 mb-3">
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </span>
                  <div className="font-display font-semibold text-sm text-ink">
                    {item.title}
                  </div>
                  <div className="font-mono text-[0.68rem] text-ink-faint mt-1">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
