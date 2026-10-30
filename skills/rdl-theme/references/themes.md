# Themes: Light, Dark and Brand

RDL v4 has exactly three themes. They share every size, radius, type role, spacing value and component;
only colour, material and shadow change. One screen's markup works in all three without edits.

| Theme | Canvas | Primary action | Highlight | When |
|---|---|---|---|---|
| **Light** | Warm neutral `#F0F0EF`, white cards | Ink `#151515`, white label | Your secondary colour | Default. Most of the board (41% of frames) |
| **Dark** | Near-black `#0A0B0C`, cards one step lighter | White `#F2F2F3`, ink label | Your secondary colour | Night use, media, ops consoles (36%) |
| **Brand** | **Your primary colour**, tinted-glass cards | Ink or white, whichever reads | Your secondary colour | Marketing-grade screens, onboarding, a brand-led app (21%) |

The values for every role are in `tokens.md` (generated). The contrast proof for every theme and
preset is in `assets/tokens/contrast-report.md` (the build fails if any pair misses). The board
evidence for these rules is in `research/theme-scan.md`.

## 1. The two brand colours

You pick two colours. Everything else is derived.

| Input | Light theme | Dark theme | Brand theme |
|---|---|---|---|
| **Primary** | Brand panels only (`bg-brand`: a card or backdrop in your colour) | Brand panels only | The canvas. Surfaces, controls, borders and charts are tints of it |
| **Secondary** | The highlight: `accent*` roles | The highlight | The highlight |

This mirrors the board. In light and dark frames, colour lives in one highlight and an occasional
brand panel (1:26 cobalt hero card, 1:153 orange panel); the neutrals carry the screen. In brand
frames (1:58 cobalt, 1:106 mustard, 1:46 olive, 1:217 vermilion), the hue *is* the screen, text and
the main action are white or ink, and a second colour does the highlighting (yellow on plum 1:66,
orange on lavender 1:6).

## 2. Setting a theme

**Web.** Put attributes on `<html>` or on any element; a themed element paints its own roles, so one
page can show all three side by side.

```html
<html data-theme="light" data-accent="volt" data-brand="cobalt">   <!-- light, volt highlight, cobalt brand panels -->
<html data-theme="dark"  data-accent="gold">                         <!-- dark (omit data-theme to follow the system) -->
<html data-theme="brand" data-brand="gold">                          <!-- brand theme from a preset pair -->
```

Any two colours at runtime (no rebuild):

```html
<script src="assets/tokens/rdl-theme.js"></script>
<script>
  RDL.setTheme("brand", { primary: "#0732D8", secondary: "#F2D33C" }); // returns { roles, audit }
  RDL.setTheme("light", { primary: "#0732D8", secondary: "#F2D33C" }); // secondary → accent, primary → brand panels
  RDL.setTheme("dark");
</script>
```

To ship a pair permanently, add it to `tokens.json → brand.presets` and run
`node scripts/build_tokens.mjs`. The build writes the CSS, checks contrast and fails if it can't
guarantee it.

**Tailwind.** Load `tokens.css`, use the preset; utilities follow the theme: `bg-bg-surface`,
`text-fg-secondary`, `bg-action-primary text-on-action-primary`, `shadow-rdl-e2`.

**SwiftUI.** Add `RDLThemeEngine.swift` next to the generated `RDLTokens.swift`.

```swift
RDLTheme.apply(.brand(primary: "#0732D8", secondary: "#F2D33C"))
RDLTheme.apply(.brandPreset("gold"))
RDLTheme.apply(.system, accent: "#D7F23A")      // light/dark follow the device, custom highlight

RootView()
    .rdlThemedRoot()          // canvas, text colour, matching status-bar scheme
    .id(themeVersion)         // bump after apply() to redraw
```

Every `RDLColor` role resolves for the active theme when it draws. The Swift engine is a line-for-line
port of `rdl-theme.js`, so a pair resolves to the same hex values on both platforms.

## 3. How the Brand theme is built

`rdl-theme.js → brandRoles(primary, secondary)`, in order:

1. **Text colour.** White if it reaches 4.5:1 on the primary, otherwise ink if it does, otherwise
   whichever is higher. Light primaries (mustard, lime, sky) get ink; deep ones (cobalt, plum,
   forest) get white.
2. **Canvas.** The primary itself. If the text colour can't reach 4.6:1 on it (mid-tones such as
   vermilion `#D44C27` or olive `#687B59`), it is deepened (or lightened) in 2% steps only until it
   can: vermilion becomes `#CC4925`, olive `#667957`. Your raw colour stays available as
   `brand-primary` for logos and illustration.
3. **Surfaces** are the canvas tinted toward white: cards +12% (white text) or +30% (ink text),
   raised +20% / +45%. A tint that would drop text below 4.5:1 is halved; if it still fails,
   surfaces step darker instead, so cards always separate from the canvas.
4. **Controls** (orbs, chips, segmented track, secondary button) tint toward white when text
   still reads at the pressed step, otherwise toward black. Hover and pressed are +8% and +16%.
5. **Emphasis card** = the text colour (a white card on cobalt, an ink card on mustard): the
   board's "white card on a brand canvas".
6. **Primary action** = the text colour, with the opposite colour as its label (white pill with ink
   label on cobalt, as on 1:217).
7. **Secondary colour.** `accent` is your colour as a fill with its own label (the label is ink or
   white by contrast; a mid-tone fill is deepened until even its pressed state reads).
   `accent-text` (≥ 4.5:1) and `accent-graphic` (≥ 3:1) move it toward the text colour until they
   read on every brand surface: orange on lavender becomes a brown graphic, for example.
8. **Status** uses the light or dark set (by canvas luminance), moved until dots reach 3:1 and text
   4.5:1 on the canvas, surfaces and its own subtle fill.
9. **Glass** is white at 8/12/16/24% on deep primaries and 18/28/40/56% on light ones. On
   mid-tones where white glass would cost contrast, glass turns black at 10–30%.
10. **Shadows** are tinted with the primary darkened 70%, never grey.

The same function runs at build time (presets), at runtime (`RDL.setTheme`) and on iOS. Over
4,000 random primary/secondary pairs, every required pair passes.

## 4. Contrast guarantees

Measured with WCAG 2 relative luminance. Translucent roles are composited over the canvas first.

| Pair | Minimum | Source |
|---|---|---|
| `fg-primary` on canvas, surfaces | **7:1** light/dark · 4.5:1 brand | HIG: strive for 7:1 with custom colours |
| `fg-secondary` on canvas, surfaces | 4.5:1 | WCAG AA |
| `fg-tertiary` on canvas, surface | 3:1 | AA large; tertiary is never essential text |
| Labels on `action-*`, `accent*` in every state | 4.5:1 | AA |
| `accent-text`, `*-text` status on canvas, surface, own subtle fill | 4.5:1 | AA |
| `accent-graphic`, `border-focus`, status dots | 3:1 | WCAG 1.4.11 non-text |
| Text on `material-regular` / `-thick` over the canvas | 4.5:1 | HIG materials |

Over photos and 3D, glass contrast depends on the image: measure with `scripts/audit_ui.mjs`
(pixel-based) and switch to `material-thick` or `material-dark` if it fails.

## 5. States, focus, disabled

Material 3 state layers, applied by mixing the label colour into the container:

| State | Layer | Roles |
|---|---|---|
| Hover (pointer only) | 8% | `*-hover` |
| Pressed | 12% | `*-pressed` |
| Focus | 12% + ring | ring `border-focus`, 2px, offset 2px |
| Dragged | 16% | |
| Disabled | content 38%, container 12% | `fg-disabled`, `fill-disabled` |
| Selected | swap to `action-primary` (quiet) or `accent` (highlight) | segmented, chips, dock |

Never show hover on touch. Never convey state by colour alone: pair it with weight, a dot or a
check.

## 6. Elevation

| Level | Role | Light | Dark | Brand |
|---|---|---|---|---|
| 0 | canvas, cards | no shadow; cards separate by tone | tone steps: canvas → surface → raised (HIG base vs elevated) | tint steps |
| 1 | `shadow-e1` | soft ink 4% | black 30% / 20% | primary-dark tint |
| 2 | `shadow-e2` | menus, popovers | | |
| 3 | `shadow-e3` | floating panels | | |
| 4 | `shadow-e4` | sheets, modals, dock | | |
| glass | `shadow-glass` | inner highlight + drop | | |

RDL cards on a canvas carry **no shadow** (the gap is the divider). In dark, depth comes from
lighter surfaces, not shadows (M3, HIG). Sheets use `bg-canvas-elevated`.

## 7. Rules per theme (from the board)

**Light**
- Canvas warm neutral, cards white, controls `fill-control`. Never pure-white canvas.
- The primary action is ink. The highlight appears 1–3 times.
- Glass only over imagery or auras; on the plain canvas use `.rdl-card`.

**Dark**
- Never pure black UI chrome on pure black: surfaces step +1 tone per level.
- The primary action is white. Highlight colours glow: use `accent-graphic` for needles and data.
- Dark glass needs a dark backdrop.

**Brand**
- One hue fills the screen; don't add a second large colour area. The secondary colour stays small.
- Cards are tinted glass or the emphasis card (white/ink). Don't put a brand panel on a brand
  canvas: `bg-brand` equals the canvas.
- Photos and 3D in brand screens are monochrome or tinted toward the primary (1:83, 1:102).
- Prefer brand for single-purpose screens (onboarding, confirmation, a hero home). Long dense lists
  read better in light or dark.

## 8. Choosing colours

- **Primary:** anything. Deep and saturated (cobalt, forest, plum) gives white text and the most
  board-like result. Light (mustard, lime) gives ink text. Mid-tones work but are deepened slightly.
- **Secondary:** pick something that contrasts with the primary in *lightness*, not just hue (yellow on
  cobalt, lime on forest, forest on gold). If you pick a close lightness (orange on lavender), the
  fill stays your colour but its text and graphic forms are shifted to stay legible.
- Check the pair in `assets/templates/theme-studio.html` (live picker, every role, live audit) before
  shipping.

## 9. Migrating from v3

v3 names still work: they are aliases (`tokens.md → v3 names`). `text-primary` → `fg-primary`,
`bg-hero` → `bg-emphasis`, `fill-control-strong` → `action-primary`, `glass-fill` →
`material-regular`, `accent-soft` → `accent-subtle`, and so on. New code should use v4 names. The
v3 `data-accent` packs are now **secondary-colour presets**; their text and graphic forms are
computed per theme instead of hand-picked.
