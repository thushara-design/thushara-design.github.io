import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeClosed } from "iconoir-react";
import { IntroLoader } from "./intro-loader";
import { box, dot, frame, strokes, trace, type Point3, type Shape } from "../lib/iso-drawing";
import { consumeToken, readGrant, verify, verifySync, writeGrant } from "../lib/access";
import { IntroDoneContext, markIntroGone } from "../lib/intro";

interface PasswordProtectProps {
  onUnlock: () => void;
}

// A padlock in the loading screen's isometric line drawing: a box for the
// body; the shackle a flat band standing on its top, filled so it hides the
// edge behind it; and a keyhole on the front face.
const BODY_W = 56;
const BODY_D = 22;
const BODY_H = 44;
const MID = BODY_D / 2;
const CENTRE = BODY_W / 2;
const ARCH_Z = 62;
const ARCH_R = 18;
const BAND = 6;

const arch = (r: number, from: number, to: number) =>
  Array.from({ length: 25 }, (_, i): Point3 => {
    const t = from + ((to - from) * i) / 24;
    return [CENTRE + r * Math.cos(t), MID, ARCH_Z + r * Math.sin(t)];
  });

function shackle(): Shape {
  const { d, p } = trace(
    [
      [CENTRE - ARCH_R, MID, BODY_H],
      ...arch(ARCH_R, Math.PI, 0),
      [CENTRE + ARCH_R, MID, BODY_H],
      [CENTRE + ARCH_R - BAND, MID, BODY_H],
      ...arch(ARCH_R - BAND, 0, Math.PI),
      [CENTRE - ARCH_R + BAND, MID, BODY_H],
    ],
    true,
  );
  return { fill: d, line: d, points: p };
}

const LOCK: Shape[] = [
  box(0, 0, 0, BODY_W, BODY_D, BODY_H),
  shackle(),
  dot(CENTRE, BODY_D, 26, 4),
  strokes([
    [
      [CENTRE, BODY_D, 22],
      [CENTRE, BODY_D, 13],
    ],
  ]),
];
const LOCK_VIEW = frame(LOCK);

export const PasswordProtect: React.FC<PasswordProtectProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(false);

    try {
      const match = await verify(password);
      if (match) {
        writeGrant(match.label);
        onUnlock();
      } else {
        setError(true);
        setPassword("");
      }
    } catch (err) {
      console.error("Hashing failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="load-screen !z-40">
      <div className="gate">
        <svg className="gate-art" viewBox={LOCK_VIEW} shapeRendering="geometricPrecision" aria-hidden="true">
          {LOCK.map((s, i) => (
            <g key={i}>
              {s.fill ? <path className="gate-fill" d={s.fill} /> : null}
              <path className="gate-line" d={s.line} />
            </g>
          ))}
        </svg>
        <h1 className="gate-label">
          <span>Protected</span> work
        </h1>

        <form onSubmit={handleSubmit} className={`gate-form${error ? " is-wrong" : ""}`}>
          <input
            type={revealed ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password"
            aria-label="Password"
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="gate-reveal"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            title={revealed ? "Hide password" : "Show password"}
          >
            {revealed
              ? <EyeClosed width={17} height={17} strokeWidth={1.2} />
              : <Eye width={17} height={17} strokeWidth={1.2} />}
          </button>
          <button type="submit" className="gate-submit" disabled={loading || !password} aria-label="Submit password">
            <ArrowRight width={17} height={17} strokeWidth={1.2} />
          </button>

          {error && <p className="gate-error animate-fade-in">Incorrect password</p>}
        </form>
      </div>

      <p className="load-foot">
        Need access? <a href="mailto:thusharavarghese9@gmail.com">Email me</a>
      </p>
    </div>
  );
};

/** How this visit opens: at the gate or straight into the work, and whether
 *  the loading screen plays first. */
type Entry = { locked: boolean; intro: boolean };

/**
 * A landing on the front door itself, which is what the loading screen is
 * for. A hash or `?ref=` means someone aiming at a section or a case study,
 * including the About page's link back to the work: no screen in front of
 * what they asked for. Nor where motion is turned down, since it's all
 * motion.
 */
const onHomepage = () =>
  window.location.pathname === "/" &&
  !window.location.hash &&
  !new URLSearchParams(window.location.search).get("ref") &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Resolved once, before first paint, so a valid share link never flashes the
 * gate. It must not run twice: `consumeToken` strips `?k=` from the address
 * bar, so a second call would find nothing. It runs even for someone already
 * unlocked, so a re-opened share link still tidies its own URL.
 */
function resolveEntry(): Entry {
  const intro = onHomepage();
  const token = consumeToken();
  if (readGrant()) return { locked: false, intro };
  if (!token) return { locked: true, intro };

  const match = verifySync(token);
  if (!match) return { locked: true, intro };

  writeGrant(match.label);
  return { locked: false, intro };
}

/**
 * Lets Clarity load (index.html holds it back), the next time the browser is
 * idle: its start-up is some 50ms of script and a snapshot of the page, which
 * stalled the loading screen's first drawing.
 */
const startAnalytics = () => {
  const start = (window as unknown as { startClarity?: () => void }).startClarity;
  if (!start) return;
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(start, { timeout: 2000 });
  } else {
    window.setTimeout(start, 500);
  }
};

// The loading screen is a fixed layer that rises away, so whatever's behind it,
// the gate or the work, is already painted as it clears. The work's own
// entrance starts as it's uncovered.
export const AuthGate = ({ children }: { children: ReactNode }) => {
  const [entry] = useState(resolveEntry);
  const [isLocked, setIsLocked] = useState(entry.locked);
  const [showIntro, setShowIntro] = useState(entry.intro);
  const [lifted, setLifted] = useState(!entry.intro);

  const handleUnlock = useCallback(() => setIsLocked(false), []);
  const handleIntroLift = useCallback(() => setLifted(true), []);
  const handleIntroDone = useCallback(() => setShowIntro(false), []);

  // What waits on the loading screen (the background downloads, analytics)
  // goes once it has gone, or straight away where none runs.
  useEffect(() => {
    if (showIntro) return;
    markIntroGone();
    startAnalytics();
  }, [showIntro]);

  const intro = showIntro ? <IntroLoader onLift={handleIntroLift} onDone={handleIntroDone} /> : null;

  if (isLocked) {
    return (
      <div className="relative min-h-screen font-sans text-dark">
        {intro}
        <PasswordProtect onUnlock={handleUnlock} />
      </div>
    );
  }

  return (
    <>
      {intro}
      <IntroDoneContext.Provider value={lifted}>{children}</IntroDoneContext.Provider>
    </>
  );
};
