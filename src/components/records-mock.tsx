import type { CSSProperties } from "react";
import { ArrowDown, ArrowUp, EyeClosed, Filter, Headset, NavArrowDown } from "iconoir-react";

/*
 * The 01 card's cover: Gistly's redesigned records table, drawn in code
 * instead of a screenshot: a glass window of tall rows filling the frame from
 * its bottom-right, and one of the redesign's column menus floating over it.
 * Values are the real table's. Styles are the `.rmock` block in index.css; it
 * is dark glass in both themes and scales with the card, so it stays crisp.
 */

type Tone = "green" | "red" | "amber";

const STATUS: Record<string, Tone> = { Completed: "green", Missed: "red", "Follow-up": "amber" };

// Stand-in names, familiar to a broad audience and none repeated; the values
// beside them are the real table's. Keys are the avatar initials. Avatar
// hues are a warm family built around the portfolio's accent (the terracotta
// is the dark theme's --accent); index.css turns each into a translucent tint
// and initials.
const AGENTS: Record<string, { name: string; color: string }> = {
  AM: { name: "Alex Morgan", color: "#c8643a" }, // terracotta
  PS: { name: "Priya Shah", color: "#d29a3c" }, // ochre
  JL: { name: "Jordan Lee", color: "#c76b7e" }, // dusty rose
  MB: { name: "Maya Brooks", color: "#b9a27a" }, // sand
  CW: { name: "Chris Walker", color: "#a8668f" }, // mauve
};

// [lead, agent, status, quality, intent, disposition]. Twelve rows and six
// columns: enough to run off the frame's bottom and right edges at every
// card shape, the tallest being 4:3 on phones.
const ROWS: [string, string, string, number, string, string][] = [
  ["Sarah Chen", "AM", "Completed", 55, "High", "Interested"],
  ["Marcus Johnson", "PS", "Completed", 82, "High", "Enrolled"],
  ["Emily Carter", "JL", "Missed", 39, "Low", "Wrong number"],
  ["David Kim", "MB", "Follow-up", 72, "Medium", "Callback"],
  ["Olivia Bennett", "PS", "Completed", 77, "High", "Enrolled"],
  ["James Rivera", "JL", "Missed", 36, "Low", "Wrong number"],
  ["Hannah Moore", "JL", "Completed", 80, "High", "Enrolled"],
  ["Daniel Okafor", "MB", "Completed", 86, "Medium", "Callback"],
  ["Sophie Laurent", "CW", "Completed", 71, "Low", "Not interested"],
  ["Ryan Patel", "AM", "Completed", 92, "High", "Enrolled"],
  ["Isabella Rossi", "CW", "Completed", 88, "High", "Interested"],
  ["Owen Hughes", "PS", "Follow-up", 69, "Medium", "Callback"],
];

// `play` starts the loop; until then it waits on its first frame, the wide shot.
export const RecordsMock = ({ label, play }: { label?: string; play?: boolean }) => (
  <div className={`rmock${play ? " is-playing" : ""}`} role="img" aria-label={label}>
    <div className="rmock-stage" aria-hidden="true">
      {/* Everything that zooms: the loop opens on the full table, pushes in,
          opens the Status menu, clicks Hide column and folds the column away,
          then pulls back out and lets it return. */}
      <div className="rmock-camera">
        <div className="rmock-window">
          <div className="rmock-bar">
            <Headset />
            <span className="rmock-title">Calls</span>
            <span className="rmock-count">57</span>
            <span className="rmock-chip">
              All records
              <NavArrowDown />
            </span>
          </div>

          <div className="rmock-row rmock-head">
            <span>Lead</span>
            <span>Agent</span>
            <span>
              Status
              <NavArrowDown />
            </span>
            <span>Quality</span>
            <span>Intent</span>
            <span>Disposition</span>
          </div>

          {ROWS.map(([lead, agent, status, quality, intent, disposition]) => (
            <div className="rmock-row" key={lead}>
              <span>{lead}</span>
              <span className="rmock-agent">
                <span className="rmock-avatar" style={{ "--avatar": AGENTS[agent].color } as CSSProperties}>
                  {agent}
                </span>
                {AGENTS[agent].name}
              </span>
              <span className={`rmock-status is-${STATUS[status]}`}>{status}</span>
              <span className="rmock-num">{quality}</span>
              <span>{intent}</span>
              <span>{disposition}</span>
            </div>
          ))}
        </div>

        {/* The column menu, open on Status: the redesign's controls on the columns.
            It opens, steps down its items and clicks the last on a loop (index.css). */}
        <div className="rmock-menu">
          <span className="rmock-menu-item"><ArrowUp />Sort ascending</span>
          <span className="rmock-menu-item"><ArrowDown />Sort descending</span>
          <span className="rmock-menu-item"><Filter />Filter</span>
          <span className="rmock-menu-rule" />
          <span className="rmock-menu-item"><EyeClosed />Hide column</span>
        </div>
      </div>
    </div>
  </div>
);
