"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Wrench } from "lucide-react";

const skills = [
  {
    title: "Frontend",
    description: "Crafting fast, responsive interfaces with modern tools and a strong eye for design.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    icon: Monitor,
    color: "bg-vivid-yellow"
  },
  {
    title: "Backend",
    description: "Building reliable server-side logic, APIs, and databases that scale.",
    tags: ["Node.js", "REST APIs", "Supabase", "SQL", "Auth"],
    icon: Server,
    color: "bg-slate-blue"
  },
  {
    title: "Tools & Workflow",
    description: "Working efficiently from idea to deployment with the right tooling.",
    tags: ["Git", "Figma", "Docker", "VS Code", "CI/CD"],
    icon: Wrench,
    color: "bg-cream"
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative py-28 bg-hot-red border-y-4 border-black overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-14 h-2 bg-black" />
            <span className="text-xl font-black uppercase tracking-widest text-black">Skills</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.06 }}
              className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.85] font-black uppercase text-black"
            >
              What I bring
              <br />
              <span className="bg-white text-black px-2 mt-3 inline-block border-4 border-black shadow-[4px_4px_0px_0px_#000] rotate-1">
                to the table
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-white text-xl font-bold leading-relaxed bg-black border-4 border-black p-6 shadow-[6px_6px_0px_0px_#FFD93D] -rotate-1"
            >
              Full-stack skills paired with a designer&apos;s eye. I work across the whole product -
              from database schema to polished UI.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] ${skill.color} hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all flex flex-col`}
              >
                <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
                  <skill.icon className="w-8 h-8 text-black" strokeWidth={3} />
                </div>

                <h3 className="text-3xl font-black uppercase text-black mb-4 leading-tight">{skill.title}</h3>
                <p className="text-black font-bold text-lg leading-relaxed mb-8 flex-grow">{skill.description}</p>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="border-4 border-black bg-white px-3 py-1 text-sm font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_0px_#000]">
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
