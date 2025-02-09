import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import { CaseStudyDat } from "./components/case-study-data";

const root = document.getElementById("root")!;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="case-study/:slug" element={<CaseStudyDat />} />
    </Routes>
  </BrowserRouter>,
);
