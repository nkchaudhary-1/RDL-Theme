#!/usr/bin/env node
// Atlas contrast-anchored palette. Writes the `primitive` block of assets/tokens/tokens.json.
//   node skills/atlas/scripts/palette.mjs
//
// Every step of every hue is solved (in OKLCH, binary search on lightness) so that its WCAG contrast
// against white equals the ladder value in tokens.json → palette.ladder. Because WCAG contrast is
// (L1 + 0.05) / (L2 + 0.05), a darker step X placed on a lighter step Y always has contrast R_X / R_Y,
// whatever the hue. That is what makes the semantic pairings in foundations.md provable:
//   600 on white = 5.4   700 on 50 = 7.1   600 on 100 = 4.7   300 on 900 = 7.5   400 on 800 = 4.6
// Chroma is capped per step (light tints stay soft, deep shades stay readable) and reduced until the
// colour is inside sRGB. Rounding to 8-bit is re-checked so no step ends up below its target.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "assets/tokens/tokens.json");
const t = JSON.parse(readFileSync(file, "utf8"));
const { ladder, hues, chroma } = t.palette;

const lin2s = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
function oklchToLinear(L, C, h) {
  const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const inGamut = (rgb) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);
function toSRGB255(L, C, h) {
  let c = C, rgb = oklchToLinear(L, c, h);
  while (!inGamut(rgb) && c > 0) { c -= 0.002; rgb = oklchToLinear(L, c, h); }
  return rgb.map((v) => Math.round(Math.min(1, Math.max(0, lin2s(v))) * 255));
}
export const luminance = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = (rgb) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");
const WHITE = [255, 255, 255];

function solve(target, C, h) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (contrast(toSRGB255(mid, C, h), WHITE) > target) lo = mid; else hi = mid; }
  let L = lo, rgb = toSRGB255(L, C, h);
  while (contrast(rgb, WHITE) < target) { L -= 0.0005; rgb = toSRGB255(L, C, h); }
  return rgb;
}

const primitive = { white: "#FFFFFF", black: "#000000" };
for (const [name, { h, c }] of Object.entries(hues)) {
  primitive[name] = {};
  for (const [step, R] of Object.entries(ladder)) primitive[name][step] = hex(solve(R, Math.min(c, chroma[step]), h));
}
t.primitive = primitive;
// Presets: re-solve only the hues they change, then pin any exact overrides.
for (const [name, preset] of Object.entries(t.presets || {})) {
  if (name.startsWith("_")) continue;
  const prim = {};
  for (const [hueName, { h, c }] of Object.entries(preset.hues || {})) {
    prim[hueName] = {};
    for (const [step, R] of Object.entries(ladder)) prim[hueName][step] = hex(solve(R, Math.min(c, chroma[step]), h));
  }
  for (const [hueName, steps] of Object.entries(preset.overrides || {})) { prim[hueName] = { ...(prim[hueName] || {}), ...steps }; }
  preset.primitive = prim;
}
writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
const all = [["base", primitive], ...Object.entries(t.presets || {}).filter(([k]) => !k.startsWith("_")).map(([k, p]) => [k, p.primitive])];
for (const [label, prims] of all) for (const [name, steps] of Object.entries(prims)) {
  if (typeof steps === "string") continue;
  if (label !== "base") process.stdout.write(`[${label}] `);
  console.log(name.padEnd(8), Object.entries(steps).map(([s, hx]) => `${s} ${hx} ${contrast(hx.slice(1).match(/../g).map((x) => parseInt(x, 16)), WHITE).toFixed(2)}`).join("  "));
}
console.log(`wrote ${file}`);
