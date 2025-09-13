"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion, Variants, Transition } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.15,
    } as Transition,
  },
});

export default function ContactPage() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
            bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
            bg-clip-text text-transparent drop-shadow-sm"
        >
          Let’s Connect
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-2xl mx-auto leading-relaxed"
        >
          I’m always open to conversations about{" "}
          <span className="font-medium text-foreground">software engineering</span>,{" "}
          <span className="font-medium text-foreground">fintech</span>, and{" "}
          <span className="font-medium text-foreground">economic research</span>. 
          Whether you’re a recruiter, a collaborator, or someone with a big idea, 
          let’s explore how we can work together.
        </motion.p>

        {/* Contact Cards */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-10 sm:grid-cols-3"
        >
          {[
            {
              icon: <Mail className="mx-auto h-10 w-10 text-primary mb-4" />,
              title: "Email",
              text: "azaatar@bowdoin.edu",
              button: (
                <Button asChild variant="primary" size="sm" className="mt-4">
                  <a href="mailto:azaatar@bowdoin.edu">Send Email</a>
                </Button>
              ),
            },
            {
              icon: <Linkedin className="mx-auto h-10 w-10 text-primary mb-4" />,
              title: "LinkedIn",
              text: "Professional Profile",
              button: (
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/adamzaatar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </Button>
              ),
            },
            {
              icon: <Github className="mx-auto h-10 w-10 text-primary mb-4" />,
              title: "GitHub",
              text: "Explore my projects",
              button: (
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a
                    href="https://github.com/adamzatar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repos
                  </a>
                </Button>
              ),
            },
          ].map(({ icon, title, text, button }, i) => (
            <Card
              key={title}
              className="p-6 text-center rounded-xl backdrop-blur-sm bg-surface/80 
                border border-border/60 shadow-subtle hover:shadow-card-hover 
                transition-transform hover:scale-[1.03]"
            >
              {icon}
              <h3 className="font-semibold text-text text-lg">{title}</h3>
              <p className="text-muted text-sm mt-1">{text}</p>
              {button}
            </Card>
          ))}
        </motion.div>

        {/* Divider + CTA */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-muted text-base sm:text-lg">
            Prefer a direct note? Drop me a message below — I reply quickly.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={fadeUp(4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 max-w-xl mx-auto grid gap-5"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg border border-border bg-surface/90 px-4 py-3 text-text 
              shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-border bg-surface/90 px-4 py-3 text-text 
              shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full rounded-lg border border-border bg-surface/90 px-4 py-3 text-text 
              shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-md hover:shadow-lg transition-shadow"
          >
            Send Message
          </Button>
        </motion.form>
      </Container>

      {/* Decorative Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr 
        from-primary/10 via-secondary/10 to-accent/10 opacity-70 blur-3xl" />
    </section>
  );
}