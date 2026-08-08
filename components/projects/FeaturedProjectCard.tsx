import Link from "next/link";

import { ProjectMedia } from "@/components/projects/ProjectMedia";
import type { FeaturedProject } from "@/lib/content";

export function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  const primaryClass =
    "link-plain w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90";
  const primaryAction = project.href.startsWith("http") ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={primaryClass}
    >
      {project.cta}
    </a>
  ) : (
    <Link href={project.href} className={primaryClass}>
      {project.cta}
    </Link>
  );

  return (
    <article className="interactive-card overflow-hidden rounded-xl border border-border bg-surface hover:border-primary/45">
      {project.media ? <ProjectMedia media={project.media} /> : null}
      <div className="flex flex-col p-6 sm:p-7">
        <p className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text">
          {project.status}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-text">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {primaryAction}
          {project.sourceHref ? (
            <a
              href={project.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
            >
              {project.sourceCta}
            </a>
          ) : null}
        </div>
        {project.note ? (
          <p className="mt-4 text-xs leading-relaxed text-muted">{project.note}</p>
        ) : null}
      </div>
    </article>
  );
}
