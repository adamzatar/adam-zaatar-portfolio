"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Variants, Transition } from "framer-motion";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

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
  const contactMethods = [
    {
      icon: <Mail className="mx-auto h-10 w-10 text-(--primary) mb-4" />,
      title: "Email",
      text: "azaatar@bowdoin.edu",
      href: "mailto:azaatar@bowdoin.edu",
      cta: "Send Email",
      variant: "primary" as const,
      external: false,
    },
    {
      icon: <Phone className="mx-auto h-10 w-10 text-(--primary) mb-4" />,
      title: "Phone",
      text: "(207) 481-6843",
      href: "tel:+12074816843",
      cta: "Call / Text",
      variant: "outline" as const,
      external: false,
    },
    {
      icon: <Linkedin className="mx-auto h-10 w-10 text-(--primary) mb-4" />,
      title: "LinkedIn",
      text: "Adam Zaatar",
      href: "https://www.linkedin.com/in/adam-zaatar-09b106304?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE2dNPcBbnu6cGrezXKH7zFdmJefhn6vmXs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B5GoLqgRFTeWosocK647j0w%3D%3D",
      cta: "View Profile",
      variant: "outline" as const,
      external: true,
    },
    {
      icon: <Github className="mx-auto h-10 w-10 text-(--primary) mb-4" />,
      title: "GitHub",
      text: "github.com/adamzatar",
      href: "https://github.com/adamzatar",
      cta: "View Repos",
      variant: "outline" as const,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
    >
      <Container>
        {/* Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
            bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent) 
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
          I’m focused on{" "}
          <span className="font-medium text-foreground">cloud architecture</span>,{" "}
          <span className="font-medium text-foreground">security engineering</span>, and{" "}
          <span className="font-medium text-foreground">intelligent systems</span>{" "}
          that stay measurable and trusted. If you’re building resilient platforms or exploring how markets
          and infrastructure intersect, I’d love to connect.
        </motion.p>

        {/* Contact Methods */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactMethods.map(({ icon, title, text, href, cta, variant, external }) => (
            <Card
              key={title}
              className="p-6 text-center rounded-xl backdrop-blur-sm bg-surface/85 
                border border-border/60 shadow-subtle hover:shadow-card-hover 
                transition-transform hover:scale-[1.02]"
            >
              {icon}
              <h3 className="font-semibold text-text text-lg">{title}</h3>
              <p className="text-muted text-sm mt-1">{text}</p>
              <Button asChild variant={variant} size="sm" className="mt-4">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {cta}
                </a>
              </Button>
            </Card>
          ))}
        </motion.div>

        {/* Availability Note */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center space-y-3"
        >
          <p className="text-muted text-base sm:text-lg">
            I respond quickly during Eastern Time business hours, and I keep an eye on email and texts after-hours for urgent notes.
          </p>
          <p className="text-sm text-foreground/70">
            For anything sensitive or time-critical, emailing{" "}
            <a className="font-semibold text-(--primary)" href="mailto:azaatar@bowdoin.edu">
              azaatar@bowdoin.edu
            </a>{" "}
            or texting{" "}
            <a className="font-semibold text-(--primary)" href="tel:+12074816843">
              (207) 481-6843
            </a>{" "}
            is the fastest way to reach me.
          </p>
        </motion.div>
      </Container>

      {/* Decorative Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-tr 
        from-primary/10 via-secondary/10 to-accent/10 opacity-70 blur-3xl" />
    </section>
  );
}
