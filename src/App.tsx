import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { About } from "./components/about";
import { CaseStudy } from "./components/case-study";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { CaseStudyDat } from "./components/case-study-details";
import { caseStudiesData } from "./data";

function App() {
  const location = useLocation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get("ref");
    if (ref) {
      setSelectedSlug(ref);
    } else {
      setSelectedSlug(null);
    }
  }, [location]);

  if (selectedSlug && caseStudiesData.find((caseStudy) => caseStudy.slug === selectedSlug)) {
    return <CaseStudyDat slug={selectedSlug} />;
  }

  return (
    <div className="font-sans text-dark">
      <Header />
      <main className="container mx-auto max-w-6xl space-y-12 p-6">
        <Hero />
        <CaseStudy />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
