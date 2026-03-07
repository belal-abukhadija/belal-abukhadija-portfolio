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
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[tool.icon] ||
    Icons.Box;

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group block h-full"
    >
      <div className="panel-cut section-frame h-full p-6 transition-all duration-400 hover:-translate-y-1 hover:border-primary-300/55">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="panel-cut border border-white/[0.12] bg-white/[0.03] px-3 py-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="w-9 h-9 rounded-md border border-white/[0.12] bg-white/[0.03] flex items-center justify-center group-hover:border-primary-300/70 group-hover:bg-primary-300/15 transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-primary-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4">
          <div className={`panel-cut w-14 h-14 bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-soft`}>
            <IconComponent className="w-6 h-6 text-surface-950" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-primary-200 transition-colors duration-300">
              {tool.name}
            </h3>
            {tool.category && (
              <span className="text-[10px] uppercase tracking-[0.18em] text-accent-200/85">
                {tool.category}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-white/58">{tool.description}</p>
      </div>
    </motion.a>
  );
}
