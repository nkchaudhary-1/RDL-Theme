# Layout and spacing

How RDL screens are built: the spacing ladder, the screen skeleton, grids, alignment and radius.
The values come from measuring all 220 board frames (`research/calibration.md`) and live in
`tokens.json` under `space`, `layout`, `size` and `radius`. If a value isn't on these ladders,
it's wrong.

## 1. The spacing ladder

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

## 2. Mobile screen skeleton (393 × 852)

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

## 3. Web / dashboard grid (1440)

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

## 4. Alignment

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

## 5. Control heights (one ladder)

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

## 6. Radius

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

### Concentric nesting

When one rounded container sits inside another, their corners must share a centre, or the gap
swells at the 45° point and the inner corner looks too round or "pinched".

**inner radius = outer radius − gap**, where **gap = padding + border** (plus any wrapper offset).
Equivalently: outer = inner + gap. Measure the gap from the outer edge of the container (border
box) to the edge of the nested surface.

| Container | Gap | Nested radius |
|---|---|---|
| Sheet 48 | 20 | **28** (a card) |
| Widget 40 | 20 | **20** (`lg`) |
| Widget 40 | 12 (host) | **28** (a card) |
| Widget 40 | 16 | **24** (`panel`) |
| Card 28 | 20 | **8** (`sm`) |
| Card 28 | 16 | **12** (`md`) |
| Card 28 | 12 (host) | **16** (`base`) |
| Glass card 28 (1px rim) | 12 + 1 | **15** (derived) |
| Pill track 48 | 4 | item 40 → 20 = its own pill radius ✓ |
| Dock / slide 64 | 6 | item 52 → 26 ✓ |

**Going deeper: halve the gap, don't clamp the radius.** Each level subtracts the gap again, so a
fixed gap runs out of radius after two levels and the innermost corners go flat. Instead, halve
the gap at each level (snapping to the ladder, never below 4), so every layer keeps a visible
curve:

```
24 ─gap 8→ 16 ─gap 4→ 12 ─gap 4→ 8        (article chain)
48 ─20→ 28 ─12→ 16 ─8→ 8                  (sheet → card → pane → chip-pane)
40 ─12→ 28 ─8→ 20 ─4→ 16                  (widget hosting cards)
```

Rules:
1. Compute the inner radius from the real gap; never copy the outer radius inward.
2. If `outer − gap` drops below 8, **reduce the gap** (use the host padding of 12, then 8 → 4) or
   raise the outer radius. Don't bump the inner radius back up; that breaks concentricity. If
   neither is possible (padding ≥ radius), the inner corner is square (0), as in the Swiss variant.
3. Count borders. A 1px glass rim makes a 28 card with padding 12 hold a 15 pane. Exact derived
   values are allowed even when they're off the token scale.
4. Max three nesting levels. Beyond that, flatten the hierarchy instead.
5. Pills and circles are exempt. A pill inside a pill is already concentric when
   inner height = outer height − 2 × gap.
6. Only corners that **hug** the container need to match, meaning the nested surface is inset
   equally on both axes and closer than the outer radius. Elements floating in the middle of a
   card just use a scale radius.

**In code:**
- **Web:** give the nested surface `.rdl-nest`. Every surface passes its children the exact value
  in `--rdl-nest-r` (border included). Use `.rdl-card--host` / `.rdl-glass--host` /
  `.rdl-widget--host` for surfaces that hold panes (padding 12).
- **SwiftUI:** `RDLRadius.nested(outer:padding:border:)`, `RDLRadius.chain(outer:gap:levels:)`,
  or `.rdlConcentricContainer(radius:)` with `ContainerRelativeShape()` on the children for
  automatic concentric corners.
- **Audit:** `audit_ui.mjs` measures the gap at each hugged corner and warns on any inner radius
  that isn't outer − gap.

Sources: [Getting your border radius right](https://medium.com/design-bootcamp/getting-your-border-radius-right-a-simple-trick-for-smooth-nested-containers-f6e0025e8c53)
(Design Bootcamp: outer = inner + gap, halve the gap per level),
[CSS-Tricks: nested border-radii](https://css-tricks.com/public-service-announcement-careful-with-your-nested-border-radii/),
[30 seconds of code: nested border radius](https://www.30secondsofcode.org/css/s/nested-border-radius/)
(borders count as gap; padding ≥ radius → 0).

## 7. Density and whitespace

- Content takes about 60% of a phone screen. The rest is backdrop, figure air and the pinned
  zone. If a screen has more than 5 cards above the fold, split it.
- A card holds **one idea** with at most one figure, one instrument and one action.
- Don't put dividers between cards; the gap is the divider. Use hairlines only *inside* a card
  (KV rows, table rows).
- Figures need air: keep at least 16 above a display figure and 12 below it.

## 8. Platform notes

- **iOS:** respect safe areas. The status bar is 54 on Dynamic Island devices and the home
  indicator is 34, which is the `pin-bottom` value. Minimum hit target is 44, and every RDL
  control is ≥ 48 except tags.
- **Web:** content max-width is 1440, and beyond that the margins grow. Focus rings are 2px accent
  with a 2px offset.
- **Breakpoints:** < 640 uses the mobile skeleton. 640–1024 uses 8 columns with a 24 gutter.
  ≥ 1024 uses the 12-column dashboard.
