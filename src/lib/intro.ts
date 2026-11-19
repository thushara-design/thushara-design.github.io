import { createContext, useContext } from "react";

/**
 * False while the intro overlay covers the page; true from the moment it
 * starts to lift. The work board mounts behind it, so anything that animates
 * on entry waits for this, or it would play out unseen under the overlay, and
 * starts as the lift does, so the board is never seen empty. True wherever no
 * intro runs.
 */
export const IntroDoneContext = createContext(true);

export const useIntroDone = () => useContext(IntroDoneContext);
