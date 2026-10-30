# Standards reference (pulled 2026-10-30)

Values pulled from primary sources and used to structure RDL v4. RDL keeps its own look; these set
the *structure*: role names, scales, states and minimums.

## Apple Human Interface Guidelines (developer.apple.com/design/human-interface-guidelines)
- **Foreground hierarchy:** label, secondaryLabel, tertiaryLabel, quaternaryLabel; separator
  (translucent) vs opaqueSeparator; link; placeholderText.
- **Backgrounds:** systemBackground / secondary / tertiary (primary for the overall view, secondary
  for groups inside it, tertiary for groups inside those); separate *grouped* set for grouped lists.
- **Dark mode:** two background sets, *base* (dimmer, recedes) and *elevated* (brighter, used for
  foreground layers like sheets and popovers), to show depth.
- **Contrast:** minimum 4.5:1 (text ≤ 17pt), 3:1 (≥ 18pt or bold). For custom colors, strive for
  **7:1**, especially small text. Test with Increase Contrast and Reduce Transparency.
- **Targets:** 44×44pt minimum (28×28 absolute minimum); about 12pt padding around bezeled
  elements, 24pt around borderless ones.
- **Text:** iOS default 17pt, minimum 11pt.
- **Dynamic Type at Large (default):** Large Title 34/41 · Title 1 28/34 · Title 2 22/28 ·
  Title 3 20/25 · Headline 17/22 semibold · Body 17/22 · Callout 16/21 · Subhead 15/20 · Footnote
  13/18 · Caption 1 12/16 · Caption 2 11/13.
- **Materials:** ultraThin, thin, regular (default), thick. Thicker means more opaque and better
  contrast; thinner means more context. Use vibrant label/fill/separator colors on materials;
  avoid quaternary labels on thin/ultraThin. Liquid Glass comes in regular (most components) and
  clear (only over visually rich backgrounds). Color on glass is reserved for primary actions and
  status, and goes on the background, not the label.
- Never rely on color alone. Don't redefine the meaning of semantic colors.

## Material Design 3 (@material/web 2.5.0 tokens, md-sys-*)
- **State layers (opacity of on-color over container):** hover 0.08 · focus 0.12 · pressed 0.12 ·
  dragged 0.16. Disabled: content 0.38, container 0.12 (M3 component spec).
- **Elevation levels (dp):** 0, 1, 3, 6, 8, 12. Dark themes express elevation mostly through
  lighter surface tones (surface-container-lowest → highest).
- **Shape:** none 0 · extra-small 4 · small 8 · medium 12 · large 16 · extra-large 28 · full 9999.
- **Motion durations:** short 50/100/150/200 · medium 250/300/350/400 · long 450–600 ·
  extra-long 700–1000 ms.
- **Easing:** standard (0.2,0,0,1) · standard-decelerate (0,0,0,1) · standard-accelerate
  (0.3,0,1,1) · emphasized-decelerate (0.05,0.7,0.1,1) · emphasized-accelerate (0.3,0,0.8,0.15).
- **Type roles:** display L/M/S 57/45/36 · headline 32/28/24 · title 22/16/14 · body 16/14/12 ·
  label 14/12/11.
- **Color roles:** primary / on-primary / primary-container / on-primary-container (the same set
  for secondary, tertiary, error); surface, surface-dim/bright, surface-container
  lowest/low/default/high/highest, on-surface, on-surface-variant, outline, outline-variant,
  inverse-surface, scrim.
- **Window size classes:** compact < 600 · medium 600–839 · expanded 840–1199 · large 1200–1599 ·
  extra-large ≥ 1600.

## Radix Colors (radix-ui/colors src/light.ts, dark.ts)
12-step scales, defined separately for light and dark (dark is not an inversion):

| Step | Use |
|---|---|
| 1–2 | App background, subtle background |
| 3–5 | Component backgrounds: rest, hover, pressed/selected |
| 6–8 | Borders: subtle, default, strong / focus |
| 9–10 | Solid backgrounds (step 9 is the purest hue), hover |
| 11–12 | Low-contrast text, high-contrast text |

Reference: slate light #fcfcfd → #1c2024; slate dark #111113 → #edeef0 (steps 11/12: #b0b4ba,
#edeef0).

## Naming (Primer / Carbon conventions)
Use `category-role-variant-state` (for example `bg-accent-solid-hover`, `fg-muted`,
`border-default`). Semantic tokens reference primitives, components reference semantic tokens,
and components never use primitives directly.
