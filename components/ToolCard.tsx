"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tool } from "@/lib/tools-data";

interface ToolCardProps {
  tool: Tool;
  index: number;
  hovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ToolCard({ tool, index, hovered, onHoverStart, onHoverEnd }: ToolCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block h-full p-6 md:p-7"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="tool-hover-highlight"
            className="absolute inset-0 border border-mint bg-mint/[0.07]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      <article className="relative h-full flex flex-col">
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-display text-xs font-bold text-mint tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-[0.6rem] font-semibold uppercase tracking-widest text-ink-faint">
            {tool.category}
          </span>
        </div>

        <h3 className="font-display text-xl font-black tracking-tight text-ink leading-tight mb-3">
          {tool.name}
        </h3>

        <p className="text-sm text-ink-soft leading-relaxed flex-grow mb-6">
          {tool.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft group-hover:text-mint transition-colors">
          {tool.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" strokeWidth={2} />
        </span>
      </article>
    </motion.a>
  );
}
