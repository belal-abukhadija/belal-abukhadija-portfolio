import type { CSSProperties } from "react";
import Link from "next/link";
import { personalInfo, experience } from "@/lib/projects-data";
import Strike from "./Strike";

// The word the pen crosses out in the hero line.
const STRUCK = "problems";

export default function Hero() {
  const [first, ...rest] = personalInfo.name.split(" ");
  const last = rest.join(" ");
  const [before, after] = personalInfo.heroLine.split(STRUCK);
  // Keep punctuation that follows the struck word on the same line as it.
  const trailing = after?.match(/^\S*/)?.[0] ?? "";
  const current = experience[0];

  return (
    <section id="hero" className="gutter min-h-svh flex flex-col pt-24 pb-8 md:pb-10">
      <p className="text-lg md:text-xl font-medium">
        {personalInfo.headline} and {personalInfo.title}, {personalInfo.location}
      </p>

      <h1 className="name my-auto py-8">
        <span className="name-first after-strike" style={{ "--strike-delay": "0.05s" } as CSSProperties}>
          {first}
        </span>
        <span className="name-last after-strike" style={{ "--strike-delay": "0.18s" } as CSSProperties}>
          {last}
        </span>
      </h1>

      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
        <p className="lg:col-span-7 font-medium leading-[1.08] tracking-tight text-[clamp(1.7rem,3.4vw,3.25rem)] max-w-[26ch]">
          {after === undefined ? (
            personalInfo.heroLine
          ) : (
            <>
              {before}
              <span className="whitespace-nowrap">
                <Strike>{STRUCK}</Strike>
                {trailing}
              </span>
              {after.slice(trailing.length)}
            </>
          )}
        </p>

        <div className="lg:col-span-5">
          <p className="text-lg max-w-[40ch] mb-6">
            Currently {current.role} at {current.company}. Open to roles and
            freelance work, remote worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#contact" className="btn">
              Get in touch
            </Link>
            <Link href="/#about" className="link font-bold">
              More about me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
