import type { Metadata } from "next";
import HomePageClient from "@/app/HomePageClient";

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

export default function Page() {
  return <HomePageClient />;
}
