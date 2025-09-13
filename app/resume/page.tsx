"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Resume from "@/components/Resume";
import { motion, Variants, Transition } from "framer-motion";
import { Download, Linkedin } from "lucide-react";

// Reusable animation
const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.15,
    } as Transition,
  },
});

export default function ResumePage() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-50" />

      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          Resume
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
        >
          I’m <span className="font-semibold text-foreground">Adam Zaatar</span>, a
          Computer Science & Economics student at Bowdoin College. My resume
          highlights a unique mix of{" "}
          <span className="font-medium text-[var(--primary)]">software engineering</span>,{" "}
          <span className="font-medium text-[var(--secondary)]">financial analysis</span>, and{" "}
          <span className="font-medium text-[var(--accent)]">research</span>. 
          From building cross-platform apps and full-stack platforms to publishing
          applied economics papers and completing certifications in AI, trading,
          and financial modeling — I bring both technical execution and
          market-driven insight.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full origin-center"
        />

        {/* Resume Component */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="p-6 sm:p-10 rounded-2xl backdrop-blur-sm bg-surface/90 border border-border/60 shadow-card hover:shadow-card-hover transition-transform hover:scale-[1.01]">
            <Resume />
          </Card>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" variant="primary" className="gap-2">
            <a href="/resume/AdamZaatar_CV_2025.pdf" target="_blank">
              <Download className="h-5 w-5" />
              Download PDF
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a
              href="https://www.linkedin.com/in/adamzaatar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              View LinkedIn
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}