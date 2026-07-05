import { Dribbble, HalfMoon, Linkedin, Mail, Medium, SunLight, User, ViewGrid } from "iconoir-react";
import { Seo } from "../components/Seo";
import { Logo, profile } from "../assets/images";
import { useTheme } from "../lib/theme";
import { Testimonials } from "../components/testimonials";
const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thushara-v", Icon: Linkedin },
  { label: "Medium", href: "https://medium.com/@thusharavarghese", Icon: Medium },
  { label: "Dribbble", href: "https://dribbble.com/thusharadesign", Icon: Dribbble },
];

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
          <a href="/#case-studies">
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

      <section className="about-v3-layout">
        <figure className="about-v3-photo">
          <img src={profile} alt="Thushara Varghese" />
        </figure>

        <div className="about-v3-copy">
          <Logo className="about-v3-logo" aria-hidden="true" />
          <p className="about-v3-kicker">Product designer · B2B UX · AI systems</p>
          <h1>Thushara Varghese</h1>

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

          <div className="about-v3-links mt-8">
            <a href="https://medium.com/@thusharavarghese" target="_blank" rel="noreferrer">
              Medium
            </a>
            <a href="mailto:thusharavarghese9@gmail.com">thusharavarghese9@gmail.com</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="px-4 py-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <Testimonials />
      </section>
    </main>
  );
};
