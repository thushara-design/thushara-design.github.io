import { useEffect, useState, type CSSProperties } from "react";
import { useLocation } from "react-router";
import { CaseStudy } from "./components/case-study";
import { CaseStudyDat } from "./components/case-study-details";
import { Logo } from "./assets/images";
import { caseStudiesData } from "./data";

function App() {
  const location = useLocation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  const [showIntro, setShowIntro] = useState(location.pathname === "/" && !ref);

  useEffect(() => {
    if (ref) {
      setSelectedSlug(ref);
    } else {
      setSelectedSlug(null);
      // Scroll to top when the page loads if not showing intro
      if (!showIntro) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [location, ref, showIntro]);

  useEffect(() => {
    if (!showIntro) return;
    const timer = window.setTimeout(() => setShowIntro(false), 5500);
    return () => window.clearTimeout(timer);
  }, [showIntro]);

  if (selectedSlug && caseStudiesData.find((caseStudy) => caseStudy.slug === selectedSlug)) {
    return <CaseStudyDat slug={selectedSlug} />;
  }

  return (
    <div className="relative min-h-screen font-sans text-dark">
      {showIntro ? <IntroSequence /> : null}
      <main>
        <CaseStudy />
      </main>
    </div>
  );
}

function IntroSequence() {
  return (
    <div className="intro-sequence" aria-label="Portfolio loading sequence">
      <div className="intro-mark">
        <Logo className="intro-logo" aria-hidden="true" />
        <p className="intro-name">Hi, I'm Thushara.</p>
        <p className="intro-subtitle">Product designer <span style={{ color: '#E53935' }}>•</span> Bengaluru, India</p>
      </div>
      <div className="intro-line-group" aria-hidden="true">
        <span style={{ "--line-index": 0 } as CSSProperties}>
          I make complex
        </span>
        <span style={{ "--line-index": 1 } as CSSProperties}>
          products easier
        </span>
        <span style={{ "--line-index": 2 } as CSSProperties}>
          to work with.
        </span>
      </div>
    </div>
  );
}

export default App;
