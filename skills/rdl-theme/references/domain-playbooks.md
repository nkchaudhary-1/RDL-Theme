# Domain playbooks

Each playbook fixes the choices that vary by domain. Everything not listed follows the core rules.

## Fintech — wallet, budgeting, savings, creator finance
*Reference projects: Coin, Mint, SavingPro, Creative Juice, Monte.*
- Accent: **lime**. Hero: total balance. Primary chart: weekly spending bars (hatched history).
- Domain components: account/card carousel (cards as 3D-ish tiles with radius 2xl, ink or accent
  fills, masked number "•••• 4821"), category chips with emoji-free line icons, budget progress
  rows, savings goal gauge, income vs expense split bars.
- Copy: short verbs ("Top up", "Send", "Request"). Currency always with symbol; cents muted.

## Wealth & investing — trading, gold, SIP, lease
*Reference projects: Bloom Trading, Mint. Directly applicable to a gold-investment app.*
- Accent: **gold** for a precious-metals brand, **lime** for a modern trading brand. Don't mix.
- Hero: live price (per gram / per unit) with rolling digits, delta pill and last-updated
  caption; or portfolio value on Home.
- Charts: line chart with scrub (M2) for price; hatched bars for monthly SIP contributions,
  current month accent.
- Domain components:
  - **Price ticker card** — hero; "24K Gold · per gram"; buy/sell spread as two caption values.
  - **Buy flow** — M4 with ₹ ↔ grams toggle chip, conversion caption, price-lock countdown chip
    (e.g., "Price locked · 04:59") in the review sheet.
  - **SIP card** — frequency chip (Daily/Weekly/Monthly), amount "/month", installments progress,
    next debit date, "Pause" / "Edit" ghost actions. Creation flow: amount → frequency segmented
    → start date → review sheet. Reuse the same flow shell for **Lease** (asset amount → tenure
    segmented → yield caption → review), swapping copy and the summary rows.
  - **Holdings row** — asset lead, grams + value, P&L in success-text / primary.
  - **Vault / certificate card** — muted card with lock icon circle and serial caption.
- Trust cues: regulator/custodian line as caption under the hero; purity chip ("24K · 99.9%").

## Credit
*Reference projects: Credit Pros, Aella, CreditPros mobile.*
- Accent: **violet** or lime. Hero element: **semi-circle gauge** with score + band label.
- Components: factor rows with progress; bureau chips; dispute timeline (dots + line); "Boost"
  accent nudge card.

## Health — records, insurance, CGM, clinics
*Reference projects: PHR, EHR, Oscar Health, Vessel, Veri CGM, Dentale, Vizo.*
- Accent: **ocean** (blue); success mint for "in range". Softer: hero may be a surface card with
  a large metric instead of ink for anxious contexts (diagnoses, bills).
- Charts: line with target band (success-soft band behind the line), dot plots for readings.
- Components: vitals tiles (2×2 wells with unit captions), appointment card with doctor avatar +
  time chip + map preview, record/document rows, coverage progress (deductible used of total).
- Tone: calmer — fewer hatched patterns, more whitespace, no red unless clinically necessary.

## Logistics & operations — delivery, fleets, property, city tasks
*Reference projects: Helvio Logistics, Moverta, Lendora, Urbis.*
- Accent: **orange** (logistics) or lime/ocean (property/civic).
- Layout: W2 map operations on web; on mobile a map top half + draggable sheet (radius 3xl).
- Components: route timeline (pickup → drop, ink dots, current accent), ETA chip, driver card
  (avatar + rating + call icon button), status pills (In transit / Delayed / Delivered),
  property pins with price bubbles (ink capsules; selected accent).

## SaaS dashboards — CRM, accounting, invoicing, analytics
*Reference projects: Salesforce CRM, QuickBooks, Customer Journey CRM, AI Travel dashboard.*
- Accent: per brand; lime default. W1 overview, W3 tables, W4 records.
- Components: KPI tiles, funnel as stepped horizontal bars (hatched drop-off), pipeline
  kanban (columns on canvas, cards white, stage count chip), invoice status pills.

## Crypto & web3
*Reference projects: Daneel crypto bot, MBOX NFT.*
- Accent: violet or lime; dark mode by default. Hero: portfolio value; asset rows with
  sparkline; bot/strategy cards with on/off switch (accent track).
- Avoid neon gradients and glow — RDL keeps crypto as disciplined as fintech.

## Wellness & fitness
*Reference projects: Luma meditation, Fitness workout tracker.*
- Accent: orange (fitness) or violet/ocean (meditation). Hero: today's ring/gauge or streak.
- Components: session cards with photography, timer display (display-xl), weekly streak dots,
  activity bars. Meditation variant: softer, more imagery, fewer numbers.

## Travel & booking
*Reference project: Booki, AI Travel dashboard.*
- Accent: ocean or orange. Hero: next trip card with photography + date chips.
- Components: search pill with segmented trip type, date range chips, itinerary timeline,
  price-per-night amount with muted decimals.
