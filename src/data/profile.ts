/**
 * One source for the bio, shared by the About page and the crawler-readable
 * profile at /about.html, so the two can't drift apart.
 *
 * `searchable` exists only for the static page. A broad query ("B2B SaaS
 * designer") returns LinkedIn and Dribbble no matter what this file says; what
 * a personal site can win is the long tail, where the work is specific enough
 * that few pages match. So these lines name the actual problems in the words
 * someone would use to search for them.
 */

export const kicker = "Product designer · B2B UX · AI systems";

export const headline = "I design for the people behind messy workflows.";

export const bio = [
  "I started with psychology, and that still shapes how I design. I pay attention to how people make sense of information, where they hesitate, and what helps a complex workflow feel lighter.",
  "At Gistly, I worked on B2B product experiences for AI-powered call auditing, translating dense spreadsheets, operational rules, and manager workflows into interfaces that were easier to scan, trust, and use.",
  "More recently, I have been exploring AI development through product prototypes, writing, and self-initiated builds. I like the space where design judgment, systems thinking, and emerging tools meet.",
];

/** Plain statements of what the work actually is, for the static profile page. */
export const searchable = [
  "Sole product designer on a founding engineering team, taking an engineer-built product from internal tool to something customers could use.",
  "Designs AI evaluation and ground-truth labelling interfaces for non-engineers — the testing and tuning loop that lets a QA lead verify an AI's scoring and correct it when it is wrong.",
  "Works on making AI output legible and trustworthy to business users, rather than asking them to take a model's word for it.",
  "End to end: user research, information architecture, complex B2B workflows, design systems, and shipped UI.",
];

export const links = {
  medium: "https://medium.com/@thusharavarghese",
  linkedin: "https://www.linkedin.com/in/thushara-v",
  dribbble: "https://dribbble.com/thusharadesign",
  email: "thusharavarghese9@gmail.com",
};
