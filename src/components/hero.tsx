import { Button } from "./ui/button";
import { ScrollFade } from "./ui/scroll-fade";

export const Hero = () => {
  return (
    // <section className="font-body flex flex-col items-center md:flex-row md:py-24 min-h-screen">
    <ScrollFade className="font-body flex flex-col items-center md:flex-row md:py-16">
      <div className="mb-16 mt-28 flex flex-col md:mb-0 md:w-full">
        <h1 className="font-title text-5xl font-medium leading-20 sm:text-6xl">Hi, I&apos;m Thushara.</h1>
        <p className="my-8 font-title text-3xl leading-10">
          I'm a <em className="italic">UX/UI Designer</em> passionate about creating intuitive, empathetic design solutions that simplify user tasks while aligning with both user needs and business objectives.
        </p>
        <a href="https://drive.google.com/file/d/1RbgANZcxYaUCyjzAkkZOZkmz2AC2o1ts/view" target="_blank" rel="noreferrer">
          <Button variant="outline">Resume</Button>
        </a>
      </div>
    </ScrollFade>
  );
};
