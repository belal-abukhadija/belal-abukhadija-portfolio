"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Globe2, Lightbulb, TrendingUp } from "lucide-react";
import { personalInfo, experience, toolkit } from "@/lib/tools-data";
import SectionBand from "./SectionBand";
import ToolkitIcon from "./ToolkitIcon";

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

const foundations = [
  {
    title: "Problem solver",
    description: "I turn complex, messy problems into clean and simple user experiences.",
  },
  {
    title: "Remote-ready",
    description: "Collaborated with teams and clients across timezones, fully async or sync.",
  },
  {
    title: "Design-aware",
    description: "I care about the look as much as the function. UI is part of the product.",
  },
  {
    title: "Shipping mindset",
    description: "Done and live beats perfect and stuck. I push code that matters.",
  },
];

const journey = [
  {
    icon: Lightbulb,
    title: "The beginning",
    period: "[2021]",
    description:
      "Wrote my first lines of code, fell in love with the craft, and started building small tools to solve everyday problems.",
  },
  {
    icon: TrendingUp,
    title: "Leveling up",
    period: "[2022–2023]",
    description:
      "Went deep on React, TypeScript, and full-stack patterns. Shipped multiple live projects and started freelancing.",
  },
  {
    icon: Globe2,
    title: "Building in public",
    period: "[2024—]",
    description:
      "Launched belal.work, a growing suite of free, independent web tools used by developers and creators worldwide.",
  },
];

const stats = [
  { value: personalInfo.yearsOfExperience, suffix: "+", label: "Years coding" },
  { value: 25, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 0, suffix: "", label: "Curiosity limit", custom: "∞" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand index="04" meta="CAREER" word="ABOUT ME" title="About me" />

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-mint mb-6">
                {personalInfo.location.toUpperCase()}
              </p>
              <p className="text-ink-soft leading-relaxed space-y-4 text-base md:text-lg">
                Hey, I&apos;m {personalInfo.name} — a full-stack developer from{" "}
                {personalInfo.location}. I started coding out of curiosity and never
                stopped. I focus on fast, clean, useful software: tools people
                actually come back to, built with an obsessive eye for the small
                details that make an interface feel right.
              </p>

              <div className="mt-8 space-y-2 font-display text-xs font-semibold uppercase tracking-widest text-ink-faint">
                <p>
                  Location — <span className="text-ink">{personalInfo.location}</span>
                </p>
                <p>
                  Relocation — <span className="text-ink">Open, remote-first</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-x-8 gap-y-6"
            >
              {stats.map((item, i) => (
                <div
                  key={item.label}
                  className={[
                    i % 2 === 1 ? "border-l border-line pl-8" : "",
                    i >= 2 ? "border-t border-line pt-6" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="font-display text-4xl md:text-5xl font-black text-mint mb-1">
                    {item.custom ?? <AnimatedCounter target={item.value} suffix={item.suffix} />}
                  </p>
                  <p className="font-display text-[0.65rem] font-semibold uppercase tracking-widest text-ink-faint">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Work experience */}
          <div className="mb-16">
            <p className="eyebrow mb-6">Work experience</p>
            <div className="border-t border-line">
              {experience.map((job, i) => (
                <motion.a
                  key={job.company}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-wrap items-baseline justify-between gap-2 py-5 border-b border-line hover:border-mint transition-colors"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-lg md:text-xl font-black tracking-tight text-ink group-hover:text-mint transition-colors">
                      {job.company}
                    </span>
                    <span className="text-sm text-ink-soft">{job.role}</span>
                  </div>
                  <span className="font-display text-xs font-semibold tracking-widest text-mint">
                    {job.period}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Journey / self-directed learning */}
          <div className="mb-16">
            <p className="eyebrow mb-6">Self-directed learning</p>
            <div className="relative grid md:grid-cols-3 gap-5">
              <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-line" />
              {journey.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 26 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-4 relative">
                    <span className="relative z-10 icon-tile w-12 h-12 bg-bg">
                      <step.icon className="w-[20px] h-[20px]" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-sm font-semibold tracking-widest text-mint">
                      {step.period}
                    </span>
                  </div>
                  <div className="card p-6">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core foundations */}
          <div className="mb-16">
            <p className="eyebrow mb-6">Core foundations</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {foundations.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card card-hover p-6"
                >
                  <p className="font-display text-[0.68rem] font-semibold text-mint tracking-widest mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-base font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Toolkit */}
          <div>
            <p className="eyebrow mb-6">My toolkit</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
              {toolkit.map((item) => (
                <div key={item.name} className="bg-bg p-6 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-4 h-7">
                    {item.icons.map((slug) => (
                      <ToolkitIcon key={slug} slug={slug} size={26} />
                    ))}
                  </div>
                  <p className="font-display text-sm font-bold text-ink mb-1">{item.name}</p>
                  <p className="font-display text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint">
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
