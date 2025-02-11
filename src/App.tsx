import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { About } from "./components/about";
import { CaseStudy } from "./components/case-study";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { CaseStudyDat } from "./components/case-study-data";
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

  // const handleBack = () => {
  //   setSelectedSlug(null);
  // };

  if (selectedSlug && caseStudiesData.find((caseStudy) => caseStudy.slug === selectedSlug)) {
    return <CaseStudyDat slug={selectedSlug} />;
  }

  return (
    <div className="font-sans text-dark">
      <Header />
      {/* <img src={heroBG1} alt="" className="absolute -z-50 bottom-20 w-full" />
      <img src={heroBG2} alt="" className="absolute -z-40 bottom-20 w-full" /> */}
      <main className="container mx-auto max-w-6xl space-y-12 p-6">
        <Hero />
        {/* <CaseStudy onSlugChange={setSelectedSlug} /> */}
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
