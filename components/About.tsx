import { personalInfo, experience, toolkit } from "@/lib/projects-data";

const stack = [
  { area: "Frontend", items: "React, Next.js, TypeScript, Tailwind" },
  { area: "Backend", items: "Node.js, REST APIs, Supabase, SQL, auth" },
  { area: "Shipping", items: "Git, Docker, CI/CD" },
];

export default function About() {
  const firstName = personalInfo.name.split(" ")[0];

  return (
    <section id="about" className="gutter py-24 md:py-36">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <h2 className="display size-title lg:col-span-5 lg:sticky lg:top-24">
          Hi, I&apos;m {firstName}
        </h2>

        <div className="lg:col-span-7">
          <div className="text-xl md:text-2xl leading-snug font-medium space-y-6 max-w-[38ch]">
            <p>
              I&apos;m a full-stack developer and AI engineer in {personalInfo.location}.
              I started coding in 2021 out of curiosity and never stopped.
            </p>
            <p>
              Most of what I ship began as friction in my own workday: a step that
              was slow, manual, or missing, turned into a product that removed it.
            </p>
            <p>
              In 2024 I launched {personalInfo.domain}, so the fixes I build for
              myself are live for everyone else who has the same problem.
            </p>
          </div>

          <h3 className="label mt-16 mb-3">Where I&apos;ve worked</h3>
          <ul className="border-t-2 border-ink">
            {experience.map((job) => (
              <li key={job.company} className="border-b-2 border-ink">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <span>
                    <span className="display text-3xl underline decoration-transparent group-hover:decoration-mark">
                      {job.company}
                    </span>
                    <span className="ml-3 font-medium">{job.role}</span>
                  </span>
                  <span className="font-medium text-ink-soft">{job.period}</span>
                </a>
              </li>
            ))}
          </ul>

          <h3 className="label mt-16 mb-3">What I build with</h3>
          <dl className="grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-2 text-lg">
            {stack.map((row) => (
              <div key={row.area} className="contents">
                <dt className="font-bold">{row.area}</dt>
                <dd className="mb-2 sm:mb-0">{row.items}</dd>
              </div>
            ))}
            <div className="contents">
              <dt className="font-bold">Daily tools</dt>
              <dd>{toolkit.map((tool) => tool.name).join(", ")}</dd>
            </div>
          </dl>

          <p className="mt-16 text-lg max-w-[52ch]">
            Based in {personalInfo.location}. Open to relocation, and happy working
            remote across timezones.
          </p>
        </div>
      </div>
    </section>
  );
}
