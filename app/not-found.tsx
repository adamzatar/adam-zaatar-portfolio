// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 dark:from-primary/10 dark:via-accent/20 dark:to-secondary/10"
      />

      {/* Optional Floating Illustration */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
      </motion.div>

      <Container className="relative z-10 text-center">
        {/* Big 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl sm:text-8xl font-extrabold tracking-tight text-text drop-shadow-md"
        >
          404
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mt-6 text-lg text-muted max-w-xl mx-auto"
        >
          Oops! The page you’re looking for doesn’t exist.  
          But don’t worry—you can head back home and explore my work.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-10"
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/">🏠 Back to Home</Link>
          </Button>
        </motion.div>

        {/* Extra Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 flex justify-center gap-6 text-sm text-muted"
        >
          <Link href="/projects" className="hover:text-primary transition-colors">
            View Projects
          </Link>
          <Link href="/research" className="hover:text-primary transition-colors">
            Explore Research
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Me
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}