# Foundations

All values live in `assets/tokens/tokens.json`. This file explains the intent behind them, so you
can make the right call when a case isn't covered. The glass style is the default; notes marked
**Flat** apply to `data-style="flat"` (v1).

## Modes and attributes

Put these on `<html>` (web), or inject them at the SwiftUI root:

| Attribute | Values | SwiftUI |
|---|---|---|
| `data-theme` | `light` · `dark` (or follow the system) | `.preferredColorScheme` |
| `data-style` | `glass` (default) · `flat` | `.rdlSurfaceStyle(.glass/.flat)` |
| `data-accent` | `volt` (default) · `gold` · `signal` · `electric` · `ember` · `orchid` · `lime` · `violet` · `orange` · `ocean` | `.rdlAccent(.gold)` |

A single screen may switch theme locally. Put `data-theme="dark"` on a dark hero screen inside a
light app, which is common on the board.

## Color

### Neutrals: stone
A cool, very slightly warm gray ramp (`stone.0` to `stone.950`). The light canvas is `stone.100`
`#EFEFF1`, cards are white, and ink is `stone.950` `#0A0B0C`. The dark canvas is `stone.950`,
with surfaces at `stone.900` and `stone.800`.

### Accent packs
Use one pack per product, and spend the accent 1–3 times per screen.

| Pack | Accent | On-accent | Seen on the board | Use for |
|---|---|---|---|---|
| **volt** | `#DDF23A` | ink | QuickBooks tags, TD Bank checks, "Best Seller", e-bike | Default. Fintech, AI, productivity |
| **gold** | `#EBC45C` | ink | Solar (mustard), Credit 832 aura | Precious metals, wealth, energy |
| **signal** | `#4BE06E` | ink | Compliance folders, fuel card, lawn, HRV | Health, ops "all good", sustainability |
| **electric** | `#2233F0` | white | Blueprint cards, fleet AI, containers | Automotive, industrial, insurance |
| **ember** | `#FF5A1F` | ink | Robot arm, oil field, traffic, stress relief | Logistics, alerts-heavy ops, fitness |
| **orchid** | `#A548EE` | white | Weight management, e-bike widgets | Wellness, consumer health |
| lime / violet / orange / ocean | v1 packs | | | Flat-style products |

**Where the accent goes:** the active orb or dock item, a needle or selected tick, the selected
data point or cell, one tag ("Best Seller", "+2.4%"), paid checkmarks, the brand dot. It never
goes on body text or large background areas. The exception is a single accent widget or a
blueprint card.

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

Rules: use at most two auras per screen. Text on an aura is ink or white, never gray-on-color
(check contrast). Keep auras soft, never neon rainbow.

### Glass
| Token | Light | Dark |
|---|---|---|
| `glass-fill` | `rgba(255,255,255,.56)` | `rgba(28,30,33,.52)` |
| `glass-fill-strong` | `rgba(255,255,255,.78)` | `rgba(36,38,42,.72)` |
| `glass-border` | `rgba(255,255,255,.72)` | `rgba(255,255,255,.10)` |
| blur / saturate | 24px / 1.6 | same |
| `shadow-glass` | inset top highlight + soft 50px drop | stronger drop |

Glass needs something behind it (a photo, 3D render, map, aura or fog). On a flat gray canvas,
use `glass-fill-strong` or a plain white card. The iridescent rim
(`.rdl-glass--iridescent`) is reserved for one premium card per screen. **Flat:** glass becomes
solid surfaces with no blur.

### Semantic
`success`/`danger`/`warning`/`info` each have base, `-soft` and `-text` variants (text passes
4.5:1 on its tint). In glass style, **status is shown as a dot** (`.rdl-status`): signal green
for ok, amber for warn, red for critical, electric for info, stone for idle.

## Typography

| Family | Token | Use |
|---|---|---|
| **Urbanist** (geometric, rounded terminals) | `--rdl-font-sans` | Everything |
| **Doto** (dot-matrix) | `--rdl-font-dot` / `RDLDotMatrixText` | One signature numeral per screen, maximum |
| Inter | `--rdl-font-flat` | Flat style only |

| Role | Size/Line | Weight | Use |
|---|---|---|---|
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

The spacing scale is unchanged from v1 (4pt base; 20 mobile gutter; 20 card padding; 12 card gap).

| Radius token | px | Use |
|---|---|---|
| tile / md | 14 | Square-rounded tool tiles, month cells, small cards |
| lg | 20 | Blueprint cards, web tables |
| xl = **card** | 28 | Cards, glass panes |
| 2xl | 32 | Sheets, large panes |
| 3xl = **widget** | 40 | Aura widgets, product cards, squircles |
| pill | 999 | Buttons, chips, segmented, dock, slide |
| circle | 50% | Orbs, knobs, beads |

The Swiss variant uses radius 0–4 on blocks and buttons. Use it only when the whole product
takes that tone, and don't mix it with rounded glass on the same screen.

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

Same durations as v1 (fast 120 · base 200 · slow 320 · chart 600 · stagger 40 · spring
0.35/0.82). Signature V2 motions:
- the needle glides across the tick ruler;
- numbers roll (`contentTransition(.numericText())`);
- glass panes fade and rise 12px with blur easing in;
- the dock highlight morphs (`matchedGeometryEffect`);
- the slide knob springs back when released early.

With Reduce Motion, keep fades and drop the travel and blur animation.
