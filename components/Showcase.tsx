"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Wrench } from "lucide-react";

const skills = [
  {
    title: "Frontend",
    description:
      "Crafting fast, responsive interfaces with modern tools and a strong eye for design.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    icon: Monitor,
  },
  {
    title: "Backend",
    description:
      "Building reliable server-side logic, APIs, and databases that scale.",
    tags: ["Node.js", "REST APIs", "Supabase", "SQL", "Auth"],
    icon: Server,
  },
  {
    title: "Tools & Workflow",
    description:
      "Working efficiently from idea to deployment with the right tooling.",
    tags: ["Git", "Figma", "Docker", "VS Code", "CI/CD"],
    icon: Wrench,
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-surface overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="neu-divider w-14" />
            <span className="text-sm font-medium tracking-wide text-ink-soft">
              Skills
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.06 }}
              className="text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] font-semibold tracking-tight text-ink"
            >
              What I bring
              <br />
              <span className="text-accent">to the table</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-ink-soft text-lg leading-relaxed neu-inset p-6"
            >
              Full-stack skills paired with a designer&apos;s eye. I work across
              the whole product - from database schema to polished UI.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="neu-surface p-8 transition-all duration-300 hover:shadow-[var(--shadow-neu-lg)] hover:-translate-y-1 flex flex-col"
              >
                <span className="neu-icon w-14 h-14 mb-6 text-accent">
                  <skill.icon className="w-7 h-7" strokeWidth={2} />
                </span>

                <h3 className="text-2xl font-semibold tracking-tight text-ink mb-3 leading-tight">
                  {skill.title}
                </h3>
                <p className="text-ink-soft text-base leading-relaxed mb-7 flex-grow">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="neu-chip text-xs font-medium tracking-wide text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
