import { useState, useEffect } from "react";
import { caseStudiesData } from "../data";
// import { useParams } from "react-router";
import { Header } from "./header";
import { Footer } from "./footer";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ScrollFade } from "./ui/scroll-fade";

// case studies with dark background
const CASE_STUDIES_WITH_DARK_BG = ["gistly"];

const CaseStudyDat = ({ slug }: { slug: string }) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    // const position = document.documentElement.scrollTop;
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!slug) return null;

  const caseStudy = caseStudiesData.find((caseStudy) => caseStudy.slug === slug);
  if (!caseStudy) return null;
  const { title, slug: id, tagline, description, Component, externalLink, responsibilities, role, timeframes, tools } = caseStudy;

  // Format tools: "Figma, FigJam, and Axure"
  const formattedTools = Array.isArray(tools) && tools.length > 1 ? tools.slice(0, -1).join(", ") + " and " + tools.slice(-1) : tools;

  return (
    <div className="font-sans">
      {CASE_STUDIES_WITH_DARK_BG.includes(id) && <div className="bg-[#0F1523] text-white absolute top-0 left-0 w-full h-[52rem] md:h-[42rem] -z-10" />}
      {/* <Header className={scrollPosition > 1030 ? "bg-white/30 text-dark" : "bg-dark/30 text-white"} /> */}
      <Header className={CASE_STUDIES_WITH_DARK_BG.includes(id) ? (scrollPosition > 660 ? "bg-white/30 text-dark" : "bg-transparent/30 text-white") : undefined} />
      {/* <section className="container mx-auto max-w-4xl space-y-8 p-6 md:p-5 md:py-40"> */}
      <section className={cn("mx-auto max-w-4xl w-full space-y-8 p-6 pt-24 md:pt-40", CASE_STUDIES_WITH_DARK_BG.includes(id) ? "text-white" : "text-dark")}>
        <ScrollFade className="space-y-3 mx-auto max-w-4xl">
          <h1 className="text-3xl font-medium">{title}</h1>
          <h2 className="text-lg uppercase">{tagline}</h2>
        </ScrollFade>
        <div className="relative space-y-3 text-base">
          <ScrollFade className="mx-auto max-w-4xl">{description}</ScrollFade>
          <ScrollFade className="mx-auto max-w-4xl grid md:grid-cols-2 gap-y-6 gap-x-48 grid-cols-1">
            <div>
              <h3 className="font-bold mb-3">My Role</h3>
              <p>{role}</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Timeframes</h3>
              <p>{timeframes}</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Responsibilities</h3>
              {Array.isArray(responsibilities) && tools.length > 1 ? (
                <ol className="list-decimal list-inside">
                  {responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ol>
              ) : (
                <p>{responsibilities}</p>
              )}
            </div>
            <div>
              <h3 className="font-bold mb-3">Tools</h3>
              <p> {formattedTools}</p>
            </div>
          </ScrollFade>
          {!Component || externalLink ? null : <Component />}
        </div>
      </section>
      <div className="mt-16 flex flex-col gap-4 sm:flex-row justify-between items-center mx-auto max-w-4xl">
        <Button
          variant="outline"
          onClick={() => {
            const prevIndex = caseStudiesData.findIndex((caseStudy) => caseStudy.slug === id) - 1;
            const prevSlug = caseStudiesData[prevIndex].slug;
            navigate({ search: `?ref=${prevSlug}` });
          }}
          className="w-52 flex items-center gap-2 text-sm">
          <span className="font-bold">←</span> Previous Case Study
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const nextIndex = caseStudiesData.findIndex((caseStudy) => caseStudy.slug === id) + 1;
            const nextCaseStudy = caseStudiesData[nextIndex];
            if (nextCaseStudy.externalLink) {
              window.open(nextCaseStudy.externalLink, "_blank");
              return;
            }
            const nextSlug = nextCaseStudy.slug;
            navigate({ search: `?ref=${nextSlug}` });
          }}
          className="w-52 flex items-center gap-2 text-sm">
          Next Case Study <span className="font-bold">→</span>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export { CaseStudyDat };
