// app/showcase/page.tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import { Button } from "@/components/ui/Button";
import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function ShowcasePage() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-40" />

      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-extrabold text-center 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          Project Showcase
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
        >
          A curated selection of my most impactful work — spanning{" "}
          <span className="text-[var(--primary)] font-semibold">cross-platform apps</span>,{" "}
          <span className="text-[var(--secondary)] font-semibold">full-stack platforms</span>, and{" "}
          <span className="text-[var(--accent)] font-semibold">applied research</span>. 
          These projects bring together strong engineering,{" "}
          data-driven economics, and thoughtful design — from{" "}
          secure authentication systems and trading simulators to{" "}
          marketplace platforms and AI-driven solutions.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     rounded-full origin-center"
        />

        {/* Showcase Grid inside a Card */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="p-8 sm:p-12 rounded-2xl backdrop-blur-sm bg-surface/90 border border-border/60 shadow-card hover:shadow-card-hover transition-all">
            <ProjectShowcase />
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-xl">
            <a href="/projects">
              Explore All Projects
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}