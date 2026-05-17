import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a192f",
          dark: "#071221",
          accent: "#f43f5e",
          sky: "#38bdf8",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(10, 25, 47, 0.08)",
        glow: "0 0 40px -8px rgba(56, 189, 248, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
