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
warmInBackground([...screenshotImages, ...caseStudyShots, profile]);
