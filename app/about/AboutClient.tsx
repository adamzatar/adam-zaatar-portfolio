"use client";

import { useState } from "react";
import AppImage from "@/components/AppImage";
import { type ImageKey } from "@/lib/images";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// ✅ Shimmer skeleton loader for profile image
function ShimmerProfile({
  image,
  alt,
}: {
  image: ImageKey;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden
                 bg-[var(--surface)]/80 supports-[backdrop-filter]:backdrop-blur-xl
                 border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                 ring-1 ring-white/5 transition-all duration-500"
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse
                     bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300
                     dark:from-[#1b2029] dark:via-[#1f2630] dark:to-[#222a34]"
        />
      )}
      <AppImage
        image={image}
        alt={alt}
        fill
        priority
        className={`object-cover object-top transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-surface/70 to-bg">
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
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
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
            transition={{ duration: 0.65, delay: 0.1 }}
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
            transition={{ duration: 0.7 }}
            className="flex justify-center mt-8"
          >
            <ShimmerProfile image="profile" alt="Portrait of Adam Zaatar" />
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
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
              { 
                text: "Certificate: Artificial Intelligence A–Z 2025 (Udemy)", 
                icon: "🤖", 
                image: "/images/certificate.jpg"
              },
              { text: "Research in financial literacy, behavioral economics, econometrics", icon: "📊" },
              { text: "Fluent in English & Arabic; intermediate German", icon: "🌍" },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl
                           bg-[var(--surface)]/80 supports-[backdrop-filter]:backdrop-blur-xl
                           border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                           shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]
                           ring-1 ring-white/5 transition-all duration-400 w-full sm:w-[90%]"
              >
                <span className="text-2xl text-foreground/80">{item.icon}</span>
                <span className="text-foreground/90">{item.text}</span>
                {item.image && (
                  <AppImage
                    image={item.image as ImageKey}
                    alt="AI Certificate"
                    width={300}
                    height={200}
                    className="mt-2 rounded-lg shadow-md object-contain"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap gap-4 justify-center"
        >
          <Button asChild variant="primary" size="lg" className="shadow-md hover:shadow-xl transition-all">
            <a href="/resume/AdamZaatar_CV_2025.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-xl transition-all">
            <a href="/projects">See My Work</a>
          </Button>
        </motion.div>
      </Container>
    </main>
  );
}