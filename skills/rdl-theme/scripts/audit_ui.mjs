#!/usr/bin/env node
// RDL UI audit: checks a rendered page against the token ladders and layout rules.
//
//   node skills/rdl-theme/scripts/audit_ui.mjs <file.html|url> [more…] [--w 1600 --h 1200] [--json] [--strict]
//
// Scope: elements inside [data-audit-scope] (fallback: body). Skips SVG internals and anything under
// [data-audit-ignore] (presentation chrome such as status bars and shot captions).
//
// Errors (exit 1):  font size not on the type scale · spacing (padding / margin / gap) not on the
//                   spacing ladder · radius not on the radius scale · control height not on the
//                   control ladder · mixed control heights in one row · text contrast < 4.5:1
//                   (3:1 for ≥ 24px, or ≥ 19px at 600+), measured on the rendered pixels behind the text ·
//                   content running into the pinned bottom zone (needs 12 clear).
// Warnings:         font weight outside 300–600 · non-concentric nested radius (inner ≠ outer − gap, where
//                   gap = padding + border + offsets, measured per corner) · accent used more
//                   than 3 times in one scope · interactive target < 44 (touch) or < 24 (viewport ≥ 1024,
//                   pointer; override with --min-target N).
// --strict turns warnings into errors.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(execSync("npm root -g").toString().trim() + "/playwright"); }

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, "../assets/tokens/tokens.json"), "utf8"));
const vals = (o) => Object.entries(o).filter(([k]) => !k.startsWith("_")).map(([, v]) => v).filter((v) => typeof v === "number");
const rules = {
  fontSizes: [...new Set(Object.values(tokens.type.scale).map((s) => s.size))],
  spacing: [...new Set([0, 1, ...vals(tokens.space), ...vals(tokens.layout)])],
  radii: [...new Set([0, ...vals(tokens.radius)])],
  controls: [...new Set(vals(tokens.size).filter((n) => n >= 24 && n <= 64))],
};

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const W = +flag("--w", 1600), H = +flag("--h", 1200);
const json = args.includes("--json"), strict = args.includes("--strict");
const minTarget = +flag("--min-target", W >= 1024 ? 24 : 44); // touch 44 · pointer 24 (WCAG 2.2)
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) { console.error("usage: audit_ui.mjs <file.html|url> [...] [--w N --h N] [--json] [--strict]"); process.exit(2); }
const toURL = (t) => (/^(https?|file):/.test(t) ? t : (() => {
  const [f, q] = t.split("?"); const p = resolve(f);
  if (!existsSync(p)) throw new Error(`Not found: ${p}`);
  return pathToFileURL(p).href + (q ? `?${q}` : "");
})());

// ---------- in-page collector ----------
function collect(rules) {
  const out = { issues: [], texts: [] };
  const near = (v, set, tol = 0.51) => set.some((s) => Math.abs(Math.abs(v) - s) <= tol);
  const px = (s) => parseFloat(s) || 0;
  const roots = [...document.querySelectorAll("[data-audit-scope]")];
  if (!roots.length) roots.push(document.body);
  const path = (el) => {
    const parts = [];
    for (let e = el; e && e !== document.body && parts.length < 3; e = e.parentElement) {
      let s = e.tagName.toLowerCase();
      const cls = [...e.classList].filter((c) => c.startsWith("rdl-") || /^[a-z]/.test(c)).slice(0, 2);
      if (cls.length) s += "." + cls.join(".");
      parts.unshift(s);
    }
    return parts.join(" > ");
  };
  const add = (sev, rule, el, detail, scope) => out.issues.push({ sev, rule, where: path(el), detail, scope });
  const isControl = (el) => el.matches("button, a[href], [role=button], [role=tab], .rdl-orb, .rdl-btn, .rdl-chip, .rdl-tile, .rdl-field, .rdl-seg, .rdl-slide, .rdl-dock, .rdl-tag, .rdl-statuspill, .rdl-delta, .rdl-iconbtn");
  const visible = (el, cs) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
  const parseColor = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; };

  const surfaceLike = (cs) => {
    const bg = parseColor(cs.backgroundColor);
    return (bg && bg[3] > 0.02) || cs.backgroundImage !== "none" || px(cs.borderTopWidth) > 0 || /inset/.test(cs.boxShadow) || (cs.backdropFilter && cs.backdropFilter !== "none");
  };
  // Concentric check: nearest rounded ancestor surface; for each corner the element hugs (equal x/y inset,
  // inset smaller than the outer radius) the inner radius should equal outer − gap (gap = padding + border + offsets).
  const concentric = (el, r) => {
    if (!surfaceLike(getComputedStyle(el)) && el.tagName !== "IMG") return null;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const acs = getComputedStyle(a), outer = px(acs.borderTopLeftRadius), ar = a.getBoundingClientRect();
      if (!outer || !surfaceLike(acs) || outer >= Math.min(ar.width, ar.height) / 2 - 1) continue;
      const g = { l: r.left - ar.left, t: r.top - ar.top, rt: ar.right - r.right, b: ar.bottom - r.bottom };
      for (const [x, y] of [[g.l, g.t], [g.rt, g.t], [g.l, g.b], [g.rt, g.b]]) {
        if (x >= 0 && y >= 0 && Math.abs(x - y) <= 2 && Math.max(x, y) < outer) {
          const gap = Math.round((x + y) / 2);
          return { outer, gap, expected: Math.max(0, outer - gap) };
        }
      }
      return null; // nearest surface found but element doesn't hug a corner — any radius on the scale is fine
    }
    return null;
  };
  roots.forEach((root, ri) => {
    const scope = root.getAttribute("aria-label") || root.dataset.auditScope || `scope ${ri + 1}`;
    const accent = parseColor(getComputedStyle(root).getPropertyValue("--rdl-accent").trim().replace(/^#(..)(..)(..)$/, (_, r, g, b) => `rgb(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)})`));
    const accentParents = new Set();
    for (const el of root.querySelectorAll("*")) {
      if (el.closest("svg") || el.closest("[data-audit-ignore]")) continue;
      const cs = getComputedStyle(el);
      if (!visible(el, cs)) continue;
      const r = el.getBoundingClientRect();
      const derived = el.matches(".rdl-figure, .rdl-figure *, .rdl-unit, .rdl-cur, .rdl-lead"); // em-relative by design

      // Spacing ladder
      if (!derived) {
        for (const p of ["padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-right", "margin-bottom", "margin-left"]) {
          const v = px(cs.getPropertyValue(p));
          if (v && !near(v, rules.spacing)) add("error", "spacing", el, `${p} ${v}px`, scope);
        }
        if (/flex|grid/.test(cs.display)) for (const p of ["row-gap", "column-gap"]) {
          const v = cs.getPropertyValue(p); if (v === "normal") continue;
          const n = px(v); if (n && !near(n, rules.spacing)) add("error", "spacing", el, `${p} ${n}px`, scope);
        }
      }
      // Radius: concentric with the enclosing surface, else on the radius scale (pill/circle exempt)
      const rad = px(cs.borderTopLeftRadius);
      const isPill = rad >= Math.min(r.width, r.height) / 2 - 1 || cs.borderTopLeftRadius.includes("%");
      if (rad && !isPill) {
        const nest = concentric(el, r);
        if (nest && Math.abs(nest.expected - rad) > 1.5) {
          const fix = nest.expected < 8
            ? `gap ${nest.gap}px eats the ${nest.outer}px outer radius — halve the gap (host padding 12) rather than keeping ${rad}px`
            : `should be ${nest.expected}px (outer ${nest.outer} − gap ${nest.gap})`;
          add("warn", "nested-radius", el, `${rad}px — ${fix}`, scope);
        } else if (!nest && !near(rad, rules.radii)) add("error", "radius", el, `${rad}px`, scope);
      }
      // Type scale + weight
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (hasText && !derived) {
        const fs = px(cs.fontSize);
        if (!near(fs, rules.fontSizes)) add("error", "type-scale", el, `${fs}px`, scope);
        const fw = +cs.fontWeight;
        if ((fw < 300 || fw > 600) && !/Doto/.test(cs.fontFamily)) add("warn", "weight", el, `${fw}`, scope);
      }
      if (hasText) {
        let op = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) op *= +getComputedStyle(e).opacity;
        // Tight text box (union of the element's own text nodes), so padding and rounded corners don't skew the sample
        const rg = document.createRange(); let tb = null;
        for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) {
          rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
          tb = tb ? { l: Math.min(tb.l, q.left), t: Math.min(tb.t, q.top), r: Math.max(tb.r, q.right), b: Math.max(tb.b, q.bottom) } : { l: q.left, t: q.top, r: q.right, b: q.bottom };
        }
        const box = tb ? { x: tb.l, y: tb.t, w: tb.r - tb.l, h: tb.b - tb.t } : { x: r.left, y: r.top, w: r.width, h: r.height };
        out.texts.push({ where: path(el), scope, ...box, color: parseColor(cs.color), op, size: px(cs.fontSize), weight: +cs.fontWeight });
      }
      // Control ladder + hit target
      if (isControl(el) && !el.closest(".rdl-seg button") ) {
        const h = Math.round(r.height);
        if (!near(h, rules.controls, 1)) add("error", "control-height", el, `${h}px`, scope);
        if (el.matches("button, a[href], [role=button]") && !el.closest(".rdl-seg, .rdl-nav") && h < rules.minTarget) add("warn", "hit-target", el, `${h}px (min ${rules.minTarget})`, scope);
      }
      // Accent budget
      if (accent) {
        const same = (c) => c && Math.abs(c[0] - accent[0]) + Math.abs(c[1] - accent[1]) + Math.abs(c[2] - accent[2]) < 6 && c[3] > 0.5;
        if (same(parseColor(cs.backgroundColor)) || (hasText && same(parseColor(cs.color)))) accentParents.add(el.parentElement);
      }
    }
    // One control height per row
    for (const row of root.querySelectorAll(".rdl-header, .rdl-actionrow, .rdl-inline, .rdl-dock")) {
      if (row.closest("[data-audit-ignore]")) continue;
      const hs = [...row.querySelectorAll(":scope > *, :scope > * > .rdl-orb")].filter(isControl).map((c) => Math.round(c.getBoundingClientRect().height));
      if (new Set(hs).size > 1) add("error", "row-height", row, `mixed control heights ${[...new Set(hs)].join("/")}`, scope);
    }
    // Pinned zone clearance: scrolling content must end ≥ 12 above the pinned control
    const pins = [...root.querySelectorAll(".rdl-pin")].map((e) => e.getBoundingClientRect().top);
    if (pins.length) {
      const limit = Math.min(...pins) - 12;
      for (const screen of root.querySelectorAll(".rdl-screen")) for (const el of screen.querySelectorAll("*")) {
        if (el.closest(".rdl-pin, svg, [data-audit-ignore]")) continue;
        const b = el.getBoundingClientRect().bottom, pb = el.parentElement.getBoundingClientRect().bottom;
        if (b > limit && !(el.parentElement !== screen && pb > limit)) add("error", "pin-clearance", el, `ends ${Math.round(b - limit + 12)}px into the pinned zone (needs 12 clear)`, scope);
      }
    }
    if (accentParents.size > 3) add("warn", "accent-budget", root, `accent used in ${accentParents.size} places (budget 3)`, scope);
  });
  return out;
}

// ---------- contrast from rendered pixels ----------
async function contrast(page, texts) {
  await page.addStyleTag({ content: "body *, body *::before, body *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; }" });
  await page.waitForTimeout(50);
  const png = (await page.screenshot()).toString("base64");
  return page.evaluate(async ({ png, texts }) => {
    const img = new Image(); img.src = "data:image/png;base64," + png; await img.decode();
    const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
    const ctx = cv.getContext("2d"); ctx.drawImage(img, 0, 0);
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return texts.map((t) => {
      const x = Math.max(0, Math.floor(t.x)), y = Math.max(0, Math.floor(t.y));
      const w = Math.min(cv.width - x, Math.ceil(t.w)), h = Math.min(cv.height - y, Math.ceil(t.h));
      if (w < 1 || h < 1 || !t.color) return null;
      const d = ctx.getImageData(x, y, w, h).data, px = [];
      for (let i = 0; i < d.length; i += 4 * Math.max(1, Math.floor(d.length / 4 / 600))) px.push([d[i], d[i + 1], d[i + 2]]);
      px.sort((a, b) => lum(...a) - lum(...b));
      const pick = (q) => px[Math.min(px.length - 1, Math.floor(q * px.length))];
      const a = t.color[3] * t.op;
      const worst = [pick(0.2), pick(0.5), pick(0.8)].map((bg) => {
        const fg = t.color.slice(0, 3).map((c, i) => a * c + (1 - a) * bg[i]);
        return ratio(lum(...fg), lum(...bg));
      });
      const cr = Math.min(...worst);
      const large = t.size >= 24 || (t.size >= 18.5 && t.weight >= 600);
      return { ...t, cr: +cr.toFixed(2), need: large ? 3 : 4.5 };
    }).filter((t) => t && t.cr < t.need);
  }, { png, texts });
}

const browser = await playwright.chromium.launch();
let errors = 0, warns = 0;
const report = [];
for (const target of targets) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto(toURL(target));
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; } [data-audit-scope] { transform: none !important; }" }); // flatten presentation tilt
  await page.waitForTimeout(300);
  const { issues, texts } = await page.evaluate(collect, { ...rules, minTarget });
  for (const t of await contrast(page, texts)) issues.push({ sev: "error", rule: "contrast", where: t.where, detail: `${t.cr}:1 (needs ${t.need})`, scope: t.scope });
  const sevOf = (i) => (strict && i.sev === "warn" ? "error" : i.sev);
  errors += issues.filter((i) => sevOf(i) === "error").length;
  warns += issues.filter((i) => sevOf(i) === "warn").length;
  report.push({ target, issues: issues.map((i) => ({ ...i, sev: sevOf(i) })) });
  await page.close();
}
await browser.close();

if (json) console.log(JSON.stringify(report, null, 2));
else {
  for (const { target, issues } of report) {
    console.log(`\n▸ ${target}  —  ${issues.filter((i) => i.sev === "error").length} errors, ${issues.filter((i) => i.sev === "warn").length} warnings`);
    const byRule = {};
    for (const i of issues) (byRule[`${i.sev} ${i.rule}`] ??= []).push(i);
    for (const [k, list] of Object.entries(byRule)) {
      console.log(`  ${k} (${list.length})`);
      for (const i of list.slice(0, 8)) console.log(`    · [${i.scope}] ${i.where} — ${i.detail}`);
      if (list.length > 8) console.log(`    … ${list.length - 8} more`);
    }
  }
  console.log(`\n${errors} errors, ${warns} warnings · ladders: type ${rules.fontSizes.join("/")} · space ${rules.spacing.join("/")} · radius ${rules.radii.join("/")} · controls ${rules.controls.join("/")}`);
}
process.exit(errors ? 1 : 0);
