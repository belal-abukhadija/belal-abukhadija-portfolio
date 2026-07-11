"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, TrendingUp, Globe } from "lucide-react";

const milestones = [
  {
    number: "2021",
    title: "The beginning",
    description:
      "Wrote my first lines of code, fell in love with the craft, and started building small tools to solve everyday problems.",
    icon: Lightbulb,
  },
  {
    number: "2022–23",
    title: "Leveling up",
    description:
      "Went deep on React, TypeScript, and full-stack patterns. Shipped multiple live projects and started freelancing.",
    icon: TrendingUp,
  },
  {
    number: "2024+",
    title: "Building in public",
    description:
      "Launched belal.work, a growing suite of free, independent web tools used by developers and creators worldwide.",
    icon: Globe,
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            Timeline
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.06 }}
            className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[0.98] mb-14"
          >
            My journey <span className="accent-word">so far</span>
          </motion.h2>

          <div className="relative grid md:grid-cols-3 gap-5">
            {/* connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-line" />

            {milestones.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-6 relative">
                  <span className="relative z-10 icon-tile w-12 h-12 rounded-full bg-bg">
                    <step.icon className="w-[20px] h-[20px]" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-sm tracking-widest text-amber">
                    {step.number}
                  </span>
                </div>
                <div className="card p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
