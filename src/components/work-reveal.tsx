import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/*
 * The work board's entrance, kept Swiss: the image is there from the start,
 * and the text follows in short beats, label, title, then the rest, one
 * easing, distances on the 8px grid. Nothing obscures the content on its way in, and every card has
 * settled in about a second. Each card plays once, as it scrolls into view.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const; // --ease

/** Fade and a one-step rise; the delay comes in as `custom`. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

const lineIn: Variants = {
  hidden: { y: "110%" },
  shown: (delay: number = 0) => ({
    y: "0%",
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  }),
};

/**
 * A line that rises out of a mask as one piece, however many lines it wraps
 * to: a card's label, then its title. `className` styles the rising line.
 */
export function RiseLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="rise-mask">
      <motion.span className={className ? `rise-line ${className}` : "rise-line"} variants={lineIn} custom={delay}>
        {children}
      </motion.span>
    </span>
  );
}
