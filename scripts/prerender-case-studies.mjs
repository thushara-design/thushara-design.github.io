/**
 * Emits crawler-readable static pages for each case study, plus an llms.txt index.
 *
 * Why this exists: the site is a client-rendered SPA, so the HTML actually served
 * is an empty `#root`. Crawlers that don't execute JavaScript (GPTBot among them)
 * received ~65 characters — the <title> and nothing else — which is why ChatGPT
 * could not read any case study.
 *
 * These pages are plain, ungated HTML at their own URLs. The password gate is
 * client-side JS, so it never applied to crawlers anyway; publishing here simply
 * makes that explicit rather than accidental. Content is rendered from the real
 * components, so it cannot drift from the site.
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
function toReadableHtml(html) {
  return html
    // Decorative marquee: aria-hidden, no informational value.
    .replace(/<div class="shot-wall"[\s\S]*?<\/div>\s*(?=<)/g, "")
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

const page = (cs, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(cs.title)} — Thushara, Product Designer</title>
<meta name="description" content="${escape(cs.description)}">
<link rel="canonical" href="${SITE}/case-studies/${cs.slug}.html">
<style>
body{max-width:46rem;margin:0 auto;padding:2.5rem 1.25rem;
 font:16px/1.65 system-ui,-apple-system,Segoe UI,sans-serif;color:#1a1a1a;background:#f5f4ef}
h1{font-size:2rem;line-height:1.15;margin:0 0 .5rem}h2{font-size:1.25rem;margin:2rem 0 .5rem}
dt{font-weight:600;margin-top:.5rem}dd{margin:0}em{color:#666}
a{color:#1a1a1a}hr{border:0;border-top:1px solid #ddd;margin:2rem 0}
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
<hr>
${body}
<hr>
<p>Thushara Varghese — product designer, B2B SaaS and AI products.
<a href="${SITE}/">Portfolio</a> ·
<a href="https://www.linkedin.com/in/thushara-v">LinkedIn</a></p>
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
    await writeFile(path.join(OUT, "case-studies", `${cs.slug}.html`), page(cs, body), "utf8");
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
