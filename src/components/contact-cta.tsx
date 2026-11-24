import { ArrowUpRight } from "iconoir-react";
import { motion, useReducedMotion } from "motion/react";
import { RiseLine, riseIn } from "./work-reveal";

// The beats, in seconds after the reader reaches the foot of the page: the
// question rises out of its mask, then the line, then the link, one by one.
const BEAT_TITLE = 0;
const BEAT_LINE = 0.15;
const BEAT_LINK = 0.3;

/**
 * The homepage's sign-off, after the last case study: a question set like the
 * hero's statement, and a line and an email link under it. Plays once, when
 * the whole of it is in view, which is the foot of the page: it sits just
 * above the footer.
 */
export const ContactCta = () => {
  const still = useReducedMotion() ?? false;

  return (
    <motion.section
      id="contact"
      className="contact-cta"
      aria-labelledby="contact-cta-title"
      initial={still ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: "all" }}
    >
      <h2 id="contact-cta-title" className="contact-cta-title">
        <RiseLine delay={BEAT_TITLE}>Have a good problem for&nbsp;me?</RiseLine>
      </h2>
      <div className="contact-cta-side">
        <motion.p variants={riseIn} custom={BEAT_LINE}>
          I’m always open to interesting opportunities and conversations.
        </motion.p>
        <motion.a
          className="contact-cta-link"
          href="mailto:thusharavarghese9@gmail.com"
          variants={riseIn}
          custom={BEAT_LINK}
        >
          Drop me a line
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
        </motion.a>
      </div>
    </motion.section>
  );
};
