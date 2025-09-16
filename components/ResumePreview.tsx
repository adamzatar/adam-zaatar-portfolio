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
      className="relative rounded-2xl border border-border bg-white dark:bg-[#161b22]
                 shadow-md hover:shadow-xl transition-all duration-500
                 flex flex-col overflow-hidden"
    >
      {/* === PDF Viewer with shimmer === */}
      <div className="relative h-[480px] w-full border-b border-border">
        {/* Shimmer Loader */}
        {!loaded && !error && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-r 
                       from-muted/20 via-muted/30 to-muted/20"
            aria-hidden="true"
          />
        )}

        {/* Embedded PDF */}
        {!error ? (
          <iframe
            src="/resume/AdamZaatar_CV_2025.pdf"
            loading="lazy"
            className={`w-full h-full transition-opacity duration-700 ${
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
                className="text-primary underline hover:text-secondary transition-colors"
              >
                download the resume
              </a>{" "}
              instead.
            </p>
          </div>
        )}
      </div>

      {/* === Footer with actions === */}
      <div className="p-6 flex justify-between items-center bg-white dark:bg-[#161b22] border-t border-border">
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