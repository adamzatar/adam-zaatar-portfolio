"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

// ----------------------------
// App Data
// ----------------------------
const apps = [
  {
    title: "Cutaway",
    description:
      "Cutaway is a creator tool for fast, multi-perspective storytelling. Pick a main video, record reaction shots, and Cutaway alternates them into a punchy timeline automatically. You get sensible defaults—cross-dissolves, caption-style lower-thirds, optional music, and bleeps—plus a live preview and export.",
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

// ----------------------------
// Skeleton shimmer image
// ----------------------------
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
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700" />
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

// ----------------------------
// iOS App Card
// ----------------------------
function IOSAppCard({
  title,
  description,
  image,
  alt,
  link,
}: (typeof apps)[number]) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="bg-white dark:bg-[#161b22] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <ShimmerImage src={image} alt={alt} className="rounded-t-2xl" />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
          {description}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-primary dark:text-secondary font-semibold hover:underline"
          >
            View on App Store →
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ----------------------------
// Section
// ----------------------------
export default function IOSApps() {
  return (
    <section
      id="ios-apps"
      className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-xl opacity-40" />

      <Container className="text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          iOS Applications
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl mx-auto"
        >
          A showcase of iOS apps designed and developed with a focus on
          performance, clean UI, and user experience. Future App Store launches
          are in progress.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r 
                     from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     rounded-full origin-center"
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
            >
              <IOSAppCard {...app} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}