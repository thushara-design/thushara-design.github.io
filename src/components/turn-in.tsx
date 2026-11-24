import { Fragment, type ReactNode } from "react";

/*
 * The headline entrance, shared by the homepage hero and the About page: each
 * line rises out of its own lower edge while turning level, hinged at its
 * left end, so a line surfaces left to right and settles flat (index.css).
 * The page holds its words down (`is-held`), measures them, then lets them go
 * (`is-turning`).
 */

// The step, in ms, from one line's start to the next.
const LINE_STEP = 70;

/**
 * Words set to turn in: each in a clip of its own line's height, the word
 * inside it the piece that moves. `at` is when its first line starts.
 */
export function TurnIn({ words, at }: { words: ReactNode[]; at: number }) {
  return (
    <span data-turn={at}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className="turn-word">
            <span>{word}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/**
 * Sorts each block's words into the lines they've wrapped to, and gives each
 * word its line's start (--d) and its distance from the line's left end
 * (--x), which is where it turns about, so a line turns as one piece. A word
 * counts as on the same line while its top is within half its height of the
 * line's, so a taller piece (the About headline's photo) doesn't start a line
 * of its own. All read first, then all written, so it lays out once.
 */
export function measureTurns(root: HTMLElement) {
  const sets: Array<[HTMLElement, number, number]> = [];
  root.querySelectorAll<HTMLElement>("[data-turn]").forEach((block) => {
    const at = Number(block.dataset.turn);
    let line = -1;
    let top = NaN;
    let left = 0;
    block.querySelectorAll<HTMLElement>(".turn-word").forEach((word) => {
      const r = word.getBoundingClientRect();
      if (!(Math.abs(r.top - top) < r.height / 2)) {
        line += 1;
        top = r.top;
        left = r.left;
      }
      sets.push([word, at + line * LINE_STEP, r.left - left]);
    });
  });
  sets.forEach(([word, d, x]) => {
    word.style.setProperty("--d", `${d}ms`);
    word.style.setProperty("--x", `${x}px`);
  });
}
