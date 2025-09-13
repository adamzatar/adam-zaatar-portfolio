"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import ResumePreview from "@/components/ResumePreview";

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-surface">
      <Container className="text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-text"
        >
          Resume
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl mx-auto"
        >
          A comprehensive overview of my academic background, technical skills,
          and professional experience.
        </motion.p>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-10"
        >
          <Button asChild variant="primary" size="lg">
            <a
              href="/resume/AdamZaatar_CV_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* Resume Preview (modular component) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="mt-12"
        >
          <ResumePreview />
        </motion.div>
      </Container>
    </section>
  );
}