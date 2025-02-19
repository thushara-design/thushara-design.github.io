import graph from "./icons/graph.svg";
import smile from "./icons/smile.svg";
import currency from "./icons/currency.svg";
import { cn } from "../../lib/utils";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const CaseStudy1 = () => {
  return (
    // <div className="absolute mt-9 w-full space-y-12 text-base text-dark">
    <div className="mx-auto mt-9 w-full max-w-7xl space-y-12 text-base text-dark">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* <img src="/images/gistly/image-1-1.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" /> */}
        <Carousel orientation="horizontal" plugins={[Autoplay({ delay: 4000 })]}>
          <CarouselContent>
            <CarouselItem>
              <img src="/images/gistly/image-1-1.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
            </CarouselItem>
            <CarouselItem>
              <img src="/images/gistly/image-1-2.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
            </CarouselItem>
            <CarouselItem>
              <img src="/images/gistly/image-1-3.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">The problem</h1>
          <p>
            <strong className="text-base font-bold italic">
              Managers need to upload their organization's call auditing templates to Gistly.ai in order to audit agent calls and evaluate whether they meet the quality standards set by the organization.
            </strong>
          </p>
          <p className="mt-2">
            The templates will include specific parameters defined by each organization to ensure that agents are meeting the call quality standards. In a traditional setting without AI, the templates are manually given to call quality
            analysts, who then check each parameter manually. Gistly automates this process using AI and provides scores, transcriptions, and summaries to the organization. To make this possible, the organization needs to create and save
            the template within the platform. The parameters are grouped into categories, and each parameter has a weight. There is also an overall weight for each category. Each parameter needs to be configured individually, which can make
            the process complex.
          </p>
        </section>
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">The solution</h1>
          <p className="mt-2">
            The issue was addressed by conducting UX research, performing task analysis, and genuinely empathizing with the users in order to simplify the process and make it more intuitive. The users' technological expertise, the context
            of the task, and their experience with similar applications such as spreadsheets were taken into account. The tasks were grouped based on their priority.
          </p>
        </section>
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">Now the design process!</h1>
          <p className="mt-2">
            Thee design process at Gistly is influenced by Agile and Lean UX methodologies. It combines the iterative, feedback-driven approach of Agile with the focus on delivering minimal, high-value solutions quickly and efficiently, as
            seen in Lean UX, to ensure continuous improvement and user-centered design. The focus of this process is on delivering a working user-friendly product quickly and iteratively, with regular stakeholder input, and adapting based
            on feedback.
          </p>
        </section>
      </div>
      <section className="w-full space-y-3">
        <img src="/images/gistly/image-2.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
        <span className="block text-center italic">Diagrammatic Representation of Gistly's UX Process</span>
      </section>
      <section className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">Understanding the users</h1>
        <div className="flex flex-wrap items-center justify-between space-y-1.5">
          {data2.map((item) => (
            <div key={item.id} className="flex items-center space-x-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-accent-tertiary">
                <img src={item.icon} alt={item.label} />
              </div>
              <span className="font-bold">{item.label}</span>
            </div>
          ))}
        </div>

        <p>Here are some of the key insights gathered from user interviews:</p>
        <ol className="list-inside list-decimal space-y-6">
          {data.map((item, index) => (
            <li key={index} className="font-bold">
              {item.title}
              <p className="font-normal">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Overview of the task</h1>
          <p>
            <span className="font-bold">The task:</span> Create a call quality template in Gistly by manually adding all categories and quality parameters from the existing spreadsheet or PDF so the AI tool can analyze the sales calls.
          </p>
        </div>
        <div className="w-full space-y-12">
          <img src="/images/gistly/image-3.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
          <div className="w-full space-y-3">
            <img src="/images/gistly/image-4.png" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
            <span className="block text-center italic">User journey map and task analysis</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Userflow</h1>
          <p className="text-base font-semibold">Goal : Create a template</p>
        </div>
        <div className="w-full space-y-12">
          <div className="w-full space-y-3">
            <img src="/images/gistly/image-5.svg" alt="iPad Mockup 1.png" className="h-full w-full object-contain even:object-none" />
            <span className="block text-center italic">User-flow diagram</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">Exploring alternative solutions</h1>
        <div className="space-y-12">
          {data3.map((item) => (
            <div key={item.id} className="flex w-full flex-col gap-6 text-base md:items-center md:odd:flex-row md:even:flex-row-reverse">
              <div className="md:w-1/2">
                <h2 className="mb-3 font-bold">{item.title}</h2>
                <p className="mb-6">{item.description}</p>
                <span>Key Points:</span>
                <ol className="list-inside list-disc">
                  {item.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-3 md:w-1/2">
                <img src={item.image.src} alt="iPad Mockup 1.png" className={cn("w-full", item.id === 2 ? "object-none object-left" : "object-contain")} />
                {item.image.label && <span className="text-base italic">{item.image.label}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-6 text-base">
        <h1 className="mb-0 text-2xl font-bold">Low Fidelity prototype</h1>
        <p className="font-medium">
          I used Axure to create a low-fidelity prototype because I wanted to assess key metrics such as time on task, as there is a lot of typing involved, which is not possible in Figma. I aimed to evaluate at what point users experience
          exhaustion or overwhelm
        </p>
        <div className="space-y-12">
          <video loop muted autoPlay src="/images/gistly/video-1.mp4" poster="/images/gistly/image-1.png" title="Low Fidelity prototype" className="h-full w-full" />
        </div>
        <div className="space-y-3 md:w-1/2">
          <h3 className="font-bold">Usability Issues</h3>
          <ul className="list-inside list-disc">
            <li>Drag functionality and direct editing were not technically possible at the moment.</li>
            <li>The icons for adding descriptions to parameters were confusing.</li>
            <li>The modal window distracted from the main task.</li>
          </ul>
        </div>
      </section>
      <section className="space-y-3 text-base">
        <h1 className="mx-auto max-w-4xl text-2xl font-bold">Improvements</h1>
        <div className="mx-auto max-w-7xl space-y-12">
          {data4.map((item) => (
            <React.Fragment key={item.id}>
              <div className="mx-auto max-w-4xl">
                <h3 className="mb-3 ml-1 font-bold">{`${item.id}. ${item.title}`}</h3>
                <p className="text-base font-normal">{item.description}</p>
              </div>
              {item.images.map((image) => (
                <div className="mb-14 w-full">
                  <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="mx-auto mt-16 w-full max-w-4xl">
          <video loop muted autoPlay src="/images/gistly/video-2.mp4" poster="/images/gistly/image-1.png" title="High Fidelity prototype" className="h-full w-full" />
        </div>
        <div className="mx-auto max-w-4xl space-y-3 text-base">
          <p>The improvements resulted in a 24% reduction in time on task metrics and significantly decreased the probability of errors.</p>
          <p>
            <span className="font-bold">Accessibility Considerations:</span> In addition to utilizing ShadCN's built-in accessibility features, we've made sure that the color contrasts throughout the design meet at least AA compliance
            according to WCAG (Web Content Accessibility Guidelines). This was verified using the A11y plugin, ensuring that all elements are clear and legible for users with low vision or color blindness
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-3">
        <h1 className="text-2xl font-bold">Reflection</h1>
        <p>
          This project helped me understand how good design is basically invisible to the users and the amount of research and empathy it takes to create something that naturally blends with users' day-to-day tasks. A bad design can leave a
          lasting impression on a user, while a good design may not be even noticeable. Although concepts like the Aesthetic Usability Effect do play a part in it, they cannot save a bad design.Natural observation of users can be invaluable
          when designing a solution. Understanding the background and context of a design problem is important. In this case, understanding what managers' daily lives look like, what software they use, and their goals and frustrations
          greatly helped me create designs that resonate with them. Collaborating regularly with the team significantly saved time by preventing the pursuit of infeasible ideas.
        </p>
      </section>
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
    description: "Users have low error tolerance, particularly managers who deal with critical tasks involving customer and sensitive financial data. Any mistakes can lead to significant consequences, so the design must focus on accuracy.",
  },
  {
    title: "Prioritizes Clear and Understandable Data",
    description: "Since the target users work with large volumes of data, it's essential that information be presented in a clear and easily digestible format.",
  },
  {
    title: "Comfortable with enterprise software",
    description: "Majority of the target users are accustomed to working with enterprise-level software tools like Jira, ServiceNow, Salesforce, and Zoho.",
  },
  {
    title: "Prioritize usability over visual design",
    description: "Usability is more important than visual design—users want to complete tasks with minimal effort.",
  },
  {
    title: "Platform Conventions",
    description: "By sticking to familiar patterns, the learning curve is minimized.",
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
    description: "On the template page, parameters can be added and categorized by selecting multiple options.",
    image: {
      src: "/images/gistly/image-6.png",
      label: "Quick wireframes to demonstrate the idea",
    },
    points: ["If the user does not create categories, it may cause errors on other pages.", "Users may need to scroll down to view all categories, making the page potentially overwhelming to navigate."],
  },
  {
    id: 2,
    title: "Exploration 2",
    description: "The real-life template is usually in a spreadsheet format, so users can upload it as a CSV file and select the columns for parameters, weightage, and response types. This is a common user flow on the platform.",
    image: {
      src: "/images/gistly/image-7.svg",
    },
    points: ["Not all users may have the template in CSV format.", "Technical feasibility considerations.", "There should still be an option to manually atemplates."],
  },
  {
    id: 3,
    title: "Exploration 3",
    description: "Why not keep it similar to spreadsheets? Most users already have their templates in a spreadsheet software and likely have it open in another tab while manually recreating it in Gistly.",
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
