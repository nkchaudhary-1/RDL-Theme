# Changelog

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
