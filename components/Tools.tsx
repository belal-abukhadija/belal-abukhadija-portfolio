"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tools } from "@/lib/tools-data";
import ToolCard from "./ToolCard";

export default function Tools() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Map index to brutalist colors for alternating cards
  const neoColors = ["bg-vivid-yellow", "bg-cream", "bg-white", "bg-slate-blue", "bg-hot-red"];

  return (
    <section id="tools" className="relative py-28 bg-vivid-yellow border-y-4 border-black overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-16 border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] rotate-1">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-16 h-2 bg-black" />
              <span className="text-xl font-black uppercase tracking-widest text-black">Tool Ecosystem</span>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.85] font-black uppercase text-black"
              >
                One place ^_^<br/>
                <span className="text-white bg-black px-2 mt-6 -rotate-1 inline-block border-4 border-black shadow-[6px_6px_0px_0px_#FF6B6B]">
                  Every tool I ship.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-black font-bold text-xl leading-relaxed max-w-md bg-cream border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000] rotate-2"
              >
                Designed like a living toolkit, not a portfolio gallery.
                Browse, use, and share tools that solve real tasks quickly.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                index={index}
                bgColor={neoColors[index % neoColors.length]}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 flex justify-center"
          >
            <div className="inline-flex items-center gap-4 border-4 border-black bg-cream px-8 py-4 text-xl font-black uppercase tracking-widest text-black shadow-[6px_6px_0px_0px_#000] -rotate-1">
              <span className="w-4 h-4 border-4 border-black bg-hot-red animate-pulse" />
              More tools in production
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
