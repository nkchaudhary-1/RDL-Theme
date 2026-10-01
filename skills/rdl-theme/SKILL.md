---
name: rdl-theme
description: Design and build apps in the RonDesignLab (RDL) style, with a measured layout system and an automated UI audit. The default "glass" language (2025–26) has frosted glass over photos, 3D renders and soft gradient auras; huge light numerals with small muted units; dot-matrix figures; orbs, pills and circle–pill–circle action rows; tick-ruler and hairline instruments; status dots; line-art and blueprint illustration. There is also a "flat" fintech style (v1). Use whenever the user asks for the "RDL theme/style", "RonDesignLab style", or a Dribbble-grade minimal fintech, wealth/gold, health, energy, logistics, industrial/IoT, property or SaaS app, screen, dashboard or shot, and whenever a project already uses RDL tokens (tokens.css, RDLTokens.swift, tailwind.preset.js). Covers SwiftUI, HTML/CSS, Tailwind/React, web dashboards and portfolio presentation.
---

# RDL Theme · v3

A production design system distilled from two passes over 220 RonDesignLab frames:
- **Style pass:** `references/design-study.md`.
- **Structure pass:** `research/deep-scan.md`.
- **Pixel calibration:** `research/calibration.md`.

v3 adds measured layout rules, component anatomy, usage budgets and an audit script, so screens come
out **consistent, minimal and well spaced** by construction rather than by eye.

## The RDL DNA

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
6. **One accent, spent 1–3×.** Use it on the active dock/orb, a needle or selected datum, one tag,
   or check marks. Color otherwise lives in auras (≤ 2 per screen).
7. **Instruments, not charts.** Tick rulers, 2pt meters, hairline bars with one lit, window
   curves with glass beads, month grids, beaded arcs.
8. **Status is a dot plus a word.** Soft-tint pills are for escalations only. Destructive actions
   use a red-tinted tile, never a red solid.
9. **Measured space.** Use the 4pt ladder by relationship (4 < 8 < 12 < 20 < 32), one control
   height per row, and concentric corners (inner radius = outer − gap; to go deeper use A · strict,
   halving the padding, or B · soft, radius − padding/2; never clamp). See `references/radius.md`.
10. **Technical illustration and photographic presentation.** Blueprints, line-art, selective
    color; hands, angled devices and depth-of-field shots.

## Layout in 60 seconds (`references/layout.md`)

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
  SwiftUI `RDLRadius.nested(…, method:)`. Full guide `references/radius.md`; live demo
  `assets/templates/radius-demo.html`.
- **Web:** 12 columns, gutter 32, bento gap 12, equal row heights, every cell at the card radius.

## Workflow

1. **Classify.** Identify the domain (`references/domain-playbooks.md`), platform and style (glass
   by default; flat if there's no imagery; Swiss for industrial or editorial). Pick one accent
   pack and the backdrop.
2. **Lock the app-level decisions** (`references/guidelines.md` §5): the header pattern per
   role, the pinned zone per role, the figure treatment, the radius family and the icon set.
   Every later screen reuses them. Structurally similar flows (SIP ↔ Lease) share one template.
3. **Wire the tokens.** Never hard-code hex, size, radius or blur values.
   - **Web:** `assets/tokens/tokens.css` + `assets/templates/rdl-components.css`, with Urbanist
     (300–700) and Doto (700). Set `<html data-theme data-style data-accent>`.
   - **Tailwind:** use `assets/tokens/tailwind.preset.js`.
   - **SwiftUI (iOS 17+):** add `RDLTokens.swift`, `RDLComponents.swift`,
     `RDLGlassComponents.swift` and `RDLLayout.swift`, then set
     `.rdlAccent(.gold).rdlSurfaceStyle(.glass)` at the root.
   - **Changing values:** edit `assets/tokens/tokens.json`, then run `node scripts/build_tokens.mjs`.
4. **Pick an archetype** (`references/screen-patterns.md`) and build on the skeleton:
   - Web: `.rdl-screen` → `.rdl-header` → `.rdl-stack--*` → `.rdl-pin`.
   - SwiftUI: `RDLScreen` → `RDLHeader` → `VStack(spacing: RDLSpace.…)` → `pinned:`.
5. **Compose from components** (`references/components.md`; exact specs in
   `references/anatomy.md`). The recipe is surface + figure + instrument + context + one action.
   The default card is `.rdl-metric` / `RDLMetricTile`. Never invent one-off styles.
6. **Design the real states**: loading skeleton at final size, empty (one line + one action),
   error (crit dot + fix), stale (warn dot + "Updated n min ago").
7. **Audit.** Render HTML builds and run `node scripts/audit_ui.mjs page.html` until it reports 0
   errors. It checks the type scale, spacing, radius, control heights, row consistency,
   pinned-zone clearance, accent budget, targets and pixel-measured contrast. Then walk
   `references/qa-checklist.md`. For SwiftUI, apply the same checklist by hand.

## Token quick reference

| Role | Light | Dark |
|---|---|---|
| canvas / surface | `#EFEFF1` / `#FFFFFF` | `#0A0B0C` / `#131416` |
| text primary / secondary / tertiary | `#0A0B0C` / `#5C5C64` / `#9B9BA3` | `#F4F4F5` / `#A1A1AA` / `#6B6B74` |
| glass fill / rim | `rgba(255,255,255,.56)` / `.72` | `rgba(28,30,33,.52)` / `rgba(255,255,255,.10)` |
| accents (calibrated) | volt `#DFFA32` · gold `#ECBC44` · signal `#4BE06E` · electric `#0832D8` · ember `#FC5A10` · orchid `#C16CF7` · rose `#F0548A` | same |

| Scale | Values |
|---|---|
| Type | hero 96 · display-xl 72 · display 56 · numeral 40 (all 300) · h1 34 · h2 26 · h3 20 · title 17 · body 15 · label 14 · meta 13 · caption 12 · micro 11 |
| Per screen | ≤ 5 type sizes · 1 focal figure · 1 primary action · accent ≤ 3 · auras ≤ 2 · 1 dot figure · 1 iridescent rim |
| Glass | blur 24 · saturate 1.6 |
| Motion | 120 / 200 / 320 / 600 ms · stagger 40 · spring 0.35 / 0.82 |

## Signature moves (use at least three per screen)

- A hero figure with a small raised currency and muted decimals, plus a status line.
- A window curve: dotted ghost, solid window, glass beads, ink cursor with an accent ring.
- A tick ruler with a glowing accent needle (amount, tenure, timeline).
- A dot-matrix figure in an ink or aura widget.
- An action row or slide-to-confirm pinned at the bottom.
- A month grid of paid/missed/current/upcoming (SIP, EMI, lease, medication).
- A blueprint card, or a beaded arc with a glass verdict pill.
- Leader-line callouts from a 3D render to label/value pairs.

## Anti-patterns

- Off-ladder spacing (10, 14, 18…), mixed control heights in a row, an inner radius equal to the
  outer or clamped up (non-concentric corners).
- Bold numbers, units at full size, big currency symbols, more than 5 type sizes.
- Glass on plain gray, dark glass on a light canvas, more than two auras, neon gradients.
- Rectangular buttons in glass, or Swiss blocks mixed with rounded glass.
- Rainbow multi-series charts and pies; status shown as colored text alone; red solid buttons.
- Mid-gray text on auras or photos (each aura redefines the text tiers, so use them).
- Content running under the pinned zone; cards separated by dividers instead of gaps.

## Files

| Path | Use |
|---|---|
| `references/layout.md` | **Spacing ladder, screen skeleton, grids, alignment, control heights, radius** |
| `references/anatomy.md` | **Exact specs for every component and layout primitive** |
| `references/radius.md` | **Corner radius: scale, concentric nesting, strict vs soft, procedure, code, audit** |
| `references/guidelines.md` | **Rulebook: hierarchy, type, color budget, app consistency, minimalism, content** |
| `references/foundations.md` | Color (calibrated), accents, auras, glass, type roles, textures, imagery, motion |
| `references/components.md` | Component catalog (web class ↔ SwiftUI type), SVG patterns, compositions |
| `references/screen-patterns.md` | Skeleton + glass G1–G8, W5–W7; flat M1–M7, W1–W4 |
| `references/domain-playbooks.md` | Wealth/gold/SIP/lease, banking, health, energy, logistics, industrial… |
| `references/design-study.md` | 220-frame analysis: style frequencies, 20 structural rules, v1→v3 |
| `references/presentation.md` | Shot composition: hands, DOF, angled devices, three-phone perspective |
| `references/qa-checklist.md` | Pre-delivery review, including the audit |
| `assets/tokens/` | `tokens.json` (source) → `tokens.css`, `tailwind.preset.js` |
| `assets/ios/` | `RDLTokens.swift` (generated), `RDLComponents.swift`, `RDLGlassComponents.swift`, `RDLLayout.swift` |
| `assets/templates/` | `rdl-components.css`; glass `mobile-app.html`, `web-dashboard.html` (audit-clean); flat `*-flat.html`; `radius-demo.html` (interactive corner-radius demo) |
| `scripts/build_tokens.mjs` | Regenerates CSS / Tailwind / Swift from `tokens.json` |
| `scripts/audit_ui.mjs` | Automated layout, consistency and contrast audit (Playwright) |
| `scripts/extract_palette.py` | Calibrates tokens against exported shots (ΔE report) |
