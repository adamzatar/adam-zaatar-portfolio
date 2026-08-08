import Link from "next/link";

import ThreadDemo from "@/components/demos/ThreadDemo";
import { Container } from "@/components/ui/Container";
import { THREAD_SIM_SOURCE_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Thread Library Visualizer",
  description:
    "A browser-based visualization of user-level threading concepts from operating systems coursework, including scheduling, locks, condition-variable behavior, join/yield, and execution traces.",
  path: "/projects/thread-library",
});

export default function ThreadLibraryPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Operating systems demo
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Thread Library Visualizer
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A browser-based visualization of user-level threading concepts from
            my operating systems coursework. The demo shows ready, running,
            blocked, and completed thread states, along with scheduling, lock
            contention, condition-variable-style behavior, join/yield, and
            execution traces.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The original C++ source is private because this was an operating
            systems course project. I built this TypeScript demo separately to
            explain the scheduler without publishing the course solution.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#thread-demo"
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Open demo
            </a>
            <a
              href={THREAD_SIM_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Source
            </a>
            <Link
              href="/projects"
              className="link-plain rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Back to projects
            </Link>
          </div>
        </div>

        <div id="thread-demo" className="mt-10 scroll-mt-8">
          <ThreadDemo />
        </div>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-text">
            Original project and public demo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            For the original C++ project, I built a user-level threading library
            with scheduling, locks, condition variables, join and yield behavior,
            and interrupt-controlled execution. I built this public browser demo
            separately to show thread states, ready queues, blocking, and
            execution traces without publishing the course source.
          </p>
        </section>
      </Container>
    </section>
  );
}
