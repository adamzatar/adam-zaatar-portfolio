"use client";

import * as React from "react";
import { AlertTriangle, FileText, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { researchItems } from "@/lib/content";

type ResearchItem = (typeof researchItems)[number];

function encodePathSafe(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return encodeURIComponent(path);
  const dir = path.slice(0, lastSlash + 1);
  const file = path.slice(lastSlash + 1);
  return dir + encodeURIComponent(file);
}

export default function ResearchPage() {
  const [selected, setSelected] = React.useState<ResearchItem | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [iframeError, setIframeError] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (selected) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      setIframeError(false);
      setLoading(false);
    }
  }, [selected]);

  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Research
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Research and writing.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Papers and reports from economics coursework and financial literacy
            research.
          </p>
        </div>

        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          {researchItems.map((item) => (
            <article
              key={item.title}
              className="interactive-card flex h-full flex-col rounded-xl border border-border bg-surface p-6 hover:border-primary/45"
            >
              <p className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text">
                {item.status}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-text">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
                Methods
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {item.methods}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={encodePathSafe(item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.title} PDF in a new tab`}
                  className="link-plain inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  Read PDF
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(item);
                    setIframeError(false);
                    setLoading(true);
                  }}
                  aria-label={`Preview ${item.title}`}
                  className="link-plain rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
                >
                  Preview
                </button>
              </div>
            </article>
          ))}
        </section>

        {selected && (
          <section className="mt-14" aria-labelledby="preview-title">
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="preview-title" className="text-2xl font-semibold text-text">
                    {selected.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {selected.description}
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close preview"
                  className="link-plain rounded-lg border border-border p-2 text-text transition-colors duration-200 ease-out hover:border-primary/50"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              {loading && !iframeError && (
                <div
                  className="mt-6 flex h-[600px] w-full items-center justify-center rounded-lg border border-border bg-bg text-sm text-muted"
                  aria-hidden
                >
                  Loading preview...
                </div>
              )}

              {iframeError && (
                <div className="mt-6 rounded-lg border border-border bg-bg p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-text" aria-hidden />
                    <div className="text-sm text-muted">
                      <p className="mb-1 font-medium text-text">
                        Couldn&apos;t load the preview.
                      </p>
                      <p>
                        Some browsers block inline PDF viewing.{" "}
                        <a
                          href={encodePathSafe(selected.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-plain font-semibold text-text underline underline-offset-4"
                        >
                          Open the paper in a new tab
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!iframeError && (
                <iframe
                  key={encodePathSafe(selected.file)}
                  src={encodePathSafe(selected.file)}
                  className={`mt-6 h-[600px] w-full rounded-lg border border-border ${
                    loading ? "hidden" : "block"
                  }`}
                  title={`${selected.title} PDF`}
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setIframeError(true);
                  }}
                />
              )}
            </div>
          </section>
        )}
      </Container>
    </section>
  );
}
