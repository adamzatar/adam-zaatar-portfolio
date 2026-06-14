import { Container } from "@/components/ui/Container";
import { RESUME_PATH } from "@/lib/constants/resume";

export default function ResumePage() {
  return (
    <section
      id="resume"
      className="bg-bg py-16 sm:py-20"
      aria-labelledby="resume-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Resume
          </p>
          <h1
            id="resume-heading"
            className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl"
          >
            Academic and technical background.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A PDF summary of Adam&apos;s education, experience, technical work,
            and research.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Open resume
            </a>
            <a
              href={RESUME_PATH}
              download
              className="link-plain rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-xl border border-border bg-surface p-3">
          <iframe
            src={RESUME_PATH}
            title="Adam Zaatar resume PDF"
            className="h-[680px] w-full rounded-lg border border-border bg-bg"
          />
        </div>
      </Container>
    </section>
  );
}
