"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion, Variants, Transition } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 } as Transition,
  },
});

// Project data
const projects = [
  {
    title: "Vector (2FA App)",
    description:
      "A next-gen 2FA app built with SwiftUI + Vapor for security and seamless UX.",
    image: "/images/projects/vector.png",
    github: "https://github.com/adamzatar/vector",
    demo: "#",
  },
  {
    title: "Cutaway",
    description:
      "Mobile-first tool for social music sharing and curated playlist experiences.",
    image: "/images/projects/cutaway.png",
    github: "https://github.com/adamzatar/cutaway",
    demo: "#",
  },
  {
    title: "PalPrep",
    description:
      "Advocacy platform designed for community organizing, education, and outreach.",
    image: "/images/projects/palprep.png",
    github: "https://github.com/adamzatar/palprep",
    demo: "#",
  },
  {
    title: "Portfolio Site",
    description:
      "This very site – built with Next.js, Tailwind, and Framer Motion, fully animated and responsive.",
    image: "/images/projects/portfolio.png",
    github: "https://github.com/adamzatar/adam-zaatar-portfolio",
    demo: "/",
  },
  {
    title: "Investify",
    description:
      "iOS-first financial literacy app to help young investors learn fundamentals.",
    image: "/images/projects/investify.png",
    github: "https://github.com/adamzatar/investify",
    demo: "#",
  },
];

export default function ProjectsPage() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent drop-shadow-sm"
        >
          Projects
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
        >
          A selection of{" "}
          <span className="font-semibold text-[var(--primary)]">cross-platform apps</span>,{" "}
          <span className="font-semibold text-[var(--secondary)]">full-stack platforms</span> and{" "}
          <span className="font-semibold text-[var(--accent)]">applied research</span> — where strong
          infrastructure meets clean design and market-driven insight.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full origin-center"
        />

        {/* Featured Project */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="p-8 sm:p-12 rounded-2xl shadow-card hover:shadow-card-hover backdrop-blur-sm bg-surface/90 border border-border/60 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-text mb-6">
              Featured: Bowdoin Marketplace
            </h2>
            <Image
              src="/images/projects/bowdoin-marketplace.png"
              alt="Bowdoin Marketplace"
              width={900}
              height={500}
              className="rounded-xl shadow-lg mx-auto mb-6"
            />
            <p className="text-muted text-center max-w-2xl mx-auto mb-6">
              A production-grade campus and community marketplace built as a TypeScript monorepo.
              Secure authentication, Prisma/PostgreSQL, Redis-backed rate limiting, and full
              observability with OpenTelemetry. Designed for scale, reliability, and seamless UX.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <a
                  href="https://github.com/adamzatar/bowdoin-marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp(i * 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all bg-surface/90 border border-border/60">
                <div className="relative w-full h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                  <div className="flex gap-3 pt-3">
                    <Button asChild size="sm" variant="primary">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                    {project.demo !== "#" && (
                      <Button asChild size="sm" variant="outline">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-60" />
    </section>
  );
}