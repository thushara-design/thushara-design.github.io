import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { box, circle, dot, frame, strokes, type Point3, type Shape } from "../lib/iso-drawing";
import { criticalImagesProgress, criticalImagesReady } from "../lib/warm-assets";

/*
 * The loading screen: research, design and build as three isometric line
 * drawings, one at a time in the centre: each draws itself in, holds, and
 * fades before the next, and after the last the screen rises off the top
 * like a curtain, onto the homepage. Fine, even light lines on near-black,
 * like a technical illustration. The drawings are built from shapes in 3D space
 * (lib/iso-drawing.ts); each solid is filled with the ground colour, which
 * hides whatever sits behind it. Under the drawings, a bar and a count of
 * the load.
 */

// Timing, in ms. Nothing starts until the page has painted (see IntroLoader),
// then LEAD. Within a drawing each part follows the last by LINE_GAP and
// takes DRAW to draw, while the drawing fades in over IN. It holds for STAY,
// then fades over OUT, and the next begins OVERLAP before that fade ends, so
// one dissolves into the next. Once the last has drawn and the count reaches
// 100%, the screen holds for HOLD and rises away over LIFT. The page's own
// entrance starts ENTER into the rise, as the curtain passes the middle of
// the screen, so the page starts moving as it's uncovered rather than
// underneath it.
const LEAD = 120;
const DRAW = 450;
const LINE_GAP = 18;
const IN = 250;
const STAY = 100;
const OUT = 250;
const OVERLAP = 150;
const HOLD = 200;
const LIFT = 900;
const ENTER = 350;

// The fastest the count may climb, in % per ms, so it runs up to an image
// that's just come in rather than jumping to it.
const COUNT_RATE = 0.25;

// Research: a stack of sheets, a lens resting on the top one. Drawn bottom up,
// so each sheet covers the one under it.
const research: Shape[] = [
  ...[0, 1, 2, 3, 4, 5].map((i) => box(0, 0, i * 16, 100, 100, 6)),
  circle(50, 50, 86, 30),
  circle(50, 50, 86, 23),
  strokes([
    [
      [71, 71, 86],
      [96, 96, 86],
    ],
  ]),
];

// Flat helpers for the two scenes below: a rectangle lying on a surface at
// height z, and one standing on a window's face at depth y.
const flatRect = (x0: number, y0: number, x1: number, y1: number, z: number): Point3[] => [
  [x0, y0, z],
  [x1, y0, z],
  [x1, y1, z],
  [x0, y1, z],
  [x0, y0, z],
];
const faceRect = (x0: number, z0: number, x1: number, z1: number, y: number): Point3[] => [
  [x0, y, z0],
  [x1, y, z0],
  [x1, y, z1],
  [x0, y, z1],
  [x0, y, z0],
];

// Design: a wireframe, the way one is drawn on paper, on a screen lying flat:
// a browser bar, an image placeholder crossed corner to corner, lines of text
// and a button beside it, and a row of three cards, each a box over two lines.
const Z = 3;
const card = (x: number): Point3[][] => [
  flatRect(x, 66, x + 34, 94, Z),
  [
    [x + 4, 84, Z],
    [x + 30, 84, Z],
  ],
  [
    [x + 4, 89, Z],
    [x + 22, 89, Z],
  ],
];
const design: Shape[] = [
  box(0, 0, 0, 130, 100, Z),
  strokes([
    [
      [0, 12, Z],
      [130, 12, Z],
    ],
    [
      [8, 6, Z],
      [30, 6, Z],
    ],
  ]),
  strokes([
    flatRect(8, 20, 72, 58, Z),
    [
      [8, 20, Z],
      [72, 58, Z],
    ],
    [
      [72, 20, Z],
      [8, 58, Z],
    ],
  ]),
  strokes([
    [
      [80, 22, Z],
      [122, 22, Z],
    ],
    [
      [80, 30, Z],
      [116, 30, Z],
    ],
    [
      [80, 38, Z],
      [108, 38, Z],
    ],
  ]),
  strokes([flatRect(80, 46, 104, 56, Z)]),
  strokes(card(8)),
  strokes(card(48)),
  strokes(card(88)),
];

// Build: a terminal standing upright, its face toward the viewer's left: a
// title bar with three dots; a build command at its prompt, three lines of
// output and a tick for the line that says it worked; then a second command,
// and the prompt waiting with a block cursor.
const WIN_Y = 6;
const prompt = (z: number): Point3[] => [
  [8, WIN_Y, z + 3],
  [12, WIN_Y, z],
  [8, WIN_Y, z - 3],
];
const tick = (z: number): Point3[] => [
  [7, WIN_Y, z],
  [9.5, WIN_Y, z - 2.5],
  [13, WIN_Y, z + 3],
];
const row = (x0: number, x1: number, z: number): Point3[] => [
  [x0, WIN_Y, z],
  [x1, WIN_Y, z],
];
const build: Shape[] = [
  box(0, 0, 0, 140, WIN_Y, 92),
  strokes([row(0, 140, 80)]),
  ...[9, 16, 23].map((x) => dot(x, WIN_Y, 86, 2.2)),
  strokes([prompt(68), row(16, 60, 68)]),
  strokes([row(16, 96, 60), row(16, 82, 53), row(16, 104, 46)]),
  strokes([tick(37), row(18, 70, 37)]),
  strokes([prompt(25), row(16, 48, 25)]),
  strokes([prompt(14), faceRect(16, 10.5, 21, 17.5, WIN_Y)]),
];

const SCENES = [
  { label: "Research", shapes: research },
  { label: "Design", shapes: design },
  { label: "Build", shapes: build },
];

// Each drawing starts as the one before is fading out.
const length = (shapes: Shape[]) => (shapes.length - 1) * LINE_GAP + DRAW;
const STARTS: number[] = [];
SCENES.forEach((_, i) => {
  STARTS.push(i === 0 ? LEAD : STARTS[i - 1] + length(SCENES[i - 1].shapes) + STAY + OUT - OVERLAP);
});

/** When the last drawing has drawn, and the soonest the count can reach 100%. */
const DRAWN_AT = STARTS[STARTS.length - 1] + length(SCENES[SCENES.length - 1].shapes);

/**
 * Settles once what's behind the screen is in: the work board's images and
 * the fonts. The images give up after 5s on their own; the fonts do here.
 */
const pageLoaded = () =>
  Promise.all([
    criticalImagesReady,
    Promise.race([document.fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 5000))]),
  ]);

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Scene({ index, label, shapes }: { index: number; label: string; shapes: Shape[] }) {
  const start = STARTS[index];
  // Every drawing but the last fades out once it has held; the last stays
  // for the screen's own fade.
  const leaves = index < SCENES.length - 1;
  const out = start + length(shapes) + STAY;

  // The lines keep one width whatever the drawing's scale (a non-scaling
  // stroke), which dashes in screen pixels: so each line's length is measured
  // on screen, and its dash and offset set to it, for the draw-in to trace the
  // whole line. Before the first paint, so nothing shows undrawn.
  const svg = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const el = svg.current;
    if (!el) return;
    const box = el.viewBox.baseVal;
    const rect = el.getBoundingClientRect();
    const scale = Math.min(rect.width / box.width, rect.height / box.height);
    el.querySelectorAll<SVGPathElement>(".intro-line").forEach((path) => {
      path.style.setProperty("--len", `${Math.ceil(path.getTotalLength() * scale) + 2}px`);
    });
    el.classList.add("is-measured");
  }, []);

  return (
    <div
      className={`intro-panel${leaves ? " is-passing" : ""}`}
      style={
        {
          "--in": `${start}ms`,
          "--in-for": `${IN}ms`,
          "--out": `${out}ms`,
          "--out-for": `${OUT}ms`,
        } as CSSProperties
      }
    >
      <svg ref={svg} viewBox={frame(shapes)} shapeRendering="geometricPrecision" aria-hidden="true">
        {shapes.map((s, i) => (
          <g key={i}>
            {s.fill ? <path className="intro-fill" d={s.fill} /> : null}
            <path className="intro-line" d={s.line} style={delay(start + i * LINE_GAP)} />
          </g>
        ))}
      </svg>
      <p className="intro-label" style={delay(start + 100)}>
        <span>0{index + 1}</span> {label}
      </p>
    </div>
  );
}

/**
 * Plays once, then rises away: `onLift` partway up (ENTER), so the page's own
 * entrance plays as it's uncovered, and `onDone` once it has gone.
 *
 * The sequence waits for two frames after mounting before it starts: the page
 * behind is being built in those first moments, and a drawing begun then
 * loses its opening frames and jumps in part-drawn.
 *
 * The count keeps pace with the drawings, but never runs ahead of the load:
 * up to 20% on its own, each image in lets it further, and only the whole
 * load lets it past 99. It rises once both are done, so on a slow connection
 * the last drawing holds at 99% until the page is ready.
 */
export function IntroLoader({ onLift, onDone }: { onLift: () => void; onDone: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setPlaying(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let loaded = false;
    void pageLoaded().then(() => {
      loaded = true;
    });

    // Written straight to the bar and the counter, so the count doesn't
    // re-render the drawings. Timed from its first frame, on the frames' own
    // clock.
    let began = -1;
    let last = 0;
    let shown = 0;
    let frame = 0;
    let lift = 0;
    let enter = 0;
    let done = 0;
    const tick = (now: number) => {
      if (began < 0) began = last = now;
      const paced = (100 * (now - began)) / DRAWN_AT;
      const allowed = loaded ? 100 : 20 + 79 * criticalImagesProgress();
      shown = Math.min(paced, allowed, shown + COUNT_RATE * (now - last));
      last = now;
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`;
      if (count.current) count.current.textContent = String(Math.floor(shown));
      if (shown < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      lift = window.setTimeout(() => setLeaving(true), HOLD);
      // Well after the rise has started, so its work can't hold the start back.
      enter = window.setTimeout(onLift, HOLD + ENTER);
      done = window.setTimeout(onDone, HOLD + LIFT);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lift);
      window.clearTimeout(enter);
      window.clearTimeout(done);
    };
  }, [playing, onLift, onDone]);

  return (
    <div
      className={`intro${playing ? " is-playing" : ""}${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading portfolio"
      style={{ "--draw": `${DRAW}ms` } as CSSProperties}
    >
      <div className="intro-stage">
        {SCENES.map((scene, i) => (
          <Scene key={scene.label} index={i} {...scene} />
        ))}
      </div>
      <div className="intro-progress" aria-hidden="true">
        <span className="intro-bar">
          <span ref={bar} />
        </span>
        <p className="intro-count">
          <span ref={count}>0</span>%
        </p>
      </div>
    </div>
  );
}
