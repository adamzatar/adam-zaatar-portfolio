"use client";

import AppImage from "@/components/AppImage";
import { Container } from "@/components/ui/Container";
import { type Variants, type Transition } from "framer-motion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ImageKey } from "@/lib/images";

const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 } as Transition,
  },
});

// ✅ Project data now uses strongly typed image keys
const projects: {
  title: string;
  description: string;
  image: ImageKey;
  github?: string;
  demo?: string;
}[] = [
  {
    title: "Vector 2FA (SwiftUI + Vapor)",
    description:
      "Multi-platform authenticator with passkeys, encrypted offline vault, biometric fallback, and CloudKit sync — shipping secure onboarding in under 60 seconds.",
    image: "vector",
    github: "https://github.com/adamzatar/vector",
  },
  {
    title: "Bowdoin Marketplace",
    description:
      "Honors research in progress: building a student marketplace with faculty collaboration to explore how supply, demand, and pricing affect social efficiency and campus access.",
    image: "bowdoinMarketplace",
    github: "https://github.com/adamzatar/bowdoin-marketplace",
  },
  {
    title: "Personal Portfolio Platform",
    description:
      "This site: Next.js 15, persistent animated background, SmartImage caching, Tailwind tokens, and MotionConfig reduced-motion safety — deployed on Vercel edge.",
    image: "personalPortfolio",
    github: "https://github.com/adamzatar/adam-zaatar-portfolio",
    demo: "/",
  },
];

export default function ProjectsPage() {
  return (
    <section className="relative overflow-hidden py-28">
      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
                     bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent) 
                     bg-clip-text text-transparent drop-shadow-sm"
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
          <span className="font-semibold text-(--primary)">cross-platform apps</span>,{" "}
          <span className="font-semibold text-(--secondary)">full-stack platforms</span> and{" "}
          <span className="font-semibold text-(--accent)">applied research</span> — where strong
          infrastructure meets clean design and market-driven insight.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto 
                     bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent) 
                     rounded-full origin-center"
        />

        {/* Featured Project */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="p-8 sm:p-12 rounded-2xl shadow-card hover:shadow-card-hover 
                           backdrop-blur-sm bg-surface/90 border border-border/60 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-text mb-6">
              Featured: Bowdoin Marketplace
            </h2>
            <AppImage
              image="bowdoinMarketplace"
              alt="Bowdoin Marketplace"
              width={900}
              height={500}
              className="rounded-xl shadow-lg mx-auto mb-6"
            />
            <p className="text-muted text-center max-w-2xl mx-auto mb-6">
              A production-grade campus marketplace delivered as a React/Node monorepo. Next.js frontend, Fastify APIs,
              Prisma/PostgreSQL on AWS, S3 asset storage, Cognito-backed auth, Redis rate limiting, and OpenTelemetry
              tracing keep it secure, observable, and cost-aware.
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
              <Card className="overflow-hidden rounded-xl shadow-card hover:shadow-card-hover 
                               transition-all bg-surface/90 border border-border/60">
                <div className="relative w-full h-56">
                  <AppImage
                    image={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3 pt-3">
                    {project.github ? (
                      <Button asChild size="sm" variant="primary">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" disabled>
                        Private
                      </Button>
                    )}
                    {project.demo ? (
                      <Button asChild size="sm" variant="outline">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Demo
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 
                      bg-linear-to-tr from-primary/10 via-secondary/10 to-accent/10 
                      blur-3xl opacity-60" />
    </section>
  );
}
