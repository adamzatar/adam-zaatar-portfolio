// app/layout.tsx
if (process.env.NODE_ENV === "development") {
  import("../lib/debug/hydrationTrace");
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import GlobalVisuals from "@/components/visuals/GlobalVisuals";
import CustomCursor from "@/components/visuals/CustomCursor";

/* --------------------------------------------------------------------------
   🌐 Global Metadata (SEO + OpenGraph + Twitter)
   Dynamically resolves `metadataBase` based on environment.
--------------------------------------------------------------------------- */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adamzaatar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adam Zaatar — Cloud, AI, & Security Engineer",
    template: "%s | Adam Zaatar",
  },
  description:
    "Portfolio of Adam Zaatar — building scalable systems at the intersection of cloud, AI, and cybersecurity.",
  keywords: [
    "Adam Zaatar",
    "portfolio",
    "cloud computing",
    "AI security",
    "cybersecurity",
    "SRE",
    "infrastructure",
    "DevOps",
    "software engineer",
  ],
  authors: [{ name: "Adam Zaatar", url: siteUrl }],
  creator: "Adam Zaatar",
  openGraph: {
    title: "Adam Zaatar — Cloud, AI, & Security Engineer",
    description:
      "Portfolio showcasing projects, research, and system design at scale.",
    url: siteUrl,
    siteName: "Adam Zaatar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/profile-home.jpg",
        width: 1200,
        height: 630,
        alt: "Adam Zaatar Portfolio — Cloud, AI, & Security Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar — Cloud, AI, & Security Engineer",
    description:
      "Building resilient, data-driven systems across cloud and AI security.",
    creator: "@adamzaatar",
    images: ["/images/profile-home.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* --------------------------------------------------------------------------
   📱 Viewport & Theme Configuration
--------------------------------------------------------------------------- */
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  viewportFit: "cover",
};

/* --------------------------------------------------------------------------
   🧱 Root Layout
--------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen overflow-x-hidden bg-bg text-text antialiased"
        )}
      >
        {/* 🌈 Static gradient + sun orb base layer */}
        <div aria-hidden className="sky-gradient" />

        {/* ✨ Dynamic visuals (particles, beams, etc.) */}
        <GlobalVisuals />

        {/* 🖱️ Global custom cursor (optional visual layer) */}
        <CustomCursor />

        {/* ✅ Fallback static gradient for no-JS / Safari */}
        <noscript>
          <div
            className="absolute inset-0 -z-50"
            style={{
              background:
                "linear-gradient(135deg, #9333ea, #ec4899, #f97316, #7c3aed, #1e3a8a)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 40s ease infinite",
            }}
          />
        </noscript>

        {/* === Navigation === */}
        <NavBar />

        {/* === Main Page Content === */}
        <main
          className="relative z-10 pt-20"
          role="main"
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
