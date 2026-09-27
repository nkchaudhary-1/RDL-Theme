# Screen patterns

Start every screen from one of these archetypes. Each lists structure, the focal element, where
the accent goes, and the states it actually needs. Working examples: `assets/templates/mobile-app.html`
(M1, M2, M3) and `assets/templates/web-dashboard.html` (W1).

## Mobile

### M1 · Home / Wallet
```
┌──────────────────────────────┐
│ (AM) Good morning        (🔔)│  greeting header: avatar, caption + title, icon button
│ ┌──────────────────────────┐ │
│ │ Total balance     [USD▾] │ │  HERO (ink): label, amount display w/ muted decimals,
│ │ $48,209.36               │ │  delta pill + context, two pill buttons
│ │ [↑12.4%] +$5,318 month   │ │
│ │ [+ Top up ]  [↗ Transfer]│ │  accent button + raised-ink button
│ └──────────────────────────┘ │
│  (↗)   (↙)   (⇄)   (▦)       │  quick actions, 56 circles, white on canvas
│ Send Request Exchange More   │
│ ┌──────────────────────────┐ │
│ │ Spending      This week  │ │  surface card: amount h2, bar chart (hatched history,
│ │ $2,184.50                │ │  accent current day + tooltip)
│ │ ▯▯▯█▯▯▯                  │ │
│ └──────────────────────────┘ │
│ ┌ Transactions ── See all ─┐ │  list rows grouped by date
│ ╰──────────────────────────╯ │
│   ( ● ⌂ )  ◌   ◌   ◌         │  floating ink tab bar, accent active
└──────────────────────────────┘
```
Accent: hero action, active bar, active tab. States: first-run empty (hero shows $0.00 + "Add
money" accent CTA; spending card shows hatched placeholder bars with caption), loading (skeleton
hero keeps ink fill).

### M2 · Asset / Portfolio detail
Circular back + centred title + circular more → label + Amount (display-xl) + delta + period
caption → full-bleed line chart with scrub tooltip → segmented 1D·1W·1M·1Y·All → 2×2 stat wells →
paired buttons: secondary "Sell" + primary "Buy more" (pinned above home indicator).
Accent: chart area + dot only; CTA stays ink so the chart owns the accent.
States: market closed (caption chip "Market closed · updates 9:00"), price stale (warning-soft
banner), no holdings (replace stats with an explainer card + primary CTA).

### M3 · Score / Goal
Large title (h1) + more → surface card with gauge + number + band label + delta → factors card
(rows with progress) → accent nudge card at the end of the scroll.
Accent: gauge value, progress fills, nudge card.

### M4 · Amount entry → Review → Success (buy, send, invest)
1. **Entry** — title ("Buy gold"), balance caption, Amount (display-xl) centred with unit
   toggle chip (₹ ↔ grams), conversion caption ("≈ 0.412 g at ₹7,284/g"), quick-amount chips,
   custom numeric keypad (3×4, 56 circles, no fills — digits only), primary 56 button
   disabled until valid.
2. **Review** — bottom sheet (radius 3xl, shadow lg): summary rows (label left, value right),
   fees in secondary, total in title weight, price-lock countdown chip, primary "Confirm".
3. **Success** — centred accent circle with check (64), h2 headline, caption with amount and
   reference, secondary "View receipt" + primary "Done".
Error: inline danger-text caption under the amount ("Exceeds available balance"); network
failure = sheet stays open with danger-soft banner + retry.

### M5 · Activity / list
Large title + search pill + filter chips (horizontal scroll) → cards per date group, each with
list rows → sticky segmented at top if there are 2–3 views.
Empty: one card with 3D/illustrative glyph, one sentence, one secondary button. Filtered-empty:
caption + "Clear filters" ghost button.

### M6 · Onboarding / paywall
Full-screen canvas → large visual (3D object or composed card stack) in the top 55% → h1 headline
(2 lines max) → body caption → page dots (active = ink capsule 20 wide) → primary 56 button +
ghost secondary. Paywall: plan cards as selectable surface cards, selected = ink border 2px +
accent check.

### M7 · Profile / settings
Header card: avatar lg + name (h2) + caption + chip (tier). Grouped settings rows in surface
cards (icon circle lead + title + chevron). Destructive action as ghost button in danger-text at
the bottom.

## Web

### W1 · Overview (bento dashboard)
```
┌────────┬──────────────────────────────────────────────────────┐
│ Logo   │ Monday, 27 Sep                      (⌕ Search)(🔔)[+ New]│
│ ●Overv │ Good morning, Alex                                      │
│  Analy │ ┌────────── HERO KPI (span 2) ──┐┌ ACCENT KPI ┐┌ KPI ─┐ │
│  Paymen│ │ $284,902.40  ↑14%   ▮▮▮█      ││ $92,410    ││$18,260│ │
│  Custo │ └───────────────────────────────┘└────────────┘└──────┘ │
│  Invoi │ ┌────────── Chart (span 3) ────────────────────┐┌Gauge─┐ │
│        │ │ ▮▮▮▮▮▮▮▮█▨▨▨   legend  [Week|Month|Year]     ││ 76%  │ │
│ ┌────┐ │ └──────────────────────────────────────────────┘└──────┘ │
│ │Pro │ │ ┌────────── Table (span 3) ────────────────────┐┌List──┐ │
│ └────┘ │ └──────────────────────────────────────────────┘└──────┘ │
└────────┴──────────────────────────────────────────────────────┘
```
Floating white sidebar (radius 2xl) with pill nav items (active = ink); hero upsell card at the
bottom. Row heights align. Accent: logo, one KPI card, current bar, gauge, count badge.

### W2 · Map operations (logistics, property, city tasks)
Map full-bleed inside the content area (radius 2xl). Left: floating list panel (surface, 360
wide) with search + filter chips + entity rows (status chip, ETA). Right/bottom: selected-entity
card with timeline (dots connected by a 2px line; completed = ink, current = accent, future =
hatch). Map pins = ink circles; selected pin = accent with white ring; routes = ink 3px, active
route accent.

### W3 · Table / CRM
Page header with h1 + count chip + filter chips + primary button. One surface card holding the
table: 12 caption headers (tertiary), 56 rows, 1px separators, status as soft pills, amounts
right-aligned tabular. Row hover = `bg-surface-muted`. Selection opens a right drawer
(radius 3xl on the leading edge, shadow lg) with detail cards stacked.

### W4 · Detail / record (EHR, invoice, customer)
Two-column: left 2/3 stacked cards (summary hero, timeline, documents), right 1/3 sticky meta
card (owner, status, actions). Tabs as segmented pill under the header.

## Responsive rules
- Mobile → tablet: keep single column up to 600; two columns of cards from 600; the tab bar
  becomes a floating rail on iPad landscape.
- Web ≥ 1280: 4-col bento. 1024–1279: 2-col, hero spans 2. < 1024: sidebar collapses to icons
  (72 wide, pill items become circles). < 768: sidebar hides behind a menu icon button.
