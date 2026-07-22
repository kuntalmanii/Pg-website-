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
        "beige-light":    "#FDFBF7",
        "beige-card":     "#F4EFEA",
        "twilight-haze":  "#A7B7E7",
        "dark-void":      "#050505",
        "sony-blue":      "#0050FF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backdropBlur: {
        glass: "18px",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        borderSpin: {
          to: { "--border-angle": "360deg" },
        },
        glowDrift: {
          "0%":   { transform: "translate(0%,0%) scale(1)",      opacity: "0.8"  },
          "33%":  { transform: "translate(6%,-8%) scale(1.08)",  opacity: "1"    },
          "66%":  { transform: "translate(-4%,5%) scale(0.96)",  opacity: "0.9"  },
          "100%": { transform: "translate(3%,-3%) scale(1.04)",  opacity: "0.85" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)"    },
          "50%":      { opacity: "1",   transform: "scale(1.12)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
      },
      animation: {
        "fade-up":     "fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
        "border-spin": "borderSpin 4s linear infinite",
        "glow-drift":  "glowDrift 8s ease-in-out infinite alternate",
        "glow-pulse":  "glowPulse 3s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
