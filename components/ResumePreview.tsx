"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function ResumePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-surface border border-border rounded-xl shadow-md overflow-hidden"
    >
      {/* Embedded PDF */}
      <div className="h-[400px] w-full overflow-hidden border-b border-border">
        <iframe
          src="/resume/AdamZaatar_CV_2025.pdf"
          className="w-full h-full"
          title="Adam Zaatar Resume Preview"
        ></iframe>
      </div>

      {/* Actions */}
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">Resume</h3>
        <Button asChild variant="primary" size="sm">
          <a
            href="/resume/AdamZaatar_CV_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </Button>
      </div>
    </motion.div>
  );
}