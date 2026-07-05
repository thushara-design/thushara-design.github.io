import { CaseStudy1, CaseStudy2 } from "../components/case-studies";

const caseStudies = [
  {
    title: "Gistly.ai",
    slug: "gistly",
    tagline: "AI POWERED CALL AUDITING",
    tags: ["CRM", "B2B SaaS", "Data Analytics"],
    description: "Gistly.ai is an AI-powered platform that streamlines the call auditing process for sales, collections and suppport.",
    extendedDescription:
      "Gistly.ai is an AI-powered platform that streaml the call auditing process for sales calls to enhance customer interactions, gain more leads, and assess the calls. In this case study, the process of improving and redesigning the call analysis page is outlined.",
    image: "case-study-1.png",
    role: "UI/UX designer",
    timeframe: "Nov 24' to Dec 24'",
    tools: ["Figma", "FigJam", "Axure"],
    responsibilities: ["UX research", "User flows, Paper wireframes, Low-fi and high-fi wireframes and creating prototypes"],
    Component: CaseStudy1,
    liveProjectLink: "https://gistly.ai",
    externalLink: undefined,
  },
  {
    title: "Serenity",
    slug: "serenity",
    tagline: "ARTIST BIO APP",
    tags: ["Mobile UX", "Information Architecture", "Accessibility"],
    description: "Serenity is a Google UX course project where I applied Google-recommended design frameworks and UX methodologies.",
    extendedDescription:
      "SerenityConnect is an Artist Bio app specifically designed for an art gallery.  People often find breathtaking artworks in various art galleries but spend hours getting enough info on the artist of the artwork, especially if they are new artists. This app has all the verified info on the artist including a biography, details on other works, social media accounts, personal websites, and info on events and exhibitions.",
    image: "case-study-2.png",
    role: "UI/UX designer",
    timeframe: "6-8 weeks",
    tools: ["Figma"],
    responsibilities: "Conducting interviews, paper and digital wireframing, low and high-fidelity prototyping, conducting usability studies, accounting for accessibility, and iterating on designs.",
    Component: CaseStudy2,
    externalLink: undefined,
  },
];

export default caseStudies;
