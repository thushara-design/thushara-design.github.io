import { profile, Linkedin, Mail } from "../assets/images";
import { socialLinks, TestimonialData, testimonialData } from "../data";
import { Button } from "./ui/button";

export const About = () => {
  const renderTestimonial = (testimonials: TestimonialData[]) =>
    testimonials.map(({ id, quote, author, contact }) => (
      <div key={id} className="flex min-h-96 flex-col font-body justify-between gap-y-3 rounded-2xl border-solid border-dark px-8 py-6 odd:bg-accent-primary even:bg-accent-secondary first-of-type:border first-of-type:bg-white">
        <p>"{quote}"</p>
        <div className="space-y-3 text-right">
          <h3>{author}</h3>
          <p>{contact}</p>
        </div>
      </div>
    ));

  return (
    <section id="about">
      <h2 className="mb-16 text-2xl font-bold md:mb-6">About me</h2>
      <div className="mb-6 flex flex-col gap-20 md:mb-20 md:flex-row-reverse">
        <div className="relative size-48 md:size-full">
          {/* Outer Ring */}
          <div className="absolute -inset-4 animate-spin-slow rounded-full ring-1 ring-dark">
            {/* Rotating Dots */}
            <div className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-primary" />
            <div className="absolute left-1 top-1/3 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-secondary" />
          </div>

          {/* Profile Image */}
          <img src={profile} alt="Profile" className="size-full rounded-full border-4 border-white" />
        </div>

        <div className="flex flex-col justify-between gap-6 text-dark">
          <h3 className="font-title text-2xl italic">hello there :)</h3>
          <p>
            I am a dedicated designer based in India, and I'm truly passionate about creating intuitive user experiences. Research is my favorite part of the design process. I love connecting with diverse people to understand their goals,
            needs and pain points to create intuitive and beautiful solutions. I'm resourceful and love approaching challenges creatively, always excited to take on new projects and deliver my best. Outside of design, I enjoy meditating,
            drawing cute patterns, or spending time in nature.
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
    </section>
  );
};
