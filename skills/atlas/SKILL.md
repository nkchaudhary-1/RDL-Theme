---
name: atlas
description: Build accessible, production-grade web UI with the Atlas design system (WCAG 2.2 AA by construction), or re-skin it to any brand with Atlas Studio (primary + secondary hex in, proven theme out as CSS, JSON, Tailwind or Figma tokens). Atlas ships a contrast-anchored colour palette proven by script in light and dark, rem type, a 4pt space ladder, a two-tone focus ring, 19 atoms and 23 components (buttons, inputs, choices, switch, badges, tags, avatars, progress, skeleton, tooltip, field, form, card, alert, banner, toast, dialog, drawer, popover, menu, tabs, accordion, breadcrumb, pagination, stepper, segmented, table, list, stat, empty state, app shell) with APG keyboard behaviour, plus an automated accessibility audit. Use whenever the user asks for "Atlas", an accessible or WCAG-compliant design system, component library or screen, a11y guidelines for atoms/components, an accessibility audit of HTML, or a neutral product UI (dashboard, forms, settings, admin, fintech) where compliance matters more than visual flourish. Covers HTML/CSS, Tailwind and vanilla JS; see rdl-theme for the Dribbble-style glass language.
---

# Atlas · v1.0

An accessibility-first design system: every colour pairing is computed, every control has the same
focus ring and minimum target, every state has a non-colour cue, every widget follows the WAI-ARIA
Authoring Practices, and an audit script proves the result. WCAG 2.2 AA is the floor; AAA where it
is free (7:1 primary text, 44px primary targets, persistent errors).

## The Atlas contract

1. **Contrast is a ladder, not a lookup.** Each hue has 11 steps solved so step N has a fixed ratio
   against white; a dark step over a light one is always `R(dark) / R(light)` whatever the hue.
   600 on white = 5.4, 700 on 50 = 7.1, 300 on 900 = 7.5. `check_contrast.mjs` verifies 162
   pairings in both themes.
2. **Semantic tokens only.** Components use `bg-*`, `text-*`, `border-*`, `brand*`, `{status}*`,
   `focus-ring*`. Text uses `*-text`, fills use `*-bg`, boundaries use the base token. Step 500 is
   never body text.
3. **One focus ring.** 2px `focus-ring` outline, 2px offset filled with `focus-ring-inner`.
   Works on any background at ≥ 3:1. Never `outline: none` without a replacement.
4. **Targets ≥ 24px**, buttons 32/40/48, rows 56, choices 44, 8px between neighbours.
5. **Native first.** `<button>`, `<a href>`, `<input>`, `<dialog>`, `<details>`, `<table>`. ARIA for
   tabs, menus, switches, live regions only.
6. **State needs two cues.** Icon + colour, underline + colour, text + colour, position + colour.
7. **Announce what the user didn't do.** `role="status"` for polite, `role="alert"` for blocking;
   errors persist, everything else pauses on hover and focus.
8. **Respect settings.** rem type, reflow to 320, text spacing, reduced motion, high contrast,
   forced colours, OS colour scheme.

## Workflow

1. **Wire the tokens and layers.**
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="atlas-tokens.css">
   <link rel="stylesheet" href="atlas.css">
   <script src="atlas.js" defer></script>
   <html lang="en" data-theme="light">   <!-- omit data-theme to follow the OS -->
   ```
   Tailwind: import `atlas-tokens.css`, then `presets: [require('./tailwind.preset.js')]`.
   **Brand colours:** open `assets/templates/atlas-studio.html`, enter the primary and secondary hex,
   export the CSS and load it after `atlas-tokens.css` (or add a preset to `tokens.json → presets`
   and rebuild). Never hand-pick tints: the ladder and the role picker keep every pairing at AA.
   Changing values: edit `assets/tokens/tokens.json`, run `scripts/palette.mjs` (if hues changed),
   `scripts/build_tokens.mjs`, then `scripts/check_contrast.mjs`.
2. **Lay out with landmarks.** Skip link → `.at-navbar` (`<header>`) → labelled `<nav>` →
   `<main id="main">` → `<footer>`. `.at-shell--sidebar` for app layouts, `.at-container` +
   `.at-stack` / `.at-grid` inside. One `<h1>`, levels in order.
3. **Compose from the catalogue.** Atoms in `references/atoms.md`, components in
   `references/components.md`, each with markup, keyboard map and the criteria it satisfies. Copy
   the markup from `assets/templates/atlas-showcase.html`; it is the reference implementation and
   audits clean. Don't invent one-off styles; add a variant to `atlas.css` if the catalogue has a gap.
4. **Design every state.** Loading (`role="status"` + skeleton), empty (`.at-empty`), error
   (`.at-alert--danger` + field errors + summary), disabled with a reason, success feedback
   (`Atlas.toast`). Dark theme is free; check it anyway.
5. **Audit.** `node scripts/audit_a11y.mjs page.html "page.html?theme=dark"` and again with
   `--w 390`. Ship at 0 errors, then walk `references/qa-checklist.md` by keyboard and screen
   reader. The audit cannot judge alt text, wording or reading order.

## Quick reference

| Token | Light | Dark |
|---|---|---|
| canvas / surface / raised / sunken | neutral-50 / white / white / neutral-100 | neutral-950 / 900 / 800 / 950 |
| text primary / secondary / tertiary | neutral-900 (13.5) / 700 (7.5) / 600 (5.4) | neutral-50 / 300 / 400 |
| brand fill · on-brand · link | brand-600 · white · brand-700 | brand-400 · neutral-950 · brand-300 |
| status fill · text · bg · border | 600 · 700 · 50 · 300 | 400 · 300 · 900 · 700 |
| border decorative / strong | neutral-200, 300 / 500 (3.5) | neutral-800, 700 / 400 |
| focus ring / inner | brand-600 / white | brand-400 / neutral-950 |

| Scale | Values |
|---|---|
| Type (rem) | display 3 · h1 2.25 · h2 1.75 · h3 1.375 · h4 1.125 · body-lg 1.125 · body 1 · body-sm .875 · label .875 · caption .75 |
| Space (px) | 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 |
| Radius | 4 · 8 · 12 · 16 · 24 · pill |
| Controls | sm 32 · md 40 · lg 48 · target-min 24 · touch 44 · icon 16/20/24 |
| Motion | 100 / 180 / 300ms, 0 under reduced motion |
| Z | base 0 · raised 10 · sticky 100 · dropdown 200 · overlay 300 · dialog 400 · toast 500 · tooltip 600 |

| Hook | Does |
|---|---|
| `data-at-tabs` · `data-at-menu` · `data-at-popover` · `data-at-dialog` · `data-at-close` | APG tabs, menu button, popover, native modal dialog with focus return |
| `data-at-switch` · `data-at-disclosure` · `data-at-tooltip="…"` · `data-at-sort` · `data-at-dismiss` · `data-at-theme` · `data-at-brand="wise"` | switch state, expand/collapse, hoverable tooltip, aria-sort toggle, remove alert/toast, 3-state theme, brand preset toggle |
| `Atlas.toast({title, body, variant, timeout})` · `Atlas.announce(text, kind)` · `Atlas.init(root)` | live-region toasts (errors persist), announcements, re-init injected markup |

## Anti-patterns

- Hex values, px font sizes or `outline: none` in screen CSS.
- Colour-only state: a red border with no message, a green dot with no word, a link that is only blue.
- `<div onclick>`, `tabindex` > 0, icon buttons without `aria-label`, repeated "Edit" links.
- Placeholder as the label; validation on every keystroke; disabled submit with no explanation.
- Text over images without a scrim; `text-secondary` on status tints; step 500 as small text.
- Tooltips holding essential content; toasts that vanish with the error; modals built from `<div>`.
- Fixed heights on text containers; tables outside `.at-table-wrap`; hover-only row actions.

## Files

| Path | Use |
|---|---|
| `references/foundations.md` | **Tokens: contrast ladder, hues, semantic roles, type, space, shape, focus, targets, motion, breakpoints** |
| `references/atoms.md` | **19 atoms: anatomy, variants, states, markup, accessibility, do/don't** |
| `references/components.md` | **23 components: anatomy, markup, keyboard maps, ARIA, focus management; later-phase list** |
| `references/accessibility.md` | **WCAG 2.2 AA criterion by criterion: what the system does, what you still do; patterns; testing** |
| `references/qa-checklist.md` | Pre-ship pass: automated, structure, names, colour, keyboard, forms, feedback, responsive, content |
| `references/contrast-report.md` | Generated proof of all 162 pairings in light and dark |
| `assets/tokens/` | `tokens.json` (source) → `atlas-tokens.css`, `tailwind.preset.js` |
| `assets/css/atlas.css` | Component layer: base, 19 atoms, 23 components, shell |
| `assets/js/atlas.js` | Behaviour: tabs, menu, popover, dialog, switch, tooltip, disclosure, theme, toast, announce, sort |
| `assets/templates/atlas-showcase.html` | Every atom and component with reference markup; audits clean in light, dark and at 390px; brand toggle for presets |
| `assets/templates/atlas-studio.html` | **Atlas Studio**: enter primary + secondary colours, neutrals, corners, type; live preview, contrast proof, export CSS / DTCG JSON / Tailwind / Tokens Studio (Figma) |
| `assets/tokens/atlas-brand-wise.css` | Generated brand preset (Wise-inspired); presets live in `tokens.json → presets` |
| `scripts/palette.mjs` | Solves the palette from the contrast ladder |
| `scripts/build_tokens.mjs` | JSON → CSS + Tailwind |
| `scripts/check_contrast.mjs` | Proves semantic pairings; `--md` writes the report |
| `scripts/audit_a11y.mjs` | Playwright audit: structure, names, ARIA, contrast, focus, reflow, text spacing, reduced motion, targets |
