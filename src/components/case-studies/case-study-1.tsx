import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatedSection } from "../animated-section";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { cn } from "../../lib/utils";
import currency from "./icons/currency.svg";
import graph from "./icons/graph.svg";
import smile from "./icons/smile.svg";

export const CaseStudy1 = () => {
	return (
		<div className="mx-auto mt-16 w-full max-w-5xl space-y-24 text-base text-black">
			{/* Hero Metrics - Integrated into dark section */}
			<AnimatedSection className="mx-auto max-w-4xl">
				<div className="mb-8 py-8">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div className="flex flex-col items-center justify-center space-y-2">
							<div className="text-3xl font-light text-white">24%</div>
							<div className="text-xs font-medium text-gray-300 uppercase tracking-widest">Reduction in time on task</div>
						</div>
						<div className="flex flex-col items-center justify-center space-y-2">
							<div className="text-3xl font-light text-white">5+</div>
							<div className="text-xs font-medium text-gray-300 uppercase tracking-widest">User interviews</div>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* Hero Carousel */}
			<AnimatedSection>
				<Carousel
					orientation="horizontal"
					plugins={[Autoplay({ delay: 4000 })]}
				>
					<CarouselContent>
						<CarouselItem>
							<img
								src="/images/gistly/image-1-1.png"
								alt="Gistly.ai Dashboard"
								className="h-full w-full object-contain"
							/>
						</CarouselItem>
						<CarouselItem>
							<img
								src="/images/gistly/image-1-2.png"
								alt="Gistly.ai Template Creation"
								className="h-full w-full object-contain"
							/>
						</CarouselItem>
						<CarouselItem>
							<img
								src="/images/gistly/image-1-3.png"
								alt="Gistly.ai Final Design"
								className="h-full w-full object-contain"
							/>
						</CarouselItem>
					</CarouselContent>
				</Carousel>
			</AnimatedSection>

			{/* Problem Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">The Problem</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="text-lg font-medium leading-relaxed text-gray-800">
						Managers need to upload their organization's call auditing templates to Gistly.ai in order to audit agent calls and evaluate whether they meet the quality standards set by the organization.
					</p>
					<p className="leading-relaxed text-gray-600">
						The templates include specific parameters defined by each organization to ensure agents meet call quality standards. In traditional settings, templates are manually given to call quality analysts who check each parameter manually. Gistly automates this process using AI and provides scores, transcriptions, and summaries to the organization.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Challenges</h3>
						<ul className="space-y-3 text-gray-600">
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span>Complex parameter configuration process</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span>High cognitive load for users</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span>Time-consuming template creation</span>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Impact</h3>
						<ul className="space-y-3 text-gray-600">
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-gray-400"></div>
								<span>Reduced productivity across teams</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-gray-400"></div>
								<span>Increased user frustration</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-gray-400"></div>
								<span>Lower adoption rates</span>
							</li>
						</ul>
					</div>
				</div>
			</AnimatedSection>

			{/* Solution Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">The Solution</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="text-lg font-medium leading-relaxed text-gray-800">
						Conducted comprehensive UX research, performed task analysis, and designed an intuitive interface that simplifies the template creation process while maintaining the flexibility users need.
					</p>
					<p className="leading-relaxed text-gray-600">
						The users' technological expertise, the context of the task, and their experience with similar applications such as spreadsheets were taken into account. The tasks were grouped based on their priority.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
					<div className="space-y-4 text-center">
						<div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<h3 className="font-medium">User Research</h3>
						<p className="text-sm text-gray-600">Deep dive into user behaviors and pain points</p>
					</div>
					<div className="space-y-4 text-center">
						<div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 className="font-medium">Task Analysis</h3>
						<p className="text-sm text-gray-600">Streamlined workflows based on user priorities</p>
					</div>
					<div className="space-y-4 text-center">
						<div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 className="font-medium">Intuitive Design</h3>
						<p className="text-sm text-gray-600">Familiar patterns that reduce learning curve</p>
					</div>
				</div>
			</AnimatedSection>

			{/* Design Process Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Design Process</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="leading-relaxed text-gray-600">
						The design process at Gistly is influenced by Agile and Lean UX methodologies. It combines the iterative, feedback-driven approach of Agile with the focus on delivering minimal, high-value solutions quickly and efficiently, as seen in Lean UX, to ensure continuous improvement and user-centered design.
					</p>
				</div>
			</AnimatedSection>

			{/* Process Diagram */}
			<AnimatedSection className="w-full space-y-6">
				<img
					src="/images/gistly/image-2.png"
					alt="Gistly UX Process Diagram"
					className="h-full w-full object-contain"
				/>
				<span className="block text-center text-sm text-gray-500 italic">
					Diagrammatic Representation of Gistly's UX Process
				</span>
			</AnimatedSection>

			{/* User Research Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Understanding the Users</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>

				{/* User Personas */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{data2.map((item) => (
						<div key={item.id} className="space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
								<img src={item.icon} alt={item.label} className="h-8 w-8" />
							</div>
							<span className="block font-medium">{item.label}</span>
						</div>
					))}
				</div>

				{/* Key Insights */}
				<div className="space-y-8 pt-8">
					<h2 className="text-xl font-light">Key Research Insights</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{data.map((item, index) => (
							<div key={item.title} className="space-y-4">
								<div className="flex items-center space-x-3">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
										{index + 1}
									</span>
									<h3 className="font-medium">{item.title}</h3>
								</div>
								<p className="text-gray-600 leading-relaxed">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</AnimatedSection>

			{/* Task Overview Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Task Analysis</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="text-lg font-medium leading-relaxed text-gray-800">
						<strong>The Task:</strong> Create a call quality template in Gistly by manually adding all categories and quality parameters from existing spreadsheets or PDFs so the AI tool can analyze sales calls.
					</p>
				</div>

				<div className="space-y-12">
					<img
						src="/images/gistly/image-3.png"
						alt="Task Analysis Overview"
						className="h-full w-full object-contain"
					/>
					<div className="space-y-4">
						<img
							src="/images/gistly/image-4.png"
							alt="User Journey Map and Task Analysis"
							className="h-full w-full object-contain"
						/>
						<span className="block text-center text-sm text-gray-500 italic">
							User journey map and task analysis
						</span>
					</div>
				</div>
			</AnimatedSection>

			{/* User Flow Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">User Flow</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="text-lg font-medium leading-relaxed text-gray-800">
						<strong>Goal:</strong> Create a template efficiently and accurately
					</p>
				</div>

				<div className="space-y-4">
					<img
						src="/images/gistly/image-5.svg"
						alt="User Flow Diagram"
						className="h-full w-full object-contain"
					/>
					<span className="block text-center text-sm text-gray-500 italic">
						User-flow diagram
					</span>
				</div>
			</AnimatedSection>

			{/* Design Explorations Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Design Explorations</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>

				<div className="space-y-16">
					{data3.map((item) => (
						<AnimatedSection
							as="div"
							key={item.id}
							className="space-y-8"
						>
							<div className="flex w-full flex-col gap-12 md:items-center md:odd:flex-row md:even:flex-row-reverse">
								<div className="md:w-1/2 space-y-6">
									<div className="flex items-center space-x-3">
										<span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
											{item.id}
										</span>
										<h2 className="text-xl font-light">{item.title}</h2>
									</div>
									<p className="text-gray-600 leading-relaxed">{item.description}</p>
									<div className="space-y-4">
										<span className="font-medium text-gray-800">Key Points:</span>
										<ul className="space-y-3">
											{item.points.map((point, index) => (
												<li key={index} className="flex items-start space-x-3">
													<div className="mt-2 h-1 w-1 rounded-full bg-gray-400"></div>
													<span className="text-gray-600 leading-relaxed">{point}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="space-y-4 md:w-1/2">
									<img
										src={item.image.src}
										alt={item.title}
										className={cn(
											"w-full",
											item.id === 2
												? "object-none object-left"
												: "object-contain",
										)}
									/>
									{item.image.label && (
										<span className="block text-center text-sm text-gray-500 italic">
											{item.image.label}
										</span>
									)}
								</div>
							</div>
						</AnimatedSection>
					))}
				</div>
			</AnimatedSection>

			{/* Prototyping Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Low Fidelity Prototyping</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<p className="leading-relaxed text-gray-600">
						<strong>Tool Choice:</strong> Used Axure to create a low-fidelity prototype to assess key metrics like time on task and evaluate when users experience exhaustion or overwhelm.
					</p>
				</div>

				<div className="space-y-12">
					<div className="overflow-hidden">
						<video
							loop
							muted
							autoPlay
							src="/images/gistly/video-1.mp4"
							poster="/images/gistly/image-1.png"
							title="Low Fidelity prototype"
							className="h-full w-full"
						/>
					</div>
					
					<div className="space-y-6">
						<h3 className="text-lg font-medium">Usability Issues Identified</h3>
						<ul className="space-y-3">
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span className="text-gray-600">Drag functionality and direct editing were not technically possible</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span className="text-gray-600">Icons for adding descriptions were confusing</span>
							</li>
							<li className="flex items-start space-x-3">
								<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
								<span className="text-gray-600">Modal window distracted from the main task</span>
							</li>
						</ul>
					</div>
				</div>
			</AnimatedSection>

			{/* Improvements Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-12">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Key Improvements</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>

				<div className="space-y-16">
					{data4.map((item) => (
						<React.Fragment key={item.id}>
							<AnimatedSection as="div" className="space-y-8">
								<div className="flex items-center space-x-3">
									<span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-medium text-white">
										{item.id}
									</span>
									<h3 className="text-xl font-light">{item.title}</h3>
								</div>
								<p className="text-gray-600 leading-relaxed">{item.description}</p>
							</AnimatedSection>
							{item.images.map((image) => (
								<AnimatedSection
									as="div"
									key={image.src}
									className="mb-12 w-full"
								>
									<img
										src={image.src}
										alt={image.alt}
										className="h-full w-full object-contain"
									/>
								</AnimatedSection>
							))}
						</React.Fragment>
					))}
				</div>

				{/* Final Prototype */}
				<div className="space-y-8">
					<div className="overflow-hidden">
						<video
							loop
							muted
							autoPlay
							src="/images/gistly/video-2.mp4"
							poster="/images/gistly/image-1.png"
							title="High Fidelity prototype"
							className="h-full w-full"
						/>
					</div>
					
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Results</h3>
							<p className="text-gray-600 leading-relaxed">
								The improvements resulted in a <strong>24% reduction in time on task metrics</strong> and significantly decreased the probability of errors.
							</p>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Accessibility</h3>
							<p className="text-gray-600 leading-relaxed">
								<strong>WCAG AA Compliance:</strong> Color contrasts meet accessibility standards, verified using A11y plugin for users with low vision or color blindness.
							</p>
						</div>
					</div>
				</div>
			</AnimatedSection>

			{/* Reflection Section */}
			<AnimatedSection className="mx-auto max-w-4xl space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">Key Learnings</h1>
					<div className="h-px w-16 bg-black"></div>
				</div>
				
				<div className="space-y-6">
					<div className="space-y-4 text-gray-600">
						<div className="flex items-start space-x-3">
							<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
							<p className="leading-relaxed"><strong>Good design is invisible:</strong> The amount of research and empathy required to create something that naturally blends with users' day-to-day tasks.</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
							<p className="leading-relaxed"><strong>Natural observation is invaluable:</strong> Understanding users' background, context, and daily workflows greatly helps create designs that resonate.</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
							<p className="leading-relaxed"><strong>Collaboration saves time:</strong> Regular team collaboration significantly prevented pursuit of infeasible ideas and improved design outcomes.</p>
						</div>
					</div>
				</div>
			</AnimatedSection>
		</div>
	);
};

const data = [
	{
		title: "High Cognitive Load",
		description:
			"Managers regularly juggle multiple tasks simultaneously (e.g., interacting with customers, managing internal team communication, analyzing data). This multitasking requires interfaces that minimize and distributes cognitive load.",
	},
	{
		title: "Medium-to-Low Error Tolerance",
		description:
			"Users have low error tolerance, particularly managers who deal with critical tasks involving customer and sensitive financial data. Any mistakes can lead to significant consequences, so the design must focus on accuracy.",
	},
	{
		title: "Prioritizes Clear and Understandable Data",
		description:
			"Since the target users work with large volumes of data, it's essential that information be presented in a clear and easily digestible format.",
	},
	{
		title: "Comfortable with enterprise software",
		description:
			"Majority of the target users are accustomed to working with enterprise-level software tools like Jira, ServiceNow, Salesforce, and Zoho.",
	},
	{
		title: "Prioritize usability over visual design",
		description:
			"Usability is more important than visual design—users want to complete tasks with minimal effort.",
	},
	{
		title: "Platform Conventions",
		description:
			"By sticking to familiar patterns, the learning curve is minimized.",
	},
];

const data2 = [
	{ id: 1, label: "Sales managers", icon: graph },
	{ id: 2, label: "Customer success managers", icon: smile },
	{ id: 3, label: "Collection managers", icon: currency },
];

const data3 = [
	{
		id: 1,
		title: "Exploration 1",
		description:
			"On the template page, parameters can be added and categorized by selecting multiple options.",
		image: {
			src: "/images/gistly/image-6.png",
			label: "Quick wireframes to demonstrate the idea",
		},
		points: [
			"If the user does not create categories, it may cause errors on other pages.",
			"Users may need to scroll down to view all categories, making the page potentially overwhelming to navigate.",
		],
	},
	{
		id: 2,
		title: "Exploration 2",
		description:
			"The real-life template is usually in a spreadsheet format, so users can upload it as a CSV file and select the columns for parameters, weightage, and response types. This is a common user flow on the platform.",
		image: {
			src: "/images/gistly/image-7.svg",
		},
		points: [
			"Not all users may have the template in CSV format.",
			"Technical feasibility considerations.",
			"There should still be an option to manually atemplates.",
		],
	},
	{
		id: 3,
		title: "Exploration 3",
		description:
			"Why not keep it similar to spreadsheets? Most users already have their templates in a spreadsheet software and likely have it open in another tab while manually recreating it in Gistly.",
		image: {
			src: "/images/gistly/image-8.png",
			label: "Quick wireframes to demonstrate the idea",
		},
		points: [
			"A clear visual indicator shows that parameters need to be categorized.",
			"Tasks are prioritized based on their importance. Users are provided with a default response configuration that can be customized later.",
			"This approach ensures the template is ready to use with minimal effort from the user, and once users want more customization, they can configure it. (This reduces the likelihood of overwhelming users during their first use.) ",
		],
	},
];

const data4 = [
	{
		id: 1,
		title: "Modal window to split layout",
		description:
			"It was realized that modal windows take the user away from the task context, making the process feel overcomplicated. The initial solution to avoid modals was to allow direct editing and manipulation within the table, but this proved technically unfeasible. As a result, we decided to split the screen and display the parameter settings on the right.",
		images: [
			{
				src: "/images/gistly/image-9.svg",
				alt: "iPad Mockup 1.png",
			},
		],
	},
	{
		id: 2,
		title: "Confusing icons",
		description:
			"The icons represent secondary, optional tasks for advanced users, so the signifier was deemed unnecessary. Direct editing on the table was out of scope for now, so the response configuration was incorporated into the parameter configuration.",
		images: [
			{
				src: "/images/gistly/image-10.png",
				alt: "iPad Mockup 1.png",
			},
		],
	},
	{
		id: 3,
		title: "No truncating of categories",
		description:
			"While some categories could be quite long, truncating the text seemed like a practical solution. However, we aimed to provide a better user experience. We introduced chips/badges that could wrap text without truncation. By using color and contrast, we communicated that these chips still function as tabs, with sub-parameters belonging to the highlighted category.",
		images: [
			{
				src: "/images/gistly/image-11.png",
				alt: "iPad Mockup 1.png",
			},
			{
				src: "/images/gistly/image-12.svg",
				alt: "iPad Mockup 1.png",
			},
		],
	},
];
