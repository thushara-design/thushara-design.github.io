import { useCallback } from "react";
import type { ComponentType, SVGProps } from "react";
import { useNavigate } from "react-router";
import { Dribbble, HalfMoon, Linkedin, Mail, Medium, Sparks, SunLight, User, ViewGrid } from "iconoir-react";
import { Logo } from "../assets/images";
import caseStudiesData from "../data/case-studies";
import featuredImage from "../assets/image 47.png";
import gistlyUiImage from "../assets/gistly-ui.png";
import { useTheme } from "../lib/theme";

const prompt =
  "I am evaluating Thushara Varghese for a B2B product design role. Use these links for context: case studies https://thushara-design.github.io/#case-studies, about page https://thushara-design.github.io/about-me, Medium https://medium.com/@thusharavarghese, Dribbble https://dribbble.com/thusharadesign. Based on her work, what should a B2B founder or hiring manager understand about how she thinks, what kinds of product problems she is strongest at, and what evidence in her portfolio supports that?";

const visualCards = [
  {
    title: "Gistly call analysis",
    badge: "Gistly.ai · B2B audit UX",
    image: gistlyUiImage,
    alt: "Gistly call analysis interface",
  },
  {
    title: "Serenity mobile app",
    badge: "Serenity · Mobile IA",
    image: "/images/case-study-2.png",
    alt: "Serenity mobile application screens",
  },
];

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const socialLinks: Array<{ label: string; href: string; Icon: IconComponent }> = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thushara-v", Icon: Linkedin },
  { label: "Medium", href: "https://medium.com/@thusharavarghese", Icon: Medium },
  { label: "Dribbble", href: "https://dribbble.com/thusharadesign", Icon: Dribbble },
];

const CaseStudy = () => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const featuredCaseStudy = caseStudiesData[0];

  const handleSlugChange = useCallback(
    (slug: string) => {
      navigate({ search: `?ref=${slug}` }, { preventScrollReset: false });
    },
    [navigate],
  );

  return (
    <section id="case-studies" className="work-board-page">
      <div className="work-board">
        <aside className="work-social-rail" aria-label="Social links">
          {socialLinks.map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
              <Icon aria-hidden="true" strokeWidth={1.5} />
            </a>
          ))}
        </aside>
        <header className="work-board-header">
          <a href="/" className="work-logo" aria-label="Thushara home">
            <Logo aria-hidden="true" />
          </a>
          <nav aria-label="Portfolio navigation">
            <a href="#case-studies">
              <ViewGrid aria-hidden="true" strokeWidth={1.5} />
              <span>Case studies</span>
            </a>
            <a href="/about-me">
              <User aria-hidden="true" strokeWidth={1.5} />
              <span>About me</span>
            </a>
            <a href="mailto:thusharavarghese9@gmail.com">
              <Mail aria-hidden="true" strokeWidth={1.5} />
              <span>Contact</span>
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark"
                ? <SunLight aria-hidden="true" strokeWidth={1.5} />
                : <HalfMoon aria-hidden="true" strokeWidth={1.5} />}
            </button>
          </nav>
        </header>

        <button type="button" className="featured-work-card hover-card" onClick={() => handleSlugChange(featuredCaseStudy.slug)}>
          <div className="featured-work-copy">
            <span className="case-card-badge featured-badge">Gistly.ai · Homepage redesign</span>
            <h1>How We Redesigned The Homepage Resulting In 136% Increase In Engagement Time Within The First Quarter Post-Launch</h1>
            <p>Case study on how I used design thinking to increase time on task and make a complex B2B product easier to understand.</p>
            <div className="work-tags" aria-label="Case study tags">
              {featuredCaseStudy.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="featured-work-image">
            <img src={featuredImage} alt="Gistly homepage redesign preview" />
          </div>
        </button>

        <div className="work-card-grid">
          {visualCards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              className="visual-work-card hover-card"
              onClick={() => handleSlugChange(index === 0 ? "gistly" : "serenity")}
            >
              <span className="case-card-badge">{card.badge}</span>
              <img src={card.image} alt={card.alt} />
              <div className="visual-card-overlay">
                <span className="visual-card-overlay-badge">{card.badge}</span>
                <h3 className="visual-card-overlay-title">{card.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <footer className="work-ai-footer">
          <a href={`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`} target="_blank" rel="noreferrer">
            <Sparks aria-hidden="true" strokeWidth={1.5} />
            <span>Ask AI about my work</span>
          </a>
        </footer>
      </div>
    </section>
  );
};

export { CaseStudy };
