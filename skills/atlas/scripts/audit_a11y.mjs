#!/usr/bin/env node
// Atlas accessibility audit: renders a page with Playwright and checks it against WCAG 2.2 AA.
//
//   node skills/atlas/scripts/audit_a11y.mjs <file.html|url> [more…] [--w 1280 --h 900] [--json] [--strict] [--no-focus]
//
// Scope: everything inside <body> except [data-audit-ignore] subtrees.
// Errors (exit 1):
//   structure   missing <html lang>, missing/multiple <main>, missing <h1>, skipped heading levels, duplicate ids,
//               tabindex > 0, broken aria-controls / aria-labelledby / aria-describedby references
//   names       button / link / input / select / textarea / [role=button|tab|menuitem|switch|checkbox|radio|slider|
//               progressbar|dialog|alertdialog|region|navigation|img] without an accessible name (4.1.2, 1.1.1, 2.4.4)
//   images      <img> without alt; inline <svg> that is neither aria-hidden nor labelled
//   aria        role=switch/checkbox without aria-checked, role=tab without aria-selected or aria-controls,
//               role=tabpanel without aria-labelledby, aria-invalid=true without aria-describedby, aria-hidden on a
//               focusable element, role=menuitem outside role=menu
//   contrast    text below 4.5:1 (3:1 for large text), computed against the nearest opaque ancestor background;
//               elements on gradients/images are reported as "unverified" warnings instead (1.4.3)
//   focus       focusable element with no visible focus indicator when tabbed to (2.4.7)
//   reflow      horizontal scrolling at 320 CSS px wide (1.4.10)
//   motion      an animation still running longer than 100 ms under prefers-reduced-motion: reduce (2.3.3)
// Warnings:
//   targets     interactive element smaller than 24×24 CSS px (2.5.8; inline text links are exempt) and,
//               separately, smaller than 44×44 (touch recommendation)
//   spacing     text that clips when the 1.4.12 spacing overrides are applied
//   placeholder placeholder below 4.5:1
// --strict turns warnings into errors.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(execSync("npm root -g").toString().trim() + "/playwright"); }

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const W = +flag("--w", 1280), H = +flag("--h", 900);
const json = args.includes("--json"), strict = args.includes("--strict"), noFocus = args.includes("--no-focus");
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) { console.error("usage: audit_a11y.mjs <file.html|url> [...] [--w N --h N] [--json] [--strict] [--no-focus]"); process.exit(2); }
const toURL = (t) => (/^(https?|file):/.test(t) ? t : (() => {
  const [f, q] = t.split("?"); const p = resolve(f);
  if (!existsSync(p)) throw new Error(`Not found: ${p}`);
  return pathToFileURL(p).href + (q ? `?${q}` : "");
})());

/* ---------------- in-page collector ---------------- */
function collect() {
  const out = [];
  const add = (level, rule, msg, el) => out.push({ level, rule, msg, el: el ? describe(el) : "" });
  const describe = (el) => {
    const id = el.id ? `#${el.id}` : "";
    const cls = typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
    const txt = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `${el.tagName.toLowerCase()}${id}${cls}${txt ? ` "${txt}"` : ""}`;
  };
  const ignored = (el) => el.closest("[data-audit-ignore]");
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !el.closest("[hidden]"); };
  const inA11yTree = (el) => !el.closest('[aria-hidden="true"]') && !el.closest("[hidden]") && getComputedStyle(el).display !== "none" && !(el.closest("dialog") && !el.closest("dialog").open);
  const all = [...document.body.querySelectorAll("*")].filter((el) => !ignored(el) && !el.closest("script,style"));

  /* structure */
  if (!document.documentElement.getAttribute("lang")) add("error", "structure", "<html> has no lang attribute (3.1.1)");
  const mains = document.querySelectorAll("main");
  if (mains.length !== 1) add("error", "structure", `expected exactly one <main>, found ${mains.length} (1.3.1)`);
  const h1s = [...document.querySelectorAll("h1")].filter(inA11yTree);
  if (h1s.length !== 1) add("error", "structure", `expected one <h1>, found ${h1s.length} (2.4.6)`);
  let last = 0;
  for (const h of [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(inA11yTree)) {
    const n = +h.tagName[1];
    if (last && n > last + 1) add("error", "structure", `heading level skipped: h${last} → h${n} (1.3.1)`, h);
    last = n;
  }
  const ids = new Map();
  for (const el of document.querySelectorAll("[id]")) { ids.set(el.id, (ids.get(el.id) || 0) + 1); }
  for (const [id, n] of ids) if (n > 1) add("error", "structure", `duplicate id "${id}" ×${n} (4.1.1)`);
  for (const el of all) {
    const ti = el.getAttribute("tabindex");
    if (ti && +ti > 0) add("error", "structure", `tabindex="${ti}" > 0 disrupts focus order (2.4.3)`, el);
    for (const attr of ["aria-controls", "aria-labelledby", "aria-describedby", "aria-activedescendant"]) {
      const v = el.getAttribute(attr); if (!v) continue;
      for (const id of v.split(/\s+/)) if (!document.getElementById(id)) add("error", "structure", `${attr} references missing id "${id}" (4.1.2)`, el);
    }
  }
  const skip = document.querySelector('a[href^="#"]');
  if (skip) { const id = skip.getAttribute("href").slice(1); if (!document.getElementById(id)) add("error", "structure", `skip link target #${id} not found (2.4.1)`, skip); }

  /* accessible names */
  const textOf = (el) => {
    if (!el) return "";
    const parts = [];
    for (const n of el.childNodes) {
      if (n.nodeType === 3) parts.push(n.textContent);
      else if (n.nodeType === 1) {
        if (n.getAttribute("aria-hidden") === "true") continue;
        if (n.hasAttribute("aria-label")) { parts.push(n.getAttribute("aria-label")); continue; }
        if (n.tagName === "IMG") { parts.push(n.getAttribute("alt") || ""); continue; }
        if (n.tagName === "SVG" && n.querySelector("title")) { parts.push(n.querySelector("title").textContent); continue; }
        parts.push(textOf(n));
      }
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
  };
  const name = (el) => {
    const lb = el.getAttribute("aria-labelledby");
    if (lb) return lb.split(/\s+/).map((id) => textOf(document.getElementById(id))).join(" ").trim();
    if (el.getAttribute("aria-label")?.trim()) return el.getAttribute("aria-label").trim();
    if (/^(INPUT|SELECT|TEXTAREA|OUTPUT|PROGRESS|METER)$/.test(el.tagName)) {
      if (el.id) { const l = document.querySelector(`label[for="${CSS.escape(el.id)}"]`); if (l && textOf(l)) return textOf(l); }
      const wrap = el.closest("label"); if (wrap && textOf(wrap)) return textOf(wrap);
      if (el.type === "submit" || el.type === "button") return el.value || "";
      if (el.getAttribute("placeholder")) return ""; // placeholder is not a name
    }
    if (el.tagName === "IMG") return el.getAttribute("alt") ?? null;
    if (el.tagName === "SVG" && el.querySelector("title")) return el.querySelector("title").textContent.trim();
    if (el.tagName === "FIELDSET") { const lg = el.querySelector("legend"); if (lg) return textOf(lg); }
    if (el.tagName === "TABLE") { const c = el.querySelector("caption"); if (c) return textOf(c); }
    const t = textOf(el); if (t) return t;
    return el.getAttribute("title")?.trim() || "";
  };
  const needsName = 'button,a[href],input:not([type="hidden"]),select,textarea,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="switch"],[role="checkbox"],[role="radio"],[role="slider"],[role="progressbar"],[role="dialog"],[role="alertdialog"],[role="region"],[role="navigation"],nav,[role="img"],[role="group"],[role="radiogroup"],[role="tablist"],[role="menu"],dialog,fieldset';
  for (const el of all.filter((e) => e.matches(needsName) && inA11yTree(e))) {
    if (el.matches("nav,[role=navigation]") && document.querySelectorAll("nav,[role=navigation]").length < 2) continue; // one nav needs no label
    if (el.matches("[role=group],[role=radiogroup],[role=tablist],[role=menu],fieldset") ) { if (!name(el)) add("warning", "names", "group has no accessible name (1.3.1)", el); continue; }
    const n = name(el);
    if (!n) add("error", "names", `${el.tagName.toLowerCase()}${el.getAttribute("role") ? `[role=${el.getAttribute("role")}]` : ""} has no accessible name (4.1.2)`, el);
    if (el.matches("a[href]") && /^(click here|here|read more|more|learn more)$/i.test(n)) add("warning", "names", `link text "${n}" is not descriptive (2.4.4)`, el);
  }
  for (const img of all.filter((e) => e.tagName === "IMG")) if (!img.hasAttribute("alt")) add("error", "images", "<img> without alt (1.1.1)", img);
  for (const svg of all.filter((e) => e.tagName === "svg" || e.tagName === "SVG")) {
    if (svg.getAttribute("aria-hidden") === "true" || svg.closest('[aria-hidden="true"]')) continue;
    if (svg.getAttribute("role") === "img" && (svg.getAttribute("aria-label") || svg.querySelector("title"))) continue;
    if (svg.closest("button,a,[role=button],[role=tab],[role=menuitem]") && name(svg.closest("button,a,[role=button],[role=tab],[role=menuitem]"))) { add("warning", "images", "decorative <svg> inside a labelled control should be aria-hidden", svg); continue; }
    add("error", "images", "<svg> is neither aria-hidden nor labelled (1.1.1)", svg);
  }

  /* aria state */
  for (const el of all.filter(inA11yTree)) {
    const role = el.getAttribute("role");
    if ((role === "switch" || role === "checkbox") && !el.hasAttribute("aria-checked")) add("error", "aria", `role=${role} without aria-checked (4.1.2)`, el);
    if (role === "tab" && (!el.hasAttribute("aria-selected") || !el.hasAttribute("aria-controls"))) add("error", "aria", "role=tab needs aria-selected and aria-controls", el);
    if (role === "tabpanel" && !el.hasAttribute("aria-labelledby")) add("error", "aria", "role=tabpanel needs aria-labelledby", el);
    if (role === "tab" && !el.closest('[role="tablist"]')) add("error", "aria", "role=tab outside a tablist", el);
    if (/^menuitem/.test(role || "") && !el.closest('[role="menu"],[role="menubar"]')) add("error", "aria", `role=${role} outside role=menu`, el);
    if (el.getAttribute("aria-invalid") === "true" && !el.getAttribute("aria-describedby")) add("error", "aria", "aria-invalid without aria-describedby pointing at the message (3.3.1)", el);
    if (el.getAttribute("aria-expanded") && !el.getAttribute("aria-controls") && !el.matches("summary")) add("warning", "aria", "aria-expanded without aria-controls", el);
    if (el.matches('[aria-haspopup="menu"]') && !el.hasAttribute("aria-expanded")) add("error", "aria", "menu button without aria-expanded", el);
    if (el.matches("progress,[role=progressbar]") && !el.hasAttribute("aria-valuenow") && !el.classList.contains("at-progress--indeterminate") && !el.matches("progress")) add("warning", "aria", "progressbar without aria-valuenow (indeterminate must be explicit)", el);
  }
  const focusableSel = 'a[href],button,input,select,textarea,[tabindex],[contenteditable="true"]';
  for (const el of all.filter((e) => e.matches(focusableSel) && e.closest('[aria-hidden="true"]') && e.getAttribute("tabindex") !== "-1" && !e.disabled && visible(e))) add("error", "aria", "focusable element inside aria-hidden=true (4.1.2)", el);

  /* contrast */
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = "1"] = m[1].split(/[\s,\/]+/).filter(Boolean); return [+r, +g, +b, +a]; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const blend = (fg, bg) => { const a = fg[3]; return [0, 1, 2].map((i) => Math.round(fg[i] * a + bg[i] * (1 - a))); };
  const bgOf = (el) => {
    let node = el, acc = null;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.backgroundImage !== "none") return { unverified: true };
      const c = parse(s.backgroundColor);
      if (c && c[3] > 0) { acc = acc ? blend(acc, c) : c[3] === 1 ? c.slice(0, 3) : null; if (c[3] === 1) return { rgb: acc || c.slice(0, 3) }; acc = c; }
      node = node.parentElement;
    }
    const root = parse(getComputedStyle(document.documentElement).backgroundColor) || [255, 255, 255, 1];
    return { rgb: acc ? blend(acc, root) : root.slice(0, 3) };
  };
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  for (const el of all.filter((e) => hasOwnText(e) && visible(e) && !e.closest('[aria-hidden="true"]'))) {
    if (el.matches(":disabled,[aria-disabled=true]") || el.closest(":disabled,[aria-disabled=true]")) continue;
    if (el.closest("dialog") && !el.closest("dialog").open) continue;
    const s = getComputedStyle(el);
    if (s.opacity === "0" || +s.fontSize < 1) continue;
    const fg = parse(s.color); if (!fg || fg[3] === 0) continue;                 // intentionally invisible text (e.g. aria-busy label)
    if (el.closest("label:has(:disabled)")) continue;                           // label of a disabled control (exempt)
    if (el.getBoundingClientRect().width <= 1) continue;                        // .at-sr-only
    const bg = bgOf(el);
    if (bg.unverified) { add("warning", "contrast", "text over a gradient/image: verify contrast by eye or with pixels (1.4.3)", el); continue; }
    const r = ratio(blend(fg, bg.rgb), bg.rgb);
    const large = +s.fontSize >= 24 || (+s.fontSize >= 18.66 && +s.fontWeight >= 700);
    const min = large ? 3 : 4.5;
    if (r < min) add("error", "contrast", `text ${r.toFixed(2)}:1 < ${min}:1 (${s.color} on rgb(${bg.rgb}), ${s.fontSize}) (1.4.3)`, el);
  }
  for (const el of all.filter((e) => e.matches("input[placeholder],textarea[placeholder]") && visible(e))) {
    const ps = getComputedStyle(el, "::placeholder"); const fg = parse(ps.color); const bg = bgOf(el);
    if (fg && bg.rgb) { const r = ratio(blend(fg, bg.rgb), bg.rgb); if (r < 4.5) add("warning", "placeholder", `placeholder ${r.toFixed(2)}:1 < 4.5:1`, el); }
  }

  /* target size */
  const interactive = all.filter((e) => e.matches('a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=tab],[role=menuitem],[role=switch],[role=checkbox],[role=radio],summary') && visible(e) && inA11yTree(e));
  for (const el of interactive) {
    if (el.closest("dialog") && !el.closest("dialog").open) continue;
    let r = el.getBoundingClientRect();
    const host = el.closest("label.at-choice,.at-segmented__option") || (el.classList.contains("at-card__stretch") ? el.closest(".at-card") : null); if (host) r = host.getBoundingClientRect();
    const inline = el.matches("a") && getComputedStyle(el).display === "inline"; // 2.5.8: links in a sentence or block of text are exempt
    if (inline) continue; // 2.5.8 exemption for links in sentences
    const w = Math.round(r.width), h = Math.round(r.height);
    if (w < 24 || h < 24) add("warning", "targets", `target ${w}×${h} < 24×24 (2.5.8)`, el);
    else if ((w < 44 || h < 44) && el.matches("button,[role=button],a.at-btn,[role=switch],[role=tab],summary")) add("info", "targets", `target ${w}×${h} < 44×44 (touch recommendation)`, el);
  }
  return out;
}

/* ---------------- runner ---------------- */
const browser = await playwright.chromium.launch();
let total = { error: 0, warning: 0, info: 0 }, report = [];
for (const t of targets) {
  const url = toURL(t);
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto(url); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(400);
  const issues = await page.evaluate(collect);

  /* focus visibility: tab through, compare focused vs unfocused outline/box-shadow */
  if (!noFocus) {
    const seen = new Set();
    await page.evaluate(() => { document.body.focus(); });
    for (let i = 0; i < 600; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body) return null;
        const key = el.tagName + "|" + (el.id || "") + "|" + (el.className || "") + "|" + (el.textContent || "").trim().slice(0, 30);
        const target = el.classList.contains("at-switch") ? el.querySelector(".at-switch__track") : el.classList.contains("at-segmented__input") ? el.nextElementSibling : el.classList.contains("at-card__stretch") ? el.closest(".at-card") : el.classList.contains("at-choice__control") && el.closest(".at-choice--card") ? el.closest(".at-choice--card") : el;
        const s = getComputedStyle(target);
        const focused = { outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0, shadow: s.boxShadow, border: s.borderColor, bg: s.backgroundColor };
        el.blur();
        const u = getComputedStyle(target);
        const base = { shadow: u.boxShadow, border: u.borderColor, bg: u.backgroundColor };
        el.focus({ preventScroll: true });
        const visibleRing = focused.outline || focused.shadow !== base.shadow || focused.border !== base.border || focused.bg !== base.bg;
        const d = `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""} "${(el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`;
        return { key, visibleRing, d, ignored: !!el.closest("[data-audit-ignore]") };
      });
      if (!info || seen.has(info.key)) break;
      seen.add(info.key);
      if (!info.visibleRing && !info.ignored) issues.push({ level: "error", rule: "focus", msg: "no visible focus indicator when focused by keyboard (2.4.7)", el: info.d });
    }
  }

  /* reflow at 320 */
  await page.setViewportSize({ width: 320, height: 800 }); await page.waitForTimeout(200);
  const sw = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
  if (sw > 320) issues.push({ level: "error", rule: "reflow", msg: `page is ${sw}px wide at a 320px viewport (1.4.10)`, el: "" });
  await page.setViewportSize({ width: W, height: H });

  /* text spacing 1.4.12 */
  const clipped = await page.evaluate(() => {
    const st = document.createElement("style"); st.textContent = "* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }"; document.head.appendChild(st);
    const bad = [];
    for (const el of document.body.querySelectorAll("button,a,label,th,td,.at-badge,.at-tag,h1,h2,h3,h4,p,li,span")) {
      if (el.closest("[data-audit-ignore],[hidden],dialog:not([open])") || el.classList.contains("at-sr-only")) continue;
      const s = getComputedStyle(el); if (s.display === "none" || s.visibility === "hidden" || el.getBoundingClientRect().width <= 1) continue;
      if (/hidden|clip/.test(s.overflow + s.overflowX + s.overflowY) && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)) bad.push(el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : "") + ` "${(el.textContent || "").trim().slice(0, 30)}"`);
    }
    st.remove(); return bad;
  });
  for (const el of clipped.slice(0, 20)) issues.push({ level: "warning", rule: "spacing", msg: "text clips under 1.4.12 spacing overrides", el });

  /* reduced motion */
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.waitForTimeout(300);
  const anim = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running" && (a.effect?.getComputedTiming?.().duration || 0) > 100).map((a) => (a.effect?.target?.tagName || "?").toLowerCase() + "." + String(a.effect?.target?.className || "").split(" ")[0] + ` (${a.animationName || a.constructor.name})`));
  for (const a of anim.slice(0, 10)) issues.push({ level: "error", rule: "motion", msg: "animation still running under prefers-reduced-motion (2.3.3)", el: a });
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const i of issues) if (strict && i.level === "warning") i.level = "error";
  for (const i of issues) total[i.level] = (total[i.level] || 0) + 1;
  report.push({ target: t, issues });
  if (!json) {
    console.log(`\n${t}`);
    for (const i of issues.filter((x) => x.level !== "info")) console.log(`  ${i.level.padEnd(7)} ${i.rule.padEnd(10)} ${i.msg}${i.el ? `  ← ${i.el}` : ""}`);
    const infos = issues.filter((x) => x.level === "info");
    if (infos.length) console.log(`  info    targets    ${infos.length} control(s) between 24 and 44 px (fine for pointer UIs, enlarge for touch-first screens)`);
    console.log(`  ${issues.filter((x) => x.level === "error").length} errors · ${issues.filter((x) => x.level === "warning").length} warnings`);
  }
  await page.close();
}
await browser.close();
if (json) console.log(JSON.stringify(report, null, 2));
process.exit(total.error ? 1 : 0);
