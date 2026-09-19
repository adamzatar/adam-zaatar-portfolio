"use client";

import * as React from "react";
import { AlertTriangle, FileText, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/Tag";
import {
  researchPapers,
  researchReports,
  type ResearchItem,
} from "@/lib/content";

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
  const previewTriggerRef = React.useRef<HTMLButtonElement | null>(null);

  const closePreview = React.useCallback(() => {
    const trigger = previewTriggerRef.current;
    setSelected(null);
    setIframeError(false);
    setLoading(false);
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  React.useEffect(() => {
    if (!selected) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePreview, selected]);

  React.useEffect(() => {
    if (!selected) return;
    const focusTimer = window.setTimeout(
      () => closeBtnRef.current?.focus(),
      50,
    );
    return () => window.clearTimeout(focusTimer);
  }, [selected]);

  const openPreview = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: ResearchItem,
  ) => {
    previewTriggerRef.current = event.currentTarget;
    setSelected(item);
    setIframeError(false);
    setLoading(true);
  };

  return (
    <div className="bg-bg">
      <section className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="py-14 sm:py-16">
          <h1 className="text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Research
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Economics papers from coursework, and two reports from a summer of
            financial-literacy research at Bowdoin. Every one is available as a
            PDF.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {researchPapers.map((item, index) => (
            <article
              key={item.title}
              className={`interactive-card flex flex-col rounded-xl border border-border bg-surface p-6 hover:border-primary/45 sm:p-7 ${
                index < 2 ? "" : "lg:p-6"
              }`}
            >
              <h2
                className={`font-semibold text-text ${
                  index < 2 ? "text-2xl" : "text-xl"
                }`}
              >
                {item.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                {item.summary}
              </p>
              <TagList
                items={item.methods}
                label={`${item.title} methods`}
                className="mt-5"
              />
              <PaperActions item={item} onPreview={openPreview} />
            </article>
          ))}
        </div>

        <section className="mt-14" aria-labelledby="reports">
          <div className="max-w-2xl">
            <h2 id="reports" className="text-2xl font-semibold text-text">
              Financial literacy at Bowdoin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              As a Gibbons Research Fellow in summer 2025, I looked at how other
              colleges teach personal finance and then drafted course models for
              Bowdoin. The two reports build on each other.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
            {researchReports.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-4 border-b border-border p-6 last:border-b-0 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:gap-6"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-text"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                </div>
                <PaperActions item={item} onPreview={openPreview} compact />
              </article>
            ))}
          </div>
        </section>

        {selected && (
          <div
            className="mt-14"
            role="dialog"
            aria-labelledby="preview-title"
            aria-describedby="preview-description"
          >
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="preview-title"
                    className="text-2xl font-semibold text-text"
                  >
                    {selected.title}
                  </h2>
                  <p
                    id="preview-description"
                    className="mt-2 text-sm leading-relaxed text-muted"
                  >
                    {selected.description}
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closePreview}
                  aria-label="Close preview"
                  className="link-plain rounded-lg border border-border p-2 text-text transition-colors duration-200 ease-out hover:border-primary/50"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              {loading && !iframeError && (
                <div
                  className="mt-6 flex h-[600px] w-full items-center justify-center rounded-lg border border-border bg-bg text-sm text-muted"
                  role="status"
                >
                  Loading preview...
                </div>
              )}

              {iframeError && (
                <div className="mt-6 rounded-lg border border-border bg-bg p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="mt-0.5 h-5 w-5 text-text"
                      aria-hidden
                    />
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
          </div>
        )}
      </Container>
    </div>
  );
}

function PaperActions({
  item,
  onPreview,
  compact = false,
}: {
  item: ResearchItem;
  onPreview: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: ResearchItem,
  ) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-3 ${compact ? "md:justify-end" : "mt-6"}`}
    >
      <a
        href={encodePathSafe(item.file)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} PDF in a new tab`}
        className={`link-plain inline-flex items-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 ease-out ${
          compact
            ? "border border-border bg-bg px-3 py-1.5 text-text hover:border-primary/50"
            : "bg-primary px-4 py-2 text-primary-contrast hover:bg-primary/90"
        }`}
      >
        <FileText className="h-4 w-4" aria-hidden />
        PDF
      </a>
      <button
        type="button"
        onClick={(event) => onPreview(event, item)}
        aria-label={`Preview ${item.title}`}
        className={`link-plain rounded-lg border border-border text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50 ${
          compact ? "bg-bg px-3 py-1.5" : "bg-bg px-4 py-2"
        }`}
      >
        Preview
      </button>
    </div>
  );
}
