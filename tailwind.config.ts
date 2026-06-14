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
        focus: "0 0 0 3px rgba(99,102,241,0.5)",
      },

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
          },
        },
        invert: {
          css: {
            color: theme("colors.text"),
            a: { color: theme("colors.primary.DEFAULT") },
          },
        },
      }),
    },
  },
  plugins: [forms, typography, aspectRatio, containerQueries],
};

export default config;
