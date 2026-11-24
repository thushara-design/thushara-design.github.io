import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// One dot at the centre of each --dots-gap square, faint, and near-full ink
// under the lens.
const RADIUS = 1.2;
const DOT_ALPHA = 0.14;
const LENS_ALPHA = 0.9;
// The lens: 140px across its radius, at full strength out to 35% of it, and
// a 300ms fade in and out (most of it, on an exponential approach). Inside it
// the dots are pulled in towards the pointer, up to PULL px at full strength,
// like a grid bending round a mass.
const LENS_RADIUS = 140;
const LENS_CORE = 0.35;
const LENS_FADE = 0.07;
const PULL = 22;
// The butterfly effect: the dots are joined, each pulling on its neighbours,
// so a small push carries on outward, dot to dot, across the whole grid,
// crossing and folding into the others it meets and bouncing back off the
// edges, until it slowly dies away. It's worked out on a mesh twice as fine as
// the grid, so the rings stay round, in fixed 60th-of-a-second steps. Speed in
// px a second; DAMP is the share of motion each step loses, RESTORE what draws
// the sheet back level, and below CALM, half a second or more after the last
// push, it counts as still. A flick's rings fade from sight in about 5s.
const MESH = 2;
const STEP = 1 / 60;
const SPEED = 260;
const DAMP = 0.012;
const RESTORE = 0.0015;
const CALM = 0.02;
const CALM_AFTER = 30;
// The push: the pointer drags a bump through the sheet as it moves, leaving a
// wake. The bump eases off where the sheet under it is already high (towards
// WAKE_CAP), so moving at the rings' own speed can't pile them up. Its radius
// is in mesh squares.
const WAKE_RADIUS = 1.6;
const WAKE_SIZE = 1;
const WAKE_CAP = 1.2;
// A touch has no hover, so no lens: where a finger lands it drops one bump,
// rings run out from it, and a finger drawn across the sheet leaves the same
// wake as the pointer. A scroll carries the sheet along under the finger, so
// it leaves only the drop where it began.
const TOUCH_DROP = 1;
// How a dot shows the sheet: it rides up by LIFT px a unit of height, slides
// towards higher ground by TILT px a unit of slope, so the dots gather on a
// crest, and comes up larger and darker there, as if nearer.
const LIFT = 6;
const TILT = 10;
const SWELL_SIZE = 0.25;
const SWELL_ALPHA = 0.5;

/**
 * The homepage's dot grid, drawn on a canvas so each dot can move, and joined
 * so that a small push spreads. It lies still until the pointer moves over
 * it; then the pointer's wake runs out dot to dot across the grid in rings
 * that meet, fold into each other and fade, and it settles still again. On a
 * crest a dot comes up a touch larger and darker, as if nearer. A hovering
 * pointer also pulls the dots near it in and darkens them, like a lens. On a
 * touch screen a finger sets the rings going where it lands, and leaves a
 * wake when drawn across. No rings with reduced motion, only the lens; paused
 * off screen. The fade
 * towards the fold and its place behind the page are in index.css.
 */
export const DotField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const still = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = ref.current;
    const page = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !page || !ctx) return;

    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reach = (SPEED * STEP) ** 2;
    let gap = 32;
    let ink = "#000";
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    // The sheet's height now, a step ago, and the next step's, on a mesh with
    // a dot on every MESH-th point and one row and column past each edge.
    let meshW = 0;
    let meshH = 0;
    let now = new Float32Array(0);
    let before = new Float32Array(0);
    let after = new Float32Array(0);
    let calm = true;
    let quiet = 0;
    let pending = 0;
    let visible = true;
    let lens = 0;
    let lensTo = 0;
    let px = -999;
    let py = -999;
    let wakeX: number | null = null;
    let wakeY = 0;
    let last = 0;
    let raf = 0;

    // The ink and pitch follow the page's tokens, so the theme toggle recolours it.
    const readTokens = () => {
      const style = getComputedStyle(canvas);
      ink = style.color;
      gap = parseFloat(style.getPropertyValue("--dots-gap")) || 32;
    };

    // Where a point on the page falls on the mesh.
    const meshAt = (x: number, y: number) => [((x - gap / 2) / gap + 1) * MESH, ((y - gap / 2) / gap + 1) * MESH];

    const sheetAt = (x: number, y: number) => {
      const [i, j] = meshAt(x, y);
      return now[Math.round(j) * meshW + Math.round(i)] || 0;
    };

    // A soft bump in the sheet at a point on the page.
    const bump = (x: number, y: number, size: number) => {
      const [fi, fj] = meshAt(x, y);
      const span = Math.ceil(WAKE_RADIUS * 3);
      for (let j = Math.max(1, Math.floor(fj) - span); j <= Math.min(meshH - 2, Math.ceil(fj) + span); j++) {
        for (let i = Math.max(1, Math.floor(fi) - span); i <= Math.min(meshW - 2, Math.ceil(fi) + span); i++) {
          const d2 = ((i - fi) ** 2 + (j - fj) ** 2) / WAKE_RADIUS ** 2;
          now[j * meshW + i] += size * Math.exp(-d2);
        }
      }
      calm = false;
      quiet = 0;
    };

    // One step of the sheet: each point is pulled towards the average of its
    // four neighbours, keeps most of its motion, and settles back a touch.
    // The outer ring of points stays level, so the edges throw rings back.
    // Once nothing is moving or raised by more than CALM it's laid flat, but
    // not straight after a push, so a slow drag's tiny ones can build.
    const step = () => {
      const c2 = reach / (gap / MESH) ** 2;
      let most = 0;
      for (let j = 1; j < meshH - 1; j++) {
        for (let i = 1; i < meshW - 1; i++) {
          const k = j * meshW + i;
          const h = now[k];
          const pull = now[k - 1] + now[k + 1] + now[k - meshW] + now[k + meshW] - 4 * h;
          const next = Math.max(-3, Math.min(3, h + (h - before[k]) * (1 - DAMP) + c2 * pull - RESTORE * h));
          after[k] = next;
          most = Math.max(most, Math.abs(next), Math.abs(next - h));
        }
      }
      [before, now, after] = [now, after, before];
      quiet++;
      if (most < CALM && quiet > CALM_AFTER) {
        now.fill(0);
        before.fill(0);
        calm = true;
      }
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          let x = gap / 2 + col * gap;
          let y = gap / 2 + row * gap;
          let h = 0;
          if (!calm) {
            const i = (col + 1) * MESH;
            const j = (row + 1) * MESH;
            const k = j * meshW + i;
            const sheet = now[k];
            const left = i > 0 ? now[k - 1] : sheet;
            const up = j > 0 ? now[k - meshW] : sheet;
            x += ((now[k + 1] - left) / 2) * TILT;
            y += ((now[k + meshW] - up) / 2) * TILT;
            h = Math.max(-1, Math.min(1.4, sheet));
            y -= h * LIFT;
          }
          let alpha = DOT_ALPHA * (1 + SWELL_ALPHA * h);
          if (lens > 0) {
            const ex = px - x;
            const ey = py - y;
            const d = Math.hypot(ex, ey);
            const u = d / LENS_RADIUS;
            if (u < 2.5 && d > 0) {
              const pull = PULL * lens * u * Math.exp(-u * u);
              x += (ex / d) * pull;
              y += (ey / d) * pull;
            }
            if (u < 1) {
              const f = u <= LENS_CORE ? 1 : 1 - (u - LENS_CORE) / (1 - LENS_CORE);
              alpha += (LENS_ALPHA - alpha) * f * lens;
            }
          }
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, RADIUS * (1 + SWELL_SIZE * h), 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    // Runs only while there's something to show: rings still travelling, or
    // the lens fading in or out.
    const frame = (ms: number) => {
      raf = 0;
      const t = ms / 1000;
      const dt = last ? Math.min(t - last, 0.1) : 0;
      last = t;
      lens += (lensTo - lens) * (1 - Math.exp(-dt / LENS_FADE));
      if (Math.abs(lensTo - lens) < 0.002) lens = lensTo;
      if (!still) {
        // The bump moves from where the pointer was to where it is: lifted
        // here, let down there.
        if (wakeX !== null && (px !== wakeX || py !== wakeY)) {
          const size = WAKE_SIZE * Math.max(0, 1 - Math.abs(sheetAt(px, py)) / WAKE_CAP);
          bump(px, py, size);
          bump(wakeX, wakeY, -size);
          wakeX = px;
          wakeY = py;
        }
        pending += dt;
        for (let n = 0; !calm && pending >= STEP && n < 4; n++) {
          step();
          pending -= STEP;
        }
        pending = Math.min(pending, STEP);
      }
      draw();
      if (visible && (!calm || lens !== lensTo)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // A new size lays the sheet flat again.
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cols = Math.ceil(width / gap) + 1;
      rows = Math.ceil(height / gap) + 1;
      meshW = (cols + 2) * MESH;
      meshH = (rows + 2) * MESH;
      now = new Float32Array(meshW * meshH);
      before = new Float32Array(meshW * meshH);
      after = new Float32Array(meshW * meshH);
      calm = true;
      draw();
    };

    // A mouse or pen; a finger on a touch screen goes to the touch handlers.
    const point = (e: PointerEvent) => {
      if (!hover.matches || e.pointerType === "touch") return;
      const box = canvas.getBoundingClientRect();
      px = e.clientX - box.left;
      py = e.clientY - box.top;
      // The first point after coming in is where the wake starts, not a jump.
      if (wakeX === null) {
        wakeX = px;
        wakeY = py;
      }
      lensTo = 1;
      wake();
    };

    const leave = () => {
      lensTo = 0;
      wakeX = null;
      wake();
    };

    // Touch events, not pointer ones: a pointer is cancelled the moment the
    // page starts to scroll, a touch keeps reporting. Passive, so the scroll
    // never waits on them. None with reduced motion, which has no rings.
    const touchAt = (t: Touch): [number, number] => {
      const box = canvas.getBoundingClientRect();
      return [t.clientX - box.left, t.clientY - box.top];
    };

    const touchStart = (e: TouchEvent) => {
      const [x, y] = touchAt(e.touches[0]);
      if (still || y > height) return;
      px = wakeX = x;
      py = wakeY = y;
      bump(x, y, TOUCH_DROP * Math.max(0, 1 - Math.abs(sheetAt(x, y)) / WAKE_CAP));
      wake();
    };

    const touchMove = (e: TouchEvent) => {
      if (wakeX === null) return;
      [px, py] = touchAt(e.touches[0]);
      wake();
    };

    const touchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) wakeX = null;
    };

    readTokens();
    resize();

    const sized = new ResizeObserver(resize);
    sized.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    seen.observe(canvas);
    const themed = new MutationObserver(() => {
      readTokens();
      draw();
    });
    themed.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    page.addEventListener("pointerenter", point);
    page.addEventListener("pointermove", point);
    page.addEventListener("pointerleave", leave);
    page.addEventListener("touchstart", touchStart, { passive: true });
    page.addEventListener("touchmove", touchMove, { passive: true });
    page.addEventListener("touchend", touchEnd, { passive: true });
    page.addEventListener("touchcancel", touchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      sized.disconnect();
      seen.disconnect();
      themed.disconnect();
      page.removeEventListener("pointerenter", point);
      page.removeEventListener("pointermove", point);
      page.removeEventListener("pointerleave", leave);
      page.removeEventListener("touchstart", touchStart);
      page.removeEventListener("touchmove", touchMove);
      page.removeEventListener("touchend", touchEnd);
      page.removeEventListener("touchcancel", touchEnd);
    };
  }, [still]);

  return <canvas ref={ref} className="dot-field" aria-hidden="true" />;
};
