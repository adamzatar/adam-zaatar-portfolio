"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium",
          "bg-surface text-text shadow-sm transition hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
      >
        {theme === "light" && <Sun className="h-4 w-4 text-yellow-500" />}
        {theme === "dark" && <Moon className="h-4 w-4 text-blue-400" />}
        {theme === "system" && <Laptop className="h-4 w-4 text-muted" />}
        <span className="capitalize">{theme}</span>
      </button>

      {/* Dropdown */}
      <div
        className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-surface shadow-lg ring-1 ring-border focus:outline-none"
        role="menu"
      >
        <button
          onClick={() => setTheme("light")}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text hover:bg-muted/20"
        >
          <Sun className="h-4 w-4 text-yellow-500" /> Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text hover:bg-muted/20"
        >
          <Moon className="h-4 w-4 text-blue-400" /> Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text hover:bg-muted/20"
        >
          <Laptop className="h-4 w-4 text-muted" /> System
        </button>
      </div>
    </div>
  );
}