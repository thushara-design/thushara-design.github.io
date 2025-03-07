import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { socialLinks } from "@/data";

export const Hero = () => {
  return (
    <AnimatedSection id="#" className="flex flex-col items-center font-body md:flex-row md:py-16">
      <div className="mb-16 mt-28 flex flex-col md:mb-0 md:w-full">
        <h1 className="leading-20 font-title text-5xl font-medium sm:text-6xl">Hi, I&apos;m Thushara.</h1>
        <p className="my-8 font-title text-3xl leading-10">
          I'm a <em className="italic">UX/UI Designer</em> passionate about creating intuitive, empathetic design solutions that simplify user tasks
          while aligning with both user needs and business objectives.
        </p>
        <a href={socialLinks.find(({ label }) => label === "Email")?.link}>
          <Button variant="outline">Work with me</Button>
        </a>
      </div>
    </AnimatedSection>
  );
};
