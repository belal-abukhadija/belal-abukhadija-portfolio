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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="eyebrow mb-6"
              >
                Capabilities
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.06 }}
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[0.98]"
              >
                What I bring
                <br />
                <span className="accent-word">to the table</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="text-ink-soft leading-relaxed max-w-sm lg:text-right"
            >
              Full-stack skills paired with a designer&apos;s eye, from database
              schema to polished UI.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {skills.map((skill, i) => (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                className="card card-hover p-7 flex flex-col"
              >
                <span className="icon-tile w-12 h-12 mb-6">
                  <skill.icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink mb-3">
                  {skill.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-6 flex-grow">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="chip">
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
