// Builds RDL/SKILL.md: the whole rdl-theme skill (guide + code) in one self-contained skill file.
//   node scripts/build-rdl-single.mjs
// Part 1 (guide) = SKILL.md core + every reference, cross-references rewritten to section numbers.
// Part 2 (code)  = token source and outputs, web components, SwiftUI files, scripts and the radius demo,
//                  each under a heading that names the path to save it at.
// Regenerate after changing anything under skills/rdl-theme/.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skill = join(root, "skills/rdl-theme");
const read = (p) => readFileSync(join(skill, p), "utf8");
const version = JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8")).version;

// Guide sections, in reading order: [file, title]
const refs = [
  ["foundations.md", "Foundations"],
  ["layout.md", "Layout and spacing"],
  ["radius.md", "Corner radius"],
  ["guidelines.md", "Guidelines"],
  ["anatomy.md", "Component anatomy"],
  ["components.md", "Components"],
  ["screen-patterns.md", "Screen patterns"],
  ["domain-playbooks.md", "Domain playbooks"],
  ["presentation.md", "Shot presentation"],
  ["qa-checklist.md", "QA checklist"],
  ["design-study.md", "Design study"],
];
const secNo = Object.fromEntries(refs.map(([f, t], i) => [f, { n: i + 2, t }]));

// Code appendices: [letter, path to save at (relative to the skill folder), fence language, note]
const appendices = [
  ["A", "assets/tokens/tokens.json", "json", "Source of truth for every token. Edit, then run Appendix C."],
  ["B", "assets/tokens/tokens.css", "css", "Generated CSS custom properties: themes, styles, accents, auras, type classes."],
  ["C", "scripts/build_tokens.mjs", "js", "Regenerates Appendix B, D and E from Appendix A."],
  ["D", "assets/tokens/tailwind.preset.js", "js", "Generated Tailwind preset wired to the CSS variables."],
  ["E", "assets/ios/RDLTokens.swift", "swift", "Generated SwiftUI tokens."],
  ["F", "assets/templates/rdl-components.css", "css", "Web component layer: part 1 base, part 2 glass, part 3 layout + concentric nesting."],
  ["G", "assets/ios/RDLComponents.swift", "swift", "SwiftUI base components."],
  ["H", "assets/ios/RDLGlassComponents.swift", "swift", "SwiftUI glass components."],
  ["I", "assets/ios/RDLLayout.swift", "swift", "SwiftUI layout primitives, metric tile, fields, sheet, radius helpers."],
  ["J", "scripts/audit_ui.mjs", "js", "Playwright UI audit (needs Appendix A next to it at ../assets/tokens/tokens.json)."],
  ["K", "scripts/extract_palette.py", "python", "Pixel-calibrates tokens against exported shots."],
  ["L", "assets/templates/radius-demo.html", "html", "Interactive corner-radius demo. Opens on its own in any browser."],
];

// Rewrite references to other skill files as section numbers (outside code fences only).
function rewriteRefs(md) {
  const parts = md.split(/(```[\s\S]*?```)/g);
  return parts.map((p) => {
    if (p.startsWith("```")) return p;
    return p
      .replace(/`?(?:references\/)?([a-z-]+\.md)`?\s*§\s*(\d+)/g, (m, f, k) => (secNo[f] ? `§${secNo[f].n}.${k}` : m))
      .replace(/`?(?:references\/)?([a-z-]+\.md)`?/g, (m, f) => (secNo[f] ? `§${secNo[f].n} (${secNo[f].t})` : m));
  }).join("");
}
// Demote headings by one level and number the top heading (outside code fences only).
function demote(md, n, title) {
  const parts = md.split(/(```[\s\S]*?```)/g);
  let first = true;
  return parts.map((p) => {
    if (p.startsWith("```")) return p;
    return p.replace(/^(#{1,5}) (.+)$/gm, (m, h, text) => {
      if (h === "#" && first) { first = false; return `## ${n}. ${title}`; }
      return `#${h} ${text}`;
    });
  }).join("");
}
const fenceFor = (src) => { let f = "```"; while (src.includes(f)) f += "`"; return f; };

// ---------- Part 1: overview from SKILL.md ----------
const skillMd = read("SKILL.md");
const fm = skillMd.match(/^---\n([\s\S]*?)\n---\n/);
const description = fm[1].match(/^description: (.*)$/m)[1];
let body = skillMd.slice(fm[0].length);
body = body.replace(/\n## Files[\s\S]*$/, "\n"); // replaced by the contents table below
body = body.replace(/^\s*# RDL Theme · v[\d.]+\s*\n/, "");
body = rewriteRefs(body).replace(/^(#{2,5}) /gm, "#$1 ");

const toc = [
  "| § | Section | What it covers |",
  "|---|---|---|",
  "| 1 | Overview | DNA, layout in 60 seconds, workflow, token quick reference, signature moves, anti-patterns |",
  ...refs.map(([f, t], i) => `| ${i + 2} | ${t} | ${{
    "foundations.md": "Modes, color, accents, auras, glass, type and numerals, textures, imagery, motion",
    "layout.md": "Spacing ladder, mobile skeleton, web grid, alignment, control heights, radius summary",
    "radius.md": "Radius scale, concentric nesting, A · strict vs B · soft, procedure, code, audit",
    "guidelines.md": "Hierarchy, type rules, color budget, app-wide consistency, minimalism, content",
    "anatomy.md": "Exact specs for every component and layout primitive",
    "components.md": "Component catalog (web class ↔ SwiftUI type), SVG patterns, compositions",
    "screen-patterns.md": "Skeleton, glass G1–G8 and W5–W7, flat M1–M7 and W1–W4",
    "domain-playbooks.md": "Wealth/gold/SIP/lease, banking, health, energy, logistics, industrial…",
    "presentation.md": "Dribbble shot composition: hands, depth of field, angled devices",
    "qa-checklist.md": "Pre-delivery review, including the automated audit",
    "design-study.md": "220-frame analysis, 20 structural rules, v1 → v3",
  }[f]} |`),
  ...appendices.map(([l, p, , note]) => `| ${l} | \`${p}\` | ${note} |`),
].join("\n");

const out = [];
out.push("---", "name: rdl", `description: ${description.replace(/^Design and build/, "RDL — design and build")} This single file holds the complete RDL skill: guide plus all code.`, "---", "");
out.push(`# RDL · v${version}`, "");
out.push("The complete RDL design skill in one file: the RonDesignLab-style design system distilled from",
  "220 frames, with a measured layout system, concentric corner radius, component anatomy, usage",
  "guidelines, screen archetypes, domain playbooks, QA, and all source code.", "");
out.push("**How to use this file**",
  "- **Designing or reviewing:** read Part 1 (§1–§12).",
  "- **Building:** copy the code you need from Part 2. Each appendix heading is the path to save it at",
  "  inside a skill folder (`assets/…`, `scripts/…`). Saved together, they reproduce the full skill, so",
  "  every path mentioned in the guide (for example `scripts/audit_ui.mjs`) works as written.",
  "- **Changing values:** edit Appendix A (`tokens.json`), then run Appendix C (`build_tokens.mjs`).",
  "- **Example screens:** the mobile, dashboard and flat templates live in the source skill",
  "  (`skills/rdl-theme/assets/templates/`); this file keeps the radius demo (Appendix L).", "");
out.push("## Contents", "", toc, "", "# Part 1 · Guide", "", "## 1. Overview", "", body.trim(), "");
for (const [f, t] of refs) {
  const { n } = secNo[f];
  out.push(demote(rewriteRefs(read(`references/${f}`)), n, t).trim(), "");
}
out.push("# Part 2 · Code", "");
for (const [l, p, lang, note] of appendices) {
  const src = read(p).replace(/\s+$/, "");
  const fence = fenceFor(src);
  out.push(`## Appendix ${l} · \`${p}\``, "", note, "", `${fence}${lang}`, src, fence, "");
}
mkdirSync(join(root, "RDL"), { recursive: true });
const text = out.join("\n").replace(/\n{3,}/g, "\n\n");
writeFileSync(join(root, "RDL/SKILL.md"), text);
console.log(`Wrote RDL/SKILL.md — ${text.split("\n").length} lines, ${(Buffer.byteLength(text) / 1024).toFixed(0)} KB`);
