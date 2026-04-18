"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tools } from "@/lib/tools-data";
import ToolCard from "./ToolCard";

export default function Tools() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="tools"
      className="relative py-28 bg-surface overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            ref={headerRef}
            className="mb-16 neu-surface-xl p-8 md:p-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="neu-divider w-16" />
              <span className="text-sm font-medium tracking-wide text-ink-soft">
                Tool Ecosystem
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-4xl md:text-6xl lg:text-[4.5rem] leading-[0.95] font-semibold tracking-tight text-ink"
              >
                One place for
                <br />
                <span className="text-accent">every tool I ship.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-ink-soft text-lg leading-relaxed max-w-md neu-inset p-5"
              >
                Designed like a living toolkit, not a portfolio gallery.
                Browse, use, and share tools that solve real tasks quickly.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 flex justify-center"
          >
            <div className="neu-chip px-6 py-3 text-sm font-semibold tracking-wide text-ink">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-3" />
              More tools in production
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
