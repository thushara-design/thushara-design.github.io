import { AnimatedSection } from "./animated-section";
import { profile } from "../assets/images";
import { socialLinks } from "../data";
import ElegantLinkedin from "../assets/elegant-linkedin";
import ElegantMail from "../assets/elegant-mail";

export const About = () => {
	return (
		<AnimatedSection id="about" className="space-y-32 max-w-6xl mx-auto px-4">
			<div className="flex items-center gap-4 mb-8">
				<div className="w-8 h-px bg-ag-border"></div>
				<h2 className="text-sm font-medium text-ag-dark tracking-widest uppercase">About Me</h2>
				<div className="flex-1 h-px bg-ag-border"></div>
			</div>
			<section className="mb-8 flex flex-col items-center gap-12 md:mb-24 md:flex-row md:items-center md:gap-16 md:justify-center">
				<div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
					{/* Outer Ring */}
					<div className="absolute -inset-4 animate-spin-slow rounded-full ring-1 ring-dark">
						{/* Rotating Dots */}
						<div className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-primary" />
						<div className="absolute left-1 top-1/3 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-secondary" />
					</div>

					{/* Profile Image */}
					<img
						src={profile}
						alt="Profile"
						className="w-full h-full rounded-full border-4 border-white object-cover"
					/>
				</div>

				<div className="flex flex-col gap-6 text-ag-dark max-w-2xl">
					<p className="text-lg leading-relaxed text-ag-grey">
						I'm Thushara, a Product designer (UX/UI) focused on creating intuitive digital experiences that feel effortless and meaningful. My approach combines simplicity, clarity, and usability along with accessibility while ensuring that the design not only meets user needs but also supports business goals.
						<br />
						With a deep interest in psychology and empathetic design, I enjoy transforming complex ideas into simple, user-centered solutions.
					</p>
					<div className="flex items-center gap-4">
						<a
							href={socialLinks.find((link) => link.label === "Linkedin")?.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-center w-12 h-12 rounded-full border border-ag-border hover:border-ag-grey hover:bg-ag-bg-light transition-all duration-200"
							aria-label="Connect on LinkedIn"
						>
							<ElegantLinkedin className="w-5 h-5 text-ag-grey group-hover:text-ag-dark transition-colors duration-200" />
						</a>
						<a
							href={socialLinks.find((link) => link.label === "Email")?.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-center w-12 h-12 rounded-full border border-ag-border hover:border-ag-grey hover:bg-ag-bg-light transition-all duration-200"
							aria-label="Send email"
						>
							<ElegantMail className="w-5 h-5 text-ag-grey group-hover:text-ag-dark transition-colors duration-200" />
						</a>
					</div>
				</div>
			</section>
		</AnimatedSection>
	);
};
