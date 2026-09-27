# RDL design study

Analysis of the RonDesignLab (RDL) Dribbble portfolio — dribbble.com/RonDesignLab — and the
design language this skill encodes.

## Evidence and method

| Source | What it gave | Confidence |
|---|---|---|
| Search-indexed shot titles and descriptions (links below) | Project list, domains, platforms, product intent | High |
| The studio's publicly known visual language across its long-running Dribbble output | Layout, color, type, chart and presentation conventions | Medium — not re-sampled pixel by pixel for v1 |
| Reference builds in `assets/templates/`, rendered and reviewed | Proof the rules produce the look when combined | High (for internal consistency) |

**Calibration loop.** v1 tokens were set by eye, not sampled. To tighten them: export 20–40
recent shots into `research/shots/`, run `scripts/extract_palette.py research/shots`, and update
`tokens.json` wherever ΔE > 8. Then run `build_tokens.mjs`. Record what changed in the repo
CHANGELOG so the theme stays traceable to its source.

## Studio profile

- Product-design studio (UX/UI, branding, motion). ~25k Dribbble followers; clients cited include
  Ford, Fox Sports and Colgate. Shots are authored by individual designers "for RonDesignLab"
  (e.g., Jack R., Stav D., "RD UX/UI"), so the style is a studio system, not one person's taste.
- Stated thesis: make technology "accessible and human" by organising information so the key
  idea stands out. In the UI that means **one focal number per screen**.

## Portfolio inventory

| Project | Domain | Platform | Link |
|---|---|---|---|
| Coin — Financial Wallet | Fintech / wallet | iOS | [shot](https://dribbble.com/shots/18421629-Coin-Financial-Wallet-Mobile-App) |
| Bloom Trading — Investment | Fintech / trading | iOS | [shot](https://dribbble.com/shots/22624428-Bloom-Trading-Investment-Mobile-App) |
| Mint App — Personal Finance SaaS | Fintech / budgeting | iOS + web | [shot](https://dribbble.com/shots/24184169-Mint-App-Personal-Finance-SaaS) |
| SavingPro — Savings SaaS Dashboard | Fintech / savings goals | iOS + web | [shot](https://dribbble.com/shots/24028927-SavingPro-Mobile-App-Savings-SaaS-Dashboard) |
| Creative Juice — Blogger Finance | Fintech / creator income | iOS + web | [shot](https://dribbble.com/shots/24424794-Creative-Juice-Blogger-Finance-SaaS-Dashboard) |
| QuickBooks — Finance Service Management | Fintech / SMB accounting | Web dashboard | [shot](https://dribbble.com/shots/21225716-QuickBooks-Finance-Service-Management) |
| Credit Pros — Credit Score Dashboard | Credit | iOS + web | [shot](https://dribbble.com/shots/24230013-Credit-Pros-SaaS-Credit-Score-Dashboard) |
| Aella — Credit Score SaaS | Credit / ML scoring | Web dashboard | [shot](https://dribbble.com/shots/23992108-Aella-Credit-Dashboard-Credit-Score-SaaS) |
| Salesforce CRM — Invoice Management | SaaS / CRM | Web dashboard | [shot](https://dribbble.com/shots/23203289-Salesforce-CRM-Invoice-Management-Software) |
| PHR — Personal Health Record | Health | iOS | [shot](https://dribbble.com/shots/19557425-PHR-Personal-Health-Record-App) |
| Oscar Health — Health Insurance | Health / insurance | iOS | [shot](https://dribbble.com/shots/22977229-Oscar-Health-Health-Insurance-App) |
| EHR — Electronic Health Record System | Health / clinical | Web + case study | [shot](https://dribbble.com/shots/15858154-EHR-Electronic-Health-Record-System-Behance-Case) |
| Vessel Health, Dentale EHR, Veri CGM tracker, Vizo neuro-optical scan, HealtIV, Dr+ ambulance | Health | iOS / web | project pages on the profile |
| Lendora — Property Map Management | Property / map ops | Web dashboard | profile |
| Helvio Logistics, Moverta | Logistics / route tracking | iOS + web | profile |
| Urbis — City Task Management | Civic ops | iOS | profile |
| Monte, S&T Financial Assistant, Daneel crypto bot, MBOX NFT | Fintech / crypto | iOS | profile |
| Luma meditation, Fitness workout tracker | Wellness | iOS | profile |
| Booki, AI Travel dashboard, Customer Journey CRM | Travel / SaaS | iOS / web | profile |

**Mix:** roughly half fintech and credit, a quarter health, the rest logistics/ops, SaaS and
wellness. The system is tuned for **data-dense consumer and prosumer products where a number
is the hero** — which is why it fits a gold-investment app well.

## Cross-portfolio patterns

### Layout
- Mobile: 20pt gutters, stacked full-width cards with 12pt gaps; a greeting header (avatar +
  two-line greeting + circular bell) on home screens; centred title with circular back/more
  buttons on detail screens.
- Web: floating white sidebar (rounded, inset from the viewport), page title as a greeting,
  search pill + bell + primary pill button top-right, and a **bento grid** of cards with one
  dark KPI card spanning two columns.
- Map products put the map full-bleed and float white cards and pill filters over it.

### Color
- Monochrome base: off-white canvas, white cards, near-black ink for hero cards, primary buttons,
  selected segments and tooltips.
- One saturated accent per product. Neon lime/chartreuse is the studio's most recognisable
  signature in fintech work; violet, orange and blue appear in other products; health work
  leans on softer blues and mints. Accent is spent on the single most important interactive or
  data element.
- Semantic green/red only on deltas, always as a soft-tinted pill.

### Typography
- Neutral grotesk (Inter / SF Pro / similar). Large medium-weight numerals with tight tracking;
  decimals and currency codes visibly smaller or grayer. Titles semibold; captions gray.
- Sentence case everywhere. Labels are short ("Total balance", "This week").

### Data visualisation
- Capsule bar charts on a light track; the current/selected bar in accent with an ink tooltip;
  other periods muted; projected periods hatched with 45° lines.
- Smooth line charts with a thin ink stroke, soft accent area gradient, dashed vertical cursor
  and an accent dot with a white ring.
- Semi-circle gauges for scores/goals, number centred on the baseline.
- Thin rounded progress bars for factors/goals. No pie charts with many slices; donuts with
  2–4 segments at most.

### Components
- Pill buttons (56pt primary on mobile), circular icon buttons (44pt), quick-action circles
  (56pt) with labels beneath, pill chips and segmented controls, avatar stacks, list rows with
  a circular leading glyph and right-aligned amount + caption.
- Floating dark capsule tab bar with an accent circle for the active item.

### Imagery and depth
- Depth from fill contrast and radius, not shadow. Shadows only on floating elements (tab bar,
  sheets, phone mockups in presentation).
- Occasional 3D objects (cards, coins) or cut-out photography as hero illustration; used
  sparingly, one per screen at most.

### Presentation
- 4:3 shots (1600×1200) with 2–3 phone screens on a flat light-gray or accent-tinted canvas,
  phones staggered vertically; small product wordmark top-left, category label top-right.
- Dashboards shown flat, edge-to-edge, sometimes with one phone overlapping.
- Many shots are animated: bars grow in with stagger, numbers count up, the tab indicator glides.

## Evolution (why v1 is tuned the way it is)

Earlier RDL work used more gradients, illustration and multi-color palettes. The more recent
fintech/credit/SaaS series converges on **monochrome + one neon accent + bento cards + big
numerals**. This skill defaults to that current language (lime pack) and keeps the other accent
packs for domains where lime is wrong (health → ocean, luxury/gold → gold, playful → violet/orange).

## What this means for building

1. Decide the screen's one number before anything else; that decides the hero card.
2. Spend the accent once or twice per screen; make everything else ink/gray.
3. Keep components generic and compose domain components from them (see `components.md`).
4. Present work the RDL way (see `presentation.md`) when the goal is a portfolio shot.
