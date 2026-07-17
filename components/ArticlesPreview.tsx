"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionBand from "./SectionBand";
import type { ArticleSummary } from "@/lib/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ArticlesPreview({ articles }: { articles: ArticleSummary[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="articles" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <SectionBand
            index="02"
            meta={`${articles.length} LIVE`}
            word="RECENT ARTICLES"
            title="Recent articles"
          />

          <div className="space-y-5">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="group relative block overflow-hidden rounded-[28px] border border-line px-6 py-7 sm:px-9 sm:py-8 transition-colors duration-200 hover:border-mint"
                >
                  <span
                    className="absolute inset-0 bg-mint origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-4 mb-5">
                    <div className="flex flex-col gap-0.5 font-display text-[0.68rem] font-bold uppercase tracking-widest text-mint group-hover:text-bg transition-colors duration-200">
                      <span>{String(i + 1).padStart(3, "0")}</span>
                      <span className="text-ink-faint group-hover:text-bg/70 font-semibold transition-colors duration-200">
                        {formatDate(article.date)}
                      </span>
                      {article.part && (
                        <span className="text-ink-faint group-hover:text-bg/70 font-semibold transition-colors duration-200">
                          {article.part}
                        </span>
                      )}
                      <span className="text-ink-faint group-hover:text-bg/70 font-semibold transition-colors duration-200">
                        {article.readingTime}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 font-display text-[0.68rem] font-bold uppercase tracking-widest text-ink-faint group-hover:text-bg transition-colors duration-200 shrink-0">
                      Read
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="relative font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-ink group-hover:text-bg transition-colors duration-200 mb-3">
                    {article.title}
                  </h3>
                  <p className="relative text-sm sm:text-base text-ink-soft group-hover:text-bg/75 transition-colors duration-200 leading-relaxed max-w-2xl">
                    {article.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/articles" className="btn-ghost">
              All articles
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
