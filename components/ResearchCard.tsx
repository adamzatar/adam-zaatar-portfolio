"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

export type ResearchCardProps = {
  title: string;
  description: string;
  paperUrl: string;
  delay?: number;
};

/* ----------------------------
   Motion Variants
----------------------------- */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

/* ----------------------------
   Component
----------------------------- */
export function ResearchCard({
  title,
  description,
  paperUrl,
  delay = 0,
}: ResearchCardProps) {
  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      /* Card handles hover lift via `interactive`; wrapper doesn't need whileHover */
    >
      <Card
        variant="surface"
        padding="md"
        interactive
        className="group relative overflow-hidden"
      >
        {/* Subtle token-aware glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                     bg-gradient-to-tr from-[color-mix(in_oklab,var(--primary) 8%,transparent)]
                     via-transparent to-[color-mix(in_oklab,var(--secondary) 8%,transparent)]"
        />

        <CardHeader className="relative z-10 px-0 pt-0 pb-2">
          <CardTitle className="text-xl sm:text-2xl bg-clip-text text-transparent
                                bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
            {title}
          </CardTitle>
          {/* Keep for structure; actual body text lives in CardContent for spacing */}
          <CardDescription className="sr-only">{description}</CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 px-0">
          <p className="text-base leading-relaxed text-foreground/85">
            {description}
          </p>
        </CardContent>

        <CardFooter className="relative z-10 px-0 pt-4">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="gap-2 transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <a
              href={paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open paper: ${title}`}
            >
              <FileText className="w-4 h-4" />
              Read Paper
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}