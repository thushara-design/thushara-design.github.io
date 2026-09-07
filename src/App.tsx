import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CaseStudy } from "./components/case-study";
import { CaseStudyDat } from "./components/case-study-details";
import { Logo } from "./assets/images";
import { caseStudiesData } from "./data";

function App() {
  const location = useLocation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  const [showIntro, setShowIntro] = useState(location.pathname === "/" && !ref);

  useEffect(() => {
    if (ref) {
      setSelectedSlug(ref);
    } else {
      setSelectedSlug(null);
      // Scroll to top when the page loads if not showing intro
      if (!showIntro) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [location, ref, showIntro]);

  const handleIntroDone = useCallback(() => setShowIntro(false), []);

  if (selectedSlug && caseStudiesData.find((caseStudy) => caseStudy.slug === selectedSlug)) {
    return <CaseStudyDat slug={selectedSlug} />;
  }

  return (
    <div className="relative min-h-screen font-sans text-dark">
      {showIntro ? <IntroSequence onDone={handleIntroDone} /> : null}
      <main>
        <CaseStudy />
      </main>
    </div>
  );
}

// Loading/intro screen, terminal-adjacent: logo animates in, greeting + role
// rise, the tagline types out with a word-based cadence, then the cursor
// settles and the whole screen lifts to reveal the work.
const TAGLINE = "I turn complexity\ninto clarity.";
const ACCENT = "clarity."; // final word, rendered in accent red
const SPLIT = TAGLINE.length - ACCENT.length;

// Word-cadence type schedule: [seconds since typing starts, chars shown].
// Words type in bursts with tiny pauses between; "clarity." is a touch slower.
// Total ≈ 2.2s so it reads as intentional, not like the site is loading.
const TYPE_START = 0.9; // typing begins as status flips to "LOADING WORK"
const SCHEDULE: Array<[number, number]> = [
  [0.0, 0],
  [0.28, 7], // "I turn ", fast
  [0.42, 7], // pause
  [0.97, 18], // "complexity\n", medium
  [1.13, 18], // pause
  [1.41, 23], // "into ", fast
  [1.57, 23], // pause
  [2.17, 31], // "clarity.", slightly slower
];
const TYPE_END = TYPE_START + SCHEDULE[SCHEDULE.length - 1][0];

// After "clarity." finishes, the cursor blinks briefly then fades, and the
// screen holds for ~0.7s, a beat to let the positioning land, before lifting.
const CARET_BLINK_MS = 450; // brief blink to signal "finished"
const CARET_FADE_MS = 250; // then fade the cursor out
const PAUSE_BEFORE_LIFT_MS = CARET_BLINK_MS + CARET_FADE_MS; // ≈0.7s pause
const LIFT_MS = 800; // hand-off slide-up duration

function charsAt(dt: number) {
  const last = SCHEDULE[SCHEDULE.length - 1];
  if (dt <= 0) return 0;
  if (dt >= last[0]) return last[1];
  for (let i = 1; i < SCHEDULE.length; i++) {
    const [t1, c1] = SCHEDULE[i];
    const [t0, c0] = SCHEDULE[i - 1];
    if (dt < t1) {
      const f = (dt - t0) / (t1 - t0);
      return Math.round(c0 + f * (c1 - c0));
    }
  }
  return last[1];
}

// Honest boot status for the top-right, qualitative states, not a fake %.
function bootStatus(t: number) {
  if (t < TYPE_START) return "INITIALIZING";
  if (t < TYPE_END) return "LOADING WORK";
  return "READY";
}

// Thushara's local time (Bengaluru, Asia/Kolkata is always IST, no DST).
function formatIST() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

type CaretPhase = "solid" | "blink" | "gone";

function IntroSequence({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState("INITIALIZING");
  const [caret, setCaret] = useState<CaretPhase>("solid");
  const [lifting, setLifting] = useState(false);
  const [clock, setClock] = useState(formatIST);

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatIST()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    // Sentence finished → blink the cursor briefly, fade it, then hand off.
    const settle = () => {
      setTyped(TAGLINE);
      setStatus("READY");
      setCaret("blink");
      timers.push(window.setTimeout(() => setCaret("gone"), CARET_BLINK_MS));
      timers.push(
        window.setTimeout(() => {
          setLifting(true);
          timers.push(window.setTimeout(onDone, LIFT_MS));
        }, PAUSE_BEFORE_LIFT_MS),
      );
    };

    if (reduce) {
      setCaret("gone");
      setTyped(TAGLINE);
      setStatus("READY");
      timers.push(
        window.setTimeout(() => {
          setLifting(true);
          timers.push(window.setTimeout(onDone, LIFT_MS));
        }, 600),
      );
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    const start = performance.now();
    let raf = 0;
    let finished = false;

    const loop = () => {
      const t = (performance.now() - start) / 1000;
      const ns = bootStatus(t);
      setStatus((s) => (s !== ns ? ns : s));
      const nextTyped = TAGLINE.slice(0, charsAt(t - TYPE_START));
      setTyped((prev) => (prev !== nextTyped ? nextTyped : prev));

      if (t >= TYPE_END) {
        if (!finished) {
          finished = true;
          settle();
        }
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onDone]);

  const typedMain = typed.slice(0, SPLIT);
  const typedAccent = typed.length > SPLIT ? typed.slice(SPLIT) : "";

  return (
    <div
      className={`load-screen${lifting ? " is-lifting" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <header className="load-head">
        <Logo className="load-logo" aria-hidden="true" />
        <span className="load-eyebrow">{status}</span>
      </header>

      <div className="load-center">
        <div className="load-lede">
          <p className="load-greet">Hi, I'm Thushara</p>
          <p className="load-role">
            Product designer <span className="load-sep">·</span> B2B UX{" "}
            <span className="load-sep">·</span> AI systems
          </p>
        </div>
        <h1 className="load-tagline" aria-label="I turn complexity into clarity.">
          <span aria-hidden="true">{typedMain}</span>
          <span className="load-accent" aria-hidden="true">{typedAccent}</span>
          <span className={`load-caret load-caret--${caret}`} aria-hidden="true" />
        </h1>
      </div>

      <div className="load-foot">
        <span>
          <span className="load-pct">{clock}</span> IST
        </span>
      </div>
    </div>
  );
}

export default App;
