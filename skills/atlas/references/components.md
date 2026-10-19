# Components

Composites built from the atoms in `atoms.md`, styled by `assets/css/atlas.css` (sections 6–12) and
given behaviour by `assets/js/atlas.js`. Every component works as plain HTML without the script
(dialogs, accordions, forms, tables, segmented controls use native elements); the script adds the
WAI-ARIA Authoring Practices (APG) keyboard maps for tabs, menus, popovers, tooltips, switches and
disclosures, plus toasts and announcements. Tokens are in `foundations.md`; the general rules the
components follow are in `accessibility.md`. Working markup for everything below is in
`assets/templates/atlas-showcase.html`, which passes `scripts/audit_a11y.mjs` with 0 errors.

| Component | Class | Behaviour hook | ARIA pattern | Key WCAG 2.2 |
|---|---|---|---|---|
| Field | `.at-field` | none | label / describedby | 1.3.1 · 3.3.1 · 3.3.2 · 4.1.2 |
| Fieldset | `.at-fieldset` | none | group (native) | 1.3.1 · 3.3.2 |
| Form | `.at-form` | none | error summary `role=alert` | 3.3.1 · 3.3.3 · 3.3.4 · 3.3.7 |
| Card | `.at-card` | none | stretched link | 2.4.4 · 2.4.7 · 2.5.8 |
| Alert | `.at-alert` | `data-at-dismiss` | status / alert | 1.4.1 · 4.1.3 |
| Banner | `.at-banner` | `data-at-dismiss` | status / alert | 4.1.3 |
| Toast | `.at-toast` | `Atlas.toast()` | live region | 2.2.1 · 4.1.3 |
| Dialog | `.at-dialog` | `data-at-dialog` | modal dialog (native) | 2.1.2 · 2.4.3 · 4.1.2 |
| Drawer | `.at-drawer` | `data-at-dialog` | modal dialog (native) | 2.1.2 · 2.4.3 |
| Popover | `.at-popover` | `data-at-popover` | non-modal dialog / disclosure | 1.4.13 · 2.1.2 |
| Menu | `.at-menu` | `data-at-menu` | menu button | 2.1.1 · 4.1.2 |
| Tabs | `.at-tabs` | `data-at-tabs` | tabs (automatic activation) | 2.1.1 · 2.4.3 · 4.1.2 |
| Accordion | `.at-accordion` | none (native details) | disclosure | 1.3.1 · 2.1.1 · 4.1.2 |
| Disclosure | `.at-disclosure__trigger` | `data-at-disclosure` | disclosure | 4.1.2 |
| Breadcrumb | `.at-breadcrumb` | none | breadcrumb | 2.4.8 · 1.3.1 |
| Pagination | `.at-pagination` | none | navigation + aria-current | 2.4.4 · 2.5.8 |
| Stepper | `.at-stepper` | none | list + aria-current="step" | 1.3.1 · 1.4.1 |
| Segmented | `.at-segmented` | none (native radios) | radio group | 2.1.1 · 4.1.2 |
| Table | `.at-table` | `data-at-sort` | table + sortable header | 1.3.1 · 2.1.1 · 4.1.3 |
| List | `.at-list` | none | list | 1.3.1 · 2.5.8 |
| Stat | `.at-stat` | none | text | 1.4.1 |
| Empty state | `.at-empty` | none | heading + actions | 2.4.6 |
| Shell | `.at-shell` `.at-navbar` `.at-sidenav` | `data-at-theme` | landmarks | 1.3.1 · 2.4.1 · 2.4.5 |

## `data-at-*` hooks (atlas.js)

`Atlas.init(root = document)` runs once on `DOMContentLoaded` and can be called again for injected markup.

| Attribute | Put it on | What it wires |
|---|---|---|
| `data-at-tabs` | `.at-tabs` wrapper | Arrow keys, Home/End, roving tabindex, panel show/hide |
| `data-at-menu` | trigger `button[aria-controls]` | `aria-haspopup="menu"`, `aria-expanded`, arrows, typeahead, Escape, outside click |
| `data-at-popover` | trigger `button[aria-controls]` | `aria-expanded`, focus into the popover, Escape, outside click, focus-out |
| `data-at-dialog` | trigger `button[aria-controls]` | `showModal()`, initial focus, focus return, backdrop click |
| `data-at-close` | buttons inside a dialog or popover | Closes the nearest one |
| `data-at-light="false"` | `<dialog>` | Disables close on backdrop click |
| `data-at-switch` | `button[role=switch]` | Toggles `aria-checked`, fires `at:change` |
| `data-at-tooltip="text"` | any focusable element | Creates `role=tooltip`, links it with `aria-describedby` |
| `data-at-disclosure` | trigger `button[aria-controls][aria-expanded]` | Toggles `aria-expanded` and the panel's `hidden` |
| `data-at-theme` | a button | Cycles light / dark / system, persists in `localStorage` |
| `data-at-dismiss` | a button | Removes the closest `.at-alert`, `.at-toast` or `.at-banner` |
| `data-at-sort` | `button.at-table__sort` inside `th` | Toggles `aria-sort`, announces the result |

APIs: `Atlas.toast({ title, body, variant, timeout })` and `Atlas.announce(text, "polite" | "assertive")`.
`announce` writes into a visually hidden `aria-live` region it creates on first use (one per politeness),
clearing it first so the same message is read twice if needed.

---

## Field

**Use when** one control needs a label, optional hint and an error. **Don't** use a placeholder as the label.

**Anatomy & variants**

| Part | Class | Notes |
|---|---|---|
| Wrapper | `.at-field` | Column, gap 6 |
| Label | `.at-field__label` (`<label for>`) | 14/500, always visible |
| Required mark | `.at-field__required` (`aria-hidden`) + `.at-sr-only` "(required)" | The asterisk alone is not announced |
| Optional mark | `.at-field__optional` | Prefer marking optional when most fields are required |
| Hint | `.at-field__hint` | 14, secondary; linked by `aria-describedby` |
| Error | `.at-field__error` | Icon + text, danger-text; replaces or follows the hint |
| Counter | `.at-field__count` | "n / max characters", linked by `aria-describedby` |
| Inline | `.at-field--inline` | Label beside the control (short fields) |

**States** default · focus (ring on `:focus`) · invalid (`aria-invalid="true"`: 2px danger border + error row) ·
disabled · read-only (sunken fill).

**Markup**
```html
<div class="at-field">
  <label class="at-field__label" for="in-3">Username</label>
  <input class="at-input" id="in-3" type="text" value="neelesh" aria-invalid="true" aria-describedby="in-3-err" autocomplete="username">
  <p class="at-field__error" id="in-3-err"><svg class="at-icon" aria-hidden="true" focusable="false">…</svg>That username is already taken. Try neelesh-c.</p>
</div>
```

**Keyboard** native control only (Tab in, type, Tab out).

**Accessibility** `label[for]` gives the name (4.1.2 Name, Role, Value). Hint, counter and error are referenced
through `aria-describedby`, so they are read after the name (1.3.1 Info and Relationships). The error says what
is wrong and how to fix it (3.3.1 Error Identification, 3.3.3 Error Suggestion). `autocomplete` tokens are set
for personal data (1.3.5 Identify Input Purpose). The required state is conveyed by `required` plus text, never
by the asterisk colour alone (1.4.1 Use of Color).

**Do** keep labels short and above the control; put units in an input-group addon or the hint.
**Don't** clear the field on error, hide the label on focus, or rely on `title`.

## Fieldset

**Use when** several related controls share one question (checkbox or radio groups, address blocks).

| Part | Class | Notes |
|---|---|---|
| Group | `.at-fieldset` (`<fieldset>`) | Border and padding removed, column gap 4 |
| Question | `.at-fieldset__legend` (`<legend>`) | 14/500; `.at-sr-only` when the question is visually obvious |
| Row layout | `.at-fieldset--row` | Wraps options horizontally, gap 8 × 24 |

**Markup**
```html
<fieldset class="at-fieldset at-fieldset--row">
  <legend class="at-fieldset__legend">Tenure</legend>
  <label class="at-choice"><input class="at-choice__control" type="radio" name="tenure" checked><span class="at-choice__text">12 months</span></label>
  <label class="at-choice"><input class="at-choice__control" type="radio" name="tenure"><span class="at-choice__text">24 months</span></label>
</fieldset>
```

**Keyboard** radios: Tab to the group, arrows move and select. Checkboxes: Tab between, Space toggles.

**Accessibility** The legend is read with each option (1.3.1). A group-level error goes on the fieldset via
`aria-describedby` or in the error summary. **Don't** use a heading instead of a legend; the audit warns on
unnamed groups.

## Form

**Use when** composing fields into a submission. Max width 560 so labels and inputs stay close.

| Part | Class | Notes |
|---|---|---|
| Form | `.at-form` | Column, gap 20 |
| Row | `.at-form__row` | `auto-fit` grid, 200px minimum, wraps on narrow screens |
| Actions | `.at-form__actions` (`--end` to right-align) | Primary first; full-width on phones |
| Error summary | `.at-alert.at-alert--danger.at-form__summary` with `role="alert" tabindex="-1"` | Links to each invalid field |

**Error summary pattern** On submit with errors: show the summary at the top, move focus to it
(`summary.focus()`), list each problem as a link to the field (`href="#f-name"`), and set `aria-invalid` and
`aria-describedby` on the fields. Keep the summary until the next submit. On success, announce it with
`Atlas.announce` or a status alert and move focus to the result.

**Markup**
```html
<form class="at-form" novalidate>
  <div class="at-alert at-alert--danger at-form__summary" id="form-summary" role="alert" tabindex="-1" hidden>
    <svg class="at-icon at-alert__icon" aria-hidden="true" focusable="false">…</svg>
    <div class="at-alert__body"><strong class="at-alert__title">2 fields need attention</strong>
      <ul><li><a class="at-link" href="#f-name">Full name is required</a></li></ul></div>
  </div>
  <div class="at-form__row"> …two .at-field… </div>
  <div class="at-form__actions"><button type="submit" class="at-btn at-btn--lg">Start SIP</button><button type="button" class="at-btn at-btn--secondary at-btn--lg">Save draft</button></div>
</form>
```

**Keyboard** Enter submits from any text input; Tab order follows source order.

**Accessibility** 3.3.1, 3.3.3 (summary + per-field messages), 3.3.4 Error Prevention for financial submissions
(confirm step or reversible action), 3.3.7 Redundant Entry (prefill what the user already gave), 3.3.8
Accessible Authentication (paste allowed, no cognitive tests), 2.4.3 Focus Order (focus lands on the summary).
Use `novalidate` and your own messages so they are consistent and linked.

**Do** one primary action per form; keep destructive actions out of the actions row. **Don't** disable the
submit button to signal errors; submit, then explain.

## Card

**Use when** grouping related content on the canvas. A card is a container, not a control.

| Variant | Class | Notes |
|---|---|---|
| Default | `.at-card` | Surface, 1px subtle border, radius 16, padding 20 |
| Raised | `.at-card--raised` | Raised surface + shadow md (menus, popovers, pinned panels) |
| Sunken | `.at-card--sunken` | Group background, no border |
| Compact | `.at-card--compact` | Padding 16, radius 12 |
| Header | `.at-card__header` > `.at-card__title` (`h3`) + `.at-card__subtitle` | Title 18/600 |
| Footer | `.at-card__footer` | Right-aligned actions above a top rule |
| Interactive | `.at-card--interactive` + `.at-card__stretch` + `.at-card__actions` | See below |

**Interactive card** One real `<a class="at-card__stretch">` (the title) is stretched over the card with a
`::after` overlay. Secondary controls sit in `.at-card__actions`, which is layered above the overlay. The card
shows the focus ring via `:has(.at-card__stretch:focus-visible)`; the link's own ring is suppressed.

**Markup**
```html
<article class="at-card at-card--interactive">
  <div class="at-card__header">
    <div><h3 class="at-card__title"><a class="at-card__stretch" href="/lease/1">Lease: 10g at 4.2% p.a.</a></h3><p class="at-card__subtitle">Matures 14 Mar 2027</p></div>
    <div class="at-card__actions"><button type="button" class="at-btn at-btn--tertiary at-btn--sm at-btn--icon" aria-label="More actions for lease">…</button></div>
  </div>
  <p class="at-body-sm at-text-secondary">Yield paid monthly in grams.</p>
</article>
```

**Keyboard** Tab reaches the title link, then the action buttons. Enter follows the link.

**Accessibility** The card is never focusable itself; one link means one tab stop and one accessible name
(2.4.4 Link Purpose). The whole card is the hit area (2.5.8 Target Size). Icon-only actions name their object
("More actions for lease"). Use `<article>` when the card is a self-contained item in a feed, `<div>` otherwise.

**Don't** nest a card in a card, put `onclick` on the card element, or make the whole card a `<button>`.

## Alert

**Use when** feedback belongs next to the thing it is about and should stay until resolved.

| Variant | Class | Role | Icon colour |
|---|---|---|---|
| Info (default) | `.at-alert` | `role="status"` | info |
| Success | `.at-alert--success` | `role="status"` | success |
| Warning | `.at-alert--warning` | `role="alert"` when action is needed now, else status | warning |
| Danger | `.at-alert--danger` | `role="alert"` | danger |
| Neutral | `.at-alert--neutral` | `role="status"` or none | secondary text |

Parts: `.at-alert__icon` · `.at-alert__body` > `.at-alert__title` · `.at-alert__actions` · `.at-alert__close`
(icon button, `aria-label="Dismiss"`, `data-at-dismiss`).

**Markup**
```html
<div class="at-alert at-alert--warning" role="alert">
  <svg class="at-icon at-alert__icon" aria-hidden="true" focusable="false">…</svg>
  <div class="at-alert__body"><strong class="at-alert__title">Bank mandate expires in 3 days</strong>Renew it to keep your SIP running.
    <div class="at-alert__actions"><button type="button" class="at-btn at-btn--sm">Renew mandate</button></div></div>
</div>
```

**Keyboard** only the buttons inside are focusable.

**Accessibility** Icon + title carry the type, not just colour (1.4.1). `role="status"` is polite,
`role="alert"` is assertive: use alert only for errors and time-critical warnings (4.1.3 Status Messages).
An alert that is in the DOM on page load is not announced; inject it or toggle `hidden` to trigger. Text uses
`text-primary` on the tinted `*-bg`, verified ≥ 7:1 in both themes.

**Don't** auto-dismiss alerts, stack more than one per region, or use an alert for a page-level notice (use a
banner).

## Banner

**Use when** a notice applies to the whole page or session (maintenance, market closed, cookie consent).
Sits above the navbar.

| Variant | Class | Notes |
|---|---|---|
| Default | `.at-banner` | Inverse surface, inverse text |
| Brand | `.at-banner--brand` | Brand fill, on-brand text |
| Warning | `.at-banner--warning` | Warning tint, warning text, bottom rule |

Parts: `.at-banner__body` (flex 1), optional `.at-link` (inherits colour) and a dismiss or action button with
`data-at-dismiss`.

**Markup**
```html
<div class="at-banner" role="status"><span class="at-banner__body">Markets are closed today. Orders queue for 09:00 IST.</span><button type="button" class="at-btn at-btn--sm at-btn--secondary" data-at-dismiss>Got it</button></div>
```

**Accessibility** Same roles as alert. Keep it first in source order so screen reader users meet it before
the navigation; the skip link still comes first. Do not make it sticky over content on phones (1.4.10 Reflow,
2.4.11 Focus Not Obscured).

## Toast

**Use when** confirming a background result that needs no response ("Order placed"). Errors the user must act
on persist; everything else can live inline instead.

| Part | Class / API | Notes |
|---|---|---|
| Region | `.at-toast-region` | Fixed bottom-end, `aria-live="polite"`, `aria-label="Notifications"`, created by the script |
| Toast | `.at-toast` + `--success` `--warning` `--danger` | `role="status"`, or `role="alert"` for danger |
| Parts | `.at-toast__icon` `.at-toast__body` `.at-toast__title` `.at-toast__text` `.at-toast__close` | The close button is labelled "Dismiss notification" |

**API** `Atlas.toast({ title, body, variant = "info", timeout })`. Default timeout 7000 ms; `danger` defaults
to 0 (never auto-dismisses). Hover or focus pauses the timer; leaving restarts it. A visually hidden prefix
("Success: ", "Error: ") is read before the title.

```js
Atlas.toast({ title: "Order placed", body: "2g gold at ₹7,412/g", variant: "success" });
Atlas.toast({ title: "Could not save", body: "Check your connection.", variant: "danger" });
```

**Keyboard** Toasts never steal focus. Tab reaches the dismiss button in DOM order; Escape is not global.

**Accessibility** One live region, additions only, so each toast is announced once (4.1.3). Timing is
adjustable by pausing on hover/focus and errors persist (2.2.1 Timing Adjustable). Enter/exit animations
collapse under reduced motion (2.3.3). The region is `pointer-events: none`; each toast re-enables them.

**Don't** put the only path to an action in a toast, show more than three at once, or toast on every keystroke.

## Dialog

**Use when** the user must finish or cancel a short task before continuing. Native `<dialog>` with
`showModal()` gives focus trapping, inert background and Escape for free.

| Part | Class | Notes |
|---|---|---|
| Dialog | `.at-dialog` (`<dialog>`) | 560 wide, radius 24, raised surface, backdrop = overlay token |
| Sizes | `.at-dialog--sm` (420) · `.at-dialog--lg` (800) | Confirmations use `--sm` |
| Header | `.at-dialog__header` > `.at-dialog__title` (`h2`) + close icon button | Title 22/600 |
| Body | `.at-dialog__body` | Scrolls when tall, secondary text colour |
| Footer | `.at-dialog__footer` | Right-aligned, wraps on phones; cancel before confirm |

**Hooks** Trigger: `<button aria-controls="dlg-1" data-at-dialog>` (script adds `aria-haspopup="dialog"`).
Close: any `[data-at-close]` inside. Initial focus: the element with `autofocus`, else the first focusable.
Backdrop click closes unless the dialog has `data-at-light="false"`. On close, focus returns to the trigger.

**Confirm pattern** `role="alertdialog"` + `aria-describedby` on the message. `autofocus` goes on the safe
button ("Keep SIP"); the destructive button is `.at-btn--danger` and last.

**Markup**
```html
<button type="button" class="at-btn" aria-controls="dlg-1" data-at-dialog>Open dialog</button>
<dialog class="at-dialog" id="dlg-1" aria-labelledby="dlg-1-t" aria-describedby="dlg-1-d">
  <div class="at-dialog__header"><h2 class="at-dialog__title" id="dlg-1-t">Set up auto-invest</h2><button type="button" class="at-btn at-btn--tertiary at-btn--sm at-btn--icon" aria-label="Close" data-at-close>…</button></div>
  <div class="at-dialog__body"><p id="dlg-1-d">Choose how much to invest every month.</p> …field with autofocus… </div>
  <div class="at-dialog__footer"><button type="button" class="at-btn at-btn--secondary" data-at-close>Cancel</button><button type="button" class="at-btn" data-at-close>Save</button></div>
</dialog>
```

**Keyboard**

| Key | Action |
|---|---|
| Tab / Shift+Tab | Cycles inside the dialog (native trap) |
| Escape | Closes, focus returns to the trigger |
| Enter | Activates the focused button, or submits a form inside |

**Accessibility** `aria-labelledby` on the title and `aria-describedby` on the lead text (4.1.2). Focus moves
in on open and back on close (2.4.3 Focus Order). The page behind is inert (2.1.2 No Keyboard Trap is met
because Escape and the close button always work). The heading inside is an `h2` regardless of page position;
the audit tolerates this because dialogs are out of the page outline.

**Don't** open a dialog on page load, nest dialogs, or use one for content that could be inline. Dialogs need
`data-at-light="false"` when backdrop clicks would lose unsaved work.

## Drawer

**Use when** a side task needs more room than a popover (filters, detail panel, mobile navigation). It is a
dialog anchored to an edge, so everything from **Dialog** applies.

| Variant | Class | Notes |
|---|---|---|
| End (default) | `.at-dialog.at-drawer` | 420 wide, full height, slides in from the right |
| Start | `.at-drawer--start` | From the left |
| Bottom | `.at-drawer--bottom` | Sheet, max 85% height, top radius 24 |

**Markup**
```html
<dialog class="at-dialog at-drawer" id="drw-1" aria-labelledby="drw-1-t">
  <div class="at-dialog__header"><h2 class="at-dialog__title" id="drw-1-t">Filters</h2><button … aria-label="Close filters" data-at-close>…</button></div>
  <div class="at-dialog__body"> …fieldset… </div>
  <div class="at-dialog__footer"><button type="button" class="at-btn at-btn--secondary" data-at-close>Reset</button><button type="button" class="at-btn" data-at-close>Apply</button></div>
</dialog>
```

**Accessibility** Same as dialog. The slide animation is a transform under `--at-duration-slow`, collapsed by
reduced motion. Bottom sheets must not be the only way to reach content (2.5.7 Dragging Movements: no
drag-to-dismiss without a button).

## Popover

**Use when** a small, non-modal surface with rich content or a control should open from a trigger (help
text with a link, a quick form). For hover-only help use a tooltip (`atoms.md`).

| Part | Class | Notes |
|---|---|---|
| Anchor | `.at-anchor` | `position: relative` wrapper around trigger + popover |
| Trigger | `button[aria-controls][data-at-popover]` | Script manages `aria-expanded` |
| Surface | `.at-popover` (`role="dialog"` + `aria-labelledby`) | 240–360 wide, raised, shadow lg, `hidden` when closed |

**Markup**
```html
<span class="at-anchor">
  <button type="button" class="at-btn at-btn--tertiary" aria-controls="pop-1" data-at-popover>What is a lease?</button>
  <div class="at-popover" id="pop-1" role="dialog" aria-labelledby="pop-1-t" hidden>
    <h3 class="at-h4" id="pop-1-t">Gold lease</h3>
    <p class="at-body-sm at-text-secondary">You lend gold to vetted jewellers and earn yield in grams.</p>
    <div class="at-inline"><a class="at-link at-link--standalone" href="/lease">Learn more</a><button type="button" class="at-btn at-btn--sm at-btn--secondary" data-at-close>Close</button></div>
  </div>
</span>
```

**Keyboard**

| Key | Action |
|---|---|
| Enter / Space on trigger | Opens, focus moves to the first focusable element (or the surface) |
| Escape | Closes, focus returns to the trigger |
| Tab out of the surface | Closes without moving focus back |

Outside pointer-down also closes it.

**Accessibility** `aria-expanded` on the trigger (4.1.2). Content is in the DOM right after the trigger, so
screen reader reading order matches (1.3.2). It is dismissible, hoverable and persistent (1.4.13). Use
`role="dialog"` only when there is a heading to label it; otherwise leave the role off and treat it as a
disclosure.

**Don't** put the trigger's own description in the popover (that is a tooltip), or trap focus (that is a dialog).

## Menu

**Use when** a button opens a list of actions. For navigation use links, for choosing a value use a select.

| Part | Class | Role |
|---|---|---|
| Trigger | `button#id[aria-controls][data-at-menu]` | script sets `aria-haspopup="menu"`, `aria-expanded` |
| List | `.at-menu` (`ul`, `hidden`) + `--end` to right-align | `role="menu"` `aria-labelledby="trigger id"` |
| Item | `.at-menu__item` (`button` in `li[role=none]`) | `menuitem` · `menuitemcheckbox` · `menuitemradio` |
| Danger item | `.at-menu__item--danger` | danger text, danger tint on hover |
| Disabled item | `aria-disabled="true"` | Skipped by arrow keys, still visible |
| Separator | `li.at-menu__separator` (`role="none"`) | 1px rule |
| Group label | `.at-menu__group-label` | 12/600 uppercase, tertiary |
| Shortcut hint | `.at-kbd` inside the item | Pushed to the end |

**Markup**
```html
<span class="at-anchor">
  <button type="button" class="at-btn at-btn--secondary" id="menu-btn" aria-controls="menu-1" data-at-menu>Actions <svg class="at-icon at-icon--sm" aria-hidden="true" focusable="false">…</svg></button>
  <ul class="at-menu" id="menu-1" role="menu" aria-labelledby="menu-btn" hidden>
    <li role="none"><button type="button" class="at-menu__item" role="menuitem">Rename <kbd class="at-kbd">R</kbd></button></li>
    <li role="none"><button type="button" class="at-menu__item" role="menuitemcheckbox" aria-checked="true">Pin to top</button></li>
    <li role="none"><button type="button" class="at-menu__item" role="menuitem" aria-disabled="true">Archive</button></li>
    <li role="none" class="at-menu__separator"></li>
    <li role="none"><button type="button" class="at-menu__item at-menu__item--danger" role="menuitem">Delete</button></li>
  </ul>
</span>
```

**Keyboard** (APG menu button)

| Key | Action |
|---|---|
| Enter / Space / click on trigger | Opens, focus on first item |
| ↓ on trigger | Opens, first item · ↑ opens, last item |
| ↓ / ↑ | Next / previous item, wrapping |
| Home / End | First / last item |
| A–Z | Typeahead to the next item starting with the typed characters |
| Enter / Space | Activates; menuitem closes the menu, checkbox and radio toggle and stay open |
| Escape | Closes, focus returns to the trigger |
| Tab | Closes, focus moves on |

**Accessibility** Items are real buttons, so names come from content (4.1.2). `aria-checked` carries
checkbox/radio state; the check glyph is drawn from it. Focus styling uses the hover fill with an inset
outline, so it is visible inside the raised surface (2.4.7). Disabled items stay perceivable (`text-disabled`,
exempt from contrast) and are announced as unavailable.

**Don't** put links in a menu for page navigation (use a nav), exceed about eight items without groups, or
open on hover.

## Tabs

**Use when** switching between peer views of the same object. Each panel must make sense alone.

| Part | Class | Role |
|---|---|---|
| Wrapper | `.at-tabs[data-at-tabs]` | |
| List | `.at-tabs__list` | `role="tablist" aria-label` (`aria-orientation="vertical"` for ↑↓) |
| Tab | `.at-tabs__tab` (`button`) | `role="tab" id aria-controls aria-selected` |
| Panel | `.at-tabs__panel` | `role="tabpanel" id aria-labelledby` (+ `hidden`), `tabindex="0"` added by script |
| Pills | `.at-tabs--pills` | Pill tabs, selected = inverse fill |

Selected state: brand text + 2px underline + weight 600 (pills: inverse fill), never colour alone.

**Markup**
```html
<div class="at-tabs" data-at-tabs>
  <div class="at-tabs__list" role="tablist" aria-label="Portfolio views">
    <button type="button" class="at-tabs__tab" role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">Holdings</button>
    <button type="button" class="at-tabs__tab" role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false">Transactions</button>
  </div>
  <div class="at-tabs__panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">…</div>
  <div class="at-tabs__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>…</div>
</div>
```

**Keyboard** (APG tabs, automatic activation)

| Key | Action |
|---|---|
| Tab | Into the selected tab, then into the panel |
| ← / → (↑ / ↓ when vertical) | Previous / next tab, selects and shows its panel, wrapping |
| Home / End | First / last tab |

**Accessibility** One tab stop in the list (roving `tabindex`), `aria-selected` tracks state (4.1.2), panels
are labelled by their tab (1.3.1). The list scrolls horizontally with a thin scrollbar rather than wrapping or
clipping (1.4.10). Focus ring is inset so it is not cut by the list's scroll box.

**Don't** use tabs for sequential steps (stepper), for navigation between pages (links with
`aria-current`), or with more than about six tabs.

## Accordion and disclosure

**Use when** long, optional content can be collapsed. Accordion uses native `<details>`: zero script.

| Part | Class | Notes |
|---|---|---|
| Accordion | `.at-accordion` > `details.at-accordion__item` | Rules between items |
| Summary | `summary.at-accordion__summary` > `h3` + `.at-accordion__chevron` | Heading goes inside the summary |
| Content | `.at-accordion__content` | Secondary text |
| Disclosure trigger | `button.at-disclosure__trigger[aria-expanded][aria-controls][data-at-disclosure]` | Inline "Show more" |

**Markup**
```html
<div class="at-accordion">
  <details class="at-accordion__item" open>
    <summary class="at-accordion__summary"><h3>How is the gold stored?</h3><svg class="at-icon at-accordion__chevron" aria-hidden="true" focusable="false">…</svg></summary>
    <div class="at-accordion__content">In insured vaults operated by a licensed custodian.</div>
  </details>
</div>
<button type="button" class="at-disclosure__trigger" aria-expanded="false" aria-controls="disc-1" data-at-disclosure>Show advanced options <svg …></svg></button>
<div id="disc-1" hidden>…</div>
```

**Keyboard** Tab to the summary or trigger; Enter or Space toggles. Chevron rotation is decorative.

**Accessibility** `<summary>` is exposed as a button with expanded state (4.1.2). The heading inside keeps the
page outline navigable by heading (1.3.1, 2.4.6); choose its level to fit the page. Disclosure uses
`aria-expanded` + `hidden` (4.1.2). Summaries are 48 tall (2.5.8).

**Don't** put interactive controls inside a summary, auto-collapse siblings (it removes user control), or
hide required form fields behind a disclosure.

## Breadcrumb

| Part | Class | Notes |
|---|---|---|
| Landmark | `nav[aria-label="Breadcrumb"]` > `ol.at-breadcrumb` | Ordered list, "/" separators from CSS |
| Link | `a` | Secondary text, underline on hover, 24 min height |
| Current | `span[aria-current="page"]` | Primary text, 500, not a link |

```html
<nav aria-label="Breadcrumb"><ol class="at-breadcrumb"><li><a href="/">Home</a></li><li><a href="/portfolio">Portfolio</a></li><li><span aria-current="page">SIP #2049</span></li></ol></nav>
```

**Accessibility** The list structure gives the count and position (1.3.1), `aria-current` marks the page
(2.4.8 Location, AAA but cheap). Separators are CSS `::before`, so they are not read. Truncate from the middle
on phones with an ellipsis item that links to the parent, never by hiding the current page.

## Pagination

| Part | Class | Notes |
|---|---|---|
| Landmark | `nav[aria-label="… pages"]` > `ul.at-pagination` | Label says what is paged |
| Page | `a` or `button`, 40×40 min, tabular numbers | `aria-current="page"` = inverse fill |
| Prev / next | `a[aria-label="Previous page"]` with an icon | `aria-disabled="true"` at the ends, kept in DOM |
| Gap | `span.at-pagination__ellipsis[aria-hidden]` | Not focusable |

```html
<nav aria-label="Transactions pages"><ul class="at-pagination">
  <li><a href="?page=1" aria-disabled="true" aria-label="Previous page">…</a></li>
  <li><a href="?page=1" aria-current="page">1</a></li><li><a href="?page=2">2</a></li>
  <li><span class="at-pagination__ellipsis" aria-hidden="true">…</span></li><li><a href="?page=12">12</a></li>
  <li><a href="?page=2" aria-label="Next page">…</a></li>
</ul></nav>
```

**Accessibility** Links expose the page number as their name (2.4.4); the current one is both filled and
marked (1.4.1). Targets are 40 px with 4 px gaps (2.5.8). After a page change, move focus to the results
heading or announce "Page 2 of 12" with `Atlas.announce`.

## Stepper

| Part | Class | Notes |
|---|---|---|
| List | `ol.at-stepper[aria-label]` | Counter-numbered, flex row |
| Item | `li.at-stepper__item` + `.is-complete` or `aria-current="step"` | |
| Bar | `.at-stepper__bar` (`aria-hidden`) | Brand when complete or current |
| Label | `.at-stepper__label` | Number badge from `counter`, check mark when complete |

State words live in `.at-sr-only` inside the label: ", completed" and ", current step".

```html
<ol class="at-stepper" aria-label="Onboarding progress">
  <li class="at-stepper__item is-complete"><span class="at-stepper__bar" aria-hidden="true"></span><span class="at-stepper__label">KYC<span class="at-sr-only">, completed</span></span></li>
  <li class="at-stepper__item" aria-current="step"><span class="at-stepper__bar" aria-hidden="true"></span><span class="at-stepper__label">Bank mandate<span class="at-sr-only">, current step</span></span></li>
  <li class="at-stepper__item"><span class="at-stepper__bar" aria-hidden="true"></span><span class="at-stepper__label">First investment</span></li>
</ol>
```

**Mobile (≤ 639px)** Bars stay; only the current label is visible, the current item takes `flex: 3`, other
labels become screen-reader-only. The list still reads "3 of 4" through the `ol`.

**Accessibility** Progress is conveyed by number, check glyph, weight and sr text, not only colour (1.4.1).
It is not interactive; if steps are links, make the label an `a` and keep `aria-current="step"` on it.

## Segmented control

A radio group styled as a pill switcher, so keyboard, name and state are native.

| Part | Class | Notes |
|---|---|---|
| Group | `fieldset.at-fieldset` > `legend` (visible or `.at-sr-only`) > `.at-segmented` | |
| Option | `.at-segmented__option` > `input.at-segmented__input[type=radio]` + `label.at-segmented__label[for]` | Input is invisible over the label |

```html
<fieldset class="at-fieldset"><legend class="at-sr-only">Period</legend>
  <div class="at-segmented">
    <span class="at-segmented__option"><input class="at-segmented__input" type="radio" name="period" id="p1" checked><label class="at-segmented__label" for="p1">1M</label></span>
    <span class="at-segmented__option"><input class="at-segmented__input" type="radio" name="period" id="p2"><label class="at-segmented__label" for="p2">6M</label></span>
  </div>
</fieldset>
```

**Keyboard** Tab to the group, ← → ↑ ↓ move and select, Space selects.

**Accessibility** Checked = raised fill + weight 600 + shadow (1.4.1). The focus ring is drawn on the label via
`:focus-visible +` (2.4.7). Options are 34 tall inside a 40 track; add `.at-btn--lg`-style padding for
touch-first screens. Use for 2–5 short options that change a view immediately; use radios with
`.at-choice` for form choices.

## Table

| Part | Class | Notes |
|---|---|---|
| Wrapper | `.at-table-wrap[role="region"][aria-labelledby][tabindex="0"]` | Horizontal scroll, positioned so sr text stays clipped |
| Table | `table.at-table` + `--dense` | 14px, hover row tint |
| Caption | `caption#id` | Names the region and the table; `.at-sr-only` if visually redundant |
| Header | `th[scope="col"]` / `th[scope="row"]` | 12/600, sunken fill |
| Sortable | `th[aria-sort]` > `button.at-table__sort[data-at-sort]` + arrow icon | Script toggles `aria-sort` and announces |
| Numeric | `.is-numeric` on `th` and `td` | Right-aligned, tabular |
| Selected row | `tr[aria-selected="true"]` | Selected tint |
| Actions column | `th` with `.at-sr-only` text, row buttons with `aria-label="View transaction from …"` | |

```html
<div class="at-table-wrap" role="region" aria-labelledby="tbl-cap" tabindex="0">
  <table class="at-table">
    <caption id="tbl-cap">Recent transactions</caption>
    <thead><tr>
      <th scope="col" aria-sort="descending"><button type="button" class="at-table__sort" data-at-sort>Date <svg class="at-icon" aria-hidden="true" focusable="false">…</svg></button></th>
      <th scope="col" class="is-numeric">Amount</th>
      <th scope="col"><span class="at-sr-only">Actions</span></th>
    </tr></thead>
    <tbody><tr><td>18 Oct 2026</td><td class="is-numeric">₹5,000.00</td><td><button type="button" class="at-btn at-btn--tertiary at-btn--sm" aria-label="View transaction from 18 Oct 2026">View</button></td></tr></tbody>
  </table>
</div>
```

**Keyboard** Tab to the wrapper (scrollable with arrows), then through sort buttons and row controls in
reading order. Enter/Space on a sort button toggles ascending/descending.

**Accessibility** Caption + scopes give cell context (1.3.1). The wrapper is a named, focusable region so
keyboard users can scroll wide tables (2.1.1) and it never widens the page (1.4.10). `aria-sort` reflects the
active column and the change is announced (4.1.3). Status cells use badges with a dot and a word (1.4.1).
Row actions name their row so "View" is unambiguous out of context (2.4.4).

**Don't** use a table for layout, hide columns without an alternative, or make rows clickable without a link.

## List

| Part | Class | Notes |
|---|---|---|
| List | `ul.at-list` | No bullets |
| Row | `.at-list__item` as `li`, or `a` / `button` inside `li` for interactive rows | 56 min height, rule between rows |
| Parts | `.at-list__body` > `.at-list__title` + `.at-list__meta` · `.at-list__end` | Leading avatar/icon optional |

```html
<ul class="at-list">
  <li><a class="at-list__item" href="/asset/gold"><span class="at-avatar at-avatar--sm" aria-hidden="true">Au</span><span class="at-list__body"><span class="at-list__title">Gold 24K</span><span class="at-list__meta">per gram</span></span><span class="at-list__end"><span class="at-tabular">₹7,412</span><br><span class="at-body-sm at-text-success">▲ 0.4%</span></span></a></li>
</ul>
```

**Accessibility** Interactive rows are single links or buttons whose name is the whole row text (2.4.4), 56 px
tall (2.5.8). Trend glyphs (▲ ▼) carry direction with the colour (1.4.1). Keep one control per row; secondary
actions go in a menu or a detail page.

## Stat

| Part | Class | Notes |
|---|---|---|
| Wrapper | `.at-stat` | Column, gap 4 |
| Label | `.at-stat__label` | 14/500 secondary |
| Value | `.at-stat__value` (+ `<small>` unit) | 28/600 tabular; unit 60% secondary |
| Delta | `.at-stat__delta` + `--up` / `--down` with icon + `.at-sr-only` "Up"/"Down" | Sign in the text |

```html
<div class="at-stat"><span class="at-stat__label">Gold holdings</span><span class="at-stat__value">42.18<small>g</small></span>
  <span class="at-stat__delta at-stat__delta--up"><svg class="at-icon" aria-hidden="true" focusable="false">…</svg><span class="at-sr-only">Up</span> +2.4% this month</span></div>
```

**Accessibility** The delta is readable as "Up +2.4% this month": arrow, sign and word, so colour-blind users and
screen readers get the direction (1.4.1). Values use `font-variant-numeric: tabular-nums` so columns align.
Mark decorative sparklines `aria-hidden` and give the number in text.

## Empty state

| Part | Class | Notes |
|---|---|---|
| Wrapper | `.at-empty` | Centred, padding 40 |
| Icon | `.at-empty__icon` (`aria-hidden` svg inside) | 56 circle, sunken |
| Title | `h3.at-empty__title` | 18/600 |
| Body | `p.at-body-sm` | One sentence: what this is and why it is empty |
| Actions | `.at-empty__actions` | One primary, one tertiary at most |

```html
<div class="at-empty">
  <span class="at-empty__icon"><svg class="at-icon at-icon--lg" aria-hidden="true" focusable="false">…</svg></span>
  <h3 class="at-empty__title">No leases yet</h3>
  <p class="at-body-sm">Lease your gold to earn up to 4.2% a year, paid in grams.</p>
  <div class="at-empty__actions"><button type="button" class="at-btn">Start a lease</button><button type="button" class="at-btn at-btn--tertiary">How it works</button></div>
</div>
```

**Accessibility** The title is a real heading so the state is findable (2.4.6). Do not announce empty states
as alerts; they are content. For a filtered-to-empty result, add "Clear filters" as the primary action.

## Shell, navigation and layout

| Part | Class | Landmark |
|---|---|---|
| Skip link | `a.at-skip-link[href="#main"]` first in `<body>` | 2.4.1 Bypass Blocks |
| Shell | `.at-shell` (`header / main / footer` rows) · `.at-shell--sidebar` (260 + 1fr, collapses ≤ 1023) | |
| Navbar | `header.at-navbar` > `.at-navbar__brand` · `nav[aria-label]` > `ul.at-navbar__links` · `.at-navbar__spacer` · `.at-navbar__actions` | banner + navigation |
| Side nav | `nav.at-sidenav` > `ul.at-sidenav__group` with `li.at-sidenav__label` headings | navigation |
| Search | `form.at-search[role="search"]` | search |
| Main | `main#main.at-main[tabindex="-1"]` | main (exactly one) |
| Theme | `button[data-at-theme]` with `[data-at-theme-label]` | Cycles light / dark / system, announces |
| Container | `.at-container` (max 1200, gutter 20 / 16 on phones) | |
| Stack | `.at-stack` + `--sm` `--lg` | Column gaps 8 / 16 / 32 |
| Inline | `.at-inline` + `--between` | Wrapping row, gap 12 |
| Grid | `.at-grid` | `auto-fit` 240 min; children get `min-width: 0` |

Current page: `a[aria-current="page"]` in navbar links (sunken fill + 2px brand underline) and sidenav
(brand tint + 3px brand bar).

```html
<a class="at-skip-link" href="#main">Skip to content</a>
<header class="at-navbar">
  <a class="at-navbar__brand" href="/" aria-label="Atlas home">…</a>
  <nav aria-label="Primary"><ul class="at-navbar__links"><li><a href="/" aria-current="page">Home</a></li></ul></nav>
  <span class="at-navbar__spacer"></span>
  <div class="at-navbar__actions"><button type="button" class="at-btn at-btn--secondary at-btn--sm" data-at-theme>…<span data-at-theme-label>System</span></button></div>
</header>
<main id="main" class="at-main" tabindex="-1">…</main>
```

**Keyboard** Skip link is the first Tab stop and jumps to `#main` (which has `tabindex="-1"` so it takes
focus). Nav links are 40 tall; brand link 44.

**Accessibility** One of each: banner, main, contentinfo; every `nav` gets an `aria-label` once there is more
than one (1.3.1, 2.4.1). Navigation order and names are the same on every page (3.2.3 Consistent
Navigation, 3.2.4 Consistent Identification). The sticky navbar is 56–64 px, so focused elements are not
hidden behind it (2.4.11 Focus Not Obscured) thanks to `scroll-margin` on sections. On phones the link row
hides; provide a drawer (see **Drawer**) opened by a labelled menu button, not a hover menu. The theme
toggle's name includes the current mode ("Theme: dark. Switch theme") and the change is announced.

**Don't** put more than one `main`, use `div`s for landmarks, or set `tabindex` on the shell.

---

## Later phase

Not in v1 on purpose. When added, follow the named APG pattern and reuse the atoms and tokens above.

| Component | APG pattern | Notes |
|---|---|---|
| Combobox / autocomplete | Combobox with listbox popup | `aria-expanded`, `aria-activedescendant`, announce result counts |
| Date picker | Dialog (modal) + grid | Always keep a typed-date input as the primary path |
| Data grid | Grid | Arrow-key cell navigation, one tab stop, `aria-rowcount` for virtualised rows |
| Tree view | Tree view | `aria-expanded` per node, typeahead |
| Carousel | Carousel | Pause control, no auto-advance under reduced motion, slides as a list |
| Rich text editor | Toolbar + `role="textbox"` with `aria-multiline` | Toolbar is one tab stop with arrows |
