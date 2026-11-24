import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { riseIn } from "./work-reveal";
import { TurnIn, measureTurns } from "./turn-in";
import { useIntroDone } from "../lib/intro";

/*
 * The entrance takes its move from the old loading screen's logo, which came
 * in and then made one turn that slowed to rest. Here each line of the
 * greeting and the statement rises out of its own lower edge while turning
 * level, hinged at its left end, on the logo's curve (turn-in.tsx, index.css),
 * so a line surfaces left to right and settles flat. Then the ring around "A
 * little about my work" draws itself in, one pen stroke, like the loading
 * screen's drawings. The rest rises in as before.
 */

// Timing, in ms: when the greeting and the statement start, and when the
// ring starts drawing. The step from line to line is turn-in.tsx's.
const GREETING_AT = 0;
const STATEMENT_AT = 120;
const RING_AT = 650;

// The statement word by word, each word a piece that turns in.
const accent = (text: string) => text.split(" ").map((word) => <span className="hero-accent">{word}</span>);
const STATEMENT: ReactNode[] = [
  ..."Product designer with a background in".split(" "),
  <>
    <em>psychology</em>,
  </>,
  ..."focused on simplifying".split(" "),
  ...accent("complex B2B workflows"),
  "and",
  "designing",
  // The no-break space keeps "AI products" together, so the last line is never one word.
  <>
    <span className="hero-accent">AI{" "}products</span>.
  </>,
];

/**
 * The ring keeps one line weight however far it stretches (a non-scaling
 * stroke), so it dashes in screen pixels: its length is taken on screen, along
 * points down the path, for the draw-in to trace the whole of it.
 */
function measureRing(svg: SVGSVGElement) {
  const path = svg.querySelector("path");
  const rect = svg.getBoundingClientRect();
  // Hidden on phones; there's nothing to draw, and measuring an unrendered
  // path can throw, which would hold the whole entrance back.
  if (!path || rect.width === 0) return;
  const box = svg.viewBox.baseVal;
  const sx = rect.width / box.width;
  const sy = rect.height / box.height;
  const total = path.getTotalLength();
  let length = 0;
  let prev = path.getPointAtLength(0);
  for (let i = 1; i <= 120; i++) {
    const p = path.getPointAtLength((total * i) / 120);
    length += Math.hypot((p.x - prev.x) * sx, (p.y - prev.y) * sy);
    prev = p;
  }
  path.style.setProperty("--len", `${Math.ceil(length) + 2}px`);
}

// The two short paragraphs beside the statement.
const ABOUT = [
  "Currently working on automating QA at Gistly, my experience spans user research, untangling workflows, visual design, and building product systems. I also work directly with production code, using AI coding agents for rapid prototyping and front-end implementation.",
  "I enjoy working with early-stage startups in emerging domains, where I can take ownership, navigate ambiguity, and contribute across the product development process.",
];

/**
 * The homepage's opening, set like a Swiss poster: the greeting in bold at
 * the top with where she's based under it; low down, the
 * statement as a square block on the left with two short paragraphs about
 * her work beside it; and a "Selected work" heading that the work board
 * runs on from. The dot grid behind it belongs to the page (index.css). Comes
 * in as the loading screen (intro-loader.tsx) rises off it: the lines
 * turning in, the ring drawn, the rest in short rises top to bottom.
 */
export const Hero = () => {
  const still = useReducedMotion() ?? false;
  // Held until the loading screen has risen halfway, so it plays in view.
  const ready = useIntroDone();
  const [turning, setTurning] = useState(false);
  const section = useRef<HTMLElement>(null);
  const ring = useRef<SVGSVGElement>(null);

  // Measured when it's about to play, not on mount: by then the fonts have
  // loaded under the loading screen, so the lines found are the ones shown.
  // Before the first paint, so nothing shows unmeasured.
  useLayoutEffect(() => {
    if (still || !ready || !section.current || !ring.current) return;
    measureTurns(section.current);
    measureRing(ring.current);
    setTurning(true);
  }, [still, ready]);

  const held = !still && !turning;

  return (
    <motion.section
      ref={section}
      className={`hero${held ? " is-held" : ""}${turning ? " is-turning" : ""}`}
      aria-label="Introduction"
      initial={still ? false : "hidden"}
      animate={still || ready ? "shown" : "hidden"}
    >
      <p className="hero-hello">
        <TurnIn words={"Hi, I’m Thushara".split(" ")} at={GREETING_AT} />
      </p>
      <motion.p className="hero-based" variants={riseIn} custom={0.3}>
        Based in Bengaluru, India
      </motion.p>
      <div className="hero-body">
        <h1 className="hero-statement">
          <TurnIn words={STATEMENT} at={STATEMENT_AT} />
        </h1>
        <motion.div className="hero-about" variants={riseIn} custom={0.35}>
          <p className="hero-about-title">
            <span className="hero-circled">
              A little about my work
              <svg
                ref={ring}
                className="hero-circle"
                viewBox="0 0 400 110"
                preserveAspectRatio="none"
                style={{ "--ring-d": `${RING_AT}ms` } as CSSProperties}
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M66.4 14.7C69.9 14.1 79.8 12.4 87.3 11.4C94.8 10.5 102.7 9.7 111.3 9C119.8 8.3 128.6 7.7 138.5 7.3C148.4 6.9 157.4 6.6 170.6 6.5C183.8 6.3 204.1 6.3 217.8 6.4C231.4 6.5 241.8 6.8 252.3 7.2C262.8 7.6 271.8 8.1 280.7 8.7C289.6 9.4 297.7 10.1 305.5 11C313.3 12 320.5 13 327.3 14.1C334.1 15.3 340.4 16.6 346.2 18C352 19.4 357.3 20.9 362.1 22.5C367 24.2 371.3 25.9 375.1 27.8C379 29.7 382.3 31.6 385.1 33.8C387.9 35.9 390.2 38.1 392 40.6C393.7 43 395 45.2 395.7 48.5C396.4 51.8 396.5 56.8 396.2 60.2C395.8 63.6 394.9 66.2 393.5 68.8C392.1 71.4 390.1 73.6 387.6 75.8C385.2 78 382.2 80.1 378.7 82C375.2 83.9 371.2 85.7 366.7 87.3C362.2 89 357.2 90.5 351.7 92C346.2 93.4 340.3 94.7 333.8 95.9C327.4 97 320.5 98.1 313 99C305.6 99.9 297.8 100.7 289.4 101.4C280.9 102.1 272.1 102.6 262.4 103.1C252.6 103.5 243.8 103.8 230.7 103.9C217.7 104.1 197.6 104.1 184 104C170.4 103.9 159.8 103.7 149.2 103.3C138.7 102.9 129.6 102.4 120.8 101.8C111.9 101.2 103.7 100.5 95.9 99.6C88.2 98.7 80.9 97.7 74.1 96.6C67.3 95.5 61 94.3 55.2 93C49.4 91.6 44.1 90.1 39.2 88.6C34.4 87 30 85.3 26.1 83.5C22.3 81.7 18.9 79.8 16.1 77.8C13.3 75.7 11 73.6 9.2 71.2C7.4 68.9 6.1 66.7 5.4 63.6C4.6 60.4 4.4 55.6 4.7 52.4C5 49.1 5.9 46.5 7.2 43.9C8.6 41.4 10.5 39.2 12.9 37.1C15.3 34.9 18.3 33 21.7 31.1C25.2 29.3 29.1 27.5 33.6 25.9C38 24.3 42.9 22.8 48.3 21.4C53.8 20 59.7 18.8 66 17.6C72.4 16.5 79.2 15.4 86.6 14.5C93.9 13.6 101.7 12.8 110 12.2C118.4 11.5 127.1 11 136.7 10.6C146.4 10.2 162.8 9.8 168 9.7"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </p>
          {ABOUT.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </motion.div>
      </div>
      <motion.div className="hero-foot" variants={riseIn} custom={0.5}>
        <h2 id="case-studies">Selected work</h2>
      </motion.div>
    </motion.section>
  );
};
