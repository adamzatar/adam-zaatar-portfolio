"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function ResumePreview() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-2xl border border-border/50 bg-gradient-to-br 
                 from-[var(--surface)] to-[var(--bg)] shadow-lg hover:shadow-xl 
                 transition-shadow duration-500 overflow-hidden"
    >
      {/* === PDF Viewer with shimmer === */}
      <div className="relative h-[480px] w-full overflow-hidden border-b border-border/50">
        {/* Shimmer Loader */}
        {!loaded && !error && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-r 
                       from-muted/30 via-muted/40 to-muted/30"
            aria-hidden="true"
          />
        )}

        {/* Embedded PDF */}
        {!error ? (
          <iframe
            src="/resume/AdamZaatar_CV_2025.pdf"
            loading="lazy"
            className={`w-full h-full transition-opacity duration-700 will-change-[opacity,transform] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            title="Adam Zaatar Resume Preview"
            aria-busy={!loaded}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(false);
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted text-center px-6">
            <p>
              ❌ Failed to load PDF preview. Please{" "}
              <a
                href="/resume/AdamZaatar_CV_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] underline hover:text-[var(--secondary)] transition-colors"
              >
                download the resume
              </a>{" "}
              instead.
            </p>
          </div>
        )}
      </div>

      {/* === Footer with actions === */}
      <div className="p-6 flex justify-between items-center bg-gradient-to-r 
                      from-[var(--surface)]/90 to-[var(--bg)]/80 border-t border-border/40">
        <h3 className="text-lg font-semibold">Resume</h3>
        <Button asChild variant="primary" size="sm">
          <a
            href="/resume/AdamZaatar_CV_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label="Download Adam Zaatar Resume PDF"
          >
            Download PDF
          </a>
        </Button>
      </div>
    </motion.div>
  );
}