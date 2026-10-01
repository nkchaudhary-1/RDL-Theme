# Changelog

## 3.1.0 — Concentric corner radius
Applies the nested-radius method from [Getting your border radius right](https://medium.com/design-bootcamp/getting-your-border-radius-right-a-simple-trick-for-smooth-nested-containers-f6e0025e8c53): outer = inner + gap, and halve the gap at each deeper level.

- **Rule change:**
  - inner radius = outer − gap, where gap = padding + border (+ wrapper offsets).
  - The old "minimum 8" clamp is gone: clamping broke concentricity. When the result gets too small, reduce the gap (host padding 12, then 8 → 4) or raise the outer radius.
  - Padding ≥ radius gives a square inner corner.
  - At most three levels.
  - Pill-in-pill controls (segmented, dock, slide, prompt field) are verified concentric.
- **Tokens:** new radius steps `base` 16 and `panel` 24, so common chains land on the scale (48→28→16→8, 40→24, 24→16→12→8).
- **CSS:**
  - Every surface passes its children the exact concentric radius in `--rdl-nest-r`, with the glass rim counted.
  - New `.rdl-nest` for nested panes.
  - New `--host` modifiers (`.rdl-card--host`, `.rdl-glass--host`, `.rdl-widget--host`, `.rdl-blueprint--host`) halve the gap to 12.
  - Tinted panes are auto-concentric.
- **SwiftUI:** `RDLRadius.nested(outer:padding:border:)` (no clamp), `RDLRadius.hostPadding`, `RDLRadius.chain(outer:gap:levels:)` (→ [24, 16, 12, 8]), and `.rdlConcentricContainer(radius:)` for `ContainerRelativeShape` children.
- **Audit:**
  - The nested-radius check now finds the nearest enclosing surface and measures the real gap at each corner the element hugs.
  - It warns when the inner radius isn't outer − gap, in either direction, and suggests halving the gap when the gap eats the radius.
  - Exact derived radii are accepted off-scale.
- **Docs:** `layout.md` §6 rewritten (nesting table, chains, rules, sources); anatomy, guidelines, foundations, QA, components, SKILL.md and DESIGN-STYLE.md updated.

## 3.0.0 — Guidelines, layout system and audit
A second, structural pass over all 220 board frames (`research/deep-scan.md`) plus pixel calibration (`research/calibration.md`). Goal: screens that come out consistent, minimal and well spaced by construction.

- **New references:**
  - `layout.md`: spacing ladder by relationship, mobile skeleton, web 12-column bento, corner anchoring, control-height ladder, radius and nesting rules, platform notes.
  - `anatomy.md`: exact specs for every component and layout primitive.
  - `guidelines.md`: hierarchy recipe, type rules, per-screen color budget, app-level consistency decisions, minimalism, numbers and content, do/don't.
- **Design study:** 20 structural rules with frame-level evidence.
- **Calibrated colors:**
  - volt `#DFFA32`, electric `#0832D8`, gold `#ECBC44`, ember `#FC5A10`.
  - New **rose** accent and aura.
  - Orchid accent moved to the calibrated `orchid.400`.
  - Dusk aura darkened for white text.
  - Secondary text is now `#5C5C64` (≥ 4.5:1 on canvas and fog).
  - New `info-text` semantic.
  - Every accent pack's on-accent and accent-text pairs pass 4.5:1.
- **Tokens:**
  - Type roles `hero` 96 and `meta` 13.
  - Layout tokens (header 48, title gap 24, section 32, stack 4/8/16, pin 34, bottom zone 120, web header 64, bento gap 12).
  - Control ladder 24/32/40/48/56/64.
  - Radius sm 8 / md 12, new `sheet` 48.
- **CSS:**
  - Part 3 adds the layout primitives (`.rdl-screen`, `.rdl-header`, `.rdl-stack--*`, `.rdl-inline`, `.rdl-grid-2/3`, `.rdl-bento` + spans, `.rdl-pin`).
  - New structural components: `.rdl-metric` corner-anchored tile, `.rdl-statuspill`, `.rdl-titletabs`, `.rdl-field`, `.rdl-sheet`, `.rdl-kv--value-first`, `.rdl-widget--ink`, `.rdl-glass--tint`, `.rdl-nav`, `.rdl-table`, `.rdl-skeleton`.
  - Auras and dark surfaces redefine the text tiers.
  - Every existing control now sits on the ladders (orb 48, tag 24, chip 40, segmented 48, dock and slide 64).
- **SwiftUI:** new `RDLLayout.swift` (`RDLScreen`, `RDLHeader`, `RDLMetricTile`, `RDLStatusPill`, `RDLSectionHeader`, `RDLTitleTabs`, `RDLField`, `.rdlSheet()`, `RDLRadius.nested`, `RDLSkeleton`); hard-coded sizes replaced with tokens.
- **New `scripts/audit_ui.mjs`:**
  - Rules: type scale, spacing ladder, radius scale, control heights, mixed row heights, pinned-zone clearance, nested radius, accent budget, hit targets.
  - Text contrast is measured on the rendered pixels behind each line of text.
- **Templates:**
  - Glass mobile and dashboard rebuilt on the primitives with no inline sizes.
  - Both pass the audit with 0 errors in light, dark, gold and volt.
  - Previews renamed `v3-*`.
- **Breaking:**
  - Radius `sm` 10→8 and `md` 14→12.
  - `size.control-sm/md` 36/44 → 40/48; `size.tile` and `size.icon-button` 44 → 48.
  - The section head title is 17/500.

## 2.0.0 — Glass language
Based on a frame-by-frame scan of 220 RonDesignLab shots (Figma "Design Moodboard 2026"). Notes are in `research/moodboard-notes.md`.

- **New default style: glass.** Frosted panes over photos, 3D renders and aura gradients; iridescent rims; film grain; dot grids.
- **Type:** Urbanist replaces Inter; hero numerals are now weight 300 with 38% muted units and a small raised currency; added a dot-matrix numeral (Doto / `RDLDotMatrixText`).
- **Color:** new stone neutrals; new accent packs volt (default), gold, signal, electric, ember and orchid; 8 aura gradients.
- **Components:** glass pane, aura widget, blueprint card, figure, orb, tile, circle–pill–circle action row, slide-to-confirm, glass segmented and chips, tags, status dots, key/value (stacked/row/leader), glass dock, tick ruler, meter line, hairline bars, month grid, plus reduced-transparency fallbacks. Web: `rdl-components.css` part 2. SwiftUI: `RDLGlassComponents.swift`.
- **Radii:** card 28, widget 40, tile 14.
- **Docs:** rewrote the design study (frequencies, variants, finance frames), foundations, components, screen patterns (G1–G8, W5–W7), domain playbooks (wealth/gold/SIP/lease, energy, industrial, logistics…), presentation and QA.
- **Templates:** new glass `mobile-app.html` (gold savings: Home, Buy, SIP) and `web-dashboard.html` (treasury console).
- **V1 kept as `data-style="flat"`:** `mobile-app-flat.html` and `web-dashboard-flat.html`. v1 class names still work.
- **Breaking:** the default accent changes from lime to volt, and the default font from Inter to Urbanist. Set `data-style="flat" data-accent="lime"` to keep the v1 look.

## 1.0.0 — Flat fintech
Initial skill, built from the Dribbble shot inventory: tokens, components, templates and docs for the 2023–24 flat style.
