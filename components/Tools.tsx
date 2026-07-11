"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tools } from "@/lib/tools-data";
import ToolCard from "./ToolCard";

export default function Tools() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="mb-14 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="eyebrow mb-6"
              >
                The toolkit
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.06 }}
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[0.98]"
              >
                Everything I&apos;ve
                <br />
                shipped, <span className="accent-word">in one place</span>.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="text-ink-soft leading-relaxed max-w-sm lg:text-right"
            >
              A living suite of free, privacy-first browser tools on{" "}
              <span className="font-mono text-amber">belal.work</span>, used by
              developers and creators worldwide.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              More tools in production
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
