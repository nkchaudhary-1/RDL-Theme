# QA checklist

Run this before presenting any RDL screen. Fix problems rather than annotating them. Items
marked **G** apply to the glass style, **F** to the flat style, and the rest to both.

## Identity
- [ ] One focal number per screen, and it's the largest thing on screen (≥ 48pt on mobile heroes).
- [ ] **G** The number is weight 300 with its unit at ~38% in gray. The currency is small and raised. Nothing bold except one headline word.
- [ ] **F** The number is weight 500, decimals muted, with one ink hero card.
- [ ] One accent pack, spent 1–3 times (active orb/dock, needle/selected datum, one tag or the checks).
- [ ] **G** Glass has something behind it (photo, 3D, map, aura, fog). No glass floating on flat gray.
- [ ] **G** At most two auras and at most one iridescent rim per screen.
- [ ] Everything tappable is a circle, pill or tile (Swiss variant: sharp blocks). No mixed corner languages on one screen.
- [ ] At least three signature moves (see SKILL.md).

## Typography
- [ ] Urbanist (glass) or Inter (flat) only; dot-matrix used for at most one figure.
- [ ] Sentence case. Uppercase is only for rare eyebrows/addresses, never on buttons.
- [ ] Mixed-weight headlines use light + one 600 word, not two bold phrases.

## Data and instruments
- [ ] Instruments over charts: tick rulers, meters, hairline bars, window curves, month grids.
- [ ] Monochrome except the accent, plus status colors on status dots only.
- [ ] Axis/tick labels are tertiary, at 11px. Legends have two entries at most.
- [ ] Every status has a dot plus a word (not color alone). Money deltas show a sign or arrow.

## Layout
- [ ] 4pt grid, 20 gutters, 12–14 gaps between cards.
- [ ] Bottom actions pinned: circle–pill–circle, slide-to-confirm, or dock. Content clears them (≥ 120pt).
- [ ] Web: bento rows align; the header has a light 44–48 title with a KPI row on the right.

## Tokens and code
- [ ] No raw hex, radius or blur values in components. Use tokens or component classes.
- [ ] Works in light and dark, and with `data-style="flat"` (glass degrades to solid surfaces).
- [ ] Generated files are untouched; token changes go in `tokens.json`, then rebuild.

## Accessibility
- [ ] Text contrast ≥ 4.5:1 **measured on the actual backdrop** (glass over photo can fail). Add `glass-fill-strong` or a scrim where needed.
- [ ] Hit targets ≥ 44pt. Orbs and dock items have labels. Slide-to-confirm has an accessibility action.
- [ ] Dot-matrix and figure views expose the plain value to VoiceOver.
- [ ] Reduce Motion: no needle glide, blur-in or number roll (fades only). Reduce Transparency: glass becomes solid.

## States
- [ ] Loading (skeleton panes at the same size, a shimmer on glass), empty (one line + one action
  in the same card), error (a status dot turns `crit` + a caption with the fix), and stale data
  (`warn` dot + "Updated n min ago"), wherever the screen has async data.
