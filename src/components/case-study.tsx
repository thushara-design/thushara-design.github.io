import { Button } from "./ui/button";
import { caseStudiesData, CaseStudyData } from "../data";
import { useNavigate } from "react-router";
import ArrowRight from "@/assets/arrow-right";

// const CaseStudy = ({ onSlugChange }: { onSlugChange: (slug: string) => void }) => {
const CaseStudy = () => {
  const navigate = useNavigate();

  const handleSlugChange = (slug: string) => {
    // onSlugChange(slug);
    navigate({ search: `?ref=${slug}` });
  };

  const renderTags = (tags: string[]) => {
    if (!tags) return null;
    return tags.map((tag) => (
      <li key={tag} className="px-3 py-1 odd:bg-accent-primary even:bg-accent-secondary">
        {tag}
      </li>
    ));
  };

  const renderCaseStudies = (caseStudies: CaseStudyData[]) => {
    if (!caseStudies) return null;

    return caseStudies.map(({ image, title, slug, description, tags }) => (
      <div key={title} className="flex w-full flex-col rounded-sm shadow-custom transition-transform duration-300 lg:flex-row lg:even:flex-row-reverse">
        <img src={`/images/${image}`} alt={title} width={570} height={310} className="rounded-sm object-cover lg:w-1/2" />
        <div className="flex size-full flex-col justify-between space-y-4 px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="space-y-3.5">
            <p className="line-clamp-3">{description}</p>
            <ul className="flex flex-wrap gap-2">{renderTags(tags)}</ul>
          </div>
          <div className="group mt-2">
            <Button variant="outline" onClick={() => handleSlugChange(slug)}>
              View case study
              <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section id="case-studies" className="space-y-6">
      <h2 className="text-2xl font-bold">Case Studies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">{renderCaseStudies(caseStudiesData)}</div>
    </section>
  );
};

export { CaseStudy };

// import { Button } from "./ui/button";
// import { caseStudiesData, CaseStudyData } from "../data";
// import { arrowRight } from "../assets/images";
// import { Link } from "react-router";
// // import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// const CaseStudy = () => {
//   const renderTags = (tags: string | string[]) => {
//     if (!tags) return null;
//     const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => <li className="px-3 py-1 odd:bg-accent-primary even:bg-accent-secondary">{children}</li>;

//     if (!Array.isArray(tags)) return <Tag>{tags}</Tag>;
//     return tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
//   };

//   const renderCaseStudies = (caseStudies: CaseStudyData[]) => {
//     if (!caseStudies) return null;
//     return caseStudies.map(({ image, title, slug, description, tags }) => (
//       // <div key={title} className="flex w-full flex-col rounded-sm shadow-md transition-transform duration-300 lg:flex-row lg:even:flex-row-reverse">
//       <div key={title} className="flex w-full flex-col rounded-sm shadow-custom transition-transform duration-300 lg:flex-row lg:even:flex-row-reverse">
//         <img src={`/images/${image}`} alt={title} width={570} height={310} className="rounded-sm object-cover lg:w-1/2" />
//         <div className="flex size-full flex-col justify-between space-y-4 px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
//           <h3 className="text-2xl font-bold">{title}</h3>
//           <div className="space-y-3.5">
//             <p className="line-clamp-3">{description}</p>
//             <ul className="flex flex-wrap gap-2">{renderTags(tags)}</ul>
//           </div>
//           <div className="group mt-2">
//             <Link to={`/case-study/${slug}`}>
//               <Button variant="outline" className="flex items-center rounded-sm">
//                 View case study <img src={arrowRight} alt="Arrow Right" className="transform transition-transform duration-300 group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//         {/* <div className="flex size-full flex-col justify-between px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
//           <h3 className="text-2xl font-bold">{title}</h3>
//           <div className="space-y-4">
//             <p className="mt-2 text-gray-600">{description}</p>
//             <ul className="flex flex-wrap gap-2">{renderTags(tags)}</ul>
//           </div>
//           <div className="group mt-2">
//             <Link to={`/case-study/${slug}`}>
//               <Button variant="secondary">
//                 View case study <img src={arrowRight} alt="Arrow Right" className="transform transition-transform duration-300 group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </div>
//         </div> */}
//       </div>
//     ));
//   };

//   return (
//     <section id="case-studies" className="space-y-6">
//       <h2 className="text-2xl font-bold">Case Studies</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
//         {/* <Carousel orientation="horizontal">
//           <CarouselContent>{renderCaseStudies(caseStudiesData)}</CarouselContent>
//         </Carousel> */}
//         {renderCaseStudies(caseStudiesData)}
//       </div>
//     </section>
//   );
// };

// export { CaseStudy };
