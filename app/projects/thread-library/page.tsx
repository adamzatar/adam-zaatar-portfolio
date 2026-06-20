import type { Metadata } from "next";
import Link from "next/link";

import ThreadDemo from "@/components/demos/ThreadDemo";
import { Container } from "@/components/ui/Container";
import { THREAD_SIM_SOURCE_URL, THREAD_UI_SOURCE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thread Library Visualizer",
  description:
    "A browser-based visualization of user-level threading concepts from operating systems coursework, including scheduling, locks, condition-variable behavior, join/yield, and execution traces.",
};

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
            The original implementation was completed for an operating systems
            course, so the source code is not public. This demo is a separate
            visualization built to explain the system behavior without exposing
            course solutions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={THREAD_SIM_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              View simulation source
            </a>
            <a
              href={THREAD_UI_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              View UI source
            </a>
            <Link
              href="/projects"
              className="link-plain rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Back to projects
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ThreadDemo />
        </div>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-text">
            How I describe this work
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Built a user-level threading project in C++ involving scheduling,
            synchronization, locks, condition-variable behavior, join/yield, and
            interrupt-controlled execution. Created a public browser demo that
            visualizes thread states, ready queues, blocking, and execution
            traces without exposing course source code.
          </p>
        </section>
      </Container>
    </section>
  );
}
