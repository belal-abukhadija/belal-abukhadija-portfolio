"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import LoopBackgroundVideo from "./LoopBackgroundVideo";

const stats = [
  { value: "11", label: "tools shipped" },
  { value: `${personalInfo.yearsOfExperience}+`, label: "years coding" },
  { value: "∞", label: "remote-ready" },
];

export default function Hero() {
  // Render the background video only on the client, after mount. This keeps it
  // out of the server HTML so a browser extension mutating the <video> can never
  // cause a hydration mismatch, and improves LCP. Entrance animations are pure
  // CSS (see .rise in globals.css) so hero content is never hidden behind JS.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
    >
      {/* Background video (client-only, seamless crossfade loop) */}
      {mounted && (
        <div className="absolute inset-0 motion-safe:animate-[fadeIn_1.4s_ease]">
          <LoopBackgroundVideo src="/fif.mp4" fade={1.2} />
        </div>
      )}

      {/* Legibility scrims: even darken + soft radial behind the centered type */}
      <div className="absolute inset-0 bg-bg/45" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_58%_50%_at_50%_46%,rgba(11,10,8,0.62),transparent_72%)]" />
      <div className="absolute inset-x-0 top-0 h-28 [background:linear-gradient(to_bottom,var(--color-bg),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 [background:linear-gradient(to_top,var(--color-bg),transparent)]" />

      {/* Viewfinder corner brackets (precision-instrument framing) */}
      <div className="pointer-events-none absolute inset-5 sm:inset-8 z-10 hidden sm:block">
        <span className="absolute top-16 left-0 h-7 w-7 border-l border-t border-amber/35" />
        <span className="absolute top-16 right-0 h-7 w-7 border-r border-t border-amber/35" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-l border-b border-amber/35" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-r border-b border-amber/35" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 pt-28 pb-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="rise rise-1 font-display font-semibold tracking-tight text-ink leading-[0.98] text-[clamp(1.65rem,6.6vw,5rem)]">
            <span className="whitespace-nowrap">Full-stack developer</span>
            <br />
            who ships <span className="accent-word">real projects</span>.
          </h1>

          <p className="rise rise-2 mx-auto mt-8 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
            {personalInfo.description}
          </p>

          <div className="rise rise-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => scrollTo("tools")} className="btn-primary group">
              View the tools
              <ArrowRight
                className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform"
                strokeWidth={2}
              />
            </button>
            <a href={`mailto:${personalInfo.email}`} className="btn-ghost">
              <Mail className="w-[18px] h-[18px]" strokeWidth={1.75} />
              Hire me
            </a>
          </div>
        </div>
      </div>

      {/* Full-width instrument bar: centered stats */}
      <div className="rise rise-4 relative z-10 border-t border-line/70">
        <div className="container mx-auto px-4 sm:px-6">
          <dl className="max-w-6xl mx-auto py-5 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dt className="font-display text-xl md:text-2xl font-semibold text-amber">
                  {s.value}
                </dt>
                <dd className="font-mono text-[0.64rem] uppercase tracking-widest text-ink-faint">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
