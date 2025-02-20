import { useState, useEffect, useCallback } from "react";
import { caseStudiesData } from "../data";
import { Header } from "./header";
import { Footer } from "./footer";
import { cn } from "../lib/utils";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "./ui/button";
import { subtractLeft, subtractRight } from "@/assets/images";

// Case studies with a dark background
const CASE_STUDIES_WITH_DARK_BG = ["gistly"];

const CaseStudyDat = ({ slug }: { slug: string }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [scrollPosition, setScrollPosition] = useState(0);
  const ref = searchParams.get("ref");

  // Scroll handler using useCallback to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // if (ref) {
    //   const caseStudy = caseStudiesData.find((cs) => cs.slug === ref);
    //   if (caseStudy) {
    //     navigate({ search: `?ref=${ref}` });
    //   }
    // }
    window.scrollTo(0, 0);
  }, [navigate, ref]);

  if (!slug) return null;

  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);
  if (!caseStudy) return null;

  const { title, tagline, description, Component, externalLink, responsibilities, role, timeframe, tools } = caseStudy;

  // Format tools list for better readability
  const formattedTools = Array.isArray(tools) && tools.length > 1 ? `${tools.slice(0, -1).join(", ")} and ${tools.slice(-1)}` : tools;

  const caseStudyIndex = caseStudiesData.findIndex((cs) => cs.slug === slug);
  const isFirstCaseStudy = caseStudyIndex === 0;
  const isLastCaseStudy = caseStudyIndex === caseStudiesData.length - 1;

  return (
    <div className="font-sans">
      {CASE_STUDIES_WITH_DARK_BG.includes(slug) && <div className="absolute left-0 top-0 -z-10 h-[52rem] w-full bg-[#0F1523] text-white md:h-[42rem]" />}

      <Header className={CASE_STUDIES_WITH_DARK_BG.includes(slug) && scrollPosition < 660 ? "bg-[#0F1523] text-white" : undefined} />

      <section className={cn("mx-auto max-w-4xl w-full space-y-8 p-6 pt-24 md:pt-40", CASE_STUDIES_WITH_DARK_BG.includes(slug) ? "text-white" : "text-dark")}>
        {!CASE_STUDIES_WITH_DARK_BG.includes(slug) && (
          <>
            <img src={subtractRight} alt="Subtract Right" className="absolute right-0 top-40 -z-10 hidden xl:block" />
            <img src={subtractLeft} alt="Subtract Left" className="absolute left-0 top-80 -z-10 hidden xl:block" />
          </>
        )}
        <div className="mx-auto max-w-4xl space-y-3">
          <h1 className="text-3xl font-medium">{title}</h1>
          <h2 className="text-lg uppercase">{tagline}</h2>
        </div>

        <div className="relative space-y-3 text-base">
          <div className="mx-auto max-w-4xl">{description}</div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-48 gap-y-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-bold">My Role</h3>
              <p>{role}</p>
            </div>
            <div>
              <h3 className="mb-3 font-bold">Timeframe</h3>
              <p>{timeframe}</p>
            </div>
            <div>
              <h3 className="mb-3 font-bold">Responsibilities</h3>
              {Array.isArray(responsibilities) && responsibilities.length > 1 ? (
                <ol className="list-inside list-decimal">
                  {responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ol>
              ) : (
                <p>{responsibilities}</p>
              )}
            </div>
            <div>
              <h3 className="mb-3 font-bold">Tools</h3>
              <p>{formattedTools}</p>
            </div>
          </div>
          {!Component || externalLink ? null : <Component />}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className={cn("mx-auto mt-16 flex max-w-4xl flex-col items-center gap-4 sm:flex-row", isFirstCaseStudy ? "justify-end" : "justify-between")}>
        {!isFirstCaseStudy && (
          <a href={`?ref=${caseStudiesData[caseStudyIndex - 1].slug}`}>
            <Button variant="outline" className="flex w-52 items-center gap-2 text-sm">
              <span className="font-bold">←</span> Previous Case Study
            </Button>
          </a>
        )}

        {!isLastCaseStudy && (
          <a
            href={caseStudiesData[caseStudyIndex + 1].externalLink ? caseStudiesData[caseStudyIndex + 1].externalLink : `?ref=${caseStudiesData[caseStudyIndex + 1].slug}`}
            target={caseStudiesData[caseStudyIndex + 1].externalLink ? "_blank" : "_self"}
            rel={caseStudiesData[caseStudyIndex + 1].externalLink ? "noopener noreferrer" : ""}>
            <Button variant="outline" className="flex w-52 items-center gap-2 text-sm">
              Next Case Study <span className="font-bold">→</span>
            </Button>
          </a>
        )}
      </div>

      <Footer />
    </div>
  );
};

export { CaseStudyDat };
