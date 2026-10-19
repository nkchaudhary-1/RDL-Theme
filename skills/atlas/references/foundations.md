# Foundations

Atlas tokens live in `assets/tokens/tokens.json` and build to `atlas-tokens.css` (`--at-*` custom
properties) and `tailwind.preset.js`. Everything in `atlas.css` reads these variables; nothing is
hard-coded. Change a value in the JSON, run `node scripts/build_tokens.mjs`, then
`node scripts/check_contrast.mjs` to prove the pairings still hold.

## 1. Colour

### The contrast ladder

Every hue has the same eleven steps, and each step is solved (in OKLCH, by `scripts/palette.mjs`) so
that its WCAG contrast against white is a fixed number:

| Step | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| vs white | 1.06 | 1.16 | 1.38 | 1.8 | 2.2 | 3.5 | 5.4 | 7.5 | 10.2 | 13.5 | 17.5 |
| vs black | 19.8 | 18.1 | 15.2 | 11.7 | 9.5 | 6.0 | 3.9 | 2.8 | 2.1 | 1.6 | 1.2 |

Because WCAG contrast is `(L₁ + 0.05) / (L₂ + 0.05)`, the contrast of a darker step X over a lighter
step Y is simply **R(X) / R(Y)**, whatever the hue. That gives a small set of rules you can apply
without a calculator:

| Pairing | Ratio | Passes |
|---|---|---|
| 600 on white, 50 or 100 | 5.4 · 5.1 · 4.7 | AA text (4.5) |
| 700 on white, 50, 100, 200 | 7.5 · 7.1 · 6.5 · 5.4 | AAA on white and 50, AA otherwise |
| 900 on white · 50 | 13.5 · 12.7 | AAA |
| 500 on white | 3.5 | UI boundaries and large text only (3.0), **never body text** |
| 300 on 900 · 950 | 7.5 · 9.7 | AAA (dark theme text) |
| 400 on 800 · 900 · 950 | 4.6 · 6.1 · 8.0 | AA (dark theme tertiary text) |
| 50 on 800 · 900 · 950 | 9.6 · 12.7 · 16.5 | AAA (dark theme primary text) |

The exact hex values are in `tokens.json → primitive` and the proven pairings, both themes, are in
`contrast-report.md` (162 rows, generated).

### Hues

| Hue | OKLCH hue | Role |
|---|---|---|
| `neutral` | 262 (cool grey) | Surfaces, text, borders |
| `brand` | 268 (indigo) | Primary actions, links, focus, selection |
| `info` | 232 (blue) | Informational status |
| `success` | 152 (green) | Positive status |
| `warning` | 72 (amber) | Caution status |
| `danger` | 26 (red) | Errors and destructive actions |

To re-brand, change `palette.hues.brand.h` (and `c` for chroma), run `palette.mjs`, then
`build_tokens.mjs` and `check_contrast.mjs`. The ladder guarantees the same ratios for any hue.

### Semantic tokens

Components never use a primitive directly. They use roles, which map differently per theme:

| Role | Light | Dark | Notes |
|---|---|---|---|
| `bg-canvas` | neutral-50 | neutral-950 | Page |
| `bg-surface` | white | neutral-900 | Cards, inputs, nav |
| `bg-raised` | white + shadow | neutral-800 | Menus, popovers, dialogs, toasts |
| `bg-sunken` | neutral-100 | neutral-950 | Grouping, table header, code |
| `bg-inverse` | neutral-900 | neutral-50 | Tooltips, solid badges, active pagination |
| `bg-hover` · `bg-active` · `bg-selected` | neutral-100 · 200 · brand-50 | neutral-800 · 700 · brand-900 | Interactive fills |
| `text-primary` | neutral-900 (13.5:1) | neutral-50 | Headings, body |
| `text-secondary` | neutral-700 (7.5:1) | neutral-300 | Supporting copy |
| `text-tertiary` · `text-placeholder` | neutral-600 (5.4:1) | neutral-400 | Metadata, placeholders |
| `text-disabled` | neutral-400 | neutral-600 | Exempt from contrast (WCAG 1.4.3 exception), still ≥ 2:1 |
| `text-link` · `text-link-hover` | brand-700 · 800 | brand-300 · 200 | Always underlined in running text |
| `text-on-brand` | white | neutral-950 | On `brand`, `danger` fills |
| `border-subtle` · `border-default` | neutral-200 · 300 | neutral-800 · 700 | Decorative only |
| `border-strong` | neutral-500 (3.5:1) | neutral-400 | Input and secondary-button boundaries (1.4.11) |
| `brand` · `brand-hover` · `brand-active` | brand-600 · 700 · 800 | brand-400 · 300 · 200 | Primary fills, icons, indicators |
| `brand-subtle` · `brand-text` · `brand-border` | brand-50 · 700 · 300 | brand-900 · 300 · 700 | Tinted fills, text on them |
| `focus-ring` · `focus-ring-inner` | brand-600 · white | brand-400 · neutral-950 | Two-tone ring, see §5 |
| `{status}` | 600 | 400 | Icon, border, solid fill |
| `{status}-text` | 700 | 300 | Text on `{status}-bg` and on surfaces |
| `{status}-bg` · `{status}-border` | 50 · 300 | 900 · 700 | Tinted containers |
| `overlay` | rgba(22,25,31,.6) | rgba(0,0,0,.7) | Dialog backdrop |
| `skeleton` · `skeleton-shine` | neutral-200 · 100 | neutral-800 · 700 | Loading placeholders |
| `selection` | brand-100 | brand-800 | `::selection` |

Rules that follow from the table:

- Text goes on `*-text`, fills use `*-bg`, icons and borders use the base token. The base status
  colour (600 light / 400 dark) is **not** for small text: it is 5.4:1 on white but only 3:1-ish on
  its own tint.
- `text-tertiary` is the floor for any readable text (4.5:1 on every surface, including `bg-raised`
  in dark). Do not add a lighter grey.
- `border-subtle` and `border-default` are decorative. A boundary the user must perceive (input
  edge, secondary button, switch track, focus ring, chart line) uses `border-strong` or a brand or
  status token, which are ≥ 3:1 on every surface.
- Disabled text is the only text allowed below 4.5:1, and the reason for being disabled must be
  visible nearby.

### Theme switching

Light is the default on `:root`. Dark applies under `prefers-color-scheme: dark` when `<html>` has no
`data-theme`, and always under `data-theme="dark"`. `data-theme="light"` forces light.
`color-scheme` is set in both so native controls, scrollbars and form popups match.
`atlas.js` offers a three-state toggle (`data-at-theme`: light → dark → system) persisted in
localStorage and announced to screen readers.

## 2. Typography

| Token | Size | Line | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 3rem (48) | 1.1 | 700 | −0.02em | Marketing and empty-screen heroes |
| `h1` | 2.25rem (36) | 1.2 | 700 | −0.015em | One per page |
| `h2` | 1.75rem (28) | 1.25 | 600 | −0.01em | Sections |
| `h3` | 1.375rem (22) | 1.3 | 600 | −0.005em | Cards, dialogs |
| `h4` | 1.125rem (18) | 1.4 | 600 | 0 | Subsections, card titles |
| `body-lg` | 1.125rem (18) | 1.6 | 400 | 0 | Lead paragraphs |
| `body` | 1rem (16) | 1.5 | 400 | 0 | Default |
| `body-sm` | 0.875rem (14) | 1.5 | 400 | 0 | Secondary copy, tables, hints |
| `label` | 0.875rem (14) | 1.4 | 500 | 0 | Form labels, buttons |
| `caption` | 0.75rem (12) | 1.4 | 400 | +0.01em | Metadata only, never instructions |
| `code` | 0.875rem mono | 1.5 | 400 | 0 | Code, identifiers, keys |

Why these values:

- **rem everywhere**, and `html { font-size: 100% }`, so the browser's font-size setting and 200 %
  zoom scale the whole system (1.4.4 Resize Text). Never set `font-size` on `html` in px.
- **Unitless line-height ≥ 1.5 for body copy**, so the 1.4.12 Text Spacing overrides (line-height
  1.5, letter-spacing 0.12em, word-spacing 0.16em, paragraph spacing 2em) never clip text. The audit
  applies them and checks for clipping.
- **Floor at 12px**; `caption` is for timestamps and counts, not for content a user must read to act.
- **Measure** is capped by `.at-prose` (680px ≈ 68 characters), inside the 80-character guidance.
- **Weights 400–700** only. Bold is for emphasis and headings; never convey state with weight alone.
- **Large text** for contrast purposes is ≥ 24px, or ≥ 18.66px at 700. Only `display`, `h1`, `h2`
  and bold `h3` qualify for the 3:1 allowance; Atlas uses 4.5:1 tokens for all of them anyway.

Families: Inter with the system stack (`--at-font-sans`), JetBrains Mono with the system mono stack.
No icon fonts: icons are inline SVG with `aria-hidden="true"` or `role="img"` plus `<title>`.

## 3. Space

A 4px ladder: `0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`
(`--at-space-0 … 24`, with `0_5` and `1_5` for 2 and 6).

| Relationship | Space |
|---|---|
| Icon to label, label to control | 4–8 |
| Between stacked controls in a field | 6 |
| Between fields | 20 (`.at-form`) |
| Card padding | 20 (compact 16) |
| Between cards in a grid | 16 |
| Between sections | 32–40 |
| Adjacent interactive targets | ≥ 8, so 24px targets keep the 2.5.8 spacing exception unnecessary |

Layout helpers: `.at-container` (max 1200, 20 side gutters, 16 on phones), `.at-stack` (16; `--sm` 8,
`--lg` 32), `.at-inline` (12, wraps), `.at-grid` (auto-fit 240px columns). Grid and stack children get
`min-width: 0` so scroll containers such as tables shrink instead of forcing page overflow
(1.4.10 Reflow).

## 4. Shape, elevation, z-index

| Radius | px | Use |
|---|---|---|
| `sm` | 4 | Checkbox, kbd, inline code, focus on inline links |
| `md` | 8 | Buttons, inputs, menu items, tooltips |
| `lg` | 12 | Alerts, toasts, menus, popovers, table wrapper, choice cards |
| `xl` | 16 | Cards |
| `2xl` | 24 | Dialogs, bottom drawers |
| `full` | pill | Badges, tags, switch, progress, pill buttons |

Shadows (`sm` · `md` · `lg` · `xl`) are tinted with `--at-shadow-color` (ink in light, black in dark)
so they stay visible on dark surfaces. Elevation is never the only cue: raised surfaces also change
`bg-raised` and keep a 1px border in forced-colours mode.

Z-index ladder: `base 0 · raised 10 · sticky 100 · dropdown 200 · overlay 300 · dialog 400 · toast 500
· tooltip 600`. Toasts sit above dialogs so a confirmation can be announced over a modal; tooltips
sit above everything.

## 5. Focus, targets, motion

**Focus ring.** One rule for every element: `outline: 2px solid focus-ring; outline-offset: 2px;
box-shadow: 0 0 0 2px focus-ring-inner`. The box-shadow fills the offset gap with the surface colour,
so the ring is a 2px halo plus a 2px brand line and contrasts ≥ 3:1 with the ring's own halo, the
surface and the control, on any background (2.4.7 Focus Visible, 2.4.11 Focus Not Obscured,
2.4.13 Focus Appearance). `:focus-visible` is used so pointer clicks don't show it on buttons; text
inputs show it on any focus. A few widgets move the ring to a wrapper (switch track, segmented
label, choice card, interactive card) so it outlines the perceived control.

**Targets.** `--at-size-target-min` 24 (2.5.8 Target Size Minimum, AA) is the floor for anything
clickable, including icon buttons at `sm`. Buttons are 32 / 40 / 48, list rows 56, choice labels
44, nav links 40. Use `lg` (48) for the primary action on touch screens and keep 8px between
neighbouring targets.

**Motion.** Durations 100 / 180 / 300ms with `standard`, `enter` and `exit` curves. Under
`prefers-reduced-motion: reduce` the token durations collapse to 0 and every animation is cut to
0.01ms (2.3.3 Animation from Interactions). Spinners and busy buttons switch to a gentle opacity
pulse so loading remains perceivable; skeleton shimmer stops. Nothing flashes more than three times
per second (2.3.1).

**Contrast preferences.** `prefers-contrast: more` promotes `border-subtle` → `border-default` →
`border-strong` and `text-tertiary` → `text-secondary`. `forced-colors: active` (Windows High
Contrast) adds 1px system-colour borders to buttons, tags, badges, cards, alerts, toasts, menus,
popovers, dialogs and the switch track, and paints selected tabs and progress bars with `Highlight`.

## 6. Breakpoints and containers

| Token | px | Atlas behaviour |
|---|---|---|
| `sm` | 640 | Below: navbar links collapse (use a menu button + drawer), stepper shows only the current label, form actions go full width, dialogs use 24px gutters |
| `md` | 768 | Form rows wrap to one column (auto-fit) |
| `lg` | 1024 | Below: sidebar shell becomes single column; expose the sidenav in a drawer |
| `xl` | 1280 | Container stops growing at 1200 |

Content must reflow to 320 CSS px with no horizontal scrolling except inside data tables and other
two-dimensional content (1.4.10). The audit checks this at 320.

## 7. Files

| Path | Role |
|---|---|
| `assets/tokens/tokens.json` | Source of truth: ladder, hues, primitives, semantic (light/dark), pairings, type, space, radius, size, shadow, z, motion, breakpoints |
| `assets/tokens/atlas-tokens.css` | Generated custom properties |
| `assets/tokens/tailwind.preset.js` | Generated Tailwind preset (`brand.DEFAULT` = `--at-brand`, scales under `brand.50…950`) |
| `scripts/palette.mjs` | Solves the primitive palette from the ladder and hues |
| `scripts/build_tokens.mjs` | JSON → CSS + Tailwind |
| `scripts/check_contrast.mjs` | Proves `contrast-pairs` in both themes; `--md` writes `references/contrast-report.md` |
