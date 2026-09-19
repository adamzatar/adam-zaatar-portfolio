import type { Metadata } from "next";

export const SITE_URL = "https://adamzaatar-portfolio.vercel.app";

export const SITE_TITLE =
  "Adam Zaatar | Computer Science and Economics at Bowdoin";

export const SITE_DESCRIPTION =
  "Adam Zaatar is a Computer Science and Economics senior at Bowdoin, graduating May 2027. Backend and systems projects, a Java internship at ProgressSoft, C/C++ operating systems coursework, and economics research.";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = `${title} | Adam Zaatar`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url,
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
      title: socialTitle,
      description,
      creator: "@adamzaatar",
      images: ["/opengraph-image"],
    },
  };
}
