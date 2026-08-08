import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { EVENTGUARD_REPO_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "EventGuard",
  description:
    "A case study of EventGuard, a modular Java 21 and Spring Boot application for importing, processing, auditing, and persisting payment files.",
  path: "/projects/eventguard",
});

const fastFacts = [
  ["Internship", "10 weeks"],
  ["Structure", "7 Maven modules"],
  ["Tests", "107 passing"],
  ["Language", "Java 21"],
  ["Application", "Spring Boot 3.5, Spring MVC"],
  ["Persistence", "JDBC, PostgreSQL"],
] as const;

const caseStudyLinks = [
  ["Workflow", "#eventguard-workflow"],
  ["Architecture", "#eventguard-architecture"],
  ["Engineering decisions", "#eventguard-decisions"],
  ["Testing", "#eventguard-tests"],
  ["Next improvements", "#eventguard-next"],
  ["Development process", "#eventguard-process"],
] as const;

const workflow = [
  "CSV upload or local file",
  "NIO file reading",
  "CSV parsing",
  "Application workflow",
  "Payment processing",
  "Repository port",
  "JDBC and PostgreSQL",
] as const;

const modules = [
  {
    name: "eventguard-core",
    detail: "Domain objects and framework-free interfaces owned by the core.",
  },
  {
    name: "eventguard-csv",
    detail: "CSV parsing adapter.",
  },
  {
    name: "eventguard-file",
    detail: "NIO file-reading adapter.",
  },
  {
    name: "eventguard-application",
    detail: "Import, processing, workflow, repository, and reporting services.",
  },
  {
    name: "eventguard-jdbc",
    detail: "JDBC persistence adapter and connection provider.",
  },
  {
    name: "eventguard-runner",
    detail: "CLI composition root.",
  },
  {
    name: "eventguard-spring-boot",
    detail: "Spring Boot REST composition root.",
  },
] as const;

const decisions = [
  {
    title: "Ports and adapters",
    body: "The core owns the domain and interfaces. Spring, file handling, CSV parsing, and JDBC stay in adapters that depend on those interfaces. The CLI and Spring Boot entry points assemble the concrete implementations.",
  },
  {
    title: "Money",
    body: "Payment amounts use BigDecimal in Java and NUMERIC in PostgreSQL. That keeps monetary values out of binary floating-point arithmetic.",
  },
  {
    title: "Transaction boundary",
    body: "The JDBC adapter disables auto-commit, inserts the parent import attempt, reads its generated key, inserts the payment rows, and commits. On failure it rolls back, and a rollback failure is preserved with addSuppressed instead of replacing the original exception. JDBC resources use try-with-resources.",
  },
  {
    title: "HTTP boundary",
    body: "A Spring MVC multipart endpoint accepts POST /api/imports. The boundary normalizes content types, falls back to CSV where appropriate, sanitizes filenames against path traversal and control characters, manages temporary files, and maps failures through @RestControllerAdvice.",
  },
  {
    title: "Typed processing outcomes",
    body: "The processing model has separate accepted and rejected result types. It keeps parser outcomes separate from business-rule rejections, including duplicate payment-ID detection. The current implementation covers part of the intended validation model.",
  },
  {
    title: "Testing",
    body: "107 tests pass across unit tests, Spring Boot tests and slices, and a JDBC integration test that runs against a real database. The unit and application tests use JUnit 5 and Mockito.",
  },
] as const;

const nextSteps = [
  "Add richer CSV support for quoted fields and embedded commas.",
  "Align application validation with database constraints.",
  "Batch JDBC inserts when processing larger files.",
  "Add streaming ingestion for larger payment files.",
  "Inject a Clock so timestamp behavior is deterministic in tests.",
] as const;

export default function EventGuardPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            ProgressSoft internship project
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            EventGuard
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            A modular Java backend for importing, processing, auditing, and
            persisting payment files.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            I developed EventGuard during my 10-week software engineering
            internship at ProgressSoft Corporation in Amman, from June 1 to
            August 6, 2026.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
            >
              Back to projects
            </Link>
            <a
              href={EVENTGUARD_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
            >
              Source
            </a>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-border py-4 sm:grid-cols-3 lg:grid-cols-6">
          {fastFacts.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-semibold leading-snug text-text">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <nav
          aria-label="EventGuard case study contents"
          className="mt-8 border-y border-border bg-bg py-3 lg:sticky lg:top-3 lg:z-20 lg:flex lg:items-center lg:gap-6 lg:rounded-xl lg:border lg:px-4"
        >
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
            On this page
          </p>
          <ul className="mt-2 flex gap-5 overflow-x-auto pb-1 lg:mt-0 lg:flex-1 lg:justify-between lg:overflow-visible lg:pb-0">
            {caseStudyLinks.map(([label, href]) => (
              <li key={href} className="shrink-0">
                <a
                  href={href}
                  className="link-plain text-sm font-semibold text-text underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <figure className="mt-10 max-w-md overflow-hidden rounded-xl border border-border bg-surface p-3">
          <Image
            src="/images/progresssoft/progresssoft-internship-adam-zaatar.jpg"
            alt="Adam Zaatar outside ProgressSoft in Amman"
            width={1200}
            height={1500}
            loading="eager"
            className="h-auto w-full rounded-lg object-cover"
            sizes="(min-width: 640px) 448px, calc(100vw - 56px)"
          />
          <figcaption className="px-1 pb-1 pt-3 text-sm text-muted">
            Outside ProgressSoft in Amman during my 2026 internship.
          </figcaption>
        </figure>

        <section className="mt-14 border-t border-border pt-12" aria-labelledby="eventguard-workflow">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Workflow
            </p>
            <h2 id="eventguard-workflow" className="mt-2 scroll-mt-24 text-3xl font-semibold text-text">
              Payment-file workflow
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              EventGuard reads payment files through a CLI or multipart HTTP
              entry point. It parses records, runs the application workflow,
              detects duplicate payment IDs, records typed accepted or rejected
              processing results, and persists an import attempt with its child
              payment rows.
            </p>
          </div>

          <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <li
                key={step}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold text-text">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t border-border pt-12" aria-labelledby="eventguard-architecture">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Architecture
            </p>
            <h2 id="eventguard-architecture" className="mt-2 scroll-mt-24 text-3xl font-semibold text-text">
              Seven modules with inward dependencies.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The core owns abstractions. Application and adapter code depend on
              those abstractions, and the two entry points wire concrete
              implementations together. A separate database folder contains the
              schema and is not an eighth Maven module.
            </p>
          </div>

          <figure className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-8">
            <figcaption className="sr-only">
              EventGuard dependency diagram showing composition roots, the
              application layer, adapters, and the core domain and ports.
            </figcaption>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1.2fr)] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Entry points
                </p>
                <div className="rounded-xl border border-border bg-bg p-4">
                  <p className="font-semibold text-text">CLI runner</p>
                  <p className="mt-1 text-sm text-muted">eventguard-runner</p>
                </div>
                <div className="rounded-xl border border-border bg-bg p-4">
                  <p className="font-semibold text-text">Spring Boot REST API</p>
                  <p className="mt-1 text-sm text-muted">eventguard-spring-boot</p>
                </div>
              </div>

              <div className="text-center text-sm font-semibold text-primary" aria-hidden="true">
                wires
                <span className="mx-2 lg:mx-0 lg:block">→</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Application
                  </p>
                  <p className="mt-2 font-semibold text-text">
                    Import, processing, workflow, and reporting services
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["CSV", "eventguard-csv"],
                    ["File", "eventguard-file"],
                    ["JDBC", "eventguard-jdbc"],
                  ].map(([label, module]) => (
                    <div key={module} className="rounded-xl border border-border bg-bg p-4">
                      <p className="font-semibold text-text">{label} adapter</p>
                      <p className="mt-1 break-words text-xs text-muted">{module}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border-2 border-primary/45 bg-bg p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Core
                  </p>
                  <p className="mt-2 font-semibold text-text">Domain objects and ports</p>
                  <p className="mt-1 text-sm text-muted">
                    eventguard-core has no framework dependencies
                  </p>
                </div>
                <p className="text-center text-xs font-medium text-muted">
                  Application and adapters depend on abstractions owned by the core.
                </p>
              </div>
            </div>
          </figure>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <article key={module.name} className="rounded-xl border border-border bg-surface p-4">
                <h3 className="break-words text-sm font-semibold text-text">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{module.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-12" aria-labelledby="eventguard-decisions">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Implementation
            </p>
            <h2 id="eventguard-decisions" className="mt-2 scroll-mt-24 text-3xl font-semibold text-text">
              Engineering decisions
            </h2>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {decisions.map((decision) => (
              <article
                key={decision.title}
                className="interactive-card rounded-xl border border-border bg-surface p-6 hover:border-primary/35"
              >
                <h3 className="text-xl font-semibold text-text">{decision.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{decision.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-border bg-surface p-6 sm:p-8" aria-labelledby="eventguard-tests">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Testing
          </p>
          <h2 id="eventguard-tests" className="mt-2 scroll-mt-24 text-3xl font-semibold text-text">
            Test results
          </h2>
          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              ["107", "Tests"],
              ["37", "Spring Boot tests"],
              ["0", "Failures"],
              ["0", "Errors"],
              ["0", "Skipped"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border bg-bg p-4">
                <dd className="text-2xl font-semibold text-text">{value}</dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-surface p-6 sm:p-8" aria-labelledby="eventguard-next">
            <h2 id="eventguard-next" className="scroll-mt-24 text-2xl font-semibold text-text">
              Next improvements
            </h2>
            <ul className="mt-5 space-y-3">
              {nextSteps.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6 sm:p-8" aria-labelledby="eventguard-process">
            <h2 id="eventguard-process" className="scroll-mt-24 text-2xl font-semibold text-text">
              Development process
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              I worked in feature branches and opened merge requests for regular
              review from my mentor and team leader. I used that feedback in later
              submissions and continued testing and refactoring the code.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
