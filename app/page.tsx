// -----------------------------------------------------------------------------
// app/page.tsx
// Server Component — Composition root of the Home page
// Imports and arranges all top-level sections with consistent scroll rhythm.
// -----------------------------------------------------------------------------

import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import HowIBuild from "@/components/home/HowIBuild";
import BuildDiagram from "@/components/home/BuildDiagram";
import Featured from "@/components/home/Featured";
import Learning from "@/components/home/Learning";
import FinalCTA from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Container";

// -----------------------------------------------------------------------------

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Adam Zaatar — Cloud, AI, & Security Engineer",
  description:
    "Adam Zaatar is a Bowdoin College CS & Economics student building scalable cloud, AI, and cybersecurity systems. Focused on resilient infrastructure, FinOps, and trust-centered platforms.",
  openGraph: {
    title: "Adam Zaatar — Cloud, AI, & Security Engineer",
    description:
      "Systems-minded builder delivering cloud reliability, AI practicality, and security discipline. Explore projects, research, and certifications.",
    url: "https://adamzaatar.vercel.app",
    siteName: "Adam Zaatar Portfolio",
    images: [
      {
        url: "/images/profilepic.png",
        width: 1200,
        height: 630,
        alt: "Portrait of Adam Zaatar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar — Cloud, AI, & Security Engineer",
    description:
      "Portfolio showcasing cloud architecture, cybersecurity, AI, and FinOps-driven systems by Adam Zaatar.",
    images: ["/images/profilepic.png"],
  },
  keywords: [
    "Adam Zaatar",
    "Cloud Engineering",
    "SRE",
    "AI Security",
    "FinOps",
    "Systems Optimization",
    "Bowdoin College",
    "Next.js Portfolio",
    "Framer Motion",
  ],
  authors: [{ name: "Adam Zaatar" }],
};

// -----------------------------------------------------------------------------

export default async function Page() {
  return (
    <main className="relative flex flex-col">
      <Hero />
      <Pillars />
      <HowIBuild />
      <section className="relative ui-section py-20 sm:py-24 lg:py-28 overflow-hidden">
        <Container className="relative z-10">
          <BuildDiagram />
        </Container>
      </section>
      <Featured />
      <Learning />
      <FinalCTA />
    </main>
  );
}
