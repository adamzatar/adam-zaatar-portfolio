"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

// Reusable animation variant
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[95vh] overflow-hidden">
      {/* 🌌 Animated Background */}
      <AnimatedBackground />

      {/* Floating Blobs */}
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full 
                   blur-[120px] opacity-60 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[-200px] w-[400px] h-[400px] rounded-full 
                   blur-[120px] opacity-60 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full 
                   blur-[120px] opacity-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)",
        }}
      />

      {/* 🚀 Hero Content */}
      <Container className="relative z-10 text-center px-6">
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-2xl animate-shimmer"
        >
          Hi, I’m Adam Zaatar
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting{" "}
          <span className="font-semibold text-white">
            iOS apps, full-stack platforms, and research projects
          </span>{" "}
          at the intersection of{" "}
          <span className="text-[var(--primary)] font-medium">software</span>,{" "}
          <span className="text-[var(--secondary)] font-medium">finance</span>, and{" "}
          <span className="text-[var(--accent)] font-medium">economics</span>.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-10 flex justify-center gap-6 flex-wrap"
        >
          <Button
            asChild
            size="lg"
            className="shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 transition-all hover:scale-105"
          >
            <Link href="/projects">🚀 View Projects</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:scale-105"
          >
            <Link href="/contact">📬 Get in Touch</Link>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce text-gray-400 text-xl">↓</div>
        </motion.div>
      </Container>
    </section>
  );
}