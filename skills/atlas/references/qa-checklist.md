# QA checklist

Walk this before presenting any Atlas screen. Fix, don't annotate. Automated items run first;
the rest are a keyboard-and-screen-reader pass.

## Automated
- [ ] `node scripts/check_contrast.mjs` passes (run after any token change).
- [ ] `node scripts/audit_a11y.mjs page.html "page.html?theme=dark"` reports 0 errors at the
      default width and with `--w 390`.
- [ ] Warnings reviewed: every "unverified" contrast (text over images) checked by hand, every
      < 24px target justified or fixed.

## Structure
- [ ] `<html lang>`, a unique `<title>`, one `<h1>`, heading levels in order, no skipped levels.
- [ ] Landmarks: skip link → `<header>` → labelled `<nav>` → `<main id="main">` → `<footer>`.
      Extra `<nav>` and `<section>` elements are labelled.
- [ ] DOM order equals visual order. No `tabindex` > 0.
- [ ] Every id is unique; every `aria-controls` / `aria-labelledby` / `aria-describedby` resolves.

## Names and roles
- [ ] Every button, link, input and icon control has an accessible name that starts with its
      visible text. Icon-only controls have `aria-label`.
- [ ] Repeated actions in lists are unique ("Edit Priya Nair", not "Edit").
- [ ] Widgets expose state: `aria-selected`, `aria-expanded`, `aria-checked`, `aria-pressed`,
      `aria-current`, `aria-sort`, `aria-invalid`, `aria-busy`.
- [ ] Decorative SVG is `aria-hidden="true" focusable="false"`; meaningful images have alt text.

## Colour and contrast
- [ ] Only semantic tokens are used; no hex in screen CSS.
- [ ] Text uses `text-*` or `*-text` tokens on their allowed surfaces. No `text-secondary` on
      status tints, no step-500 colour as small text.
- [ ] Every state has a non-colour cue (icon, text, underline, border, position).
- [ ] Works in dark theme and with `prefers-contrast: more`; boundaries survive forced colours.

## Keyboard
- [ ] Tab reaches everything interactive, in order; Shift+Tab reverses it.
- [ ] Focus ring visible on every stop, including custom widgets and inside dark surfaces.
- [ ] Enter/Space activate; arrows move within tabs, menus, radios, segmented controls, sliders;
      Home/End work in lists; Escape closes overlays and returns focus.
- [ ] Modals trap focus; nothing else does. Scrollable regions are focusable.
- [ ] After close, delete, submit or route change, focus lands somewhere sensible.

## Forms
- [ ] Visible label for every field; required and optional marked; hints below.
- [ ] Errors: `aria-invalid`, message linked, icon + text, specific wording with a fix; summary
      with links on submit; focus moves to it.
- [ ] `autocomplete`, `inputmode` and `type` set correctly; paste allowed; no number inputs for
      identifiers.
- [ ] Nothing submits or navigates on focus or change alone.

## Feedback
- [ ] Loading: `role="status"` text, skeleton `aria-hidden`, busy buttons keep their label.
- [ ] Success and info in a polite live region; blocking errors `role="alert"`; error toasts
      persist; all toasts pause on hover/focus.
- [ ] Empty states have a heading, one line and one primary action.

## Responsive and preferences
- [ ] Reflows to 320px without horizontal scroll (tables scroll inside their wrapper).
- [ ] 200 % zoom and the 1.4.12 text-spacing override cause no clipping or overlap.
- [ ] Reduced motion: no movement except opacity; spinners pulse.
- [ ] Targets ≥ 24px, primary touch actions 48px and full width below `sm`, 8px between targets.
- [ ] No hover-only affordances.

## Content
- [ ] Sentence case; buttons are verbs; links say where they go.
- [ ] Error and empty-state copy says what happened and what to do next.
- [ ] Numbers are tabular and carry units; deltas carry a sign.
