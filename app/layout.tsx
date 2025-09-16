// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Adam Zaatar Portfolio",
  description: "Personal portfolio showcasing projects, research, and resume.",
  keywords: [
    "Adam Zaatar",
    "portfolio",
    "web development",
    "research",
    "projects",
    "resume",
  ],
  authors: [{ name: "Adam Zaatar" }],
  creator: "Adam Zaatar",
  openGraph: {
    title: "Adam Zaatar Portfolio",
    description:
      "Personal portfolio showcasing projects, research, and resume.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar Portfolio",
    description:
      "Personal portfolio showcasing projects, research, and resume.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-bg text-text antialiased overflow-x-hidden relative"
        )}
      >
        {/* === Global Animated Background (runs behind everything) === */}
        <div
          className="absolute inset-0 -z-10 will-change-transform will-change-opacity"
          aria-hidden="true"
        >
          <AnimatedBackground />

          {/* ✅ Fallback static gradient for Safari / no-JS */}
          <noscript>
            <div
              className="absolute inset-0 -z-20"
              style={{
                background:
                  "linear-gradient(135deg, #9333ea, #ec4899, #f97316, #7c3aed, #1e3a8a)",
                backgroundSize: "400% 400%",
                animation: "gradientShift 40s ease infinite",
              }}
            />
          </noscript>
        </div>

        {/* === Navigation (always above background) === */}
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