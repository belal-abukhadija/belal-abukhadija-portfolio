"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects-data";
import SectionBand from "./SectionBand";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand
            meta={`${featured.length} SELECTED`}
            word="PROJECTS"
            title="Projects"
          />

          <p className="max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed mb-12">
            Nearly every project here started the same way: something at work was
            slow, manual, or missing, so I built the thing that fixed it. One of
            them is just a chess board, because some problems are worth having.
          </p>

          <div className="mb-16">
            {featured.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
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
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-ink mb-4 group-hover:text-mint transition-colors">
                    {project.name}
                  </h3>

                  {project.problem ? (
                    <>
                      <div className="border-l border-line-strong pl-4 mb-5">
                        <p className="font-display text-[0.62rem] font-semibold uppercase tracking-widest text-mint mb-1.5">
                          The problem
                        </p>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="border-l border-line-strong pl-4 mb-6">
                        <p className="font-display text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint mb-1.5">
                          What I built
                        </p>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="border-l border-line-strong pl-4 mb-6">
                      <p className="font-display text-[0.62rem] font-semibold uppercase tracking-widest text-mint mb-1.5">
                        Built for fun
                      </p>
                      <p className="text-sm text-ink-soft leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.facts?.map((fact) => (
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
                    src={project.screenshot!}
                    alt={`${project.name} screenshot`}
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
            <p className="eyebrow">+ {rest.length} more projects live on belal.work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
            {rest.map((project, i) => (
              <div key={project.name} className="bg-bg border-b border-r border-line">
                <ProjectCard
                  project={project}
                  index={featured.length + i}
                  hovered={hoveredProject === i}
                  onHoverStart={() => setHoveredProject(i)}
                  onHoverEnd={() => setHoveredProject(null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
