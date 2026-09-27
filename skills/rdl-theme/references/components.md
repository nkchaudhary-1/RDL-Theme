# Components

Base components exist on web (`assets/templates/rdl-components.css`) and SwiftUI
(`assets/ios/RDLComponents.swift`) with matching names. Build domain components by composing
these — don't restyle them per screen.

| Component | Web class | SwiftUI |
|---|---|---|
| Card | `.rdl-card` `--muted` `--hero` `--accent` `--web` | `.rdlCard(.surface / .muted / .hero / .accent)` |
| Button | `.rdl-btn` `--accent` `--secondary` `--md` `--block` | `.buttonStyle(.rdl(.primary / .accent / .secondary / .ghost))` |
| Icon button | `.rdl-iconbtn` `--accent` | `RDLIconButton("bell")` |
| Quick action | `.rdl-action` | compose `RDLIconButton` + caption |
| Chip | `.rdl-chip[aria-pressed]` | `RDLChip("Gold", selected:)` |
| Segmented | `.rdl-seg` | `RDLSegmented(options, selection:)` |
| Delta pill | `.rdl-delta` `--down` `--on-accent` | `RDLDeltaPill(12.4)` |
| Amount | `.rdl-amount` + `<small>` for decimals | `RDLAmount(48209.36)` |
| Bar chart | `.rdl-bars` + `.rdl-bars__fill.is-active` / `.rdl-hatch` | `RDLBarChart(data, highlighted:)` |
| Hatch pattern | `.rdl-hatch` | `RDLHatch()` shape |
| Gauge | inline SVG arc (see templates) | `RDLGauge(progress:)` |
| Progress | `.rdl-progress > span` | `ProgressView` styled, or capsule pair |
| List row | `.rdl-row` | `RDLListRow(title:subtitle:trailing:)` |
| Section header | `.rdl-section-head` | HStack title + "See all" |
| Tab bar | `.rdl-tabbar` | `RDLFloatingTabBar(items, selection:)` |
| Avatar / stack | `.rdl-avatar`, `.rdl-avatars` | Circle + initials |
| Input / search | `.rdl-input` | TextField in capsule `fill-control` |
| Tooltip | `.rdl-tooltip` | ink capsule overlay |

## Specs

### Card
- Padding 20 (mobile) / 24 (web). Radius xl 24 (mobile), lg 20 (web), 2xl 28 (hero).
- Header row: title (title/h3) left, caption or "See all" right, 12–16 below.
- Tones: surface (default), muted (wells inside a card or on web canvas), hero (max one per
  screen), accent (max one per screen, usually a nudge/CTA or KPI).
- States: pressable cards scale to 0.98; loading = same shape filled with `fill-control` and a
  2s shimmer; empty = centred caption + secondary button inside the same card size.

### Button
- Heights: lg 56 (mobile primary), md 44 (inline / web), sm 36 (dense).
- Primary = ink fill (white text). Accent = accent fill (on-accent text) — use when the screen
  has no other accent element competing. Secondary = container-aware control fill. Ghost = text only.
- One primary per view. Paired buttons: secondary (flex 1) + primary (flex 2), 8 apart.
- Icon + label: 16pt icon, 8 gap. Disabled: 40% opacity, no hover.
- Focus: 2px accent ring, 2px offset.

### Icon button
44 circle; 20pt icon; control fill per container. Notification dot: 8pt orange with a 2pt
canvas-colored ring, top-right. In the hero: `bg-hero-raised` with white icon.

### Quick action
56 circle + 12pt label 8 below, 4 per row, evenly distributed. Labels are verbs: Send, Request,
Exchange, More.

### Segmented control
Pill container (control fill) with 4 padding; segments 36 tall; selected = ink pill with
white text (inside hero: accent pill with on-accent text). Selection glides.

### Delta pill
24 tall, 8 horizontal padding, caption weight 600, arrow glyph + value. Up = success-soft /
success-text; down = danger-soft / danger-text; on accent card = 10% ink / on-accent.

### Amount
Integer part at the role size (display / display-xl / h2), decimals as `<small>` (55% size,
secondary color). Tabular numerals, weight 500, tracking -3.5%. Animate value changes by rolling digits.

### Bar chart
Capsule bars on a `chart-track` capsule of full height. Past = `chart-muted` solid; projected
or inactive = hatch; current/selected = accent + ink tooltip 8 above the bar top. Labels 11pt,
tertiary, active label primary. 7 bars (week) on mobile, 12 (months) on web. Bars grow in with
40ms stagger.

### Line chart
Ink 2.25 stroke, smooth curve; area fill accent 35% → 0% vertical gradient; dashed grid lines in
`border-subtle`; scrub cursor = dashed ink line + accent dot 9r with 4pt canvas ring + ink tooltip.

### Gauge
Semi-circle, 16–18 stroke, round caps, track `chart-track`, value accent. Number (display) sits
on the baseline, caption beneath.

### List row
40 circular lead (glyph, logo or initials) → title (body-strong) + caption → trailing amount
(body-strong, tabular) + caption. 1px `border-subtle` separator between rows inside a card only.
Positive amounts in success-text with "+"; negatives stay primary with "−".

### Floating tab bar
Ink capsule, 8 padding, 4–5 items, 52 circles; active = accent circle with on-accent icon;
inactive icons `text-on-hero-muted`. 20 from the sides, 28 from the bottom, `shadow-float`.
Icons only; add accessibility labels.

### Input / search
44 pill, control fill, 16pt leading icon, placeholder secondary. Focused: 2px accent ring.
Error: caption in danger-text under the field + danger ring.

## Composing domain components

Recipe: *container* (card tone) + *focal value* (amount / gauge / chart) + *context* (caption,
delta, chip) + *one action* (button or circular arrow).

| Domain component | Composition |
|---|---|
| Portfolio / holding card | surface card → lead avatar + name + chip (asset class) → Amount (h2) + delta → mini line chart |
| Live price ticker (gold, crypto) | hero card → caption "24K · per gram" → Amount (display) rolling → delta pill → segmented (1D…All) |
| Buy/sell amount entry | canvas → Amount (display-xl) centred → quick-amount chips (₹500 · ₹1,000 · ₹5,000) → numeric keypad (56 circles) → primary button |
| SIP / recurring plan card | surface card → title + frequency chip → Amount (h2) "/month" → progress (installments done) → next-date caption + ghost "Manage" |
| Goal card | surface card → gauge or progress → "₹x of ₹y" caption → accent circular arrow |
| Credit / health score | surface card → gauge + number + band label → factor rows with progress |
| Transaction / activity | list rows grouped by date caption ("Today", "Yesterday") inside one card |
| Nudge / upsell | accent card → title + caption → ink circular arrow button |
| Map overlay card (logistics, property) | surface card sm shadow over map → status chip → route/address rows → primary button |
| KPI tile (web) | card → label + circular ↗ → Amount (h1–display) → delta pill |
