"use client";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Web Tools",
  "Privacy-first",
  "Performance",
  "UX Systems",
];

const FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)";

export default function Marquee() {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <section className="relative bg-surface overflow-hidden select-none w-full py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div
            className="neu-inset py-5 overflow-hidden flex items-center"
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
          >
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: "marquee 38s linear infinite",
                willChange: "transform",
              }}
            >
              {doubled.map((skill, i) => (
                <div key={`a-${i}`} className="flex items-center">
                  <span className="mx-8 text-3xl md:text-5xl font-semibold tracking-tight text-ink">
                    {skill}
                  </span>
                  <span className="text-3xl md:text-5xl font-semibold text-accent">
                    ·
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="neu-surface py-4 overflow-hidden flex items-center"
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
          >
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: "marquee-reverse 38s linear infinite",
                willChange: "transform",
              }}
            >
              {doubled.map((skill, i) => (
                <div key={`b-${i}`} className="flex items-center">
                  <span className="mx-6 text-base md:text-lg font-medium tracking-wide text-ink-soft">
                    {skill}
                  </span>
                  <span className="text-base md:text-lg font-medium text-accent">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
