# Corner radius

Everything about corners in RDL: the scale, concentric nesting, the two deep-nesting methods, and
how to apply and check them in code. A live, interactive version is in
`assets/templates/radius-demo.html` (open it in a browser; no build needed).

## 1. The scale

| Token | px | Used by |
|---|---|---|
| `xs` | 6 | Tooltips, tiny badges inside dense tables |
| `sm` | 8 | Deepest nested panes, ops-console cards |
| `md` | 12 | Small cards, dense inputs, panes in a card with 16 padding |
| `tile` | 14 | Industrial tool tiles, month-grid cells |
| `base` | 16 | Panes in a hosting card (28 − 12), second nesting level |
| `lg` | 20 | Web cards, blueprint cards, panes inside widgets (40 − 20) |
| `panel` | 24 | Dense web cards, panes in a large pane (32 − 8 / 40 − 16) |
| `xl` = **card** | 28 | Mobile glass cards, cards inside sheets (48 − 20) |
| `2xl` | 32 | Large panes, hero cards |
| `3xl` = **widget** | 40 | Aura widgets, product squircles |
| `sheet` | 48 | Bottom-sheet top corners |
| `pill` / 50% | — | Buttons, chips, segmented, dock, slide, orbs, beads |

- **One family per product:** rounded glass (8–48) or Swiss (0–4). Never both on one screen.
- **iOS:** use continuous (squircle) corners: `RoundedRectangle(cornerRadius:style: .continuous)`.
- **Web bento:** every cell uses the card radius (28), so the grid reads as one system.

## 2. The rule: concentric corners

When a rounded surface sits inside another, both corner curves must share one centre. If they
don't, the gap swells at the 45° point (inner radius too big) or pinches (inner radius too small).

```
outer radius = inner radius + gap          gap = padding + border (+ any wrapper offset)
inner radius = outer radius − gap          floors at 0
```

Example from the source article: an inner card of 16 with 8 padding needs an outer radius of
24. Measure the gap from the container's outer edge (border box) to the nested surface's edge.

### Nesting table (RDL values)

| Container | Gap | Nested radius |
|---|---|---|
| Sheet 48 | 20 | **28** (a card) |
| Widget 40 | 20 | **20** (`lg`) |
| Widget 40 | 16 | **24** (`panel`) |
| Widget 40 | 12 (host) | **28** (a card) |
| Large pane 32 | 8 | **24** (`panel`) |
| Card 28 | 20 | **8** (`sm`) |
| Card 28 | 16 | **12** (`md`) |
| Card 28 | 12 (host) | **16** (`base`) |
| Glass card 28 (1px rim) | 12 + 1 | **15** (derived, allowed off-scale) |
| Pill track 48 | 4 | item 40 → radius 20 = its own pill ✓ |
| Dock / slide 64 | 6 | item 52 → radius 26 ✓ |
| Prompt field 64 | 8 | send orb 48 → radius 24 ✓ |

## 3. Going deeper: two methods

A fixed gap subtracted at every level runs out of radius. With 24 and gap 8:
**24 → 16 → 8 → 0**, so the fourth container has sharp corners. Two fixes give the same radii and
differ only in the padding:

| | **A · Strict** (RDL default) | **B · Soft** (the article's method) |
|---|---|---|
| How | Halve the **padding** at each deeper level (8 → 4 → 4); radius = outer − gap | Keep the padding; from the 2nd level, radius = outer − **gap/2** |
| Radii (24, gap 8) | 24 → 16 → 12 → 8 | 24 → 16 → 12 → 8 |
| Bands between layers | Get thinner | Stay equal |
| Concentric? | Yes, at every level | Slightly not: inner curves read a touch rounder ("soft") |
| Use for | Product UI: cards in sheets, panes in widgets, fields in cards | Decorative stacks with even bands: frames, stacked cards, onboarding art, illustrations |

```
A · strict   24 ─pad 8→ 16 ─pad 4→ 12 ─pad 4→ 8
B · soft     24 ─pad 8→ 16 ─pad 8 (r −4)→ 12 ─pad 8 (r −4)→ 8
RDL chains   48 ─20→ 28 ─12→ 16 ─8→ 8            sheet → card → pane → chip
             40 ─12→ 28 ─8→ 20 ─4→ 16            widget hosting cards
```

Pick one method per component and never mix them inside one stack.

## 4. Procedure

1. Start from the outermost radius the screen already uses (sheet 48, widget 40, card 28).
2. For each nested surface that **hugs** a corner (equal inset on both axes, closer than the
   outer radius), compute `outer − gap`, counting the border.
3. If the result is **≥ 8**, use it. Snap it to the scale when the gap allows; otherwise keep the
   exact value.
4. If it's **< 8**, choose one:
   - reduce the gap, which is method A (host padding 12, then 8 → 4);
   - switch the stack to method B;
   - raise the outer radius.

   Never clamp the inner radius up to a fixed minimum: that breaks concentricity and is exactly
   what looks wrong.
5. If padding ≥ radius and none of the above is possible, the inner corner is square (0), as in
   the Swiss variant.
6. Stop at three levels. Deeper hierarchies should be flattened.
7. Elements that float inside a card (not hugging a corner) just use a scale radius.

## 5. Worked examples (gold app)

| Screen | Stack | Radii |
|---|---|---|
| SIP bottom sheet | sheet → dusk aura card (host, pad 12) → glass pane (pad 8) → value chip | 48 → 28 → 16 → 8 |
| Home price card | glass card 28 (pad 20) → nothing nested, only pills | 28 (pills exempt) |
| SIP summary widget | widget 40 (pad 20) → tinted panes | 40 → 20 |
| Buy confirmation | dark glass card 28 (pad 20) → leader rows (no surfaces) | 28 |
| Lease tenure card | widget 40 host (pad 12) → card 28 (pad 16) → month cell | 40 → 28 → 12 |

With the default 20 padding, the SIP sheet's pane would get 28 − 20 = 8 and the chip would hit 0.
Halving the host padding to 12 keeps real curves at every level.

## 6. In code

**Web (rdl-components.css).** Every surface hands its direct children the exact radius:
`--rdl-nest-r` for method A (outer − gap, glass rim counted) and `--rdl-nest-r-soft` for method B
(outer − gap/2).

```html
<!-- A · strict: a host card (pad 12) with a concentric pane (28 − 12 = 16) -->
<article class="rdl-card rdl-card--host">
  <div class="rdl-glass--tint rdl-nest">…</div>
</article>

<!-- B · soft: keep the card's 20 padding, pane gets 28 − 20/2 = 18 -->
<article class="rdl-card">
  <div class="rdl-card rdl-nest--soft">…</div>
</article>
```
- Containers: `.rdl-card`, `.rdl-glass`, `.rdl-widget`, `.rdl-sheet`, `.rdl-blueprint`. Add
  `--host` (padding 12) to a container that holds panes.
- `.rdl-glass--tint` is concentric automatically.
- **Tailwind:** load `rdl-components.css` and use `rounded-[var(--rdl-nest-r)]` or
  `rounded-[var(--rdl-nest-r-soft)]`.

**SwiftUI (RDLLayout.swift).**
```swift
RDLRadius.nested(outer: RDLRadius.sheet, padding: RDLSpace.cardPadding)            // 28
RDLRadius.nested(outer: RDLRadius.card, padding: RDLRadius.hostPadding, border: 1) // 15
RDLRadius.nested(outer: RDLRadius.card, padding: 20, method: .soft)                // 18
RDLRadius.chain(outer: 24, gap: 8, levels: 4)                                      // [24, 16, 12, 8]

// Automatic: children use ContainerRelativeShape and get concentric corners
VStack { … .background(.white, in: ContainerRelativeShape()) }
    .padding(RDLRadius.hostPadding)
    .rdlConcentricContainer(radius: RDLRadius.widget)
```

## 7. Checking

- **Audit:** `node scripts/audit_ui.mjs page.html`. For every nested surface that hugs a corner,
  it finds the nearest enclosing surface and measures the real gap (padding, border and wrapper
  offsets). It warns when the radius is neither outer − gap (A) nor outer − gap/2 (B). When the gap
  eats the radius, it suggests halving it. Exact derived values (like 15) are accepted off-scale.
- **By eye:** imagine the centre of each corner arc. If all the centres in a stack land on one
  point, the corners are concentric. The demo draws these dots for you.
- **QA:** see `qa-checklist.md`, under Layout and spacing.

## Sources

- [Getting Your Border Radius Right](https://medium.com/design-bootcamp/getting-your-border-radius-right-a-simple-trick-for-smooth-nested-containers-f6e0025e8c53), Design Bootcamp: outer = inner + padding; at deeper levels subtract half the padding (method B).
- [CSS-Tricks: Careful with your nested border-radii](https://css-tricks.com/public-service-announcement-careful-with-your-nested-border-radii/).
- [30 seconds of code: Perfect nested border radius](https://www.30secondsofcode.org/css/s/nested-border-radius/): borders count as gap, and padding ≥ radius → 0.
