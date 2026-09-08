import { useCallback } from "react";
import { useNavigate } from "react-router";
import { HalfMoon, SunLight } from "iconoir-react";
import { Logo } from "../assets/images";
import gistlyCover from "../assets/gistly-cover.png";
import { SocialRail } from "./social-rail";
import { useTheme } from "../lib/theme";

type Project = {
  slug: string;
  number: string;
  badge: string;
  title: string;
  desc: string;
  metricLabel: string;
  metric: string;
  // Optional second numeric stat (featured card only).
  metric2?: string;
  metricLabel2?: string;
  role: string;
  // What was actually designed, shown as small badges.
  scope?: string[];
  image: string;
  // Optional theme-aware pair, light shot shown on dark page, dark shot on light page.
  imageLight?: string;
  imageDark?: string;
  // When true, the media renders at the image's natural aspect (no crop).
  naturalMedia?: boolean;
  // The lead project, typography-forward, stacked with a large image below.
  featured?: boolean;
  alt: string;
};

const projects: Project[] = [
  {
    slug: "gistly",
    number: "01",
    badge: "Gistly.ai · Product design · 2+ yrs",
    title: "Designing Gistly",
    desc: "Designing clarity and trust into AI-powered quality assurance, so managers can act on scores they understand.",
    metricLabel: "Screens shipped",
    metric: "120+",
    metric2: "20+",
    metricLabel2: "Core flows",
    role: "Sole product designer",
    scope: ["QA", "Analytics", "Templates", "AI workflows"],
    featured: true,
    image: gistlyCover,
    alt: "Gistly's Ask AI assistant answering a question with an agent-score breakdown chart, surrounded by template library, scorecard, rubric builder, call review, and reporting panels",
  },
  {
    slug: "homepage",
    number: "02",
    badge: "Gistly.ai · Homepage",
    title: "Homepage redesign",
    desc: "Rebuilding the marketing homepage around one job: getting the right visitor to act, and measuring whether it worked.",
    metricLabel: "Homepage key events",
    metric: "+475%",
    role: "Sole designer",
    image: "/images/case-study-homepage.png",
    alt: "Gistly homepage redesign preview",
  },
  {
    slug: "serenity",
    number: "03",
    badge: "Serenity · Mobile IA",
    title: "Serenity",
    desc: "A gallery artist-bio app, scan an artwork, learn the artist, save it. Google UX methodology, end to end.",
    metricLabel: "Usability sessions",
    metric: "5",
    role: "UI/UX designer",
    image: "/images/case-study-2.png",
    alt: "Serenity mobile application screens",
  },
];

/**
 * Every image the work board paints on first render. Preloaded behind the intro
 * screen so the board is fully painted the moment it lifts. Derived from
 * `projects` rather than hand-listed, so it can't drift out of sync.
 */
export const projectImages: string[] = projects.flatMap((p) =>
  [p.image, p.imageLight, p.imageDark].filter((s): s is string => Boolean(s)),
);

const CaseStudy = () => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const handleSlugChange = useCallback(
    (slug: string) => {
      navigate({ search: `?ref=${slug}` }, { preventScrollReset: false });
    },
    [navigate],
  );

  return (
    <section id="case-studies" className="work-board-page">
      <div className="work-board">
        <SocialRail />
        <header className="work-board-header">
          <a href="/" className="work-logo" aria-label="Thushara home">
            <Logo aria-hidden="true" />
          </a>
          <nav aria-label="Portfolio navigation">
            <a href="#case-studies"><span>Case studies</span></a>
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

        <div className="work-projects">
          {projects.map((project, index) => {
            // Show the opposite-theme screenshot for contrast: light shot on the
            // dark page, dark shot on the light page. Falls back to the static image.
            const mediaSrc =
              project.imageLight && project.imageDark
                ? theme === "dark"
                  ? project.imageLight
                  : project.imageDark
                : project.image;
            return (
            <button
              key={project.slug}
              type="button"
              className={`work-project-row${project.featured ? " work-project-row--featured" : ""}${index % 2 === 1 ? " is-reversed" : ""}`}
              onClick={() => handleSlugChange(project.slug)}
            >
              <div className={`work-project-media${project.naturalMedia || project.featured ? " is-natural" : ""}`}>
                <img src={mediaSrc} alt={project.alt} />
                <span className="work-project-number" style={{ color: project.slug === 'serenity' ? '#000' : '' }}>{project.number}</span>
              </div>
              <div className="work-project-copy">
                <span className="work-project-badge">{project.badge}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="work-project-meta">
                  <span className="work-project-metric">{project.metric}</span>
                  {project.metric2 ? <span className="work-project-metric">{project.metric2}</span> : null}
                  <span className="work-project-meta-label">{project.metricLabel}</span>
                  {project.metricLabel2 ? <span className="work-project-meta-label">{project.metricLabel2}</span> : null}
                </div>
                {project.scope ? (
                  <ul className="work-project-scope">
                    {project.scope.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
                <span className="work-project-cta">
                  View case study <span className="work-project-arrow">→</span>
                </span>
              </div>
            </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export { CaseStudy };
