---
name: rdl-theme
description: Design and build apps in the RonDesignLab (RDL) style. The default V2 "glass" language (2025–26) has frosted glass over photos, 3D renders and soft gradient auras; huge light-weight numerals with small muted units; dot-matrix figures; orbs, pills and circle–pill–circle action rows; tick-ruler and hairline instruments; status dots; line-art and blueprint illustration. There is also a V1 "flat" fintech style. Use whenever the user asks for the "RDL theme/style", "RonDesignLab style", or a Dribbble-grade fintech, wealth/gold, health, energy, logistics, industrial/IoT, property or SaaS app, screen, dashboard or shot, and whenever a project already uses RDL tokens (tokens.css, RDLTokens.swift, tailwind.preset.js). Covers SwiftUI, HTML/CSS, Tailwind/React, web dashboards and portfolio presentation.
---

# RDL Theme · v2

A production design system distilled from a frame-by-frame scan of 220 RonDesignLab shots
(`references/design-study.md`, raw notes in `research/moodboard-notes.md`). It gives you tokens,
components, screen archetypes, domain playbooks and a QA bar, so that what you build reads as
RDL without copying any single shot.

## The RDL DNA (v2 · glass)

1. **Glass over something.** Cards are frosted panes over a photo, 3D render, map, aura gradient
   or fog. Light glass is white at ~56% with a bright rim; dark glass is graphite at ~52% with a
   10% rim. At most one iridescent rim per screen.
2. **Numbers are huge and light.** Use weight 300 at 48–84pt in Urbanist, tracked tight. The unit
   is 38% size and gray; the currency symbol is small and raised; leading zeros are muted. At
   most one dot-matrix figure per screen, as a signature.
3. **Headlines whisper.** Large and light, often two lines, with at most one 600-weight word
   ("Good morning, **Aarav**").
4. **Circles and pills only.** Orbs for icons (glass / solid ink / white / accent / outline),
   pills for words, circle–pill–circle rows or slide-to-confirm at the bottom, and a glass dock
   instead of a tab bar. The industrial variant uses square-rounded tiles (radius 14).
5. **One loud accent.** Volt, gold, signal, electric, ember or orchid, spent 1–3 times: the active
   orb, the needle or selected datum, one tag or the checkmarks.
6. **Color lives in auras.** Soft gradient washes (gold, sunset, meadow, dusk, orchid, ocean,
   ember, fog) fill widgets and backdrops, often with film grain. Use at most two per screen.
7. **Instruments, not charts.** Tick rulers with a glowing needle, 2pt meter lines, hairline
   bars with one lit, dotted ghost curves with a solid window and glass beads, month grids,
   beaded arcs.
8. **Status is a dot.** "● Operational", "● In transit", "● Delayed · 2h". Use colored pills
   only for escalations ("High Priority").
9. **Technical illustration.** Isometric line-art, blueprints on electric blue, wireframe 3D,
   and selective color (one accent object in a grayscale scene).
10. **Photographic presentation.** Hands holding phones, angled devices, depth-of-field
    close-ups, flat mustard/gray backdrops (`references/presentation.md`).

**Flat style (v1)** is available with `data-style="flat"` / `.rdlSurfaceStyle(.flat)`. It gives
solid white cards on gray, Inter, medium numerals, an ink hero card, a lime CTA, hatched bars and
a dark floating tab bar. Use it when a product needs the calmer 2023–24 fintech look, or when
there is no imagery to put glass on.

## Workflow

1. **Classify.** Domain (see `references/domain-playbooks.md`), platform (iOS / web app / web
   dashboard / shot), and style (glass by default; flat if there's no imagery or the brand is
   conservative). Pick the accent pack and the backdrop (aura, photo, 3D or fog).
2. **Wire the tokens.** Never hard-code hex, radius, blur or type values.
   - Web: `assets/tokens/tokens.css` + `assets/templates/rdl-components.css`, with fonts
     Urbanist (300–700) and Doto (700) from Google Fonts.
     `<html data-theme="light|dark" data-style="glass|flat" data-accent="gold">`.
   - Tailwind: import `tokens.css` and add `assets/tokens/tailwind.preset.js` to `presets`
     (`bg-aura-gold`, `rounded-card`, `rounded-widget`, `font-dot`, `backdrop-blur-glass`).
   - SwiftUI (iOS 17+): add `RDLTokens.swift`, `RDLComponents.swift` and
     `RDLGlassComponents.swift`; bundle Urbanist (optional). At the root:
     `.rdlAccent(.gold).rdlSurfaceStyle(.glass)`.
   - To change a value, edit `assets/tokens/tokens.json`, then run
     `node scripts/build_tokens.mjs`.
3. **Pick an archetype** from `references/screen-patterns.md`: G1 home over aura, G2 detail over
   3D, G3 instrument, G4 amount → slide to confirm, G5 map ops, G6 history/month grid, G7
   widgets, G8 questionnaire; web W5 bento over fog, W6 3D console, W7 node canvas (flat: M1–M7,
   W1–W4).
4. **Compose** from `references/components.md`: surface + figure + instrument + context + one
   action. Build domain components from these; never one-off styles.
5. **Handle the real states**: loading (skeleton panes), empty (one line + one action), error
   (a crit dot + the fix), stale (a warn dot + "Updated n min ago").
6. **QA** with `references/qa-checklist.md`, measuring contrast on the actual backdrop. Render
   it and look (the templates render in Playwright).

## Token quick reference

| Role | Light | Dark |
|---|---|---|
| canvas / surface | `#EFEFF1` / `#FFFFFF` | `#0A0B0C` / `#131416` |
| text primary / secondary | `#0A0B0C` / `#6B6B74` | `#F4F4F5` / `#A1A1AA` |
| glass fill / rim | `rgba(255,255,255,.56)` / `.72` | `rgba(28,30,33,.52)` / `rgba(255,255,255,.10)` |
| accents | volt `#DDF23A` · gold `#EBC45C` · signal `#4BE06E` · electric `#2233F0` · ember `#FF5A1F` · orchid `#A548EE` | same |

| Scale | Values |
|---|---|
| Type | display-xl 72 · display 56 · numeral 40 (all 300) · h1 34 · h2 26 (400) · h3 20 · title 17 (500) · body 15 · label 14 · caption 12 · micro 11 |
| Radius | tile 14 · lg 20 · **card 28** · 2xl 32 · **widget 40** · pill · circle |
| Controls | orb 44 (56 in action rows) · tile 44 · dock item 52 · slide 64 |
| Glass | blur 24 · saturate 1.6 |
| Motion | 120 / 200 / 320 / 600 ms · stagger 40 · spring 0.35 / 0.82 |

Full rationale: `references/foundations.md`.

## Signature moves (use at least three per screen)

- A hero figure with a small raised currency and a muted unit or decimals, plus a status dot line.
- A window curve: dotted ghost series, a solid active window, glass beads, and an ink cursor
  with an accent ring.
- A tick ruler with a glowing accent needle (amount, tenure, timeline, gauge).
- A dot-matrix figure in an ink or aura widget.
- A circle–pill–circle action row, or slide-to-confirm, pinned at the bottom.
- A month grid of paid/missed/current/upcoming (SIP, EMI, medication).
- A blueprint card: electric blue, white isometric line-art, three stacked key/values.
- A dark iridescent glass card with a beaded arc gauge and a glass verdict pill.
- Glass chips floating over a 3D render with leader lines to labels.

## Anti-patterns

- Bold or 700-weight numbers; units at the same size as the number; big currency symbols.
- Glass on plain gray with nothing behind it; stacking more than two auras; neon rainbow gradients.
- Rectangular buttons in the glass style; mixing sharp Swiss blocks with rounded glass on one screen.
- Colorful multi-series charts, pie charts with many slices, and chunky filled bars as the
  default viz.
- Status shown only as colored text; red used for anything that isn't an error.
- More than one dot-matrix figure, iridescent rim or accent widget per screen.
- Gray text on aura gradients (it fails contrast), and tiny captions over busy photos without
  a scrim.

## Files

| Path | Use |
|---|---|
| `references/design-study.md` | 220-frame analysis: frequencies, the ten observations, variants, finance frames, v1→v2 |
| `references/foundations.md` | Modes, color, accent packs, auras, glass, type and numerals, radius, textures, imagery, motion |
| `references/components.md` | V2 + base components, SVG patterns, specs, domain compositions |
| `references/screen-patterns.md` | Glass archetypes G1–G8, W5–W7; flat M1–M7, W1–W4 |
| `references/domain-playbooks.md` | Wealth/gold/SIP/lease, banking, health, energy, logistics, industrial, property, creative, sport |
| `references/presentation.md` | 2026 shot composition: hands, DOF close-ups, angled devices, three-phone perspective |
| `references/qa-checklist.md` | Pre-delivery review |
| `assets/tokens/` | `tokens.json` (source) → `tokens.css`, `tailwind.preset.js` |
| `assets/ios/` | `RDLTokens.swift` (generated), `RDLComponents.swift` (base), `RDLGlassComponents.swift` (V2) |
| `assets/templates/` | `rdl-components.css`; glass `mobile-app.html`, `web-dashboard.html`; flat `*-flat.html` |
| `scripts/build_tokens.mjs` | Regenerates platform outputs from `tokens.json` |
| `scripts/extract_palette.py` | Calibrates tokens against exported shots (ΔE drift report) |
