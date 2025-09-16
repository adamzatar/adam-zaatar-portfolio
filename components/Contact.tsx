"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-bg relative">
      <Container className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#161b22] 
                     border border-border shadow-lg hover:shadow-xl 
                     transition-all duration-500 p-10 text-center"
        >
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-extrabold text-text mb-6"
          >
            Get in Touch
          </motion.h2>

          {/* Section Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I’m always open to discussing new opportunities, collaborations, or
            exciting projects. Whether you’re a company looking for a developer,
            an entrepreneur exploring app ideas, or a researcher in economics and
            technology, I’d love to connect.
          </motion.p>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="primary" size="lg">
              <a href="mailto:adam.zaatar@gmail.com">Email Me</a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href="https://www.linkedin.com/in/adamzaatar"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/adamzatar"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}