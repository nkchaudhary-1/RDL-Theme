# Component anatomy

Exact specs for every RDL building block: size, padding, radius, type, slots and states. Web
classes are in `assets/templates/rdl-components.css`; SwiftUI types are in `assets/ios/`. All
numbers are tokens (see `layout.md`). Type roles are from the scale: hero 96 · display-xl 72 ·
display 56 · numeral 40 · h1 34 · h2 26 · h3 20 · title 17 · body 15 · label 14 · meta 13 ·
caption 12 · micro 11.

---

## Layout primitives

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

## Header row
```
[ orb 48 ]        Title 17/500         [ orb 48 ][ orb 48 ]
```
- All items are 48 tall. Use the trailing pair gap 8, or a joined glass capsule.
- The title is centred and optical-centred on the screen, not between the orbs.
- Variants: logo left with orbs right (home), back + title + more (detail), back + status
  (detail with live state), chip center ("24K · 99.9% pure").

## Orb
| Size | Use | Icon |
|---|---|---|
| 48 | Header, inline actions | 20 |
| 56 (`--lg`) | Action row, dock-less primary icon | 24 |
| 64+ | Hero + orb (add slot) | 24 |

Kinds: **glass** (default over backdrops), **solid** ink (primary icon action), **white** (on
dark or photo backdrops), **accent** (one per screen), **outline** (plain white screens). States:
pressed scale 0.96, disabled 40% opacity, a badge dot 8 at top-right inset 6.

## Buttons
- **Primary pill:** 56 tall, padding 0 24, label 15/500, ink fill (or accent when it's the one
  accent use). Icon 20, gap 8.
- **Secondary pill:** the same, with glass or white fill.
- Labels are verbs in sentence case ("Buy gold", "Start SIP"). Never use uppercase or a trailing
  arrow; the slide and orbs carry direction.

## Action row
```
( orb 56 ) (        primary pill 56        ) ( orb 56 )
```
Columns `auto 1fr auto`, gap 8, pinned. The pill is the screen's main verb. The side orbs are
secondary (swap, sell, more). Make it a single full-width pill when there are no secondaries.

## Slide to confirm
```
( knob 52 →)      Slide to buy      ›››
```
Height 64, padding 6, knob 52 in the accent, label 15/500 centred, chevrons at 45%. It confirms
at 85% travel and springs back otherwise. **Use it only for irreversible money movement.** It
must provide an accessibility action.

## Dock
A glass capsule with padding 6, items 52, gap 6, centred and pinned. The active item is solid
ink (or the accent). Use 3–5 items, icons only, each with a label for accessibility.

## Segmented control
Track 48 (pill, glass or `--rdl-ctl`), inset 4, items 40 with label 14/500. The active item is
white (glass) or ink (flat light). The accent variant is used only when the segmented control is
the screen's accent use. Use 2–4 options.

## Chip / tag / status
| Element | Height | Type | Fill |
|---|---|---|---|
| Chip | 40 (32 dense) | 14/500 | Glass, `--rdl-ctl`, or outline. Selected = ink |
| Tag | 24 | 11/600 | Accent (the one tag), ink, or white |
| Status | — | 13/500 | 7 dot + 3 halo, gap 6, label in text color |
| Status pill (escalation) | 24 | 12/600 | Soft tint + same-hue dot + same-hue text |

## Figure (the number)
```
caption 12 gray          ← label (stack-tight 4)
₹ 4,82,190 .36           ← currency 38% raised · integer 300 · unit/decimals 38% gray
● Live   +₹12,408 · 30d  ← context line (stack 8)
```
- Sizes: hero 96, display-xl 72 (amount entry), display 56 (home hero), numeral 40 (cards),
  h1 34 (KPI tiles), h2 26 (web KPIs).
- Use tabular figures with tracking −3%. Leading zeros on tiny quantities are muted (`.rdl-lead`).
- A two-figure ratio ("24/38", "11 /14 d") puts the denominator at unit size, in gray.

## Metric tile (canonical card)
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

## Nested pane
A surface inside a surface (a sub-pane in a widget, a card in a sheet, a field block in a card).
Its radius is **outer − gap** (gap = padding + border); see `layout.md` §6.
- Cards in a sheet: 28 (48 − 20). Panes in a widget: 20 (40 − 20), or 28 with a host widget (pad 12).
- Panes in a card: 8 at the default 20 padding, so prefer a host card (pad 12) → 16.
- The next level halves the gap again (8 → 4). Max three levels.
- Web: `.rdl-nest` (+ `--host` on the container). SwiftUI: `RDLRadius.nested(outer:padding:border:)`
  or `ContainerRelativeShape()` inside `.rdlConcentricContainer(radius:)`.

## Key / value
| Layout | Use | Spec |
|---|---|---|
| Stacked | Inside cards, 2–3 columns | label 12 gray → value 15/500 (gap 4) |
| Value-first | ID cards, dashboards | value 17/400 → label 13 gray |
| Row | Summaries | label left 14 gray, value right 15/500 |
| Leader | Receipts, fees, specs | label · dotted leader · value, rows gap 12 |

## List row
Height ≥ 56. Lead: 40 circle (outline icon or avatar). Title 15/500 + sub 13 gray. The end slot
holds a value 15/500 (right-aligned, tabular) or a status. Separate rows with 1px hairlines
inside a card, never between cards.

## Section header
`Title 17/500` left and `See all` (chip 32, white or glass) right, with 12 to the content
below. On web or large sections, use h2 26/400 with a one-line description in 13 gray below it.

## Field
- **Search:** pill, 56 (mobile) or 48 (web), with a 20 icon, placeholder 15 gray, and an optional
  trailing filter orb at the same height *outside* the field.
- **Select:** height 48–64, radius 16 (or pill), label 13 gray above (stack 8), value 17,
  chevron 16 at right.
- **Prompt input:** pill 64 with an inset send orb 48 (inset 8).
- States: focus ring 2px accent, error = crit dot + caption with the fix, disabled at 40%.

## Bottom sheet
Full width, top radius 48, grabber 36×4 (8 from the top), padding 20; cards inside it take 28 (48 − 20). The header row inside uses
the same 48 control height. It sits over a dimmed (ink 24%) or blurred backdrop.

## Instruments
| Instrument | Spec |
|---|---|
| Tick ruler | Minor ticks every 6 (10 tall), major every 30 (18 tall). Needle 2×28 in the accent with glow. Labels 11 secondary, justified |
| Meter line | Label 13 + value right, 2px track (radius 2), colored fill. List gap 12 |
| Line bars | 2px strokes, 28% opacity, one lit in the accent. Height 64–96 |
| Window curve | Dotted ghost (1.4px, 1.5/5 dash), solid window 2px, glass beads r 7, ink cursor r 5 with a 3px accent ring, dashed drop |
| Beaded arc | Dotted semicircle, solid healthy span, glass beads at the ends, glass verdict pill in the middle, scale labels below (active label white or ink) |
| Month grid | 6 columns (4 on narrow), gap 6, cells radius 14, aspect 1:1.05. Marker 20 (paid = accent ✓, missed = gray ×, current = accent outline, upcoming = dashed ring) |

## States (every async component)
- **Loading:** a skeleton pane at the final size, shimmer at 1.2s, no spinner inside cards.
- **Empty:** one line (15) and one action (chip or pill) inside the same card.
- **Error:** the status dot turns crit, plus a caption with the fix ("Retry", "Check connection").
- **Stale:** a warn dot plus "Updated 6 min ago".
