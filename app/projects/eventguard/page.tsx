import Image from "next/image";

import {
  CaseContents,
  CaseHeader,
  Detail,
  Section,
  Stat,
  caseBodyClass as bodyClass,
} from "@/components/case-studies/CaseStudy";
import { Container } from "@/components/ui/Container";
import { EVENTGUARD_REPO_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "EventGuard",
  description:
    "A payment-file importer built during Adam Zaatar’s ProgressSoft internship, with rejected-row reporting, transactional persistence, and 107 passing tests.",
  path: "/projects/eventguard",
});

const contents = [
  ["Rejected rows", "parser"],
  ["Transactions", "transactions"],
  ["Architecture", "architecture"],
  ["Testing", "testing"],
] as const;

const workflow = [
  ["File input", "CSV upload over HTTP, or a local file from the CLI"],
  ["Parse", "Each row becomes a record or a rejection with a reason"],
  ["Process", "Business rules, including duplicate payment IDs"],
  ["Persist", "The import and its rows commit together"],
] as const;

export default function EventGuardPage() {
  return (
    <div className="bg-bg">
      <CaseHeader
        eyebrow="ProgressSoft internship, summer 2026"
        title="EventGuard"
        lead="A payment-file importer that keeps rejected rows inspectable and saves each import in one database transaction."
        technologies={[
          "Java 21",
          "Spring Boot",
          "Spring MVC",
          "JDBC",
          "PostgreSQL",
        ]}
        sourceHref={EVENTGUARD_REPO_URL}
        aside={
          <figure className="mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-card lg:max-w-none">
            <Image
              src="/images/progresssoft/progresssoft-internship-adam-zaatar.jpg"
              alt="Adam Zaatar outside ProgressSoft in Amman"
              width={1200}
              height={1500}
              priority
              className="h-auto w-full rounded-lg object-cover"
              sizes="(min-width: 1024px) 300px, 280px"
            />
            <figcaption className="px-1 pb-1 pt-3 text-sm text-muted">
              Outside ProgressSoft in Amman.
            </figcaption>
          </figure>
        }
      >
        <p className={bodyClass}>
          I built EventGuard over ten weeks at ProgressSoft, from June 1 to
          August 6, 2026, working in feature branches with merge requests
          reviewed by my mentor and team lead.
        </p>
      </CaseHeader>

      <Container className="pb-16 sm:pb-20">
        <CaseContents label="EventGuard case study contents" items={contents} />

        <Section id="parser" title="What should happen to a malformed row?">
          <p className={bodyClass}>
            Early in the internship, a missing or malformed field in my CSV
            parser could throw an exception and stop the whole import. My mentor
            asked me what EventGuard was supposed to do with that row. I
            hadn&apos;t decided yet.
          </p>
          <p className={bodyClass}>
            I changed the parser so rejected rows stayed in the result with the
            reason they failed, while valid rows kept processing. Parser
            failures stay separate from business-rule rejections such as
            duplicate payment IDs.
          </p>
          <ol
            aria-label="Payment import workflow"
            className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {workflow.map(([step, detail], index) => (
              <li
                key={step}
                className={`rounded-xl border p-4 ${
                  index === 1
                    ? "border-primary/35 bg-primary/10"
                    : "border-border bg-surface"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold text-text">{step}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {detail}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="transactions"
          title="An import saves together or rolls back."
        >
          <p className={bodyClass}>
            When I added PostgreSQL persistence, the import and all of its
            payment rows needed to succeed together. I put the writes in a
            transaction so a database failure could not leave half of an import
            saved.
          </p>
          <p className={bodyClass}>
            Payment amounts use <code>BigDecimal</code> in Java and{" "}
            <code>NUMERIC</code> in PostgreSQL to keep money out of binary
            floating-point arithmetic.
          </p>
          <Detail title="The JDBC transaction boundary">
            <p>
              The adapter disables auto-commit, inserts the import, reads its
              generated key, and inserts the payment rows before committing. A
              failure rolls back the transaction.
            </p>
            <p>
              If rollback also fails, <code>addSuppressed</code> preserves that
              failure without replacing the original exception. JDBC resources
              use try-with-resources.
            </p>
          </Detail>
        </Section>

        <Section
          id="architecture"
          title="Two entry points, one import implementation"
        >
          <p className={bodyClass}>
            The CLI and HTTP API assemble the same import services. Keeping
            parsing and persistence behind core interfaces let me test the
            import behavior without starting Spring or connecting to PostgreSQL.
          </p>
          <figure className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-8">
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
                  <p className="font-semibold text-text">
                    Spring Boot REST API
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    eventguard-spring-boot
                  </p>
                </div>
              </div>

              <div
                className="text-center text-sm font-semibold text-primary"
                aria-hidden="true"
              >
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
                    <div
                      key={module}
                      className="rounded-xl border border-border bg-bg p-4"
                    >
                      <p className="font-semibold text-text">{label} adapter</p>
                      <p className="mt-1 break-words text-xs text-muted">
                        {module}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border-2 border-primary/45 bg-bg p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Core
                  </p>
                  <p className="mt-2 font-semibold text-text">
                    Domain objects and ports, with no framework dependencies
                  </p>
                </div>
              </div>
            </div>
          </figure>
        </Section>

        <Section id="testing" title="Testing">
          <p className={bodyClass}>
            The suite uses JUnit 5 and Mockito, Spring Boot tests, and a JDBC
            integration test against a real database. The recorded run has no
            failures, errors, or skipped tests.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <Stat value="107" label="Tests passing" />
            <Stat value="37" label="Spring Boot tests and slices" />
            <Stat value="1" label="JDBC integration test on real PostgreSQL" />
          </div>
          <Detail title="Scope and next changes">
            <p>
              This was an internship project, not a production payment service.
              The current parser needs richer support for quoted fields and
              embedded commas.
            </p>
            <p>
              For larger files, I would add streaming ingestion and batched JDBC
              inserts. Setup, module details, and HTTP handling are documented
              in the repository.
            </p>
          </Detail>
        </Section>
      </Container>
    </div>
  );
}
