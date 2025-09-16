// app/resume/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import ResumePreview from "@/components/ResumePreview";

export default function Resume() {
  const [resumeAvailable, setResumeAvailable] = useState(false);

  // Check if resume PDF exists in /public/resume
  useEffect(() => {
    fetch("/resume/AdamZaatar_CV_2025.pdf", { method: "HEAD" })
      .then((res) => setResumeAvailable(res.ok))
      .catch(() => setResumeAvailable(false));
  }, []);

  return (
    <section
      id="resume"
      className="relative py-24 bg-surface overflow-hidden"
      aria-labelledby="resume-heading"
    >
      {/* Decorative background orb */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] 
                     bg-gradient-to-r from-[var(--primary)]/30 via-[var(--secondary)]/25 to-[var(--accent)]/20 
                     rounded-full blur-[140px] animate-pulse-slow"
        />
      </div>

      <Container className="text-center">
        {/* === Heading === */}
        <motion.h2
          id="resume-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative inline-block text-4xl sm:text-5xl font-extrabold tracking-tight text-text will-change-[transform,opacity]"
        >
          Resume
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="absolute left-0 -bottom-2 h-[4px] w-full origin-left 
                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                       rounded-full shadow-[0_0_12px_var(--primary)]"
          />
        </motion.h2>

        {/* === Description === */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed will-change-[transform,opacity]"
        >
          A comprehensive overview of my academic background, technical skills,
          and professional experience — presented for clarity and quick
          reference.
        </motion.p>

        {/* === Resume Download Button === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
          className="mt-12 will-change-[transform,opacity]"
        >
          {resumeAvailable ? (
            <Button
              asChild
              variant="primary"
              size="lg"
              className="px-8 py-4 text-lg font-semibold 
                         shadow-[0_0_20px_var(--primary),0_0_40px_var(--secondary)] 
                         hover:shadow-[0_0_30px_var(--accent),0_0_60px_var(--secondary)] 
                         transition-all duration-500"
            >
              <a
                href="/resume/AdamZaatar_CV_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label="Download Adam Zaatar's Resume PDF"
              >
                Download Resume
              </a>
            </Button>
          ) : (
            <p className="text-muted text-lg italic">
              Resume file not found. Please check back soon.
            </p>
          )}
        </motion.div>

        {/* === Resume Preview === */}
        {resumeAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: "easeOut", delay: 0.35 }}
            className="mt-16 will-change-[transform,opacity]"
          >
            <ResumePreview />
          </motion.div>
        )}
      </Container>
    </section>
  );
}