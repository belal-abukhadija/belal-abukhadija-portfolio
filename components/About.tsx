"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ShieldCheck, Gauge, Cpu, Users } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const principles = [
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    description: "Most tools process data directly in the browser whenever possible.",
    bgColor: "bg-vivid-yellow"
  },
  {
    icon: Gauge,
    title: "Speed first",
    description: "Lightweight interfaces and direct workflows with no unnecessary steps.",
    bgColor: "bg-hot-red"
  },
  {
    icon: Cpu,
    title: "Practical engineering",
    description: "Built around useful outcomes instead of flashy features.",
    bgColor: "bg-slate-blue"
  },
  {
    icon: Users,
    title: "Accessible to everyone",
    description: "Free tools with clean UX for developers, creators, and teams.",
    bgColor: "bg-white"
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative py-28 bg-slate-blue border-y-4 border-black overflow-hidden bg-halftone">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-14 h-2 bg-black" />
            <span className="text-xl font-black uppercase tracking-widest text-black">About</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 mb-20 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.85] font-black uppercase text-black"
            >
              I build useful
              <br />
              <span className="text-white text-stroke-sm shadow-[4px_4px_0px_0px_#000] inline-block mt-3 bg-hot-red px-2 border-4 border-black -rotate-1">
                software
              </span>
              <br />
              for real work
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-black leading-relaxed space-y-6 text-xl md:text-2xl font-bold bg-cream border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] rotate-1"
            >
              <p>
                I&apos;m {personalInfo.name}, a developer focused on practical web tools.
                I care about clarity, fast performance, and honest UX.
              </p>
              <p>
                My goal is simple: make tools that are immediately useful, reliable,
                and easy to return to.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { value: 7, suffix: "+", label: "Tools released" },
              { value: 100, suffix: "%", label: "Free access" },
              { value: 24, suffix: "/7", label: "Availability" },
              { value: 0, suffix: "", label: "Tracking required", custom: "Zero" },
            ].map((item, index) => (
              <div 
                key={item.label} 
                className={`border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col items-center justify-center text-center ${index % 2 === 0 ? 'bg-cream rotate-1' : 'bg-vivid-yellow -rotate-1'}`}
              >
                <p className="text-4xl md:text-5xl font-black text-black mb-2">
                  {item.custom ?? <AnimatedCounter target={item.value} suffix={item.suffix} />}
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-black">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 + i * 0.08 }}
                className={`border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] ${item.bgColor} hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all`}
              >
                <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000] -rotate-3">
                  <item.icon className="w-8 h-8 text-black" strokeWidth={3} />
                </div>
                <h3 className="text-black font-black text-2xl uppercase mb-4 leading-tight">{item.title}</h3>
                <p className="text-black font-semibold text-lg hover:underline underline-offset-4 decoration-4">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
