# Editorial Design System

A complete visual specification for building an entire website in the restrained, Swiss-editorial style of the Templates and Testing documents. It is prescriptive: exact tokens, scales, and rules, so a person or an agent can design any page — landing, case study, docs, about — and have it belong to the same family.

The bar is Pentagram, Instrument, Apple, Linear, Vercel, Base Design, Nordic Symbol. Not "2025 SaaS."

Supersedes the rougher editorial-design.md draft. When the two disagree, this file wins.

---

## 0. North star

Six words govern every decision. When unsure, optimize for these, in this order:

**Quiet · Restrained · Confident · Mathematical · Editorial · Timeless.**

1. The content is the interface. Type, space, and alignment do the work. There is no decoration to hide behind.
2. One gesture per screen. A single oversized element carries a view; everything else recedes. If two things shout, neither lands.
3. Whitespace is a material, not leftover. A section may be half-empty on purpose.
4. Whisper. Less explanation, more trust. Confidence reads as restraint, never as effort.
5. It should look correct in ten years. No trend, effect, or novelty that will date.

---

## 1. Hard rules (the line that holds)

These are not preferences. Breaking one moves the work toward "generic."

**Never:**

- ❌ Gradients, glows, blurred blobs, glassmorphism, drop shadows for "depth."
- ❌ Rounded cards / pill chrome as a default. `border-radius: 0` everywhere unless there is a specific reason.
- ❌ Italics. Emphasize with weight or color, never slant.
- ❌ Loose (positive) tracking on large display type. Big type is tight.
- ❌ More than 3 type families or more than ~4 colors.
- ❌ Scale-up hovers (`scale(1.05)`), bouncy springs, looping animation, parallax.
- ❌ Decorative ampersands in headings — write "and" ("Templates and Testing", not "Templates & Testing").
- ❌ Icons used decoratively, multicolor logos, emoji, skeuomorphism.
- ❌ Pure `#000` / pure `#FFF`. Use the near-black and warm paper below.

**Always:**

- ✅ Tight display tracking, generous vertical space.
- ✅ One restrained accent, on <10% of the surface, if any at all.
- ✅ A strict 8px spatial system and a single repeating macro-gap.
- ✅ Left-aligned, ragged-right text. Never justified.
- ✅ `prefers-reduced-motion` and visible keyboard focus on every interactive element.

---

## 2. Color

A four-color system. The whole site is built from these; an accent is optional and rationed.

| Token | Value | Role | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#F5F4EF` | Warm paper ground | — |
| `--ink` | `#111111` | Primary text, lines of force | 17.15:1 (AAA) |
| `--muted` | `#6B6B6B` | Secondary text, body, labels | 4.84:1 (AA) |
| `--line` | `#E7E7E7` | Hairline separators, borders | 1.12:1 (non-text) |

**Accent — optional, disciplined.** The default system is near-monochrome and looks more expensive for it. If an accent is used, it is one muted hue on one kind of element (a link, a single mark), never a fill across regions. It must clear WCAG AA (≥4.5:1) if it carries text.

- Prefer a deep, slightly desaturated tone: rust `#B0521F` (4.68:1) or oxblood `#7C2D2D`.
- Avoid bright primaries (a pure Swiss-red `#E3000F` reads loud and dates). Muted = expensive.

**Usage ratio** — roughly 90 / 8 / 2. ~90% paper + ink + muted, ~8% structure (lines, secondary), ~2% accent.

**Dark variant** (optional, for a hero or a full dark site). Invert, keep it warm, never pure black: `--bg:#14130F; --ink:#F2F0E9; --muted:#9A968C; --line:#2A2823;`. Re-check accent contrast on the dark ground.

```css
:root{
  --bg:#F5F4EF; --ink:#111111; --muted:#6B6B6B; --line:#E7E7E7;
  --accent:#B0521F;            /* optional; remove if monochrome */
}
```

---

## 3. Typography

Three families, no more. The system lives or dies here.

| Role | Family | Weights used |
|---|---|---|
| Display (headlines, numerals) | Inter Tight | 100 (numerals), 500–550 (headlines) |
| Body / UI | Inter | 400, 500 |
| Mono (labels, code, footnotes, folios) | IBM Plex Mono | 400, (700 for tiny caps labels) |

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Inter:wght@400;500&family=Inter+Tight:wght@100..650&display=swap');
```

### 3.1 The type scale

Fluid via `clamp()`. The ratio between body and display is intentionally violent — that jump is the drama.

| Tier | Size | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|
| Display (1–3 words) | `clamp(6rem,12vw,11rem)` | 550 | 0.88 | −0.06em | The biggest gesture. Stack words, don't center by default. |
| Title (sentence-length) | `clamp(2.6rem,5.2vw,4.75rem)` | 550 | 1.0 | −0.035em | For long headlines a display size can't hold. Max ~18ch. |
| Statement / lead | `clamp(1.75rem,3.2vw,2.6rem)` | 450 | 1.1 | −0.035em | A standalone confident line. Max ~24ch. |
| Hero supporting | `clamp(1.5rem,2.6vw,2.15rem)` | 450 | 1.14 | −0.025em | One sentence under the title. Max ~26ch. |
| Section headline (h2) | `clamp(1.9rem,3.4vw,3rem)` | 550 | 0.95 | −0.04em | Max ~18ch. |
| Folio numeral | `clamp(5rem,11vw,11rem)` | 100 | 0.8 | −0.02em | Hairline. Black (not faint) reads best. Tabular figures. |
| Body | `1.0625rem` (17px) | 400 | 1.62 | −0.01em | Measure 60ch. The workhorse. |
| Small / caption | `0.9375rem` (15px) | 400 | 1.55 | −0.01em | |
| Mono label / eyebrow | `0.72rem` | 700 | 1.2 | +0.08–0.16em, UPPERCASE | Credits, tags, footer. Use sparingly. |
| Footnote (mono) | `0.8125rem` | 400 | 1.6 | +0.01em | Demoted asides live here, not in boxes. |

### 3.2 Rules

- **Tracking is the master lever.** Large → tight negative; small caps/mono → wide positive; body → −0.01em. Never loosen big type.
- **Leading:** display 0.88–1.0 (letters nearly touch across lines); body 1.6–1.62.
- **Case:** sentence case for everything human. UPPERCASE only for tiny mono labels.
- **Figures:** `font-feature-settings:"lnum" 1,"tnum" 1;` on numerals and tables (tabular, lining).
- **Wrapping:** `text-wrap: balance` on headlines, `pretty` on body. Hyphenation off for display.
- **Measure:** body never exceeds 60ch; statements ~24ch; the container is wide, the reading column is not.

---

## 4. Spacing and grid

### 4.1 The 8px system (the only allowed values)

`8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`. No off-grid numbers (180 is not on the grid — don't use it).

```css
:root{
  --s1:8px;  --s2:16px; --s3:24px; --s4:32px; --s6:48px;
  --s8:64px; --s12:96px; --s16:128px; --s20:160px;
}
```

### 4.2 Rhythm — one repeating macro-gap

A legible hierarchy of gaps is what makes spacing feel composed rather than approximate:

- **Macro** — 160px (`clamp(96px,12vw,160px)`): between major sections, after the hero, before the footer. The dominant beat.
- **Group-internal** — 96px (`clamp(64px,8vw,96px)`): between items inside one group (e.g. consecutive numbered sections).
- **Meso** — 64px: inside a section, below a separator rule before content.
- **Headline → paragraph** — 32px; **paragraph → paragraph** — 24px; **micro** — 8/16px.

Rule: space within a group is always smaller than space between groups. Never let two large gaps stack (e.g. a section's bottom padding + the next section's top margin) — pick one.

### 4.3 Grid and container

- **Container:** `max-width: 1400px`, side gutter `clamp(24px,5vw,80px)`.
- **Section grid:** two columns, `minmax(0,1fr) minmax(0,2fr)` — a marker rail (label or folio numeral) on the left, content (≤60ch) on the right. `align-items:start`. Collapses to one column under 760px.
- Align everything to the grid; offset within it for tension, but always snap back.

---

## 5. Layout patterns

The repeatable compositions. A site is assembled from these.

**Hero.** Title (display or title tier) → one supporting sentence → one short paragraph. Nothing else — no kicker, no tags, no buttons row. For a long title, drop to the Title tier. Top/bottom padding = macro gap.

**Marginal-heading section.** The default content block: left rail holds a small label (`--display`, 500, ~17px, ink); right column holds prose at 60ch in `--muted`. Top hairline `--line` + macro gap above. This is the editorial workhorse — it scales to any number of sections.

**Numbered crescendo.** For a sequence of key points: the left rail holds the giant hairline folio numeral; the right holds an h2 + one paragraph. Use group-internal (96px) gaps between them so they read as one set. Reserve numerals for the spine of the page — don't number everything.

**Statement / pause.** Between sections, let a single large statement (lead tier, ~24ch) stand alone with macro space around it. The pause is the design.

**Credits block** (case studies): a 4-up grid of tiny mono labels (Role / Product / Type / Stage) + ink values. Whispers under the title.

**Footer.** A single hairline, then one or two tiny mono lines. No sitemap walls, no social icon rows unless required.

---

## 6. Components

All square-cornered, borderless or hairline, no shadow.

**Navigation.** Thin, quiet. Wordmark left; 2–4 text links; optionally one text CTA. Links in `--ink`, hover → accent or an underline that grows. No background, no shadow — separate from content with space or one hairline. Sticky only if it earns it.

**Buttons and CTAs.**

- Primary is usually text, not a box: `Word →`, ink, with the arrow nudging right on hover. This is the house style.
- If a filled button is genuinely needed: solid `--ink` (or `--accent`) fill, paper text, `border-radius:0`, generous padding (`--s2 --s4`), tonal shift on hover. One per view.
- Secondary: `1px solid --line` or text with arrow. Never two filled buttons competing.

**Cards / panels.** Prefer no card — separate with space and a hairline. When a container is needed: `background:transparent`, `border-top:1px solid --line` (or a full hairline border), padding on the 8px scale, `radius 0`, no shadow. Flat blocks over elevated cards, always.

**Lists.** No bullets by default. Items separated by 16–24px; lead phrase in `--ink` weight 500, rest in `--muted`. For indexes, a hairline between rows is allowed.

**Footnotes / asides.** Mono, 0.8125rem, `--muted`, prefixed `*`. This is where open questions and caveats go — never a colored callout card.

**Tags / badges / meta.** Tiny mono caps (0.68–0.72rem, +0.08em, `--muted`). Used for credits, status, eyebrows. No pill background.

**Forms / inputs.** Border-only — a single bottom `1px solid --line`, no box, no radius. Label above in mono caps or sentence-case `--muted`. Focus → border becomes `--ink`. Padding `--s2`. No placeholder-as-label.

**Tables.** Hairline rules only (`--line`), header row in mono caps `--muted` with a 1.5px solid `--ink` bottom border. Tabular figures. Generous row padding (`--s2/--s3`). No zebra fills.

**Pull statement / blockquote.** A lead-tier line, optionally with a short top hairline. No quotation-mark graphics, no italics.

**Media / figure.** See §8.

---

## 7. Iconography

Icons are functional punctuation, never decoration.

- **Set:** [Iconoir](https://iconoir.com) (`iconoir-react`) — 1,600+ icons, 1.5px stroke, 24px grid, `currentColor`, no fills. One set only; never mix sets on a page.
- **Stroke:** `strokeWidth={1.5}` consistently across all sizes — matches the hairline aesthetic.
- **Sizes:** on the 8px grid — 16 / 20 / 24. Match icon size to the adjacent text's cap height; align optically to the baseline.
- **Color:** inherit via `currentColor` — usually `--ink` or `--muted`; `--accent` only when the icon is the one accent moment on the page.
- **Restraint:** no icon on every nav item or list row. A lone arrow `→` (a Unicode glyph, not an SVG) is often enough.

---

## 8. Imagery

- **Treatment:** prefer high-contrast black-and-white or a two-tone duotone (ink + paper) so images sit inside the palette. Full-color only when the work itself is the subject (e.g. portfolio screenshots).
- **Placement:** full-bleed or snapped to the grid columns. Square corners, no shadow, no border (or one hairline).
- **Aspect ratios:** keep to a small, consistent set (3:2, 4:5, 16:9). Don't mix arbitrarily on one page.
- **Captions:** mono, 0.8125rem, `--muted`, left-aligned under the image.
- **Loading:** reserve space with `aspect-ratio` to prevent layout shift; fade in on load.

---

## 9. Motion and interaction

Subtle, purposeful, single-shot. Motion clarifies; it never performs.

```css
:root{
  --ease: cubic-bezier(.16,1,.3,1);   /* expo-out: fast settle, no bounce */
  --dur-hover: 180ms;
  --dur-enter: 560ms;
}
```

- **Hover** (100–200ms): a link underline grows, an arrow nudges `translateX(6px)`, a tone shifts. No scale, no shadow.
- **Entrance** (~400–640ms): fade + small `translateY(12–16px)`, once, on first reveal. Stagger sibling lines by ~60ms. Never loop.
- **Scroll reveal:** `IntersectionObserver`, `opacity 0→1` + slight rise, unobserve after firing. Keep it barely-there.
- **Transitions:** animate specific properties (`transition: opacity .18s var(--ease), transform .18s var(--ease)`) — never `transition: all`.
- **Focus:** see §10 — focus is interaction, not decoration; it must be visible.
- **Reduced motion:** wrap all of the above so `@media (prefers-reduced-motion:reduce)` drops transforms and transitions, keeping opacity at 1.

```css
@media (prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  [data-reveal]{opacity:1!important;transform:none!important}
}
```

---

## 10. Accessibility (non-negotiable)

- **Contrast:** body/secondary text must clear AA (4.5:1). `--muted` `#6B6B6B` = 4.84:1 ✓. Anything lighter (e.g. `#8A8A8A` = 3.13:1) is large-text or non-essential only. Verify any accent before using it on text.
- **Focus-visible:** every link, button, input, and control shows a clear focus ring — `outline: 2px solid var(--ink); outline-offset: 2px;` (or accent). Never `outline:none` without a replacement.
- **Semantics:** real landmarks (`header`, `nav`, `main`, `footer`), one `h1`, ordered heading levels (don't skip for size — size with CSS).
- **Targets:** interactive hit areas ≥ 44×44px on touch.
- **Images:** meaningful `alt`; decorative images `alt=""`.
- **Motion:** honor `prefers-reduced-motion` (§9). No flashing, no autoplay.

---

## 11. Voice and content

The writing is part of the visual system — restraint in copy reads as confidence on the page.

- **Statement over explanation.** State the decision; let the reasoning live inside the sentence, not in a "Why" box.
- **Sentence case, no jargon, no marketing adjectives.** If a QA lead or a designer wouldn't say it aloud, cut it.
- **Cut labels.** No "THE PROBLEM / OVERVIEW / KEY FEATURES" banners. The marginal heading or the numeral is the label.
- **Numbers are anchors.** A single decisive figure ("thousands of judgments", "5 decisions") earns an oversized numeral.
- **Asides become footnotes, not callouts.** Open questions are a `*` line, not a card.
- **Rhythm:** statement → pause → statement. Short paragraphs. One idea each.

---

## 12. Responsive

- **Breakpoints** (min): `0` (mobile) · `760px` (section grid → two columns) · `1024px` · `1400px` (max container).
- **Type:** every display tier uses `clamp()` and shrinks hardest; the headline stays oversized — it's the point. Reduce gutters to ~5vw, never 0.
- **Layout:** two-column sections collapse to one (label/numeral above content). Folio numerals shrink (e.g. `clamp(4rem,20vw,6rem)`).
- **Targets and spacing:** keep 44px touch targets; macro gaps may step down one level on small screens via the `clamp()` floor.

---

## 13. States

Restraint applies to the unhappy paths too.

- **Loading:** reserve layout with `aspect-ratio`/skeleton hairlines (no shimmer gradients). A brief, optional fade-in. If a spinner is unavoidable, a thin ring in `--ink`, plus visually-hidden "Loading…".
- **Empty:** one quiet line in `--muted` + a single text action. No illustration, no empty-state mascot.
- **Error:** plain sentence in `--ink`, the accent (or a restrained red) only on the word that matters, one recovery action.

---

## 14. Canonical token block (paste-ready)

```css
:root{
  /* color */
  --bg:#F5F4EF; --ink:#111111; --muted:#6B6B6B; --line:#E7E7E7;
  --accent:#B0521F;                 /* optional; delete for monochrome */

  /* type */
  --display:"Inter Tight","Inter",system-ui,sans-serif;
  --sans:"Inter",system-ui,-apple-system,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;

  /* scale */
  --t-display:clamp(6rem,12vw,11rem);
  --t-title:clamp(2.6rem,5.2vw,4.75rem);
  --t-lead:clamp(1.75rem,3.2vw,2.6rem);
  --t-say:clamp(1.5rem,2.6vw,2.15rem);
  --t-h2:clamp(1.9rem,3.4vw,3rem);
  --t-num:clamp(5rem,11vw,11rem);
  --t-body:1.0625rem; --t-small:.9375rem; --t-foot:.8125rem; --t-label:.72rem;

  /* spacing (8px) */
  --s1:8px; --s2:16px; --s3:24px; --s4:32px; --s6:48px;
  --s8:64px; --s12:96px; --s16:128px; --s20:160px;
  --gap-macro:clamp(96px,12vw,160px);
  --gap-group:clamp(64px,8vw,96px);

  /* structure */
  --container:1400px; --gutter:clamp(24px,5vw,80px); --measure:60ch;

  /* motion */
  --ease:cubic-bezier(.16,1,.3,1); --dur-hover:180ms; --dur-enter:560ms;
}
*{box-sizing:border-box;border-radius:0}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);
  font-size:var(--t-body);line-height:1.62;letter-spacing:-.01em;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
```

---

## 15. Component CSS starter

```css
.wrap{max-width:var(--container);margin:0 auto;padding:0 var(--gutter)}

/* hero */
.hero{padding:var(--gap-macro) 0}
.hero h1{font-family:var(--display);font-weight:550;font-size:var(--t-display);
  line-height:.88;letter-spacing:-.06em;margin:0;text-wrap:balance}

/* section row: marker rail + content */
.row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:clamp(24px,4vw,64px);
  align-items:start;border-top:1px solid var(--line);
  margin-top:var(--gap-macro);padding-top:var(--s8)}
.row.group{margin-top:var(--gap-group)}
.mk{font-family:var(--display);font-weight:500;font-size:1.0625rem;letter-spacing:-.01em;margin:0}
.num{font-family:var(--display);font-weight:100;font-size:var(--t-num);
  line-height:.8;letter-spacing:-.02em;margin:-.06em 0 0;font-feature-settings:"lnum" 1,"tnum" 1}
.col h2{font-family:var(--display);font-weight:550;font-size:var(--t-h2);
  line-height:.95;letter-spacing:-.04em;margin:0;max-width:18ch}
.col p{max-width:var(--measure);color:var(--muted);line-height:1.62}
.col h2+p{margin-top:var(--s4)} .col p+p{margin-top:var(--s3)}

/* text CTA */
.cta{font-family:var(--display);font-weight:500;font-size:var(--t-say);letter-spacing:-.025em;
  color:var(--ink);text-decoration:none;display:inline-flex;gap:14px;align-items:baseline;
  border-bottom:1px solid transparent;transition:border-color var(--dur-hover) var(--ease)}
.cta .arw{display:inline-block;transition:transform var(--dur-hover) var(--ease)}
.cta:hover{border-color:var(--ink)} .cta:hover .arw{transform:translateX(8px)}

/* footnote */
.note{font-family:var(--mono);font-size:var(--t-foot);letter-spacing:.01em;color:var(--muted);max-width:var(--measure)}

/* focus */
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid var(--ink);outline-offset:2px}

/* reveal */
[data-reveal]{opacity:0;transform:translateY(14px)}
[data-reveal].in{opacity:1;transform:none;transition:opacity var(--dur-enter) var(--ease),transform var(--dur-enter) var(--ease)}
@media (prefers-reduced-motion:reduce){[data-reveal]{opacity:1;transform:none;transition:none}}

@media (max-width:760px){ .row{grid-template-columns:1fr;gap:var(--s2)}
  .num{font-size:clamp(4rem,20vw,6rem)} }
```

---

## 16. Definition of done

- [ ] At most 3 type families; at most ~4 colors; one accent on <10% (or none).
- [ ] Display type tight (−0.04 to −0.06em); body at −0.01em; no italics anywhere.
- [ ] Every spacing value is on the 8px scale; one repeating macro-gap; no stacked double-gaps.
- [ ] `border-radius:0`; no gradients, shadows, glass, glow.
- [ ] One dominant element per view; at least one large intentional empty area.
- [ ] Body measure ≤ 60ch; container ≤ 1400px.
- [ ] Folio numerals are hairline (weight 100), tabular, reserved for the page's spine.
- [ ] Focus-visible on all controls; AA contrast verified; landmarks + ordered headings.
- [ ] Motion is single-shot, specific-property, expo-out, reduced-motion-safe; no scale hovers.
- [ ] Copy states rather than explains; asides are footnotes, not cards.
- [ ] Would still look right in ten years.

---

## Sources

- Iconoir — stroke width and icon design · [iconoir.com](https://iconoir.com)
- 5 Rules for Motion in UI Transitions — Equal
- Motion UI and micro-interactions, 2025
- WCAG 2.1 contrast (AA 4.5:1) — ratios computed for this palette: ink 17.15:1, muted 4.84:1, rust accent 4.68:1.
- Live reference implementations: `templates-testing-proposed-flow.html`, `case-study-testing-tuning-flow.html`.
