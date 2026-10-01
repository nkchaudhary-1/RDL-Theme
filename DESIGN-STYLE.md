# RDL Design Style · v3

A single-file style guide for designing and building apps in the RonDesignLab (RDL) visual
language. It stands alone: drop it into a project, a Figma file description, or an AI prompt.
It comes from two passes over 220 RDL shots (style, then structure) plus pixel calibration of the
colors. The full system, with tokens, code, templates and an audit script, lives in
`skills/rdl-theme/`.

There are two styles:
- **Glass** (default, 2025–26 RDL): frosted glass over imagery, light numerals, instruments.
- **Flat** (v1, 2023–24 fintech): solid white cards, medium numerals, one ink hero card.

---

## 1. Principles

1. **One number is the hero.** Every screen has one focal figure, and it is the largest thing
   on screen.
2. **Glass over something.** Cards are frosted panes over a photo, 3D render, map, gradient
   aura or fog. Glass on flat gray looks cheap.
3. **Light, not bold.** Numbers and headlines are thin and large. Weight comes from size, never
   from boldness.
4. **Circles and pills.** Everything tappable is round: orbs for icons, pills for words.
5. **One loud accent.** Neutrals do the work; the accent appears 1–3 times per screen.
6. **Color lives in auras.** Soft gradient washes carry the color, not the UI chrome.
7. **Instruments, not charts.** Draw data like hardware: rulers, needles, meters, hairlines.
8. **Status is a dot.** A small colored dot plus a word.
9. **Technical illustration.** Line-art, blueprints, 3D renders, selective color.
10. **Measured space.** Spacing on a 4pt ladder chosen by relationship, one control height per
    row, corner-anchored cards, nested radius = outer − padding.

---

## 2. Color

### Neutrals (stone)
| Token | Hex | Use |
|---|---|---|
| stone-0 | `#FFFFFF` | Cards (light) |
| stone-50 | `#F7F7F8` | Muted wells, product cards |
| stone-100 | `#EFEFF1` | **Light canvas**, controls in cards |
| stone-150 | `#E7E7EA` | Chart tracks, hover |
| stone-200 | `#DCDCE0` | Hairlines |
| stone-300 | `#C3C3C9` | Strong borders, missed markers |
| stone-400 | `#9B9BA3` | Tertiary text (redundant info only) |
| stone-500 | `#6B6B74` | **Secondary text** |
| stone-700 | `#2E2F33` | Raised controls on dark |
| stone-800 | `#1D1E21` | Dark surfaces, controls |
| stone-900 | `#131416` | **Dark cards** |
| stone-950 | `#0A0B0C` | **Ink** (text, primary buttons), **dark canvas** |

### Semantic roles
| Role | Light | Dark |
|---|---|---|
| Canvas | `#EFEFF1` | `#0A0B0C` |
| Surface (card) | `#FFFFFF` | `#131416` |
| Text primary | `#0A0B0C` | `#F4F4F5` |
| Text secondary | `#5C5C64` | `#A1A1AA` |
| Text tertiary | `#9B9BA3` | `#6B6B74` |
| Hairline | `#DCDCE0` | `#1D1E21` |
| Tick marks | `rgba(10,11,12,.28)` | `rgba(244,244,245,.30)` |

### Accent packs (choose one per product)
| Pack | Accent | Text on accent | Best for |
|---|---|---|---|
| **Volt** (default) | `#DFFA32` | ink | Fintech, AI, productivity |
| **Gold** | `#ECBC44` | ink | Precious metals, wealth, energy |
| **Signal** | `#4BE06E` | ink | Health "in range", sustainability, ops OK |
| **Electric** | `#0832D8` | white | Automotive, industrial, blueprint cards |
| **Ember** | `#FC5A10` | ink | Logistics, alerts-heavy ops, fitness |
| **Orchid** | `#C16CF7` | ink | Wellness, consumer health |
| **Rose** | `#F0548A` | ink | Health trackers, women's health, social |

**Where the accent goes** (1–3 per screen):
- the active orb or dock item
- the needle or selected data point
- one tag ("+1.8%", "Best Seller")
- paid checkmarks
- the brand dot

It never goes on body text or large backgrounds. The exceptions are one accent widget or a
blueprint card.

### Status colors (always a dot plus a word)
| Status | Dot | Example |
|---|---|---|
| OK | `#4BE06E` | ● Operational · ● Settled · ● Live |
| Warning | `#F5A70B` | ● In transit · ● Updated 12 min ago |
| Critical | `#F0453E` | ● Delayed · 2h · ● Failing |
| Info | `#4F5BFF` | ● Scheduled |
| Idle | `#9B9BA3` | ● Market closed |

The dot is 7px with a 3px halo at 22% opacity of its color. Use pills only for escalations
("High Priority" coral, "Maintenance" red).

### Auras (gradient washes)
| Aura | Recipe | Text on it | Use |
|---|---|---|---|
| Gold | radial at top-right: `#F2C95C` → `#F3E3BC` 38% → `#EFEFF1` 78% | ink | Wealth home, credit score |
| Sunset | radial: `#FF8A1F` → `#FF6FA0` 45% → `#9FB7FF` | white | Health scores |
| Meadow | 160°: `#2FBF4E` → `#B8F03C` 70% → `#EEF7C8` | ink | Positive health, growth |
| Dusk | 165°: `#6E6A30` → `#A26A58` 55% → `#B87786` | white | Payment timelines, SIP |
| Orchid | 150°: `#E046C8` → `#8A3BEF` | white | Widgets, wellness |
| Ocean | 180°: `#122347` → `#1B5B6B` | white | Night / analytics widgets |
| Ember | 150°: `#F2A04A` → `#EBD2AE` | ink | Energy, warm cards |
| Fog | 180°: `#DCE3EA` → `#F4F5F7` | ink | Desktop backdrops |

Rules:
- Use at most 2 auras per screen.
- Add film grain (3–6%) on auras and photo backdrops.
- Never put gray text on an aura, because it fails contrast.

---

## 3. Glass

| Property | Light glass | Dark glass |
|---|---|---|
| Fill | `rgba(255,255,255,.56)` (strong: `.78`) | `rgba(28,30,33,.52)` (strong: `rgba(36,38,42,.72)`) |
| Rim | 1px `rgba(255,255,255,.72)` | 1px `rgba(255,255,255,.10)` |
| Blur | 24px, saturate 1.6 | same |
| Shadow | inset 0 1px 0 white 60% + 0 20px 50px `rgba(20,20,24,.12)` | inset white 8% + 0 24px 60px black 45% |

- **Iridescent rim:** a 1px gradient border (pink → cyan → lime → amber) on one premium card
  per screen at most.
- **Controls inside glass** use the stronger glass fill.
- **Reduce Transparency:** glass becomes a solid surface.
- **Flat style:** glass becomes solid white or `#131416` cards with no blur.

---

## 4. Typography

| Family | Use |
|---|---|
| **Urbanist** (geometric, rounded terminals) | Everything. System font fallback |
| **Doto** (dot-matrix) | One signature numeral per screen, maximum |
| Inter | Flat style only |

| Role | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| Hero | 96 / 92 | 300 | −4% | Single-metric screens, dot-matrix widgets |
| Display XL | 72 / 72 | 300 | −3.5% | Amount entry, single-metric heroes |
| Display | 56 / 58 | 300 | −3% | Hero figure |
| Numeral | 40 / 44 | 300 | −2% | Card figures, KPIs |
| H1 | 34 / 38 | 400 | −2% | Screen titles (often two lines) |
| H2 | 26 / 30 | 400 | −1.5% | Greetings, section titles |
| H3 | 20 / 24 | 500 | −1% | Web card titles |
| Title | 17 / 22 | 500 | −0.5% | Mobile card and nav titles |
| Body | 15 / 22 | 400 | 0 | Paragraphs |
| Body strong | 15 / 22 | 600 | 0 | List titles, emphasis |
| Label | 14 / 18 | 500 | 0 | Buttons, chips, segmented |
| Meta | 13 / 18 | 500 | 0 | Status labels, card labels, list subtitles |
| Caption | 12 / 16 | 400 | +0.5% | Labels above values, axes |
| Micro | 11 / 14 | 500 | +4% | Eyebrows (uppercase sparingly) |

**Numeral anatomy.** Take `₹4,82,190.36` or `84.2 kW`:
- The number is weight 300, tracked −3%, with tabular figures.
- The unit or decimals are 38% of the number size, weight 400, secondary color, on the baseline.
- The currency symbol is 38% size, raised to the cap line.
- Leading zeros in tiny quantities are muted (`0.00`**321** BNB).
- The label sits above in caption/secondary; the context line below is a status dot or tag plus
  a caption.

**Headlines.** Light, with one heavy word: "Good morning, **Aarav**", "Hello Alex, can I **help
you?**". Use sentence case everywhere; never put uppercase on buttons.

---

## 5. Space, size and shape

**Spacing ladder (4pt):** 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80. Choose by
relationship, so the gap inside a group is always smaller than the gap between groups:

| Relationship | px |
|---|---|
| Label → its value | 4 |
| Icon ↔ label | 6 |
| Items in one group (orbs, chips, KV lines) | 8 |
| Elements inside a card | 12–16 |
| Card padding | 20 (16 small) |
| Card ↔ card | 12 |
| Header → screen title | 24 |
| Section ↔ section | 32 |
| Screen margin | 20 mobile · 32 web |

**Mobile skeleton:** status bar → 8 → header row (every item 48) → 24 → title block → 32 →
content → ≥ 120 clear → pinned zone (action row 56 / slide 64 / dock 64) 34 above the home
indicator.

**Web grid:** 12 columns, gutter 32, bento gap 12, equal row heights (e.g. 320), cells span
3/4/6/8/12, every cell at the card radius.

**Corner anchoring.** In a card, the label goes top-left, the action or tag top-right, the figure
bottom-left and the context bottom-right. An optional instrument sits between them.

| Radius | px | Use |
|---|---|---|
| SM / MD | 8 / 12 | Inner tiles, dense cards, inputs |
| Tile | 14 | Square tool tiles, month cells |
| LG | 20 | Web cards, blueprint cards, panes inside widgets |
| **Card** | **28** | Cards, glass panes |
| 2XL | 32 | Large panes, hero cards |
| **Widget** | **40** | Aura widgets, product cards |
| Sheet | 48 | Bottom-sheet top corners |
| Pill / circle | — | Buttons, chips, segmented, dock, slide, orbs, beads |

Nested radius = outer − padding (minimum 8). Use continuous (squircle) corners on iOS. Use one
radius family per product.

**Control ladder** (use one height per row):

| Height | Used by |
|---|---|
| 24 | Tags, count badges, status pills |
| 32 | Dense chips (dashboards) |
| 40 | Chips, segmented items, nav items |
| **48** | Header items, orbs, tiles, fields, segmented track |
| **56** | Primary pill, action-row orbs, mobile search |
| **64** | Slide to confirm (52 knob), dock (52 items), prompt input |

**Per-screen budgets:** ≤ 5 type sizes (≤ 3 per card), 1 focal figure, 1 primary action, accent
used ≤ 3 times, ≤ 2 auras, 1 dot-matrix figure, 1 iridescent rim.

---

## 6. Components

### Surfaces
- **Glass pane:** light, strong or dark; radius 28; padding 20.
- **Aura widget:** squircle radius 40 with an aura fill and film grain.
- **Blueprint card:** electric blue `#0832D8`, radius 20, white isometric line-art, three stacked
  key/values at the bottom.
- **Ink widget:** `#111214` with a dot-matrix figure in the accent.
- **White card** (light instrument variant): radius 28–40 on the `#EFEFF1` canvas.

### Controls
- **Orb:** a round icon button in one of five kinds:
  - *glass*: the default
  - *solid ink*: the primary icon action
  - *white*: on dark or photo backdrops
  - *accent*: the single most important icon
  - *outline*: on plain white
- **Pill button:** 56 tall. Ink is primary; also accent, glass or white.
- **Action row:** `(orb)  [ Primary verb ]  (orb)`, pinned at the bottom, e.g.
  `(⇄) [Buy gold] (↓)`.
- **Slide to confirm:** `(→) Slide to buy ›››` for irreversible money movement. Confirm at 85%
  travel and spring back otherwise; it must have an accessibility action.
- **Segmented:** a glass pill container with the active segment white (or accent).
- **Chips:** glass or outline. **Tags:** 24 tall, 11/600, accent, ink or critical.
- **Dock** (replaces the tab bar): a glass capsule of 52px orbs with the active one in solid ink
  or accent. It floats centred at the bottom.
- **Tiles:** square-rounded (radius 14) tool buttons for industrial and map UIs.

### Data and instruments
- **Figure:** the numeral anatomy from §4.
- **Tick ruler:**
  - minor ticks every 6px, 10px tall
  - major ticks every 30px, 18px tall
  - a 2px accent needle with a glow
  - 11px labels under the ruler
  - used for amount, tenure, timeline and gauges
- **Meter line:** a label, the value on the right, and a 2px track under both, colored by
  severity.
- **Hairline bars:** 2px vertical strokes at 28% opacity, with one bar lit in the accent and
  glowing.
- **Window curve:**
  - the full series drawn as a dotted ghost line
  - the active range redrawn solid inside a clip window
  - glass beads (r 7–9) at the window edges
  - the cursor as an ink dot with an accent ring, plus a dashed drop line
- **Beaded arc gauge:** a dotted semicircle with a solid healthy segment, glass beads at the
  segment ends, and a glass verdict pill ("Within limits").
- **Thin arc gauge** (credit style): a 2px ink arc and a needle tick, with the numeral beside it.
- **Month grid:** 6 columns of cells (radius 14).
  - paid: accent check
  - missed: gray ×
  - current: accent outline
  - upcoming: dashed ring
  - used for SIP, EMI, loans and medication.
- **Status dot:** see §2.
- **Key/value:** label above value, label left and value right, or a dotted leader
  (`Gold value ········ ₹9,708.74`).

### Textures and lines
- Film grain on auras and photos.
- A 14px dot grid on dark canvases (node editors, document spaces).
- Dotted and dashed lines for ghost curves, leaders, drop lines, selection boxes and radius
  circles.

---

## 7. Icons and imagery

- **Icons:** line icons at 1.6–1.75 stroke with rounded joins (Lucide / SF Symbols regular),
  always inside an orb or tile. ↗ in a circle is the universal "open".
- **3D renders:** the product's physical world (gold bars, vaults, machines, houses, pills,
  organs), in soft studio light, one per screen.
- **Line-art and blueprint:** isometric technical drawings with dimension lines, either white
  on electric blue or ink on white.
- **Selective color:** a grayscale 3D scene with one object in the accent (the selected truck,
  the critical container).
- **Photography:** full-bleed behind glass. Fade or blur it where text sits.

---

## 8. Layout archetypes

**Mobile**
| ID | Screen | Structure |
|---|---|---|
| G1 | Home over aura | orb · chip · orb (all 48) → mixed headline → hero figure + status → glass price metric with window curve → 2 widgets → action row (activity below the fold) |
| G2 | Detail over 3D | full-bleed render with floating glass callouts → bottom glass sheet: figure, key/values, action row |
| G3 | Instrument | huge figure + unit → tick dial or beaded arc → stat triplet → verdict pill → circle–pill–circle controls |
| G4 | Amount → confirm | dark + warm glow → glass segmented (₹ / g) → display-XL figure → conversion line → lock chip → tick ruler → leader rows → slide to confirm |
| G5 | Map ops | full-bleed map → glass search + orb stack → route + accent dot → glass sheet with ID, status, key/values |
| G6 | History | title + status → aura card (paid / left) → month grid → meters → next debit → dock |
| G7 | Widgets | grid of radius-40 aura squircles, one dot-matrix figure |
| G8 | Questionnaire | photo/aura → caption → big light question → option cards (selected = accent) → slide to next |

**Web**
| ID | Screen | Structure |
|---|---|---|
| W5 | Bento over fog | 48 row: logo · glass nav track (ink active) · glass search · orbs → display 56 light title + KPI row → 12-col bento (rows 320, gap 12) of glass, aura, blueprint and ink tiles |
| W6 | 3D console | full-bleed 3D scene with selective color → glass panels left (list) and right (inspector) → tool dock |
| W7 | Node canvas | black dot grid → dark glass nodes with ports → glowing accent connectors |

---

## 9. Motion

| Token | Value | Use |
|---|---|---|
| Fast | 120ms | Press (scale to 0.97) |
| Base | 200ms | Color/fill, segmented |
| Slow | 320ms | Sheets, panes |
| Chart | 600ms | Bars and curves drawing in |
| Stagger | 40ms | Sequences |
| Spring | response 0.35, damping 0.82 | Interactive (iOS) |

Signature motions:
- the needle glides along the ruler
- numbers roll between values
- glass panes rise 12px while their blur fades in
- the dock highlight morphs between items
- the slide knob springs back if released early

With Reduce Motion, keep fades only.

---

## 10. States

| State | Treatment |
|---|---|
| Loading | Skeleton panes at the final size, with a shimmer across the glass |
| Empty | One line plus one action inside the same card |
| Error | The status dot turns critical, with a caption stating the fix |
| Stale | Warning dot + "Updated n min ago" |
| Closed | Idle dot + "Market closed · opens 10:00" |

---

## 11. Accessibility

- Contrast ≥ 4.5:1, **measured on the actual backdrop**. Add strong glass or a scrim over busy
  photos.
- Hit targets ≥ 44pt. Every orb and dock item has a label.
- Status is never shown by color alone (dot plus word). Money deltas show a sign or arrow.
- Dot-matrix and figure views expose the plain value to screen readers.
- Respect Reduce Motion and Reduce Transparency.

---

## 12. Do / Don't

| Do | Don't |
|---|---|
| Thin 300-weight hero numbers with small gray units | Bold numbers; units at full size; big currency symbols |
| Glass over photos, 3D, maps, auras | Glass floating on flat gray |
| One accent, 1–3 uses | Several accents or rainbow gradients |
| Orbs, pills, circle–pill–circle rows | Rectangular buttons in the glass style |
| Tick rulers, meters, hairlines, month grids | Multi-color charts, many-slice pies, chunky bars by default |
| Status dot plus word | Status by colored text alone |
| One dot-matrix figure, one iridescent rim | Stacking signature effects on one screen |
| Ink or white text on auras | Gray text on gradients |

---

## 13. Flat style (v1) differences

Switch with `data-style="flat"` / `.rdlSurfaceStyle(.flat)`.

| | Glass (v3) | Flat (v1) |
|---|---|---|
| Surface | Glass over imagery | Solid white cards on `#F3F3F5`, no borders or shadows |
| Hero | Figure on an aura or glass | One ink card `#0B0B0D`, radius 28 |
| Font / numerals | Urbanist, 300 | Inter, 500 |
| Accent | Volt `#DFFA32` as needle, dot, tag | Lime `#CBEF43` as CTA fill and active tab |
| Charts | Rulers, hairlines, window curves | Capsule bars, 45° hatched history, one accent bar with a tooltip |
| Navigation | Glass dock | Dark floating capsule tab bar |
| Radius | Card 28, widget 40 | Card 24, hero 28 |

---

## 14. Quick start

**Web**
```html
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&family=Doto:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="skills/rdl-theme/assets/tokens/tokens.css">
<link rel="stylesheet" href="skills/rdl-theme/assets/templates/rdl-components.css">
<html data-theme="light" data-style="glass" data-accent="gold">
```

**SwiftUI (iOS 17+)**
```swift
// Add RDLTokens.swift, RDLComponents.swift, RDLGlassComponents.swift, RDLLayout.swift
ContentView().rdlAccent(.gold).rdlSurfaceStyle(.glass)
```

To change values, edit `skills/rdl-theme/assets/tokens/tokens.json`, then run
`node skills/rdl-theme/scripts/build_tokens.mjs`.

**Audit any HTML build** (0 errors before shipping):
```bash
node skills/rdl-theme/scripts/audit_ui.mjs path/to/page.html            # phone shots
node skills/rdl-theme/scripts/audit_ui.mjs dashboard.html --w 1440 --h 960
```
