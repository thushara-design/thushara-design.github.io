import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth, slightly slow scrolling for the whole site (Lenis): a wheel or
 * trackpad eases the page toward where it's sent instead of jumping there.
 * Touch keeps its native momentum (Lenis leaves touch alone by default), and
 * reduced motion keeps native scrolling altogether. Programmatic scrolls
 * (scrollTo, scrollIntoView) still work: Lenis syncs to them.
 */
export function startSmoothScroll(): Lenis | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  return new Lenis({
    autoRaf: true,
    // Below the default 0.1, so the page eases in more gently and settles later.
    lerp: 0.075,
    // Each wheel notch carries the page a little less far than native.
    wheelMultiplier: 0.85,
  });
}
