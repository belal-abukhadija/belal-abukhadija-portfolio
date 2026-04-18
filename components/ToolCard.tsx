"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Tool } from "@/lib/tools-data";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[tool.icon] ||
    Icons.Box;

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group block h-full"
    >
      <div className="h-full neu-surface p-7 transition-all duration-300 hover:shadow-[var(--shadow-neu-lg)] hover:-translate-y-1 relative flex flex-col">
        {tool.category && (
          <div className="absolute -top-3 right-5 neu-chip px-3 py-1 text-[10px] font-semibold tracking-wide uppercase text-ink-soft">
            {tool.category}
          </div>
        )}

        <div className="mb-7 flex items-start justify-between gap-3">
          <span className="neu-inset px-3 py-1 text-[11px] font-semibold tracking-widest text-ink-soft rounded-full">
            No.0{index + 1}
          </span>
          <span className="neu-icon-round w-11 h-11 text-accent group-hover:shadow-[var(--shadow-neu-inset)] transition-shadow">
            <ArrowUpRight
              className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2}
            />
          </span>
        </div>

        <div className="mb-6 flex items-center gap-5">
          <span className="neu-icon w-14 h-14 text-accent group-hover:shadow-[var(--shadow-neu-lg)] transition-shadow">
            <IconComponent className="w-6 h-6" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-ink leading-tight group-hover:text-accent transition-colors">
              {tool.name}
            </h3>
          </div>
        </div>

        <p className="text-base text-ink-soft leading-relaxed mt-auto">
          {tool.description}
        </p>
      </div>
    </motion.a>
  );
}
