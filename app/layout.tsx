// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";

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
        style={{
          background:
            "linear-gradient(135deg, #9333ea, #ec4899, #f97316, #7c3aed, #1e3a8a)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 40s ease infinite",
        }}
      >
        {/* ✅ Navigation bar only */}
        <NavBar />

        {/* ✅ Page content */}
        <main className="relative z-10 pt-20">{children}</main>
      </body>
    </html>
  );
}