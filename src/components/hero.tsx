import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { socialLinks } from "@/data";

export const Hero = () => {
  return (
    <AnimatedSection id="#" className="flex flex-col items-center font-body md:flex-row md:py-16">
      <div className="mb-16 mt-28 flex flex-col md:mb-0 md:w-full">
        <h1 className="leading-20 font-sans text-5xl font-medium sm:text-6xl">Hi, I&apos;m Thushara.</h1>
        <p className="my-8 font-sans text-3xl leading-10">
          I design intuitive digital experiences that bring simplicity, clarity, and ease to users while aligning with business goals.
        </p>
        <a href={socialLinks.find(({ label }) => label === "Email")?.link}>
          <Button variant="outline">Work with me</Button>
        </a>
      </div>
    </AnimatedSection>
  );
};
