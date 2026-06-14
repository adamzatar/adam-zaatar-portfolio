import Link from "next/link";

import { Container } from "@/components/ui/Container";

const featuredProjects = [
  {
    title: "ClickErase",
    status: "Working AI image editing app",
    description:
      "A user uploads an image, clicks an object, and the app generates a segmentation mask and removes the selected object with inpainting. Built in Python with Gradio and Hugging Face Spaces.",
    technologies: ["Python", "Gradio", "Computer vision", "Hugging Face Spaces"],
    href: "https://huggingface.co/spaces/azaatar/clickerase",
    cta: "Open demo",
  },
] as const;

const projects = [
  {
    title: "Bowdoin Marketplace",
    status: "In progress",
    description:
      "Campus marketplace and research prototype exploring student buying, selling, trust, and access. The repository exists, but the project should be treated as ongoing work.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/adamzatar/Bowdoin-Marketplace",
    cta: "Repository",
  },
  {
    title: "Vector",
    status: "Prototype",
    description:
      "SwiftUI and Vapor authentication prototype exploring passkeys, biometric fallback, and account security flows. Public code exists, but the project needs clearer documentation before it should carry a larger claim.",
    technologies: ["SwiftUI", "Vapor", "Authentication"],
    href: "https://github.com/adamzatar/Vector",
    cta: "Repository",
  },
  {
    title: "Cutaway",
    status: "Prototype",
    description:
      "SwiftUI and AVFoundation project for experimenting with multi-angle video workflows. It is best presented as a prototype and learning project unless a demo or TestFlight link is added.",
    technologies: ["SwiftUI", "AVFoundation"],
    href: "https://github.com/adamzatar/Cutaway",
    cta: "Repository",
  },
  {
    title: "IntCalculator.java",
    status: "Small Java project",
    description:
      "Command-line integer calculator focused on parsing input, handling operator precedence, and evaluating expressions.",
    technologies: ["Java"],
    href: "https://github.com/adamzatar/IntCalculator.java",
    cta: "Repository",
  },
] as const;

export default function ProjectsPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Software work with the current level of proof in mind.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            This page favors projects with a repository, a demo, a PDF, or a
            concrete explanation. Clones and the portfolio itself are omitted
            from the main list.
          </p>
        </div>

        <section className="mt-12">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Strongest software proof
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              Working demo available.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Other software work
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              Repositories and prototypes.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
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
              greedflation and producer prices, and financial literacy programs
              at peer institutions.
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

type Project = (typeof featuredProjects)[number] | (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {project.status}
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-text">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
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
        className="link-plain mt-6 w-fit text-sm font-semibold text-text underline underline-offset-4"
      >
        {project.cta}
      </a>
    </article>
  );
}
