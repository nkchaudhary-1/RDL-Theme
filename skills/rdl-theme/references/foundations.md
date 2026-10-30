# Foundations

All values live in `assets/tokens/tokens.json`. This file explains the intent behind them, so you
can make the right call when a case isn't covered. Spacing, grids and radius rules are in
`layout.md`; component dimensions are in `anatomy.md`; usage budgets are in `guidelines.md`.
Colours are pixel-calibrated against the board (`research/calibration.md`, `research/theme-scan.md`). The glass style is the default; notes marked
**Flat** apply to `data-style="flat"` (v1).

## Themes and attributes

v4 has three themes (full spec: `themes.md`; every value: `tokens.md`):

| Attribute | Values | SwiftUI |
|---|---|---|
| `data-theme` | `light` · `dark` · `brand` (omit to follow the system light/dark) | `RDLTheme.apply(.light / .dark / .system / .brand(primary:secondary:))` |
| `data-brand` | brand preset: `cobalt` (default) · `mustard` · `gold` · `olive` · `forest` · `lavender` · `plum` · `vermilion` · `dusk` | `.brandPreset("gold")` |
| `data-accent` | secondary-colour preset for light/dark: `volt` (default) · `gold` · `signal` · `electric` · `ember` · `orchid` · `rose` · `lime` · `violet` · `orange` · `ocean` | `RDLTheme.apply(_, accent:)` or `.rdlAccent(.gold)` |
| `data-style` | `glass` (default) · `flat` | `.rdlSurfaceStyle(.glass/.flat)` |

Any two colours at runtime: `RDL.setTheme("brand", { primary, secondary })` (`assets/tokens/rdl-theme.js`).
Attributes work on any element, so a screen can switch theme locally (a dark Buy screen inside a light
app is common on the board).

## Color

### Layers
`primitive` (raw hex) → `theme` (semantic roles per theme) → `component` (per-component roles). UI code
uses semantic or component roles only. Names follow `category-role-variant-state`: `bg-surface-raised`,
`fg-secondary`, `action-primary-pressed`, `accent-text`.

### Neutrals
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

### Secondary colour (accent)
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

### Primary colour (brand)
In light and dark, the primary colour appears only as a **brand panel**: `.rdl-card--brand` (v3
`.rdl-blueprint`), `bg-brand` + `fg-on-brand`. In the brand theme it is the canvas. Presets
(measured on the board): cobalt `#0732D8`, mustard `#ECBB42`, gold `#D9A632`, olive `#687B59`,
forest `#1F4A3E`, lavender `#AD80D4`, plum `#2F1125`, vermilion `#D44C27`, dusk `#7599AD`.

### Auras (gradient washes)
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

### Materials (glass)
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
`themes.md` §3. Glass needs something behind it (a photo, 3D render, map, aura or fog). On a flat
canvas, use `.rdl-card`. The iridescent rim (`.rdl-glass--iridescent`) is reserved for one premium
card per screen. With Reduce Transparency, glass becomes `bg-surface`. **Flat:** solid surfaces, no blur.

### Status
`success` · `warning` · `danger` · `info`, each with three roles: the solid (dots, meter fills, ≥ 3:1),
`-subtle` (pill and tile backgrounds) and `-text` (≥ 4.5:1 on canvas, surface and its own subtle fill).
Light and dark have their own tuned values; brand computes them against the canvas. In glass style,
**status is shown as a dot plus a word** (`.rdl-status`, `.rdl-status--warn|crit|info|idle`).

## Typography

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

## Spacing, layout, radius

See `layout.md` for the full system. In short:

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
padding/2) instead of clamping the radius (`radius.md`). The Swiss variant uses radius 0–4 on blocks and
buttons. Use it only when the whole product takes that tone, and don't mix it with rounded glass
on the same screen.

## Textures and lines

- **Film grain** (`.rdl-grain`): on auras and photo-backed screens.
- **Dot grid** (`.rdl-dotgrid`): 14px dots on dark canvases (node editors, document spaces).
- **Hairlines**: 1px `border-subtle` between rows; dotted leaders for label……value.
- **Dotted/dashed**: ghost curves, drop lines to a data point, selection rectangles, radius circles.

## Iconography

Line icons at 1.6–1.75 stroke with rounded joins (Lucide / SF Symbols regular), sitting inside
orbs or tiles. The ↗ arrow in a circle is the universal "open" affordance. Use outlined icons in
circles (not filled) for list leads.

## Imagery

- **3D renders** of the product's physical world: gold bars, vaults, trucks, machines, houses,
  pills, organs. Use soft studio light on neutral ground, and one render per screen.
- **Line-art / blueprint**: isometric technical drawings with dimension lines, white on electric
  blue or ink on white.
- **Selective color**: a grayscale scene with one object in the accent.
- **Photography**: full-bleed behind glass (people, landscapes). Blur or fade it where text sits.

## Motion

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
