import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { HalfMoon, SunLight } from "iconoir-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Seo } from "../components/Seo";
import { Logo, profile } from "../assets/images";
import { useTheme } from "../lib/theme";
import { Footer } from "../components/footer";
import { Testimonials } from "../components/testimonials";
import { RiseLine, riseIn } from "../components/work-reveal";
import { TurnIn, measureTurns } from "../components/turn-in";
import { bio, headline, kicker, links } from "../data/profile";

/*
 * The entrance, in the homepage's own moves: the kicker rises out of its mask
 * like a card's label, the headline turns in line by line like the hero's
 * statement, then the testimonials and the copy rise in, top to bottom. Each
 * of those plays on its beat if it's on screen when the page opens, and
 * otherwise as it scrolls in.
 */

// The headline word by word, the portrait one of the pieces: the "I" is her.
const [first, ...rest] = headline.split(" ");
const HEADLINE: ReactNode[] = [
  first,
  <span className="about-v3-inline-photo" aria-hidden="true">
    <img src={profile} alt="" />
  </span>,
  ...rest,
];

// When the headline starts turning in, in ms.
const HEADLINE_AT = 100;

// When the entrance started (performance.now()), or null while it waits for
// the fonts, so the headline's lines are measured as they'll be shown.
const EntranceStart = createContext<number | null>(null);

/**
 * A block that rises in once: at `at` seconds into the entrance if it's on
 * screen then, or straight away when it scrolls in later.
 */
function Reveal({ at, className, children }: { at: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const start = useContext(EntranceStart);
  const still = useReducedMotion() ?? false;
  const play = inView && start !== null;
  // Taken once, when it starts, so a later render can't move it.
  const delay = useRef<number | null>(null);
  if (play && delay.current === null) {
    delay.current = Math.max(0, at - (performance.now() - start) / 1000);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={riseIn}
      custom={delay.current ?? 0}
      initial={still ? false : "hidden"}
      animate={still || play ? "shown" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export const AboutMe = () => {
  const { theme, toggle } = useTheme();
  const still = useReducedMotion() ?? false;
  const head = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<number | null>(null);

  // Laid out first, so the fonts it uses start loading, then measured once
  // they have, before the headline lets go.
  useLayoutEffect(() => {
    if (still || !head.current) return;
    let live = true;
    head.current.getBoundingClientRect();
    document.fonts.ready.then(() => {
      if (!live || !head.current) return;
      measureTurns(head.current);
      setStart(performance.now());
    });
    return () => {
      live = false;
    };
  }, [still]);

  const playing = start !== null;

  return (
    <main className="about-v3">
      <Seo
        title="About Me | Thushara"
        description="Learn more about Thushara, a Product Designer focused on B2B UX, psychology, AI development, and writing."
        url="https://www.thushara.design/about-me"
        robots="noindex"
      />


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

      <EntranceStart.Provider value={still ? 0 : start}>
        <section className="about-v3-layout">
          <motion.div
            ref={head}
            className={`about-v3-head${!still && !playing ? " is-held" : ""}${!still && playing ? " is-turning" : ""}`}
            initial={still ? false : "hidden"}
            animate={still || playing ? "shown" : "hidden"}
          >
            <p className="about-v3-kicker">
              <RiseLine>{kicker}</RiseLine>
            </p>
            <h1>
              <TurnIn words={HEADLINE} at={HEADLINE_AT} />
            </h1>
          </motion.div>

          <Reveal className="about-v3-left" at={0.4}>
            <Testimonials />
          </Reveal>

          <div className="about-v3-copy">
            <Reveal at={0.4}>
              <p className="about-v3-name">Hi, I&apos;m Thushara.</p>
            </Reveal>

            <div className="about-v3-bio">
              {bio.map((para, i) => (
                <Reveal key={para.slice(0, 24)} at={0.45 + i * 0.05}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="about-v3-links mt-4" at={0.6}>
              <a href={links.medium} target="_blank" rel="noreferrer">
                Medium
              </a>
              <a href={`mailto:${links.email}`}>{links.email}</a>
              <a href="/resume.pdf" target="_blank" rel="nofollow noreferrer" className="about-v3-resume px-4 py-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors">
                Download Resume
              </a>
            </Reveal>
          </div>
        </section>
      </EntranceStart.Provider>

      <Footer />
    </main>
  );
};
