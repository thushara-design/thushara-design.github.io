import { ScreenshotWall } from "../screenshot-wall";
import { useTheme } from "../../lib/theme";
import libraryLight from "../../assets/case-study-1/light/library.png";
import builderLight from "../../assets/case-study-1/light/builder.png";
import reviewLight from "../../assets/case-study-1/light/review.png";
import testLight from "../../assets/case-study-1/light/test.png";
import libraryDark from "../../assets/case-study-1/dark/library.png";
import builderDark from "../../assets/case-study-1/dark/builder.png";
import reviewDark from "../../assets/case-study-1/dark/review.png";
import testDark from "../../assets/case-study-1/dark/test.png";

type ShotKey = "library" | "builder" | "review" | "test";

// Show the opposite-theme screenshot for contrast, matching the marquee:
// dark page → light-UI shots, light page → dark-UI shots.
const shotsForDarkPage: Record<ShotKey, string> = {
  library: libraryLight,
  builder: builderLight,
  review: reviewLight,
  test: testLight,
};
const shotsForLightPage: Record<ShotKey, string> = {
  library: libraryDark,
  builder: builderDark,
  review: reviewDark,
  test: testDark,
};

/** Both themes' inline shots, warmed ahead of the case study being opened. */
export const caseStudyShots = [
  ...Object.values(shotsForDarkPage),
  ...Object.values(shotsForLightPage),
];

const breakdowns = [
  ["Forms that drift", "A parameter was edited in the builder and again on a separate testing page, two forms of the same thing, quietly diverging."],
  ["No trigger for testing", "Nothing signalled when a test applied or mattered, so testing felt bolted on rather than part of the work."],
  ["Weights you can't compare", "Scoring weights lived inside a single parameter's editor, invisible to the siblings they're weighed against."],
  ["No ground truth", "There was no honest, affordable way to fix the correct answer every test has to measure against."],
];

const constraints = [
  ["Non-engineer users", "No jargon; it had to read like QA work, not tooling."],
  ["No clean precedent", "The closest analogues were developer eval tools, none built for a QA lead."],
  ["A fast, lean team", "Designs had to be decisive and clearly reasoned to move."],
  ["Correctness-critical", "This is the scoring engine; a confusing tuning flow risks wrong scores reaching customers."],
];

const decisions: Array<{
  number: string;
  title: string;
  tag: string;
  body: string;
  shotKey?: ShotKey;
  shotAlt?: string;
  diagram?: boolean;
}> = [
  {
    number: "01",
    title: "Author first, test later",
    tag: "Closes:No trigger for testing",
    body: "Users author a rubric, run it on real calls, and only then tune when results look wrong. So a new template opens in a fast side panel for quick authoring; once it has run, each parameter gets its own page where testing lives. Testing actions do not appear until there is something to test, which keeps a first-timer's path simple. The tradeoff: a quick edit on a live parameter now costs a navigation. I judged the consistency worth it.",
    shotKey: "library",
    shotAlt: "Template library, start from scratch, or from a prebuilt Support, Sales, or Collections rubric.",
  },
  {
    number: "02",
    title: "Make ground truth cheap",
    tag: "Closes:No ground truth",
    body: "Instead of labelling from a blank slate, the system auto-seeds a small set of recently evaluated calls, pre-fills the AI's answers, and asks the reviewer only to confirm or correct them. Verification becomes a quick pass, not thousands of cold judgments: the difference between the feature being usable and abandoned.",
    shotKey: "review",
    shotAlt: "Review tab, the AI's answer pre-filled per call, with one-click Confirm or Edit against real transcripts and timestamps.",
  },
  {
    number: "03",
    title: "One editor, two contexts",
    tag: "Closes:Forms that drift",
    body: "Builder and testing use the same parameter editor in two frames: a panel while authoring, a page while tuning, backed by a single working draft. This kills the two-forms-that-drift problem and removes the risk of one surface overwriting the other. What is shared is the form and its state; the testing apparatus wraps around it where relevant.",
    diagram: true,
  },
  {
    number: "04",
    title: "Set weights in one view",
    tag: "Closes:Weights you can't compare",
    body: "Category and parameter weights are relative across siblings, so they belong in a whole-template view, not inside one parameter. Pulling them out of the editor also made the editor identical in both contexts, which is what allowed it to be shared at all.",
    shotKey: "builder",
    shotAlt: "The whole-template view, category and parameter weights read as shares of the score, set where they can be compared.",
  },
  {
    number: "05",
    title: "A capability, not a place",
    tag: "Extends: Reusable for any check",
    body: "Rather than a separate section, each entity hosts testing on its own page under its own URL. That kept the information architecture honest, fixed the breadcrumb, and let the same loop generalise to other check types without reinventing it.",
    shotKey: "test",
    shotAlt: "Test tab, the tuned parameter re-run against the verified calls, reporting pass/fail against ground truth.",
  },
];

const scope = [
  ["120+", "screens"],
  ["20+", "end-to-end product flows"],
  ["~50", "component design system"],
];

const recommendation = [
  "What stood out about Thushara was her ability to bring structure and clarity to ambiguous product problems. She did not just focus on making screens look good; she consistently tried to understand the user, the business context, and the edge cases before arriving at a solution. That mindset made her design work practical, thoughtful, and much easier for engineering to execute. She was especially strong at reducing friction in workflows that could otherwise feel overwhelming to users.",
];

export const CaseStudy1 = () => {
  const { theme } = useTheme();
  const shots = theme === "dark" ? shotsForDarkPage : shotsForLightPage;

  return (
    <main className="testing-flow-case">
      <ScreenshotWall />

      <section style={{ margin: "var(--space-md) 0 var(--space-lg)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))",
            gap: "var(--space-xs)",
            marginBottom: "var(--space-md)",
          }}
        >
          {scope.map(([value, label]) => (
            <div
              key={label}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "10px",
                padding: "var(--space-sm)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.25rem",
                  fontWeight: 500,
                  lineHeight: 1,
                  color: "var(--ink)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-label)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: "var(--space-xs)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <figure
          style={{
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "var(--space-md)",
            margin: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "block",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              lineHeight: 0.6,
              color: "var(--muted)",
              marginBottom: "var(--space-xs)",
            }}
          >
            &ldquo;
          </span>
          <blockquote style={{ margin: 0 }}>
            {recommendation.map((para, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "var(--space-sm) 0 0" }}>
                {para}
              </p>
            ))}
          </blockquote>
          <figcaption
            style={{
              marginTop: "var(--space-sm)",
              paddingTop: "var(--space-sm)",
              borderTop: "1px solid var(--line)",
            }}
          >
            <span style={{ display: "block", fontWeight: 500, color: "var(--ink)" }}>
              Ashit Shrivastava
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-small)",
                color: "var(--muted)",
                marginTop: "4px",
              }}
            >
              Co-Founder, Gistly.ai · managed Thushara directly · Apr 2026
            </span>
          </figcaption>
        </figure>
      </section>

      <CaseRow label="Overview">
        <p>
          For two-plus years I have been Gistly's only designer, shaping most of the product with the founders and the engineering team (dashboards and reporting, the call-review workspace, objects and records, onboarding, and the scoring system) across 20+ end-to-end flows. This case study zooms in on the single hardest one: making the AI's quality scores something non-engineers can actually trust, verifying them when they're right and tuning the rubric when they're not.
        </p>
      </CaseRow>

      <CaseRow label="Context">
        <p>
          The product uses AI to score recorded sales and support calls against quality rubrics. A rubric, a template, is a set of categories and parameters, where each parameter is one question the AI answers about a call: "Did the agent greet the customer professionally?" The people who build and own these rubrics are QA analysts and team leads, not engineers.
        </p>
        <p>
          For the AI's scores to be trusted, those users need to do two things: verify the AI is grading correctly, and tune the rubric when it is not. Designing that testing and tuning experience was my brief.
        </p>
      </CaseRow>

      <CaseRow label="The problem">
        <p>
          Authoring a rubric and testing it had become two disconnected surfaces. In the gap between them, four things were broken.
        </p>
        <ol className="tf-breakdowns">
          {breakdowns.map(([title, body], i) => (
            <li key={title}>
              <span className="tf-bd-index">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <b>{title}</b>
                <span className="tf-bd-desc">{body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: "var(--space-md)" }}>
          And underneath all four sat a number. To verify the AI at any real scale, a human has to confirm the correct answer for each question on each call. With a 100-call sample and 30&ndash;50 parameters, that is thousands of judgments before a single meaningful test can run. If the design did not make that cheap, no one would do it &mdash; and the feature would be theatre.
        </p>
        <figure
          style={{
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "var(--space-md)",
            margin: "var(--space-md) 0 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "var(--ink)",
            }}
          >
            100 calls &times; 30&ndash;50 parameters = thousands of human judgments
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-small)",
              color: "var(--muted)",
              marginTop: "var(--space-sm)",
            }}
          >
            &hellip; before a single meaningful test can run. Designing that cost down was the whole problem.
          </div>
        </figure>
      </CaseRow>

      <section className="testing-flow-row">
        <p className="testing-flow-marker">Constraints</p>
        <div className="testing-flow-copy" style={{ maxWidth: "none" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
              gap: "var(--space-xs)",
            }}
          >
            {constraints.map(([title, body]) => (
              <div
                key={title}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  padding: "var(--space-sm)",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "var(--space-xxs)" }}>
                  {title}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "var(--t-small)", lineHeight: 1.5 }}>
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseRow label="How I approached it">
        <p>
          I studied how developer eval tools structure the tweak, run, grade loop, then reframed it for a non-technical audience. Midway, a senior design review landed with its own recommendations; I treated it as input, not instruction, adopting what held and reconciling what did not against the product's reality. Its draft versus published model, for instance, did not match how calls are actually ingested. Throughout, I surfaced my assumptions and the genuinely open questions rather than designing around them.
        </p>
      </CaseRow>

      <CaseRow label="The key decisions">
        <p className="testing-flow-frame">Five decisions. Four close the breakdowns above; the last makes the whole loop reusable.</p>
      </CaseRow>

      <figure
        style={{
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "var(--space-md)",
          margin: "0 0 var(--space-md)",
        }}
      >
        <figcaption
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "var(--space-sm)",
          }}
        >
          The core loop
        </figcaption>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-xs)" }}>
          {["Author rubric", "Run on real calls", "Verify", "Test", "Tune", "Save version"].map((step, i, arr) => (
            <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xs)" }}>
              <span
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "999px",
                  padding: "0.4rem 0.85rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-small)",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
              {i < arr.length - 1 ? <span aria-hidden="true" style={{ color: "var(--muted)" }}>&rarr;</span> : null}
            </span>
          ))}
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-small)",
            color: "var(--muted)",
            margin: "var(--space-sm) 0 0",
          }}
        >
          Test and Tune repeat until the scores hold. Save publishes a new version, live going forward.
        </p>
      </figure>

      {decisions.map((decision) => (
        <section className="testing-flow-row testing-flow-decision" key={decision.number}>
          <p className="testing-flow-number">{decision.number}</p>
          <div className="testing-flow-copy">
            <p className="testing-flow-tag">{decision.tag}</p>
            <h2>{decision.title}</h2>
            <p>{decision.body}</p>
            {decision.diagram ? <TwoContextsDiagram /> : null}
            {decision.shotKey ? (
              <figure style={{ margin: "var(--space-md) 0 0" }}>
                <img
                  src={shots[decision.shotKey]}
                  alt={decision.shotAlt}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    border: "1px solid var(--line)",
                    borderRadius: "10px",
                  }}
                />
                <figcaption
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    color: "var(--muted)",
                    marginTop: "var(--space-xs)",
                  }}
                >
                  {decision.shotAlt}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </section>
      ))}

      <CaseRow label="Handling ambiguity">
        <p>
          A few decisions hinged on engineering realities I could not assume: whether scoring is versioned, whether test calls exist before a template goes live. Rather than guess, I documented each as an explicit open question with my recommendation and the dependency owner, so the team could resolve them deliberately instead of discovering them in build.
        </p>
      </CaseRow>

      <CaseRow label="Outcome">
        <p>
          The flow was aligned with the founder and engineering and adopted as the build direction: a single coherent loop, author, run, verify, tune, save, that a non-engineer can move through, with the ground-truth burden designed down to confirmations rather than cold labelling. Validation with real QA users and the visual and interaction craft are the next phase; the couple of engineering-gated decisions are documented as such.
        </p>
      </CaseRow>

      <CaseRow label="What I took from it">
        <p>
          The hardest part was not the screens. It was finding the one number, thousands of judgments, that decided whether the feature could work at all, and designing the whole flow around defeating it. In B2B, the best decisions usually come from the second-order consequence of a workflow, not the surface. It also sharpened how I take feedback: keep what holds, reconcile what does not against real constraints, and surface the open questions instead of papering over them.
        </p>
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

// Small schematic for decision 03, one shared draft rendered in two frames.
const TwoContextsDiagram = () => {
  const chip = (label: string, sub: string) => (
    <div
      style={{
        flex: "1 1 0",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        padding: "var(--space-sm)",
      }}
    >
      <div style={{ fontWeight: 600, color: "var(--ink)" }}>{label}</div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--t-small)",
          color: "var(--muted)",
          marginTop: "4px",
        }}
      >
        {sub}
      </div>
    </div>
  );

  return (
    <figure
      aria-hidden="true"
      style={{
        border: "1px solid var(--line)",
        borderRadius: "12px",
        padding: "var(--space-md)",
        margin: "var(--space-md) 0 0",
        display: "grid",
        gap: "var(--space-sm)",
      }}
    >
      <div
        style={{
          border: "1px dashed var(--line)",
          borderRadius: "10px",
          padding: "var(--space-sm)",
          textAlign: "center",
        }}
      >
        <div style={{ fontWeight: 600, color: "var(--ink)" }}>One working draft</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-small)",
            color: "var(--muted)",
            marginTop: "4px",
          }}
        >
          single source of state
        </div>
      </div>
      <div style={{ textAlign: "center", color: "var(--muted)", lineHeight: 1 }}>&darr;</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
        {chip("Panel", "while authoring")}
        {chip("Page", "while tuning")}
      </div>
    </figure>
  );
};
