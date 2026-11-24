/*
 * The parts the loading screen's isometric line drawings are built from, and
 * the password screen's padlock too: shapes in 3D space, projected flat. Each
 * solid comes with a fill in the ground colour, which hides whatever sits
 * behind it.
 */

type Point = [number, number];
export type Point3 = [number, number, number];

// Isometric projection: x runs down-right, y down-left, z straight up.
const COS = Math.cos(Math.PI / 6);
const iso = (x: number, y: number, z: number): Point => [(x - y) * COS, (x + y) * 0.5 - z];
const at = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`;

/** A drawn part: its line, an optional fill to hide what's behind, and the
 *  points it reaches, for framing. */
export type Shape = { line: string; fill?: string; points: Point[] };

/** A path through 3D points, optionally closed. */
export const trace = (pts: Point3[], close = false) => {
  const p = pts.map((q) => iso(...q));
  return { d: `M${p.map(at).join(" L")}${close ? " Z" : ""}`, p };
};

/** Several open strokes as one part, drawn in order along a single path. */
export function strokes(list: Point3[][]): Shape {
  const parts = list.map((pts) => trace(pts));
  return { line: parts.map((t) => t.d).join(" "), points: parts.flatMap((t) => t.p) };
}

/**
 * A box at (x, y, z), w × d × h: its silhouette, filled to hide what's
 * behind, and the three edges that meet at its near top corner.
 */
export function box(x: number, y: number, z: number, w: number, d: number, h: number): Shape {
  const a = iso(x, y, z + h);
  const b = iso(x + w, y, z + h);
  const c = iso(x + w, y + d, z + h);
  const dd = iso(x, y + d, z + h);
  const bLow = iso(x + w, y, z);
  const cLow = iso(x + w, y + d, z);
  const dLow = iso(x, y + d, z);
  const outline = `M${at(a)} L${at(b)} L${at(bLow)} L${at(cLow)} L${at(dLow)} L${at(dd)} Z`;
  return {
    fill: outline,
    line: `${outline} M${at(b)} L${at(c)} L${at(dd)} M${at(c)} L${at(cLow)}`,
    points: [a, b, c, dd, bLow, cLow, dLow],
  };
}

/**
 * A circle lying flat at height z, which projects to a level ellipse: drawn
 * as two true arcs, so it's a smooth curve. (Each line's length is measured
 * on screen before it draws, so arcs trace fully.)
 */
export function circle(cx: number, cy: number, cz: number, r: number): Shape {
  const [x, y] = iso(cx, cy, cz);
  const rx = r * Math.SQRT2 * COS;
  const ry = r * Math.SQRT2 * 0.5;
  const left: Point = [x - rx, y];
  const right: Point = [x + rx, y];
  const radii = `${rx.toFixed(2)} ${ry.toFixed(2)}`;
  const d = `M${at(left)} A${radii} 0 1 0 ${at(right)} A${radii} 0 1 0 ${at(left)} Z`;
  return { fill: d, line: d, points: [left, right, [x, y - ry], [x, y + ry]] };
}

/**
 * A small circle standing in the x–z plane at depth y, on a box's front face.
 * Upright, it projects to a tilted ellipse, so it's traced as fine segments;
 * at the size these are drawn the difference doesn't show.
 */
export function dot(cx: number, cy: number, cz: number, r: number): Shape {
  const pts = Array.from({ length: 32 }, (_, i): Point3 => {
    const t = (i / 32) * Math.PI * 2;
    return [cx + r * Math.cos(t), cy, cz + r * Math.sin(t)];
  });
  const { d, p } = trace(pts, true);
  return { fill: d, line: d, points: p };
}

/** The smallest viewBox around a scene, with a little room for the stroke. */
export function frame(shapes: Shape[]) {
  const pts = shapes.flatMap((s) => s.points);
  const xs = pts.map(([x]) => x);
  const ys = pts.map(([, y]) => y);
  const pad = 4;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) + pad - minX;
  const h = Math.max(...ys) + pad - minY;
  return `${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}
