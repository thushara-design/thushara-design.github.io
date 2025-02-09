import caseStudies from "./case-studies";
import navLinks from "./nav-links.json";
import socialLinks from "./social-links.json";
import testimonialData from "./testimonials.json";

// Nav links for header
export { navLinks };

// Footer links
export { socialLinks };

// Case studies
export type CaseStudyData = (typeof caseStudiesData)[0];
export const caseStudiesData = caseStudies;

// Testimonials
export type TestimonialData = (typeof testimonialData)[0];
export { testimonialData };
