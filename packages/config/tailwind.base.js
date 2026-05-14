/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "hsl(220, 100%, 97%)",
          100: "hsl(220, 100%, 93%)",
          200: "hsl(220, 95%, 85%)",
          300: "hsl(220, 90%, 72%)",
          400: "hsl(220, 85%, 60%)",
          500: "hsl(220, 80%, 50%)",
          600: "hsl(220, 80%, 42%)",
          700: "hsl(220, 80%, 34%)",
          800: "hsl(220, 80%, 24%)",
          900: "hsl(220, 80%, 16%)",
          950: "hsl(220, 80%, 10%)",
        },
        accent: {
          300: "hsl(267, 85%, 75%)",
          400: "hsl(267, 80%, 65%)",
          500: "hsl(267, 75%, 55%)",
          600: "hsl(267, 75%, 45%)",
        },
        surface: {
          DEFAULT: "hsl(224, 25%, 10%)",
          subtle: "hsl(224, 20%, 14%)",
          overlay: "hsl(224, 18%, 18%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
