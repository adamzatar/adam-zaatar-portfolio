"use client";

import ProjectCard from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { motion, Variants } from "framer-motion";

// ✅ Smooth cubic-bezier easing
const customEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEase, delay: i * 0.15 },
  },
});

const apps = [
  {
    title: "Vector",
    description:
      "Next-generation two-factor authentication system with a SwiftUI iOS client and Vapor backend. Secure token generation/validation, email OTP delivery, session handling with expiry + replay protection, and structured middleware. Backed by PostgreSQL with migrations and modular API.",
    technologies: ["Swift", "SwiftUI", "Vapor", "PostgreSQL", "AWS SES"],
    link: "https://github.com/adamzatar/vector",
    image: "/images/projects/vector.png",
    alt: "Screenshot of Vector 2FA app with SwiftUI interface",
  },
  {
    title: "Cutaway",
    description:
      "iOS app for synchronized multi-angle video recording and playback, built with SwiftUI and AVFoundation.",
    technologies: ["Swift", "SwiftUI", "AVFoundation"],
    link: "https://github.com/adamzatar/cutaway",
    image: "/images/projects/cutaway.png",
    alt: "Cutaway app interface for multi-angle video editing",
  },
  {
    title: "Twitter Clone",
    description:
      "A real-time Twitter clone with live feeds, direct messaging, and media sharing. Built with SwiftUI and Firebase for backend sync, authentication, and push notifications.",
    technologies: ["Swift", "SwiftUI", "Firebase"],
    link: "#", // Replace with repo if available
    image: "/images/projects/twitterclone.png",
    alt: "UI screenshot of a Twitter clone built with SwiftUI and Firebase",
  },
  {
    title: "Instagram Clone",
    description:
      "An Instagram-style social app for sharing photos, real-time comments, and stories. Implements Firebase authentication, storage, and SwiftUI for a smooth and responsive UI.",
    technologies: ["Swift", "SwiftUI", "Firebase"],
    link: "#", // Replace with repo if available
    image: "/images/projects/instagramclone.png",
    alt: "UI screenshot of an Instagram clone app built with SwiftUI and Firebase",
  },
  {
    title: "Investify",
    description:
      "Stock trading simulator delivering real-time S&P 500 data via Yahoo Finance API. Built with SwiftUI and Firebase, it powers classroom use at Bowdoin Economics for finance education and data visualization.",
    technologies: ["Swift", "SwiftUI", "Firebase", "Yahoo Finance API"],
    link: "https://github.com/adamzatar/investify", // Replace with repo if available
    image: "/images/projects/investify.png",
    alt: "Screenshot of Investify stock trading simulator app",
  },
];

export default function Apps() {
  return (
    <section
      id="apps"
      className="relative py-24 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      <Container className="text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent drop-shadow-sm"
        >
          iOS Applications
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          A showcase of iOS apps engineered with Swift and SwiftUI — blending
          security, performance, and seamless user experience.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
          className="mt-10 mb-14 h-[3px] w-40 mx-auto bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full origin-center"
        />

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              variants={fadeUp(index + 2)}
              className="h-full"
            >
              <Card className="p-6 h-full rounded-xl backdrop-blur-sm bg-surface/90 border border-border/60 shadow-subtle hover:shadow-card-hover hover:scale-[1.02] transition-all">
                <ProjectCard {...app} />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}