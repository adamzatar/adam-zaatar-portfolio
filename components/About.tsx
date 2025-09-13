"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "./ui/Container";

export default function About() {
  return (
    <section id="about" className="relative border-t border-transparent bg-surface/50">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <Container className="py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-border">
              <Image
                src="/images/profile.jpg"
                alt="Adam Zaatar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">About Me</h2>

            <p className="text-lg text-muted leading-relaxed mb-6">
              I’m <span className="font-semibold">Adam Zaatar</span>, a{" "}
              <span className="font-semibold">
                Computer Science & Economics double major at Bowdoin College
              </span>{" "}
              with a focus on building scalable digital products. My work spans
              software engineering, iOS development, and academic research—from{" "}
              <span className="italic">full-stack web platforms</span> to{" "}
              <span className="italic">renewable energy analysis</span>.
            </p>

            <p className="text-lg text-muted leading-relaxed mb-6">
              My interests lie at the{" "}
              <span className="font-semibold">
                intersection of technology and economics
              </span>
              . I apply econometric analysis and behavioral economics research
              to design solutions that are technically robust and socially
              impactful.
            </p>

            <p className="text-lg text-muted leading-relaxed mb-8">
              <span className="font-bold">Future Direction:</span> Building a
              portfolio of iOS applications and full-stack platforms with
              upcoming <span className="italic">App Store releases</span>, while
              pursuing the long-term goal of becoming an app developer for hire
              and eventually launching a{" "}
              <span className="italic">
                venture studio for scalable digital products
              </span>
              .
            </p>

            {/* Key Highlights */}
            <ul className="space-y-4 text-foreground/80">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Founder of the Bowdoin Martial Arts Club
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Web Staff at <span className="italic">The Bowdoin Orient</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Certificate:{" "}
                <span className="italic">
                  Artificial Intelligence A-Z 2025 (Udemy)
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Research: Financial literacy, behavioral economics, and
                econometrics
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Fluent in English and Arabic; intermediate proficiency in German
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}