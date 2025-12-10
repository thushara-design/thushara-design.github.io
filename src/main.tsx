import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { AboutMe } from "./pages/AboutMe";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="about" element={<AboutMe />} />
    </Routes>
  </BrowserRouter>,
);
