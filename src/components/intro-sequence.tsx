import { useEffect, useState } from "react";
import { Logo } from "../assets/images";
import { criticalImagesReady } from "../lib/warm-assets";

const TAGLINE = "I turn complexity\ninto clarity.";
const ACCENT = "clarity.";
const SPLIT = TAGLINE.length - ACCENT.length;

const TYPE_START = 0.9;
const SCHEDULE: Array<[number, number]> = [
  [0.0, 0],
  [0.28, 7],
  [0.42, 7],
  [0.97, 18],
  [1.13, 18],
  [1.41, 23],
  [1.57, 23],
  [2.17, 31],
];
const TYPE_END = TYPE_START + SCHEDULE[SCHEDULE.length - 1][0];

const CARET_BLINK_MS = 450;
const CARET_FADE_MS = 250;
const PAUSE_BEFORE_LIFT_MS = CARET_BLINK_MS + CARET_FADE_MS;
const LIFT_MS = 800;

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

function bootStatus(t: number) {
  if (t < TYPE_START) return "INITIALIZING";
  if (t < TYPE_END) return "LOADING WORK";
  return "READY";
}

function formatIST() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

type CaretPhase = "solid" | "blink" | "gone";

export function IntroSequence({ onDone }: { onDone: () => void }) {
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
    let cancelled = false;

    // Hold the curtain down until the work board's imagery has decoded, so it is
    // already painted the instant the screen lifts. `preload` self-resolves on a
    // timeout, so this can delay the reveal but never stall it.
    const liftWhenImagesReady = () => {
      void criticalImagesReady.then(() => {
        if (cancelled) return;
        setStatus("READY");
        setLifting(true);
        timers.push(window.setTimeout(onDone, LIFT_MS));
      });
    };

    const settle = () => {
      setTyped(TAGLINE);
      setCaret("blink");
      timers.push(window.setTimeout(() => setCaret("gone"), CARET_BLINK_MS));
      timers.push(window.setTimeout(liftWhenImagesReady, PAUSE_BEFORE_LIFT_MS));
    };

    if (reduce) {
      setCaret("gone");
      setTyped(TAGLINE);
      timers.push(window.setTimeout(liftWhenImagesReady, 600));
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    const start = performance.now();
    let raf = 0;
    let finished = false;

    const loop = () => {
      const t = (performance.now() - start) / 1000;
      // Cap at "LOADING WORK": promoting to READY is settle()'s job, once the
      // images really are ready, so the label never lies.
      const ns = t < TYPE_END ? bootStatus(t) : "LOADING WORK";
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
      cancelled = true;
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
