import { Button } from "./ui/button";
import { caseStudiesData, CaseStudyData } from "../data";
import { arrowRight } from "../assets/images";
import { Link } from "react-router";
// import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const CaseStudy = () => {
  const renderTags = (tags: string | string[]) => {
    if (!tags) return null;
    const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => <li className="rounded-sm border px-3 py-1 odd:bg-accent-primary even:bg-accent-secondary">{children}</li>;

    if (!Array.isArray(tags)) return <Tag>{tags}</Tag>;
    return tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
  };

  const renderCaseStudies = (caseStudies: CaseStudyData[]) => {
    if (!caseStudies) return null;
    return caseStudies.map(({ image, title, slug, description, tags }) => (
      // <div className="flex w-full flex-col rounded-sm shadow-md transition-transform duration-300 hover:scale-[1.00] sm:flex-row sm:even:flex-row-reverse" key={title}>
      <div className="flex w-full flex-col rounded-sm shadow-md transition-transform duration-300 lg:flex-row lg:even:flex-row-reverse" key={title}>
        <img src={`/images/${image}`} alt={title} width={570} height={310} className="rounded-sm object-cover lg:w-1/2" />
        <div className="flex size-full flex-col justify-between space-y-4 px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="line-clamp-3">{description}</p>
          </div>
          <div className="space-y-2">
            <ul className="flex flex-wrap gap-2">{renderTags(tags)}</ul>
            <div className="group mt-2">
              <Link to={`/case-study/${slug}`}>
                <Button variant="secondary">
                  View case study <img src={arrowRight} alt="Arrow Right" className="transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="flex size-full flex-col justify-between px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="space-y-4">
            <p className="mt-2 text-gray-600">{description}</p>
            <ul className="flex flex-wrap gap-2">{renderTags(tags)}</ul>
          </div>
          <div className="group mt-2">
            <Link to={`/case-study/${slug}`}>
              <Button variant="secondary">
                View case study <img src={arrowRight} alt="Arrow Right" className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div> */}
      </div>
    ));
  };

  return (
    <section id="case-studies" className="space-y-6">
      <h2 className="text-2xl font-bold">Case Studies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {/* <Carousel orientation="horizontal">
          <CarouselContent>{renderCaseStudies(caseStudiesData)}</CarouselContent>
        </Carousel> */}
        {renderCaseStudies(caseStudiesData)}
      </div>
    </section>
  );
};

export { CaseStudy };
