"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Target, Globe2, Compass, Rocket } from "lucide-react";
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

const traits = [
  {
    icon: Target,
    title: "Problem Solver",
    description:
      "Love turning complex, messy problems into clean and simple user experiences.",
  },
  {
    icon: Globe2,
    title: "Remote-Ready",
    description:
      "Collaborated with teams and clients across timezones, fully async or sync.",
  },
  {
    icon: Compass,
    title: "Design-Aware",
    description:
      "I care about the look just as much as the function - UI is part of the product.",
  },
  {
    icon: Rocket,
    title: "Shipping Mindset",
    description:
      "Done and live beats perfect and stuck. I push code that matters.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-28 bg-surface overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="neu-divider w-14" />
            <span className="text-sm font-medium tracking-wide text-ink-soft">
              About Me
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 mb-20 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] font-semibold tracking-tight text-ink"
            >
              Who&apos;s behind
              <br />
              <span className="text-accent">the keyboard</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-ink-soft leading-relaxed space-y-4 text-lg neu-inset p-7"
            >
              <p>
                Hey! I&apos;m {personalInfo.name}, a full-stack developer from{" "}
                {personalInfo.location}. I started coding out of curiosity and
                never stopped - there&apos;s always something new to build.
              </p>
              <p>
                I focus on fast, clean, useful software. I ship tools people
                actually come back to, and I obsess over the small details that
                make an interface feel right.
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
              { value: personalInfo.yearsOfExperience, suffix: "+", label: "Years coding" },
              { value: 25, suffix: "+", label: "Projects shipped" },
              { value: 15, suffix: "+", label: "Technologies" },
              { value: 0, suffix: "", label: "Curiosity limit", custom: "∞" },
            ].map((item) => (
              <div
                key={item.label}
                className="neu-surface p-6 flex flex-col items-center justify-center text-center"
              >
                <p className="text-4xl md:text-5xl font-semibold text-accent mb-2">
                  {item.custom ?? (
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  )}
                </p>
                <p className="text-xs font-medium tracking-wide text-ink-soft">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {traits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 + i * 0.08 }}
                className="neu-surface p-7 hover:shadow-[var(--shadow-neu-lg)] hover:-translate-y-1 transition-all"
              >
                <span className="neu-icon w-14 h-14 mb-6 text-accent">
                  <item.icon className="w-7 h-7" strokeWidth={2} />
                </span>
                <h3 className="text-lg font-semibold text-ink mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
