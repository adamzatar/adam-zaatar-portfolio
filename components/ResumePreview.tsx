"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

export default function ResumePreview() {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const resumeHref = "/resume/AdamZaatar_CV_2025.pdf";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card
        variant="elevated"
        padding="lg"
        className="overflow-hidden"
        aria-label="Resume preview"
      >
        {/* Header */}
        <CardHeader className="px-0 pt-0 pb-5 flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-2xl">Resume</CardTitle>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF in a new tab"
              >
                Open in New Tab
              </a>
            </Button>
            <Button asChild variant="primary" size="sm">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label="Download resume PDF"
              >
                Download PDF
              </a>
            </Button>
          </div>
        </CardHeader>

        {/* PDF Viewer */}
        <CardContent className="px-0 py-0">
          <div className="relative w-full h-[520px] rounded-xl overflow-hidden border
                          border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                          bg-[color-mix(in_oklab,var(--surface) 35%,transparent)]">
            {/* Shimmer Loader */}
            {!loaded && !error && (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-pulse"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite]" />
              </div>
            )}

            {/* Embedded PDF */}
            {!error ? (
              <iframe
                src={resumeHref}
                title="Adam Zaatar Resume Preview"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setError(true);
                  setLoaded(false);
                }}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                aria-busy={!loaded}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <p className="text-foreground/80">
                  ❌ Failed to load PDF preview.
                  {" "}
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] underline hover:text-[var(--secondary)] transition-colors"
                  >
                    Click here to download it
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-0 pt-5">
          <div className="flex w-full items-center justify-between">
            <span className="text-muted text-sm">
              Updated: 2025 • PDF • ~170 KB
            </span>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <a
                  href={resumeHref + "#zoom=page-fit"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume at page-fit zoom"
                >
                  Fit to Page
                </a>
              </Button>
              <Button asChild variant="primary" size="sm">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  aria-label="Download resume PDF"
                >
                  Download
                </a>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}