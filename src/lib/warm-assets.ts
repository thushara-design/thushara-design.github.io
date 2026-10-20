/**
 * Starts fetching imagery the moment the app's JS is parsed.
 *
 * This deliberately lives at module scope rather than inside the intro screen.
 * The intro only mounts while the site is locked, so a returning visitor whose
 * session is already unlocked skipped the preload entirely and watched the work
 * board load its images from scratch — the exact problem this is meant to solve.
 * Importing this from main.tsx means it runs on every entry path: first visit,
 * password screen, or straight into the content.
 */
import { preloadImages, warmInBackground } from "./preload-images";
import { projectImages } from "../components/case-study";
import { screenshotImages } from "../components/screenshot-wall";
import { caseStudyShots } from "../components/case-studies/case-study-1";
import { LOOM_EMBED_URL, recordsShots } from "../components/case-studies/case-study-records";
import { profile } from "../assets/images";

/**
 * The work board's card images — awaited by the intro before it lifts, so the
 * board is painted rather than loading when it appears.
 */
export const criticalImagesReady = preloadImages(projectImages);

// Everything behind a click: the marquee wall, the case study's inline shots for
// both themes, and the About portrait. Not gating anything, just cached before
// it is needed — the portrait is the heaviest single image on the site, so
// fetching it during the intro is the difference between it being there on
// arrival and visibly loading in.
warmInBackground([...screenshotImages, ...caseStudyShots, ...recordsShots, profile]);

/**
 * The records case study opens on a Loom walkthrough, and Loom's player takes a
 * couple of seconds to arrive from cold. Loading it once in a hidden frame,
 * behind the loading screen, puts its scripts, styles and poster in the cache.
 * The browser keys that cache to this site and to Loom's frame, which is exactly
 * where the real embed reads from, so it then appears almost at once.
 *
 * Waits for the page's own load so it never competes with the card images, and
 * drops the frame after a while; what it fetched stays cached.
 */
function warmEmbed(src: string, keepMs = 20000): void {
  const start = () => {
    const frame = document.createElement("iframe");
    frame.src = src;
    frame.title = "";
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    Object.assign(frame.style, {
      position: "fixed",
      left: "-10000px",
      top: "0",
      width: "640px",
      height: "360px",
      border: "0",
      opacity: "0",
      pointerEvents: "none",
    });
    frame.addEventListener("load", () => window.setTimeout(() => frame.remove(), keepMs), { once: true });
    document.body.appendChild(frame);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

warmEmbed(LOOM_EMBED_URL);
