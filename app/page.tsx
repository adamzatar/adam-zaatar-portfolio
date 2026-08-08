import type { Metadata } from "next";
import HomePageClient from "@/app/HomePageClient";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
