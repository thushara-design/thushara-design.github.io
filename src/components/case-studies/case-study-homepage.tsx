
import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import homeShot from "../../assets/case-study-homepage/home.webp";
import blogShot from "../../assets/case-study-homepage/blog.webp";

/**
 * Two pages in one clipped frame. Only the homepage drifts: it is the subject
 * of the study, and a single moving element reads as deliberate where two
 * competing ones read as busy. The blog sits still beside it.
 *
 * The moving column renders its image twice and travels -50%, which lands the
 * second copy exactly where the first began: a seam-free loop. The static one
 * needs only the one copy.
 *
 * It does not start on load. Motion already running before you arrive reads as
 * a background loop; motion that begins shortly after you settle on it reads as
 * the page answering you. So the animation is armed but paused in CSS, and an
 * observer releases it a beat after the panel is genuinely on screen — once,
 * with no restart if you scroll away and back.
 */
const START_DELAY_MS = 2500;

const PageScroller = () => {
  const frame = useRef<HTMLElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;

    // Without an observer there is no way to know when it is seen, so run
    // rather than leave it frozen for good.
    if (typeof IntersectionObserver === "undefined") {
      setRunning(true);
      return;
    }

    let timer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        timer = window.setTimeout(() => setRunning(true), START_DELAY_MS);
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <figure
      ref={frame}
      className={`case-scroller${running ? " is-running" : ""}`}
      aria-label="The redesigned Gistly homepage and blog index"
    >
      <div className="case-scroller-inner">
        <div className="case-scroller-col case-scroller-col--up">
          <div className="case-scroller-track">
            <img src={homeShot} alt="The redesigned Gistly homepage, from the hero through to the footer." loading="lazy" />
            <img src={homeShot} alt="" aria-hidden="true" loading="lazy" />
          </div>
        </div>
        <div className="case-scroller-col case-scroller-col--static">
          <div className="case-scroller-track">
            <img src={blogShot} alt="The Gistly blog index, a grid of article cards." loading="lazy" />
          </div>
        </div>
      </div>
    </figure>
  );
};

/**
 * A feature animation from the live homepage, played from its Lottie export
 * rather than a screen recording, so it stays sharp at any size. The player
 * and the animation file load only once the figure reaches the screen, keeping
 * both off the page's first load, and it pauses whenever it scrolls out of view.
 *
 * With reduced motion it holds `stillFrame`, a frame where the content has
 * already arrived, rather than playing.
 */
type FeatureAnimationProps = {
  load: () => Promise<{ default: object }>;
  width: number;
  height: number;
  displayWidth: number;
  stillFrame: number;
  label: string;
  caption: string;
};

const FeatureAnimation = ({ load: loadData, width, height, displayWidth, stillFrame, label, caption }: FeatureAnimationProps) => {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anim: AnimationItem | undefined;
    let visible = false;
    let requested = false;
    let cancelled = false;

    const load = async () => {
      const [{ default: lottie }, { default: data }] = await Promise.all([
        import("lottie-web/build/player/lottie_light"),
        loadData(),
      ]);
      if (cancelled) return;
      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: false,
        // Lottie writes into the data it is handed; a copy keeps the cached
        // module clean for the next time the case study mounts.
        animationData: structuredClone(data),
      });
      anim.addEventListener("DOMLoaded", () => {
        if (still) anim?.goToAndStop(stillFrame, true);
        else if (visible) anim?.play();
      });
    };

    // Without an observer there is no way to know when it is seen, so load
    // and play rather than leave the frame empty.
    if (typeof IntersectionObserver === "undefined") {
      visible = true;
      void load();
      return () => {
        cancelled = true;
        anim?.destroy();
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !requested) {
          requested = true;
          void load();
        }
        if (still || !anim?.isLoaded) return;
        if (visible) anim.play();
        else anim.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [loadData, stillFrame]);

  return (
    <figure className="case-feature-anim">
      <div className="case-feature-anim-stage">
        <div
          ref={stage}
          className="case-feature-anim-player"
          style={{ width: `min(100%, ${displayWidth}px)`, aspectRatio: `${width} / ${height}` }}
          role="img"
          aria-label={label}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

const constraints = [
  ["Mixed intent.", "Visitors range from \"what even is this\" to \"ready to book a demo\". One page has to serve both."],
  ["A fast, small team.", "The site changes constantly, so the design had to be a durable system, not a one-off layout."],
  ["Features that are hard to picture.", "A capability only lands if a visitor can see it in their own workflow, so I created an animation for each feature in Adobe Illustrator rather than leaning on static screenshots."],
];

const decisions = [
  {
    number: "01",
    title: "Focused hero with a clear CTA",
    body: "The old hero opened on a vague \"empower sales and collections performance\" and offered several competing things to do at once. I gave it one job: say what the product is, then offer a single obvious next step. The demo action leads, and the exploratory links step back behind it.",
  },
  {
    number: "02",
    title: "Outcomes over features",
    body: "The old homepage listed capabilities like a spec sheet: automated auditing, sentiment analysis, transcription. Working from the marketing copy, I sequenced the page around what you get on day one and pushed the feature detail further down, for the people who want it — the same words, ordered so the payoff comes before the mechanism.",
    media: (
      <FeatureAnimation
        load={() => import("../../assets/case-study-homepage/feature-insights.json")}
        width={540}
        height={339}
        displayWidth={440}
        stillFrame={60}
        label="Animation: an accordion of call insights, Agent Performance, Lead Signals, and Compliance Flags, appearing one after another."
        caption="An accordion from the homepage: what an audited call gives you (agent performance, lead signals, compliance flags), named as outcomes rather than as the features that produce them."
      />
    ),
  },
  {
    number: "03",
    title: "One block per capability",
    body: "Instead of one long undifferentiated scroll, I organised the page into distinct capability blocks (conversation QA, agent assist, voice and chat agents, observability), each self-contained and each with its own call to action, so the page guides the visitor forward rather than dumping everything at once.",
    media: (
      <FeatureAnimation
        load={() => import("../../assets/case-study-homepage/feature-calls.json")}
        width={480}
        height={500}
        displayWidth={320}
        stillFrame={20}
        label="Animation: a list of calls with Alex, Taylor, and Priya, each marked with a shield when it passes the audit or a warning when it is flagged."
        caption="The animation from the conversation QA block: calls come in and are marked as passing or flagged. Every capability block has one, so a visitor sees the feature working rather than reading about it."
      />
    ),
  },
  {
    number: "04",
    title: "Show proof, not just claims",
    body: "A complex, unfamiliar product is bought on trust. I argued to keep the customer testimonial on the page when it was up for cutting, and gave it and a real product dashboard room to breathe, so the value is demonstrated rather than asserted.",
  },
  {
    number: "05",
    title: "A single clear path to action",
    body: "On the old page the primary action competed with exploratory navigation and decorative visuals. I tightened the hierarchy so the demo and the dashboard lead, and the eye is pulled toward acting rather than wandering.",
  },
];

const context =
  "Gistly's homepage is the front door for a hard-to-explain product: AI that scores recorded sales, support, and collections calls against quality rubrics. The people who land on it are QA leads and sales, support, and collections managers, buyers who need to grasp a technical, category-defining product quickly, then be moved toward a demo. The page has to teach and convert at the same time.";

const scope =
  "The copy came out of a wider marketing effort. My work was everything around it: the visual design, the hierarchy and composition, and how the content was organised and sequenced down the page. I argued to keep the customer testimonial when it was up for cutting, and I built most of the page in Webflow.";

const problem =
  "The previous homepage led with a broad promise and then a wall of everything: an \"unlock the magic\" feature grid, a phone walkthrough of how it works, and several dashboard shots. It explained a lot but pointed nowhere in particular: the primary action competed with exploration. The heatmaps later confirmed it: on the old page, people roamed the navigation and visuals instead of moving toward a demo.";

const stats = [
  ["+475%", "homepage key events (12 → 69)"],
  ["+246%", "key-event rate (0.4% → 1.39%)"],
  ["+47%", "avg. engagement time per session"],
  ["5×", "likelier to start a contact form"],
];

const results =
  "Measured year-over-year across GA4 and Microsoft Clarity, excluding the revamp month to control for seasonality. Homepage key events rose 475% (12 → 69) and the key-event rate went from 0.4% to 1.39%, a 246% lift: visitors completed meaningful actions far more often. Average engagement time per session rose 47% (42.8s → 62.9s), click efficiency climbed from 39% to 62%, and on the contact page visitors became more than 5× as likely to start a form as a year earlier.";

const attribution =
  "Traffic grew too (active users up 47% year-over-year), but that reflected concurrent SEO and content work as much as the redesign, so I separate it out rather than claim it as design impact. What I attribute to the redesign is the shift in engagement quality, and the heatmaps confirm it: on the new page users move straight to the primary actions, where the old one scattered attention across navigation and visuals.";

const next =
  "The same analysis surfaced the next problems to solve. Blog traffic grew almost ninefold from SEO, but most of it bounced: the content had weak paths into the product. And the contact flow leaked: the form dropped users, and the Calendly booking sat below the fold. I proposed a dedicated book-a-demo path separate from the contact form, a persistent \"request a demo\" action in the nav that goes straight to booking, and stronger in-content conversion for the new blog audience.";

const took =
  "The useful discipline here was honesty about attribution. It would have been easy to headline a single big number; the more valuable thing was to separate what the design moved (how people engage with the page) from what the whole team moved (how many people arrive), and turn that gap into the next roadmap.";

export const CaseStudyHomepage = () => {
  return (
    <main className="testing-flow-case">
      <PageScroller />

      <CaseRow label="Context">
        <p>{context}</p>
      </CaseRow>

      <CaseRow label="My scope">
        <p>{scope}</p>
      </CaseRow>

      <CaseRow label="The problem">
        <p>{problem}</p>
      </CaseRow>

      <section className="testing-flow-row">
        <p className="testing-flow-marker">Constraints</p>
        <ul className="testing-flow-list">
          {constraints.map(([title, body]) => (
            <li key={title}>
              <b>{title}</b> {body}
            </li>
          ))}
        </ul>
      </section>

      <CaseRow label="The redesign">
        <p className="testing-flow-frame">
          Five moves that took the page from a feature dump to a guided path, from the old design to the new.
        </p>
      </CaseRow>

      {decisions.map((decision) => (
        <section className="testing-flow-row testing-flow-decision" key={decision.number}>
          <p className="testing-flow-number">{decision.number}</p>
          <div className="testing-flow-copy">
            <h2>{decision.title}</h2>
            <p>{decision.body}</p>
            {decision.media}
          </div>
        </section>
      ))}

      <section className="testing-flow-row">
        <p className="testing-flow-marker">Results</p>
        <div className="testing-flow-copy">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              margin: "0 0 1.5rem",
            }}
          >
            {stats.map(([value, label]) => (
              <div key={label} style={{ minWidth: "9rem", flex: "1 1 9rem" }}>
                <div
                  style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.05 }}
                >
                  {value}
                </div>
                <div
                  style={{ fontSize: "0.85rem", opacity: 0.65, marginTop: "0.35rem" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p>{results}</p>
          <p>{attribution}</p>
        </div>
      </section>

      {/* Own row with the measure cap lifted: side by side, the pair needs the
          full copy column to stay legible. */}
      <section className="testing-flow-row">
        <p className="testing-flow-marker">Heatmaps</p>
        <div className="testing-flow-copy" style={{ maxWidth: "none" }}>
          <figure className="case-heatmaps">
            <div className="case-heatmaps-pair">
              <div className="case-heatmaps-item">
                <img
                  src="/images/homepage-heatmap-before.png"
                  alt="Click map of the old homepage. The highest-ranked clicks land across the top navigation, with the densest hotspot on the nav links rather than on the demo button."
                />
                <span>Before · Jun–Sep 2025 · 601 views, 236 clicks</span>
              </div>
              <div className="case-heatmaps-item">
                <img
                  src="/images/homepage-heatmap-after.png"
                  alt="Click map of the redesigned homepage. The highest-ranked clicks land on the headline and on the Get a Free Demo and Explore Features buttons."
                />
                <span>After · Dec 2025 – Mar 2026 · 686 views, 424 clicks</span>
              </div>
            </div>
            <figcaption>
              Microsoft Clarity click maps, numbered by click rank over matched four-month windows. On the old page the top-ranked
              clicks sit in the navigation; on the new one they sit on the headline and the two calls to action. That is the
              39% → 62% click efficiency above, seen directly.
            </figcaption>
          </figure>
        </div>
      </section>

      <CaseRow label="What's next">
        <p>{next}</p>
      </CaseRow>

      <CaseRow label="What I took from it">
        <p>{took}</p>
      </CaseRow>

      <footer className="testing-flow-foot">
        <span>Case study</span>
        <span>Product design</span>
      </footer>
    </main>
  );
};

const CaseRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="testing-flow-row">
    <p className="testing-flow-marker">{label}</p>
    <div className="testing-flow-copy">{children}</div>
  </section>
);
