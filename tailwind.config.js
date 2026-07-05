const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        /* editorial 4-token system */
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        
        /* map hardcoded colors to tokens */
        black: "var(--ink)",
        white: "var(--bg)",
        gray: {
          50: "var(--bg)",
          100: "var(--line)",
          200: "var(--line)",
          300: "var(--line)",
          400: "var(--muted)",
          500: "var(--muted)",
          600: "var(--muted)",
          700: "var(--ink)",
          800: "var(--ink)",
          900: "var(--ink)",
        }
      },
      boxShadow: {},
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "spin-reverse": "spin 8s linear infinite reverse",
        "spin-very-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
