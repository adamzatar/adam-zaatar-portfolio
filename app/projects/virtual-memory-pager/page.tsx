import type { Metadata } from "next";
import Link from "next/link";

import PagerDemo from "@/components/demos/PagerDemo";
import { Container } from "@/components/ui/Container";
import { PAGER_SIM_SOURCE_URL, PAGER_UI_SOURCE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Virtual Memory Pager Visualizer",
  description:
    "A browser-based visualization of virtual memory behavior from operating systems coursework, including page faults, frame allocation, page-table updates, dirty/reference state, evictions, and clock-style replacement.",
};

export default function VirtualMemoryPagerPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Operating systems demo
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Virtual Memory Pager Visualizer
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A browser-based visualization of virtual memory behavior from my
            operating systems coursework. The demo shows memory accesses, page
            faults, frame allocation, page-table updates, dirty/reference state,
            evictions, swap-backed pages, and a high-level clock-style
            replacement model.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The original implementation was completed for an operating systems
            course, so the source code is not public. This demo is a separate
            visualization built to explain the system behavior without exposing
            course solutions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={PAGER_SIM_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              View simulation source
            </a>
            <a
              href={PAGER_UI_SOURCE_URL}
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
          <PagerDemo />
        </div>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-text">
            How I describe this work
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Implemented a virtual memory pager in C++ with page fault handling,
            frame allocation, page-table updates, eviction logic, and
            swap-backed memory behavior. Built a public browser demo to
            visualize memory traces, page faults, evictions, dirty/reference
            state, and clock-style replacement without exposing course source
            code.
          </p>
        </section>
      </Container>
    </section>
  );
}
