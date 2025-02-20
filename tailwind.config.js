const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        title: ["Instrument Serif", "serif"],
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
      },
      boxShadow: {
        custom: "0px 4px 13px 0px rgba(102, 126, 255, 0.08)",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
