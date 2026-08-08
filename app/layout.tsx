if (process.env.NODE_ENV === "development") {
  import("../lib/debug/hydrationTrace");
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Adam Zaatar",
  },
  description: SITE_DESCRIPTION,
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
  authors: [{ name: "Adam Zaatar", url: SITE_URL }],
  creator: "Adam Zaatar",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Adam Zaatar",
        url: SITE_URL,
        description:
          "Computer Science and Economics student at Bowdoin College focused on backend and systems engineering.",
        sameAs: [LINKEDIN_URL, GITHUB_URL],
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Bowdoin College",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Adam Zaatar Portfolio",
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen bg-bg text-text antialiased",
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
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
