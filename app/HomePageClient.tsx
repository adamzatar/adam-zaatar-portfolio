import Image from "next/image";
import Link from "next/link";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { Container } from "@/components/ui/Container";
import { RESUME_PATH } from "@/lib/constants/resume";
import {
  eventGuardProject,
  mainProjects,
  researchPapers,
  systemDemoProjects,
} from "@/lib/content";

const secondaryButton =
  "link-plain rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50";
const textLink =
  "link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary";

export default function HomePageClient() {
  return (
    <div className="bg-bg text-text">
      <section className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-normal text-text sm:text-5xl">
                Adam Zaatar
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-text sm:text-xl">
                I&apos;m a senior at Bowdoin studying Computer Science and
                Economics. Most of the programming I&apos;ve enjoyed has been
                backend and systems work.
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                I graduate in May 2027, and spent last summer at ProgressSoft in
                Amman working in Java and Spring Boot.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="link-plain rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
              >
                Projects
              </Link>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButton}
              >
                Resume
              </a>
              <Link href="/contact" className={secondaryButton}>
                Contact
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
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

      <section>
        <Container className="py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Projects
              </p>
              <h2 className="text-3xl font-semibold tracking-normal text-text">
                Things I&apos;ve built recently.
              </h2>
            </div>
            <Link href="/projects" className={textLink}>
              All projects
            </Link>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {mainProjects.map((project) => (
              <FeaturedProjectCard
                key={project.title}
                project={project}
                variant="tease"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/70 bg-surface/45">
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Systems coursework
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              A thread library and a virtual memory pager, in C++.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              The course code stays private, so I built browser visualizers that
              step through the scheduling and page-replacement behavior.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {systemDemoProjects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="interactive-card link-plain overflow-hidden rounded-xl border border-border bg-bg hover:border-primary/45"
              >
                {project.media?.kind === "image" ? (
                  <Image
                    src={project.media.src}
                    alt={project.media.alt}
                    width={project.media.width}
                    height={project.media.height}
                    className="aspect-video h-auto w-full border-b border-border object-cover"
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, calc(100vw - 48px)"
                  />
                ) : null}
                <p className="px-4 py-3 text-sm font-semibold text-text">
                  {project.title}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Research
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Economics papers.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Empirical work on AI-linked layoffs and on Stack Overflow after
              ChatGPT, plus shorter papers and two financial-literacy reports.
            </p>
            <Link href="/research" className={textLink}>
              All papers
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {researchPapers.slice(0, 2).map((item) => (
              <article
                key={item.title}
                className="border-b border-border p-5 last:border-b-0 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-text">
                  <a
                    href={encodeURI(item.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-plain transition-colors duration-200 ease-out hover:text-primary"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70 bg-primary/5">
        <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            <span className="font-semibold text-text">Summer 2026:</span>{" "}
            software engineering intern at ProgressSoft in Amman, where I built{" "}
            <Link
              href={eventGuardProject.href}
              className="link-plain font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
            >
              EventGuard
            </Link>{" "}
            in Java and Spring Boot.
          </p>
          <Link href="/about" className={textLink}>
            More about me
          </Link>
        </Container>
      </section>
    </div>
  );
}
