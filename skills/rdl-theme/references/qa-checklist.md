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
- [ ] Axis/tick labels are secondary, at 11px. Legends have two entries at most.
- [ ] Every status has a dot plus a word (not color alone). Money deltas show a sign or arrow.

## Layout and spacing (`layout.md`)
- [ ] Every gap, padding and margin is on the ladder (2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80).
- [ ] Gaps follow relationships: label→value 4 < group 8 < in-card 12–16 < card padding 20 < section 32. No two neighbouring gaps are equal by accident.
- [ ] Margins 20 (mobile) / 32 (web). Header row items all 48. Header → title 24.
- [ ] One control height per row (ladder 24 · 32 · 40 · 48 · 56 · 64).
- [ ] Cards are corner-anchored: label TL, action TR, figure BL, context BR.
- [ ] Nested corners are concentric: inner = outer − gap (padding + border). Deeper levels halve the gap; no clamped radii; ≤ 3 levels. One radius family per product.
- [ ] Bottom actions pinned: action row, slide-to-confirm or dock, 34 from the bottom. Content stays 12+ clear of it (≥ 120 bottom zone).
- [ ] Web: 12-column bento, equal row heights, cells span 3/4/6/8/12; every cell uses the card radius.
- [ ] Budgets (`guidelines.md`): ≤ 5 type sizes per screen, ≤ 3 per card, accent ≤ 3 uses, ≤ 2 auras.

## Automated audit
Run `node scripts/audit_ui.mjs <page.html> [--w 1440 --h 960]` on any HTML build. It checks the
type scale, spacing ladder, radius scale, control heights, mixed row heights, pinned-zone
clearance, accent budget, hit targets and **measured** text contrast on the rendered pixels. Mark
the product UI root with `data-audit-scope` and presentation chrome with `data-audit-ignore`.
Ship at 0 errors.

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
