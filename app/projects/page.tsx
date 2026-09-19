import Link from "next/link";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/Tag";
import {
  clickEraseProject,
  mainProjects,
  softwareProjects,
  systemDemoProjects,
  type FeaturedProject,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Backend, systems, applied AI, and software projects by Adam Zaatar, including Durable Runner, Technical Bid Review, EventGuard, and public operating-systems visualizers.",
  path: "/projects",
});

const buttonClass =
  "link-plain w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90";
const textLinkClass =
  "link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary";

type OtherProject = {
  title: string;
  status?: string;
  description: string;
  technologies: readonly string[];
  href: string;
  cta: string;
  sourceHref?: string;
  sourceCta?: string;
};

const otherProjects: readonly OtherProject[] = [
  clickEraseProject,
  ...softwareProjects,
];

export default function ProjectsPage() {
  return (
    <div className="bg-bg">
      <section className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="py-14 sm:py-16">
          <h1 className="text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Two backend systems I&apos;m building now, the project from my
            ProgressSoft internship, and operating-systems coursework with
            public visualizers.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <div className="space-y-8">
          {mainProjects.map((project, index) => (
            <FeaturedProjectSection
              key={project.title}
              project={project}
              reverse={index % 2 === 1}
              photo={project.media?.kind === "image"}
            />
          ))}
        </div>
      </Container>

      <section className="border-y border-border/70 bg-surface/45">
        <Container className="py-14 sm:py-16">
          <div className="mb-6 max-w-2xl">
            <h2 className="text-2xl font-semibold text-text sm:text-3xl">
              Systems coursework
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The C/C++ implementations are private under course policy, so I
              built separate TypeScript visualizers for the scheduling and
              memory behavior.
            </p>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-2">
            {systemDemoProjects.map((project) => (
              <FeaturedProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-text sm:text-3xl">
          Other projects
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {otherProjects.map((project) => (
            <OtherProjectCard key={project.title} project={project} />
          ))}
        </div>

        <aside className="mt-14 flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted">
            I also write economics papers, including an event study on AI-linked
            layoffs.
          </p>
          <Link href="/research" className={textLinkClass}>
            Research
          </Link>
        </aside>
      </Container>
    </div>
  );
}

/**
 * Alternating two-column feature. A diagram sits in a tinted media well;
 * a photo bleeds to the edge of the card so the three sections don't read
 * as clones of one another.
 */
function FeaturedProjectSection({
  project,
  reverse,
  photo,
}: {
  project: FeaturedProject;
  reverse: boolean;
  photo: boolean;
}) {
  return (
    <article className="interactive-card grid overflow-hidden rounded-2xl border border-border bg-surface hover:border-primary/45 lg:grid-cols-2">
      {project.media ? (
        <div
          className={`min-w-0 border-b border-border lg:border-b-0 ${
            reverse
              ? "lg:order-last lg:border-l lg:border-border"
              : "lg:border-r lg:border-border"
          } ${photo ? "" : "flex items-center bg-primary/5"}`}
        >
          <div
            className={
              photo
                ? "h-full [&>figure]:h-full [&>figure]:aspect-auto"
                : "w-full"
            }
          >
            <ProjectMedia
              media={project.media}
              sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl font-semibold text-text sm:text-3xl">
          {project.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {project.description}
        </p>
        {project.proof ? (
          <p className="mt-5 border-l-2 border-primary/50 pl-4 text-sm leading-relaxed text-text">
            {project.proof}
          </p>
        ) : null}
        <TagList
          items={project.technologies}
          label={`${project.title} technologies`}
          className="mt-6"
        />
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link href={project.href} className={buttonClass}>
            {project.cta}
          </Link>
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

function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <article className="interactive-card flex h-full flex-col rounded-xl border border-border bg-surface p-5 hover:border-primary/45 sm:p-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold text-text">{project.title}</h3>
        {project.status ? (
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {project.status}
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <p className="mt-4 text-xs text-muted">
        {project.technologies.join(", ")}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={textLinkClass}
        >
          {project.cta}
        </a>
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
    </article>
  );
}
