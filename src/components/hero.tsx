import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { socialLinks } from "@/data";

export const Hero = () => {
  return (
    <AnimatedSection id="#" className="flex flex-col items-center py-28 text-center font-body">
      <div className="flex max-w-3xl flex-col items-center gap-8">
        <h1 className="font-mono text-5xl font-bold leading-20 sm:text-6xl">Hi, I&apos;m Thushara.</h1>
        <p className="text-xl font-bold leading-10">
          I design intuitive interfaces that bring simplicity and clarity, with psychology, research, and strategy guiding every decision to move users and metrics.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            <Button variant="outline">Resume</Button>
          </a>
          <a href={socialLinks.find(({ label }) => label === "Email")?.link}>
            <Button variant="outline">Hire me</Button>
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};
