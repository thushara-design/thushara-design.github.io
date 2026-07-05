import { useEffect } from "react";
import { Dribbble, HalfMoon, Linkedin, Mail, Medium, SunLight, User, ViewGrid } from "iconoir-react";
import { caseStudiesData } from "../data";
import { Seo } from "./Seo";
import { useTheme } from "../lib/theme";
import { Logo } from "../assets/images";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thushara-v", Icon: Linkedin },
  { label: "Medium", href: "https://medium.com/@thusharavarghese", Icon: Medium },
  { label: "Dribbble", href: "https://dribbble.com/thusharadesign", Icon: Dribbble },
];

const CaseStudyDat = ({ slug }: { slug: string }) => {
  const { theme, toggle } = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);
  if (!caseStudy) return null;

  const caseStudyIndex = caseStudiesData.findIndex((cs) => cs.slug === slug);
  const previousCaseStudy = caseStudiesData[caseStudyIndex - 1];
  const nextCaseStudy = caseStudiesData[caseStudyIndex + 1];
  const {
    title,
    tagline,
    description,
    Component,
    externalLink,
    responsibilities,
    role,
    timeframe,
    tools,
    image,
  } = caseStudy as any;

  const formattedTools = Array.isArray(tools) && tools.length > 1 ? `${tools.slice(0, -1).join(", ")} and ${tools.slice(-1)}` : tools;
  const formattedResponsibilities = Array.isArray(responsibilities) ? responsibilities.join(", ") : responsibilities;
  const siteUrl = "https://designwiththushara.com";
  const canonicalUrl = `${siteUrl}/?ref=${slug}`;

  return (
    <main className="case-detail-page">
      <Seo
        title={`${title} - Case Study | Thushara`}
        description={typeof description === "string" ? description : `${title} case study`}
        url={canonicalUrl}
        image={image ? `${siteUrl}/images/${image}` : undefined}
        type="article"
        breadcrumbs={[
          { name: "Home", url: siteUrl },
          { name: "Case Studies", url: `${siteUrl}#case-studies` },
          { name: title, url: canonicalUrl },
        ]}
        robots={slug === "gistly" ? "noindex,follow" : undefined}
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

      <section className="case-detail-shell">
        <header className="case-detail-hero">
          <div className="case-detail-hero-copy">
            <p className="case-detail-kicker">{tagline || "Case study"}</p>
            <h1>{title}</h1>
            <p className="case-detail-description">{description}</p>
          </div>

          <dl className="case-detail-meta">
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>Timeframe</dt>
              <dd>{timeframe || "Project sprint"}</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>{formattedTools}</dd>
            </div>
            <div>
              <dt>Responsibilities</dt>
              <dd>{formattedResponsibilities}</dd>
            </div>
          </dl>
        </header>

        <article className="case-detail-content">{!Component || externalLink ? null : <Component />}</article>

        <nav className="case-detail-pagination" aria-label="Case study pagination">
          {previousCaseStudy ? <a href={`?ref=${previousCaseStudy.slug}`}>Previous / {previousCaseStudy.title}</a> : <span />}
          {nextCaseStudy ? <a href={`?ref=${nextCaseStudy.slug}`}>Next / {nextCaseStudy.title}</a> : <span />}
        </nav>
      </section>
    </main>
  );
};

export { CaseStudyDat };
