import type { ComponentType, SVGProps } from "react";
import { Dribbble, Linkedin, Medium, Sparks } from "iconoir-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const socialLinks: Array<{ label: string; href: string; Icon: IconComponent }> = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thushara-v", Icon: Linkedin },
  { label: "Medium", href: "https://medium.com/@thusharavarghese", Icon: Medium },
  { label: "Dribbble", href: "https://dribbble.com/thusharadesign", Icon: Dribbble },
];

// Points at the prerendered /case-studies/*.html pages, not the SPA's `?ref=`
// URLs: the app is client-rendered, so those serve an empty #root and a model
// that doesn't execute JavaScript reads nothing. These pages carry the full
// prose as static HTML.
const aiPrompt =
  "I am evaluating Thushara Varghese for a B2B product design role. Read these for context: Gistly product design case study https://www.thushara.design/case-studies/gistly.html, Gistly homepage redesign case study https://www.thushara.design/case-studies/homepage.html, Serenity mobile case study https://www.thushara.design/case-studies/serenity.html, summary index https://www.thushara.design/llms.txt, Medium https://medium.com/@thusharavarghese, Dribbble https://dribbble.com/thusharadesign. Based on her work, what should a B2B founder or hiring manager understand about how she thinks, what kinds of product problems she is strongest at, and what evidence in her portfolio supports that?";

/**
 * Fixed bottom-left rail, the AI sparkle on top, then social links.
 * Shared by every page so the sparkle is always reachable.
 */
export const SocialRail = () => (
  <aside className="work-social-rail" aria-label="Social and AI links">
    <a
      className="work-social-ai"
      href={`https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Ask AI about my work"
      aria-describedby="work-ai-tip"
    >
      <Sparks aria-hidden="true" strokeWidth={1.5} />
      <span className="work-ai-tip" id="work-ai-tip" role="tooltip">
        <b>Ask AI about my work</b>
        Opens ChatGPT preloaded with context on my portfolio, how I think, what
        I&apos;m strongest at, and the evidence behind it.
      </span>
    </a>
    {socialLinks.map(({ href, Icon, label }) => (
      <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
        <Icon aria-hidden="true" strokeWidth={1.5} />
      </a>
    ))}
  </aside>
);
