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

/** One entry per recipient, so a link can be retired without changing the rest. */
export const SHARE_TOKENS: ReadonlyArray<{ label: string; hash: string }> = [
  { label: "sample", hash: "fbb2ffb6c270632cda747764557e3d611e14dba611dbc49aa86ba7d02cb43e9c" },
  { label: "gistly", hash: "4135d0a942da10d80808b94b9fec1cb9912e225e52548706915b113d857490ac" },
];

const STORAGE_KEY = "tv.access";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Grant = { label: string; exp: number };

/** The name of whatever matched, used as the analytics label. */
const matchLabel = (hash: string): string | null => {
  if (hash === PASSWORD_HASH) return "password";
  return SHARE_TOKENS.find((t) => t.hash === hash)?.label ?? null;
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

export const verify = async (input: string) => matchLabel(await hashHex(input));

/** Synchronous twin, used on first paint so a valid `?k=` never flashes the gate. */
export const verifySync = (input: string) => matchLabel(sha256Hex(input));

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
