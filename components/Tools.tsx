"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tools } from "@/lib/tools-data";
import ToolCard from "./ToolCard";

export default function Tools() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="tools" className="relative py-28 bg-surface-950 overflow-hidden">
      <div className="absolute top-16 left-[6%] w-56 h-56 rounded-full bg-accent-400/10 blur-[110px]" />
      <div className="absolute bottom-8 right-[4%] w-64 h-64 rounded-full bg-primary-300/12 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-14 section-frame panel-cut p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-gradient-to-r from-primary-300 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-200">Tool Ecosystem</span>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-4xl md:text-6xl lg:text-[4.1rem] leading-[0.92] font-display text-white"
              >
                One place.
                <br />
                <span className="gradient-text">Every useful tool I ship.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-white/60 leading-relaxed max-w-md"
              >
                Designed like a living toolkit, not a portfolio gallery.
                Browse, use, and share tools that solve real tasks quickly.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14"
          >
            <div className="panel-cut inline-flex items-center gap-2 border border-primary-300/45 bg-primary-300/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-primary-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-pulse-soft" />
              More tools currently in production
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
