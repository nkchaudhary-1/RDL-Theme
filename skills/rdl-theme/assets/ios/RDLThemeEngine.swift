// RDLThemeEngine.swift — RDL v4 themes on iOS: Light, Dark, System and Brand (primary + secondary).
//
// A line-for-line port of assets/tokens/rdl-theme.js, so the same two brand colours resolve to the
// same roles on the web and on iOS. Pairs with the generated RDLTokens.swift (RDLThemeData, RDLColor).
//
//   RDLTheme.apply(.brand(primary: "#0732D8", secondary: "#F2D33C"))   // canvas = primary, highlight = secondary
//   RDLTheme.apply(.dark, accent: "#D7F23A")                            // neutral dark, custom secondary
//   RDLTheme.apply(.system)                                             // light/dark follow the device
//
// Every `RDLColor` role is a dynamic colour that reads the active theme when it draws. After calling
// `apply`, refresh the hierarchy (e.g. change an `.id(themeVersion)` on the root view) and set
// `.preferredColorScheme(RDLTheme.colorScheme)` so system chrome matches.
import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

// MARK: - Colour math and role builders

public enum RDLThemeEngine {
    public static let ink = "#151515"
    public static let white = "#FFFFFF"
    public static let black = "#000000"
    static let hover = 0.08, pressed = 0.12, disabledContent = 0.38, disabledContainer = 0.12

    /// Status colours: (solid, text) for light canvases and for dark canvases.
    static let statusLight: [String: (String, String)] = [
        "success": ("#1FB877", "#0E7048"), "warning": ("#F5A70B", "#8A5B00"),
        "danger": ("#F0453E", "#C2241E"), "info": ("#2F66F6", "#1F4FD1"),
    ]
    static let statusDark: [String: (String, String)] = [
        "success": ("#4BD394", "#7CE0B3"), "warning": ("#FFC23D", "#FFD266"),
        "danger": ("#FF6B64", "#FF9A9A"), "info": ("#6E95FF", "#9DB8FF"),
    ]

    public static func parse(_ hex: String) -> [Double] {
        var h = hex.trimmingCharacters(in: .whitespaces).replacingOccurrences(of: "#", with: "")
        if h.count == 3 { h = h.map { "\($0)\($0)" }.joined() }
        guard h.count == 6, let v = UInt32(h, radix: 16) else { return [0, 0, 0] }
        return [Double((v >> 16) & 0xFF), Double((v >> 8) & 0xFF), Double(v & 0xFF)]
    }

    public static func hex(_ c: [Double]) -> String {
        let v = c.map { Int(max(0, min(255, $0.rounded()))) }
        return String(format: "#%02X%02X%02X", v[0], v[1], v[2])
    }

    /// Mix `b` into `a` by `t` (0 = a, 1 = b).
    public static func mix(_ a: String, _ b: String, _ t: Double) -> String {
        let x = parse(a), y = parse(b)
        return hex((0..<3).map { x[$0] + (y[$0] - x[$0]) * t })
    }

    public static func luminance(_ c: String) -> Double {
        let w = [0.2126, 0.7152, 0.0722]
        return parse(c).enumerated().reduce(0) { sum, e in
            let v = e.element / 255
            let lin = v <= 0.04045 ? v / 12.92 : pow((v + 0.055) / 1.055, 2.4)
            return sum + lin * w[e.offset]
        }
    }

    public static func contrast(_ a: String, _ b: String) -> Double {
        let l1 = luminance(a), l2 = luminance(b)
        return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
    }

    /// Ink or white, whichever reads better on `bg`. White wins when it reaches 4.5:1.
    public static func onColor(_ bg: String) -> String {
        let w = contrast(white, bg), k = contrast(ink, bg)
        if w >= 4.5 { return white }
        if k >= 4.5 { return ink }
        return w >= k ? white : ink
    }

    /// Move `fg` toward ink or white in 2% steps until it reaches `target` on every background.
    public static func ensure(_ fg: String, _ bgs: [String], _ target: Double) -> String {
        let ok: (String) -> Bool = { c in bgs.allSatisfy { contrast(c, $0) >= target } }
        if ok(fg) { return fg }
        let dir = onColor(bgs[0]) == white ? white : black
        var t = 0.02
        while t <= 1.0001 {
            let c = mix(fg, dir, t)
            if ok(c) { return c }
            t += 0.02
        }
        return dir == white ? white : ink
    }

    /// Lowest opacity of `fg` over `bg` (from `start`) that reaches `target`, as a solid colour.
    public static func tier(_ fg: String, _ bg: String, _ start: Double, _ target: Double) -> String {
        var a = start
        while a <= 1.0001 {
            let c = mix(bg, fg, a)
            if contrast(c, bg) >= target { return c }
            a += 0.02
        }
        return fg
    }

    public static func rgba(_ c: String, _ a: Double) -> String {
        let x = parse(c).map { Int($0) }
        return "rgba(\(x[0]),\(x[1]),\(x[2]),\(a))"
    }

    /// Accent (secondary colour) roles on a canvas and surface.
    public static func accentRoles(_ secondary: String, canvas: String, surface: String) -> [String: String] {
        let on = onColor(secondary)
        let away = on == white ? black : white
        var fill = secondary
        var d = 0.02
        while contrast(on, mix(fill, on, pressed)) < 4.5 && d <= 1 {
            fill = mix(secondary, away, d)
            d += 0.02
        }
        return [
            "accent": fill,
            "accent-hover": mix(fill, on, hover),
            "accent-pressed": mix(fill, on, pressed),
            "accent-subtle": mix(surface, secondary, 0.18),
            "accent-text": ensure(secondary, [canvas, surface], 4.5),
            "accent-graphic": ensure(secondary, [canvas, surface], 3),
            "on-accent": on,
        ]
    }

    /// Brand panel roles: a card or backdrop filled with the primary colour.
    public static func brandPanelRoles(_ primary: String) -> [String: String] {
        let on = onColor(primary)
        var p = primary
        var d = 0.02
        while contrast(on, p) < 4.6 && d <= 1 {
            p = mix(primary, on == ink ? white : black, d)
            d += 0.02
        }
        return ["bg-brand": p, "fg-on-brand": on, "fg-on-brand-secondary": tier(on, p, 0.72, 4.5)]
    }

    /// The brand theme: canvas = primary, highlight = secondary, text and primary action by contrast.
    public static func brandRoles(primary: String, secondary: String) -> [String: String] {
        let p0 = hex(parse(primary)), s = hex(parse(secondary))
        let fg = onColor(p0)
        let light = fg == ink
        let opp = light ? white : ink
        let away = light ? white : black

        var p = p0
        var d = 0.02
        while contrast(fg, p) < 4.6 && d <= 1 {
            p = mix(p0, away, d)
            d += 0.02
        }
        func lift(_ t: Double) -> String {
            let c = mix(p, white, t)
            if contrast(fg, c) >= 4.5 { return c }
            if contrast(fg, mix(p, white, t / 2)) >= 4.5 { return mix(p, white, t / 2) }
            return mix(p, away, t)
        }
        let ctlDir = contrast(fg, mix(p, white, 0.34)) >= 4.5 ? white : away
        func ctl(_ t: Double) -> String { mix(p, ctlDir, t) }

        var surface = lift(light ? 0.3 : 0.12), raised = lift(light ? 0.45 : 0.2)
        if contrast(surface, p) < 1.04 { surface = mix(p, black, 0.04); raised = mix(p, black, 0.07) }
        let canvases = [p, surface, raised]
        let worst = canvases.reduce(p) { w, c in contrast(fg, c) < contrast(fg, w) ? c : w }
        let matDir = contrast(fg, mix(p, white, light ? 0.56 : 0.24)) >= 4.5 ? white : black
        let mat = matDir == white ? (light ? [0.18, 0.28, 0.4, 0.56] : [0.08, 0.12, 0.16, 0.24]) : [0.1, 0.16, 0.22, 0.3]
        let status = light ? statusLight : statusDark

        var r: [String: String] = [
            "bg-canvas": p,
            "bg-canvas-elevated": lift(0.06),
            "bg-surface": surface,
            "bg-surface-raised": raised,
            "bg-surface-sunken": light ? mix(p, white, 0.16) : mix(p, black, 0.14),
            "bg-emphasis": fg,
            "bg-emphasis-raised": mix(fg, p, 0.12),
            "bg-scrim": "rgba(0,0,0,0.48)",
            "fill-control": ctl(0.18),
            "fill-control-hover": ctl(0.26),
            "fill-control-pressed": ctl(0.34),
            "fill-disabled": mix(p, fg, disabledContainer),
            "fg-primary": fg,
            "fg-secondary": tier(fg, worst, 0.74, 4.5),
            "fg-tertiary": tier(fg, worst, 0.56, 3),
            "fg-disabled": mix(p, fg, disabledContent),
            "fg-on-emphasis": opp,
            "fg-on-emphasis-secondary": tier(opp, fg, 0.6, 4.5),
            "border-subtle": mix(p, fg, 0.16),
            "border-default": mix(p, fg, 0.28),
            "border-strong": mix(p, fg, 0.44),
            "border-focus": fg,
            "action-primary": fg,
            "action-primary-hover": mix(fg, opp, hover),
            "action-primary-pressed": mix(fg, opp, pressed),
            "on-action-primary": opp,
            "action-secondary": ctl(0.18),
            "action-secondary-hover": ctl(0.26),
            "action-secondary-pressed": ctl(0.34),
            "on-action-secondary": fg,
            "material-ultrathin": rgba(matDir, mat[0]),
            "material-thin": rgba(matDir, mat[1]),
            "material-regular": rgba(matDir, mat[2]),
            "material-thick": rgba(matDir, mat[3]),
            "material-border": rgba(white, light ? 0.55 : 0.22),
            "material-highlight": rgba(white, light ? 0.7 : 0.35),
            "material-shade": "rgba(0,0,0,0.16)",
            "material-dark": "rgba(0,0,0,0.28)",
            "material-dark-border": "rgba(255,255,255,0.12)",
            "chart-track": mix(p, fg, 0.14),
            "chart-grid": mix(p, fg, 0.12),
            "chart-muted": mix(p, fg, 0.24),
            "chart-hatch": mix(p, fg, 0.32),
            "tick": mix(p, fg, 0.4),
            "tick-strong": fg,
        ]
        var acc = accentRoles(s, canvas: p, surface: surface)
        acc["accent-subtle"] = mix(p, s, 0.24)
        acc["accent-text"] = ensure(s, canvases, 4.5)
        acc["accent-graphic"] = ensure(s, canvases, 3)
        r.merge(acc) { _, new in new }
        for k in ["success", "warning", "danger", "info"] {
            let (solid, text) = status[k]!
            let c = ensure(solid, canvases, 3)
            let subtle = light ? mix(mix(p, white, 0.3), c, 0.2) : mix(mix(p, black, 0.2), c, 0.2)
            r[k] = c
            r[k + "-subtle"] = subtle
            r[k + "-text"] = ensure(text, canvases + [subtle], 4.5)
        }
        r.merge(brandPanelRoles(p)) { _, new in new }
        return r
    }
}

// MARK: - Active theme

public enum RDLThemeMode: Equatable {
    case system, light, dark
    case brand(primary: String, secondary: String)

    /// A named brand preset from tokens.json (cobalt, mustard, gold, olive, forest, lavender, plum, vermilion, dusk).
    public static func brandPreset(_ name: String) -> RDLThemeMode {
        let p = RDLThemeData.brandPresets[name] ?? RDLThemeData.brandPresets[RDLThemeData.defaultBrand]!
        return .brand(primary: p.primary, secondary: p.secondary)
    }
}

public enum RDLTheme {
    public private(set) static var mode: RDLThemeMode = .system
    public private(set) static var secondary: String = RDLThemeData.accentPresets[RDLThemeData.defaultAccent]!
    public private(set) static var primary: String = RDLThemeData.brandPresets[RDLThemeData.defaultBrand]!.primary
    private static var cache: [String: [String: String]] = [:]

    /// Switch theme. `accent` sets the secondary colour for light and dark; `brand` sets the primary used
    /// by brand panels in light and dark. In `.brand(...)` both come from the mode itself.
    public static func apply(_ newMode: RDLThemeMode, accent: String? = nil, brand: String? = nil) {
        mode = newMode
        if case let .brand(p, s) = newMode { primary = p; secondary = s }
        if let accent { secondary = accent }
        if let brand { primary = brand }
        cache = [:]
    }

    /// The colour scheme system chrome should use for the active theme (nil = follow the device).
    public static var colorScheme: ColorScheme? {
        switch mode {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        case let .brand(p, _): return RDLThemeEngine.onColor(p) == RDLThemeEngine.white ? .dark : .light
        }
    }

    /// All roles for one concrete theme ("light", "dark" or "brand"), optionally with another secondary colour.
    public static func roles(_ theme: String, secondary override: String? = nil) -> [String: String] {
        let sec = override ?? secondary
        let key = "\(theme)|\(sec)|\(primary)|\(mode)"
        if let hit = cache[key] { return hit }
        var r: [String: String]
        if theme == "brand", case let .brand(p, s) = mode {
            r = RDLThemeEngine.brandRoles(primary: p, secondary: override ?? s)
        } else {
            let base = theme == "dark" ? RDLThemeData.dark : RDLThemeData.light
            r = base
            r.merge(RDLThemeEngine.accentRoles(sec, canvas: base["bg-canvas"]!, surface: base["bg-surface"]!)) { _, new in new }
            r.merge(RDLThemeEngine.brandPanelRoles(primary)) { _, new in new }
            for (k, v) in r where v.hasPrefix("$") { r[k] = r[String(v.dropFirst())] }
        }
        cache[key] = r
        return r
    }

    static func value(_ key: String, dark: Bool, secondary: String?) -> String {
        let theme: String
        switch mode {
        case .brand: theme = "brand"
        case .light: theme = "light"
        case .dark: theme = "dark"
        case .system: theme = dark ? "dark" : "light"
        }
        let k = RDLThemeData.legacy[key] ?? key
        return roles(theme, secondary: secondary)[k] ?? "#FF00FF"
    }

    /// A dynamic colour for a semantic role; resolves for the active theme every time it draws.
    public static func color(_ key: String, secondary: String? = nil) -> Color {
        #if canImport(UIKit)
        return Color(UIColor { traits in
            uiColor(value(key, dark: traits.userInterfaceStyle == .dark, secondary: secondary))
        })
        #else
        return fixed(value(key, dark: false, secondary: secondary))
        #endif
    }

    /// A constant colour from `#RRGGBB` or `rgba(r,g,b,a)`.
    public static func fixed(_ value: String) -> Color {
        let c = components(value)
        return Color(.sRGB, red: c[0], green: c[1], blue: c[2], opacity: c[3])
    }

    static func components(_ value: String) -> [Double] {
        if value.hasPrefix("rgba") {
            let nums = value.dropFirst(5).dropLast().split(separator: ",").compactMap { Double($0.trimmingCharacters(in: .whitespaces)) }
            if nums.count == 4 { return [nums[0] / 255, nums[1] / 255, nums[2] / 255, nums[3]] }
        }
        let p = RDLThemeEngine.parse(value)
        return [p[0] / 255, p[1] / 255, p[2] / 255, 1]
    }

    #if canImport(UIKit)
    static func uiColor(_ value: String) -> UIColor {
        let c = components(value)
        return UIColor(red: c[0], green: c[1], blue: c[2], alpha: c[3])
    }
    #endif
}

public extension View {
    /// Paints the active theme's canvas behind the view and matches system chrome to the theme.
    func rdlThemedRoot() -> some View {
        background(RDLColor.bgCanvas.ignoresSafeArea())
            .foregroundStyle(RDLColor.fgPrimary)
            .preferredColorScheme(RDLTheme.colorScheme)
    }
}
