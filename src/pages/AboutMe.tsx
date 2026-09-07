import { HalfMoon, SunLight } from "iconoir-react";
import { Seo } from "../components/Seo";
import { Logo, profile } from "../assets/images";
import { useTheme } from "../lib/theme";
import { SocialRail } from "../components/social-rail";
import { Testimonials } from "../components/testimonials";

export const AboutMe = () => {
  const { theme, toggle } = useTheme();
  return (
    <main className="about-v3">
      <Seo
        title="About Me | Thushara"
        description="Learn more about Thushara, a Product Designer focused on B2B UX, psychology, AI development, and writing."
        url="https://thushara-design.github.io/about-me"
        robots="noindex"
      />

      <SocialRail />

      <header className="work-board-header">
        <a href="/" className="work-logo" aria-label="Thushara home">
          <Logo aria-hidden="true" />
        </a>
        <nav aria-label="Portfolio navigation">
          <a href="/#case-studies"><span>Case studies</span></a>
          <a href="/about-me"><span>About</span></a>
          <a href="mailto:thusharavarghese9@gmail.com"><span>Contact</span></a>
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

      <section className="about-v3-layout">
        <div className="about-v3-head">
          <p className="about-v3-kicker">Product designer · B2B UX · AI systems</p>
          <h1>
            I{" "}
            <span className="about-v3-inline-photo" aria-hidden="true">
              <img src={profile} alt="" />
            </span>{" "}
            design for the people behind messy workflows.
          </h1>
        </div>

        <div className="about-v3-left">
          <Testimonials />
        </div>

        <div className="about-v3-copy">
          <p className="about-v3-name">Hi, I&apos;m Thushara.</p>

          <div className="about-v3-bio">
            <p>
              I started with psychology, and that still shapes how I design. I pay attention to how people make sense of information, where they hesitate, and what helps a complex workflow feel lighter.
            </p>
            <p>
              At Gistly, I worked on B2B product experiences for AI-powered call auditing, translating dense spreadsheets, operational rules, and manager workflows into interfaces that were easier to scan, trust, and use.
            </p>
            <p>
              More recently, I have been exploring AI development through product prototypes, writing, and self-initiated builds. I like the space where design judgment, systems thinking, and emerging tools meet.
            </p>
          </div>

          <div className="about-v3-links mt-4">
            <a href="https://medium.com/@thusharavarghese" target="_blank" rel="noreferrer">
              Medium
            </a>
            <a href="mailto:thusharavarghese9@gmail.com">thusharavarghese9@gmail.com</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="about-v3-resume px-4 py-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
