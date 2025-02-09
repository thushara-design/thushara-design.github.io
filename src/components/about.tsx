import { image, linkedin, mail } from "../assets/images";
import { socialLinks, TestimonialData, testimonialData } from "../data";
import { Button } from "./ui/button";
// import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export const About = () => {
  const renderTestimonial = (testimonials: TestimonialData[]) =>
    testimonials.map(({ id, quote, author, contact }) => (
      <div
        key={id}
        // className={`flex flex-col justify-between gap-y-3 rounded-2xl border border-dark p-6 ${(index + 1) % 3 === 1 ? "bg-white first-of-type:bg-white" : "odd:bg-accent-primary even:bg-accent-secondary"}`}
        className="flex min-h-96 flex-col justify-between gap-y-3 rounded-2xl border-dark px-8 py-6 odd:bg-accent-primary even:bg-accent-secondary first-of-type:border first-of-type:bg-white">
        <p>“{quote}”</p>
        <div className="space-y-3 text-right">
          <h3>{author}</h3>
          <p>{contact}</p>
        </div>
      </div>
    ));

  return (
    <section id="about" className="space-y-6">
      <h2 className="text-2xl font-bold">About me</h2>
      <div className="grid grid-cols-1 gap-4 text-xl text-dark md:grid-cols-2 lg:grid-cols-3">{renderTestimonial(testimonialData)}</div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <img src={image} alt="image" width={330} height={240} />
        <div className="flex flex-col justify-between gap-6 text-dark">
          <h3 className="text-2xl italic">hello there!</h3>
          <p>
            I am a dedicated designer based in India, and I'm truly passionate about creating intuitive user experiences. Research is my favorite part of the design process. I love connecting with diverse people to understand their goals,
            needs and pain points to create intuitive and beautiful solutions. I love working on high social impact areas like sustainability, health and wellness and education. I'm resourceful and love approaching challenges creatively,
            always excited to take on new projects and deliver my best. Outside of design, I enjoy meditating, drawing patterns, or spending time in nature.
          </p>
          <div className="space-x-3">
            <a href={socialLinks.find((link) => link.label === "Linkedln")?.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <img src={linkedin} alt="image" /> LinkedIn
              </Button>
            </a>
            <a href={socialLinks.find((link) => link.label === "Email")?.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <img src={mail} alt="image" /> Message
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
