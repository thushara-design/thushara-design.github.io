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
            className="flex w-full flex-col lg:flex-row lg:even:flex-row-reverse">
            <div className="lg:w-1/2">
              <img
                src={`/images/${image}`}
                alt={title}
                width={570}
                height={310}
                className="w-full h-auto object-cover"
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
                  <a href={externalLink} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      View case study
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" onClick={() => handleSlugChange(slug)}>
                    View case study
                    <ArrowRight className="ml-2 w-4 h-4" />
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
