# RDL design study

What the RonDesignLab (RDL) visual language is, based on a frame-by-frame scan of 220 shots.
Raw per-frame notes: `research/moodboard-notes.md` at the repo root.

## Sources and evidence

| Source | What it gave | Confidence |
|---|---|---|
| **Figma "Design Moodboard 2026"**: 220 RDL shots (1600×1200), each viewed and annotated | V2: the current glass language, components, type, color, charts, presentation | **High.** Seen directly, colors judged by eye |
| Search-indexed Dribbble shot titles (Coin, Mint, SavingPro, Credit Pros, Aella, Oscar…) | V1: the 2023–24 flat fintech series | Medium. From text, not pixels |
| Reference builds in `assets/templates/`, rendered and reviewed | Proof that the rules add up to the look | High for internal consistency |

To pixel-calibrate, export shots to `research/shots/`, run `scripts/extract_palette.py`, and
update `tokens.json` wherever ΔE > 8.

## What the 220 frames contain

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

## The V2 language in ten observations

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

## Variants inside the language

| Variant | When RDL uses it | Traits |
|---|---|---|
| **Glass on photo/3D** (dominant) | Health, energy, mobility, security | Dark or light glass, orbs, dock, auras |
| **Light instrument** | Health dashboards, fintech, logistics mobile | White/very light gray cards (radius 28–40), light numerals, tick rulers, lime tags |
| **Blueprint** | Automotive, industrial, insurance | Electric blue fields, white line art, outlined inputs, square buttons |
| **Swiss / editorial** | QuickBooks, Oil Well, Smart Home, Greenhouse | Sharp or small radii, neon-yellow blocks, hairline dividers, bold/light type contrast |
| **Node canvas** | AI workflows, VFX, documents | Black dot-grid canvas, glowing bezier connectors, node cards with ports |

## Finance frames (most relevant for money products)

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

## V1 → V2: what changed

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

## V1 portfolio inventory (Dribbble, search-indexed)

Coin (wallet), Bloom Trading, Mint (personal finance), SavingPro, Creative Juice, QuickBooks,
Credit Pros, Aella, Salesforce CRM, PHR, Oscar Health, EHR, Vessel, Dentale, Veri CGM, Vizo,
Lendora, Helvio, Moverta, Urbis, Monte, Daneel, MBOX, Luma, Booki. Links are in the git history
of this file (v1).
