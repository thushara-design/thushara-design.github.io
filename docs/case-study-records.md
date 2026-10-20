# Records — case study draft

Draft copy for a Records case study page. Every product claim below was checked against the Gistly code: PR #48 (merged 29 Jul 2026), plus earlier commits where noted. Usage numbers come from Amplitude. It matches the live page.

---

## Card copy (for `src/data/case-studies.ts`)

- **title:** Redesigning Gistly's records table
- **slug:** records
- **tagline:** DATA TABLE REDESIGN
- **tags:** B2B SaaS · Data tables · Design engineering
- **description:** Rebuilding the table where QA analysts find and track their calls, so they could filter, read and save their work in the product instead of exporting it to Excel.
- **role:** Product design and front-end build
- **timeframe:** 2026
- **tools:** Excel, React, TypeScript, Tailwind, Amplitude
- **responsibilities:** User research, interaction design, visual design, accessibility, front-end build

---

## Overview

Records is where Gistly's QA analysts find the calls, leads and tickets they need to audit. They didn't like working in it. They exported it to Excel instead, where they could filter and sort from the column headers and read every value.

So I rebuilt the table around the habits they already had: controls on the columns, values you can read where they are, saving that doesn't get in the way, and a layout that holds still while you scroll. I designed it and built the front end myself. It shipped in July 2026.

## Context

Records in Gistly are customer-defined. Each customer decides which objects they track, such as calls, leads or tickets, and which fields each one has. So the table has to handle any mix of text, numbers, dates, people, options and AI-generated values.

The people who use it are QA analysts and their leads. It's a small, specialist audience: in the 12 weeks before the revamp, 34 people at 8 customer organisations used Records. They use it to find calls to review and to keep track of audits.

## The problem

What users told us:

- "The bottom drawer for saving is annoying and confusing."
- "We don't know what views are."
- "We just export it to Excel and work there."
- "It's so hard to go through all of it here."
- "It looks so monotonous."

The usage data backed up the third quote. In the 12 weeks before the revamp, 16 of the 34 people using Records exported it to CSV, 153 times. Of the 15 people who kept using Records after the revamp, 12 had exported before it.

The table itself explained the rest:

- **Saving got in the way.** Any change to filters, sorting or columns brought up a bar at the bottom of the screen, on top of the data, asking "Do you want to save this view?" Closing it only hid it until the next change. From "All records" it could only create a new view, never update one.
- **Values were cut off.** Cells stopped at 200 pixels. The only way to read the rest was the browser's own hover tooltip.
- **Every value looked the same.** Emails, dates, statuses and scores were all plain text.
- **Clicking was a trap.** A click anywhere in a row opened the record in a new tab, so trying to read a cell took you somewhere else.
- **Controls were hidden.** Filter, Sort, Export and Columns were unlabelled icons.

## Constraints

- **Any data shape.** Each customer defines its own columns, so every decision had to work for field types I'd never see.
- **Users with a tool they already liked.** The bar wasn't "usable". It was "better than Excel", which they knew well.
- **Shared ownership.** I built the front end and engineering owned the data. The ready-made views and option colours were set up on the backend, with the engineering team.
- **Wide tables on ordinary laptops.** Many customers track dozens of fields.

## Key decisions

### 01 — Controls on every column

I exported the same data to Excel to see how users worked with it there. Everything happened from the column headers: filter, sort, hide. Rather than teach a new model, I used the one they already had.

Every column header now has a menu with Sort ascending, Sort descending, Filter and Hide. Filter opens the same filter builder as the toolbar, already set to that column. The toolbar buttons gained text labels, and Filter shows how many filters are active.

In April I'd already made filtering quicker: picking a field preselects its most likely operator, such as "equals" for text or "is one of" for options, so most filters need only a value.

### 02 — Saving shouldn't interrupt

I replaced the bottom bar with a quiet "Unsaved changes" chip in the toolbar, next to the view name. Hovering over it or focusing it lists what changed: filters added or removed, columns added or hidden. A Save menu offers two clearly described choices: "Save to current view" updates it with the changes, and "Save as new view" keeps the original.

One smaller fix went with it: saving now waits until the columns have loaded, which stops a view being saved with no columns.

### 03 — Teach views by example

"We don't know what views are" told me a better label wouldn't be enough. The easiest way to teach something is with examples, so we added ready-made views built from what users filtered by most often: Today, This week and Red flags only. The usage data agrees: before the revamp, date fields were among the most-filtered fields. We set the views up on the backend, so nobody had to create them.

The Views menu now explains itself too, with a "View:" label, a short description, and a "Default" badge on the view that opens first.

### 04 — Read every value where it is

Each cell is now a button. Clicking it opens a popover with the full value and, for AI-generated fields, the evidence and timestamps behind it. An "Open record" button sits in the same popover, and clicking the record's name opens it directly. Reading and navigating became two separate actions instead of one accidental click.

### 05 — A form for every value

To fix "it looks so monotonous", each type of value got its own treatment:

- Emails with an avatar, links, phone numbers, dates with times, numbers, files and related records.
- Text that looks like an email, URL or date gets the same treatment.
- Options and Yes/No values became coloured badges with a dot. Multi-select fields show two badges and "+N more".
- Empty values show a faint dash instead of a blank, and empty person fields say "Unassigned", so a missing value never looks like a broken one.

### 06 — Colour only with meaning

My rule was that red, amber and green belong only to fields where colour carries meaning, such as status. Everything else gets colours of equal visual weight that just tell options apart.

I first prototyped this as an automatic classifier in the table, which had to guess which fields were statuses. We moved it to the backend instead: each field's options now carry their own colour, set on the backend to that rule. No more guessing, and the same option looks the same everywhere it appears, in the table and on the call page. What stayed in the front end is the safeguard: every badge's text colour adjusts automatically to at least 4.5:1 contrast against its background, in light and dark mode.

### 07 — A table that holds still

Because I was building it, I could fix what made the table feel unstable, not just how it looked:

- Columns have fixed widths by type and rows have a fixed height, so nothing jumps when data loads or scrolls in. Loading placeholders use the same sizes.
- The scrollbar's space is reserved, and scrolling stops at the table's edges instead of dragging the page.
- When you scroll sideways, the app sidebar collapses to give the table more room, and a soft shadow on the pinned name column shows there's more to the left.
- The app header got shorter (56 → 44 px), and option text got larger (14 → 16 px).

## Accessibility

- **Contrast:** badge text adjusts automatically to at least 4.5:1 (WCAG AA) in both themes.
- **Colour is never the only signal:** every badge has a text label next to its dot, and true/false values read "Yes" and "No".
- **Keyboard:** cells are real buttons, so reading a value no longer depends on a mouse-only row click. Header menus, popovers and tooltips work from the keyboard, and the "Unsaved changes" list opens on focus as well as hover.
- **Names for controls:** the toolbar buttons have visible text. Icon-only controls have labels such as "Column options for Status" and "Open record from Name". Decorative icons are hidden from screen readers.

## Outcome

The revamp shipped on 29 July 2026. Comparing the 12 weeks after launch with the 12 weeks before:

- **Records' share of active app users rose 74%, from 5.3% to 9.3%.** Overall app usage fell over the same weeks as the company changed direction, and Records held on to its users far better than the rest of the product: it lost 29% of them, against 59% for the app as a whole.
- **People reached their data through views more often.** Among the QA analysts who used Records both before and after, view switches per visit rose by about a quarter (median 1.00 → 1.24), while filters per visit held steady (0.72 → 0.70). That fits the ready-made views doing their job: people moved between views more, without needing more filters to find what they wanted.
- **About two-thirds of the people who opened Records went on to filter, sort or export.** That was 19 of 29 in the 12 weeks after launch.
- **People took to the column menu.** 5 of the 6 people who sorted after launch used it.
- **Hide from the column menu was barely used** (2 people).

## What I took from it

**Familiar beats clever.** The strongest design input was a spreadsheet users had already chosen over us. Matching its controls needed no explaining.

**Building it changed what I could fix.** Fixed row heights, reserved scrollbar space and scroll limits don't show up in a mockup, but they're most of why a table feels solid. Owning the front end meant I could fix them instead of describing them.

**Put meaning in the data, not the screen.** My first colour classifier guessed which fields were statuses. Storing each option's colour with the field made it right everywhere at once, so the same status looks the same in the table and on the call page.

---

## Shot list

1. **Before/after of the full table** at the same size: plain text and the bottom bar, then typed cells, badges and the labelled toolbar.
2. **The column header menu** open on a field, next to an Excel header filter for comparison.
3. **The "Unsaved changes" chip** with its list open, and the Save menu.
4. **A cell popover** on an AI field, showing the value, evidence and "Open record".
5. **Typed cells close-up:** email with avatar, date with time, badges, "+N more", the dash and "Unassigned".
6. **A short recording of scrolling sideways:** the sidebar collapses and the pinned column's shadow appears.

## Before publishing

- [ ] Confirm the exact names of the ready-made views, and that every customer got them.
- [ ] Say who configured the option colours on the backend.
- [ ] Don't present skeleton screens and loaders as your work. Shishir built the in-table loading placeholders earlier; the revamp only resized them.
- [ ] Don't claim keyboard access is complete. Known gaps: the "…" buttons on rows and views appear only on hover, column resize and reorder are mouse-only, the red-flag label isn't announced by screen readers, and there's no reduced-motion handling.
- [ ] Run the export check before using that Outcome line.
- [ ] Confirm the view and filter medians are for the same [15] people and the same two periods.
- [ ] If asked about the views number: a view selection is also recorded when a default view loads on opening the page, so about 1 per visit is the baseline. The rise to 1.24 is switching on top of that.
- [ ] Blur customer data in screenshots, such as lead IDs, names and university names.
- [ ] Check with Ashit before publishing usage numbers.
