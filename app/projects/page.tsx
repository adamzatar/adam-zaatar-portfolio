import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { featuredProjects, softwareProjects } from "@/lib/content";

type Project = (typeof featuredProjects)[number] | (typeof softwareProjects)[number];

export default function ProjectsPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Software projects and prototypes.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A short list of software work I can explain in detail, led by a
            public demo and followed by smaller prototypes and Java work.
          </p>
        </div>

        <section className="mt-12">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Featured project
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              ClickErase demo.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} featured />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Other software work
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              More projects I can discuss.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {softwareProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Research
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-text">
              Economics papers with PDFs available.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The research page includes papers on lobbying and democracy,
              producer prices and profits, and financial literacy programs at
              peer institutions.
            </p>
            <Link
              href="/research"
              className="link-plain mt-5 inline-flex text-sm font-semibold text-text underline underline-offset-4"
            >
              Go to research
            </Link>
          </div>
        </section>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`interactive-card flex h-full flex-col rounded-xl border border-border bg-surface hover:border-primary/45 ${
        featured ? "p-7 sm:p-8" : "p-6"
      }`}
    >
      <p className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text">
        {project.status}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-text">{project.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            {technology}
          </li>
        ))}
      </ul>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={
          featured
            ? "link-plain mt-7 w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            : "link-plain mt-6 w-fit text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
        }
      >
        {project.cta}
      </a>
    </article>
  );
}
