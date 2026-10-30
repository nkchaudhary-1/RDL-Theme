/* Atlas theme engine. Same maths as scripts/palette.mjs, shared by Atlas Studio (browser) and the
   atlas CLI (Node). Pure functions, no DOM.
   buildTheme({name, primary, secondary, neutral, corners, type}) → theme
   check(theme) → [{theme, label, min, ratio, ok}]   (every row must pass; the role picker guarantees it)
   cssFor(theme, scoped) · dtcgFor(theme) · tailwindFor(theme) · figmaFor(theme) → strings */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AtlasTheme = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const LADDER = { 50: 1.06, 100: 1.16, 200: 1.38, 300: 1.8, 400: 2.2, 500: 3.5, 600: 5.4, 700: 7.5, 800: 10.2, 900: 13.5, 950: 17.5 };
  const CHROMA = { 50: 0.025, 100: 0.05, 200: 0.085, 300: 0.12, 400: 0.16, 500: 0.17, 600: 0.17, 700: 0.155, 800: 0.14, 900: 0.12, 950: 0.09 };
  const WHITE = [255, 255, 255], BLACK = [0, 0, 0];
  const FONTS = {
    inter: { display: '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', body: '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', link: "family=Inter:wght@400;500;600;700" },
    jakarta: { display: '"Plus Jakarta Sans", "Inter", sans-serif', body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', link: "family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700" },
    manrope: { display: '"Manrope", "Inter", sans-serif', body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', link: "family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700" },
    plex: { display: '"IBM Plex Sans", "Inter", sans-serif', body: '"IBM Plex Sans", "Inter", -apple-system, sans-serif', link: "family=IBM+Plex+Sans:wght@400;500;600;700" },
    dm: { display: '"DM Sans", "Inter", sans-serif', body: '"DM Sans", "Inter", -apple-system, sans-serif', link: "family=DM+Sans:wght@400;500;600;700" },
    fraunces: { display: '"Fraunces", Georgia, serif', body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', link: "family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700" },
  };
  const RADII = { sharp: { button: 4, field: 4, card: 8, overlay: 12 }, soft: { button: 8, field: 8, card: 16, overlay: 24 }, round: { button: 12, field: 12, card: 20, overlay: 28 }, pill: { button: 9999, field: 12, card: 24, overlay: 32 } };
  const DEFAULTS = { name: "Northwind", primary: "#4362CE", secondary: "#0893C6", neutral: "tinted", corners: "soft", type: "inter" };

  /* ---------- colour maths ---------- */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const hexToRgb = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16));
  const rgbToHex = (rgb) => "#" + rgb.map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0").toUpperCase()).join("");
  const s2l = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const l2s = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
  const luminance = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  function rgbToOklch([r, g, b]) {
    const [R, G, B] = [s2l(r), s2l(g), s2l(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return { L, C: Math.hypot(a, bb), h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 };
  }
  function oklchToLinear(L, C, h) {
    const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  }
  const inGamut = (rgb) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);
  function toRgb(L, C, h) { let c = C, rgb = oklchToLinear(L, c, h); while (!inGamut(rgb) && c > 0) { c -= 0.002; rgb = oklchToLinear(L, c, h); } return rgb.map((v) => Math.round(clamp(l2s(v), 0, 1) * 255)); }
  function solve(target, C, h) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 50; i++) { const mid = (lo + hi) / 2; if (contrast(toRgb(mid, C, h), WHITE) > target) lo = mid; else hi = mid; }
    let L = lo, rgb = toRgb(L, C, h); while (contrast(rgb, WHITE) < target && L > 0) { L -= 0.0005; rgb = toRgb(L, C, h); } return rgb;
  }
  /* A full scale from a hue, with the user's exact colour pinned to its nearest step. */
  function scaleFrom(hex, chromaFloor, chromaCap) {
    const rgb = hexToRgb(hex), { C, h } = rgbToOklch(rgb);
    const c = chromaCap !== undefined ? chromaCap : Math.max(chromaFloor, C);
    const out = {};
    for (const s of STEPS) out[s] = rgbToHex(solve(LADDER[s], Math.min(c, CHROMA[s]), h));
    let pin = null;
    if (chromaCap === undefined) { const R0 = contrast(rgb, WHITE); pin = STEPS.reduce((best, s) => (Math.abs(Math.log(LADDER[s]) - Math.log(R0)) < Math.abs(Math.log(LADDER[best]) - Math.log(R0)) ? s : best), 50); out[pin] = hex.toUpperCase(); }
    return { steps: out, pin, hue: h };
  }
  function neutralScale(primaryHex, mode) {
    const { h } = rgbToOklch(hexToRgb(primaryHex));
    const hue = mode === "cool" ? 262 : mode === "warm" ? 70 : h;
    return scaleFrom(rgbToHex(toRgb(0.5, 0.1, hue)), 0, mode === "pure" ? 0 : 0.012);
  }

  /* ---------- role selection: every choice is a contrast rule ---------- */
  const idx = (s) => STEPS.indexOf(s), at = (i) => STEPS[clamp(i, 0, STEPS.length - 1)];
  const R = (hex) => contrast(hexToRgb(hex), WHITE);
  const cr = (a, b) => contrast(hexToRgb(a), hexToRgb(b));
  function textOn(fill, darkCandidate) { if (cr("#FFFFFF", fill) >= 4.5) return "#FFFFFF"; if (cr(darkCandidate, fill) >= 4.5) return darkCandidate; return "#000000"; }
  /* Hover/active fills: step away from the resting fill in the preferred direction (+1 darker, -1 lighter),
     but flip direction if the button text would drop below 4.5:1 on that shade. */
  function states(s, step, text, dir) {
    const pick = (k) => { let a = at(idx(step) + dir * k); if (a === step || cr(text, s[a]) < 4.5) a = at(idx(step) - dir * k); return s[a]; };
    return [pick(1), pick(2)];
  }
  /* First step, scanning from the pinned step in a direction (+1 darker, -1 lighter), whose real contrast
     against white satisfies pred. Uses actual scale values, so a pinned colour never breaks a rule. */
  function stepWhere(s, start, dir, pred) { for (let i = idx(start); i >= 0 && i < STEPS.length; i += dir) if (pred(R(s[STEPS[i]]))) return STEPS[i]; return dir > 0 ? 950 : 50; }
  function roles(scale, neutral, notes, label) {
    const s = scale.steps, pin = scale.pin, r0 = R(s[pin]);
    const light = {}, dark = {};
    // light: fill = pinned colour; text chosen to pass; indicator/link darkened only as far as needed
    light.action = s[pin];
    light["text-on-action"] = textOn(light.action, s[950]);
    [light["action-hover"], light["action-active"]] = states(s, pin, light["text-on-action"], 1);
    const ind = stepWhere(s, pin, 1, (r) => r >= 3.3); light.brand = s[ind];        // >= 3:1 on canvas (1.06)
    light["text-on-brand"] = textOn(light.brand, s[950]);
    [light["brand-hover"], light["brand-active"]] = states(s, ind, light["text-on-brand"], 1);
    const txt = stepWhere(s, pin, 1, (r) => r >= 5.4); light["brand-text"] = s[txt]; light["text-link"] = s[txt];   // >= 4.5 on sunken (1.16)
    light["text-link-hover"] = s[at(idx(txt) + (idx(txt) >= 9 ? -1 : 1))];
    light["brand-subtle"] = s[50]; light["brand-subtle-hover"] = s[100]; light["brand-border"] = s[300]; light["bg-selected"] = s[50]; light.selection = s[100]; light["focus-ring"] = light.brand; light["focus-ring-inner"] = "#FFFFFF";
    // dark: surfaces are neutral 950 / 900 / 800 (17.5 / 13.5 / 10.2 vs white)
    const dAct = stepWhere(s, pin, -1, (r) => r <= 5.8); dark.action = s[dAct];        // >= 3:1 on canvas
    dark["text-on-action"] = textOn(dark.action, neutral.steps[950]);
    [dark["action-hover"], dark["action-active"]] = states(s, dAct, dark["text-on-action"], -1);
    const dInd = stepWhere(s, pin, -1, (r) => r <= 3.4); dark.brand = s[dInd];        // >= 3:1 on raised
    dark["text-on-brand"] = textOn(dark.brand, neutral.steps[950]);
    [dark["brand-hover"], dark["brand-active"]] = states(s, dInd, dark["text-on-brand"], -1);
    const dTxt = stepWhere(s, pin, -1, (r) => r <= 2.2); dark["brand-text"] = s[dTxt]; dark["text-link"] = s[dTxt]; dark["text-link-hover"] = s[at(idx(dTxt) - 1)];   // >= 4.5 on raised
    dark["brand-subtle"] = s[900]; dark["brand-subtle-hover"] = s[800]; dark["brand-border"] = s[700]; dark["bg-selected"] = s[900]; dark.selection = s[800]; dark["focus-ring"] = dark.brand; dark["focus-ring-inner"] = neutral.steps[950];
    if (r0 < 4.5) notes.push(`${label} ${s[pin]} is light (${r0.toFixed(1)}:1 on white), so buttons use ${light["text-on-action"] === "#000000" ? "black" : "a deep shade"} text and links use step ${txt} (${R(s[txt]).toFixed(1)}:1).`);
    else notes.push(`${label} ${s[pin]} is ${r0.toFixed(1)}:1 on white, so buttons keep white text${txt !== pin ? ` and links use step ${txt} for 4.5:1 on tinted surfaces` : " and links use it directly"}.`);
    if (dAct !== pin) notes.push(`In dark mode ${label.toLowerCase()} buttons lighten to step ${dAct} so they stay 3:1 against the dark surfaces.`);
    return { light, dark };
  }
  function accentRoles(scale, neutral, notes) {
    const s = scale.steps, pin = scale.pin;
    const li = stepWhere(s, pin, 1, (r) => r >= 3.3), lt = stepWhere(s, pin, 1, (r) => r >= 5.4);
    const light = { accent: s[li], "accent-text": s[lt], "accent-bg": s[50], "accent-border": s[300] };
    light["text-on-accent"] = textOn(light.accent, s[950]); light["accent-hover"] = states(s, li, light["text-on-accent"], 1)[0];
    const di = stepWhere(s, pin, -1, (r) => r <= 3.4), dt = stepWhere(s, pin, -1, (r) => r <= 2.2);
    const dark = { accent: s[di], "accent-text": s[dt], "accent-bg": s[900], "accent-border": s[700] };
    dark["text-on-accent"] = textOn(dark.accent, neutral.steps[950]); dark["accent-hover"] = states(s, di, dark["text-on-accent"], -1)[0];
    notes.push(`Secondary ${s[pin]} drives the accent roles: tinted band and badges use step 50 with step ${lt} text (${cr(s[lt], s[50]).toFixed(1)}:1).`);
    return { light, dark };
  }

  /* ---------- theme assembly ---------- */
  function buildTheme(st) {
    const notes = [];
    const brand = scaleFrom(st.primary, 0.1), accent = scaleFrom(st.secondary, 0.1), neutral = neutralScale(st.primary, st.neutral);
    const b = roles(brand, neutral, notes, "Primary"), a = accentRoles(accent, neutral, notes);
    const light = { ...b.light, ...a.light }, dark = { ...b.dark, ...a.dark };
    notes.push({ tinted: "Neutrals carry a faint tint of the primary hue.", cool: "Neutrals are cool grey.", warm: "Neutrals are warm grey.", pure: "Neutrals are pure grey." }[st.neutral]);
    return { brand, accent, neutral, light, dark, radius: RADII[st.corners], font: FONTS[st.type], notes, settings: st };
  }
  const NEUTRAL_ROLES = {
    light: { "bg-canvas": 50, "bg-surface": "#FFFFFF", "bg-raised": "#FFFFFF", "bg-sunken": 100, "bg-inverse": 900, "bg-hover": 100, "bg-active": 200, "bg-disabled": 100, "text-primary": 900, "text-secondary": 700, "text-tertiary": 600, "text-placeholder": 600, "text-disabled": 400, "text-inverse": "#FFFFFF", "border-subtle": 200, "border-default": 300, "border-strong": 500, "border-inverse": 700, skeleton: 200, "skeleton-shine": 100 },
    dark: { "bg-canvas": 950, "bg-surface": 900, "bg-raised": 800, "bg-sunken": 950, "bg-inverse": 50, "bg-hover": 800, "bg-active": 700, "bg-disabled": 800, "text-primary": 50, "text-secondary": 300, "text-tertiary": 400, "text-placeholder": 400, "text-disabled": 600, "text-inverse": 900, "border-subtle": 800, "border-default": 700, "border-strong": 400, "border-inverse": 300, skeleton: 800, "skeleton-shine": 700 },
  };
  const resolveNeutral = (th, theme, role) => { const v = NEUTRAL_ROLES[theme][role]; return typeof v === "number" ? th.neutral.steps[v] : v; };

  /* ---------- contrast proof (same pairs the repo checker uses for these roles) ---------- */
  const PAIRS = [
    ["text-on-action", ["action", "action-hover", "action-active"], 4.5, "Button text on primary"],
    ["text-link", ["bg-surface", "bg-canvas", "bg-sunken", "bg-selected"], 4.5, "Links on surfaces"],
    ["brand-text", ["brand-subtle", "bg-surface"], 4.5, "Brand text on tint"],
    ["text-on-brand", ["brand"], 4.5, "Text on brand indicator"],
    ["accent-text", ["accent-bg", "bg-surface", "bg-canvas"], 4.5, "Accent text on tint and surfaces"],
    ["text-on-accent", ["accent", "accent-hover"], 4.5, "Text on accent button"],
    ["text-primary", ["bg-canvas", "bg-surface", "bg-raised", "bg-sunken", "bg-selected", "accent-bg"], 7, "Body text (AAA)"],
    ["text-secondary", ["bg-canvas", "bg-surface", "bg-raised", "bg-sunken", "bg-selected", "accent-bg"], 4.5, "Secondary text"],
    ["text-tertiary", ["bg-canvas", "bg-surface", "bg-raised", "bg-sunken"], 4.5, "Tertiary text"],
    ["brand", ["bg-surface", "bg-canvas", "bg-raised"], 3, "Focus ring, checks, tab underline"],
    ["accent", ["bg-surface", "bg-canvas"], 3, "Accent icons and borders"],
    ["focus-ring", ["focus-ring-inner"], 3, "Focus ring vs halo"],
    ["border-strong", ["bg-surface", "bg-canvas", "bg-raised"], 3, "Input borders"],
  ];
  function check(th) {
    const val = (theme, role) => th[theme][role] || resolveNeutral(th, theme, role);
    const rows = [];
    for (const theme of ["light", "dark"]) for (const [fg, bgs, min, label] of PAIRS) { let worst = Infinity; for (const bg of bgs) worst = Math.min(worst, cr(val(theme, fg), val(theme, bg))); rows.push({ theme, label, min, ratio: worst, ok: worst >= min }); }
    return rows;
  }

  /* ---------- outputs ---------- */
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brand";
  function cssFor(th, scoped) {
    const sel = scoped ? `:root[data-brand="${slug(th.settings.name)}"]` : ":root";
    const prim = (name, sc) => STEPS.map((s) => `  --at-${name}-${s}: ${sc.steps[s]};`).join("\n");
    const sem = (o) => Object.entries(o).map(([k, v]) => `  --at-${k}: ${v};`).join("\n");
    const rad = Object.entries(th.radius).map(([k, v]) => `  --at-radius-${k}: ${v}px;`).join("\n");
    const fonts = `  --at-font-display: ${th.font.display};\n  --at-font-sans: ${th.font.body};`;
    return `/* ${th.settings.name} theme for Atlas, generated by Atlas Studio.\n   Primary ${th.settings.primary} · Secondary ${th.settings.secondary} · Neutrals ${th.settings.neutral} · Corners ${th.settings.corners}\n   Load after atlas-tokens.css. Every pairing below passes WCAG 2.2 AA in light and dark. */\n\n${sel} {\n${prim("brand", th.brand)}\n${prim("accent", th.accent)}\n${prim("neutral", th.neutral)}\n\n${sem(th.light)}\n\n${rad}\n${fonts}\n}\n\n@media (prefers-color-scheme: dark) {\n  ${sel}:not([data-theme="light"]) {\n${sem(th.dark).replace(/^/gm, "  ")}\n  }\n}\n\n${sel}[data-theme="dark"] {\n${sem(th.dark)}\n}\n`;
  }
  function dtcgFor(th) {
    const color = (hex) => ({ $type: "color", $value: hex });
    const scale = (sc) => Object.fromEntries(STEPS.map((s) => [String(s), color(sc.steps[s])]));
    const sem = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, color(v)]));
    return JSON.stringify({ $description: `${th.settings.name} theme for the Atlas design system (generated by Atlas Studio)`, $extensions: { "com.atlas.studio": th.settings }, color: { brand: scale(th.brand), accent: scale(th.accent), neutral: scale(th.neutral) }, semantic: { light: sem(th.light), dark: sem(th.dark) }, radius: Object.fromEntries(Object.entries(th.radius).map(([k, v]) => [k, { $type: "dimension", $value: `${v}px` }])), font: { display: { $type: "fontFamily", $value: th.font.display }, body: { $type: "fontFamily", $value: th.font.body } } }, null, 2);
  }
  function tailwindFor(th) {
    const scale = (sc) => Object.fromEntries(STEPS.map((s) => [String(s), sc.steps[s]]));
    const roles = Object.fromEntries(Object.keys(th.light).map((k) => [k, `var(--at-${k})`]));
    return `// ${th.settings.name} · Tailwind preset generated by Atlas Studio. Import the CSS theme first.\nmodule.exports = ${JSON.stringify({ theme: { extend: { colors: { brand: scale(th.brand), accent: scale(th.accent), neutral: scale(th.neutral), ...roles }, borderRadius: Object.fromEntries(Object.entries(th.radius).map(([k, v]) => [k, `${v}px`])), fontFamily: { display: [th.font.display], sans: [th.font.body] } } } }, null, 2)};\n`;
  }
  function figmaFor(th) {
    const tok = (v, type = "color") => ({ value: v, type });
    const scale = (sc) => Object.fromEntries(STEPS.map((s) => [String(s), tok(sc.steps[s])]));
    const ref = (hex, sets) => { for (const [name, sc] of sets) for (const s of STEPS) if (sc.steps[s] === hex) return `{color.${name}.${s}}`; return hex; };
    const sets = [["brand", th.brand], ["accent", th.accent], ["neutral", th.neutral]];
    const sem = (theme) => { const o = {}; for (const [k, v] of Object.entries(th[theme])) o[k] = tok(ref(v, sets)); for (const k of Object.keys(NEUTRAL_ROLES[theme])) o[k] = tok(ref(resolveNeutral(th, theme, k), sets)); return o; };
    return JSON.stringify({ global: { color: { brand: scale(th.brand), accent: scale(th.accent), neutral: scale(th.neutral) }, radius: Object.fromEntries(Object.entries(th.radius).map(([k, v]) => [k, tok(String(v), "borderRadius")])), font: { display: tok(th.font.display.split(",")[0].replace(/"/g, ""), "fontFamilies"), body: tok(th.font.body.split(",")[0].replace(/"/g, ""), "fontFamilies") } }, light: { semantic: sem("light") }, dark: { semantic: sem("dark") }, $themes: [{ id: "light", name: "Light", selectedTokenSets: { global: "enabled", light: "enabled" } }, { id: "dark", name: "Dark", selectedTokenSets: { global: "enabled", dark: "enabled" } }], $metadata: { tokenSetOrder: ["global", "light", "dark"] } }, null, 2);
  }

  return { STEPS, LADDER, CHROMA, FONTS, RADII, DEFAULTS, NEUTRAL_ROLES, PAIRS, hexToRgb, rgbToHex, rgbToOklch, toRgb, contrast, R, cr, scaleFrom, neutralScale, buildTheme, check, cssFor, dtcgFor, tailwindFor, figmaFor, slug, resolveNeutral };
});
