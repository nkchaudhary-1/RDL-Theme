---
name: rdl-theme
description: Design and build apps in the RonDesignLab (RDL) Dribbble style — soft-gray canvas, white rounded cards, one near-black hero card, a single loud accent (lime by default), big medium-weight numbers, pill controls, hatched bar charts, floating dark tab bar. Use whenever the user asks for the "RDL theme", "RDL style", "RonDesignLab style", or a polished Dribbble-grade fintech, health, logistics, credit, SaaS-dashboard or wellness app/screen/component, and whenever work happens in a project that already uses RDL tokens (tokens.css, RDLTokens.swift, tailwind.preset.js). Covers iOS (SwiftUI), web (HTML/CSS, Tailwind, React), web dashboards and Dribbble-shot presentation.
---

# RDL Theme

A production design system distilled from the RonDesignLab portfolio on Dribbble
(fintech, credit, health, logistics, SaaS dashboards). It gives you tokens, components,
screen archetypes and a QA bar so anything you build reads as "RDL" without copying a shot.

## The RDL DNA — ten rules

1. **Gray canvas, white cards.** Screens sit on `bg-canvas` (#F3F3F5). Content lives on white
   `bg-surface` cards. Separation comes from fill contrast — not borders, not heavy shadows.
2. **One dark hero per screen.** The most important number (balance, revenue, score) goes on a
   near-black `bg-hero` card with a 28pt radius. Exactly one; it anchors the eye.
3. **One accent, used loudly but rarely.** Pick one accent pack per product (lime default). It
   appears on: the primary CTA or the hero's action, the active tab, the highlighted data point,
   and at most one accent card. Everything else is ink + grays.
4. **Numbers are the headline.** Money and metrics are the largest type on screen: 40–56pt,
   weight 500, tight tracking (-3%), tabular figures, decimals de-emphasised (`$48,209.36` with
   `.36` smaller and gray).
5. **Everything is round.** Cards 24 (mobile) / 20 (web), hero 28, inner wells 14, buttons,
   chips, segmented controls, inputs and tab bar are full pills; icon buttons are circles.
6. **Controls invert against their container.** White on the gray canvas, gray inside white
   cards, raised-ink inside the hero. Never gray-on-gray or white-on-white.
7. **Data viz is quiet except for one bar.** Rounded capsule bars on a track. History is muted
   gray, future/projected is 45° hatched, the selected/current value is solid accent with a
   small ink tooltip. Line charts: ink stroke, accent area fade, one accent dot.
8. **Generous, regular spacing.** 4pt grid; 20pt mobile gutters and card padding; 12pt between
   cards; 28pt between sections. Web: 16pt bento gaps, 24pt card padding.
9. **Floating dark tab bar.** Mobile navigation is a pill-shaped ink capsule floating 28pt above
   the bottom edge; the active item sits in an accent circle. Icons only, 1.75 stroke.
10. **Calm type, confident weights.** One grotesk (Inter / SF Pro). Titles 600, numbers 500,
    body 400, secondary text gray-500. No uppercase labels, no letter-spaced overlines.

## Workflow

1. **Classify the request.** Domain (fintech, credit, health, logistics/map, SaaS, crypto,
   wellness, travel) and platform (iOS, web app, web dashboard, Dribbble shot).
   Read `references/domain-playbooks.md` for that domain's accent pack, hero, charts and
   domain components.
2. **Wire the tokens** (never hard-code hex, radius or spacing values):
   - Web: link `assets/tokens/tokens.css` + `assets/templates/rdl-components.css`; set
     `<html data-theme="light|dark" data-accent="lime|violet|orange|ocean|gold">`.
   - Tailwind: import `tokens.css` globally and add `assets/tokens/tailwind.preset.js` to `presets`.
   - SwiftUI: add `assets/ios/RDLTokens.swift` + `assets/ios/RDLComponents.swift`; inject the
     accent with `.rdlAccent(.lime)` at the root. Target iOS 17+.
   - Changing a value? Edit `assets/tokens/tokens.json`, then run
     `node scripts/build_tokens.mjs` (from the skill folder). Never edit generated files.
3. **Pick a screen archetype** from `references/screen-patterns.md` (Home/Wallet, Asset detail,
   Score/Goal, Amount entry → Review → Success, Activity list, Onboarding, Web bento overview,
   Map ops, Table/CRM). Start from its layout; don't invent structure from scratch.
4. **Compose with components** from `references/components.md`. Build domain components on top
   of base components (e.g., a "SIP card" = `rdl-card` + `RDLAmount` + `rdl-progress` + chip),
   never as one-offs.
5. **Cover real states** — loading (skeleton cards in `fill-control`), empty (one line + one
   CTA inside the card), error (inline `danger-soft` banner) — only where the screen has them.
6. **Run `references/qa-checklist.md`** before you present. Render and look at the result when
   you can (the templates render cleanly in Playwright).

For a Dribbble-style presentation image, follow `references/presentation.md`.

## Token quick reference

| Role | Light | Dark | Notes |
|---|---|---|---|
| `bg-canvas` | #F3F3F5 | #0B0B0D | page / screen background |
| `bg-surface` | #FFFFFF | #17171A | cards |
| `bg-hero` | #0B0B0D | #232327 | the one dark card |
| `text-primary` / `secondary` | #0B0B0D / #6E6E78 | #F5F5F7 / #A3A3AD | |
| `accent` (lime) | #CBEF43 | same | text on it is ink (`on-accent`) |
| `accent` violet / orange / ocean / gold | #7152F5 / #F55F24 / #2F66F6 / #DDAE3A | same | |
| `success` / `danger` | #1FB877 / #F0453E | lighter tints | deltas use the `-soft` fill |

| Scale | Values |
|---|---|
| Type | display-xl 56, display 44, h1 32, h2 26, h3 20, title 17, body 15, label 14, caption 12, micro 11 |
| Space | 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 64 |
| Radius | xs 6 · sm 10 · md 14 · lg 20 · xl 24 · 2xl 28 · 3xl 32 · pill |
| Controls | sm 36 · md 44 · lg 56 · icon button 44 · tab bar 64 |
| Motion | fast 120ms · base 200ms · slow 320ms · chart 600ms, 40ms stagger · spring 0.35 / 0.82 |

Full spec and rationale: `references/foundations.md`.

## Signature moves (use at least three per screen)

- Hero balance card: label (muted) → big amount with muted decimals → delta pill + context →
  two pill buttons (accent + raised-ink).
- Quick-action row: 4 circular 56pt icon buttons with 12pt labels beneath.
- Hatched history bars with one accent bar and an ink tooltip bubble.
- Semi-circle gauge (score, goal %) with the number centred on the baseline.
- Segmented pill (1D · 1W · 1M · 1Y · All) with the selected segment in ink.
- Accent "nudge" card at the bottom of a scroll: title + caption + ink circular arrow button.
- 2×2 stat wells (caption label + 17pt value) under a chart.
- Bento dashboard: ink hero KPI spanning 2 columns, one accent KPI, one plain KPI.

## Anti-patterns (these break the look)

- Multiple accents or gradients on one screen; accent-colored body text on white (use `accent-text`).
- Hairline borders around every card; drop shadows on cards sitting on the canvas.
- Small numbers: a balance under 32pt, or bold (700) numerals.
- Square or 8pt-radius cards; rectangular buttons; outline-only primary buttons.
- Colorful charts with a legend of five hues — RDL charts are monochrome + one accent.
- Stock-UI gray list separators everywhere; icons with fills or mixed stroke weights.
- More than one hero card, or a hero card that doesn't hold the screen's key number.

## Files

| Path | Use |
|---|---|
| `references/design-study.md` | Portfolio analysis: shot inventory, recurring patterns, evolution, evidence level |
| `references/foundations.md` | Color, type, spacing, radius, elevation, icons, imagery, motion — with rationale |
| `references/components.md` | Base component specs, states, and how domain components compose from them |
| `references/screen-patterns.md` | Mobile + web screen archetypes with wireframes and state handling |
| `references/domain-playbooks.md` | Per-domain recipes: fintech/wealth/gold, credit, health, logistics, SaaS, crypto, wellness, travel |
| `references/presentation.md` | Dribbble-shot composition (canvas, phones, type, animation) |
| `references/qa-checklist.md` | Pre-delivery review list |
| `assets/tokens/` | `tokens.json` (source), generated `tokens.css`, `tailwind.preset.js` |
| `assets/ios/` | Generated `RDLTokens.swift`, hand-written `RDLComponents.swift` |
| `assets/templates/` | `rdl-components.css`, `mobile-app.html`, `web-dashboard.html` reference builds |
| `scripts/build_tokens.mjs` | Regenerates platform outputs from `tokens.json` |
| `scripts/extract_palette.py` | Calibrates tokens against real shot images (ΔE drift report) |
