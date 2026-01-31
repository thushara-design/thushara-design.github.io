import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <AnimatedSection id="#" className="flex flex-col items-center font-body md:flex-row md:py-24">
      <div className="mb-24 mt-32 flex flex-col md:mb-0 md:w-full">
        <h1 className="leading-tight sm:leading-40 font-mono text-5xl font-medium sm:text-5xl text-ag-dark">Hi, I&apos;m Thushara.</h1>
        <p className="my-12 font-title text-3xl leading-10 text-ag-grey">
          I design intuitive digital experiences that bring simplicity, clarity, and ease to users while aligning with business goals.
        </p>
        <a href="https://calendly.com/thusharavarghese9/introduction-discussion" target="_blank" rel="noopener noreferrer">
          <Button variant="primary">Schedule a call</Button>
        </a>
      </div>
    </AnimatedSection>
  );
};
