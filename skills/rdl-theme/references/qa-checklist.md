# QA checklist

Run before presenting any RDL screen. Fix, don't annotate.

## Identity
- [ ] Screen has one clear focal number, and it is the largest text on screen (≥ 40pt mobile hero).
- [ ] Exactly one hero (ink) card — or none, if the focal element is a chart/gauge.
- [ ] One accent pack; accent used 1–3 times (CTA/hero action, active tab, highlighted datum, one card).
- [ ] Canvas gray, cards white, no card borders, no shadows on cards resting on the canvas.
- [ ] Controls invert against their container (no gray-on-gray, no white-on-white).
- [ ] Radii from the scale: cards 24/20, hero 28, wells 14, everything interactive is a pill or circle.
- [ ] At least three signature moves present (see SKILL.md).

## Typography
- [ ] Only Inter/SF Pro; weights 400/500/600 only.
- [ ] Numbers tabular, weight 500, tight tracking; decimals muted and smaller.
- [ ] Sentence case; no uppercase overlines; nothing below 11pt.

## Data viz
- [ ] Monochrome + one accent; history muted, projection hatched, current accent + ink tooltip.
- [ ] Axis labels tertiary; no chart legends with more than two entries.
- [ ] Deltas use arrow + soft pill + `-text` color (not color alone).

## Layout
- [ ] 4pt grid; 20 gutters / 20 card padding / 12 card gap / 28 section gap (mobile).
- [ ] Web: bento rows align; 16 gaps; 24 padding.
- [ ] Content clears the floating tab bar (≥ 120 bottom padding on scroll views).

## Tokens & code
- [ ] No raw hex, px radius or spacing in components — tokens only.
- [ ] Works in dark mode (`data-theme="dark"` / system) and with a second accent pack.
- [ ] Generated files untouched; any token change made in `tokens.json` + rebuilt.

## Accessibility
- [ ] Text contrast ≥ 4.5:1 (tertiary gray only on redundant info).
- [ ] Hit targets ≥ 44pt; icon-only buttons have labels.
- [ ] Focus ring visible (web); Dynamic Type doesn't clip the hero amount (use `minimumScaleFactor(0.6)`).
- [ ] Reduce Motion removes growth/stagger animations.

## States
- [ ] Loading, empty and error states exist where the screen has async data, and reuse the same card shapes.
