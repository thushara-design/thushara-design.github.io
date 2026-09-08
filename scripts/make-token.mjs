/**
 * Mints a share link for one recipient.
 *
 *   node scripts/make-token.mjs acme          -> acme-3f9c21, unguessable
 *   node scripts/make-token.mjs acme peek     -> peek, short enough to say aloud
 *
 * Prints the line to paste into SHARE_TOKENS in src/lib/access.ts and the URL
 * to send. Without a chosen token the label is suffixed with random bytes, so
 * a guessable label doesn't make a guessable link.
 */
import { createHash, randomBytes } from "node:crypto";

const [rawLabel, chosen] = process.argv.slice(2);
if (!rawLabel) {
  console.error("usage: node scripts/make-token.mjs <label> [token]   e.g. acme, or: acme peek");
  process.exit(1);
}

const label = rawLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const token = chosen ? chosen.trim() : `${label}-${randomBytes(3).toString("hex")}`;
const hash = createHash("sha256").update(token).digest("hex");

console.log(`
  Paste into SHARE_TOKENS in src/lib/access.ts:

    { label: "${label}", hash: "${hash}" },

  Then deploy, and send this link:

    https://thushara.design/?k=${token}

  Opening it unlocks the site for 30 days and logs "unlock-${label}" to Clarity.
  Delete the line above to retire the link.
`);
