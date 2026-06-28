import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary":   "#0F0A06",   // near-black with warm undertone
        "bg-secondary": "#1A1008",   // deep warm brown-black
        "bg-card":      "#1F1409",   // card surface
        "accent-orange": "#FF8C00",
        "accent-pink":   "#FF1493",
        "accent-peach":  "#FFDAB9",
        "accent-teal":   "#20B2AA",
        "accent-coral":  "#FF6347",
        "text-primary":  "#FFF5EC",
        "text-secondary":"#B89880",
        border:          "#2E1F0F",
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body:    ["'Inter'",         "sans-serif"],
        mono:    ["'JetBrains Mono'","monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
