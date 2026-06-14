import type { Metadata } from "next";
import HomePageClient from "@/app/HomePageClient";

export const metadata: Metadata = {
  title: "Adam Zaatar | Computer Science and Economics at Bowdoin",
  description:
    "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
  openGraph: {
    title: "Adam Zaatar | Computer Science and Economics at Bowdoin",
    description:
      "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
    url: "https://adamzaatar.com",
    siteName: "Adam Zaatar Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adam Zaatar portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar | Computer Science and Economics at Bowdoin",
    description:
      "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
    images: ["/opengraph-image"],
  },
  keywords: [
    "Adam Zaatar",
    "Bowdoin College",
    "Computer Science",
    "Economics",
    "Backend Systems",
    "Applied AI",
    "Economics Research",
  ],
  authors: [{ name: "Adam Zaatar" }],
};

export default function Page() {
  return <HomePageClient />;
}
