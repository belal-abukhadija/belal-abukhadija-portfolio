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
    color: "bg-vivid-yellow"
  },
  {
    number: "02",
    title: "Design",
    description: "Shape a focused interface that keeps the workflow obvious.",
    icon: PencilRuler,
    color: "bg-hot-red"
  },
  {
    number: "03",
    title: "Ship",
    description: "Build, test, and release fast with performance in mind.",
    icon: Code2,
    color: "bg-slate-blue"
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-cream border-y-4 border-black overflow-hidden bg-halftone">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-16 h-2 bg-black" />
            <span className="text-xl font-black uppercase tracking-widest text-black">Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.85] font-black uppercase text-black mb-16"
          >
            A focused workflow
            <br />
            <span className="bg-black text-white px-2 mt-3 inline-block -rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_#FF6B6B]">
              problem to product
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                className={`border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] bg-white relative hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all flex flex-col ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
              >
                {/* Huge Background Number */}
                <div className="absolute top-4 right-4 text-7xl font-black text-stroke-sm opacity-20 select-none pointer-events-none">
                  {step.number}
                </div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 border-4 border-black ${step.color} flex items-center justify-center shadow-[4px_4px_0px_0px_#000]`}>
                    <step.icon className="w-8 h-8 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-xl font-black px-3 py-1 border-4 border-black bg-white shadow-[2px_2px_0px_0px_#000]">{step.number}</span>
                </div>

                <h3 className="text-3xl font-black uppercase text-black mb-4">{step.title}</h3>
                <p className="text-black font-bold text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
