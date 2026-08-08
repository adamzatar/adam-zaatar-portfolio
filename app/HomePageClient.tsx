import Image from "next/image";
import Link from "next/link";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { Container } from "@/components/ui/Container";
import { RESUME_PATH } from "@/lib/constants/resume";
import {
  atAGlance,
  experienceItems,
  featuredProjects,
  focusAreas,
  researchItems,
} from "@/lib/content";

export default function HomePageClient() {
  return (
    <div className="bg-bg text-text">
      <section className="border-b border-border/70">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="space-y-7">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Adam Zaatar
            </p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-text sm:text-5xl">
                I study Computer Science and Economics at Bowdoin, with most of my
                technical work focused on backend and systems.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                I&apos;m expected to graduate in May 2027. I recently completed a
                10-week software engineering internship at ProgressSoft in Amman.
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted">
                My other technical work includes C/C++ operating-systems
                projects, applied AI, and economics research.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Areas of interest">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="link-plain rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
              >
                View projects
              </Link>
              <Link
                href="/research"
                className="link-plain rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
              >
                Read research
              </Link>
              <Link
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="link-plain rounded-lg border border-border px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
              >
                View resume
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src="/images/profile-home.jpg"
                alt="Portrait of Adam Zaatar"
                width={560}
                height={680}
                priority
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 360px, 80vw"
              />
            </div>
          </figure>
        </Container>
      </section>

      <section className="border-b border-border/70 bg-surface/45">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {atAGlance.map((item) => (
              <article key={item.title} className="space-y-2">
                <h2 className="text-lg font-semibold text-text">{item.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Projects
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Backend, systems, and applied AI projects.
            </h2>
          </div>

          <div className="grid items-start gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70 bg-surface/45">
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Research
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Economics research and writing.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              My research covers investor reactions to AI-linked layoffs,
              public knowledge production, political economy, inflation, and
              financial literacy. All six papers and reports are available as
              PDFs.
            </p>
            <Link
              href="/research"
              className="link-plain inline-flex rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Read the research archive
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-bg">
            {researchItems.slice(0, 2).map((item) => (
              <article
                key={item.title}
                className="border-b border-border p-5 last:border-b-0 sm:p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {item.methods}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-text">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70">
        <Container className="py-16 sm:py-20">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Roles and campus work.
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {experienceItems.map((item) => (
              <article
                key={`${item.organization}-${item.title}`}
                className="border-b border-border p-5 last:border-b-0 sm:p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {item.organization} · {item.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70">
        <Container className="flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text">
              I&apos;m looking for 2027 software engineering roles.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              I&apos;m especially interested in backend systems, systems software,
              and infrastructure.
            </p>
          </div>
          <Link
            href="/contact"
            className="link-plain w-fit rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
          >
            Contact
          </Link>
        </Container>
      </section>
    </div>
  );
}
