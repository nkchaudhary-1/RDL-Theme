# Deep scan — structure, spacing, hierarchy (pass 2)

Second full pass over all 220 frames at 1200px, read for *structure* rather than style: margins,
rhythm, alignment, hierarchy levels, component anatomy and consistency. Measurements are relative
(screen width W = 100%, normalised to a 390pt phone / 1440px desktop). Frame→image manifest:
`frames.tsv`. Pixel measurements are in `measurements.md`.

Legend: **S** structure/grid · **R** rhythm/spacing · **T** type hierarchy · **C** components · **K** consistency rule observed

### 1:2 Flow Monitoring · mobile dark
- S: content is one large glass panel (radius ≈ 9% W ≈ 36pt) inset ≈ 4% from screen edge; nav row is a separate panel below with its own inset — panels nest with equal gutters.
- R: header → metric row → progress line → dot chart → nav; vertical gaps ≈ 1 : 1.5 : 1 (≈ 24 / 32 / 24pt). Inner padding ≈ 24pt.
- T: 3 levels only — title 20/400, figure 36/300 + unit 50% opacity same size-ish, axis 13/400 gray.
- C: tab bar = 4 equal rounded-rect tabs (radius ≈ 24) filling width, gap 8; active = near-white fill + dark icon; pill chip "24ms" centered between two figures; expand orb top-right.
- K: one accent (periwinkle blue) used for secondary series + chevron dot only.

### 1:3 CityBldr 3D Desktop · light warm
- S: full-bleed 3D scene; UI is floating glass cards pinned to edges with ≈ 32px inset: brand pill top-left, map card bottom-left, detail stack right, tool dock bottom-center, AI search pill bottom-left. No grid columns — **edge-anchored floating layout**.
- R: card inner padding ≈ 20–24px; label → title 4px, title → chips 12px, block gaps 20–24px.
- T: eyebrow 10/500 uppercase gray → title 22/400 → chips 11 → figure 28/300 with "$" 40% → caption.
- C: "Make an Offer" black pill inside card bottom-right aligned to figure baseline; ↗ corner orb top-right (≈ 28px) on every card — **consistent corner affordance**.
- K: every floating card shares radius (≈ 24) + same top-right ↗ orb.

### 1:4 Robotics Maintenance · light
- S: horizontal list cards: [illustration 30%] [text column 40%] [accent panel 30%]; accent panel bleeds to card edge with same outer radius.
- R: title → error caption 16px; caption → pill 24px; label → value 6px; two KV columns gap 40px.
- T: ID 22/500 caps-numeric, caption 15/400 gray, KV label 15 gray / value 18/500.
- C: ghost pill "+ Add Pattern" (gray fill, icon-left); black status badge "● Maintenance"; orange pad with dot-matrix field + white knob.
- K: cards in list share height, title baseline and KV row baseline aligned across cards.

### 1:5 3D Print Mobile · light
- S: top bar is one glass capsule containing logo orb + title dropdown + yellow pill CTA (single-row toolbar), inset 16pt.
- R: status bar → toolbar 12pt; floating progress card centered over model.
- T: title 15/400 caps-ish ID; card title 15/400; % in white circle badge 13/500.
- C: progress bar height ≈ 32pt pill, fill dissolves into halftone dots; percent badge circle overlaps bar end.
- K: yellow used twice (CTA + progress) only.

### 1:6 Weight Management · violet close-up
- S: 2-row bento: full-width card top, two half cards bottom, gap ≈ 8pt, all radius ≈ 32.
- T: card label 18/400 white 70%, figure 40/300, small chip 11/600 on orange.
- C: tick arc (≈ 25 ticks, every 5th longer) with accent marker tick + value chip above; ↗ outline orb in card corner.
- K: monochrome violet cards; only accent = orange marker.

### 1:7 Facial Telemetry Desktop · dark green
- S: 12-col-like: left column (title + tiles) ≈ 25%, center scan 50%, right column cards 25%; bottom row of cards; outer margin ≈ 32px; gutters ≈ 16px.
- R: header pills top-center; title block top-left (title 44/400 two lines, date caption 12px below with 16px gap).
- T: H 44/400, card title 15/500, figure 28/300 right-aligned bottom, unit 12 gray bottom-left.
- C: metric card anatomy = title top-left, ↗ top-right, icon+unit bottom-left, figure bottom-right (**corner anchoring**: 4 corners carry 4 pieces of info). 2×2 icon tiles (radius 12) with active accent green.
- K: all cards same radius (≈ 20) and padding (≈ 16); dark glass with 1px rim.

### 1:8 Facial Telemetry Mobile · dark
- S: same system on mobile: logo tile top-left, menu orb top-right, title below at left margin 24pt.
- K: identical type + components as desktop → **one system across breakpoints**.

### 1:9 Eli Test Mobile · photo
- S: centred wordmark in nav row; orbs at both ends (left product icon, right ⋮) — **symmetric nav: orb · title · orb**.
- T: display headline 52pt, two weights + two colors (bold mint / light white), inline small "for 60 seconds" with underline on number; strong left alignment at 24pt.
- C: curved tick ruler at bottom as timer.
- K: one accent (mint) for emphasis words only.

### 1:10 Visitors Insights · mobile gradient
- S: nav = back orb (left) · centred title · ⋯ orb (right, below title line); content left-aligned at 24pt margin.
- R: caption → figure 8pt; figure → chart 56pt (generous air above data); axis labels 24pt below chart.
- T: title 20/400, caption 14 gray, figure 56/300, axis 12 gray. Tooltip card: value 22/300 + caption 13.
- C: vertical line bars = 3pt rounded strokes, ghost bars at 25% opacity behind, active bar solid white; glass tooltip (radius 20) with × ; dashed baseline grid.
- K: everything white-on-gradient; hierarchy by size + opacity only (100 / 70 / 45%).

### 1:11 Energy Generation Map · dark
- S: glass panel ≈ 340×300; header row label left / delta chip right; figure row with ring icon; bar row; footer control inset panel.
- T: label 16/300 50% white, figure 36/300 + unit 50% same baseline, chip 12.
- C: square-ish tiles (radius ≈ 4) segmented toolbar attached to panel top-left (tabs as **attached tiles**); footer control = inset darker glass with label + pause.
- K: industrial variant uses small radius (4–8) consistently across panel, tiles, chips.

### 1:12 3D Print Slicer Desktop · dark
- S: left sidebar of stacked glass panels (width ≈ 22%), each radius ≈ 24, gap 16; bottom-center tool dock; timeline full-width bottom.
- R: list rows 22px apart, label left / count right; panel padding 16.
- C: dock = circle buttons 40 + divider + segmented pill (white active) — **dock groups separated by 1px vertical dividers**; dropdown pill pale-blue gradient.
- K: two accents (yellow active tool, pale blue secondary) — exception for creative tools.

### 1:13 E-Bike Widgets · violet/magenta
- S: square widgets, title top-left, instrument centred, data pair bottom-left/right.
- T: title 26/500, dot-matrix figure ≈ 64, data value 18/500 + label 14 50% below.
- C: tick ruler (alternating short/long, 3pt strokes) with single yellow needle at centre.
- K: **bottom row = value-over-label pairs at both corners**, icon orb centre.

### 1:14 Oil Well Mobile · Swiss light
- S: square tile buttons (no radius) top corners; title centred 15/400 italic-ish; content left 24pt.
- T: display mixed: "La Salle" 56/700 + "23-001" 56/300 (same size, weight contrast); KV labels 15/300, values 26/400.
- C: 2×2 KV grid with 40pt column gap; legend chips right-aligned with colored squares; black rect dropdown; orange full-bleed block bottom.
- K: radius 0 everywhere — **Swiss variant is internally consistent** (never mixes with pills).

### 1:15 Security Thermal Card · dark teal
- S: single tall glass card; title top-left; media centre with corner brackets; two meter rows bottom.
- R: meter: label + value on one line, 2pt bar 8pt below, rows 28pt apart.
- C: glass warning chip centred over media (radius 16, icon + text).

### 1:16 Solar Time-of-Use · light + yellow
- S: segmented control spans full width (3 segments), liquid-glass yellow active; chart full-bleed; yellow bottom sheet with title + value + info orb.
- T: "72 %" huge with small %; section title 17/500; legend "Solar — 30%" with em-line.
- C: pager dots (filled accent + outline rings); glass capsule nodes on curve.

### 1:17 Fleet Dispatch Desktop · light + orange
- S: top text nav (no pills) centred; left list column ≈ 28% of cards; map fills rest; floating detail card bottom-right; consistent 16px gutters.
- R: card internal: header (thumb + title + actions) → meta row → divider → sub-rows 44px each.
- C: action buttons = 32px white square-rounded tiles (radius 8) in a row; status pills (gray, blue, orange) 28px tall; black "Optimize" button radius 8; dashed hatched placeholder slot.
- K: **dashboard density uses smaller radii (8–12) than mobile (24–32)**.

### 1:18 / 1:23 Transit Passenger Load · map
- C: glass card = title 20/300 + subtitle 14 gray (4pt gap) + figure 40/200 bottom-left, ↗ top-right; card radius ≈ 28, padding 24. Map marker = 56 glass orb inside dashed radius circle.
- K: **card anatomy repeats**: label top-left, ↗ top-right, figure bottom-left.

### 1:19 Server Error card · dark
- S: card: title → isometric visual (centred, ≈ 40% height) → 2 meters → full-width ghost button.
- R: meters 24pt apart; button 56 tall, radius 16, 24pt below last meter.
- C: alert tile (48 square radius 12) attached outside card top-left — **status tile docked to card edge**.

### 1:20 Cargo Reserved · electric blue
- S: top KV row of 5 equal columns ("Total items 24 · Weight 830.4 kg · Dimensions …"), label 12 50% / value 14.
- C: hatched reserved cell with 1px white border and spaced caps label — the only caps use.

### 1:21 Drone Security Mobile · dark 3D
- S: header row = logo · weather chip · device dropdown chip (all glass, radius 12, height 48, gap 8); zoom stack vertical left; warning chip centred; joysticks bottom.
- K: chips share height (48) and radius in a header row — **header items equal height**.

### 1:22 Real Estate Offer · light 3D + red
- S: glass card bottom (inset 16): tag row → id caption → figure → divider-less footer row [avatar 64 square + "Assigned to" KV] [black rect CTA right].
- T: id 15/300 gray, figure 40/400 with $ 50% gray light, KV label 15 gray / value 20/400.
- C: outlined tags (1px border, radius 4) with colored dot/text; square avatar (radius 2); rect CTA 56 tall radius 0.
- K: this frame is the **"sharp" variant** — tags, avatar, CTA all square; card itself square.

### 1:24 Basketball Stats · dark warm
- S: stat triplet evenly distributed across width (left/centre/right aligned to columns); timeline ruler below spanning full width; legend row; card below.
- T: stat value 28/600 (bold here — sport variant), label 13 gray under.
- C: segmented ruler: dashed track + solid white & orange segments of varying length.

### 1:25 Energy Generation Mobile
- S: title 40/300 two lines at top-left; segmented tile bar attached to panel top; bottom tab bar = 5 square tiles (52, radius 8) joined with 4px gaps.

### 1:26 Auto Assembly Blue
- S: blue card (radius 32) fills width minus 16pt inset; below, light timeline sheet; bottom white card overlaps sheet.
- C: timeline: time ticks top, task pills (radius full, blue fill / gray ghost) as Gantt bars, dashed playhead with triangle cap; black pill CTA bottom-right partially offscreen = scroll affordance.

### 1:27 Corporate Glass Cards · close-up
- C: card anatomy identical to 1:18: title 28/400, date 20/300 gray, figure 56/200, ↗ top-right, accent glowing dot bottom-right. Radius ≈ 32, padding ≈ 32.
- K: **this card anatomy (title / sub / big figure + ↗) appears in 30+ frames** → canonical "Metric card".

### 1:28 Bearing Defect Mobile · dark
- S: header row logo (dot-matrix mark) left / menu tile (44, radius 12) right; meta row of 2 KV pairs left-aligned vs right-aligned (date/time); 3D hero; bottom sheet card (radius 24) with eyebrow + status chip on one row, title 26/400, then metric rows.
- R: metric row: value 18 left, label 11 right under line, 28pt pitch.
- K: **meta row mirrors**: label column left, values right — the mobile "spec sheet" pattern.

### 1:29 Lung Capacity · dark
- S: nav = back orb · centred bold title 26/600 · menu orb; carousel card centred 70% width with peeking neighbours (16pt visible); pager dots under; 2-col bottom grid.
- C: carousel squircle radius ≈ 40; info orb 28 in card corner; dot-matrix figure + unit caption centred.

### 1:30 Cortisol Mobile · light (best "light instrument" reference)
- S: colored header strip (sage) with title + date stepper pill; white sheet overlaps header by 24pt with grabber; pill tabs (3, centred, height 36, gap 6, active gray fill); cards stack with 16pt gaps.
- R: card padding 24; title 20/500 → meta 13 gray (8pt) → figure (40pt gap) 40/500 navy → unit 13 gray (4pt) → chart (24pt).
- C: card header: title + meta left, outlined ⋮ orb 40 right (top-aligned to title); gauge arc 1.5pt gray + 3pt navy progress + dot; gray pill "Optimal" centred with caption values at both ends.
- T: navy ink (#1B2333-ish) instead of pure black — **ink can be tinted**.
- K: cards radius 32, sheet radius 32; all neutral + 1 ink color — **pure minimal**.

### 1:31 Smart Greenhouse · photo
- S: square tiles (radius 0) — header tiles 52, date strip of square cells (active white), 2×2 grid of square metric tiles edge-to-edge with 1px gaps.
- T: title 44/300 two lines + inline weather 14; tile label 16/400, module 11; figure 52/300 + % 50%.
- K: Swiss/square variant again consistent: tiles, cells, buttons all radius 0.

### 1:32 Energy Sites Breakdown · dark green
- S: glass card top-left label "Sites Breakdown" 2 lines, top-right "43 Sites" caption; centred arc instrument; centred figure 44/300; inline breakdown row centred.
- C: arc with glass orb nodes (48) at stops, solid white segment + dashed remainder.

### 1:33 Maritime Shipments · map
- S: large title 40/200 with inline tab labels (Orders, Suggestions) at smaller size + count badges — **title doubles as tab bar**; card radius 32 with export tile top-right.
- C: journey ruler: dates at ends, mid "+4 d", accent window segment; glass dock + separate lime circle FAB right (60).

### 1:34 Greenhouse Pod Dial · close-up
- C: big circular dial (sage gradient), dotted tick ring inset 16, needle; centred label 14 gray + value 36/300; segmented radial arc control (3 segments, icons, active darker) hugging the dial with an 8pt gap.
- K: the arc control follows the dial's curvature — **concentric alignment**.

### 1:35 Padel QORX · dark
- S: header: wordmark left, device chip pill right (height 44, radius full, icon right); hero 3D 50% height; bottom sheet radius 32 holding title, slider, KV pairs; dock overlapping sheet bottom.
- C: tick slider: track 4pt, ticks every 12pt, accent pill thumb with value label above.
- K: red/green used semantically only (worse/better values).

### 1:36 Glucose Widgets · dark
- S: bento: full-width row, then 2-col rows, gaps 8, radius 32. Each widget: label top-left 14/400 70%, figure bottom-left 40/300 + unit 16.
- K: **label top-left, figure bottom-left** in every widget; gradients differ per metric but layout is identical.

### 1:37 Vagal Tone · blue-gray photo
- S: hero glass card (radius 40) with label → figure (64/200 + unit 50%) → radial gauge with central white orb (72); below, 2 half cards (one white solid, one glass) with gap 8.
- C: "DONE" badge = stacked icon + caps label inside a gray squircle; slider = line + triangle thumb + dotted remainder with Min/Max labels.
- K: mixing solid white card with glass card side-by-side keeps the same radius + padding.

### 1:38 Heart Age / Blood Oxygen · gradient tiles
- S: tiles meet with 2pt gaps (near-seamless bento); each tile: label top-left 16/300, ↗ tile top-right (40 square, radius 8), figure bottom.
- T: figure 52/400 + unit under it 16/300 (stacked unit variant).

### 1:39 Air Filter · electric blue panel
- S: right-docked panel 40% width; eyebrow, × top-right; title 40/600 two lines + ID caption right-aligned on title baseline; hairline divider; 2-col "Info" label | paragraph; divider; blueprint drawing.
- T: grotesk (not Urbanist) in this Swiss variant — **Swiss variant may swap to a neo-grotesk**.

### 1:40 Solar Simulation · dark
- S: comparison: two columns (Current | Simulated) with → between; each column title 22/400 then 4 KV rows (label 18/300 gray italic-ish, value 20/400 colored).
- R: KV rows 36pt pitch; columns aligned on value baseline.

### 1:41 Tesla Parking · map
- C: liquid glass (high refraction, clear) buttons and cards: radius 24–32, stacked vertical pill groups for map controls (2 icons per pill), camera tiles radius 32.

### 1:42 Basketball Replay · photo
- S: right-edge vertical speed selector (1x/2x/4x) stacked in a glass column; thumbnail strip (selected larger, glass ring); scrubber glass capsule with centred time; transport row.
- C: transport = **rounded-rect 56 · wide pill 88 · rounded-rect 56** (circle–pill–circle variant with squircle ends), all dark glass, centred with equal gaps (≈ 48).

### 1:43 Bearing Defect card · close-up
- C: metric row = value 22/300 left; dashed track with colored segments; vertical cursor line spans all rows (shared x-cursor across meters); label 11 gray right-aligned under the track.
- K: **one cursor for a group of meters** keeps them comparable.

### 1:44 Port Crane Desktop · dark
- S: header row of glass dropdown pills (label gray + value white + chevron), right-aligned; left column panel ≈ 28% with back tile + title 32/300 + subtitle; panel content: eyebrow, centred status hero ("● Operational" 32/300), 2-col KV grid, 2-col metric tiles.
- R: KV grid rows ≈ 44px, columns gap 32; tile padding 16, radius 12.
- C: metric tile = label top, dot + figure 26/300 + unit, then "Status: …" and "Limit: …" captions — **tile footer carries thresholds**.
- K: dashboard radii 12; hairline dividers between columns.

### 1:45 Padel Consistency · dark
- S: top card: 3-column metric strip with 1px vertical dividers (value 18 + unit, label 14, mini bar); 2 squircle comparison cards (radius 40, gap 12) staggered vertically by ≈ 40pt — **intentional stagger for rhythm**.
- T: figure 52/200 + "%" 50%, delta "+20 %/AVG" 16 colored.

### 1:46 Hers Weight Loss · close-up
- C: horizontal glass pill card (radius = height/2): circle thumb 72 left, 2-line title 20/300 italic, gray pill chip "300 mg", "+" right. **Pill-shaped list card**.

### 1:47 Robot Engine Diagnostics · light glass
- S: 2-col tiles each with a **detached label tab** above (small glass tab with label, tile below) — folder-tab card pattern; status dot top-right of tile.
- T: figure 52/300 + unit superscript small; ETA line "ETA: **0h 23min**" (label light, value semibold).
- C: drag grip ⠿ top-right of section card.

### 1:48 Ad Revenue · gradient
- S: nav: back orb · bold title · filter orb. Centred white pill period selector with underline indicator. 2 dot-matrix stats with labels below, separated by "+".
- C: white tooltip card (radius 16) "$19 K +14% ↗ / upcoming this week" ×.

### 1:49 Light Settings · warm glass
- S: nav back orb · title · settings orb (staggered: right orb sits higher than left — perspective/visual only); accordion glass cards (radius 32) with collapse orb (48) top-right; inner inset panel (radius 24) inside card with 16pt margin.
- K: **nested radius = outer − padding** (32 → 24 with 8–16 inset) clearly applied.

### 1:50 Compliance Folder · dark + green
- S: header row: back orb (64) left, 3 action orbs (64) right with 8pt gaps; folder card full-width with tab cut-out.
- C: folder = back panel + front panel with **curved tab notch**; documents (glass cards radius 24) peek out between panels. Progress line solid + triangle + dotted remainder, stage label at right end.

### 1:51 CityBldr Property Details · glass
- S: one glass card per section (radius 36, padding 24, gap 12 between cards); ↗ orb (48) top-right of each card.
- T: eyebrow 11/500 caps 60% → "#619012" 32/700 + "RC-4 / 80-D" 32/300 (same size, weight split) → chips row (height 28, gap 8) → status pills row → KV 2-col → person row.
- C: person row: avatar 48 circle, "Assigned to" 14 gray / name 18/500, two 48 orbs right (mail, phone).
- K: metric rows on 8pt multiples; all orbs in card = 48.

### 1:52 Health Superpower · light + gradient
- S: nav back orb (40) · name centred; big gradient card holds a 2-col sub-grid of glass tiles (inset 8, radius 28) → **cards within cards share the parent's gutter**; bottom 2 tiles (white / pink) radius 32 with "+" pill button top-right.
- T: dot-matrix 52, caption 12 under; tile figure dot-matrix 36 + unit 14 inline.

### 1:53 Heart & Circulation Desktop · light
- S: 2 halves: left 50% hero (title, photo, callouts, data strip), right 50% bento of gradient tiles (3 cols × 3 rows, 4px gaps, radius 4 — **seamless mosaic**); top-left brand tile + name; top-right 3 icon tiles (32, radius 8).
- C: callout = figure 22/300 + label 14 + gray micro pill, with leader line to accent dot hotspot.

### 1:54 Pulsetto Home · dark
- S: greeting top-left (light + bold two lines), menu icon right; horizontal scroller of orb images (120 circles overlapping 8pt); big card radius 40 with blue rim glow; bottom row inside card: circle 64 · pill 140×64 · circle 64.
- K: the circle–pill–circle row lives **inside** the card bottom, inset 16.

### 1:55 Smart Home 3D · Swiss tiles
- C: square tiles 72 (radius 0) in signal colors (yellow, electric blue, pale blue); segmented lock/unlock = two joined squares; header icon tiles 64 gray joined (gap 2).

### 1:56 Solar Simulation close-up — same system as 1:40.

### 1:57 Rail Flatcar Mobile · light
- S: nav: back orb (outlined 44) · title 15/400 left-aligned after it · search + grid orbs right. Hero render; carousel nav orbs left/right; section row "Flatcars Timeline" label + slider + "+" orb; horizontal card carousel (cards 180×140, radius 20, gap 8, selected = white).
- K: outlined orbs (1px stone-300) on light screens; solid black orb for the single primary action (+ on container).

### 1:58 Vehicle Controls · blueprint
- C: form: bold label 16/600 above outlined field (1px white 25%, radius 0–2, height 56); link "Show Historic Devices" underlined 13; two-column date fields. Iridescent glass overlay card.

### 1:59 Traffic Zone Desktop · light 3D
- S: left glass column (yellow tint) of stacked sections separated by 1px lines; bottom-right control grid of square cells (1px gaps, radius 0) each with label top-left + diagram centred; floating orange card top-right.
- R: section padding 16; KV 2-col with 16 row gap; header row title 14/600 + ↗ tile (32 square).
- T: status hero "● Congested" 32/400; figure "12.5k" 56/300; tile figures 26/300 + unit 14.
- K: **dashboard cells meet with 1px hairline gaps** — no rounded cards inside the control grid.

### 1:60 Ardex Heatmap · dark
- S: header: logo + name left, 2 tile buttons (48, radius 12) right; filter row = 2 split-dropdown controls (label + chevron tile attached); vertical tool stack (44 tiles, gap 8) left; 2 stat cards bottom (radius 20, padding 16).
- C: stat card: title 2-line 16/400 + ⋯ right; status icon + word (Good green / Normal amber) 14; figure 32/400 + % 16.

### 1:61 Visitors Insights Desktop · fog glass
- C: folder cards (radius 28) with mini screenshots peeking; "+" add tile square; ⋯ orb 56 bottom-right of folder; filter pills glass with chevron.
- T: figure 64/200 dark navy; title 28/300 italic-ish perspective.

### 1:62 Cinemaro VFX · dark photo
- S: left icon rail of 56 orbs (active white), panel stack to its right (radius 28, gap 12); transport capsule bottom-centre: ↺ orb · white play orb (larger) · glass pill group; timeline sheet with notched tab.
- C: segmented "Persp | Ortho" accent pill active; white slider pill with grip.

### 1:63 Accela Folders · dark
- S: a single raised panel (radius 28) with header row (logo, name 22/500, "+") divided by 1px line; search field (52, radius 16); segmented (2) dark; folder grid 2 + add orb; list rows with count tiles (28 square radius 6).
- K: **dark-on-dark layering**: canvas #0B → panel #141414 → field #1C1C1C → active #2A2A2A (≈ 4–6% steps).

### 1:64 Car Defrost · olive mono
- S: bottom sheet (radius 40, grabber) over top-down render; title 18/600 + meta 15 gray with • separator; control row: icon+label · ‹ 40/400 › · icon+label (3 columns, centred); list row pill (64, radius full, 1px rim) with icon + label + tick ruler right.

### 1:65 Port Overload · light
- S: title 40/300 two lines; render; floating alert card (radius 20) "▲ 32.5 T / Overload detected ›"; stats card bottom: header title + 2 icon buttons; figure 44/400 + delta chip (gray square, ↓ red) + caption; legend list right (dot · label · value right-aligned, 32 pitch).

### 1:66 E-Bike Eco Mode · magenta glass
- S: glass card radius 40 over gradient screen; label top-left 20/500; caption top-right 15/300 gray; centred dot-matrix 72; curve with axis labels; action row pinned at bottom: orb 64 · pill 220×80 yellow · orb 64 (pill slightly taller than orbs — **primary is visually dominant**).

### 1:67 Questionnaire Purple
- S: caption 13 50% → question 34/400 three lines (line-height 1.15) → options grid: selected tall card (radius 32, 50% width) left + two stacked pill cards right (radius 40, rim 1px white 30%), gap 12; bottom: outline orb 56 + slide pill (white knob 56).
- T: option number 11 50% above label 17/400.

### 1:68 / 1:69 Real Estate Investment Desktop
- S: right panel ≈ 32% width, yellow→white gradient header with "$ 320.0k" 88/200 (decimal + k in 40% opacity); sub-cards radius 24; 3×2 metric tile grid (gap 8, radius 20, padding 16): label 16/500 top-left, value 22/400 bottom-left with unit superscript + arrow; footer: two ghost pills + circle + black circle.
- C: map toolbar = row of 48 circles (light gray) with 8 gap; filter chips top with "Label: value ▾".
- K: **unit as superscript prefix** ("% 8.4", "$ 3,100") small top-left of number — consistent across tiles.

### 1:70 3D Print Infill · light
- C: chamfered-corner tiles (one corner cut 12px) for toolbar + dropdown menu items — creative-tool variant; active tile white solid.

### 1:71 Cinemaro Timeline · dark
- C: sheet with **notched tab top** (two tabs, active raised); transport: orb 72 · wide glass pill · orb 72; timeline tracks 40 tall, clip with yellow 2px outline + grip.

### 1:72 Water Filtration Desktop · light
- S: bottom dashboard grid: tiles (radius 12, padding 16, gap 8) each with title 14/400 + small segmented toggle (12h|1d) top-right; mixed instruments (hairline bars, tick bars, arcs with dots); right-side list of numbered action rows (orange number circle 20 + label + chevron) and log entries (title + date + time ago).
- K: **every tile header = title left + mini control right** (segmented / dropdown) — consistent.

### 1:73 Testosterone Survey · steel blue
- Same anatomy as 1:67 with glass pill options (radius full) in 2 columns; header chip pill with icon; floating action orbs bottom.

### 1:74 Pulsetto Timer · dark + coral glow
- S: nav: ← · title 17/500 centred · ×; content **centre-aligned column**: timer 48/400 → helper copy 13 gray 3 lines (max-width ≈ 70%) → 2 equal squircle buttons (radius 24, 64 tall, gap 12) → section label 17/500 → dial → 3-orb row (64, gap ≈ 56).
- K: centred layout is used only for single-task screens (timers, scanners, questionnaires).

### 1:75 AI Voice Dialing · close-up
- C: prompt card: text 18/400 with caret; dashed-bar waveform; squircle icon tile 72 bottom-left (radius 24).

### 1:76 Cargo Ship Ops Desktop · navy
- S: left column 2×2 container tiles (radius 20, padding 16, gap 8): ID with colored flag tick, 2 KV lines, figure 28/300 bottom-left, expand orb bottom-right; selected tile = solid blue fill. AI chat input pinned at column bottom with gradient underline + white circle send.
- K: **tile footer = figure left + action orb right**, same baseline.

### 1:77 E-Bike Assist widgets
- C: pill widget (radius = height/2) with title left + ring meter right; toggle widget (pill track 80×40 + white knob); bottom row orb 64 · halftone yellow pill · orb 64.

### 1:78 Running 21K · lavender
- C: vertical day-capsules (64×40 glass pills) stacked right with check; card radius 40 with yellow aura; figure 40/400 + "KM" caps 13 gray.

### 1:79 Yard Container Mobile · light
- S: back + search tiles (48, radius 12, outline) top; white card full-width radius 24: eyebrow 13 gray → ID 32/400 → status KV + thumb right (80 square radius 12); tab row (black pill active, plain text others, gap 24); image well (radius 16) with pager dots; second KV block.
- T: eyebrow 13/300 gray, ID 32/300, KV label 13 gray / value 17/400.

### 1:80 Oil Field Block · map close-up — dotted polygon, dashed bbox, black rect toolbar (Swiss variant).

### 1:81 Flight Trip · dark map
- T: "Trip" 44/600 + "Details" 44/300 gray — **same-size weight+tone split headline** (recurs 10+ times).

### 1:82 Truck Cargo Loading · light
- S: nav tiles (52 rounded-rect, white) ends; centred title ID 20/500 + route caption 12 gray; hero top-down render; side thumbnail slider; bottom sheet with tab header (title left, tabs right) + list rows (icon · qty gray · address 14 + city gray · status tag right) + black full-width CTA 64 pinned (radius 20).

### 1:83 Fleet Truck Yard Desktop · light
- S: left icon rail tiles (48 radius 14, active white); bottom bento of vehicle cards (radius 16, padding 20): title 18/600 + ID 13 gray left, status pill (soft tinted bg + dot) right; image well; spec rows label 14 gray left / value 14/500 right (32 pitch). Selected card: accent yellow fill on the spec block only.
- Form: labels 13 above inputs (gray filled 48, radius 12); upload dropzone dashed radius 16.
- K: status pill = **soft tint background + same-hue text + dot** (Finishing orange, Available green).

### 1:84 Urbis GIS Desktop · satellite
- T: "Task" 44/300 white + "#241639" 44/300 40% white (tone split instead of weight split).
- C: 2×2 grid of glass pills inside a glass container (radius 28, padding 8, gap 8) = **pill keypad**.

### 1:85 Volume / Noise · glass
- C: stacked control pills: inner dark pill (value + icon + ⋮) nested in an outer longer pill with label at the end — **pill inside pill** shows value vs. range.
- Footer: liquid glass × orb · waveform · dark ✓ orb (confirm/cancel pair at screen corners).

### 1:86 Hims Rx · close-up — pill list card with cream chip; same as 1:46 (consistent across brand variants).

### 1:87 Cinemaro Emotions · tabs as folders — stacked tab cards (title 22/400 + subtitle gray) with overlapping bottoms.

### 1:88 Hers Skincare · close-up
- T: "Personalized" 40/400 40% white + "Treatements" 40/500 white — tone split.
- C: pill card: eyebrow 13 + title 20 + "+".

### 1:89 Accela Upload · dark
- C: AI composer = glass card radius 32: placeholder 22/400 with caret, bottom toolbar (+ orb, attachment glyph, "Auto ›" chip) left, white send orb (40) right.

### 1:90 Hims Glow Kit · product card
- C: tall product card radius ≈ 80 (capsule-ish), stone-100 fill; tag top-centre; product render; liquid glass lens badge overlaps; name 22 gray + price 44/400 bottom-left.

### 1:91 Sleep 8 Hours · close-up — dot-matrix numeral + italic unit + tick ruler with single accent needle (yellow on magenta).

### 1:92 Onda Retreat · photo
- S: nav orbs (64 pill-ish) + centred title; horizontal chip scroller (glass pills 44, icon + text, gap 8); H1 52/400 + body 15 (2 lines) left-aligned; step list = staggered glass pills with icons (indent increases — "path" metaphor); bottom row: 2 white pills with chevron (dropdowns) + black pill CTA, right-aligned group, gap 8.
- K: bottom action row with **filters + primary**: secondary = white, primary = ink.

### 1:93 Surf Wind · tiles — gray squircle tiles (radius 28, gap 8), arc gauge yellow, map tile.

### 1:94 Health Journal · light gradient
- S: header gradient area with back orb (liquid glass 48), centred title; KV top-left "Cortisol Level / 52"; glass pills floating on chart ("Week", "Moderate"); white sheet cards radius 40 below (2-col bottom).
- C: mood slider = white capsule track with pill segments + labels below.

### 1:95 Fleet AI Route · electric blue bg
- S: header: back tile 52 (radius 14) left, 4 tiles right (gap 8), active electric blue fill; bottom sheet radius 24: title 18/600 + × ; render; 2-col KV grid label 14 gray left-aligned / value 14/500 (row pitch 28); tab handle centred (electric).

### 1:96 Robotic Mower · photo
- T: "Select" 40/300 + "Zones to Cut" 40/500 (two lines, weight split).
- C: yellow circle action with black icon; glass orbs back/settings.

### 1:97 Helvio Routes · light (best "light ops" reference)
- S: header: logo + wordmark left, bell tile + avatar tile (64 square radius 16) right; meta row 12 ("Today: QD-37920 #4820…") → H1 40/400 two lines → search field (radius 16, 56) + filter tile 56 → card list.
- C: route progress = green solid → hatched green → light track, arrow head marker, endpoints with caps labels (HST / DLS) + date captions.
- K: tiles & fields share radius 16 and height 56 — **single control height per screen**.

### 1:98 Pulsetto Relief Mode
- S: segmented Basic/Premium (white active on gray track) → liquid-glass petal menu → headline "**Start Your** Stress Relief Mode".
- T: same-size headline split by weight + tone (600 ink / 300 gray).

### 1:99 CityBldr parcel cards (Swiss)
- R: radius 0 throughout; outlined chips; square translucent action tiles. Never mixed with rounded glass.

### 1:100 Truck pallet planner
- C: red hatched RESERVED cell, spaced caps label inside — hatch = blocked/reserved state.

### 1:101 Health Data / Records
- T: tab-titles "Data" ink / "Records" gray at the same size (title-as-tabs).
- S: white pill filter + × orb row → 2×2 squircle grid (radius ~36): white circle icon top-left, outlined value pill top-right, two-line label bottom-left.
- C: pending aura card "7-10" + superscript "Days", dot progress, product in white capsule.
- K: corner anchoring again — 4 corners carry 4 pieces of info.

### 1:102 Fleet reefer (mobile)
- C: notched sheet handle; soft-tint status pills (tint bg + same-hue text + dot); square tile dock, white active tile.

### 1:103 Yard cockpit
- C: translucent gray command list, active row has white icon tile; black chip "Automation & Safety ›"; gray chips for the rest — one ink chip per row.

### 1:104 Creative portfolio
- C: yellow glow outline on the selected card; white + orb; one yellow tag. Accent spent ≤3×.

### 1:105 Celoxis finance
- S: logo (yellow dot) + exit/× orbs → title 40/300 → filled search (radius ~20) → "Sort & Filter" label → folder card with invoices peeking → mono "Income / Expense" divider.
- K: folder metaphor = stacked cards offset 8–12 up, each slightly lighter.

### 1:106 Solar panel (mustard full-bleed)
- S: glass back orb + centred title 17/500 → 3D panel with glass pill tag "Last Cleaned Mar '26" → glass capsule arrows L/R → KV row (Tilt Angle 45° / Generated 84.2 Wh) → orb pager (outlined circles, white active) → white sheet with legend dots + ranges "54 kW — 120 kW".
- K: whole UI tinted by brand color, glass = white 30% on mustard. Ranges written with em-dash and spaces.

### 1:107 3D editor inspector (DOF close-up)
- C: hexagon-ish rounded tool tiles, one ink active; inspector fields "X 124.5" — axis letter 40% gray, value ink, inside gray filled field radius ~12; field group label 17/300 gray ("Position", "Rotation").
- K: label-inside-field prefix pattern (unit/axis as muted prefix).

### 1:108 Rail intermodal console
- S: hero render centre with dashed "empty slot" + ink + orb; right column of stacked ID cards ("Flatcar ID" caption gray centred → "40CN" 32/300 → render → two dropdown pills with status dot); bottom filmstrip of equal cards, selected one = white raised.
- K: dropdown pill = dot + value + chevron; dashed outline = empty/placeholder state.

### 1:109 Greenhouse (Swiss/square over photo)
- R: all radius 0: square back tile white, square translucent +/−/expand tile group joined (1px gaps), full-width translucent select "Greenhouse: Fresh Garden ⌄" (label gray / value white).
- C: white square card: title + "Module: №1453" → figure "78 %" (unit 40%) → product photo cell → "Collect in: 2 days" + dashed threshold line + vertical tick bars (lit week = ink tall bars) + day initials, bold = today → full-width footer button gray.
- K: square variant keeps the same hierarchy as rounded: title/meta, figure+unit, instrument, single action.

### 1:110 Stress monitor (sky aura)
- S: glass orbs back/filter + centred title → glass day pills (tall capsules ~64×100, icon above caps day), active = white solid → white sheet with huge top radius (~56) → "Daily Stress Index" 17 → "32 LVL" (figure 72/300, unit same baseline 40% gray) + ↗ top-right + mini ring legend (45 / 20) → arc tick ruler with glass bead knob and hour labels.
- K: sheet top radius >> card radius; ↗ arrow top-right again.

### 1:111 Kyoto audio guide (dark photo)
- T: "**Kyoto,** Japan" — same size, white / 60% white; subtitle "Quick Guide" 13 gray.
- C: liquid-glass joined orb trio (audio/photo/video) — blob merges; glass vertical slider capsule; glass bead scrubber on arc; dot-matrix "0:39" time; dark glass orbs top corners.

### 1:112 Cortisol test
- C: figure "2–4" 56/400 navy + unit "mg/mL" on its own line 15 gray; chart: y-axis italic light numerals, dotted baseline, curve solid inside range / gray outside, nodes as ink dots, active node = glass bead with dotted drop to baseline; x labels gray 13.
- K: sheet handle bar at bottom + page dots — bottom-sheet cards.

### 1:113 Video editor (dark over red photo)
- C: dot-timeline with time labels; time bubble "00:23.01:15" (secs muted); clips with dashed outline + glass handles; dashed "Click to add music" drop zone; bottom tool row: pill "Upscale" + 3 square tiles + one red-tinted destructive tile (radius ~16, 56 high).
- K: destructive = red-tinted tile at row end, never a red solid. Dotted grid bg on dark.

### 1:114 Collision reconstruction (blueprint)
- C: electric-blue canvas, white line-art exploded car; figure "35%" 48/300 + "• Significant" micro caption; translucent blue side panel with iridescent liquid-glass lens; form labels 600 white, values 300 white 80%, underline fields + chevron.
- K: on blueprint, form = label bold + value light, separated by 1px rules, no field boxes.

### 1:115 Node canvas (dark, dotted grid)
- C: node cards dark graphite radius ~16; green triangular port connectors; bundled curved wires (accent green + gray); node caption italic 15 below; KV meta "Type: / Info: / Status:" gray labels left, values right; + orb on canvas.
- K: one accent (green) for active wires only.

### 1:116 Compliance folders (dark)
- C: glass card "Corporate / Jan 01 – Mar 31 / 87%" (title 17, meta 13 gray, figure 40/300 with % 40%) + → top-right; 3D folder fan, one green selected; timeline card: chips row (Start · icon · "We're here" accent pill · icon · Finish), dense tick ruler with colored event dots above, date labels.
- K: "We're here" = accent pill marks "now" on a timeline.

### 1:117 Files sidebar (light desktop)
- S: nav list icon 20 + label 15, active = white pill + separate × orb; "+" affordances right-aligned on expandable items; footer group (Notifications/Settings/Account) pinned bottom; middle column of file cards (title 17 + "193 files" 13 gray + chevron orb) with paper previews peeking above.
- C: status pill "● Off Track / On Track / Delayed" — soft gray capsule + colored dot; "57%/100%" figure 64/300 with /100% small.
- K: card radius ~24 inside panel radius ~32; 8–12 gap between cards.

### 1:118 Biological age (aura)
- C: full-width aura card (orange core → periwinkle edge, radius ~40) with caption top centred, dot-matrix "25" white, sub "2.5 years younger" 13, tick ruler bottom with white needle; page dots; section header "Top Supplements for You" 26/400 + subtitle 13 gray; product cards with volt "Best Seller" tag top-left.
- K: centred hero = single-task metric; section header = h2 + one-line description, left aligned.

### 1:119 Robot cell (AI Configuration)
- S: back orb left, 3 white orbs right (list/bell/settings) → title 20/500 "AI Configuration" + red "● Maintenance" pill inline + subtitle "Line A" gray → wand/× icons right → 3D robot → ember-tinted glass card (Torq load, sub, "72 %", Max Limit dashed, density bars 0%–100%) → section "Station 01" + ←/→ orbs (→ ink solid) → white row card "CTX1250 / Error: Motor #4" + red pill.
- K: glass card takes the hue of the object behind it. Nav pair = outline/white prev + ink next.

### 1:120 Loan pipeline dashboard
- S: KPI trio "$14.2M": small raised $, integer 300 ink, decimal + M gray (same size decimal gray!) + caption; tools row (This Month pill ⌄, chart orbs); right column: aura insight card "Missing documents for **two active** applications." 34/300 white + avatars + ↗ orb; client list rows (avatar · name · amount · status pill · •••).
- C: status pills: Active gray, Pending yellow solid, Blocked coral solid — escalations get solid fill. Floating mini dock (5 orbs) mid-screen.
- K: decimals muted = same size, gray (dashboard), vs v1 smaller.

### 1:121 Greenhouse web (photo full-bleed)
- C: square translucent toolbar tiles (logo tile white), centred search bar translucent, select "Greenhouse: Fresh Garden ⌄" + pin/settings tiles; right utility tiles. Swiss variant over photo, 1px gaps between joined tiles.

### 1:122 Radiology console (dark, lime accent)
- S: 3 columns — left: back orb + name 26/300 + ID caption → select pill → profile card (olive aura header, KV 3-col grid, dotted weight trend) → 2 thumb cards; centre: 3D skeleton + glass annotation pills with ⚠ + floating detail card; right: chip tabs (lime active) + 2-col metric cards; bottom: timeline pill strip with glass year segments.
- C: metric card = name (accent bar left 2px) → "5.7 %" 32/300 unit 40% + arrow → tinted mini dot-chart band (tint matches status) → caption 11 gray. Tints: neutral / red / olive / green per status.
- K: lime accent spent on: active nav pill, active tab, doctor pill. Card radius ~12 on desktop; gap 8.

### 1:123 Glucose aura cards (DOF)
- C: aura cards (dusk → coral; sage; orchid) radius ~32, title 20/400 white top-left, "84 mg/dl" figure 64/300 + unit 28 same baseline bottom-left, ring with value right; film grain.

### 1:124 Sportcode (Swiss mobile)
- C: square header tiles (gray, 56), 2×2 video grid with 1px gaps, translucent square tool tiles over video, overlay score chips "ARS 0-0 LIV" micro; event list with row numbers 13 gray + label 15 + hairline separators; timecode "0:02:24.66".

### 1:125 Media cards (DOF, dark)
- C: cards radius ~32 with iridescent-lit photo; "+ Add Image" glass placeholder card; segmented orb group with white active orb.

### 1:126 Traffic incident (ember glass over map)
- C: ember glass panel (radius 0/4 — near-square) "Queue Backlog" 17/600 + sub; white line-art crash illo with horizontal leader hairlines; two inner tiles: label 17/400 italic-ish → "1.2mi" 56/300 + unit 40%, delta chips bottom-right (+12% ember solid / −2min green solid, radius 4).

### 1:127 Finora loan rates
- S: logo circle (yellow) + wordmark → title 34/400 "Loan Rates" + 1D chip → orbs (menu ink, avatar) → rate trio in staggered baseline: "5.99%" 56/400, % superscript gray; label gray 15; delta "▲ 0.125%" (triangle green/red, % small).
- C: yellow pill "0.042%" + ↑ orb; series chips (Conv. yellow active, FHA, VA gray); bars of gray hairlines with yellow line overlay.
- K: unit as superscript at ~40% size top-aligned.

### 1:128 Liquid-glass stepper (DOF)
- C: dark glass track capsule; inner glass lozenge with iridescent rim holds "– icon 3 icon –"; dot-matrix "Reviews" on blue card. Stepper = pill-in-pill.

### 1:129 Robot task timeline (electric card over grayscale photo)
- C: electric-blue card radius ~28: caps title 15/500 + gray sub, "Close ×" top-right; blueprint car with white scan line; "43 %" 40/300; segmented event track (white/orange/blue blocks on a rounded rail); "Manual mode" + dot-matrix field with a glowing blob cursor.
- K: selective color (blue car in gray scene) matches card hue.

### 1:130 Smart home (DOF)
- C: circle–pill: dark-olive translucent pill "View Cameras" 20/400 with gray orb (↔) at left, separate rose solid orb (bell) above-right as alert. Pill height ≈ orb + 16.

### 1:131 Athlete profile (dark photo)
- S: outline-glass capsules (back / ••• / +) not circles — rounded rect 48×32; centred title; white pill "Score: **91%**" (label 300, value 700); "Welcome back," 15 gray → name 34/600 white; stat cards glass dark, title two lines "**Win** / Rate", figure 56/600.
- K: sport variant allows bold numerals — exception, not rule.

### 1:132 Score radial (DOF)
- C: radial spokes (gray hairlines) with ember dots at varying radius = data; centre "52" 48/400 + "Fair" 20/300 gray. Dot-on-spoke radial = signature instrument.

### 1:133 Match stats dashboard (Swiss-ish light)
- C: score "3 — 2" 64/500 with crests; chips "Attack **22**"; ring gauges (thin 2px, value inside 20); paired hairline bars; momentum blocks (ink/hatched/green) by period; heat grid of green blocks with values; segmented 2×3 filter grid with 1px gaps.
- K: radius ≈ 4–8 on desktop cards; green accent family (3 tints) for one team.

### 1:134 Symptom tracker (white + pink aura)
- S: back orb + title 15 → segmented Chart/Table (ink active pill inside outline pill) → line chart with severity bands as right labels (Severe/Moderate/Mild/None), dashed band lines, lime gradient wedge at latest point, value "38.4°C" 20 italic + "+1.2°C" 11 → volt tag "Tip a Doctor" → body 20/400 three lines → pink aura bottom panel with wave top edge, glass pills product carousel, prices 24/300 white → glass "+ Add Entry >>" slide + white calendar orb.

### 1:135 Creative workspace (dark)
- C: lime solid orb joined to glass orb group (connected by a neck — liquid merge); hero card with yellow neon rim; white + orb centred; count badges "● 16" white pill on orbs; title 26/300 white two lines + 11 gray description.

### 1:136 Dental case (glass over red 3D)
- C: title "Case #14B0063" 34/300 white; orbit control (circular d-pad, axes labelled "Z (83)"); glass toolbar of orbs top centre; right glass panel with stepper list (numbered circles + values "8 · 23 · 24 · 25"), "Tx Overview" mini card with 3 KPIs + bars; bottom glass timeline (numbered day ticks, colored event marks); segmented "AI Highlight | Manual" glass.
- K: all glass panels same tint (blue-gray 40%) and radius (~24); 12 gap.

### 1:137 Energy settings (white on mustard)
- S: glass back orb + centred title 20/500 → section label 17/500 "Set Backup Reserve" → "20 %" 72/300 (unit 17, baseline) + "Recommended" right aligned caption on same baseline → 3D isometric house with glass pills attached by leader lines ("Add", "20%") and one accent pill "80%".
- K: label + figure + right-aligned qualifier on figure baseline — common pattern.

### 1:138 Storage growth (sage, DOF)
- C: white line curve inside a wider translucent band (confidence band), dashed crosshair to white nodes, glass annotation pill "▲ 2.8 x – Bad weather" (red triangle), week labels; ink pill CTA + ink orb at bottom.

### 1:139 / 1:140 Medication schedule (duplicate frames, DOF)
- C: segmented Day/Week/Month/Year (ink active, outline others); large gray-filled card radius ~40: 3D pill render with white ✓ disc, volt tag top-right "Ibuprofen", "After a meal" 13 gray → "400 mg" 28/400; tick ruler of weekdays with "Done" bubble over current day; instruction body 15 gray.
- K: 1:140 is a duplicate of 1:139.

### 1:141 Flasks widget stack (photo-noise backdrop)
- C: dark glass widget radius ~48: title 20/400 + ↗ outline orb; bell curve with glass bead cursor + vertical drop; outlined day orbs row, active = white solid; "‹ Jun 6 – Jun 12 ›" pager. Below: 2×2 capsule widgets (full pill shape, ~190×110) each aura-filled: caption centred 11 → dot-matrix value + unit + delta chip outline "↑ 1%"; last capsule = dark "+" add slot.
- K: widget grid gap 12; capsule radius = height/2.

### 1:142 Sensor scan dial (dark)
- C: dashed tick ring (60 ticks), progress sector darker, white disc centre, lit ticks white with one volt tick = current; dashed radial leaders.

### 1:143 Trip details (DOF, rose aura)
- C: photo tiles radius ~40, selected = white outline ring offset 6 with gap (partial ring), white orb with dot-matrix icon; info pills translucent (radius full) with pixel icons "Mono Lake, California, USA".
- K: selection = offset outline ring, not a fill.

### 1:144 Fleet card (volt-green aura, DOF)
- C: card filled with radial green aura (center saturated → white edge), black line-art isometric truck, ID "FUEL_MM_103" 34/500, owner 20/400, mono meta; tile ±sort control top-right (radius 16, tinted). Neighbor card gray = unselected.
- K: selected card = accent aura fill; unselected = neutral.

### 1:145 Drone defense (dark green, DOF)
- C: dot-halftone green field; drone in gray circular spotlight; red triangle alert; dark tiles "Engage Now" with pixel icon, "Mark as Priority" + white dot toggle; KV "Freq 2465.5 MHz", signal bars amber.

### 1:146 My Notes (glass over sage→sky photo)
- S: title "My Notes" 64/400 white 60% right-aligned + date "**19** december" → 2-col bento: tall glass card (♡ orb top-right, "New **plan** schedule" 34/300+700, glass checklist pills with spinner ring) | photo card ("Image Notes" + "Update 2n ago") over a glass card "My Lectures" → white input pill "What would you like to record?" + send orb inside → next card peeking with white + orb and glass mic orb.
- K: bento gap 12; card radius ~32; input pill height 64 with inset orb 48 (padding 8).

### 1:147 Readiness (DOF over photo)
- C: arc meter (white 2px track, lit portion bright, bead knob), dashed outer ticks; "88" 72/200 white outline-ish + "Readiness" 20/300.

### 1:148 Neuro session card (glass, DOF)
- C: warm glass card: glass orb icon top-left, meta "⏱ 10 min" 15 gray → title 34/400 three lines bottom-left; ink play orb bottom-right. Photo of subject inside card right half.
- K: canonical: icon TL, title BL, action BR.

### 1:149 Offshore rig (light, blueprint navy line-art)
- C: eyebrow location 15 gray → title "Spar Truss Structure" 40/400 two lines → range "8,040 ft – 15,200 ft" 17 gray; navy line-art isometric right half; figure "88.5 uptime" (48/500 + unit 17 baseline); stepped ember block bars (one accent block).

### 1:150 AI node canvas (dark, green)
- C: selected node = green aura card radius ~20 with logo + title 20 + ✓; field label 13 gray italic → dark select field radius 14 + chevron; edge labels in dark pill chips ("Model", "Memory"); deactivated node gray with red trash icon, caption below centred.
- K: node frame has an offset outer hairline (focus ring) radius +8.

### 1:151 Calendar widget (light, DOF)
- C: photo card radius ~20 with glass breadcrumb pill "Config / Tel Aviv", title 26/600 italic white, footer "8:30 AM / 24 Nov"; dashed amber outline drop target; gray "+" tile + "Add Widget" pill; summary headline with inline colored count badges ("Today you have **2** task…").

### 1:152 Traffic density (dark, square variant)
- R: square tiles 44 joined with 1px gaps; ember-tinted square card: title 17 + sub, × top-right, wireframe crash render, "94 %" 72/300 white + density bars (green/ember) with time labels; footer segmented: "Unlock Bypass" text tile + icon tiles, white active tile; bottom control strip "+ ◎ − | Alerts (ember solid) | Map"; alert rows (title + street gray + icon tile).

### 1:153 Robot CTX1250 (light, ember)
- S: back orb + ink pill "✓ Save Update" (height 44) → title 20/600 + red "● Maintenance" pill right → line-art robot w/ ember part + XYZ orbit gizmo → KV strip: three items (ring progress icon + label 13 gray + value 15) in white card radius 8 → ember dot-matrix joystick pad with axes labels.
- K: KV strip = icon-ring + stacked label/value, 3 columns, equal widths.

### 1:154 Truck loading (light, DOF)
- C: 3D white truck hero; "Side View / Top View" thumbnails in hairline-bordered cells (selected has white fill), cargo blocks in electric blue; section "Stops and Iteams" 26/500 + route sub gray; stop timeline with blue dots.

### 1:155 Breathing (ember photo, DOF)
- C: glass tag pill "Stress Relief" → headline 40/400 white "Take a deep breath…" → countdown "5…4…3…2…" 20 white 60% → glass slider capsule "Volume" with dot ticks.

### 1:156 Map region (DOF)
- C: grayscale topo map, dashed region bounding box, ember outlined polygon with dot-fill pattern + square/triangle markers; dark square tool strip.
- K: one accent area on a monochrome map.

### 1:157 Heart & Circulation (photo, DOF)
- C: headline 48/300 white two lines; timeline strip in a green-tinted glass band with volt "Now" flag, time ticks 13:00/13:05, white dots for events; aura stat tiles below ("+2000 Measurements").

### 1:158 Loadex port ops (dark teal, desktop)
- S: browser chrome → nav pills (white active with icon) + search pill + gear orb → alert pill "▲ Cargo loading error ⌄" centred → left column of glass ship cards (status chips "✳ Loading" green text, "Loaded" amber, "Queued" gray) → right "Cargo Optimizer" glass panel with legend (Critical red cube / Load Warning yellow cube) + issue list + prompt input "+" → bottom glass dock with segmented "‹‹ 2 ››".
- C: hero 3D container ship with 2–3 highlighted containers (red/cyan/amber) + glass marker orbs.
- K: status chip = icon + colored text on neutral glass (no tinted bg) in dark mode.

### 1:159 Car body scan (DOF)
- C: selective color: electric blue wireframe mesh on grayscale car; electric-blue squircle marker with white dot.

### 1:160 Cooling pill (dark, DOF)
- C: dark glass pill with orb icon left; two-line text: label 20/300 gray "Cooling to" + value 34/400 white "60.8°F". Pill radius = height/2; orb inset 8.

### 1:161 Retreats (light, mobile)
- C: glass orbs (eye/heart) + gray pill "✳ Retreats"; white search pill; photos with feathered/vignette edges (blurred mask) floating on dotted white; "Upcoming" 34/300 gray behind image; thumb carousel in a gray pill track, selected has white ring + play orb.
- K: images can dissolve into background (feathered mask) instead of hard radius.

### 1:162 Lawn mower (photo full-bleed)
- S: glass back orb + joined glass orb pair right → headline "Lawn Mower **Status**" 34 (300 / 500, two lines) → top-down 3D render with glass status pill (yellow pie icon + "78 %") → bottom glass dock of 3 orbs, centre = yellow solid power orb (larger).
- K: centred bottom dock: primary centre orb accent, secondaries glass.

### 1:163 Credit dashboard + TD Bank sheet (light + aura)
- C: white tiles radius ~32: outline icon orb TL + warning badge, ↗ gray orb TR, title 17 → "24/38" (figure 48/400 + /38 gray small) BL + dot grid BR. Aura sheet (olive→rose): bank logo ring + name 26, alarm orb + ink × orb; "Paid Amount" → "$12,340" 48/300 with small $ + "Term 36 m." meta; on-time ring "63%"; next payment track (paid portion glass, volt needle "▼", remaining pill); tabs Details/Timeline/Updates on a wave tab shape; 6×2 month grid glass cells radius 14 with volt ✓ discs, × for missed.
- K: SIP/EMI month grid canonical reference (glass cells, volt check, gray × missed). Strong reference for Gold SIP.

### 1:164 Cortisol (light)
- S: title 34/500 + settings orb → segmented chips Day (ink) / Week / Month / Year (gray soft pills height 56) → date 26/400 + calendar orb → white product card radius 40 "Weekly Dose / $49.90" (label 15 + price 34/400) with ink cart orb → aura score card peeking ("Score 95", glass i orb).

### 1:165 My Rings (DOF, sage glass)
- C: title 40/300 white; product render centred; KV left "Oura Ring 4 / Ceramic" 26/300, right "Cloud, Size 8 / Battery 19%" gray; glass + orb (large ~96) TR.

### 1:166 Velex gym (tablet, dark warm)
- S: logo tile + text nav (active white, rest gray) + square utility tiles → greeting "Hi Harold, you've **Completed 88%** of your planned workout." 26/300+600 → vertical ruler "52 inches" (figure 26 + ticks); photo hero with square glass annotation chips; playback strip; bottom 3 tiles (Total Volume 2340 kg + KVs, Muscle Fatigue hairline bars with ember highlights, Hydration arc gauge "Normal"); right warm-gray panel "Barbell Bench Press" with KV row "30 kg | 5 reps | 8" separated by dashes.
- K: square-ish radius 4 cards, gap 8 on tablet dashboards.

### 1:167 Solar home (white on mustard)
- S: glass back orb + caps title "201 OCEAN AVE" 20/500 + bell orb → caps address 13 → "5.4 kW" 72/400 + unit 17 → 3D house with leader lines to labels "Home 8.1 kW" / "Powerwall 4.7 kW · 97%" / "Grid 2.0 kW" (label 15 + value 15 gray) and one gold pill "Solar Panel" with gold line.
- K: leader-line callouts: 1px gray elbows, label right/left aligned at end.

### 1:168 Collision controls (blueprint, Swiss)
- R: square fields with 1px white 30% outline; labels bold italic 17 white; values 20 italic; buttons rectangular: outline "Export to PDF" + white solid "Find Latest Accident" (equal width, height 72). Swiss variant = all square.

### 1:169 Health dashboard (light, desktop)
- C: dot-matrix KPIs "21" "5" with gray pill qualifiers ("In range" / "Out of range"); "Health Improving" trend pill; aura tiles (bio-age orange/periwinkle with tick ruler, pink tracker); "Your results are pending" card "7-10 Days" + volt progress dot; section h2 "Top Supplements for You" 26 + sub + "See All" white pill right; product cards (volt "Best Seller" tag / gray "Fair Price"), name 13 gray, price 26/400 centred.
- K: tile radius ~32, gap 12; header row "title left / See All pill right" for sections.

### 1:170 Mission overview (space photo)
- S: glass back orb + centred title 17/500 + layers orb → horizontally scrolling glass select pills ("Behavior: Energy-Safe Mode ⌄", "⚠ Mission Ris…") → white event card radius ~40 with image cutout left (ring-outline frame) + title 20/500 "ADCS Torque Spike" + KV "Gyro-Z: 0,178° /s" (label gray, value ink, unit small gray) + caption → glass action tray of 3 icons attached under card.
- K: card + attached tool tray (same width-ish, radius matched) = contextual actions.

### 1:171 Incident overview (light, Swiss-ish)
- C: huge "48.2%" 96/200 behind; white card: electric-blue square tag, title 26/400, line-art crash, KV "Subaru Impreza · Vehicle 38" 600 + "Hard braking · Near collision" gray, underlined link "View Reconstruction"; halftone dot cloud chart.

### 1:172 Fashion catalog (light, DOF)
- C: category pills stacked vertically with soft shadow (neumorphic white), active = yellow solid; product tile radius ~40 cyan fill with dot-matrix caps name "JUNO COAT CREAM".

### 1:173 Container ID (dark)
- C: dark square-rounded tiles (back, expand, × — radius 14, 56); dark glass card radius 20: label 15 gray "Container ID" → "MSKU 487321-9" 40/300 → 2×2 KV grid with value 17 on top and label 15 gray below (value-first order).
- K: KV order value→label in ID cards (like dashboards).

### 1:174 / 1:175 TD Bank timeline (duplicates)
- C: same as 1:163 sheet: payment track, wave tab "Timeline", year label 20/300, month grid 4 columns (radius 14 cells, gap 6), bottom action row white pill (icon + label) + glass pill "Create Di…".
- K: 1:175 duplicate of 1:174.

### 1:176 Credit score 832 (DOF)
- C: delta "−1 pts" 20 (−1 bold) above; "832" 120/600 ink; qualifiers stacked right "Excellent / Checked Daily" 26/300 gray; gold aura corner with black arc gauge + triangle needle; white tile with outline icon orb + ember ⚠ badge + ink ↗ orb.
- K: bold numeral exception for credit score; qualifiers sit beside figure, aligned to its x-height band.

### 1:177 Heart pumping (dark, X-ray photo)
- C: title 40/300 white two lines; "● Patient ID: 00013" with volt dot; dashed analysis frame with corner bracket; warm glass pill "Analyze the area" (large, radius 24); square-rounded menu tile (radius 16) top right.

### 1:178 Design Sprint lecture (macro leaf photo)
- T: title 64/400 white two lines; body 17/300 white with 600 keyword emphasis, line-height ~1.9 (very airy); prompt "Write something" 56/400.
- C: filter pills: active white pill with lilac count badge "8 All notes", inactive = glass translucent.
- K: generous line-height for body over photos.

### 1:179 Creator tools (dark, DOF)
- C: dark pill with rainbow-gradient stroke segment + handle knobs (range selector); tick ruler with rainbow needle + "10/25"; bottom dock: gray orb + labelled pill "Community" + orbs.
- K: rainbow only as a 1–2px stroke accent, never a fill.

### 1:180 Property #619012 (light + coral aura)
- T: ID "#619012" 48/700 + "RC-4 / 80-D" 48/300 — weight split for ID vs code.
- C: square outlined chips (radius 2) "Score: **138.2**" (green value) / Apartments / 17 Units / 5,000 sq ft; KV "Owner / Kenneth Lee", "Last sold - 09.2021 / $ 2,150,000"; 2-col tiles split by 1px hairline: step-line chart with coral end dot → "$ 3,450 /mo"; IRR tick meter with coral bar → "6.2 %".
- K: hairline-divided grid instead of cards; coral aura behind lower half.

### 1:181 Text editor (dark teal)
- C: glass back orb, glass "Save" pill; floating toolbar pill: white + orb (larger, primary) + 2 icon glyphs; selected text highlight gray block; placeholder "Tap here to continue…" 20 gray; keyboard with glass rounded keys and toolbar chips (Aa, ●, ≡).

### 1:182 Salesforce program (desktop, light + auras)
- S: wordmark + centred nav pills (ink active) + icon orbs right → "Last updated 2 min ago" 12 → title 34/400 → 4 KPIs: tiny label chip (Target pink / Raised / Remaining / Investors gray) → figure 26/300 + superscript unit → caption 12 gray; centre vertical stepper list with Active black chip; right "Search investors 4-10 /days" card with ring diagram.
- C: tab pills (Details ink) + utility orbs right; bottom bento: teal aura big card (span 2 rows) + 4 aura tiles (violet, coral, pink, cyan) each: title 13 two lines TL, ↗ TR, figure "$1,195 /person" BL, mini viz.
- K: bento grid gap 4 (tight!) on this one; tiles radius ~6 on desktop.

### 1:183 My Transports (light)
- S: square back tile + centred title 20/600 + sub 15 gray + bookmark tile → white card radius 20: ID "R-1122915" 20/500 + blue tag "OL" + outline pill "Assigned" + expand tile → 3D truck → names left/right → dense tick track with arrow marker + dates → KV "250kg | -6hgf" with hairline separators → leader rows "Loading Meters ……… 9 ldm".
- K: tick-track progress for shipments.

### 1:184 Yard cockpit (duplicate-ish of 1:103)
- C: title 34/400 "Yard B, Yard Cockpit"; translucent gray command menu (4 rows, active white icon tile); chips gray "View & Navigation ›"; ink chip "Automation & Safety ›"; blue container selected; bottom sheet with handle: "Yard Trask" label → ID 40/300 + coral "High Priority" pill.

### 1:185 Pressure/Speed widgets (DOF)
- C: magenta→violet aura tile radius ~48: label 20 white TL, value "52%" 34/300 TR, tick ruler + dots + scale labels; white tile: "Speed" 20/500 + "90 RPM" (RPM small gray) + green-lit tick ruler + green ↑ disc between −20/+34; pink glass dock with white active pill.
- K: label TL + value TR + instrument bottom — "metric tile v2" (value right aligned in header row).

### 1:186 Model Y (olive-white aura over car)
- S: title 40/500 + chevron (switcher) + glass capsule ⋮ (wide pill, not orb) → lock/unlock glass capsules stacked vertical → row of 4 equal glass capsules (icons; last with "57%") → photo tiles "Location" / "Climate" radius ~32.
- K: control capsules all 120×72-ish, equal widths, gap 8 — equalised row.

### 1:187 AI assistant (volt-green aura full screen)
- T: "Hello Alex / Can I **help you?**" 26 (300 → 700 on key words).
- C: white chat bubble radius 24 (user), typing bubble "…"; wireframe wave line; glass mic orb with green core.

### 1:188 Yard utilization (light)
- S: square-rounded tiles back/search (radius 14) → white card radius 24: title 17 + expand icon → centred "78 %" 40/400 + caption 15 gray → dash-strip chart (short dashes ember/ink/gray by shift) with ember "Clear" separators → 2-col legend: dot + label 15 gray + value 15/600.
- K: second card "24 trucks / hr" (unit 26/300 gray).

### 1:189 Payouts (photo, glass)
- C: glass toast "$22 K +14% ↗ / upcoming this week" + ×; dark card "Bank Account **** 2644" + green card thumbnail + white swap orb; "Authenticated platform" list + gray + orb.

### 1:190 Bus telemetry (dark, DOF)
- C: KV list label-left gray 20 / value-right white 20 ("BUS-4120-NY", "None", "3,432 Km"); 3D bus with lidar arcs (mint), iridescent glass play bead; glass pill "Dashcam Archive"; ↗ top-right.

### 1:191 Supplement product (DOF)
- C: card radius ~48 neutral; dark-olive tag "Premium"; 3D pill with glass lens "Mg + Ca" overlapping; name 20 gray → price 40/400 ink.

### 1:192 Spend chart (steel-blue aura, DOF)
- C: solid white line for actual, dotted white for forecast/benchmarks, open-ring nodes, solid nodes for actual; slanted vertical cursor line; "Max $375" italic 20; white tiles with outline icon orb + title 26 italic.

### 1:193 ROS thermal (dark)
- C: square dark tiles (back, +/−) radius 8; dropdown tile "ROS #812 / ID #0US-23"; corner-bracket viewfinder + radar rings; warning glass chip "ⓘ Swarm Attack"; meter list: label 13 + value right 13, 2px bars colored (yellow/green/gray) on hairline track.

### 1:194 Route map (light 3D map)
- C: square-rounded white tiles (radius 16, 56) for map tools; maneuver card white radius 16 "↰ 0.12 mi + shield / Turn left after 0.12 mi"; lane-guidance strip; green route line + green location disc; bottom sheet "Route details": "34m 32sec" (figure 26/400 with units small gray, digits gray except key), "8 stops / On the route".
- K: time values with unit suffixes small + gray ("m", "sec").

### 1:195 Dental glass (DOF)
- C: stacked glass cards (front card shows scan "Front View", "4/8" counter, progress hairline cyan); glass squircle buttons (radius ~32) with pixel icons; message body 26/400 white.

### 1:196 Eli test (light)
- S: back orb + logo centred + step dots right → white card radius 48: ink tag "Test" → instruction 13 gray centred → "30 seconds" 40/400 → product render with concentric ripple rings → slide row (refresh orb · "Reset >>>" · ink refresh orb) → 2 tiles: mauve aura "Timer" picker (white tag, wheel numbers 34 centred, side ticks) + photo.
- K: centred single-task card; tiles radius 40.

### 1:197 Glucose radial menu (DOF)
- C: radial segmented menu (glass donut segments with icon + label 13 white), centre puck volt disc; active segment lighter; title 40/500 two lines.

### 1:198 Swarmix (dark teal)
- C: header: logo + weather tile "☀ 72°F" + device dropdown tile (radius 8); sheet card with notch handle: "ROS **#812-01US-23**" (300/600) + "wifi Good" caption; line-art robots + glass tooltip "Perimeter Security"; "Potential Range / 421.23 km" + 2px green progress; IR sensor card with fence line-art + red "⚠ Danger" glass chip + distance ruler labels.

### 1:199 / 1:200 Converter (dusk aura, duplicates)
- C: glass pill holding overlapping coin tokens + swap icon; "You will receive" 15 → "0.00321BNB" 72/300 with leading "0.00" at 30% opacity; KV rows label-left gray italic 13 / value-right 13; slide-to-convert glass track with frosted knob → and loader dots; home indicator.
- K: muted leading zeros — canonical numeral treatment. 1:200 duplicate.

### 1:201 Map task controls (dark glass, DOF)
- C: 2×2 offset grid of dark glass pills (Measure / Locate / Print / Edit) radius = full, 1px light rim; bottom dock: white active orb + dark orbs; tick strip right; "TASK CO…" caps micro label.

### 1:202 Map task controls (duplicate of 1:201)

### 1:203 Motor diagnostics (dark glass)
- C: 2 glass tiles with crosshair pads (dot glow), footer label 17 + value chip ("On", "18.3") right; "AI Diagnostic" card: label 15 gray + "Output ⌄" chip → "98.5%" 34/300 → section rows with hairline under label ("Winding Temp", "Vibration Dev") → colored event marks on dotted axis 0/50/100; heat grid of squares.

### 1:204 SOMA Glucose dashboard (iPad, light + photo)
- S: logo + centred nav pills (ink active) + date pill + utility orbs → title 48/400 two lines + sub 12 gray → left stack of glass cards (METABOLIC SCORE caps 13 + time + status "● Great" → "89 mg/dl" 26/400 → strip plot); 2-col small cards (Variability radial dots, Range tick rulers) → centre photo with radial glass menu + Glucose glass card (wave chart, volt bead) → right column Expiration "11 /14 days" + ring, Signal → bottom dark-glass cards (Score Calculation arcs, Cholesterol arc gauge).
- K: CAPS card titles 13/500 tracking +4% on this dashboard; card radius ~20; gap 8.

### 1:205 / 1:206 Mental stress (dark green, duplicates)
- C: header: icon + title 26/400 + ••• ; 3-col KV (label 17 gray / value 20 white, unit 300 lighter); beaded arc gauge (solid lit span between two glass beads, dotted rest, outer beads); glass verdict pill "Preliminary Result" centred; scale labels below (High Load gray / **Balanced** white / Resilient gray).
- K: canonical "beaded arc + glass verdict" component.

### 1:207 SOMA sensor detail (light → cream aura)
- C: line-art device top with spec pills ("● NFC 13.56MHz" label ink / value gray); sheet cream radius 32: "SOMA 3 SENSOR" caps 17 + "· Gen 3" + "● Active" volt; 3-col figures with varying sizes (Expiration "11 /14 d", Accuracy "98 %", Metering "43 times") staggered baselines; leader rows icon + label gray / dotted leader / value ink; bottom dock: ? orb, ink pill (NFC icon) centre, sliders orb.
- K: dotted leader KV with leading icon.

### 1:208 rPPG signal (dark green)
- C: card title with white squircle icon + ••• ; curve: solid green inside window between glass beads, dotted outside; peak white dot + dashed drop + "Δ1.03s" label; formula caption italic; 3 KPIs bottom (label 15 gray / figure 56/300 / unit 13).

### 1:209 QuickBooks dashboard (light, Swiss, lime)
- R: radius 0; panels split by hairlines; lime solid tags "-1.3%", "+2.4%" (square); bars as vertical hairline hatch fills with one lime solid; amounts "$467,121" 34/300 + caption 15 gray; ask bar dark glass square with "?" and grid tiles; lime CTA block "Break free from the desk" 34/400 + body 15 + outlined square → button.
- K: Swiss variant: lime full-bleed block as CTA, hatch bars, square tags.

### 1:210 Energy peak (mustard + gray sheet)
- C: glass close orb centred on mustard header; segmented Week/Weekend: mustard-glass active (radius full, 64), iridescent edge; "84.2 kW" 72/400 + unit 17; range "12 PM —— 6 PM" right aligned on figure baseline; grid of dashed rows + white column highlight, glass capsule bead on mustard line, ▲ marker + "Peak Load" label; tariff card "● Off-Peak $0.14 … $0.12".

### 1:211 Cloud farm (photo only)
- C: full-bleed photo, tiny white tick-bar signature bottom-right. Presentation frame, no UI.

### 1:212 Reserve stock (white on mustard)
- S: glass back orb + centred title 20/500 + bell orb → "20.1 kWh" 72/400 + "Day ▾" white raised pill right → line chart: mustard line, dashed grid, y labels right, x labels bottom 13, mustard pill annotation "Peak Load", projection cone (gradient wedge) from end dot → mustard sheet "Energy Flow / Used From" + 2 glass orbs.

### 1:213 Load planner (desktop, light)
- C: right accordion panel: section rows radius 16 ("Loaded Space ⌄", "Loading ⌄", "Added Loads ⌃") → item rows: thumbnail + count badge ink pill + name 15 + 2 meta lines 11 gray + stepper +/− orbs stacked; section tiles "72 % Loaded space" with gradient vertical meters (blue→green→yellow); chips "Wheel Arches / Cooling Unit / Variofloor"; gradient slider (blue→green) with knob "83".

### 1:214 / 1:215 AI video node editor (dark desktop, duplicates)
- C: left asset panel (dark glass, search, folders with count chips, avatar grid, integration rows "Connect" pill); node cards graphite radius 12 with dot + title 13 + ports (colored dots) + KV rows; ember-tinted active node; preview card radius 20 with photo + media controls; prompt bar glass with chips "Script / Emotions / Voiceover / Dynamics".

### 1:216 Compliance folder (green aura, DOF)
- C: glass folder card (back panel + front pocket, both glass with 1px white rim, radius ~40) holding white documents; front: "👥 4" TL, title BL, "12Doc" BR. Floating doc glyphs glass.
- K: folder metaphor = two stacked glass panes, documents peek between.

### 1:217 Breath Awareness (ember photo)
- C: glass card radius ~48 over portrait, petal glass shapes behind; title 26/400 white two lines TL; hairline audio bars; "25 min" 13 BR; white pill "▷ Listen" (height 64) centred bottom.

### 1:218 OpenAI node (green photo)
- C: green-tinted glass card radius 20 with outer offset hairline frame (+12, focus ring); header icon + title 20/400 two lines + ✓ TR, hairline divider; field label 15 gray → glass select (radius 16, 64 high) value 17 + chevron.

### 1:219 GCT Balance (iridescent aura card)
- C: glass card radius ~48 over blurred aura: header "Progress" 15 + "Dates: 2025 ⌄" (label gray / value white); title 34/500; dot-matrix footprints with glass beads; split "51 % / 49 %" 40/300 with small units; KPI "Cadence 171 SPM" + "Stride 0.95 M" with tick slider + yellow ▼ needle.

### 1:220 Penetration Risk (dark photo)
- C: warm-dark glass card radius 20: title 20/400 → viewfinder brackets with flame figure + warm glass chip "ⓘ Swarm Attack" → meter rows (label 13 + value right 13, 2px colored bar red/yellow on hairline track).
