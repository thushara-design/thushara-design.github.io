import { CaseStudy1, CaseStudyHomepage, CaseStudy2 } from "../components/case-studies";

const caseStudies = [
  {
    title: "Designing Gistly",
    slug: "gistly",
    tagline: "AI POWERED CALL AUDITING",
    tags: ["CRM", "B2B SaaS", "Data Analytics"],
    description: "Gistly.ai is an AI-powered platform that automates call auditing for sales, support, and collections, and is in production at 6+ companies.",
    extendedDescription:
      "Gistly.ai is an AI-powered platform that streamlines the call auditing process for sales calls to enhance customer interactions, gain more leads, and assess the calls. As Gistly's sole designer, I shaped the product end-to-end; this case study goes deep on its hardest problem, making the AI's scores something non-engineers can trust.",
    image: "case-study-1.png",
    role: "Sole product designer",
    timeframe: "2024 – present",
    tools: ["Figma", "FigJam", "Axure", "Amplitude", "Claude Code"],
    responsibilities: ["UX research", "Information architecture", "Complex B2B workflows", "Design systems", "Prototyping", "AI-assisted front-end"],
    Component: CaseStudy1,
    liveProjectLink: "https://gistly.ai",
    externalLink: undefined,
  },
  {
    title: "Redesigning Gistly's homepage",
    slug: "homepage",
    tagline: "HOMEPAGE REDESIGN",
    tags: ["Marketing site", "B2B SaaS", "Conversion"],
    description:
      "Rebuilding Gistly's homepage around one job, getting the right visitor to act. Homepage key events +475% and engagement time +47% year-over-year.",
    extendedDescription:
      "A redesign of Gistly's homepage from a feature-heavy, exploratory layout to a focused, action-led page. Homepage key events +475%, key-event rate +246%, and average engagement time +47% year-over-year, measured across GA4 and Clarity, with engagement gains attributed to the redesign and traffic growth kept separate.",
    image: "case-study-homepage.png",
    role: "Visual design and build",
    timeframe: "2025 – 2026",
    tools: ["Figma", "Adobe Illustrator", "Webflow", "GA4", "Microsoft Clarity"],
    responsibilities: [
      "Visual design, information hierarchy, composition, content organisation, Webflow build, and post-launch performance analysis",
    ],
    Component: CaseStudyHomepage,
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
