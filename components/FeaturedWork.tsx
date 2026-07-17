"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/tools-data";
import SectionBand from "./SectionBand";
import ToolCard from "./ToolCard";

export default function FeaturedWork() {
  const featured = tools.filter((t) => t.featured);
  const rest = tools.filter((t) => !t.featured);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand
            index="01"
            meta={`${featured.length} PROJECTS`}
            word="FEATURED WORK"
            title="Featured work"
          />

          <div className="mb-16">
            {featured.map((tool, i) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ top: `${88 + i * 20}px`, zIndex: i + 1 }}
                className="group sticky mb-5 grid md:grid-cols-2 card card-hover overflow-hidden p-3 md:p-6 md:gap-8"
              >
                <div className="pt-4 pb-1 md:p-0 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink-faint mb-4">
                    <span>{tool.category}</span>
                    <span>·</span>
                    <span>{tool.year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-ink mb-4 group-hover:text-mint transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-6">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.facts?.map((fact) => (
                      <span key={fact} className="chip">
                        {fact}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-mint mt-auto">
                    Visit site
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" strokeWidth={2} />
                  </span>
                </div>
                <div className="relative min-h-[200px] md:min-h-[340px] rounded-xl border-2 border-line-strong order-1 md:order-2 overflow-hidden">
                  <Image
                    src={tool.screenshot!}
                    alt={`${tool.name} screenshot`}
                    fill
                    className="object-cover object-top grayscale-[0.15] group-hover:grayscale-0 transition-all duration-300"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-ink/40" />
                  <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-ink/40" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mb-6">
            <p className="eyebrow">+ {rest.length} more tools shipped on belal.work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {rest.map((tool, i) => (
              <div key={tool.name} className="bg-bg">
                <ToolCard
                  tool={tool}
                  index={featured.length + i}
                  hovered={hoveredTool === i}
                  onHoverStart={() => setHoveredTool(i)}
                  onHoverEnd={() => setHoveredTool(null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
