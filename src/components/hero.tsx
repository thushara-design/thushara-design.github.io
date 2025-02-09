import { Button } from "./ui/button";
// import arrowDownToLine from "../assets/arrow-down-to-line.svg";
// import { arrowDown, arrowDownToLine, flower } from "../assets/images";
import { arrowDown, arrowDownToLine } from "../assets/images";

export const Hero = () => {
  return (
    <section className="font-body text-gray-600">
      <div className="flex flex-col items-center md:flex-row md:p-5 md:py-24">
        {/* <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-2/3 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24"> */}
        <div className="mb-16 mt-28 flex flex-col md:mb-0 md:w-full">
          <h1 className="font-title text-3xl font-medium leading-relaxed text-gray-900 sm:text-6xl md:mb-4">
            Hi, <br className="hidden lg:inline-block" />
            I&apos;m Thushara.
          </h1>
          <strong className="text-xl font-normal italic">Designing with purpose.</strong>
          <p className="my-8 font-title text-3xl leading-10">
            I'm a <em className="italic underline underline-offset-1">User Experience designer</em> passionate about creating intuitive, empathetic design solutions that simplify user tasks while aligning with both user needs and business
            objectives.
          </p>
          <div className="flex">
            <Button className="gap-x-2.5">
              <img src={arrowDownToLine} alt="Arrow down to line" />
              Resume
            </Button>
          </div>
        </div>
        {/* <div className="flex h-[30rem] w-5/6 flex-col items-end md:w-1/3 lg:w-full lg:max-w-lg">
          <img src={flower} alt="Flower" className="animate-spin" />
        </div> */}
      </div>
      <img src={arrowDown} alt="Arrow down" className="animate-bounce" />
    </section>
  );
};
