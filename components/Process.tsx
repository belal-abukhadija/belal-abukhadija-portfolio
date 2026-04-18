"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, TrendingUp, Globe } from "lucide-react";

const milestones = [
  {
    number: "2021",
    title: "The Beginning",
    description:
      "Wrote my first lines of code, fell in love with the craft, and started building small tools to solve everyday problems.",
    icon: Lightbulb,
  },
  {
    number: "2022–23",
    title: "Leveling Up",
    description:
      "Went deep on React, TypeScript, and full-stack patterns. Shipped multiple live projects and started freelancing.",
    icon: TrendingUp,
  },
  {
    number: "2024+",
    title: "Building in Public",
    description:
      "Launched belal.work - a growing suite of free, independent web tools used by developers and creators worldwide.",
    icon: Globe,
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-surface overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="neu-divider w-16" />
            <span className="text-sm font-medium tracking-wide text-ink-soft">
              Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] font-semibold tracking-tight text-ink mb-16"
          >
            My journey
            <br />
            <span className="text-accent">so far</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                className="neu-surface p-8 relative hover:shadow-[var(--shadow-neu-lg)] hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="absolute top-5 right-5 md:top-6 md:right-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-stroke-sm opacity-20 select-none pointer-events-none leading-none max-w-[55%] text-right">
                  {step.number}
                </div>

                <div className="flex items-center justify-between mb-7 relative z-10">
                  <span className="neu-icon w-14 h-14 text-accent">
                    <step.icon className="w-7 h-7" strokeWidth={2} />
                  </span>
                  <span className="neu-chip text-xs font-semibold tracking-wide text-ink-soft">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-soft text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
