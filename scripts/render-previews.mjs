// Renders the reference templates to PNGs in docs/ (used by the README).
//   node scripts/render-previews.mjs   (needs playwright locally or globally installed)
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const { chromium } = playwright;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tpl = (f, skill = "rdl-theme") => {
  const [file, query] = f.split("?");
  return pathToFileURL(join(root, `skills/${skill}/assets/templates`, file)).href + (query ? `?${query}` : "");
};
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null; // e.g. --only atlas
const shots = [
  { file: "mobile-app.html", out: "v3-mobile-gold.png", w: 1600, h: 1200 },
  { file: "mobile-app.html?accent=volt", out: "v3-mobile-volt.png", w: 1600, h: 1200 },
  { file: "web-dashboard.html", out: "v3-dashboard-light.png", w: 1440, h: 960 },
  { file: "web-dashboard.html?theme=dark&accent=volt", out: "v3-dashboard-dark.png", w: 1440, h: 960 },
  { file: "mobile-app-flat.html", out: "v1-flat-mobile.png", w: 1600, h: 1200 },
  { file: "web-dashboard-flat.html", out: "v1-flat-dashboard.png", w: 1440, h: 960 },
  { file: "radius-demo.html", out: "radius-demo.png", w: 1440, h: 900, full: true },
  { skill: "atlas", file: "atlas-showcase.html", out: "atlas-light.png", w: 1440, h: 1000 },
  { skill: "atlas", file: "atlas-showcase.html?theme=dark#choices", out: "atlas-dark.png", w: 1440, h: 1000 },
  { skill: "atlas", file: "atlas-studio.html?primary=FF5A1F&secondary=0B3D91&name=Northwind", out: "atlas-studio.png", w: 1440, h: 1000 },
];

const browser = await chromium.launch();
for (const s of shots) {
  if (only && (s.skill || "rdl-theme") !== only) continue;
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  await page.goto(tpl(s.file, s.skill));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900); // let entrance animations settle
  await page.screenshot({ path: join(root, "docs", s.out), fullPage: !!s.full });
  await page.close();
  console.log("rendered", s.out);
}
await browser.close();
