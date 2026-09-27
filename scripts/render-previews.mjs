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
const tpl = (f) => {
  const [file, query] = f.split("?");
  return pathToFileURL(join(root, "skills/rdl-theme/assets/templates", file)).href + (query ? `?${query}` : "");
};
const shots = [
  { file: "mobile-app.html", out: "mobile-light-lime.png", w: 1600, h: 1200 },
  { file: "mobile-app.html?theme=dark&accent=violet", out: "mobile-dark-violet.png", w: 1600, h: 1200 },
  { file: "mobile-app.html?accent=gold", out: "mobile-light-gold.png", w: 1600, h: 1200 },
  { file: "web-dashboard.html", out: "dashboard-light.png", w: 1440, h: 960 },
  { file: "web-dashboard.html?theme=dark&accent=orange", out: "dashboard-dark-orange.png", w: 1440, h: 960 },
];

const browser = await chromium.launch();
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  await page.goto(tpl(s.file));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900); // let entrance animations settle
  await page.screenshot({ path: join(root, "docs", s.out) });
  await page.close();
  console.log("rendered", s.out);
}
await browser.close();
