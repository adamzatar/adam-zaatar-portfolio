"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import { FileText } from "lucide-react";

interface ResearchItem {
  title: string;
  description: string;
  file: string;
}

const research: ResearchItem[] = [
  {
    title: "Economic Statistics Paper (ECON2557)",
    description:
      "Analyzed 'greedflation' with OLS regressions on corporate profits and producer price indices after COVID.",
    file: "/research/Zaatar_ECON2557_Paper.pdf",
  },
  {
    title: "Second-Phase Report",
    description:
      "Expanded the financial literacy study into potential syllabi structures, assignments, grading breakdowns, and implementation strategies for different models of the course, from semester-long to intensive bootcamps.",
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
  {
    title: "Financial Literacy Programs at Peer Institutions",
    description:
      "Studied financial literacy initiatives at peer colleges to inform curriculum design at Bowdoin and local high schools.",
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
];

// Animation utility
const fadeUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

export default function Research() {
  const [selected, setSelected] = useState<ResearchItem | null>(null);

  return (
    <section id="research" className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-40" />

      <Container>
        {/* Heading */}
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          Research
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
        >
          A selection of academic research projects combining{" "}
          <span className="text-[var(--primary)] font-semibold">economics</span>,{" "}
          <span className="text-[var(--secondary)] font-semibold">behavioral insights</span>, and{" "}
          <span className="text-[var(--accent)] font-semibold">quantitative methods</span>.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full origin-center"
        />

        {/* Grid of Research Cards */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {research.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp(index * 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card
                className="group p-6 sm:p-8 rounded-2xl backdrop-blur-sm bg-surface/80 border border-border/60 
                           shadow-subtle hover:shadow-card-hover transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-text mb-3 
                               bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                               bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-muted text-base leading-relaxed mb-6 line-clamp-4">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="primary" size="sm" className="gap-2">
                    <a href={item.file} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4" />
                      Read Paper
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Research Preview */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >
            <Card className="p-6 sm:p-10 rounded-2xl shadow-card backdrop-blur-md bg-surface/95 border border-border/60">
              <h3 className="text-2xl sm:text-3xl font-bold text-text mb-4">
                {selected.title}
              </h3>
              <p className="text-muted mb-6">{selected.description}</p>
              <iframe
                src={selected.file}
                className="w-full h-[600px] rounded-lg border border-border"
                title={selected.title}
              />
            </Card>
          </motion.div>
        )}
      </Container>
    </section>
  );
}