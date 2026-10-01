# Guidelines

The rulebook for making RDL screens calm, minimal and consistent. `layout.md` covers *where* things
go and `anatomy.md` covers *what* each part is. This file covers *how much* and *when*. Every rule
here was observed across the 220-frame board. Where the board breaks a rule, the exception is
named.

## 1. Principles

1. **One focus.** Each screen has exactly one focal element, usually a light numeral or a 3D
   object, and it's the largest thing on screen. Everything else is quieter.
2. **Quiet structure.** Hierarchy comes from size, weight and tone, not from borders, fills or
   color. Gaps divide, lines don't.
3. **Material honesty.** Glass needs something behind it. Color lives in auras and the accent,
   not in UI chrome.
4. **Instruments, not charts.** Data reads like a precision tool: ticks, hairlines, beads and
   one lit value.
5. **Systems over screens.** Every screen is assembled from the same primitives at the same
   sizes. A new need becomes a new component, never a one-off style.

## 2. Hierarchy recipe

Per **screen**:
- 1 focal figure or object. At most 5 type sizes, and the 4–5 roles from §3 cover almost
  everything.
- 1 primary action (pinned). At most 2 secondary actions visible.

Per **card**:
- 1 idea, at most 3 type sizes, 1 figure, at most 1 instrument, at most 1 action.

Use these levers, in this order: **size → weight → tone (opacity) → color.** Reach for color
last, and only for the accent or status.

## 3. Type rules

- Use weights **300 / 400 / 500 / 600** only. Use 700 only in the Sport variant and for credit-score
  numerals.
- **Figures are 300.** Titles are 300–400. UI labels are 500. One emphasised word in a headline is
  600.
- **Two-tone headlines** keep the same size and split by weight ("Good morning, **Aarav**") or by tone
  ("Kyoto, *Japan*" at 60%; "Task #241639" at 40%). Never split by size.
- **Title tabs:** "Data / Records" at the same size, with inactive tabs in tertiary gray.
- Use sentence case everywhere. Uppercase is only for micro eyebrows (11/500, +4–8% tracking)
  and dashboard card titles in ops consoles.
- Body text runs at most 60 characters per line. Over photos, increase line height to 1.6–1.9.
- Never use more than two type families: Urbanist plus Doto (one dot-matrix figure per screen).

### Common pairings (copy these)
| Pair | Spec |
|---|---|
| Card label → figure | caption 12 gray → numeral 40/300 (gap 4) |
| Screen title | h1 34/300 or 400, two lines max |
| Hero | caption → display 56/300 → status line 13 |
| Amount entry | caption centred → display-xl 72/300 → conversion line 14 |
| KPI tile (web) | tag or meta label → h1 34/300 → caption 12 |
| List row | title 15/500 + meta 13 gray · value 15/500 right |

## 4. Color budget (per screen)

| Element | Budget |
|---|---|
| Neutrals (stone) | Unlimited: canvas, surfaces, text tiers, hairlines |
| Accent | **1–3 uses**: active orb or dock item, needle or selected datum, one tag, or check marks |
| Auras | ≤ 2 (one hero + one widget, or a backdrop) |
| Iridescent rim | ≤ 1 |
| Dot-matrix figure | ≤ 1 |
| Status colors | Only on dots, status pills and meter fills. Never on body text or icons |
| Red | Only for errors and destructive actions. Destructive = red-tinted tile or text, never a red solid button |

**Text tiers:** primary (ink 100%), secondary (~60%), tertiary (~40%). There are no other grays
for text. On auras and photos, use ink or white plus their 60% variants, never mid-gray.

**Dark layering:** canvas → surface → raised → control, each about 4–6% lighter
(`#0A0B0C → #131416 → #1C1D20 → #26272B`).

## 5. Consistency across an app

Lock these before designing screen two:

| Decision | Choose once |
|---|---|
| Style | Glass (rounded) **or** Swiss (square) **or** flat (v1) |
| Accent pack | One. Ink is the default primary; the accent is a highlight |
| Header pattern | Which header variant each screen role uses (home, detail, flow step) |
| Pinned zone per role | Home = dock or action row · Flow step = action row · Confirmation = slide · Detail = action row |
| Figure treatment | Currency position, decimals muted or not, unit style |
| Card radius family | e.g. 28 cards / 40 widgets / 48 sheets |
| Icon set | One line family at 1.75 stroke |

**Screen-to-screen continuity:** the same entity keeps the same figure size and color across
screens (the portfolio value is display 56 everywhere it's the hero). A tap target that opens a
detail shows the same figure on the detail (shared element).

**Pattern reuse:** structurally similar flows share one template. For example, SIP and Lease
both use *summary aura card → month grid → meters → next-event KV → action row*. Only labels and
the accent use change.

## 6. Minimalism rules

1. **Remove before adding.** If a label repeats what the figure says, delete it.
2. Don't use borders where a gap works, or shadows on cards that sit on canvas (glass gets its
   token shadow only).
3. Don't use decorative icons. An icon either is a button (inside an orb) or identifies a row
   (in a 40 lead circle).
4. Use one instrument per card, with at most two series and a two-entry legend.
5. Labels are short: 1–3 words ("Paid amount", "Next SIP", "Vault"). Put explanations in a
   caption, not the label.
6. Don't use more than one alert on a screen; collapse the rest into "3 issues".
7. Empty space is a feature. When a screen feels empty, enlarge the figure. Don't add a card.

## 7. Numbers and content

- **Currency:** the symbol is small and raised (38%), the integer is light, and decimals are 38%
  gray. INR uses Indian grouping (`₹4,82,190.36`).
- **Deltas** always carry a sign or arrow (`+1.8%`, `▲ 0.125%`), shown as a tag (money) or
  status text (state).
- **Units** follow the number at 38% gray: `84.2 kW`, `11 /14 d`, `32 LVL`.
- **Ranges** use an em dash with spaces: `12 PM — 6 PM`, `54 kW — 120 kW`.
- **Dates and times:** `Oct 05`, `9:41`, `Updated 2 min ago`.
- **Realism:** use non-round numbers and a consistent person, date and dataset across screens.

## 8. Iconography

Use line icons (Lucide or SF Symbols regular) at 1.75 stroke with round caps and joins. Size
them 20 in 48 orbs, 24 in 56 orbs and 16 inline. ↗ in a circle means "open detail" everywhere.
× closes. ‹ goes back. ••• opens more. Don't mix in filled icons, except the status dot and
pixel icons in dot-matrix contexts.

## 9. Motion

Use 120 / 200 / 320 ms, standard easing, and a spring of 0.35 / 0.82. Content rises 12 and
fades, numbers roll, the needle glides, the dock highlight morphs, and glass de-blurs on
arrival. Stagger lists by 40ms. With Reduce Motion, fades only.

## 10. Accessibility

- Contrast ≥ 4.5:1 for text, measured on the real backdrop (glass over photos can fail; use
  `glass-fill-strong` or a scrim).
- Hit targets ≥ 44. RDL controls are ≥ 48 except tags.
- Status is never color-only (dot + word). Charts expose values to VoiceOver.
- With Reduce Transparency, glass becomes solid surfaces.

## 11. Do / don't

| Do | Don't |
|---|---|
| One light, huge figure | Several bold numbers competing |
| Corner-anchored card content | Centred everything in every card |
| One control height per row | 34px chip next to a 48 orb |
| Gaps of 4 < 8 < 12 < 20 < 32 by relationship | Arbitrary 10 / 14 / 18 gaps |
| Accent on one thing | Accent on every icon |
| Status dot + word | Red text alone |
| Radius from one family | 28 cards next to 6 buttons |
| Nested radius = outer − gap (padding + border); halve the gap to go deeper | Inner pane with the same radius as its container, or a clamped radius that breaks concentricity |
| Glass over a backdrop | Glass on plain gray |
| Instruments (ticks, hairlines) | Rainbow pies, chunky 3D bars |
