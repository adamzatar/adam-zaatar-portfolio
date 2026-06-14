import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { RESUME_PATH } from "@/lib/constants/resume";

const CLICKERASE_URL = "https://huggingface.co/spaces/azaatar/clickerase";

const focusAreas = [
  "Backend systems",
  "Applied AI",
  "Finance-oriented software",
  "Security-adjacent work",
] as const;

const atAGlance = [
  {
    title: "Bowdoin College",
    body: "Computer Science and Economics student with a German minor.",
  },
  {
    title: "Backend Java training",
    body: "Software Engineering Intern at ProgressSoft in Amman, Summer 2026.",
  },
  {
    title: "Research and campus work",
    body: "Economics research PDFs, Bowdoin Orient web staff work, and student organization leadership.",
  },
] as const;

const selectedWork = [
  {
    title: "ClickErase",
    status: "Working AI image editing app",
    body: "Built a working AI image editing app where a user uploads an image, clicks an object, and the app generates a segmentation mask and removes the object with inpainting. Built in Python with Gradio and Hugging Face Spaces.",
    href: CLICKERASE_URL,
    cta: "Open demo",
  },
  {
    title: "Economics research archive",
    status: "PDFs available",
    body: "Research papers and financial literacy reports with source PDFs available to inspect, including work on lobbying, behavioral economics, and student financial literacy programs.",
    href: "/research",
    cta: "Read research",
  },
] as const;

const experience = [
  {
    title: "Software Engineering Intern",
    organization: "ProgressSoft",
    date: "Summer 2026",
    body: "Backend-focused Java internship at a payments software company in Amman, covering Spring Framework and Spring Boot, JPA, Spring Security, Docker, test-driven development with JUnit and Mockito, and code reviews, toward the standards used by ProgressSoft development teams.",
  },
  {
    title: "Gibbons Research Fellow",
    organization: "Bowdoin College",
    date: "Summer 2025",
    body: "Designed a financial literacy program for students, benchmarked peer schools, and wrote two course models.",
  },
  {
    title: "Web Staff and Data Desk",
    organization: "The Bowdoin Orient",
    date: "Bowdoin",
    body: "Web and plugin fixes, accessibility, and data work behind reported pieces.",
  },
  {
    title: "Founder and President",
    organization: "Bowdoin Martial Arts Club",
    date: "Bowdoin",
    body: "Funding, logistics, recruiting, and coordination with outside gym partners.",
  },
] as const;

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
                I&apos;m a Computer Science and Economics student at Bowdoin, building toward backend and systems engineering.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                Right now I&apos;m doing a backend-focused Java internship at
                ProgressSoft, a payments software company in Amman. Alongside
                that, I work on applied AI, economics research, and
                finance-oriented software.
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted">
                This site is a record of what I&apos;ve actually built, studied,
                and researched, with the proof attached where it exists.
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
                className="link-plain rounded-lg bg-text px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-text/85"
              >
                View projects
              </Link>
              <Link
                href="/research"
                className="link-plain rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-text"
              >
                Read research
              </Link>
              <Link
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="link-plain rounded-lg border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-text"
              >
                Resume
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
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Work with proof attached.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              I&apos;m keeping this section limited to work that has a demo,
              PDF, repository, or concrete output.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {selectedWork.map((item) => {
              const isExternal = item.href.startsWith("http");
              const content = (
                <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-text/50">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                    {item.status}
                  </p>
                  <h3 className="text-xl font-semibold text-text">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-text">
                    {item.cta}
                  </span>
                </article>
              );

              return isExternal ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-plain block"
                >
                  {content}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className="link-plain block">
                  {content}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70 bg-surface/45">
        <Container className="py-16 sm:py-20">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Technical, research, and campus work.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {experience.map((item) => (
              <article
                key={`${item.organization}-${item.title}`}
                className="rounded-xl border border-border bg-bg p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {item.organization} · {item.date}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
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
              Open to backend, systems, applied AI, and finance-oriented software roles.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              I am looking for teams where I can learn from strong engineers,
              write useful code, and take responsibility for real work.
            </p>
          </div>
          <Link
            href="/contact"
            className="link-plain w-fit rounded-lg bg-text px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-text/85"
          >
            Contact
          </Link>
        </Container>
      </section>
    </div>
  );
}
