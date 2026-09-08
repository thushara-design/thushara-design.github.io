import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { AboutMe } from "./pages/AboutMe";
import { AuthGate } from "./components/password-protect";
import { ThemeProvider } from "./lib/theme";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthGate>
        <Routes>
          <Route index element={<App />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="about-me" element={<AboutMe />} />
        </Routes>
      </AuthGate>
    </BrowserRouter>
  </ThemeProvider>,
);
