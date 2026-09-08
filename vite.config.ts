import { copyFileSync, existsSync } from "node:fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";

// GitHub Pages serves 404.html for unknown paths. Copying index.html there
// lets React Router handle /about-me instead of returning a host 404.
function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const index = path.resolve(__dirname, "dist/index.html");
      if (existsSync(index)) {
        copyFileSync(index, path.resolve(__dirname, "dist/404.html"));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
