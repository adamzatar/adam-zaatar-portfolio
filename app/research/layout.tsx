import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Economics research and writing by Adam Zaatar, including event studies, digital economics, political economy, inflation, and financial literacy.",
  path: "/research",
});

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
