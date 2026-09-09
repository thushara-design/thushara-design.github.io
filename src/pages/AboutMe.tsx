import { HalfMoon, SunLight } from "iconoir-react";
import { Seo } from "../components/Seo";
import { Logo, profile } from "../assets/images";
import { useTheme } from "../lib/theme";
import { SocialRail } from "../components/social-rail";
import { Testimonials } from "../components/testimonials";
import { bio, headline, kicker, links } from "../data/profile";

export const AboutMe = () => {
  const { theme, toggle } = useTheme();
  return (
    <main className="about-v3">
      <Seo
        title="About Me | Thushara"
        description="Learn more about Thushara, a Product Designer focused on B2B UX, psychology, AI development, and writing."
        url="https://www.thushara.design/about-me"
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
          <p className="about-v3-kicker">{kicker}</p>
          <h1>
            {headline.split(" ").slice(0, 1)}{" "}
            <span className="about-v3-inline-photo" aria-hidden="true">
              <img src={profile} alt="" />
            </span>{" "}
            {headline.split(" ").slice(1).join(" ")}
          </h1>
        </div>

        <div className="about-v3-left">
          <Testimonials />
        </div>

        <div className="about-v3-copy">
          <p className="about-v3-name">Hi, I&apos;m Thushara.</p>

          <div className="about-v3-bio">
            {bio.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <div className="about-v3-links mt-4">
            <a href={links.medium} target="_blank" rel="noreferrer">
              Medium
            </a>
            <a href={`mailto:${links.email}`}>{links.email}</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="about-v3-resume px-4 py-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
