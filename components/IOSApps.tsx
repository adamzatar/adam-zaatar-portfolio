"use client";

import ProjectCard from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const apps = [
  {
    title: "Cutaway",
    description:
      "Cutaway is a creator tool for fast, multi-perspective storytelling. Pick a main video, record reaction shots, and Cutaway alternates them into a punchy timeline automatically. You get sensible defaults—cross-dissolves, caption-style lower-thirds, optional music, and bleeps—plus a live preview and export. The flow is intentionally simple: capture → review/retake → preview → export. Templates and a fuller editor are on the roadmap, but v1 focuses on speed, clarity, and a clean look. No paywalls; the core experience will stay free and lightweight.",
    technologies: ["Swift", "SwiftUI", "AVFoundation", "Xcode"],
    link: "#", // Replace with App Store link when live
    image: "/images/cutaway.png",
    alt: "Cutaway app preview screenshot",
  },
  {
    title: "Bowdoin Marketplace",
    description:
      "Campus marketplace app enabling peer-to-peer exchanges and listings. Built for speed, reliability, and a smooth user experience.",
    technologies: ["Swift", "SwiftUI", "CoreData", "REST APIs"],
    link: "#", // Replace with App Store link when live
    image: "/images/bowdoin-marketplace.png",
    alt: "Bowdoin Marketplace app screenshot",
  },
  {
    title: "Upcoming Releases",
    description:
      "Several additional iOS applications are under active development, with a focus on finance, productivity, and education.",
    technologies: ["Swift", "SwiftUI", "AI APIs"],
    link: "#",
    image: "/images/upcoming.png",
    alt: "Placeholder for upcoming iOS apps",
  },
];

export default function IOSApps() {
  return (
    <section id="ios-apps" className="py-20 bg-bg">
      <Container className="text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text"
        >
          iOS Applications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl mx-auto"
        >
          A showcase of iOS apps designed and developed with a focus on
          performance, clean UI, and user experience. Future App Store launches
          are in progress.
        </motion.p>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ProjectCard {...app} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}