import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          contrast: "var(--primary-contrast)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
        },
        gradient: {
          start: "var(--gradient-start)",
          end: "var(--gradient-end)",
        },
      },

      /* 🌅 Gradients */
      backgroundImage: {
        sunset: "linear-gradient(135deg, #d946ef 0%, #f97316 50%, #facc15 100%)",
        midnight: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        aurora: "linear-gradient(135deg, #3b82f6 0%, #22d3ee 40%, #f472b6 100%)",
        dusk: "linear-gradient(135deg, #7c3aed 0%, #9333ea 40%, #3b0764 100%)",
      },

      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },

      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.04)",
        card: "0 4px 10px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 20px rgba(0,0,0,0.12)",
        glow: "0 0 20px rgba(236,72,153,0.4)",
        focus: "0 0 0 3px rgba(99,102,241,0.5)",
        neon: "0 0 10px rgba(249,115,22,0.7), 0 0 20px rgba(236,72,153,0.6)",
        aurora: "0 0 15px rgba(59,130,246,0.5), 0 0 30px rgba(244,114,182,0.4)",
      },

      /* 📖 Typography */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              fontWeight: "500",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            },
            strong: { color: theme("colors.text") },
            blockquote: {
              borderLeftColor: theme("colors.border"),
              fontStyle: "italic",
            },
            hr: { borderColor: theme("colors.border") },
            h1: {
              backgroundImage: theme("backgroundImage.dusk"),
              backgroundClip: "text",
              textFillColor: "transparent",
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.text"),
            a: { color: theme("colors.primary.DEFAULT") },
          },
        },
      }),

      /* ⏱️ Animations */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        blob: {
          "0%": { borderRadius: "42% 58% 70% 30% / 42% 38% 62% 58%" },
          "50%": { borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%" },
          "100%": { borderRadius: "42% 58% 70% 30% / 42% 38% 62% 58%" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(147,51,234,0.6)" },
          "50%": { boxShadow: "0 0 25px rgba(236,72,153,0.8)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 4s ease-in-out infinite",
        blob: "blob 10s ease-in-out infinite",
        gradientShift: "gradientShift 8s ease infinite",
        tilt: "tilt 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [forms, typography, aspectRatio, containerQueries],
};

export default config;