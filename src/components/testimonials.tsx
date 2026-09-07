import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { NavArrowLeft, NavArrowRight, Pause, Play } from "iconoir-react";
import { testimonialData } from "../data";

const ROTATE_MS = 7000;

/**
 * Testimonial carousel, one quote at a time, auto-advancing, with real
 * controls: previous / next arrows, a play/pause toggle, and dots. The
 * play/pause button is the single control (no hover-pause, which made it feel
 * frozen). Editorial styling; Ashit (who managed Thushara at Gistly) leads.
 */
export const Testimonials = () => {
  const count = testimonialData.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.3 });
  const reduce = useReducedMotion();

  // Auto-advance while playing and on-screen. Reduced motion still advances
  // (the pause button is the escape hatch) but without the sliding animation.
  const autoRunning = playing && inView;

  useEffect(() => {
    if (!autoRunning) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [autoRunning, count]);

  const go = (next: number) => setIndex((next + count) % count);
  // Stepping by hand hands control to the reader, stop auto-advancing.
  const step = (dir: number) => {
    setPlaying(false);
    go(index + dir);
  };

  const t = testimonialData[index];

  return (
    <section
      id="testimonials"
      className="tm"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <p className="tm-marker">Testimonials</p>

      <div ref={containerRef} className="tm-stage">
        <div className="tm-viewport" aria-live={autoRunning ? "off" : "polite"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              className="tm-slide"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
            >
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="tm-name">{t.author}</span>
                <span className="tm-contact">{t.contact}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="tm-controls">
          <div className="tm-dots" role="tablist" aria-label="Choose a testimonial">
            {testimonialData.map((item, i) => (
              <button
                key={`${item.author}-${item.contact}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}: ${item.author}`}
                className={`tm-dot${i === index ? " is-active" : ""}`}
                onClick={() => {
                  setPlaying(false);
                  setIndex(i);
                }}
              />
            ))}
          </div>

          <div className="tm-nav">
            <button
              type="button"
              className="tm-btn"
              aria-label="Previous testimonial"
              onClick={() => step(-1)}
            >
              <NavArrowLeft aria-hidden="true" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              className="tm-btn"
              aria-label="Next testimonial"
              onClick={() => step(1)}
            >
              <NavArrowRight aria-hidden="true" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              className="tm-btn tm-btn--toggle"
              aria-label={playing ? "Pause testimonials" : "Play testimonials"}
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing
                ? <Pause aria-hidden="true" strokeWidth={1.6} />
                : <Play aria-hidden="true" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
