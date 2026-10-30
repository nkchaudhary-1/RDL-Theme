---
name: rdl
description: RDL — design and build apps in the RonDesignLab (RDL) style, with a measured layout system and an automated UI audit. The default "glass" language (2025–26) has frosted glass over photos, 3D renders and soft gradient auras; huge light numerals with small muted units; dot-matrix figures; orbs, pills and circle–pill–circle action rows; tick-ruler and hairline instruments; status dots; line-art and blueprint illustration. Three themes: Light, Dark and Brand (the user picks a primary and a secondary colour; every role is derived and contrast-checked). There is also a "flat" fintech style (v1). Use whenever the user asks for the "RDL theme/style", "RonDesignLab style", or a Dribbble-grade minimal fintech, wealth/gold, health, energy, logistics, industrial/IoT, property or SaaS app, screen, dashboard or shot, and whenever a project already uses RDL tokens (tokens.css, RDLTokens.swift, tailwind.preset.js). Covers SwiftUI, HTML/CSS, Tailwind/React, web dashboards and portfolio presentation. This single file holds the complete RDL skill: guide plus all code.
---

# RDL · v4.0.0

The complete RDL design skill in one file: the RonDesignLab-style design system distilled from
the 219-frame board, with three themes (Light, Dark, Brand from your primary + secondary colour), a
measured layout system, concentric corner radius, component anatomy, usage guidelines, screen
archetypes, domain playbooks, QA, and all source code.

**How to use this file**
- **Designing or reviewing:** read Part 1 (§1–§14).
- **Building:** copy the code you need from Part 2. Each appendix heading is the path to save it at
  inside a skill folder (`assets/…`, `scripts/…`). Saved together, they reproduce the full skill, so
  every path mentioned in the guide (for example `scripts/audit_ui.mjs`) works as written.
- **Changing values or adding a brand pair:** edit Appendix A (`tokens.json`), then run Appendix C (`build_tokens.mjs`).
- **Any two colours at runtime:** Appendix M (`RDL.setTheme("brand", { primary, secondary })`) or Appendix N (`RDLTheme.apply(.brand(...))`).
- **Example screens:** the mobile, dashboard, themes and flat templates live in the source skill
  (`skills/rdl-theme/assets/templates/`); this file keeps the radius demo (L) and the theme studio (O).

## Contents

| § | Section | What it covers |
|---|---|---|
| 1 | Overview | DNA, layout in 60 seconds, workflow, token quick reference, signature moves, anti-patterns |
| 2 | Foundations | Themes and attributes, color layers, neutrals, secondary and primary colours, auras, materials, status, type, motion |
| 3 | Themes: Light, Dark, Brand | Light, Dark and Brand: the two colours, setting a theme, the brand algorithm, contrast, states, elevation, rules |
| 4 | Token reference | Every role with its value per theme, scales, component tokens, presets, v3 aliases (generated) |
| 5 | Layout and spacing | Spacing ladder, mobile skeleton, web grid, alignment, control heights, radius summary |
| 6 | Corner radius | Radius scale, concentric nesting, A · strict vs B · soft, procedure, code, audit |
| 7 | Guidelines | Hierarchy, type rules, color budget, app-wide consistency, minimalism, content |
| 8 | Component anatomy | Exact specs for every component and layout primitive |
| 9 | Components | Component catalog (web class ↔ SwiftUI type), SVG patterns, compositions |
| 10 | Screen patterns | Skeleton, glass G1–G8 and W5–W7, flat M1–M7 and W1–W4 |
| 11 | Domain playbooks | Wealth/gold/SIP/lease, banking, health, energy, logistics, industrial… |
| 12 | Shot presentation | Dribbble shot composition: hands, depth of field, angled devices |
| 13 | QA checklist | Pre-delivery review, including the automated audit |
| 14 | Design study | Board analysis, 20 structural rules, v1 → v3 |
| A | `assets/tokens/tokens.json` | Source of truth for every token. Edit, then run Appendix C. |
| B | `assets/tokens/tokens.css` | Generated CSS custom properties: themes, styles, accents, auras, type classes. |
| C | `scripts/build_tokens.mjs` | Regenerates Appendix B, D, E and §3 from Appendix A, using the engine in Appendix M. Fails if any contrast pair misses. |
| D | `assets/tokens/tailwind.preset.js` | Generated Tailwind preset wired to the CSS variables. |
| E | `assets/ios/RDLTokens.swift` | Generated SwiftUI tokens. |
| F | `assets/templates/rdl-components.css` | Web component layer: part 1 base, part 2 glass, part 3 layout + concentric nesting. |
| G | `assets/ios/RDLComponents.swift` | SwiftUI base components. |
| H | `assets/ios/RDLGlassComponents.swift` | SwiftUI glass components. |
| I | `assets/ios/RDLLayout.swift` | SwiftUI layout primitives, metric tile, fields, sheet, radius helpers. |
| J | `scripts/audit_ui.mjs` | Playwright UI audit (needs Appendix A next to it at ../assets/tokens/tokens.json). |
| K | `scripts/extract_palette.py` | Pixel-calibrates tokens against exported shots. |
| L | `assets/templates/radius-demo.html` | Interactive corner-radius demo. Opens on its own in any browser. |
| M | `assets/tokens/rdl-theme.js` | Theme engine and browser runtime: brand roles from two colours, accent roles, contrast audit, RDL.setTheme(). |
| N | `assets/ios/RDLThemeEngine.swift` | SwiftUI port of Appendix M plus RDLTheme (apply, colour resolution, .rdlThemedRoot()). |
| O | `assets/templates/theme-studio.html` | Live primary/secondary picker: Light, Dark and Brand side by side, every role, live audit. Needs Appendices B, F and M at their paths. |

# Part 1 · Guide

## 1. Overview

A production design system distilled from three passes over the 219 RonDesignLab board frames:
- **Style pass:** §14 (Design study).
- **Structure pass:** `research/deep-scan.md`.
- **Theme pass:** `research/theme-scan.md`, plus pixel calibration (`research/calibration.md`).

Structure follows Apple HIG, Material 3, Radix Colors and Primer (`research/standards.md`): semantic roles
named `category-role-variant-state`, 12-step neutral scales, state layers, materials, elevation levels
and contrast minimums. Measured layout rules, component anatomy, usage budgets and an audit script make
screens **consistent, minimal and well spaced** by construction.

**Three themes** (§3 (Themes: Light, Dark, Brand)), one markup:

| Theme | Canvas | Primary action | Highlight |
|---|---|---|---|
| **Light** | warm neutral `#F0F0EF`, white cards | ink | the secondary colour |
| **Dark** | near-black `#0A0B0C`, lighter cards | white | the secondary colour |
| **Brand** | **the user's primary colour**, tinted-glass cards | ink or white by contrast | the secondary colour |

The user chooses the primary and secondary. Every role is derived from them by one engine
(`assets/tokens/rdl-theme.js`, ported to Swift) and checked against WCAG/HIG minimums. The build fails
if any pair misses.

### The RDL DNA

1. **One focus.** Each screen has one hero: a huge light numeral (300, 56–96) or a 3D object.
   Everything else is quieter, led by size, weight and tone, not color.
2. **Glass over something.** Frosted panes sit over a photo, render, map, aura or fog. Dark glass
   needs a dark backdrop; on light canvases, use an ink surface.
3. **Numbers whisper, units murmur.** Units and currency are 38% size in secondary gray,
   decimals and leading zeros are muted, and at most one dot-matrix figure per screen.
4. **Corner-anchored cards.** Label top-left, action top-right, figure bottom-left, context
   bottom-right, with an optional instrument between.
5. **Circles and pills.** Orbs (48, or 56 in action rows), pills, a circle–pill–circle action row,
   slide-to-confirm and a glass dock. The Swiss variant is radius 0 everywhere and never mixed.
6. **One highlight, spent 1–3×.** The secondary colour goes on the active dock/orb, a needle or
   selected datum, one tag, or check marks (`accent` with a label, `accent-graphic` alone). Colour
   otherwise lives in auras (≤ 2 per screen), a brand panel, or the whole canvas in the Brand theme.
7. **Instruments, not charts.** Tick rulers, 2pt meters, hairline bars with one lit, window
   curves with glass beads, month grids, beaded arcs.
8. **Status is a dot plus a word.** Soft-tint pills are for escalations only. Destructive actions
   use a red-tinted tile, never a red solid.
9. **Measured space.** Use the 4pt ladder by relationship (4 < 8 < 12 < 20 < 32), one control
   height per row, and concentric corners (inner radius = outer − gap; to go deeper use A · strict,
   halving the padding, or B · soft, radius − padding/2; never clamp). See §6 (Corner radius).
10. **Technical illustration and photographic presentation.** Blueprints, line-art, selective
    color; hands, angled devices and depth-of-field shots.

### Layout in 60 seconds (§5 (Layout and spacing))

```
status bar
 8   ┌ header row: every item 48 ───────────────┐
24   │ title block (h1 34 / display 56, light)   │
32   │ content: cards 12 apart, padding 20       │
     │ sections 32 apart · margins 20            │
≥120 │ (clear)                                   │
     └ pinned: action row 56 · slide 64 · dock 64, 34 from bottom
```
- **Spacing:** 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80. Label→value 4, group 8,
  inside a card 12–16, card padding 20, card gap 12, header→title 24, section 32.
- **Controls:** tag 24 · 32 · 40 · **48** (header, orbs, fields) · **56** (primary pill) · **64**
  (slide, dock).
- **Radius:** 8 · 12 · 14 (tile) · 16 · 20 · 24 · **28 card** · 32 · **40 widget** · 48 sheet · pill.
  Nested: inner = outer − gap (padding + border). Chains: 48→28→16→8, 40→20, 28/12→16. Going
  deeper? **A · strict** halves the padding (concentric, default); **B · soft** keeps the padding and
  subtracts half of it (even bands). Never clamp. Web `.rdl-nest` / `.rdl-nest--soft` + `--host`;
  SwiftUI `RDLRadius.nested(…, method:)`. Full guide §6 (Corner radius); live demo
  `assets/templates/radius-demo.html`.
- **Web:** 12 columns, gutter 32, bento gap 12, equal row heights, every cell at the card radius.

### Workflow

1. **Classify.** Identify the domain (§11 (Domain playbooks)), platform and style (glass
   by default; flat if there's no imagery; Swiss for industrial or editorial). Ask for (or pick) the
   **primary and secondary colours** and which **themes** ship (light + dark by default; brand for
   brand-led screens). Pick the backdrop.
2. **Lock the app-level decisions** (§7.5): the header pattern per
   role, the pinned zone per role, the figure treatment, the radius family and the icon set.
   Every later screen reuses them. Structurally similar flows (SIP ↔ Lease) share one template.
3. **Wire the tokens.** Never hard-code hex, size, radius or blur values.
   - **Web:** `assets/tokens/tokens.css` + `assets/templates/rdl-components.css`, with Urbanist
     (300–700) and Doto (700). Set `<html data-theme="light|dark|brand" data-brand data-accent data-style>`.
     Custom colours at runtime: `assets/tokens/rdl-theme.js` → `RDL.setTheme("brand", { primary, secondary })`.
   - **Tailwind:** use `assets/tokens/tailwind.preset.js` (utilities follow the theme).
   - **SwiftUI (iOS 17+):** add `RDLTokens.swift`, `RDLThemeEngine.swift`, `RDLComponents.swift`,
     `RDLGlassComponents.swift` and `RDLLayout.swift`. Call
     `RDLTheme.apply(.brand(primary:secondary:))` (or `.light`, `.dark`, `.system`) and use
     `.rdlThemedRoot()` at the root.
   - **Use v4 roles** (§4 (Token reference)): `bg-*`, `fg-*`, `fill-*`, `border-*`, `action-*`,
     `accent*`, status, `material-*`. Never primitives or hex in UI code.
   - **Adding a brand pair:** add it to `tokens.json → brand.presets`, run `node scripts/build_tokens.mjs`
     (it regenerates CSS, Tailwind, Swift, §4 (Token reference) and the contrast report).
4. **Pick an archetype** (§10 (Screen patterns)) and build on the skeleton:
   - Web: `.rdl-screen` → `.rdl-header` → `.rdl-stack--*` → `.rdl-pin`.
   - SwiftUI: `RDLScreen` → `RDLHeader` → `VStack(spacing: RDLSpace.…)` → `pinned:`.
5. **Compose from components** (§9 (Components); exact specs in
   §8 (Component anatomy)). The recipe is surface + figure + instrument + context + one action.
   The default card is `.rdl-metric` / `RDLMetricTile`. Never invent one-off styles.
6. **Design the real states**: loading skeleton at final size, empty (one line + one action),
   error (crit dot + fix), stale (warn dot + "Updated n min ago").
7. **Audit in every theme you ship.** Render HTML builds and run `node scripts/audit_ui.mjs page.html` until it reports 0
   errors (switch `data-theme` and re-run, or put each theme in its own `data-audit-scope`). It checks the type scale, spacing, radius, control heights, row consistency,
   pinned-zone clearance, accent budget, targets and pixel-measured contrast. Then walk
   §13 (QA checklist). For SwiftUI, apply the same checklist by hand.

### Token quick reference (§4 (Token reference) has every value)

| Role | Light | Dark | Brand |
|---|---|---|---|
| `bg-canvas` / `bg-surface` | `#F0F0EF` / `#FFFFFF` | `#0A0B0C` / `#17181A` | primary / primary + white tint |
| `fg-primary` / `-secondary` / `-tertiary` | `#151515` / `#5E5E5D` / `#7A7A79` | `#F2F2F3` / `#A9AAB0` / `#7C7D84` | ink or white, then 4.5:1 / 3:1 tiers |
| `action-primary` / `on-action-primary` | ink / white | white / ink | text colour / its opposite |
| `fill-control` | `#E8E8E7` | `#25262A` | primary tinted toward contrast |
| `bg-emphasis` (hero card) | ink | `#26272B` | white or ink (inverse) |
| `accent` · `accent-text` · `accent-graphic` | secondary · ≥ 4.5:1 · ≥ 3:1 | same | same, against the brand canvas |
| `material-regular` / `-thick` | white 56% / 78% | `rgba(28,30,33,.52)` / `.72` | white (or black) at computed strength |
| Status | `success` `warning` `danger` `info`, each + `-subtle` + `-text` | | |

| Scale | Values |
|---|---|
| Type | hero 96 · display-xl 72 · display 56 · numeral 40 (all 300) · h1 34 · h2 26 · h3 20 · title 17 · body 15 · label 14 · meta 13 · caption 12 · micro 11 |
| Per screen | ≤ 5 type sizes · 1 focal figure · 1 primary action · highlight ≤ 3 · auras ≤ 2 · 1 dot figure · 1 iridescent rim |
| States (M3) | hover 8% · pressed 12% · focus 12% + 2px ring · disabled 38% / 12% |
| Elevation | `shadow-e1`…`e4` + `shadow-glass` (themed); cards on canvas carry none |
| Glass | blur 24 · saturate 1.6 · ultrathin / thin / regular / thick |
| Motion | 50 / 120 / 200 / 320 / 600 ms · stagger 40 · spring 0.35 / 0.82 · M3 easings |
| Contrast | text ≥ 7:1 (4.5 brand) · secondary ≥ 4.5 · tertiary ≥ 3 · graphics/focus ≥ 3 |

### Signature moves (use at least three per screen)

- A hero figure with a small raised currency and muted decimals, plus a status line.
- A window curve: dotted ghost, solid window, glass beads, ink cursor with an accent ring.
- A tick ruler with a glowing accent needle (amount, tenure, timeline).
- A dot-matrix figure in an ink or aura widget.
- An action row or slide-to-confirm pinned at the bottom.
- A month grid of paid/missed/current/upcoming (SIP, EMI, lease, medication).
- A blueprint card, or a beaded arc with a glass verdict pill.
- Leader-line callouts from a 3D render to label/value pairs.

### Anti-patterns

- Off-ladder spacing (10, 14, 18…), mixed control heights in a row, an inner radius equal to the
  outer or clamped up (non-concentric corners).
- Bold numbers, units at full size, big currency symbols, more than 5 type sizes.
- Glass on plain gray, dark glass on a light canvas, more than two auras, neon gradients.
- Rectangular buttons in glass, or Swiss blocks mixed with rounded glass.
- Rainbow multi-series charts and pies; status shown as colored text alone; red solid buttons.
- Mid-gray text on auras or photos (each aura redefines the text tiers, so use them).
- Hex values or primitives in UI code; tinting light/dark neutrals with the brand colour; a brand panel
  on a brand canvas; a second large colour area in the Brand theme.
- Content running under the pinned zone; cards separated by dividers instead of gaps.

## 2. Foundations

All values live in `assets/tokens/tokens.json`. This file explains the intent behind them, so you
can make the right call when a case isn't covered. Spacing, grids and radius rules are in
§5 (Layout and spacing); component dimensions are in §8 (Component anatomy); usage budgets are in §7 (Guidelines).
Colours are pixel-calibrated against the board (`research/calibration.md`, `research/theme-scan.md`). The glass style is the default; notes marked
**Flat** apply to `data-style="flat"` (v1).

### Themes and attributes

v4 has three themes (full spec: §3 (Themes: Light, Dark, Brand); every value: §4 (Token reference)):

| Attribute | Values | SwiftUI |
|---|---|---|
| `data-theme` | `light` · `dark` · `brand` (omit to follow the system light/dark) | `RDLTheme.apply(.light / .dark / .system / .brand(primary:secondary:))` |
| `data-brand` | brand preset: `cobalt` (default) · `mustard` · `gold` · `olive` · `forest` · `lavender` · `plum` · `vermilion` · `dusk` | `.brandPreset("gold")` |
| `data-accent` | secondary-colour preset for light/dark: `volt` (default) · `gold` · `signal` · `electric` · `ember` · `orchid` · `rose` · `lime` · `violet` · `orange` · `ocean` | `RDLTheme.apply(_, accent:)` or `.rdlAccent(.gold)` |
| `data-style` | `glass` (default) · `flat` | `.rdlSurfaceStyle(.glass/.flat)` |

Any two colours at runtime: `RDL.setTheme("brand", { primary, secondary })` (`assets/tokens/rdl-theme.js`).
Attributes work on any element, so a screen can switch theme locally (a dark Buy screen inside a light
app is common on the board).

### Color

#### Layers
`primitive` (raw hex) → `theme` (semantic roles per theme) → `component` (per-component roles). UI code
uses semantic or component roles only. Names follow `category-role-variant-state`: `bg-surface-raised`,
`fg-secondary`, `action-primary-pressed`, `accent-text`.

#### Neutrals
Two 12-step scales tuned separately (dark is not an inverted light). Radix usage: steps 1–2 backgrounds,
3–5 control fills (rest/hover/pressed), 6–8 borders, 9–10 solid/tertiary, 11–12 text.

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `neutral-light` | FCFCFC | F7F7F6 | **F0F0EF** canvas | E8E8E7 | E1E1E0 | D9D9D8 | CECECD | BBBBBA | 8D8D8C | 7A7A79 | 5E5E5D | **151515** ink |
| `neutral-dark` | **0A0B0C** canvas | 111214 | 17181A | 1E1F22 | 25262A | 2D2E33 | 393A40 | 4A4B52 | 6E6F76 | 7C7D84 | A9AAB0 | **F2F2F3** |

Measured on the board: light canvases `#EDECEC`–`#F7F6F6` (warm neutral, never pure white), cards
`#FBFBFB`–`#FDFDFD`; dark canvases `#070A0B`–`#171717` (`research/theme-scan.md`).

Text has three tiers plus disabled: `fg-primary` (≥ 7:1), `fg-secondary` (≥ 4.5:1), `fg-tertiary`
(≥ 3:1, captions and placeholders only), `fg-disabled` (38%).

#### Secondary colour (accent)
The secondary colour is the highlight in every theme. Presets below; any colour works at runtime. Spend it
1–3 times per screen. Each preset yields seven roles per theme: `accent` (fill with its own label),
`accent-hover`, `accent-pressed`, `accent-subtle`, `accent-text` (≥ 4.5:1), `accent-graphic` (≥ 3:1, for
needles, data and focus) and `on-accent`.

| Pack | Accent | On-accent | Seen on the board | Use for |
|---|---|---|---|---|
| **volt** | `#DFFA32` | ink | QuickBooks tags, TD Bank checks, "Best Seller", e-bike | Default. Fintech, AI, productivity |
| **gold** | `#ECBC44` | ink | Solar (mustard), Credit 832 aura | Precious metals, wealth, energy |
| **signal** | `#4BE06E` | ink | Compliance folders, fuel card, lawn, HRV | Health, ops "all good", sustainability |
| **electric** | `#0832D8` | white | Blueprint cards, fleet AI, containers | Automotive, industrial, insurance |
| **ember** | `#FC5A10` | ink | Robot arm, oil field, traffic, stress relief | Logistics, alerts-heavy ops, fitness |
| **orchid** | `#C16CF7` | ink | Weight management, e-bike widgets | Wellness, consumer health |
| **rose** | `#F0548A` | ink | Health trackers, pink aura tiles | Women's health, wellness, social |
| lime / violet / orange / ocean | v1 packs | | | Flat-style products |

**Where the accent goes:** the active orb or dock item, a needle or selected tick, the selected
data point or cell, one tag ("Best Seller", "+2.4%"), paid checkmarks, the brand dot. Use `accent` when
the mark carries its own label, `accent-graphic` when it stands alone (a datum, a needle, a meter
fill), `accent-text` for coloured words. It never goes on body text or large background areas.

#### Primary colour (brand)
In light and dark, the primary colour appears only as a **brand panel**: `.rdl-card--brand` (v3
`.rdl-blueprint`), `bg-brand` + `fg-on-brand`. In the brand theme it is the canvas. Presets
(measured on the board): cobalt `#0732D8`, mustard `#ECBB42`, gold `#D9A632`, olive `#687B59`,
forest `#1F4A3E`, lavender `#AD80D4`, plum `#2F1125`, vermilion `#D44C27`, dusk `#7599AD`.

#### Auras (gradient washes)
`--rdl-aura-*` / `RDLAura.*`. These fill widgets, hero cards and screen backdrops. Add
`.rdl-grain` for the film-grain finish.

| Aura | Stops | Use |
|---|---|---|
| `gold` | amber → cream → canvas (radial, top-right) | Wealth home screens, credit scores |
| `sunset` | orange → pink → periwinkle (radial) | Health scores, "biological age" |
| `meadow` | green → lime → cream | Positive health states, growth |
| `dusk` | olive → terracotta → rose | Payment timelines, journals (white text) |
| `orchid` | magenta → violet | Widgets, wellness |
| `ocean` | navy → teal | Night/analytics widgets |
| `ember` | amber → sand | Energy, warm cards |
| `fog` | pale blue-gray → white | Desktop backdrops |
| `rose` | pink → blush → lilac-white (radial) | Health trackers, wellness widgets (ink text) |

Rules: use at most two auras per screen. Text on an aura is ink or white, never gray-on-color.
Each aura class redefines the text tiers (ink 68% on light auras, white 86% on dark ones) so
units, currency and captions stay ≥ 4.5:1. Keep auras soft, never neon rainbow. `dusk` was
darkened in v3 so white text passes on every stop.

#### Materials (glass)
Four thicknesses, as in HIG. Thicker means more opaque and more contrast; thinner shows more context.

| Role (v3 name) | Light | Dark | Use |
|---|---|---|---|
| `material-ultrathin` | white 24% | `rgba(28,30,33,.32)` | Chips over photos; never with tertiary text |
| `material-thin` | white 40% | `.44` | Pills, toolbars over imagery |
| `material-regular` (`glass-fill`) | white 56% | `.52` | Default glass card |
| `material-thick` (`glass-fill-strong`) | white 78% | `rgba(36,38,42,.72)` | Busy backdrops, text-heavy glass |
| `material-border` (`glass-border`) | white 72% | white 10% | Rim |
| `material-dark` (`glass-dark-fill`) | `rgba(22,23,26,.52)` | same | Dark glass over photos in any theme |
| blur / saturate | 24px / 1.6 | same | |

In the brand theme glass is white (or, on mid-tone primaries, black) at theme-computed strengths; see
§3.3. Glass needs something behind it (a photo, 3D render, map, aura or fog). On a flat
canvas, use `.rdl-card`. The iridescent rim (`.rdl-glass--iridescent`) is reserved for one premium
card per screen. With Reduce Transparency, glass becomes `bg-surface`. **Flat:** solid surfaces, no blur.

#### Status
`success` · `warning` · `danger` · `info`, each with three roles: the solid (dots, meter fills, ≥ 3:1),
`-subtle` (pill and tile backgrounds) and `-text` (≥ 4.5:1 on canvas, surface and its own subtle fill).
Light and dark have their own tuned values; brand computes them against the canvas. In glass style,
**status is shown as a dot plus a word** (`.rdl-status`, `.rdl-status--warn|crit|info|idle`).

### Typography

| Family | Token | Use |
|---|---|---|
| **Urbanist** (geometric, rounded terminals) | `--rdl-font-sans` | Everything |
| **Doto** (dot-matrix) | `--rdl-font-dot` / `RDLDotMatrixText` | One signature numeral per screen, maximum |
| Inter | `--rdl-font-flat` | Flat style only |

| Role | Size/Line | Weight | Use |
|---|---|---|---|
| hero | 96/92 | 300 | Single-metric screens (credit score, readiness), dot-matrix widgets |
| display-xl | 72/72 | 300 | Amount-entry screens, single-metric heroes |
| display | 56/58 | 300 | Hero figure on home and detail screens |
| numeral | 40/44 | 300 | Card figures, KPI tiles |
| h1 | 34/38 | 400 | Screen titles, often two lines |
| h2 | 26/30 | 400 | Section titles, greetings |
| h3 | 20/24 | 500 | Web card titles |
| title | 17/22 | 500 | Mobile card titles, nav titles |
| body | 15/22 | 400 | Paragraphs |
| body-strong | 15/22 | 600 | Emphasis inside body; list titles |
| label | 14/18 | 500 | Buttons, chips, segmented |
| meta | 13/18 | 500 | Status labels, card labels, list subtitles, KV labels |
| caption | 12/16 | 400 | Labels above values, axis |
| micro | 11/14 | 500, +4% | Eyebrows (uppercase optional, used sparingly) |

**Numeral rules**
- The number is weight 300, tracked −3%, with tabular figures.
- The unit sits at 38% size in gray, on the baseline. The currency symbol is at 38% size, raised
  to the cap line (`.rdl-cur`).
- Mute leading zeros in tiny crypto or metal quantities (`.rdl-lead`).
- Mixed-weight headlines: light plus one `<b>` word at 600.
- **Flat:** Inter, numerals at 500.

### Spacing, layout, radius

See §5 (Layout and spacing) for the full system. In short:

- **Spacing ladder (4pt):** 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80, chosen by
  relationship: label→value 4, items in a group 8, inside a card 12–16, card padding 20, card gap
  12, header→title 24, section gap 32, margins 20.
- **Control ladder:** tag 24 · xs 32 · sm 40 · md 48 (header items, orbs, tiles) · lg 56 (primary
  pill, action-row orbs) · xl 64 (slide, dock, prompt input). One height per row.

| Radius token | px | Use |
|---|---|---|
| sm | 8 | Deepest nested panes, ops-console cards, tooltips |
| md | 12 | Small cards, dense inputs |
| tile | 14 | Square-rounded tool tiles, month cells |
| base | 16 | Panes in a hosting card (28 − 12) |
| lg | 20 | Web cards, blueprint cards, panes nested in widgets |
| panel | 24 | Dense web cards, panes in large panes |
| xl = **card** | 28 | Cards, glass panes |
| 2xl | 32 | Large panes, hero cards |
| 3xl = **widget** | 40 | Aura widgets, product squircles |
| sheet | 48 | Bottom-sheet top corners |
| pill / circle | — | Buttons, chips, segmented, dock, slide, orbs, knobs, beads |

Nested radius is concentric: inner = outer − gap, where gap = padding + border. To nest deeper,
use A · strict (halve the padding: host 12, then 8 → 4) or B · soft (keep the padding, radius −
padding/2) instead of clamping the radius (§6 (Corner radius)). The Swiss variant uses radius 0–4 on blocks and
buttons. Use it only when the whole product takes that tone, and don't mix it with rounded glass
on the same screen.

### Textures and lines

- **Film grain** (`.rdl-grain`): on auras and photo-backed screens.
- **Dot grid** (`.rdl-dotgrid`): 14px dots on dark canvases (node editors, document spaces).
- **Hairlines**: 1px `border-subtle` between rows; dotted leaders for label……value.
- **Dotted/dashed**: ghost curves, drop lines to a data point, selection rectangles, radius circles.

### Iconography

Line icons at 1.6–1.75 stroke with rounded joins (Lucide / SF Symbols regular), sitting inside
orbs or tiles. The ↗ arrow in a circle is the universal "open" affordance. Use outlined icons in
circles (not filled) for list leads.

### Imagery

- **3D renders** of the product's physical world: gold bars, vaults, trucks, machines, houses,
  pills, organs. Use soft studio light on neutral ground, and one render per screen.
- **Line-art / blueprint**: isometric technical drawings with dimension lines, white on electric
  blue or ink on white.
- **Selective color**: a grayscale scene with one object in the accent.
- **Photography**: full-bleed behind glass (people, landscapes). Blur or fade it where text sits.

### Motion

Durations: instant 50 · fast 120 · base 200 · slow 320 · chart 600 ms (Material 3 bands: short ≤ 200,
medium 250–400, long 450–600); stagger 40; spring 0.35 / 0.82. Easing: `standard` (0.2,0,0,1) for most
moves, `standard-decelerate` for entrances, `standard-accelerate` / `exit` for exits,
`emphasized-decelerate` (0.05,0.7,0.1,1) for hero arrivals, `emphasized` (slight overshoot) for
toggles and the dock highlight. Signature motions:
- the needle glides across the tick ruler;
- numbers roll (`contentTransition(.numericText())`);
- glass panes fade and rise 12px with blur easing in;
- the dock highlight morphs (`matchedGeometryEffect`);
- the slide knob springs back when released early.

With Reduce Motion, keep fades and drop the travel and blur animation.

## 3. Themes: Light, Dark, Brand

RDL v4 has exactly three themes. They share every size, radius, type role, spacing value and component;
only colour, material and shadow change. One screen's markup works in all three without edits.

| Theme | Canvas | Primary action | Highlight | When |
|---|---|---|---|---|
| **Light** | Warm neutral `#F0F0EF`, white cards | Ink `#151515`, white label | Your secondary colour | Default. Most of the board (41% of frames) |
| **Dark** | Near-black `#0A0B0C`, cards one step lighter | White `#F2F2F3`, ink label | Your secondary colour | Night use, media, ops consoles (36%) |
| **Brand** | **Your primary colour**, tinted-glass cards | Ink or white, whichever reads | Your secondary colour | Marketing-grade screens, onboarding, a brand-led app (21%) |

The values for every role are in §4 (Token reference) (generated). The contrast proof for every theme and
preset is in `assets/tokens/contrast-report.md` (the build fails if any pair misses). The board
evidence for these rules is in `research/theme-scan.md`.

### 1. The two brand colours

You pick two colours. Everything else is derived.

| Input | Light theme | Dark theme | Brand theme |
|---|---|---|---|
| **Primary** | Brand panels only (`bg-brand`: a card or backdrop in your colour) | Brand panels only | The canvas. Surfaces, controls, borders and charts are tints of it |
| **Secondary** | The highlight: `accent*` roles | The highlight | The highlight |

This mirrors the board. In light and dark frames, colour lives in one highlight and an occasional
brand panel (1:26 cobalt hero card, 1:153 orange panel); the neutrals carry the screen. In brand
frames (1:58 cobalt, 1:106 mustard, 1:46 olive, 1:217 vermilion), the hue *is* the screen, text and
the main action are white or ink, and a second colour does the highlighting (yellow on plum 1:66,
orange on lavender 1:6).

### 2. Setting a theme

**Web.** Put attributes on `<html>` or on any element; a themed element paints its own roles, so one
page can show all three side by side.

```html
<html data-theme="light" data-accent="volt" data-brand="cobalt">   <!-- light, volt highlight, cobalt brand panels -->
<html data-theme="dark"  data-accent="gold">                         <!-- dark (omit data-theme to follow the system) -->
<html data-theme="brand" data-brand="gold">                          <!-- brand theme from a preset pair -->
```

Any two colours at runtime (no rebuild):

```html
<script src="assets/tokens/rdl-theme.js"></script>
<script>
  RDL.setTheme("brand", { primary: "#0732D8", secondary: "#F2D33C" }); // returns { roles, audit }
  RDL.setTheme("light", { primary: "#0732D8", secondary: "#F2D33C" }); // secondary → accent, primary → brand panels
  RDL.setTheme("dark");
</script>
```

To ship a pair permanently, add it to `tokens.json → brand.presets` and run
`node scripts/build_tokens.mjs`. The build writes the CSS, checks contrast and fails if it can't
guarantee it.

**Tailwind.** Load `tokens.css`, use the preset; utilities follow the theme: `bg-bg-surface`,
`text-fg-secondary`, `bg-action-primary text-on-action-primary`, `shadow-rdl-e2`.

**SwiftUI.** Add `RDLThemeEngine.swift` next to the generated `RDLTokens.swift`.

```swift
RDLTheme.apply(.brand(primary: "#0732D8", secondary: "#F2D33C"))
RDLTheme.apply(.brandPreset("gold"))
RDLTheme.apply(.system, accent: "#D7F23A")      // light/dark follow the device, custom highlight

RootView()
    .rdlThemedRoot()          // canvas, text colour, matching status-bar scheme
    .id(themeVersion)         // bump after apply() to redraw
```

Every `RDLColor` role resolves for the active theme when it draws. The Swift engine is a line-for-line
port of `rdl-theme.js`, so a pair resolves to the same hex values on both platforms.

### 3. How the Brand theme is built

`rdl-theme.js → brandRoles(primary, secondary)`, in order:

1. **Text colour.** White if it reaches 4.5:1 on the primary, otherwise ink if it does, otherwise
   whichever is higher. Light primaries (mustard, lime, sky) get ink; deep ones (cobalt, plum,
   forest) get white.
2. **Canvas.** The primary itself. If the text colour can't reach 4.6:1 on it (mid-tones such as
   vermilion `#D44C27` or olive `#687B59`), it is deepened (or lightened) in 2% steps only until it
   can: vermilion becomes `#CC4925`, olive `#667957`. Your raw colour stays available as
   `brand-primary` for logos and illustration.
3. **Surfaces** are the canvas tinted toward white: cards +12% (white text) or +30% (ink text),
   raised +20% / +45%. A tint that would drop text below 4.5:1 is halved; if it still fails,
   surfaces step darker instead, so cards always separate from the canvas.
4. **Controls** (orbs, chips, segmented track, secondary button) tint toward white when text
   still reads at the pressed step, otherwise toward black. Hover and pressed are +8% and +16%.
5. **Emphasis card** = the text colour (a white card on cobalt, an ink card on mustard): the
   board's "white card on a brand canvas".
6. **Primary action** = the text colour, with the opposite colour as its label (white pill with ink
   label on cobalt, as on 1:217).
7. **Secondary colour.** `accent` is your colour as a fill with its own label (the label is ink or
   white by contrast; a mid-tone fill is deepened until even its pressed state reads).
   `accent-text` (≥ 4.5:1) and `accent-graphic` (≥ 3:1) move it toward the text colour until they
   read on every brand surface: orange on lavender becomes a brown graphic, for example.
8. **Status** uses the light or dark set (by canvas luminance), moved until dots reach 3:1 and text
   4.5:1 on the canvas, surfaces and its own subtle fill.
9. **Glass** is white at 8/12/16/24% on deep primaries and 18/28/40/56% on light ones. On
   mid-tones where white glass would cost contrast, glass turns black at 10–30%.
10. **Shadows** are tinted with the primary darkened 70%, never grey.

The same function runs at build time (presets), at runtime (`RDL.setTheme`) and on iOS. Over
4,000 random primary/secondary pairs, every required pair passes.

### 4. Contrast guarantees

Measured with WCAG 2 relative luminance. Translucent roles are composited over the canvas first.

| Pair | Minimum | Source |
|---|---|---|
| `fg-primary` on canvas, surfaces | **7:1** light/dark · 4.5:1 brand | HIG: strive for 7:1 with custom colours |
| `fg-secondary` on canvas, surfaces | 4.5:1 | WCAG AA |
| `fg-tertiary` on canvas, surface | 3:1 | AA large; tertiary is never essential text |
| Labels on `action-*`, `accent*` in every state | 4.5:1 | AA |
| `accent-text`, `*-text` status on canvas, surface, own subtle fill | 4.5:1 | AA |
| `accent-graphic`, `border-focus`, status dots | 3:1 | WCAG 1.4.11 non-text |
| Text on `material-regular` / `-thick` over the canvas | 4.5:1 | HIG materials |

Over photos and 3D, glass contrast depends on the image: measure with `scripts/audit_ui.mjs`
(pixel-based) and switch to `material-thick` or `material-dark` if it fails.

### 5. States, focus, disabled

Material 3 state layers, applied by mixing the label colour into the container:

| State | Layer | Roles |
|---|---|---|
| Hover (pointer only) | 8% | `*-hover` |
| Pressed | 12% | `*-pressed` |
| Focus | 12% + ring | ring `border-focus`, 2px, offset 2px |
| Dragged | 16% | |
| Disabled | content 38%, container 12% | `fg-disabled`, `fill-disabled` |
| Selected | swap to `action-primary` (quiet) or `accent` (highlight) | segmented, chips, dock |

Never show hover on touch. Never convey state by colour alone: pair it with weight, a dot or a
check.

### 6. Elevation

| Level | Role | Light | Dark | Brand |
|---|---|---|---|---|
| 0 | canvas, cards | no shadow; cards separate by tone | tone steps: canvas → surface → raised (HIG base vs elevated) | tint steps |
| 1 | `shadow-e1` | soft ink 4% | black 30% / 20% | primary-dark tint |
| 2 | `shadow-e2` | menus, popovers | | |
| 3 | `shadow-e3` | floating panels | | |
| 4 | `shadow-e4` | sheets, modals, dock | | |
| glass | `shadow-glass` | inner highlight + drop | | |

RDL cards on a canvas carry **no shadow** (the gap is the divider). In dark, depth comes from
lighter surfaces, not shadows (M3, HIG). Sheets use `bg-canvas-elevated`.

### 7. Rules per theme (from the board)

**Light**
- Canvas warm neutral, cards white, controls `fill-control`. Never pure-white canvas.
- The primary action is ink. The highlight appears 1–3 times.
- Glass only over imagery or auras; on the plain canvas use `.rdl-card`.

**Dark**
- Never pure black UI chrome on pure black: surfaces step +1 tone per level.
- The primary action is white. Highlight colours glow: use `accent-graphic` for needles and data.
- Dark glass needs a dark backdrop.

**Brand**
- One hue fills the screen; don't add a second large colour area. The secondary colour stays small.
- Cards are tinted glass or the emphasis card (white/ink). Don't put a brand panel on a brand
  canvas: `bg-brand` equals the canvas.
- Photos and 3D in brand screens are monochrome or tinted toward the primary (1:83, 1:102).
- Prefer brand for single-purpose screens (onboarding, confirmation, a hero home). Long dense lists
  read better in light or dark.

### 8. Choosing colours

- **Primary:** anything. Deep and saturated (cobalt, forest, plum) gives white text and the most
  board-like result. Light (mustard, lime) gives ink text. Mid-tones work but are deepened slightly.
- **Secondary:** pick something that contrasts with the primary in *lightness*, not just hue (yellow on
  cobalt, lime on forest, forest on gold). If you pick a close lightness (orange on lavender), the
  fill stays your colour but its text and graphic forms are shifted to stay legible.
- Check the pair in `assets/templates/theme-studio.html` (live picker, every role, live audit) before
  shipping.

### 9. Migrating from v3

v3 names still work: they are aliases (§4 (Token reference) → v3 names`). `text-primary` → `fg-primary`,
`bg-hero` → `bg-emphasis`, `fill-control-strong` → `action-primary`, `glass-fill` →
`material-regular`, `accent-soft` → `accent-subtle`, and so on. New code should use v4 names. The
v3 `data-accent` packs are now **secondary-colour presets**; their text and graphic forms are
computed per theme instead of hand-picked.

<!-- GENERATED by scripts/build_tokens.mjs from tokens.json — do not edit by hand. -->
## 4. Token reference

Every semantic role with its exact value in each theme. Light and Dark use the default secondary
(`volt` #DFFA32) and the default brand primary (`cobalt` #0732D8) for brand panels;
Brand shows the `cobalt` preset (primary #0732D8, secondary #F2D33C). Brand values are computed
by `assets/tokens/rdl-theme.js` from the two colours, so they change with the preset. How the themes work: §3 (Themes: Light, Dark, Brand).

CSS: `var(--rdl-<role>)` · Tailwind: `bg-<role>`, `text-<role>` · SwiftUI: `RDLColor.<camelCase>`.

### Background

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `bg-canvas` | #F0F0EF | #0A0B0C | #0732D8 | App background. HIG systemBackground · M3 surface. |
| `bg-canvas-elevated` | #F7F7F6 | #111214 | #163EDA | Background of sheets and modals (HIG elevated background in dark). |
| `bg-surface` | #FFFFFF | #17181A | #254BDD | Cards on the canvas. M3 surface-container. |
| `bg-surface-raised` | #FFFFFF | #1E1F22 | #395BE0 | Menus, popovers, cards inside sheets. M3 surface-container-high. |
| `bg-surface-sunken` | #F7F7F6 | #111214 | #062BBA | Wells and tracks inside a card. |
| `bg-emphasis` | #151515 | #26272B | #FFFFFF | The one high-emphasis card (v3 hero / ink widget). Inverse of the canvas in Brand. |
| `bg-emphasis-raised` | #2A2A2A | #34353A | #E1E6FA | Controls inside the emphasis card. |
| `bg-scrim` | rgba(10,11,12,0.48) | rgba(0,0,0,0.64) | rgba(0,0,0,0.48) | Behind sheets and modals. |

### Fill

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `fill-control` | #E8E8E7 | #25262A | #0629B1 | Orbs, chips, segmented tracks, inputs at rest. |
| `fill-control-hover` | #E1E1E0 | #2D2E33 | #0525A0 | Hover (pointer). |
| `fill-control-pressed` | #D9D9D8 | #393A40 | #05218F | Pressed, selected-but-quiet, missed month cell. |
| `fill-disabled` | rgba(21,21,21,0.12) | rgba(242,242,243,0.12) | #254BDD | Disabled container (M3: on-surface at 12%). |

### Foreground

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `fg-primary` | #151515 | #F2F2F3 | #FFFFFF | Titles, figures, body. ≥ 7:1 (≥ 4.5:1 on brand canvases). |
| `fg-secondary` | #5E5E5D | #A9AAB0 | #E3E8FB | Labels, meta, units. ≥ 4.5:1. |
| `fg-tertiary` | #7A7A79 | #7C7D84 | #B0BDF3 | Captions, placeholders, decoration. ≥ 3:1, never essential text. |
| `fg-disabled` | rgba(21,21,21,0.38) | rgba(242,242,243,0.38) | #6580E7 | Disabled content (M3: 38%). |
| `fg-on-emphasis` | #F2F2F3 | #F2F2F3 | #151515 | Text on bg-emphasis. |
| `fg-on-emphasis-secondary` | #A3A3A3 | #A9AAB0 | #737373 | Secondary text on bg-emphasis. ≥ 4.5:1. |

### Border

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `border-subtle` | #E8E8E7 | #25262A | #2F53DE | Hairlines inside cards, KV rules. |
| `border-default` | #D9D9D8 | #2D2E33 | #4C6BE3 | Input and outline-orb borders. |
| `border-strong` | #BBBBBA | #4A4B52 | #748CE9 | Grabbers, dashed placeholders, upcoming month rings. |
| `border-focus` | #81911D | #DFFA32 | #FFFFFF | Focus ring, 2px with 2px offset. Always ≥ 3:1 (= accent-graphic in light/dark). |

### Action

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `action-primary` | #151515 | #F2F2F3 | #FFFFFF | Primary button, active segment, solid orb. Ink in light, white in dark, ink/white in brand. |
| `action-primary-hover` | #282828 | #DFE0E1 | #ECECEC | +8% state layer. |
| `action-primary-pressed` | #313131 | #D6D6D7 | #E3E3E3 | +12% state layer. |
| `on-action-primary` | #FFFFFF | #0A0B0C | #151515 | Label on the primary action. ≥ 4.5:1 in every state. |
| `action-secondary` | #E8E8E7 | #25262A | #0629B1 | Secondary (tonal) button. |
| `action-secondary-hover` | #E1E1E0 | #2D2E33 | #0525A0 | +8%. |
| `action-secondary-pressed` | #D9D9D8 | #393A40 | #05218F | +12%. |
| `on-action-secondary` | #151515 | #F2F2F3 | #FFFFFF | Label on the secondary action. ≥ 4.5:1. |

### Accent (secondary colour)

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `accent` | #DFFA32 | #DFFA32 | #F2D33C | The secondary colour as a fill that carries its own label (tag, active dock item, check bead). |
| `accent-hover` | #CFE830 | #CFE830 | #E0C439 | +8%. |
| `accent-pressed` | #C7DF2F | #C7DF2F | #D7BC37 | +12%. |
| `accent-subtle` | #F9FEDA | #3B411E | #3F59B3 | Tinted background (selected row, soft highlight). |
| `accent-text` | #677317 | #DFFA32 | #F8E796 | Secondary colour as text. ≥ 4.5:1 on canvas and surface. |
| `accent-graphic` | #81911D | #DFFA32 | #F2D33C | Secondary colour as a standalone mark: datum, needle, meter fill, focus. ≥ 3:1. |
| `on-accent` | #151515 | #151515 | #151515 | Label on accent. ≥ 4.5:1 in every state. |

### Brand panel (primary colour)

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `bg-brand` | #0732D8 | #0732D8 | #0732D8 | Brand panel: a card or backdrop in the primary colour (light and dark). |
| `fg-on-brand` | #FFFFFF | #FFFFFF | #FFFFFF | Text on bg-brand. ≥ 4.5:1. |
| `fg-on-brand-secondary` | #BAC6F4 | #BAC6F4 | #BAC6F4 | Secondary text on bg-brand. ≥ 4.5:1. |

### Status

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `success` | #1FB877 | #4BD394 | #52D598 | Status dot, meter fill (≥ 3:1). |
| `success-subtle` | #E4F6EF | #1F362E | #154BA9 | Status pill / tinted tile background. |
| `success-text` | #0E7048 | #7CE0B3 | #C3F1DC | Status text. ≥ 4.5:1 on canvas, surface and success-subtle. |
| `warning` | #F5A70B | #FFC23D | #FFC23D | Status dot, meter fill (≥ 3:1). |
| `warning-subtle` | #FEF4E2 | #3C3320 | #384797 | Status pill / tinted tile background. |
| `warning-text` | #8A5B00 | #FFD266 | #FFE4A3 | Status text. ≥ 4.5:1 on canvas, surface and warning-subtle. |
| `danger` | #F0453E | #FF6B64 | #FFA9A5 | Status dot, meter fill (≥ 3:1). |
| `danger-subtle` | #FDE9E8 | #3C2526 | #3842AB | Status pill / tinted tile background. |
| `danger-text` | #C2241E | #FF9A9A | #FFDFDF | Status text. ≥ 4.5:1 on canvas, surface and danger-subtle. |
| `info` | #2F66F6 | #6E95FF | #A5BDFF | Status dot, meter fill (≥ 3:1). |
| `info-subtle` | #E6EDFE | #252C3F | #2646BD | Status pill / tinted tile background. |
| `info-text` | #1F4FD1 | #9DB8FF | #DEE7FF | Status text. ≥ 4.5:1 on canvas, surface and info-subtle. |

### Material (glass)

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `material-ultrathin` | rgba(255,255,255,0.24) | rgba(28,30,33,0.32) | rgba(255,255,255,0.08) | Glass: most context, least contrast. Never with tertiary text. |
| `material-thin` | rgba(255,255,255,0.4) | rgba(28,30,33,0.44) | rgba(255,255,255,0.12) | Glass: chips and pills over photos. |
| `material-regular` | rgba(255,255,255,0.56) | rgba(28,30,33,0.52) | rgba(255,255,255,0.16) | Glass: default card (HIG regular). |
| `material-thick` | rgba(255,255,255,0.78) | rgba(36,38,42,0.72) | rgba(255,255,255,0.24) | Glass over busy backdrops; text must still pass 4.5:1. |
| `material-border` | rgba(255,255,255,0.72) | rgba(255,255,255,0.10) | rgba(255,255,255,0.22) | Glass rim. |
| `material-highlight` | rgba(255,255,255,0.9) | rgba(255,255,255,0.08) | rgba(255,255,255,0.35) | Inner top highlight of glass. |
| `material-shade` | rgba(20,20,24,0.06) | rgba(0,0,0,0.30) | rgba(0,0,0,0.16) | Glass drop tint. |
| `material-dark` | rgba(22,23,26,0.52) | rgba(22,23,26,0.52) | rgba(0,0,0,0.28) | Dark glass over photos, in every theme. |
| `material-dark-border` | rgba(255,255,255,0.10) | rgba(255,255,255,0.10) | rgba(255,255,255,0.12) | Rim of dark glass. |

### Data

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `chart-track` | #E8E8E7 | #1E1F22 | #2A4FDD | Meter and progress tracks. |
| `chart-grid` | #E8E8E7 | #25262A | #254BDD | Chart gridlines. |
| `chart-muted` | #D9D9D8 | #2D2E33 | #4363E1 | Inactive bars and series. |
| `chart-hatch` | #CECECD | #4A4B52 | #5674E4 | Hatched (reserved/forecast) fills. |
| `tick` | rgba(21,21,21,0.28) | rgba(242,242,243,0.30) | #6A84E8 | Ruler ticks and dotted ghost curves. |
| `tick-strong` | #151515 | #F2F2F3 | #FFFFFF | Major ticks, solid window curve. |

### Elevation

| Role | Light | Dark | Brand (cobalt) | Use |
|---|---|---|---|---|
| `shadow-e1` | 0 1px 2px rgba(21,21,21,0.04), 0 2px 8px rgba(21,21,21,0.04) | 0 1px 2px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20) | 0 1px 2px rgba(2,15,65,0.12), 0 2px 8px rgba(2,15,65,0.12) | Elevation 1 (M3 level 1): resting cards that need lift. |
| `shadow-e2` | 0 4px 12px rgba(21,21,21,0.05), 0 12px 32px rgba(21,21,21,0.06) | 0 4px 12px rgba(0,0,0,0.30), 0 12px 32px rgba(0,0,0,0.32) | 0 4px 12px rgba(2,15,65,0.15000000000000002), 0 12px 32px rgba(2,15,65,0.18) | Elevation 2 (M3 level 2–3): menus, popovers. |
| `shadow-e3` | 0 12px 24px rgba(21,21,21,0.08), 0 24px 56px rgba(21,21,21,0.10) | 0 12px 24px rgba(0,0,0,0.36), 0 24px 56px rgba(0,0,0,0.44) | 0 12px 24px rgba(2,15,65,0.24), 0 24px 56px rgba(2,15,65,0.30000000000000004) | Elevation 3 (M3 level 4): floating panels. |
| `shadow-e4` | 0 16px 40px rgba(11,11,13,0.24) | 0 16px 40px rgba(0,0,0,0.56) | 0 16px 40px rgba(2,15,65,0.48) | Elevation 4 (M3 level 5): sheets, modals, the dock. |
| `shadow-glass` | 0 1px 0 rgba(255,255,255,0.6) inset, 0 20px 50px rgba(20,20,24,0.12) | 0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45) | 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(2,15,65,0.28) | Glass: inner highlight + soft drop. |

### Scales

| Scale | Values |
|---|---|
| State layers (M3) | hover 0.08 · focus 0.12 · pressed 0.12 · dragged 0.16 · disabled-content 0.38 · disabled-container 0.12 |
| Opacity | 0 · 0.04 · 0.08 · 0.12 · 0.16 · 0.24 · 0.38 · 0.4 · 0.56 · 0.6 · 0.72 · 0.8 · 1 |
| Border width | hairline 1 · default 1 · strong 1.5 · focus 2 · focus-offset 2 |
| Z-index | base 0 · raised 1 · sticky 100 · dock 200 · dropdown 300 · overlay 400 · sheet 500 · modal 600 · toast 700 · tooltip 800 |
| Breakpoints (M3 window classes) | compact ≥ 0 · medium ≥ 600 · expanded ≥ 840 · large ≥ 1200 · extra-large ≥ 1600 |
| Duration (ms) | instant 50 · fast 120 · base 200 · slow 320 · chart 600 |
| Easing | standard `cubic-bezier(0.2, 0, 0, 1)` · standard-decelerate `cubic-bezier(0, 0, 0, 1)` · standard-accelerate `cubic-bezier(0.3, 0, 1, 1)` · emphasized-decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)` · emphasized-accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)` · emphasized `cubic-bezier(0.3, 0, 0, 1.15)` · exit `cubic-bezier(0.4, 0, 1, 1)` |
| Space | 0 · 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 80 · 2 · 6 · 10 |
| Radius | xs 6 · sm 8 · md 12 · tile 14 · base 16 · lg 20 · panel 24 · xl 28 · 2xl 32 · 3xl 40 · sheet 48 · pill 999 |
| Control sizes | tag 24 · control-xs 32 · control-sm 40 · control-md 48 · control-lg 56 · control-xl 64 |

### Component tokens

CSS `var(--rdl-<component>-<property>)`. Restyle a component by editing its row in `tokens.json`.

| Component | Properties |
|---|---|
| `button-primary` | bg → `$action-primary` · bg-hover → `$action-primary-hover` · bg-pressed → `$action-primary-pressed` · fg → `$on-action-primary` · bg-disabled → `$fill-disabled` · fg-disabled → `$fg-disabled` · height → `{size.control-lg}` · radius → `{radius.pill}` · padding-x → `{space.6}` |
| `button-secondary` | bg → `$action-secondary` · bg-hover → `$action-secondary-hover` · bg-pressed → `$action-secondary-pressed` · fg → `$on-action-secondary` · bg-disabled → `$fill-disabled` · fg-disabled → `$fg-disabled` · height → `{size.control-lg}` · radius → `{radius.pill}` · padding-x → `{space.6}` |
| `button-accent` | bg → `$accent` · bg-hover → `$accent-hover` · bg-pressed → `$accent-pressed` · fg → `$on-accent` · height → `{size.control-lg}` · radius → `{radius.pill}` · padding-x → `{space.6}` |
| `orb` | bg → `$fill-control` · bg-hover → `$fill-control-hover` · bg-pressed → `$fill-control-pressed` · fg → `$fg-primary` · bg-selected → `$action-primary` · fg-selected → `$on-action-primary` · size → `{size.orb}` · icon → `{size.icon-md}` |
| `chip` | bg → `$fill-control` · bg-hover → `$fill-control-hover` · fg → `$fg-primary` · bg-selected → `$action-primary` · fg-selected → `$on-action-primary` · height → `{size.control-sm}` · radius → `{radius.pill}` · padding-x → `{space.4}` |
| `tag` | bg → `$fill-control` · fg → `$fg-secondary` · height → `{size.tag}` · radius → `{radius.pill}` · padding-x → `{space.2_5}` |
| `segmented` | track → `$fill-control` · thumb → `$action-primary` · fg-selected → `$on-action-primary` · fg → `$fg-secondary` · height → `{size.control-md}` · item-height → `{size.control-sm}` · inset → `{space.1}` |
| `input` | bg → `$fill-control` · bg-focus → `$bg-surface` · fg → `$fg-primary` · placeholder → `$fg-tertiary` · border → `$border-subtle` · border-focus → `$border-focus` · height → `{size.control-md}` · radius → `{radius.pill}` |
| `card` | bg → `$bg-surface` · fg → `$fg-primary` · border → `$border-subtle` · radius → `$radius-card` · shadow → `none` |
| `card-glass` | bg → `$material-regular` · border → `$material-border` · shadow → `$shadow-glass` · radius → `$radius-card` |
| `card-emphasis` | bg → `$bg-emphasis` · fg → `$fg-on-emphasis` · fg-secondary → `$fg-on-emphasis-secondary` · radius → `$radius-card` |
| `card-brand` | bg → `$bg-brand` · fg → `$fg-on-brand` · fg-secondary → `$fg-on-brand-secondary` · radius → `$radius-card` |
| `sheet` | bg → `$bg-canvas-elevated` · radius → `{radius.sheet}` · grabber → `$border-strong` · scrim → `$bg-scrim` · shadow → `$shadow-e4` |
| `dock` | bg → `$material-thick` · border → `$material-border` · item-selected → `$action-primary` · fg-selected → `$on-action-primary` · fg → `$fg-secondary` · height → `{size.dock}` |
| `toggle` | track → `$fill-control-pressed` · track-on → `$accent` · thumb → `#FFFFFF` · thumb-on → `$on-accent` |
| `status` | success-bg → `$success-subtle` · success-fg → `$success-text` · warning-bg → `$warning-subtle` · warning-fg → `$warning-text` · danger-bg → `$danger-subtle` · danger-fg → `$danger-text` · info-bg → `$info-subtle` · info-fg → `$info-text` · dot → `{size.icon-sm}` |
| `focus` | ring → `$border-focus` · width → `{border-width.focus}` · offset → `{border-width.focus-offset}` |

### Presets

| Brand preset | Primary | Secondary | Board source |
|---|---|---|---|
| `cobalt` | #0732D8 | #F2D33C | 1:20, 1:58, 1:114, 1:168 (canvas #0732D8); yellow squares 1:55 |
| `mustard` | #ECBB42 | #2A4BDC | 1:16, 1:106, 1:167, 1:210, 1:212 (canvas #ECBB42) |
| `gold` | #D9A632 | #1F4A3E | gold-investment variant of mustard, forest highlight |
| `olive` | #687B59 | #D7F23A | 1:46, 1:88 (canvas #687B59); lime 1:163, 1:174 |
| `forest` | #1F4A3E | #D7F23A | 1:205, 1:208 (forest cards); lime pill 1:116 |
| `lavender` | #AD80D4 | #F27A3A | 1:6 lavender canvas with orange tag; 1:67 |
| `plum` | #2F1125 | #F2D33C | 1:66 plum canvas with yellow pill |
| `vermilion` | #D44C27 | #D7F23A | 1:155, 1:217 (vermilion canvas) |
| `dusk` | #7599AD | #F6E27A | 1:73, 1:86, 1:195 (dusty blue canvas, yellow glow) |

| Secondary preset (light/dark) | Colour |
|---|---|
| `volt` | #DFFA32 |
| `lime` | #CBEF43 |
| `gold` | #ECBC44 |
| `signal` | #4BE06E |
| `electric` | #0832D8 |
| `ember` | #FC5A10 |
| `orchid` | #C16CF7 |
| `violet` | #7152F5 |
| `orange` | #F55F24 |
| `ocean` | #2F66F6 |
| `rose` | #F0548A |

### v3 names (aliases)

| v3 | v4 |
|---|---|
| `bg-surface-muted` | `bg-surface-sunken` |
| `bg-hero` | `bg-emphasis` |
| `bg-hero-raised` | `bg-emphasis-raised` |
| `scrim` | `bg-scrim` |
| `fill-control-strong` | `action-primary` |
| `text-primary` | `fg-primary` |
| `text-secondary` | `fg-secondary` |
| `text-tertiary` | `fg-tertiary` |
| `text-on-hero` | `fg-on-emphasis` |
| `text-on-hero-muted` | `fg-on-emphasis-secondary` |
| `text-on-strong` | `on-action-primary` |
| `success-soft` | `success-subtle` |
| `danger-soft` | `danger-subtle` |
| `warning-soft` | `warning-subtle` |
| `info-soft` | `info-subtle` |
| `glass-fill` | `material-regular` |
| `glass-fill-strong` | `material-thick` |
| `glass-border` | `material-border` |
| `glass-shade` | `material-shade` |
| `glass-text` | `fg-primary` |
| `glass-text-muted` | `fg-secondary` |
| `glass-dark-fill` | `material-dark` |
| `glass-dark-border` | `material-dark-border` |
| `accent-strong` | `accent-hover` |
| `accent-soft` | `accent-subtle` |

## 5. Layout and spacing

How RDL screens are built: the spacing ladder, the screen skeleton, grids, alignment and radius.
The values come from measuring all 220 board frames (`research/calibration.md`) and live in
`tokens.json` under `space`, `layout`, `size` and `radius`. If a value isn't on these ladders,
it's wrong.

### 1. The spacing ladder

Base unit **4**. The only spacing values are:

`2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80`

(2 and 6 are optical half-steps for hairline offsets and icon–label gaps only.)

Use spacing **semantically**. Pick by relationship, not by eye:

| Relationship | Token | px | Example |
|---|---|---|---|
| Glyph ↔ glyph | — | 2 | Unit after a figure (`0.12em`), arrow inside a tag |
| Label → its value | `stack-tight` | 4 | "Portfolio value" → ₹4,82,190 |
| Icon ↔ label (inline) | `space-1_5` | 6 | ● Operational, lock-icon + "Price locked" |
| Items in one control group | `stack` | 8 | Orbs in an action row, chips in a row, KV lines |
| Elements inside a card | `space-3` / `stack-loose` | 12 / 16 | Title → figure → instrument |
| Card padding | `card-padding` | 20 (16 small cards) | Glass pane, widget |
| Card ↔ card | `card-gap` | 12 | Bento cells, stacked cards |
| Header → screen title | `title-gap` | 24 | Orb row → "Gold SIP" |
| Section ↔ section | `section-gap` | 32 | "Holdings" block → "Activity" block |
| Screen edge | `mobile-gutter` | 20 | Left and right margin on phones |

**Proximity rule.** The gap *inside* a group is always smaller than the gap *between* groups:
4 < 8 < 12 < 20 < 32. If two neighbouring gaps are equal, the hierarchy is ambiguous. Fix it.

### 2. Mobile screen skeleton (393 × 852)

```
┌───────────────────────────────────┐
│ status bar                    54  │
│ ─ header-top 8                    │
│ [orb 48]   title/chip   [orb 48]  │ header row: every item 48 tall
│ ─ title-gap 24                    │
│ H1 34/300, 1–2 lines              │ title block (optional: mixed weight)
│ caption → figure (stack-tight 4)  │
│ ─ section-gap 32                  │
│ ┌ card ─────────────────────────┐ │ content: cards, gap 12
│ │ pad 20                        │ │
│ └───────────────────────────────┘ │
│ ...                               │
│ ─ bottom-zone ≥ 120 clear         │
│ (orb 56)( primary pill 56 )(orb)  │ pinned zone: action row / slide 64 / dock 64
│ ─ pin-bottom 34                   │
└───────────────────────────────────┘
```

- **Margins:** 20 left/right, always. Full-bleed is allowed only for backdrops, photos, maps and
  bottom sheets.
- **Header row:** three slots (leading, center, trailing), all the same height (48). Leading is
  back, avatar or logo. Center is the title (17/500), a chip or the logo. Trailing is 1–2 orbs
  (or a joined orb pair).
- **Title block** sits on the left, except on single-task screens (amount entry, test timer,
  verdict), where everything is centred.
- **Pinned zone:** exactly one of an action row, slide-to-confirm or dock, 34 above the home
  indicator. Scrolling content keeps 120 clear so nothing hides under it.
- **Bottom sheets** take the full width, with a top radius of 48 and a 36×4 grabber 8 from the top.
  Content padding is 20.

### 3. Web / dashboard grid (1440)

- 12 columns, gutter (margin) **32**, column gap **16**, bento gap **12**.
- Header **64**: logo left, centred nav pills (the active one is ink or white), utility orbs and an avatar
  right. The page title block below is a light 34–48 title, a "Last updated" caption and a KPI row.
- **Bento:** rows have fixed heights (multiples of 4; typically 280–360). Every cell in a row has
  the same height. Cells span 3, 4, 6 or 8 columns, never odd splits like 5+7.
- **Density variants:**
  - *Glass dashboard*: radius 20–28, padding 20–24, gap 12.
  - *Ops console*: radius 8–12, padding 16, gap 8.
  - *Swiss*: radius 0, cells divided by 1px hairlines (gap 1 over a hairline-colored background).
- Side panels (filters, inspectors) are 320–360 wide and float as glass over the canvas.

### 4. Alignment

1. **Corner anchoring.** A card has four anchor points, and each carries one kind of information:

   | Top-left | Top-right |
   |---|---|
   | label / title (+ icon orb) | action orb (↗, •••, ×) or tag |
   | **Bottom-left** | **Bottom-right** |
   | the figure | context: delta, mini-viz, status, primary orb |

   Content between the anchors is an instrument (curve, ruler, grid) or nothing. Most cards on
   the board follow this, and it's the main reason they read as calm.
2. **One left edge.** The title, figures and card contents share the 20 margin (plus card
   padding). Don't indent figures.
3. **Baselines.** A figure and its qualifier share a baseline ("84.2 kW" … "12 PM — 6 PM"). In
   a row of KPIs, align baselines, not tops.
4. **Optical centring.** Icons in orbs are 20 (48 orb) or 24 (56 orb). Play and arrow glyphs
   shift 1px toward their point.
5. **Equal rows.** Items in one row share the same width (`1fr` each) and height. A row of four
   glass capsules is four equal capsules.

### 5. Control heights (one ladder)

| Height | Token | Used by |
|---|---|---|
| 24 | `tag` | Tags, count badges, tiny status pills |
| 32 | `control-xs` | Dense chips (dashboards), inline selects |
| 40 | `control-sm` | Chips, segmented items, filters |
| 48 | `control-md` | **Header items**, orbs, tiles, inputs, glass selects |
| 56 | `control-lg` | Primary pill, action-row orbs, search field (mobile) |
| 64 | `control-xl` | Slide-to-confirm, dock, large input with an inset send orb |

**Rule: one height per row.** A header row with a 48 orb and a 34 chip looks broken. Make the
chip 48 or put it on its own line. A segmented control sits *inside* a 48 track (40 items + 4
inset).

### 6. Radius

| Token | px | Used by |
|---|---|---|
| `sm` | 8 | Deepest nested panes, ops-console cards, tooltips |
| `md` | 12 | Small cards, dense inputs, panes in a card with 16 padding |
| `tile` | 14 | Industrial tool tiles, month-grid cells |
| `base` | 16 | Panes in a hosting card (28 − 12), second nesting level |
| `lg` | 20 | Web cards, blueprint cards, panes inside widgets (40 − 20) |
| `panel` | 24 | Dense web cards, panes in a large pane (32 − 8 / 40 − 16) |
| `xl` (**card**) | 28 | Mobile glass cards, cards inside sheets (48 − 20) |
| `2xl` | 32 | Large panes, hero cards |
| `3xl` (**widget**) | 40 | Aura widgets, product squircles |
| `sheet` | 48 | Bottom-sheet top corners |
| `pill` / 50% | — | Buttons, chips, segmented, dock, slide, orbs |

Radius is a **family decision per product**: rounded glass (8–48) or Swiss (0–4). Never both on
one screen.

#### Concentric nesting (full guide: §6 (Corner radius))

**inner radius = outer radius − gap**, where gap = padding + border. Common chains: sheet 48 / 20 →
card 28; widget 40 / 20 → pane 20; card 28 / host 12 → pane 16. To nest deeper without running out
of radius, use **A · strict** (halve the padding: 24 → 16 → 12 → 8, concentric, the default) or
**B · soft** (keep the padding, subtract half of it: same radii, even bands). Never clamp the
inner radius up to a minimum. Use at most three levels; pills are exempt. Web: `.rdl-nest` /
`.rdl-nest--soft` + `--host`. SwiftUI: `RDLRadius.nested(…, method:)`. Live demo:
`assets/templates/radius-demo.html`.

### 7. Density and whitespace

- Content takes about 60% of a phone screen. The rest is backdrop, figure air and the pinned
  zone. If a screen has more than 5 cards above the fold, split it.
- A card holds **one idea** with at most one figure, one instrument and one action.
- Don't put dividers between cards; the gap is the divider. Use hairlines only *inside* a card
  (KV rows, table rows).
- Figures need air: keep at least 16 above a display figure and 12 below it.

### 8. Platform notes

- **iOS:** respect safe areas. The status bar is 54 on Dynamic Island devices and the home
  indicator is 34, which is the `pin-bottom` value. Minimum hit target is 44, and every RDL
  control is ≥ 48 except tags.
- **Web:** content max-width is 1440, and beyond that the margins grow. Focus rings are 2px accent
  with a 2px offset.
- **Breakpoints:** < 640 uses the mobile skeleton. 640–1024 uses 8 columns with a 24 gutter.
  ≥ 1024 uses the 12-column dashboard.

## 6. Corner radius

Everything about corners in RDL: the scale, concentric nesting, the two deep-nesting methods, and
how to apply and check them in code. A live, interactive version is in
`assets/templates/radius-demo.html` (open it in a browser; no build needed).

### 1. The scale

| Token | px | Used by |
|---|---|---|
| `xs` | 6 | Tooltips, tiny badges inside dense tables |
| `sm` | 8 | Deepest nested panes, ops-console cards |
| `md` | 12 | Small cards, dense inputs, panes in a card with 16 padding |
| `tile` | 14 | Industrial tool tiles, month-grid cells |
| `base` | 16 | Panes in a hosting card (28 − 12), second nesting level |
| `lg` | 20 | Web cards, blueprint cards, panes inside widgets (40 − 20) |
| `panel` | 24 | Dense web cards, panes in a large pane (32 − 8 / 40 − 16) |
| `xl` = **card** | 28 | Mobile glass cards, cards inside sheets (48 − 20) |
| `2xl` | 32 | Large panes, hero cards |
| `3xl` = **widget** | 40 | Aura widgets, product squircles |
| `sheet` | 48 | Bottom-sheet top corners |
| `pill` / 50% | — | Buttons, chips, segmented, dock, slide, orbs, beads |

- **One family per product:** rounded glass (8–48) or Swiss (0–4). Never both on one screen.
- **iOS:** use continuous (squircle) corners: `RoundedRectangle(cornerRadius:style: .continuous)`.
- **Web bento:** every cell uses the card radius (28), so the grid reads as one system.

### 2. The rule: concentric corners

When a rounded surface sits inside another, both corner curves must share one centre. If they
don't, the gap swells at the 45° point (inner radius too big) or pinches (inner radius too small).

```
outer radius = inner radius + gap          gap = padding + border (+ any wrapper offset)
inner radius = outer radius − gap          floors at 0
```

Example from the source article: an inner card of 16 with 8 padding needs an outer radius of
24. Measure the gap from the container's outer edge (border box) to the nested surface's edge.

#### Nesting table (RDL values)

| Container | Gap | Nested radius |
|---|---|---|
| Sheet 48 | 20 | **28** (a card) |
| Widget 40 | 20 | **20** (`lg`) |
| Widget 40 | 16 | **24** (`panel`) |
| Widget 40 | 12 (host) | **28** (a card) |
| Large pane 32 | 8 | **24** (`panel`) |
| Card 28 | 20 | **8** (`sm`) |
| Card 28 | 16 | **12** (`md`) |
| Card 28 | 12 (host) | **16** (`base`) |
| Glass card 28 (1px rim) | 12 + 1 | **15** (derived, allowed off-scale) |
| Pill track 48 | 4 | item 40 → radius 20 = its own pill ✓ |
| Dock / slide 64 | 6 | item 52 → radius 26 ✓ |
| Prompt field 64 | 8 | send orb 48 → radius 24 ✓ |

### 3. Going deeper: two methods

A fixed gap subtracted at every level runs out of radius. With 24 and gap 8:
**24 → 16 → 8 → 0**, so the fourth container has sharp corners. Two fixes give the same radii and
differ only in the padding:

| | **A · Strict** (RDL default) | **B · Soft** (the article's method) |
|---|---|---|
| How | Halve the **padding** at each deeper level (8 → 4 → 4); radius = outer − gap | Keep the padding; from the 2nd level, radius = outer − **gap/2** |
| Radii (24, gap 8) | 24 → 16 → 12 → 8 | 24 → 16 → 12 → 8 |
| Bands between layers | Get thinner | Stay equal |
| Concentric? | Yes, at every level | Slightly not: inner curves read a touch rounder ("soft") |
| Use for | Product UI: cards in sheets, panes in widgets, fields in cards | Decorative stacks with even bands: frames, stacked cards, onboarding art, illustrations |

```
A · strict   24 ─pad 8→ 16 ─pad 4→ 12 ─pad 4→ 8
B · soft     24 ─pad 8→ 16 ─pad 8 (r −4)→ 12 ─pad 8 (r −4)→ 8
RDL chains   48 ─20→ 28 ─12→ 16 ─8→ 8            sheet → card → pane → chip
             40 ─12→ 28 ─8→ 20 ─4→ 16            widget hosting cards
```

Pick one method per component and never mix them inside one stack.

### 4. Procedure

1. Start from the outermost radius the screen already uses (sheet 48, widget 40, card 28).
2. For each nested surface that **hugs** a corner (equal inset on both axes, closer than the
   outer radius), compute `outer − gap`, counting the border.
3. If the result is **≥ 8**, use it. Snap it to the scale when the gap allows; otherwise keep the
   exact value.
4. If it's **< 8**, choose one:
   - reduce the gap, which is method A (host padding 12, then 8 → 4);
   - switch the stack to method B;
   - raise the outer radius.

   Never clamp the inner radius up to a fixed minimum: that breaks concentricity and is exactly
   what looks wrong.
5. If padding ≥ radius and none of the above is possible, the inner corner is square (0), as in
   the Swiss variant.
6. Stop at three levels. Deeper hierarchies should be flattened.
7. Elements that float inside a card (not hugging a corner) just use a scale radius.

### 5. Worked examples (gold app)

| Screen | Stack | Radii |
|---|---|---|
| SIP bottom sheet | sheet → dusk aura card (host, pad 12) → glass pane (pad 8) → value chip | 48 → 28 → 16 → 8 |
| Home price card | glass card 28 (pad 20) → nothing nested, only pills | 28 (pills exempt) |
| SIP summary widget | widget 40 (pad 20) → tinted panes | 40 → 20 |
| Buy confirmation | dark glass card 28 (pad 20) → leader rows (no surfaces) | 28 |
| Lease tenure card | widget 40 host (pad 12) → card 28 (pad 16) → month cell | 40 → 28 → 12 |

With the default 20 padding, the SIP sheet's pane would get 28 − 20 = 8 and the chip would hit 0.
Halving the host padding to 12 keeps real curves at every level.

### 6. In code

**Web (rdl-components.css).** Every surface hands its direct children the exact radius:
`--rdl-nest-r` for method A (outer − gap, glass rim counted) and `--rdl-nest-r-soft` for method B
(outer − gap/2).

```html
<!-- A · strict: a host card (pad 12) with a concentric pane (28 − 12 = 16) -->
<article class="rdl-card rdl-card--host">
  <div class="rdl-glass--tint rdl-nest">…</div>
</article>

<!-- B · soft: keep the card's 20 padding, pane gets 28 − 20/2 = 18 -->
<article class="rdl-card">
  <div class="rdl-card rdl-nest--soft">…</div>
</article>
```
- Containers: `.rdl-card`, `.rdl-glass`, `.rdl-widget`, `.rdl-sheet`, `.rdl-blueprint`. Add
  `--host` (padding 12) to a container that holds panes.
- `.rdl-glass--tint` is concentric automatically.
- **Tailwind:** load `rdl-components.css` and use `rounded-[var(--rdl-nest-r)]` or
  `rounded-[var(--rdl-nest-r-soft)]`.

**SwiftUI (RDLLayout.swift).**
```swift
RDLRadius.nested(outer: RDLRadius.sheet, padding: RDLSpace.cardPadding)            // 28
RDLRadius.nested(outer: RDLRadius.card, padding: RDLRadius.hostPadding, border: 1) // 15
RDLRadius.nested(outer: RDLRadius.card, padding: 20, method: .soft)                // 18
RDLRadius.chain(outer: 24, gap: 8, levels: 4)                                      // [24, 16, 12, 8]

// Automatic: children use ContainerRelativeShape and get concentric corners
VStack { … .background(.white, in: ContainerRelativeShape()) }
    .padding(RDLRadius.hostPadding)
    .rdlConcentricContainer(radius: RDLRadius.widget)
```

### 7. Checking

- **Audit:** `node scripts/audit_ui.mjs page.html`. For every nested surface that hugs a corner,
  it finds the nearest enclosing surface and measures the real gap (padding, border and wrapper
  offsets). It warns when the radius is neither outer − gap (A) nor outer − gap/2 (B). When the gap
  eats the radius, it suggests halving it. Exact derived values (like 15) are accepted off-scale.
- **By eye:** imagine the centre of each corner arc. If all the centres in a stack land on one
  point, the corners are concentric. The demo draws these dots for you.
- **QA:** see §13 (QA checklist), under Layout and spacing.

### Sources

- [Getting Your Border Radius Right](https://medium.com/design-bootcamp/getting-your-border-radius-right-a-simple-trick-for-smooth-nested-containers-f6e0025e8c53), Design Bootcamp: outer = inner + padding; at deeper levels subtract half the padding (method B).
- [CSS-Tricks: Careful with your nested border-radii](https://css-tricks.com/public-service-announcement-careful-with-your-nested-border-radii/).
- [30 seconds of code: Perfect nested border radius](https://www.30secondsofcode.org/css/s/nested-border-radius/): borders count as gap, and padding ≥ radius → 0.

## 7. Guidelines

The rulebook for making RDL screens calm, minimal and consistent. §5 (Layout and spacing) covers *where* things
go and §8 (Component anatomy) covers *what* each part is. This file covers *how much* and *when*. Every rule
here was observed across the 220-frame board. Where the board breaks a rule, the exception is
named.

### 1. Principles

1. **One focus.** Each screen has exactly one focal element, usually a light numeral or a 3D
   object, and it's the largest thing on screen. Everything else is quieter.
2. **Quiet structure.** Hierarchy comes from size, weight and tone, not from borders, fills or
   color. Gaps divide, lines don't.
3. **Material honesty.** Glass needs something behind it. Color lives in auras and the accent,
   not in UI chrome.
4. **Instruments, not charts.** Data reads like a precision tool: ticks, hairlines, beads and
   one lit value.
5. **Systems over screens.** Every screen is assembled from the same primitives at the same
   sizes. A new need becomes a new component, never a one-off style.

### 2. Hierarchy recipe

Per **screen**:
- 1 focal figure or object. At most 5 type sizes, and the 4–5 roles from §3 cover almost
  everything.
- 1 primary action (pinned). At most 2 secondary actions visible.

Per **card**:
- 1 idea, at most 3 type sizes, 1 figure, at most 1 instrument, at most 1 action.

Use these levers, in this order: **size → weight → tone (opacity) → color.** Reach for color
last, and only for the accent or status.

### 3. Type rules

- Use weights **300 / 400 / 500 / 600** only. Use 700 only in the Sport variant and for credit-score
  numerals.
- **Figures are 300.** Titles are 300–400. UI labels are 500. One emphasised word in a headline is
  600.
- **Two-tone headlines** keep the same size and split by weight ("Good morning, **Aarav**") or by tone
  ("Kyoto, *Japan*" at 60%; "Task #241639" at 40%). Never split by size.
- **Title tabs:** "Data / Records" at the same size, with inactive tabs in tertiary gray.
- Use sentence case everywhere. Uppercase is only for micro eyebrows (11/500, +4–8% tracking)
  and dashboard card titles in ops consoles.
- Body text runs at most 60 characters per line. Over photos, increase line height to 1.6–1.9.
- Never use more than two type families: Urbanist plus Doto (one dot-matrix figure per screen).

#### Common pairings (copy these)
| Pair | Spec |
|---|---|
| Card label → figure | caption 12 gray → numeral 40/300 (gap 4) |
| Screen title | h1 34/300 or 400, two lines max |
| Hero | caption → display 56/300 → status line 13 |
| Amount entry | caption centred → display-xl 72/300 → conversion line 14 |
| KPI tile (web) | tag or meta label → h1 34/300 → caption 12 |
| List row | title 15/500 + meta 13 gray · value 15/500 right |

### 4. Color budget (per screen)

| Element | Budget |
|---|---|
| Neutrals (stone) | Unlimited: canvas, surfaces, text tiers, hairlines |
| Secondary colour (accent) | **1–3 uses**: active orb or dock item, needle or selected datum, one tag, or check marks |
| Primary colour | Light/dark: at most one brand panel. Brand theme: the canvas, and nothing else large |
| Auras | ≤ 2 (one hero + one widget, or a backdrop) |
| Iridescent rim | ≤ 1 |
| Dot-matrix figure | ≤ 1 |
| Status colors | Only on dots, status pills and meter fills. Never on body text or icons |
| Red | Only for errors and destructive actions. Destructive = red-tinted tile or text, never a red solid button |

**Text tiers:** `fg-primary`, `fg-secondary`, `fg-tertiary` (plus `fg-disabled`). There are no other
grays for text. On auras and photos, use ink or white plus their 60% variants, never mid-gray. On the
emphasis card and brand panels use their own `fg-on-*` roles.

**Dark layering:** canvas → surface → raised → control, one neutral step each
(`#0A0B0C → #17181A → #1E1F22 → #25262A`). Depth comes from tone, not shadow.

**Brand theme:** one hue fills the screen; cards are tinted glass or the white/ink emphasis card; the
secondary colour stays small. Full rules: §3.7.

### 5. Consistency across an app

Lock these before designing screen two:

| Decision | Choose once |
|---|---|
| Style | Glass (rounded) **or** Swiss (square) **or** flat (v1) |
| Colours and themes | One primary + one secondary; which themes ship (light + dark default, brand optional). Ink/white carry actions in light/dark |
| Header pattern | Which header variant each screen role uses (home, detail, flow step) |
| Pinned zone per role | Home = dock or action row · Flow step = action row · Confirmation = slide · Detail = action row |
| Figure treatment | Currency position, decimals muted or not, unit style |
| Card radius family | e.g. 28 cards / 40 widgets / 48 sheets |
| Icon set | One line family at 1.75 stroke |

**Screen-to-screen continuity:** the same entity keeps the same figure size and color across
screens (the portfolio value is display 56 everywhere it's the hero). A tap target that opens a
detail shows the same figure on the detail (shared element).

**Pattern reuse:** structurally similar flows share one template. For example, SIP and Lease
both use *summary aura card → month grid → meters → next-event KV → action row*. Only labels and
the accent use change.

### 6. Minimalism rules

1. **Remove before adding.** If a label repeats what the figure says, delete it.
2. Don't use borders where a gap works, or shadows on cards that sit on canvas (glass gets its
   token shadow only).
3. Don't use decorative icons. An icon either is a button (inside an orb) or identifies a row
   (in a 40 lead circle).
4. Use one instrument per card, with at most two series and a two-entry legend.
5. Labels are short: 1–3 words ("Paid amount", "Next SIP", "Vault"). Put explanations in a
   caption, not the label.
6. Don't use more than one alert on a screen; collapse the rest into "3 issues".
7. Empty space is a feature. When a screen feels empty, enlarge the figure. Don't add a card.

### 7. Numbers and content

- **Currency:** the symbol is small and raised (38%), the integer is light, and decimals are 38%
  gray. INR uses Indian grouping (`₹4,82,190.36`).
- **Deltas** always carry a sign or arrow (`+1.8%`, `▲ 0.125%`), shown as a tag (money) or
  status text (state).
- **Units** follow the number at 38% gray: `84.2 kW`, `11 /14 d`, `32 LVL`.
- **Ranges** use an em dash with spaces: `12 PM — 6 PM`, `54 kW — 120 kW`.
- **Dates and times:** `Oct 05`, `9:41`, `Updated 2 min ago`.
- **Realism:** use non-round numbers and a consistent person, date and dataset across screens.

### 8. Iconography

Use line icons (Lucide or SF Symbols regular) at 1.75 stroke with round caps and joins. Size
them 20 in 48 orbs, 24 in 56 orbs and 16 inline. ↗ in a circle means "open detail" everywhere.
× closes. ‹ goes back. ••• opens more. Don't mix in filled icons, except the status dot and
pixel icons in dot-matrix contexts.

### 9. Motion

Use 120 / 200 / 320 ms, standard easing, and a spring of 0.35 / 0.82. Content rises 12 and
fades, numbers roll, the needle glides, the dock highlight morphs, and glass de-blurs on
arrival. Stagger lists by 40ms. With Reduce Motion, fades only.

### 10. Accessibility

- Contrast: primary text ≥ 7:1 (≥ 4.5:1 on brand canvases), secondary ≥ 4.5:1, tertiary ≥ 3:1,
  graphics and focus rings ≥ 3:1. Token pairs are proven in `assets/tokens/contrast-report.md`;
  glass over photos must be measured on the real backdrop (use `material-thick` or a scrim).
- Focus is visible on every interactive element: 2px `border-focus` ring, 2px offset.
- Hit targets ≥ 44. RDL controls are ≥ 48 except tags.
- Status is never color-only (dot + word). Charts expose values to VoiceOver.
- With Reduce Transparency, glass becomes solid surfaces.

### 11. Do / don't

| Do | Don't |
|---|---|
| One light, huge figure | Several bold numbers competing |
| Corner-anchored card content | Centred everything in every card |
| One control height per row | 34px chip next to a 48 orb |
| Gaps of 4 < 8 < 12 < 20 < 32 by relationship | Arbitrary 10 / 14 / 18 gaps |
| Accent on one thing | Accent on every icon |
| `accent-graphic` for a lone needle or datum | Raw secondary colour as thin lines on a canvas it can't be seen on |
| v4 roles (`fg-secondary`, `action-primary`) | Hex values or primitives in UI code |
| Status dot + word | Red text alone |
| Radius from one family | 28 cards next to 6 buttons |
| Nested radius = outer − gap (padding + border); go deeper with A · strict or B · soft (§6 (Corner radius)) | Inner pane with the same radius as its container, or a clamped radius that breaks concentricity |
| Glass over a backdrop | Glass on plain gray |
| Instruments (ticks, hairlines) | Rainbow pies, chunky 3D bars |

## 8. Component anatomy

Exact specs for every RDL building block: size, padding, radius, type, slots and states. Web
classes are in `assets/templates/rdl-components.css`; SwiftUI types are in `assets/ios/`. All
numbers are tokens (see §5 (Layout and spacing)). Type roles are from the scale: hero 96 · display-xl 72 ·
display 56 · numeral 40 · h1 34 · h2 26 · h3 20 · title 17 · body 15 · label 14 · meta 13 ·
caption 12 · micro 11.

---

### Layout primitives

| Primitive | Web | SwiftUI | Spec |
|---|---|---|---|
| Screen | `.rdl-screen` | `RDLScreen { … }` | Padding 8 / 20 / 120 (top / sides / bottom clearance), vertical flow |
| Header | `.rdl-header` | `RDLHeader(leading:title:trailing:)` | 3 slots, height 48, center slot 17/500 |
| Stack | `.rdl-stack` `--tight` `--card` `--loose` `--title` `--section` | `VStack(spacing: RDLSpace.…)` | 8 · 4 · 12 · 16 · 24 · 32 |
| Inline | `.rdl-inline` `--between` | `HStack(spacing: 8)` | Gap 8, centred |
| Two-up | `.rdl-grid-2` | `Grid` / `HStack` with `.frame(maxWidth: .infinity)` | 2 equal columns, gap 12 |
| Bento | `.rdl-bento` (`--ops` `--swiss`) | — | 12 columns, gap 12 (8 / 1) |
| Pinned zone | `.rdl-pin` | `.safeAreaInset(edge: .bottom)` | 20 sides, 34 from the bottom |

---

### Header row
```
[ orb 48 ]        Title 17/500         [ orb 48 ][ orb 48 ]
```
- All items are 48 tall. Use the trailing pair gap 8, or a joined glass capsule.
- The title is centred and optical-centred on the screen, not between the orbs.
- Variants: logo left with orbs right (home), back + title + more (detail), back + status
  (detail with live state), chip center ("24K · 99.9% pure").

### Orb
| Size | Use | Icon |
|---|---|---|
| 48 | Header, inline actions | 20 |
| 56 (`--lg`) | Action row, dock-less primary icon | 24 |
| 64+ | Hero + orb (add slot) | 24 |

Kinds: **glass** (default over backdrops), **solid** ink (primary icon action), **white** (on
dark or photo backdrops), **accent** (one per screen), **outline** (plain white screens). States:
pressed scale 0.96, disabled 40% opacity, a badge dot 8 at top-right inset 6.

### Buttons
- **Primary pill:** 56 tall, padding 0 24, label 15/500, ink fill (or accent when it's the one
  accent use). Icon 20, gap 8.
- **Secondary pill:** the same, with glass or white fill.
- Labels are verbs in sentence case ("Buy gold", "Start SIP"). Never use uppercase or a trailing
  arrow; the slide and orbs carry direction.

### Action row
```
( orb 56 ) (        primary pill 56        ) ( orb 56 )
```
Columns `auto 1fr auto`, gap 8, pinned. The pill is the screen's main verb. The side orbs are
secondary (swap, sell, more). Make it a single full-width pill when there are no secondaries.

### Slide to confirm
```
( knob 52 →)      Slide to buy      ›››
```
Height 64, padding 6, knob 52 in the accent, label 15/500 centred, chevrons at 45%. It confirms
at 85% travel and springs back otherwise. **Use it only for irreversible money movement.** It
must provide an accessibility action.

### Dock
A glass capsule with padding 6, items 52, gap 6, centred and pinned. The active item is solid
ink (or the accent). Use 3–5 items, icons only, each with a label for accessibility.

### Segmented control
Track 48 (pill, glass or `--rdl-ctl`), inset 4, items 40 with label 14/500. The active item is
white (glass) or ink (flat light). The accent variant is used only when the segmented control is
the screen's accent use. Use 2–4 options.

### Chip / tag / status
| Element | Height | Type | Fill |
|---|---|---|---|
| Chip | 40 (32 dense) | 14/500 | Glass, `--rdl-ctl`, or outline. Selected = ink |
| Tag | 24 | 11/600 | Accent (the one tag), ink, or white |
| Status | — | 13/500 | 7 dot + 3 halo, gap 6, label in text color |
| Status pill (escalation) | 24 | 12/600 | Soft tint + same-hue dot + same-hue text |

### Figure (the number)
```
caption 12 gray          ← label (stack-tight 4)
₹ 4,82,190 .36           ← currency 38% raised · integer 300 · unit/decimals 38% gray
● Live   +₹12,408 · 30d  ← context line (stack 8)
```
- Sizes: hero 96, display-xl 72 (amount entry), display 56 (home hero), numeral 40 (cards),
  h1 34 (KPI tiles), h2 26 (web KPIs).
- Use tabular figures with tracking −3%. Leading zeros on tiny quantities are muted (`.rdl-lead`).
- A two-figure ratio ("24/38", "11 /14 d") puts the denominator at unit size, in gray.

### Metric tile (canonical card)
```
┌───────────────────────────────┐
│ Label 13/500 gray        (↗)  │  top row: label · action orb 40 or tag
│                               │
│        instrument / viz       │  optional: ruler, curve, lines, ring
│                               │
│ 72.4 %                 ▲ 2.1% │  bottom row: figure · context
└───────────────────────────────┘
```
Padding 20, radius 28 (40 for widget squircles), minimum height 160 on mobile two-up.
Web: `.rdl-metric`. SwiftUI: `RDLMetricTile`.

### Nested pane
A surface inside a surface (a sub-pane in a widget, a card in a sheet, a field block in a card).
Its radius is **outer − gap** (gap = padding + border); see §5.6.
- Cards in a sheet: 28 (48 − 20). Panes in a widget: 20 (40 − 20), or 28 with a host widget (pad 12).
- Panes in a card: 8 at the default 20 padding, so prefer a host card (pad 12) → 16.
- Deeper levels: **A · strict** halves the padding again (8 → 4, concentric) or **B · soft** keeps the
  padding and subtracts half of it from the radius (even bands). Max three levels. Guide: §6 (Corner radius).
- Web: `.rdl-nest` / `.rdl-nest--soft` (+ `--host` on the container). SwiftUI: `RDLRadius.nested(outer:padding:border:method:)`
  or `ContainerRelativeShape()` inside `.rdlConcentricContainer(radius:)`.

### Key / value
| Layout | Use | Spec |
|---|---|---|
| Stacked | Inside cards, 2–3 columns | label 12 gray → value 15/500 (gap 4) |
| Value-first | ID cards, dashboards | value 17/400 → label 13 gray |
| Row | Summaries | label left 14 gray, value right 15/500 |
| Leader | Receipts, fees, specs | label · dotted leader · value, rows gap 12 |

### List row
Height ≥ 56. Lead: 40 circle (outline icon or avatar). Title 15/500 + sub 13 gray. The end slot
holds a value 15/500 (right-aligned, tabular) or a status. Separate rows with 1px hairlines
inside a card, never between cards.

### Section header
`Title 17/500` left and `See all` (chip 32, white or glass) right, with 12 to the content
below. On web or large sections, use h2 26/400 with a one-line description in 13 gray below it.

### Field
- **Search:** pill, 56 (mobile) or 48 (web), with a 20 icon, placeholder 15 gray, and an optional
  trailing filter orb at the same height *outside* the field.
- **Select:** height 48–64, radius 16 (or pill), label 13 gray above (stack 8), value 17,
  chevron 16 at right.
- **Prompt input:** pill 64 with an inset send orb 48 (inset 8).
- States: focus ring 2px accent, error = crit dot + caption with the fix, disabled at 40%.

### Bottom sheet
Full width, top radius 48, grabber 36×4 (8 from the top), padding 20; cards inside it take 28 (48 − 20). The header row inside uses
the same 48 control height. It sits over a dimmed (ink 24%) or blurred backdrop.

### Instruments
| Instrument | Spec |
|---|---|
| Tick ruler | Minor ticks every 6 (10 tall), major every 30 (18 tall). Needle 2×28 in the accent with glow. Labels 11 secondary, justified |
| Meter line | Label 13 + value right, 2px track (radius 2), colored fill. List gap 12 |
| Line bars | 2px strokes, 28% opacity, one lit in the accent. Height 64–96 |
| Window curve | Dotted ghost (1.4px, 1.5/5 dash), solid window 2px, glass beads r 7, ink cursor r 5 with a 3px accent ring, dashed drop |
| Beaded arc | Dotted semicircle, solid healthy span, glass beads at the ends, glass verdict pill in the middle, scale labels below (active label white or ink) |
| Month grid | 6 columns (4 on narrow), gap 6, cells radius 14, aspect 1:1.05. Marker 20 (paid = accent ✓, missed = gray ×, current = accent outline, upcoming = dashed ring) |

### States (every async component)
- **Loading:** a skeleton pane at the final size, shimmer at 1.2s, no spinner inside cards.
- **Empty:** one line (15) and one action (chip or pill) inside the same card.
- **Error:** the status dot turns crit, plus a caption with the fix ("Retry", "Check connection").
- **Stale:** a warn dot plus "Updated 6 min ago".

## 9. Components

Web classes live in `assets/templates/rdl-components.css`. Part 1 has the base components, shared
by both styles. Part 2 has the glass components. Part 3 (v3) has the layout primitives and
structural components. The SwiftUI equivalents are in `assets/ios/RDLComponents.swift` (part 1),
`RDLGlassComponents.swift` (part 2) and `RDLLayout.swift` (part 3). Compose domain components from
these; don't restyle them per screen. Exact dimensions for every part are in §8 (Component anatomy).

### V2 glass components

| Component | Web | SwiftUI | Notes |
|---|---|---|---|
| Glass pane | `.rdl-glass` `--strong` `--dark` `--iridescent` | `.rdlGlass(.light/.dark, iridescent:)` | Needs a backdrop. `--dark` works on any theme |
| Aura widget | `.rdl-widget.rdl-aura--{gold,sunset,meadow,dusk,orchid,ocean,ember,fog}` + `.rdl-grain` | `.rdlAura(RDLAura.gold)` | Radius 40 |
| Blueprint card | `.rdl-blueprint` | `.rdlBlueprint()` | Electric blue, white line art |
| Figure | `.rdl-figure` > `.rdl-cur` `.rdl-lead` `.rdl-unit` | `RDLFigure("84.2", unit: "kW")` | Light numeral with small muted unit |
| Dot-matrix figure | `.rdl-figure--dot` (Doto) | `RDLDotMatrixText("84%")` or `RDLFigure(dotMatrix: true)` | One per screen |
| Mixed headline | `.rdl-mix` with `<b>` | `Text("Hello ") + Text("Alex").bold()` | Light + one heavy word |
| Orb | `.rdl-orb` `--sm` `--lg` `--solid` `--white` `--accent` `--outline` | `RDLOrb("bell", kind:)` | 48 (56 in action rows, 40 inside dense cards) |
| Tile | `.rdl-tile[aria-pressed]` | `.rdlCard(radius: RDLRadius.tile)` | 48 square, radius 14, industrial toolbars |
| Action row | `.rdl-actionrow` (orb · pill · orb) | `RDLActionRow("Buy gold", leading:, trailing:)` | Bottom of screen |
| Slide to confirm | `.rdl-slide` > `__knob` `__label` `__chev` | `RDLSlideToConfirm("Slide to buy")` | Irreversible money movement |
| Glass segmented | `.rdl-seg.rdl-seg--glass` / `--accent` | `RDLSegmented` inside `.rdlGlass` | Active = white (or accent) |
| Chips and tags | `.rdl-chip--glass` `--outline` `--xs` `--md`, `.rdl-tag` `--dark` `--white` `--crit` | `RDLChip` | Chips 40 (32 dense), tags 24 at 11/600 |
| Status | `.rdl-status` `--warn` `--crit` `--info` `--idle` | `RDLStatus("Operational", kind:)` | Dot with halo, plus label |
| Key/value | `.rdl-kv` `--row` `--leader` | `RDLKeyValue(k, v, layout:)` | Label above, beside, or dotted leader |
| Dock | `.rdl-dock` `--accent` | `RDLDock(items, selection:)` | Glass capsule of 52 orbs |
| Tick ruler | `.rdl-ticks` > `__needle`, `.rdl-ticks__labels` | `RDLTickRuler(value:)` | Slider, timeline, gauge |
| Meter line | `.rdl-meter` > `__track > span` | `RDLMeter(label, value:, progress:)` | 2pt line, value right |
| Line bars | `.rdl-lines > i(.is-active)` | (SwiftUI Charts `BarMark` width 2) | Hairline columns, one lit |
| Month grid | `.rdl-monthgrid > .is-paid/.is-missed/.is-now` | `RDLMonthGrid(months)` | SIP/EMI/loan history |
| Textures | `.rdl-grain`, `.rdl-dotgrid` | overlay images | |

### v3 layout primitives and structural components

| Component | Web | SwiftUI | Notes |
|---|---|---|---|
| Screen | `.rdl-screen` | `RDLScreen { } pinned: { }` | 8 / 20 / 120 padding, vertical flow |
| Header | `.rdl-header` (+ `__title`) | `RDLHeader(title:leading:trailing:)` | 3 slots, all 48 |
| Stacks | `.rdl-stack` `--tight` `--card` `--loose` `--title` `--section` | `VStack(spacing: RDLSpace.…)` | 4 · 8 · 12 · 16 · 24 · 32 |
| Inline row | `.rdl-inline` `--between` `--baseline` | `HStack(spacing: RDLSpace.stack)` | Gap 8 |
| Grids | `.rdl-grid-2` `.rdl-grid-3`, `.rdl-bento` + `.rdl-span-*` (`--ops` `--swiss`) | `Grid` | Gap 12 · bento 12 col |
| Pinned zone | `.rdl-pin` `--center` | `RDLScreen(pinned:)` | 34 above home indicator |
| Metric tile | `.rdl-metric` + `__label` `__action` `__viz` `__figure` `__context` | `RDLMetricTile` | Corner-anchored canonical card |
| Status pill | `.rdl-statuspill` `--warn` `--crit` `--info` `--idle` | `RDLStatusPill` | Escalations only |
| Title tabs | `.rdl-titletabs` | `RDLTitleTabs` | Same size, inactive tertiary |
| Section header | `.rdl-section-head` | `RDLSectionHeader` | Title 17/500 + chip 32 |
| Field | `.rdl-field` `--lg` `--select` `--glass` `--prompt` | `RDLField(size:)` | 48 / 56 / 64 |
| Sheet | `.rdl-sheet` | `.rdlSheet()` | Top radius 48, grabber |
| KV value-first | `.rdl-kv--value-first` | `RDLKeyValue` | ID cards, dashboards |
| Ink widget | `.rdl-widget--ink` | `.rdlCard` + ink fill | Steps up one layer in dark mode |
| Tinted pane | `.rdl-glass--tint` | `.rdlGlass(.dark, radius: RDLRadius.nested(…))` | Inside aura widgets; radius auto-concentric |
| Nested pane | `.rdl-nest` (strict) / `.rdl-nest--soft` + container `--host` | `RDLRadius.nested(outer:padding:border:method:)`, `ContainerRelativeShape` | Strict = outer − gap; soft = outer − gap/2 (§6 (Corner radius)) |
| Web nav / table | `.rdl-nav`, `.rdl-table`, `.rdl-logo` | — | Nav track 48, items 40 |
| Skeleton | `.rdl-skeleton` | `RDLSkeleton` | Loading state at final size |
| Text tiers | `.rdl-on-light-aura`, `.rdl-on-dark`, `.rdl-faint` | `RDLColor.text*` | Keeps text ≥ 4.5:1 on backdrops |

#### SVG patterns (see the templates for working code)
- **Window curve:** draw the full series as a dotted ghost path, redraw it solid inside a
  `clipPath` window, put glass beads (`r 7–9`, white 65%, white stroke) at the window edges and
  an ink dot with an accent ring at the cursor, then a dashed drop line to the axis.
- **Beaded arc gauge:** a dotted semicircle track, a solid segment for the healthy range, glass
  beads at the segment ends, and a glass pill in the middle with the verdict ("Within limits").
- **Thin arc gauge (credit style):** a 2px ink arc with a needle tick and the numeral beside it.
- **Radial dot plot:** ticks around a circle with accent dots at their values, and the score in
  the middle.

### Specs

**Glass pane.** Padding 20 (16 when small), radius 28, 1px rim. Content inside uses `--rdl-ctl`
(stronger glass) for nested controls. Use at most one iridescent pane per screen.

**Figure.** The label (caption, gray) sits above. The figure goes at display/numeral size. The
context line below is a status dot or delta tag plus a caption. Never bold the number.

**Orbs.** 48 by default (icon 20); 56 in action rows (icon 24). Glass by default. Use solid ink for the primary icon action, white when on a dark or
photo backdrop, accent for the single most important icon, and outline on plain white screens.

**Action row.** Orb 56, pill 56, orb 56, with 8px gaps, pinned 34 above the home indicator. The
pill is the primary verb ("Buy gold", "Start journey", "Book").

**Slide to confirm.** 64 tall with a 52 knob. Confirm at 85% travel, spring back otherwise.
Provide an accessibility action that confirms without dragging.

**Status dot.** A 7px dot with a 3px halo at 22% of its color, then a 13/500 label. Put the
status next to entity names and in tables. Use status pills (`.rdl-statuspill--crit`) only for
escalations.

**Tick ruler.** Minor ticks every 6px (10 tall), major every 30px (18 tall), `--rdl-tick`
color. The needle is 2px, 28 tall, in the accent with a glow. Labels are 11px secondary, justified.

**Month grid.** 6 columns, cells radius 14 at aspect 1:1.05, with the month label on top and the
marker at the bottom. Paid = accent check, missed = gray ×, current = accent outline,
upcoming = dashed ring.

**Dock.** A 64 glass capsule (inset rim, no border) with 6 padding and 52 items. The active item is solid ink (or accent in
`--accent`). It can sit centred and floating, or inside a bottom sheet.

### Base components (both styles)

Card, button (`.rdl-btn` `--accent` `--secondary` `--glass` `--white`), icon button, quick
action, chip, segmented, delta pill, amount, bar chart with hatch, gauge, progress, list row,
section header, floating tab bar (flat), avatar, input. Specs are unchanged from v1. In glass
style, prefer orbs over `.rdl-iconbtn`, the dock over `.rdl-tabbar`, and status dots over
delta pills for state (keep delta pills for money changes).

### Composing domain components

Recipe: **surface** (glass / aura / blueprint / white card) + **figure** (the number) +
**instrument** (ruler, meter, curve, grid) + **context** (status dot, tag, key/value) + **one
action** (orb or pill).

| Domain component | Composition |
|---|---|
| Live price card (gold, crypto) | glass → label → figure (₹ cur, .20 unit) → window curve → day labels → tag delta |
| Holdings widget | ink widget → caption → dot-matrix figure in accent + unit |
| Amount entry | dark screen → glass segmented (₹/g) → display-xl figure → conversion line → lock chip → tick ruler → leader key/values → slide to confirm |
| SIP / EMI history | dusk aura card (paid, term, 2 glass pills) → month grid → meters → next-debit key/value |
| Vault / asset card | blueprint → line-art → status dot → three stacked key/values |
| Sensor / machine row | label + value + meter line (colored by severity) |
| Map entity card | glass over map → ID in light numeral → status dot → key/value grid → action row |
| Score card | aura or white → thin arc gauge or beaded arc → figure → verdict label → ↗ orb |
| Product card (retail/health) | stone-50 squircle (radius 40) → tag → 3D render → name (gray) → price figure |
| Node card (AI/workflow) | dark glass on dot grid → icon + title → glass inputs → port dots → glowing connectors |

### v4 theme-aware surfaces and tokens

| Web | Use |
|---|---|
| `.rdl-card--emphasis` (v3 `.rdl-widget--ink`) | The one high-emphasis card: `bg-emphasis` + `fg-on-emphasis*`. Ink in light, one step up in dark, white/ink in brand |
| `.rdl-card--brand` (v3 `.rdl-blueprint`) | Brand panel in the primary colour: `bg-brand` + `fg-on-brand*`, line art in `currentColor`. Light/dark only |
| `.rdl-tag--accent` | Highlight tag: `accent` + `on-accent` |
| `.rdl-tag--crit`, `.rdl-statuspill--*` | Status on `*-subtle` with `*-text` (never a red solid) |
| Needles, meter fills, selected datum, current month ring | Use `accent-graphic` (≥ 3:1), already wired in `rdl-components.css` |

The core controls read **component tokens**, which point at semantic roles: the primary and accent
buttons (rest, hover, pressed, disabled), selected chip, segmented thumb, solid orb, current dock
item and the focus ring (`--rdl-button-primary-bg`, `--rdl-segmented-thumb`, `--rdl-focus-ring`…).
To restyle one everywhere, change its row in `tokens.json → component` and rebuild, or override the
variable on a scope. Other components read semantic roles directly. Full list:
§4 (Token reference) → Component tokens`.

## 10. Screen patterns

Start every screen from an archetype. Glass archetypes (G/W5+) are the V2 default; M/W1–4 are the
flat (v1) archetypes and still valid with `data-style="flat"`. Working examples:
`assets/templates/mobile-app.html` (G1, G4, G6) and `web-dashboard.html` (W5) for glass;
`mobile-app-flat.html` (M1–M3) and `web-dashboard-flat.html` (W1) for flat.

### Every screen: the skeleton

All archetypes sit on the same skeleton (§5.2): status bar → 8 → **header row (48)** →
24 → title block → 32 → content (cards 12 apart, sections 32 apart) → ≥ 120 clear → **pinned zone**
34 above the home indicator. Pick the pinned zone by role and keep it the same across the app:

| Screen role | Pinned zone |
|---|---|
| Home / tab root | Dock (or action row when the home has one primary verb) |
| Detail | Action row (orb · verb · orb) |
| Flow step (amount, form) | Action row, primary = "Continue" |
| Irreversible money movement | Slide-to-confirm |
| Result / success | Single full-width pill ("Done") |

### Glass · mobile

#### G1 · Home over aura
```
┌──────────────────────────────┐
│ (◯)   [ 24K · 99.9% pure ]  (◯)│  orb · glass chip · orb
│ Good morning, **Aarav**       │  mixed-weight h2
│ Portfolio value               │  caption
│ ₹4,82,190.36                  │  display 56 / 300, small ₹ and .36
│ ● Live  +₹12,408 · 30 days    │  status dot + caption
│ ┌ glass ───────────────────┐ │
│ │ Gold · per gram   [+1.8%]│ │  label + tag
│ │ ₹7,284.20                │ │  numeral
│ │ ┈┈┈╱‾‾╲__╱┈┈┈  ● beads    │ │  window curve
│ └──────────────────────────┘ │
│ ┌ ink widget ┐ ┌ glass ────┐ │  dot-matrix holdings · next SIP
│ │ 66.2 g ⠿   │ │ Oct 05  ↗ │ │
│ └────────────┘ └───────────┘ │
│                              │  ≥ 120 clear (activity list lives below the fold)
│ (⇄)  [   Buy gold   ]  (↓)   │  action row pinned 34 above home indicator
└──────────────────────────────┘
```
Backdrop: `aura--gold` (or photo/3D). Accent: live dot, cursor ring, dot figure. States: market
closed → status `idle` "Market closed · opens 10:00"; stale price → `warn` dot + "Updated 12 min
ago"; first run → figure "₹0" + glass card "Start with ₹10" + action row primary "Buy gold".

#### G2 · Detail over 3D / photo
Full-bleed render or photo (asset, machine, place). Top: back orb, title (light, 2 lines),
more/share orb. Floating glass chips as callouts on the render (`Solar Panel`, `Powerwall 4.7 kW
· 97%`) with 1px leader lines. Bottom glass sheet (radius 32) with figure + key/values + action
row. Used for: vault, property, machine, vehicle, product.

#### G3 · Instrument screen (single metric)
Huge light figure (display-xl) with unit; tick dial or beaded arc; 2–3 stat triplet
("Recovery 98% max · HRV 85.4 ms · Tension 14% low"); a glass pill verdict; circle–pill–circle
controls (`−1 min | +1 min`, `↺10 ▶ ↻10`). Dark by default.

#### G4 · Amount entry → confirm (buy, sell, convert, pay)
Dark screen with warm aura glow. Glass segmented (currency | unit), display-xl figure, conversion
line with accent quantity, lock chip with countdown, tick ruler for coarse amount, leader
key/values (value, tax, fees), **slide to confirm** pinned at the bottom. Success: figure animates
to a check orb; receipt as glass card; action row "Share · Done · View".
Errors: insufficient balance → caption in `danger-text` under the figure + ruler needle turns
red; price lock expired → chip turns `warn` "Price updated · ₹7,291.40" and slide resets.

#### G5 · Map operations (mobile)
Map full-bleed (light site-plan or dark satellite). Glass search pill, orb stack for zoom/layers,
colored route line with accent position dot, selection = dashed polygon/circle. Bottom glass
sheet: entity ID as light numeral, status dot, key/value grid, action row.

#### G6 · History / timeline
Title (h1) + status dot. Aura card (dusk/gold) with paid amount, term, two glass pills
("You've paid / Left to pay"). Month grid (paid / missed / current / upcoming). Meters for goals.
Next-debit key/value. Dock pinned. Maps to SIP, EMI, loan, subscription, medication schedule.

#### G7 · Widgets board
Grid of squircles (radius 40): aura fills with white/ink content, one dot-matrix figure, tick
rulers, ring/sparkline minis, "+" add tile. Close-up presentation friendly.

#### G8 · Questionnaire / onboarding
Photo or aura backdrop; caption "Select all that apply"; large light question; option cards
(selected = accent squircle with number `01` + label; others = dark glass with thin rim);
bottom: outline back orb + slide-to-next pill.

### Glass · web

#### W5 · Bento over fog (overview)
Top (48 row): logo, glass nav track with the active pill in ink, glass search field, bell orb,
account orb. Title block: caption ("Updated 2 min ago") → display 56/300 title; KPI row on the
right, bottom-aligned (tag → h1 figure → caption). Bento on 12 columns, rows 320, gap 12: price
metric (span 6) with window curve + segmented; gold aura with the page's one dot figure + tick
ruler (3); blueprint asset card (3); ink hedge card with iridescent rim + beaded arc (3);
strong-glass table with status dots and one escalation pill (6); dusk aura with hairline bars (3).

#### W6 · 3D scene console
Full-bleed 3D scene (port, factory, city, body) with selective accent highlighting; glass panels
docked left (entity list with status chips) and right (inspector with key/values, alerts);
glass pill nav top; bottom orb dock for tools; AI chat input with gradient underline.

#### W7 · Node canvas
Black dot-grid canvas; dark glass node cards with bracketed corners, ports, glass inputs;
glowing bezier connectors in the accent; left library panel; top file tabs with white active.

### Flat (v1) · mobile

#### M1 · Home / Wallet
```
┌──────────────────────────────┐
│ (AM) Good morning        (🔔)│  greeting header: avatar, caption + title, icon button
│ ┌──────────────────────────┐ │
│ │ Total balance     [USD▾] │ │  HERO (ink): label, amount display w/ muted decimals,
│ │ $48,209.36               │ │  delta pill + context, two pill buttons
│ │ [↑12.4%] +$5,318 month   │ │
│ │ [+ Top up ]  [↗ Transfer]│ │  accent button + raised-ink button
│ └──────────────────────────┘ │
│  (↗)   (↙)   (⇄)   (▦)       │  quick actions, 56 circles, white on canvas
│ Send Request Exchange More   │
│ ┌──────────────────────────┐ │
│ │ Spending      This week  │ │  surface card: amount h2, bar chart (hatched history,
│ │ $2,184.50                │ │  accent current day + tooltip)
│ │ ▯▯▯█▯▯▯                  │ │
│ └──────────────────────────┘ │
│ ┌ Transactions ── See all ─┐ │  list rows grouped by date
│ ╰──────────────────────────╯ │
│   ( ● ⌂ )  ◌   ◌   ◌         │  floating ink tab bar, accent active
└──────────────────────────────┘
```
Accent: hero action, active bar, active tab. States: first-run empty (hero shows $0.00 + "Add
money" accent CTA; spending card shows hatched placeholder bars with caption), loading (skeleton
hero keeps ink fill).

#### M2 · Asset / Portfolio detail
Circular back + centred title + circular more → label + Amount (display-xl) + delta + period
caption → full-bleed line chart with scrub tooltip → segmented 1D·1W·1M·1Y·All → 2×2 stat wells →
paired buttons: secondary "Sell" + primary "Buy more" (pinned above home indicator).
Accent: chart area + dot only; CTA stays ink so the chart owns the accent.
States: market closed (caption chip "Market closed · updates 9:00"), price stale (warning-soft
banner), no holdings (replace stats with an explainer card + primary CTA).

#### M3 · Score / Goal
Large title (h1) + more → surface card with gauge + number + band label + delta → factors card
(rows with progress) → accent nudge card at the end of the scroll.
Accent: gauge value, progress fills, nudge card.

#### M4 · Amount entry → Review → Success (buy, send, invest)
1. **Entry** — title ("Buy gold"), balance caption, Amount (display-xl) centred with unit
   toggle chip (₹ ↔ grams), conversion caption ("≈ 0.412 g at ₹7,284/g"), quick-amount chips,
   custom numeric keypad (3×4, 56 circles, no fills — digits only), primary 56 button
   disabled until valid.
2. **Review** — bottom sheet (radius 3xl, shadow lg): summary rows (label left, value right),
   fees in secondary, total in title weight, price-lock countdown chip, primary "Confirm".
3. **Success** — centred accent circle with check (64), h2 headline, caption with amount and
   reference, secondary "View receipt" + primary "Done".
Error: inline danger-text caption under the amount ("Exceeds available balance"); network
failure = sheet stays open with danger-soft banner + retry.

#### M5 · Activity / list
Large title + search pill + filter chips (horizontal scroll) → cards per date group, each with
list rows → sticky segmented at top if there are 2–3 views.
Empty: one card with 3D/illustrative glyph, one sentence, one secondary button. Filtered-empty:
caption + "Clear filters" ghost button.

#### M6 · Onboarding / paywall
Full-screen canvas → large visual (3D object or composed card stack) in the top 55% → h1 headline
(2 lines max) → body caption → page dots (active = ink capsule 20 wide) → primary 56 button +
ghost secondary. Paywall: plan cards as selectable surface cards, selected = ink border 2px +
accent check.

#### M7 · Profile / settings
Header card: avatar lg + name (h2) + caption + chip (tier). Grouped settings rows in surface
cards (icon circle lead + title + chevron). Destructive action as ghost button in danger-text at
the bottom.

### Flat (v1) · web

#### W1 · Overview (bento dashboard)
```
┌────────┬──────────────────────────────────────────────────────┐
│ Logo   │ Monday, 27 Sep                      (⌕ Search)(🔔)[+ New]│
│ ●Overv │ Good morning, Alex                                      │
│  Analy │ ┌────────── HERO KPI (span 2) ──┐┌ ACCENT KPI ┐┌ KPI ─┐ │
│  Paymen│ │ $284,902.40  ↑14%   ▮▮▮█      ││ $92,410    ││$18,260│ │
│  Custo │ └───────────────────────────────┘└────────────┘└──────┘ │
│  Invoi │ ┌────────── Chart (span 3) ────────────────────┐┌Gauge─┐ │
│        │ │ ▮▮▮▮▮▮▮▮█▨▨▨   legend  [Week|Month|Year]     ││ 76%  │ │
│ ┌────┐ │ └──────────────────────────────────────────────┘└──────┘ │
│ │Pro │ │ ┌────────── Table (span 3) ────────────────────┐┌List──┐ │
│ └────┘ │ └──────────────────────────────────────────────┘└──────┘ │
└────────┴──────────────────────────────────────────────────────┘
```
Floating white sidebar (radius 2xl) with pill nav items (active = ink); hero upsell card at the
bottom. Row heights align. Accent: logo, one KPI card, current bar, gauge, count badge.

#### W2 · Map operations (logistics, property, city tasks)
Map full-bleed inside the content area (radius 2xl). Left: floating list panel (surface, 360
wide) with search + filter chips + entity rows (status chip, ETA). Right/bottom: selected-entity
card with timeline (dots connected by a 2px line; completed = ink, current = accent, future =
hatch). Map pins = ink circles; selected pin = accent with white ring; routes = ink 3px, active
route accent.

#### W3 · Table / CRM
Page header with h1 + count chip + filter chips + primary button. One surface card holding the
table: 12 caption headers (tertiary), 56 rows, 1px separators, status as soft pills, amounts
right-aligned tabular. Row hover = `bg-surface-muted`. Selection opens a right drawer
(radius 3xl on the leading edge, shadow lg) with detail cards stacked.

#### W4 · Detail / record (EHR, invoice, customer)
Two-column: left 2/3 stacked cards (summary hero, timeline, documents), right 1/3 sticky meta
card (owner, status, actions). Tabs as segmented pill under the header.

### Responsive rules
- Mobile → tablet: keep single column up to 600; two columns of cards from 600; the tab bar
  becomes a floating rail on iPad landscape.
- Web ≥ 1280: 4-col bento. 1024–1279: 2-col, hero spans 2. < 1024: sidebar collapses to icons
  (72 wide, pill items become circles). < 768: sidebar hides behind a menu icon button.

## 11. Domain playbooks

Each playbook fixes the choices that vary by domain: accent pack, backdrop, hero, instruments and
domain components. Everything else follows the core rules. The frames cited are from the 2026
board (`research/moodboard-notes.md`).

### Wealth, gold and investing (SIP, lease, trading)
*Board: Credit Score 832, TD Bank Paid Amount, Bank Account $22K, Crypto Converter, Finora, QuickBooks.*
- **Accent:** `gold` for precious metals (the mustard frames), `volt` for a modern trading brand.
- **Backdrop:** `aura--gold` on Home, a dark warm glow on buy/sell, and white cards for lists.
- **Hero:** portfolio value (display, ₹ small and raised, paise muted) with a live status dot.
- **Instruments:** window curve with beads for price; tick ruler for amount and tenure; month grid
  for SIP/EMI/lease instalments; meters for goals (grams target, average buy price).
- **Components:**
  - *Price card* (glass): "Gold · per gram", figure, delta tag, window curve, day labels.
  - *Holdings widget* (ink): dot-matrix grams in the accent.
  - *Buy/Sell (G4)*: ₹/g segmented, display-xl amount, "≈ 1.372 g at ₹7,284.20/g", lock chip
    with countdown, leader rows (value / GST 3% / vault), slide to buy.
  - *SIP (G6)*: dusk aura card (paid amount, term, accumulated g, left to pay), month grid,
    goal meter, next debit, and Pause/Edit as ghost pills.
  - *Lease*: reuse the G6 shell. Swap in "Leased 10 g · Yield 2.5% p.a.", the tenure month grid
    (earned/pending), and payout key/values. Reuse the SIP creation flow (amount → frequency
    segmented → start date → review → slide) with tenure in place of frequency.
  - *Vault certificate* (blueprint): line-art vault, "Sealed" status, serial / purity / custodian.
- **Trust cues:** a purity chip ("24K · 99.9%"), custodian and insurer as key/values, and a
  price lock countdown.

### Banking, credit and payments
*Board: TD Bank desktop/mobile, Credit 832, Loan Pipeline, Finora loan rates, Celoxis invoices.*
- Accent `volt` or `gold`. Heroes: the credit score (thin arc gauge + needle, "Excellent /
  Checked Daily"), the balance, or "$22 K upcoming this week".
- Instruments: month grid of payments, a "You've paid / Left to pay" pill pair, hairline bar
  columns for quarters, and neon tags for deltas.
- Web: Swiss light layout (QuickBooks) or bento with aura tiles (Salesforce).

### Health, wellness and telehealth
*Board: Eli cortisol, Soma glucose, Heart & Circulation, Pulsetto, Biological age, Hims/Hers, Oura.*
- Accent `signal` (in range), `orchid`/`volt` for consumer. Backdrops: foggy portrait photos,
  `sunset`/`meadow`/`dusk` auras, white cards (radius 32–40).
- Heroes: a single metric in a light numeral ("88 SCR", "4-6 mg/mL", "25 years"), the Readiness
  ring, the heart age.
- Instruments: range bars with an optimal band, beaded arcs (High Load / Balanced / Resilient),
  radial dot plots, tick timelines with a "Now" lime tag, pill schedules.
- Components: test timer ("30 seconds", slide "Reset ›››"), questionnaire (G8), product cards
  with 3D pills + "Best Seller" tag + price, and the "results pending 7–10 days" card.
- Tone: calm. Red only for clinically meaningful states.

### Energy, solar and smart home
*Board: Solar Time-of-Use, Peak Load 84 kW, Backup Reserve, Home Energy (mustard), Energy
Generation maps, Smart Home 3D, Tesla/lawn mower.*
- Accent `gold` (mustard) or `signal`. Backdrops: flat mustard presentation, light screens, 3D
  isometric houses with accent wire routing and callout leaders.
- Heroes: "5.4 kW", "20.1 kWh", "84.2 kW" (light, small unit). Peak/Off-peak segmented with a
  glass-yellow active state; a sine curve with glass bubble nodes; energy-flow bottom sheets.

### Logistics, ports, fleet and rail
*Board: Helvio, Loadex, Yard cockpit, Fleet dispatch, SBB flatcars, Maritime, Truck cargo.*
- Accent `ember`, `electric` or neon yellow for "selected". Backdrops: grayscale 3D yards/cities
  with **selective color** (selected truck yellow, critical container red, loaded cyan).
- Components: entity cards (ID as light numeral, "● In transit" status, key/value grid), route
  line with stops, pallet/container cell grids (reserved = hatched), load sections with gradient
  level bars, command menus of glass pills, "High Priority" coral tags.
- Web: W6 3D scene console. Mobile: G5 map operations.

### Industrial, robotics and IoT
*Board: Robot arm CTX1250, Bearing defect, Air filter, Water filtration, Auto assembly, Drones.*
- Accent `ember` (orange robots), `electric` (blueprint), `signal` for OK.
- Visuals: line-art machines with a half-rendered accent part, XYZ gimbals, 2D dot-matrix
  control pads, cutaway renders glowing where the fault is.
- Components: "Error: Motor #4" captions, "CoG X:24 Y:-24 Z:15" key/values, meter lines per
  sensor (Pressure / Flow / Core Temp), "Emergency Stop" sheets, square tile toolbars.

### Property and GIS
*Board: CityBldr, Real Estate Investment Map, Urbis GIS, Oil field blocks.*
- Accent `volt`/yellow price bubbles, red for parcels. Components: "#619012 / RC-4 / 80-D" split
  headline (bold id + light code), outlined chips "Score: 138.2", step charts, IRR tick markers,
  dotted-fill polygons with dashed bounding boxes, black map toolbars.

### Creative, AI and documents
*Board: Cinemaro VFX, Accela documents, AI workflow nodes, Notes, Voice assistant.*
- Dark by default, `volt` or `signal` accent. W7 node canvas, glass folders with documents
  peeking out, AI inputs with gradient underline and a white send orb, text selection
  highlighted in glass.

### Sport and fitness
*Board: Padel QORX, Basketball, Sportcode, Running 21K, Velex gym.*
- `signal`/`ember` accents on black. Annotated 3D equipment, shot charts in line-art, dot-matrix
  stat numerals, most/least consistent comparison cards (green vs dark), tick sliders with
  degree readouts.

## 12. Shot presentation

How RDL presents work in 2025–26. Use this for portfolio shots, case-study covers and pitch
visuals, not for the product UI itself. The reference is `assets/templates/mobile-app.html`.

### Canvas
- **1600×1200** (4:3), exported @2x. Close-ups use the same frame, cropped tight.
- Backgrounds seen on the board:
  - light neutral gray (`#D9D9DC` → `#EDEDEF` radial): the most common
  - a flat brand color block (mustard `#EBB93E`, orange `#E8845A`, electric blue)
  - a dark vignette with glow
  - a blurred environmental photo (greenhouse, port, sky)
- Add film grain (≈3–6%) to color blocks and dark scenes.

### Compositions (by frequency on the board)
1. **One phone held in a hand.** The hand is silhouetted black or naturally lit, the phone is
   slightly angled, and the screen fills 55–65% of the frame height. This is the most common.
2. **Close-up with depth of field.** One component (a widget, a number, a glass card) at
   20–30° perspective, the rest falling into blur. It shows craft: numerals, glass rims, ticks.
3. **Angled desktop/iPad.** A monitor on a stand or an iPad held in two hands, at 10–20°
   rotation, on gray.
4. **Three phones with perspective.** The centre phone faces forward and sits raised; the outer
   phones are rotated ±14° on Y and set back. This is the HTML template's layout, easy to
   produce without photography.
5. **Floating UI.** A glass card detached from the device, over a photo (the "Penetration Risk!"
   and "Breath Awareness" style).

### Building shots without photography
- Use the HTML template (`perspective: 2400px; rotateY(±14deg)`) for three-phone shots.
- Hands: use a licensed hand-holding-phone PSD/PNG mockup, place the rendered screen, and add
  a subtle screen-glare gradient (white 0→8%).
- Depth of field: render the screen at 2×, rotate it in 3D (CSS or Figma), and apply a progressive
  blur (0 at the focal component → 8–12px at the edges).
- Keep text on the canvas minimal: a product wordmark (aura dot + name) top-left and a
  category label top-right, or nothing at all. Many board frames carry no canvas text.

### Content realism
Use non-round numbers (`₹4,82,190.36`, `84.2 kW`, `0.00321 BNB`) and a consistent person, date
and dataset across screens in one shot. Dates should sit near "now" (9:41 or 11:30 status
bars). Don't use real people's likenesses unless licensed.

### Animated shots
8–12s loops. Screens rise 24px and fade in (emphasized easing, 60ms stagger). The needle glides
along the ruler, numbers roll, glass cards de-blur as they arrive, and the slide knob travels
and turns into a check. Hold the final frame 1.5s.

### Export
`node scripts/render-previews.mjs` renders every template to `docs/` with Playwright. For @2x,
set `deviceScaleFactor: 2`.

## 13. QA checklist

Run this before presenting any RDL screen. Fix problems rather than annotating them. Items
marked **G** apply to the glass style, **F** to the flat style, and the rest to both.

### Identity
- [ ] One focal number per screen, and it's the largest thing on screen (≥ 48pt on mobile heroes).
- [ ] **G** The number is weight 300 with its unit at ~38% in gray. The currency is small and raised. Nothing bold except one headline word.
- [ ] **F** The number is weight 500, decimals muted, with one ink hero card.
- [ ] One accent pack, spent 1–3 times (active orb/dock, needle/selected datum, one tag or the checks).
- [ ] **G** Glass has something behind it (photo, 3D, map, aura, fog). No glass floating on flat gray.
- [ ] **G** At most two auras and at most one iridescent rim per screen.
- [ ] Everything tappable is a circle, pill or tile (Swiss variant: sharp blocks). No mixed corner languages on one screen.
- [ ] At least three signature moves (see SKILL.md).

### Typography
- [ ] Urbanist (glass) or Inter (flat) only; dot-matrix used for at most one figure.
- [ ] Sentence case. Uppercase is only for rare eyebrows/addresses, never on buttons.
- [ ] Mixed-weight headlines use light + one 600 word, not two bold phrases.

### Data and instruments
- [ ] Instruments over charts: tick rulers, meters, hairline bars, window curves, month grids.
- [ ] Monochrome except the accent, plus status colors on status dots only.
- [ ] Axis/tick labels are secondary, at 11px. Legends have two entries at most.
- [ ] Every status has a dot plus a word (not color alone). Money deltas show a sign or arrow.

### Layout and spacing (§5 (Layout and spacing))
- [ ] Every gap, padding and margin is on the ladder (2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80).
- [ ] Gaps follow relationships: label→value 4 < group 8 < in-card 12–16 < card padding 20 < section 32. No two neighbouring gaps are equal by accident.
- [ ] Margins 20 (mobile) / 32 (web). Header row items all 48. Header → title 24.
- [ ] One control height per row (ladder 24 · 32 · 40 · 48 · 56 · 64).
- [ ] Cards are corner-anchored: label TL, action TR, figure BL, context BR.
- [ ] Nested corners follow §6 (Corner radius): inner = outer − gap (padding + border). Deeper levels use A · strict (halve the padding) or B · soft (radius − padding/2), one method per stack; no clamped radii; ≤ 3 levels. One radius family per product.
- [ ] Bottom actions pinned: action row, slide-to-confirm or dock, 34 from the bottom. Content stays 12+ clear of it (≥ 120 bottom zone).
- [ ] Web: 12-column bento, equal row heights, cells span 3/4/6/8/12; every cell uses the card radius.
- [ ] Budgets (§7 (Guidelines)): ≤ 5 type sizes per screen, ≤ 3 per card, accent ≤ 3 uses, ≤ 2 auras.

### Automated audit
Run `node scripts/audit_ui.mjs <page.html> [--w 1440 --h 960]` on any HTML build. It checks the
type scale, spacing ladder, radius scale, control heights, mixed row heights, pinned-zone
clearance, accent budget, hit targets and **measured** text contrast on the rendered pixels. Mark
the product UI root with `data-audit-scope` and presentation chrome with `data-audit-ignore`.
Ship at 0 errors.

### Tokens and code
- [ ] No raw hex, radius or blur values in components. Use tokens or component classes.
- [ ] Works in light and dark, and with `data-style="flat"` (glass degrades to solid surfaces).
- [ ] Generated files are untouched; token changes go in `tokens.json`, then rebuild.

### Accessibility
- [ ] Text contrast ≥ 4.5:1 **measured on the actual backdrop** (glass over photo can fail). Add `glass-fill-strong` or a scrim where needed.
- [ ] Hit targets ≥ 44pt. Orbs and dock items have labels. Slide-to-confirm has an accessibility action.
- [ ] Dot-matrix and figure views expose the plain value to VoiceOver.
- [ ] Reduce Motion: no needle glide, blur-in or number roll (fades only). Reduce Transparency: glass becomes solid.

### States
- [ ] Loading (skeleton panes at the same size, a shimmer on glass), empty (one line + one action
  in the same card), error (a status dot turns `crit` + a caption with the fix), and stale data
  (`warn` dot + "Updated n min ago"), wherever the screen has async data.

### Themes (v4)
- [ ] Every shipped theme renders: switch `data-theme` (light, dark, brand) and re-run the audit; 0 errors in each.
- [ ] No hex or primitive in UI code; only v4 roles or component tokens (v3 aliases allowed in old code).
- [ ] Brand pair added to `tokens.json` and the build passes (it fails on any contrast miss); or checked live in `assets/templates/theme-studio.html`.
- [ ] Highlights use the right form: `accent` with a label, `accent-graphic` alone, `accent-text` for words.
- [ ] Light/dark neutrals are not tinted with the brand colour; brand panels appear at most once per screen.
- [ ] Brand theme: no brand panel on the brand canvas; one large colour area only; dense lists moved to light/dark if they strain.
- [ ] Focus ring visible on every control; hover only on pointer devices; disabled uses `fg-disabled` / `fill-disabled`.
- [ ] SwiftUI: `RDLTheme.apply(...)` at launch, `.rdlThemedRoot()` at the root, status bar matches (`RDLTheme.colorScheme`).

## 14. Design study

What the RonDesignLab (RDL) visual language is, based on a frame-by-frame scan of 220 shots.
Raw per-frame notes: `research/moodboard-notes.md` at the repo root.

### Sources and evidence

| Source | What it gave | Confidence |
|---|---|---|
| **Figma "Design Moodboard 2026"**: 220 RDL shots (1600×1200), each viewed and annotated | V2: the current glass language, components, type, color, charts, presentation | **High.** Seen directly, colors judged by eye |
| Search-indexed Dribbble shot titles (Coin, Mint, SavingPro, Credit Pros, Aella, Oscar…) | V1: the 2023–24 flat fintech series | Medium. From text, not pixels |
| Reference builds in `assets/templates/`, rendered and reviewed | Proof that the rules add up to the look | High for internal consistency |

To pixel-calibrate, export shots to `research/shots/`, run `scripts/extract_palette.py`, and
update `tokens.json` wherever ΔE > 8.

### What the 220 frames contain

**Domains** (by frame title): industrial, IoT and operations make up about 40% (energy/solar,
ports and cranes, rail, fleets and trucks, robotics, drones, water and air plants, oil fields,
traffic and GIS). Health and wellness is about 30% (glucose, cortisol, heart, stress/HRV,
supplements, telehealth). Fintech and property is about 12% (TD Bank, Finora, Salesforce,
QuickBooks, crypto converter, CityBldr, real-estate investment). Creative and AI tools are about
10% (Cinemaro VFX, Accela docs, AI workflows, notes). Sport, travel and retail make up the rest.

**Formats:** about 45% mobile, 25% desktop/tablet dashboards, 30% close-ups (widgets, cards,
single components). **Mode:** about 45% dark or photo-backed, 55% light.

**How often each pattern appears** (share of the 220 frame notes that mention it):

| Pattern | Frames | Note |
|---|---|---|
| Glass surfaces (frosted, liquid, iridescent rim) | ~60% | The main surface material |
| Big light-weight numerals with a small muted unit | ~59% | `84.2 kW`, `98 %`, `$ 3,450 /mo` |
| Circular buttons (orbs) | ~41% | Back, more, add, play, send, knobs |
| Pills (buttons, chips, segmented) | ~43% | Glass or solid, never rectangles, except in the Swiss variant |
| Yellow / lime / mustard accent | ~30% | The most frequent accent family |
| Green signal | ~31% | Status, "in range", active |
| 3D renders as the hero visual | ~29% | Machines, buildings, products, anatomy |
| Gradient washes ("auras") | ~25% | Card fills and screen backdrops |
| Photography behind the UI | ~20% | Full-bleed, glass on top |
| Mixed-weight headlines | ~18% | "Hello **Alex**", "Lawn Mower **Status**" |
| Square-rounded tiles | ~17% | Industrial toolbars, map tools |
| Tick rulers and tick dials | ~16% | Sliders, timelines, gauges |
| Dotted/dashed lines | ~17% | Ghost curves, leaders, guides, selection boxes |
| Line-art, blueprint and wireframe drawings | ~14% | Trucks, engines, cars, trusses, figures |
| Dot-matrix (LED) numerals | ~7% | `84%`, `16.2`, `22K`, `25`, `8`, a signature accent |
| Circle–pill–circle action rows and slide-to-confirm | ~9% | `← [Start journey] →`, `(→) Convert balance ›››` |

### The V2 language in ten observations

1. **Glass is the material.** Cards are frosted panes over something: a photo, a 3D render, a map,
   an aura gradient, or plain fog. Light glass is about 55% white with a bright 1px rim. Dark glass
   is about 50% graphite with a 10% white rim, often with an iridescent rim (pink → cyan → lime)
   on premium cards.
2. **Numbers are light, not bold.** Hero numbers are 48–84pt at weight 300 in a geometric sans
   (Urbanist/Outfit family), tracked tight. Units sit at about 38% size in gray (`kW`, `%`,
   `mg/dl`), and currency symbols are small and raised (`$ 12,340`). Leading zeros can be
   greyed (`0.00`**321** BNB). About 7% of frames swap in dot-matrix digits.
3. **Headlines whisper, with one heavy word.** Titles are large and light, often two lines, with
   one bold word ("Hello **Richard!**", "**Completed 88%** of your planned workout").
4. **Everything you tap is a circle or a pill.** Orbs (glass, solid black, white, accent) for
   icons; pills for text actions; circle–pill–circle rows at the bottom; glass docks instead of
   tab bars. The industrial and Swiss variant switches to square-rounded tiles (radius 12–14) or
   sharp rectangles.
5. **One loud accent, lots of neutral.** Electric yellow/lime (`#DDF23A`), mustard/gold
   (`#EBC45C`), signal green (`#4BE06E`), electric blue (`#2233F0`), ember orange-red (`#FF5A1F`)
   or orchid. The accent goes on the active orb, the needle, the selected cell, and one tag.
6. **Color lives in auras, not in UI chrome.** Soft gradient washes fill widgets and backdrops:
   gold-white radial (credit 832), orange→pink→blue radial (biological age), olive→rose (TD Bank,
   cortisol), magenta→violet (widgets), green→lime (heart age), navy→teal. Often with film grain.
7. **Instruments, not charts.** Data is drawn like hardware: tick rulers with a glowing needle;
   tick dials; thin 2px meters with a value on the right; vertical hairline bars with one lit;
   dotted ghost curves where a solid "window" shows the active range; glass beads as nodes;
   radial dot plots; pixel heatmaps. Chunky filled bars are rare.
8. **Status is a dot.** "● Operational", "● Congested", "● In Progress". Small colored dots with
   a soft halo, plus "Label: value" pairs. Colored pills are used for severity ("High Priority",
   "Maintenance").
9. **Illustration is technical.** Isometric line-art (trucks, trusses, vaults, cars), blueprint
   drawings on electric blue, wireframe 3D, cutaways, and selective color, where a grayscale 3D
   scene has one object lit in the accent (a red building, a yellow truck, blue containers).
10. **Presentation is photographic.** Phones held in hands (often silhouetted), angled monitors
    and iPads, shallow depth-of-field close-ups of one component, flat mustard/orange/gray
    backgrounds, and dark vignettes with glow.

### Variants inside the language

| Variant | When RDL uses it | Traits |
|---|---|---|
| **Glass on photo/3D** (dominant) | Health, energy, mobility, security | Dark or light glass, orbs, dock, auras |
| **Light instrument** | Health dashboards, fintech, logistics mobile | White/very light gray cards (radius 28–40), light numerals, tick rulers, lime tags |
| **Blueprint** | Automotive, industrial, insurance | Electric blue fields, white line art, outlined inputs, square buttons |
| **Swiss / editorial** | QuickBooks, Oil Well, Smart Home, Greenhouse | Sharp or small radii, neon-yellow blocks, hairline dividers, bold/light type contrast |
| **Node canvas** | AI workflows, VFX, documents | Black dot-grid canvas, glowing bezier connectors, node cards with ports |

### Finance frames (most relevant for money products)

- **Credit Score 832 (gold):** white→amber radial aura, huge medium numeral, "-1 pts" above,
  "Excellent / Checked Daily" beside, thin black arc gauge with a needle, black ↗ orb.
- **TD Bank paid-amount timeline:** olive→rose glass screen, "$ 12,340" with a small `$`,
  "Term 36 m.", "You've paid / Left to pay" glass pills with lime radio dots, a **month grid of
  glass tiles with lime check circles** (missed = gray ×). This maps directly onto SIP and EMI
  history.
- **Bank Account $22K:** fluted-glass distortion over a portrait, a glass notification card
  "$22 K +14% ↗ upcoming this week", an account row with a card thumbnail and a white ⇄ orb.
- **Crypto converter:** plum gradient glass, "0.00**321**BNB" with muted leading zeros,
  right-aligned label/value rows, **slide-to-convert** pill.
- **QuickBooks / Salesforce desktops:** Swiss light layouts, neon-yellow delta tags, line
  semicircle gauges, hairline bar columns, aura gradient bento tiles.

### V1 → V2: what changed

| | V1 (2023–24 flat fintech) | V2 (2025–26 glass) |
|---|---|---|
| Surface | Flat white cards on gray | Glass over photo/3D/aura; white cards in light mode |
| Type | Inter; numerals 500 | Urbanist; numerals 300; dot-matrix option |
| Accent | Lime `#CBEF43` as a CTA fill | Volt/gold/signal/electric as needle, dot, orb, tag |
| Charts | Capsule bars, hatched history | Tick rulers, hairline bars, dotted ghost curves, beads |
| Navigation | Dark floating tab bar | Glass dock of orbs; circle–pill–circle rows |
| Illustration | Occasional 3D objects | 3D renders, line-art, blueprint, selective color |
| Presentation | Three flat phones on gray | Hands, angled devices, DOF close-ups |

V1 stays available as `data-style="flat"` for products that want the calmer fintech look.

### v3: structural pass (how the screens are built)

The second pass re-read all 220 frames at 1200px for structure rather than style. Per-frame notes
are in `research/deep-scan.md`, measurements in `research/calibration.md`. These are the
recurring construction rules, with example frames:

| # | Rule | Evidence (frames) |
|---|---|---|
| 1 | **Corner anchoring**: label TL, action/tag TR, figure BL, context BR | 1:101, 1:116, 1:148, 1:163, 1:182, 1:185 |
| 2 | **One control height per row**: header items, fields and tiles share one height (usually 48 or 56) | 1:97, 1:186, 1:194 |
| 3 | **Concentric nesting: inner = outer − gap** (widget 40 → panes 20; card 32 → 24; deeper levels use smaller gaps) | 1:101, 1:146, 1:163 |
| 4 | **Same-size two-tone headlines**: split by weight or opacity, never by size | 1:98, 1:111, 1:162, 1:180, 1:187 |
| 5 | **Title tabs**: "Data / Records" at one size, inactive gray | 1:101 |
| 6 | **Status = dot + word**; soft-tint pills (tint + same-hue dot + text) for escalation only | 1:102, 1:117, 1:120, 1:184 |
| 7 | **Destructive = red-tinted tile at the row end**, never a red solid button | 1:113 |
| 8 | **Selection = offset outline ring or white fill**, not color | 1:108, 1:143, 1:150 |
| 9 | **Dashed outline = empty or placeholder slot** ("+ add", drop zones) | 1:108, 1:113, 1:151 |
| 10 | **Units as small gray suffix or superscript**; ratios as "24/38" with gray denominator | 1:110, 1:127, 1:163, 1:207 |
| 11 | **Muted leading zeros** on tiny quantities | 1:199 |
| 12 | **Leader-line callouts** from 3D objects to label/value pairs | 1:137, 1:167 |
| 13 | **Glass takes the hue of what's behind it** (ember glass over ember render) | 1:119, 1:126, 1:220 |
| 14 | **Dark glass needs a dark backdrop**; on light canvases use an ink surface | 1:122, 1:166, 1:205 |
| 15 | **Bottom sheets**: full width, top radius ~48, grabber, same header height inside | 1:110, 1:184, 1:198, 1:207 |
| 16 | **Centred layout only for single-task screens** (amount entry, timer, verdict) | 1:160, 1:196, 1:199 |
| 17 | **Dark layering** in ~4–6% luminance steps | 1:115, 1:203, 1:214 |
| 18 | **Swiss variant** is radius 0 everywhere with 1px hairline grids; never mixed with glass | 1:99, 1:109, 1:121, 1:124, 1:168, 1:209 |
| 19 | **Dashboards**: centred nav pills, light title + KPI row, bento with equal row heights | 1:163, 1:169, 1:182, 1:204 |
| 20 | **One accent, spent 1–3×**: active nav/dock, needle, one tag, checks | 1:104, 1:122, 1:163, 1:209 |

Pixel calibration moved four accents (volt brighter and more lime, electric deeper cobalt, gold
and ember slightly warmer) and added **rose** for health products. Neutrals already matched.

### V1 portfolio inventory (Dribbble, search-indexed)

Coin (wallet), Bloom Trading, Mint (personal finance), SavingPro, Creative Juice, QuickBooks,
Credit Pros, Aella, Salesforce CRM, PHR, Oscar Health, EHR, Vessel, Dentale, Veri CGM, Vizo,
Lendora, Helvio, Moverta, Urbis, Monte, Daneel, MBOX, Luma, Booki. Links are in the git history
of this file (v1).

# Part 2 · Code

## Appendix A · `assets/tokens/tokens.json`

Source of truth for every token. Edit, then run Appendix C.

```json
{
  "meta": {
    "name": "RDL Theme",
    "version": "4.0.0",
    "description": "Design tokens for the RonDesignLab (RDL) visual language. Source of truth: run scripts/build_tokens.mjs to regenerate tokens.css, tailwind.preset.js and RDLTokens.swift.",
    "themes": "light · dark · brand (canvas = your primary colour, highlight = your secondary colour). Set with data-theme on any element, or RDL.setTheme() / RDLTheme.apply().",
    "layers": "primitive (raw colours) → theme (semantic roles per theme) → component (per-component roles). UI code uses semantic or component tokens, never primitives.",
    "naming": "category-role-variant-state, e.g. bg-surface-raised, fg-secondary, action-primary-hover, accent-text.",
    "evidence": "v4: third pass over all 219 board frames with a theme lens (research/theme-scan.md); structure from Apple HIG, Material 3, Radix Colors and Primer (research/standards.md). Every role pair is contrast-checked at build time (assets/tokens/contrast-report.md)."
  },
  "primitive": {
    "neutral-light": {
      "1": "#FCFCFC",
      "2": "#F7F7F6",
      "3": "#F0F0EF",
      "4": "#E8E8E7",
      "5": "#E1E1E0",
      "6": "#D9D9D8",
      "7": "#CECECD",
      "8": "#BBBBBA",
      "9": "#8D8D8C",
      "10": "#7A7A79",
      "11": "#5E5E5D",
      "12": "#151515"
    },
    "neutral-dark": {
      "1": "#0A0B0C",
      "2": "#111214",
      "3": "#17181A",
      "4": "#1E1F22",
      "5": "#25262A",
      "6": "#2D2E33",
      "7": "#393A40",
      "8": "#4A4B52",
      "9": "#6E6F76",
      "10": "#7C7D84",
      "11": "#A9AAB0",
      "12": "#F2F2F3"
    },
    "ink": {
      "600": "#34343A",
      "700": "#26262B",
      "800": "#1C1C20",
      "900": "#141417",
      "950": "#0B0B0D"
    },
    "gray": {
      "0": "#FFFFFF",
      "50": "#F8F8FA",
      "100": "#F3F3F5",
      "150": "#EBEBEF",
      "200": "#E2E2E7",
      "300": "#C8C8CF",
      "400": "#9A9AA3",
      "500": "#6E6E78",
      "600": "#55555E"
    },
    "lime": {
      "50": "#F7FDE3",
      "100": "#EEFBC4",
      "200": "#E3F89A",
      "300": "#D8F56F",
      "400": "#CBEF43",
      "500": "#B2D92A",
      "600": "#8CAF12",
      "700": "#5F7A08"
    },
    "violet": {
      "50": "#F4F1FF",
      "100": "#E9E3FF",
      "200": "#D2C6FF",
      "300": "#B09CFF",
      "400": "#9076FF",
      "500": "#7152F5",
      "600": "#5A3BDB",
      "700": "#4329AE"
    },
    "orange": {
      "50": "#FFF3EE",
      "100": "#FFE3D7",
      "200": "#FFC3AA",
      "300": "#FF9D75",
      "400": "#FF7A45",
      "500": "#F55F24",
      "600": "#D24812",
      "700": "#A1360B"
    },
    "blue": {
      "50": "#EEF4FF",
      "100": "#DCE7FF",
      "200": "#B6CCFF",
      "300": "#84A9FF",
      "400": "#5585FF",
      "500": "#2F66F6",
      "600": "#1F4FD1",
      "700": "#173B9E"
    },
    "gold": {
      "50": "#FDF8EA",
      "100": "#FAEDC7",
      "200": "#F4DA8E",
      "300": "#ECBC44",
      "400": "#D9A632",
      "500": "#C39222",
      "600": "#9C7215",
      "700": "#6E500E"
    },
    "mint": {
      "50": "#EAFBF3",
      "100": "#CFF5E3",
      "300": "#7CE0B3",
      "500": "#1FB877",
      "600": "#13965F",
      "700": "#0E7048"
    },
    "red": {
      "50": "#FFF0F0",
      "100": "#FFDCDC",
      "300": "#FF9A9A",
      "500": "#F0453E",
      "600": "#CC2F29"
    },
    "amber": {
      "50": "#FFF8E6",
      "100": "#FFEDBF",
      "300": "#FFD266",
      "500": "#F5A70B",
      "600": "#CC8700",
      "700": "#8A5B00"
    },
    "volt": {
      "50": "#FBFEE5",
      "100": "#F5FDC0",
      "200": "#EDFB8C",
      "300": "#E6FA5E",
      "400": "#DFFA32",
      "500": "#C9E214",
      "600": "#9AAD0A",
      "700": "#5F6B05"
    },
    "signal": {
      "50": "#EAFCEF",
      "100": "#C9F7D5",
      "300": "#7BEB97",
      "400": "#4BE06E",
      "500": "#22C552",
      "600": "#15A140",
      "700": "#0E6E2C"
    },
    "electric": {
      "50": "#ECEFFF",
      "100": "#D3DAFF",
      "300": "#8A99FF",
      "400": "#4361F5",
      "500": "#0832D8",
      "600": "#0627B0",
      "700": "#051C80"
    },
    "ember": {
      "50": "#FFF1EB",
      "100": "#FFDCCC",
      "300": "#FF9A70",
      "400": "#FF7440",
      "500": "#FC5A10",
      "600": "#DB4410",
      "700": "#9E300A"
    },
    "orchid": {
      "50": "#FAF0FF",
      "100": "#F1DAFF",
      "300": "#D79BFF",
      "400": "#C16CF7",
      "500": "#A548EE",
      "600": "#8430C9",
      "700": "#5E1F91"
    },
    "stone": {
      "0": "#FFFFFF",
      "50": "#F7F7F8",
      "100": "#EFEFF1",
      "150": "#E7E7EA",
      "200": "#DCDCE0",
      "300": "#C3C3C9",
      "400": "#9B9BA3",
      "500": "#6B6B74",
      "550": "#5C5C64",
      "600": "#4E4E56",
      "700": "#2E2F33",
      "800": "#1D1E21",
      "900": "#131416",
      "950": "#0A0B0C"
    },
    "rose": {
      "50": "#FFF0F4",
      "100": "#FFDCE6",
      "300": "#F79AB6",
      "500": "#F0548A",
      "600": "#D23A6F",
      "700": "#9C2650"
    },
    "_doc": "neutral-light and neutral-dark are 12-step scales (Radix usage): 1–2 backgrounds, 3–5 control fills (rest/hover/pressed), 6–8 borders, 9–10 solid/tertiary, 11–12 text. Dark is tuned separately, not inverted. The colour families below are accent and status sources; stone/ink/gray are kept for v3 compatibility."
  },
  "theme": {
    "_doc": "Semantic roles. Every theme defines every key. Values: {family.step} = primitive, $role = another semantic role, or a literal. Accent (secondary), brand-panel and border-focus roles are computed from the chosen colours by assets/tokens/rdl-theme.js and generated per preset; the brand theme is computed entirely from its two colours.",
    "light": {
      "bg-canvas": "{neutral-light.3}",
      "bg-canvas-elevated": "{neutral-light.2}",
      "bg-surface": "#FFFFFF",
      "bg-surface-raised": "#FFFFFF",
      "bg-surface-sunken": "{neutral-light.2}",
      "bg-emphasis": "{neutral-light.12}",
      "bg-emphasis-raised": "#2A2A2A",
      "bg-scrim": "rgba(10,11,12,0.48)",
      "fill-control": "{neutral-light.4}",
      "fill-control-hover": "{neutral-light.5}",
      "fill-control-pressed": "{neutral-light.6}",
      "fill-disabled": "rgba(21,21,21,0.12)",
      "fg-primary": "{neutral-light.12}",
      "fg-secondary": "{neutral-light.11}",
      "fg-tertiary": "{neutral-light.10}",
      "fg-disabled": "rgba(21,21,21,0.38)",
      "fg-on-emphasis": "{neutral-dark.12}",
      "fg-on-emphasis-secondary": "#A3A3A3",
      "border-subtle": "{neutral-light.4}",
      "border-default": "{neutral-light.6}",
      "border-strong": "{neutral-light.8}",
      "border-focus": "$accent-graphic",
      "action-primary": "{neutral-light.12}",
      "action-primary-hover": "#282828",
      "action-primary-pressed": "#313131",
      "on-action-primary": "#FFFFFF",
      "action-secondary": "{neutral-light.4}",
      "action-secondary-hover": "{neutral-light.5}",
      "action-secondary-pressed": "{neutral-light.6}",
      "on-action-secondary": "{neutral-light.12}",
      "success": "#1FB877",
      "success-subtle": "#E4F6EF",
      "success-text": "#0E7048",
      "warning": "#F5A70B",
      "warning-subtle": "#FEF4E2",
      "warning-text": "#8A5B00",
      "danger": "#F0453E",
      "danger-subtle": "#FDE9E8",
      "danger-text": "#C2241E",
      "info": "#2F66F6",
      "info-subtle": "#E6EDFE",
      "info-text": "#1F4FD1",
      "material-ultrathin": "rgba(255,255,255,0.24)",
      "material-thin": "rgba(255,255,255,0.4)",
      "material-regular": "rgba(255,255,255,0.56)",
      "material-thick": "rgba(255,255,255,0.78)",
      "material-border": "rgba(255,255,255,0.72)",
      "material-highlight": "rgba(255,255,255,0.9)",
      "material-shade": "rgba(20,20,24,0.06)",
      "material-dark": "rgba(22,23,26,0.52)",
      "material-dark-border": "rgba(255,255,255,0.10)",
      "chart-track": "{neutral-light.4}",
      "chart-grid": "{neutral-light.4}",
      "chart-muted": "{neutral-light.6}",
      "chart-hatch": "{neutral-light.7}",
      "tick": "rgba(21,21,21,0.28)",
      "tick-strong": "{neutral-light.12}",
      "shadow-e1": "0 1px 2px rgba(21,21,21,0.04), 0 2px 8px rgba(21,21,21,0.04)",
      "shadow-e2": "0 4px 12px rgba(21,21,21,0.05), 0 12px 32px rgba(21,21,21,0.06)",
      "shadow-e3": "0 12px 24px rgba(21,21,21,0.08), 0 24px 56px rgba(21,21,21,0.10)",
      "shadow-e4": "0 16px 40px rgba(11,11,13,0.24)",
      "shadow-glass": "0 1px 0 rgba(255,255,255,0.6) inset, 0 20px 50px rgba(20,20,24,0.12)"
    },
    "dark": {
      "bg-canvas": "{neutral-dark.1}",
      "bg-canvas-elevated": "{neutral-dark.2}",
      "bg-surface": "{neutral-dark.3}",
      "bg-surface-raised": "{neutral-dark.4}",
      "bg-surface-sunken": "{neutral-dark.2}",
      "bg-emphasis": "#26272B",
      "bg-emphasis-raised": "#34353A",
      "bg-scrim": "rgba(0,0,0,0.64)",
      "fill-control": "{neutral-dark.5}",
      "fill-control-hover": "{neutral-dark.6}",
      "fill-control-pressed": "{neutral-dark.7}",
      "fill-disabled": "rgba(242,242,243,0.12)",
      "fg-primary": "{neutral-dark.12}",
      "fg-secondary": "{neutral-dark.11}",
      "fg-tertiary": "{neutral-dark.10}",
      "fg-disabled": "rgba(242,242,243,0.38)",
      "fg-on-emphasis": "{neutral-dark.12}",
      "fg-on-emphasis-secondary": "{neutral-dark.11}",
      "border-subtle": "{neutral-dark.5}",
      "border-default": "{neutral-dark.6}",
      "border-strong": "{neutral-dark.8}",
      "border-focus": "$accent-graphic",
      "action-primary": "{neutral-dark.12}",
      "action-primary-hover": "#DFE0E1",
      "action-primary-pressed": "#D6D6D7",
      "on-action-primary": "{neutral-dark.1}",
      "action-secondary": "{neutral-dark.5}",
      "action-secondary-hover": "{neutral-dark.6}",
      "action-secondary-pressed": "{neutral-dark.7}",
      "on-action-secondary": "{neutral-dark.12}",
      "success": "#4BD394",
      "success-subtle": "#1F362E",
      "success-text": "#7CE0B3",
      "warning": "#FFC23D",
      "warning-subtle": "#3C3320",
      "warning-text": "#FFD266",
      "danger": "#FF6B64",
      "danger-subtle": "#3C2526",
      "danger-text": "#FF9A9A",
      "info": "#6E95FF",
      "info-subtle": "#252C3F",
      "info-text": "#9DB8FF",
      "material-ultrathin": "rgba(28,30,33,0.32)",
      "material-thin": "rgba(28,30,33,0.44)",
      "material-regular": "rgba(28,30,33,0.52)",
      "material-thick": "rgba(36,38,42,0.72)",
      "material-border": "rgba(255,255,255,0.10)",
      "material-highlight": "rgba(255,255,255,0.08)",
      "material-shade": "rgba(0,0,0,0.30)",
      "material-dark": "rgba(22,23,26,0.52)",
      "material-dark-border": "rgba(255,255,255,0.10)",
      "chart-track": "{neutral-dark.4}",
      "chart-grid": "{neutral-dark.5}",
      "chart-muted": "{neutral-dark.6}",
      "chart-hatch": "{neutral-dark.8}",
      "tick": "rgba(242,242,243,0.30)",
      "tick-strong": "{neutral-dark.12}",
      "shadow-e1": "0 1px 2px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20)",
      "shadow-e2": "0 4px 12px rgba(0,0,0,0.30), 0 12px 32px rgba(0,0,0,0.32)",
      "shadow-e3": "0 12px 24px rgba(0,0,0,0.36), 0 24px 56px rgba(0,0,0,0.44)",
      "shadow-e4": "0 16px 40px rgba(0,0,0,0.56)",
      "shadow-glass": "0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45)"
    }
  },
  "brand": {
    "_doc": "Brand theme presets: [primary, secondary]. primary fills the canvas (deepened only if text would fail 4.5:1); secondary is the highlight. Light and dark also use the default preset's primary for brand panels (bg-brand). Add your own pair here and rebuild, or call RDL.setTheme('brand', { primary, secondary }) / RDLTheme.apply(.brand(primary:secondary:)) at runtime. Measured on the board: research/theme-scan.md.",
    "default": "cobalt",
    "presets": {
      "cobalt": {
        "primary": "#0732D8",
        "secondary": "#F2D33C",
        "source": "1:20, 1:58, 1:114, 1:168 (canvas #0732D8); yellow squares 1:55"
      },
      "mustard": {
        "primary": "#ECBB42",
        "secondary": "#2A4BDC",
        "source": "1:16, 1:106, 1:167, 1:210, 1:212 (canvas #ECBB42)"
      },
      "gold": {
        "primary": "#D9A632",
        "secondary": "#1F4A3E",
        "source": "gold-investment variant of mustard, forest highlight"
      },
      "olive": {
        "primary": "#687B59",
        "secondary": "#D7F23A",
        "source": "1:46, 1:88 (canvas #687B59); lime 1:163, 1:174"
      },
      "forest": {
        "primary": "#1F4A3E",
        "secondary": "#D7F23A",
        "source": "1:205, 1:208 (forest cards); lime pill 1:116"
      },
      "lavender": {
        "primary": "#AD80D4",
        "secondary": "#F27A3A",
        "source": "1:6 lavender canvas with orange tag; 1:67"
      },
      "plum": {
        "primary": "#2F1125",
        "secondary": "#F2D33C",
        "source": "1:66 plum canvas with yellow pill"
      },
      "vermilion": {
        "primary": "#D44C27",
        "secondary": "#D7F23A",
        "source": "1:155, 1:217 (vermilion canvas)"
      },
      "dusk": {
        "primary": "#7599AD",
        "secondary": "#F6E27A",
        "source": "1:73, 1:86, 1:195 (dusty blue canvas, yellow glow)"
      }
    }
  },
  "accents": {
    "_doc": "Secondary-colour presets for light and dark (data-accent). Each value is the user's secondary colour; accent, accent-hover, accent-pressed, accent-subtle, accent-text, accent-graphic and on-accent are computed per theme with contrast guarantees.",
    "default": "volt",
    "volt": "#DFFA32",
    "lime": "#CBEF43",
    "gold": "#ECBC44",
    "signal": "#4BE06E",
    "electric": "#0832D8",
    "ember": "#FC5A10",
    "orchid": "#C16CF7",
    "violet": "#7152F5",
    "orange": "#F55F24",
    "ocean": "#2F66F6",
    "rose": "#F0548A"
  },
  "state": {
    "_doc": "Material 3 state layers: overlay the on-colour at this opacity. Disabled: content and container opacities.",
    "hover": 0.08,
    "focus": 0.12,
    "pressed": 0.12,
    "dragged": 0.16,
    "disabled-content": 0.38,
    "disabled-container": 0.12
  },
  "opacity": {
    "0": 0,
    "4": 0.04,
    "8": 0.08,
    "12": 0.12,
    "16": 0.16,
    "24": 0.24,
    "38": 0.38,
    "40": 0.4,
    "56": 0.56,
    "60": 0.6,
    "72": 0.72,
    "80": 0.8,
    "100": 1
  },
  "border-width": {
    "hairline": 1,
    "default": 1,
    "strong": 1.5,
    "focus": 2,
    "focus-offset": 2
  },
  "z-index": {
    "base": 0,
    "raised": 1,
    "sticky": 100,
    "dock": 200,
    "dropdown": 300,
    "overlay": 400,
    "sheet": 500,
    "modal": 600,
    "toast": 700,
    "tooltip": 800
  },
  "breakpoint": {
    "_doc": "Material 3 window size classes. compact uses the mobile skeleton; medium 8 columns; expanded and up 12 columns.",
    "compact": 0,
    "medium": 600,
    "expanded": 840,
    "large": 1200,
    "extra-large": 1600
  },
  "type": {
    "family": {
      "sans": "\"Urbanist\", \"SF Pro Display\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      "dot": "\"Doto\", \"Urbanist\", ui-monospace, monospace",
      "flat": "\"Inter\", \"SF Pro Display\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      "mono": "\"JetBrains Mono\", \"SF Mono\", ui-monospace, monospace"
    },
    "scale": {
      "hero": {
        "size": 96,
        "line": 92,
        "weight": 300,
        "tracking": -0.04
      },
      "display-xl": {
        "size": 72,
        "line": 72,
        "weight": 300,
        "tracking": -0.035
      },
      "display": {
        "size": 56,
        "line": 58,
        "weight": 300,
        "tracking": -0.03
      },
      "numeral": {
        "size": 40,
        "line": 44,
        "weight": 300,
        "tracking": -0.02
      },
      "h1": {
        "size": 34,
        "line": 38,
        "weight": 400,
        "tracking": -0.02
      },
      "h2": {
        "size": 26,
        "line": 30,
        "weight": 400,
        "tracking": -0.015
      },
      "h3": {
        "size": 20,
        "line": 24,
        "weight": 500,
        "tracking": -0.01
      },
      "title": {
        "size": 17,
        "line": 22,
        "weight": 500,
        "tracking": -0.005
      },
      "body": {
        "size": 15,
        "line": 22,
        "weight": 400,
        "tracking": 0
      },
      "body-strong": {
        "size": 15,
        "line": 22,
        "weight": 600,
        "tracking": 0
      },
      "label": {
        "size": 14,
        "line": 18,
        "weight": 500,
        "tracking": 0
      },
      "meta": {
        "size": 13,
        "line": 18,
        "weight": 500,
        "tracking": 0
      },
      "caption": {
        "size": 12,
        "line": 16,
        "weight": 400,
        "tracking": 0.005
      },
      "micro": {
        "size": 11,
        "line": 14,
        "weight": 500,
        "tracking": 0.04
      }
    },
    "numerals": {
      "unit-scale": 0.38,
      "unit-weight": 400,
      "_doc": "Units (kW, %, mg/dl, $) render at 38% of the number size in text-secondary; leading zeros and decimals may be muted."
    },
    "roles": {
      "_doc": "How RDL type roles map to platform roles (for Dynamic Type and M3 naming).",
      "hero": "M3 display-large (57) · enlarged",
      "display-xl": "M3 display-large",
      "display": "M3 display-medium · iOS largeTitle (scaled)",
      "numeral": "M3 display-small · iOS largeTitle",
      "h1": "M3 headline-medium · iOS largeTitle (34)",
      "h2": "M3 headline-small · iOS title1",
      "h3": "M3 title-large · iOS title3 (20)",
      "title": "M3 title-medium · iOS headline (17)",
      "body": "M3 body-large · iOS subheadline (15)",
      "body-strong": "M3 body-large (600)",
      "label": "M3 label-large (14)",
      "meta": "M3 body-small · iOS footnote (13)",
      "caption": "M3 label-medium · iOS caption1 (12)",
      "micro": "M3 label-small · iOS caption2 (11)"
    }
  },
  "space": {
    "0": 0,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "10": 40,
    "12": 48,
    "14": 56,
    "16": 64,
    "20": 80,
    "0.5": 2,
    "1.5": 6,
    "2.5": 10
  },
  "layout": {
    "_doc": "Layout system (references/layout.md). Mobile = 393pt canvas; web = 12-col grid.",
    "mobile-gutter": 20,
    "card-padding": 20,
    "card-padding-sm": 16,
    "card-gap": 12,
    "section-gap": 32,
    "stack-tight": 4,
    "stack": 8,
    "stack-loose": 16,
    "header-height": 48,
    "header-top": 8,
    "title-gap": 24,
    "bottom-zone": 120,
    "pin-bottom": 34,
    "web-sidebar": 248,
    "web-gutter": 32,
    "web-grid-gap": 16,
    "web-bento-gap": 12,
    "web-header-height": 64
  },
  "radius": {
    "_doc": "Concentric nesting: inner = outer − gap, where gap = padding + border (+ any wrapper offset). Going deeper: A · strict halves the padding (24/8→16/4→12/4→8, concentric) or B · soft keeps the padding and subtracts half of it (same radii, even bands). Never clamp the radius up. Chains: 48/20→28 · 40/20→20 · 40/16→24 · 40/12→28 · 32/8→24 · 28/16→12 · 28/12→16 · 28/20→8. Pills and circles are exempt. See references/radius.md.",
    "xs": 6,
    "sm": 8,
    "md": 12,
    "tile": 14,
    "base": 16,
    "lg": 20,
    "panel": 24,
    "xl": 28,
    "2xl": 32,
    "3xl": 40,
    "sheet": 48,
    "pill": 999
  },
  "size": {
    "_doc": "Control heights form one ladder. Use one height per row; header items share 48.",
    "tag": 24,
    "control-xs": 32,
    "control-sm": 40,
    "control-md": 48,
    "control-lg": 56,
    "control-xl": 64,
    "icon-button": 48,
    "orb": 48,
    "orb-lg": 56,
    "tile": 48,
    "dock": 64,
    "dock-item": 52,
    "slide": 64,
    "slide-knob": 52,
    "tab-bar": 64,
    "avatar-sm": 32,
    "avatar-md": 40,
    "avatar-lg": 56,
    "icon-sm": 16,
    "icon-md": 20,
    "icon-lg": 24
  },
  "shadow": {
    "_doc": "Legacy names. Use the themed shadow-e1…e4 / shadow-glass roles; these resolve to them.",
    "none": "none",
    "sm": "$shadow-e1",
    "md": "$shadow-e2",
    "lg": "$shadow-e3",
    "float": "$shadow-e4",
    "glass": "$shadow-glass",
    "glass-dark": "0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45)",
    "glow": "0 0 32px var(--rdl-accent)"
  },
  "motion": {
    "duration": {
      "instant": 50,
      "fast": 120,
      "base": 200,
      "slow": 320,
      "chart": 600,
      "_doc": "Material 3 bands: short 50–200 (fast, base), medium 250–400 (slow), long 450–600 (chart)."
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0, 0, 1)",
      "standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
      "standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
      "emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1)",
      "emphasized-accelerate": "cubic-bezier(0.3, 0, 0.8, 0.15)",
      "emphasized": "cubic-bezier(0.3, 0, 0, 1.15)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)"
    },
    "spring": {
      "response": 0.35,
      "damping": 0.82
    },
    "stagger": 40
  },
  "component": {
    "_doc": "Component roles reference semantic roles ($role) or scales ({size.x}, {radius.x}). Components consume these; restyle a component by changing its row, not its CSS.",
    "button-primary": {
      "bg": "$action-primary",
      "bg-hover": "$action-primary-hover",
      "bg-pressed": "$action-primary-pressed",
      "fg": "$on-action-primary",
      "bg-disabled": "$fill-disabled",
      "fg-disabled": "$fg-disabled",
      "height": "{size.control-lg}",
      "radius": "{radius.pill}",
      "padding-x": "{space.6}"
    },
    "button-secondary": {
      "bg": "$action-secondary",
      "bg-hover": "$action-secondary-hover",
      "bg-pressed": "$action-secondary-pressed",
      "fg": "$on-action-secondary",
      "bg-disabled": "$fill-disabled",
      "fg-disabled": "$fg-disabled",
      "height": "{size.control-lg}",
      "radius": "{radius.pill}",
      "padding-x": "{space.6}"
    },
    "button-accent": {
      "bg": "$accent",
      "bg-hover": "$accent-hover",
      "bg-pressed": "$accent-pressed",
      "fg": "$on-accent",
      "height": "{size.control-lg}",
      "radius": "{radius.pill}",
      "padding-x": "{space.6}"
    },
    "orb": {
      "bg": "$fill-control",
      "bg-hover": "$fill-control-hover",
      "bg-pressed": "$fill-control-pressed",
      "fg": "$fg-primary",
      "bg-selected": "$action-primary",
      "fg-selected": "$on-action-primary",
      "size": "{size.orb}",
      "icon": "{size.icon-md}"
    },
    "chip": {
      "bg": "$fill-control",
      "bg-hover": "$fill-control-hover",
      "fg": "$fg-primary",
      "bg-selected": "$action-primary",
      "fg-selected": "$on-action-primary",
      "height": "{size.control-sm}",
      "radius": "{radius.pill}",
      "padding-x": "{space.4}"
    },
    "tag": {
      "bg": "$fill-control",
      "fg": "$fg-secondary",
      "height": "{size.tag}",
      "radius": "{radius.pill}",
      "padding-x": "{space.2_5}"
    },
    "segmented": {
      "track": "$fill-control",
      "thumb": "$action-primary",
      "fg-selected": "$on-action-primary",
      "fg": "$fg-secondary",
      "height": "{size.control-md}",
      "item-height": "{size.control-sm}",
      "inset": "{space.1}"
    },
    "input": {
      "bg": "$fill-control",
      "bg-focus": "$bg-surface",
      "fg": "$fg-primary",
      "placeholder": "$fg-tertiary",
      "border": "$border-subtle",
      "border-focus": "$border-focus",
      "height": "{size.control-md}",
      "radius": "{radius.pill}"
    },
    "card": {
      "bg": "$bg-surface",
      "fg": "$fg-primary",
      "border": "$border-subtle",
      "radius": "$radius-card",
      "shadow": "none"
    },
    "card-glass": {
      "bg": "$material-regular",
      "border": "$material-border",
      "shadow": "$shadow-glass",
      "radius": "$radius-card"
    },
    "card-emphasis": {
      "bg": "$bg-emphasis",
      "fg": "$fg-on-emphasis",
      "fg-secondary": "$fg-on-emphasis-secondary",
      "radius": "$radius-card"
    },
    "card-brand": {
      "bg": "$bg-brand",
      "fg": "$fg-on-brand",
      "fg-secondary": "$fg-on-brand-secondary",
      "radius": "$radius-card"
    },
    "sheet": {
      "bg": "$bg-canvas-elevated",
      "radius": "{radius.sheet}",
      "grabber": "$border-strong",
      "scrim": "$bg-scrim",
      "shadow": "$shadow-e4"
    },
    "dock": {
      "bg": "$material-thick",
      "border": "$material-border",
      "item-selected": "$action-primary",
      "fg-selected": "$on-action-primary",
      "fg": "$fg-secondary",
      "height": "{size.dock}"
    },
    "toggle": {
      "track": "$fill-control-pressed",
      "track-on": "$accent",
      "thumb": "#FFFFFF",
      "thumb-on": "$on-accent"
    },
    "status": {
      "success-bg": "$success-subtle",
      "success-fg": "$success-text",
      "warning-bg": "$warning-subtle",
      "warning-fg": "$warning-text",
      "danger-bg": "$danger-subtle",
      "danger-fg": "$danger-text",
      "info-bg": "$info-subtle",
      "info-fg": "$info-text",
      "dot": "{size.icon-sm}"
    },
    "focus": {
      "ring": "$border-focus",
      "width": "{border-width.focus}",
      "offset": "{border-width.focus-offset}"
    }
  },
  "legacy": {
    "_doc": "v3 role names, kept as aliases so existing screens keep working. Prefer the v4 names.",
    "bg-surface-muted": "bg-surface-sunken",
    "bg-hero": "bg-emphasis",
    "bg-hero-raised": "bg-emphasis-raised",
    "scrim": "bg-scrim",
    "fill-control-strong": "action-primary",
    "text-primary": "fg-primary",
    "text-secondary": "fg-secondary",
    "text-tertiary": "fg-tertiary",
    "text-on-hero": "fg-on-emphasis",
    "text-on-hero-muted": "fg-on-emphasis-secondary",
    "text-on-strong": "on-action-primary",
    "success-soft": "success-subtle",
    "danger-soft": "danger-subtle",
    "warning-soft": "warning-subtle",
    "info-soft": "info-subtle",
    "glass-fill": "material-regular",
    "glass-fill-strong": "material-thick",
    "glass-border": "material-border",
    "glass-shade": "material-shade",
    "glass-text": "fg-primary",
    "glass-text-muted": "fg-secondary",
    "glass-dark-fill": "material-dark",
    "glass-dark-border": "material-dark-border",
    "accent-strong": "accent-hover",
    "accent-soft": "accent-subtle"
  },
  "styles": {
    "flat": {
      "description": "v1 look: flat white cards on gray, Inter, medium-weight numerals, smaller radii, no glass.",
      "light": {
        "bg-canvas": "{gray.100}",
        "bg-surface-sunken": "{gray.100}",
        "bg-emphasis": "{ink.950}",
        "bg-emphasis-raised": "{ink.700}",
        "material-regular": "{gray.0}",
        "material-thick": "{gray.0}",
        "material-border": "rgba(0,0,0,0)"
      },
      "dark": {
        "bg-canvas": "{ink.950}",
        "bg-surface": "#17171A",
        "bg-surface-sunken": "#202024",
        "bg-emphasis": "#232327",
        "material-regular": "#17171A",
        "material-thick": "#202024",
        "material-border": "rgba(0,0,0,0)",
        "bg-emphasis-raised": "{ink.600}"
      },
      "vars": {
        "font-sans": "\"Inter\", \"SF Pro Display\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
        "num-weight": "500",
        "display-weight": "500",
        "radius-card": "24px",
        "radius-widget": "28px",
        "glass-blur": "0px"
      }
    }
  },
  "aura": {
    "_doc": "Soft gradient washes used as card fills and screen backdrops. radial: [shape at position, stops]; linear: [angle, stops]. Stops are [color, 0..1].",
    "gold": {
      "type": "radial",
      "at": "85% 0%",
      "stops": [
        [
          "#F2C95C",
          0
        ],
        [
          "#F3E3BC",
          0.38
        ],
        [
          "#EFEFF1",
          0.78
        ]
      ]
    },
    "sunset": {
      "type": "radial",
      "at": "50% 50%",
      "stops": [
        [
          "#FF8A1F",
          0
        ],
        [
          "#FF6FA0",
          0.45
        ],
        [
          "#9FB7FF",
          1
        ]
      ]
    },
    "meadow": {
      "type": "linear",
      "angle": 160,
      "stops": [
        [
          "#2FBF4E",
          0
        ],
        [
          "#B8F03C",
          0.7
        ],
        [
          "#EEF7C8",
          1
        ]
      ]
    },
    "dusk": {
      "type": "linear",
      "angle": 165,
      "stops": [
        [
          "#5E5A26",
          0
        ],
        [
          "#8A5646",
          0.55
        ],
        [
          "#9A5A6A",
          1
        ]
      ]
    },
    "orchid": {
      "type": "linear",
      "angle": 150,
      "stops": [
        [
          "#E046C8",
          0
        ],
        [
          "#8A3BEF",
          1
        ]
      ]
    },
    "ocean": {
      "type": "linear",
      "angle": 180,
      "stops": [
        [
          "#122347",
          0
        ],
        [
          "#1B5B6B",
          1
        ]
      ]
    },
    "ember": {
      "type": "linear",
      "angle": 150,
      "stops": [
        [
          "#F2A04A",
          0
        ],
        [
          "#EBD2AE",
          1
        ]
      ]
    },
    "fog": {
      "type": "linear",
      "angle": 180,
      "stops": [
        [
          "#DCE3EA",
          0
        ],
        [
          "#F4F5F7",
          1
        ]
      ]
    },
    "rose": {
      "type": "radial",
      "at": "50% 40%",
      "stops": [
        [
          "#F0548A",
          0
        ],
        [
          "#F79AB6",
          0.45
        ],
        [
          "#EDE6F2",
          1
        ]
      ]
    }
  },
  "glass": {
    "blur": 24,
    "saturate": 1.6,
    "edge": "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.6))",
    "iridescent": "linear-gradient(120deg, rgba(255,120,200,0.55), rgba(120,200,255,0.55) 35%, rgba(200,255,150,0.45) 65%, rgba(255,220,120,0.5))"
  }
}
```

## Appendix B · `assets/tokens/tokens.css`

Generated CSS custom properties: themes, styles, accents, auras, type classes.

```css
/* GENERATED by scripts/build_tokens.mjs from tokens.json — do not edit by hand. */

/* ===== Constants: primitives and scales (theme-independent) ===== */
:root {
  --rdl-neutral-light-1: #FCFCFC;
  --rdl-neutral-light-2: #F7F7F6;
  --rdl-neutral-light-3: #F0F0EF;
  --rdl-neutral-light-4: #E8E8E7;
  --rdl-neutral-light-5: #E1E1E0;
  --rdl-neutral-light-6: #D9D9D8;
  --rdl-neutral-light-7: #CECECD;
  --rdl-neutral-light-8: #BBBBBA;
  --rdl-neutral-light-9: #8D8D8C;
  --rdl-neutral-light-10: #7A7A79;
  --rdl-neutral-light-11: #5E5E5D;
  --rdl-neutral-light-12: #151515;
  --rdl-neutral-dark-1: #0A0B0C;
  --rdl-neutral-dark-2: #111214;
  --rdl-neutral-dark-3: #17181A;
  --rdl-neutral-dark-4: #1E1F22;
  --rdl-neutral-dark-5: #25262A;
  --rdl-neutral-dark-6: #2D2E33;
  --rdl-neutral-dark-7: #393A40;
  --rdl-neutral-dark-8: #4A4B52;
  --rdl-neutral-dark-9: #6E6F76;
  --rdl-neutral-dark-10: #7C7D84;
  --rdl-neutral-dark-11: #A9AAB0;
  --rdl-neutral-dark-12: #F2F2F3;
  --rdl-ink-600: #34343A;
  --rdl-ink-700: #26262B;
  --rdl-ink-800: #1C1C20;
  --rdl-ink-900: #141417;
  --rdl-ink-950: #0B0B0D;
  --rdl-gray-0: #FFFFFF;
  --rdl-gray-50: #F8F8FA;
  --rdl-gray-100: #F3F3F5;
  --rdl-gray-150: #EBEBEF;
  --rdl-gray-200: #E2E2E7;
  --rdl-gray-300: #C8C8CF;
  --rdl-gray-400: #9A9AA3;
  --rdl-gray-500: #6E6E78;
  --rdl-gray-600: #55555E;
  --rdl-lime-50: #F7FDE3;
  --rdl-lime-100: #EEFBC4;
  --rdl-lime-200: #E3F89A;
  --rdl-lime-300: #D8F56F;
  --rdl-lime-400: #CBEF43;
  --rdl-lime-500: #B2D92A;
  --rdl-lime-600: #8CAF12;
  --rdl-lime-700: #5F7A08;
  --rdl-violet-50: #F4F1FF;
  --rdl-violet-100: #E9E3FF;
  --rdl-violet-200: #D2C6FF;
  --rdl-violet-300: #B09CFF;
  --rdl-violet-400: #9076FF;
  --rdl-violet-500: #7152F5;
  --rdl-violet-600: #5A3BDB;
  --rdl-violet-700: #4329AE;
  --rdl-orange-50: #FFF3EE;
  --rdl-orange-100: #FFE3D7;
  --rdl-orange-200: #FFC3AA;
  --rdl-orange-300: #FF9D75;
  --rdl-orange-400: #FF7A45;
  --rdl-orange-500: #F55F24;
  --rdl-orange-600: #D24812;
  --rdl-orange-700: #A1360B;
  --rdl-blue-50: #EEF4FF;
  --rdl-blue-100: #DCE7FF;
  --rdl-blue-200: #B6CCFF;
  --rdl-blue-300: #84A9FF;
  --rdl-blue-400: #5585FF;
  --rdl-blue-500: #2F66F6;
  --rdl-blue-600: #1F4FD1;
  --rdl-blue-700: #173B9E;
  --rdl-gold-50: #FDF8EA;
  --rdl-gold-100: #FAEDC7;
  --rdl-gold-200: #F4DA8E;
  --rdl-gold-300: #ECBC44;
  --rdl-gold-400: #D9A632;
  --rdl-gold-500: #C39222;
  --rdl-gold-600: #9C7215;
  --rdl-gold-700: #6E500E;
  --rdl-mint-50: #EAFBF3;
  --rdl-mint-100: #CFF5E3;
  --rdl-mint-300: #7CE0B3;
  --rdl-mint-500: #1FB877;
  --rdl-mint-600: #13965F;
  --rdl-mint-700: #0E7048;
  --rdl-red-50: #FFF0F0;
  --rdl-red-100: #FFDCDC;
  --rdl-red-300: #FF9A9A;
  --rdl-red-500: #F0453E;
  --rdl-red-600: #CC2F29;
  --rdl-amber-50: #FFF8E6;
  --rdl-amber-100: #FFEDBF;
  --rdl-amber-300: #FFD266;
  --rdl-amber-500: #F5A70B;
  --rdl-amber-600: #CC8700;
  --rdl-amber-700: #8A5B00;
  --rdl-volt-50: #FBFEE5;
  --rdl-volt-100: #F5FDC0;
  --rdl-volt-200: #EDFB8C;
  --rdl-volt-300: #E6FA5E;
  --rdl-volt-400: #DFFA32;
  --rdl-volt-500: #C9E214;
  --rdl-volt-600: #9AAD0A;
  --rdl-volt-700: #5F6B05;
  --rdl-signal-50: #EAFCEF;
  --rdl-signal-100: #C9F7D5;
  --rdl-signal-300: #7BEB97;
  --rdl-signal-400: #4BE06E;
  --rdl-signal-500: #22C552;
  --rdl-signal-600: #15A140;
  --rdl-signal-700: #0E6E2C;
  --rdl-electric-50: #ECEFFF;
  --rdl-electric-100: #D3DAFF;
  --rdl-electric-300: #8A99FF;
  --rdl-electric-400: #4361F5;
  --rdl-electric-500: #0832D8;
  --rdl-electric-600: #0627B0;
  --rdl-electric-700: #051C80;
  --rdl-ember-50: #FFF1EB;
  --rdl-ember-100: #FFDCCC;
  --rdl-ember-300: #FF9A70;
  --rdl-ember-400: #FF7440;
  --rdl-ember-500: #FC5A10;
  --rdl-ember-600: #DB4410;
  --rdl-ember-700: #9E300A;
  --rdl-orchid-50: #FAF0FF;
  --rdl-orchid-100: #F1DAFF;
  --rdl-orchid-300: #D79BFF;
  --rdl-orchid-400: #C16CF7;
  --rdl-orchid-500: #A548EE;
  --rdl-orchid-600: #8430C9;
  --rdl-orchid-700: #5E1F91;
  --rdl-stone-0: #FFFFFF;
  --rdl-stone-50: #F7F7F8;
  --rdl-stone-100: #EFEFF1;
  --rdl-stone-150: #E7E7EA;
  --rdl-stone-200: #DCDCE0;
  --rdl-stone-300: #C3C3C9;
  --rdl-stone-400: #9B9BA3;
  --rdl-stone-500: #6B6B74;
  --rdl-stone-550: #5C5C64;
  --rdl-stone-600: #4E4E56;
  --rdl-stone-700: #2E2F33;
  --rdl-stone-800: #1D1E21;
  --rdl-stone-900: #131416;
  --rdl-stone-950: #0A0B0C;
  --rdl-rose-50: #FFF0F4;
  --rdl-rose-100: #FFDCE6;
  --rdl-rose-300: #F79AB6;
  --rdl-rose-500: #F0548A;
  --rdl-rose-600: #D23A6F;
  --rdl-rose-700: #9C2650;

  --rdl-font-sans: "Urbanist", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --rdl-font-dot: "Doto", "Urbanist", ui-monospace, monospace;
  --rdl-font-flat: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --rdl-font-mono: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  --rdl-num-weight: 300;
  --rdl-display-weight: 300;
  --rdl-unit-scale: 0.38;
  --rdl-space-0: 0px;
  --rdl-space-1: 4px;
  --rdl-space-2: 8px;
  --rdl-space-3: 12px;
  --rdl-space-4: 16px;
  --rdl-space-5: 20px;
  --rdl-space-6: 24px;
  --rdl-space-7: 28px;
  --rdl-space-8: 32px;
  --rdl-space-10: 40px;
  --rdl-space-12: 48px;
  --rdl-space-14: 56px;
  --rdl-space-16: 64px;
  --rdl-space-20: 80px;
  --rdl-space-0_5: 2px;
  --rdl-space-1_5: 6px;
  --rdl-space-2_5: 10px;
  --rdl-mobile-gutter: 20px;
  --rdl-card-padding: 20px;
  --rdl-card-padding-sm: 16px;
  --rdl-card-gap: 12px;
  --rdl-section-gap: 32px;
  --rdl-stack-tight: 4px;
  --rdl-stack: 8px;
  --rdl-stack-loose: 16px;
  --rdl-header-height: 48px;
  --rdl-header-top: 8px;
  --rdl-title-gap: 24px;
  --rdl-bottom-zone: 120px;
  --rdl-pin-bottom: 34px;
  --rdl-web-sidebar: 248px;
  --rdl-web-gutter: 32px;
  --rdl-web-grid-gap: 16px;
  --rdl-web-bento-gap: 12px;
  --rdl-web-header-height: 64px;
  --rdl-radius-xs: 6px;
  --rdl-radius-sm: 8px;
  --rdl-radius-md: 12px;
  --rdl-radius-tile: 14px;
  --rdl-radius-base: 16px;
  --rdl-radius-lg: 20px;
  --rdl-radius-panel: 24px;
  --rdl-radius-xl: 28px;
  --rdl-radius-2xl: 32px;
  --rdl-radius-3xl: 40px;
  --rdl-radius-sheet: 48px;
  --rdl-radius-pill: 999px;
  --rdl-radius-card: 28px;
  --rdl-radius-widget: 40px;
  --rdl-size-tag: 24px;
  --rdl-size-control-xs: 32px;
  --rdl-size-control-sm: 40px;
  --rdl-size-control-md: 48px;
  --rdl-size-control-lg: 56px;
  --rdl-size-control-xl: 64px;
  --rdl-size-icon-button: 48px;
  --rdl-size-orb: 48px;
  --rdl-size-orb-lg: 56px;
  --rdl-size-tile: 48px;
  --rdl-size-dock: 64px;
  --rdl-size-dock-item: 52px;
  --rdl-size-slide: 64px;
  --rdl-size-slide-knob: 52px;
  --rdl-size-tab-bar: 64px;
  --rdl-size-avatar-sm: 32px;
  --rdl-size-avatar-md: 40px;
  --rdl-size-avatar-lg: 56px;
  --rdl-size-icon-sm: 16px;
  --rdl-size-icon-md: 20px;
  --rdl-size-icon-lg: 24px;
  --rdl-border-width-hairline: 1px;
  --rdl-border-width-default: 1px;
  --rdl-border-width-strong: 1.5px;
  --rdl-border-width-focus: 2px;
  --rdl-border-width-focus-offset: 2px;
  --rdl-state-hover: 0.08;
  --rdl-state-focus: 0.12;
  --rdl-state-pressed: 0.12;
  --rdl-state-dragged: 0.16;
  --rdl-state-disabled-content: 0.38;
  --rdl-state-disabled-container: 0.12;
  --rdl-opacity-0: 0;
  --rdl-opacity-4: 0.04;
  --rdl-opacity-8: 0.08;
  --rdl-opacity-12: 0.12;
  --rdl-opacity-16: 0.16;
  --rdl-opacity-24: 0.24;
  --rdl-opacity-38: 0.38;
  --rdl-opacity-40: 0.4;
  --rdl-opacity-56: 0.56;
  --rdl-opacity-60: 0.6;
  --rdl-opacity-72: 0.72;
  --rdl-opacity-80: 0.8;
  --rdl-opacity-100: 1;
  --rdl-z-base: 0;
  --rdl-z-raised: 1;
  --rdl-z-sticky: 100;
  --rdl-z-dock: 200;
  --rdl-z-dropdown: 300;
  --rdl-z-overlay: 400;
  --rdl-z-sheet: 500;
  --rdl-z-modal: 600;
  --rdl-z-toast: 700;
  --rdl-z-tooltip: 800;
  --rdl-breakpoint-compact: 0px;
  --rdl-breakpoint-medium: 600px;
  --rdl-breakpoint-expanded: 840px;
  --rdl-breakpoint-large: 1200px;
  --rdl-breakpoint-extra-large: 1600px;
  --rdl-duration-instant: 50ms;
  --rdl-duration-fast: 120ms;
  --rdl-duration-base: 200ms;
  --rdl-duration-slow: 320ms;
  --rdl-duration-chart: 600ms;
  --rdl-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --rdl-ease-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --rdl-ease-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);
  --rdl-ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --rdl-ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
  --rdl-ease-emphasized: cubic-bezier(0.3, 0, 0, 1.15);
  --rdl-ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --rdl-glass-blur: 24px;
  --rdl-glass-saturate: 1.6;
  --rdl-glass-edge: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.6));
  --rdl-glass-iridescent: linear-gradient(120deg, rgba(255,120,200,0.55), rgba(120,200,255,0.55) 35%, rgba(200,255,150,0.45) 65%, rgba(255,220,120,0.5));
  --rdl-aura-gold: radial-gradient(120% 110% at 85% 0%, #F2C95C 0%, #F3E3BC 38%, #EFEFF1 78%);
  --rdl-aura-sunset: radial-gradient(120% 110% at 50% 50%, #FF8A1F 0%, #FF6FA0 45%, #9FB7FF 100%);
  --rdl-aura-meadow: linear-gradient(160deg, #2FBF4E 0%, #B8F03C 70%, #EEF7C8 100%);
  --rdl-aura-dusk: linear-gradient(165deg, #5E5A26 0%, #8A5646 55%, #9A5A6A 100%);
  --rdl-aura-orchid: linear-gradient(150deg, #E046C8 0%, #8A3BEF 100%);
  --rdl-aura-ocean: linear-gradient(180deg, #122347 0%, #1B5B6B 100%);
  --rdl-aura-ember: linear-gradient(150deg, #F2A04A 0%, #EBD2AE 100%);
  --rdl-aura-fog: linear-gradient(180deg, #DCE3EA 0%, #F4F5F7 100%);
  --rdl-aura-rose: radial-gradient(120% 110% at 50% 40%, #F0548A 0%, #F79AB6 45%, #EDE6F2 100%);
}

/* ===== Theme: light (default) ===== */
:root, [data-theme="light"] {
  --rdl-bg-canvas: var(--rdl-neutral-light-3);
  --rdl-bg-canvas-elevated: var(--rdl-neutral-light-2);
  --rdl-bg-surface: #FFFFFF;
  --rdl-bg-surface-raised: #FFFFFF;
  --rdl-bg-surface-sunken: var(--rdl-neutral-light-2);
  --rdl-bg-emphasis: var(--rdl-neutral-light-12);
  --rdl-bg-emphasis-raised: #2A2A2A;
  --rdl-bg-scrim: rgba(10,11,12,0.48);
  --rdl-fill-control: var(--rdl-neutral-light-4);
  --rdl-fill-control-hover: var(--rdl-neutral-light-5);
  --rdl-fill-control-pressed: var(--rdl-neutral-light-6);
  --rdl-fill-disabled: rgba(21,21,21,0.12);
  --rdl-fg-primary: var(--rdl-neutral-light-12);
  --rdl-fg-secondary: var(--rdl-neutral-light-11);
  --rdl-fg-tertiary: var(--rdl-neutral-light-10);
  --rdl-fg-disabled: rgba(21,21,21,0.38);
  --rdl-fg-on-emphasis: var(--rdl-neutral-dark-12);
  --rdl-fg-on-emphasis-secondary: #A3A3A3;
  --rdl-border-subtle: var(--rdl-neutral-light-4);
  --rdl-border-default: var(--rdl-neutral-light-6);
  --rdl-border-strong: var(--rdl-neutral-light-8);
  --rdl-border-focus: var(--rdl-accent-graphic);
  --rdl-action-primary: var(--rdl-neutral-light-12);
  --rdl-action-primary-hover: #282828;
  --rdl-action-primary-pressed: #313131;
  --rdl-on-action-primary: #FFFFFF;
  --rdl-action-secondary: var(--rdl-neutral-light-4);
  --rdl-action-secondary-hover: var(--rdl-neutral-light-5);
  --rdl-action-secondary-pressed: var(--rdl-neutral-light-6);
  --rdl-on-action-secondary: var(--rdl-neutral-light-12);
  --rdl-success: #1FB877;
  --rdl-success-subtle: #E4F6EF;
  --rdl-success-text: #0E7048;
  --rdl-warning: #F5A70B;
  --rdl-warning-subtle: #FEF4E2;
  --rdl-warning-text: #8A5B00;
  --rdl-danger: #F0453E;
  --rdl-danger-subtle: #FDE9E8;
  --rdl-danger-text: #C2241E;
  --rdl-info: #2F66F6;
  --rdl-info-subtle: #E6EDFE;
  --rdl-info-text: #1F4FD1;
  --rdl-material-ultrathin: rgba(255,255,255,0.24);
  --rdl-material-thin: rgba(255,255,255,0.4);
  --rdl-material-regular: rgba(255,255,255,0.56);
  --rdl-material-thick: rgba(255,255,255,0.78);
  --rdl-material-border: rgba(255,255,255,0.72);
  --rdl-material-highlight: rgba(255,255,255,0.9);
  --rdl-material-shade: rgba(20,20,24,0.06);
  --rdl-material-dark: rgba(22,23,26,0.52);
  --rdl-material-dark-border: rgba(255,255,255,0.10);
  --rdl-chart-track: var(--rdl-neutral-light-4);
  --rdl-chart-grid: var(--rdl-neutral-light-4);
  --rdl-chart-muted: var(--rdl-neutral-light-6);
  --rdl-chart-hatch: var(--rdl-neutral-light-7);
  --rdl-tick: rgba(21,21,21,0.28);
  --rdl-tick-strong: var(--rdl-neutral-light-12);
  --rdl-shadow-e1: 0 1px 2px rgba(21,21,21,0.04), 0 2px 8px rgba(21,21,21,0.04);
  --rdl-shadow-e2: 0 4px 12px rgba(21,21,21,0.05), 0 12px 32px rgba(21,21,21,0.06);
  --rdl-shadow-e3: 0 12px 24px rgba(21,21,21,0.08), 0 24px 56px rgba(21,21,21,0.10);
  --rdl-shadow-e4: 0 16px 40px rgba(11,11,13,0.24);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.6) inset, 0 20px 50px rgba(20,20,24,0.12);
  --rdl-accent: #DFFA32;
  --rdl-accent-hover: #CFE830;
  --rdl-accent-pressed: #C7DF2F;
  --rdl-accent-subtle: #F9FEDA;
  --rdl-accent-text: #677317;
  --rdl-accent-graphic: #81911D;
  --rdl-on-accent: #151515;
  --rdl-bg-brand: #0732D8;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #BAC6F4;
  --rdl-brand-primary: #0732D8;
  --rdl-brand-secondary: #F2D33C;
  color-scheme: light;
}

/* ===== Theme: dark (explicit, or follows the system when no data-theme is set) ===== */
[data-theme="dark"] {
  --rdl-bg-canvas: var(--rdl-neutral-dark-1);
  --rdl-bg-canvas-elevated: var(--rdl-neutral-dark-2);
  --rdl-bg-surface: var(--rdl-neutral-dark-3);
  --rdl-bg-surface-raised: var(--rdl-neutral-dark-4);
  --rdl-bg-surface-sunken: var(--rdl-neutral-dark-2);
  --rdl-bg-emphasis: #26272B;
  --rdl-bg-emphasis-raised: #34353A;
  --rdl-bg-scrim: rgba(0,0,0,0.64);
  --rdl-fill-control: var(--rdl-neutral-dark-5);
  --rdl-fill-control-hover: var(--rdl-neutral-dark-6);
  --rdl-fill-control-pressed: var(--rdl-neutral-dark-7);
  --rdl-fill-disabled: rgba(242,242,243,0.12);
  --rdl-fg-primary: var(--rdl-neutral-dark-12);
  --rdl-fg-secondary: var(--rdl-neutral-dark-11);
  --rdl-fg-tertiary: var(--rdl-neutral-dark-10);
  --rdl-fg-disabled: rgba(242,242,243,0.38);
  --rdl-fg-on-emphasis: var(--rdl-neutral-dark-12);
  --rdl-fg-on-emphasis-secondary: var(--rdl-neutral-dark-11);
  --rdl-border-subtle: var(--rdl-neutral-dark-5);
  --rdl-border-default: var(--rdl-neutral-dark-6);
  --rdl-border-strong: var(--rdl-neutral-dark-8);
  --rdl-border-focus: var(--rdl-accent-graphic);
  --rdl-action-primary: var(--rdl-neutral-dark-12);
  --rdl-action-primary-hover: #DFE0E1;
  --rdl-action-primary-pressed: #D6D6D7;
  --rdl-on-action-primary: var(--rdl-neutral-dark-1);
  --rdl-action-secondary: var(--rdl-neutral-dark-5);
  --rdl-action-secondary-hover: var(--rdl-neutral-dark-6);
  --rdl-action-secondary-pressed: var(--rdl-neutral-dark-7);
  --rdl-on-action-secondary: var(--rdl-neutral-dark-12);
  --rdl-success: #4BD394;
  --rdl-success-subtle: #1F362E;
  --rdl-success-text: #7CE0B3;
  --rdl-warning: #FFC23D;
  --rdl-warning-subtle: #3C3320;
  --rdl-warning-text: #FFD266;
  --rdl-danger: #FF6B64;
  --rdl-danger-subtle: #3C2526;
  --rdl-danger-text: #FF9A9A;
  --rdl-info: #6E95FF;
  --rdl-info-subtle: #252C3F;
  --rdl-info-text: #9DB8FF;
  --rdl-material-ultrathin: rgba(28,30,33,0.32);
  --rdl-material-thin: rgba(28,30,33,0.44);
  --rdl-material-regular: rgba(28,30,33,0.52);
  --rdl-material-thick: rgba(36,38,42,0.72);
  --rdl-material-border: rgba(255,255,255,0.10);
  --rdl-material-highlight: rgba(255,255,255,0.08);
  --rdl-material-shade: rgba(0,0,0,0.30);
  --rdl-material-dark: rgba(22,23,26,0.52);
  --rdl-material-dark-border: rgba(255,255,255,0.10);
  --rdl-chart-track: var(--rdl-neutral-dark-4);
  --rdl-chart-grid: var(--rdl-neutral-dark-5);
  --rdl-chart-muted: var(--rdl-neutral-dark-6);
  --rdl-chart-hatch: var(--rdl-neutral-dark-8);
  --rdl-tick: rgba(242,242,243,0.30);
  --rdl-tick-strong: var(--rdl-neutral-dark-12);
  --rdl-shadow-e1: 0 1px 2px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20);
  --rdl-shadow-e2: 0 4px 12px rgba(0,0,0,0.30), 0 12px 32px rgba(0,0,0,0.32);
  --rdl-shadow-e3: 0 12px 24px rgba(0,0,0,0.36), 0 24px 56px rgba(0,0,0,0.44);
  --rdl-shadow-e4: 0 16px 40px rgba(0,0,0,0.56);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45);
  --rdl-accent: #DFFA32;
  --rdl-accent-hover: #CFE830;
  --rdl-accent-pressed: #C7DF2F;
  --rdl-accent-subtle: #3B411E;
  --rdl-accent-text: #DFFA32;
  --rdl-accent-graphic: #DFFA32;
  --rdl-on-accent: #151515;
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --rdl-bg-canvas: var(--rdl-neutral-dark-1);
    --rdl-bg-canvas-elevated: var(--rdl-neutral-dark-2);
    --rdl-bg-surface: var(--rdl-neutral-dark-3);
    --rdl-bg-surface-raised: var(--rdl-neutral-dark-4);
    --rdl-bg-surface-sunken: var(--rdl-neutral-dark-2);
    --rdl-bg-emphasis: #26272B;
    --rdl-bg-emphasis-raised: #34353A;
    --rdl-bg-scrim: rgba(0,0,0,0.64);
    --rdl-fill-control: var(--rdl-neutral-dark-5);
    --rdl-fill-control-hover: var(--rdl-neutral-dark-6);
    --rdl-fill-control-pressed: var(--rdl-neutral-dark-7);
    --rdl-fill-disabled: rgba(242,242,243,0.12);
    --rdl-fg-primary: var(--rdl-neutral-dark-12);
    --rdl-fg-secondary: var(--rdl-neutral-dark-11);
    --rdl-fg-tertiary: var(--rdl-neutral-dark-10);
    --rdl-fg-disabled: rgba(242,242,243,0.38);
    --rdl-fg-on-emphasis: var(--rdl-neutral-dark-12);
    --rdl-fg-on-emphasis-secondary: var(--rdl-neutral-dark-11);
    --rdl-border-subtle: var(--rdl-neutral-dark-5);
    --rdl-border-default: var(--rdl-neutral-dark-6);
    --rdl-border-strong: var(--rdl-neutral-dark-8);
    --rdl-border-focus: var(--rdl-accent-graphic);
    --rdl-action-primary: var(--rdl-neutral-dark-12);
    --rdl-action-primary-hover: #DFE0E1;
    --rdl-action-primary-pressed: #D6D6D7;
    --rdl-on-action-primary: var(--rdl-neutral-dark-1);
    --rdl-action-secondary: var(--rdl-neutral-dark-5);
    --rdl-action-secondary-hover: var(--rdl-neutral-dark-6);
    --rdl-action-secondary-pressed: var(--rdl-neutral-dark-7);
    --rdl-on-action-secondary: var(--rdl-neutral-dark-12);
    --rdl-success: #4BD394;
    --rdl-success-subtle: #1F362E;
    --rdl-success-text: #7CE0B3;
    --rdl-warning: #FFC23D;
    --rdl-warning-subtle: #3C3320;
    --rdl-warning-text: #FFD266;
    --rdl-danger: #FF6B64;
    --rdl-danger-subtle: #3C2526;
    --rdl-danger-text: #FF9A9A;
    --rdl-info: #6E95FF;
    --rdl-info-subtle: #252C3F;
    --rdl-info-text: #9DB8FF;
    --rdl-material-ultrathin: rgba(28,30,33,0.32);
    --rdl-material-thin: rgba(28,30,33,0.44);
    --rdl-material-regular: rgba(28,30,33,0.52);
    --rdl-material-thick: rgba(36,38,42,0.72);
    --rdl-material-border: rgba(255,255,255,0.10);
    --rdl-material-highlight: rgba(255,255,255,0.08);
    --rdl-material-shade: rgba(0,0,0,0.30);
    --rdl-material-dark: rgba(22,23,26,0.52);
    --rdl-material-dark-border: rgba(255,255,255,0.10);
    --rdl-chart-track: var(--rdl-neutral-dark-4);
    --rdl-chart-grid: var(--rdl-neutral-dark-5);
    --rdl-chart-muted: var(--rdl-neutral-dark-6);
    --rdl-chart-hatch: var(--rdl-neutral-dark-8);
    --rdl-tick: rgba(242,242,243,0.30);
    --rdl-tick-strong: var(--rdl-neutral-dark-12);
    --rdl-shadow-e1: 0 1px 2px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.20);
    --rdl-shadow-e2: 0 4px 12px rgba(0,0,0,0.30), 0 12px 32px rgba(0,0,0,0.32);
    --rdl-shadow-e3: 0 12px 24px rgba(0,0,0,0.36), 0 24px 56px rgba(0,0,0,0.44);
    --rdl-shadow-e4: 0 16px 40px rgba(0,0,0,0.56);
    --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45);
    --rdl-accent: #DFFA32;
    --rdl-accent-hover: #CFE830;
    --rdl-accent-pressed: #C7DF2F;
    --rdl-accent-subtle: #3B411E;
    --rdl-accent-text: #DFFA32;
    --rdl-accent-graphic: #DFFA32;
    --rdl-on-accent: #151515;
    color-scheme: dark;
  }

}

/* ===== Theme: brand — canvas = primary, highlight = secondary. Default preset: cobalt ===== */
[data-theme="brand"] {
  --rdl-bg-canvas: #0732D8;
  --rdl-bg-canvas-elevated: #163EDA;
  --rdl-bg-surface: #254BDD;
  --rdl-bg-surface-raised: #395BE0;
  --rdl-bg-surface-sunken: #062BBA;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #E1E6FA;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #0629B1;
  --rdl-fill-control-hover: #0525A0;
  --rdl-fill-control-pressed: #05218F;
  --rdl-fill-disabled: #254BDD;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #E3E8FB;
  --rdl-fg-tertiary: #B0BDF3;
  --rdl-fg-disabled: #6580E7;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #2F53DE;
  --rdl-border-default: #4C6BE3;
  --rdl-border-strong: #748CE9;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #0629B1;
  --rdl-action-secondary-hover: #0525A0;
  --rdl-action-secondary-pressed: #05218F;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(255,255,255,0.08);
  --rdl-material-thin: rgba(255,255,255,0.12);
  --rdl-material-regular: rgba(255,255,255,0.16);
  --rdl-material-thick: rgba(255,255,255,0.24);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #2A4FDD;
  --rdl-chart-grid: #254BDD;
  --rdl-chart-muted: #4363E1;
  --rdl-chart-hatch: #5674E4;
  --rdl-tick: #6A84E8;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #F2D33C;
  --rdl-accent-hover: #E0C439;
  --rdl-accent-pressed: #D7BC37;
  --rdl-accent-subtle: #3F59B3;
  --rdl-accent-text: #F8E796;
  --rdl-accent-graphic: #F2D33C;
  --rdl-on-accent: #151515;
  --rdl-success: #52D598;
  --rdl-success-subtle: #154BA9;
  --rdl-success-text: #C3F1DC;
  --rdl-warning: #FFC23D;
  --rdl-warning-subtle: #384797;
  --rdl-warning-text: #FFE4A3;
  --rdl-danger: #FFA9A5;
  --rdl-danger-subtle: #3842AB;
  --rdl-danger-text: #FFDFDF;
  --rdl-info: #A5BDFF;
  --rdl-info-subtle: #2646BD;
  --rdl-info-text: #DEE7FF;
  --rdl-bg-brand: #0732D8;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #BAC6F4;
  --rdl-shadow-e1: 0 1px 2px rgba(2,15,65,0.12), 0 2px 8px rgba(2,15,65,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(2,15,65,0.15000000000000002), 0 12px 32px rgba(2,15,65,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(2,15,65,0.24), 0 24px 56px rgba(2,15,65,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(2,15,65,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(2,15,65,0.28);
  --rdl-brand-primary: #0732D8;
  --rdl-brand-secondary: #F2D33C;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="cobalt"] {
  --rdl-bg-canvas: #0732D8;
  --rdl-bg-canvas-elevated: #163EDA;
  --rdl-bg-surface: #254BDD;
  --rdl-bg-surface-raised: #395BE0;
  --rdl-bg-surface-sunken: #062BBA;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #E1E6FA;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #0629B1;
  --rdl-fill-control-hover: #0525A0;
  --rdl-fill-control-pressed: #05218F;
  --rdl-fill-disabled: #254BDD;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #E3E8FB;
  --rdl-fg-tertiary: #B0BDF3;
  --rdl-fg-disabled: #6580E7;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #2F53DE;
  --rdl-border-default: #4C6BE3;
  --rdl-border-strong: #748CE9;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #0629B1;
  --rdl-action-secondary-hover: #0525A0;
  --rdl-action-secondary-pressed: #05218F;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(255,255,255,0.08);
  --rdl-material-thin: rgba(255,255,255,0.12);
  --rdl-material-regular: rgba(255,255,255,0.16);
  --rdl-material-thick: rgba(255,255,255,0.24);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #2A4FDD;
  --rdl-chart-grid: #254BDD;
  --rdl-chart-muted: #4363E1;
  --rdl-chart-hatch: #5674E4;
  --rdl-tick: #6A84E8;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #F2D33C;
  --rdl-accent-hover: #E0C439;
  --rdl-accent-pressed: #D7BC37;
  --rdl-accent-subtle: #3F59B3;
  --rdl-accent-text: #F8E796;
  --rdl-accent-graphic: #F2D33C;
  --rdl-on-accent: #151515;
  --rdl-success: #52D598;
  --rdl-success-subtle: #154BA9;
  --rdl-success-text: #C3F1DC;
  --rdl-warning: #FFC23D;
  --rdl-warning-subtle: #384797;
  --rdl-warning-text: #FFE4A3;
  --rdl-danger: #FFA9A5;
  --rdl-danger-subtle: #3842AB;
  --rdl-danger-text: #FFDFDF;
  --rdl-info: #A5BDFF;
  --rdl-info-subtle: #2646BD;
  --rdl-info-text: #DEE7FF;
  --rdl-bg-brand: #0732D8;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #BAC6F4;
  --rdl-shadow-e1: 0 1px 2px rgba(2,15,65,0.12), 0 2px 8px rgba(2,15,65,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(2,15,65,0.15000000000000002), 0 12px 32px rgba(2,15,65,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(2,15,65,0.24), 0 24px 56px rgba(2,15,65,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(2,15,65,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(2,15,65,0.28);
  --rdl-brand-primary: #0732D8;
  --rdl-brand-secondary: #F2D33C;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="mustard"] {
  --rdl-bg-canvas: #ECBB42;
  --rdl-bg-canvas-elevated: #EDBF4D;
  --rdl-bg-surface: #F2CF7B;
  --rdl-bg-surface-raised: #F5DA97;
  --rdl-bg-surface-sunken: #EFC660;
  --rdl-bg-emphasis: #151515;
  --rdl-bg-emphasis-raised: #2F291A;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #EFC764;
  --rdl-fill-control-hover: #F1CD73;
  --rdl-fill-control-pressed: #F2D282;
  --rdl-fill-disabled: #D2A73D;
  --rdl-fg-primary: #151515;
  --rdl-fg-secondary: #4D4021;
  --rdl-fg-tertiary: #745E29;
  --rdl-fg-disabled: #9A7C31;
  --rdl-fg-on-emphasis: #FFFFFF;
  --rdl-fg-on-emphasis-secondary: #A1A1A1;
  --rdl-border-subtle: #CAA03B;
  --rdl-border-default: #B08D35;
  --rdl-border-strong: #8D722E;
  --rdl-border-focus: #151515;
  --rdl-action-primary: #151515;
  --rdl-action-primary-hover: #282828;
  --rdl-action-primary-pressed: #313131;
  --rdl-on-action-primary: #FFFFFF;
  --rdl-action-secondary: #EFC764;
  --rdl-action-secondary-hover: #F1CD73;
  --rdl-action-secondary-pressed: #F2D282;
  --rdl-on-action-secondary: #151515;
  --rdl-material-ultrathin: rgba(255,255,255,0.18);
  --rdl-material-thin: rgba(255,255,255,0.28);
  --rdl-material-regular: rgba(255,255,255,0.4);
  --rdl-material-thick: rgba(255,255,255,0.56);
  --rdl-material-border: rgba(255,255,255,0.55);
  --rdl-material-highlight: rgba(255,255,255,0.7);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #CEA43C;
  --rdl-chart-grid: #D2A73D;
  --rdl-chart-muted: #B89337;
  --rdl-chart-hatch: #A78634;
  --rdl-tick: #967930;
  --rdl-tick-strong: #151515;
  --rdl-accent: #2A4BDC;
  --rdl-accent-hover: #3B59DF;
  --rdl-accent-pressed: #4461E0;
  --rdl-accent-subtle: #BDA067;
  --rdl-accent-text: #2441BD;
  --rdl-accent-graphic: #2A4BDC;
  --rdl-on-accent: #FFFFFF;
  --rdl-success: #14794F;
  --rdl-success-subtle: #C6BE72;
  --rdl-success-text: #0B5738;
  --rdl-warning: #8E6106;
  --rdl-warning-subtle: #DEB964;
  --rdl-warning-text: #694500;
  --rdl-danger: #C03732;
  --rdl-danger-subtle: #E8B16C;
  --rdl-danger-text: #931B17;
  --rdl-info: #2B5EE2;
  --rdl-info-subtle: #CAB890;
  --rdl-info-text: #1941AB;
  --rdl-bg-brand: #ECBB42;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #514322;
  --rdl-shadow-e1: 0 1px 2px rgba(71,56,20,0.08), 0 2px 8px rgba(71,56,20,0.08);
  --rdl-shadow-e2: 0 4px 12px rgba(71,56,20,0.1), 0 12px 32px rgba(71,56,20,0.12);
  --rdl-shadow-e3: 0 12px 24px rgba(71,56,20,0.16), 0 24px 56px rgba(71,56,20,0.2);
  --rdl-shadow-e4: 0 16px 40px rgba(71,56,20,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.5) inset, 0 20px 50px rgba(71,56,20,0.28);
  --rdl-brand-primary: #ECBB42;
  --rdl-brand-secondary: #2A4BDC;
  color-scheme: light;
}

[data-theme="brand"][data-brand="gold"] {
  --rdl-bg-canvas: #D9A632;
  --rdl-bg-canvas-elevated: #DBAB3E;
  --rdl-bg-surface: #E4C170;
  --rdl-bg-surface-raised: #EACE8E;
  --rdl-bg-surface-sunken: #DFB453;
  --rdl-bg-emphasis: #151515;
  --rdl-bg-emphasis-raised: #2D2618;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #E0B657;
  --rdl-fill-control-hover: #E3BD67;
  --rdl-fill-control-pressed: #E6C478;
  --rdl-fill-disabled: #C1952F;
  --rdl-fg-primary: #151515;
  --rdl-fg-secondary: #483B1D;
  --rdl-fg-tertiary: #6B5522;
  --rdl-fg-disabled: #8F6F27;
  --rdl-fg-on-emphasis: #FFFFFF;
  --rdl-fg-on-emphasis-secondary: #A1A1A1;
  --rdl-border-subtle: #BA8F2D;
  --rdl-border-default: #A27D2A;
  --rdl-border-strong: #836625;
  --rdl-border-focus: #151515;
  --rdl-action-primary: #151515;
  --rdl-action-primary-hover: #282828;
  --rdl-action-primary-pressed: #313131;
  --rdl-on-action-primary: #FFFFFF;
  --rdl-action-secondary: #E0B657;
  --rdl-action-secondary-hover: #E3BD67;
  --rdl-action-secondary-pressed: #E6C478;
  --rdl-on-action-secondary: #151515;
  --rdl-material-ultrathin: rgba(255,255,255,0.18);
  --rdl-material-thin: rgba(255,255,255,0.28);
  --rdl-material-regular: rgba(255,255,255,0.4);
  --rdl-material-thick: rgba(255,255,255,0.56);
  --rdl-material-border: rgba(255,255,255,0.55);
  --rdl-material-highlight: rgba(255,255,255,0.7);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #BE922E;
  --rdl-chart-grid: #C1952F;
  --rdl-chart-muted: #AA832B;
  --rdl-chart-hatch: #9A7829;
  --rdl-tick: #8B6C26;
  --rdl-tick-strong: #151515;
  --rdl-accent: #1F4A3E;
  --rdl-accent-hover: #31584D;
  --rdl-accent-pressed: #3A6055;
  --rdl-accent-subtle: #AC9035;
  --rdl-accent-text: #1E493D;
  --rdl-accent-graphic: #1F4A3E;
  --rdl-on-accent: #FFFFFF;
  --rdl-success: #116743;
  --rdl-success-subtle: #BAAF67;
  --rdl-success-text: #0A4C31;
  --rdl-warning: #7A5305;
  --rdl-warning-subtle: #CFAB5B;
  --rdl-warning-text: #5B3C00;
  --rdl-danger: #A8302B;
  --rdl-danger-subtle: #D8A462;
  --rdl-danger-text: #801814;
  --rdl-info: #2652C5;
  --rdl-info-subtle: #BEAB81;
  --rdl-info-text: #163996;
  --rdl-bg-brand: #D9A632;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #4C3E1D;
  --rdl-shadow-e1: 0 1px 2px rgba(65,50,15,0.08), 0 2px 8px rgba(65,50,15,0.08);
  --rdl-shadow-e2: 0 4px 12px rgba(65,50,15,0.1), 0 12px 32px rgba(65,50,15,0.12);
  --rdl-shadow-e3: 0 12px 24px rgba(65,50,15,0.16), 0 24px 56px rgba(65,50,15,0.2);
  --rdl-shadow-e4: 0 16px 40px rgba(65,50,15,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.5) inset, 0 20px 50px rgba(65,50,15,0.28);
  --rdl-brand-primary: #D9A632;
  --rdl-brand-secondary: #1F4A3E;
  color-scheme: light;
}

[data-theme="brand"][data-brand="olive"] {
  --rdl-bg-canvas: #667957;
  --rdl-bg-canvas-elevated: #607252;
  --rdl-bg-surface: #5A6A4D;
  --rdl-bg-surface-raised: #526146;
  --rdl-bg-surface-sunken: #58684B;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #EDEFEB;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #546347;
  --rdl-fill-control-hover: #4B5A40;
  --rdl-fill-control-pressed: #435039;
  --rdl-fill-disabled: #78896B;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #F9FAF8;
  --rdl-fg-tertiary: #CBD1C6;
  --rdl-fg-disabled: #A0AC97;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #7E8E72;
  --rdl-border-default: #919F86;
  --rdl-border-strong: #A9B4A1;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #546347;
  --rdl-action-secondary-hover: #4B5A40;
  --rdl-action-secondary-pressed: #435039;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(0,0,0,0.1);
  --rdl-material-thin: rgba(0,0,0,0.16);
  --rdl-material-regular: rgba(0,0,0,0.22);
  --rdl-material-thick: rgba(0,0,0,0.3);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #7B8C6F;
  --rdl-chart-grid: #78896B;
  --rdl-chart-muted: #8B997F;
  --rdl-chart-hatch: #97A48D;
  --rdl-tick: #A3AF9A;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #D7F23A;
  --rdl-accent-hover: #C7E037;
  --rdl-accent-pressed: #C0D736;
  --rdl-accent-subtle: #819650;
  --rdl-accent-text: #F8FDDC;
  --rdl-accent-graphic: #D7F23A;
  --rdl-on-accent: #151515;
  --rdl-success: #85E1B6;
  --rdl-success-subtle: #5C7B5C;
  --rdl-success-text: #F2FCF7;
  --rdl-warning: #FFC649;
  --rdl-warning-subtle: #757547;
  --rdl-warning-text: #FFF9EA;
  --rdl-danger: #FFBEBB;
  --rdl-danger-subtle: #75745D;
  --rdl-danger-text: #FFF9F9;
  --rdl-info: #BCCEFF;
  --rdl-info-subtle: #67776B;
  --rdl-info-text: #F9FBFF;
  --rdl-bg-brand: #667957;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #F9FAF8;
  --rdl-shadow-e1: 0 1px 2px rgba(31,36,26,0.12), 0 2px 8px rgba(31,36,26,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(31,36,26,0.15000000000000002), 0 12px 32px rgba(31,36,26,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(31,36,26,0.24), 0 24px 56px rgba(31,36,26,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(31,36,26,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(31,36,26,0.28);
  --rdl-brand-primary: #687B59;
  --rdl-brand-secondary: #D7F23A;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="forest"] {
  --rdl-bg-canvas: #1F4A3E;
  --rdl-bg-canvas-elevated: #2C554A;
  --rdl-bg-surface: #3A6055;
  --rdl-bg-surface-raised: #4C6E65;
  --rdl-bg-surface-sunken: #1B4035;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #E4E9E8;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #193D33;
  --rdl-fill-control-hover: #17372E;
  --rdl-fill-control-pressed: #143129;
  --rdl-fill-disabled: #3A6055;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #E2E8E6;
  --rdl-fg-tertiary: #B4C2BE;
  --rdl-fg-disabled: #748F87;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #43675D;
  --rdl-border-default: #5E7D74;
  --rdl-border-strong: #829A93;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #193D33;
  --rdl-action-secondary-hover: #17372E;
  --rdl-action-secondary-pressed: #143129;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(255,255,255,0.08);
  --rdl-material-thin: rgba(255,255,255,0.12);
  --rdl-material-regular: rgba(255,255,255,0.16);
  --rdl-material-thick: rgba(255,255,255,0.24);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #3E6359;
  --rdl-chart-grid: #3A6055;
  --rdl-chart-muted: #55756C;
  --rdl-chart-hatch: #67847C;
  --rdl-tick: #79928B;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #D7F23A;
  --rdl-accent-hover: #C7E037;
  --rdl-accent-pressed: #C0D736;
  --rdl-accent-subtle: #4B723D;
  --rdl-accent-text: #D9F342;
  --rdl-accent-graphic: #D7F23A;
  --rdl-on-accent: #151515;
  --rdl-success: #4FD496;
  --rdl-success-subtle: #245A46;
  --rdl-success-text: #C3F1DC;
  --rdl-warning: #FFC23D;
  --rdl-warning-subtle: #475634;
  --rdl-warning-text: #FFE4A3;
  --rdl-danger: #FFA6A2;
  --rdl-danger-subtle: #475048;
  --rdl-danger-text: #FFDFDF;
  --rdl-info: #A5BDFF;
  --rdl-info-subtle: #35555B;
  --rdl-info-text: #DEE7FF;
  --rdl-bg-brand: #1F4A3E;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #C0CCC9;
  --rdl-shadow-e1: 0 1px 2px rgba(9,22,19,0.12), 0 2px 8px rgba(9,22,19,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(9,22,19,0.15000000000000002), 0 12px 32px rgba(9,22,19,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(9,22,19,0.24), 0 24px 56px rgba(9,22,19,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(9,22,19,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(9,22,19,0.28);
  --rdl-brand-primary: #1F4A3E;
  --rdl-brand-secondary: #D7F23A;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="lavender"] {
  --rdl-bg-canvas: #AD80D4;
  --rdl-bg-canvas-elevated: #B288D7;
  --rdl-bg-surface: #C6A6E1;
  --rdl-bg-surface-raised: #D2B9E7;
  --rdl-bg-surface-sunken: #BA94DB;
  --rdl-bg-emphasis: #151515;
  --rdl-bg-emphasis-raised: #27222C;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #BC97DC;
  --rdl-fill-control-hover: #C2A1DF;
  --rdl-fill-control-pressed: #C9ABE3;
  --rdl-fill-disabled: #9B73BD;
  --rdl-fg-primary: #151515;
  --rdl-fg-secondary: #302837;
  --rdl-fg-tertiary: #524061;
  --rdl-fg-disabled: #73578B;
  --rdl-fg-on-emphasis: #FFFFFF;
  --rdl-fg-on-emphasis-secondary: #A1A1A1;
  --rdl-border-subtle: #956FB5;
  --rdl-border-default: #82629F;
  --rdl-border-strong: #6A5180;
  --rdl-border-focus: #151515;
  --rdl-action-primary: #151515;
  --rdl-action-primary-hover: #282828;
  --rdl-action-primary-pressed: #313131;
  --rdl-on-action-primary: #FFFFFF;
  --rdl-action-secondary: #BC97DC;
  --rdl-action-secondary-hover: #C2A1DF;
  --rdl-action-secondary-pressed: #C9ABE3;
  --rdl-on-action-secondary: #151515;
  --rdl-material-ultrathin: rgba(255,255,255,0.18);
  --rdl-material-thin: rgba(255,255,255,0.28);
  --rdl-material-regular: rgba(255,255,255,0.4);
  --rdl-material-thick: rgba(255,255,255,0.56);
  --rdl-material-border: rgba(255,255,255,0.55);
  --rdl-material-highlight: rgba(255,255,255,0.7);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #9871B9;
  --rdl-chart-grid: #9B73BD;
  --rdl-chart-muted: #8966A6;
  --rdl-chart-hatch: #7C5E97;
  --rdl-tick: #705588;
  --rdl-tick-strong: #151515;
  --rdl-accent: #F27A3A;
  --rdl-accent-hover: #E07237;
  --rdl-accent-pressed: #D76E36;
  --rdl-accent-subtle: #BE7FAF;
  --rdl-accent-text: #442210;
  --rdl-accent-graphic: #6F381B;
  --rdl-on-accent: #151515;
  --rdl-success: #0E5134;
  --rdl-success-subtle: #A195BE;
  --rdl-success-text: #063120;
  --rdl-warning: #5D3F04;
  --rdl-warning-subtle: #B191B5;
  --rdl-warning-text: #3D2800;
  --rdl-danger: #822521;
  --rdl-danger-subtle: #B88CBB;
  --rdl-danger-text: #59110E;
  --rdl-info: #1D3F99;
  --rdl-info-subtle: #A491D3;
  --rdl-info-text: #0F2768;
  --rdl-bg-brand: #AD80D4;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #302837;
  --rdl-shadow-e1: 0 1px 2px rgba(52,38,64,0.08), 0 2px 8px rgba(52,38,64,0.08);
  --rdl-shadow-e2: 0 4px 12px rgba(52,38,64,0.1), 0 12px 32px rgba(52,38,64,0.12);
  --rdl-shadow-e3: 0 12px 24px rgba(52,38,64,0.16), 0 24px 56px rgba(52,38,64,0.2);
  --rdl-shadow-e4: 0 16px 40px rgba(52,38,64,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.5) inset, 0 20px 50px rgba(52,38,64,0.28);
  --rdl-brand-primary: #AD80D4;
  --rdl-brand-secondary: #F27A3A;
  color-scheme: light;
}

[data-theme="brand"][data-brand="plum"] {
  --rdl-bg-canvas: #2F1125;
  --rdl-bg-canvas-elevated: #3B1F32;
  --rdl-bg-surface: #482E3F;
  --rdl-bg-surface-raised: #594151;
  --rdl-bg-surface-sunken: #280F20;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #E6E2E5;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #543C4C;
  --rdl-fill-control-hover: #654F5E;
  --rdl-fill-control-pressed: #76626F;
  --rdl-fill-disabled: #482E3F;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #D4CED2;
  --rdl-fg-tertiary: #B6ABB2;
  --rdl-fg-disabled: #7E6B78;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #503748;
  --rdl-border-default: #695462;
  --rdl-border-strong: #8B7A85;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #543C4C;
  --rdl-action-secondary-hover: #654F5E;
  --rdl-action-secondary-pressed: #76626F;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(255,255,255,0.08);
  --rdl-material-thin: rgba(255,255,255,0.12);
  --rdl-material-regular: rgba(255,255,255,0.16);
  --rdl-material-thick: rgba(255,255,255,0.24);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #4C3244;
  --rdl-chart-grid: #482E3F;
  --rdl-chart-muted: #614A59;
  --rdl-chart-hatch: #725D6B;
  --rdl-tick: #82707C;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #F2D33C;
  --rdl-accent-hover: #E0C439;
  --rdl-accent-pressed: #D7BC37;
  --rdl-accent-subtle: #5E402B;
  --rdl-accent-text: #F2D33C;
  --rdl-accent-graphic: #F2D33C;
  --rdl-on-accent: #151515;
  --rdl-success: #4BD394;
  --rdl-success-subtle: #2D3536;
  --rdl-success-text: #7CE0B3;
  --rdl-warning: #FFC23D;
  --rdl-warning-subtle: #513224;
  --rdl-warning-text: #FFD266;
  --rdl-danger: #FF6B64;
  --rdl-danger-subtle: #51212C;
  --rdl-danger-text: #FF9C9C;
  --rdl-info: #6E95FF;
  --rdl-info-subtle: #34294B;
  --rdl-info-text: #9DB8FF;
  --rdl-bg-brand: #2F1125;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #C5BCC2;
  --rdl-shadow-e1: 0 1px 2px rgba(14,5,11,0.12), 0 2px 8px rgba(14,5,11,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(14,5,11,0.15000000000000002), 0 12px 32px rgba(14,5,11,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(14,5,11,0.24), 0 24px 56px rgba(14,5,11,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(14,5,11,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(14,5,11,0.28);
  --rdl-brand-primary: #2F1125;
  --rdl-brand-secondary: #F2D33C;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="vermilion"] {
  --rdl-bg-canvas: #CC4925;
  --rdl-bg-canvas-elevated: #C04523;
  --rdl-bg-surface: #B44021;
  --rdl-bg-surface-raised: #A33A1E;
  --rdl-bg-surface-sunken: #AF3F20;
  --rdl-bg-emphasis: #FFFFFF;
  --rdl-bg-emphasis-raised: #F9E9E5;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #A73C1E;
  --rdl-fill-control-hover: #97361B;
  --rdl-fill-control-pressed: #873018;
  --rdl-fill-disabled: #D25F3F;
  --rdl-fg-primary: #FFFFFF;
  --rdl-fg-secondary: #FFFFFF;
  --rdl-fg-tertiary: #F0C8BE;
  --rdl-fg-disabled: #DF8E78;
  --rdl-fg-on-emphasis: #151515;
  --rdl-fg-on-emphasis-secondary: #737373;
  --rdl-border-subtle: #D46648;
  --rdl-border-default: #DA7C62;
  --rdl-border-strong: #E29985;
  --rdl-border-focus: #FFFFFF;
  --rdl-action-primary: #FFFFFF;
  --rdl-action-primary-hover: #ECECEC;
  --rdl-action-primary-pressed: #E3E3E3;
  --rdl-on-action-primary: #151515;
  --rdl-action-secondary: #A73C1E;
  --rdl-action-secondary-hover: #97361B;
  --rdl-action-secondary-pressed: #873018;
  --rdl-on-action-secondary: #FFFFFF;
  --rdl-material-ultrathin: rgba(0,0,0,0.1);
  --rdl-material-thin: rgba(0,0,0,0.16);
  --rdl-material-regular: rgba(0,0,0,0.22);
  --rdl-material-thick: rgba(0,0,0,0.3);
  --rdl-material-border: rgba(255,255,255,0.22);
  --rdl-material-highlight: rgba(255,255,255,0.35);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #D36244;
  --rdl-chart-grid: #D25F3F;
  --rdl-chart-muted: #D87559;
  --rdl-chart-hatch: #DC836B;
  --rdl-tick: #E0927C;
  --rdl-tick-strong: #FFFFFF;
  --rdl-accent: #D7F23A;
  --rdl-accent-hover: #C7E037;
  --rdl-accent-pressed: #C0D736;
  --rdl-accent-subtle: #CF722A;
  --rdl-accent-text: #FBFEEB;
  --rdl-accent-graphic: #D7F23A;
  --rdl-on-accent: #151515;
  --rdl-success: #8CE3BB;
  --rdl-success-subtle: #9E5C3D;
  --rdl-success-text: #FAFEFC;
  --rdl-warning: #FFC954;
  --rdl-warning-subtle: #B55729;
  --rdl-warning-text: #FFFCF6;
  --rdl-danger: #FFC4C1;
  --rdl-danger-subtle: #B5563F;
  --rdl-danger-text: #FFFDFD;
  --rdl-info: #BFD0FF;
  --rdl-info-subtle: #A9584B;
  --rdl-info-text: #FBFCFF;
  --rdl-bg-brand: #CC4925;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #FFFFFF;
  --rdl-shadow-e1: 0 1px 2px rgba(61,22,11,0.12), 0 2px 8px rgba(61,22,11,0.12);
  --rdl-shadow-e2: 0 4px 12px rgba(61,22,11,0.15000000000000002), 0 12px 32px rgba(61,22,11,0.18);
  --rdl-shadow-e3: 0 12px 24px rgba(61,22,11,0.24), 0 24px 56px rgba(61,22,11,0.30000000000000004);
  --rdl-shadow-e4: 0 16px 40px rgba(61,22,11,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.2) inset, 0 20px 50px rgba(61,22,11,0.28);
  --rdl-brand-primary: #D44C27;
  --rdl-brand-secondary: #D7F23A;
  color-scheme: dark;
}

[data-theme="brand"][data-brand="dusk"] {
  --rdl-bg-canvas: #7599AD;
  --rdl-bg-canvas-elevated: #7D9FB2;
  --rdl-bg-surface: #9EB8C6;
  --rdl-bg-surface-raised: #B3C7D2;
  --rdl-bg-surface-sunken: #8BA9BA;
  --rdl-bg-emphasis: #151515;
  --rdl-bg-emphasis-raised: #212527;
  --rdl-bg-scrim: rgba(0,0,0,0.48);
  --rdl-fill-control: #8EABBC;
  --rdl-fill-control-hover: #99B4C2;
  --rdl-fill-control-pressed: #A4BCC9;
  --rdl-fill-disabled: #69899B;
  --rdl-fg-primary: #151515;
  --rdl-fg-secondary: #262D30;
  --rdl-fg-tertiary: #3B4A52;
  --rdl-fg-disabled: #516773;
  --rdl-fg-on-emphasis: #FFFFFF;
  --rdl-fg-on-emphasis-secondary: #A1A1A1;
  --rdl-border-subtle: #668495;
  --rdl-border-default: #5A7482;
  --rdl-border-strong: #4B5F6A;
  --rdl-border-focus: #151515;
  --rdl-action-primary: #151515;
  --rdl-action-primary-hover: #282828;
  --rdl-action-primary-pressed: #313131;
  --rdl-on-action-primary: #FFFFFF;
  --rdl-action-secondary: #8EABBC;
  --rdl-action-secondary-hover: #99B4C2;
  --rdl-action-secondary-pressed: #A4BCC9;
  --rdl-on-action-secondary: #151515;
  --rdl-material-ultrathin: rgba(255,255,255,0.18);
  --rdl-material-thin: rgba(255,255,255,0.28);
  --rdl-material-regular: rgba(255,255,255,0.4);
  --rdl-material-thick: rgba(255,255,255,0.56);
  --rdl-material-border: rgba(255,255,255,0.55);
  --rdl-material-highlight: rgba(255,255,255,0.7);
  --rdl-material-shade: rgba(0,0,0,0.16);
  --rdl-material-dark: rgba(0,0,0,0.28);
  --rdl-material-dark-border: rgba(255,255,255,0.12);
  --rdl-chart-track: #688798;
  --rdl-chart-grid: #69899B;
  --rdl-chart-muted: #5E7989;
  --rdl-chart-hatch: #566F7C;
  --rdl-tick: #4F6470;
  --rdl-tick-strong: #151515;
  --rdl-accent: #F6E27A;
  --rdl-accent-hover: #E4D272;
  --rdl-accent-pressed: #DBC96E;
  --rdl-accent-subtle: #94ABA1;
  --rdl-accent-text: #312D18;
  --rdl-accent-graphic: #4F4827;
  --rdl-on-accent: #151515;
  --rdl-success: #0E5134;
  --rdl-success-subtle: #81A3A9;
  --rdl-success-text: #063421;
  --rdl-warning: #5D3F04;
  --rdl-warning-subtle: #91A09F;
  --rdl-warning-text: #3D2800;
  --rdl-danger: #822521;
  --rdl-danger-subtle: #989BA5;
  --rdl-danger-text: #59110E;
  --rdl-info: #1E419D;
  --rdl-info-subtle: #84A0BE;
  --rdl-info-text: #0F2768;
  --rdl-bg-brand: #7599AD;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #262D30;
  --rdl-shadow-e1: 0 1px 2px rgba(35,46,52,0.08), 0 2px 8px rgba(35,46,52,0.08);
  --rdl-shadow-e2: 0 4px 12px rgba(35,46,52,0.1), 0 12px 32px rgba(35,46,52,0.12);
  --rdl-shadow-e3: 0 12px 24px rgba(35,46,52,0.16), 0 24px 56px rgba(35,46,52,0.2);
  --rdl-shadow-e4: 0 16px 40px rgba(35,46,52,0.48);
  --rdl-shadow-glass: 0 1px 0 rgba(255,255,255,0.5) inset, 0 20px 50px rgba(35,46,52,0.28);
  --rdl-brand-primary: #7599AD;
  --rdl-brand-secondary: #F6E27A;
  color-scheme: light;
}

/* ===== Brand panels in light and dark: data-brand picks the primary for bg-brand ===== */
[data-brand="cobalt"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #0732D8;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #BAC6F4;
  --rdl-brand-primary: #0732D8;
  --rdl-brand-secondary: #F2D33C;
}

[data-brand="mustard"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #ECBB42;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #514322;
  --rdl-brand-primary: #ECBB42;
  --rdl-brand-secondary: #2A4BDC;
}

[data-brand="gold"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #D9A632;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #4C3E1D;
  --rdl-brand-primary: #D9A632;
  --rdl-brand-secondary: #1F4A3E;
}

[data-brand="olive"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #667957;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #F9FAF8;
  --rdl-brand-primary: #687B59;
  --rdl-brand-secondary: #D7F23A;
}

[data-brand="forest"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #1F4A3E;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #C0CCC9;
  --rdl-brand-primary: #1F4A3E;
  --rdl-brand-secondary: #D7F23A;
}

[data-brand="lavender"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #AD80D4;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #302837;
  --rdl-brand-primary: #AD80D4;
  --rdl-brand-secondary: #F27A3A;
}

[data-brand="plum"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #2F1125;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #C5BCC2;
  --rdl-brand-primary: #2F1125;
  --rdl-brand-secondary: #F2D33C;
}

[data-brand="vermilion"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #CC4925;
  --rdl-fg-on-brand: #FFFFFF;
  --rdl-fg-on-brand-secondary: #FFFFFF;
  --rdl-brand-primary: #D44C27;
  --rdl-brand-secondary: #D7F23A;
}

[data-brand="dusk"]:not([data-theme="brand"]) {
  --rdl-bg-brand: #7599AD;
  --rdl-fg-on-brand: #151515;
  --rdl-fg-on-brand-secondary: #262D30;
  --rdl-brand-primary: #7599AD;
  --rdl-brand-secondary: #F6E27A;
}

/* ===== Accent (secondary colour) presets for light and dark ===== */
[data-accent="volt"]:not([data-theme="brand"]) {
  --rdl-accent: #DFFA32;
  --rdl-accent-hover: #CFE830;
  --rdl-accent-pressed: #C7DF2F;
  --rdl-accent-subtle: #F9FEDA;
  --rdl-accent-text: #677317;
  --rdl-accent-graphic: #81911D;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="volt"] {
  --rdl-accent: #DFFA32;
  --rdl-accent-hover: #CFE830;
  --rdl-accent-pressed: #C7DF2F;
  --rdl-accent-subtle: #3B411E;
  --rdl-accent-text: #DFFA32;
  --rdl-accent-graphic: #DFFA32;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="volt"] {
    --rdl-accent: #DFFA32;
    --rdl-accent-hover: #CFE830;
    --rdl-accent-pressed: #C7DF2F;
    --rdl-accent-subtle: #3B411E;
    --rdl-accent-text: #DFFA32;
    --rdl-accent-graphic: #DFFA32;
    --rdl-on-accent: #151515;
  }

}

[data-accent="lime"]:not([data-theme="brand"]) {
  --rdl-accent: #CBEF43;
  --rdl-accent-hover: #BCDE3F;
  --rdl-accent-pressed: #B5D53D;
  --rdl-accent-subtle: #F6FCDD;
  --rdl-accent-text: #617320;
  --rdl-accent-graphic: #7A8F28;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="lime"] {
  --rdl-accent: #CBEF43;
  --rdl-accent-hover: #BCDE3F;
  --rdl-accent-pressed: #B5D53D;
  --rdl-accent-subtle: #373F21;
  --rdl-accent-text: #CBEF43;
  --rdl-accent-graphic: #CBEF43;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="lime"] {
    --rdl-accent: #CBEF43;
    --rdl-accent-hover: #BCDE3F;
    --rdl-accent-pressed: #B5D53D;
    --rdl-accent-subtle: #373F21;
    --rdl-accent-text: #CBEF43;
    --rdl-accent-graphic: #CBEF43;
    --rdl-on-accent: #151515;
  }

}

[data-accent="gold"]:not([data-theme="brand"]) {
  --rdl-accent: #ECBC44;
  --rdl-accent-hover: #DBAF40;
  --rdl-accent-pressed: #D2A83E;
  --rdl-accent-subtle: #FCF3DD;
  --rdl-accent-text: #846926;
  --rdl-accent-graphic: #A58430;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="gold"] {
  --rdl-accent: #ECBC44;
  --rdl-accent-hover: #DBAF40;
  --rdl-accent-pressed: #D2A83E;
  --rdl-accent-subtle: #3D3622;
  --rdl-accent-text: #ECBC44;
  --rdl-accent-graphic: #ECBC44;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="gold"] {
    --rdl-accent: #ECBC44;
    --rdl-accent-hover: #DBAF40;
    --rdl-accent-pressed: #D2A83E;
    --rdl-accent-subtle: #3D3622;
    --rdl-accent-text: #ECBC44;
    --rdl-accent-graphic: #ECBC44;
    --rdl-on-accent: #151515;
  }

}

[data-accent="signal"]:not([data-theme="brand"]) {
  --rdl-accent: #4BE06E;
  --rdl-accent-hover: #47D067;
  --rdl-accent-pressed: #45C863;
  --rdl-accent-subtle: #DFF9E5;
  --rdl-accent-text: #28793B;
  --rdl-accent-graphic: #359D4D;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="signal"] {
  --rdl-accent: #4BE06E;
  --rdl-accent-hover: #47D067;
  --rdl-accent-pressed: #45C863;
  --rdl-accent-subtle: #203C29;
  --rdl-accent-text: #4BE06E;
  --rdl-accent-graphic: #4BE06E;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="signal"] {
    --rdl-accent: #4BE06E;
    --rdl-accent-hover: #47D067;
    --rdl-accent-pressed: #45C863;
    --rdl-accent-subtle: #203C29;
    --rdl-accent-text: #4BE06E;
    --rdl-accent-graphic: #4BE06E;
    --rdl-on-accent: #151515;
  }

}

[data-accent="electric"]:not([data-theme="brand"]) {
  --rdl-accent: #0832D8;
  --rdl-accent-hover: #1C42DB;
  --rdl-accent-pressed: #264BDD;
  --rdl-accent-subtle: #D3DAF8;
  --rdl-accent-text: #0832D8;
  --rdl-accent-graphic: #0832D8;
  --rdl-on-accent: #FFFFFF;
}

[data-theme="dark"][data-accent="electric"] {
  --rdl-accent: #0832D8;
  --rdl-accent-hover: #1C42DB;
  --rdl-accent-pressed: #264BDD;
  --rdl-accent-subtle: #141D3C;
  --rdl-accent-text: #617CE6;
  --rdl-accent-graphic: #3457DF;
  --rdl-on-accent: #FFFFFF;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="electric"] {
    --rdl-accent: #0832D8;
    --rdl-accent-hover: #1C42DB;
    --rdl-accent-pressed: #264BDD;
    --rdl-accent-subtle: #141D3C;
    --rdl-accent-text: #617CE6;
    --rdl-accent-graphic: #3457DF;
    --rdl-on-accent: #FFFFFF;
  }

}

[data-accent="ember"]:not([data-theme="brand"]) {
  --rdl-accent: #FC5A10;
  --rdl-accent-hover: #EA5410;
  --rdl-accent-pressed: #E05211;
  --rdl-accent-subtle: #FEE1D4;
  --rdl-accent-text: #C0440C;
  --rdl-accent-graphic: #F2560F;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="ember"] {
  --rdl-accent: #FC5A10;
  --rdl-accent-hover: #EA5410;
  --rdl-accent-pressed: #E05211;
  --rdl-accent-subtle: #402418;
  --rdl-accent-text: #FC5A10;
  --rdl-accent-graphic: #FC5A10;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="ember"] {
    --rdl-accent: #FC5A10;
    --rdl-accent-hover: #EA5410;
    --rdl-accent-pressed: #E05211;
    --rdl-accent-subtle: #402418;
    --rdl-accent-text: #FC5A10;
    --rdl-accent-graphic: #FC5A10;
    --rdl-on-accent: #151515;
  }

}

[data-accent="orchid"]:not([data-theme="brand"]) {
  --rdl-accent: #C16CF7;
  --rdl-accent-hover: #B365E5;
  --rdl-accent-pressed: #AC62DC;
  --rdl-accent-subtle: #F4E5FE;
  --rdl-accent-text: #8F50B7;
  --rdl-accent-graphic: #B566E8;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="orchid"] {
  --rdl-accent: #C16CF7;
  --rdl-accent-hover: #B365E5;
  --rdl-accent-pressed: #AC62DC;
  --rdl-accent-subtle: #362742;
  --rdl-accent-text: #C16CF7;
  --rdl-accent-graphic: #C16CF7;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="orchid"] {
    --rdl-accent: #C16CF7;
    --rdl-accent-hover: #B365E5;
    --rdl-accent-pressed: #AC62DC;
    --rdl-accent-subtle: #362742;
    --rdl-accent-text: #C16CF7;
    --rdl-accent-graphic: #C16CF7;
    --rdl-on-accent: #151515;
  }

}

[data-accent="violet"]:not([data-theme="brand"]) {
  --rdl-accent: #664ADD;
  --rdl-accent-hover: #7258E0;
  --rdl-accent-pressed: #7860E1;
  --rdl-accent-subtle: #E5E0FD;
  --rdl-accent-text: #6F50F0;
  --rdl-accent-graphic: #7152F5;
  --rdl-on-accent: #FFFFFF;
}

[data-theme="dark"][data-accent="violet"] {
  --rdl-accent: #664ADD;
  --rdl-accent-hover: #7258E0;
  --rdl-accent-pressed: #7860E1;
  --rdl-accent-subtle: #272241;
  --rdl-accent-text: #856AF6;
  --rdl-accent-graphic: #7152F5;
  --rdl-on-accent: #FFFFFF;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="violet"] {
    --rdl-accent: #664ADD;
    --rdl-accent-hover: #7258E0;
    --rdl-accent-pressed: #7860E1;
    --rdl-accent-subtle: #272241;
    --rdl-accent-text: #856AF6;
    --rdl-accent-graphic: #7152F5;
    --rdl-on-accent: #FFFFFF;
  }

}

[data-accent="orange"]:not([data-theme="brand"]) {
  --rdl-accent: #F55F24;
  --rdl-accent-hover: #E35923;
  --rdl-accent-pressed: #DA5622;
  --rdl-accent-subtle: #FDE2D8;
  --rdl-accent-text: #BA481B;
  --rdl-accent-graphic: #EB5B23;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="orange"] {
  --rdl-accent: #F55F24;
  --rdl-accent-hover: #E35923;
  --rdl-accent-pressed: #DA5622;
  --rdl-accent-subtle: #3F251C;
  --rdl-accent-text: #F55F24;
  --rdl-accent-graphic: #F55F24;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="orange"] {
    --rdl-accent: #F55F24;
    --rdl-accent-hover: #E35923;
    --rdl-accent-pressed: #DA5622;
    --rdl-accent-subtle: #3F251C;
    --rdl-accent-text: #F55F24;
    --rdl-accent-graphic: #F55F24;
    --rdl-on-accent: #151515;
  }

}

[data-accent="ocean"]:not([data-theme="brand"]) {
  --rdl-accent: #2A5CDD;
  --rdl-accent-hover: #3B69E0;
  --rdl-accent-pressed: #4470E1;
  --rdl-accent-subtle: #DAE3FD;
  --rdl-accent-text: #2D62EC;
  --rdl-accent-graphic: #2F66F6;
  --rdl-on-accent: #FFFFFF;
}

[data-theme="dark"][data-accent="ocean"] {
  --rdl-accent: #2A5CDD;
  --rdl-accent-hover: #3B69E0;
  --rdl-accent-pressed: #4470E1;
  --rdl-accent-subtle: #1B2642;
  --rdl-accent-text: #4C7BF7;
  --rdl-accent-graphic: #2F66F6;
  --rdl-on-accent: #FFFFFF;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="ocean"] {
    --rdl-accent: #2A5CDD;
    --rdl-accent-hover: #3B69E0;
    --rdl-accent-pressed: #4470E1;
    --rdl-accent-subtle: #1B2642;
    --rdl-accent-text: #4C7BF7;
    --rdl-accent-graphic: #2F66F6;
    --rdl-on-accent: #FFFFFF;
  }

}

[data-accent="rose"]:not([data-theme="brand"]) {
  --rdl-accent: #F0548A;
  --rdl-accent-hover: #DE4F81;
  --rdl-accent-pressed: #D64C7C;
  --rdl-accent-subtle: #FCE0EA;
  --rdl-accent-text: #B64069;
  --rdl-accent-graphic: #EB5287;
  --rdl-on-accent: #151515;
}

[data-theme="dark"][data-accent="rose"] {
  --rdl-accent: #F0548A;
  --rdl-accent-hover: #DE4F81;
  --rdl-accent-pressed: #D64C7C;
  --rdl-accent-subtle: #3E232E;
  --rdl-accent-text: #F0548A;
  --rdl-accent-graphic: #F0548A;
  --rdl-on-accent: #151515;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme])[data-accent="rose"] {
    --rdl-accent: #F0548A;
    --rdl-accent-hover: #DE4F81;
    --rdl-accent-pressed: #D64C7C;
    --rdl-accent-subtle: #3E232E;
    --rdl-accent-text: #F0548A;
    --rdl-accent-graphic: #F0548A;
    --rdl-on-accent: #151515;
  }

}

/* ===== data-style="flat": v1 look — solid cards, Inter, medium numerals, smaller radii, no blur ===== */
[data-style="flat"] {
  --rdl-font-sans: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --rdl-num-weight: 500;
  --rdl-display-weight: 500;
  --rdl-radius-card: 24px;
  --rdl-radius-widget: 28px;
  --rdl-glass-blur: 0px;
}

[data-style="flat"][data-theme="light"], :root[data-style="flat"]:not([data-theme]) {
  --rdl-bg-canvas: var(--rdl-gray-100);
  --rdl-bg-surface-sunken: var(--rdl-gray-100);
  --rdl-bg-emphasis: var(--rdl-ink-950);
  --rdl-bg-emphasis-raised: var(--rdl-ink-700);
  --rdl-material-regular: var(--rdl-gray-0);
  --rdl-material-thick: var(--rdl-gray-0);
  --rdl-material-border: rgba(0,0,0,0);
}

[data-style="flat"][data-theme="dark"] {
  --rdl-bg-canvas: var(--rdl-ink-950);
  --rdl-bg-surface: #17171A;
  --rdl-bg-surface-sunken: #202024;
  --rdl-bg-emphasis: #232327;
  --rdl-material-regular: #17171A;
  --rdl-material-thick: #202024;
  --rdl-material-border: rgba(0,0,0,0);
  --rdl-bg-emphasis-raised: var(--rdl-ink-600);
}

@media (prefers-color-scheme: dark) {
  :root[data-style="flat"]:not([data-theme]) {
    --rdl-bg-canvas: var(--rdl-ink-950);
    --rdl-bg-surface: #17171A;
    --rdl-bg-surface-sunken: #202024;
    --rdl-bg-emphasis: #232327;
    --rdl-material-regular: #17171A;
    --rdl-material-thick: #202024;
    --rdl-material-border: rgba(0,0,0,0);
    --rdl-bg-emphasis-raised: var(--rdl-ink-600);
  }

}

/* ===== v3 aliases + component tokens (follow the theme of the element they are used on) ===== */
:root, [data-theme], [data-brand], [data-accent], [data-style] {
  --rdl-bg-surface-muted: var(--rdl-bg-surface-sunken);
  --rdl-bg-hero: var(--rdl-bg-emphasis);
  --rdl-bg-hero-raised: var(--rdl-bg-emphasis-raised);
  --rdl-scrim: var(--rdl-bg-scrim);
  --rdl-fill-control-strong: var(--rdl-action-primary);
  --rdl-text-primary: var(--rdl-fg-primary);
  --rdl-text-secondary: var(--rdl-fg-secondary);
  --rdl-text-tertiary: var(--rdl-fg-tertiary);
  --rdl-text-on-hero: var(--rdl-fg-on-emphasis);
  --rdl-text-on-hero-muted: var(--rdl-fg-on-emphasis-secondary);
  --rdl-text-on-strong: var(--rdl-on-action-primary);
  --rdl-success-soft: var(--rdl-success-subtle);
  --rdl-danger-soft: var(--rdl-danger-subtle);
  --rdl-warning-soft: var(--rdl-warning-subtle);
  --rdl-info-soft: var(--rdl-info-subtle);
  --rdl-glass-fill: var(--rdl-material-regular);
  --rdl-glass-fill-strong: var(--rdl-material-thick);
  --rdl-glass-border: var(--rdl-material-border);
  --rdl-glass-shade: var(--rdl-material-shade);
  --rdl-glass-text: var(--rdl-fg-primary);
  --rdl-glass-text-muted: var(--rdl-fg-secondary);
  --rdl-glass-dark-fill: var(--rdl-material-dark);
  --rdl-glass-dark-border: var(--rdl-material-dark-border);
  --rdl-accent-strong: var(--rdl-accent-hover);
  --rdl-accent-soft: var(--rdl-accent-subtle);
  --rdl-shadow-none: none;
  --rdl-shadow-sm: var(--rdl-shadow-e1);
  --rdl-shadow-md: var(--rdl-shadow-e2);
  --rdl-shadow-lg: var(--rdl-shadow-e3);
  --rdl-shadow-float: var(--rdl-shadow-e4);
  --rdl-shadow-glass: var(--rdl-shadow-glass);
  --rdl-shadow-glass-dark: 0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.45);
  --rdl-shadow-glow: 0 0 32px var(--rdl-accent);

  --rdl-button-primary-bg: var(--rdl-action-primary);
  --rdl-button-primary-bg-hover: var(--rdl-action-primary-hover);
  --rdl-button-primary-bg-pressed: var(--rdl-action-primary-pressed);
  --rdl-button-primary-fg: var(--rdl-on-action-primary);
  --rdl-button-primary-bg-disabled: var(--rdl-fill-disabled);
  --rdl-button-primary-fg-disabled: var(--rdl-fg-disabled);
  --rdl-button-primary-height: var(--rdl-size-control-lg);
  --rdl-button-primary-radius: var(--rdl-radius-pill);
  --rdl-button-primary-padding-x: var(--rdl-space-6);
  --rdl-button-secondary-bg: var(--rdl-action-secondary);
  --rdl-button-secondary-bg-hover: var(--rdl-action-secondary-hover);
  --rdl-button-secondary-bg-pressed: var(--rdl-action-secondary-pressed);
  --rdl-button-secondary-fg: var(--rdl-on-action-secondary);
  --rdl-button-secondary-bg-disabled: var(--rdl-fill-disabled);
  --rdl-button-secondary-fg-disabled: var(--rdl-fg-disabled);
  --rdl-button-secondary-height: var(--rdl-size-control-lg);
  --rdl-button-secondary-radius: var(--rdl-radius-pill);
  --rdl-button-secondary-padding-x: var(--rdl-space-6);
  --rdl-button-accent-bg: var(--rdl-accent);
  --rdl-button-accent-bg-hover: var(--rdl-accent-hover);
  --rdl-button-accent-bg-pressed: var(--rdl-accent-pressed);
  --rdl-button-accent-fg: var(--rdl-on-accent);
  --rdl-button-accent-height: var(--rdl-size-control-lg);
  --rdl-button-accent-radius: var(--rdl-radius-pill);
  --rdl-button-accent-padding-x: var(--rdl-space-6);
  --rdl-orb-bg: var(--rdl-fill-control);
  --rdl-orb-bg-hover: var(--rdl-fill-control-hover);
  --rdl-orb-bg-pressed: var(--rdl-fill-control-pressed);
  --rdl-orb-fg: var(--rdl-fg-primary);
  --rdl-orb-bg-selected: var(--rdl-action-primary);
  --rdl-orb-fg-selected: var(--rdl-on-action-primary);
  --rdl-orb-size: var(--rdl-size-orb);
  --rdl-orb-icon: var(--rdl-size-icon-md);
  --rdl-chip-bg: var(--rdl-fill-control);
  --rdl-chip-bg-hover: var(--rdl-fill-control-hover);
  --rdl-chip-fg: var(--rdl-fg-primary);
  --rdl-chip-bg-selected: var(--rdl-action-primary);
  --rdl-chip-fg-selected: var(--rdl-on-action-primary);
  --rdl-chip-height: var(--rdl-size-control-sm);
  --rdl-chip-radius: var(--rdl-radius-pill);
  --rdl-chip-padding-x: var(--rdl-space-4);
  --rdl-tag-bg: var(--rdl-fill-control);
  --rdl-tag-fg: var(--rdl-fg-secondary);
  --rdl-tag-height: var(--rdl-size-tag);
  --rdl-tag-radius: var(--rdl-radius-pill);
  --rdl-tag-padding-x: var(--rdl-space-2_5);
  --rdl-segmented-track: var(--rdl-fill-control);
  --rdl-segmented-thumb: var(--rdl-action-primary);
  --rdl-segmented-fg-selected: var(--rdl-on-action-primary);
  --rdl-segmented-fg: var(--rdl-fg-secondary);
  --rdl-segmented-height: var(--rdl-size-control-md);
  --rdl-segmented-item-height: var(--rdl-size-control-sm);
  --rdl-segmented-inset: var(--rdl-space-1);
  --rdl-input-bg: var(--rdl-fill-control);
  --rdl-input-bg-focus: var(--rdl-bg-surface);
  --rdl-input-fg: var(--rdl-fg-primary);
  --rdl-input-placeholder: var(--rdl-fg-tertiary);
  --rdl-input-border: var(--rdl-border-subtle);
  --rdl-input-border-focus: var(--rdl-border-focus);
  --rdl-input-height: var(--rdl-size-control-md);
  --rdl-input-radius: var(--rdl-radius-pill);
  --rdl-card-bg: var(--rdl-bg-surface);
  --rdl-card-fg: var(--rdl-fg-primary);
  --rdl-card-border: var(--rdl-border-subtle);
  --rdl-card-radius: var(--rdl-radius-card);
  --rdl-card-shadow: none;
  --rdl-card-glass-bg: var(--rdl-material-regular);
  --rdl-card-glass-border: var(--rdl-material-border);
  --rdl-card-glass-shadow: var(--rdl-shadow-glass);
  --rdl-card-glass-radius: var(--rdl-radius-card);
  --rdl-card-emphasis-bg: var(--rdl-bg-emphasis);
  --rdl-card-emphasis-fg: var(--rdl-fg-on-emphasis);
  --rdl-card-emphasis-fg-secondary: var(--rdl-fg-on-emphasis-secondary);
  --rdl-card-emphasis-radius: var(--rdl-radius-card);
  --rdl-card-brand-bg: var(--rdl-bg-brand);
  --rdl-card-brand-fg: var(--rdl-fg-on-brand);
  --rdl-card-brand-fg-secondary: var(--rdl-fg-on-brand-secondary);
  --rdl-card-brand-radius: var(--rdl-radius-card);
  --rdl-sheet-bg: var(--rdl-bg-canvas-elevated);
  --rdl-sheet-radius: var(--rdl-radius-sheet);
  --rdl-sheet-grabber: var(--rdl-border-strong);
  --rdl-sheet-scrim: var(--rdl-bg-scrim);
  --rdl-sheet-shadow: var(--rdl-shadow-e4);
  --rdl-dock-bg: var(--rdl-material-thick);
  --rdl-dock-border: var(--rdl-material-border);
  --rdl-dock-item-selected: var(--rdl-action-primary);
  --rdl-dock-fg-selected: var(--rdl-on-action-primary);
  --rdl-dock-fg: var(--rdl-fg-secondary);
  --rdl-dock-height: var(--rdl-size-dock);
  --rdl-toggle-track: var(--rdl-fill-control-pressed);
  --rdl-toggle-track-on: var(--rdl-accent);
  --rdl-toggle-thumb: #FFFFFF;
  --rdl-toggle-thumb-on: var(--rdl-on-accent);
  --rdl-status-success-bg: var(--rdl-success-subtle);
  --rdl-status-success-fg: var(--rdl-success-text);
  --rdl-status-warning-bg: var(--rdl-warning-subtle);
  --rdl-status-warning-fg: var(--rdl-warning-text);
  --rdl-status-danger-bg: var(--rdl-danger-subtle);
  --rdl-status-danger-fg: var(--rdl-danger-text);
  --rdl-status-info-bg: var(--rdl-info-subtle);
  --rdl-status-info-fg: var(--rdl-info-text);
  --rdl-status-dot: var(--rdl-size-icon-sm);
  --rdl-focus-ring: var(--rdl-border-focus);
  --rdl-focus-width: var(--rdl-border-width-focus);
  --rdl-focus-offset: var(--rdl-border-width-focus-offset);
}

/* Type roles — use on any element: <p class="rdl-h1">. Display roles follow --rdl-num-weight (300 glass / 500 flat). */
.rdl-hero { font-family: var(--rdl-font-sans); font-size: 96px; line-height: 92px; font-weight: var(--rdl-num-weight); letter-spacing: -0.04em; }
.rdl-display-xl { font-family: var(--rdl-font-sans); font-size: 72px; line-height: 72px; font-weight: var(--rdl-num-weight); letter-spacing: -0.035em; }
.rdl-display { font-family: var(--rdl-font-sans); font-size: 56px; line-height: 58px; font-weight: var(--rdl-num-weight); letter-spacing: -0.03em; }
.rdl-numeral { font-family: var(--rdl-font-sans); font-size: 40px; line-height: 44px; font-weight: var(--rdl-num-weight); letter-spacing: -0.02em; }
.rdl-h1 { font-family: var(--rdl-font-sans); font-size: 34px; line-height: 38px; font-weight: 400; letter-spacing: -0.02em; }
.rdl-h2 { font-family: var(--rdl-font-sans); font-size: 26px; line-height: 30px; font-weight: 400; letter-spacing: -0.015em; }
.rdl-h3 { font-family: var(--rdl-font-sans); font-size: 20px; line-height: 24px; font-weight: 500; letter-spacing: -0.01em; }
.rdl-title { font-family: var(--rdl-font-sans); font-size: 17px; line-height: 22px; font-weight: 500; letter-spacing: -0.005em; }
.rdl-body { font-family: var(--rdl-font-sans); font-size: 15px; line-height: 22px; font-weight: 400; letter-spacing: 0em; }
.rdl-body-strong { font-family: var(--rdl-font-sans); font-size: 15px; line-height: 22px; font-weight: 600; letter-spacing: 0em; }
.rdl-label { font-family: var(--rdl-font-sans); font-size: 14px; line-height: 18px; font-weight: 500; letter-spacing: 0em; }
.rdl-meta { font-family: var(--rdl-font-sans); font-size: 13px; line-height: 18px; font-weight: 500; letter-spacing: 0em; }
.rdl-caption { font-family: var(--rdl-font-sans); font-size: 12px; line-height: 16px; font-weight: 400; letter-spacing: 0.005em; }
.rdl-micro { font-family: var(--rdl-font-sans); font-size: 11px; line-height: 14px; font-weight: 500; letter-spacing: 0.04em; }
.rdl-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
.rdl-dot { font-family: var(--rdl-font-dot); font-weight: 700; letter-spacing: 0; }
/* A themed region: paints its own canvas and text colour (use on <body> or any [data-theme] container). */
.rdl-themed, [data-theme] > body { background: var(--rdl-bg-canvas); color: var(--rdl-fg-primary); }
```

## Appendix C · `scripts/build_tokens.mjs`

Regenerates Appendix B, D, E and §3 from Appendix A, using the engine in Appendix M. Fails if any contrast pair misses.

```js
#!/usr/bin/env node
// Builds platform outputs from assets/tokens/tokens.json (the single source of truth).
//   node skills/rdl-theme/scripts/build_tokens.mjs
// Outputs:
//   assets/tokens/tokens.css           CSS custom properties: light · dark · brand themes, brand + accent presets,
//                                      component tokens, v3 aliases, type classes
//   assets/tokens/tailwind.preset.js   Tailwind preset wired to the CSS variables
//   assets/tokens/contrast-report.md   Every required role pair in every theme and preset (build fails on a miss)
//   references/tokens.md               Every role with its value per theme, scales, component tokens, presets
//   assets/ios/RDLTokens.swift         SwiftUI data + roles (pairs with the hand-written RDLThemeEngine.swift)
// Attributes (on <html> or any element): data-theme="light|dark|brand", data-brand="<preset>",
// data-accent="<preset>", data-style="glass|flat". Runtime colours: assets/tokens/rdl-theme.js.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const R = require(join(root, "assets/tokens/rdl-theme.js"));
const t = JSON.parse(readFileSync(join(root, "assets/tokens/tokens.json"), "utf8"));
const header = (c) => `${c} GENERATED by scripts/build_tokens.mjs from tokens.json — do not edit by hand.\n`;
const entries = (o) => Object.entries(o).filter(([k]) => !k.startsWith("_"));
const px = (n) => `${n}px`;
const camel = (s) => s.replace(/[-.](\w)/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, "_$1");

// ---------- resolve ----------
const prim = (v) => {
  const [fam, step] = v.slice(1, -1).split(".");
  const out = t.primitive[fam]?.[step];
  if (!out) throw new Error(`Unresolved primitive ${v}`);
  return out;
};
/** Resolve a theme role value to a literal (hex, rgba or shadow string). `$x` refers to another role in `roles`. */
const lit = (v, roles) => {
  if (typeof v !== "string") return v;
  if (v.startsWith("{")) return prim(v);
  if (v.startsWith("$")) return lit(roles[v.slice(1)], roles);
  return v;
};
/** CSS form: primitives and roles become var() so overrides flow through. */
const cssVal = (v) => {
  if (typeof v !== "string") return v;
  if (v.startsWith("{")) {
    const [grp, key] = v.slice(1, -1).split(".");
    if (t.primitive[grp]) return `var(--rdl-${grp}-${key})`;
    const prefix = { size: "size-", radius: "radius-", space: "space-", layout: "", "border-width": "border-width-" }[grp];
    if (prefix === undefined) throw new Error(`Unknown scale ${v}`);
    return `var(--rdl-${prefix}${key.replace(".", "_")})`;
  }
  if (v.startsWith("$")) return `var(--rdl-${v.slice(1)})`;
  return v;
};

// ---------- compute every theme × preset ----------
const brandPresets = entries(t.brand.presets);
const accentPresets = entries(t.accents).filter(([k]) => k !== "default");
const defaultBrand = t.brand.presets[t.brand.default];
const defaultAccent = t.accents[t.accents.default];
const ACCENT_KEYS = ["accent", "accent-hover", "accent-pressed", "accent-subtle", "accent-text", "accent-graphic", "on-accent"];

function neutralRoles(theme, secondary, primary) {
  const s = t.theme[theme];
  const roles = {};
  for (const [k, v] of entries(s)) roles[k] = v;
  Object.assign(roles, R.accentRoles(secondary, lit(s["bg-canvas"], roles), lit(s["bg-surface"], roles)));
  Object.assign(roles, R.brandPanelRoles(primary));
  const out = {};
  for (const k of Object.keys(roles)) out[k] = lit(roles[k], roles);
  return out;
}
const staticKeys = Object.keys(entries(t.theme.light).reduce((o, [k]) => ((o[k] = 1), o), {}));
for (const k of staticKeys) if (!(k in t.theme.dark)) throw new Error(`theme.dark is missing ${k}`);
for (const k of staticKeys) if (!(k in R.brandRoles("#0732D8", "#F2D33C"))) throw new Error(`brand engine is missing ${k}`);

// ---------- contrast report ----------
{
  const rows = [];
  const failures = [];
  const run = (label, theme, roles) => {
    const a = R.audit(roles, theme);
    const min = Math.min(...a.map((x) => x.ratio / x.min));
    const bad = a.filter((x) => !x.pass);
    bad.forEach((x) => failures.push(`${label}: ${x.fg} on ${x.bg} = ${x.ratio} (min ${x.min})`));
    const pick = (fg, bg) => a.find((x) => x.fg === fg && x.bg === bg)?.ratio ?? "–";
    rows.push(`| ${label} | ${pick("fg-primary", "bg-canvas")} | ${pick("fg-secondary", "bg-canvas")} | ${pick("fg-tertiary", "bg-canvas")} | ${pick("on-action-primary", "action-primary")} | ${pick("on-accent", "accent")} | ${pick("accent-text", "bg-canvas")} | ${pick("accent-graphic", "bg-canvas")} | ${a.length - bad.length}/${a.length} | ${min.toFixed(2)}× |`);
  };
  for (const [name, hexv] of accentPresets) {
    run(`light · accent ${name}`, "light", neutralRoles("light", hexv, defaultBrand.primary));
    run(`dark · accent ${name}`, "dark", neutralRoles("dark", hexv, defaultBrand.primary));
  }
  for (const [name, p] of brandPresets) {
    run(`brand · ${name}`, "brand", R.brandRoles(p.primary, p.secondary));
    run(`light · brand panel ${name}`, "light", neutralRoles("light", defaultAccent, p.primary));
  }
  const md = [
    "<!-- " + header("").trim() + " -->",
    "# Contrast report",
    "",
    "Every theme and preset is checked against the pairs in `rdl-theme.js → pairs()`: primary text ≥ 7:1 in light and dark",
    "(≥ 4.5:1 on brand canvases), secondary text ≥ 4.5:1, tertiary ≥ 3:1, button and accent labels ≥ 4.5:1, accent text",
    "≥ 4.5:1, accent graphics and focus rings ≥ 3:1, status text ≥ 4.5:1 on canvas, surface and its subtle fill, and text on",
    "glass ≥ 4.5:1 over the canvas. Translucent roles are composited before measuring. The build fails on any miss.",
    "",
    "| Theme · preset | fg-primary | fg-secondary | fg-tertiary | primary button | accent label | accent text | accent graphic | pairs passing | worst margin |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...rows,
    "",
    failures.length ? "## Failures\n\n" + failures.map((f) => `- ${f}`).join("\n") : "All pairs pass.",
    "",
  ].join("\n");
  writeFileSync(join(root, "assets/tokens/contrast-report.md"), md);
  if (failures.length) {
    console.error(failures.join("\n"));
    throw new Error(`${failures.length} contrast failures — see assets/tokens/contrast-report.md`);
  }
}

// ---------- references/tokens.md (generated reference) ----------
{
  const light = neutralRoles("light", defaultAccent, defaultBrand.primary);
  const dark = neutralRoles("dark", defaultAccent, defaultBrand.primary);
  const brand = R.brandRoles(defaultBrand.primary, defaultBrand.secondary);
  const fmt = (v) => v;
  const sw = () => ""; // plain values: this file is read by agents as much as by people
  const doc = {
    "bg-canvas": "App background. HIG systemBackground · M3 surface.",
    "bg-canvas-elevated": "Background of sheets and modals (HIG elevated background in dark).",
    "bg-surface": "Cards on the canvas. M3 surface-container.",
    "bg-surface-raised": "Menus, popovers, cards inside sheets. M3 surface-container-high.",
    "bg-surface-sunken": "Wells and tracks inside a card.",
    "bg-emphasis": "The one high-emphasis card (v3 hero / ink widget). Inverse of the canvas in Brand.",
    "bg-emphasis-raised": "Controls inside the emphasis card.",
    "bg-scrim": "Behind sheets and modals.",
    "fill-control": "Orbs, chips, segmented tracks, inputs at rest.",
    "fill-control-hover": "Hover (pointer).",
    "fill-control-pressed": "Pressed, selected-but-quiet, missed month cell.",
    "fill-disabled": "Disabled container (M3: on-surface at 12%).",
    "fg-primary": "Titles, figures, body. ≥ 7:1 (≥ 4.5:1 on brand canvases).",
    "fg-secondary": "Labels, meta, units. ≥ 4.5:1.",
    "fg-tertiary": "Captions, placeholders, decoration. ≥ 3:1, never essential text.",
    "fg-disabled": "Disabled content (M3: 38%).",
    "fg-on-emphasis": "Text on bg-emphasis.",
    "fg-on-emphasis-secondary": "Secondary text on bg-emphasis. ≥ 4.5:1.",
    "border-subtle": "Hairlines inside cards, KV rules.",
    "border-default": "Input and outline-orb borders.",
    "border-strong": "Grabbers, dashed placeholders, upcoming month rings.",
    "border-focus": "Focus ring, 2px with 2px offset. Always ≥ 3:1 (= accent-graphic in light/dark).",
    "action-primary": "Primary button, active segment, solid orb. Ink in light, white in dark, ink/white in brand.",
    "action-primary-hover": "+8% state layer.",
    "action-primary-pressed": "+12% state layer.",
    "on-action-primary": "Label on the primary action. ≥ 4.5:1 in every state.",
    "action-secondary": "Secondary (tonal) button.",
    "action-secondary-hover": "+8%.",
    "action-secondary-pressed": "+12%.",
    "on-action-secondary": "Label on the secondary action. ≥ 4.5:1.",
    "accent": "The secondary colour as a fill that carries its own label (tag, active dock item, check bead).",
    "accent-hover": "+8%.",
    "accent-pressed": "+12%.",
    "accent-subtle": "Tinted background (selected row, soft highlight).",
    "accent-text": "Secondary colour as text. ≥ 4.5:1 on canvas and surface.",
    "accent-graphic": "Secondary colour as a standalone mark: datum, needle, meter fill, focus. ≥ 3:1.",
    "on-accent": "Label on accent. ≥ 4.5:1 in every state.",
    "bg-brand": "Brand panel: a card or backdrop in the primary colour (light and dark).",
    "fg-on-brand": "Text on bg-brand. ≥ 4.5:1.",
    "fg-on-brand-secondary": "Secondary text on bg-brand. ≥ 4.5:1.",
    "material-ultrathin": "Glass: most context, least contrast. Never with tertiary text.",
    "material-thin": "Glass: chips and pills over photos.",
    "material-regular": "Glass: default card (HIG regular).",
    "material-thick": "Glass over busy backdrops; text must still pass 4.5:1.",
    "material-border": "Glass rim.",
    "material-highlight": "Inner top highlight of glass.",
    "material-shade": "Glass drop tint.",
    "material-dark": "Dark glass over photos, in every theme.",
    "material-dark-border": "Rim of dark glass.",
    "chart-track": "Meter and progress tracks.",
    "chart-grid": "Chart gridlines.",
    "chart-muted": "Inactive bars and series.",
    "chart-hatch": "Hatched (reserved/forecast) fills.",
    "tick": "Ruler ticks and dotted ghost curves.",
    "tick-strong": "Major ticks, solid window curve.",
    "shadow-e1": "Elevation 1 (M3 level 1): resting cards that need lift.",
    "shadow-e2": "Elevation 2 (M3 level 2–3): menus, popovers.",
    "shadow-e3": "Elevation 3 (M3 level 4): floating panels.",
    "shadow-e4": "Elevation 4 (M3 level 5): sheets, modals, the dock.",
    "shadow-glass": "Glass: inner highlight + soft drop.",
  };
  const status = ["success", "warning", "danger", "info"];
  for (const k of status) {
    doc[k] = `Status dot, meter fill (≥ 3:1).`;
    doc[`${k}-subtle`] = `Status pill / tinted tile background.`;
    doc[`${k}-text`] = `Status text. ≥ 4.5:1 on canvas, surface and ${k}-subtle.`;
  }
  const groups = [
    ["Background", (k) => k.startsWith("bg-") && k !== "bg-brand"],
    ["Fill", (k) => k.startsWith("fill-")],
    ["Foreground", (k) => k.startsWith("fg-") && !k.startsWith("fg-on-brand")],
    ["Border", (k) => k.startsWith("border-")],
    ["Action", (k) => k.includes("action-")],
    ["Accent (secondary colour)", (k) => k.includes("accent")],
    ["Brand panel (primary colour)", (k) => k === "bg-brand" || k.startsWith("fg-on-brand")],
    ["Status", (k) => status.some((s) => k === s || k.startsWith(s + "-"))],
    ["Material (glass)", (k) => k.startsWith("material-")],
    ["Data", (k) => k.startsWith("chart-") || k.startsWith("tick")],
    ["Elevation", (k) => k.startsWith("shadow-")],
  ];
  const keys = Object.keys(light);
  const out = [
    "<!-- " + header("").trim() + " -->",
    "# Token reference (v" + t.meta.version + ")",
    "",
    "Every semantic role with its exact value in each theme. Light and Dark use the default secondary",
    `(\`${t.accents.default}\` ${defaultAccent}) and the default brand primary (\`${t.brand.default}\` ${defaultBrand.primary}) for brand panels;`,
    `Brand shows the \`${t.brand.default}\` preset (primary ${defaultBrand.primary}, secondary ${defaultBrand.secondary}). Brand values are computed`,
    "by `assets/tokens/rdl-theme.js` from the two colours, so they change with the preset. How the themes work: `themes.md`.",
    "",
    "CSS: `var(--rdl-<role>)` · Tailwind: `bg-<role>`, `text-<role>` · SwiftUI: `RDLColor.<camelCase>`.",
    "",
  ];
  for (const [g, f] of groups) {
    const ks = keys.filter(f);
    if (!ks.length) continue;
    out.push(`## ${g}`, "", "| Role | Light | Dark | Brand (" + t.brand.default + ") | Use |", "|---|---|---|---|---|");
    for (const k of ks) out.push(`| \`${k}\` | ${sw(light[k])}${fmt(light[k])} | ${sw(dark[k])}${fmt(dark[k])} | ${sw(brand[k] ?? "")}${fmt(brand[k] ?? "")} | ${doc[k] ?? ""} |`);
    out.push("");
  }
  out.push("## Scales", "");
  out.push("| Scale | Values |", "|---|---|");
  out.push(`| State layers (M3) | ${entries(t.state).map(([k, v]) => `${k} ${v}`).join(" · ")} |`);
  out.push(`| Opacity | ${entries(t.opacity).map(([k, v]) => v).join(" · ")} |`);
  out.push(`| Border width | ${entries(t["border-width"]).map(([k, v]) => `${k} ${v}`).join(" · ")} |`);
  out.push(`| Z-index | ${entries(t["z-index"]).map(([k, v]) => `${k} ${v}`).join(" · ")} |`);
  out.push(`| Breakpoints (M3 window classes) | ${entries(t.breakpoint).map(([k, v]) => `${k} ≥ ${v}`).join(" · ")} |`);
  out.push(`| Duration (ms) | ${entries(t.motion.duration).map(([k, v]) => `${k} ${v}`).join(" · ")} |`);
  out.push(`| Easing | ${entries(t.motion.easing).map(([k, v]) => `${k} \`${v}\``).join(" · ")} |`);
  out.push(`| Space | ${entries(t.space).map(([k, v]) => v).join(" · ")} |`);
  out.push(`| Radius | ${entries(t.radius).map(([k, v]) => `${k} ${v}`).join(" · ")} |`);
  out.push(`| Control sizes | ${["tag", "control-xs", "control-sm", "control-md", "control-lg", "control-xl"].map((k) => `${k} ${t.size[k]}`).join(" · ")} |`);
  out.push("");
  out.push("## Component tokens", "", "CSS `var(--rdl-<component>-<property>)`. Restyle a component by editing its row in `tokens.json`.", "");
  out.push("| Component | Properties |", "|---|---|");
  for (const [c, props] of entries(t.component)) out.push(`| \`${c}\` | ${entries(props).map(([k, v]) => `${k} → \`${v}\``).join(" · ")} |`);
  out.push("", "## Presets", "", "| Brand preset | Primary | Secondary | Board source |", "|---|---|---|---|");
  for (const [n, p] of brandPresets) out.push(`| \`${n}\` | ${sw(p.primary)}${p.primary} | ${sw(p.secondary)}${p.secondary} | ${p.source} |`);
  out.push("", "| Secondary preset (light/dark) | Colour |", "|---|---|");
  for (const [n, v] of accentPresets) out.push(`| \`${n}\` | ${sw(v)}${v} |`);
  out.push("", "## v3 names (aliases)", "", "| v3 | v4 |", "|---|---|");
  for (const [k, v] of entries(t.legacy)) out.push(`| \`${k}\` | \`${v}\` |`);
  writeFileSync(join(root, "references/tokens.md"), out.join("\n") + "\n");
}

// ---------- CSS ----------
{
  let base;
  const L = [header("/*").trim() + " */", ""];
  const block = (sel, lines) => [`${sel} {`, ...lines, "}", ""];
  const media = (sel, lines) => ["@media (prefers-color-scheme: dark) {", ...block(sel, lines).map((l) => (l ? "  " + l : l)), "}", ""];
  const decl = (o) => Object.entries(o).map(([k, v]) => `  --rdl-${k}: ${v};`);
  const roleDecl = (theme) => entries(t.theme[theme]).map(([k, v]) => `  --rdl-${k}: ${cssVal(v)};`);
  const accentFor = (theme, hexv) => {
    const s = t.theme[theme];
    const canvas = lit(s["bg-canvas"], s), surface = lit(s["bg-surface"], s);
    return R.accentRoles(hexv, canvas, surface);
  };

  // Constants
  base = [];
  for (const [fam, steps] of entries(t.primitive)) for (const [step, hexv] of entries(steps)) base.push(`  --rdl-${fam}-${step}: ${hexv};`);
  base.push("");
  for (const [k, v] of entries(t.type.family)) base.push(`  --rdl-font-${k}: ${v};`);
  base.push(`  --rdl-num-weight: ${t.type.scale.display.weight};`, `  --rdl-display-weight: ${t.type.scale["display-xl"].weight};`);
  base.push(`  --rdl-unit-scale: ${t.type.numerals["unit-scale"]};`);
  for (const [k, v] of entries(t.space)) base.push(`  --rdl-space-${String(k).replace(".", "_")}: ${px(v)};`);
  for (const [k, v] of entries(t.layout)) base.push(`  --rdl-${k}: ${px(v)};`);
  for (const [k, v] of entries(t.radius)) base.push(`  --rdl-radius-${k}: ${px(v)};`);
  base.push(`  --rdl-radius-card: ${px(t.radius.xl)};`, `  --rdl-radius-widget: ${px(t.radius["3xl"])};`);
  for (const [k, v] of entries(t.size)) base.push(`  --rdl-size-${k}: ${px(v)};`);
  for (const [k, v] of entries(t["border-width"])) base.push(`  --rdl-border-width-${k}: ${px(v)};`);
  for (const [k, v] of entries(t.state)) base.push(`  --rdl-state-${k}: ${v};`);
  for (const [k, v] of entries(t.opacity)) base.push(`  --rdl-opacity-${k}: ${v};`);
  for (const [k, v] of entries(t["z-index"])) base.push(`  --rdl-z-${k}: ${v};`);
  for (const [k, v] of entries(t.breakpoint)) base.push(`  --rdl-breakpoint-${k}: ${px(v)};`);
  for (const [k, v] of entries(t.motion.duration)) base.push(`  --rdl-duration-${k}: ${v}ms;`);
  for (const [k, v] of entries(t.motion.easing)) base.push(`  --rdl-ease-${k}: ${v};`);
  base.push(`  --rdl-glass-blur: ${px(t.glass.blur)};`, `  --rdl-glass-saturate: ${t.glass.saturate};`);
  base.push(`  --rdl-glass-edge: ${t.glass.edge};`, `  --rdl-glass-iridescent: ${t.glass.iridescent};`);
  for (const [k, a] of entries(t.aura)) {
    const stops = a.stops.map(([c, p]) => `${c} ${Math.round(p * 100)}%`).join(", ");
    base.push(`  --rdl-aura-${k}: ${a.type === "radial" ? `radial-gradient(120% 110% at ${a.at}, ${stops})` : `linear-gradient(${a.angle}deg, ${stops})`};`);
  }
  L.push("/* ===== Constants: primitives and scales (theme-independent) ===== */");
  L.push(...block(":root", base));

  // Light (default) and dark
  const brandRaw = (p) => decl({ "brand-primary": R.hex(R.parse(p.primary)), "brand-secondary": R.hex(R.parse(p.secondary)) });
  L.push("/* ===== Theme: light (default) ===== */");
  L.push(...block(':root, [data-theme="light"]', [
    ...roleDecl("light"), ...decl(accentFor("light", defaultAccent)), ...decl(R.brandPanelRoles(defaultBrand.primary)), ...brandRaw(defaultBrand), "  color-scheme: light;",
  ]));
  const dark = [...roleDecl("dark"), ...decl(accentFor("dark", defaultAccent)), "  color-scheme: dark;"];
  L.push("/* ===== Theme: dark (explicit, or follows the system when no data-theme is set) ===== */");
  L.push(...block('[data-theme="dark"]', dark));
  L.push(...media(":root:not([data-theme])", dark));

  // Brand theme
  const brandBlock = (p) => {
    const r = R.brandRoles(p.primary, p.secondary);
    return [...decl(r), ...brandRaw(p), `  color-scheme: ${R.onColor(r["bg-canvas"]) === R.WHITE ? "dark" : "light"};`];
  };
  L.push(`/* ===== Theme: brand — canvas = primary, highlight = secondary. Default preset: ${t.brand.default} ===== */`);
  L.push(...block('[data-theme="brand"]', brandBlock(defaultBrand)));
  for (const [name, p] of brandPresets) L.push(...block(`[data-theme="brand"][data-brand="${name}"]`, brandBlock(p)));

  // Brand panels in light/dark
  L.push("/* ===== Brand panels in light and dark: data-brand picks the primary for bg-brand ===== */");
  for (const [name, p] of brandPresets)
    L.push(...block(`[data-brand="${name}"]:not([data-theme="brand"])`, [...decl(R.brandPanelRoles(p.primary)), ...brandRaw(p)]));

  // Accent presets in light/dark (in the brand theme the secondary comes with the brand pair)
  L.push("/* ===== Accent (secondary colour) presets for light and dark ===== */");
  for (const [name, hexv] of accentPresets) {
    L.push(...block(`[data-accent="${name}"]:not([data-theme="brand"])`, decl(accentFor("light", hexv))));
    L.push(...block(`[data-theme="dark"][data-accent="${name}"]`, decl(accentFor("dark", hexv))));
    L.push(...media(`:root:not([data-theme])[data-accent="${name}"]`, decl(accentFor("dark", hexv))));
  }

  // Flat style
  const flat = t.styles.flat;
  L.push('/* ===== data-style="flat": v1 look — solid cards, Inter, medium numerals, smaller radii, no blur ===== */');
  L.push(...block('[data-style="flat"]', entries(flat.vars).map(([k, v]) => `  --rdl-${k}: ${v};`)));
  const flatDecl = (o) => entries(o).map(([k, v]) => `  --rdl-${k}: ${cssVal(v)};`);
  L.push(...block('[data-style="flat"][data-theme="light"], :root[data-style="flat"]:not([data-theme])', flatDecl(flat.light)));
  L.push(...block('[data-style="flat"][data-theme="dark"]', flatDecl(flat.dark)));
  L.push(...media(':root[data-style="flat"]:not([data-theme])', flatDecl(flat.dark)));

  // Aliases and component tokens: re-declared wherever a theme attribute can change the roles they point at.
  const alias = [];
  for (const [k, v] of entries(t.legacy)) alias.push(`  --rdl-${k}: var(--rdl-${v});`);
  for (const [k, v] of entries(t.shadow)) alias.push(`  --rdl-shadow-${k}: ${cssVal(v)};`);
  alias.push("");
  const taken = new Set(base.map((l) => l.trim().split(":")[0]).filter(Boolean));
  for (const [comp, props] of entries(t.component))
    for (const [k, v] of entries(props)) {
      const name = `--rdl-${comp}-${k}`;
      if (taken.has(name)) throw new Error(`Component token ${name} collides with a constant of the same name`);
      alias.push(`  ${name}: ${cssVal(v)};`);
    }
  L.push("/* ===== v3 aliases + component tokens (follow the theme of the element they are used on) ===== */");
  L.push(...block(":root, [data-theme], [data-brand], [data-accent], [data-style]", alias));

  L.push("/* Type roles — use on any element: <p class=\"rdl-h1\">. Display roles follow --rdl-num-weight (300 glass / 500 flat). */");
  for (const [k, s] of entries(t.type.scale)) {
    const weight = ["hero", "display-xl", "display", "numeral"].includes(k) ? "var(--rdl-num-weight)" : s.weight;
    L.push(`.rdl-${k} { font-family: var(--rdl-font-sans); font-size: ${px(s.size)}; line-height: ${px(s.line)}; font-weight: ${weight}; letter-spacing: ${s.tracking}em; }`);
  }
  L.push(".rdl-num { font-variant-numeric: tabular-nums; font-feature-settings: \"tnum\" 1; }");
  L.push(".rdl-dot { font-family: var(--rdl-font-dot); font-weight: 700; letter-spacing: 0; }");
  L.push("/* A themed region: paints its own canvas and text colour (use on <body> or any [data-theme] container). */");
  L.push(".rdl-themed, [data-theme] > body { background: var(--rdl-bg-canvas); color: var(--rdl-fg-primary); }");
  writeFileSync(join(root, "assets/tokens/tokens.css"), L.join("\n") + "\n");
}

// ---------- Tailwind preset ----------
{
  const v = (k) => `var(--rdl-${k})`;
  const colors = {};
  for (const [fam, steps] of entries(t.primitive)) {
    colors[fam] = {};
    for (const step of Object.keys(steps)) colors[fam][step] = v(`${fam}-${step}`);
  }
  for (const k of [...Object.keys(entries(t.theme.light).reduce((o, [k]) => ((o[k] = 1), o), {})), ...ACCENT_KEYS, "bg-brand", "fg-on-brand", "fg-on-brand-secondary", "brand-primary", "brand-secondary", ...Object.keys(entries(t.legacy).reduce((o, [k]) => ((o[k] = 1), o), {}))])
    if (!k.startsWith("shadow-")) colors[k] = v(k);
  const fontSize = Object.fromEntries(entries(t.type.scale).map(([k, s]) => [k, [px(s.size), { lineHeight: px(s.line), letterSpacing: `${s.tracking}em`, fontWeight: String(s.weight) }]]));
  const preset = {
    theme: {
      extend: {
        colors,
        fontFamily: { sans: [v("font-sans")], dot: [v("font-dot")], flat: [v("font-flat")], mono: [v("font-mono")] },
        fontSize,
        spacing: Object.fromEntries(entries(t.layout).map(([k, n]) => [k, px(n)])),
        borderRadius: {
          ...Object.fromEntries(entries(t.radius).map(([k, n]) => [k === "pill" ? "pill" : `rdl-${k}`, px(n)])),
          card: v("radius-card"),
          widget: v("radius-widget"),
        },
        boxShadow: { "rdl-e1": v("shadow-e1"), "rdl-e2": v("shadow-e2"), "rdl-e3": v("shadow-e3"), "rdl-e4": v("shadow-e4"), "rdl-glass": v("shadow-glass") },
        zIndex: Object.fromEntries(entries(t["z-index"]).map(([k, n]) => [`rdl-${k}`, String(n)])),
        opacity: Object.fromEntries(entries(t.state).map(([k, n]) => [`state-${k}`, String(n)])),
        screens: { "rdl-medium": px(t.breakpoint.medium), "rdl-expanded": px(t.breakpoint.expanded), "rdl-large": px(t.breakpoint.large), "rdl-xl": px(t.breakpoint["extra-large"]) },
        backgroundImage: Object.fromEntries(entries(t.aura).map(([k]) => [`aura-${k}`, v(`aura-${k}`)])),
        backdropBlur: { glass: v("glass-blur") },
        transitionTimingFunction: Object.fromEntries(entries(t.motion.easing).map(([k, e]) => [`rdl-${k}`, e])),
        transitionDuration: Object.fromEntries(entries(t.motion.duration).map(([k, d]) => [`rdl-${k}`, `${d}ms`])),
      },
    },
  };
  writeFileSync(
    join(root, "assets/tokens/tailwind.preset.js"),
    header("//") + "// Import tokens.css once globally, then: presets: [require('./tailwind.preset.js')]\n" +
      "// Themes switch with data-theme on any element; utilities like bg-bg-surface or text-fg-secondary follow it.\n" +
      "module.exports = " + JSON.stringify(preset, null, 2) + ";\n"
  );
}

// ---------- SwiftUI ----------
{
  const S = [header("//"), "import SwiftUI", "#if canImport(UIKit)", "import UIKit", "#endif", ""];
  const dict = (theme) => {
    const out = [];
    for (const [k, v] of entries(t.theme[theme])) {
      if (k.startsWith("shadow-")) continue;
      const val = typeof v === "string" && v.startsWith("$") ? v : lit(v, t.theme[theme]);
      out.push(`        "${k}": "${val}",`);
    }
    return out;
  };
  S.push("/// Theme data from tokens.json. Resolved at runtime by `RDLTheme` (RDLThemeEngine.swift).");
  S.push("public enum RDLThemeData {");
  S.push(`    public static let defaultBrand = "${t.brand.default}"`);
  S.push(`    public static let defaultAccent = "${t.accents.default}"`);
  S.push("    /// Static light roles. `$role` values point at computed roles (accent, brand panel).");
  S.push("    public static let light: [String: String] = [", ...dict("light"), "    ]");
  S.push("    public static let dark: [String: String] = [", ...dict("dark"), "    ]");
  S.push("    /// Brand presets: name → (primary, secondary).");
  S.push("    public static let brandPresets: [String: (primary: String, secondary: String)] = [");
  for (const [name, p] of brandPresets) S.push(`        "${name}": ("${p.primary}", "${p.secondary}"),`);
  S.push("    ]");
  S.push("    /// Secondary-colour presets for light and dark.");
  S.push("    public static let accentPresets: [String: String] = [");
  for (const [name, hexv] of accentPresets) S.push(`        "${name}": "${hexv}",`);
  S.push("    ]");
  S.push("    /// v3 role names → v4 roles.");
  S.push("    public static let legacy: [String: String] = [");
  for (const [k, v] of entries(t.legacy)) S.push(`        "${k}": "${v}",`);
  S.push("    ]");
  S.push("}", "");

  S.push("/// Raw palette. Prefer `RDLColor` semantic roles in UI code.");
  S.push("public enum RDLPalette {");
  for (const [fam, steps] of entries(t.primitive))
    for (const [step, hexv] of entries(steps)) S.push(`    public static let ${camel(fam)}${step} = RDLTheme.fixed("${hexv}")`);
  S.push("}", "");

  const roleKeys = [...staticKeys.filter((k) => !k.startsWith("shadow-")), ...ACCENT_KEYS, "bg-brand", "fg-on-brand", "fg-on-brand-secondary"];
  S.push("/// Semantic roles. Each resolves for the active theme (light, dark, system or brand) — see `RDLTheme.apply`.");
  S.push("public enum RDLColor {");
  for (const k of roleKeys) S.push(`    public static let ${camel(k)} = RDLTheme.color("${k}")`);
  S.push("    // v3 names (aliases)");
  for (const [k, v] of entries(t.legacy)) S.push(`    public static let ${camel(k)} = RDLTheme.color("${v}")`);
  S.push("}", "");

  S.push("/// Accent (secondary colour). `.theme` follows `RDLTheme`; named presets override it for a subtree via `.rdlAccent(.volt)`.");
  S.push("public struct RDLAccent {");
  S.push("    public let accent: Color, accentStrong: Color, accentSoft: Color, onAccent: Color, accentText: Color, accentGraphic: Color");
  S.push("    public init(secondary: String?) {");
  S.push('        accent = RDLTheme.color("accent", secondary: secondary)');
  S.push('        accentStrong = RDLTheme.color("accent-hover", secondary: secondary)');
  S.push('        accentSoft = RDLTheme.color("accent-subtle", secondary: secondary)');
  S.push('        onAccent = RDLTheme.color("on-accent", secondary: secondary)');
  S.push('        accentText = RDLTheme.color("accent-text", secondary: secondary)');
  S.push('        accentGraphic = RDLTheme.color("accent-graphic", secondary: secondary)');
  S.push("    }");
  S.push("    public static let theme = RDLAccent(secondary: nil)");
  for (const [name, hexv] of accentPresets) S.push(`    public static let ${name} = RDLAccent(secondary: "${hexv}")`);
  S.push("}", "");
  S.push("private struct RDLAccentKey: EnvironmentKey { static let defaultValue = RDLAccent.theme }");
  S.push("public extension EnvironmentValues {");
  S.push("    var rdlAccent: RDLAccent { get { self[RDLAccentKey.self] } set { self[RDLAccentKey.self] = newValue } }");
  S.push("}");
  S.push("public extension View {");
  S.push("    func rdlAccent(_ accent: RDLAccent) -> some View { environment(\\.rdlAccent, accent) }");
  S.push("}", "");

  S.push("// MARK: - Aura gradients", "");
  S.push("public enum RDLAura {");
  for (const [k, a] of entries(t.aura)) {
    const stops = a.stops.map(([c, p]) => `.init(color: RDLTheme.fixed("${c}"), location: ${p})`).join(", ");
    if (a.type === "radial") {
      const [x, y] = a.at.split(" ").map((s) => parseFloat(s) / 100);
      S.push(`    public static let ${k} = RadialGradient(stops: [${stops}], center: UnitPoint(x: ${x}, y: ${y}), startRadius: 0, endRadius: 520)`);
    } else {
      const r = (a.angle * Math.PI) / 180;
      const f = (n) => +n.toFixed(3);
      S.push(`    public static let ${k} = LinearGradient(stops: [${stops}], startPoint: UnitPoint(x: ${f(0.5 - Math.sin(r) / 2)}, y: ${f(0.5 + Math.cos(r) / 2)}), endPoint: UnitPoint(x: ${f(0.5 + Math.sin(r) / 2)}, y: ${f(0.5 - Math.cos(r) / 2)}))`);
    }
  }
  S.push("}", "");

  S.push("// MARK: - Type", "");
  S.push("/// Set `RDLFont.family` to a bundled font name (e.g. \"Urbanist\") to match the web; nil uses the system font.");
  S.push("public enum RDLFont {");
  S.push("    public static var family: String? = \"Urbanist\"");
  S.push("}");
  S.push("public struct RDLTextStyle {");
  S.push("    public let size: CGFloat, lineHeight: CGFloat, weight: Font.Weight, tracking: CGFloat, relativeTo: Font.TextStyle");
  S.push("    /// Scales with Dynamic Type relative to the matching iOS text style.");
  S.push("    public var font: Font {");
  S.push("        #if canImport(UIKit)");
  S.push("        if let family = RDLFont.family, UIFont(name: family, size: size) != nil {");
  S.push("            return .custom(family, size: size, relativeTo: relativeTo).weight(weight)");
  S.push("        }");
  S.push("        #endif");
  S.push("        return .system(size: size, weight: weight, design: .default)");
  S.push("    }");
  S.push("}");
  const w = { 300: ".light", 400: ".regular", 500: ".medium", 600: ".semibold", 700: ".bold" };
  const rel = { hero: ".largeTitle", "display-xl": ".largeTitle", display: ".largeTitle", numeral: ".largeTitle", h1: ".largeTitle", h2: ".title", h3: ".title3", title: ".headline", body: ".subheadline", "body-strong": ".subheadline", label: ".subheadline", meta: ".footnote", caption: ".caption", micro: ".caption2" };
  S.push("public enum RDLType {");
  for (const [k, s] of entries(t.type.scale))
    S.push(`    public static let ${camel(k)} = RDLTextStyle(size: ${s.size}, lineHeight: ${s.line}, weight: ${w[s.weight]}, tracking: ${+(s.tracking * s.size).toFixed(2)}, relativeTo: ${rel[k] ?? ".body"})`);
  S.push(`    /// Units next to numbers render at this fraction of the number size.`);
  S.push(`    public static let unitScale: CGFloat = ${t.type.numerals["unit-scale"]}`);
  S.push("}");
  S.push("public extension View {");
  S.push("    /// Applies an RDL type role: size, weight, tracking and line height.");
  S.push("    func rdlType(_ style: RDLTextStyle) -> some View {");
  S.push("        font(style.font)");
  S.push("            .tracking(style.tracking)");
  S.push("            .lineSpacing(max(0, style.lineHeight - style.size * 1.2))");
  S.push("    }");
  S.push("}", "");

  S.push("// MARK: - Space, radius, size, state, glass, motion", "");
  S.push("public enum RDLSpace {");
  for (const [k, n] of entries(t.space)) S.push(`    public static let s${String(k).replace(".", "_")}: CGFloat = ${n}`);
  for (const [k, n] of entries(t.layout)) S.push(`    public static let ${camel(k)}: CGFloat = ${n}`);
  S.push("}");
  S.push("public enum RDLRadius {");
  const swiftRadius = { "2xl": "xxl", "3xl": "xxxl" };
  for (const [k, n] of entries(t.radius)) S.push(`    public static let ${swiftRadius[k] ?? camel(k)}: CGFloat = ${n}`);
  S.push(`    public static let card: CGFloat = ${t.radius.xl}`);
  S.push(`    public static let widget: CGFloat = ${t.radius["3xl"]}`);
  S.push("}");
  S.push("public enum RDLSize {");
  for (const [k, n] of entries(t.size)) S.push(`    public static let ${camel(k)}: CGFloat = ${n}`);
  S.push("}");
  S.push("/// Material 3 state layers (opacity of the on-colour over the container).");
  S.push("public enum RDLState {");
  for (const [k, n] of entries(t.state)) S.push(`    public static let ${camel(k)}: Double = ${n}`);
  S.push("}");
  S.push("public enum RDLGlass {");
  S.push(`    public static let blur: CGFloat = ${t.glass.blur}`);
  S.push("}");
  S.push("public enum RDLMotion {");
  for (const [k, n] of entries(t.motion.duration)) S.push(`    public static let ${k}: Double = ${n / 1000}`);
  S.push(`    public static let spring = Animation.spring(response: ${t.motion.spring.response}, dampingFraction: ${t.motion.spring.damping})`);
  S.push(`    public static let standard = Animation.timingCurve(0.2, 0, 0, 1, duration: ${t.motion.duration.base / 1000})`);
  S.push(`    public static let emphasizedDecelerate = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: ${t.motion.duration.slow / 1000})`);
  S.push(`    public static let stagger: Double = ${t.motion.stagger / 1000}`);
  S.push("}");
  writeFileSync(join(root, "assets/ios/RDLTokens.swift"), S.join("\n") + "\n");
}

console.log("Built tokens.css, tailwind.preset.js, contrast-report.md, references/tokens.md, RDLTokens.swift");
```

## Appendix D · `assets/tokens/tailwind.preset.js`

Generated Tailwind preset wired to the CSS variables.

```js
// GENERATED by scripts/build_tokens.mjs from tokens.json — do not edit by hand.
// Import tokens.css once globally, then: presets: [require('./tailwind.preset.js')]
// Themes switch with data-theme on any element; utilities like bg-bg-surface or text-fg-secondary follow it.
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "neutral-light": {
          "1": "var(--rdl-neutral-light-1)",
          "2": "var(--rdl-neutral-light-2)",
          "3": "var(--rdl-neutral-light-3)",
          "4": "var(--rdl-neutral-light-4)",
          "5": "var(--rdl-neutral-light-5)",
          "6": "var(--rdl-neutral-light-6)",
          "7": "var(--rdl-neutral-light-7)",
          "8": "var(--rdl-neutral-light-8)",
          "9": "var(--rdl-neutral-light-9)",
          "10": "var(--rdl-neutral-light-10)",
          "11": "var(--rdl-neutral-light-11)",
          "12": "var(--rdl-neutral-light-12)"
        },
        "neutral-dark": {
          "1": "var(--rdl-neutral-dark-1)",
          "2": "var(--rdl-neutral-dark-2)",
          "3": "var(--rdl-neutral-dark-3)",
          "4": "var(--rdl-neutral-dark-4)",
          "5": "var(--rdl-neutral-dark-5)",
          "6": "var(--rdl-neutral-dark-6)",
          "7": "var(--rdl-neutral-dark-7)",
          "8": "var(--rdl-neutral-dark-8)",
          "9": "var(--rdl-neutral-dark-9)",
          "10": "var(--rdl-neutral-dark-10)",
          "11": "var(--rdl-neutral-dark-11)",
          "12": "var(--rdl-neutral-dark-12)"
        },
        "ink": {
          "600": "var(--rdl-ink-600)",
          "700": "var(--rdl-ink-700)",
          "800": "var(--rdl-ink-800)",
          "900": "var(--rdl-ink-900)",
          "950": "var(--rdl-ink-950)"
        },
        "gray": {
          "0": "var(--rdl-gray-0)",
          "50": "var(--rdl-gray-50)",
          "100": "var(--rdl-gray-100)",
          "150": "var(--rdl-gray-150)",
          "200": "var(--rdl-gray-200)",
          "300": "var(--rdl-gray-300)",
          "400": "var(--rdl-gray-400)",
          "500": "var(--rdl-gray-500)",
          "600": "var(--rdl-gray-600)"
        },
        "lime": {
          "50": "var(--rdl-lime-50)",
          "100": "var(--rdl-lime-100)",
          "200": "var(--rdl-lime-200)",
          "300": "var(--rdl-lime-300)",
          "400": "var(--rdl-lime-400)",
          "500": "var(--rdl-lime-500)",
          "600": "var(--rdl-lime-600)",
          "700": "var(--rdl-lime-700)"
        },
        "violet": {
          "50": "var(--rdl-violet-50)",
          "100": "var(--rdl-violet-100)",
          "200": "var(--rdl-violet-200)",
          "300": "var(--rdl-violet-300)",
          "400": "var(--rdl-violet-400)",
          "500": "var(--rdl-violet-500)",
          "600": "var(--rdl-violet-600)",
          "700": "var(--rdl-violet-700)"
        },
        "orange": {
          "50": "var(--rdl-orange-50)",
          "100": "var(--rdl-orange-100)",
          "200": "var(--rdl-orange-200)",
          "300": "var(--rdl-orange-300)",
          "400": "var(--rdl-orange-400)",
          "500": "var(--rdl-orange-500)",
          "600": "var(--rdl-orange-600)",
          "700": "var(--rdl-orange-700)"
        },
        "blue": {
          "50": "var(--rdl-blue-50)",
          "100": "var(--rdl-blue-100)",
          "200": "var(--rdl-blue-200)",
          "300": "var(--rdl-blue-300)",
          "400": "var(--rdl-blue-400)",
          "500": "var(--rdl-blue-500)",
          "600": "var(--rdl-blue-600)",
          "700": "var(--rdl-blue-700)"
        },
        "gold": {
          "50": "var(--rdl-gold-50)",
          "100": "var(--rdl-gold-100)",
          "200": "var(--rdl-gold-200)",
          "300": "var(--rdl-gold-300)",
          "400": "var(--rdl-gold-400)",
          "500": "var(--rdl-gold-500)",
          "600": "var(--rdl-gold-600)",
          "700": "var(--rdl-gold-700)"
        },
        "mint": {
          "50": "var(--rdl-mint-50)",
          "100": "var(--rdl-mint-100)",
          "300": "var(--rdl-mint-300)",
          "500": "var(--rdl-mint-500)",
          "600": "var(--rdl-mint-600)",
          "700": "var(--rdl-mint-700)"
        },
        "red": {
          "50": "var(--rdl-red-50)",
          "100": "var(--rdl-red-100)",
          "300": "var(--rdl-red-300)",
          "500": "var(--rdl-red-500)",
          "600": "var(--rdl-red-600)"
        },
        "amber": {
          "50": "var(--rdl-amber-50)",
          "100": "var(--rdl-amber-100)",
          "300": "var(--rdl-amber-300)",
          "500": "var(--rdl-amber-500)",
          "600": "var(--rdl-amber-600)",
          "700": "var(--rdl-amber-700)"
        },
        "volt": {
          "50": "var(--rdl-volt-50)",
          "100": "var(--rdl-volt-100)",
          "200": "var(--rdl-volt-200)",
          "300": "var(--rdl-volt-300)",
          "400": "var(--rdl-volt-400)",
          "500": "var(--rdl-volt-500)",
          "600": "var(--rdl-volt-600)",
          "700": "var(--rdl-volt-700)"
        },
        "signal": {
          "50": "var(--rdl-signal-50)",
          "100": "var(--rdl-signal-100)",
          "300": "var(--rdl-signal-300)",
          "400": "var(--rdl-signal-400)",
          "500": "var(--rdl-signal-500)",
          "600": "var(--rdl-signal-600)",
          "700": "var(--rdl-signal-700)"
        },
        "electric": {
          "50": "var(--rdl-electric-50)",
          "100": "var(--rdl-electric-100)",
          "300": "var(--rdl-electric-300)",
          "400": "var(--rdl-electric-400)",
          "500": "var(--rdl-electric-500)",
          "600": "var(--rdl-electric-600)",
          "700": "var(--rdl-electric-700)"
        },
        "ember": {
          "50": "var(--rdl-ember-50)",
          "100": "var(--rdl-ember-100)",
          "300": "var(--rdl-ember-300)",
          "400": "var(--rdl-ember-400)",
          "500": "var(--rdl-ember-500)",
          "600": "var(--rdl-ember-600)",
          "700": "var(--rdl-ember-700)"
        },
        "orchid": {
          "50": "var(--rdl-orchid-50)",
          "100": "var(--rdl-orchid-100)",
          "300": "var(--rdl-orchid-300)",
          "400": "var(--rdl-orchid-400)",
          "500": "var(--rdl-orchid-500)",
          "600": "var(--rdl-orchid-600)",
          "700": "var(--rdl-orchid-700)"
        },
        "stone": {
          "0": "var(--rdl-stone-0)",
          "50": "var(--rdl-stone-50)",
          "100": "var(--rdl-stone-100)",
          "150": "var(--rdl-stone-150)",
          "200": "var(--rdl-stone-200)",
          "300": "var(--rdl-stone-300)",
          "400": "var(--rdl-stone-400)",
          "500": "var(--rdl-stone-500)",
          "550": "var(--rdl-stone-550)",
          "600": "var(--rdl-stone-600)",
          "700": "var(--rdl-stone-700)",
          "800": "var(--rdl-stone-800)",
          "900": "var(--rdl-stone-900)",
          "950": "var(--rdl-stone-950)"
        },
        "rose": {
          "50": "var(--rdl-rose-50)",
          "100": "var(--rdl-rose-100)",
          "300": "var(--rdl-rose-300)",
          "500": "var(--rdl-rose-500)",
          "600": "var(--rdl-rose-600)",
          "700": "var(--rdl-rose-700)"
        },
        "bg-canvas": "var(--rdl-bg-canvas)",
        "bg-canvas-elevated": "var(--rdl-bg-canvas-elevated)",
        "bg-surface": "var(--rdl-bg-surface)",
        "bg-surface-raised": "var(--rdl-bg-surface-raised)",
        "bg-surface-sunken": "var(--rdl-bg-surface-sunken)",
        "bg-emphasis": "var(--rdl-bg-emphasis)",
        "bg-emphasis-raised": "var(--rdl-bg-emphasis-raised)",
        "bg-scrim": "var(--rdl-bg-scrim)",
        "fill-control": "var(--rdl-fill-control)",
        "fill-control-hover": "var(--rdl-fill-control-hover)",
        "fill-control-pressed": "var(--rdl-fill-control-pressed)",
        "fill-disabled": "var(--rdl-fill-disabled)",
        "fg-primary": "var(--rdl-fg-primary)",
        "fg-secondary": "var(--rdl-fg-secondary)",
        "fg-tertiary": "var(--rdl-fg-tertiary)",
        "fg-disabled": "var(--rdl-fg-disabled)",
        "fg-on-emphasis": "var(--rdl-fg-on-emphasis)",
        "fg-on-emphasis-secondary": "var(--rdl-fg-on-emphasis-secondary)",
        "border-subtle": "var(--rdl-border-subtle)",
        "border-default": "var(--rdl-border-default)",
        "border-strong": "var(--rdl-border-strong)",
        "border-focus": "var(--rdl-border-focus)",
        "action-primary": "var(--rdl-action-primary)",
        "action-primary-hover": "var(--rdl-action-primary-hover)",
        "action-primary-pressed": "var(--rdl-action-primary-pressed)",
        "on-action-primary": "var(--rdl-on-action-primary)",
        "action-secondary": "var(--rdl-action-secondary)",
        "action-secondary-hover": "var(--rdl-action-secondary-hover)",
        "action-secondary-pressed": "var(--rdl-action-secondary-pressed)",
        "on-action-secondary": "var(--rdl-on-action-secondary)",
        "success": "var(--rdl-success)",
        "success-subtle": "var(--rdl-success-subtle)",
        "success-text": "var(--rdl-success-text)",
        "warning": "var(--rdl-warning)",
        "warning-subtle": "var(--rdl-warning-subtle)",
        "warning-text": "var(--rdl-warning-text)",
        "danger": "var(--rdl-danger)",
        "danger-subtle": "var(--rdl-danger-subtle)",
        "danger-text": "var(--rdl-danger-text)",
        "info": "var(--rdl-info)",
        "info-subtle": "var(--rdl-info-subtle)",
        "info-text": "var(--rdl-info-text)",
        "material-ultrathin": "var(--rdl-material-ultrathin)",
        "material-thin": "var(--rdl-material-thin)",
        "material-regular": "var(--rdl-material-regular)",
        "material-thick": "var(--rdl-material-thick)",
        "material-border": "var(--rdl-material-border)",
        "material-highlight": "var(--rdl-material-highlight)",
        "material-shade": "var(--rdl-material-shade)",
        "material-dark": "var(--rdl-material-dark)",
        "material-dark-border": "var(--rdl-material-dark-border)",
        "chart-track": "var(--rdl-chart-track)",
        "chart-grid": "var(--rdl-chart-grid)",
        "chart-muted": "var(--rdl-chart-muted)",
        "chart-hatch": "var(--rdl-chart-hatch)",
        "tick": "var(--rdl-tick)",
        "tick-strong": "var(--rdl-tick-strong)",
        "accent": "var(--rdl-accent)",
        "accent-hover": "var(--rdl-accent-hover)",
        "accent-pressed": "var(--rdl-accent-pressed)",
        "accent-subtle": "var(--rdl-accent-subtle)",
        "accent-text": "var(--rdl-accent-text)",
        "accent-graphic": "var(--rdl-accent-graphic)",
        "on-accent": "var(--rdl-on-accent)",
        "bg-brand": "var(--rdl-bg-brand)",
        "fg-on-brand": "var(--rdl-fg-on-brand)",
        "fg-on-brand-secondary": "var(--rdl-fg-on-brand-secondary)",
        "brand-primary": "var(--rdl-brand-primary)",
        "brand-secondary": "var(--rdl-brand-secondary)",
        "bg-surface-muted": "var(--rdl-bg-surface-muted)",
        "bg-hero": "var(--rdl-bg-hero)",
        "bg-hero-raised": "var(--rdl-bg-hero-raised)",
        "scrim": "var(--rdl-scrim)",
        "fill-control-strong": "var(--rdl-fill-control-strong)",
        "text-primary": "var(--rdl-text-primary)",
        "text-secondary": "var(--rdl-text-secondary)",
        "text-tertiary": "var(--rdl-text-tertiary)",
        "text-on-hero": "var(--rdl-text-on-hero)",
        "text-on-hero-muted": "var(--rdl-text-on-hero-muted)",
        "text-on-strong": "var(--rdl-text-on-strong)",
        "success-soft": "var(--rdl-success-soft)",
        "danger-soft": "var(--rdl-danger-soft)",
        "warning-soft": "var(--rdl-warning-soft)",
        "info-soft": "var(--rdl-info-soft)",
        "glass-fill": "var(--rdl-glass-fill)",
        "glass-fill-strong": "var(--rdl-glass-fill-strong)",
        "glass-border": "var(--rdl-glass-border)",
        "glass-shade": "var(--rdl-glass-shade)",
        "glass-text": "var(--rdl-glass-text)",
        "glass-text-muted": "var(--rdl-glass-text-muted)",
        "glass-dark-fill": "var(--rdl-glass-dark-fill)",
        "glass-dark-border": "var(--rdl-glass-dark-border)",
        "accent-strong": "var(--rdl-accent-strong)",
        "accent-soft": "var(--rdl-accent-soft)"
      },
      "fontFamily": {
        "sans": [
          "var(--rdl-font-sans)"
        ],
        "dot": [
          "var(--rdl-font-dot)"
        ],
        "flat": [
          "var(--rdl-font-flat)"
        ],
        "mono": [
          "var(--rdl-font-mono)"
        ]
      },
      "fontSize": {
        "hero": [
          "96px",
          {
            "lineHeight": "92px",
            "letterSpacing": "-0.04em",
            "fontWeight": "300"
          }
        ],
        "display-xl": [
          "72px",
          {
            "lineHeight": "72px",
            "letterSpacing": "-0.035em",
            "fontWeight": "300"
          }
        ],
        "display": [
          "56px",
          {
            "lineHeight": "58px",
            "letterSpacing": "-0.03em",
            "fontWeight": "300"
          }
        ],
        "numeral": [
          "40px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.02em",
            "fontWeight": "300"
          }
        ],
        "h1": [
          "34px",
          {
            "lineHeight": "38px",
            "letterSpacing": "-0.02em",
            "fontWeight": "400"
          }
        ],
        "h2": [
          "26px",
          {
            "lineHeight": "30px",
            "letterSpacing": "-0.015em",
            "fontWeight": "400"
          }
        ],
        "h3": [
          "20px",
          {
            "lineHeight": "24px",
            "letterSpacing": "-0.01em",
            "fontWeight": "500"
          }
        ],
        "title": [
          "17px",
          {
            "lineHeight": "22px",
            "letterSpacing": "-0.005em",
            "fontWeight": "500"
          }
        ],
        "body": [
          "15px",
          {
            "lineHeight": "22px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ],
        "body-strong": [
          "15px",
          {
            "lineHeight": "22px",
            "letterSpacing": "0em",
            "fontWeight": "600"
          }
        ],
        "label": [
          "14px",
          {
            "lineHeight": "18px",
            "letterSpacing": "0em",
            "fontWeight": "500"
          }
        ],
        "meta": [
          "13px",
          {
            "lineHeight": "18px",
            "letterSpacing": "0em",
            "fontWeight": "500"
          }
        ],
        "caption": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.005em",
            "fontWeight": "400"
          }
        ],
        "micro": [
          "11px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.04em",
            "fontWeight": "500"
          }
        ]
      },
      "spacing": {
        "mobile-gutter": "20px",
        "card-padding": "20px",
        "card-padding-sm": "16px",
        "card-gap": "12px",
        "section-gap": "32px",
        "stack-tight": "4px",
        "stack": "8px",
        "stack-loose": "16px",
        "header-height": "48px",
        "header-top": "8px",
        "title-gap": "24px",
        "bottom-zone": "120px",
        "pin-bottom": "34px",
        "web-sidebar": "248px",
        "web-gutter": "32px",
        "web-grid-gap": "16px",
        "web-bento-gap": "12px",
        "web-header-height": "64px"
      },
      "borderRadius": {
        "rdl-xs": "6px",
        "rdl-sm": "8px",
        "rdl-md": "12px",
        "rdl-tile": "14px",
        "rdl-base": "16px",
        "rdl-lg": "20px",
        "rdl-panel": "24px",
        "rdl-xl": "28px",
        "rdl-2xl": "32px",
        "rdl-3xl": "40px",
        "rdl-sheet": "48px",
        "pill": "999px",
        "card": "var(--rdl-radius-card)",
        "widget": "var(--rdl-radius-widget)"
      },
      "boxShadow": {
        "rdl-e1": "var(--rdl-shadow-e1)",
        "rdl-e2": "var(--rdl-shadow-e2)",
        "rdl-e3": "var(--rdl-shadow-e3)",
        "rdl-e4": "var(--rdl-shadow-e4)",
        "rdl-glass": "var(--rdl-shadow-glass)"
      },
      "zIndex": {
        "rdl-base": "0",
        "rdl-raised": "1",
        "rdl-sticky": "100",
        "rdl-dock": "200",
        "rdl-dropdown": "300",
        "rdl-overlay": "400",
        "rdl-sheet": "500",
        "rdl-modal": "600",
        "rdl-toast": "700",
        "rdl-tooltip": "800"
      },
      "opacity": {
        "state-hover": "0.08",
        "state-focus": "0.12",
        "state-pressed": "0.12",
        "state-dragged": "0.16",
        "state-disabled-content": "0.38",
        "state-disabled-container": "0.12"
      },
      "screens": {
        "rdl-medium": "600px",
        "rdl-expanded": "840px",
        "rdl-large": "1200px",
        "rdl-xl": "1600px"
      },
      "backgroundImage": {
        "aura-gold": "var(--rdl-aura-gold)",
        "aura-sunset": "var(--rdl-aura-sunset)",
        "aura-meadow": "var(--rdl-aura-meadow)",
        "aura-dusk": "var(--rdl-aura-dusk)",
        "aura-orchid": "var(--rdl-aura-orchid)",
        "aura-ocean": "var(--rdl-aura-ocean)",
        "aura-ember": "var(--rdl-aura-ember)",
        "aura-fog": "var(--rdl-aura-fog)",
        "aura-rose": "var(--rdl-aura-rose)"
      },
      "backdropBlur": {
        "glass": "var(--rdl-glass-blur)"
      },
      "transitionTimingFunction": {
        "rdl-standard": "cubic-bezier(0.2, 0, 0, 1)",
        "rdl-standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
        "rdl-standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
        "rdl-emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1)",
        "rdl-emphasized-accelerate": "cubic-bezier(0.3, 0, 0.8, 0.15)",
        "rdl-emphasized": "cubic-bezier(0.3, 0, 0, 1.15)",
        "rdl-exit": "cubic-bezier(0.4, 0, 1, 1)"
      },
      "transitionDuration": {
        "rdl-instant": "50ms",
        "rdl-fast": "120ms",
        "rdl-base": "200ms",
        "rdl-slow": "320ms",
        "rdl-chart": "600ms"
      }
    }
  }
};
```

## Appendix E · `assets/ios/RDLTokens.swift`

Generated SwiftUI tokens.

```swift
// GENERATED by scripts/build_tokens.mjs from tokens.json — do not edit by hand.

import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

/// Theme data from tokens.json. Resolved at runtime by `RDLTheme` (RDLThemeEngine.swift).
public enum RDLThemeData {
    public static let defaultBrand = "cobalt"
    public static let defaultAccent = "volt"
    /// Static light roles. `$role` values point at computed roles (accent, brand panel).
    public static let light: [String: String] = [
        "bg-canvas": "#F0F0EF",
        "bg-canvas-elevated": "#F7F7F6",
        "bg-surface": "#FFFFFF",
        "bg-surface-raised": "#FFFFFF",
        "bg-surface-sunken": "#F7F7F6",
        "bg-emphasis": "#151515",
        "bg-emphasis-raised": "#2A2A2A",
        "bg-scrim": "rgba(10,11,12,0.48)",
        "fill-control": "#E8E8E7",
        "fill-control-hover": "#E1E1E0",
        "fill-control-pressed": "#D9D9D8",
        "fill-disabled": "rgba(21,21,21,0.12)",
        "fg-primary": "#151515",
        "fg-secondary": "#5E5E5D",
        "fg-tertiary": "#7A7A79",
        "fg-disabled": "rgba(21,21,21,0.38)",
        "fg-on-emphasis": "#F2F2F3",
        "fg-on-emphasis-secondary": "#A3A3A3",
        "border-subtle": "#E8E8E7",
        "border-default": "#D9D9D8",
        "border-strong": "#BBBBBA",
        "border-focus": "$accent-graphic",
        "action-primary": "#151515",
        "action-primary-hover": "#282828",
        "action-primary-pressed": "#313131",
        "on-action-primary": "#FFFFFF",
        "action-secondary": "#E8E8E7",
        "action-secondary-hover": "#E1E1E0",
        "action-secondary-pressed": "#D9D9D8",
        "on-action-secondary": "#151515",
        "success": "#1FB877",
        "success-subtle": "#E4F6EF",
        "success-text": "#0E7048",
        "warning": "#F5A70B",
        "warning-subtle": "#FEF4E2",
        "warning-text": "#8A5B00",
        "danger": "#F0453E",
        "danger-subtle": "#FDE9E8",
        "danger-text": "#C2241E",
        "info": "#2F66F6",
        "info-subtle": "#E6EDFE",
        "info-text": "#1F4FD1",
        "material-ultrathin": "rgba(255,255,255,0.24)",
        "material-thin": "rgba(255,255,255,0.4)",
        "material-regular": "rgba(255,255,255,0.56)",
        "material-thick": "rgba(255,255,255,0.78)",
        "material-border": "rgba(255,255,255,0.72)",
        "material-highlight": "rgba(255,255,255,0.9)",
        "material-shade": "rgba(20,20,24,0.06)",
        "material-dark": "rgba(22,23,26,0.52)",
        "material-dark-border": "rgba(255,255,255,0.10)",
        "chart-track": "#E8E8E7",
        "chart-grid": "#E8E8E7",
        "chart-muted": "#D9D9D8",
        "chart-hatch": "#CECECD",
        "tick": "rgba(21,21,21,0.28)",
        "tick-strong": "#151515",
    ]
    public static let dark: [String: String] = [
        "bg-canvas": "#0A0B0C",
        "bg-canvas-elevated": "#111214",
        "bg-surface": "#17181A",
        "bg-surface-raised": "#1E1F22",
        "bg-surface-sunken": "#111214",
        "bg-emphasis": "#26272B",
        "bg-emphasis-raised": "#34353A",
        "bg-scrim": "rgba(0,0,0,0.64)",
        "fill-control": "#25262A",
        "fill-control-hover": "#2D2E33",
        "fill-control-pressed": "#393A40",
        "fill-disabled": "rgba(242,242,243,0.12)",
        "fg-primary": "#F2F2F3",
        "fg-secondary": "#A9AAB0",
        "fg-tertiary": "#7C7D84",
        "fg-disabled": "rgba(242,242,243,0.38)",
        "fg-on-emphasis": "#F2F2F3",
        "fg-on-emphasis-secondary": "#A9AAB0",
        "border-subtle": "#25262A",
        "border-default": "#2D2E33",
        "border-strong": "#4A4B52",
        "border-focus": "$accent-graphic",
        "action-primary": "#F2F2F3",
        "action-primary-hover": "#DFE0E1",
        "action-primary-pressed": "#D6D6D7",
        "on-action-primary": "#0A0B0C",
        "action-secondary": "#25262A",
        "action-secondary-hover": "#2D2E33",
        "action-secondary-pressed": "#393A40",
        "on-action-secondary": "#F2F2F3",
        "success": "#4BD394",
        "success-subtle": "#1F362E",
        "success-text": "#7CE0B3",
        "warning": "#FFC23D",
        "warning-subtle": "#3C3320",
        "warning-text": "#FFD266",
        "danger": "#FF6B64",
        "danger-subtle": "#3C2526",
        "danger-text": "#FF9A9A",
        "info": "#6E95FF",
        "info-subtle": "#252C3F",
        "info-text": "#9DB8FF",
        "material-ultrathin": "rgba(28,30,33,0.32)",
        "material-thin": "rgba(28,30,33,0.44)",
        "material-regular": "rgba(28,30,33,0.52)",
        "material-thick": "rgba(36,38,42,0.72)",
        "material-border": "rgba(255,255,255,0.10)",
        "material-highlight": "rgba(255,255,255,0.08)",
        "material-shade": "rgba(0,0,0,0.30)",
        "material-dark": "rgba(22,23,26,0.52)",
        "material-dark-border": "rgba(255,255,255,0.10)",
        "chart-track": "#1E1F22",
        "chart-grid": "#25262A",
        "chart-muted": "#2D2E33",
        "chart-hatch": "#4A4B52",
        "tick": "rgba(242,242,243,0.30)",
        "tick-strong": "#F2F2F3",
    ]
    /// Brand presets: name → (primary, secondary).
    public static let brandPresets: [String: (primary: String, secondary: String)] = [
        "cobalt": ("#0732D8", "#F2D33C"),
        "mustard": ("#ECBB42", "#2A4BDC"),
        "gold": ("#D9A632", "#1F4A3E"),
        "olive": ("#687B59", "#D7F23A"),
        "forest": ("#1F4A3E", "#D7F23A"),
        "lavender": ("#AD80D4", "#F27A3A"),
        "plum": ("#2F1125", "#F2D33C"),
        "vermilion": ("#D44C27", "#D7F23A"),
        "dusk": ("#7599AD", "#F6E27A"),
    ]
    /// Secondary-colour presets for light and dark.
    public static let accentPresets: [String: String] = [
        "volt": "#DFFA32",
        "lime": "#CBEF43",
        "gold": "#ECBC44",
        "signal": "#4BE06E",
        "electric": "#0832D8",
        "ember": "#FC5A10",
        "orchid": "#C16CF7",
        "violet": "#7152F5",
        "orange": "#F55F24",
        "ocean": "#2F66F6",
        "rose": "#F0548A",
    ]
    /// v3 role names → v4 roles.
    public static let legacy: [String: String] = [
        "bg-surface-muted": "bg-surface-sunken",
        "bg-hero": "bg-emphasis",
        "bg-hero-raised": "bg-emphasis-raised",
        "scrim": "bg-scrim",
        "fill-control-strong": "action-primary",
        "text-primary": "fg-primary",
        "text-secondary": "fg-secondary",
        "text-tertiary": "fg-tertiary",
        "text-on-hero": "fg-on-emphasis",
        "text-on-hero-muted": "fg-on-emphasis-secondary",
        "text-on-strong": "on-action-primary",
        "success-soft": "success-subtle",
        "danger-soft": "danger-subtle",
        "warning-soft": "warning-subtle",
        "info-soft": "info-subtle",
        "glass-fill": "material-regular",
        "glass-fill-strong": "material-thick",
        "glass-border": "material-border",
        "glass-shade": "material-shade",
        "glass-text": "fg-primary",
        "glass-text-muted": "fg-secondary",
        "glass-dark-fill": "material-dark",
        "glass-dark-border": "material-dark-border",
        "accent-strong": "accent-hover",
        "accent-soft": "accent-subtle",
    ]
}

/// Raw palette. Prefer `RDLColor` semantic roles in UI code.
public enum RDLPalette {
    public static let neutralLight1 = RDLTheme.fixed("#FCFCFC")
    public static let neutralLight2 = RDLTheme.fixed("#F7F7F6")
    public static let neutralLight3 = RDLTheme.fixed("#F0F0EF")
    public static let neutralLight4 = RDLTheme.fixed("#E8E8E7")
    public static let neutralLight5 = RDLTheme.fixed("#E1E1E0")
    public static let neutralLight6 = RDLTheme.fixed("#D9D9D8")
    public static let neutralLight7 = RDLTheme.fixed("#CECECD")
    public static let neutralLight8 = RDLTheme.fixed("#BBBBBA")
    public static let neutralLight9 = RDLTheme.fixed("#8D8D8C")
    public static let neutralLight10 = RDLTheme.fixed("#7A7A79")
    public static let neutralLight11 = RDLTheme.fixed("#5E5E5D")
    public static let neutralLight12 = RDLTheme.fixed("#151515")
    public static let neutralDark1 = RDLTheme.fixed("#0A0B0C")
    public static let neutralDark2 = RDLTheme.fixed("#111214")
    public static let neutralDark3 = RDLTheme.fixed("#17181A")
    public static let neutralDark4 = RDLTheme.fixed("#1E1F22")
    public static let neutralDark5 = RDLTheme.fixed("#25262A")
    public static let neutralDark6 = RDLTheme.fixed("#2D2E33")
    public static let neutralDark7 = RDLTheme.fixed("#393A40")
    public static let neutralDark8 = RDLTheme.fixed("#4A4B52")
    public static let neutralDark9 = RDLTheme.fixed("#6E6F76")
    public static let neutralDark10 = RDLTheme.fixed("#7C7D84")
    public static let neutralDark11 = RDLTheme.fixed("#A9AAB0")
    public static let neutralDark12 = RDLTheme.fixed("#F2F2F3")
    public static let ink600 = RDLTheme.fixed("#34343A")
    public static let ink700 = RDLTheme.fixed("#26262B")
    public static let ink800 = RDLTheme.fixed("#1C1C20")
    public static let ink900 = RDLTheme.fixed("#141417")
    public static let ink950 = RDLTheme.fixed("#0B0B0D")
    public static let gray0 = RDLTheme.fixed("#FFFFFF")
    public static let gray50 = RDLTheme.fixed("#F8F8FA")
    public static let gray100 = RDLTheme.fixed("#F3F3F5")
    public static let gray150 = RDLTheme.fixed("#EBEBEF")
    public static let gray200 = RDLTheme.fixed("#E2E2E7")
    public static let gray300 = RDLTheme.fixed("#C8C8CF")
    public static let gray400 = RDLTheme.fixed("#9A9AA3")
    public static let gray500 = RDLTheme.fixed("#6E6E78")
    public static let gray600 = RDLTheme.fixed("#55555E")
    public static let lime50 = RDLTheme.fixed("#F7FDE3")
    public static let lime100 = RDLTheme.fixed("#EEFBC4")
    public static let lime200 = RDLTheme.fixed("#E3F89A")
    public static let lime300 = RDLTheme.fixed("#D8F56F")
    public static let lime400 = RDLTheme.fixed("#CBEF43")
    public static let lime500 = RDLTheme.fixed("#B2D92A")
    public static let lime600 = RDLTheme.fixed("#8CAF12")
    public static let lime700 = RDLTheme.fixed("#5F7A08")
    public static let violet50 = RDLTheme.fixed("#F4F1FF")
    public static let violet100 = RDLTheme.fixed("#E9E3FF")
    public static let violet200 = RDLTheme.fixed("#D2C6FF")
    public static let violet300 = RDLTheme.fixed("#B09CFF")
    public static let violet400 = RDLTheme.fixed("#9076FF")
    public static let violet500 = RDLTheme.fixed("#7152F5")
    public static let violet600 = RDLTheme.fixed("#5A3BDB")
    public static let violet700 = RDLTheme.fixed("#4329AE")
    public static let orange50 = RDLTheme.fixed("#FFF3EE")
    public static let orange100 = RDLTheme.fixed("#FFE3D7")
    public static let orange200 = RDLTheme.fixed("#FFC3AA")
    public static let orange300 = RDLTheme.fixed("#FF9D75")
    public static let orange400 = RDLTheme.fixed("#FF7A45")
    public static let orange500 = RDLTheme.fixed("#F55F24")
    public static let orange600 = RDLTheme.fixed("#D24812")
    public static let orange700 = RDLTheme.fixed("#A1360B")
    public static let blue50 = RDLTheme.fixed("#EEF4FF")
    public static let blue100 = RDLTheme.fixed("#DCE7FF")
    public static let blue200 = RDLTheme.fixed("#B6CCFF")
    public static let blue300 = RDLTheme.fixed("#84A9FF")
    public static let blue400 = RDLTheme.fixed("#5585FF")
    public static let blue500 = RDLTheme.fixed("#2F66F6")
    public static let blue600 = RDLTheme.fixed("#1F4FD1")
    public static let blue700 = RDLTheme.fixed("#173B9E")
    public static let gold50 = RDLTheme.fixed("#FDF8EA")
    public static let gold100 = RDLTheme.fixed("#FAEDC7")
    public static let gold200 = RDLTheme.fixed("#F4DA8E")
    public static let gold300 = RDLTheme.fixed("#ECBC44")
    public static let gold400 = RDLTheme.fixed("#D9A632")
    public static let gold500 = RDLTheme.fixed("#C39222")
    public static let gold600 = RDLTheme.fixed("#9C7215")
    public static let gold700 = RDLTheme.fixed("#6E500E")
    public static let mint50 = RDLTheme.fixed("#EAFBF3")
    public static let mint100 = RDLTheme.fixed("#CFF5E3")
    public static let mint300 = RDLTheme.fixed("#7CE0B3")
    public static let mint500 = RDLTheme.fixed("#1FB877")
    public static let mint600 = RDLTheme.fixed("#13965F")
    public static let mint700 = RDLTheme.fixed("#0E7048")
    public static let red50 = RDLTheme.fixed("#FFF0F0")
    public static let red100 = RDLTheme.fixed("#FFDCDC")
    public static let red300 = RDLTheme.fixed("#FF9A9A")
    public static let red500 = RDLTheme.fixed("#F0453E")
    public static let red600 = RDLTheme.fixed("#CC2F29")
    public static let amber50 = RDLTheme.fixed("#FFF8E6")
    public static let amber100 = RDLTheme.fixed("#FFEDBF")
    public static let amber300 = RDLTheme.fixed("#FFD266")
    public static let amber500 = RDLTheme.fixed("#F5A70B")
    public static let amber600 = RDLTheme.fixed("#CC8700")
    public static let amber700 = RDLTheme.fixed("#8A5B00")
    public static let volt50 = RDLTheme.fixed("#FBFEE5")
    public static let volt100 = RDLTheme.fixed("#F5FDC0")
    public static let volt200 = RDLTheme.fixed("#EDFB8C")
    public static let volt300 = RDLTheme.fixed("#E6FA5E")
    public static let volt400 = RDLTheme.fixed("#DFFA32")
    public static let volt500 = RDLTheme.fixed("#C9E214")
    public static let volt600 = RDLTheme.fixed("#9AAD0A")
    public static let volt700 = RDLTheme.fixed("#5F6B05")
    public static let signal50 = RDLTheme.fixed("#EAFCEF")
    public static let signal100 = RDLTheme.fixed("#C9F7D5")
    public static let signal300 = RDLTheme.fixed("#7BEB97")
    public static let signal400 = RDLTheme.fixed("#4BE06E")
    public static let signal500 = RDLTheme.fixed("#22C552")
    public static let signal600 = RDLTheme.fixed("#15A140")
    public static let signal700 = RDLTheme.fixed("#0E6E2C")
    public static let electric50 = RDLTheme.fixed("#ECEFFF")
    public static let electric100 = RDLTheme.fixed("#D3DAFF")
    public static let electric300 = RDLTheme.fixed("#8A99FF")
    public static let electric400 = RDLTheme.fixed("#4361F5")
    public static let electric500 = RDLTheme.fixed("#0832D8")
    public static let electric600 = RDLTheme.fixed("#0627B0")
    public static let electric700 = RDLTheme.fixed("#051C80")
    public static let ember50 = RDLTheme.fixed("#FFF1EB")
    public static let ember100 = RDLTheme.fixed("#FFDCCC")
    public static let ember300 = RDLTheme.fixed("#FF9A70")
    public static let ember400 = RDLTheme.fixed("#FF7440")
    public static let ember500 = RDLTheme.fixed("#FC5A10")
    public static let ember600 = RDLTheme.fixed("#DB4410")
    public static let ember700 = RDLTheme.fixed("#9E300A")
    public static let orchid50 = RDLTheme.fixed("#FAF0FF")
    public static let orchid100 = RDLTheme.fixed("#F1DAFF")
    public static let orchid300 = RDLTheme.fixed("#D79BFF")
    public static let orchid400 = RDLTheme.fixed("#C16CF7")
    public static let orchid500 = RDLTheme.fixed("#A548EE")
    public static let orchid600 = RDLTheme.fixed("#8430C9")
    public static let orchid700 = RDLTheme.fixed("#5E1F91")
    public static let stone0 = RDLTheme.fixed("#FFFFFF")
    public static let stone50 = RDLTheme.fixed("#F7F7F8")
    public static let stone100 = RDLTheme.fixed("#EFEFF1")
    public static let stone150 = RDLTheme.fixed("#E7E7EA")
    public static let stone200 = RDLTheme.fixed("#DCDCE0")
    public static let stone300 = RDLTheme.fixed("#C3C3C9")
    public static let stone400 = RDLTheme.fixed("#9B9BA3")
    public static let stone500 = RDLTheme.fixed("#6B6B74")
    public static let stone550 = RDLTheme.fixed("#5C5C64")
    public static let stone600 = RDLTheme.fixed("#4E4E56")
    public static let stone700 = RDLTheme.fixed("#2E2F33")
    public static let stone800 = RDLTheme.fixed("#1D1E21")
    public static let stone900 = RDLTheme.fixed("#131416")
    public static let stone950 = RDLTheme.fixed("#0A0B0C")
    public static let rose50 = RDLTheme.fixed("#FFF0F4")
    public static let rose100 = RDLTheme.fixed("#FFDCE6")
    public static let rose300 = RDLTheme.fixed("#F79AB6")
    public static let rose500 = RDLTheme.fixed("#F0548A")
    public static let rose600 = RDLTheme.fixed("#D23A6F")
    public static let rose700 = RDLTheme.fixed("#9C2650")
}

/// Semantic roles. Each resolves for the active theme (light, dark, system or brand) — see `RDLTheme.apply`.
public enum RDLColor {
    public static let bgCanvas = RDLTheme.color("bg-canvas")
    public static let bgCanvasElevated = RDLTheme.color("bg-canvas-elevated")
    public static let bgSurface = RDLTheme.color("bg-surface")
    public static let bgSurfaceRaised = RDLTheme.color("bg-surface-raised")
    public static let bgSurfaceSunken = RDLTheme.color("bg-surface-sunken")
    public static let bgEmphasis = RDLTheme.color("bg-emphasis")
    public static let bgEmphasisRaised = RDLTheme.color("bg-emphasis-raised")
    public static let bgScrim = RDLTheme.color("bg-scrim")
    public static let fillControl = RDLTheme.color("fill-control")
    public static let fillControlHover = RDLTheme.color("fill-control-hover")
    public static let fillControlPressed = RDLTheme.color("fill-control-pressed")
    public static let fillDisabled = RDLTheme.color("fill-disabled")
    public static let fgPrimary = RDLTheme.color("fg-primary")
    public static let fgSecondary = RDLTheme.color("fg-secondary")
    public static let fgTertiary = RDLTheme.color("fg-tertiary")
    public static let fgDisabled = RDLTheme.color("fg-disabled")
    public static let fgOnEmphasis = RDLTheme.color("fg-on-emphasis")
    public static let fgOnEmphasisSecondary = RDLTheme.color("fg-on-emphasis-secondary")
    public static let borderSubtle = RDLTheme.color("border-subtle")
    public static let borderDefault = RDLTheme.color("border-default")
    public static let borderStrong = RDLTheme.color("border-strong")
    public static let borderFocus = RDLTheme.color("border-focus")
    public static let actionPrimary = RDLTheme.color("action-primary")
    public static let actionPrimaryHover = RDLTheme.color("action-primary-hover")
    public static let actionPrimaryPressed = RDLTheme.color("action-primary-pressed")
    public static let onActionPrimary = RDLTheme.color("on-action-primary")
    public static let actionSecondary = RDLTheme.color("action-secondary")
    public static let actionSecondaryHover = RDLTheme.color("action-secondary-hover")
    public static let actionSecondaryPressed = RDLTheme.color("action-secondary-pressed")
    public static let onActionSecondary = RDLTheme.color("on-action-secondary")
    public static let success = RDLTheme.color("success")
    public static let successSubtle = RDLTheme.color("success-subtle")
    public static let successText = RDLTheme.color("success-text")
    public static let warning = RDLTheme.color("warning")
    public static let warningSubtle = RDLTheme.color("warning-subtle")
    public static let warningText = RDLTheme.color("warning-text")
    public static let danger = RDLTheme.color("danger")
    public static let dangerSubtle = RDLTheme.color("danger-subtle")
    public static let dangerText = RDLTheme.color("danger-text")
    public static let info = RDLTheme.color("info")
    public static let infoSubtle = RDLTheme.color("info-subtle")
    public static let infoText = RDLTheme.color("info-text")
    public static let materialUltrathin = RDLTheme.color("material-ultrathin")
    public static let materialThin = RDLTheme.color("material-thin")
    public static let materialRegular = RDLTheme.color("material-regular")
    public static let materialThick = RDLTheme.color("material-thick")
    public static let materialBorder = RDLTheme.color("material-border")
    public static let materialHighlight = RDLTheme.color("material-highlight")
    public static let materialShade = RDLTheme.color("material-shade")
    public static let materialDark = RDLTheme.color("material-dark")
    public static let materialDarkBorder = RDLTheme.color("material-dark-border")
    public static let chartTrack = RDLTheme.color("chart-track")
    public static let chartGrid = RDLTheme.color("chart-grid")
    public static let chartMuted = RDLTheme.color("chart-muted")
    public static let chartHatch = RDLTheme.color("chart-hatch")
    public static let tick = RDLTheme.color("tick")
    public static let tickStrong = RDLTheme.color("tick-strong")
    public static let accent = RDLTheme.color("accent")
    public static let accentHover = RDLTheme.color("accent-hover")
    public static let accentPressed = RDLTheme.color("accent-pressed")
    public static let accentSubtle = RDLTheme.color("accent-subtle")
    public static let accentText = RDLTheme.color("accent-text")
    public static let accentGraphic = RDLTheme.color("accent-graphic")
    public static let onAccent = RDLTheme.color("on-accent")
    public static let bgBrand = RDLTheme.color("bg-brand")
    public static let fgOnBrand = RDLTheme.color("fg-on-brand")
    public static let fgOnBrandSecondary = RDLTheme.color("fg-on-brand-secondary")
    // v3 names (aliases)
    public static let bgSurfaceMuted = RDLTheme.color("bg-surface-sunken")
    public static let bgHero = RDLTheme.color("bg-emphasis")
    public static let bgHeroRaised = RDLTheme.color("bg-emphasis-raised")
    public static let scrim = RDLTheme.color("bg-scrim")
    public static let fillControlStrong = RDLTheme.color("action-primary")
    public static let textPrimary = RDLTheme.color("fg-primary")
    public static let textSecondary = RDLTheme.color("fg-secondary")
    public static let textTertiary = RDLTheme.color("fg-tertiary")
    public static let textOnHero = RDLTheme.color("fg-on-emphasis")
    public static let textOnHeroMuted = RDLTheme.color("fg-on-emphasis-secondary")
    public static let textOnStrong = RDLTheme.color("on-action-primary")
    public static let successSoft = RDLTheme.color("success-subtle")
    public static let dangerSoft = RDLTheme.color("danger-subtle")
    public static let warningSoft = RDLTheme.color("warning-subtle")
    public static let infoSoft = RDLTheme.color("info-subtle")
    public static let glassFill = RDLTheme.color("material-regular")
    public static let glassFillStrong = RDLTheme.color("material-thick")
    public static let glassBorder = RDLTheme.color("material-border")
    public static let glassShade = RDLTheme.color("material-shade")
    public static let glassText = RDLTheme.color("fg-primary")
    public static let glassTextMuted = RDLTheme.color("fg-secondary")
    public static let glassDarkFill = RDLTheme.color("material-dark")
    public static let glassDarkBorder = RDLTheme.color("material-dark-border")
    public static let accentStrong = RDLTheme.color("accent-hover")
    public static let accentSoft = RDLTheme.color("accent-subtle")
}

/// Accent (secondary colour). `.theme` follows `RDLTheme`; named presets override it for a subtree via `.rdlAccent(.volt)`.
public struct RDLAccent {
    public let accent: Color, accentStrong: Color, accentSoft: Color, onAccent: Color, accentText: Color, accentGraphic: Color
    public init(secondary: String?) {
        accent = RDLTheme.color("accent", secondary: secondary)
        accentStrong = RDLTheme.color("accent-hover", secondary: secondary)
        accentSoft = RDLTheme.color("accent-subtle", secondary: secondary)
        onAccent = RDLTheme.color("on-accent", secondary: secondary)
        accentText = RDLTheme.color("accent-text", secondary: secondary)
        accentGraphic = RDLTheme.color("accent-graphic", secondary: secondary)
    }
    public static let theme = RDLAccent(secondary: nil)
    public static let volt = RDLAccent(secondary: "#DFFA32")
    public static let lime = RDLAccent(secondary: "#CBEF43")
    public static let gold = RDLAccent(secondary: "#ECBC44")
    public static let signal = RDLAccent(secondary: "#4BE06E")
    public static let electric = RDLAccent(secondary: "#0832D8")
    public static let ember = RDLAccent(secondary: "#FC5A10")
    public static let orchid = RDLAccent(secondary: "#C16CF7")
    public static let violet = RDLAccent(secondary: "#7152F5")
    public static let orange = RDLAccent(secondary: "#F55F24")
    public static let ocean = RDLAccent(secondary: "#2F66F6")
    public static let rose = RDLAccent(secondary: "#F0548A")
}

private struct RDLAccentKey: EnvironmentKey { static let defaultValue = RDLAccent.theme }
public extension EnvironmentValues {
    var rdlAccent: RDLAccent { get { self[RDLAccentKey.self] } set { self[RDLAccentKey.self] = newValue } }
}
public extension View {
    func rdlAccent(_ accent: RDLAccent) -> some View { environment(\.rdlAccent, accent) }
}

// MARK: - Aura gradients

public enum RDLAura {
    public static let gold = RadialGradient(stops: [.init(color: RDLTheme.fixed("#F2C95C"), location: 0), .init(color: RDLTheme.fixed("#F3E3BC"), location: 0.38), .init(color: RDLTheme.fixed("#EFEFF1"), location: 0.78)], center: UnitPoint(x: 0.85, y: 0), startRadius: 0, endRadius: 520)
    public static let sunset = RadialGradient(stops: [.init(color: RDLTheme.fixed("#FF8A1F"), location: 0), .init(color: RDLTheme.fixed("#FF6FA0"), location: 0.45), .init(color: RDLTheme.fixed("#9FB7FF"), location: 1)], center: UnitPoint(x: 0.5, y: 0.5), startRadius: 0, endRadius: 520)
    public static let meadow = LinearGradient(stops: [.init(color: RDLTheme.fixed("#2FBF4E"), location: 0), .init(color: RDLTheme.fixed("#B8F03C"), location: 0.7), .init(color: RDLTheme.fixed("#EEF7C8"), location: 1)], startPoint: UnitPoint(x: 0.329, y: 0.03), endPoint: UnitPoint(x: 0.671, y: 0.97))
    public static let dusk = LinearGradient(stops: [.init(color: RDLTheme.fixed("#5E5A26"), location: 0), .init(color: RDLTheme.fixed("#8A5646"), location: 0.55), .init(color: RDLTheme.fixed("#9A5A6A"), location: 1)], startPoint: UnitPoint(x: 0.371, y: 0.017), endPoint: UnitPoint(x: 0.629, y: 0.983))
    public static let orchid = LinearGradient(stops: [.init(color: RDLTheme.fixed("#E046C8"), location: 0), .init(color: RDLTheme.fixed("#8A3BEF"), location: 1)], startPoint: UnitPoint(x: 0.25, y: 0.067), endPoint: UnitPoint(x: 0.75, y: 0.933))
    public static let ocean = LinearGradient(stops: [.init(color: RDLTheme.fixed("#122347"), location: 0), .init(color: RDLTheme.fixed("#1B5B6B"), location: 1)], startPoint: UnitPoint(x: 0.5, y: 0), endPoint: UnitPoint(x: 0.5, y: 1))
    public static let ember = LinearGradient(stops: [.init(color: RDLTheme.fixed("#F2A04A"), location: 0), .init(color: RDLTheme.fixed("#EBD2AE"), location: 1)], startPoint: UnitPoint(x: 0.25, y: 0.067), endPoint: UnitPoint(x: 0.75, y: 0.933))
    public static let fog = LinearGradient(stops: [.init(color: RDLTheme.fixed("#DCE3EA"), location: 0), .init(color: RDLTheme.fixed("#F4F5F7"), location: 1)], startPoint: UnitPoint(x: 0.5, y: 0), endPoint: UnitPoint(x: 0.5, y: 1))
    public static let rose = RadialGradient(stops: [.init(color: RDLTheme.fixed("#F0548A"), location: 0), .init(color: RDLTheme.fixed("#F79AB6"), location: 0.45), .init(color: RDLTheme.fixed("#EDE6F2"), location: 1)], center: UnitPoint(x: 0.5, y: 0.4), startRadius: 0, endRadius: 520)
}

// MARK: - Type

/// Set `RDLFont.family` to a bundled font name (e.g. "Urbanist") to match the web; nil uses the system font.
public enum RDLFont {
    public static var family: String? = "Urbanist"
}
public struct RDLTextStyle {
    public let size: CGFloat, lineHeight: CGFloat, weight: Font.Weight, tracking: CGFloat, relativeTo: Font.TextStyle
    /// Scales with Dynamic Type relative to the matching iOS text style.
    public var font: Font {
        #if canImport(UIKit)
        if let family = RDLFont.family, UIFont(name: family, size: size) != nil {
            return .custom(family, size: size, relativeTo: relativeTo).weight(weight)
        }
        #endif
        return .system(size: size, weight: weight, design: .default)
    }
}
public enum RDLType {
    public static let hero = RDLTextStyle(size: 96, lineHeight: 92, weight: .light, tracking: -3.84, relativeTo: .largeTitle)
    public static let displayXl = RDLTextStyle(size: 72, lineHeight: 72, weight: .light, tracking: -2.52, relativeTo: .largeTitle)
    public static let display = RDLTextStyle(size: 56, lineHeight: 58, weight: .light, tracking: -1.68, relativeTo: .largeTitle)
    public static let numeral = RDLTextStyle(size: 40, lineHeight: 44, weight: .light, tracking: -0.8, relativeTo: .largeTitle)
    public static let h1 = RDLTextStyle(size: 34, lineHeight: 38, weight: .regular, tracking: -0.68, relativeTo: .largeTitle)
    public static let h2 = RDLTextStyle(size: 26, lineHeight: 30, weight: .regular, tracking: -0.39, relativeTo: .title)
    public static let h3 = RDLTextStyle(size: 20, lineHeight: 24, weight: .medium, tracking: -0.2, relativeTo: .title3)
    public static let title = RDLTextStyle(size: 17, lineHeight: 22, weight: .medium, tracking: -0.09, relativeTo: .headline)
    public static let body = RDLTextStyle(size: 15, lineHeight: 22, weight: .regular, tracking: 0, relativeTo: .subheadline)
    public static let bodyStrong = RDLTextStyle(size: 15, lineHeight: 22, weight: .semibold, tracking: 0, relativeTo: .subheadline)
    public static let label = RDLTextStyle(size: 14, lineHeight: 18, weight: .medium, tracking: 0, relativeTo: .subheadline)
    public static let meta = RDLTextStyle(size: 13, lineHeight: 18, weight: .medium, tracking: 0, relativeTo: .footnote)
    public static let caption = RDLTextStyle(size: 12, lineHeight: 16, weight: .regular, tracking: 0.06, relativeTo: .caption)
    public static let micro = RDLTextStyle(size: 11, lineHeight: 14, weight: .medium, tracking: 0.44, relativeTo: .caption2)
    /// Units next to numbers render at this fraction of the number size.
    public static let unitScale: CGFloat = 0.38
}
public extension View {
    /// Applies an RDL type role: size, weight, tracking and line height.
    func rdlType(_ style: RDLTextStyle) -> some View {
        font(style.font)
            .tracking(style.tracking)
            .lineSpacing(max(0, style.lineHeight - style.size * 1.2))
    }
}

// MARK: - Space, radius, size, state, glass, motion

public enum RDLSpace {
    public static let s0: CGFloat = 0
    public static let s1: CGFloat = 4
    public static let s2: CGFloat = 8
    public static let s3: CGFloat = 12
    public static let s4: CGFloat = 16
    public static let s5: CGFloat = 20
    public static let s6: CGFloat = 24
    public static let s7: CGFloat = 28
    public static let s8: CGFloat = 32
    public static let s10: CGFloat = 40
    public static let s12: CGFloat = 48
    public static let s14: CGFloat = 56
    public static let s16: CGFloat = 64
    public static let s20: CGFloat = 80
    public static let s0_5: CGFloat = 2
    public static let s1_5: CGFloat = 6
    public static let s2_5: CGFloat = 10
    public static let mobileGutter: CGFloat = 20
    public static let cardPadding: CGFloat = 20
    public static let cardPaddingSm: CGFloat = 16
    public static let cardGap: CGFloat = 12
    public static let sectionGap: CGFloat = 32
    public static let stackTight: CGFloat = 4
    public static let stack: CGFloat = 8
    public static let stackLoose: CGFloat = 16
    public static let headerHeight: CGFloat = 48
    public static let headerTop: CGFloat = 8
    public static let titleGap: CGFloat = 24
    public static let bottomZone: CGFloat = 120
    public static let pinBottom: CGFloat = 34
    public static let webSidebar: CGFloat = 248
    public static let webGutter: CGFloat = 32
    public static let webGridGap: CGFloat = 16
    public static let webBentoGap: CGFloat = 12
    public static let webHeaderHeight: CGFloat = 64
}
public enum RDLRadius {
    public static let xs: CGFloat = 6
    public static let sm: CGFloat = 8
    public static let md: CGFloat = 12
    public static let tile: CGFloat = 14
    public static let base: CGFloat = 16
    public static let lg: CGFloat = 20
    public static let panel: CGFloat = 24
    public static let xl: CGFloat = 28
    public static let xxl: CGFloat = 32
    public static let xxxl: CGFloat = 40
    public static let sheet: CGFloat = 48
    public static let pill: CGFloat = 999
    public static let card: CGFloat = 28
    public static let widget: CGFloat = 40
}
public enum RDLSize {
    public static let tag: CGFloat = 24
    public static let controlXs: CGFloat = 32
    public static let controlSm: CGFloat = 40
    public static let controlMd: CGFloat = 48
    public static let controlLg: CGFloat = 56
    public static let controlXl: CGFloat = 64
    public static let iconButton: CGFloat = 48
    public static let orb: CGFloat = 48
    public static let orbLg: CGFloat = 56
    public static let tile: CGFloat = 48
    public static let dock: CGFloat = 64
    public static let dockItem: CGFloat = 52
    public static let slide: CGFloat = 64
    public static let slideKnob: CGFloat = 52
    public static let tabBar: CGFloat = 64
    public static let avatarSm: CGFloat = 32
    public static let avatarMd: CGFloat = 40
    public static let avatarLg: CGFloat = 56
    public static let iconSm: CGFloat = 16
    public static let iconMd: CGFloat = 20
    public static let iconLg: CGFloat = 24
}
/// Material 3 state layers (opacity of the on-colour over the container).
public enum RDLState {
    public static let hover: Double = 0.08
    public static let focus: Double = 0.12
    public static let pressed: Double = 0.12
    public static let dragged: Double = 0.16
    public static let disabledContent: Double = 0.38
    public static let disabledContainer: Double = 0.12
}
public enum RDLGlass {
    public static let blur: CGFloat = 24
}
public enum RDLMotion {
    public static let instant: Double = 0.05
    public static let fast: Double = 0.12
    public static let base: Double = 0.2
    public static let slow: Double = 0.32
    public static let chart: Double = 0.6
    public static let spring = Animation.spring(response: 0.35, dampingFraction: 0.82)
    public static let standard = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.2)
    public static let emphasizedDecelerate = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.32)
    public static let stagger: Double = 0.04
}
```

## Appendix F · `assets/templates/rdl-components.css`

Web component layer: part 1 base, part 2 glass, part 3 layout + concentric nesting.

```css
/* RDL Theme — web component layer. Requires tokens.css.
   Part 1 (below): base components shared by both styles (v1 names, still valid).
   Part 2 (V2): glass/aura surfaces, figures, dot numerals, orbs, action rows, instruments.
   Part 3 (v3): layout primitives (screen, header, stacks, grids, pin) and structural components.
   Every size here comes from the token ladders — see references/layout.md and anatomy.md.
   SwiftUI equivalents: assets/ios/RDLComponents.swift (part 1) and RDLGlassComponents.swift (part 2). */

*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--rdl-font-sans);
  background: var(--rdl-bg-canvas);
  color: var(--rdl-text-primary);
  -webkit-font-smoothing: antialiased;
}
button { font: inherit; color: inherit; border: 0; background: none; cursor: pointer; padding: 0; }
.rdl-icon { width: var(--rdl-size-icon-md); height: var(--rdl-size-icon-md); flex: none; stroke: currentColor; fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.rdl-icon--sm { width: var(--rdl-size-icon-sm); height: var(--rdl-size-icon-sm); }

/* ---------- Surfaces ---------- */
.rdl-card {
  background: var(--rdl-bg-surface);
  border-radius: var(--rdl-radius-card);
  padding: var(--rdl-card-padding);
}
.rdl-card--muted { background: var(--rdl-bg-surface-muted); }
.rdl-card--hero { background: var(--rdl-bg-hero); color: var(--rdl-text-on-hero); border-radius: var(--rdl-radius-2xl); }
.rdl-card--accent { background: var(--rdl-accent); color: var(--rdl-on-accent); }
.rdl-card--web { border-radius: var(--rdl-radius-lg); padding: var(--rdl-space-6); }
.rdl-muted { color: var(--rdl-text-secondary); }
.rdl-faint { color: var(--rdl-text-tertiary); }
.rdl-card--hero .rdl-muted { color: var(--rdl-text-on-hero-muted); }

/* ---------- Container-aware control fill ----------
   RDL rule: controls invert against their container. On the gray canvas they are white;
   inside a white card they are gray. Never gray-on-gray (invisible) or white-on-white. */
:root, [data-theme] { --rdl-ctl: var(--rdl-bg-surface); }
.rdl-card, .rdl-side { --rdl-ctl: var(--rdl-fill-control); }
.rdl-card--muted { --rdl-ctl: var(--rdl-bg-surface); }
.rdl-card--hero { --rdl-ctl: var(--rdl-bg-hero-raised); }

/* ---------- Buttons ---------- */
.rdl-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--rdl-space-2);
  height: var(--rdl-size-control-lg); padding: 0 var(--rdl-space-6);
  border-radius: var(--rdl-radius-pill);
  font-size: 15px; font-weight: 500; letter-spacing: -0.005em;
  background: var(--rdl-button-primary-bg); color: var(--rdl-button-primary-fg);
  transition: transform var(--rdl-duration-fast) var(--rdl-ease-standard), background var(--rdl-duration-base) var(--rdl-ease-standard);
}
@media (hover: hover) { .rdl-btn:hover { background: var(--rdl-button-primary-bg-hover); } }
.rdl-btn:active { transform: scale(0.97); background: var(--rdl-button-primary-bg-pressed); }
.rdl-btn:disabled, .rdl-btn[aria-disabled="true"] { background: var(--rdl-button-primary-bg-disabled); color: var(--rdl-button-primary-fg-disabled); transform: none; cursor: not-allowed; }
:where(button, a, input, select, textarea, [tabindex]):focus-visible, .rdl-btn:focus-visible, .rdl-iconbtn:focus-visible, .rdl-chip:focus-visible { outline: var(--rdl-focus-width) solid var(--rdl-focus-ring); outline-offset: var(--rdl-focus-offset); }
.rdl-btn--accent { background: var(--rdl-button-accent-bg); color: var(--rdl-button-accent-fg); }
@media (hover: hover) { .rdl-btn--accent:hover { background: var(--rdl-button-accent-bg-hover); } }
.rdl-btn--accent:active { background: var(--rdl-button-accent-bg-pressed); }
.rdl-btn--secondary { background: var(--rdl-ctl); color: var(--rdl-text-primary); }
.rdl-btn--md { height: var(--rdl-size-control-md); padding: 0 var(--rdl-space-5); font-size: 14px; }
.rdl-btn--block { width: 100%; }

.rdl-iconbtn {
  width: var(--rdl-size-icon-button); height: var(--rdl-size-icon-button);
  display: inline-grid; place-items: center; border-radius: 50%;
  background: var(--rdl-ctl); color: var(--rdl-text-primary); position: relative;
}
.rdl-card--hero .rdl-iconbtn { color: var(--rdl-text-on-hero); }
.rdl-iconbtn--hero { background: var(--rdl-bg-hero-raised); color: var(--rdl-text-on-hero); }
.rdl-iconbtn--accent { background: var(--rdl-accent); color: var(--rdl-on-accent); }
.rdl-iconbtn__dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--rdl-danger); box-shadow: 0 0 0 2px var(--rdl-bg-canvas); }

/* Quick action: icon circle + label underneath */
.rdl-action { display: grid; justify-items: center; gap: var(--rdl-space-2); font-size: 12px; font-weight: 500; color: var(--rdl-text-secondary); }
.rdl-action .rdl-iconbtn { width: var(--rdl-size-orb-lg); height: var(--rdl-size-orb-lg); }

/* ---------- Chips, segmented, delta ---------- */
.rdl-chip { display: inline-flex; align-items: center; gap: var(--rdl-space-1_5); height: var(--rdl-size-control-sm); padding: 0 var(--rdl-space-4); border-radius: var(--rdl-radius-pill); background: var(--rdl-ctl); font-size: 14px; font-weight: 500; white-space: nowrap; }
.rdl-chip--xs { height: var(--rdl-size-control-xs); padding: 0 var(--rdl-space-3); font-size: 13px; }
.rdl-chip--md { height: var(--rdl-size-control-md); }
.rdl-chip[aria-pressed="true"] { background: var(--rdl-chip-bg-selected); color: var(--rdl-chip-fg-selected); }

.rdl-seg { display: flex; height: var(--rdl-size-control-md); padding: var(--rdl-space-1); gap: var(--rdl-space-1); border-radius: var(--rdl-radius-pill); background: var(--rdl-ctl); }
.rdl-seg button { flex: 1; height: var(--rdl-size-control-sm); padding: 0 var(--rdl-space-3); border-radius: var(--rdl-radius-pill); font-size: 14px; font-weight: 500; color: var(--rdl-text-secondary); transition: background var(--rdl-duration-base) var(--rdl-ease-standard); }
.rdl-seg button[aria-selected="true"] { background: var(--rdl-segmented-thumb); color: var(--rdl-segmented-fg-selected); }
.rdl-card--hero .rdl-seg button { color: var(--rdl-text-on-hero-muted); }
.rdl-card--hero .rdl-seg button[aria-selected="true"] { background: var(--rdl-accent); color: var(--rdl-on-accent); }

.rdl-delta { display: inline-flex; align-items: center; gap: 2px; height: var(--rdl-size-tag); padding: 0 var(--rdl-space-2); border-radius: var(--rdl-radius-pill); font-size: 12px; font-weight: 600; background: var(--rdl-success-soft); color: var(--rdl-success-text); }
.rdl-delta--down { background: var(--rdl-danger-soft); color: var(--rdl-danger-text); }
.rdl-delta--on-accent { background: rgba(11,11,13,0.1); color: var(--rdl-on-accent); }

/* ---------- Money ---------- */
.rdl-amount { font-variant-numeric: tabular-nums; letter-spacing: -0.035em; font-weight: 500; }
.rdl-amount small { font-size: 0.55em; letter-spacing: -0.01em; color: var(--rdl-text-secondary); font-weight: 500; }
.rdl-card--hero .rdl-amount small { color: var(--rdl-text-on-hero-muted); }

/* ---------- Charts ---------- */
.rdl-hatch {
  background-color: var(--rdl-chart-muted);
  background-image: repeating-linear-gradient(-45deg, var(--rdl-chart-hatch) 0 1px, transparent 1px 6px);
}
.rdl-bars { display: flex; align-items: flex-end; gap: 8px; height: var(--h, 140px); }
.rdl-bars__col { flex: 1; display: grid; grid-template-rows: 1fr auto; gap: 8px; height: 100%; text-align: center; }
.rdl-bars__track { position: relative; border-radius: var(--rdl-radius-pill); background: var(--rdl-chart-track); overflow: visible; }
.rdl-bars__fill { position: absolute; inset: auto 0 0 0; height: var(--v); border-radius: var(--rdl-radius-pill); animation: rdl-grow var(--rdl-duration-chart) var(--rdl-ease-emphasized) both; animation-delay: calc(var(--i, 0) * 40ms); transform-origin: bottom; }
.rdl-bars__fill.is-active { background: var(--rdl-accent-graphic); }
.rdl-bars__label { font-size: 11px; font-weight: 500; color: var(--rdl-text-tertiary); }
.rdl-bars__col.is-active .rdl-bars__label { color: var(--rdl-text-primary); }
.rdl-tooltip { position: absolute; left: 50%; bottom: calc(var(--v) + 8px); transform: translateX(-50%); padding: 4px 8px; border-radius: 8px; background: var(--rdl-fill-control-strong); color: var(--rdl-text-on-strong); font-size: 11px; font-weight: 600; white-space: nowrap; }
@keyframes rdl-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }

/* ---------- Lists ---------- */
.rdl-row { display: flex; align-items: center; gap: var(--rdl-space-3); min-height: var(--rdl-size-control-lg); padding: var(--rdl-space-2) 0; }
.rdl-row + .rdl-row { border-top: 1px solid var(--rdl-border-subtle); }
.rdl-row__lead { width: var(--rdl-size-avatar-md); height: var(--rdl-size-avatar-md); border-radius: 50%; display: grid; place-items: center; background: var(--rdl-ctl); flex: none; font-size: 14px; font-weight: 600; }
.rdl-row__main { flex: 1; min-width: 0; }
.rdl-row__title { font-size: 15px; font-weight: 500; letter-spacing: -0.005em; }
.rdl-row__sub { font-size: 13px; line-height: 18px; font-weight: 400; color: var(--rdl-text-secondary); margin-top: 2px; }
.rdl-row__end { text-align: right; font-variant-numeric: tabular-nums; }
.rdl-pos { color: var(--rdl-success-text); }

.rdl-section-head { display: flex; align-items: baseline; justify-content: space-between; margin: 0 0 var(--rdl-space-3); }
.rdl-section-head h3 { margin: 0; font-size: 17px; line-height: 22px; font-weight: 500; letter-spacing: -0.005em; }
.rdl-section-head a { font-size: 14px; font-weight: 500; color: var(--rdl-text-secondary); text-decoration: none; }

/* ---------- Floating tab bar ---------- */
.rdl-tabbar {
  position: absolute; left: var(--rdl-mobile-gutter); right: var(--rdl-mobile-gutter); bottom: var(--rdl-pin-bottom);
  display: flex; justify-content: space-between; padding: 8px; border-radius: var(--rdl-radius-pill);
  background: var(--rdl-bg-hero); box-shadow: var(--rdl-shadow-float);
}
.rdl-tabbar button { width: var(--rdl-size-dock-item); height: var(--rdl-size-dock-item); border-radius: 50%; display: grid; place-items: center; color: var(--rdl-text-on-hero-muted); }
.rdl-tabbar button[aria-current="page"] { background: var(--rdl-accent); color: var(--rdl-on-accent); }

/* ---------- Avatars ---------- */
.rdl-avatar { width: var(--rdl-size-avatar-md); height: var(--rdl-size-avatar-md); border-radius: 50%; display: grid; place-items: center; font-weight: 600; font-size: 14px; background: var(--rdl-accent-soft); color: var(--rdl-accent-text); flex: none; }
.rdl-avatars { display: flex; }
.rdl-avatars > .rdl-avatar { width: var(--rdl-size-avatar-sm); height: var(--rdl-size-avatar-sm); font-size: 11px; letter-spacing: -0.02em; box-shadow: 0 0 0 2px var(--rdl-bg-surface); }
.rdl-avatars > * + * { margin-left: calc(var(--rdl-space-2) * -1); }

/* ---------- Progress ---------- */
.rdl-progress { height: var(--rdl-space-2); border-radius: var(--rdl-radius-pill); background: var(--rdl-chart-track); overflow: hidden; }
.rdl-progress > span { display: block; height: 100%; width: var(--v); border-radius: inherit; background: var(--rdl-accent-graphic); }

/* ---------- Inputs ---------- */
.rdl-input { display: flex; align-items: center; gap: var(--rdl-space-2); height: var(--rdl-size-control-md); padding: 0 var(--rdl-space-4); border-radius: var(--rdl-radius-pill); background: var(--rdl-ctl); color: var(--rdl-text-secondary); font-size: 15px; }
.rdl-input input { flex: 1; border: 0; background: none; font: inherit; color: var(--rdl-text-primary); outline: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}

/* =====================================================================
   V2 — Glass language (2025–26 RDL). Default when data-style is not "flat".
   ===================================================================== */

/* ---------- Surfaces ---------- */
.rdl-glass {
  position: relative;
  background: var(--rdl-glass-fill);
  -webkit-backdrop-filter: blur(var(--rdl-glass-blur)) saturate(var(--rdl-glass-saturate));
  backdrop-filter: blur(var(--rdl-glass-blur)) saturate(var(--rdl-glass-saturate));
  border: 1px solid var(--rdl-glass-border);
  border-radius: var(--rdl-radius-card);
  box-shadow: var(--rdl-shadow-glass);
  color: var(--rdl-glass-text);
  padding: var(--rdl-card-padding);
  --rdl-ctl: var(--rdl-glass-fill-strong);
}
.rdl-glass--strong { background: var(--rdl-glass-fill-strong); }
/* Dark glass works on any backdrop (photos, auras) in both themes. */
.rdl-glass--dark {
  background: var(--rdl-glass-dark-fill); border-color: var(--rdl-glass-dark-border);
  box-shadow: var(--rdl-shadow-glass-dark); color: #F4F4F5; --rdl-ctl: rgba(255,255,255,0.10);
}
.rdl-glass--dark .rdl-muted, .rdl-on-dark .rdl-muted { color: rgba(244,244,245,0.68); }
/* Iridescent rim (dark glass cards over 3D/photo) */
.rdl-glass--iridescent::before {
  content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; pointer-events: none;
  background: var(--rdl-glass-iridescent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
[data-style="flat"] .rdl-glass { backdrop-filter: none; -webkit-backdrop-filter: none; box-shadow: none; border-color: transparent; }

/* Widget squircle: bigger radius, usually an aura fill. */
.rdl-widget { border-radius: var(--rdl-radius-widget); padding: var(--rdl-card-padding); position: relative; overflow: hidden; }
.rdl-aura--gold   { background: var(--rdl-aura-gold); color: #0A0B0C; }
/* Auras redefine the text tiers so every child (muted, units, currency) stays legible */
.rdl-aura--gold, .rdl-aura--meadow, .rdl-aura--ember, .rdl-aura--fog, .rdl-aura--rose { --rdl-text-secondary: rgba(10,11,12,0.68); --rdl-text-tertiary: rgba(10,11,12,0.52); }
.rdl-aura--sunset, .rdl-aura--dusk, .rdl-aura--orchid, .rdl-aura--ocean { --rdl-text-secondary: rgba(255,255,255,0.86); --rdl-text-tertiary: rgba(255,255,255,0.68); }
.rdl-aura--sunset { background: var(--rdl-aura-sunset); color: #fff; }
.rdl-aura--meadow { background: var(--rdl-aura-meadow); color: #0A0B0C; }
.rdl-aura--dusk   { background: var(--rdl-aura-dusk); color: #fff; }
.rdl-aura--orchid { background: var(--rdl-aura-orchid); color: #fff; }
.rdl-aura--ocean  { background: var(--rdl-aura-ocean); color: #fff; }
.rdl-aura--ember  { background: var(--rdl-aura-ember); color: #0A0B0C; }
.rdl-aura--fog    { background: var(--rdl-aura-fog); color: #0A0B0C; }
/* Light auras keep ink text in dark mode too */
.rdl-aura--gold .rdl-muted, .rdl-aura--meadow .rdl-muted, .rdl-aura--ember .rdl-muted, .rdl-aura--fog .rdl-muted,
.rdl-aura--gold .rdl-unit, .rdl-aura--meadow .rdl-unit, .rdl-aura--ember .rdl-unit, .rdl-aura--fog .rdl-unit { color: rgba(10,11,12,0.68); }
.rdl-aura--sunset .rdl-muted, .rdl-aura--dusk .rdl-muted, .rdl-aura--orchid .rdl-muted, .rdl-aura--ocean .rdl-muted { color: var(--rdl-text-secondary); }
.rdl-aura--rose { background: var(--rdl-aura-rose); color: #0A0B0C; }

/* Brand panel (blueprint card): filled with the brand primary, line art in the on-brand colour.
   .rdl-blueprint is the v3 name; .rdl-card--brand is the v4 name. */
.rdl-blueprint, .rdl-card--brand {
  background: var(--rdl-bg-brand); color: var(--rdl-fg-on-brand); border-radius: var(--rdl-radius-lg); padding: var(--rdl-card-padding);
  --rdl-ctl: color-mix(in srgb, var(--rdl-fg-on-brand) 14%, transparent);
  --rdl-text-primary: var(--rdl-fg-on-brand); --rdl-text-secondary: var(--rdl-fg-on-brand-secondary); --rdl-text-tertiary: var(--rdl-fg-on-brand-secondary);
  --rdl-tick: color-mix(in srgb, var(--rdl-fg-on-brand) 36%, transparent); --rdl-tick-strong: var(--rdl-fg-on-brand);
}
.rdl-card--brand { border-radius: var(--rdl-radius-card); }
.rdl-blueprint .rdl-muted, .rdl-card--brand .rdl-muted { color: var(--rdl-text-secondary); }
.rdl-blueprint svg, .rdl-card--brand svg { stroke: currentColor; }

/* Film grain + dot grid textures */
.rdl-grain { position: relative; }
.rdl-grain::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit; opacity: 0.18; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.rdl-dotgrid { background-image: radial-gradient(currentColor 0.8px, transparent 1px); background-size: 14px 14px; color: var(--rdl-tick); }

/* ---------- Figures (numbers are the headline) ---------- */
.rdl-figure { display: inline-flex; align-items: baseline; gap: 0.12em; font-weight: var(--rdl-num-weight); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; line-height: 1; }
.rdl-figure .rdl-unit { font-size: calc(1em * var(--rdl-unit-scale)); font-weight: 400; letter-spacing: 0; color: var(--rdl-text-secondary); }
.rdl-figure .rdl-cur { font-size: calc(1em * var(--rdl-unit-scale)); font-weight: 400; align-self: flex-start; margin-top: 0.18em; color: var(--rdl-text-secondary); }
.rdl-figure .rdl-lead { color: var(--rdl-text-tertiary); } /* 0.00|321 BNB — de-emphasised leading zeros */
.rdl-glass--dark .rdl-figure .rdl-unit, .rdl-on-dark .rdl-figure .rdl-unit, .rdl-glass--dark .rdl-figure .rdl-cur { color: rgba(244,244,245,0.68); }
.rdl-glass--dark .rdl-figure .rdl-lead, .rdl-on-dark .rdl-figure .rdl-lead { color: rgba(244,244,245,0.35); }
.rdl-figure--dot { font-family: var(--rdl-font-dot); font-weight: 700; letter-spacing: 0.02em; }
.rdl-mix { font-weight: 300; } .rdl-mix b { font-weight: 600; } /* "Hello **Alex**" two-weight headlines */
.rdl-eyebrow { font-size: 11px; line-height: 14px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--rdl-text-secondary); }

/* ---------- Controls ---------- */
.rdl-orb {
  width: var(--rdl-size-orb); height: var(--rdl-size-orb); border-radius: 50%; display: inline-grid; place-items: center; flex: none;
  background: var(--rdl-glass-fill); border: 1px solid var(--rdl-glass-border);
  -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); color: inherit;
}
.rdl-orb--lg { width: var(--rdl-size-orb-lg); height: var(--rdl-size-orb-lg); }
.rdl-orb--lg .rdl-icon, .rdl-orb--lg .ico { width: var(--rdl-size-icon-lg); height: var(--rdl-size-icon-lg); }
.rdl-orb--sm { width: var(--rdl-size-control-sm); height: var(--rdl-size-control-sm); }
.rdl-orb--solid { background: var(--rdl-orb-bg-selected); color: var(--rdl-orb-fg-selected); border-color: transparent; }
.rdl-orb--white { background: #fff; color: #0A0B0C; border-color: transparent; }
.rdl-orb--accent { background: var(--rdl-accent); color: var(--rdl-on-accent); border-color: transparent; }
.rdl-orb--outline { background: transparent; border-color: var(--rdl-border-strong); backdrop-filter: none; }
.rdl-tile { width: var(--rdl-size-tile); height: var(--rdl-size-tile); border-radius: var(--rdl-radius-tile); display: inline-grid; place-items: center; background: var(--rdl-ctl); flex: none; }
.rdl-tile[aria-pressed="true"] { background: #fff; color: #0A0B0C; }

.rdl-btn--glass { background: var(--rdl-glass-fill); border: 1px solid var(--rdl-glass-border); color: inherit; -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
.rdl-btn--white { background: #fff; color: #0A0B0C; }

/* Circle – pill – circle action row: ← [ Start journey ] → */
.rdl-actionrow { display: grid; grid-template-columns: auto 1fr auto; gap: var(--rdl-stack); align-items: center; }
.rdl-actionrow .rdl-orb { width: var(--rdl-size-orb-lg); height: var(--rdl-size-orb-lg); }
.rdl-actionrow .rdl-btn { width: 100%; }

/* Slide to confirm: (→) Convert balance ››› */
.rdl-slide {
  position: relative; display: flex; align-items: center; height: var(--rdl-size-slide); padding: var(--rdl-space-1_5); border-radius: var(--rdl-radius-pill);
  background: var(--rdl-glass-fill); border: 1px solid var(--rdl-glass-border); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
}
.rdl-slide__knob { width: var(--rdl-size-slide-knob); height: var(--rdl-size-slide-knob); border-radius: 50%; display: grid; place-items: center; background: var(--rdl-accent); color: var(--rdl-on-accent); flex: none; }
.rdl-slide__label { flex: 1; text-align: center; font-size: 15px; font-weight: 500; }
.rdl-slide__chev { letter-spacing: -0.1em; opacity: 0.45; padding-right: var(--rdl-space-5); font-size: 17px; }

.rdl-seg--glass { background: var(--rdl-glass-fill); box-shadow: inset 0 0 0 1px var(--rdl-glass-border); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
.rdl-seg--glass button[aria-selected="true"] { background: #fff; color: #0A0B0C; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
.rdl-seg--accent button[aria-selected="true"] { background: var(--rdl-accent); color: var(--rdl-on-accent); }

.rdl-chip--glass { background: var(--rdl-glass-fill); border: 1px solid var(--rdl-glass-border); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
.rdl-chip--outline { background: transparent; border: 1px solid var(--rdl-border-strong); }
.rdl-tag { display: inline-flex; align-items: center; gap: var(--rdl-space-1); height: var(--rdl-size-tag); padding: 0 var(--rdl-space-2); border-radius: var(--rdl-radius-pill); font-size: 11px; font-weight: 600; background: var(--rdl-accent); color: var(--rdl-on-accent); white-space: nowrap; }
.rdl-tag--dark { background: var(--rdl-bg-emphasis); color: var(--rdl-fg-on-emphasis); }
.rdl-tag--white { background: #fff; color: #0A0B0C; }
.rdl-tag--accent { background: var(--rdl-accent); color: var(--rdl-on-accent); }
.rdl-tag--crit { background: var(--rdl-danger-subtle); color: var(--rdl-danger-text); }

/* Status: ● Operational */
.rdl-status { display: inline-flex; align-items: center; gap: var(--rdl-space-1_5); font-size: 13px; line-height: 18px; font-weight: 500; }
.rdl-status::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--rdl-status, var(--rdl-success)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--rdl-status, var(--rdl-success)) 22%, transparent); }
.rdl-status--warn { --rdl-status: var(--rdl-warning); }
.rdl-status--crit { --rdl-status: var(--rdl-danger); }
.rdl-status--info { --rdl-status: var(--rdl-info); }
.rdl-status--idle { --rdl-status: var(--rdl-fg-tertiary); }

/* Key / value pairs */
.rdl-kv { display: grid; gap: var(--rdl-stack-tight); }
.rdl-kv dt, .rdl-kv .k { font-size: 12px; color: var(--rdl-text-secondary); }
.rdl-kv dd, .rdl-kv .v { margin: 0; font-size: 15px; font-weight: 500; font-variant-numeric: tabular-nums; }
.rdl-kv--row { grid-template-columns: 1fr auto; align-items: baseline; gap: var(--rdl-space-3); }
.rdl-kv--row .k { font-size: 14px; }
.rdl-kv--leader { grid-template-columns: auto 1fr auto; align-items: baseline; gap: var(--rdl-stack); }
.rdl-kv--leader .k { font-size: 14px; }
.rdl-kv--leader::after { content: none; }
.rdl-kv--leader .dots { border-bottom: 1px dotted var(--rdl-tick); transform: translateY(-4px); }
.rdl-glass--dark .rdl-kv .k, .rdl-on-dark .rdl-kv .k { color: rgba(244,244,245,0.68); }

/* Bottom dock: glass capsule of orbs, active one solid */
.rdl-dock {
  display: flex; gap: var(--rdl-space-1_5); padding: var(--rdl-space-1_5); border-radius: var(--rdl-radius-pill); width: max-content;
  background: var(--rdl-glass-fill); -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); box-shadow: inset 0 0 0 1px var(--rdl-glass-border), var(--rdl-shadow-glass);
}
.rdl-dock button { width: var(--rdl-size-dock-item); height: var(--rdl-size-dock-item); border-radius: 50%; display: grid; place-items: center; color: inherit; opacity: 0.7; }
.rdl-dock button[aria-current="page"] { background: var(--rdl-dock-item-selected); color: var(--rdl-dock-fg-selected); opacity: 1; }
.rdl-dock--accent button[aria-current="page"] { background: var(--rdl-accent); color: var(--rdl-on-accent); }

/* ---------- Instruments ---------- */
/* Tick ruler with needle: minor ticks every 6px, major every 30px */
.rdl-ticks { position: relative; height: 28px; --tick: var(--rdl-tick);
  background:
    repeating-linear-gradient(90deg, var(--tick) 0 1px, transparent 1px 30px) bottom / 100% 18px no-repeat,
    repeating-linear-gradient(90deg, var(--tick) 0 1px, transparent 1px 6px) bottom / 100% 10px no-repeat;
}
.rdl-ticks__needle { position: absolute; bottom: 0; left: var(--at, 50%); width: 2px; height: 28px; border-radius: 2px; background: var(--rdl-accent-graphic); transform: translateX(-1px); box-shadow: 0 0 12px var(--rdl-accent-graphic); }
.rdl-ticks__labels { display: flex; justify-content: space-between; font-size: 11px; line-height: 14px; color: var(--rdl-text-secondary); margin-top: var(--rdl-stack); }

/* Thin meter line: label ........ value, 2px line underneath */
.rdl-meter { display: grid; grid-template-columns: 1fr auto; gap: var(--rdl-stack) var(--rdl-space-3); font-size: 13px; line-height: 18px; }
.rdl-meter__track { grid-column: 1 / -1; height: 2px; border-radius: 2px; background: var(--rdl-chart-track); overflow: hidden; }
.rdl-meter__track > span { display: block; height: 100%; width: var(--v); background: var(--c, var(--rdl-accent-graphic)); border-radius: inherit; }
.rdl-glass--dark .rdl-meter__track, .rdl-on-dark .rdl-meter__track { background: rgba(255,255,255,0.12); }

/* Vertical line bars (thin strokes, one bright) */
.rdl-lines { display: flex; align-items: flex-end; justify-content: space-between; height: var(--h, 96px); gap: 2px; }
.rdl-lines > i { width: 2px; height: var(--v); border-radius: 2px; background: currentColor; opacity: 0.28; transform-origin: bottom; animation: rdl-grow var(--rdl-duration-chart) var(--rdl-ease-emphasized) both; }
.rdl-lines > i.is-active { opacity: 1; background: var(--rdl-accent-graphic); box-shadow: 0 0 10px var(--rdl-accent-graphic); }

/* Month grid of paid/missed/upcoming installments (SIP / EMI history) */
.rdl-monthgrid { display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--rdl-space-1_5); }
.rdl-monthgrid > div { aspect-ratio: 1 / 1.05; border-radius: var(--rdl-radius-tile); display: grid; justify-items: center; align-content: space-between; padding: var(--rdl-space-2) var(--rdl-space-1); font-size: 11px; color: var(--rdl-text-secondary); background: var(--rdl-ctl); }
.rdl-monthgrid > div::after { content: ""; width: 20px; height: 20px; border-radius: 50%; border: 1px dashed var(--rdl-border-strong); }
.rdl-monthgrid > .is-paid::after { content: "✓"; border: 0; background: var(--rdl-accent); color: var(--rdl-on-accent); font-size: 12px; font-weight: 700; line-height: 20px; text-align: center; }
.rdl-monthgrid > .is-missed::after { border: 0; background: var(--rdl-fill-control-pressed) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M7 7l6 6M13 7l-6 6' stroke='%23fff' stroke-width='1.6' stroke-linecap='round'/></svg>") center / 20px no-repeat; }
.rdl-monthgrid > .is-now { outline: 1.5px solid var(--rdl-accent-graphic); outline-offset: -1.5px; color: var(--rdl-text-primary); }

/* Accessibility: Reduce Transparency → glass becomes solid */
@media (prefers-reduced-transparency: reduce) {
  .rdl-glass, .rdl-orb, .rdl-dock, .rdl-slide, .rdl-seg--glass, .rdl-chip--glass, .rdl-btn--glass {
    -webkit-backdrop-filter: none; backdrop-filter: none; background: var(--rdl-bg-surface);
  }
  .rdl-glass--dark { background: var(--rdl-stone-900); }
}

/* =====================================================================
   Part 3 (v3) — layout primitives and structural components.
   Spacing is semantic: tight 4 · stack 8 · card 12 · loose 16 · title 24 · section 32.
   ===================================================================== */

/* ---------- Mobile screen skeleton ---------- */
.rdl-screen {
  position: relative; display: flex; flex-direction: column; min-height: 100%;
  padding: var(--rdl-header-top) var(--rdl-mobile-gutter) var(--rdl-bottom-zone);
}
.rdl-header { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: var(--rdl-header-height); gap: var(--rdl-stack); }
.rdl-header > :first-child { justify-self: start; }
.rdl-header > :last-child { justify-self: end; display: flex; gap: var(--rdl-stack); }
.rdl-header > :only-child { grid-column: 1 / -1; }
.rdl-header__title { font-size: 17px; line-height: 22px; font-weight: 500; letter-spacing: -0.005em; text-align: center; }
.rdl-header .rdl-chip, .rdl-header .rdl-btn { height: var(--rdl-header-height); } /* one control height per row */

/* ---------- Stacks and rows ---------- */
.rdl-stack { display: flex; flex-direction: column; gap: var(--rdl-stack); }
.rdl-stack--tight { gap: var(--rdl-stack-tight); }
.rdl-stack--card { gap: var(--rdl-card-gap); }
.rdl-stack--loose { gap: var(--rdl-stack-loose); }
.rdl-stack--title { gap: var(--rdl-title-gap); }
.rdl-stack--section { gap: var(--rdl-section-gap); }
.rdl-inline { display: flex; align-items: center; gap: var(--rdl-stack); min-width: 0; }
.rdl-inline--between { justify-content: space-between; }
.rdl-inline--baseline { align-items: baseline; }
.rdl-inline--loose { gap: var(--rdl-stack-loose); }
.rdl-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--rdl-card-gap); }
.rdl-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--rdl-card-gap); }
.rdl-center { text-align: center; align-items: center; }

/* Pinned bottom zone: action row, slide or dock — 34 above the home indicator */
.rdl-pin { position: absolute; left: var(--rdl-mobile-gutter); right: var(--rdl-mobile-gutter); bottom: var(--rdl-pin-bottom); z-index: 3; }
.rdl-pin--center { left: 50%; right: auto; transform: translateX(-50%); }

/* ---------- Web bento ---------- */
.rdl-bento { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--rdl-web-bento-gap); }
.rdl-span-3 { grid-column: span 3; } .rdl-span-4 { grid-column: span 4; } .rdl-span-6 { grid-column: span 6; }
.rdl-span-8 { grid-column: span 8; } .rdl-span-9 { grid-column: span 9; } .rdl-span-12 { grid-column: span 12; }
/* One radius family per dashboard: every bento cell uses the card radius */
.rdl-bento > * { border-radius: var(--rdl-radius-card); }
.rdl-bento--ops { gap: var(--rdl-stack); }
.rdl-bento--ops > * { border-radius: var(--rdl-radius-sm); padding: var(--rdl-card-padding-sm); }
.rdl-bento--swiss { gap: 1px; background: var(--rdl-border-subtle); }
.rdl-bento--swiss > * { border-radius: 0; }

/* ---------- Metric tile: corner-anchored card ----------
   label TL · action TR · instrument middle · figure BL · context BR */
.rdl-metric {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto 1fr auto;
  grid-template-areas: "label action" "viz viz" "figure context";
  gap: var(--rdl-space-3) var(--rdl-stack-loose); min-height: 160px;
}
.rdl-metric__label { grid-area: label; align-self: center; font-size: 13px; line-height: 18px; font-weight: 500; color: var(--rdl-text-secondary); }
.rdl-metric__action { grid-area: action; }
.rdl-metric__viz { grid-area: viz; align-self: center; min-width: 0; }
.rdl-metric__figure { grid-area: figure; align-self: end; }
.rdl-metric:not(:has(.rdl-metric__context)) .rdl-metric__figure { grid-column: 1 / -1; }
.rdl-metric__context { grid-area: context; align-self: end; justify-self: end; text-align: right; }
.rdl-glass--dark .rdl-metric__label, .rdl-on-dark .rdl-metric__label { color: rgba(244,244,245,0.6); }

/* ---------- Status pill (escalations only): soft tint + same-hue dot + same-hue text ---------- */
.rdl-statuspill { display: inline-flex; align-items: center; gap: var(--rdl-space-1_5); height: var(--rdl-size-tag); padding: 0 var(--rdl-space-2); border-radius: var(--rdl-radius-pill);
  font-size: 12px; line-height: 16px; font-weight: 600; white-space: nowrap; background: var(--rdl-success-soft); color: var(--rdl-success-text); }
.rdl-statuspill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.rdl-statuspill--warn { background: var(--rdl-warning-soft); color: var(--rdl-warning-text); }
.rdl-statuspill--crit { background: var(--rdl-danger-soft); color: var(--rdl-danger-text); }
.rdl-statuspill--info { background: var(--rdl-info-soft); color: var(--rdl-info-text); }
.rdl-statuspill--idle { background: var(--rdl-fill-control); color: var(--rdl-text-secondary); }

/* ---------- Title tabs: "Data  Records" at one size, inactive in tertiary ---------- */
.rdl-titletabs { display: flex; gap: var(--rdl-stack-loose); }
.rdl-titletabs button { font: inherit; color: var(--rdl-text-tertiary); }
.rdl-titletabs button[aria-selected="true"] { color: var(--rdl-text-primary); }

/* ---------- Section header ---------- */
.rdl-section-head { align-items: center; margin: 0; }

/* ---------- Fields ---------- */
.rdl-field { display: flex; align-items: center; gap: var(--rdl-stack); height: var(--rdl-size-control-md); padding: 0 var(--rdl-space-4);
  border-radius: var(--rdl-radius-pill); background: var(--rdl-ctl); font-size: 15px; line-height: 22px; color: var(--rdl-text-primary); min-width: 0; }
.rdl-field__prefix { color: var(--rdl-text-secondary); }
.rdl-field__placeholder { color: var(--rdl-text-secondary); flex: 1; }
.rdl-field--lg { height: var(--rdl-size-control-lg); padding: 0 var(--rdl-space-5); }
.rdl-field--select { justify-content: space-between; }
.rdl-field--select::after { content: ""; width: 8px; height: 8px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: translateY(-2px) rotate(45deg); opacity: 0.6; flex: none; }
.rdl-field--glass { background: var(--rdl-glass-fill); border: 1px solid var(--rdl-glass-border); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
/* Prompt input: 64 pill with an inset 48 send orb */
.rdl-field--prompt { height: var(--rdl-size-control-xl); padding: 0 var(--rdl-space-2) 0 var(--rdl-space-5); }

/* ---------- Bottom sheet ---------- */
.rdl-sheet { position: relative; background: var(--rdl-bg-surface); border-radius: var(--rdl-radius-sheet) var(--rdl-radius-sheet) 0 0;
  padding: var(--rdl-space-6) var(--rdl-card-padding) var(--rdl-card-padding); --rdl-ctl: var(--rdl-fill-control); }
.rdl-sheet::before { content: ""; position: absolute; top: var(--rdl-stack); left: 50%; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: var(--rdl-border-strong); }

/* ---------- Key / value: value-first (ID cards, dashboards) ---------- */
.rdl-kv--value-first .v { order: -1; font-size: 17px; line-height: 22px; font-weight: 400; }
.rdl-kv--value-first .k { font-size: 13px; line-height: 18px; }

/* ---------- Skeleton (loading) ---------- */
.rdl-skeleton { border-radius: var(--rdl-radius-md); background: linear-gradient(90deg, var(--rdl-fill-control) 0%, var(--rdl-fill-control-hover) 50%, var(--rdl-fill-control) 100%) 0 0 / 200% 100%; animation: rdl-shimmer 1.2s linear infinite; }
@keyframes rdl-shimmer { to { background-position: -200% 0; } }

@media (prefers-reduced-transparency: reduce) {
  .rdl-field--glass { -webkit-backdrop-filter: none; backdrop-filter: none; background: var(--rdl-bg-surface); }
}

/* ---------- Surfaces (v3 additions) ---------- */
/* Emphasis surface (v3 "ink widget"): ink in light, one step up in dark, the inverse of the canvas in brand. */
.rdl-widget--ink, .rdl-card--emphasis {
  background: var(--rdl-bg-emphasis); color: var(--rdl-fg-on-emphasis);
  --rdl-ctl: color-mix(in srgb, var(--rdl-fg-on-emphasis) 10%, transparent);
  --rdl-text-primary: var(--rdl-fg-on-emphasis); --rdl-text-secondary: var(--rdl-fg-on-emphasis-secondary); --rdl-text-tertiary: var(--rdl-fg-on-emphasis-secondary);
  --rdl-tick: color-mix(in srgb, var(--rdl-fg-on-emphasis) 30%, transparent); --rdl-tick-strong: var(--rdl-fg-on-emphasis);
  --rdl-glass-fill: color-mix(in srgb, var(--rdl-fg-on-emphasis) 8%, transparent); --rdl-glass-fill-strong: color-mix(in srgb, var(--rdl-fg-on-emphasis) 14%, transparent);
  --rdl-glass-border: color-mix(in srgb, var(--rdl-fg-on-emphasis) 18%, transparent);
  --rdl-chart-track: color-mix(in srgb, var(--rdl-fg-on-emphasis) 14%, transparent);
}
.rdl-card--emphasis { border-radius: var(--rdl-radius-card); padding: var(--rdl-card-padding); }
/* Tinted glass sub-pane for use inside aura widgets (radius = widget − padding) */
.rdl-glass--tint { background: rgba(10,11,12,0.16); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.28); border-radius: var(--rdl-nest-r, var(--rdl-radius-lg)); padding: var(--rdl-space-3) var(--rdl-space-4); }

/* ---------- Text tiers over backdrops (never mid-gray on color) ---------- */
.rdl-on-light-aura { --rdl-text-secondary: rgba(10,11,12,0.68); --rdl-text-tertiary: rgba(10,11,12,0.52); color: #0A0B0C; }
.rdl-on-dark, .rdl-glass--dark { --rdl-text-secondary: rgba(244,244,245,0.68); --rdl-text-tertiary: rgba(244,244,245,0.5); --rdl-tick: rgba(244,244,245,0.3); }
.rdl-widget--ink .rdl-figure .rdl-unit, .rdl-on-dark .rdl-figure .rdl-unit { color: var(--rdl-text-secondary); }
/* Glass nested inside dark surfaces stays dark in both themes */
.rdl-glass--dark { --rdl-glass-fill: rgba(255,255,255,0.08); --rdl-glass-fill-strong: rgba(255,255,255,0.14); --rdl-glass-border: rgba(255,255,255,0.18); }

/* ---------- Web navigation and tables ---------- */
.rdl-nav { display: flex; gap: var(--rdl-space-1); padding: var(--rdl-space-1); border-radius: var(--rdl-radius-pill); background: var(--rdl-glass-fill); box-shadow: inset 0 0 0 1px var(--rdl-glass-border); }
.rdl-nav a { display: inline-flex; align-items: center; height: var(--rdl-size-control-sm); padding: 0 var(--rdl-space-4); border-radius: var(--rdl-radius-pill); font-size: 14px; font-weight: 500; color: var(--rdl-text-secondary); text-decoration: none; }
.rdl-nav a[aria-current="page"] { background: var(--rdl-fill-control-strong); color: var(--rdl-text-on-strong); }
.rdl-table { width: 100%; border-collapse: collapse; font-size: 14px; line-height: 18px; }
.rdl-table th { text-align: left; font-size: 12px; line-height: 16px; font-weight: 500; color: var(--rdl-text-secondary); padding: 0 0 var(--rdl-space-3); }
.rdl-table td { padding: var(--rdl-space-3) 0; border-top: 1px solid var(--rdl-border-subtle); font-weight: 500; }
.rdl-table .num { text-align: right; font-variant-numeric: tabular-nums; }
.rdl-logo { display: inline-flex; align-items: center; gap: var(--rdl-space-3); font-size: 17px; line-height: 22px; font-weight: 600; letter-spacing: -0.01em; }
.rdl-logo i { width: 32px; height: 32px; border-radius: 50%; background: var(--rdl-aura-gold); box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06); }
.rdl-spread { justify-content: space-between; }
.rdl-fill { flex: 1; min-width: 0; }

/* ---------- Concentric nesting (references/radius.md) ----------
   A · strict (default): inner radius = outer − gap, gap = padding + border → .rdl-nest
   B · soft (deep stacks with even bands): inner radius = outer − gap/2 → .rdl-nest--soft
   Each surface hands its direct children both values; wrappers pass them on by inheritance.
   Going deeper with A? Halve the gap: --host padding 12, then 8 → 4. Never clamp the radius up. */
.rdl-card > *                                { --rdl-nest-r: max(0px, calc(var(--rdl-radius-card) - var(--rdl-card-padding))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-card) - (var(--rdl-card-padding)) / 2)); }
.rdl-glass > *                               { --rdl-nest-r: max(0px, calc(var(--rdl-radius-card) - var(--rdl-card-padding) - 1px)); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-card) - (var(--rdl-card-padding) + 1px) / 2)); }
.rdl-widget > *                              { --rdl-nest-r: max(0px, calc(var(--rdl-radius-widget) - var(--rdl-card-padding))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-widget) - (var(--rdl-card-padding)) / 2)); }
.rdl-widget.rdl-glass > *                    { --rdl-nest-r: max(0px, calc(var(--rdl-radius-widget) - var(--rdl-card-padding) - 1px)); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-widget) - (var(--rdl-card-padding) + 1px) / 2)); }
.rdl-sheet > *                               { --rdl-nest-r: max(0px, calc(var(--rdl-radius-sheet) - var(--rdl-card-padding))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-sheet) - (var(--rdl-card-padding)) / 2)); }
.rdl-blueprint > *                           { --rdl-nest-r: max(0px, calc(var(--rdl-radius-lg) - var(--rdl-card-padding))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-lg) - (var(--rdl-card-padding)) / 2)); }
/* Host variant: a surface that holds nested panes halves its gap (20 → 12) so the panes keep real curves:
   card 28 → 16 · widget 40 → 28 · blueprint 20 → 8 */
.rdl-card--host, .rdl-glass--host, .rdl-widget--host, .rdl-blueprint--host { padding: var(--rdl-space-3); }
.rdl-card.rdl-card--host > *                 { --rdl-nest-r: max(0px, calc(var(--rdl-radius-card) - var(--rdl-space-3))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-card) - (var(--rdl-space-3)) / 2)); }
.rdl-glass.rdl-glass--host > *               { --rdl-nest-r: max(0px, calc(var(--rdl-radius-card) - var(--rdl-space-3) - 1px)); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-card) - (var(--rdl-space-3) + 1px) / 2)); }
.rdl-widget.rdl-widget--host > *             { --rdl-nest-r: max(0px, calc(var(--rdl-radius-widget) - var(--rdl-space-3))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-widget) - (var(--rdl-space-3)) / 2)); }
.rdl-widget.rdl-glass.rdl-widget--host > *   { --rdl-nest-r: max(0px, calc(var(--rdl-radius-widget) - var(--rdl-space-3) - 1px)); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-widget) - (var(--rdl-space-3) + 1px) / 2)); }
.rdl-blueprint.rdl-blueprint--host > *       { --rdl-nest-r: max(0px, calc(var(--rdl-radius-lg) - var(--rdl-space-3))); --rdl-nest-r-soft: max(0px, calc(var(--rdl-radius-lg) - (var(--rdl-space-3)) / 2)); }
.rdl-nest, .rdl-glass.rdl-nest, .rdl-card.rdl-nest, .rdl-widget.rdl-nest { border-radius: var(--rdl-nest-r, var(--rdl-radius-md)); }
.rdl-nest--soft, .rdl-glass.rdl-nest--soft, .rdl-card.rdl-nest--soft, .rdl-widget.rdl-nest--soft { border-radius: var(--rdl-nest-r-soft, var(--rdl-radius-md)); }
```

## Appendix G · `assets/ios/RDLComponents.swift`

SwiftUI base components.

```swift
// RDL Theme — SwiftUI base components.
// Depends on RDLTokens.swift (generated). Drop both files into your app target.
// Every component reads semantic roles (RDLColor) and the injected accent (`.rdlAccent(...)`),
// so light/dark and accent-pack switching need no per-screen code.

import SwiftUI

// MARK: - Surfaces

public enum RDLCardTone { case surface, muted, hero, accent }

public struct RDLCard: ViewModifier {
    @Environment(\.rdlAccent) private var accent
    var tone: RDLCardTone = .surface
    var radius: CGFloat = RDLRadius.xl
    var padding: CGFloat = RDLSpace.cardPadding

    public func body(content: Content) -> some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(foreground)
            .background(background, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
    }

    private var background: Color {
        switch tone {
        case .surface: RDLColor.bgSurface
        case .muted: RDLColor.bgSurfaceMuted
        case .hero: RDLColor.bgHero
        case .accent: accent.accent
        }
    }

    private var foreground: Color {
        switch tone {
        case .surface, .muted: RDLColor.textPrimary
        case .hero: RDLColor.textOnHero
        case .accent: accent.onAccent
        }
    }
}

public extension View {
    /// White card on the gray canvas — RDL separates by fill contrast, not borders or heavy shadows.
    func rdlCard(_ tone: RDLCardTone = .surface, radius: CGFloat = RDLRadius.xl, padding: CGFloat = RDLSpace.cardPadding) -> some View {
        modifier(RDLCard(tone: tone, radius: radius, padding: padding))
    }
}

// MARK: - Buttons

public enum RDLButtonKind { case primary, accent, secondary, ghost }

/// Pill buttons. Primary = ink fill, Accent = brand accent, Secondary = control fill.
public struct RDLButtonStyle: ButtonStyle {
    @Environment(\.rdlAccent) private var accent
    @Environment(\.isEnabled) private var isEnabled
    var kind: RDLButtonKind = .primary
    var height: CGFloat = RDLSize.controlLg

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .rdlType(RDLType.bodyStrong)
            .frame(maxWidth: .infinity, minHeight: height)
            .padding(.horizontal, RDLSpace.s6)
            .foregroundStyle(fg)
            .background(bg, in: Capsule())
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(isEnabled ? 1 : 0.4)
            .animation(RDLMotion.spring, value: configuration.isPressed)
    }

    private var bg: Color {
        switch kind {
        case .primary: RDLColor.fillControlStrong
        case .accent: accent.accent
        case .secondary: RDLColor.fillControl
        case .ghost: .clear
        }
    }

    private var fg: Color {
        switch kind {
        case .primary: RDLColor.textOnStrong
        case .accent: accent.onAccent
        case .secondary, .ghost: RDLColor.textPrimary
        }
    }
}

public extension ButtonStyle where Self == RDLButtonStyle {
    static func rdl(_ kind: RDLButtonKind = .primary, height: CGFloat = RDLSize.controlLg) -> RDLButtonStyle {
        RDLButtonStyle(kind: kind, height: height)
    }
}

/// Circular icon button (back, bell, more). 44pt, control fill.
public struct RDLIconButton: View {
    let systemName: String
    var onHero = false
    let action: () -> Void

    public init(_ systemName: String, onHero: Bool = false, action: @escaping () -> Void) {
        self.systemName = systemName
        self.onHero = onHero
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 17, weight: .medium))
                .frame(width: RDLSize.iconButton, height: RDLSize.iconButton)
                .foregroundStyle(onHero ? RDLColor.textOnHero : RDLColor.textPrimary)
                .background(onHero ? RDLColor.bgHeroRaised : RDLColor.fillControl, in: Circle())
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Money / big numbers

/// "$24,560.<muted>00</muted>" — big medium-weight figure with de-emphasised decimals.
public struct RDLAmount: View {
    let value: Decimal
    var currency = "USD"
    var style: RDLTextStyle = RDLType.display
    var mutedColor: Color = RDLColor.textSecondary

    public init(_ value: Decimal, currency: String = "USD", style: RDLTextStyle = RDLType.display, mutedColor: Color = RDLColor.textSecondary) {
        self.value = value
        self.currency = currency
        self.style = style
        self.mutedColor = mutedColor
    }

    public var body: some View {
        let formatted = value.formatted(.currency(code: currency).precision(.fractionLength(2)))
        let parts = formatted.split(separator: Locale.current.decimalSeparator?.first ?? ".", maxSplits: 1)
        let decimals = parts.count > 1 ? "\(Locale.current.decimalSeparator ?? ".")\(parts[1])" : ""
        return (Text(String(parts.first ?? ""))
            + Text(decimals).font(.system(size: style.size * 0.55, weight: style.weight)).foregroundColor(mutedColor))
            .rdlType(style)
            .monospacedDigit()
            .contentTransition(.numericText())
    }
}

/// Small pill showing a delta: ↑ 12.4% (success) / ↓ 3.1% (danger).
public struct RDLDeltaPill: View {
    let percent: Double
    public init(_ percent: Double) { self.percent = percent }

    public var body: some View {
        let up = percent >= 0
        Label(String(format: "%.1f%%", abs(percent)), systemImage: up ? "arrow.up.right" : "arrow.down.right")
            .rdlType(RDLType.caption)
            .padding(.horizontal, RDLSpace.s2)
            .frame(height: 24)
            .foregroundStyle(up ? RDLColor.successText : RDLColor.dangerText)
            .background(up ? RDLColor.successSoft : RDLColor.dangerSoft, in: Capsule())
    }
}

// MARK: - Segmented pill tabs (Week / Month / Year)

public struct RDLSegmented<T: Hashable>: View {
    let options: [T]
    let title: (T) -> String
    @Binding var selection: T
    @Namespace private var ns

    public init(_ options: [T], selection: Binding<T>, title: @escaping (T) -> String) {
        self.options = options
        self._selection = selection
        self.title = title
    }

    public var body: some View {
        HStack(spacing: 4) {
            ForEach(options, id: \.self) { option in
                let active = option == selection
                Text(title(option))
                    .rdlType(RDLType.label)
                    .foregroundStyle(active ? RDLColor.textOnStrong : RDLColor.textSecondary)
                    .frame(maxWidth: .infinity, minHeight: RDLSize.controlSm)
                    .background {
                        if active { Capsule().fill(RDLColor.fillControlStrong).matchedGeometryEffect(id: "pill", in: ns) }
                    }
                    .contentShape(Capsule())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = option } }
            }
        }
        .padding(4)
        .background(RDLColor.fillControl, in: Capsule())
    }
}

// MARK: - Bar chart with highlighted bar + hatched history

public struct RDLBarDatum: Identifiable {
    public let id = UUID()
    public let label: String
    public let value: Double
    public init(_ label: String, _ value: Double) { self.label = label; self.value = value }
}

public struct RDLBarChart: View {
    @Environment(\.rdlAccent) private var accent
    let data: [RDLBarDatum]
    var highlighted: Int?
    var height: CGFloat = 160
    @State private var appeared = false

    public init(_ data: [RDLBarDatum], highlighted: Int? = nil, height: CGFloat = 160) {
        self.data = data
        self.highlighted = highlighted
        self.height = height
    }

    public var body: some View {
        let maxV = max(data.map(\.value).max() ?? 1, 0.0001)
        HStack(alignment: .bottom, spacing: 8) {
            ForEach(Array(data.enumerated()), id: \.element.id) { i, d in
                VStack(spacing: 8) {
                    ZStack(alignment: .bottom) {
                        Capsule().fill(RDLColor.chartTrack)
                        Group {
                            if i == highlighted {
                                Capsule().fill(accent.accent)
                            } else {
                                Capsule().fill(RDLColor.chartMuted)
                                    .overlay(RDLHatch().stroke(RDLColor.chartHatch, lineWidth: 1).clipShape(Capsule()))
                            }
                        }
                        .frame(height: appeared ? height * d.value / maxV : 0)
                        .animation(RDLMotion.spring.delay(Double(i) * RDLMotion.stagger), value: appeared)
                    }
                    .frame(height: height)
                    Text(d.label)
                        .rdlType(RDLType.caption)
                        .foregroundStyle(i == highlighted ? RDLColor.textPrimary : RDLColor.textTertiary)
                }
            }
        }
        .onAppear { appeared = true }
        .accessibilityElement(children: .combine)
    }
}

/// 45° diagonal hatch — the RDL signature for "past / projected / inactive" data.
public struct RDLHatch: Shape {
    var spacing: CGFloat = 6
    public func path(in rect: CGRect) -> Path {
        var p = Path()
        var x = -rect.height
        while x < rect.width {
            p.move(to: CGPoint(x: x, y: rect.maxY))
            p.addLine(to: CGPoint(x: x + rect.height, y: rect.minY))
            x += spacing
        }
        return p
    }
}

// MARK: - Semi-circle gauge (credit score, goals, portfolio health)

public struct RDLGauge: View {
    @Environment(\.rdlAccent) private var accent
    let progress: Double // 0...1
    var lineWidth: CGFloat = 14

    public init(progress: Double, lineWidth: CGFloat = 14) {
        self.progress = progress
        self.lineWidth = lineWidth
    }

    public var body: some View {
        // Top half of a circle whose centre sits on the bottom edge of a 2:1 frame.
        GeometryReader { geo in
            let d = geo.size.width - lineWidth
            ZStack {
                Circle().trim(from: 0.5, to: 1)
                    .stroke(RDLColor.chartTrack, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                Circle().trim(from: 0.5, to: 0.5 + 0.5 * min(max(progress, 0), 1))
                    .stroke(accent.accent, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                    .animation(RDLMotion.spring, value: progress)
            }
            .frame(width: d, height: d)
            .position(x: geo.size.width / 2, y: geo.size.height)
        }
        .aspectRatio(2, contentMode: .fit)
    }
}

// MARK: - List row (transactions, activity, holdings)

public struct RDLListRow<Leading: View>: View {
    let title: String
    let subtitle: String
    let trailing: String
    var trailingSub: String?
    var trailingPositive: Bool?
    @ViewBuilder let leading: () -> Leading

    public init(title: String, subtitle: String, trailing: String, trailingSub: String? = nil, trailingPositive: Bool? = nil, @ViewBuilder leading: @escaping () -> Leading) {
        self.title = title
        self.subtitle = subtitle
        self.trailing = trailing
        self.trailingSub = trailingSub
        self.trailingPositive = trailingPositive
        self.leading = leading
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s3) {
            leading()
                .frame(width: RDLSize.avatarMd, height: RDLSize.avatarMd)
                .background(RDLColor.fillControl, in: Circle())
            VStack(alignment: .leading, spacing: 2) {
                Text(title).rdlType(RDLType.bodyStrong).foregroundStyle(RDLColor.textPrimary)
                Text(subtitle).rdlType(RDLType.caption).foregroundStyle(RDLColor.textSecondary)
            }
            Spacer(minLength: RDLSpace.s2)
            VStack(alignment: .trailing, spacing: 2) {
                Text(trailing).rdlType(RDLType.bodyStrong).monospacedDigit()
                    .foregroundStyle(trailingPositive == true ? RDLColor.successText : RDLColor.textPrimary)
                if let trailingSub {
                    Text(trailingSub).rdlType(RDLType.caption).foregroundStyle(RDLColor.textSecondary)
                }
            }
        }
        .padding(.vertical, RDLSpace.s2)
    }
}

// MARK: - Floating tab bar

public struct RDLTabItem: Identifiable, Hashable {
    public let id: String
    public let systemImage: String
    public init(_ id: String, systemImage: String) { self.id = id; self.systemImage = systemImage }
}

/// Dark floating capsule; active item sits in an accent circle. Overlay at the bottom of a ZStack.
public struct RDLFloatingTabBar: View {
    @Environment(\.rdlAccent) private var accent
    let items: [RDLTabItem]
    @Binding var selection: String
    @Namespace private var ns

    public init(_ items: [RDLTabItem], selection: Binding<String>) {
        self.items = items
        self._selection = selection
    }

    public var body: some View {
        HStack(spacing: 0) {
            ForEach(items) { item in
                let active = item.id == selection
                Image(systemName: item.systemImage)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundStyle(active ? accent.onAccent : RDLColor.textOnHeroMuted)
                    .frame(width: 48, height: 48)
                    .background {
                        if active { Circle().fill(accent.accent).matchedGeometryEffect(id: "tab", in: ns) }
                    }
                    .frame(maxWidth: .infinity)
                    .contentShape(Rectangle())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = item.id } }
                    .accessibilityLabel(item.id)
                    .accessibilityAddTraits(active ? .isSelected : [])
            }
        }
        .padding(8)
        .frame(height: RDLSize.tabBar + 8)
        .background(RDLColor.bgHero, in: Capsule())
        .shadow(color: .black.opacity(0.24), radius: 20, y: 16)
        .padding(.horizontal, RDLSpace.mobileGutter)
    }
}

// MARK: - Chip

public struct RDLChip: View {
    @Environment(\.rdlAccent) private var accent
    let title: String
    var selected = false

    public init(_ title: String, selected: Bool = false) {
        self.title = title
        self.selected = selected
    }

    public var body: some View {
        Text(title)
            .rdlType(RDLType.label)
            .padding(.horizontal, RDLSpace.s4)
            .frame(height: RDLSize.controlSm)
            .foregroundStyle(selected ? RDLColor.textOnStrong : RDLColor.textPrimary)
            .background(selected ? RDLColor.fillControlStrong : RDLColor.fillControl, in: Capsule())
    }
}
```

## Appendix H · `assets/ios/RDLGlassComponents.swift`

SwiftUI glass components.

```swift
// RDL Theme — V2 glass components (SwiftUI, iOS 17+).
// Depends on RDLTokens.swift (generated). Pairs with the "V2" section of rdl-components.css.
// Bundle Urbanist (and optionally Doto) for exact web parity; everything falls back to the system font.

import SwiftUI

// MARK: - Surface style (glass default, flat = v1 look)

public enum RDLSurfaceStyle { case glass, flat }
private struct RDLSurfaceStyleKey: EnvironmentKey { static let defaultValue = RDLSurfaceStyle.glass }
public extension EnvironmentValues {
    var rdlSurfaceStyle: RDLSurfaceStyle { get { self[RDLSurfaceStyleKey.self] } set { self[RDLSurfaceStyleKey.self] = newValue } }
}
public extension View {
    func rdlSurfaceStyle(_ style: RDLSurfaceStyle) -> some View { environment(\.rdlSurfaceStyle, style) }
}

// MARK: - Glass

public enum RDLGlassTone { case light, dark }

public struct RDLGlassModifier: ViewModifier {
    @Environment(\.rdlSurfaceStyle) private var style
    @Environment(\.colorScheme) private var scheme
    var tone: RDLGlassTone?
    var radius: CGFloat
    var padding: CGFloat
    var iridescent: Bool

    public func body(content: Content) -> some View {
        let dark = (tone ?? (scheme == .dark ? .dark : .light)) == .dark
        let shape = RoundedRectangle(cornerRadius: radius, style: .continuous)
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(dark ? Color.white : RDLColor.glassText)
            .background {
                if style == .flat {
                    shape.fill(dark ? RDLPalette.stone900 : RDLColor.bgSurface)
                } else {
                    shape.fill(dark ? .ultraThinMaterial : .regularMaterial)
                        .environment(\.colorScheme, dark ? .dark : .light)
                        .overlay(shape.fill(dark ? Color.black.opacity(0.28) : Color.white.opacity(0.35)))
                }
            }
            .overlay {
                if style == .glass {
                    shape.strokeBorder(
                        iridescent
                            ? AnyShapeStyle(AngularGradient(colors: [.pink.opacity(0.6), .cyan.opacity(0.6), .green.opacity(0.45), .yellow.opacity(0.5), .pink.opacity(0.6)], center: .center))
                            : AnyShapeStyle(LinearGradient(colors: [.white.opacity(dark ? 0.22 : 0.9), .white.opacity(dark ? 0.04 : 0.2)], startPoint: .topLeading, endPoint: .bottomTrailing)),
                        lineWidth: 1)
                }
            }
            .shadow(color: .black.opacity(style == .glass ? (dark ? 0.35 : 0.10) : 0), radius: 24, y: 16)
    }
}

public extension View {
    /// Frosted card. `tone: nil` follows the color scheme; force `.dark` over photos and auras.
    func rdlGlass(_ tone: RDLGlassTone? = nil, radius: CGFloat = RDLRadius.card, padding: CGFloat = RDLSpace.cardPadding, iridescent: Bool = false) -> some View {
        modifier(RDLGlassModifier(tone: tone, radius: radius, padding: padding, iridescent: iridescent))
    }

    /// Widget squircle filled with an aura gradient.
    func rdlAura<S: ShapeStyle>(_ fill: S, radius: CGFloat = RDLRadius.widget, padding: CGFloat = RDLSpace.s5) -> some View {
        self.padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(fill, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
    }

    /// Electric-blue blueprint card with white content.
    func rdlBlueprint(padding: CGFloat = RDLSpace.s5) -> some View {
        self.padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(.white)
            .background(RDLPalette.electric500, in: RoundedRectangle(cornerRadius: RDLRadius.lg, style: .continuous))
    }
}

// MARK: - Figure: big light number + small muted unit

/// `RDLFigure("84.2", unit: "kW")`, `RDLFigure("4,82,190", currency: "₹", unit: ".36")`,
/// `RDLFigure("321", lead: "0.00", unit: "BNB")` (lead = de-emphasised leading zeros).
public struct RDLFigure: View {
    let value: String
    var currency: String?
    var lead: String?
    var unit: String?
    var size: CGFloat
    var dotMatrix: Bool

    public init(_ value: String, currency: String? = nil, lead: String? = nil, unit: String? = nil, size: CGFloat = RDLType.display.size, dotMatrix: Bool = false) {
        self.value = value
        self.currency = currency
        self.lead = lead
        self.unit = unit
        self.size = size
        self.dotMatrix = dotMatrix
    }

    public var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: size * 0.06) {
            if let currency {
                Text(currency).font(.system(size: size * RDLType.unitScale)).foregroundStyle(.secondary)
                    .alignmentGuide(.firstTextBaseline) { d in d[.firstTextBaseline] + size * 0.45 }
            }
            if dotMatrix {
                RDLDotMatrixText(value, dot: max(2, size / 14))
            } else {
                (Text(lead ?? "").foregroundColor(Color.secondary.opacity(0.6)) + Text(value))
                    .font(RDLTextStyle(size: size, lineHeight: size, weight: .light, tracking: 0).font)
                    .tracking(-size * 0.03)
                    .monospacedDigit()
                    .contentTransition(.numericText())
            }
            if let unit {
                Text(unit).font(.system(size: size * RDLType.unitScale)).foregroundStyle(.secondary)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Dot-matrix numerals (no font dependency)

/// Renders digits, '.', '%', '+', '-' as a 5×7 LED dot matrix — the board's signature numeral.
public struct RDLDotMatrixText: View {
    let text: String
    var dot: CGFloat
    var gap: CGFloat { dot * 0.45 }

    public init(_ text: String, dot: CGFloat = 4) {
        self.text = text
        self.dot = dot
    }

    private static let glyphs: [Character: [String]] = [
        "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
        "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
        "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
        "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
        "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
        "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
        "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
        "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
        "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
        "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
        ".": ["0", "0", "0", "0", "0", "0", "1"],
        "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
        "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
        "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
        " ": ["00", "00", "00", "00", "00", "00", "00"],
    ]

    public var body: some View {
        let chars = Array(text)
        let cols = chars.map { (Self.glyphs[$0] ?? Self.glyphs[" "]!)[0].count }
        let step = dot + gap
        let width = CGFloat(cols.reduce(0, +)) * step + CGFloat(max(chars.count - 1, 0)) * step
        Canvas { ctx, _ in
            var x: CGFloat = 0
            for (i, ch) in chars.enumerated() {
                let rows = Self.glyphs[ch] ?? Self.glyphs[" "]!
                for (r, row) in rows.enumerated() {
                    for (c, bit) in row.enumerated() where bit == "1" {
                        let rect = CGRect(x: x + CGFloat(c) * step, y: CGFloat(r) * step, width: dot, height: dot)
                        ctx.fill(Path(roundedRect: rect, cornerRadius: dot * 0.2), with: .foreground)
                    }
                }
                x += CGFloat(cols[i]) * step + step
            }
        }
        .frame(width: width, height: 7 * step)
        .accessibilityLabel(text)
    }
}

// MARK: - Orbs, action row, slide to confirm

public enum RDLOrbKind { case glass, solid, white, accent, outline }

public struct RDLOrb: View {
    @Environment(\.rdlAccent) private var accent
    let systemName: String
    var kind: RDLOrbKind = .glass
    var size: CGFloat = RDLSize.orb
    let action: () -> Void

    public init(_ systemName: String, kind: RDLOrbKind = .glass, size: CGFloat = RDLSize.orb, action: @escaping () -> Void) {
        self.systemName = systemName
        self.kind = kind
        self.size = size
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: size * 0.38, weight: .medium))
                .frame(width: size, height: size)
                .foregroundStyle(fg)
                .background { bg }
                .clipShape(Circle())
                .overlay(Circle().strokeBorder(kind == .outline ? RDLColor.borderStrong : (kind == .glass ? Color.white.opacity(0.6) : .clear), lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    @ViewBuilder private var bg: some View {
        switch kind {
        case .glass: Circle().fill(.ultraThinMaterial)
        case .solid: Circle().fill(RDLColor.fillControlStrong)
        case .white: Circle().fill(Color.white)
        case .accent: Circle().fill(accent.accent)
        case .outline: Circle().fill(Color.clear)
        }
    }

    private var fg: Color {
        switch kind {
        case .solid: RDLColor.textOnStrong
        case .white: .black
        case .accent: accent.onAccent
        default: RDLColor.textPrimary
        }
    }
}

/// ← [ Primary action ] →   — the board's most common bottom action layout.
public struct RDLActionRow: View {
    let title: String
    let leading: String
    let trailing: String
    var onLeading: () -> Void = {}
    var onPrimary: () -> Void = {}
    var onTrailing: () -> Void = {}

    public init(_ title: String, leading: String, trailing: String, onLeading: @escaping () -> Void = {}, onPrimary: @escaping () -> Void = {}, onTrailing: @escaping () -> Void = {}) {
        self.title = title
        self.leading = leading
        self.trailing = trailing
        self.onLeading = onLeading
        self.onPrimary = onPrimary
        self.onTrailing = onTrailing
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s2) {
            RDLOrb(leading, size: RDLSize.controlLg, action: onLeading)
            Button(title, action: onPrimary).buttonStyle(.rdl(.primary))
            RDLOrb(trailing, size: RDLSize.controlLg, action: onTrailing)
        }
    }
}

/// Slide-to-confirm pill for money movement (buy, convert, pay).
public struct RDLSlideToConfirm: View {
    @Environment(\.rdlAccent) private var accent
    let title: String
    let onConfirm: () -> Void
    @State private var offset: CGFloat = 0
    @State private var done = false

    public init(_ title: String, onConfirm: @escaping () -> Void) {
        self.title = title
        self.onConfirm = onConfirm
    }

    public var body: some View {
        GeometryReader { geo in
            let knob: CGFloat = RDLSize.slideKnob
            let maxX = geo.size.width - knob - 12
            ZStack(alignment: .leading) {
                Capsule().fill(.ultraThinMaterial).overlay(Capsule().strokeBorder(Color.white.opacity(0.25)))
                HStack {
                    Spacer()
                    Text(done ? "Confirmed" : title).rdlType(RDLType.bodyStrong)
                    Spacer()
                    Text("›››").opacity(0.45).padding(.trailing, 18)
                }
                .opacity(1 - Double(offset / max(maxX, 1)) * 0.8)
                Circle().fill(accent.accent)
                    .overlay(Image(systemName: done ? "checkmark" : "arrow.right").foregroundStyle(accent.onAccent))
                    .frame(width: knob, height: knob)
                    .offset(x: 6 + offset)
                    .gesture(DragGesture()
                        .onChanged { g in if !done { offset = min(max(0, g.translation.width), maxX) } }
                        .onEnded { _ in
                            if offset > maxX * 0.85 {
                                withAnimation(RDLMotion.spring) { offset = maxX; done = true }
                                onConfirm()
                            } else {
                                withAnimation(RDLMotion.spring) { offset = 0 }
                            }
                        })
            }
        }
        .frame(height: RDLSize.slide)
        .accessibilityElement()
        .accessibilityLabel(title)
        .accessibilityAddTraits(.isButton)
        .accessibilityAction { done = true; onConfirm() }
    }
}

// MARK: - Status dot, key/value

public enum RDLStatusKind { case ok, warn, crit, info, idle }

public struct RDLStatus: View {
    let title: String
    var kind: RDLStatusKind = .ok

    public init(_ title: String, kind: RDLStatusKind = .ok) {
        self.title = title
        self.kind = kind
    }

    public var body: some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 7, height: 7)
                .background(Circle().fill(color.opacity(0.22)).frame(width: 13, height: 13))
            Text(title).rdlType(RDLType.label)
        }
    }

    private var color: Color {
        switch kind {
        case .ok: RDLPalette.signal400
        case .warn: RDLPalette.amber500
        case .crit: RDLPalette.red500
        case .info: RDLPalette.electric400
        case .idle: RDLPalette.stone400
        }
    }
}

public enum RDLKeyValueLayout { case stacked, row, leader }

public struct RDLKeyValue: View {
    let key: String
    let value: String
    var layout: RDLKeyValueLayout = .stacked

    public init(_ key: String, _ value: String, layout: RDLKeyValueLayout = .stacked) {
        self.key = key
        self.value = value
        self.layout = layout
    }

    public var body: some View {
        switch layout {
        case .stacked:
            VStack(alignment: .leading, spacing: 2) {
                Text(key).rdlType(RDLType.caption).foregroundStyle(.secondary)
                Text(value).rdlType(RDLType.bodyStrong).monospacedDigit()
            }
        case .row, .leader:
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(key).rdlType(RDLType.caption).foregroundStyle(.secondary)
                if layout == .leader {
                    Line().stroke(style: StrokeStyle(lineWidth: 1, dash: [1, 3])).foregroundStyle(RDLColor.tick).frame(height: 1)
                } else {
                    Spacer()
                }
                Text(value).rdlType(RDLType.bodyStrong).monospacedDigit()
            }
        }
    }

    private struct Line: Shape {
        func path(in rect: CGRect) -> Path { Path { p in p.move(to: CGPoint(x: 0, y: rect.midY)); p.addLine(to: CGPoint(x: rect.maxX, y: rect.midY)) } }
    }
}

// MARK: - Instruments

/// Tick ruler with an accent needle. `value` 0...1.
public struct RDLTickRuler: View {
    @Environment(\.rdlAccent) private var accent
    var value: Double
    var minor: CGFloat = 6
    var majorEvery = 5

    public init(value: Double, minor: CGFloat = 6, majorEvery: Int = 5) {
        self.value = value
        self.minor = minor
        self.majorEvery = majorEvery
    }

    public var body: some View {
        Canvas { ctx, size in
            var i = 0
            var x: CGFloat = 0
            while x <= size.width {
                let h: CGFloat = i % majorEvery == 0 ? 18 : 10
                ctx.fill(Path(CGRect(x: x, y: size.height - h, width: 1, height: h)), with: .color(RDLColor.tick))
                x += minor
                i += 1
            }
            let nx = size.width * min(max(value, 0), 1)
            ctx.fill(Path(roundedRect: CGRect(x: nx - 1, y: 0, width: 2, height: size.height), cornerRadius: 1), with: .color(accent.accent))
        }
        .frame(height: 28)
        .animation(RDLMotion.spring, value: value)
        .accessibilityValue("\(Int(value * 100)) percent")
    }
}

/// 2pt progress line with label and value — used for sensor/metric rows.
public struct RDLMeter: View {
    @Environment(\.rdlAccent) private var accent
    let label: String
    let value: String
    let progress: Double
    var color: Color?

    public init(_ label: String, value: String, progress: Double, color: Color? = nil) {
        self.label = label
        self.value = value
        self.progress = progress
        self.color = color
    }

    public var body: some View {
        VStack(spacing: 6) {
            HStack { Text(label).foregroundStyle(.secondary); Spacer(); Text(value).monospacedDigit() }
                .rdlType(RDLType.label)
            GeometryReader { g in
                Capsule().fill(RDLColor.chartTrack)
                    .overlay(alignment: .leading) { Capsule().fill(color ?? accent.accent).frame(width: g.size.width * min(max(progress, 0), 1)) }
            }
            .frame(height: 2)
        }
    }
}

/// Month grid of instalments (SIP / EMI / loan history).
public enum RDLInstalment { case paid, missed, current, upcoming }

public struct RDLMonthGrid: View {
    @Environment(\.rdlAccent) private var accent
    let months: [(label: String, state: RDLInstalment)]

    public init(_ months: [(label: String, state: RDLInstalment)]) { self.months = months }

    public var body: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 6), count: 6), spacing: 6) {
            ForEach(Array(months.enumerated()), id: \.offset) { _, m in
                VStack(spacing: 8) {
                    Text(m.label).rdlType(RDLType.caption).foregroundStyle(m.state == .current ? Color.primary : Color.secondary)
                    marker(m.state)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(RDLColor.fillControl, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).strokeBorder(m.state == .current ? accent.accent : .clear, lineWidth: 1.5))
                .accessibilityElement(children: .ignore)
                .accessibilityLabel("\(m.label): \(String(describing: m.state))")
            }
        }
    }

    @ViewBuilder private func marker(_ s: RDLInstalment) -> some View {
        switch s {
        case .paid: Image(systemName: "checkmark").font(.system(size: 10, weight: .bold)).foregroundStyle(accent.onAccent).frame(width: 20, height: 20).background(accent.accent, in: Circle())
        case .missed: Image(systemName: "xmark").font(.system(size: 9, weight: .bold)).foregroundStyle(.white).frame(width: 20, height: 20).background(RDLPalette.stone300, in: Circle())
        case .current, .upcoming: Circle().strokeBorder(style: StrokeStyle(lineWidth: 1, dash: [2, 2])).foregroundStyle(RDLColor.borderStrong).frame(width: 20, height: 20)
        }
    }
}

/// Bottom glass dock (replaces the v1 dark tab bar in glass style).
public struct RDLDock: View {
    @Environment(\.rdlAccent) private var accent
    let items: [RDLTabItem]
    @Binding var selection: String
    var accentActive = true
    @Namespace private var ns

    public init(_ items: [RDLTabItem], selection: Binding<String>, accentActive: Bool = true) {
        self.items = items
        self._selection = selection
        self.accentActive = accentActive
    }

    public var body: some View {
        HStack(spacing: 6) {
            ForEach(items) { item in
                let active = item.id == selection
                Image(systemName: item.systemImage)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundStyle(active ? (accentActive ? accent.onAccent : RDLColor.textOnStrong) : RDLColor.textPrimary.opacity(0.7))
                    .frame(width: RDLSize.dockItem, height: RDLSize.dockItem)
                    .background {
                        if active { Circle().fill(accentActive ? accent.accent : RDLColor.fillControlStrong).matchedGeometryEffect(id: "dock", in: ns) }
                    }
                    .contentShape(Circle())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = item.id } }
                    .accessibilityLabel(item.id)
                    .accessibilityAddTraits(active ? .isSelected : [])
            }
        }
        .padding(6)
        .background(.ultraThinMaterial, in: Capsule())
        .overlay(Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
        .shadow(color: .black.opacity(0.12), radius: 24, y: 14)
    }
}
```

## Appendix I · `assets/ios/RDLLayout.swift`

SwiftUI layout primitives, metric tile, fields, sheet, radius helpers.

```swift
// RDL Theme · v3 layout primitives and structural components.
// Requires RDLTokens.swift (generated), RDLComponents.swift and RDLGlassComponents.swift. iOS 17+.
//
// Layout recipe (references/layout.md):
//   RDLScreen(pinned: { RDLActionRow(…) }) {
//       RDLHeader(leading: …, title: "Buy gold", trailing: …)   // every item 48
//       …content…                                               // title-gap 24 after the header
//   }
// Spacing is semantic: stackTight 4 · stack 8 · cardGap 12 · stackLoose 16 · titleGap 24 · sectionGap 32.
import SwiftUI

// MARK: - Screen skeleton

/// Mobile screen: 20 margins, 8 below the status bar, header → content at `titleGap`,
/// scrolling content that keeps `bottomZone` clear, and an optional pinned zone 34 above the home indicator.
public struct RDLScreen<Content: View, Pinned: View>: View {
    let spacing: CGFloat
    let content: Content
    let pinned: Pinned

    public init(spacing: CGFloat = RDLSpace.titleGap, @ViewBuilder content: () -> Content, @ViewBuilder pinned: () -> Pinned) {
        self.spacing = spacing
        self.content = content()
        self.pinned = pinned()
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: spacing) { content }
                .padding(.horizontal, RDLSpace.mobileGutter)
                .padding(.top, RDLSpace.headerTop)
                .padding(.bottom, Pinned.self == EmptyView.self ? RDLSpace.sectionGap : RDLSpace.bottomZone)
        }
        .scrollIndicators(.hidden)
        .overlay(alignment: .bottom) {
            pinned
                .padding(.horizontal, RDLSpace.mobileGutter)
                .padding(.bottom, RDLSpace.s2) // safe area already adds the 34 home-indicator inset
        }
    }
}

public extension RDLScreen where Pinned == EmptyView {
    init(spacing: CGFloat = RDLSpace.titleGap, @ViewBuilder content: () -> Content) {
        self.init(spacing: spacing, content: content, pinned: { EmptyView() })
    }
}

/// Header row: leading · centred title · trailing. Every control in it is `headerHeight` (48).
public struct RDLHeader<Leading: View, Trailing: View>: View {
    let title: String?
    let leading: Leading
    let trailing: Trailing

    public init(title: String? = nil, @ViewBuilder leading: () -> Leading, @ViewBuilder trailing: () -> Trailing) {
        self.title = title
        self.leading = leading()
        self.trailing = trailing()
    }

    public var body: some View {
        ZStack {
            if let title { Text(title).rdlType(RDLType.title) }
            HStack(spacing: RDLSpace.stack) {
                leading
                Spacer(minLength: RDLSpace.stack)
                HStack(spacing: RDLSpace.stack) { trailing }
            }
        }
        .frame(height: RDLSpace.headerHeight)
    }
}

// MARK: - Metric tile (corner-anchored)

/// The canonical RDL card: label top-left · action top-right · instrument middle · figure bottom-left · context bottom-right.
public struct RDLMetricTile<Action: View, Viz: View, Figure: View, Context: View>: View {
    let label: String
    let action: Action
    let viz: Viz
    let figure: Figure
    let context: Context
    var minHeight: CGFloat = 160

    public init(_ label: String, minHeight: CGFloat = 160,
                @ViewBuilder action: () -> Action = { EmptyView() },
                @ViewBuilder viz: () -> Viz = { EmptyView() },
                @ViewBuilder figure: () -> Figure,
                @ViewBuilder context: () -> Context = { EmptyView() }) {
        self.label = label
        self.minHeight = minHeight
        self.action = action()
        self.viz = viz()
        self.figure = figure()
        self.context = context()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: RDLSpace.s3) {
            HStack(alignment: .center, spacing: RDLSpace.stackLoose) {
                Text(label).rdlType(RDLType.meta).foregroundStyle(RDLColor.textSecondary)
                Spacer(minLength: 0)
                action
            }
            Spacer(minLength: 0)
            viz.frame(maxWidth: .infinity, alignment: .leading)
            Spacer(minLength: 0)
            HStack(alignment: .lastTextBaseline, spacing: RDLSpace.stackLoose) {
                figure
                Spacer(minLength: 0)
                context
            }
        }
        .frame(maxWidth: .infinity, minHeight: minHeight, alignment: .topLeading)
    }
}

// MARK: - Status pill (escalations only)

/// Soft tint + same-hue dot + same-hue text. Use `RDLStatus` (dot + word) for ordinary state.
public struct RDLStatusPill: View {
    let text: String
    let kind: RDLStatusKind

    public init(_ text: String, kind: RDLStatusKind = .crit) {
        self.text = text
        self.kind = kind
    }

    private var colors: (fg: Color, bg: Color) {
        switch kind {
        case .ok: (RDLColor.successText, RDLColor.successSoft)
        case .warn: (RDLColor.warningText, RDLColor.warningSoft)
        case .crit: (RDLColor.dangerText, RDLColor.dangerSoft)
        case .info: (RDLColor.infoText, RDLColor.infoSoft)
        case .idle: (RDLColor.textSecondary, RDLColor.fillControl)
        }
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s1_5) {
            Circle().fill(colors.fg).frame(width: 6, height: 6)
            Text(text).font(.system(size: 12, weight: .semibold))
        }
        .foregroundStyle(colors.fg)
        .padding(.horizontal, RDLSpace.s2)
        .frame(height: RDLSize.tag)
        .background(colors.bg, in: Capsule())
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Section header

/// "Title ………… See all" — title 17/500, action is a 32 chip.
public struct RDLSectionHeader: View {
    let title: String
    let detail: String?
    let action: String?
    var onAction: () -> Void

    public init(_ title: String, detail: String? = nil, action: String? = nil, onAction: @escaping () -> Void = {}) {
        self.title = title
        self.detail = detail
        self.action = action
        self.onAction = onAction
    }

    public var body: some View {
        HStack(alignment: .center) {
            Text(title).rdlType(RDLType.title)
            Spacer()
            if let detail { Text(detail).rdlType(RDLType.meta).foregroundStyle(RDLColor.textSecondary) }
            if let action {
                Button(action, action: onAction)
                    .rdlType(RDLType.meta)
                    .padding(.horizontal, RDLSpace.s3)
                    .frame(height: RDLSize.controlXs)
                    .background(RDLColor.fillControl, in: Capsule())
                    .buttonStyle(.plain)
            }
        }
    }
}

// MARK: - Title tabs

/// "Data   Records" — tabs set at the same title size; inactive tabs in tertiary.
public struct RDLTitleTabs: View {
    let tabs: [String]
    @Binding var selection: Int
    var style: RDLTextStyle = RDLType.h1

    public init(_ tabs: [String], selection: Binding<Int>, style: RDLTextStyle = RDLType.h1) {
        self.tabs = tabs
        self._selection = selection
        self.style = style
    }

    public var body: some View {
        HStack(spacing: RDLSpace.stackLoose) {
            ForEach(tabs.indices, id: \.self) { i in
                Button { withAnimation(RDLMotion.standard) { selection = i } } label: {
                    Text(tabs[i]).rdlType(style)
                        .foregroundStyle(i == selection ? RDLColor.textPrimary : RDLColor.textTertiary)
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(i == selection ? .isSelected : [])
            }
        }
    }
}

// MARK: - Field

/// Search / select / prompt field. Height 48 (`.md`), 56 (`.lg`) or 64 (`.prompt` with an inset 48 orb).
public struct RDLField<Trailing: View>: View {
    public enum Size { case md, lg, prompt }
    let icon: String?
    let placeholder: String
    @Binding var text: String
    var size: Size
    let trailing: Trailing

    public init(_ placeholder: String, text: Binding<String>, icon: String? = "magnifyingglass", size: Size = .md, @ViewBuilder trailing: () -> Trailing = { EmptyView() }) {
        self.placeholder = placeholder
        self._text = text
        self.icon = icon
        self.size = size
        self.trailing = trailing()
    }

    private var height: CGFloat {
        switch size { case .md: RDLSize.controlMd; case .lg: RDLSize.controlLg; case .prompt: RDLSize.controlXl }
    }

    public var body: some View {
        HStack(spacing: RDLSpace.stack) {
            if let icon { Image(systemName: icon).font(.system(size: 16)).foregroundStyle(RDLColor.textSecondary) }
            TextField(placeholder, text: $text).rdlType(RDLType.body)
            trailing
        }
        .padding(.leading, size == .md ? RDLSpace.s4 : RDLSpace.s5)
        .padding(.trailing, size == .prompt ? RDLSpace.s2 : RDLSpace.s4)
        .frame(height: height)
        .background(RDLColor.fillControl, in: Capsule())
    }
}

// MARK: - Bottom sheet

public extension View {
    /// Bottom-sheet surface: top radius 48, 36×4 grabber 8 from the top, padding 20.
    func rdlSheet() -> some View {
        self
            .padding(.horizontal, RDLSpace.cardPadding)
            .padding(.top, RDLSpace.s6)
            .padding(.bottom, RDLSpace.cardPadding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                UnevenRoundedRectangle(topLeadingRadius: RDLRadius.sheet, topTrailingRadius: RDLRadius.sheet, style: .continuous)
                    .fill(RDLColor.bgSurface)
            )
            .overlay(alignment: .top) {
                Capsule().fill(RDLColor.borderStrong).frame(width: 36, height: 4).padding(.top, RDLSpace.stack)
            }
    }
}

/// How nested corners shrink (references/radius.md §3).
/// `.strict`: inner = outer − gap; concentric at every level (default; halve the padding to go deeper).
/// `.soft`: inner = outer − gap/2; the article's deep-nesting method, which keeps padding (and bands) even.
public enum RDLNestMethod { case strict, soft }

public extension RDLRadius {
    /// Nested corner radius. gap = padding + border (+ any extra inset). Floors at 0 — never clamp
    /// upward: if the result is too small, halve the gap (`hostPadding`, then 8 → 4) or use `.soft`.
    /// Pills and circles are exempt.
    ///
    ///     RDLRadius.nested(outer: RDLRadius.sheet, padding: RDLSpace.cardPadding)            // 28
    ///     RDLRadius.nested(outer: RDLRadius.widget, padding: RDLRadius.hostPadding)          // 28
    ///     RDLRadius.nested(outer: RDLRadius.card, padding: RDLRadius.hostPadding, border: 1) // 15
    ///     RDLRadius.nested(outer: RDLRadius.card, padding: 20, method: .soft)               // 18
    static func nested(outer: CGFloat, padding: CGFloat, border: CGFloat = 0, method: RDLNestMethod = .strict) -> CGFloat {
        let gap = padding + border
        return max(0, outer - (method == .soft ? gap / 2 : gap))
    }

    /// Padding for a surface that hosts nested panes: the card gap (20) halved and snapped to the ladder.
    static let hostPadding: CGFloat = RDLSpace.s3

    /// Radii for a chain of nested containers that never runs out of radius:
    /// `chain(outer: 24, gap: 8, levels: 4)` → [24, 16, 12, 8].
    /// Method A (strict): use the returned step as the real padding of each level (8, 4, 4).
    /// Method B (soft, the article's): keep the padding at `gap` and just use these radii.
    static func chain(outer: CGFloat, gap: CGFloat, levels: Int) -> [CGFloat] {
        var radii = [outer], g = gap
        for _ in 1..<max(levels, 1) {
            radii.append(max(0, radii.last! - g))
            g = max(4, (g / 2).rounded(.down))
        }
        return radii
    }
}

public extension View {
    /// Makes this view a container whose children can use `ContainerRelativeShape()` to get
    /// concentric corners automatically (SwiftUI insets the shape by the child's distance to the edge).
    ///
    ///     VStack { … .background(.white, in: ContainerRelativeShape()) }
    ///         .padding(RDLRadius.hostPadding)
    ///         .rdlConcentricContainer(radius: RDLRadius.widget)
    func rdlConcentricContainer(radius: CGFloat) -> some View {
        containerShape(.rect(cornerRadius: radius, style: .continuous))
    }
}

// MARK: - Skeleton

/// Loading placeholder at the final size; shimmers at 1.2s. Respects Reduce Motion.
public struct RDLSkeleton: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var phase: CGFloat = -1
    var radius: CGFloat = RDLRadius.md

    public init(radius: CGFloat = RDLRadius.md) { self.radius = radius }

    public var body: some View {
        RoundedRectangle(cornerRadius: radius, style: .continuous)
            .fill(RDLColor.fillControl)
            .overlay {
                if !reduceMotion {
                    GeometryReader { g in
                        LinearGradient(colors: [.clear, RDLColor.fillControlHover, .clear], startPoint: .leading, endPoint: .trailing)
                            .frame(width: g.size.width)
                            .offset(x: phase * g.size.width)
                    }
                    .clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
                }
            }
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.linear(duration: 1.2).repeatForever(autoreverses: false)) { phase = 1 }
            }
            .accessibilityLabel("Loading")
    }
}
```

## Appendix J · `scripts/audit_ui.mjs`

Playwright UI audit (needs Appendix A next to it at ../assets/tokens/tokens.json).

```js
#!/usr/bin/env node
// RDL UI audit: checks a rendered page against the token ladders and layout rules.
//
//   node skills/rdl-theme/scripts/audit_ui.mjs <file.html|url> [more…] [--w 1600 --h 1200] [--json] [--strict]
//
// Scope: elements inside [data-audit-scope] (fallback: body). Skips SVG internals and anything under
// [data-audit-ignore] (presentation chrome such as status bars and shot captions).
//
// Errors (exit 1):  font size not on the type scale · spacing (padding / margin / gap) not on the
//                   spacing ladder · radius not on the radius scale · control height not on the
//                   control ladder · mixed control heights in one row · text contrast < 4.5:1
//                   (3:1 for ≥ 24px, or ≥ 19px at 600+), measured on the rendered pixels behind the text ·
//                   content running into the pinned bottom zone (needs 12 clear).
// Warnings:         font weight outside 300–600 · nested radius that is neither concentric (outer − gap) nor
//                   soft (outer − gap/2, the deep-nesting compromise); gap = padding + border + offsets,
//                   measured per corner · accent used more
//                   than 3 times in one scope · interactive target < 44 (touch) or < 24 (viewport ≥ 1024,
//                   pointer; override with --min-target N).
// --strict turns warnings into errors.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(execSync("npm root -g").toString().trim() + "/playwright"); }

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, "../assets/tokens/tokens.json"), "utf8"));
const vals = (o) => Object.entries(o).filter(([k]) => !k.startsWith("_")).map(([, v]) => v).filter((v) => typeof v === "number");
const rules = {
  fontSizes: [...new Set(Object.values(tokens.type.scale).map((s) => s.size))],
  spacing: [...new Set([0, 1, ...vals(tokens.space), ...vals(tokens.layout)])],
  radii: [...new Set([0, ...vals(tokens.radius)])],
  controls: [...new Set(vals(tokens.size).filter((n) => n >= 24 && n <= 64))],
};

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const W = +flag("--w", 1600), H = +flag("--h", 1200);
const json = args.includes("--json"), strict = args.includes("--strict");
const minTarget = +flag("--min-target", W >= 1024 ? 24 : 44); // touch 44 · pointer 24 (WCAG 2.2)
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) { console.error("usage: audit_ui.mjs <file.html|url> [...] [--w N --h N] [--json] [--strict]"); process.exit(2); }
const toURL = (t) => (/^(https?|file):/.test(t) ? t : (() => {
  const [f, q] = t.split("?"); const p = resolve(f);
  if (!existsSync(p)) throw new Error(`Not found: ${p}`);
  return pathToFileURL(p).href + (q ? `?${q}` : "");
})());

// ---------- in-page collector ----------
function collect(rules) {
  const out = { issues: [], texts: [] };
  const near = (v, set, tol = 0.51) => set.some((s) => Math.abs(Math.abs(v) - s) <= tol);
  const px = (s) => parseFloat(s) || 0;
  const roots = [...document.querySelectorAll("[data-audit-scope]")];
  if (!roots.length) roots.push(document.body);
  const path = (el) => {
    const parts = [];
    for (let e = el; e && e !== document.body && parts.length < 3; e = e.parentElement) {
      let s = e.tagName.toLowerCase();
      const cls = [...e.classList].filter((c) => c.startsWith("rdl-") || /^[a-z]/.test(c)).slice(0, 2);
      if (cls.length) s += "." + cls.join(".");
      parts.unshift(s);
    }
    return parts.join(" > ");
  };
  const add = (sev, rule, el, detail, scope) => out.issues.push({ sev, rule, where: path(el), detail, scope });
  const isControl = (el) => el.matches("button, a[href], [role=button], [role=tab], .rdl-orb, .rdl-btn, .rdl-chip, .rdl-tile, .rdl-field, .rdl-seg, .rdl-slide, .rdl-dock, .rdl-tag, .rdl-statuspill, .rdl-delta, .rdl-iconbtn");
  const visible = (el, cs) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
  const parseColor = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; };

  const surfaceLike = (cs) => {
    const bg = parseColor(cs.backgroundColor);
    return (bg && bg[3] > 0.02) || cs.backgroundImage !== "none" || px(cs.borderTopWidth) > 0 || /inset/.test(cs.boxShadow) || (cs.backdropFilter && cs.backdropFilter !== "none");
  };
  // Concentric check: nearest rounded ancestor surface; for each corner the element hugs (equal x/y inset,
  // inset smaller than the outer radius) the inner radius should equal outer − gap (gap = padding + border + offsets).
  const concentric = (el, r) => {
    if (!surfaceLike(getComputedStyle(el)) && el.tagName !== "IMG") return null;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const acs = getComputedStyle(a), outer = px(acs.borderTopLeftRadius), ar = a.getBoundingClientRect();
      if (!outer || !surfaceLike(acs) || outer >= Math.min(ar.width, ar.height) / 2 - 1) continue;
      const g = { l: r.left - ar.left, t: r.top - ar.top, rt: ar.right - r.right, b: ar.bottom - r.bottom };
      for (const [x, y] of [[g.l, g.t], [g.rt, g.t], [g.l, g.b], [g.rt, g.b]]) {
        if (x >= 0 && y >= 0 && Math.abs(x - y) <= 2 && Math.max(x, y) < outer) {
          const gap = Math.round((x + y) / 2);
          // soft = the article's deep-nesting method: keep the padding, subtract half of it from the radius
          return { outer, gap, expected: Math.max(0, outer - gap), soft: Math.max(0, outer - gap / 2) };
        }
      }
      return null; // nearest surface found but element doesn't hug a corner — any radius on the scale is fine
    }
    return null;
  };
  roots.forEach((root, ri) => {
    const scope = root.getAttribute("aria-label") || root.dataset.auditScope || `scope ${ri + 1}`;
    const accent = parseColor(getComputedStyle(root).getPropertyValue("--rdl-accent").trim().replace(/^#(..)(..)(..)$/, (_, r, g, b) => `rgb(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)})`));
    const accentParents = new Set();
    for (const el of root.querySelectorAll("*")) {
      if (el.closest("svg") || el.closest("[data-audit-ignore]")) continue;
      const cs = getComputedStyle(el);
      if (!visible(el, cs)) continue;
      const r = el.getBoundingClientRect();
      const derived = el.matches(".rdl-figure, .rdl-figure *, .rdl-unit, .rdl-cur, .rdl-lead"); // em-relative by design

      // Spacing ladder
      if (!derived) {
        for (const p of ["padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-right", "margin-bottom", "margin-left"]) {
          const v = px(cs.getPropertyValue(p));
          if (v && !near(v, rules.spacing)) add("error", "spacing", el, `${p} ${v}px`, scope);
        }
        if (/flex|grid/.test(cs.display)) for (const p of ["row-gap", "column-gap"]) {
          const v = cs.getPropertyValue(p); if (v === "normal") continue;
          const n = px(v); if (n && !near(n, rules.spacing)) add("error", "spacing", el, `${p} ${n}px`, scope);
        }
      }
      // Radius: concentric with the enclosing surface, else on the radius scale (pill/circle exempt)
      const rad = px(cs.borderTopLeftRadius);
      const isPill = rad >= Math.min(r.width, r.height) / 2 - 1 || cs.borderTopLeftRadius.includes("%");
      if (rad && !isPill) {
        const nest = concentric(el, r);
        if (nest && Math.abs(nest.expected - rad) > 1.5 && Math.abs(nest.soft - rad) > 1.5) {
          const fix = nest.expected < 8
            ? `gap ${nest.gap}px eats the ${nest.outer}px outer radius — halve the gap (host padding 12) rather than keeping ${rad}px`
            : `should be ${nest.expected}px concentric (outer ${nest.outer} − gap ${nest.gap}) or ${nest.soft}px soft (outer − gap/2)`;
          add("warn", "nested-radius", el, `${rad}px — ${fix}`, scope);
        } else if (!nest && !near(rad, rules.radii)) add("error", "radius", el, `${rad}px`, scope);
      }
      // Type scale + weight
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (hasText && !derived) {
        const fs = px(cs.fontSize);
        if (!near(fs, rules.fontSizes)) add("error", "type-scale", el, `${fs}px`, scope);
        const fw = +cs.fontWeight;
        if ((fw < 300 || fw > 600) && !/Doto/.test(cs.fontFamily)) add("warn", "weight", el, `${fw}`, scope);
      }
      if (hasText) {
        let op = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) op *= +getComputedStyle(e).opacity;
        // Tight text box (union of the element's own text nodes), so padding and rounded corners don't skew the sample
        const rg = document.createRange(); let tb = null;
        for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) {
          rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
          tb = tb ? { l: Math.min(tb.l, q.left), t: Math.min(tb.t, q.top), r: Math.max(tb.r, q.right), b: Math.max(tb.b, q.bottom) } : { l: q.left, t: q.top, r: q.right, b: q.bottom };
        }
        const box = tb ? { x: tb.l, y: tb.t, w: tb.r - tb.l, h: tb.b - tb.t } : { x: r.left, y: r.top, w: r.width, h: r.height };
        out.texts.push({ where: path(el), scope, ...box, color: parseColor(cs.color), op, size: px(cs.fontSize), weight: +cs.fontWeight });
      }
      // Control ladder + hit target
      if (isControl(el) && !el.closest(".rdl-seg button") ) {
        const h = Math.round(r.height);
        if (!near(h, rules.controls, 1)) add("error", "control-height", el, `${h}px`, scope);
        if (el.matches("button, a[href], [role=button]") && !el.closest(".rdl-seg, .rdl-nav") && h < rules.minTarget) add("warn", "hit-target", el, `${h}px (min ${rules.minTarget})`, scope);
      }
      // Accent budget
      if (accent) {
        const same = (c) => c && Math.abs(c[0] - accent[0]) + Math.abs(c[1] - accent[1]) + Math.abs(c[2] - accent[2]) < 6 && c[3] > 0.5;
        if (same(parseColor(cs.backgroundColor)) || (hasText && same(parseColor(cs.color)))) accentParents.add(el.parentElement);
      }
    }
    // One control height per row
    for (const row of root.querySelectorAll(".rdl-header, .rdl-actionrow, .rdl-inline, .rdl-dock")) {
      if (row.closest("[data-audit-ignore]")) continue;
      const hs = [...row.querySelectorAll(":scope > *, :scope > * > .rdl-orb")].filter(isControl).map((c) => Math.round(c.getBoundingClientRect().height));
      if (new Set(hs).size > 1) add("error", "row-height", row, `mixed control heights ${[...new Set(hs)].join("/")}`, scope);
    }
    // Pinned zone clearance: scrolling content must end ≥ 12 above the pinned control
    const pins = [...root.querySelectorAll(".rdl-pin")].map((e) => e.getBoundingClientRect().top);
    if (pins.length) {
      const limit = Math.min(...pins) - 12;
      for (const screen of root.querySelectorAll(".rdl-screen")) for (const el of screen.querySelectorAll("*")) {
        if (el.closest(".rdl-pin, svg, [data-audit-ignore]")) continue;
        const b = el.getBoundingClientRect().bottom, pb = el.parentElement.getBoundingClientRect().bottom;
        if (b > limit && !(el.parentElement !== screen && pb > limit)) add("error", "pin-clearance", el, `ends ${Math.round(b - limit + 12)}px into the pinned zone (needs 12 clear)`, scope);
      }
    }
    if (accentParents.size > 3) add("warn", "accent-budget", root, `accent used in ${accentParents.size} places (budget 3)`, scope);
  });
  return out;
}

// ---------- contrast from rendered pixels ----------
async function contrast(page, texts) {
  await page.addStyleTag({ content: "body *, body *::before, body *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; }" });
  await page.waitForTimeout(50);
  const png = (await page.screenshot()).toString("base64");
  return page.evaluate(async ({ png, texts }) => {
    const img = new Image(); img.src = "data:image/png;base64," + png; await img.decode();
    const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
    const ctx = cv.getContext("2d"); ctx.drawImage(img, 0, 0);
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return texts.map((t) => {
      const x = Math.max(0, Math.floor(t.x)), y = Math.max(0, Math.floor(t.y));
      const w = Math.min(cv.width - x, Math.ceil(t.w)), h = Math.min(cv.height - y, Math.ceil(t.h));
      if (w < 1 || h < 1 || !t.color) return null;
      const d = ctx.getImageData(x, y, w, h).data, px = [];
      for (let i = 0; i < d.length; i += 4 * Math.max(1, Math.floor(d.length / 4 / 600))) px.push([d[i], d[i + 1], d[i + 2]]);
      px.sort((a, b) => lum(...a) - lum(...b));
      const pick = (q) => px[Math.min(px.length - 1, Math.floor(q * px.length))];
      const a = t.color[3] * t.op;
      const worst = [pick(0.2), pick(0.5), pick(0.8)].map((bg) => {
        const fg = t.color.slice(0, 3).map((c, i) => a * c + (1 - a) * bg[i]);
        return ratio(lum(...fg), lum(...bg));
      });
      const cr = Math.min(...worst);
      const large = t.size >= 24 || (t.size >= 18.5 && t.weight >= 600);
      return { ...t, cr: +cr.toFixed(2), need: large ? 3 : 4.5 };
    }).filter((t) => t && t.cr < t.need);
  }, { png, texts });
}

const browser = await playwright.chromium.launch();
let errors = 0, warns = 0;
const report = [];
for (const target of targets) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto(toURL(target));
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; } [data-audit-scope] { transform: none !important; zoom: 1 !important; }" }); // flatten presentation tilt and zoom
  await page.waitForTimeout(300);
  const { issues, texts } = await page.evaluate(collect, { ...rules, minTarget });
  for (const t of await contrast(page, texts)) issues.push({ sev: "error", rule: "contrast", where: t.where, detail: `${t.cr}:1 (needs ${t.need})`, scope: t.scope });
  const sevOf = (i) => (strict && i.sev === "warn" ? "error" : i.sev);
  errors += issues.filter((i) => sevOf(i) === "error").length;
  warns += issues.filter((i) => sevOf(i) === "warn").length;
  report.push({ target, issues: issues.map((i) => ({ ...i, sev: sevOf(i) })) });
  await page.close();
}
await browser.close();

if (json) console.log(JSON.stringify(report, null, 2));
else {
  for (const { target, issues } of report) {
    console.log(`\n▸ ${target}  —  ${issues.filter((i) => i.sev === "error").length} errors, ${issues.filter((i) => i.sev === "warn").length} warnings`);
    const byRule = {};
    for (const i of issues) (byRule[`${i.sev} ${i.rule}`] ??= []).push(i);
    for (const [k, list] of Object.entries(byRule)) {
      console.log(`  ${k} (${list.length})`);
      for (const i of list.slice(0, 8)) console.log(`    · [${i.scope}] ${i.where} — ${i.detail}`);
      if (list.length > 8) console.log(`    … ${list.length - 8} more`);
    }
  }
  console.log(`\n${errors} errors, ${warns} warnings · ladders: type ${rules.fontSizes.join("/")} · space ${rules.spacing.join("/")} · radius ${rules.radii.join("/")} · controls ${rules.controls.join("/")}`);
}
process.exit(errors ? 1 : 0);
```

## Appendix K · `scripts/extract_palette.py`

Pixel-calibrates tokens against exported shots.

```python
#!/usr/bin/env python3
"""Calibrate RDL tokens against real shots.

Drop Dribbble shot exports (PNG/JPG/WebP) into a folder and run:

    pip install pillow
    python3 skills/rdl-theme/scripts/extract_palette.py research/shots

It quantizes every image, pools the colours across the set (weighted by area), splits them into
neutrals (canvas / surface / ink candidates) and chromatic accents, and reports the nearest
existing token for each so you can see where tokens.json drifts from the source.
Pass --json to get machine-readable output.
"""
from __future__ import annotations

import argparse
import colorsys
import json
import math
import sys
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required: pip install pillow")

TOKENS = Path(__file__).resolve().parent.parent / "assets" / "tokens" / "tokens.json"
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]

def rgb_to_hex(c) -> str:
    return "#{:02X}{:02X}{:02X}".format(*c)

def _lin(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def to_lab(rgb):
    r, g, b = (_lin(v) for v in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    fx, fy, fz = f(x), f(y), f(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)

def delta_e(a, b) -> float:
    return math.dist(to_lab(a), to_lab(b))

def load_primitives() -> dict[str, tuple[int, int, int]]:
    data = json.loads(TOKENS.read_text())
    return {f"{fam}.{step}": hex_to_rgb(h) for fam, steps in data["primitive"].items() for step, h in steps.items()}

def quantize(path: Path, k: int) -> Counter:
    img = Image.open(path).convert("RGB")
    img.thumbnail((400, 400))
    q = img.quantize(colors=k, method=Image.Quantize.MEDIANCUT)
    palette = q.getpalette()
    counts = Counter()
    total = img.width * img.height
    for count, idx in q.getcolors():
        rgb = tuple(palette[idx * 3 : idx * 3 + 3])
        # Snap to a 4-level grid so near-identical colours pool across shots.
        snapped = tuple(min(255, round(v / 4) * 4) for v in rgb)
        counts[snapped] += count / total
    return counts

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder", type=Path)
    ap.add_argument("-k", type=int, default=16, help="colours per image (default 16)")
    ap.add_argument("--top", type=int, default=12)
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    files = sorted(p for p in args.folder.rglob("*") if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"No images found in {args.folder}")

    pooled: Counter = Counter()
    for f in files:
        pooled.update(quantize(f, args.k))
    for c in pooled:
        pooled[c] /= len(files)

    prims = load_primitives()
    neutrals, accents = [], []
    for rgb, share in pooled.most_common():
        h, l, s = colorsys.rgb_to_hls(*(v / 255 for v in rgb))
        nearest, dist = min(((n, delta_e(rgb, p)) for n, p in prims.items()), key=lambda x: x[1])
        row = {"hex": rgb_to_hex(rgb), "share": round(share * 100, 2), "hue": round(h * 360), "light": round(l * 100),
               "sat": round(s * 100), "nearest_token": nearest, "delta_e": round(dist, 1)}
        (neutrals if s < 0.12 or l < 0.08 or l > 0.97 else accents).append(row)

    result = {"images": len(files), "neutrals": neutrals[: args.top], "accents": accents[: args.top]}
    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"Analysed {len(files)} image(s)\n")
    for title, rows in (("NEUTRALS (canvas / surface / ink)", result["neutrals"]), ("ACCENTS", result["accents"])):
        print(title)
        print(f"  {'hex':8} {'area%':>6} {'L':>4} {'S':>4}  nearest token     ΔE")
        for r in rows:
            flag = "  ← drift" if r["delta_e"] > 8 else ""
            print(f"  {r['hex']:8} {r['share']:6.2f} {r['light']:4} {r['sat']:4}  {r['nearest_token']:16} {r['delta_e']:5}{flag}")
        print()
    print("ΔE < 3: identical to the eye · 3–8: close · > 8: consider updating tokens.json, then run build_tokens.mjs")

if __name__ == "__main__":
    main()
```

## Appendix L · `assets/templates/radius-demo.html`

Interactive corner-radius demo. Opens on its own in any browser.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Concentric Corners</title>
<!-- RDL Theme · radius demo (references/radius.md). Self-contained (inlines the few tokens it needs) so it opens anywhere.
     Rule: outer = inner + gap (gap = padding + border). Deeper levels: A strict (halve padding) or B soft (radius − padding/2). -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --canvas: #EFEFF1; --surface: #FFFFFF; --ink: #0A0B0C; --text-2: #5C5C64; --text-3: #9B9BA3;
    --hair: #DCDCE0; --accent: #ECBC44; --accent-soft: #FDF8EA; --ok: #22C552; --crit: #F0453E; --crit-text: #C2241E;
    --l1: #0A0B0C; --l2: #3A3B40; --l3: #9B9BA3; --l4: #ECBC44;
    --fs-h1: 56px; --gap: 12px;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { --canvas: #0A0B0C; --crit-text: #FF9A9A; --surface: #131416; --ink: #F4F4F5; --text-2: #A1A1AA; --text-3: #6B6B74; --hair: #26272B; --accent-soft: #2A2410;
      --l1: #F4F4F5; --l2: #A1A1AA; --l3: #4E4E56; color-scheme: dark; }
  }
  :root[data-theme="dark"] { --canvas: #0A0B0C; --crit-text: #FF9A9A; --surface: #131416; --ink: #F4F4F5; --text-2: #A1A1AA; --text-3: #6B6B74; --hair: #26272B; --accent-soft: #2A2410;
      --l1: #F4F4F5; --l2: #A1A1AA; --l3: #4E4E56; color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--canvas); color: var(--ink); font-family: Urbanist, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
  h1, h2, h3, p { margin: 0; }
  .page { max-width: 1440px; margin: 0 auto; padding: 48px clamp(16px, 4vw, 64px) 64px; display: flex; flex-direction: column; gap: 32px; }
  .muted { color: var(--text-2); }
  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
  .eyebrow { font-size: 13px; line-height: 18px; font-weight: 500; color: var(--text-2); }
  h1 { font-size: var(--fs-h1); line-height: 58px; font-weight: 300; letter-spacing: -0.03em; }
  h1 b { font-weight: 600; }
  .formula { display: inline-flex; align-items: center; gap: 12px; height: 56px; padding: 0 24px; border-radius: 999px; background: var(--ink); color: var(--canvas); font-size: 17px; font-weight: 500; }
  .formula i { font-style: normal; color: var(--accent); }
  .formula { white-space: nowrap; max-width: 100%; }
  .formula-note { opacity: .6; font-weight: 400; }
  @media (max-width: 520px) { .formula { font-size: 15px; gap: 8px; padding: 0 20px; } .formula-note { display: none; } }
  .grid { display: grid; gap: var(--gap); }
  .g2 { grid-template-columns: 1fr 1fr; } .g3 { grid-template-columns: repeat(3, 1fr); }
  .card { background: var(--surface); border-radius: 28px; padding: 20px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  .card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .title { font-size: 17px; line-height: 22px; font-weight: 500; }
  .meta { font-size: 13px; line-height: 18px; font-weight: 500; color: var(--text-2); }
  .badge { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 8px; border-radius: 999px; font-size: 12px; font-weight: 600; }
  .badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .bad { background: #FFF0F0; color: #CC2F29; } .good { background: #EAFCEF; color: #0E6E2C; } .info { background: var(--accent-soft); color: #6E500E; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .bad { background: rgba(240,69,62,.16); color: #FF9A9A; } :root:not([data-theme="light"]) .good { background: rgba(34,197,82,.16); color: #7BEB97; } :root:not([data-theme="light"]) .info { color: #F4DA8E; } }
  :root[data-theme="dark"] .bad { background: rgba(240,69,62,.16); color: #FF9A9A; } :root[data-theme="dark"] .good { background: rgba(34,197,82,.16); color: #7BEB97; } :root[data-theme="dark"] .info { color: #F4DA8E; }
  .stage { background: var(--canvas); border-radius: 12px; display: grid; place-items: center; padding: 16px; } /* 28 − 16 = 12: the demo follows its own rule */
  svg { display: block; width: 100%; height: auto; overflow: hidden; border-radius: 4px; }
  .stage { overflow: hidden; }
  .legend { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .legend span { display: inline-flex; align-items: center; gap: 6px; }
  .legend i { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(0,0,0,.2); }
  svg text { font-family: Urbanist, sans-serif; }
  .chain { font-size: 15px; line-height: 22px; font-variant-numeric: tabular-nums; }
  .chain b { font-weight: 600; }
  /* Playground */
  .play { display: grid; grid-template-columns: minmax(0, 360px) minmax(0, 1fr); gap: var(--gap); }
  .controls { display: flex; flex-direction: column; gap: 20px; }
  .ctl { display: flex; flex-direction: column; gap: 8px; }
  .ctl .row { display: flex; justify-content: space-between; align-items: baseline; }
  .ctl output { font-size: 20px; font-weight: 300; font-variant-numeric: tabular-nums; }
  input[type=range] { width: 100%; accent-color: var(--ink); height: 24px; }
  .seg button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .seg { display: flex; height: 48px; padding: 4px; gap: 4px; border-radius: 999px; background: var(--canvas); }
  .seg button { flex: 1; border: 0; border-radius: 999px; background: none; font: 500 14px/1 Urbanist, sans-serif; color: var(--text-2); cursor: pointer; }
  .seg button[aria-pressed="true"] { background: var(--surface); color: var(--ink); box-shadow: 0 2px 10px rgba(0,0,0,.08); }
  .readout { display: flex; flex-direction: column; gap: 4px; padding: 16px; border-radius: 12px; background: var(--canvas); }
  .readout .big { font-size: 40px; line-height: 44px; font-weight: 300; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .readout .big small { font-size: 15px; color: var(--text-2); font-weight: 400; }
  /* Product example: sheet 48 → card 28 → host pane 16 → chip pane */
  .product { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap); align-items: stretch; }
  .phone-sheet { background: #EFEFF1; border-radius: 48px 48px 0 0; padding: 20px; padding-top: 24px; position: relative; color: #0A0B0C; display: flex; flex-direction: column; gap: 12px; }
  .phone-sheet::before { content: ""; position: absolute; top: 8px; left: 50%; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: #C3C3C9; }
  .sheet-card { background: linear-gradient(165deg, #5E5A26 0%, #8A5646 55%, #9A5A6A 100%); color: #fff; border-radius: 28px; padding: 12px; display: flex; flex-direction: column; gap: 12px; }
  .sheet-card .hd { padding: 8px 8px 0; display: flex; flex-direction: column; gap: 4px; }
  .sheet-card .fig { font-size: 40px; line-height: 44px; font-weight: 300; letter-spacing: -0.02em; }
  .sheet-card .fig small { font-size: 15px; opacity: .86; vertical-align: top; margin-right: 2px; }
  .panes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .pane { background: rgba(10,11,12,.16); box-shadow: inset 0 0 0 1px rgba(255,255,255,.28); border-radius: 16px; padding: 8px; display: flex; flex-direction: column; gap: 8px; } /* 28 − 12 */
  .pane .lbl { padding: 4px 4px 0; font-size: 12px; color: rgba(255,255,255,.86); }
  .chip-pane { background: rgba(255,255,255,.9); color: #0A0B0C; border-radius: 8px; padding: 8px; font-size: 15px; font-weight: 500; } /* 16 − 8 */
  .spec { display: flex; flex-direction: column; gap: 12px; }
  .spec-row { display: grid; grid-template-columns: auto 1fr auto; gap: 8px; align-items: baseline; font-size: 15px; }
  .spec-row .dots { border-bottom: 1px dotted var(--text-3); transform: translateY(-4px); }
  .spec-row b { font-weight: 500; font-variant-numeric: tabular-nums; }
  @media (max-width: 1100px) { .g3, .g2, .play, .product { grid-template-columns: 1fr; } .page { padding-block: 32px; } :root { --fs-h1: 40px; } h1 { line-height: 44px; } }
</style>
</head>
<body>
<main class="page">
  <header class="head">
    <div style="display:flex;flex-direction:column;gap:8px">
      <p class="eyebrow">RDL Theme · v3.1 · corner radius</p>
      <h1>Concentric <b>corners</b></h1>
    </div>
    <div class="formula">Outer R <i>=</i> Inner R <i>+</i> Gap <span class="formula-note">(padding + border)</span></div>
  </header>

  <!-- 1 · Wrong vs right -->
  <section class="grid g2">
    <article class="card">
      <div class="card-h"><p class="title">Same radius inside</p><span class="badge bad">Outer R = Inner R</span></div>
      <div class="stage"><svg id="wrong" viewBox="0 0 520 300" width="520"></svg></div>
      <p class="meta">40 outside, 40 inside, 20 gap. Two different arc centres (dots): the gap swells at the 45° point and the inner corner looks bloated.</p>
    </article>
    <article class="card">
      <div class="card-h"><p class="title">Concentric</p><span class="badge good">Inner = 40 − 20 = 20</span></div>
      <div class="stage"><svg id="right" viewBox="0 0 520 300" width="520"></svg></div>
      <p class="meta">Both arcs share one centre (the dots coincide), so the gap stays the same width all the way around the curve.</p>
    </article>
  </section>

  <!-- 2 · Going deeper -->
  <section class="grid g3">
    <article class="card">
      <div class="card-h"><p class="title">Fixed gap</p><span class="badge bad">Runs out</span></div>
      <div class="stage"><svg id="fixed" viewBox="0 0 400 300" width="400"></svg></div>
      <p class="chain">24 <span class="muted">−8 →</span> 16 <span class="muted">−8 →</span> 8 <span class="muted">−8 →</span> <b style="color:var(--crit-text)">0</b></p>
      <p class="meta">Subtracting the full padding every level gives a sharp innermost corner.</p>
    </article>
    <article class="card">
      <div class="card-h"><p class="title">A · Strict</p><span class="badge good">RDL default</span></div>
      <div class="stage"><svg id="strict" viewBox="0 0 400 300" width="400"></svg></div>
      <p class="chain">24 <span class="muted">−8 →</span> 16 <span class="muted">−4 →</span> 12 <span class="muted">−4 →</span> <b>8</b></p>
      <p class="meta">Halve the real padding (8 → 4). Every level stays perfectly concentric; the bands get thinner.</p>
    </article>
    <article class="card">
      <div class="card-h"><p class="title">B · Soft</p><span class="badge info">Article method</span></div>
      <div class="stage"><svg id="soft" viewBox="0 0 400 300" width="400"></svg></div>
      <p class="chain">24 <span class="muted">−8 →</span> 16 <span class="muted">−8/2 →</span> 12 <span class="muted">−8/2 →</span> <b>8</b></p>
      <p class="meta">Keep the padding at 8 and subtract half of it from the radius. The bands stay even and the curves read soft.</p>
    </article>
  </section>

  <p class="meta legend" style="margin-top:-16px"><span><i style="background:#ECBC44"></i>level 1</span><span><i style="background:#22C552"></i>level 2</span><span><i style="background:#2F66F6"></i>level 3</span><span><i style="background:#F0453E"></i>level 4</span><span>Dots mark each corner arc's centre. One stacked dot = concentric; a spread = the curves drift apart.</span></p>

  <!-- 3 · Playground -->
  <section class="card">
    <div class="card-h"><p class="title">Playground</p><span class="meta">Drag to see the rule hold, or break</span></div>
    <div class="play">
      <div class="controls">
        <div class="ctl"><div class="row"><span class="meta">Outer radius</span><output id="oR">40</output></div><input id="iR" type="range" min="8" max="64" step="4" value="40"></div>
        <div class="ctl"><div class="row"><span class="meta">Padding (gap)</span><output id="oP">12</output></div><input id="iP" type="range" min="0" max="32" step="2" value="12"></div>
        <div class="ctl"><div class="row"><span class="meta">Border</span><output id="oB">0</output></div><input id="iB" type="range" min="0" max="4" step="1" value="0"></div>
        <div class="ctl"><div class="row"><span class="meta">Levels</span><output id="oL">4</output></div><input id="iL" type="range" min="1" max="5" step="1" value="4"></div>
        <div class="seg" role="group" aria-label="Method">
          <button data-m="same">Same</button><button data-m="fixed">Fixed</button><button data-m="strict" aria-pressed="true">A · Strict</button><button data-m="soft">B · Soft</button>
        </div>
        <div class="readout"><span class="meta">Radii, outside → in</span><p class="big" id="radii">40 <small>→</small> 28</p><span class="meta" id="verdict"></span></div>
      </div>
      <div class="stage"><svg id="play" viewBox="0 0 760 420" width="760"></svg></div>
    </div>
  </section>

  <!-- 4 · In the product -->
  <section class="product">
    <article class="card">
      <div class="card-h"><p class="title">In the product · Gold SIP sheet</p><span class="badge good">Audit clean</span></div>
      <div class="stage" style="padding:16px 16px 0;place-items:end stretch;flex:1">
        <div class="phone-sheet">
          <div class="sheet-card">
            <div class="hd"><span style="font-size:12px;opacity:.86">Paid amount · 24 m</span><p class="fig"><small>₹</small>60,000</p></div>
            <div class="panes">
              <div class="pane"><span class="lbl">Accumulated</span><div class="chip-pane">8.24 g</div></div>
              <div class="pane"><span class="lbl">Left to pay</span><div class="chip-pane">₹60,000</div></div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <article class="card">
      <p class="title">Four levels, one centre</p>
      <div class="spec">
        <div class="spec-row"><span>Sheet</span><span class="dots"></span><b>48</b></div>
        <div class="spec-row"><span class="muted">gap 20</span><span class="dots"></span><b class="muted">−20</b></div>
        <div class="spec-row"><span>Aura card</span><span class="dots"></span><b>28</b></div>
        <div class="spec-row"><span class="muted">host padding 12 (gap halved)</span><span class="dots"></span><b class="muted">−12</b></div>
        <div class="spec-row"><span>Glass pane</span><span class="dots"></span><b>16</b></div>
        <div class="spec-row"><span class="muted">padding 8</span><span class="dots"></span><b class="muted">−8</b></div>
        <div class="spec-row"><span>Value chip</span><span class="dots"></span><b>8</b></div>
      </div>
      <p class="meta">With the default 20 padding the pane would get 28 − 20 = 8, and the chip would hit 0. Halving the host padding to 12 keeps real curves at every level.</p>
      <p class="meta">Code: <b style="font-weight:600;color:var(--ink)">.rdl-nest</b> / <b style="font-weight:600;color:var(--ink)">.rdl-nest--soft</b> + <b style="font-weight:600;color:var(--ink)">.rdl-card--host</b> on web · <b style="font-weight:600;color:var(--ink)">RDLRadius.nested(outer:padding:border:method:)</b> in SwiftUI. Guide: references/radius.md.</p>
    </article>
  </section>
</main>

<script>
const NS = "http://www.w3.org/2000/svg";
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };

// Radii and insets for each method. Returns [{inset, r}] from the outside in.
function chain({ outer, pad, border = 0, levels, method }) {
  const out = [{ inset: 0, r: outer }];
  let inset = 0, r = outer, gap = pad + border;
  for (let i = 1; i < levels; i++) {
    let step = gap, sub;
    if (method === "strict" && i > 1) step = Math.max(4, Math.round(gap / 4) * 2); // halve once, snap to even, floor 4
    if (method === "strict") sub = step;
    else if (method === "soft") sub = i === 1 ? gap : gap / 2;
    else if (method === "same") sub = 0;
    else sub = gap;
    inset += step; r = Math.max(0, r - sub);
    out.push({ inset, r });
  }
  return out;
}

// Draw nested rounded rects (top-left anchored, cropped to show the corners) with radius labels.
function draw(svg, opts) {
  svg.innerHTML = "";
  const [vw, vh] = svg.getAttribute("viewBox").split(" ").slice(2).map(Number);
  const s = opts.scale, layers = chain(opts);
  const fills = [css("--l1"), css("--l2"), css("--l3"), css("--l4"), css("--surface")];
  const x0 = 16, y0 = 16, W = vw * 1.6, H = vh * 1.6;
  layers.forEach((L, i) => {
    const x = x0 + L.inset * s, y = y0 + L.inset * s;
    el("rect", { x, y, width: W - 2 * L.inset * s, height: H - 2 * L.inset * s, rx: L.r * s, fill: fills[i % fills.length] }, svg);
  });
  // Arc centres: one dot per level. If every dot lands on the same point, the corners are concentric.
  const dotColors = ["#ECBC44", "#22C552", "#2F66F6", "#F0453E", "#A548EE"];
  layers.forEach((L, i) => {
    const x = x0 + L.inset * s, y = y0 + L.inset * s, r = L.r * s;
    if (opts.labels) {
      const t = el("text", { x: x + Math.max(r, 12) + 10, y: y + 22, "font-size": 15, "font-weight": 600, fill: i < 2 ? css("--canvas") : "#0A0B0C" }, svg);
      t.textContent = L.r;
    }
    if (L.r === 0 && i > 0) { const w = el("text", { x: x + 12, y: y + 28, "font-size": 15, "font-weight": 600, fill: "#CC2F29" }, svg); w.textContent = "← sharp corner"; }
  });
  layers.slice().reverse().forEach((L, j) => {
    const i = layers.length - 1 - j, x = x0 + L.inset * s, y = y0 + L.inset * s, r = L.r * s;
    if (L.r > 0) el("circle", { cx: x + r, cy: y + r, r: 6 - j * 0.0, fill: dotColors[i], stroke: "#fff", "stroke-width": 2 }, svg);
  });
}

// 1 · wrong vs right (40 / gap 20, scale 2.4)
function drawAll() {
draw(document.getElementById("wrong"), { outer: 40, pad: 20, levels: 2, method: "same", scale: 2.4, labels: true });
draw(document.getElementById("right"), { outer: 40, pad: 20, levels: 2, method: "fixed", scale: 2.4, labels: true });
// 2 · deeper chains (24 / 8, scale 3.4)
draw(document.getElementById("fixed"),  { outer: 24, pad: 8, levels: 4, method: "fixed",  scale: 3.4 });
draw(document.getElementById("strict"), { outer: 24, pad: 8, levels: 4, method: "strict", scale: 3.4 });
draw(document.getElementById("soft"),   { outer: 24, pad: 8, levels: 4, method: "soft",   scale: 3.4 });
}
drawAll();

// 3 · playground
const ui = { R: iR, P: iP, B: iB, L: iL };
let method = "strict";
function update() {
  const o = { outer: +iR.value, pad: +iP.value, border: +iB.value, levels: +iL.value, method, scale: 3 };
  oR.value = o.outer; oP.value = o.pad; oB.value = o.border; oL.value = o.levels;
  draw(play, o);
  const L = chain(o);
  radii.innerHTML = L.map((l) => l.r).join(" <small>→</small> ");
  const flat = L.slice(1).some((l) => l.r === 0);
  verdict.textContent = method === "same" ? "Not concentric: the gap bulges at every corner."
    : flat ? "A level hit 0, so its corner is sharp. Halve the gap (A) or use B."
    : method === "soft" ? "Soft: even bands, curves slightly rounder than concentric."
    : "Concentric: one centre per corner, an even gap all the way round.";
}
for (const k in ui) ui[k].addEventListener("input", update);
document.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  method = b.dataset.m; update();
}));
update();
const redraw = () => { drawAll(); update(); };
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
</script>
</body>
</html>
```

## Appendix M · `assets/tokens/rdl-theme.js`

Theme engine and browser runtime: brand roles from two colours, accent roles, contrast audit, RDL.setTheme().

```js
/*! RDL theme engine v4: Light, Dark and Brand (primary + secondary), with contrast-checked roles.
 *
 * Browser:  <script src="rdl-theme.js"></script>
 *           RDL.setTheme("brand", { primary: "#0732D8", secondary: "#F2D33C" });
 *           RDL.setTheme("dark");                      // or "light"
 *           RDL.setAccent("#D7F23A");                   // secondary colour in light/dark
 * Node:     const RDL = require("./rdl-theme.js");    // used by scripts/build_tokens.mjs
 *
 * The same algorithm is generated into SwiftUI (RDLTokens.swift → RDLThemeEngine), so a brand
 * picked on the web and on iOS resolves to identical colours.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.RDL = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var INK = "#151515";
  var WHITE = "#FFFFFF";
  var BLACK = "#000000";

  // ---------- colour math (sRGB, WCAG 2.x) ----------
  function parse(hex) {
    var h = String(hex).trim().replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error("RDL: expected a #RRGGBB colour, got " + hex);
    return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16); });
  }
  function hex(rgb) {
    return "#" + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"); }).join("").toUpperCase();
  }
  /** Mix `b` into `a` by `t` (0 = a, 1 = b). Same as painting b at opacity t over a. */
  function mix(a, b, t) {
    var x = parse(a), y = parse(b);
    return hex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * t; }));
  }
  function luminance(c) {
    return parse(c).map(function (v) {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) {
    var l1 = luminance(a), l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  /** Ink or white, whichever reads better on `bg`. White wins ties above 4.5:1 (the board's preference). */
  function onColor(bg) {
    var w = contrast(WHITE, bg), k = contrast(INK, bg);
    if (w >= 4.5) return WHITE;
    if (k >= 4.5) return INK;
    return w >= k ? WHITE : INK;
  }
  /** Move `fg` toward ink or white in 2% steps until it reaches `target` contrast on every background. */
  function ensure(fg, bgs, target) {
    bgs = [].concat(bgs);
    var ok = function (c) { return bgs.every(function (b) { return contrast(c, b) >= target; }); };
    if (ok(fg)) return fg;
    var dir = onColor(bgs[0]) === WHITE ? WHITE : BLACK;
    for (var t = 0.02; t <= 1.0001; t += 0.02) {
      var c = mix(fg, dir, t);
      if (ok(c)) return c;
    }
    return dir === WHITE ? WHITE : INK;
  }
  /** Lowest opacity of `fg` over `bg` (from `start`) that reaches `target`, returned as a solid colour. */
  function tier(fg, bg, start, target) {
    for (var a = start; a <= 1.0001; a += 0.02) {
      var c = mix(bg, fg, a);
      if (contrast(c, bg) >= target) return c;
    }
    return fg;
  }
  function rgba(c, a) {
    var x = parse(c);
    return "rgba(" + x.join(",") + "," + a + ")";
  }
  var STATE = { hover: 0.08, focus: 0.12, pressed: 0.12, dragged: 0.16, disabledContent: 0.38, disabledContainer: 0.12 };

  // Status colours: [solid, text] for light canvases and for dark canvases.
  var STATUS = {
    light: { success: ["#1FB877", "#0E7048"], warning: ["#F5A70B", "#8A5B00"], danger: ["#F0453E", "#C2241E"], info: ["#2F66F6", "#1F4FD1"] },
    dark: { success: ["#4BD394", "#7CE0B3"], warning: ["#FFC23D", "#FFD266"], danger: ["#FF6B64", "#FF9A9A"], info: ["#6E95FF", "#9DB8FF"] }
  };

  // ---------- role builders ----------
  /** Accent (secondary colour) roles on a given canvas and surface. Used by every theme. */
  function accentRoles(secondary, canvas, surface) {
    var on = onColor(secondary), fill = secondary, away = on === WHITE ? BLACK : WHITE;
    // A mid-tone secondary can't carry a label: deepen the fill until even its pressed state reads.
    for (var d = 0.02; contrast(on, mix(fill, on, STATE.pressed)) < 4.5 && d <= 1; d += 0.02) fill = mix(secondary, away, d);
    return {
      "accent": fill,
      "accent-hover": mix(fill, on, STATE.hover),
      "accent-pressed": mix(fill, on, STATE.pressed),
      "accent-subtle": mix(surface, secondary, 0.18),
      "accent-text": ensure(secondary, [canvas, surface], 4.5),
      "accent-graphic": ensure(secondary, [canvas, surface], 3),
      "on-accent": on
    };
  }
  /** Brand-panel roles: a card or backdrop filled with the primary colour (all themes). */
  function brandPanelRoles(primary) {
    var on = onColor(primary), P = primary;
    for (var d = 0.02; contrast(on, P) < 4.6 && d <= 1; d += 0.02) P = mix(primary, on === INK ? WHITE : BLACK, d);
    primary = P;
    return {
      "bg-brand": primary,
      "fg-on-brand": on,
      "fg-on-brand-secondary": tier(on, primary, 0.72, 4.5)
    };
  }
  function shadowSet(color, k) {
    return {
      "shadow-e1": "0 1px 2px " + rgba(color, 0.04 * k) + ", 0 2px 8px " + rgba(color, 0.04 * k),
      "shadow-e2": "0 4px 12px " + rgba(color, 0.05 * k) + ", 0 12px 32px " + rgba(color, 0.06 * k),
      "shadow-e3": "0 12px 24px " + rgba(color, 0.08 * k) + ", 0 24px 56px " + rgba(color, 0.1 * k),
      "shadow-e4": "0 16px 40px " + rgba(color, 0.24 * Math.min(k, 2))
    };
  }

  /**
   * The Brand theme: the canvas is the primary colour, surfaces are tinted glass, text and the
   * primary action are ink or white (picked by measured contrast), the secondary colour is the highlight.
   */
  function brandRoles(primary, secondary) {
    var P0 = hex(parse(primary));
    var S = hex(parse(secondary));
    var fg = onColor(P0);
    var light = fg === INK; // a light primary (mustard, lime, sky) carries ink text
    var opp = light ? WHITE : INK;
    var away = light ? WHITE : BLACK; // the direction that adds contrast for fg

    // 1. Canvas: the primary itself, deepened (or lightened) only as far as text needs (≥ 4.6:1).
    var P = P0;
    for (var d = 0.02; contrast(fg, P) < 4.6 && d <= 1; d += 0.02) P = mix(P0, away, d);

    // 2. Anything drawn on the canvas tints toward white (glass) when text still reads, else toward `away`.
    function lift(t, min) {
      var c = mix(P, WHITE, t);
      if (contrast(fg, c) >= (min || 4.5)) return c;
      if (contrast(fg, mix(P, WHITE, t / 2)) >= (min || 4.5)) return mix(P, WHITE, t / 2);
      return mix(P, away, t); // mid-tone primaries: step the other way so surfaces still separate
    }
    var ctlDir = contrast(fg, mix(P, WHITE, 0.34)) >= 4.5 ? WHITE : away;
    function ctl(t) { return mix(P, ctlDir, t); }

    var surface = lift(light ? 0.3 : 0.12), raised = lift(light ? 0.45 : 0.2);
    if (contrast(surface, P) < 1.04) { surface = mix(P, BLACK, 0.04); raised = mix(P, BLACK, 0.07); } // near-white primary
    var canvases = [P, surface, raised];
    var worst = canvases.reduce(function (w, c) { return contrast(fg, c) < contrast(fg, w) ? c : w; }, P);
    var matDir = contrast(fg, mix(P, WHITE, light ? 0.56 : 0.24)) >= 4.5 ? WHITE : BLACK;
    var mat = matDir === WHITE ? (light ? [0.18, 0.28, 0.4, 0.56] : [0.08, 0.12, 0.16, 0.24]) : [0.1, 0.16, 0.22, 0.3];
    var status = light ? STATUS.light : STATUS.dark;

    var r = {
      "bg-canvas": P,
      "bg-canvas-elevated": lift(0.06),
      "bg-surface": surface,
      "bg-surface-raised": raised,
      "bg-surface-sunken": light ? mix(P, WHITE, 0.16) : mix(P, BLACK, 0.14),
      "bg-emphasis": fg,
      "bg-emphasis-raised": mix(fg, P, 0.12),
      "bg-scrim": "rgba(0,0,0,0.48)",

      "fill-control": ctl(0.18),
      "fill-control-hover": ctl(0.26),
      "fill-control-pressed": ctl(0.34),
      "fill-disabled": mix(P, fg, STATE.disabledContainer),

      "fg-primary": fg,
      "fg-secondary": tier(fg, worst, 0.74, 4.5),
      "fg-tertiary": tier(fg, worst, 0.56, 3),
      "fg-disabled": mix(P, fg, STATE.disabledContent),
      "fg-on-emphasis": opp,
      "fg-on-emphasis-secondary": tier(opp, fg, 0.6, 4.5),

      "border-subtle": mix(P, fg, 0.16),
      "border-default": mix(P, fg, 0.28),
      "border-strong": mix(P, fg, 0.44),
      "border-focus": fg,

      "action-primary": fg,
      "action-primary-hover": mix(fg, opp, STATE.hover),
      "action-primary-pressed": mix(fg, opp, STATE.pressed),
      "on-action-primary": opp,
      "action-secondary": ctl(0.18),
      "action-secondary-hover": ctl(0.26),
      "action-secondary-pressed": ctl(0.34),
      "on-action-secondary": fg,

      "material-ultrathin": rgba(matDir, mat[0]),
      "material-thin": rgba(matDir, mat[1]),
      "material-regular": rgba(matDir, mat[2]),
      "material-thick": rgba(matDir, mat[3]),
      "material-border": rgba(WHITE, light ? 0.55 : 0.22),
      "material-highlight": rgba(WHITE, light ? 0.7 : 0.35),
      "material-shade": "rgba(0,0,0,0.16)",
      "material-dark": "rgba(0,0,0,0.28)",
      "material-dark-border": "rgba(255,255,255,0.12)",

      "chart-track": mix(P, fg, 0.14),
      "chart-grid": mix(P, fg, 0.12),
      "chart-muted": mix(P, fg, 0.24),
      "chart-hatch": mix(P, fg, 0.32),
      "tick": mix(P, fg, 0.4),
      "tick-strong": fg
    };
    var acc = accentRoles(S, P, surface);
    acc["accent-subtle"] = mix(P, S, 0.24);
    acc["accent-text"] = ensure(S, canvases, 4.5);
    acc["accent-graphic"] = ensure(S, canvases, 3);
    Object.assign(r, acc);

    ["success", "warning", "danger", "info"].forEach(function (k) {
      r[k] = ensure(status[k][0], canvases, 3);
      r[k + "-subtle"] = light ? mix(mix(P, WHITE, 0.3), r[k], 0.2) : mix(mix(P, BLACK, 0.2), r[k], 0.2);
      r[k + "-text"] = ensure(status[k][1], canvases.concat(r[k + "-subtle"]), 4.5);
    });
    Object.assign(r, brandPanelRoles(P));
    var shade = mix(P, BLACK, 0.7);
    Object.assign(r, shadowSet(shade, light ? 2 : 3));
    r["shadow-glass"] = "0 1px 0 " + rgba(WHITE, light ? 0.5 : 0.2) + " inset, 0 20px 50px " + rgba(shade, 0.28);
    return r;
  }

  // ---------- contrast audit (shared with the build) ----------
  /** Required pairs: [foreground, background(s), minimum, label]. Translucent values are composited first. */
  function pairs(theme) {
    var aaa = theme === "brand" ? 4.5 : 7;
    return [
      ["fg-primary", ["bg-canvas", "bg-surface", "bg-surface-raised", "bg-canvas-elevated"], aaa, "Primary text"],
      ["fg-secondary", ["bg-canvas", "bg-surface", "bg-surface-raised"], 4.5, "Secondary text"],
      ["fg-tertiary", ["bg-canvas", "bg-surface"], 3, "Tertiary text (non-essential, ≥ 18px or captions)"],
      ["fg-on-emphasis", ["bg-emphasis", "bg-emphasis-raised"], 4.5, "Text on emphasis card"],
      ["fg-on-emphasis-secondary", ["bg-emphasis"], 4.5, "Secondary text on emphasis card"],
      ["fg-on-brand", ["bg-brand"], 4.5, "Text on brand panel"],
      ["fg-on-brand-secondary", ["bg-brand"], 4.5, "Secondary text on brand panel"],
      ["on-action-primary", ["action-primary", "action-primary-hover", "action-primary-pressed"], 4.5, "Primary button label"],
      ["on-action-secondary", ["action-secondary", "action-secondary-hover", "action-secondary-pressed"], 4.5, "Secondary button label"],
      ["on-accent", ["accent", "accent-hover", "accent-pressed"], 4.5, "Label on accent fill"],
      ["accent-text", ["bg-canvas", "bg-surface"], 4.5, "Accent text"],
      ["accent-graphic", ["bg-canvas", "bg-surface"], 3, "Accent strokes, dots, focus"],
      ["border-focus", ["bg-canvas", "bg-surface"], 3, "Focus ring"],
      ["success-text", ["bg-canvas", "bg-surface", "success-subtle"], 4.5, "Success text"],
      ["warning-text", ["bg-canvas", "bg-surface", "warning-subtle"], 4.5, "Warning text"],
      ["danger-text", ["bg-canvas", "bg-surface", "danger-subtle"], 4.5, "Danger text"],
      ["info-text", ["bg-canvas", "bg-surface", "info-subtle"], 4.5, "Info text"],
      ["fg-primary", ["material-regular@bg-canvas", "material-thick@bg-canvas"], 4.5, "Text on glass (over canvas)"]
    ];
  }
  function solid(roles, key, base) {
    var v = roles[key];
    var m = /^rgba?\(([^)]+)\)$/.exec(v);
    if (!m) return v;
    var p = m[1].split(",").map(Number);
    return mix(base || roles["bg-canvas"], hex(p.slice(0, 3)), p[3] == null ? 1 : p[3]);
  }
  function audit(roles, theme) {
    var out = [];
    pairs(theme).forEach(function (p) {
      p[1].forEach(function (bgKey) {
        var parts = bgKey.split("@");
        var bg = parts[1] ? solid(roles, parts[0], solid(roles, parts[1])) : solid(roles, bgKey);
        var fg = solid(roles, p[0], bg);
        var c = contrast(fg, bg);
        out.push({ fg: p[0], bg: bgKey, ratio: Math.round(c * 100) / 100, min: p[2], pass: c >= p[2] - 0.005, label: p[3] });
      });
    });
    return out;
  }

  // ---------- browser runtime ----------
  function apply(el, roles) {
    for (var k in roles) el.style.setProperty("--rdl-" + k, roles[k]);
  }
  function clear(el, prefixKeys) {
    prefixKeys.forEach(function (k) { el.style.removeProperty("--rdl-" + k); });
  }
  /**
   * Switch theme on an element (default <html>).
   *   setTheme("light" | "dark")                                  neutral themes; optional { secondary } sets the accent
   *   setTheme("brand", { primary, secondary })                  brand theme from any two colours
   * Returns the computed roles and the contrast audit.
   */
  function setTheme(theme, opts) {
    opts = opts || {};
    var el = opts.el || document.documentElement;
    clear(el, el.__rdlKeys || []);
    el.setAttribute("data-theme", theme);
    var roles = {};
    if (theme === "brand") {
      if (!opts.primary || !opts.secondary) { el.__rdlKeys = []; return { roles: roles, audit: [] }; } // uses a data-brand preset from tokens.css
      roles = brandRoles(opts.primary, opts.secondary);
      roles["brand-primary"] = hex(parse(opts.primary));
      roles["brand-secondary"] = hex(parse(opts.secondary));
    } else if (opts.secondary || opts.primary) {
      var cs = getComputedStyle(el);
      var canvas = cs.getPropertyValue("--rdl-bg-canvas").trim(), surface = cs.getPropertyValue("--rdl-bg-surface").trim();
      if (opts.secondary) roles = accentRoles(hex(parse(opts.secondary)), canvas, surface);
      if (opts.primary) Object.assign(roles, brandPanelRoles(hex(parse(opts.primary))));
    }
    apply(el, roles);
    el.__rdlKeys = Object.keys(roles);
    return { roles: roles, audit: theme === "brand" ? audit(roles, "brand") : [] };
  }
  function setAccent(secondary, el) {
    el = el || document.documentElement;
    return setTheme(el.getAttribute("data-theme") || "light", { secondary: secondary, el: el });
  }

  return {
    version: "4.0.0",
    INK: INK, WHITE: WHITE, STATE: STATE, STATUS: STATUS,
    parse: parse, hex: hex, mix: mix, luminance: luminance, contrast: contrast, onColor: onColor, ensure: ensure, tier: tier, rgba: rgba,
    accentRoles: accentRoles, brandPanelRoles: brandPanelRoles, brandRoles: brandRoles, shadowSet: shadowSet,
    pairs: pairs, audit: audit, solid: solid,
    setTheme: setTheme, setAccent: setAccent
  };
});
```

## Appendix N · `assets/ios/RDLThemeEngine.swift`

SwiftUI port of Appendix M plus RDLTheme (apply, colour resolution, .rdlThemedRoot()).

```swift
// RDLThemeEngine.swift — RDL v4 themes on iOS: Light, Dark, System and Brand (primary + secondary).
//
// A line-for-line port of assets/tokens/rdl-theme.js, so the same two brand colours resolve to the
// same roles on the web and on iOS. Pairs with the generated RDLTokens.swift (RDLThemeData, RDLColor).
//
//   RDLTheme.apply(.brand(primary: "#0732D8", secondary: "#F2D33C"))   // canvas = primary, highlight = secondary
//   RDLTheme.apply(.dark, accent: "#D7F23A")                            // neutral dark, custom secondary
//   RDLTheme.apply(.system)                                             // light/dark follow the device
//
// Every `RDLColor` role is a dynamic colour that reads the active theme when it draws. After calling
// `apply`, refresh the hierarchy (e.g. change an `.id(themeVersion)` on the root view) and set
// `.preferredColorScheme(RDLTheme.colorScheme)` so system chrome matches.
import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

// MARK: - Colour math and role builders

public enum RDLThemeEngine {
    public static let ink = "#151515"
    public static let white = "#FFFFFF"
    public static let black = "#000000"
    static let hover = 0.08, pressed = 0.12, disabledContent = 0.38, disabledContainer = 0.12

    /// Status colours: (solid, text) for light canvases and for dark canvases.
    static let statusLight: [String: (String, String)] = [
        "success": ("#1FB877", "#0E7048"), "warning": ("#F5A70B", "#8A5B00"),
        "danger": ("#F0453E", "#C2241E"), "info": ("#2F66F6", "#1F4FD1"),
    ]
    static let statusDark: [String: (String, String)] = [
        "success": ("#4BD394", "#7CE0B3"), "warning": ("#FFC23D", "#FFD266"),
        "danger": ("#FF6B64", "#FF9A9A"), "info": ("#6E95FF", "#9DB8FF"),
    ]

    public static func parse(_ hex: String) -> [Double] {
        var h = hex.trimmingCharacters(in: .whitespaces).replacingOccurrences(of: "#", with: "")
        if h.count == 3 { h = h.map { "\($0)\($0)" }.joined() }
        guard h.count == 6, let v = UInt32(h, radix: 16) else { return [0, 0, 0] }
        return [Double((v >> 16) & 0xFF), Double((v >> 8) & 0xFF), Double(v & 0xFF)]
    }

    public static func hex(_ c: [Double]) -> String {
        let v = c.map { Int(max(0, min(255, $0.rounded()))) }
        return String(format: "#%02X%02X%02X", v[0], v[1], v[2])
    }

    /// Mix `b` into `a` by `t` (0 = a, 1 = b).
    public static func mix(_ a: String, _ b: String, _ t: Double) -> String {
        let x = parse(a), y = parse(b)
        return hex((0..<3).map { x[$0] + (y[$0] - x[$0]) * t })
    }

    public static func luminance(_ c: String) -> Double {
        let w = [0.2126, 0.7152, 0.0722]
        return parse(c).enumerated().reduce(0) { sum, e in
            let v = e.element / 255
            let lin = v <= 0.04045 ? v / 12.92 : pow((v + 0.055) / 1.055, 2.4)
            return sum + lin * w[e.offset]
        }
    }

    public static func contrast(_ a: String, _ b: String) -> Double {
        let l1 = luminance(a), l2 = luminance(b)
        return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
    }

    /// Ink or white, whichever reads better on `bg`. White wins when it reaches 4.5:1.
    public static func onColor(_ bg: String) -> String {
        let w = contrast(white, bg), k = contrast(ink, bg)
        if w >= 4.5 { return white }
        if k >= 4.5 { return ink }
        return w >= k ? white : ink
    }

    /// Move `fg` toward ink or white in 2% steps until it reaches `target` on every background.
    public static func ensure(_ fg: String, _ bgs: [String], _ target: Double) -> String {
        let ok: (String) -> Bool = { c in bgs.allSatisfy { contrast(c, $0) >= target } }
        if ok(fg) { return fg }
        let dir = onColor(bgs[0]) == white ? white : black
        var t = 0.02
        while t <= 1.0001 {
            let c = mix(fg, dir, t)
            if ok(c) { return c }
            t += 0.02
        }
        return dir == white ? white : ink
    }

    /// Lowest opacity of `fg` over `bg` (from `start`) that reaches `target`, as a solid colour.
    public static func tier(_ fg: String, _ bg: String, _ start: Double, _ target: Double) -> String {
        var a = start
        while a <= 1.0001 {
            let c = mix(bg, fg, a)
            if contrast(c, bg) >= target { return c }
            a += 0.02
        }
        return fg
    }

    public static func rgba(_ c: String, _ a: Double) -> String {
        let x = parse(c).map { Int($0) }
        return "rgba(\(x[0]),\(x[1]),\(x[2]),\(a))"
    }

    /// Accent (secondary colour) roles on a canvas and surface.
    public static func accentRoles(_ secondary: String, canvas: String, surface: String) -> [String: String] {
        let on = onColor(secondary)
        let away = on == white ? black : white
        var fill = secondary
        var d = 0.02
        while contrast(on, mix(fill, on, pressed)) < 4.5 && d <= 1 {
            fill = mix(secondary, away, d)
            d += 0.02
        }
        return [
            "accent": fill,
            "accent-hover": mix(fill, on, hover),
            "accent-pressed": mix(fill, on, pressed),
            "accent-subtle": mix(surface, secondary, 0.18),
            "accent-text": ensure(secondary, [canvas, surface], 4.5),
            "accent-graphic": ensure(secondary, [canvas, surface], 3),
            "on-accent": on,
        ]
    }

    /// Brand panel roles: a card or backdrop filled with the primary colour.
    public static func brandPanelRoles(_ primary: String) -> [String: String] {
        let on = onColor(primary)
        var p = primary
        var d = 0.02
        while contrast(on, p) < 4.6 && d <= 1 {
            p = mix(primary, on == ink ? white : black, d)
            d += 0.02
        }
        return ["bg-brand": p, "fg-on-brand": on, "fg-on-brand-secondary": tier(on, p, 0.72, 4.5)]
    }

    /// The brand theme: canvas = primary, highlight = secondary, text and primary action by contrast.
    public static func brandRoles(primary: String, secondary: String) -> [String: String] {
        let p0 = hex(parse(primary)), s = hex(parse(secondary))
        let fg = onColor(p0)
        let light = fg == ink
        let opp = light ? white : ink
        let away = light ? white : black

        var p = p0
        var d = 0.02
        while contrast(fg, p) < 4.6 && d <= 1 {
            p = mix(p0, away, d)
            d += 0.02
        }
        func lift(_ t: Double) -> String {
            let c = mix(p, white, t)
            if contrast(fg, c) >= 4.5 { return c }
            if contrast(fg, mix(p, white, t / 2)) >= 4.5 { return mix(p, white, t / 2) }
            return mix(p, away, t)
        }
        let ctlDir = contrast(fg, mix(p, white, 0.34)) >= 4.5 ? white : away
        func ctl(_ t: Double) -> String { mix(p, ctlDir, t) }

        var surface = lift(light ? 0.3 : 0.12), raised = lift(light ? 0.45 : 0.2)
        if contrast(surface, p) < 1.04 { surface = mix(p, black, 0.04); raised = mix(p, black, 0.07) }
        let canvases = [p, surface, raised]
        let worst = canvases.reduce(p) { w, c in contrast(fg, c) < contrast(fg, w) ? c : w }
        let matDir = contrast(fg, mix(p, white, light ? 0.56 : 0.24)) >= 4.5 ? white : black
        let mat = matDir == white ? (light ? [0.18, 0.28, 0.4, 0.56] : [0.08, 0.12, 0.16, 0.24]) : [0.1, 0.16, 0.22, 0.3]
        let status = light ? statusLight : statusDark

        var r: [String: String] = [
            "bg-canvas": p,
            "bg-canvas-elevated": lift(0.06),
            "bg-surface": surface,
            "bg-surface-raised": raised,
            "bg-surface-sunken": light ? mix(p, white, 0.16) : mix(p, black, 0.14),
            "bg-emphasis": fg,
            "bg-emphasis-raised": mix(fg, p, 0.12),
            "bg-scrim": "rgba(0,0,0,0.48)",
            "fill-control": ctl(0.18),
            "fill-control-hover": ctl(0.26),
            "fill-control-pressed": ctl(0.34),
            "fill-disabled": mix(p, fg, disabledContainer),
            "fg-primary": fg,
            "fg-secondary": tier(fg, worst, 0.74, 4.5),
            "fg-tertiary": tier(fg, worst, 0.56, 3),
            "fg-disabled": mix(p, fg, disabledContent),
            "fg-on-emphasis": opp,
            "fg-on-emphasis-secondary": tier(opp, fg, 0.6, 4.5),
            "border-subtle": mix(p, fg, 0.16),
            "border-default": mix(p, fg, 0.28),
            "border-strong": mix(p, fg, 0.44),
            "border-focus": fg,
            "action-primary": fg,
            "action-primary-hover": mix(fg, opp, hover),
            "action-primary-pressed": mix(fg, opp, pressed),
            "on-action-primary": opp,
            "action-secondary": ctl(0.18),
            "action-secondary-hover": ctl(0.26),
            "action-secondary-pressed": ctl(0.34),
            "on-action-secondary": fg,
            "material-ultrathin": rgba(matDir, mat[0]),
            "material-thin": rgba(matDir, mat[1]),
            "material-regular": rgba(matDir, mat[2]),
            "material-thick": rgba(matDir, mat[3]),
            "material-border": rgba(white, light ? 0.55 : 0.22),
            "material-highlight": rgba(white, light ? 0.7 : 0.35),
            "material-shade": "rgba(0,0,0,0.16)",
            "material-dark": "rgba(0,0,0,0.28)",
            "material-dark-border": "rgba(255,255,255,0.12)",
            "chart-track": mix(p, fg, 0.14),
            "chart-grid": mix(p, fg, 0.12),
            "chart-muted": mix(p, fg, 0.24),
            "chart-hatch": mix(p, fg, 0.32),
            "tick": mix(p, fg, 0.4),
            "tick-strong": fg,
        ]
        var acc = accentRoles(s, canvas: p, surface: surface)
        acc["accent-subtle"] = mix(p, s, 0.24)
        acc["accent-text"] = ensure(s, canvases, 4.5)
        acc["accent-graphic"] = ensure(s, canvases, 3)
        r.merge(acc) { _, new in new }
        for k in ["success", "warning", "danger", "info"] {
            let (solid, text) = status[k]!
            let c = ensure(solid, canvases, 3)
            let subtle = light ? mix(mix(p, white, 0.3), c, 0.2) : mix(mix(p, black, 0.2), c, 0.2)
            r[k] = c
            r[k + "-subtle"] = subtle
            r[k + "-text"] = ensure(text, canvases + [subtle], 4.5)
        }
        r.merge(brandPanelRoles(p)) { _, new in new }
        return r
    }
}

// MARK: - Active theme

public enum RDLThemeMode: Equatable {
    case system, light, dark
    case brand(primary: String, secondary: String)

    /// A named brand preset from tokens.json (cobalt, mustard, gold, olive, forest, lavender, plum, vermilion, dusk).
    public static func brandPreset(_ name: String) -> RDLThemeMode {
        let p = RDLThemeData.brandPresets[name] ?? RDLThemeData.brandPresets[RDLThemeData.defaultBrand]!
        return .brand(primary: p.primary, secondary: p.secondary)
    }
}

public enum RDLTheme {
    public private(set) static var mode: RDLThemeMode = .system
    public private(set) static var secondary: String = RDLThemeData.accentPresets[RDLThemeData.defaultAccent]!
    public private(set) static var primary: String = RDLThemeData.brandPresets[RDLThemeData.defaultBrand]!.primary
    private static var cache: [String: [String: String]] = [:]

    /// Switch theme. `accent` sets the secondary colour for light and dark; `brand` sets the primary used
    /// by brand panels in light and dark. In `.brand(...)` both come from the mode itself.
    public static func apply(_ newMode: RDLThemeMode, accent: String? = nil, brand: String? = nil) {
        mode = newMode
        if case let .brand(p, s) = newMode { primary = p; secondary = s }
        if let accent { secondary = accent }
        if let brand { primary = brand }
        cache = [:]
    }

    /// The colour scheme system chrome should use for the active theme (nil = follow the device).
    public static var colorScheme: ColorScheme? {
        switch mode {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        case let .brand(p, _): return RDLThemeEngine.onColor(p) == RDLThemeEngine.white ? .dark : .light
        }
    }

    /// All roles for one concrete theme ("light", "dark" or "brand"), optionally with another secondary colour.
    public static func roles(_ theme: String, secondary override: String? = nil) -> [String: String] {
        let sec = override ?? secondary
        let key = "\(theme)|\(sec)|\(primary)|\(mode)"
        if let hit = cache[key] { return hit }
        var r: [String: String]
        if theme == "brand", case let .brand(p, s) = mode {
            r = RDLThemeEngine.brandRoles(primary: p, secondary: override ?? s)
        } else {
            let base = theme == "dark" ? RDLThemeData.dark : RDLThemeData.light
            r = base
            r.merge(RDLThemeEngine.accentRoles(sec, canvas: base["bg-canvas"]!, surface: base["bg-surface"]!)) { _, new in new }
            r.merge(RDLThemeEngine.brandPanelRoles(primary)) { _, new in new }
            for (k, v) in r where v.hasPrefix("$") { r[k] = r[String(v.dropFirst())] }
        }
        cache[key] = r
        return r
    }

    static func value(_ key: String, dark: Bool, secondary: String?) -> String {
        let theme: String
        switch mode {
        case .brand: theme = "brand"
        case .light: theme = "light"
        case .dark: theme = "dark"
        case .system: theme = dark ? "dark" : "light"
        }
        let k = RDLThemeData.legacy[key] ?? key
        return roles(theme, secondary: secondary)[k] ?? "#FF00FF"
    }

    /// A dynamic colour for a semantic role; resolves for the active theme every time it draws.
    public static func color(_ key: String, secondary: String? = nil) -> Color {
        #if canImport(UIKit)
        return Color(UIColor { traits in
            uiColor(value(key, dark: traits.userInterfaceStyle == .dark, secondary: secondary))
        })
        #else
        return fixed(value(key, dark: false, secondary: secondary))
        #endif
    }

    /// A constant colour from `#RRGGBB` or `rgba(r,g,b,a)`.
    public static func fixed(_ value: String) -> Color {
        let c = components(value)
        return Color(.sRGB, red: c[0], green: c[1], blue: c[2], opacity: c[3])
    }

    static func components(_ value: String) -> [Double] {
        if value.hasPrefix("rgba") {
            let nums = value.dropFirst(5).dropLast().split(separator: ",").compactMap { Double($0.trimmingCharacters(in: .whitespaces)) }
            if nums.count == 4 { return [nums[0] / 255, nums[1] / 255, nums[2] / 255, nums[3]] }
        }
        let p = RDLThemeEngine.parse(value)
        return [p[0] / 255, p[1] / 255, p[2] / 255, 1]
    }

    #if canImport(UIKit)
    static func uiColor(_ value: String) -> UIColor {
        let c = components(value)
        return UIColor(red: c[0], green: c[1], blue: c[2], alpha: c[3])
    }
    #endif
}

public extension View {
    /// Paints the active theme's canvas behind the view and matches system chrome to the theme.
    func rdlThemedRoot() -> some View {
        background(RDLColor.bgCanvas.ignoresSafeArea())
            .foregroundStyle(RDLColor.fgPrimary)
            .preferredColorScheme(RDLTheme.colorScheme)
    }
}
```

## Appendix O · `assets/templates/theme-studio.html`

Live primary/secondary picker: Light, Dark and Brand side by side, every role, live audit. Needs Appendices B, F and M at their paths.

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RDL Theme Studio</title>
<!-- v4 theme studio: pick a primary and a secondary colour and see Light, Dark and Brand update live,
     with every semantic role and the contrast audit. Uses assets/tokens/rdl-theme.js (the same engine
     the build and RDLThemeEngine.swift use). Params: ?primary=0732D8&secondary=F2D33C -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&family=Doto:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../tokens/tokens.css">
<link rel="stylesheet" href="rdl-components.css">
<script src="../tokens/rdl-theme.js"></script>
<style>
  h1, h2, h3, p { margin: 0; }
  body { margin: 0; background: var(--rdl-bg-canvas); color: var(--rdl-fg-primary); font-family: var(--rdl-font-sans); }
  .studio { max-width: 1440px; margin: 0 auto; padding: 40px 32px 80px; display: grid; gap: 32px; }
  .studio__head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 24px; }
  .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .picker { display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 16px 0 6px; border-radius: 999px; background: var(--rdl-fill-control); font-size: 14px; font-weight: 500; }
  .picker input[type=color] { width: 36px; height: 36px; border: 0; padding: 0; border-radius: 50%; background: none; cursor: pointer; }
  .picker input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
  .picker input[type=color]::-webkit-color-swatch { border: 0; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12); }
  .picker input[type=text] { width: 76px; border: 0; background: none; font: inherit; color: inherit; text-transform: uppercase; }
  .presets { display: flex; flex-wrap: wrap; gap: 8px; }
  .preset { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px 0 8px; border: 0; border-radius: 999px; background: var(--rdl-fill-control); color: var(--rdl-fg-primary); font: 500 13px/1 var(--rdl-font-sans); cursor: pointer; }
  .preset[aria-pressed="true"] { background: var(--rdl-action-primary); color: var(--rdl-on-action-primary); }
  .dots { display: inline-flex; } .dots i { width: 22px; height: 22px; border-radius: 50%; box-shadow: 0 0 0 2px var(--rdl-bg-canvas); } .dots i + i { margin-left: -6px; }
  .phones { display: grid; grid-template-columns: repeat(3, 393px); justify-content: center; gap: 40px; }
  .phonecol { display: grid; gap: 16px; justify-items: center; }
  .phonecol__label { display: grid; justify-items: center; gap: 2px; font-size: 15px; font-weight: 500; }
  .phonecol__label small { font-size: 12px; font-weight: 400; color: var(--rdl-fg-secondary); }
  .phone { width: 393px; height: 852px; border-radius: 56px; position: relative; overflow: hidden; background: var(--rdl-bg-canvas); color: var(--rdl-text-primary);
    box-shadow: 0 0 0 11px #0E0F10, 0 0 0 12.5px #3A3B3F, 0 40px 80px rgba(0,0,0,0.18); }
  .island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 124px; height: 36px; border-radius: 20px; background: #000; z-index: 5; }
  .statusbar { height: 54px; display: flex; align-items: center; justify-content: space-between; padding: 6px 36px 0 40px; font-size: 16px; font-weight: 600; }
  .statusbar svg { width: 64px; height: 14px; }
  .phone .rdl-screen { min-height: 0; }
  .wave { width: 100%; height: 72px; display: block; overflow: visible; }
  .ico { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
  .audit { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .roles { width: 100%; border-collapse: collapse; font-size: 13px; }
  .roles th, .roles td { text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--rdl-border-subtle); vertical-align: middle; }
  .roles th { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--rdl-fg-secondary); }
  .roles td:first-child { font-family: var(--rdl-font-mono); font-size: 12px; white-space: nowrap; }
  .roles .grp td { padding-top: 24px; font: 600 12px/1 var(--rdl-font-sans); color: var(--rdl-fg-secondary); text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 0; }
  .chipval { display: inline-flex; align-items: center; gap: 8px; font-family: var(--rdl-font-mono); font-size: 12px; }
  .chipval i { width: 28px; height: 20px; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(127,127,127,0.25); background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%); background-size: 8px 8px; background-position: 0 0, 4px 4px; position: relative; }
  .chipval i::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: var(--c); }
  .note { font-size: 13px; color: var(--rdl-fg-secondary); max-width: 72ch; line-height: 1.5; }
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
  <symbol id="i-swap" viewBox="0 0 24 24"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></symbol>
  <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
  <symbol id="i-bars" viewBox="0 0 64 14"><rect x="0" y="8" width="3" height="5" rx="1" fill="currentColor"/><rect x="5" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="10" y="2" width="3" height="11" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="13" rx="1" fill="currentColor"/><rect x="38" y="1" width="22" height="12" rx="4" fill="none" stroke="currentColor"/><rect x="40" y="3" width="15" height="8" rx="2" fill="currentColor"/></symbol>
</svg>
<template id="home">
  <div class="island"></div>
  <div class="statusbar"><span>9:41</span><svg><use href="#i-bars"/></svg></div>
  <div class="rdl-screen rdl-stack--title">
    <header class="rdl-header">
      <button class="rdl-orb" aria-label="Profile"><svg class="ico"><use href="#i-user"/></svg></button>
      <span class="rdl-chip">24K · 99.9% pure</span>
      <span><button class="rdl-orb" aria-label="Alerts"><svg class="ico"><use href="#i-bell"/></svg></button></span>
    </header>
    <div class="rdl-stack rdl-stack--section">
      <div class="rdl-stack rdl-stack--loose">
        <h1 class="rdl-h2 rdl-mix">Good morning, <b>Aarav</b></h1>
        <div class="rdl-stack rdl-stack--tight">
          <p class="rdl-caption rdl-muted">Portfolio value</p>
          <p class="rdl-figure rdl-display"><span class="rdl-cur">₹</span>4,82,190<span class="rdl-unit">.36</span></p>
        </div>
        <div class="rdl-inline"><span class="rdl-status">Live</span><span class="rdl-meta rdl-muted">+₹12,408 · 30 days</span></div>
      </div>
      <div class="rdl-stack rdl-stack--card">
        <article class="rdl-card rdl-metric">
          <p class="rdl-metric__label">Gold · per gram</p>
          <span class="rdl-delta rdl-metric__action">+1.8%</span>
          <div class="rdl-metric__viz">
            <svg class="wave" viewBox="0 0 313 72" aria-label="Price, last 7 days">
              <path d="M0 56 C24 52 36 40 60 44 S96 60 120 46 S160 14 188 24 S224 44 248 30 S286 12 313 14" fill="none" stroke="var(--rdl-tick)" stroke-width="1.4" stroke-dasharray="1.5 5" stroke-linecap="round"/>
              <path d="M96 52 C104 50 112 48 120 46 S160 14 188 24 S220 40 236 34" fill="none" stroke="var(--rdl-fg-primary)" stroke-width="2"/>
              <line x1="188" x2="188" y1="24" y2="72" stroke="var(--rdl-fg-primary)" stroke-dasharray="2 4"/>
              <circle cx="188" cy="24" r="5" fill="var(--rdl-fg-primary)" stroke="var(--rdl-accent-graphic)" stroke-width="3"/>
            </svg>
          </div>
          <p class="rdl-figure rdl-numeral rdl-metric__figure"><span class="rdl-cur">₹</span>7,284<span class="rdl-unit">.20</span></p>
          <span class="rdl-meta rdl-muted rdl-metric__context">7 days</span>
        </article>
        <div class="rdl-grid-2">
          <article class="rdl-widget rdl-widget--ink rdl-metric">
            <p class="rdl-metric__label">Holdings</p>
            <span class="rdl-tag rdl-tag--accent rdl-metric__action">+0.4 g</span>
            <p class="rdl-figure rdl-figure--dot rdl-numeral rdl-metric__figure">66.2<span class="rdl-unit">g</span></p>
          </article>
          <article class="rdl-widget rdl-card--brand rdl-metric">
            <p class="rdl-metric__label">Next SIP</p>
            <button class="rdl-orb rdl-orb--white rdl-metric__action" aria-label="Open SIP"><svg class="ico"><use href="#i-arrow"/></svg></button>
            <div class="rdl-stack rdl-stack--tight rdl-metric__figure">
              <p class="rdl-figure rdl-h2">Oct 05</p>
              <p class="rdl-meta rdl-muted">₹5,000/mo</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <div class="rdl-actionrow rdl-pin">
    <button class="rdl-orb" aria-label="Exchange"><svg class="ico"><use href="#i-swap"/></svg></button>
    <button class="rdl-btn">Buy gold</button>
    <button class="rdl-orb rdl-orb--accent" aria-label="Sell"><svg class="ico"><use href="#i-down"/></svg></button>
  </div>
</template>

<main class="studio">
  <div class="studio__head">
    <div class="rdl-stack rdl-stack--tight">
      <p class="rdl-caption rdl-muted">RDL v4 · Theme studio</p>
      <h1 class="rdl-h1">Light, Dark and your Brand</h1>
    </div>
    <div class="controls">
      <label class="picker"><input type="color" id="p" value="#0732D8"><span>Primary</span><input type="text" id="ph" value="#0732D8" aria-label="Primary hex"></label>
      <label class="picker"><input type="color" id="s" value="#F2D33C"><span>Secondary</span><input type="text" id="sh" value="#F2D33C" aria-label="Secondary hex"></label>
    </div>
  </div>
  <div class="presets" id="presets" aria-label="Brand presets"></div>
  <p class="note">The primary colour fills the Brand canvas and the brand panel (“Next SIP”) in Light and Dark. The secondary colour is the highlight in all three themes: the accent tag, the accent orb, the chart datum. Ink or white text is picked by measured contrast; a primary too mid-toned for text is deepened just enough to pass. Every pair below is checked live.</p>
  <div class="phones">
    <div class="phonecol"><section class="phone" data-theme="light" id="ph-light"></section><div class="phonecol__label">Light<small id="a-light"></small></div></div>
    <div class="phonecol"><section class="phone" data-theme="dark" id="ph-dark"></section><div class="phonecol__label">Dark<small id="a-dark"></small></div></div>
    <div class="phonecol"><section class="phone" data-theme="brand" id="ph-brand"></section><div class="phonecol__label">Brand<small id="a-brand"></small></div></div>
  </div>
  <table class="roles" id="roles"><thead><tr><th>Role</th><th>Light</th><th>Dark</th><th>Brand</th><th>Use</th></tr></thead><tbody></tbody></table>
</main>

<script>
  const PRESETS = { cobalt: ["#0732D8", "#F2D33C"], mustard: ["#ECBB42", "#2A4BDC"], gold: ["#D9A632", "#1F4A3E"], olive: ["#687B59", "#D7F23A"], forest: ["#1F4A3E", "#D7F23A"], lavender: ["#AD80D4", "#F27A3A"], plum: ["#2F1125", "#F2D33C"], vermilion: ["#D44C27", "#D7F23A"], dusk: ["#7599AD", "#F6E27A"] };
  const GROUPS = [
    ["Background", [["bg-canvas", "App background"], ["bg-canvas-elevated", "Sheets, modals (HIG elevated)"], ["bg-surface", "Cards"], ["bg-surface-raised", "Menus, popovers, cards in sheets"], ["bg-surface-sunken", "Wells and tracks inside cards"], ["bg-emphasis", "Hero / emphasis card"], ["bg-brand", "Brand panel"]]],
    ["Foreground", [["fg-primary", "Titles, figures, body"], ["fg-secondary", "Labels, meta"], ["fg-tertiary", "Captions, placeholders"], ["fg-on-emphasis", "Text on emphasis card"], ["fg-on-brand", "Text on brand panel"]]],
    ["Fill and border", [["fill-control", "Orbs, chips, segmented track"], ["fill-control-pressed", "Pressed control"], ["border-subtle", "Hairlines"], ["border-strong", "Grabbers, dashed outlines"], ["border-focus", "Focus ring"]]],
    ["Action", [["action-primary", "Primary button"], ["on-action-primary", "Primary button label"], ["action-secondary", "Secondary button"]]],
    ["Accent (secondary colour)", [["accent", "Highlight fill with its own label"], ["on-accent", "Label on accent"], ["accent-subtle", "Tinted background"], ["accent-text", "Accent-coloured text"], ["accent-graphic", "Datum, needle, meter fill"]]],
    ["Status", [["success", "Dot / meter"], ["success-text", "Status text"], ["warning", "Dot / meter"], ["danger", "Dot / meter"], ["danger-text", "Error text"], ["info", "Dot / meter"]]],
    ["Material", [["material-regular", "Glass (default)"], ["material-thick", "Glass over busy backdrops"]]],
  ];
  const $ = (id) => document.getElementById(id);
  const phones = { light: $("ph-light"), dark: $("ph-dark"), brand: $("ph-brand") };
  for (const el of Object.values(phones)) el.append($("home").content.cloneNode(true));
  const pres = $("presets");
  for (const [name, [p, s]] of Object.entries(PRESETS))
    pres.insertAdjacentHTML("beforeend", `<button class="preset" data-name="${name}"><span class="dots"><i style="background:${p}"></i><i style="background:${s}"></i></span>${name[0].toUpperCase() + name.slice(1)}</button>`);

  function read(el) {
    const cs = getComputedStyle(el), r = {};
    for (const k of ["bg-canvas", "bg-surface", "bg-surface-raised", "bg-canvas-elevated", "bg-emphasis", "bg-emphasis-raised", "bg-brand", "fg-primary", "fg-secondary", "fg-tertiary", "fg-on-emphasis", "fg-on-emphasis-secondary", "fg-on-brand", "fg-on-brand-secondary", "action-primary", "action-primary-hover", "action-primary-pressed", "on-action-primary", "action-secondary", "action-secondary-hover", "action-secondary-pressed", "on-action-secondary", "accent", "accent-hover", "accent-pressed", "on-accent", "accent-text", "accent-graphic", "accent-subtle", "border-focus", "border-subtle", "border-strong", "fill-control", "fill-control-pressed", "success", "success-subtle", "success-text", "warning", "warning-subtle", "warning-text", "danger", "danger-subtle", "danger-text", "info", "info-subtle", "info-text", "material-regular", "material-thick"])
      r[k] = cs.getPropertyValue("--rdl-" + k).trim().toUpperCase().replace(/^RGBA/, "rgba");
    return r;
  }
  function render(p, s) {
    p = RDL.hex(RDL.parse(p)); s = RDL.hex(RDL.parse(s));
    $("p").value = $("ph").value = p; $("s").value = $("sh").value = s;
    RDL.setTheme("light", { el: phones.light, primary: p, secondary: s });
    RDL.setTheme("dark", { el: phones.dark, primary: p, secondary: s });
    RDL.setTheme("brand", { el: phones.brand, primary: p, secondary: s });
    const roles = { light: read(phones.light), dark: read(phones.dark), brand: read(phones.brand) };
    for (const t of ["light", "dark", "brand"]) {
      const a = RDL.audit(roles[t], t), pass = a.filter((x) => x.pass).length;
      $("a-" + t).textContent = `${pass}/${a.length} contrast pairs pass`;
    }
    const tb = $("roles").tBodies[0]; tb.innerHTML = "";
    for (const [g, rows] of GROUPS) {
      tb.insertAdjacentHTML("beforeend", `<tr class="grp"><td colspan="5">${g}</td></tr>`);
      for (const [k, use] of rows)
        tb.insertAdjacentHTML("beforeend", `<tr><td>--rdl-${k}</td>${["light", "dark", "brand"].map((t) => `<td><span class="chipval"><i style="--c:${roles[t][k]}"></i>${roles[t][k]}</span></td>`).join("")}<td>${use}</td></tr>`);
    }
    document.querySelectorAll(".preset").forEach((b) => b.setAttribute("aria-pressed", String(PRESETS[b.dataset.name][0] === p && PRESETS[b.dataset.name][1] === s)));
  }
  pres.addEventListener("click", (e) => { const b = e.target.closest(".preset"); if (b) render(...PRESETS[b.dataset.name]); });
  for (const [c, h, which] of [["p", "ph", 0], ["s", "sh", 1]]) {
    $(c).addEventListener("input", () => render(which ? $("p").value : $(c).value, which ? $(c).value : $("s").value));
    $(h).addEventListener("change", () => { const v = "#" + $(h).value.replace("#", ""); if (/^#[0-9a-f]{6}$/i.test(v)) render(which ? $("p").value : v, which ? v : $("s").value); });
  }
  const q = new URLSearchParams(location.search);
  render("#" + (q.get("primary") || "0732D8"), "#" + (q.get("secondary") || "F2D33C"));
</script>
</body>
</html>
```
