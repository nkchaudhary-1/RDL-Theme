# Accessibility guidelines

Atlas targets **WCAG 2.2 Level AA** for every atom and component, with AAA where it costs nothing
(7:1 primary text, 44px primary targets, no time limits). This file is the rulebook: what each
success criterion means for a screen built with Atlas, how the system already satisfies it, and
what remains your job when you compose screens. `atoms.md` and `components.md` carry the
per-component detail; `qa-checklist.md` is the pre-ship pass; `scripts/audit_a11y.mjs` checks what
can be checked by machine.

Atlas follows three sources, in this order when they disagree: WCAG 2.2, the WAI-ARIA Authoring
Practices Guide (APG) patterns, then platform conventions.

## 1. Principles

1. **Semantics first.** Use the native element that already has the behaviour: `<button>`,
   `<a href>`, `<input>`, `<select>`, `<dialog>`, `<details>`, `<table>`. ARIA is for the patterns
   HTML lacks (tabs, menus, switches, live regions), never to repaint a `<div>`.
2. **Never colour alone.** Every state has a second cue: an icon, a word, an underline, a border,
   a position. The status colours exist to reinforce, not to carry.
3. **Everything by keyboard, in reading order.** No action is pointer-only, no focus is trapped
   except inside a modal, and the DOM order is the visual order.
4. **Names, roles, states are explicit.** Every control has an accessible name; every widget
   exposes its role and its current state; every change the user did not cause is announced.
5. **Respect the user's settings.** Font size, zoom, reduced motion, high contrast, forced colours,
   colour scheme and text spacing all change the rendering without breaking it.
6. **Prove it.** Contrast is computed, not eyeballed; the audit runs on every build; the manual
   checklist is walked before handoff.

## 2. WCAG 2.2 AA, criterion by criterion

How to read the table: **System** is what Atlas does for you; **You** is what the screen author
still has to do.

### Perceivable

| SC | System | You |
|---|---|---|
| 1.1.1 Non-text content | Decorative SVG icons are `aria-hidden`; avatars take `alt` or `aria-label`; spinners carry sr-only "Loading" | Write alt text for content images; make charts expose their data (table or summary) |
| 1.3.1 Info and relationships | Fields use `<label for>`, hints and errors via `aria-describedby`; groups use `<fieldset><legend>`; tables use `<caption>` and `scope`; headings go inside accordion summaries | Keep heading levels in order; put lists in `<ul>/<ol>`; one `<main>`, labelled `<nav>`s |
| 1.3.2 Meaningful sequence | DOM order is the visual order; no `order` or `flex-direction: *-reverse` in components | Don't reorder with CSS; add the stretched-link action last in the card |
| 1.3.3 Sensory characteristics | Instructions in the showcase name controls, not positions or colours | Don't write "click the green button on the right" |
| 1.3.4 Orientation | Nothing locks orientation | Don't lock orientation in the app shell |
| 1.3.5 Identify input purpose | Showcase inputs set `autocomplete` tokens | Set `autocomplete` on every personal-data field (`name`, `email`, `tel`, `postal-code`…) |
| 1.4.1 Use of colour | Links underlined in text; selected tab has underline and weight; badges have dot and word; deltas have sign and sr text; invalid fields have a 2px border, icon and message; switch thumb moves and shows a check | Keep the second cue when you build charts or custom states |
| 1.4.3 Contrast (minimum) | All text tokens ≥ 4.5:1 on every surface they're allowed on (`contrast-report.md`); placeholders 4.5:1; disabled text exempt | Don't put text on `brand-subtle` with `text-secondary`; use the `*-text` tokens on tinted fills; check text over images with the audit or by hand |
| 1.4.4 Resize text | rem type, unitless line heights, no fixed heights on text containers | Test at 200 % zoom; don't set `max-height` on text |
| 1.4.5 Images of text | No images of text in the system | Don't ship text in images; logos are the only exception |
| 1.4.10 Reflow | Reflows to 320px; grid/stack children get `min-width: 0`; tables scroll in one axis inside a labelled region | Audit at 320; wrap data tables in `.at-table-wrap` |
| 1.4.11 Non-text contrast | Input borders, secondary-button borders, switch track, focus ring, status icons, progress bar, checkbox border ≥ 3:1 on all surfaces | Use `border-strong`, brand or status tokens for any boundary that carries meaning |
| 1.4.12 Text spacing | Line-height ≥ 1.5, no clipped text containers, buttons use `min-height` | Don't set fixed `height` on anything that holds text |
| 1.4.13 Content on hover or focus | Tooltips are dismissible (Escape), hoverable (pointer can move onto them) and persistent until hover/focus leaves | Don't put anything essential or interactive in a tooltip; use a popover |

### Operable

| SC | System | You |
|---|---|---|
| 2.1.1 Keyboard | Every widget has an APG keyboard map (`components.md`); scrollable table wrapper is focusable; dialogs, menus, tabs, popovers, disclosures handle keys | Don't add `onclick` to non-focusable elements; use `<button>` |
| 2.1.2 No keyboard trap | Only `<dialog>` traps focus, and Escape or a close button always exits | Don't trap focus in drawers built from `<div>` |
| 2.1.4 Character key shortcuts | None registered by the system; menu typeahead works only while the menu has focus | If you add single-key shortcuts, make them remappable or active only on focus |
| 2.2.1 Timing adjustable | Toasts last ≥ 7s, pause on hover and focus; error toasts persist | Don't auto-dismiss anything the user must act on; no session timeouts without warning |
| 2.2.2 Pause, stop, hide | No auto-playing carousels or marquees; skeleton shimmer stops under reduced motion | Give any auto-updating region (prices, feeds) a pause control |
| 2.3.1 Three flashes | No flashing animations | Don't animate opacity or colour faster than 3 Hz |
| 2.3.3 Animation from interactions | All motion collapses under `prefers-reduced-motion` | Guard any custom animation with the same media query |
| 2.4.1 Bypass blocks | `.at-skip-link` is first in the DOM and targets `#main`; landmarks: banner, nav, main, contentinfo | Keep the skip link; label each `<nav>` |
| 2.4.2 Page titled | — | Unique `<title>` per page, most specific part first ("Buy gold · Atlas Wealth") |
| 2.4.3 Focus order | Focus returns to the opener after dialogs, menus and popovers close; error summary receives focus on submit | Keep DOM order logical; don't use `tabindex` > 0 (the audit flags it) |
| 2.4.4 Link purpose | Pagination and icon links carry `aria-label` | Link text makes sense alone: "View transaction from 18 Oct", not "View" (hide the extra words with `.at-sr-only`) |
| 2.4.5 Multiple ways | — | Provide search and navigation, or a sitemap, for multi-page products |
| 2.4.6 Headings and labels | Field labels are visible and persistent; sections have headings | Make headings describe the section; one `<h1>` |
| 2.4.7 Focus visible | Two-tone ring on every focusable element; widgets that hide the native ring re-draw it on the perceived control | Never set `outline: none` without replacing it |
| 2.4.11 Focus not obscured (minimum) | Sticky navbar is 64px and `scroll-margin`-friendly; toasts don't overlap focused controls on desktop | Add `scroll-padding-top` equal to any sticky header you add; keep sticky footers out of the focus path |
| 2.5.1 Pointer gestures | No swipe, pinch or path gestures in the system | Offer a button alternative for any gesture (e.g. carousel arrows) |
| 2.5.2 Pointer cancellation | Actions fire on click (up event), never on pointerdown | Keep it that way in custom handlers |
| 2.5.3 Label in name | Visible text is the start of the accessible name for every button and link in the showcase | When you add `aria-label`, start it with the visible text |
| 2.5.4 Motion actuation | None | Don't require shaking or tilting |
| 2.5.7 Dragging movements | Range inputs accept arrow keys; no drag-only interactions | Any drag-to-reorder gets up/down buttons too |
| 2.5.8 Target size (minimum) | All targets ≥ 24×24; buttons 32–48, rows 56, choice labels 44; inline text links exempt by design | Keep 8px between adjacent targets; use `at-btn--lg` for touch-first primary actions |

### Understandable

| SC | System | You |
|---|---|---|
| 3.1.1 Language of page | Showcase sets `<html lang="en">`; the audit requires it | Set `lang`; mark language changes inline with `lang` on the element |
| 3.2.1 On focus · 3.2.2 On input | Nothing opens, submits or navigates on focus or on changing a value; the segmented control and tabs change the view in place, which is expected | Don't auto-submit on the last digit; don't navigate on `<select>` change without a button |
| 3.2.3 Consistent navigation · 3.2.4 Consistent identification | Shell, navbar and sidenav are fixed patterns; icons mean the same thing everywhere | Keep the same order and names across screens |
| 3.2.6 Consistent help | — | Put help (chat, contact, FAQ link) in the same place on every page |
| 3.3.1 Error identification | Invalid fields: `aria-invalid`, 2px border, icon, text message linked by `aria-describedby`; form summary is `role="alert"`, focused, with links to fields | Write messages that say what is wrong and how to fix it |
| 3.3.2 Labels or instructions | Visible labels, required marked with `*` plus sr "(required)", optional marked in words, hints below | Put format hints in the hint, not in the placeholder |
| 3.3.3 Error suggestion | Showcase messages include the fix ("Try neelesh-c") | Suggest a correction whenever one is known |
| 3.3.4 Error prevention (legal, financial, data) | `alertdialog` confirm pattern with the safe action focused; destructive buttons are distinct | Confirm or allow reversal for money movement and deletions; show a review step before purchase |
| 3.3.7 Redundant entry | — | Autofill or pre-select anything already entered in the flow; the SIP and lease flows share one template so the same fields don't repeat |
| 3.3.8 Accessible authentication (minimum) | — | No puzzles; allow paste in password and OTP fields; support password managers (`autocomplete="current-password"`, `one-time-code`) |

### Robust

| SC | System | You |
|---|---|---|
| 4.1.2 Name, role, value | Every widget has the APG roles and states: `aria-selected`, `aria-expanded`, `aria-checked`, `aria-pressed`, `aria-current`, `aria-sort`, `aria-valuenow`, `aria-busy` | Keep them in sync when you re-render; don't invent roles |
| 4.1.3 Status messages | Toasts in a polite live region; errors `role="alert"`; sort changes and theme changes announced with `Atlas.announce()`; loading uses `role="status"` | Announce results of filters, saves and background updates without moving focus |

## 3. Patterns that keep coming up

### Naming things
- Visible label is the name. Hidden text (`.at-sr-only`) extends it: `View<span class="at-sr-only"> transaction from 18 Oct</span>`.
- Icon-only buttons: `aria-label="Edit"` (verb, not noun), or sr-only text inside. Never `title` alone.
- Repeated names in a list are a defect: "Edit, Edit, Edit" tells a screen-reader user nothing.
- Groups get names too: `<fieldset><legend>`, `role="group" aria-label`, `<nav aria-label>`,
  `<section aria-labelledby>`, `role="region"` on a scrollable table wrapper.
- `aria-label` overrides visible text for assistive tech. Start it with the visible words (2.5.3).

### Focus management
- Opening a dialog: focus the first field, or the least destructive button for a confirmation
  (`autofocus`). Closing: focus returns to the opener (native `<dialog>` plus `atlas.js` does this).
- Menus and popovers: focus the first item on open, return to the trigger on Escape; Tab closes
  without returning so the user keeps moving.
- Deleting an item in a list: move focus to the next item, or to the list heading if it was last.
- Form submit with errors: focus the error summary (`tabindex="-1"`), whose links jump to fields.
- Route change in a SPA: focus the new `<h1>` or `<main tabindex="-1">`, and announce the title.
- Never `autofocus` on page load except on a single-purpose page (search, login).

### Announcing changes
- `role="status"` (polite) for success, progress and non-urgent updates; `role="alert"`
  (assertive) only for errors that block the task.
- Live regions must exist before the message is inserted. `Atlas.toast` and `Atlas.announce`
  create theirs once and reuse them.
- Don't announce every keystroke of a character counter; update the visible count and announce at
  thresholds (e.g. 10 characters left).
- Price tickers and other auto-updating data are `aria-live="off"` with a manual refresh or an
  announcement on demand.

### Forms
- Label above the control, hint below, error replaces the hint; all three linked.
- Required: `required` on the input, `*` with sr "(required)". Optional: say "(optional)".
- Validate on submit, or on blur after the first submit. Never on every keystroke while the user is
  still typing.
- Use `inputmode` and `autocomplete`; never `type="number"` for things that aren't numbers (PAN,
  phone, card number).
- Error messages are specific and kind: "Enter a 10-character PAN, as printed on the card".
- Keep disabled submit buttons in the tab order with an explanation nearby, or enable them and
  validate on submit. A silently disabled primary action is a dead end.

### Colour and theming
- Only the semantic tokens appear in component CSS. The pairings table is the contract; if you need
  a pairing that isn't in `tokens.json → contrast-pairs`, add it and run the checker.
- Step 500 of any hue is a 3:1 colour: UI boundaries, large text, icons. It is never body text.
- Dark mode swaps roles, not components. Don't invert images; don't lower opacity to "dim" text,
  use `text-secondary`/`text-tertiary`.
- Status tints (`*-bg`) are containers for `*-text`, never for `text-secondary`.

### Motion
- Motion communicates (a toast arriving, a menu opening) and never decorates. Nothing loops except
  loading indicators, and those degrade to pulses under reduced motion.
- Transforms, not layout properties; durations ≤ 300ms; no parallax.

### Touch and small screens
- Primary action 48px tall, full width below `sm`. Secondary actions can be 40.
- Bottom sheets (`.at-drawer--bottom`) for pickers and filters on phones; keep a visible close
  button, not only swipe-down.
- Don't rely on hover: anything revealed on hover (row actions) is also reachable by focus and
  visible on touch.

## 4. Testing

Automated (every build): `node scripts/audit_a11y.mjs page.html` plus `?theme=dark`, and at
`--w 390` for phones. Zero errors to ship. The audit covers structure, names, ARIA state, computed
contrast, focus visibility by tabbing, reflow at 320, text-spacing clipping and reduced motion.
It does not cover meaning: alt text quality, reading order sense, message wording.

Manual (every screen, before handoff):
1. **Keyboard only.** Unplug the mouse. Tab through; every control is reachable, visibly focused,
   operable with Enter/Space/arrows; Escape leaves overlays; nothing traps.
2. **Screen reader.** VoiceOver (Safari) or NVDA (Firefox). Navigate by headings, landmarks and
   forms. Every control announces name, role and state; status changes are heard; nothing
   decorative is read.
3. **Zoom 200 % and 400 %.** Nothing clips, overlaps or needs horizontal scroll; text spacing
   bookmarklet applied.
4. **Colour.** Grayscale filter on: every state still readable. Dark theme and `prefers-contrast:
   more` on: same.
5. **Reduced motion and forced colours.** Windows High Contrast or the Chromium emulation: every
   control boundary and selected state visible.
6. **Touch.** Phone or 390px emulation: targets comfortable, sheets closable, no hover-only actions.

## 5. What Atlas does not solve for you

- Content: plain language, reading level, alt text, link text, error wording.
- Flow: how many steps, whether data is re-asked, whether timeouts exist, whether a purchase can be
  reviewed before commit.
- Charts and maps: provide a data table or text summary; Atlas has no chart component.
- Video and audio: captions, transcripts, audio description.
- Third-party embeds: test them separately; they inherit none of this.
