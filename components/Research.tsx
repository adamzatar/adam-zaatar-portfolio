"use client";

import * as React from "react";
import { type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ResearchCard } from "@/components/ResearchCard";

/* --------------------------------
   Types
--------------------------------- */
type ResearchItem = {
  title: string;
  description: string;
  /** Public path or absolute URL to a PDF. */
  file: string;
};

/* --------------------------------
   Data
   (Keep filenames exact; ResearchCard safely handles spaces/encoding.)
--------------------------------- */
const RESEARCH: ResearchItem[] = [
  {
    title: "Economic Statistics Paper (ECON2557)",
    description:
      "Analyzed “greedflation” with OLS regressions on corporate profits and producer price indices after COVID.",
    file: "/research/Zaatar_ECON2557_Paper.pdf",
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
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

/* --------------------------------
   Component (Reusable Grid)
--------------------------------- */
export default function Research() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-8 sm:grid-cols-2"
    >
      {RESEARCH.map((item, i) => (
        <motion.div key={item.title} variants={fadeIn} custom={i}>
          <ResearchCard
            title={item.title}
            description={item.description}
            paperUrl={item.file}
            delay={i * 0.06}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}