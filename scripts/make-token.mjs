/**
 * Mints a share link for one recipient.
 *
 *   node scripts/make-token.mjs acme
 *
 * Prints the line to paste into SHARE_TOKENS in src/lib/access.ts and the URL
 * to send. The token is random, so the label being guessable doesn't matter.
 */
import { createHash, randomBytes } from "node:crypto";

const raw = process.argv.slice(2).join(" ").trim();
if (!raw) {
  console.error("usage: node scripts/make-token.mjs <label>   e.g. acme, linear, oct-recruiter");
  process.exit(1);
}

const label = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const token = `${label}-${randomBytes(3).toString("hex")}`;
const hash = createHash("sha256").update(token).digest("hex");

console.log(`
  Paste into SHARE_TOKENS in src/lib/access.ts:

    { label: "${label}", hash: "${hash}" },

  Then deploy, and send this link:

    https://www.thushara.design/?k=${token}

  Opening it unlocks the site for 30 days and logs "unlock-${label}" to Clarity.
  Delete the line above to retire the link.
`);
