import Image from "next/image";
import { personalInfo } from "@/lib/tools-data";

export default function Hero() {
  const [first, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
    >
      {/* Full-bleed halftone texture plate (supplied asset, not generated) */}
      <div className="absolute inset-0 hero-static" aria-hidden="true" />

      {/* Portrait, right-anchored — not centered — fading into the texture on its left edge */}
      <div
        className="absolute inset-y-0 right-0 w-[78%] sm:w-[65%] md:w-[54%] lg:w-[46%] [mask-image:linear-gradient(to_left,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_55%,transparent_100%)]"
        aria-hidden="true"
      >
        <Image
          src="/mee.png"
          alt=""
          fill
          priority
          className="object-cover object-[62%_18%] blur-[2px] scale-[1.02]"
        />
      </div>

      <div className="absolute inset-0 [background:linear-gradient(100deg,var(--color-bg)_0%,rgba(14,14,14,0.8)_32%,rgba(14,14,14,0.35)_58%,rgba(14,14,14,0.15)_78%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-28 [background:linear-gradient(to_bottom,var(--color-bg),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 [background:linear-gradient(to_top,var(--color-bg),transparent)]" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 lg:px-10 pt-32 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <p className="rise rise-1 eyebrow mb-3">{personalInfo.headline}</p>
          <p className="rise rise-1 font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft mb-8">
            Full-Stack Development · Browser Tools · Practical AI
          </p>

          <h1 className="rise rise-2 font-display font-black uppercase tracking-tight text-ink leading-[0.86] text-[clamp(3rem,13vw,8.5rem)]">
            {first}
            <br />
            <span className="text-mint">{lastName || first}.</span>
          </h1>

          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              `${personalInfo.yearsOfExperience}+ years shipping code`,
              `Based in ${personalInfo.location}`,
              "Open to remote work, worldwide",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 font-display text-[0.7rem] sm:text-xs font-semibold uppercase tracking-widest text-ink-soft">
                <span className="w-1.5 h-1.5 bg-mint shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rise rise-4 relative z-10 border-t border-line/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
            <p className="text-sm text-ink-soft max-w-md hidden sm:block">
              {personalInfo.description}
            </p>
            <span className="font-display text-[0.68rem] font-semibold uppercase tracking-widest text-ink-faint ml-auto">
              ▼ Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
