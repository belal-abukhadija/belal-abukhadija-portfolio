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
      className="relative py-16 md:py-20 lg:py-24 bg-surface text-ink overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="w-full neu-inset-deep p-4 sm:p-6 flex items-center justify-center aspect-square lg:aspect-auto lg:h-[620px]">
              <Globe />
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="neu-chip text-xs font-medium tracking-wide text-ink-soft mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
              Worldwide Coverage
            </div>

            <h2 className="font-semibold tracking-tight text-4xl md:text-6xl leading-[0.95] mb-6 text-ink">
              Working
              <br />
              <span className="text-accent">Globally,</span>
              <br />
              From Jordan
            </h2>

            <p className="text-lg text-ink-soft max-w-md mb-10 leading-relaxed">
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
                  className="neu-surface p-5 transition-shadow hover:shadow-[var(--shadow-neu-lg)]"
                >
                  <span className="neu-icon w-10 h-10 mb-3">
                    <item.icon className="w-5 h-5 text-accent" strokeWidth={2} />
                  </span>
                  <div className="font-semibold tracking-tight text-sm text-ink">
                    {item.title}
                  </div>
                  <div className="text-xs text-ink-soft mt-1">
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
