# Shot presentation

How RDL presents work in 2025–26. Use this for portfolio shots, case-study covers and pitch
visuals, not for the product UI itself. The reference is `assets/templates/mobile-app.html`.

## Canvas
- **1600×1200** (4:3), exported @2x. Close-ups use the same frame, cropped tight.
- Backgrounds seen on the board:
  - light neutral gray (`#D9D9DC` → `#EDEDEF` radial): the most common
  - a flat brand color block (mustard `#EBB93E`, orange `#E8845A`, electric blue)
  - a dark vignette with glow
  - a blurred environmental photo (greenhouse, port, sky)
- Add film grain (≈3–6%) to color blocks and dark scenes.

## Compositions (by frequency on the board)
1. **One phone held in a hand.** The hand is silhouetted black or naturally lit, the phone is
   slightly angled, and the screen fills 55–65% of the frame height. This is the most common.
2. **Close-up with depth of field.** One component (a widget, a number, a glass card) at
   20–30° perspective, the rest falling into blur. It shows craft: numerals, glass rims, ticks.
3. **Angled desktop/iPad.** A monitor on a stand or an iPad held in two hands, at 10–20°
   rotation, on gray.
4. **Three phones with perspective.** The centre phone faces forward and sits raised; the outer
   phones are rotated ±14° on Y and set back. This is the HTML template's layout, easy to
   produce without photography.
5. **Floating UI.** A glass card detached from the device, over a photo (the "Penetration Risk!"
   and "Breath Awareness" style).

## Building shots without photography
- Use the HTML template (`perspective: 2400px; rotateY(±14deg)`) for three-phone shots.
- Hands: use a licensed hand-holding-phone PSD/PNG mockup, place the rendered screen, and add
  a subtle screen-glare gradient (white 0→8%).
- Depth of field: render the screen at 2×, rotate it in 3D (CSS or Figma), and apply a progressive
  blur (0 at the focal component → 8–12px at the edges).
- Keep text on the canvas minimal: a product wordmark (aura dot + name) top-left and a
  category label top-right, or nothing at all. Many board frames carry no canvas text.

## Content realism
Use non-round numbers (`₹4,82,190.36`, `84.2 kW`, `0.00321 BNB`) and a consistent person, date
and dataset across screens in one shot. Dates should sit near "now" (9:41 or 11:30 status
bars). Don't use real people's likenesses unless licensed.

## Animated shots
8–12s loops. Screens rise 24px and fade in (emphasized easing, 60ms stagger). The needle glides
along the ruler, numbers roll, glass cards de-blur as they arrive, and the slide knob travels
and turns into a check. Hold the final frame 1.5s.

## Export
`node scripts/render-previews.mjs` renders every template to `docs/` with Playwright. For @2x,
set `deviceScaleFactor: 2`.
