# Calibration (v3)

Two inputs:
1. **Pixel sampling** of the 219 rendered frames (`research/frames.tsv`, 1200px renders from the Figma board), using `skills/rdl-theme/scripts/extract_palette.py` plus targeted per-frame probes.
2. **Structural measurement** from the pass-2 deep scan (`research/deep-scan.md`). Values are normalised to a 393pt-wide phone or a 1440px desktop. Most frames are angled or depth-of-field shots, so treat these as ±2pt estimates and snap them to the 4pt grid.

## Color

### Neutrals (pooled, all frames)
Every pooled neutral is within **ΔE 3** of a `stone` token (`#101010`→stone.950 1.8, `#F0F0F0`→stone.100 1.1, `#F8F8F8`→stone.50 0.6, `#E4E4E4`→stone.150 1.9). No change.

### Accents (saturated pixels, per-frame probes)

| Accent | Board sample | Frames | Old token | ΔE | v3 token |
|---|---|---|---|---|---|
| Volt | `#DEFC30` (checks), `#DEF000` (tags), `#E4FC18` | 1:163, 1:174, 1:118, 1:169, 1:134, 1:157 | `#DDF23A` | 7–10 | **`#DFFA32`** (volt.400) |
| Gold / mustard | `#EABA42` (UI pills and canvases) | 1:106, 1:137, 1:167, 1:210, 1:212 | `#EBC45C` | 4.7 | **`#ECBC44`** (gold.300) |
| Electric (blueprint) | `#0630D8`, `#002AD8` | 1:114, 1:168, 1:171 | `#2233F0` | 6–16 | **`#0832D8`** (electric.500) |
| Ember | `#FC5A0C` | 1:149, 1:153 | `#FF5A1F` | 4.8 | **`#FC5A10`** (ember.500) |
| Orchid | `#C86CF9` | aura widgets | orchid.400 `#C16CF7` | 2.4 | accent moved to orchid.400 |
| Rose (new) | `#F05484`, `#EA7ED2` | 1:169, 1:185, health auras | none | — | **rose.500 `#F0548A`** + `rose` aura |
| Crit coral | `#FC6060` | 1:184 "High Priority" | red.500 `#F0453E` | 13.6 | kept; coral is escalation-pill only |

The dark browns that drift in the pooled run (`#201410`, `#382820`) are skin and hands from presentation photos, not UI. They were ignored.

### Contrast after calibration
on-accent ≥ 4.5:1 for every pack: volt 16.8, gold 11.1, electric 8.5, ember 6.2, orchid (ink) 6.0, rose (ink) 6.0. accent-text on accent-soft is ≥ 4.5:1 for every pack (orange accent-text moved to orange.700).

## Structure (mobile, 393pt)

| Measure | Range on board | Mode | Token |
|---|---|---|---|
| Side margin | 16–24 | 20 | `mobile-gutter` 20 |
| Header item height (orb/tile/pill) | 44–56 | 48 | `header-height` 48, `orb` 48 |
| Header → title gap | 16–28 | 24 | `title-gap` 24 |
| Screen title | 34–48 / 300–400, often 2 lines | 34–40 | `h1` 34 · `display` 56 for hero |
| Card padding | 16–24 | 20 | `card-padding` 20 (`-sm` 16) |
| Gap between cards | 8–14 | 12 | `card-gap` 12 |
| Gap between sections | 24–40 | 32 | `section-gap` 32 |
| Label → value | 2–8 | 4 | `stack-tight` 4 |
| Card radius (glass) | 24–32 | 28 | `xl` 28 |
| Widget / product squircle | 36–48 | 40 | `3xl` 40 |
| Bottom-sheet top radius | 40–56 | 48 | `sheet` 48 |
| Tool tile (industrial) | 44–56 square, r 12–16 | 48 / 14 | `tile` 48, `radius.tile` 14 |
| Primary pill | 52–64 | 56 | `control-lg` 56 |
| Slide / dock / large input | 60–72 | 64 | `control-xl` 64 |
| Chip | 32–40 | 40 | `control-sm` 40 (`-xs` 32) |
| Tag | 22–26 | 24 | `tag` 24 |
| Pinned bottom offset (above home indicator) | 28–40 | 34 | `pin-bottom` 34 |
| Content clearance above pinned zone | 100–140 | 120 | `bottom-zone` 120 |

## Structure (web, 1440)

| Measure | Range | Mode | Token |
|---|---|---|---|
| Page gutter | 24–40 | 32 | `web-gutter` 32 |
| Header | 56–72, centred nav pills, utility orbs right | 64 | `web-header-height` 64 |
| Bento gap | 8–16 (Swiss: 1px hairline) | 12 | `web-bento-gap` 12 |
| Card radius | glass 20–28 · dense ops 8–12 · Swiss 0 | 20 | `lg` 20 |
| KPI | chip label → figure 26–34/300 → caption 12 | — | `h2` / `h1` + `caption` |

## Rules derived (encoded in `references/layout.md` and `references/guidelines.md`)
1. One control height per row; all header items share one height.
2. Nested radius = outer − padding (min 8).
3. Information is corner-anchored: label top-left, action top-right, figure bottom-left, context bottom-right.
4. Same-size two-tone headlines (weight or opacity split, never size split).
5. Status = dot + word; colored fills are only for escalations.
6. Dark layering steps about 4–6% luminance per level.
7. Never mix Swiss radius-0 blocks with rounded glass on one screen.
