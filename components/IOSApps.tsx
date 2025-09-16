"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const apps = [
  {
    title: "Cutaway",
    description:
      "Cutaway is a creator tool for fast, multi-perspective storytelling. Pick a main video, record reaction shots, and Cutaway alternates them into a punchy timeline automatically. You get sensible defaults—cross-dissolves, caption-style lower-thirds, optional music, and bleeps—plus a live preview and export. The flow is intentionally simple: capture → review/retake → preview → export. Templates and a fuller editor are on the roadmap, but v1 focuses on speed, clarity, and a clean look. No paywalls; the core experience will stay free and lightweight.",
    technologies: ["Swift", "SwiftUI", "AVFoundation", "Xcode"],
    link: "#", // Replace with App Store link
    image: "/images/cutaway.png",
    alt: "Cutaway app preview screenshot",
  },
  {
    title: "Bowdoin Marketplace",
    description:
      "Campus marketplace app enabling peer-to-peer exchanges and listings. Built for speed, reliability, and a smooth user experience.",
    technologies: ["Swift", "SwiftUI", "CoreData", "REST APIs"],
    link: "#", // Replace with App Store link
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

// ✅ Skeleton shimmer component
function ShimmerImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className ?? ""}`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}

export default function IOSApps() {
  return (
    <section
      id="ios-apps"
      className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-xl opacity-50" />

      <Container className="text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm will-change-[transform,opacity]"
        >
          iOS Applications
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl mx-auto will-change-[transform,opacity]"
        >
          A showcase of iOS apps designed and developed with a focus on
          performance, clean UI, and user experience. Future App Store launches
          are in progress.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r 
                     from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     rounded-full origin-center will-change-[transform,opacity]"
        />

        {/* Cards Grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.05, 
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              whileHover={{ scale: 1.03, rotateX: 1, rotateY: -1 }}
              whileFocus={{ scale: 1.03, rotateX: 1, rotateY: -1 }}
              className="transform-gpu will-change-[transform,opacity] focus-visible:outline-none"
            >
              <ProjectCard
                {...app}
                imageComponent={
                  <ShimmerImage src={app.image} alt={app.alt} className="rounded-xl" />
                }
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}