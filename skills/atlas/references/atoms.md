# Atoms

The smallest Atlas parts: one native element (or one ARIA role) plus the classes in
`assets/css/atlas.css` sections 1–5. Every atom keeps its native semantics, shows the shared two-tone
focus ring, is at least 24×24 CSS px, and carries state through more than colour. Colour comes only
from the semantic tokens in `foundations.md`; the ratios quoted below are the proven pairings from
`contrast-report.md` (light / dark). Composites built from these live in `components.md`; the
general rules are in `accessibility.md`.

| Atom | Class | Native element | Key WCAG 2.2 criteria |
|---|---|---|---|
| Typography | `.at-display` `.at-h1`…`.at-h4` `.at-body*` `.at-label` `.at-caption` `.at-code` | `h1`–`h4`, `p`, `code` | 1.4.4, 1.4.8, 1.4.12 |
| Icon | `.at-icon` `--sm` `--lg` | inline `svg` | 1.1.1 |
| Button | `.at-btn` + variants | `button` | 2.4.7, 2.5.8, 4.1.2 |
| Link | `.at-link` `--standalone` | `a[href]` | 1.4.1, 2.4.4 |
| Input, textarea, select | `.at-input` `.at-textarea` `.at-select` | `input`, `textarea`, `select` | 1.3.5, 1.4.11, 3.3.1, 3.3.2 |
| Input group | `.at-input-group` | `div` wrapper | 1.3.1 |
| Checkbox, radio | `.at-choice` + `.at-choice__control` | `input[type=checkbox|radio]` | 1.3.1, 2.5.8, 4.1.2 |
| Switch | `.at-switch` | `button[role=switch]` | 4.1.2 |
| Range | `.at-range` | `input[type=range]` | 1.3.1, 4.1.2 |
| Badge | `.at-badge` + variants | `span` | 1.4.1 |
| Tag | `.at-tag` | `span` or `button` | 2.5.8, 4.1.2 |
| Avatar | `.at-avatar` | `img` or `span[role=img]` | 1.1.1 |
| Divider | `.at-divider` | `hr` or `div[role=separator]` | 1.3.1 |
| Spinner | `.at-spinner` | `span` in `[role=status]` | 2.3.3, 4.1.3 |
| Progress | `.at-progress` | `progress` or `div[role=progressbar]` | 4.1.2 |
| Skeleton | `.at-skeleton` | `aria-hidden` `span` | 2.3.3 |
| Kbd | `.at-kbd` | `kbd` | 1.3.1 |
| Tooltip | `data-at-tooltip` → `.at-tooltip` | `div[role=tooltip]` | 1.4.13 |
| Screen-reader only, skip link | `.at-sr-only` `.at-skip-link` | `span`, `a` | 2.4.1 |

---

## Typography

**Use when** setting any text. **Don't** set `font-size` in px or below `caption` (12px).

**Anatomy and variants**

| Class | Size / line / weight | Role |
|---|---|---|
| `.at-display` | 3rem / 1.1 / 700 | Marketing hero, one per page |
| `.at-h1` | 2.25rem / 1.2 / 700 | Page title, one per page |
| `.at-h2` | 1.75rem / 1.25 / 600 | Section |
| `.at-h3` | 1.375rem / 1.3 / 600 | Card, dialog title |
| `.at-h4` | 1.125rem / 1.4 / 600 | Subsection, card title |
| `.at-body-lg` | 1.125rem / 1.6 | Lead paragraph |
| `.at-body` | 1rem / 1.5 | Default copy (the `body` default) |
| `.at-body-sm` | 0.875rem / 1.5 | Secondary copy, table cells, hints |
| `.at-label` | 0.875rem / 1.4 / 500 | Form labels, button text |
| `.at-caption` | 0.75rem / 1.4, secondary colour | Metadata only, never instructions |
| `.at-code` | mono 0.875rem, sunken fill, subtle border | Inline code |
| `.at-text-secondary` `.at-text-tertiary` | colour only | Lower tiers |
| `.at-text-brand/success/warning/danger/info` | colour only | Always the `*-text` token |
| `.at-prose` | max-width 680px | Keeps lines near 70 characters |
| `.at-tabular` | `font-variant-numeric: tabular-nums` | Figures that align |

Headings use `text-wrap: balance`. Class and element are independent: an `h2` may carry `.at-h3`
when the visual size must drop but the outline level must not.

**Tokens** `--at-text-{scale}-size/line/weight/tracking`, `--at-text-primary/secondary/tertiary`,
`--at-font-sans`, `--at-font-mono`, `--at-container-prose`.

**Markup**
```html
<h1 class="at-h1">Page title</h1>
<p class="at-body-lg at-text-secondary at-prose">Lead paragraph.</p>
<p class="at-caption">Updated 2 min ago</p>
<code class="at-code">npm run build</code>
```

**Accessibility**
- Sizes are rem and line heights unitless, so browser zoom and font settings scale everything (1.4.4 Resize Text) and the 1.4.12 Text Spacing overrides fit.
- Contrast: primary 13.5:1 / 12.7:1, secondary 7.5:1 / 7.5:1, tertiary 5.4:1 / 6.2:1 on the surface; tertiary on sunken is 4.7:1 light (1.4.3, AAA 1.4.6 for primary and secondary).
- Heading levels follow document structure, never visual size (1.3.1, 2.4.6).

**Do** keep one `h1`; use `.at-prose` for reading content. **Don't** use caption for anything the user must act on; don't put the base status colour (`--at-success`) behind or on text.

---

## Icon

**Use when** an SVG supports a label or stands in for one. **Don't** use icon fonts.

| Class | Size | Stroke |
|---|---|---|
| `.at-icon--sm` | 16 | 2 |
| `.at-icon` | 20 | 1.75 |
| `.at-icon--lg` | 24 | 1.75 |

Stroke is `currentColor`, no fill, round caps and joins. `flex: none` so it never shrinks.

**Tokens** `--at-size-icon-sm/md/lg`.

**Markup**
```html
<!-- decorative, beside text -->
<svg class="at-icon at-icon--sm" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>
<!-- meaningful, on its own -->
<svg class="at-icon" viewBox="0 0 24 24" role="img" aria-label="Verified"><title>Verified</title>…</svg>
```

**Accessibility**
- Decorative: `aria-hidden="true"` and `focusable="false"` (1.1.1 Non-text Content). The audit flags any SVG that is neither hidden nor labelled.
- Meaningful: `role="img"` plus `aria-label` or `<title>`, or visible text next to it.
- Icon colour follows the text token, so it inherits the proven ratio. Status icons use the base token (`--at-success`), 5.4:1 / 6.1:1 on the surface (1.4.11 Non-text Contrast).

**Do** pair icons with words for status. **Don't** rely on an icon alone to convey an action.

---

## Button

**Use when** the action changes something on the page or app. **Don't** use a button to navigate; that is a link.

**Anatomy and variants**

| Class | Fill / text | Border |
|---|---|---|
| `.at-btn` (primary) | `brand` / `text-on-brand` | transparent |
| `.at-btn--secondary` | `bg-surface` / `text-primary` | `border-strong` |
| `.at-btn--tertiary` | transparent / `brand-text` | none |
| `.at-btn--danger` | `danger` / `text-on-brand` | transparent |
| `.at-btn--danger-secondary` | `bg-surface` / `danger-text` | `danger` |
| `.at-btn--sm` `--lg` | 32 / 48 tall (default 40) | |
| `.at-btn--icon` | square, no padding; needs `aria-label` | |
| `.at-btn--pill` | full radius | |
| `.at-btn--block` | full width | |
| `.at-btn-group` | wrap with 8px gap | |
| `.at-btn-group--attached` | joined, inner radii removed, focused button raised | |

Label is 14px/600 (`body` 16px at `--lg`), gap 8 to an icon, radius 8, 1px transparent border so
forced-colours mode draws an edge.

**States**

| State | Markup | Visual |
|---|---|---|
| Hover / active | `:hover` `:active` | `brand-hover`, `brand-active` |
| Disabled | `disabled` or `aria-disabled="true"` | `bg-disabled` / `text-disabled`, not-allowed cursor |
| Loading | `aria-busy="true"` | label turns transparent, spinner drawn in `::after`, pointer events off |
| Toggle | `aria-pressed="true|false"` | use on secondary buttons in a `role="group"` |

**Tokens** `--at-brand`, `--at-brand-hover/active`, `--at-brand-subtle(-hover)`, `--at-brand-text`,
`--at-danger(-hover/-active)`, `--at-danger-text`, `--at-bg-disabled`, `--at-text-disabled`,
`--at-size-control-sm/md/lg`, `--at-radius-md`, `--at-duration-fast`.

**Markup**
```html
<button type="button" class="at-btn">Primary</button>
<button type="button" class="at-btn at-btn--secondary at-btn--icon" aria-label="Edit">
  <svg class="at-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">…</svg>
</button>
<button type="button" class="at-btn" aria-busy="true">Saving</button>
<div class="at-btn-group at-btn-group--attached" role="group" aria-label="Text alignment">
  <button type="button" class="at-btn at-btn--secondary" aria-pressed="true">Left</button>
  <button type="button" class="at-btn at-btn--secondary" aria-pressed="false">Centre</button>
</div>
```

**Accessibility**
- Always `<button type="button">` (or `type="submit"` in a form). Name comes from the text; icon-only buttons need `aria-label` or `.at-sr-only` text (4.1.2 Name, Role, Value).
- Keyboard: Enter and Space activate, Tab moves. Focus ring is the global two-tone ring (2.4.7 Focus Visible, 2.4.11 Focus Not Obscured).
- Minimum 40×40 by default, 32 at `--sm` (above the 24×24 of 2.5.8 Target Size), 48 at `--lg` for touch-first screens.
- Contrast: `text-on-brand` on `brand` 5.4:1 / 8.0:1; on `danger` 5.4:1 / 8.0:1; secondary text 13.5:1 / 12.7:1; tertiary `brand-text` 7.5:1 / 7.5:1; secondary border 3.5:1 / 6.1:1 (1.4.11).
- Loading keeps the label in the DOM, so screen readers still read "Saving" and `aria-busy` reports the state.
- Disabled buttons are exempt from contrast (1.4.3) but keep `aria-disabled` when the reason is explained nearby, so they stay discoverable.

**Do** one primary per view; put the primary first in the DOM. **Don't** disable submit to indicate validation errors; let the user submit and show the error summary (`components.md`, Form).

---

## Link

**Use when** the action navigates (new URL, anchor, download). **Don't** style a link as a button for in-page actions.

| Class | Look |
|---|---|
| `.at-link` | `text-link`, underline 1px with 0.15em offset; 2px on hover |
| `.at-link--standalone` | no underline until hover, weight 500; for links outside running text |
| `[aria-current="page"]` | weight 600 |

**Tokens** `--at-text-link`, `--at-text-link-hover`, `--at-radius-sm` (ring corners).

**Markup**
```html
<p>Links inside text are <a class="at-link" href="/terms">underlined</a>.</p>
<a class="at-link at-link--standalone" href="/pricing">See pricing →</a>
```

**Accessibility**
- Underline in running text means colour is not the only cue (1.4.1 Use of Color); the audit also warns on "click here" style text (2.4.4 Link Purpose).
- Contrast: `text-link` 7.5:1 / 7.5:1 on surface; hover 10.2:1 / 9.8:1. Against body text the link is distinguishable by underline, so the 3:1 text-to-text rule is not needed.
- Inline links are exempt from 2.5.8; standalone links should sit in a 24px line box or more (the navbar and sidenav links are 40 tall).
- Opens in a new tab only when necessary, and then say so in the text or `aria-label`.

**Do** write the destination in the link text. **Don't** use `href="#"` with JavaScript; use a button.

---

## Input, textarea, select

**Use when** collecting a single value. **Don't** use placeholder as the only label.

**Anatomy and variants**

| Class | Notes |
|---|---|
| `.at-input` | 40 tall, padding 12, 1px `border-strong`, radius 8 |
| `.at-input--sm` `--lg` | 32 / 48 tall |
| `.at-textarea` | padding 8 12, min height 96, vertical resize |
| `.at-select` | native select, custom chevron (theme-aware data URI), right padding 40 |
| `.at-select--sm` `--lg` | 32 / 48 |

**States**

| State | Markup | Visual |
|---|---|---|
| Hover | `:hover` | border `text-secondary` |
| Focus | `:focus` (pointer and keyboard) | two-tone ring |
| Invalid | `aria-invalid="true"` + `aria-describedby` | 2px `danger` border |
| Disabled | `disabled` | `bg-disabled`, `text-disabled`, `border-default` |
| Read-only | `readonly` | `bg-sunken` |
| Placeholder | `placeholder` | `text-placeholder`, opacity 1 |

**Tokens** `--at-bg-surface`, `--at-border-strong`, `--at-text-primary`, `--at-text-placeholder`,
`--at-danger`, `--at-bg-disabled`, `--at-bg-sunken`, `--at-size-control-*`, `--at-size-border-strong`.

**Markup** (always inside a field; see `components.md`)
```html
<label class="at-field__label" for="email">Email</label>
<input class="at-input" id="email" type="email" autocomplete="email" placeholder="you@example.com">

<input class="at-input" id="user" type="text" aria-invalid="true" aria-describedby="user-err">
<p class="at-field__error" id="user-err">…That username is already taken.</p>

<select class="at-select" id="country" autocomplete="country-name">…</select>
```

**Accessibility**
- Every control has a `<label for>` (3.3.2 Labels or Instructions). Placeholder is at 5.4:1 / 6.2:1 but disappears on input, so it is never the name.
- Hints and errors are tied with `aria-describedby`; the error is text plus an icon, and `aria-invalid` flips the border to 2px (3.3.1 Error Identification, 1.4.1).
- Border 3.5:1 / 6.1:1 against the surface satisfies 1.4.11 for the control boundary; the hover border is 7.5:1.
- `autocomplete` tokens on personal data (1.3.5 Identify Input Purpose); `inputmode="decimal"` for money so phones show the right keyboard.
- Focus ring shows on `:focus`, not only `:focus-visible`, because the caret alone is a weak cue.
- The textarea resizes vertically only, so it never forces horizontal scroll (1.4.10 Reflow).

**Do** set `type`, `inputmode` and `autocomplete`. **Don't** clear a field on error; keep the user's input (3.3.7 Redundant Entry).

---

## Input group

**Use when** a value needs a fixed prefix or suffix (currency, unit, action). **Don't** use it to attach a second input.

| Part | Class |
|---|---|
| Wrapper | `.at-input-group` (flex) |
| Addon | `.at-input-group__addon` (sunken fill, secondary text, joined borders) |
| Trailing button | any `.at-btn` as the last child (left radii removed) |

Inner radii are removed with `:has()`, and the focused input is raised so its ring sits above the addon.

**Tokens** `--at-bg-sunken`, `--at-border-strong`, `--at-text-secondary`, `--at-radius-md`.

**Markup**
```html
<div class="at-input-group">
  <span class="at-input-group__addon" id="amt-cur">₹</span>
  <input class="at-input" id="amt" type="text" inputmode="decimal" aria-describedby="amt-cur amt-hint">
  <button type="button" class="at-btn at-btn--secondary">Max</button>
</div>
```

**Accessibility**
- Addon text is either referenced through `aria-describedby` (the user hears "rupees") or `aria-hidden` when the label already says it (1.3.1 Info and Relationships).
- Addon text is `text-secondary` on `bg-sunken`: 6.5:1 / 7.5:1.
- The trailing button has its own accessible name and the normal 40px target.

**Do** keep one input per group. **Don't** put the label in the addon.

---

## Checkbox and radio

**Use when** the user picks zero-or-more (checkbox) or exactly one (radio) option. **Don't** use a checkbox for an immediate on/off effect; that is a switch.

**Anatomy and variants**

| Part | Class | Notes |
|---|---|---|
| Label wrapper | `label.at-choice` | flex, gap 12, min height 44, padding 8 0 |
| Control | `.at-choice__control` on the input | `appearance: none`, 20×20, 2px `border-strong`, radius 4 (radio: 50%) |
| Text | `.at-choice__text` | |
| Hint | `.at-choice__hint` | `body-sm`, secondary |
| Card variant | `.at-choice--card` | bordered row, selected row gets `brand` border and `bg-selected` |

**States**

| State | Markup | Visual |
|---|---|---|
| Checked | `checked` | `brand` fill, check or dot drawn in `text-on-brand` via `::before` |
| Indeterminate | `el.indeterminate = true` | `brand` fill with a bar |
| Hover | `:hover` | border `text-secondary`; checked → `brand-hover` |
| Invalid | `aria-invalid="true"` | `danger` border |
| Disabled | `disabled` | `border-default`, `bg-disabled`; whole label turns `text-disabled` |

**Tokens** `--at-border-strong`, `--at-brand`, `--at-brand-hover`, `--at-text-on-brand`,
`--at-bg-selected`, `--at-size-target-touch`.

**Markup**
```html
<fieldset class="at-fieldset">
  <legend class="at-fieldset__legend">Notifications</legend>
  <label class="at-choice">
    <input class="at-choice__control" type="checkbox" checked>
    <span><span class="at-choice__text">Order updates</span><span class="at-choice__hint">Shipping and delivery</span></span>
  </label>
</fieldset>
<label class="at-choice at-choice--card">
  <input class="at-choice__control" type="radio" name="style" checked>
  <span><span class="at-choice__text">One-time</span><span class="at-choice__hint">Buy gold at today's price</span></span>
</label>
```

**Accessibility**
- Real native inputs: the browser handles role, name (from the wrapping label), checked state, Space to toggle and arrow keys between radios (4.1.2, 2.1.1 Keyboard). Related options sit in a `fieldset` with a `legend` (1.3.1).
- The whole label is the hit area, 44px tall or more (2.5.8 and the 2.5.5 recommendation).
- Checked state is a glyph plus fill, not colour alone (1.4.1). Box border 3.5:1 / 6.1:1 (1.4.11); checked fill `brand` 5.4:1 / 6.1:1 on the surface; glyph on fill 5.4:1 / 8.0:1.
- Card variant moves the ring to the card (`:has(:focus-visible)`) so the focus indicator wraps the real target (2.4.7).
- Disabled labels are exempt from contrast and the audit skips them.

**Do** keep labels short and put detail in the hint. **Don't** nest interactive content (links) inside the label unless the link has its own target area, as in the terms checkbox.

---

## Switch

**Use when** the change applies immediately (setting, toggle). **Don't** use it inside a form that is submitted later.

**Anatomy**

| Part | Class | Notes |
|---|---|---|
| Control | `button.at-switch[role=switch]` with `data-at-switch` | min height 44, text label as child |
| Track | `.at-switch__track` (aria-hidden) | 44×24, `border-strong` off / `brand` on |
| Thumb | `::before` | 16px white, slides 20px |
| Check glyph | `::after` | drawn in `brand` on the thumb when on |

**States** `aria-checked="true|false"`, `disabled` (track `border-default`, text `text-disabled`).

**Tokens** `--at-border-strong`, `--at-brand`, `--at-white`, `--at-shadow-sm`, `--at-duration-base`.

**Markup**
```html
<button type="button" class="at-switch" role="switch" aria-checked="true" data-at-switch>
  <span class="at-switch__track" aria-hidden="true"></span>Biometric unlock
</button>
```
`atlas.js` toggles `aria-checked` and fires `at:change` with `detail.checked`.

**Accessibility**
- `role="switch"` plus `aria-checked` is announced as "switch, on" (4.1.2); the audit errors on a switch without `aria-checked`.
- Keyboard: Enter or Space toggles. The ring moves to the track (`:focus-visible .at-switch__track`) so it outlines the control, not the whole row.
- State is thumb position plus the check glyph, not only track colour (1.4.1). Track on: `brand` 5.4:1 / 6.1:1 on the surface; off: `border-strong` 3.5:1 / 6.1:1 (1.4.11).
- The label is visible text; put a question-style label ("Hide balances") rather than "On/Off".

**Do** apply the change right away and confirm with a toast when it is not obvious. **Don't** ask for a Save after a switch.

---

## Range

**Use when** the exact value matters less than the position, and the value is shown next to it. **Don't** use it as the only way to enter a precise number.

| Class | Notes |
|---|---|
| `.at-range` | native `input[type=range]`, 44 tall hit area, `accent-color: brand`, ring with no offset |

**Tokens** `--at-brand`, `--at-size-target-touch`.

**Markup**
```html
<label class="at-field__label" for="sip">Monthly SIP <output for="sip" id="sip-out">₹5,000</output></label>
<input class="at-range" id="sip" type="range" min="500" max="50000" step="500" value="5000" aria-valuetext="5,000 rupees">
```

**Accessibility**
- Native slider: arrow keys step, Home and End jump, Page Up/Down move by larger steps (2.1.1). `aria-valuetext` reads the value with its unit (4.1.2); update it on `input`.
- The visible `<output>` pairs with the control so the value is never only positional (1.3.1).
- Dragging has a keyboard and tap alternative by nature (2.5.7 Dragging Movements).

**Do** show the value and unit beside the slider. **Don't** hide the step marks' meaning in a tooltip only.

---

## Badge

**Use when** labelling status or a count. Read-only. **Don't** make a badge clickable; use a tag or button.

**Anatomy and variants**

| Class | Fill / text / border |
|---|---|
| `.at-badge` | `bg-sunken` / `text-secondary` / `border-default` |
| `.at-badge--brand` | `brand-subtle` / `brand-text` / `brand-border` |
| `.at-badge--success` `--warning` `--danger` `--info` | `*-bg` / `*-text` / `*-border` |
| `.at-badge--solid` | `bg-inverse` / `text-inverse` |
| `.at-badge--count` | min width 24, centred, tabular numerals |
| `.at-badge__dot` | 8px `currentColor` dot (aria-hidden) |

24 tall, 12px/600 text, pill radius.

**Tokens** `--at-*-bg`, `--at-*-text`, `--at-*-border`, `--at-bg-sunken`, `--at-bg-inverse`, `--at-text-inverse`.

**Markup**
```html
<span class="at-badge at-badge--success"><span class="at-badge__dot" aria-hidden="true"></span>Active</span>
<span class="at-badge at-badge--brand at-badge--count" aria-label="12 unread">12</span>
```

**Accessibility**
- A badge is a `span`; the word is the meaning, the dot and colour reinforce it (1.4.1). A bare count gets `aria-label` with the unit ("12 unread").
- Text contrast on tint: `success-text` on `success-bg` 7.1:1 / 7.5:1, and the same for warning, danger, info and brand (1.4.3). Solid: `text-inverse` on `bg-inverse` 13.5:1 / 12.8:1.
- 12px text is the floor; a badge never carries instructions.

**Do** one badge per row. **Don't** stack three statuses in one cell; use the table's status column.

---

## Tag

**Use when** the label is interactive: a filter the user toggles or a value they can remove. **Don't** use it for read-only status; that is a badge.

**Anatomy and variants**

| Class | Notes |
|---|---|
| `.at-tag` (span) | static label, 32 tall, `border-default`, pill |
| `button.at-tag[aria-pressed]` | selectable; pressed → `brand-subtle` fill, `brand` border, `brand-text`, check glyph via `::before` |
| `.at-tag__remove` | 24×24 button inside the span, own `aria-label` |
| `.at-tag-group` | wrap, gap 8; give it `role="group"` and a label |

**Tokens** `--at-border-default`, `--at-bg-surface`, `--at-bg-hover`, `--at-brand-subtle`, `--at-brand`, `--at-brand-text`, `--at-bg-active`.

**Markup**
```html
<div class="at-tag-group" role="group" aria-label="Filters">
  <button type="button" class="at-tag" aria-pressed="true">Gold</button>
  <span class="at-tag">Delhi
    <button type="button" class="at-tag__remove" aria-label="Remove Delhi">
      <svg class="at-icon at-icon--sm" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </span>
</div>
```

**Accessibility**
- Selectable tags are toggle buttons: `aria-pressed` carries the state and the check glyph shows it (4.1.2, 1.4.1).
- Removable tags: the remove button's name includes the value ("Remove Delhi"), so a list of × buttons is distinguishable (2.4.4 by analogy, 4.1.2).
- Remove target is exactly 24×24, the 2.5.8 minimum; the tag itself is 32 tall. Space the group with the 8px gap so adjacent targets never overlap.
- Pressed `brand-text` on `brand-subtle` 7.1:1 / 7.5:1.

**Do** announce removal with `Atlas.announce("Delhi removed")` and move focus to the next tag. **Don't** remove a tag on click of the tag body.

---

## Avatar

**Use when** representing a person or organisation. **Don't** use it as a button; wrap it in one if needed.

| Class | Size |
|---|---|
| `.at-avatar--sm` | 32 |
| `.at-avatar` | 40 |
| `.at-avatar--lg` | 56 |
| `.at-avatar--square` | radius 8 instead of circle |
| `.at-avatar-group` | overlapping with a 2px surface ring; children −8px |

Initials are 600 weight in `brand-text` on `brand-subtle`; images are `object-fit: cover`.

**Tokens** `--at-brand-subtle`, `--at-brand-text`, `--at-bg-surface`, `--at-radius-md`.

**Markup**
```html
<span class="at-avatar" role="img" aria-label="Priya Nair">PN</span>
<span class="at-avatar"><img src="priya.jpg" alt="Priya Nair"></span>
<span class="at-avatar-group" role="group" aria-label="3 collaborators">
  <span class="at-avatar at-avatar--sm" aria-hidden="true">AS</span>…
</span>
```

**Accessibility**
- Image avatars: `alt` is the full name. Initials: `role="img"` with `aria-label` (1.1.1). When the name is visible right beside it, use `alt=""` or `aria-hidden="true"` so it is not read twice.
- Initials contrast 7.1:1 / 7.5:1.
- Groups summarise with one label ("3 collaborators") and hide the individual initials.

**Do** generate initials from the same name you label with. **Don't** encode presence (online dot) without a text equivalent.

---

## Divider

**Use when** separating groups that spacing alone cannot. **Don't** divide every list row; rows already have borders.

| Class | Element |
|---|---|
| `.at-divider` | `hr`, 1px `border-subtle`, 16px vertical margin |
| `.at-divider--strong` | `border-default` |
| `.at-divider--vertical` | inline 1px, stretches in a flex row |
| `.at-divider--label` | `div[role=separator]` with centred text and lines either side |

**Tokens** `--at-border-subtle`, `--at-border-default`, `--at-text-secondary`.

**Markup**
```html
<hr class="at-divider">
<div class="at-divider at-divider--label" role="separator" aria-label="or">or</div>
```

**Accessibility**
- `hr` is a separator by default; the labelled variant needs `role="separator"` and `aria-label` (1.3.1).
- Dividers are decorative, so the 1.4.11 3:1 rule does not apply; `border-subtle` is 1.2:1 by design. Under `prefers-contrast: more` the tokens step up one level.

**Do** prefer space (`.at-stack`) first. **Don't** use a divider as the only boundary of a control.

---

## Spinner

**Use when** waiting under about 10 seconds with unknown progress. **Don't** show more than one spinner in a region.

| Class | Size |
|---|---|
| `.at-spinner--sm` | 16 |
| `.at-spinner` | 20 |
| `.at-spinner--lg` | 32, 3px stroke |

Ring in `border-default` with a `brand` arc, 0.8s rotation. Under reduced motion it pulses opacity instead (`at-pulse`).

**Tokens** `--at-border-default`, `--at-brand`.

**Markup**
```html
<span role="status"><span class="at-spinner" aria-hidden="true"></span><span class="at-sr-only">Loading</span></span>
```

**Accessibility**
- The spinner is hidden; the `role="status"` wrapper with "Loading" text is announced once, politely (4.1.3 Status Messages). Replace the text with the result ("Loaded 12 transactions") when done.
- Rotation stops under `prefers-reduced-motion` (2.3.3 Animation from Interactions); the pulse never flashes faster than 3 Hz (2.3.1).
- For longer waits or known progress use Progress.

**Do** put the status wrapper where the content will appear. **Don't** set `aria-live` on the spinner itself.

---

## Progress

**Use when** progress is measurable, or a wait is long enough to need a label. **Don't** use an indeterminate bar for sub-second waits.

| Class | Notes |
|---|---|
| `.at-progress` | 8px track, `bg-sunken` with `border-subtle`, pill |
| `.at-progress__bar` | width from `--value`, `brand`, 300ms ease |
| `.at-progress--success` `--danger` | bar colour |
| `.at-progress--indeterminate` | 40% bar sliding, 1.4s loop |
| `.at-progress-label` | flex row for label and value above the track |
| `progress.at-progress` | native element styled the same |

**Tokens** `--at-bg-sunken`, `--at-border-subtle`, `--at-brand`, `--at-success`, `--at-danger`, `--at-duration-slow`.

**Markup**
```html
<div class="at-progress-label"><span id="up-label">Uploading statement.pdf</span><span class="at-tabular">64%</span></div>
<div class="at-progress" role="progressbar" aria-labelledby="up-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
  <div class="at-progress__bar" style="--value:64%"></div>
</div>
<div class="at-progress at-progress--indeterminate" role="progressbar" aria-labelledby="verify-label"><div class="at-progress__bar"></div></div>
```

**Accessibility**
- `role="progressbar"` with `aria-valuenow/min/max` and a name via `aria-labelledby`; add `aria-valuetext` when the unit is not percent ("82,400 of 1,00,000 rupees") (4.1.2). Indeterminate bars omit `aria-valuenow`, which is the ARIA signal for unknown progress.
- The visible value text beside the bar is the primary cue; the bar colour is secondary (1.4.1). Bar `brand` on track 5.4:1 / 6.1:1 (1.4.11).
- The indeterminate slide collapses to a static bar under reduced motion (2.3.3).

**Do** announce completion through `Atlas.announce`. **Don't** animate the bar backwards.

---

## Skeleton

**Use when** content of known shape is loading and the layout should not jump. **Don't** skeleton more than one screen's worth.

| Class | Notes |
|---|---|
| `.at-skeleton` | block, radius 8, shimmer gradient 1.6s |
| `.at-skeleton--text` | 0.9em tall line |
| `.at-skeleton--circle` | avatar placeholder |

Reduced motion: no shimmer, flat `skeleton` fill.

**Tokens** `--at-skeleton`, `--at-skeleton-shine`.

**Markup**
```html
<div class="at-card" aria-busy="true">
  <div role="status" class="at-sr-only">Loading portfolio</div>
  <div aria-hidden="true">
    <span class="at-skeleton at-skeleton--circle" style="width:40px;height:40px"></span>
    <span class="at-skeleton at-skeleton--text" style="width:70%"></span>
  </div>
</div>
```

**Accessibility**
- Skeleton shapes are `aria-hidden`; the loading message lives in a separate `role="status"` and the container carries `aria-busy="true"` until content lands (4.1.3, 4.1.2).
- Placeholders are drawn at final size so nothing reflows when content arrives.
- The shimmer is below 3 flashes per second and stops under reduced motion (2.3.1, 2.3.3).

**Do** replace the status text with a done message or remove it. **Don't** leave `aria-busy` on after load.

---

## Kbd

**Use when** showing a keyboard shortcut. **Don't** use it for product names or code.

`.at-kbd`: inline, mono 12px, `bg-sunken`, `border-default` with a 2px bottom edge, `text-secondary`.

**Markup**
```html
Press <kbd class="at-kbd">⌘</kbd> <kbd class="at-kbd">K</kbd> to search.
```

**Accessibility**
- `<kbd>` is the semantic element (1.3.1). Spell out modifier symbols in surrounding text or `aria-label` when they are symbols only ("Command K").
- Text 6.5:1 / 7.5:1 on the sunken fill.
- A shortcut is never the only way; the same action has a visible control (2.1.1). Single-character shortcuts need a way to turn off or remap (2.1.4 Character Key Shortcuts).

---

## Tooltip

**Use when** a short hint helps a control that already has a name (icon buttons, truncated text). **Don't** put essential instructions or interactive content in a tooltip.

| Part | Notes |
|---|---|
| Trigger | any focusable element with `data-at-tooltip="text"` |
| Wrapper | `.at-has-tooltip` (added by `atlas.js` if absent), `position: relative` |
| Surface | `.at-tooltip` `role="tooltip"`, max 280px, `bg-inverse` / `text-inverse`, z-index tooltip |

`atlas.js` creates the element, assigns an id, appends it to the trigger's `aria-describedby`, shows on
`mouseenter` and `focus`, hides 120ms after leaving, keeps it open while the pointer is over the tooltip,
and hides on Escape. It flips below when there is no room above.

**Tokens** `--at-bg-inverse`, `--at-text-inverse`, `--at-shadow-md`, `--at-z-tooltip`.

**Markup**
```html
<button type="button" class="at-btn at-btn--secondary at-btn--icon" aria-label="Help" data-at-tooltip="Opens the help centre in a new tab">…</button>
```

**Accessibility**
- Meets all three parts of 1.4.13 Content on Hover or Focus: dismissible (Escape), hoverable (the pointer can move onto it), persistent (stays until hover or focus leaves).
- Appears on keyboard focus as well as hover (2.1.1). Linked by `aria-describedby`, so it is read after the name; it never replaces the name (4.1.2).
- Text 13.5:1 / 12.8:1 on the inverse surface. Under reduced motion there is no transition to remove.
- Touch users may not see it, so the control must make sense without it.

**Do** keep it to one sentence. **Don't** open tooltips on disabled buttons; put the reason in visible text.

---

## Screen-reader only and skip link

**Use when** sighted users have a visual cue that non-sighted users lack, or to bypass repeated blocks. **Don't** hide instructions that sighted users also need.

| Class | Notes |
|---|---|
| `.at-sr-only` | 1px clipped box, still in the accessibility tree |
| `.at-sr-only--focusable` | becomes visible when focused (for skip-style links inside content) |
| `.at-skip-link` | first element in `body`, off-screen until focused, then `bg-inverse` pill at top-left |

**Markup**
```html
<a class="at-skip-link" href="#main">Skip to content</a>
…
<main id="main" tabindex="-1">
<span class="at-sr-only">(required)</span>
```

**Accessibility**
- The skip link satisfies 2.4.1 Bypass Blocks; its target `main` has `tabindex="-1"` so focus lands reliably. The audit checks that the target id exists.
- `.at-sr-only` uses `clip` and `clip-path`, not `display: none`, so it stays readable (4.1.2). Scroll containers are `position: relative` so sr-only text inside them cannot widen the page (1.4.10).
- Use sr-only text for state words ("Up", ", completed"), required markers, and the status prefix inside toasts.

**Do** keep sr-only strings short and in the same language as the page. **Don't** put focusable elements inside `aria-hidden` regions; the audit errors on it.
