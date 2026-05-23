/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: "#000000",
          deep: "#050505",
          void: "#080808",
          charcoal: "#111111",
          ash: "#1a1a1a",
          smoke: "#222222",
          mist: "#2a2a2a",
          silver: "#888888",
          fog: "#555555",
          light: "#cccccc",
          white: "#f0f0f0",
          gold: "#b8975a",
          "gold-dim": "#7a6035",
          glow: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
      },
      letterSpacing: {
        widest: "0.4em",
        "ultra-wide": "0.6em",
        "cinema": "0.25em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s var(--ease-silk) forwards",
        "rise": "rise 1.4s var(--ease-silk) forwards",
        "grain": "grain 8s steps(10) infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.4" },
        },
      },
      backgroundImage: {
        "vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
        "vignette-strong": "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.97) 100%)",
        "top-fade": "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 30%)",
        "bottom-fade": "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
        "cinema-glow": "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(184,151,90,0.06) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
