# Screen patterns

Start every screen from an archetype. Glass archetypes (G/W5+) are the V2 default; M/W1–4 are the
flat (v1) archetypes and still valid with `data-style="flat"`. Working examples:
`assets/templates/mobile-app.html` (G1, G4, G6) and `web-dashboard.html` (W5) for glass;
`mobile-app-flat.html` (M1–M3) and `web-dashboard-flat.html` (W1) for flat.

## Glass · mobile

### G1 · Home over aura
```
┌──────────────────────────────┐
│ (◯)   [ 24K · 99.9% pure ]  (◯)│  orb · glass chip · orb
│ Good morning, **Aarav**       │  mixed-weight h2
│ Portfolio value               │  caption
│ ₹4,82,190.36                  │  display 52–56 / 300, small ₹ and .36
│ ● Live  +₹12,408 · 30 days    │  status dot + caption
│ ┌ glass ───────────────────┐ │
│ │ Gold · per gram   [+1.8%]│ │  label + tag
│ │ ₹7,284.20                │ │  numeral
│ │ ┈┈┈╱‾‾╲__╱┈┈┈  ● beads    │ │  window curve
│ └──────────────────────────┘ │
│ ┌ ink widget ┐ ┌ glass ────┐ │  dot-matrix holdings · next SIP
│ │ 66.2 g ⠿   │ │ Oct 05  ↗ │ │
│ └────────────┘ └───────────┘ │
│ ┌ glass list: last activity ┐│
│ (⇄)  [   Buy gold   ]  (↓)   │  action row pinned 36pt above home indicator
└──────────────────────────────┘
```
Backdrop: `aura--gold` (or photo/3D). Accent: live dot, cursor ring, dot figure. States: market
closed → status `idle` "Market closed · opens 10:00"; stale price → `warn` dot + "Updated 12 min
ago"; first run → figure "₹0" + glass card "Start with ₹10" + action row primary "Buy gold".

### G2 · Detail over 3D / photo
Full-bleed render or photo (asset, machine, place). Top: back orb, title (light, 2 lines),
more/share orb. Floating glass chips as callouts on the render (`Solar Panel`, `Powerwall 4.7 kW
· 97%`) with 1px leader lines. Bottom glass sheet (radius 32) with figure + key/values + action
row. Used for: vault, property, machine, vehicle, product.

### G3 · Instrument screen (single metric)
Huge light figure (display-xl) with unit; tick dial or beaded arc; 2–3 stat triplet
("Recovery 98% max · HRV 85.4 ms · Tension 14% low"); a glass pill verdict; circle–pill–circle
controls (`−1 min | +1 min`, `↺10 ▶ ↻10`). Dark by default.

### G4 · Amount entry → confirm (buy, sell, convert, pay)
Dark screen with warm aura glow. Glass segmented (currency | unit), display-xl figure, conversion
line with accent quantity, lock chip with countdown, tick ruler for coarse amount, leader
key/values (value, tax, fees), **slide to confirm** pinned at the bottom. Success: figure animates
to a check orb; receipt as glass card; action row "Share · Done · View".
Errors: insufficient balance → caption in `danger-text` under the figure + ruler needle turns
red; price lock expired → chip turns `warn` "Price updated · ₹7,291.40" and slide resets.

### G5 · Map operations (mobile)
Map full-bleed (light site-plan or dark satellite). Glass search pill, orb stack for zoom/layers,
colored route line with accent position dot, selection = dashed polygon/circle. Bottom glass
sheet: entity ID as light numeral, status dot, key/value grid, action row.

### G6 · History / timeline
Title (h1) + status dot. Aura card (dusk/gold) with paid amount, term, two glass pills
("You've paid / Left to pay"). Month grid (paid / missed / current / upcoming). Meters for goals.
Next-debit key/value. Dock pinned. Maps to SIP, EMI, loan, subscription, medication schedule.

### G7 · Widgets board
Grid of squircles (radius 40): aura fills with white/ink content, one dot-matrix figure, tick
rulers, ring/sparkline minis, "+" add tile. Close-up presentation friendly.

### G8 · Questionnaire / onboarding
Photo or aura backdrop; caption "Select all that apply"; large light question; option cards
(selected = accent squircle with number `01` + label; others = dark glass with thin rim);
bottom: outline back orb + slide-to-next pill.

## Glass · web

### W5 · Bento over fog (overview)
Top: logo, text nav with black pill active, glass search pill, bell orb, avatar. Header: caption
("Updated 2 min ago"), 44–48/300 title; KPI row to the right (tag + figure + caption). Bento
(4 cols, 2 rows): wide glass chart card with window curve + segmented; aura widget with dot
figure + tick ruler; blueprint asset card; dark iridescent glass gauge card; strong-glass table
with status dots; aura widget with hairline bars.

### W6 · 3D scene console
Full-bleed 3D scene (port, factory, city, body) with selective accent highlighting; glass panels
docked left (entity list with status chips) and right (inspector with key/values, alerts);
glass pill nav top; bottom orb dock for tools; AI chat input with gradient underline.

### W7 · Node canvas
Black dot-grid canvas; dark glass node cards with bracketed corners, ports, glass inputs;
glowing bezier connectors in the accent; left library panel; top file tabs with white active.

## Flat (v1) · mobile

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

## Flat (v1) · web

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
