import Link from "next/link";

import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { TagList } from "@/components/ui/Tag";
import type { FeaturedProject } from "@/lib/content";

const buttonClass =
  "link-plain w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90";
const textLinkClass =
  "link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary";

function ProjectLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return href.startsWith("http") ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Bordered project card with media on top.
 *
 * `card` shows the full description, proof point, and stack.
 * `tease` is the home-page version: title, one sentence, one link.
 */
export function FeaturedProjectCard({
  project,
  variant = "card",
}: {
  project: FeaturedProject;
  variant?: "card" | "tease";
}) {
  if (variant === "tease") {
    return (
      <article className="interactive-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface hover:border-primary/45">
        {project.media ? (
          <div className="border-b border-border">
            <ProjectMedia
              media={project.media}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 46vw, calc(100vw - 48px)"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-text">
            <Link
              href={project.href}
              className="link-plain after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">
            {project.cta}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="interactive-card flex flex-col overflow-hidden rounded-xl border border-border bg-surface hover:border-primary/45">
      {project.media ? (
        <div className="border-b border-border">
          <ProjectMedia media={project.media} />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {project.status ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {project.status}
          </p>
        ) : null}
        <h3 className="mt-1 text-2xl font-semibold text-text">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        {project.proof ? (
          <p className="mt-4 border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-text">
            {project.proof}
          </p>
        ) : null}
        <TagList
          items={project.technologies}
          label={`${project.title} technologies`}
          className="mt-5"
        />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ProjectLink href={project.href} className={buttonClass}>
            {project.cta}
          </ProjectLink>
          {project.sourceHref ? (
            <a
              href={project.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClass}
            >
              {project.sourceCta}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
