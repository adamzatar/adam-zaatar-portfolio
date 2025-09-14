import type { Metadata } from "next";
import Script from "next/script"; // ✅ Import Script for inline instrumentation
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
// import AnimatedBackground from "@/components/AnimatedBackground"; // 🚫 Disabled for performance test

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
      <head>
        {/* 🔍 Safari LongTask Logger */}
        <Script id="longtasks" strategy="beforeInteractive">
          {`
            (function(){
              if (!('PerformanceObserver' in window)) return;
              try {
                const obs = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.duration >= 50) {
                      console.log('[LongTask]', {
                        name: entry.name,
                        start: Math.round(entry.startTime),
                        dur: Math.round(entry.duration),
                        at: entry.attribution || [] // Safari may not expose attribution
                      });
                    }
                  }
                });
                obs.observe({ type: 'longtask', buffered: true });
              } catch (err) {
                console.warn("LongTask observer failed:", err);
              }
            })();
          `}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-bg text-text antialiased overflow-x-hidden relative"
        )}
      >
        {/* Global animated background - Disabled for test */}
        {/* <AnimatedBackground /> */}

        {/* Navigation bar */}
        <NavBar />

        {/* Page content */}
        <main className="relative z-10 pt-20">{children}</main>
      </body>
    </html>
  );
}