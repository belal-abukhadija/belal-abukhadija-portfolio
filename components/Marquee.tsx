"use client";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Web Tools",
  "Privacy-first",
  "Performance",
  "UX Systems",
];

const FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

export default function Marquee() {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <section className="relative overflow-hidden select-none w-full py-6 border-y border-line bg-panel/40">
      <div
        className="overflow-hidden flex items-center"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      >
        <div
          className="flex whitespace-nowrap animate-marquee"
          style={{ willChange: "transform" }}
        >
          {doubled.map((skill, i) => (
            <div key={`a-${i}`} className="flex items-center">
              <span className="mx-6 font-display text-xl md:text-2xl font-medium tracking-tight text-ink-soft">
                {skill}
              </span>
              <span className="font-display text-xl md:text-2xl text-amber">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
