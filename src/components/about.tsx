import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { profile, Linkedin, Mail } from "../assets/images";
import { socialLinks, type TestimonialData, testimonialData } from "../data";

export const About = () => {
	const renderTestimonial = (testimonials: TestimonialData[]) =>
		testimonials.map(({ id, quote, author, contact }, index) => (
			<AnimatedSection
				delay={index * 0.2}
				key={id}
				className="flex min-h-96 flex-col justify-between gap-y-3 rounded-2xl border-solid border-dark px-8 py-6 font-body odd:bg-accent-primary even:bg-accent-secondary first-of-type:border first-of-type:bg-white"
			>
				<p>"{quote}"</p>
				<div className="space-y-3 text-right">
					<h3>{author}</h3>
					<p>{contact}</p>
				</div>
			</AnimatedSection>
		));

	return (
		<AnimatedSection id="about">
			<h2 className="mb-16 text-2xl font-bold md:mb-6">About me</h2>
			<section className="mb-6 flex flex-col gap-20 md:mb-20 md:flex-row-reverse">
				<div className="relative size-48 md:size-full">
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
						className="size-full rounded-full border-4 border-white"
					/>
				</div>

				<div className="flex flex-col justify-between gap-2 text-dark">
					<p>
                        I'm Thushara, a Product designer (UX/UI) focused on creating intuitive digital experiences that feel effortless and meaningful. My approach combines simplicity, clarity, and usability along with accessibility while ensuring that the design not only meets user needs but also supports business goals.
						<br />
                        With a deep interest in psychology and empathetic design, I enjoy transforming complex ideas into simple, elegant, user-centered solutions. When I'm not designing, you'll find me exploring new ideas with diverse people, illustrating a children's book, or reading new articles in cognitive science and technology.
                    </p>
					<div className="flex items-center gap-3">
						<a
							href={socialLinks.find((link) => link.label === "Linkedln")?.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1"
						>
							<Button variant="outline">
								<Linkedin /> LinkedIn
							</Button>
						</a>
						<a
							href={socialLinks.find((link) => link.label === "Email")?.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1"
						>
							<Button variant="outline">
								<Mail /> Message
							</Button>
						</a>
					</div>
				</div>
			</section>

			<div className="grid grid-cols-1 gap-4 text-xl text-dark md:grid-cols-2 lg:grid-cols-3">
				{renderTestimonial(testimonialData)}
			</div>
		</AnimatedSection>
	);
};
