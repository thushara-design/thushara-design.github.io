import { AnimatedSection } from "./animated-section";
import { skills } from "@/data";

export const Skills = () => {
	const renderSkills = (skills: string[]) => {
		if (!skills) {
			return null;
		}
		return skills.map((skill, index) => (
			<AnimatedSection
				as="li"
				delay={index * 0.001}
				key={skill}
				className="rounded-sm border border-solid border-border px-4 py-3 text-dark"
			>
				{skill}
			</AnimatedSection>
		));
	};

	return (
		<AnimatedSection id="skills" className="space-y-20">
			<div className="flex items-center gap-4 mb-2">
				<div className="w-8 h-px bg-gray-300"></div>
				<h2 className="text-sm font-medium text-gray-600 tracking-widest uppercase">Skills & Expertise</h2>
				<div className="flex-1 h-px bg-gray-300"></div>
			</div>
			<ul className="flex flex-wrap gap-4">{renderSkills(skills)}</ul>
		</AnimatedSection>
	);
};
