import {
  CaseContents,
  CaseHeader,
  Detail,
  Panel,
  Section,
  Stat,
  caseBodyClass as bodyClass,
  caseLinkClass as linkClass,
} from "@/components/case-studies/CaseStudy";
import { Container } from "@/components/ui/Container";
import { DURABLE_RUNNER_REPO_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Durable Runner",
  description:
    "A PostgreSQL-backed durable execution runtime with independent Node.js workers, lease recovery, stale-worker fencing, and controlled side-effect idempotency.",
  path: "/projects/durable-runner",
});

const benchmarkUrl = `${DURABLE_RUNNER_REPO_URL}/blob/1ef2e87fb3b46a21436c638453c8baa1b0b07fd1/benchmarks/results/2026-09-19T01-14-28-972Z_3cbb858.md`;
const decisionUrl = `${DURABLE_RUNNER_REPO_URL}/blob/1ef2e87fb3b46a21436c638453c8baa1b0b07fd1/docs/decisions/0001-lease-deadline-is-authority.md`;

const contents = [
  ["Worker failure", "failure"],
  ["Ownership", "ownership"],
  ["Architecture", "runtime"],
  ["Correctness", "correctness"],
  ["Throughput", "throughput"],
  ["A PostgreSQL race", "postgresql"],
] as const;

const failureSequence = [
  ["A owns v1", "Worker A claims the task."],
  ["A freezes", "SIGSTOP pauses the process."],
  ["Lease expires", "Recovery returns the task to READY."],
  ["B claims v2", "A new claim increments lease_version."],
  ["B completes", "The v2 result is accepted."],
  ["A resumes", "SIGCONT lets the old execution finish."],
  ["v1 rejected", "A’s stale completion leaves B’s result intact."],
] as const;

const ownershipTerms = [
  [
    "Heartbeat",
    "Evidence that a process appears alive. Used for observation, not task ownership.",
  ],
  [
    "Lease",
    "Temporary authority over one task, with a deadline on the database clock.",
  ],
  [
    "lease_version",
    "A monotonically increasing ownership generation carried by each worker mutation.",
  ],
] as const;

export default function DurableRunnerPage() {
  return (
    <div className="bg-bg">
      <CaseHeader
        title="Durable Runner"
        lead="A task runner where a frozen worker can come back late and have its write rejected by PostgreSQL."
        technologies={[
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Fastify",
          "Drizzle ORM",
          "React",
          "Vitest",
        ]}
        sourceHref={DURABLE_RUNNER_REPO_URL}
      >
        <p className={bodyClass}>
          Independent Node.js workers claim tasks through PostgreSQL. Execution
          is at least once: a task can run again after a crash or a lost lease.
        </p>
      </CaseHeader>

      <Container className="pb-16 sm:pb-20">
        <CaseContents
          label="Durable Runner case study contents"
          items={contents}
        />

        <section className="mt-10" aria-labelledby="failure">
          <h2
            id="failure"
            className="scroll-mt-8 text-2xl font-semibold text-text sm:text-3xl"
          >
            The worker that comes back
          </h2>
          <p className={bodyClass}>
            A paused worker still has its task in memory. When it resumes, its
            local state says it owns the work. PostgreSQL checks the ownership
            generation before accepting its write.
          </p>
          <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="bg-gradient-to-br from-primary/10 via-bg to-bg p-5 sm:p-8">
              <figcaption className="text-sm font-medium text-muted">
                Reproduced with two real worker processes sharing one database
              </figcaption>
              <ol
                className="mt-6 grid gap-5 lg:grid-cols-7 lg:gap-3"
                aria-label="Stale-worker failure sequence"
              >
                {failureSequence.map(([title, description], index) => {
                  const last = index === failureSequence.length - 1;
                  return (
                    <li
                      key={title}
                      className="flex min-w-0 gap-3 lg:flex-col lg:border-t-2 lg:border-primary/30 lg:pt-4"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          last
                            ? "border-primary bg-primary text-primary-contrast"
                            : "border-primary/30 bg-primary/10 text-text"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">
                          {title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted [overflow-wrap:anywhere]">
                          {description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </figure>
        </section>

        <Section
          id="ownership"
          title="A worker can be alive and still not own a task."
        >
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
            {ownershipTerms.map(([term, description]) => (
              <div
                key={term}
                className="min-w-0 border-l-2 border-primary/40 pl-4"
              >
                <dt className="text-sm font-semibold text-text">{term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Panel title="Fencing protects task state" accent>
              <p>
                An ownership-sensitive mutation must match the task state,
                worker identity, current <code>lease_version</code>, and a live
                lease. After B claims v2, A’s v1 renewal, completion, or failure
                report is rejected.
              </p>
              <p>
                Before recovery, the deadline rejects an expired owner. After
                reassignment, the generation rejects the superseded owner, even
                if a worker ID is reused.
              </p>
            </Panel>
            <Panel title="Idempotency protects the logical effect">
              <p>
                A worker can finish its side effect and then freeze before
                recording completion. The next worker retries with the same
                stable logical key and receives the stored receipt. That key
                stays the same across attempts and ownership versions.
              </p>
              <p>
                The controlled effect is a row in PostgreSQL, committed
                separately from task completion. Deduplication covers this
                effect sink. A third-party service would need its own
                idempotency contract.
              </p>
            </Panel>
          </div>
        </Section>

        <Section id="runtime" title="Coordination through PostgreSQL">
          <p className={bodyClass}>
            Workers never communicate directly. They claim tasks and write
            lifecycle events through PostgreSQL. A coordinator makes expired
            tasks and elapsed retries available again.
          </p>
          <figure className="mt-6 max-w-2xl rounded-xl border border-border bg-surface px-6 py-8">
            <figcaption className="sr-only">
              The API, coordinator, and workers connect through PostgreSQL.
            </figcaption>
            <div className="flex flex-col items-center gap-3 text-center text-sm">
              <p className="rounded-lg border border-border bg-bg px-6 py-3 font-semibold text-text">
                Fastify API and coordinator
              </p>
              <span className="text-primary" aria-hidden="true">
                ↕
              </span>
              <div className="rounded-lg border border-primary/40 bg-primary/10 px-8 py-4">
                <p className="font-semibold text-text">PostgreSQL</p>
                <p className="mt-0.5 text-xs text-muted">tasks and events</p>
              </div>
              <span className="text-primary" aria-hidden="true">
                ↕
              </span>
              <p className="rounded-lg border border-border bg-bg px-6 py-3 font-semibold text-text">
                Independent Node.js workers
              </p>
            </div>
          </figure>
          <Detail title="Claims, retries, and event writes">
            <p>
              Workers claim READY tasks transactionally with{" "}
              <code>FOR UPDATE SKIP LOCKED</code>, then execute outside the
              transaction while renewing their leases.
            </p>
            <p>
              Failures schedule exponential backoff while attempts remain. Every
              claim consumes an attempt, including a crashed claim. Exhausting
              that budget moves the task to DEAD_LETTERED.
            </p>
            <p>
              Lifecycle events commit in the same transaction as task state. The
              API exposes their history and an SSE feed; the task row remains
              authoritative.
            </p>
          </Detail>
        </Section>

        <Section id="correctness" title="Failure testing">
          <p className={bodyClass}>
            The fencing demo pauses Worker A with SIGSTOP and resumes it with
            SIGCONT after B has completed. The idempotency demo pauses A after
            the receipt commits but before task completion; B reuses the
            receipt, and A’s resumed completion is fenced. Both use independent
            local OS processes sharing PostgreSQL.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Stat value="0" label="Duplicate grants">
              <p>
                Across 200,266 successful claims in concurrent claiming tests.
              </p>
            </Stat>
            <Stat value="0" label="Stale writes accepted">
              <p>
                Across 4,750 deliberately stale renewals, completions, and
                failure reports.
              </p>
            </Stat>
            <Stat value="5,000" label="Effect rows from 45,000 executions">
              <p>
                One row per logical effect in the controlled PostgreSQL sink,
                with no duplicates.
              </p>
            </Stat>
          </div>
          <p className={bodyClass}>
            These are local benchmark results from runtime commit{" "}
            <code>3cbb858</code>.{" "}
            <a
              href={benchmarkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Read the benchmark results
            </a>
          </p>
          <Detail title="203 passing tests across 18 files">
            <p>
              The Vitest suite checks ownership races, lease expiry, retries,
              and idempotency, alongside the worker and API behavior.
            </p>
            <p>
              The integration tests use separate PostgreSQL connections within a
              test process. The pause and resume demonstrations exercise actual
              worker OS processes.
            </p>
          </Detail>
        </Section>

        <Section id="throughput" title="Local backlog throughput">
          <p className={bodyClass}>
            Each worker configuration drained 50,000 tasks per repetition, with
            three repetitions per worker count. These are median rates, with
            normal durable event writes enabled.
          </p>
          <div className="mt-5 max-w-2xl overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Median local backlog throughput over three repetitions of 50,000
                tasks per worker count
              </caption>
              <thead>
                <tr className="border-b border-border bg-primary/5">
                  <th scope="col" className="px-5 py-3 font-semibold text-text">
                    Worker processes
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold text-text">
                    Median tasks per second
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "1,205.4"],
                  ["3", "2,782.7"],
                  ["8", "3,277.1"],
                ].map(([workers, rate]) => (
                  <tr
                    key={workers}
                    className="border-b border-border last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 font-medium text-muted"
                    >
                      {workers}
                    </th>
                    <td className="px-5 py-3 font-semibold tabular-nums text-text">
                      {rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={bodyClass}>
            Apple M2, 8 logical cores, 16 GiB RAM, Node.js 20.19.4, and
            PostgreSQL 16.15. Workers and PostgreSQL ran on the same machine,
            with <code>fsync</code> and <code>synchronous_commit</code> enabled.
            These measurements establish local behavior; multi-machine scaling
            has not been validated.
          </p>
        </Section>

        <Section id="postgresql" title="Checking authority after the row lock">
          <p className={bodyClass}>
            Testing on PostgreSQL 16 under READ COMMITTED exposed a timing
            assumption in an earlier guarded UPDATE: a renewal waiting behind a
            lock-only transaction could still be accepted after its lease
            expired.
          </p>
          <Detail title="The race and the transaction change">
            <p>
              The old UPDATE could evaluate its live-lease predicate before
              waiting for the row lock. A transaction that only locked the row
              did not trigger the same predicate re-evaluation as one that
              modified it.
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Start a transaction.</li>
              <li>
                Acquire the row with <code>SELECT ... FOR UPDATE</code>.
              </li>
              <li>
                After acquiring the lock, check state, worker identity, current{" "}
                <code>lease_version</code>, and a live lease in the mutation
                statement.
              </li>
              <li>Perform the authorized mutation and commit.</li>
            </ol>
            <p>
              Renewal, completion, and failure reporting now follow this
              sequence. The deadline check uses PostgreSQL’s{" "}
              <code>clock_timestamp()</code>. The extra statement costs a round
              trip while holding the lock; race tests cover lease expiry during
              the wait.
            </p>
            <a
              href={decisionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Read the concurrency decision
            </a>
          </Detail>
        </Section>
      </Container>
    </div>
  );
}
