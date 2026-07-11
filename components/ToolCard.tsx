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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[tool.icon] ||
    Icons.Box;

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group block h-full"
    >
      <article className="card card-hover h-full p-6 flex flex-col relative">
        {/* index + arrow */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-xs tracking-widest text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-faint group-hover:text-amber transition-colors">
            {tool.category}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="icon-tile w-12 h-12 shrink-0 group-hover:border-amber">
            <IconComponent className="w-[22px] h-[22px]" strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink leading-tight group-hover:text-amber transition-colors">
            {tool.name}
          </h3>
        </div>

        <p className="text-sm text-ink-soft leading-relaxed flex-grow">
          {tool.description}
        </p>

        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
          <span className="font-mono text-[0.68rem] text-ink-faint truncate">
            {tool.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
          <span className="icon-tile w-9 h-9 rounded-full shrink-0 group-hover:border-amber group-hover:bg-amber group-hover:!text-[#100C05] transition-colors">
            <ArrowUpRight
              className="w-[18px] h-[18px] group-hover:rotate-45 transition-transform"
              strokeWidth={2}
            />
          </span>
        </div>
      </article>
    </motion.a>
  );
}
