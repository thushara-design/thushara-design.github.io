import { AnimatedSection } from "./animated-section";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import caseStudiesData from "../data/case-studies";
import ArrowRight from "../assets/arrow-right";
import ExternalLink from "../assets/external-link";

const CaseStudy = () => {
  const navigate = useNavigate();

  const handleSlugChange = useCallback(
    (slug: string) => {
      navigate({ search: `?ref=${slug}` }, { preventScrollReset: false });
    },
    [navigate],
  );

  const handleCardActivation = useCallback(
    (externalLink: string | undefined, slug: string) => {
      if (externalLink) {
        if (typeof window !== "undefined") {
          window.open(externalLink, "_blank", "noopener,noreferrer");
        }
        return;
      }

      handleSlugChange(slug);
    },
    [handleSlugChange],
  );

  return (
    <AnimatedSection id="case-studies" className="space-y-20">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-8 h-px bg-gray-300"></div>
        <h2 className="text-sm font-medium text-dark tracking-widest uppercase">Case Studies</h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-1 gap-20">
        {caseStudiesData.map(({ image, title, slug, description, tags, externalLink, liveProjectLink }, index) => (
          <AnimatedSection
            as="div"
            delay={index === 0 ? 0 : index * 0.2}
            key={slug}
            {...(index === 0 ? {
              initial: { opacity: 1, y: 0 },
              whileInView: { opacity: 1, y: 0 },
              viewport: undefined
            } : {})}
            className="group flex w-full cursor-pointer flex-col lg:flex-row lg:even:flex-row-reverse"
            onClick={() => handleCardActivation(externalLink, slug)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCardActivation(externalLink, slug);
              }
            }}
            role={externalLink ? "link" : "button"}
            tabIndex={0}
          >
            <div className="lg:w-1/2 overflow-hidden rounded-2xl">
              <img
                src={`/images/${image}`}
                alt={title}
                width={570}
                height={310}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
              />
            </div>
            <div className="flex flex-col justify-center gap-8 p-8 lg:w-1/2">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-dark flex items-center gap-2">
                  {title}
                  {liveProjectLink && (
                    <a
                      href={liveProjectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-dark transition-colors"
                      title="View live project"
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-2 px-4 py-2 text-sm font-light bg-[#FAFAFA] rounded-lg text-gray-700 font-geist">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-sm"></span>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                {externalLink ? (
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      className="border-none bg-transparent px-0 py-0 h-auto text-base font-medium gap-2 hover:bg-transparent hover:text-dark group-hover:font-semibold"
                    >
                      View case study
                      <ArrowRight className="ml-0.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSlugChange(slug);
                    }}
                    className="border-none bg-transparent px-0 py-0 h-auto text-base font-medium gap-2 hover:bg-transparent hover:text-dark group-hover:font-semibold"
                  >
                    View case study
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  );
};

export { CaseStudy };
