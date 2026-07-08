import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "var(--graphite-950)",
          900: "var(--graphite-900)",
          850: "var(--graphite-850)",
          800: "var(--graphite-800)"
        },
        paper: "var(--paper)",
        muted: "var(--muted)",
        dim: "var(--dim)",
        cyan: "var(--cyan)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"]
      },
      transitionTimingFunction: {
        editorial: "var(--ease-editorial)"
      },
      boxShadow: {
        line: "inset 0 0 0 1px var(--line)"
      }
    }
  },
  plugins: []
};

export default config;
