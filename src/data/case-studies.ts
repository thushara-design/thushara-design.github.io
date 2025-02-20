import { CaseStudy1, CaseStudy2 } from "../components/case-studies";

const caseStudies = [
  {
    title: "Gistly.ai",
    slug: "gistly",
    tagline: "AI POWERED CALL AUDITING",
    tags: ["UX Design", "CRM", "Start-up", "User research"],
    description: "Gistly.ai is an AI-powered platform that aims at streamlining the call auditing process for sales calls to enhance customer interactions, gain more leads, and assess the calls.",
    extendedDescription:
      "Gistly.ai is an AI-powered platform that aims at streamlining the call auditing process for sales calls to enhance customer interactions, gain more leads, and assess the calls. In this case study, the process of improving and redesigning the call analysis page is outlined.",
    image: "case-study-1.png",
    role: "UI/UX designer",
    timeframe: "Nov 24' to Dec 24'",
    // tools: "Figma, FigJam, and Axure",
    tools: ["Figma", "FigJam", "Axure"],
    responsibilities: ["UX research", "User flows, Paper wireframes, Low-fi and high-fi wireframes and creating prototypes"],
    Component: CaseStudy1,
  },
  {
    title: "Serenity",
    slug: "serenity",
    tagline: "ARTIST BIO APP",
    tags: ["UX Design", "Mobile app", "Visual Design", "User research"],
    description: "Serenity is a Google UX course project created specifically for an art gallery. This peer-reviewed project allowed me to apply Google-recommended design frameworks and UX methodologies.",
    extendedDescription:
      "SerenityConnect is an Artist Bio app specifically designed for an art gallery.  People often find breathtaking artworks in various art galleries but spend hours getting enough info on the artist of the artwork, especially if they are new artists. This app has all the verified info on the artist including a biography, details on other works, social media accounts, personal websites, and info on events and exhibitions.",
    image: "case-study-2.png",
    role: "UI/UX designer",
    timeframe: "6-8 weeks",
    tools: ["Figma"],
    responsibilities: "Conducting interviews, paper and digital wireframing, low and high-fidelity prototyping, conducting usability studies, accounting for accessibility, and iterating on designs.",
    Component: CaseStudy2,
  },
  {
    title: "Elementry",
    slug: "elementry",
    tagline: "",
    tags: ["Banking", "Dashboard", "Visual Design", "User research"],
    description: "Elementary is another UX course project focused on understanding and improving the user experience of online banking for Indian customers.",
    image: "case-study-3.png",
    role: "UI/UX designer",
    timeframe: "",
    tools: ["Figma"],
    responsibilities: [],
    externalLink: "https://thushara-design.super.site/projects/brushd",
  },
];

export default caseStudies;
