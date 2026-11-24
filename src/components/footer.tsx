import { SocialRail } from "./social-rail";

/**
 * The site's colophon, last on every page: the copyright on the left, and on
 * the right a line on who made the site. A hairline over it, set like the
 * hero's small print, so it closes the page without asking to be read.
 *
 * It carries the social links too, so every page has them: on a wide screen
 * they're the rail fixed to the bottom-left corner, out of this row's flow;
 * narrower, they come into the row, on the copyright's line (index.css).
 */
export const Footer = () => {
  return (
    <footer className="site-foot">
      <div className="site-foot-row">
        <p className="site-foot-mark">© {new Date().getFullYear()} Thushara</p>
        <p className="site-foot-note">
          Designed by me, built with a very patient AI.
        </p>
        <SocialRail />
      </div>
    </footer>
  );
};
