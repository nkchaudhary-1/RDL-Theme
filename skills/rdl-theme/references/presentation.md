# Dribbble-shot presentation

How RDL presents work. Use when the goal is a portfolio shot, a case-study image or a pitch
visual — not for the product itself. Reference: `assets/templates/mobile-app.html`.

## Canvas
- **1600×1200** (4:3), exported @2x. Animated shots: same size, 8–12s loop, MP4.
- Background: flat `gray-150` (#EBEBEF) for light work, #050506 for dark, or `accent-soft` for a
  branded variant. No gradients, no textures, no device shadows beyond `shadow-lg`.

## Mobile composition
- **Three phones** (390×844 screens, 52 radius, 10px ink bezel), 56 apart, centred.
  Middle phone raised 48, outer phones lowered 48 — the stagger is the signature.
- Alternatives: two phones overlapping 20% with the front one raised; one phone + three floating
  component cards (bento) around it at 1.2× scale.
- Choose screens that tell a flow: Home → Detail → Outcome (score, success, goal).
- Status bar at 9:41, dynamic island drawn, no real carrier names.

## Web composition
- Dashboard at 1440×960 shown flat, edge-to-edge, or at 80% with 64 margins on the canvas color.
- Optional: one phone overlapping the dashboard's lower-right corner to show responsive parity.

## Typography on the canvas
- Product wordmark top-left (accent logo tile 36 + name 20/600), category label top-right
  (15, secondary). Optional headline for case-study covers: h1–display, max two lines, left-aligned.
- Never repeat UI text as marketing copy on the canvas.

## Content realism
- Believable data: non-round amounts ($48,209.36), realistic names, dates close to "today".
- Consistent person and numbers across all phones in a shot (same balance, same user).
- No lorem ipsum, no placeholder avatars with photos of real public figures.

## Animation checklist (for animated shots)
1. Screens slide in from 40px below with 60ms stagger (emphasized easing).
2. Bars grow from baseline (600ms, 40ms stagger), numbers roll up.
3. One interaction per loop: tap a segmented option, the chart morphs; or scrub the line chart.
4. Tab indicator glides; hold final frame 1.5s before looping.

## Export
- Render the HTML template with `scripts/render-previews.mjs` (Playwright) or screenshot at
  deviceScaleFactor 2 for crisp @2x output.
