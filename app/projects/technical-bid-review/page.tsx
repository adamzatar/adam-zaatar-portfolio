import {
  CaseContents,
  CaseHeader,
  Detail,
  Panel,
  Section,
  Stat,
  caseBodyClass as bodyClass,
} from "@/components/case-studies/CaseStudy";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_BID_REVIEW_REPO_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Technical Bid Review",
  description:
    "A system that checks vendor proposals against a technical specification. A model finds the evidence and proposes a status, separate code checks its citations and numbers, and a reviewer makes the final call.",
  path: "/projects/technical-bid-review",
});

const contents = [
  ["Model and code", "evidence"],
  ["Results", "benchmarks"],
  ["Human review", "review"],
  ["Implementation notes", "backend"],
] as const;

export default function TechnicalBidReviewPage() {
  return (
    <div className="bg-bg">
      <CaseHeader
        title="Technical Bid Review"
        lead="Checks vendor proposals against a technical specification. A model finds the evidence, and separate code checks what it found."
        technologies={[
          "Python 3.14",
          "FastAPI",
          "PostgreSQL",
          "psycopg 3",
          "OpenAI Responses API",
          "pytest",
        ]}
        sourceHref={TECHNICAL_BID_REVIEW_REPO_URL}
      >
        <p className={bodyClass}>
          For each requirement, the model proposes a status with citations. A
          reviewer can accept or override the result. The current demo uses
          synthetic documents for a backup-generator purchase.
        </p>
      </CaseHeader>

      <Container className="pb-16 sm:pb-20">
        <CaseContents
          label="Technical Bid Review case study contents"
          items={contents}
        />

        <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="bg-gradient-to-br from-primary/10 via-bg to-bg px-6 py-8 sm:px-10 sm:py-10">
            <figcaption className="text-sm font-medium text-muted">
              One requirement: minimum continuous output
            </figcaption>
            <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
              <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
                <p className="text-sm text-muted">Vendor proposal</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-text sm:text-4xl">
                  1,850 kW
                </p>
              </div>
              <span
                className="text-center text-3xl font-semibold text-primary"
                aria-label="less than"
              >
                &lt;
              </span>
              <div className="rounded-xl border border-primary/35 bg-primary/10 p-5 shadow-sm">
                <p className="text-sm text-muted">Specification</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-text sm:text-4xl">
                  2,000 kW
                </p>
              </div>
            </div>
            <p className="mt-6 w-fit rounded-full bg-primary px-3 py-1 font-mono text-xs font-semibold text-primary-contrast">
              NON_COMPLIANT
            </p>
          </div>
          <p className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted sm:px-10">
            The model finds the continuous-output passage and reads what it
            means. Code then checks that the cited text really contains those
            numbers and that 1,850 is below 2,000. Both the proposal and the
            validation findings stay attached to the requirement for review.
          </p>
        </figure>

        <Section id="evidence" title="What the model does and what code checks">
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Panel title="The model" accent>
              <p>
                Reads the requirement, breaks it into checkable parts, searches
                the proposal, and reads the passages that look relevant. It
                proposes a status with a rationale, pulls out candidate numbers,
                and says so when the evidence is unclear.
              </p>
              <p>It gets exactly two tools:</p>
              <ul className="space-y-1.5 font-mono text-xs text-text [overflow-wrap:anywhere]">
                <li>search_evidence(query, top_k=5)</li>
                <li>read_source_unit(source_unit_id)</li>
              </ul>
            </Panel>
            <Panel title="Application code">
              <p>
                Checks that citations match the source text in the selected
                vendor revision, re-runs selected numeric comparisons, and
                stores the result. The model cannot write to the database or
                read another vendor’s proposal.
              </p>
              <p>
                Proposal text is treated as data. The model’s tools only search
                and read the selected revision; they provide no shell, SQL, or
                web access.
              </p>
            </Panel>
          </div>
          <Detail title="Numeric checks and their limits">
            <p>
              Validation is deliberately narrow: selected MW and kW comparisons,
              seconds, °C, dBA, hours, and percentage-load conditions. It is not
              a general engineering-calculation engine.
            </p>
            <p>
              A 1,500-gallon fuel tank does not establish 24 hours of runtime at
              75% load. The evidence must support the actual runtime and load
              requirement. Validation conflicts are recorded without rewriting
              the model proposal.
            </p>
          </Detail>
        </Section>

        <Section id="benchmarks" title="Results so far">
          <p className={bodyClass}>
            These are small benchmarks on synthetic documents with reviewed
            expected results. The ten-case holdout was frozen before its first
            evaluation and was never used for tuning.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Stat
              value="10 / 10"
              label="Classifications correct on the frozen holdout"
            >
              <p>
                Every status matched the expected result, with no
                false-compliance errors. One numeric-fact citation failed strict
                quote validation. The citation check caught it, and the
                classification was unaffected.
              </p>
            </Stat>
            <Stat value="14 / 14" label="Expected evidence units retrieved">
              <p>
                Across 10 requirements, every expected evidence unit appeared in
                the top five results for its query. Expected evidence was chosen
                before retrieval ran. PostgreSQL full-text search was enough
                here, so I did not add vector search.
              </p>
            </Stat>
          </div>
          <Detail title="Automated test coverage">
            <p>
              The backend suite has 293 passing tests, including citation and
              numeric checks, vendor isolation, prompt-injection boundaries, and
              worker integration.
            </p>
            <p>
              Worker tests cover concurrent claims and rejection of results from
              expired owners.
            </p>
          </Detail>
        </Section>

        <Section id="review" title="Human review">
          <p className={bodyClass}>
            A reviewer can accept the proposal or override its status and add a
            note. The model-proposed status, rationale, and validation findings
            are preserved either way, and the effective status reflects the
            reviewer’s decision.
          </p>
          <p className={bodyClass}>
            The current implementation stores the latest human review
            separately. It does not keep a history of every review edit.
          </p>
        </Section>

        <Section id="backend" title="Implementation notes">
          <p className={bodyClass}>
            Runs snapshot the exact requirement inputs and pin vendor revisions
            and evaluator configuration. A past run keeps its original meaning
            even when later documents or requirements change.
          </p>
          <Detail title="Immutable inputs and worker ownership">
            <p>
              Stored source passages retain their exact text and line ranges. A
              citation points back to that immutable passage in the pinned
              document revision.
            </p>
            <p>
              One logical evaluation job exists for each run, requirement, and
              vendor revision. Workers claim jobs with PostgreSQL{" "}
              <code>FOR UPDATE SKIP LOCKED</code>. Each claim carries worker
              identity, lease expiration, and a monotonically increasing claim
              generation.
            </p>
            <p>
              After an expired claim is reclaimed, generation fencing prevents
              the stale worker from establishing authority. At most one
              authoritative result is accepted for a logical job, even though
              execution itself can happen more than once.
            </p>
          </Detail>
          <p className={bodyClass}>
            The repository contains the API routes, benchmark manifests, and
            full development results. These synthetic tests do not establish
            accuracy on real procurement documents.
          </p>
        </Section>
      </Container>
    </div>
  );
}
