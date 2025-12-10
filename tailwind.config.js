const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Google Sans", "Inter", "Roboto", "system-ui", "sans-serif"],
        body: ["Google Sans", "Inter", "Roboto", "system-ui", "sans-serif"],
        title: ["Google Sans", "Inter", "Roboto", "system-ui", "sans-serif"],
        mono: ["Google Sans Code", "Roboto Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "1.875rem",
      },
      colors: {
        dark: "#131312",
        primary: "#ff6363",
        secondary: {
          100: "#e2e2d5",
          200: "#888883",
        },
        accent: {
          primary: "#eaf7fa",
          secondary: "#fdebe7",
          tertiary: "#f6eac27d",
          quaternary: "#faf7f7",
          quinary: "#f1f7f3",
        },
        border: "rgba(0, 0, 0, 0.2)",
        // Antigravity color palette
        ag: {
          dark: "#202124",
          grey: "#5f6368",
          blue: "#1a73e8",
          border: "#e8eaed",
          "bg-light": "#f8f9fa",
          white: "#ffffff",
        },
      },
      boxShadow: {
        custom: "0px 4px 13px 0px rgba(102, 126, 255, 0.08)",
        ag: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
      },
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
