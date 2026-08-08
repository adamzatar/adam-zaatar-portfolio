import Link from "next/link";

import PagerDemo from "@/components/demos/PagerDemo";
import { Container } from "@/components/ui/Container";
import { PAGER_SIM_SOURCE_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Virtual Memory Pager Visualizer",
  description:
    "A browser-based visualization of virtual memory behavior from operating systems coursework, including page faults, frame allocation, page-table updates, dirty/reference state, evictions, and clock-style replacement.",
  path: "/projects/virtual-memory-pager",
});

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
            The original C++ source is private because this was an operating
            systems course project. I built this TypeScript demo separately to
            explain the pager without publishing the course solution.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#pager-demo"
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Open demo
            </a>
            <a
              href={PAGER_SIM_SOURCE_URL}
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

        <div id="pager-demo" className="mt-10 scroll-mt-8">
          <PagerDemo />
        </div>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-text">
            Original project and public demo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            For the original C++ project, I implemented page-fault handling,
            frame allocation, page-table updates, eviction, and swap-backed
            memory behavior. I built this public browser demo separately to show
            memory traces, page faults, evictions, dirty and reference bits, and
            clock-style replacement without publishing the course source.
          </p>
        </section>
      </Container>
    </section>
  );
}
