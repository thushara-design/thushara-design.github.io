/**
 * Starts fetching imagery the moment the app's JS is parsed.
 *
 * This deliberately lives at module scope rather than inside any one screen, so
 * it runs on every entry path: first visit, password screen, or straight into
 * the content. Importing it from main.tsx is what guarantees that.
 */
import { preloadImages, warmInBackground } from "./preload-images";
import { introGone } from "./intro";
import { projectImages } from "../components/case-study";
import { screenshotImages } from "../components/screenshot-wall";
import { caseStudyShots } from "../components/case-studies/case-study-1";
import { recordsShots } from "../components/case-studies/case-study-records";
import { profile } from "../assets/images";

/**
 * The work board's card images, fetched first: they sit just under the hero,
 * so they should be painted by the time anyone scrolls to them. The loading
 * screen's count waits on them.
 */
let criticalLoaded = 0;
export const criticalImagesReady = preloadImages(projectImages, 5000, () => {
  criticalLoaded += 1;
});

/** How many of those are in so far, from 0 to 1. */
export const criticalImagesProgress = () =>
  projectImages.length === 0 ? 1 : criticalLoaded / projectImages.length;

// Everything behind a click: the marquee wall, the case study's inline shots for
// both themes, and the About portrait. Not gating anything, just cached before
// it is needed — the portrait is the heaviest single image on the site, so
// fetching it early is the difference between it being there on arrival and
// visibly loading in. Held until the loading screen has gone: some 10MB, it
// slowed the card images the screen waits on, and nothing behind a click can
// be reached until then.
void introGone.then(() => {
  warmInBackground([...screenshotImages, ...caseStudyShots, ...recordsShots, profile]);

  // The records walkthrough's player (media-chrome) is its own chunk, kept out of the first
  // load. Fetched once the browser is idle, it's cached before the case study is opened.
  const warmWalkthroughPlayer = () => void import("../components/case-studies/walkthrough-player");
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(warmWalkthroughPlayer, { timeout: 3000 });
  } else {
    window.setTimeout(warmWalkthroughPlayer, 1200);
  }
});
