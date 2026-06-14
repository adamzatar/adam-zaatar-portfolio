import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { RESUME_PATH } from "@/lib/constants/resume";
import { atAGlance, experienceItems, focusAreas, selectedWork } from "@/lib/content";

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
                This site collects projects, research, and experience I can
                discuss in detail.
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
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Projects and research.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              These are the pieces I can point to directly, through a demo,
              PDF, repository, or written output.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {selectedWork.map((item) => {
              const isExternal = item.href.startsWith("http");
              const content = (
                <article className="interactive-card flex h-full flex-col rounded-xl border border-border bg-surface p-7 hover:border-primary/45">
                  <p className="mb-5 w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text">
                    {item.status}
                  </p>
                  <h3 className="text-2xl font-semibold text-text">{item.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <span className="mt-7 w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast">
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
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-text">
              Roles and campus work.
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-bg">
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
              Open to backend, systems, applied AI, and finance-oriented software roles.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              I am looking for teams where I can learn from strong engineers,
              write useful code, and take responsibility for real work.
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
