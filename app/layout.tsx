import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Adam Zaatar Portfolio",
  description: "Personal portfolio showcasing projects, research, and resume.",
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
        {/* Global animated background */}
        <AnimatedBackground />

        {/* Navigation bar */}
        <NavBar />

        {/* Page content */}
        <main className="relative z-10 pt-20">{children}</main>
      </body>
    </html>
  );
}