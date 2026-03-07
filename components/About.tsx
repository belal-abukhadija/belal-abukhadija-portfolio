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
  },
  {
    icon: Gauge,
    title: "Speed first",
    description: "Lightweight interfaces and direct workflows with no unnecessary steps.",
  },
  {
    icon: Cpu,
    title: "Practical engineering",
    description: "Built around useful outcomes instead of flashy features.",
  },
  {
    icon: Users,
    title: "Accessible to everyone",
    description: "Free tools with clean UX for developers, creators, and teams.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative py-28 bg-surface-900/70 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_55%,rgba(182,255,0,0.09),transparent)]" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-14 h-px bg-gradient-to-r from-primary-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary-200">About</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl md:text-6xl leading-[0.94] font-display text-white"
            >
              I build useful software
              <br />
              <span className="gradient-text">for real daily work</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-white/62 leading-relaxed space-y-4"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
          >
            {[
              { value: 7, suffix: "+", label: "Tools released" },
              { value: 100, suffix: "%", label: "Free access" },
              { value: 24, suffix: "/7", label: "Availability" },
              { value: 0, suffix: "", label: "Tracking required", custom: "Zero" },
            ].map((item) => (
              <div key={item.label} className="panel-cut section-frame p-5">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1">
                  {item.custom ?? <AnimatedCounter target={item.value} suffix={item.suffix} />}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 + i * 0.08 }}
                className="panel-cut section-frame p-5"
              >
                <div className="w-10 h-10 rounded-lg border border-primary-300/40 bg-primary-300/15 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary-200" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
