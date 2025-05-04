import { AnimatedSection } from "./animated-section";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { caseStudiesData } from "../data";
import ArrowRight from "@/assets/arrow-right";

const CaseStudy = () => {
  const navigate = useNavigate();

  const handleSlugChange = useCallback(
    (slug: string) => {
      navigate({ search: `?ref=${slug}` }, { preventScrollReset: false });
    },
    [navigate],
  );

  return (
    <AnimatedSection id="case-studies" className="space-y-12">
      <h2 className="text-3xl font-bold">Case Studies</h2>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
        {caseStudiesData.map(({ image, title, slug, description, tags, externalLink }, index) => (
          <AnimatedSection
            as="div"
            delay={index === 0 ? 0 : index * 0.2}
            key={slug}
            {...(index === 0 ? {
              initial: { opacity: 1, y: 0 },
              whileInView: { opacity: 1, y: 0 },
              viewport: undefined
            } : {})}
            className="flex w-full flex-col rounded-sm shadow-custom lg:flex-row lg:even:flex-row-reverse">
            <img
              src={`/images/${image}`}
              alt={title}
              width={570}
              height={310}
              className={`max-lg:rounded-t-sm object-cover lg:w-1/2 ${index % 2 === 0 ? "lg:rounded-l-sm" : "lg:rounded-r-sm"}`}
            />
            <div className="flex flex-col gap-6 p-8">
              <h3 className="text-2xl font-bold">{title}</h3>
              <div className="space-y-4">
                <p className="line-clamp-3 text-black">{description}</p>
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="px-3 py-1 odd:bg-accent-primary even:bg-accent-secondary">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                {externalLink ? (
                  <a href={externalLink} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      View case study
                      <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" onClick={() => handleSlugChange(slug)}>
                    View case study
                    <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
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
