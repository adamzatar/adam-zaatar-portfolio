"use client";

import * as React from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { FileText, X, AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import AnimatedBackground from "@/components/AnimatedBackground";

/* --------------------------------
   Types
--------------------------------- */
type ResearchItem = {
  title: string;
  description: string;
  /** Path under /public (e.g. /research/my paper.pdf). */
  file: string;
};

/* --------------------------------
   Data
   (Spaces in filenames are okay; we encode the trailing file segment only.)
--------------------------------- */
const RESEARCH: ResearchItem[] = [
  {
    title: "Economic Statistics Paper (ECON2557)",
    description:
      "Analyzed “greedflation” with OLS regressions on corporate profits and producer price indices after COVID.",
    file: "/research/Zaatar_ECON2557_Paper.pdf", // <-- ensure this exact name exists in /public/research
  },
  {
    title: "Second-Phase Report",
    description:
      "Expanded the financial literacy study into potential syllabi structures, assignments, grading breakdowns, and implementation strategies for different course models—from semester-long to intensive bootcamps.",
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
  {
    title: "Financial Literacy Programs at Peer Institutions",
    description:
      "Studied financial literacy initiatives at peer colleges to inform curriculum design at Bowdoin and local high schools.",
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
];

/* --------------------------------
   Motion
--------------------------------- */
const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
  },
});

/* --------------------------------
   Helpers
--------------------------------- */
/** Encode only the filename segment; keep path slashes intact. */
function encodePathSafe(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return encodeURIComponent(path);
  const dir = path.slice(0, lastSlash + 1);
  const file = path.slice(lastSlash + 1);
  return dir + encodeURIComponent(file);
}

/* --------------------------------
   Page
--------------------------------- */
export default function ResearchPage() {
  const [selected, setSelected] = React.useState<ResearchItem | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [iframeError, setIframeError] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  // Close preview with Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the close button when preview opens (a11y)
  React.useEffect(() => {
    if (selected) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      setIframeError(false);
      setLoading(false);
    }
  }, [selected]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden bg-gradient-to-b from-surface/70 to-bg">
        {/* 🔭 Animated sky behind content */}
        <AnimatedBackground />

        {/* Subtle wash above sky */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[radial-gradient(60%_40%_at_50%_-10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]"
        />

        <Container className="py-20 sm:py-28 relative z-0">
          {/* Heading */}
          <header className="text-center max-w-4xl mx-auto">
            <motion.h1
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
              className="text-pretty text-4xl sm:text-5xl font-extrabold tracking-tight
                         bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                         bg-clip-text text-transparent drop-shadow-sm"
            >
              Research
            </motion.h1>

            <motion.p
              variants={fadeUp(0.5)}
              initial="hidden"
              animate="visible"
              className="mt-6 text-balance text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
            >
              A selection of academic projects combining{" "}
              <span className="text-[var(--primary)] font-semibold">economics</span>,{" "}
              <span className="text-[var(--secondary)] font-semibold">behavioral insights</span>, and{" "}
              <span className="text-[var(--accent)] font-semibold">quantitative methods</span>.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-10 h-[3px] w-44 mx-auto bg-gradient-to-r
                         from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                         rounded-full origin-center"
              aria-hidden
            />
          </header>

          {/* Grid of research cards */}
          <section className="mt-12 grid gap-8 sm:grid-cols-2">
            {RESEARCH.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp(1 + index * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="ui-card flex flex-col rounded-2xl p-0 overflow-hidden
                           border border-[color-mix(in_oklab,var(--border)_70%,transparent)]
                           shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]
                           ring-1 ring-white/5 transition-all"
              >
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-3
                               bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                               bg-clip-text text-transparent"
                  >
                    {item.title}
                  </h2>
                  <p className="text-muted text-base leading-relaxed flex-1 mb-6">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-end gap-3">
                    {/* Read in new tab (downloadable, guaranteed encoded) */}
                    <Button asChild variant="primary" size="sm" className="gap-2">
                      <a
                        href={encodePathSafe(item.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.title} PDF in a new tab`}
                      >
                        <FileText className="w-4 h-4" />
                        Read Paper
                      </a>
                    </Button>

                    {/* In-page Preview */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelected(item);
                        setIframeError(false);
                        setLoading(true);
                      }}
                      aria-label={`Preview ${item.title}`}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          {/* Selected research preview */}
          {selected && (
            <motion.section
              key={selected.file} // force remount on different file (re-triggers iframe load)
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-14"
              aria-labelledby="preview-title"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl bg-[var(--surface)]/90
                              supports-[backdrop-filter]:backdrop-blur-xl
                              border border-[color-mix(in_oklab,var(--border)_70%,transparent)]
                              shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 id="preview-title" className="text-2xl sm:text-3xl font-bold text-foreground">
                      {selected.title}
                    </h3>
                    <p className="mt-2 text-muted">{selected.description}</p>
                  </div>

                  <Button
                    ref={closeBtnRef}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelected(null)}
                    aria-label="Close preview"
                    className="shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Loader */}
                {loading && !iframeError && (
                  <div
                    className="mt-6 w-full h-[600px] rounded-lg border
                               border-[color-mix(in_oklab,var(--border)_70%,transparent)]
                               bg-[color-mix(in_oklab,var(--surface)_35%,transparent)]
                               animate-pulse relative overflow-hidden"
                    aria-hidden
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>
                )}

                {/* Error state */}
                {iframeError && (
                  <div className="mt-6 w-full rounded-lg border border-[color-mix(in_oklab,var(--border)_70%,transparent)] p-6 bg-[color-mix(in_oklab,var(--surface)_35%,transparent)]">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                      <div className="text-sm text-muted">
                        <p className="font-medium text-foreground mb-1">Couldn’t load the preview.</p>
                        <p>
                          Some browsers block inline PDF viewing.{" "}
                          <a
                            href={encodePathSafe(selected.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--primary)] underline hover:opacity-90"
                          >
                            Open the paper in a new tab
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PDF iframe */}
                {!iframeError && (
                  <iframe
                    key={encodePathSafe(selected.file)}
                    src={encodePathSafe(selected.file)}
                    className={`mt-6 w-full h-[600px] rounded-lg border
                                border-[color-mix(in_oklab,var(--border)_70%,transparent)]
                                transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                    title={`${selected.title} (PDF)`}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setIframeError(true);
                    }}
                  />
                )}
              </div>
            </motion.section>
          )}
        </Container>
      </main>
    </MotionConfig>
  );
}