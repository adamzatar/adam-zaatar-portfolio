// components/sections/ProjectShowcase.tsx
"use client";

import { motion, Variants, easeOut } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

import { projects } from "@/lib/showcase";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
      delay: i * 0.15,
    },
  }),
};

export default function ProjectShowcase() {
  return (
    <section
      id="projects"
      className="relative py-28 bg-gradient-to-b from-surface/60 to-bg"
    >
      <Container>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-text tracking-tight drop-shadow-sm">
            Featured Projects
          </h2>
          <p className="mt-5 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            A curated showcase of iOS apps, full-stack platforms, and creative
            experiments. Each project reflects technical depth, design polish,
            and attention to user experience.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Card className="group relative overflow-hidden h-full flex flex-col rounded-2xl shadow-subtle transition-transform duration-500 hover:scale-[1.03] hover:shadow-card-hover backdrop-blur-md bg-surface/80 border border-border/60">
                {/* Image with overlay & shimmer */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={i < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmer_2s_infinite]" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-text mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-text/80 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex gap-6">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm font-medium rounded-md bg-primary text-primary-contrast hover:bg-primary/90 transition-colors"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm font-medium rounded-md bg-surface border border-border text-muted hover:text-text transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}