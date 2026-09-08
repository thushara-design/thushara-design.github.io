/**
 * Emits crawler-readable static pages for each case study, plus an llms.txt index.
 *
 * Why this exists: the site is a client-rendered SPA, so the HTML actually served
 * is an empty `#root`. Crawlers that don't execute JavaScript (GPTBot among them)
 * received ~65 characters — the <title> and nothing else — which is why ChatGPT
 * could not read any case study.
 *
 * Each page carries the full case study in its markup, so a crawler that reads
 * HTML gets the whole thing, but shows a human only the summary until they
 * unlock it — the same password or share link the site itself takes. That split
 * is declared to Google with paywalled-content structured data
 * (`isAccessibleForFree: false` plus the gated selector), which is the
 * sanctioned way to index gated content rather than cloaking it.
 *
 * The text is therefore readable in page source. That is unavoidable: an LLM
 * crawler and a curious human read the same bytes. The gate stops browsing,
 * not inspection. Content is rendered from the real components, so it cannot
 * drift from the site.
 */
import { createServer } from "vite";
// Imported natively rather than through `ssrLoadModule`: react-dom/server
// resolves to a CJS build that Vite's SSR runner cannot evaluate. Vite
// externalizes `react` for SSR by default, so the components loaded below share
// this same React instance.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist");
const SITE = "https://www.thushara.design";

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The rendered markup carries decorative imagery whose URLs are dev-server paths
 * and whose content is `aria-hidden`. Strip it and keep the meaningful alt text,
 * so what's left is exactly the prose a reader should get.
 */
/**
 * Removes an element and everything inside it, matching the opening tag to its
 * true closing tag by depth.
 *
 * A non-greedy regex cannot do this: it stops at the *first* `</div>`, which
 * deletes the opening tags of a nested subtree and leaves its closers behind.
 * Those orphaned `</div>`s then close whatever wraps the content — which
 * silently unwrapped the gated body and published the whole case study.
 */
function stripElement(html, openPattern) {
  const open = html.search(openPattern);
  if (open === -1) return html;

  const tags = /<(\/?)div\b[^>]*>/g;
  tags.lastIndex = open;
  let depth = 0;
  let tag;
  while ((tag = tags.exec(html))) {
    depth += tag[1] ? -1 : 1;
    if (depth === 0) return html.slice(0, open) + html.slice(tags.lastIndex);
  }
  // Unbalanced markup: drop the remainder rather than emit a broken wrapper.
  return html.slice(0, open);
}

function toReadableHtml(html) {
  // Decorative marquee: aria-hidden, no informational value.
  let out = html;
  while (/<div class="shot-wall"/.test(out)) out = stripElement(out, /<div class="shot-wall"/);

  return out
    // React 19 hoists <link rel="preload"> for those images; they point at
    // dev-server paths and mean nothing in a static text page.
    .replace(/<link\b[^>]*>/g, "")
    // Keep each figure's alt text as a caption; drop the image itself.
    .replace(/<img\b[^>]*\balt="([^"]+)"[^>]*>/g, (_, alt) =>
      alt.trim() ? `<p><em>Figure: ${alt}</em></p>` : "")
    .replace(/<img\b[^>]*>/g, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/g, "")
    .replace(/\s+aria-hidden="true"/g, "");
}

/** Very small HTML→text pass, used only for the llms.txt summaries. */
const toText = (html) =>
  html
    .replace(/<\/(p|h1|h2|h3|li|section|div)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n").map((l) => l.trim()).filter(Boolean).join("\n");

const page = (cs, body, secrets) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(cs.title)} — Thushara, Product Designer</title>
<meta name="description" content="${escape(cs.description)}">
<link rel="canonical" href="${SITE}/case-studies/${cs.slug}.html">
<!-- Index the page, keep the imagery out of Google Images. -->
<meta name="robots" content="noimageindex">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: cs.title,
  description: cs.description,
  author: { "@type": "Person", name: "Thushara Varghese" },
  publisher: { "@type": "Person", name: "Thushara Varghese" },
  mainEntityOfPage: `${SITE}/case-studies/${cs.slug}.html`,
  // Declares the gate to Google. Without this, serving the full text to a
  // crawler while walling the reader would read as cloaking.
  isAccessibleForFree: false,
  hasPart: {
    "@type": "WebPageElement",
    isAccessibleForFree: false,
    cssSelector: ".gated",
  },
})}</script>
<style>
body{max-width:46rem;margin:0 auto;padding:2.5rem 1.25rem;
 font:16px/1.65 system-ui,-apple-system,Segoe UI,sans-serif;color:#1a1a1a;background:#f5f4ef}
h1{font-size:2rem;line-height:1.15;margin:0 0 .5rem}h2{font-size:1.25rem;margin:2rem 0 .5rem}
dt{font-weight:600;margin-top:.5rem}dd{margin:0}em{color:#666}
a{color:#1a1a1a}hr{border:0;border-top:1px solid #ddd;margin:2rem 0}
/* Locked until the script says otherwise, so the body never flashes. */
.gated{display:none}
#gate{border:1px solid #ddd;border-radius:12px;padding:1.5rem;margin:2rem 0;background:#fffdf7}
#gate h2{margin:0 0 .35rem;font-size:1.05rem}
#gate p{margin:0 0 1rem;color:#666;font-size:.9rem}
#gate form{display:flex;gap:.5rem;flex-wrap:wrap}
#gate input{flex:1 1 12rem;padding:.6rem .75rem;border:1px solid #ccc;border-radius:8px;
 font:inherit;background:#fff}
#gate button{padding:.6rem 1.1rem;border:0;border-radius:8px;background:#1a1a1a;color:#f5f4ef;
 font:inherit;cursor:pointer}
#gate .err{display:none;color:#b3261e;font-size:.85rem;margin:.75rem 0 0}
</style>
</head>
<body>
<h1>${escape(cs.title)}</h1>
<p><strong>${escape(cs.tagline || "Case study")}</strong></p>
<p>${escape(cs.extendedDescription || cs.description)}</p>
<dl>
<dt>Role</dt><dd>${escape(cs.role || "—")}</dd>
<dt>Timeframe</dt><dd>${escape(cs.timeframe || "—")}</dd>
<dt>Tools</dt><dd>${escape(Array.isArray(cs.tools) ? cs.tools.join(", ") : cs.tools || "—")}</dd>
<dt>Responsibilities</dt><dd>${escape(
  Array.isArray(cs.responsibilities) ? cs.responsibilities.join(", ") : cs.responsibilities || "—")}</dd>
</dl>

<section id="gate">
<h2>The rest of this case study is private</h2>
<p>Enter the password, or open the link you were sent, to read it in full.</p>
<form>
<input type="password" name="k" placeholder="Password" autocomplete="off"
 autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Password">
<button type="submit">Unlock</button>
</form>
<p class="err">That password isn't right.</p>
<p style="margin:1rem 0 0">Need access? <a href="mailto:thusharavarghese9@gmail.com">Email me</a>.</p>
</section>

<hr>
<div class="gated">
${body}
</div>
<hr>
<p>Thushara Varghese — product designer, B2B SaaS and AI products.
<a href="${SITE}/">Portfolio</a> ·
<a href="https://www.linkedin.com/in/thushara-v">LinkedIn</a></p>

<script>
(function () {
  var PASSWORD = ${JSON.stringify(secrets.password)};
  var TOKENS = ${JSON.stringify(secrets.tokens)};
  var KEY = "tv.access";
  var TTL = 30 * 24 * 60 * 60 * 1000;
  var gate = document.getElementById("gate");
  var err = gate.querySelector(".err");

  // Someone who unlocks here belongs on the designed version of the page, not
  // on this plain one, which exists for crawlers.
  function open() { location.replace("/?ref=${cs.slug}"); }

  function labelFor(hash) {
    if (hash === PASSWORD) return "password";
    for (var i = 0; i < TOKENS.length; i++) if (TOKENS[i].hash === hash) return TOKENS[i].label;
    return null;
  }

  function granted() {
    try {
      var g = JSON.parse(localStorage.getItem(KEY) || "null");
      return !!(g && g.exp > Date.now());
    } catch (e) { return false; }
  }

  function grant(label) {
    try { localStorage.setItem(KEY, JSON.stringify({ label: label, exp: Date.now() + TTL })); } catch (e) {}
    if (window.clarity) window.clarity("event", "unlock-" + label);
  }

  function hash(text) {
    if (!window.crypto || !crypto.subtle) return Promise.reject();
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function attempt(secret) {
    return hash(secret).then(function (h) {
      var label = labelFor(h);
      if (!label) return false;
      grant(label);
      return true;
    }).catch(function () { return false; });
  }

  if (granted()) return open();

  var token = new URLSearchParams(location.search).get("k");
  if (token) {
    attempt(token).then(function (ok) { if (ok) open(); });
  }

  gate.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var value = e.target.elements.k.value;
    if (!value) return;
    attempt(value).then(function (ok) {
      if (ok) return open();
      err.style.display = "block";
      e.target.elements.k.value = "";
    });
  });
})();
</script>
</body>
</html>
`;

const server = await createServer({
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: caseStudies } = await server.ssrLoadModule("/src/data/case-studies.ts");
  // One source of truth for what unlocks a page: the same module the app uses.
  const { PASSWORD_HASH, SHARE_TOKENS } = await server.ssrLoadModule("/src/lib/access.ts");
  const secrets = { password: PASSWORD_HASH, tokens: SHARE_TOKENS };

  await mkdir(path.join(OUT, "case-studies"), { recursive: true });

  const index = [];
  for (const cs of caseStudies) {
    if (!cs.Component) {
      console.log(`  skipped ${cs.slug} (no component)`);
      continue;
    }
    // `useTheme` falls back to its default context value, so no provider is
    // needed here — the components touch no browser globals at module scope.
    const raw = renderToStaticMarkup(createElement(cs.Component));
    const body = toReadableHtml(raw);
    await writeFile(path.join(OUT, "case-studies", `${cs.slug}.html`), page(cs, body, secrets), "utf8");
    const words = toText(body).split(/\s+/).length;
    index.push({ cs, words });
    console.log(`  ${cs.slug}.html — ${words} words`);
  }

  const llms = `# Thushara Varghese — Product Designer

Product designer working on B2B SaaS and AI products. Sole designer at Gistly,
turning an engineer-built AI call-auditing platform into something non-technical
teams can read, trust, and act on. Psychology background.

## Case studies

${index.map(({ cs, words }) =>
  `- [${cs.title}](${SITE}/case-studies/${cs.slug}.html) (${words} words): ${cs.description}`).join("\n")}

## Elsewhere

- Portfolio: ${SITE}/
- LinkedIn: https://www.linkedin.com/in/thushara-v
- Medium: https://medium.com/@thusharavarghese
- Dribbble: https://dribbble.com/thusharadesign
`;
  await writeFile(path.join(OUT, "llms.txt"), llms, "utf8");
  console.log(`  llms.txt — ${index.length} case studies indexed`);
} finally {
  await server.close();
}
