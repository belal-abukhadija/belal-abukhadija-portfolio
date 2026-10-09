import Image from "next/image";
import { projects, type Project } from "@/lib/projects-data";
import Strike from "./Strike";

function host(url: string) {
  return new URL(url).host;
}

function Chore({ project, className }: { project: Project; className: string }) {
  if (!project.chore) {
    return <p className={className}>Nothing was broken.</p>;
  }
  return (
    <p className={`${className} flex flex-wrap gap-x-[0.24em]`}>
      {project.chore.map((phrase) => (
        <Strike key={phrase}>{phrase}</Strike>
      ))}
    </p>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="gutter py-24 md:py-36">
      <div className="grid lg:grid-cols-12 gap-6 mb-20 md:mb-28">
        <h2 className="display size-title lg:col-span-7">Things I no longer do</h2>
        <p className="lg:col-span-5 lg:pt-3 text-lg md:text-xl max-w-[46ch]">
          Nearly every project here started the same way: something at work was
          slow, manual, or missing, so I built the thing that fixed it. One of
          them is just a chess board, because some problems are worth having.
        </p>
      </div>

      <div className="space-y-24 md:space-y-36">
        {featured.map((project) => (
          <article key={project.name}>
            <Chore project={project} className="display-light size-chore mb-8 md:mb-10" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5">
                <h3 className="display text-4xl md:text-5xl mb-2">{project.name}</h3>
                <p className="font-medium text-ink-soft mb-8">
                  {project.category}, {project.year}
                </p>

                {project.problem ? (
                  <>
                    <p className="label mb-1">The problem</p>
                    <p className="mb-6 max-w-[52ch]">{project.problem}</p>
                    <p className="label mb-1">What I built</p>
                  </>
                ) : (
                  <p className="label mb-1">Built for fun</p>
                )}
                <p className="mb-6 max-w-[52ch]">{project.description}</p>

                <p className="font-medium text-ink-soft mb-8">{project.facts?.join(", ")}</p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-xl font-bold"
                >
                  Open {host(project.url)}
                </a>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="print-reveal block lg:col-span-7"
              >
                <div className="print aspect-[16/9]">
                  <Image
                    src={project.screenshot!}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
              </a>
            </div>
          </article>
        ))}
      </div>

      <h3 className="display text-4xl md:text-5xl mt-28 md:mt-40 mb-8">And the smaller ones</h3>
      <ul className="border-t-2 border-ink">
        {rest.map((project) => (
          <li key={project.name} className="border-b-2 border-ink">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid md:grid-cols-12 gap-x-8 gap-y-3 py-6 md:py-7 md:items-baseline"
            >
              <Chore project={project} className="display-light size-row md:col-span-5" />
              <div className="md:col-span-5">
                <p className="text-xl font-bold mb-1">
                  {project.name}
                  <span className="font-medium text-ink-soft">, {project.category?.toLowerCase()}</span>
                </p>
                <p className="max-w-[52ch]">{project.description}</p>
              </div>
              <p className="md:col-span-2 md:text-right font-bold underline decoration-ink-faint group-hover:decoration-mark">
                {host(project.url)}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
