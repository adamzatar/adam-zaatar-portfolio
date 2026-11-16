import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Economics papers by Adam Zaatar, a November 2026 AI-layoffs audit note, and two Gibbons financial literacy reports revised in November 2026, with PDF previews.",
  path: "/research",
});

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
