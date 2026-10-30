/*! RDL theme engine v4: Light, Dark and Brand (primary + secondary), with contrast-checked roles.
 *
 * Browser:  <script src="rdl-theme.js"></script>
 *           RDL.setTheme("brand", { primary: "#0732D8", secondary: "#F2D33C" });
 *           RDL.setTheme("dark");                      // or "light"
 *           RDL.setAccent("#D7F23A");                   // secondary colour in light/dark
 * Node:     const RDL = require("./rdl-theme.js");    // used by scripts/build_tokens.mjs
 *
 * The same algorithm is generated into SwiftUI (RDLTokens.swift → RDLThemeEngine), so a brand
 * picked on the web and on iOS resolves to identical colours.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.RDL = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var INK = "#151515";
  var WHITE = "#FFFFFF";
  var BLACK = "#000000";

  // ---------- colour math (sRGB, WCAG 2.x) ----------
  function parse(hex) {
    var h = String(hex).trim().replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error("RDL: expected a #RRGGBB colour, got " + hex);
    return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16); });
  }
  function hex(rgb) {
    return "#" + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"); }).join("").toUpperCase();
  }
  /** Mix `b` into `a` by `t` (0 = a, 1 = b). Same as painting b at opacity t over a. */
  function mix(a, b, t) {
    var x = parse(a), y = parse(b);
    return hex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * t; }));
  }
  function luminance(c) {
    return parse(c).map(function (v) {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) {
    var l1 = luminance(a), l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  /** Ink or white, whichever reads better on `bg`. White wins ties above 4.5:1 (the board's preference). */
  function onColor(bg) {
    var w = contrast(WHITE, bg), k = contrast(INK, bg);
    if (w >= 4.5) return WHITE;
    if (k >= 4.5) return INK;
    return w >= k ? WHITE : INK;
  }
  /** Move `fg` toward ink or white in 2% steps until it reaches `target` contrast on every background. */
  function ensure(fg, bgs, target) {
    bgs = [].concat(bgs);
    var ok = function (c) { return bgs.every(function (b) { return contrast(c, b) >= target; }); };
    if (ok(fg)) return fg;
    var dir = onColor(bgs[0]) === WHITE ? WHITE : BLACK;
    for (var t = 0.02; t <= 1.0001; t += 0.02) {
      var c = mix(fg, dir, t);
      if (ok(c)) return c;
    }
    return dir === WHITE ? WHITE : INK;
  }
  /** Lowest opacity of `fg` over `bg` (from `start`) that reaches `target`, returned as a solid colour. */
  function tier(fg, bg, start, target) {
    for (var a = start; a <= 1.0001; a += 0.02) {
      var c = mix(bg, fg, a);
      if (contrast(c, bg) >= target) return c;
    }
    return fg;
  }
  function rgba(c, a) {
    var x = parse(c);
    return "rgba(" + x.join(",") + "," + a + ")";
  }
  var STATE = { hover: 0.08, focus: 0.12, pressed: 0.12, dragged: 0.16, disabledContent: 0.38, disabledContainer: 0.12 };

  // Status colours: [solid, text] for light canvases and for dark canvases.
  var STATUS = {
    light: { success: ["#1FB877", "#0E7048"], warning: ["#F5A70B", "#8A5B00"], danger: ["#F0453E", "#C2241E"], info: ["#2F66F6", "#1F4FD1"] },
    dark: { success: ["#4BD394", "#7CE0B3"], warning: ["#FFC23D", "#FFD266"], danger: ["#FF6B64", "#FF9A9A"], info: ["#6E95FF", "#9DB8FF"] }
  };

  // ---------- role builders ----------
  /** Accent (secondary colour) roles on a given canvas and surface. Used by every theme. */
  function accentRoles(secondary, canvas, surface) {
    var on = onColor(secondary), fill = secondary, away = on === WHITE ? BLACK : WHITE;
    // A mid-tone secondary can't carry a label: deepen the fill until even its pressed state reads.
    for (var d = 0.02; contrast(on, mix(fill, on, STATE.pressed)) < 4.5 && d <= 1; d += 0.02) fill = mix(secondary, away, d);
    return {
      "accent": fill,
      "accent-hover": mix(fill, on, STATE.hover),
      "accent-pressed": mix(fill, on, STATE.pressed),
      "accent-subtle": mix(surface, secondary, 0.18),
      "accent-text": ensure(secondary, [canvas, surface], 4.5),
      "accent-graphic": ensure(secondary, [canvas, surface], 3),
      "on-accent": on
    };
  }
  /** Brand-panel roles: a card or backdrop filled with the primary colour (all themes). */
  function brandPanelRoles(primary) {
    var on = onColor(primary), P = primary;
    for (var d = 0.02; contrast(on, P) < 4.6 && d <= 1; d += 0.02) P = mix(primary, on === INK ? WHITE : BLACK, d);
    primary = P;
    return {
      "bg-brand": primary,
      "fg-on-brand": on,
      "fg-on-brand-secondary": tier(on, primary, 0.72, 4.5)
    };
  }
  function shadowSet(color, k) {
    return {
      "shadow-e1": "0 1px 2px " + rgba(color, 0.04 * k) + ", 0 2px 8px " + rgba(color, 0.04 * k),
      "shadow-e2": "0 4px 12px " + rgba(color, 0.05 * k) + ", 0 12px 32px " + rgba(color, 0.06 * k),
      "shadow-e3": "0 12px 24px " + rgba(color, 0.08 * k) + ", 0 24px 56px " + rgba(color, 0.1 * k),
      "shadow-e4": "0 16px 40px " + rgba(color, 0.24 * Math.min(k, 2))
    };
  }

  /**
   * The Brand theme: the canvas is the primary colour, surfaces are tinted glass, text and the
   * primary action are ink or white (picked by measured contrast), the secondary colour is the highlight.
   */
  function brandRoles(primary, secondary) {
    var P0 = hex(parse(primary));
    var S = hex(parse(secondary));
    var fg = onColor(P0);
    var light = fg === INK; // a light primary (mustard, lime, sky) carries ink text
    var opp = light ? WHITE : INK;
    var away = light ? WHITE : BLACK; // the direction that adds contrast for fg

    // 1. Canvas: the primary itself, deepened (or lightened) only as far as text needs (≥ 4.6:1).
    var P = P0;
    for (var d = 0.02; contrast(fg, P) < 4.6 && d <= 1; d += 0.02) P = mix(P0, away, d);

    // 2. Anything drawn on the canvas tints toward white (glass) when text still reads, else toward `away`.
    function lift(t, min) {
      var c = mix(P, WHITE, t);
      if (contrast(fg, c) >= (min || 4.5)) return c;
      if (contrast(fg, mix(P, WHITE, t / 2)) >= (min || 4.5)) return mix(P, WHITE, t / 2);
      return mix(P, away, t); // mid-tone primaries: step the other way so surfaces still separate
    }
    var ctlDir = contrast(fg, mix(P, WHITE, 0.34)) >= 4.5 ? WHITE : away;
    function ctl(t) { return mix(P, ctlDir, t); }

    var surface = lift(light ? 0.3 : 0.12), raised = lift(light ? 0.45 : 0.2);
    if (contrast(surface, P) < 1.04) { surface = mix(P, BLACK, 0.04); raised = mix(P, BLACK, 0.07); } // near-white primary
    var canvases = [P, surface, raised];
    var worst = canvases.reduce(function (w, c) { return contrast(fg, c) < contrast(fg, w) ? c : w; }, P);
    var matDir = contrast(fg, mix(P, WHITE, light ? 0.56 : 0.24)) >= 4.5 ? WHITE : BLACK;
    var mat = matDir === WHITE ? (light ? [0.18, 0.28, 0.4, 0.56] : [0.08, 0.12, 0.16, 0.24]) : [0.1, 0.16, 0.22, 0.3];
    var status = light ? STATUS.light : STATUS.dark;

    var r = {
      "bg-canvas": P,
      "bg-canvas-elevated": lift(0.06),
      "bg-surface": surface,
      "bg-surface-raised": raised,
      "bg-surface-sunken": light ? mix(P, WHITE, 0.16) : mix(P, BLACK, 0.14),
      "bg-emphasis": fg,
      "bg-emphasis-raised": mix(fg, P, 0.12),
      "bg-scrim": "rgba(0,0,0,0.48)",

      "fill-control": ctl(0.18),
      "fill-control-hover": ctl(0.26),
      "fill-control-pressed": ctl(0.34),
      "fill-disabled": mix(P, fg, STATE.disabledContainer),

      "fg-primary": fg,
      "fg-secondary": tier(fg, worst, 0.74, 4.5),
      "fg-tertiary": tier(fg, worst, 0.56, 3),
      "fg-disabled": mix(P, fg, STATE.disabledContent),
      "fg-on-emphasis": opp,
      "fg-on-emphasis-secondary": tier(opp, fg, 0.6, 4.5),

      "border-subtle": mix(P, fg, 0.16),
      "border-default": mix(P, fg, 0.28),
      "border-strong": mix(P, fg, 0.44),
      "border-focus": fg,

      "action-primary": fg,
      "action-primary-hover": mix(fg, opp, STATE.hover),
      "action-primary-pressed": mix(fg, opp, STATE.pressed),
      "on-action-primary": opp,
      "action-secondary": ctl(0.18),
      "action-secondary-hover": ctl(0.26),
      "action-secondary-pressed": ctl(0.34),
      "on-action-secondary": fg,

      "material-ultrathin": rgba(matDir, mat[0]),
      "material-thin": rgba(matDir, mat[1]),
      "material-regular": rgba(matDir, mat[2]),
      "material-thick": rgba(matDir, mat[3]),
      "material-border": rgba(WHITE, light ? 0.55 : 0.22),
      "material-highlight": rgba(WHITE, light ? 0.7 : 0.35),
      "material-shade": "rgba(0,0,0,0.16)",
      "material-dark": "rgba(0,0,0,0.28)",
      "material-dark-border": "rgba(255,255,255,0.12)",

      "chart-track": mix(P, fg, 0.14),
      "chart-grid": mix(P, fg, 0.12),
      "chart-muted": mix(P, fg, 0.24),
      "chart-hatch": mix(P, fg, 0.32),
      "tick": mix(P, fg, 0.4),
      "tick-strong": fg
    };
    var acc = accentRoles(S, P, surface);
    acc["accent-subtle"] = mix(P, S, 0.24);
    acc["accent-text"] = ensure(S, canvases, 4.5);
    acc["accent-graphic"] = ensure(S, canvases, 3);
    Object.assign(r, acc);

    ["success", "warning", "danger", "info"].forEach(function (k) {
      r[k] = ensure(status[k][0], canvases, 3);
      r[k + "-subtle"] = light ? mix(mix(P, WHITE, 0.3), r[k], 0.2) : mix(mix(P, BLACK, 0.2), r[k], 0.2);
      r[k + "-text"] = ensure(status[k][1], canvases.concat(r[k + "-subtle"]), 4.5);
    });
    Object.assign(r, brandPanelRoles(P));
    var shade = mix(P, BLACK, 0.7);
    Object.assign(r, shadowSet(shade, light ? 2 : 3));
    r["shadow-glass"] = "0 1px 0 " + rgba(WHITE, light ? 0.5 : 0.2) + " inset, 0 20px 50px " + rgba(shade, 0.28);
    return r;
  }

  // ---------- contrast audit (shared with the build) ----------
  /** Required pairs: [foreground, background(s), minimum, label]. Translucent values are composited first. */
  function pairs(theme) {
    var aaa = theme === "brand" ? 4.5 : 7;
    return [
      ["fg-primary", ["bg-canvas", "bg-surface", "bg-surface-raised", "bg-canvas-elevated"], aaa, "Primary text"],
      ["fg-secondary", ["bg-canvas", "bg-surface", "bg-surface-raised"], 4.5, "Secondary text"],
      ["fg-tertiary", ["bg-canvas", "bg-surface"], 3, "Tertiary text (non-essential, ≥ 18px or captions)"],
      ["fg-on-emphasis", ["bg-emphasis", "bg-emphasis-raised"], 4.5, "Text on emphasis card"],
      ["fg-on-emphasis-secondary", ["bg-emphasis"], 4.5, "Secondary text on emphasis card"],
      ["fg-on-brand", ["bg-brand"], 4.5, "Text on brand panel"],
      ["fg-on-brand-secondary", ["bg-brand"], 4.5, "Secondary text on brand panel"],
      ["on-action-primary", ["action-primary", "action-primary-hover", "action-primary-pressed"], 4.5, "Primary button label"],
      ["on-action-secondary", ["action-secondary", "action-secondary-hover", "action-secondary-pressed"], 4.5, "Secondary button label"],
      ["on-accent", ["accent", "accent-hover", "accent-pressed"], 4.5, "Label on accent fill"],
      ["accent-text", ["bg-canvas", "bg-surface"], 4.5, "Accent text"],
      ["accent-graphic", ["bg-canvas", "bg-surface"], 3, "Accent strokes, dots, focus"],
      ["border-focus", ["bg-canvas", "bg-surface"], 3, "Focus ring"],
      ["success-text", ["bg-canvas", "bg-surface", "success-subtle"], 4.5, "Success text"],
      ["warning-text", ["bg-canvas", "bg-surface", "warning-subtle"], 4.5, "Warning text"],
      ["danger-text", ["bg-canvas", "bg-surface", "danger-subtle"], 4.5, "Danger text"],
      ["info-text", ["bg-canvas", "bg-surface", "info-subtle"], 4.5, "Info text"],
      ["fg-primary", ["material-regular@bg-canvas", "material-thick@bg-canvas"], 4.5, "Text on glass (over canvas)"]
    ];
  }
  function solid(roles, key, base) {
    var v = roles[key];
    var m = /^rgba?\(([^)]+)\)$/.exec(v);
    if (!m) return v;
    var p = m[1].split(",").map(Number);
    return mix(base || roles["bg-canvas"], hex(p.slice(0, 3)), p[3] == null ? 1 : p[3]);
  }
  function audit(roles, theme) {
    var out = [];
    pairs(theme).forEach(function (p) {
      p[1].forEach(function (bgKey) {
        var parts = bgKey.split("@");
        var bg = parts[1] ? solid(roles, parts[0], solid(roles, parts[1])) : solid(roles, bgKey);
        var fg = solid(roles, p[0], bg);
        var c = contrast(fg, bg);
        out.push({ fg: p[0], bg: bgKey, ratio: Math.round(c * 100) / 100, min: p[2], pass: c >= p[2] - 0.005, label: p[3] });
      });
    });
    return out;
  }

  // ---------- browser runtime ----------
  function apply(el, roles) {
    for (var k in roles) el.style.setProperty("--rdl-" + k, roles[k]);
  }
  function clear(el, prefixKeys) {
    prefixKeys.forEach(function (k) { el.style.removeProperty("--rdl-" + k); });
  }
  /**
   * Switch theme on an element (default <html>).
   *   setTheme("light" | "dark")                                  neutral themes; optional { secondary } sets the accent
   *   setTheme("brand", { primary, secondary })                  brand theme from any two colours
   * Returns the computed roles and the contrast audit.
   */
  function setTheme(theme, opts) {
    opts = opts || {};
    var el = opts.el || document.documentElement;
    clear(el, el.__rdlKeys || []);
    el.setAttribute("data-theme", theme);
    var roles = {};
    if (theme === "brand") {
      if (!opts.primary || !opts.secondary) { el.__rdlKeys = []; return { roles: roles, audit: [] }; } // uses a data-brand preset from tokens.css
      roles = brandRoles(opts.primary, opts.secondary);
      roles["brand-primary"] = hex(parse(opts.primary));
      roles["brand-secondary"] = hex(parse(opts.secondary));
    } else if (opts.secondary || opts.primary) {
      var cs = getComputedStyle(el);
      var canvas = cs.getPropertyValue("--rdl-bg-canvas").trim(), surface = cs.getPropertyValue("--rdl-bg-surface").trim();
      if (opts.secondary) roles = accentRoles(hex(parse(opts.secondary)), canvas, surface);
      if (opts.primary) Object.assign(roles, brandPanelRoles(hex(parse(opts.primary))));
    }
    apply(el, roles);
    el.__rdlKeys = Object.keys(roles);
    return { roles: roles, audit: theme === "brand" ? audit(roles, "brand") : [] };
  }
  function setAccent(secondary, el) {
    el = el || document.documentElement;
    return setTheme(el.getAttribute("data-theme") || "light", { secondary: secondary, el: el });
  }

  return {
    version: "4.0.0",
    INK: INK, WHITE: WHITE, STATE: STATE, STATUS: STATUS,
    parse: parse, hex: hex, mix: mix, luminance: luminance, contrast: contrast, onColor: onColor, ensure: ensure, tier: tier, rgba: rgba,
    accentRoles: accentRoles, brandPanelRoles: brandPanelRoles, brandRoles: brandRoles, shadowSet: shadowSet,
    pairs: pairs, audit: audit, solid: solid,
    setTheme: setTheme, setAccent: setAccent
  };
});
