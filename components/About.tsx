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
    title: "Problem solver",
    description:
      "I turn complex, messy problems into clean and simple user experiences.",
  },
  {
    icon: Globe2,
    title: "Remote-ready",
    description:
      "Collaborated with teams and clients across timezones, fully async or sync.",
  },
  {
    icon: Compass,
    title: "Design-aware",
    description:
      "I care about the look as much as the function. UI is part of the product.",
  },
  {
    icon: Rocket,
    title: "Shipping mindset",
    description:
      "Done and live beats perfect and stuck. I push code that matters.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            About me
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 mb-16 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] font-semibold tracking-tight text-ink"
            >
              Who&apos;s behind
              <br />
              <span className="accent-word">the keyboard</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-ink-soft leading-relaxed space-y-4"
            >
              <p>
                Hey! I&apos;m {personalInfo.name}, a full-stack developer from{" "}
                {personalInfo.location}. I started coding out of curiosity and
                never stopped. There&apos;s always something new to build.
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { value: personalInfo.yearsOfExperience, suffix: "+", label: "Years coding" },
              { value: 25, suffix: "+", label: "Projects shipped" },
              { value: 15, suffix: "+", label: "Technologies" },
              { value: 0, suffix: "", label: "Curiosity limit", custom: "∞" },
            ].map((item) => (
              <div
                key={item.label}
                className="card p-6 flex flex-col items-center justify-center text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-semibold text-amber mb-2">
                  {item.custom ?? (
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  )}
                </p>
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-faint">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {traits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 + i * 0.08 }}
                className="card card-hover p-6"
              >
                <span className="icon-tile w-12 h-12 mb-5">
                  <item.icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-base font-semibold text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
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
