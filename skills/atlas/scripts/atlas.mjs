#!/usr/bin/env node
// Atlas CLI: the design system from the terminal.
//
//   node skills/atlas/scripts/atlas.mjs <command> [options]
//
//   theme   --primary #HEX --secondary #HEX [--name Brand] [--neutral tinted|cool|warm|pure]
//           [--corners sharp|soft|round|pill] [--type inter|jakarta|manrope|plex|dm|fraunces]
//           [--out dir] [--format all|css|json|tailwind|figma] [--as-preset] [--json] [--quiet]
//           Builds a brand theme with the same engine as Atlas Studio: scales solved on the contrast
//           ladder with your exact colours pinned, roles picked so every pairing passes WCAG 2.2 AA in
//           light and dark, then writes the theme files and prints the contrast proof.
//           --as-preset installs it into tokens.json → presets and rebuilds atlas-brand-<slug>.css.
//   check   Proves every semantic pairing in tokens.json (base + presets); writes contrast-report.md.
//   build   Re-solves the palette, rebuilds CSS / Tailwind / preset files, then runs check.
//   audit   <page.html…> [--w N --h N] [--strict]   Runs the accessibility audit on rendered pages.
//   help
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const T = require(join(root, "assets/js/atlas-theme.js"));

const argv = process.argv.slice(2);
const cmd = argv[0];
const opts = {};
const positional = [];
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) { const k = a.slice(2); const v = argv[i + 1]; if (v === undefined || v.startsWith("--")) opts[k] = true; else { opts[k] = v; i++; } }
  else positional.push(a);
}
const run = (script, args) => { const r = spawnSync(process.execPath, [join(here, script), ...args], { stdio: "inherit" }); return r.status ?? 1; };
const die = (msg) => { console.error(`atlas: ${msg}`); process.exit(2); };
const hex = (v, what) => { if (typeof v !== "string" || !/^#?[0-9a-fA-F]{6}$/.test(v)) die(`--${what} needs a 6-digit hex (got ${v})`); return "#" + v.replace("#", "").toUpperCase(); };

const help = () => console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//")).slice(1, 17).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));

if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") { help(); process.exit(0); }

if (cmd === "check") process.exit(run("check_contrast.mjs", ["--md", join(root, "references/contrast-report.md")]));
if (cmd === "build") { for (const s of ["palette.mjs", "build_tokens.mjs"]) { const c = run(s, []); if (c) process.exit(c); } process.exit(run("check_contrast.mjs", ["--md", join(root, "references/contrast-report.md")])); }
if (cmd === "audit") { if (!positional.length) die("audit needs at least one page"); process.exit(run("audit_a11y.mjs", argv.slice(1))); }
if (cmd !== "theme") die(`unknown command "${cmd}" (try: theme, check, build, audit, help)`);

/* ---------------- theme ---------------- */
const settings = {
  name: String(opts.name || "Brand").slice(0, 40),
  primary: hex(opts.primary, "primary"),
  secondary: hex(opts.secondary || opts.primary, "secondary"),
  neutral: ["tinted", "cool", "warm", "pure"].includes(opts.neutral) ? opts.neutral : "tinted",
  corners: T.RADII[opts.corners] ? opts.corners : "soft",
  type: T.FONTS[opts.type] ? opts.type : "inter",
};
if (opts.neutral && settings.neutral !== opts.neutral) die(`--neutral must be tinted, cool, warm or pure`);
if (opts.corners && settings.corners !== opts.corners) die(`--corners must be ${Object.keys(T.RADII).join(", ")}`);
if (opts.type && settings.type !== opts.type) die(`--type must be ${Object.keys(T.FONTS).join(", ")}`);

const theme = T.buildTheme(settings);
const rows = T.check(theme);
const fails = rows.filter((r) => !r.ok);
const slug = T.slug(settings.name);
const base = `atlas-theme-${slug}`;
const outDir = resolve(opts.out || `./${base}`);
const formats = { css: [`${base}.css`, () => T.cssFor(theme, true)], json: [`${base}.tokens.json`, () => T.dtcgFor(theme)], tailwind: [`${base}.tailwind.js`, () => T.tailwindFor(theme)], figma: [`${base}.tokens-studio.json`, () => T.figmaFor(theme)] };
const wanted = !opts.format || opts.format === "all" ? Object.keys(formats) : opts.format.split(",").map((f) => f.trim());
for (const f of wanted) if (!formats[f]) die(`--format must be all or a list of ${Object.keys(formats).join(", ")}`);

if (opts.json) {
  console.log(JSON.stringify({ settings, scales: { brand: theme.brand, accent: theme.accent, neutral: theme.neutral }, roles: { light: theme.light, dark: theme.dark }, radius: theme.radius, font: theme.font, notes: theme.notes, checks: rows }, null, 2));
} else {
  mkdirSync(outDir, { recursive: true });
  const written = [];
  for (const f of wanted) { const [file, gen] = formats[f]; writeFileSync(join(outDir, file), gen()); written.push(file); }
  writeFileSync(join(outDir, "README.txt"), `${settings.name} theme for the Atlas design system, generated by the atlas CLI.\n\n${base}.css                load after atlas-tokens.css; apply with <html data-brand="${slug}">\n${base}.tokens.json        W3C DTCG tokens; import into Atlas Studio to edit\n${base}.tailwind.js        Tailwind preset (import the CSS first)\n${base}.tokens-studio.json Figma: Tokens Studio plugin → Tools → Load from JSON → export variables\n\nPrimary ${settings.primary} · Secondary ${settings.secondary} · Neutrals ${settings.neutral} · Corners ${settings.corners} · Type ${settings.type}\n`);
  if (!opts.quiet) {
    console.log(`\n${settings.name} · primary ${settings.primary} · secondary ${settings.secondary} · neutrals ${settings.neutral} · corners ${settings.corners} · type ${settings.type}\n`);
    const pad = (s, n) => String(s).padEnd(n);
    console.log(pad("Role", 18) + pad("Light", 10) + "Dark");
    for (const k of ["action", "text-on-action", "brand", "text-link", "accent", "accent-text", "accent-bg", "focus-ring"]) console.log(pad(`--at-${k}`, 22) + pad(theme.light[k], 10) + theme.dark[k]);
    console.log("\nContrast proof (worst ratio per rule, light · dark)");
    const labels = [...new Set(rows.map((r) => r.label))];
    for (const l of labels) { const L = rows.find((r) => r.theme === "light" && r.label === l), D = rows.find((r) => r.theme === "dark" && r.label === l); console.log(`${L.ok && D.ok ? "ok  " : "FAIL"} ${pad(l, 36)} ${L.ratio.toFixed(2).padStart(6)} · ${D.ratio.toFixed(2).padStart(6)}  (min ${L.min})`); }
    console.log(`${rows.length - fails.length}/${rows.length} pairings pass\n`);
    for (const n of theme.notes) console.log(`· ${n}`);
    console.log(`\nwrote ${outDir}/`); for (const w of [...written, "README.txt"]) console.log(`  ${w}`);
  }
}

/* ---------------- --as-preset: install into tokens.json and rebuild ---------------- */
if (opts["as-preset"]) {
  const tokensPath = join(root, "assets/tokens/tokens.json");
  const t = JSON.parse(readFileSync(tokensPath, "utf8"));
  const scales = [["brand", theme.brand], ["accent", theme.accent], ["neutral", theme.neutral]];
  const ref = (v) => { for (const [name, sc] of scales) for (const s of T.STEPS) if (sc.steps[s] === v) return `{${name}.${s}}`; return v === "#FFFFFF" ? "{white}" : v === "#000000" ? "{black}" : v; };
  const sem = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, ref(v)]));
  t.presets = t.presets || {};
  t.presets[slug] = {
    _doc: `${settings.name}: installed by the atlas CLI from primary ${settings.primary} and secondary ${settings.secondary} (neutrals ${settings.neutral}, corners ${settings.corners}, type ${settings.type}).`,
    primitive: { brand: theme.brand.steps, accent: theme.accent.steps, neutral: theme.neutral.steps },
    semantic: { light: sem(theme.light), dark: sem(theme.dark) },
    radius: theme.radius,
    type: { family: { display: theme.font.display, sans: theme.font.body } },
  };
  writeFileSync(tokensPath, JSON.stringify(t, null, 2) + "\n");
  // "accent" is a hue only inside presets; the checker resolves {accent.N} through the preset's primitives.
  const c1 = run("build_tokens.mjs", []); if (c1) process.exit(c1);
  const c2 = run("check_contrast.mjs", ["--md", join(root, "references/contrast-report.md")]);
  if (!opts.quiet) console.log(`\ninstalled preset "${slug}": apply with <html data-brand="${slug}"> after loading assets/tokens/atlas-brand-${slug}.css`);
  process.exit(c2);
}
process.exit(fails.length ? 1 : 0);
