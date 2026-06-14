if (process.env.NODE_ENV === "development") {
  import("../lib/debug/hydrationTrace");
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adamzaatar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adam Zaatar | Computer Science and Economics at Bowdoin",
    template: "%s | Adam Zaatar",
  },
  description:
    "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
  keywords: [
    "Adam Zaatar",
    "portfolio",
    "Bowdoin College",
    "computer science",
    "economics",
    "backend systems",
    "applied AI",
    "economics research",
    "software engineer",
  ],
  authors: [{ name: "Adam Zaatar", url: siteUrl }],
  creator: "Adam Zaatar",
  openGraph: {
    title: "Adam Zaatar | Computer Science and Economics at Bowdoin",
    description:
      "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
    url: siteUrl,
    siteName: "Adam Zaatar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adam Zaatar portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Zaatar | Computer Science and Economics at Bowdoin",
    description:
      "Portfolio for Adam Zaatar, a Bowdoin Computer Science and Economics student focused on backend systems, applied AI, economics research, Java backend training, and finance-oriented software.",
    creator: "@adamzaatar",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  viewportFit: "cover",
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
          "relative min-h-screen overflow-x-hidden bg-bg text-text antialiased",
        )}
      >
        <NavBar />

        <main
          className="relative"
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
