
const constraints = [
  ["A category-defining product.", "Nobody searches for \"call-QA AI\", so the page has to teach and sell at the same time."],
  ["Mixed intent.", "Visitors range from \"what even is this\" to \"ready to book a demo\". One page has to serve both."],
  ["A fast, small team.", "The site changes constantly, so the design had to be a durable system, not a one-off layout."],
  ["Honest measurement.", "A lot shipped in the same window, so I could not claim the analytics as design alone."],
];

const decisions = [
  {
    number: "01",
    title: "One clear promise, up top",
    body: "The old page opened with a vague \"empower sales and collections performance.\" The new one leads with what it actually is (AI analytics for sales, support, and collections), so a visitor understands the product in a single line before they scroll.",
  },
  {
    number: "02",
    title: "Outcomes over features",
    body: "The old homepage listed capabilities like a spec sheet: automated auditing, sentiment analysis, transcription. I reframed the top of the page around what you get on day one (concrete results a non-technical buyer recognises), and let the feature detail come later, for the people who want it.",
  },
  {
    number: "03",
    title: "One block per capability",
    body: "Instead of one long undifferentiated scroll, I organised the page into distinct capability blocks (conversation QA, agent assist, voice and chat agents, observability), each self-contained and each with its own call to action, so the page guides the visitor forward rather than dumping everything at once.",
  },
  {
    number: "04",
    title: "Show proof, not just claims",
    body: "A complex, unfamiliar product is bought on trust. I brought customer testimonials and a real product dashboard onto the page, so the value is demonstrated rather than asserted.",
  },
  {
    number: "05",
    title: "A single clear path to action",
    body: "On the old page the primary action competed with exploratory navigation and decorative visuals. I tightened the hierarchy so the demo and the dashboard lead, and the eye is pulled toward acting rather than wandering.",
  },
];

const context =
  "Gistly's homepage is the front door for a hard-to-explain product: AI that scores recorded sales, support, and collections calls against quality rubrics. The people who land on it are QA leads and sales, support, and collections managers, buyers who need to grasp a technical, category-defining product quickly, then be moved toward a demo. The page has to teach and convert at the same time.";

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
      <CaseRow label="Context">
        <p>{context}</p>
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
