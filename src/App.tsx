import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CaseStudy } from "./components/case-study";
import { CaseStudyDat } from "./components/case-study-details";
import { caseStudiesData } from "./data";

function App() {
  const location = useLocation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  useEffect(() => {
    if (ref) {
      setSelectedSlug(ref);
    } else {
      setSelectedSlug(null);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location, ref]);

  if (selectedSlug && caseStudiesData.find((caseStudy) => caseStudy.slug === selectedSlug)) {
    return <CaseStudyDat slug={selectedSlug} />;
  }

  return (
    <div className="relative min-h-screen font-sans text-dark">
      <main>
        <CaseStudy />
      </main>
    </div>
  );
}

export default App;
