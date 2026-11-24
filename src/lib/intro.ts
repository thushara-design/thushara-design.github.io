import { createContext, useContext } from "react";

/**
 * False while the loading screen covers the page; true once it has risen
 * halfway off it. The page renders behind it, so anything that animates on
 * entry waits for this, or it would play out unseen under the screen, and
 * starts as it's uncovered. True wherever no loading screen runs.
 */
export const IntroDoneContext = createContext(true);

export const useIntroDone = () => useContext(IntroDoneContext);

let markGone = () => {};

/**
 * Settles once no loading screen is in the way: when it has gone, or straight
 * away where none runs (AuthGate calls `markIntroGone`). Work that would
 * compete with it, for the main thread or the connection, waits on this.
 */
export const introGone = new Promise<void>((resolve) => {
  markGone = resolve;
});

export const markIntroGone = () => markGone();
