import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-bg py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Page not found.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            The page may have moved, or the link may be out of date.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="link-plain rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Back home
            </Link>
            <Link
              href="/projects"
              className="link-plain rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              View projects
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
