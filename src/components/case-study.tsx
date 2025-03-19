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
		<AnimatedSection id="case-studies" className="space-y-6">
			<h2 className="text-2xl font-bold">Case Studies</h2>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
				{caseStudiesData.map(
					({ image, title, slug, description, tags, externalLink }, index) => (
						<AnimatedSection
							as="div"
							key={slug}
							className="flex w-full flex-col rounded-sm shadow-custom transition-transform duration-300 lg:flex-row lg:even:flex-row-reverse"
						>
							<img
								src={`/images/${image}`}
								alt={title}
								width={570}
								height={310}
								className={`max-lg:rounded-t-sm object-cover lg:w-1/2 ${index % 2 === 0 ? "lg:rounded-l-sm" : "lg:rounded-r-sm"}`}
							/>
							<div className="flex flex-col justify-between space-y-4 px-2.5 py-4 lg:w-1/2 lg:px-8 lg:py-5">
								<h3 className="text-2xl font-bold">{title}</h3>
								<div className="space-y-3.5">
									<p className="line-clamp-3">{description}</p>
									<ul className="flex flex-wrap gap-2">
										{tags.map((tag) => (
											<li
												key={tag}
												className="px-3 py-1 odd:bg-accent-primary even:bg-accent-secondary"
											>
												{tag}
											</li>
										))}
									</ul>
								</div>
								<div className="group mt-2">
									{externalLink ? (
										<a href={externalLink} target="_blank" rel="noreferrer">
											<Button variant="outline">
												View case study
												<ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
											</Button>
										</a>
									) : (
										<Button
											variant="outline"
											onClick={() => handleSlugChange(slug)}
										>
											View case study
											<ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
										</Button>
									)}
								</div>
							</div>
						</AnimatedSection>
					),
				)}
			</div>
		</AnimatedSection>
	);
};

export { CaseStudy };
