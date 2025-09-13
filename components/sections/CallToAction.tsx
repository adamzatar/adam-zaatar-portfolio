// components/sections/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="relative py-28 bg-gradient-to-b from-primary/10 via-accent/5 to-bg overflow-hidden"
    >
      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl absolute"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl absolute top-20 right-20"
        />
      </div>

      <Container className="relative text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-5xl font-extrabold text-text tracking-tight drop-shadow-sm"
        >
          Let’s Build Something Together
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Whether you’re looking to collaborate, hire, or just chat about
          technology, I’d love to hear from you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Internal route → still use Link */}
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">📩 Contact Me</Link>
          </Button>

          {/* External/static file → use <a> instead of Link */}
          <Button asChild size="lg" variant="outline">
            <a
              href="/resume/AdamZaatar_CV_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Resume
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}