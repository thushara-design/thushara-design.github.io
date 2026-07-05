const credits = [
  ["Role", "Product Designer, sole designer"],
  ["Product", "AI-powered B2B call-QA platform"],
  ["Type", "End-to-end flow and IA design"],
  ["Stage", "Aligned and documented; build in progress"],
];

const constraints = [
  ["Non-engineer users.", "No jargon; it had to read like QA work, not tooling."],
  ["A novel problem with no clean precedent.", "The closest analogues were developer eval tools, none built for a QA lead."],
  ["A fast, lean team.", "Designs had to be decisive and clearly reasoned to move."],
  ["Correctness-critical.", "This is the scoring engine; a confusing tuning flow risks wrong scores reaching customers."],
];

const decisions = [
  {
    number: "01",
    title: "Author first, test later",
    body: "Users author a rubric, run it on real calls, and only then tune when results look wrong. So a new template opens in a fast side panel for quick authoring; once it has run, each parameter gets its own page where testing lives. Testing actions do not appear until there is something to test, which keeps a first-timer's path simple. The tradeoff: a quick edit on a live parameter now costs a navigation. I judged the consistency worth it.",
  },
  {
    number: "02",
    title: "Make ground truth cheap",
    body: "Instead of labelling from a blank slate, the system auto-seeds a small set of recently evaluated calls, pre-fills the AI's answers, and asks the reviewer only to confirm or correct them. Verification becomes a quick pass, not thousands of cold judgments: the difference between the feature being usable and abandoned.",
  },
  {
    number: "03",
    title: "One editor, two contexts",
    body: "Builder and testing use the same parameter editor in two frames: a panel while authoring, a page while tuning, backed by a single working draft. This kills the two forms that drift problem and removes the risk of one surface overwriting the other. What is shared is the form and its state; the testing apparatus wraps around it where relevant.",
  },
  {
    number: "04",
    title: "Weights where they are decided",
    body: "Category and parameter weights are relative across siblings, so they belong in a whole-template view, not inside one parameter. Pulling them out of the editor also made the editor identical in both contexts, which is what allowed it to be shared at all.",
  },
  {
    number: "05",
    title: "Testing as a capability, not a place",
    body: "Rather than a separate section, each entity hosts testing on its own page under its own URL. That kept the information architecture honest, fixed the breadcrumb, and let the same loop generalise to other check types without reinventing it.",
  },
];

export const CaseStudy1 = () => {
  return (
    <main className="testing-flow-case">
      <header className="testing-flow-hero">
        <h1>Designing a testing and tuning flow that lets non-engineers trust AI scoring</h1>
        <dl className="testing-flow-credits">
          {credits.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

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
          Authoring a rubric and testing it had become two disconnected surfaces. A parameter could be edited in the builder and again on a separate testing page: two forms that drifted apart. It was unclear when testing even applied, scoring weights were buried inside a per-parameter editor where you could not compare them, and, most importantly, there was no honest way to establish ground truth: the correct answer to each question, which is the thing every test has to measure against.
        </p>
        <p>
          The deeper problem was a number. To verify the AI at any real scale, a human has to confirm the correct answer for each question on each call. With a 100-call sample and 30-50 parameters, that is thousands of human judgments before a single meaningful test can run. If the design did not make that cheap, no one would do it, and the feature would be theatre.
        </p>
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

      <CaseRow label="How I approached it">
        <p>
          I studied how developer eval tools structure the tweak, run, grade loop, then reframed it for a non-technical audience. Midway, a senior design review landed with its own recommendations; I treated it as input, not instruction, adopting what held and reconciling what did not against the product's reality. Its draft versus published model, for instance, did not match how calls are actually ingested. Throughout, I surfaced my assumptions and the genuinely open questions rather than designing around them.
        </p>
      </CaseRow>

      <CaseRow label="The key decisions">
        <p className="testing-flow-frame">Five decisions, each resolving one of the disconnects above.</p>
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
