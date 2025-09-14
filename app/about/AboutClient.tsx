"use client";

import AppImage from "@/components/AppImage";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-surface/90 to-bg">
      {/* Decorative background blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 blur-3xl rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />

      <Container className="py-20 sm:py-28">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight 
                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                       bg-clip-text text-transparent drop-shadow-xl animate-shimmer"
          >
            About Me
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl leading-relaxed text-muted"
          >
            I’m <span className="font-semibold text-foreground">Adam Zaatar</span>, a{" "}
            <span className="font-semibold">Computer Science & Economics student at Bowdoin College</span>, 
            passionate about building at the intersection of{" "}
            <span className="text-[var(--primary)] font-medium">software</span>,{" "}
            <span className="text-[var(--secondary)] font-medium">finance</span>, and{" "}
            <span className="text-[var(--accent)] font-medium">research</span>.
          </motion.p>
        </section>

        {/* PROFILE + BIO */}
        <section className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mt-8"
          >
            <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-xl ring-4 ring-surface">
              <AppImage
                image="profile2"
                alt="Portrait of Adam Zaatar"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground relative inline-block text-center lg:text-left">
              A Hybrid Lens
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full animate-pulse" />
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              My journey bridges <span className="italic">computer science</span> and{" "}
              <span className="italic">economics</span>. I’ve explored topics like{" "}
              <span className="font-medium">financial literacy education</span>,{" "}
              <span className="font-medium">corporate lobbying</span>, and{" "}
              <span className="font-medium">post-COVID inflation</span> while developing
              iOS apps, scalable web platforms, and fintech-inspired systems.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              I thrive on projects that are both{" "}
              <span className="font-semibold">technically robust</span> and{" "}
              <span className="font-semibold">socially impactful</span>—whether it’s 
              building secure 2FA systems, analyzing “greedflation,” or designing 
              platforms for advocacy and commerce.
            </p>
          </motion.div>
        </section>

        {/* Highlights */}
        <section className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8 relative inline-block">
            Highlights
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--primary)] rounded-full animate-pulse" />
          </h3>
          <ul className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 justify-items-center">
            {[
              { text: "Founder of the Bowdoin Martial Arts Club", icon: "🥋" },
              { text: "Web Staff at The Bowdoin Orient", icon: "📰" },
              { text: "Certificate: Artificial Intelligence A–Z 2025 (Udemy)", icon: "🤖" },
              { text: "Research in financial literacy, behavioral economics, econometrics", icon: "📊" },
              { text: "Fluent in English & Arabic; intermediate German", icon: "🌍" },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-surface/70 to-surface/40 border border-border/40 shadow-subtle hover:shadow-card-hover hover:scale-[1.02] transition-transform w-full sm:w-[90%]"
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Call-to-Action */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <a href="/resume/AdamZaatar_CV_2025.pdf" target="_blank">
              View Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/projects">See My Work</a>
          </Button>
        </div>
      </Container>
    </main>
  );
}