import { useCallback, useRef, type ComponentType, type CSSProperties, type PointerEvent } from "react";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  Code,
  DesignNib,
  Group,
  HalfMoon,
  Page,
  Play,
  Search,
  Sparks,
  SunLight,
  Table2Columns,
  TextSize,
  WebWindow,
} from "iconoir-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Logo } from "../assets/images";
import gistlyCover from "../assets/gistly-cover.webp";
import { RecordsMock } from "./records-mock";
import { RiseLine, riseIn } from "./work-reveal";
import { Hero } from "./hero";
import { DotField } from "./dot-field";
import { ContactCta } from "./contact-cta";
import { Footer } from "./footer";
import { useIntroDone } from "../lib/intro";
import { useTheme } from "../lib/theme";

type Project = {
  slug: string;
  number: string;
  badge: string;
  title: string;
  // Wraps balanced; a \u00A0 keeps a pair together where balance would split it.
  desc: string;
  metricLabel: string;
  metric: string;
  // Optional second numeric stat (featured card only).
  metric2?: string;
  metricLabel2?: string;
  role: string;
  // What was actually designed, shown as small badges. Three short ones at most: they
  // must stay on one line in the narrowest copy column (~270px, on 320px phones).
  scope?: string[];
  // Optional: a project without one renders as text only until a shot exists.
  image?: string;
  // Optional theme-aware pair, light shot shown on dark page, dark shot on light page.
  imageLight?: string;
  imageDark?: string;
  // Optional: a cover drawn in code instead of a screenshot. Takes the alt
  // text as its label, and `play` to start any animation with the card's
  // entrance.
  mock?: ComponentType<{ label?: string; play?: boolean }>;
  // When true, the media renders at the image's natural aspect (no crop).
  naturalMedia?: boolean;
  // The lead project. Same frame as the rest; its cover crops from the centre.
  featured?: boolean;
  // The newest case study: a Latest pill beside its label.
  latest?: boolean;
  alt?: string;
};

// One line icon per scope badge, saying what the tag means. A tag without one
// shows as text alone.
const SCOPE_ICONS: Record<string, typeof Code> = {
  "Data tables": Table2Columns,
  "Front end · Claude Code": Code,
  QA: BadgeCheck,
  Templates: Page,
  "AI workflows": Sparks,
  Hierarchy: TextSize,
  Animation: Play,
  Webflow: WebWindow,
  Research: Search,
  Prototypes: DesignNib,
  Testing: Group,
};

const projects: Project[] = [
  {
    slug: "records",
    number: "01",
    badge: "Gistly.ai · Records table",
    title: "Data table redesign",
    desc: "Rebuilding the table QA analysts used to leave for\u00A0Excel: column controls, readable cells, quieter saving.",
    metricLabel: "Share of app users",
    metric: "+74%",
    metric2: "+24%",
    metricLabel2: "View use per visit",
    role: "Product design and front-end build",
    scope: ["Front end · Claude Code", "Data tables"],
    mock: RecordsMock,
    latest: true,
    alt: "Gistly's redesigned records table in a dark app window: a list of calls with agent avatars, status, intent and disposition labels, quality scores and a labelled toolbar",
  },
  {
    slug: "gistly",
    number: "02",
    badge: "Gistly.ai · Product design 0 → 1",
    title: "AI evals for QA teams",
    desc: "Making AI-scored QA clear enough for managers to trust and act on.",
    metricLabel: "Screens shipped",
    metric: "120+",
    metric2: "20+",
    metricLabel2: "Core flows",
    role: "Sole product designer",
    scope: ["QA", "Templates", "AI workflows"],
    featured: true,
    image: gistlyCover,
    alt: "Gistly's Ask AI assistant answering a question with an agent-score breakdown chart, surrounded by template library, scorecard, rubric builder, call review, and reporting panels",
  },
  {
    slug: "homepage",
    number: "03",
    badge: "Gistly.ai · Homepage",
    title: "Homepage redesign",
    desc: "The marketing homepage, rebuilt around one job: getting the right visitor to act.",
    metricLabel: "Key-event rate",
    metric: "3.5×",
    metric2: "+47%",
    metricLabel2: "Engagement time",
    role: "Visual design and build",
    scope: ["Hierarchy", "Animation", "Webflow"],
    image: "/images/case-study-homepage.webp",
    alt: "Gistly homepage redesign preview",
  },
  {
    slug: "serenity",
    number: "04",
    badge: "Serenity · Mobile IA",
    title: "Serenity",
    desc: "Scan a gallery artwork, learn the artist, save\u00A0it. Google UX methodology, end to end.",
    metricLabel: "Usability sessions",
    metric: "5",
    role: "UI/UX designer",
    scope: ["Research", "Prototypes", "Testing"],
    image: "/images/case-study-2.webp",
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

/**
 * Puts the View circle under the pointer. Written straight onto the card as
 * two custom properties, so following the cursor never re-renders it.
 */
const followPointer = (e: PointerEvent<HTMLButtonElement>) => {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--view-x", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--view-y", `${e.clientY - box.top}px`);
};

// The text's beats, in seconds after the row starts its entrance, reading top
// down: the label, then the title, each rising out of its own mask, then
// everything else together. Late enough that, on load, the text comes in as
// the intro's 0.6s curtain clears rather than underneath it.
const TEXT_BEAT_LABEL = 0.2;
const TEXT_BEAT_TITLE = 0.3;
const TEXT_BEAT_REST = 0.5;

/**
 * One project row. Its cover is held out of sight until the row is in view,
 * and the row plays its entrance once, when its top 40px are in view and
 * the loading screen has risen halfway: the cover turns in at once, the way
 * the hero's lines do (index.css), and the text follows in the beats above. A
 * low trigger, so a card whose top edge peeks in at the fold fills in there
 * and then rather than waiting until a third of it is scrolled in.
 */
const WorkCard = ({
  project,
  reversed,
  mediaSrc,
  onOpen,
}: {
  project: Project;
  reversed: boolean;
  mediaSrc?: string;
  onOpen: (slug: string) => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: "some", margin: "0px 0px -40px 0px" });
  const introDone = useIntroDone();
  const play = inView && introDone;
  const still = useReducedMotion() ?? false;
  const Mock = project.mock;

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`work-project-row${project.featured ? " work-project-row--featured" : ""}${reversed ? " is-reversed" : ""}${
        still ? "" : play ? " is-turning" : " is-held"
      }`}
      onClick={() => onOpen(project.slug)}
      onPointerEnter={followPointer}
      onPointerMove={followPointer}
      initial={still ? false : "hidden"}
      animate={still || play ? "shown" : "hidden"}
    >
      {Mock || mediaSrc ? (
        <div className={`work-project-media${project.naturalMedia ? " is-natural" : ""}`}>
          {Mock ? <Mock label={project.alt} play={play} /> : <img src={mediaSrc} alt={project.alt} />}
          {/* Turns in like the hero's lines (turn-in.tsx), with the label,
              once the cover is in under it. */}
          <span className="work-project-number" style={{ color: project.slug === 'serenity' ? '#000' : '' }}>
            <span className="turn-word" style={{ "--d": `${TEXT_BEAT_LABEL * 1000}ms` } as CSSProperties}>
              <span>{project.number}</span>
            </span>
          </span>
        </div>
      ) : null}
      <span className="work-project-view" aria-hidden="true">
        View
        <ArrowUpRight strokeWidth={2} />
      </span>
      <div className="work-project-copy">
        <div className="work-project-kicker">
          <RiseLine className="work-project-badge" delay={TEXT_BEAT_LABEL}>
            {project.badge}
          </RiseLine>
          {project.latest ? (
            <motion.span className="work-project-latest" variants={riseIn} custom={TEXT_BEAT_LABEL}>
              Latest
            </motion.span>
          ) : null}
        </div>
        <h3>
          <RiseLine delay={TEXT_BEAT_TITLE}>{project.title}</RiseLine>
        </h3>
        <motion.p variants={riseIn} custom={TEXT_BEAT_REST}>{project.desc}</motion.p>
        <motion.div
          className={`work-project-meta${project.metric2 ? " work-project-meta--pair" : ""}`}
          variants={riseIn}
          custom={TEXT_BEAT_REST}
        >
          <span className="work-project-metric">{project.metric}</span>
          {project.metric2 ? <span className="work-project-metric">{project.metric2}</span> : null}
          <span className="work-project-meta-label">{project.metricLabel}</span>
          {project.metricLabel2 ? <span className="work-project-meta-label">{project.metricLabel2}</span> : null}
        </motion.div>
        {project.scope ? (
          <motion.ul className="work-project-scope" variants={riseIn} custom={TEXT_BEAT_REST}>
            {project.scope.map((tag) => {
              const Icon = SCOPE_ICONS[tag];
              return (
                <li key={tag}>
                  {Icon ? <Icon aria-hidden="true" strokeWidth={1.6} /> : null}
                  {tag}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
        <span className="sr-only">View case study</span>
      </div>
    </motion.button>
  );
};

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
    <section className="work-board-page">
      <DotField />
      <div className="work-board">
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

        <Hero />

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
              <WorkCard
                key={project.slug}
                project={project}
                reversed={index % 2 === 1}
                mediaSrc={mediaSrc}
                onOpen={handleSlugChange}
              />
            );
          })}
        </div>

        <ContactCta />
      </div>
      <Footer />
    </section>
  );
};

export { CaseStudy };
