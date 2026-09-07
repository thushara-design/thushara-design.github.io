import { useEffect, useState } from "react";

type Section = { id: string; label: string };

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Notion-style scroll-spy table of contents. Auto-detects a case study's
 * section markers (`.testing-flow-marker`), renders a fixed rail of ticks on
 * the right that expand to titles on hover, and fills the ticks as you scroll.
 *
 * Positioned purely in CSS at `right: var(--rail-x)`, mirroring the social
 * rail's left inset. It previously measured the content column at runtime to
 * dodge an overlap, but that overlap was really the content overflowing its
 * own container — fixed at the source in `.testing-flow-case`.
 */
export const SectionNav = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const markers = Array.from(
      document.querySelectorAll<HTMLElement>(".testing-flow-marker")
    );

    const found: Section[] = markers.map((el, i) => {
      const label = (el.textContent || "").trim() || `Section ${i + 1}`;
      const section =
        (el.closest("section") as HTMLElement | null) || el.parentElement!;
      if (!section.id) section.id = `sec-${i}-${slugify(label)}`;
      section.style.scrollMarginTop = "6rem";
      return { id: section.id, label };
    });

    if (found.length === 0) return;
    setSections(found);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = found.findIndex((s) => s.id === entry.target.id);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    found.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (sections.length === 0) return null;

  return (
    <nav className="section-toc" aria-label="On this page">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={[
            "section-toc-item",
            i === activeIndex ? "is-active" : "",
            i <= activeIndex ? "is-passed" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById(s.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span className="section-toc-label">{s.label}</span>
          <span className="section-toc-tick" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
};
