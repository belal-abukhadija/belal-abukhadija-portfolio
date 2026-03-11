"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Tool } from "@/lib/tools-data";

interface ToolCardProps {
  tool: Tool;
  index: number;
  bgColor: string;
}

export default function ToolCard({ tool, index, bgColor }: ToolCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string, strokeWidth?: number }>>)[tool.icon] ||
    Icons.Box;

  // Alternate small rotations for a chaotic collage feel
  const rotation = index % 2 === 0 ? "rotate-1" : "-rotate-1";

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group block h-full transform ${rotation}`}
    >
      <div className={`h-full border-4 border-black ${bgColor} p-6 transition-all duration-300 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:translate-x-1 hover:shadow-[12px_12px_0px_0px_#000] relative flex flex-col`}>
        
        {/* Category Sticker */}
        {tool.category && (
          <div className="absolute -top-4 -right-4 border-4 border-black bg-white px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] rotate-6 z-10 group-hover:rotate-12 transition-transform">
            {tool.category}
          </div>
        )}

        <div className="mb-8 flex items-start justify-between gap-3">
          <div className="border-4 border-black bg-black text-white px-3 py-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-sm font-black uppercase tracking-widest">
              No.0{index + 1}
            </span>
          </div>
          <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center group-hover:bg-hot-red transition-colors duration-300 shadow-[4px_4px_0px_0px_#000]">
            <ArrowUpRight className="w-6 h-6 text-black group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" strokeWidth={3} />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-5">
          <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#000] -rotate-3 group-hover:rotate-6 transition-transform duration-300">
            <IconComponent className="w-8 h-8 text-black" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase text-black leading-tight group-hover:underline underline-offset-4 decoration-4">
              {tool.name}
            </h3>
          </div>
        </div>

        <p className="text-lg font-bold text-black border-t-4 border-black pt-4 mt-auto">
          {tool.description}
        </p>
      </div>
    </motion.a>
  );
}
