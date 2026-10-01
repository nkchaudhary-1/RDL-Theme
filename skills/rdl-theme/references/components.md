# Components

Web classes live in `assets/templates/rdl-components.css`. Part 1 has the base components, shared
by both styles. Part 2 has the glass components. Part 3 (v3) has the layout primitives and
structural components. The SwiftUI equivalents are in `assets/ios/RDLComponents.swift` (part 1),
`RDLGlassComponents.swift` (part 2) and `RDLLayout.swift` (part 3). Compose domain components from
these; don't restyle them per screen. Exact dimensions for every part are in `anatomy.md`.

## V2 glass components

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

## v3 layout primitives and structural components

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
| Nested pane | `.rdl-nest` (strict) / `.rdl-nest--soft` + container `--host` | `RDLRadius.nested(outer:padding:border:method:)`, `ContainerRelativeShape` | Strict = outer − gap; soft = outer − gap/2 (`radius.md`) |
| Web nav / table | `.rdl-nav`, `.rdl-table`, `.rdl-logo` | — | Nav track 48, items 40 |
| Skeleton | `.rdl-skeleton` | `RDLSkeleton` | Loading state at final size |
| Text tiers | `.rdl-on-light-aura`, `.rdl-on-dark`, `.rdl-faint` | `RDLColor.text*` | Keeps text ≥ 4.5:1 on backdrops |

### SVG patterns (see the templates for working code)
- **Window curve:** draw the full series as a dotted ghost path, redraw it solid inside a
  `clipPath` window, put glass beads (`r 7–9`, white 65%, white stroke) at the window edges and
  an ink dot with an accent ring at the cursor, then a dashed drop line to the axis.
- **Beaded arc gauge:** a dotted semicircle track, a solid segment for the healthy range, glass
  beads at the segment ends, and a glass pill in the middle with the verdict ("Within limits").
- **Thin arc gauge (credit style):** a 2px ink arc with a needle tick and the numeral beside it.
- **Radial dot plot:** ticks around a circle with accent dots at their values, and the score in
  the middle.

## Specs

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

## Base components (both styles)

Card, button (`.rdl-btn` `--accent` `--secondary` `--glass` `--white`), icon button, quick
action, chip, segmented, delta pill, amount, bar chart with hatch, gauge, progress, list row,
section header, floating tab bar (flat), avatar, input. Specs are unchanged from v1. In glass
style, prefer orbs over `.rdl-iconbtn`, the dock over `.rdl-tabbar`, and status dots over
delta pills for state (keep delta pills for money changes).

## Composing domain components

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
