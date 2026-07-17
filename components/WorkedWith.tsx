"use client";

import { workedWith } from "@/lib/tools-data";

export default function WorkedWith() {
  return (
    <section aria-label="Companies I've worked with" className="relative bg-paper py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-paper-ink/55 mb-8">
          Companies I&apos;ve worked with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          {workedWith.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl sm:text-3xl font-black tracking-tight text-paper-ink/75 hover:text-paper-ink transition-colors"
            >
              {company.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
