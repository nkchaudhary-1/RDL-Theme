/* Atlas — behaviour layer (no dependencies, ~6 KB). Progressive enhancement over the markup patterns
   in references/components.md. Everything works without it except menus, tabs, tooltips, toasts and
   switches, which fall back to plain buttons / details.

   Init once: Atlas.init(root = document). Each widget is found by data-at-* attributes:
     data-at-tabs            on .at-tabs         (role=tablist / tab / tabpanel; arrow keys, Home/End)
     data-at-menu            on the trigger      (aria-controls → role=menu; arrows, typeahead, Escape)
     data-at-popover         on the trigger      (aria-controls → popover; Escape, outside click, focus-out)
     data-at-dialog          on the trigger      (aria-controls → <dialog>; showModal, focus return)
     data-at-close           inside a dialog     (closes the nearest dialog)
     data-at-switch          on button[role=switch]
     data-at-tooltip="text"  on any element      (role=tooltip linked by aria-describedby; hover + focus; Escape)
     data-at-disclosure      on the trigger      (aria-expanded ↔ aria-controls hidden)
     data-at-theme           on a button         (cycles light/dark/system; persists in localStorage)
     data-at-brand="wise"    on a button         (cycles atlas → listed presets; sets data-brand on <html>; persists)
     data-at-dismiss         on a button          (removes the closest .at-alert / .at-toast / .at-banner)
   Toasts: Atlas.toast({ title, body, variant: "info"|"success"|"warning"|"danger", timeout })
   Announce: Atlas.announce("Saved", "polite"|"assertive")                                            */
(function (global) {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const uid = (() => { let n = 0; return (p) => `${p}-${++n}`; })();
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  /* ---------- live regions ---------- */
  let polite, assertive;
  function region(kind) {
    const ref = kind === "assertive" ? assertive : polite;
    if (ref) return ref;
    const el = document.createElement("div");
    el.className = "at-sr-only";
    el.setAttribute("aria-live", kind);
    el.setAttribute("aria-atomic", "true");
    document.body.appendChild(el);
    if (kind === "assertive") assertive = el; else polite = el;
    return el;
  }
  function announce(text, kind = "polite") {
    const el = region(kind);
    el.textContent = "";
    setTimeout(() => { el.textContent = text; }, 50); // re-announces identical messages
  }

  /* ---------- tabs ---------- */
  function initTabs(root) {
    const list = $('[role="tablist"]', root);
    if (!list) return;
    const tabs = $$('[role="tab"]', list);
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const select = (i, focus = true) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i, false));
      t.addEventListener("keydown", (e) => {
        const horizontal = list.getAttribute("aria-orientation") !== "vertical";
        const prev = horizontal ? "ArrowLeft" : "ArrowUp", next = horizontal ? "ArrowRight" : "ArrowDown";
        let j = null;
        if (e.key === next) j = (i + 1) % tabs.length;
        else if (e.key === prev) j = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") j = 0;
        else if (e.key === "End") j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(j); }
      });
    });
    panels.forEach((p) => { if (p && !p.hasAttribute("tabindex")) p.tabIndex = 0; });
    const current = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
    select(current, false);
  }

  /* ---------- roving list (menus) ---------- */
  function initMenu(trigger) {
    const menu = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!menu) return;
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    const items = () => $$('[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]', menu).filter((i) => i.getAttribute("aria-disabled") !== "true");
    let typed = "", typedAt = 0;
    const open = (focusIndex = 0) => {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      const list = items();
      list.forEach((i) => (i.tabIndex = -1));
      const target = focusIndex < 0 ? list[list.length - 1] : list[focusIndex];
      if (target) target.focus();
      document.addEventListener("pointerdown", onOutside, true);
    };
    const close = (returnFocus = true) => {
      if (menu.hidden) return;
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("pointerdown", onOutside, true);
      if (returnFocus) trigger.focus();
    };
    const onOutside = (e) => { if (!menu.contains(e.target) && !trigger.contains(e.target)) close(false); };
    trigger.addEventListener("click", () => (menu.hidden ? open() : close()));
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); open(0); }
      if (e.key === "ArrowUp") { e.preventDefault(); open(-1); }
    });
    menu.addEventListener("keydown", (e) => {
      const list = items(), i = list.indexOf(document.activeElement);
      const go = (j) => { e.preventDefault(); list[(j + list.length) % list.length].focus(); };
      if (e.key === "ArrowDown") go(i + 1);
      else if (e.key === "ArrowUp") go(i - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(list.length - 1);
      else if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "Tab") close(false);
      else if (e.key.length === 1 && /\S/.test(e.key)) {
        const now = Date.now(); typed = now - typedAt > 500 ? e.key : typed + e.key; typedAt = now;
        const hit = list.find((it) => it.textContent.trim().toLowerCase().startsWith(typed.toLowerCase()));
        if (hit) hit.focus();
      }
    });
    menu.addEventListener("click", (e) => {
      const item = e.target.closest('[role^="menuitem"]');
      if (!item || item.getAttribute("aria-disabled") === "true") return;
      if (item.getAttribute("role") === "menuitemcheckbox") item.setAttribute("aria-checked", item.getAttribute("aria-checked") !== "true");
      else if (item.getAttribute("role") === "menuitemradio") { $$('[role="menuitemradio"]', menu).forEach((r) => r.setAttribute("aria-checked", r === item)); }
      else close();
    });
    menu.addEventListener("focusout", (e) => { if (!menu.contains(e.relatedTarget) && e.relatedTarget !== trigger) close(false); });
  }

  /* ---------- popover ---------- */
  function initPopover(trigger) {
    const pop = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!pop) return;
    trigger.setAttribute("aria-expanded", "false");
    const onOutside = (e) => { if (!pop.contains(e.target) && !trigger.contains(e.target)) close(false); };
    const open = () => {
      pop.hidden = false; trigger.setAttribute("aria-expanded", "true");
      const first = $(FOCUSABLE, pop) || pop; if (first === pop) pop.tabIndex = -1; first.focus();
      document.addEventListener("pointerdown", onOutside, true);
    };
    const close = (returnFocus = true) => {
      if (pop.hidden) return;
      pop.hidden = true; trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("pointerdown", onOutside, true);
      if (returnFocus) trigger.focus();
    };
    trigger.addEventListener("click", () => (pop.hidden ? open() : close()));
    pop.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } });
    pop.addEventListener("focusout", (e) => { if (!pop.contains(e.relatedTarget) && e.relatedTarget !== trigger) close(false); });
    $$("[data-at-close]", pop).forEach((b) => b.addEventListener("click", () => close()));
  }

  /* ---------- dialog ---------- */
  function initDialog(trigger) {
    const dlg = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!dlg || dlg.tagName !== "DIALOG") return;
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.addEventListener("click", () => {
      dlg.showModal();
      const target = $("[autofocus]", dlg) || $(FOCUSABLE, dlg);
      if (target) target.focus();
    });
    dlg.addEventListener("close", () => trigger.focus());
    if (!dlg.dataset.atBound) {
      dlg.dataset.atBound = "1";
      $$("[data-at-close]", dlg).forEach((b) => b.addEventListener("click", () => dlg.close()));
      dlg.addEventListener("click", (e) => { if (e.target === dlg && dlg.dataset.atLight !== "false") dlg.close(); }); // backdrop click
    }
  }

  /* ---------- switch ---------- */
  function initSwitch(btn) {
    if (!btn.hasAttribute("aria-checked")) btn.setAttribute("aria-checked", "false");
    btn.addEventListener("click", () => {
      if (btn.disabled || btn.getAttribute("aria-disabled") === "true") return;
      btn.setAttribute("aria-checked", btn.getAttribute("aria-checked") !== "true");
      btn.dispatchEvent(new CustomEvent("at:change", { bubbles: true, detail: { checked: btn.getAttribute("aria-checked") === "true" } }));
    });
  }

  /* ---------- tooltip ---------- */
  function initTooltip(el) {
    const text = el.dataset.atTooltip;
    if (!text) return;
    const tip = document.createElement("div");
    tip.className = "at-tooltip"; tip.role = "tooltip"; tip.id = uid("at-tip"); tip.textContent = text; tip.hidden = true;
    const host = el.closest(".at-has-tooltip") || (() => { const w = document.createElement("span"); w.className = "at-has-tooltip"; el.replaceWith(w); w.appendChild(el); return w; })();
    host.appendChild(tip);
    el.setAttribute("aria-describedby", [el.getAttribute("aria-describedby"), tip.id].filter(Boolean).join(" "));
    let timer;
    const show = () => { clearTimeout(timer); tip.hidden = false; const r = el.getBoundingClientRect(); const above = r.top > 60; tip.style.cssText = `left:50%;transform:translateX(-50%);${above ? "bottom:calc(100% + 6px)" : "top:calc(100% + 6px)"}`; };
    const hide = () => { timer = setTimeout(() => { tip.hidden = true; }, 120); };
    el.addEventListener("mouseenter", show); el.addEventListener("focus", show);
    el.addEventListener("mouseleave", hide); el.addEventListener("blur", hide);
    tip.addEventListener("mouseenter", () => clearTimeout(timer)); tip.addEventListener("mouseleave", hide); // hoverable (1.4.13)
    el.addEventListener("keydown", (e) => { if (e.key === "Escape") { tip.hidden = true; } }); // dismissible (1.4.13)
  }

  /* ---------- disclosure ---------- */
  function initDisclosure(trigger) {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    panel.hidden = !expanded;
    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") !== "true";
      trigger.setAttribute("aria-expanded", open); panel.hidden = !open;
    });
  }

  /* ---------- theme ---------- */
  function initTheme(btn) {
    const apply = (mode) => {
      if (mode === "system") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = mode;
      btn.setAttribute("aria-label", `Theme: ${mode}. Switch theme`);
      const label = $("[data-at-theme-label]", btn); if (label) label.textContent = mode[0].toUpperCase() + mode.slice(1);
    };
    let saved = "system"; try { saved = localStorage.getItem("at-theme") || "system"; } catch (_) { /* private mode */ }
    apply(document.documentElement.dataset.theme || saved);   // a server-rendered data-theme wins over the stored preference
    btn.addEventListener("click", () => {
      const order = ["light", "dark", "system"]; const cur = document.documentElement.dataset.theme || "system";
      const next = order[(order.indexOf(cur) + 1) % order.length];
      apply(next); try { localStorage.setItem("at-theme", next); } catch (_) { /* ignore */ }
      announce(`Theme set to ${next}`);
    });
  }

  /* ---------- brand preset ---------- */
  function initBrand(btn) {
    const presets = ["atlas", ...btn.dataset.atBrand.split(",").map((s) => s.trim()).filter(Boolean)];
    const apply = (name) => {
      if (name === "atlas") document.documentElement.removeAttribute("data-brand"); else document.documentElement.dataset.brand = name;
      btn.setAttribute("aria-label", `Brand: ${name}. Switch brand preset`);
      const label = $("[data-at-brand-label]", btn); if (label) label.textContent = name[0].toUpperCase() + name.slice(1);
    };
    let saved = null; try { saved = localStorage.getItem("at-brand"); } catch (_) { /* private mode */ }
    apply(document.documentElement.dataset.brand || saved || "atlas");
    btn.addEventListener("click", () => {
      const cur = document.documentElement.dataset.brand || "atlas";
      const next = presets[(presets.indexOf(cur) + 1) % presets.length];
      apply(next); try { localStorage.setItem("at-brand", next); } catch (_) { /* ignore */ }
      announce(`Brand preset set to ${next}`);
    });
  }

  /* ---------- toasts ---------- */
  const ICONS = {
    info: '<svg class="at-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
    success: '<svg class="at-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    warning: '<svg class="at-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 2 20h20L12 3z"/><path d="M12 9v5M12 17h.01"/></svg>',
    danger: '<svg class="at-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>',
  };
  const WORD = { info: "Info", success: "Success", warning: "Warning", danger: "Error" };
  let toastRegion;
  function toast({ title = "", body = "", variant = "info", timeout } = {}) {
    if (!toastRegion) {
      toastRegion = document.createElement("div"); toastRegion.className = "at-toast-region";
      toastRegion.setAttribute("aria-live", "polite"); toastRegion.setAttribute("aria-relevant", "additions"); toastRegion.setAttribute("aria-label", "Notifications");
      document.body.appendChild(toastRegion);
    }
    const el = document.createElement("div");
    el.className = `at-toast at-toast--${variant}`;
    el.setAttribute("role", variant === "danger" ? "alert" : "status");
    el.innerHTML = `<span class="at-toast__icon">${ICONS[variant] || ICONS.info}</span><div class="at-toast__body"><span class="at-sr-only">${WORD[variant] || "Info"}: </span>${title ? `<strong class="at-toast__title"></strong>` : ""}<span class="at-toast__text"></span></div><button type="button" class="at-btn at-btn--tertiary at-btn--sm at-btn--icon at-toast__close" aria-label="Dismiss notification"><svg class="at-icon at-icon--sm" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
    if (title) $(".at-toast__title", el).textContent = title;
    $(".at-toast__text", el).textContent = body;
    const remove = () => { el.classList.add("is-leaving"); setTimeout(() => el.remove(), 200); };
    $(".at-toast__close", el).addEventListener("click", remove);
    toastRegion.appendChild(el);
    const ms = timeout ?? (variant === "danger" ? 0 : 7000);        // errors persist (2.2.1)
    if (ms > 0) {
      let t = setTimeout(remove, ms);
      el.addEventListener("mouseenter", () => clearTimeout(t)); el.addEventListener("focusin", () => clearTimeout(t));
      el.addEventListener("mouseleave", () => (t = setTimeout(remove, ms))); el.addEventListener("focusout", () => (t = setTimeout(remove, ms)));
    }
    return el;
  }

  /* ---------- dismiss ---------- */
  function initDismiss(btn) {
    btn.addEventListener("click", () => { const host = btn.closest(".at-alert,.at-toast,.at-banner"); if (host) host.remove(); });
  }

  /* ---------- sortable table headers ---------- */
  function initSort(btn) {
    const th = btn.closest("th");
    btn.addEventListener("click", () => {
      const next = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
      $$("th[aria-sort]", th.closest("table")).forEach((h) => h.removeAttribute("aria-sort"));
      th.setAttribute("aria-sort", next);
      announce(`Sorted by ${btn.textContent.trim()}, ${next}`);
    });
  }

  function init(root = document) {
    $$("[data-at-tabs]", root).forEach(initTabs);
    $$("[data-at-menu]", root).forEach(initMenu);
    $$("[data-at-popover]", root).forEach(initPopover);
    $$("[data-at-dialog]", root).forEach(initDialog);
    $$("[data-at-switch]", root).forEach(initSwitch);
    $$("[data-at-tooltip]", root).forEach(initTooltip);
    $$("[data-at-disclosure]", root).forEach(initDisclosure);
    $$("[data-at-theme]", root).forEach(initTheme);
    $$("[data-at-brand]", root).forEach(initBrand);
    $$("[data-at-dismiss]", root).forEach(initDismiss);
    $$("[data-at-sort]", root).forEach(initSort);
  }

  const Atlas = { init, toast, announce };
  global.Atlas = Atlas;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init()); else init();
})(window);
