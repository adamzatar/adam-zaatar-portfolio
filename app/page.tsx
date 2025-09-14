// app/page.tsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Adam Zaatar — Portfolio",
  description:
    "Adam Zaatar — Computer Science & Economics student at Bowdoin College. Developer, researcher, and builder at the intersection of software engineering, fintech, and applied economics.",
  openGraph: {
    title: "Adam Zaatar — Portfolio",
    description:
      "Portfolio of Adam Zaatar: CS & Economics student at Bowdoin College. Projects in cross-platform app development, fintech platforms, AI/ML applications, and economic research.",
    url: "https://adamzaatar.vercel.app",
    siteName: "Adam Zaatar Portfolio",
    images: [
      {
        url: "/images/projects/profilepic.png", // ✅ use correct public path
        width: 1200,
        height: 630,
        alt: "Portrait of Adam Zaatar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar — Portfolio",
    description:
      "CS & Economics student at Bowdoin College. Builder of cross-platform apps, fintech tools, and research at the nexus of AI, markets, and technology.",
    images: ["/images/projects/profilepic.png"], // ✅ consistent with public path
  },
  keywords: [
    "Adam Zaatar",
    "Bowdoin College",
    "Computer Science",
    "Economics",
    "Software Engineering",
    "Fintech",
    "AI",
    "Machine Learning",
    "Full-stack Development",
    "iOS Development",
    "Android Development",
    "Web Development",
    "Financial Research",
    "Quantitative Analysis",
  ],
  authors: [{ name: "Adam Zaatar" }],
};

export default function Page() {
  return <HomeClient />;
}