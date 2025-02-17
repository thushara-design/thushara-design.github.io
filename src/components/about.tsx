import { profile, Linkedin, Mail } from "../assets/images";
import { socialLinks, TestimonialData, testimonialData } from "../data";
import { Button } from "./ui/button";
import { ScrollFade } from "./ui/scroll-fade";

export const About = () => {
  const renderTestimonial = (testimonials: TestimonialData[]) =>
    testimonials.map(({ id, quote, author, contact }) => (
      <div key={id} className="font-title flex min-h-96 flex-col justify-between gap-y-3 rounded-2xl border-dark px-8 py-6 odd:bg-accent-primary even:bg-accent-secondary first-of-type:border border-solid first-of-type:bg-white">
        <p>"{quote}"</p>
        <div className="space-y-3 text-right">
          <h3>{author}</h3>
          <p>{contact}</p>
        </div>
      </div>
    ));

  return (
    <ScrollFade id="about">
      <h2 className="mb-16 text-2xl font-bold md:mb-6">About me</h2>
      <div className="mb-6 flex flex-col gap-20 md:mb-20 md:flex-row-reverse">
        <div className="relative size-48 md:size-full">
          {/* Outer Ring */}
          <div className="absolute -inset-4 rounded-full ring-1 ring-dark animate-spin-slow">
            {/* Rotating Dots */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-3.5 bg-accent-primary border border-black/5 rounded-full" />
            <div className="absolute top-1/3 left-1 -translate-x-1/2 size-3.5 bg-accent-secondary border border-black/5 rounded-full" />
          </div>

          {/* Profile Image */}
          <img src={profile} alt="Profile" className="size-full rounded-full border-4 border-white" />
          {/* <img src={profile} alt="Profile" className="size-full rounded-sm border-4 border-white" /> */}
        </div>

        <div className="flex flex-col justify-between gap-6 text-dark">
          <h3 className="font-title text-2xl italic">hello there :)</h3>
          <p>
            I am a dedicated designer based in India, and I'm truly passionate about creating intuitive user experiences. Research is my favorite part of the design process. I love connecting with diverse people to understand their goals,
            needs and pain points to create intuitive and beautiful solutions. I love working on high social impact areas like sustainability, health and wellness and education. I'm resourceful and love approaching challenges creatively,
            always excited to take on new projects and deliver my best. Outside of design, I enjoy meditating, drawing patterns, or spending time in nature.
          </p>
          <div className="flex items-center gap-3">
            <a href={socialLinks.find((link) => link.label === "Linkedln")?.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Button variant="outline">
                <Linkedin /> LinkedIn
              </Button>
            </a>
            <a href={socialLinks.find((link) => link.label === "Email")?.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Button variant="outline">
                <Mail /> Message
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 text-xl text-dark md:grid-cols-2 lg:grid-cols-3">{renderTestimonial(testimonialData)}</div>
    </ScrollFade>
  );
};
