import { useRef, useState, type ReactNode } from "react";
import walkthroughPoster from "../../assets/case-study-records/records-cover.webp";
import { useTheme } from "../../lib/theme";
import beforeTableLight from "../../assets/case-study-records/light/before-table.webp";
import afterTableLight from "../../assets/case-study-records/light/after-table.webp";
import beforeSaveBarLight from "../../assets/case-study-records/light/before-save-bar.webp";
import afterColumnMenuLight from "../../assets/case-study-records/light/after-column-menu.webp";
import afterUnsavedLight from "../../assets/case-study-records/light/after-unsaved.webp";
import afterSaveMenuLight from "../../assets/case-study-records/light/after-save-menu.webp";
import afterViewsLight from "../../assets/case-study-records/light/after-views.webp";
import afterPopoverLight from "../../assets/case-study-records/light/after-popover-intent.webp";
import afterCellsLight from "../../assets/case-study-records/light/after-cells.webp";
import afterColoursLight from "../../assets/case-study-records/light/after-colours.webp";
import afterSidewaysLight from "../../assets/case-study-records/light/after-sideways.webp";
import beforeTableDark from "../../assets/case-study-records/dark/before-table.webp";
import afterTableDark from "../../assets/case-study-records/dark/after-table.webp";
import beforeSaveBarDark from "../../assets/case-study-records/dark/before-save-bar.webp";
import afterColumnMenuDark from "../../assets/case-study-records/dark/after-column-menu.webp";
import afterUnsavedDark from "../../assets/case-study-records/dark/after-unsaved.webp";
import afterSaveMenuDark from "../../assets/case-study-records/dark/after-save-menu.webp";
import afterViewsDark from "../../assets/case-study-records/dark/after-views.webp";
import afterPopoverDark from "../../assets/case-study-records/dark/after-popover-intent.webp";
import afterCellsDark from "../../assets/case-study-records/dark/after-cells.webp";
import afterColoursDark from "../../assets/case-study-records/dark/after-colours.webp";
import afterSidewaysDark from "../../assets/case-study-records/dark/after-sideways.webp";

type ShotKey = "beforeTable" | "afterTable" | "beforeSaveBar" | "afterColumnMenu" | "afterUnsaved" | "afterSaveMenu" | "afterViews" | "afterPopover" | "afterCells" | "afterColours" | "afterSideways";

// Show the opposite-theme screenshot for contrast, as in case study 01:
// dark page -> light-UI shots, light page -> dark-UI shots.
const shotsForDarkPage: Record<ShotKey, string> = {
  beforeTable: beforeTableLight,
  afterTable: afterTableLight,
  beforeSaveBar: beforeSaveBarLight,
  afterColumnMenu: afterColumnMenuLight,
  afterUnsaved: afterUnsavedLight,
  afterSaveMenu: afterSaveMenuLight,
  afterViews: afterViewsLight,
  afterPopover: afterPopoverLight,
  afterCells: afterCellsLight,
  afterColours: afterColoursLight,
  afterSideways: afterSidewaysLight,
};
const shotsForLightPage: Record<ShotKey, string> = {
  beforeTable: beforeTableDark,
  afterTable: afterTableDark,
  beforeSaveBar: beforeSaveBarDark,
  afterColumnMenu: afterColumnMenuDark,
  afterUnsaved: afterUnsavedDark,
  afterSaveMenu: afterSaveMenuDark,
  afterViews: afterViewsDark,
  afterPopover: afterPopoverDark,
  afterCells: afterCellsDark,
  afterColours: afterColoursDark,
  afterSideways: afterSidewaysDark,
};

/** Every screenshot comes from the demo copies of the product, running on made-up data. */
type ShotData = { shot: ShotKey; alt: string; caption: string; maxWidth?: number; flushTop?: boolean };

// maxWidth keeps a small crop at its natural size instead of stretching it soft.
// flushTop drops the top margin when the shot opens its row, so it lines up with the label.
const Shot = ({ shot, alt, caption, maxWidth, flushTop }: ShotData) => {
  const { theme } = useTheme();
  const src = (theme === "dark" ? shotsForDarkPage : shotsForLightPage)[shot];
  return (
    <figure style={{ margin: flushTop ? 0 : "var(--space-md) 0 0" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
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
        {caption}
      </figcaption>
    </figure>
  );
};

const LOOM_ID = "e38c16f92cc04e9089e90438d274d1d2";
// A self-hosted copy of the Loom recording. Loom's own player is ~28 MB of script
// before the video can start; a plain file streams and starts in a second or two.
const WALKTHROUGH_SRC = "/videos/records-walkthrough.mp4";
const WALKTHROUGH_CAPTIONS = "/videos/records-walkthrough.vtt";

// The narration as prose: the captions with fillers and false starts taken out. It's page
// text, so crawlers and readers who skip the video get it too, which the captions file isn't.
const transcript = [
  "Hi, I'm Thushara, and this is the Records table in Gistly, where QA analysts and managers find the calls to audit. I redesigned the table and built the front end using coding agents, and it went from this to this. Here is what I changed and why.",
  "When we looked at our Amplitude data, we found about half of our users were exporting the table to Excel. Users told us the data looks very monotonous, the icons were difficult to understand, and it was very hard to make sense of the data. If you look at this, you can see different data types are shown in a similar way, which makes it difficult, because there's a lot of information here for the user to make sense of. We also noticed that a lot of users were going back to the previous calls page instead of using this new Records page, where we had a lot of advanced features that are more useful for them.",
  "When I started working on this redesign, the first thing I did was try to understand the workflow. I exported the table to Excel and tried to understand how Excel is different from our platform, and I found out that there are more intuitive controls. There's a familiarity principle at play as well, because managers and QA analysts are so used to Excel. So we had to bridge that gap between their existing workflows and our platform.",
  "First, I made the column headers clickable, where they can sort, filter or hide, instead of just relying on the main filter option. I also added labels to the toolbar icons to make their functions clearer and easier to understand.",
  "Next, I focused on views. One of the reviews we got was that views were not understandable at all. So I added this description, but rather than relying on a longer explanation, I wanted to make the feature immediately useful. So I introduced ready-made views, such as Today, This week, Flagged only and Follow-ups, and configured them on the backend. These were very common filtering patterns we identified from our user data. Now users can quickly get to the views they need without having to configure filters every time.",
  "I made sure we use colour very intentionally, because it should communicate meaningful information rather than being just decoration. I also introduced distinct styling for different data types, like user information, email addresses, phone numbers and links, so they're much more distinct from each other. For neutral data types, such as topics, I avoided the semantic colours, so the styling wouldn't imply a level of importance that wasn't actually there. This was configured on the backend so that it's much more flexible, but the design tokens were chosen very intentionally, with accessibility in mind as well.",
  "When I worked on this using coding agents in the front end, I was able to work on minor things, like interactions that were very difficult to explore in Figma. Previously, the table's stability was not that great: when you scrolled up or down, the table moved a lot. So while I was working on this, I was able to work specifically on table stability and on these minor inconveniences, with interactions like the shadow on scroll, and the sidebar that folds so there's more horizontal space. These changes made the experience feel more stable and gave users more room to work with their data.",
  "After the redesign, the share of active users using the Records page increased from 5% to 9%, and we also saw users shift towards saved views rather than manually configuring filters each time. The full write-up is available in the case study. Thank you for watching.",
];

/** Both themes' inline shots, warmed ahead of the case study being opened. */
export const recordsShots = [
  ...Object.values(shotsForDarkPage),
  ...Object.values(shotsForLightPage),
];

/**
 * The narrated walkthrough, recorded on demo data. It sits in the copy column like the
 * rest of the page rather than spanning it, so it doesn't fill the screen; the caption
 * link opens it full size in Loom.
 */
const Walkthrough = () => {
  // The poster and play button show at once, and nothing else loads until someone
  // presses play. The click calls play() itself, so the video starts with sound on
  // every browser, iOS included, which only allows that inside the tap.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
    // Shows up in Clarity alongside the session, so a watch can be told from a skim.
    (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("event", "records-walkthrough-play");
  };
  return (
    // The page's opening block, like the other case studies' first visual: it sits under
    // the hero's divider instead of drawing its own, so there's no doubled line on top.
    <section className="testing-flow-row" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
      <p className="testing-flow-marker">Walkthrough</p>
      {/* Measure cap lifted, as for the homepage heatmaps: the UI needs the whole column to stay legible. */}
      <div className="testing-flow-copy" style={{ maxWidth: "none" }}>
        <figure style={{ margin: 0 }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "53 / 30",
              overflow: "hidden",
              borderRadius: "10px",
              background: "#111111",
            }}
          >
            <video
              ref={videoRef}
              src={WALKTHROUGH_SRC}
              poster={walkthroughPoster}
              preload="none"
              playsInline
              controls={started}
              aria-label="Records redesign walkthrough, about 5 minutes"
              // The frame is the video's own 1908 × 1080, so cover crops nothing from the video;
              // it keeps the 16:10 poster cropped the same as on the play button behind it.
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              {/* Loom's own captions, converted to WebVTT. Off until turned on from the CC button. */}
              <track kind="captions" src={WALKTHROUGH_CAPTIONS} srcLang="en" label="English" />
            </video>
            {started ? null : (
              <button
                type="button"
                className="walkthrough-play"
                onClick={start}
                aria-label="Play the 5-minute walkthrough"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: 0,
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  background: `#111111 url(${walkthroughPoster}) center / cover no-repeat`,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    // Dark, so it reads over both the dark ground and the light table behind it.
                    background: "rgba(17, 17, 17, 0.86)",
                    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.28)",
                  }}
                >
                  <svg width="22" height="24" viewBox="0 0 22 24" fill="#FFFFFF" style={{ marginLeft: "4px" }}>
                    <path d="M0 0 L22 12 L0 24 Z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <figcaption
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-small)",
              color: "var(--muted)",
              marginTop: "var(--space-xs)",
            }}
          >
            A 5-minute walkthrough, recorded on demo data.{" "}
            <a
              className="walkthrough-loom"
              href={`https://www.loom.com/share/${LOOM_ID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Loom →
            </a>
          </figcaption>
          <details className="walkthrough-transcript">
            <summary>Read the transcript</summary>
            {transcript.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </details>
        </figure>
      </div>
    </section>
  );
};

const quotes = [
  "The bottom drawer for saving is annoying and confusing.",
  "We don't know what views are.",
  "We just export it to Excel and work there.",
  "It's so hard to go through all of it here.",
  "It looks so monotonous.",
];

const breakdowns = [
  ["Saving got in the way.", "Any change to filters, sorting or columns brought up a bar at the bottom of the screen, on top of the data, asking \"Do you want to save this view?\" Closing it only hid it until the next change. From \"All records\" it could only create a new view, never update one."],
  ["Values were cut off.", "Cells stopped at 200 pixels. The only way to read the rest was the browser's own hover tooltip."],
  ["Every value looked the same.", "Emails, dates, statuses and scores were all plain text."],
  ["Clicking was a trap.", "A click anywhere in a row opened the record in a new tab, so trying to read a cell took you somewhere else."],
  ["Controls were hidden.", "Filter, Sort, Export and Columns were unlabelled icons."],
];

const constraints = [
  ["Any data shape.", "Each customer defines its own columns, so every decision had to work for field types I'd never see."],
  ["Users with a tool they already liked.", "The bar wasn't \"usable\". It was \"better than Excel\", which they knew well."],
  ["Shared ownership.", "I built the front end and engineering owned the data. The ready-made views and option colours were set up on the backend, with the engineering team."],
  ["Wide tables on ordinary laptops.", "Many customers track dozens of fields."],
];

const decisions: Array<{ number: string; title: string; body: ReactNode[]; list?: ReactNode[]; shots?: ShotData[] }> = [
  {
    number: "01",
    title: "Controls on every column",
    body: [
      "I exported the same data to Excel to see how users worked with it there. Everything happened from the column headers: filter, sort, hide. Rather than teach a new model, I used the one they already had.",
      "Every column header now has a menu with Sort ascending, Sort descending, Filter and Hide. Filter opens the same filter builder as the toolbar, already set to that column. The toolbar buttons gained text labels, and Filter shows how many filters are active.",
      "In April I'd already made filtering quicker: picking a field preselects its most likely operator, such as \"equals\" for text or \"is one of\" for options, so most filters need only a value.",
    ],
    shots: [
      {
        shot: "afterColumnMenu",
        alt: "The Status column's menu open, offering Sort ascending, Sort descending, Filter and Hide.",
        caption: "Every column has its own menu, like a spreadsheet header.",
      },
    ],
  },
  {
    number: "02",
    title: "Saving shouldn't interrupt",
    body: [
      "I replaced the bottom bar with a quiet \"Unsaved changes\" chip in the toolbar, next to the view name. Hovering over it or focusing it lists what changed: filters added or removed, columns added or hidden. A Save menu offers two clearly described choices: \"Save to current view\" updates it with the changes, and \"Save as new view\" keeps the original.",
      "One smaller fix went with it: saving now waits until the columns have loaded, which stops a view being saved with no columns.",
    ],
    shots: [
      {
        shot: "beforeSaveBar",
        alt: "Before: a bar at the bottom of the table asks \"Do you want to save this view?\" with Close and Save as new view, covering the rows beneath it.",
        caption: "Before: any change brought up a bar over the data, and it could only save a new view.",
      },
      {
        shot: "afterUnsaved",
        alt: "After: an \"Unsaved changes\" chip in the toolbar. Hovering over it lists the change: Sort, Status ascending.",
        caption: "After: the chip lists exactly what changed.",
      },
      {
        shot: "afterSaveMenu",
        alt: "The Save menu on the This week view, offering \"Save to current view\" and \"Save as new view\", each with a one-line description.",
        caption: "Two clearly described ways to save.",
      },
    ],
  },
  {
    number: "03",
    title: "Teach views by example",
    body: [
      <>
        "We don't know what views are" told me a better label wouldn't be enough. The easiest way to teach something is
        with examples, so we added ready-made views built from what users filtered by most often: Today, This week and Red
        flags only. The usage data agrees: before the revamp, date fields were among the most-filtered fields. We set
        the views up on the backend, so nobody had to create them.
      </>,
      "The Views menu now explains itself too, with a \"View:\" label, a short description, and a \"Default\" badge on the view that opens first.",
    ],
    shots: [
      {
        shot: "afterViews",
        alt: "The Views menu: a one-line description of views, All Records marked Default, the ready-made views Today, This week and Red flags only, and a saved Follow-ups view.",
        caption: "Ready-made views teach what a view is by being useful.",
        maxWidth: 520,
      },
    ],
  },
  {
    number: "04",
    title: "Read every value where it is",
    body: [
      "Each cell is now a button. Clicking it opens a popover with the full value and, for AI-generated fields, the evidence and timestamps behind it. An \"Open record\" button sits in the same popover, and clicking the record's name opens it directly. Reading and navigating became two separate actions instead of one accidental click.",
    ],
    shots: [
      {
        shot: "afterPopover",
        alt: "A popover on an AI-generated Customer intent cell: the value High, the evidence \"Asked about start dates and payment options without prompting\", two timestamps and an Open record button.",
        caption: "The full value, the AI's evidence with timestamps, and a separate Open record.",
        maxWidth: 424,
      },
    ],
  },
  {
    number: "05",
    title: "A form for every value",
    body: ["To fix \"it looks so monotonous\", each type of value got its own treatment:"],
    list: [
      "Emails with an avatar, links, phone numbers, dates with times, numbers, files and related records.",
      "Text that looks like an email, URL or date gets the same treatment.",
      "Options and Yes/No values became coloured badges with a dot. Multi-select fields show two badges and \"+N more\".",
      "Empty values show a faint dash instead of a blank, and empty person fields say \"Unassigned\", so a missing value never looks like a broken one.",
    ],
    shots: [
      {
        shot: "afterCells",
        alt: "QA analysts shown with avatars or \"Unassigned\", audit times with a clock icon or a faint dash when empty, and customer emails with initials avatars.",
        caption: "People, times and emails each look like what they are, and empty fields say so.",
      },
    ],
  },
  {
    number: "06",
    title: "Colour only with meaning",
    body: [
      "My rule was that red, amber and green belong only to fields where colour carries meaning, such as status. Everything else gets colours of equal visual weight that just tell options apart.",
      <>
        I first prototyped this as an automatic classifier in the table, which had to guess which fields were statuses. We
        moved it to the backend instead: each field's options now carry their own colour, set on the backend to that rule. No more guessing, and the same option looks the same everywhere it appears, in the table and
        on the call page. What stayed in the front end is the safeguard: every badge's text colour adjusts automatically to
        at least 4.5:1 contrast against its background, in light and dark mode.
      </>,
    ],
    shots: [
      {
        shot: "afterColours",
        alt: "Badges in the table: Customer intent in green, amber or grey; Disposition and Topics in light tints of equal weight; a red Yes where a call has a red flag.",
        caption: "Green, amber and red only where they mean something; equal-weight tints everywhere else.",
      },
    ],
  },
  {
    number: "07",
    title: "A table that holds still",
    body: ["Because I was building it, I could fix what made the table feel unstable, not just how it looked:"],
    list: [
      "Columns have fixed widths by type and rows have a fixed height, so nothing jumps when data loads or scrolls in. Loading placeholders use the same sizes.",
      "The scrollbar's space is reserved, and scrolling stops at the table's edges instead of dragging the page.",
      "When you scroll sideways, the app sidebar collapses to give the table more room, and a soft shadow on the pinned name column shows there's more to the left.",
      "The app header got shorter (56 → 44 px), and option text got larger (14 → 16 px).",
    ],
    shots: [
      {
        shot: "afterSideways",
        alt: "The table scrolled sideways: the app sidebar has folded down to icons, and the pinned Calls column casts a soft shadow over the columns scrolled beneath it.",
        caption: "Scrolling sideways folds the sidebar away and shadows the pinned column.",
      },
    ],
  },
];

const accessibility = [
  ["Contrast.", "Badge text adjusts automatically to at least 4.5:1 (WCAG AA) in both themes."],
  ["Colour is never the only signal.", "Every badge has a text label next to its dot, and true/false values read \"Yes\" and \"No\"."],
  ["Keyboard.", "Cells are real buttons, so reading a value no longer depends on a mouse-only row click. Header menus, popovers and tooltips work from the keyboard, and the \"Unsaved changes\" list opens on focus as well as hover."],
  ["Names for controls.", "The toolbar buttons have visible text. Icon-only controls have labels such as \"Column options for Status\" and \"Open record from Name\". Decorative icons are hidden from screen readers."],
];

const stats = [
  ["+74%", "share of active app users using Records (5.3% → 9.3%)"],
  ["+24%", "view switches per visit, same users (median 1.00 → 1.24)"],
  ["2 in 3", "people who opened Records went on to filter, sort or export"],
  ["5 of 6", "people who sorted used the new column menu"],
];

const lessons = [
  ["Familiar beats clever.", "The strongest design input was a spreadsheet users had already chosen over us. Matching its controls needed no explaining."],
  ["Building it changed what I could fix.", "Fixed row heights, reserved scrollbar space and scroll limits don't show up in a mockup, but they're most of why a table feels solid. Owning the front end meant I could fix them instead of describing them."],
  ["Put meaning in the data, not the screen.", "My first colour classifier guessed which fields were statuses. Storing each option's colour with the field made it right everywhere at once, so the same status looks the same in the table and on the call page."],
];

export const CaseStudyRecords = () => {
  return (
    <main className="testing-flow-case">
      <Walkthrough />

      <CaseRow label="Overview">
        <p>
          Records is where Gistly's QA analysts find the calls, leads and tickets they need to audit. They didn't like
          working in it. They exported it to Excel instead, where they could filter and sort from the column headers and
          read every value.
        </p>
        <p>
          So I rebuilt the table around the habits they already had: controls on the columns, values you can read where
          they are, saving that doesn't get in the way, and a layout that holds still while you scroll. I designed it and
          built the front end myself. It shipped in July 2026.
        </p>
      </CaseRow>

      <CaseRow label="Context">
        <p>
          Records in Gistly are customer-defined. Each customer decides which objects they track, such as calls, leads or
          tickets, and which fields each one has. So the table has to handle any mix of text, numbers, dates, people,
          options and AI-generated values.
        </p>
        <p>
          The people who use it are QA analysts and their leads. It's a small, specialist audience: in the 12 weeks before
          the revamp, 34 people at 8 customer organisations used Records. They use it to find calls to review and to keep
          track of audits.
        </p>
      </CaseRow>

      <CaseRow label="The problem">
        <p>What users told us:</p>
        <ul className="testing-flow-list">
          {quotes.map((quote) => (
            <li key={quote}>"{quote}"</li>
          ))}
        </ul>
        <p>
          The usage data backed up the third quote. In the 12 weeks before the revamp, 16 of the 34 people using Records
          exported it to CSV, 153 times. Of the 15 people who kept using Records after the revamp, 12 had exported before
          it.
        </p>
        <p>The table itself explained the rest:</p>
        <ul className="testing-flow-list">
          {breakdowns.map(([title, body]) => (
            <li key={title}>
              <b>{title}</b> {body}
            </li>
          ))}
        </ul>
      </CaseRow>

      {/* Own row with the measure cap lifted: full-table screenshots need the whole column to stay legible. */}
      <section className="testing-flow-row">
        <p className="testing-flow-marker">Before and after</p>
        <div className="testing-flow-copy" style={{ maxWidth: "none" }}>
          <Shot
            flushTop
            shot="beforeTable"
            alt="The table before the redesign: whole cells filled with colour, true and false as plain text, rows of uneven height and icon-only toolbar buttons."
            caption="Before: every value looked the same, rows changed height, and the toolbar was unlabelled icons."
          />
          <Shot
            shot="afterTable"
            alt="The redesigned table: coloured badges with dots, avatars for people, a labelled toolbar, a column menu on every header and a red flag beside the first call."
            caption="After. The screenshots use demo data too."
          />
        </div>
      </section>

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
          Seven decisions, each answering something users said or something the table got wrong.
        </p>
      </CaseRow>

      {decisions.map((decision) => (
        <section className="testing-flow-row testing-flow-decision" key={decision.number}>
          <p className="testing-flow-number">{decision.number}</p>
          <div className="testing-flow-copy">
            <h2>{decision.title}</h2>
            {decision.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {decision.list ? (
              <ul className="testing-flow-list">
                {decision.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
            {decision.shots?.map((s) => <Shot key={s.shot} {...s} />)}
          </div>
        </section>
      ))}

      <section className="testing-flow-row">
        <p className="testing-flow-marker">Accessibility</p>
        <ul className="testing-flow-list">
          {accessibility.map(([title, body]) => (
            <li key={title}>
              <b>{title}</b> {body}
            </li>
          ))}
        </ul>
      </section>

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
                <div style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.05 }}>{value}</div>
                <div style={{ fontSize: "0.85rem", opacity: 0.65, marginTop: "0.35rem" }}>{label}</div>
              </div>
            ))}
          </div>
          <p>
            The revamp shipped on 29 July 2026. These compare the 12 weeks after launch with the 12 weeks before. Overall
            app usage fell over the same weeks as the company changed direction, and Records held on to its users far
            better than the rest of the product: it lost 29% of them, against 59% for the app as a whole. That's why its
            share of active users rose.
          </p>
          <p>
            Among the QA analysts who used Records both before and after, view switches per visit rose by
            about a quarter, while filters per visit held steady (0.72 → 0.70). That fits the ready-made views doing their
            job: people moved between views more, without needing more filters to find what they wanted.
          </p>
          <p>
            About two-thirds of the people who opened Records went on to filter, sort or export: 19 of 29 after launch. Of
            the 6 people who sorted, 5 used the new column menu. Hiding columns from the same menu was barely used, by 2
            people.
          </p>
        </div>
      </section>

      <CaseRow label="What I took from it">
        {lessons.map(([title, body]) => (
          <p key={title}>
            <b>{title}</b> {body}
          </p>
        ))}
      </CaseRow>

      <footer className="testing-flow-foot">
        <span>Case study</span>
        <span>Product design</span>
      </footer>
    </main>
  );
};

const CaseRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="testing-flow-row">
    <p className="testing-flow-marker">{label}</p>
    <div className="testing-flow-copy">{children}</div>
  </section>
);
