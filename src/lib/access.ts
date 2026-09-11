import { sha256Hex } from "./sha256";

/**
 * Who gets to read the portfolio.
 *
 * Two secrets unlock it, checked the same way: the shared password, typed at
 * the gate, and per-recipient share tokens that unlock from a link alone
 * (`/?k=<token>`), so a company can be sent one URL and nothing else.
 *
 * These hashes ship inside the client bundle, so this is access control, not
 * secrecy — anyone determined can read the page source. It exists to keep the
 * work from being casually browsed, and to record which link was opened.
 *
 * Mint a new share link with `node scripts/make-token.mjs <label>`.
 */

/** SHA-256 of the shared password. Exported so the prerendered pages share it. */
export const PASSWORD_HASH = "020c355824f43c23a61f7fbeb5fde1acdfdf447747b52c670bfd965be7cd9a52";

/**
 * One entry per recipient, so a link can be retired without changing the rest.
 *
 * `intro: true` plays the loading sequence before the work appears, for a link
 * whose first impression matters more than getting straight to the projects.
 */
export const SHARE_TOKENS: ReadonlyArray<{ label: string; hash: string; intro?: boolean }> = [
  { label: "sample", hash: "fbb2ffb6c270632cda747764557e3d611e14dba611dbc49aa86ba7d02cb43e9c" },
  { label: "gistly", hash: "4135d0a942da10d80808b94b9fec1cb9912e225e52548706915b113d857490ac" },
  { label: "showcase", hash: "1ce8980ebe0167061739e034959975a6b21449d16a2e5a586ac1e51ac54f44ba", intro: true },
  { label: "supabase", hash: "57e04f052a3e7851a10862dddd2e4d92dd120b6faa4bad0a7e3172541b24f7cd", intro: true },
];

const STORAGE_KEY = "tv.access";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Grant = { label: string; exp: number };

/** What matched, and how the site should open for it. */
export type Access = { label: string; intro: boolean };

const matchEntry = (hash: string): Access | null => {
  // Typing the password happens *after* the intro has already played, so it
  // never replays it.
  if (hash === PASSWORD_HASH) return { label: "password", intro: false };
  const token = SHARE_TOKENS.find((t) => t.hash === hash);
  return token ? { label: token.label, intro: token.intro === true } : null;
};

async function hashHex(input: string): Promise<string> {
  // `crypto.subtle` is exposed only in a secure context. localhost qualifies,
  // a LAN address over plain HTTP (testing on a phone) does not, so fall back
  // to the local digest rather than rejecting every password there.
  if (!globalThis.crypto?.subtle) return sha256Hex(input);
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const verify = async (input: string) => matchEntry(await hashHex(input));

/** Synchronous twin, used on first paint so a valid `?k=` never flashes the gate. */
export const verifySync = (input: string) => matchEntry(sha256Hex(input));

export function readGrant(): Grant | null {
  try {
    const grant = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Grant | null;
    if (!grant?.exp || grant.exp < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return grant;
  } catch {
    // Private browsing, or storage disabled entirely: treat as locked.
    return null;
  }
}

export function writeGrant(label: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ label, exp: Date.now() + TTL_MS }));
  } catch {
    // Non-fatal: the visit stays unlocked in memory, just not across reloads.
  }
  // Which link was opened, and when. Shows up in Clarity alongside the session.
  (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("event", `unlock-${label}`);
}

/**
 * Reads `?k=<token>` and strips it from the address bar, leaving every other
 * param intact (`?ref=` in particular), so a share link stops looking like one
 * the moment it opens.
 */
export function consumeToken(): string | null {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("k");
  if (!token) return null;
  url.searchParams.delete("k");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  return token;
}
