import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0B0D",
        surface: {
          DEFAULT: "#111318",
          card: "#16181D",
          hover: "#1F232B",
          border: "rgba(255, 255, 255, 0.08)",
          subtle: "#1D2027",
        },
        brand: {
          DEFAULT: "#F5A524",
          amber: "#F59E0B",
          glow: "rgba(245, 165, 36, 0.15)",
        },
        status: {
          approved: "#22C55E",
          approvedBg: "rgba(34, 197, 94, 0.12)",
          pending: "#EAB308",
          pendingBg: "rgba(234, 179, 8, 0.12)",
          rejected: "#EF4444",
          rejectedBg: "rgba(239, 68, 68, 0.12)",
          discarded: "#71717A",
          discardedBg: "rgba(113, 113, 122, 0.12)",
          recording: "#3B82F6",
          recordingBg: "rgba(59, 130, 246, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
