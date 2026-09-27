# Foundations

All values live in `assets/tokens/tokens.json`. This file explains the intent so you can make
correct calls when a case isn't covered.

## Color

### Layers (light)

```
bg-canvas  #F3F3F5   ← screen / page
  bg-surface  #FFFFFF   ← cards
    bg-surface-muted / fill-control  #F3F3F5   ← wells, chips, icon buttons inside cards
  bg-hero  #0B0B0D   ← the one dark card
    bg-hero-raised  #26262B   ← buttons / chips inside the hero
```

Three luminance steps (canvas → surface → well) do the work borders and shadows do elsewhere.
Dark mode keeps the same structure: canvas #0B0B0D → surface #17171A → well #202024, and the hero
becomes #232327 (a raised card rather than an inverted one).

### Container-aware controls
Controls take the fill that contrasts with their container (`--rdl-ctl` in CSS):

| Container | Control fill |
|---|---|
| Canvas | `bg-surface` (white) |
| Surface card / sidebar | `fill-control` (gray) |
| Muted well | `bg-surface` |
| Hero | `bg-hero-raised` |

### Accent packs
Pick **one** per product via `data-accent` / `.rdlAccent()`:

| Pack | accent | on-accent | Use for |
|---|---|---|---|
| `lime` (default) | #CBEF43 | ink | Fintech, trading, savings, creator tools — the RDL signature |
| `violet` | #7152F5 | white | Credit, AI, productivity, crypto |
| `orange` | #F55F24 | ink | Logistics, delivery, fitness, energetic consumer |
| `ocean` | #2F66F6 | white | Health, insurance, enterprise SaaS, travel |
| `gold` | #DDAE3A | ink | Precious metals, wealth, premium tiers |

Each pack defines `accent`, `accent-strong` (hover/pressed), `accent-soft` (tinted wells and
avatars), `on-accent` (text/icons on accent) and `accent-text` (accent used as text on white —
darkened to pass contrast; lighter in dark mode).

**Where accent goes** (budget: 1–3 uses per screen): primary CTA *or* hero action, active tab,
highlighted data point, one nudge/KPI card, brand mark. Never on body text, never as a page
background, never two accent cards side by side.

### Semantic
`success` / `danger` / `warning` / `info` each have a base (charts, dots, icons), a `-soft` tint
(pill backgrounds) and — for the first three — a `-text` shade that passes 4.5:1 on its tint.
Deltas are always a soft pill with the `-text` color and an arrow glyph (↑ / ↓), never color alone.

### Contrast (checked)
| Pair | Ratio |
|---|---|
| text-secondary on surface / canvas | 5.0 / 4.6 |
| ink on lime / gold / orange | 15.0 / 9.5 / 6.1 |
| white on violet / ocean | 5.0 / 4.8 |
| success-text / danger-text / warning-text on their tints | 5.7 / 4.7 / 5.5 |
| text-tertiary (#9A9AA3) on white | 2.8 — decorative/redundant only (axis labels, placeholder) |

## Typography

One family: **Inter** on web (with `cv11` single-storey a and `tnum` for figures), **SF Pro**
on iOS. Manrope is the approved alternate for a softer brand. No second display face.

| Role | Size/Line | Weight | Tracking | Use |
|---|---|---|---|---|
| display-xl | 56/60 | 500 | -3.5% | Hero number on detail screens, web hero KPI |
| display | 44/48 | 500 | -3% | Balance on hero card |
| h1 | 32/38 | 600 | -2.5% | Screen title (large-title screens), web page greeting |
| h2 | 26/32 | 600 | -2% | Section-level numbers, onboarding headlines |
| h3 | 20/26 | 600 | -1.5% | Web card titles |
| title | 17/22 | 600 | -1% | Mobile card titles, nav titles, stat values |
| body | 15/22 | 400 | -0.5% | Paragraphs |
| body-strong | 15/22 | 500 | -0.5% | List row titles, buttons |
| label | 14/18 | 500 | -0.5% | Chips, segmented, field labels |
| caption | 12/16 | 500 | 0 | Secondary info under titles, deltas |
| micro | 11/14 | 500 | +1% | Axis labels, tooltips |

Rules: numbers use tabular figures; decimals/cents at ~55% size in `text-secondary`; currency
symbol same size as the integer part; sentence case; never below 11pt; max two weights per card.

## Spacing and layout

4pt base. Most used: 8 (inline gaps), 12 (card gap), 16, 20 (gutter / card padding), 24, 28
(section gap), 32.

| Context | Mobile | Web |
|---|---|---|
| Screen gutter | 20 | 16 around floating shell, 32 content |
| Card padding | 20 (hero 20–24) | 24 |
| Gap between cards | 12 | 16 |
| Section gap | 28 | 24 |
| Sidebar | — | 248 |
| Bottom safe space above tab bar | 120 | — |

Web dashboards use a 4-column bento grid (12-col underneath for complex pages). Cards span 1, 2
or 3 columns; heights align per row.

## Radius

| Token | px | Use |
|---|---|---|
| xs | 6 | Tooltip tails, tiny tags |
| sm | 10 | Logo tile, small thumbnails |
| md | 14 | Stat wells, inner cards, inputs in dense web forms |
| lg | 20 | Web cards |
| xl | 24 | Mobile cards |
| 2xl | 28 | Hero cards, web sidebar |
| 3xl | 32 | Bottom sheets, modal cards |
| pill | 999 | Buttons, chips, segmented, search, tab bar, progress |

Nested radius rule: inner radius = outer radius − padding (min 10). Use `.continuous` corners on iOS.

## Elevation

Flat by default. Shadows only when something floats over other content.

| Token | Use |
|---|---|
| none | Cards on canvas (default) |
| sm | Cards over imagery or maps |
| md | Popovers, dropdowns |
| lg | Bottom sheets, modals, presentation mockups |
| float | Floating tab bar, FAB |

## Iconography

Line icons, 1.75 stroke, rounded caps/joins, 24 grid (Lucide / SF Symbols "regular"). 20pt in
buttons and rows, 16pt in chips and pills. Icons sit in circles (icon buttons, list leads);
never float bare next to text except inside buttons. Arrow-up-right (↗) is the studio's
favourite "open / send / go" glyph.

## Imagery

- Avatars: circular, initials on `accent-soft` with `accent-text` when there's no photo.
- Photography (health, travel, property): full-bleed inside a rounded card, never edge-to-edge
  on the screen; gradient scrim only for overlaid text.
- 3D objects (cards, coins, gold bars): one per screen, on onboarding or empty states.
- Maps: desaturated/light basemap; routes and pins in ink + accent.

## Motion

| Token | Value | Use |
|---|---|---|
| fast | 120ms | Press states, toggles |
| base | 200ms | Color/fill changes, segmented, tab switches |
| slow | 320ms | Sheets, card expansion |
| chart | 600ms | Bars/lines drawing in |
| stagger | 40ms | Between bars, list items |
| spring | response 0.35, damping 0.82 | iOS interactive transitions |

Signature motions: bars grow from the baseline with stagger; numbers roll (`contentTransition(.numericText())`);
the selected pill/tab glides (`matchedGeometryEffect` / FLIP); buttons scale to 0.97 on press.
Respect Reduce Motion: drop growth/stagger, keep opacity fades.
