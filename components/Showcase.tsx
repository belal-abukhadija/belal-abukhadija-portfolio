"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Workflow } from "lucide-react";

const projects = [
  {
    title: "Tool ecosystem",
    description: "A connected set of utility products under one clear system.",
    tags: ["Next.js", "TypeScript", "Design System"],
    icon: Workflow,
  },
  {
    title: "Privacy-focused flows",
    description: "Client-side processing patterns that reduce data exposure.",
    tags: ["Security", "Client-side", "Trust"],
    icon: Shield,
  },
  {
    title: "Performance-first UX",
    description: "Fast interactions tuned for real usage, not demos.",
    tags: ["Speed", "UX", "Optimization"],
    icon: Zap,
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative py-28 bg-surface-900/70 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(182,255,0,0.1),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-14 h-px bg-gradient-to-r from-primary-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary-200">Showcase</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.06 }}
              className="text-4xl md:text-6xl leading-[0.94] font-display text-white"
            >
              What defines my work
              <br />
              <span className="gradient-text">beyond visual style</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="text-white/60 leading-relaxed"
            >
              Each release is built to be useful in production, understandable at first glance,
              and maintainable as the toolkit grows.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4 }}
                className="panel-cut section-frame p-7"
              >
                <div className="w-11 h-11 rounded-lg border border-primary-300/40 bg-primary-300/15 flex items-center justify-center mb-5">
                  <project.icon className="w-5 h-5 text-primary-200" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-white/56 leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="panel-cut border border-white/[0.14] bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/66">
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
