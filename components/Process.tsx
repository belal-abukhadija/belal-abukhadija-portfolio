"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PencilRuler, Code2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Find repetitive tasks and friction points worth solving.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description: "Shape a focused interface that keeps the workflow obvious.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Ship",
    description: "Build, test, and release fast with performance in mind.",
    icon: Code2,
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(21,206,255,0.1),transparent)]" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-14 h-px bg-gradient-to-r from-primary-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary-200">Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-6xl leading-[0.94] font-display text-white mb-12"
          >
            A focused workflow
            <br />
            <span className="text-white/45">from problem to product</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="panel-cut section-frame p-7"
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="w-11 h-11 rounded-lg border border-accent-300/40 bg-accent-400/12 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-accent-200" />
                  </div>
                  <span className="text-xs tracking-[0.16em] text-white/35">{step.number}</span>
                </div>

                <h3 className="text-2xl text-white mb-2 font-semibold">{step.title}</h3>
                <p className="text-white/58 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
