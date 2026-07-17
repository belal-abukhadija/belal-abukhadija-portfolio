"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Wrench } from "lucide-react";
import SectionBand from "./SectionBand";

const skills = [
  {
    number: "001",
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    description:
      "Crafting fast, responsive interfaces with modern tools and a strong eye for design.",
    icon: Monitor,
  },
  {
    number: "002",
    title: "Backend",
    tags: ["Node.js", "REST APIs", "Supabase", "SQL", "Auth"],
    description:
      "Building reliable server-side logic, APIs, and databases that scale.",
    icon: Server,
  },
  {
    number: "003",
    title: "Tools & Workflow",
    tags: ["Git", "Figma", "Docker", "VS Code", "CI/CD"],
    description:
      "Working efficiently from idea to deployment with the right tooling.",
    icon: Wrench,
  },
];

export default function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand index="03" meta="CORE STACK" word="CAPABILITIES" title="Capabilities" />

          <div className="space-y-5">
            {skills.map((skill, i) => (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden card p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 items-start transition-colors duration-200 hover:border-mint"
              >
                <span
                  className="absolute inset-0 bg-mint origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-4">
                  <span className="icon-tile w-12 h-12 shrink-0 transition-colors duration-200 group-hover:bg-bg group-hover:border-bg">
                    <skill.icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-[0.68rem] font-semibold text-mint group-hover:text-bg tracking-widest mb-1 transition-colors duration-200">
                      {skill.number}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-black tracking-tight text-ink group-hover:text-bg transition-colors duration-200">
                      {skill.title}
                    </h3>
                  </div>
                </div>
                <div className="relative">
                  <p className="text-sm text-ink-soft group-hover:text-bg/75 leading-relaxed mb-4 max-w-xl transition-colors duration-200">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="chip transition-colors duration-200 group-hover:bg-bg group-hover:border-bg group-hover:text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
