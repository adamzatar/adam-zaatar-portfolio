import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend engineering, systems work, applied AI, and economics research.",
  path: "/about",
});

const technicalWork = [
  {
    title: "ProgressSoft and EventGuard",
    body: "I completed a 10-week software engineering internship at ProgressSoft in Amman. My main project was EventGuard, a modular Java 21 and Spring Boot application for importing, processing, auditing, and persisting payment files.",
    href: "/projects/eventguard",
    cta: "View case study",
    credential: {
      href: "/documents/ProgressSoft_Internship_Certificate_Adam_Zaatar.pdf",
      previewSrc: "/images/progresssoft/progresssoft-completion-certificate.jpg",
      previewAlt:
        "ProgressSoft completion certificate for Adam Zaatar's 10-week software development internship",
    },
  },
  {
    title: "Operating systems",
    body: "My C/C++ coursework includes a user-level thread library and a virtual-memory pager. I also built separate TypeScript visualizers that explain scheduling, synchronization, page faults, and replacement behavior without exposing the private course implementations.",
    href: "/projects",
    cta: "View systems work",
  },
  {
    title: "ClickErase",
    body: "ClickErase is a deployed Python image-editing app that combines MobileSAM segmentation with LaMa inpainting through a Gradio interface.",
    href: "/projects",
    cta: "View projects",
  },
] as const;

const backgroundItems = [
  "B.A. candidate at Bowdoin College, majoring in Computer Science and Economics with a minor in German. Expected May 2027.",
  "Grew up in Amman, Jordan, before coming to Bowdoin.",
  "Founder and President of the Bowdoin Martial Arts Club, handling funding, recruiting, logistics, and outside gym coordination.",
] as const;

export default function AboutPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              About
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
              I study Computer Science and Economics at Bowdoin.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Most of my technical work is in backend and systems engineering,
              with related work in applied AI and finance-oriented software. I
              also study economics because I&apos;m interested in incentives,
              markets, and data, especially where they overlap with software and
              finance.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface px-6 pt-6">
            <Image
              src="/images/about-portrait.png"
              alt="Portrait of Adam Zaatar"
              width={408}
              height={612}
              priority
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 320px, 80vw"
            />
          </figure>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section className="interactive-card rounded-xl border border-border bg-surface p-6 hover:border-primary/30">
            <h2 className="text-2xl font-semibold text-text">Background</h2>
            <ul className="mt-5 space-y-4">
              {backgroundItems.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>

            <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-bg p-4">
              <Image
                src="/images/mma.png"
                alt="Adam Zaatar training mixed martial arts"
                width={391}
                height={638}
                className="mx-auto max-h-72 w-auto object-contain"
                sizes="(min-width: 1024px) 260px, 70vw"
              />
              <figcaption className="border-t border-border pt-3 text-sm font-medium text-muted">
                Bowdoin Martial Arts Club
              </figcaption>
            </figure>
          </section>

          <section className="interactive-card rounded-xl border border-border bg-surface p-6 hover:border-primary/30">
            <h2 className="text-2xl font-semibold text-text">Engineering</h2>
            <div className="mt-6 space-y-6">
              {technicalWork.map((item) => (
                <article key={item.title}>
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="link-plain mt-3 inline-flex text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
                  >
                    {item.cta}
                  </Link>
                  {"credential" in item ? (
                    <div className="mt-5 grid grid-cols-[120px_minmax(0,1fr)] items-start gap-4 border-t border-border pt-5 sm:grid-cols-[180px_minmax(0,1fr)]">
                      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                        <Image
                          src={item.credential.previewSrc}
                          alt={item.credential.previewAlt}
                          width={842}
                          height={596}
                          className="h-auto w-full"
                          sizes="(min-width: 640px) 180px, 120px"
                        />
                      </div>
                      <div className="min-w-0 py-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          Credential
                        </p>
                        <p className="mt-1 font-semibold text-text">ProgressSoft</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          Software Engineering Internship
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          June 1 to August 6, 2026
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          Completion certificate
                        </p>
                        <a
                          href={item.credential.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-plain mt-3 inline-flex text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
                        >
                          View certificate
                        </a>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="interactive-card mt-5 rounded-xl border border-border bg-surface p-6 hover:border-primary/30 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-text">Research</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                My economics work includes an event study on AI-linked layoffs,
                research on public knowledge production, political economy, and
                financial-literacy course design through the Gibbons Summer
                Research Fellowship.
              </p>
              <Link
                href="/research"
                className="link-plain mt-4 inline-flex text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
              >
                Read research and writing
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-text">Campus work</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                I work on web and data projects for The Bowdoin Orient and will
                support CSCI 1101 as a Learning Assistant in Fall 2026.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}
