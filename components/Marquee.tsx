"use client";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Web Tools",
  "Privacy-first",
  "Open Source",
  "Performance",
  "UX Systems",
];

export default function Marquee() {
  const doubled = [...skills, ...skills];

  return (
    <section className="relative py-12 bg-surface-950 overflow-hidden select-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="panel-cut border-y border-white/[0.12] bg-white/[0.03] py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((skill, i) => (
            <span
              key={`a-${i}`}
              className="mx-5 text-2xl md:text-4xl font-display text-transparent"
              style={{ WebkitTextStroke: "1px rgba(246,249,255,0.22)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="panel-cut mt-3 border-y border-primary-300/40 bg-primary-300/10 py-3">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {doubled.map((skill, i) => (
            <span key={`b-${i}`} className="mx-5 text-sm md:text-base uppercase tracking-[0.25em] text-primary-100/90">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
