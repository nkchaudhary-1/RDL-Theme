// RDL Theme — V2 glass components (SwiftUI, iOS 17+).
// Depends on RDLTokens.swift (generated). Pairs with the "V2" section of rdl-components.css.
// Bundle Urbanist (and optionally Doto) for exact web parity; everything falls back to the system font.

import SwiftUI

// MARK: - Surface style (glass default, flat = v1 look)

public enum RDLSurfaceStyle { case glass, flat }
private struct RDLSurfaceStyleKey: EnvironmentKey { static let defaultValue = RDLSurfaceStyle.glass }
public extension EnvironmentValues {
    var rdlSurfaceStyle: RDLSurfaceStyle { get { self[RDLSurfaceStyleKey.self] } set { self[RDLSurfaceStyleKey.self] = newValue } }
}
public extension View {
    func rdlSurfaceStyle(_ style: RDLSurfaceStyle) -> some View { environment(\.rdlSurfaceStyle, style) }
}

// MARK: - Glass

public enum RDLGlassTone { case light, dark }

public struct RDLGlassModifier: ViewModifier {
    @Environment(\.rdlSurfaceStyle) private var style
    @Environment(\.colorScheme) private var scheme
    var tone: RDLGlassTone?
    var radius: CGFloat
    var padding: CGFloat
    var iridescent: Bool

    public func body(content: Content) -> some View {
        let dark = (tone ?? (scheme == .dark ? .dark : .light)) == .dark
        let shape = RoundedRectangle(cornerRadius: radius, style: .continuous)
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(dark ? Color.white : RDLColor.glassText)
            .background {
                if style == .flat {
                    shape.fill(dark ? RDLPalette.stone900 : RDLColor.bgSurface)
                } else {
                    shape.fill(dark ? .ultraThinMaterial : .regularMaterial)
                        .environment(\.colorScheme, dark ? .dark : .light)
                        .overlay(shape.fill(dark ? Color.black.opacity(0.28) : Color.white.opacity(0.35)))
                }
            }
            .overlay {
                if style == .glass {
                    shape.strokeBorder(
                        iridescent
                            ? AnyShapeStyle(AngularGradient(colors: [.pink.opacity(0.6), .cyan.opacity(0.6), .green.opacity(0.45), .yellow.opacity(0.5), .pink.opacity(0.6)], center: .center))
                            : AnyShapeStyle(LinearGradient(colors: [.white.opacity(dark ? 0.22 : 0.9), .white.opacity(dark ? 0.04 : 0.2)], startPoint: .topLeading, endPoint: .bottomTrailing)),
                        lineWidth: 1)
                }
            }
            .shadow(color: .black.opacity(style == .glass ? (dark ? 0.35 : 0.10) : 0), radius: 24, y: 16)
    }
}

public extension View {
    /// Frosted card. `tone: nil` follows the color scheme; force `.dark` over photos and auras.
    func rdlGlass(_ tone: RDLGlassTone? = nil, radius: CGFloat = RDLRadius.card, padding: CGFloat = RDLSpace.cardPadding, iridescent: Bool = false) -> some View {
        modifier(RDLGlassModifier(tone: tone, radius: radius, padding: padding, iridescent: iridescent))
    }

    /// Widget squircle filled with an aura gradient.
    func rdlAura<S: ShapeStyle>(_ fill: S, radius: CGFloat = RDLRadius.widget, padding: CGFloat = RDLSpace.s5) -> some View {
        self.padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(fill, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
    }

    /// Electric-blue blueprint card with white content.
    func rdlBlueprint(padding: CGFloat = RDLSpace.s5) -> some View {
        self.padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(.white)
            .background(RDLPalette.electric500, in: RoundedRectangle(cornerRadius: RDLRadius.lg, style: .continuous))
    }
}

// MARK: - Figure: big light number + small muted unit

/// `RDLFigure("84.2", unit: "kW")`, `RDLFigure("4,82,190", currency: "₹", unit: ".36")`,
/// `RDLFigure("321", lead: "0.00", unit: "BNB")` (lead = de-emphasised leading zeros).
public struct RDLFigure: View {
    let value: String
    var currency: String?
    var lead: String?
    var unit: String?
    var size: CGFloat
    var dotMatrix: Bool

    public init(_ value: String, currency: String? = nil, lead: String? = nil, unit: String? = nil, size: CGFloat = RDLType.display.size, dotMatrix: Bool = false) {
        self.value = value
        self.currency = currency
        self.lead = lead
        self.unit = unit
        self.size = size
        self.dotMatrix = dotMatrix
    }

    public var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: size * 0.06) {
            if let currency {
                Text(currency).font(.system(size: size * RDLType.unitScale)).foregroundStyle(.secondary)
                    .alignmentGuide(.firstTextBaseline) { d in d[.firstTextBaseline] + size * 0.45 }
            }
            if dotMatrix {
                RDLDotMatrixText(value, dot: max(2, size / 14))
            } else {
                (Text(lead ?? "").foregroundColor(Color.secondary.opacity(0.6)) + Text(value))
                    .font(RDLTextStyle(size: size, lineHeight: size, weight: .light, tracking: 0).font)
                    .tracking(-size * 0.03)
                    .monospacedDigit()
                    .contentTransition(.numericText())
            }
            if let unit {
                Text(unit).font(.system(size: size * RDLType.unitScale)).foregroundStyle(.secondary)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Dot-matrix numerals (no font dependency)

/// Renders digits, '.', '%', '+', '-' as a 5×7 LED dot matrix — the board's signature numeral.
public struct RDLDotMatrixText: View {
    let text: String
    var dot: CGFloat
    var gap: CGFloat { dot * 0.45 }

    public init(_ text: String, dot: CGFloat = 4) {
        self.text = text
        self.dot = dot
    }

    private static let glyphs: [Character: [String]] = [
        "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
        "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
        "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
        "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
        "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
        "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
        "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
        "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
        "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
        "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
        ".": ["0", "0", "0", "0", "0", "0", "1"],
        "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
        "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
        "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
        " ": ["00", "00", "00", "00", "00", "00", "00"],
    ]

    public var body: some View {
        let chars = Array(text)
        let cols = chars.map { (Self.glyphs[$0] ?? Self.glyphs[" "]!)[0].count }
        let step = dot + gap
        let width = CGFloat(cols.reduce(0, +)) * step + CGFloat(max(chars.count - 1, 0)) * step
        Canvas { ctx, _ in
            var x: CGFloat = 0
            for (i, ch) in chars.enumerated() {
                let rows = Self.glyphs[ch] ?? Self.glyphs[" "]!
                for (r, row) in rows.enumerated() {
                    for (c, bit) in row.enumerated() where bit == "1" {
                        let rect = CGRect(x: x + CGFloat(c) * step, y: CGFloat(r) * step, width: dot, height: dot)
                        ctx.fill(Path(roundedRect: rect, cornerRadius: dot * 0.2), with: .foreground)
                    }
                }
                x += CGFloat(cols[i]) * step + step
            }
        }
        .frame(width: width, height: 7 * step)
        .accessibilityLabel(text)
    }
}

// MARK: - Orbs, action row, slide to confirm

public enum RDLOrbKind { case glass, solid, white, accent, outline }

public struct RDLOrb: View {
    @Environment(\.rdlAccent) private var accent
    let systemName: String
    var kind: RDLOrbKind = .glass
    var size: CGFloat = RDLSize.iconButton
    let action: () -> Void

    public init(_ systemName: String, kind: RDLOrbKind = .glass, size: CGFloat = RDLSize.iconButton, action: @escaping () -> Void) {
        self.systemName = systemName
        self.kind = kind
        self.size = size
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: size * 0.38, weight: .medium))
                .frame(width: size, height: size)
                .foregroundStyle(fg)
                .background { bg }
                .clipShape(Circle())
                .overlay(Circle().strokeBorder(kind == .outline ? RDLColor.borderStrong : (kind == .glass ? Color.white.opacity(0.6) : .clear), lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    @ViewBuilder private var bg: some View {
        switch kind {
        case .glass: Circle().fill(.ultraThinMaterial)
        case .solid: Circle().fill(RDLColor.fillControlStrong)
        case .white: Circle().fill(Color.white)
        case .accent: Circle().fill(accent.accent)
        case .outline: Circle().fill(Color.clear)
        }
    }

    private var fg: Color {
        switch kind {
        case .solid: RDLColor.textOnStrong
        case .white: .black
        case .accent: accent.onAccent
        default: RDLColor.textPrimary
        }
    }
}

/// ← [ Primary action ] →   — the board's most common bottom action layout.
public struct RDLActionRow: View {
    let title: String
    let leading: String
    let trailing: String
    var onLeading: () -> Void = {}
    var onPrimary: () -> Void = {}
    var onTrailing: () -> Void = {}

    public init(_ title: String, leading: String, trailing: String, onLeading: @escaping () -> Void = {}, onPrimary: @escaping () -> Void = {}, onTrailing: @escaping () -> Void = {}) {
        self.title = title
        self.leading = leading
        self.trailing = trailing
        self.onLeading = onLeading
        self.onPrimary = onPrimary
        self.onTrailing = onTrailing
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s2) {
            RDLOrb(leading, size: RDLSize.controlLg, action: onLeading)
            Button(title, action: onPrimary).buttonStyle(.rdl(.primary))
            RDLOrb(trailing, size: RDLSize.controlLg, action: onTrailing)
        }
    }
}

/// Slide-to-confirm pill for money movement (buy, convert, pay).
public struct RDLSlideToConfirm: View {
    @Environment(\.rdlAccent) private var accent
    let title: String
    let onConfirm: () -> Void
    @State private var offset: CGFloat = 0
    @State private var done = false

    public init(_ title: String, onConfirm: @escaping () -> Void) {
        self.title = title
        self.onConfirm = onConfirm
    }

    public var body: some View {
        GeometryReader { geo in
            let knob: CGFloat = 52
            let maxX = geo.size.width - knob - 12
            ZStack(alignment: .leading) {
                Capsule().fill(.ultraThinMaterial).overlay(Capsule().strokeBorder(Color.white.opacity(0.25)))
                HStack {
                    Spacer()
                    Text(done ? "Confirmed" : title).rdlType(RDLType.bodyStrong)
                    Spacer()
                    Text("›››").opacity(0.45).padding(.trailing, 18)
                }
                .opacity(1 - Double(offset / max(maxX, 1)) * 0.8)
                Circle().fill(accent.accent)
                    .overlay(Image(systemName: done ? "checkmark" : "arrow.right").foregroundStyle(accent.onAccent))
                    .frame(width: knob, height: knob)
                    .offset(x: 6 + offset)
                    .gesture(DragGesture()
                        .onChanged { g in if !done { offset = min(max(0, g.translation.width), maxX) } }
                        .onEnded { _ in
                            if offset > maxX * 0.85 {
                                withAnimation(RDLMotion.spring) { offset = maxX; done = true }
                                onConfirm()
                            } else {
                                withAnimation(RDLMotion.spring) { offset = 0 }
                            }
                        })
            }
        }
        .frame(height: 64)
        .accessibilityElement()
        .accessibilityLabel(title)
        .accessibilityAddTraits(.isButton)
        .accessibilityAction { done = true; onConfirm() }
    }
}

// MARK: - Status dot, key/value

public enum RDLStatusKind { case ok, warn, crit, info, idle }

public struct RDLStatus: View {
    let title: String
    var kind: RDLStatusKind = .ok

    public init(_ title: String, kind: RDLStatusKind = .ok) {
        self.title = title
        self.kind = kind
    }

    public var body: some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 7, height: 7)
                .background(Circle().fill(color.opacity(0.22)).frame(width: 13, height: 13))
            Text(title).rdlType(RDLType.label)
        }
    }

    private var color: Color {
        switch kind {
        case .ok: RDLPalette.signal400
        case .warn: RDLPalette.amber500
        case .crit: RDLPalette.red500
        case .info: RDLPalette.electric400
        case .idle: RDLPalette.stone400
        }
    }
}

public enum RDLKeyValueLayout { case stacked, row, leader }

public struct RDLKeyValue: View {
    let key: String
    let value: String
    var layout: RDLKeyValueLayout = .stacked

    public init(_ key: String, _ value: String, layout: RDLKeyValueLayout = .stacked) {
        self.key = key
        self.value = value
        self.layout = layout
    }

    public var body: some View {
        switch layout {
        case .stacked:
            VStack(alignment: .leading, spacing: 2) {
                Text(key).rdlType(RDLType.caption).foregroundStyle(.secondary)
                Text(value).rdlType(RDLType.bodyStrong).monospacedDigit()
            }
        case .row, .leader:
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(key).rdlType(RDLType.caption).foregroundStyle(.secondary)
                if layout == .leader {
                    Line().stroke(style: StrokeStyle(lineWidth: 1, dash: [1, 3])).foregroundStyle(RDLColor.tick).frame(height: 1)
                } else {
                    Spacer()
                }
                Text(value).rdlType(RDLType.bodyStrong).monospacedDigit()
            }
        }
    }

    private struct Line: Shape {
        func path(in rect: CGRect) -> Path { Path { p in p.move(to: CGPoint(x: 0, y: rect.midY)); p.addLine(to: CGPoint(x: rect.maxX, y: rect.midY)) } }
    }
}

// MARK: - Instruments

/// Tick ruler with an accent needle. `value` 0...1.
public struct RDLTickRuler: View {
    @Environment(\.rdlAccent) private var accent
    var value: Double
    var minor: CGFloat = 6
    var majorEvery = 5

    public init(value: Double, minor: CGFloat = 6, majorEvery: Int = 5) {
        self.value = value
        self.minor = minor
        self.majorEvery = majorEvery
    }

    public var body: some View {
        Canvas { ctx, size in
            var i = 0
            var x: CGFloat = 0
            while x <= size.width {
                let h: CGFloat = i % majorEvery == 0 ? 18 : 10
                ctx.fill(Path(CGRect(x: x, y: size.height - h, width: 1, height: h)), with: .color(RDLColor.tick))
                x += minor
                i += 1
            }
            let nx = size.width * min(max(value, 0), 1)
            ctx.fill(Path(roundedRect: CGRect(x: nx - 1, y: 0, width: 2, height: size.height), cornerRadius: 1), with: .color(accent.accent))
        }
        .frame(height: 28)
        .animation(RDLMotion.spring, value: value)
        .accessibilityValue("\(Int(value * 100)) percent")
    }
}

/// 2pt progress line with label and value — used for sensor/metric rows.
public struct RDLMeter: View {
    @Environment(\.rdlAccent) private var accent
    let label: String
    let value: String
    let progress: Double
    var color: Color?

    public init(_ label: String, value: String, progress: Double, color: Color? = nil) {
        self.label = label
        self.value = value
        self.progress = progress
        self.color = color
    }

    public var body: some View {
        VStack(spacing: 6) {
            HStack { Text(label).foregroundStyle(.secondary); Spacer(); Text(value).monospacedDigit() }
                .rdlType(RDLType.label)
            GeometryReader { g in
                Capsule().fill(RDLColor.chartTrack)
                    .overlay(alignment: .leading) { Capsule().fill(color ?? accent.accent).frame(width: g.size.width * min(max(progress, 0), 1)) }
            }
            .frame(height: 2)
        }
    }
}

/// Month grid of instalments (SIP / EMI / loan history).
public enum RDLInstalment { case paid, missed, current, upcoming }

public struct RDLMonthGrid: View {
    @Environment(\.rdlAccent) private var accent
    let months: [(label: String, state: RDLInstalment)]

    public init(_ months: [(label: String, state: RDLInstalment)]) { self.months = months }

    public var body: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 6), count: 6), spacing: 6) {
            ForEach(Array(months.enumerated()), id: \.offset) { _, m in
                VStack(spacing: 8) {
                    Text(m.label).rdlType(RDLType.caption).foregroundStyle(m.state == .current ? Color.primary : Color.secondary)
                    marker(m.state)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(RDLColor.fillControl, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).strokeBorder(m.state == .current ? accent.accent : .clear, lineWidth: 1.5))
                .accessibilityElement(children: .ignore)
                .accessibilityLabel("\(m.label): \(String(describing: m.state))")
            }
        }
    }

    @ViewBuilder private func marker(_ s: RDLInstalment) -> some View {
        switch s {
        case .paid: Image(systemName: "checkmark").font(.system(size: 10, weight: .bold)).foregroundStyle(accent.onAccent).frame(width: 20, height: 20).background(accent.accent, in: Circle())
        case .missed: Image(systemName: "xmark").font(.system(size: 9, weight: .bold)).foregroundStyle(.white).frame(width: 20, height: 20).background(RDLPalette.stone300, in: Circle())
        case .current, .upcoming: Circle().strokeBorder(style: StrokeStyle(lineWidth: 1, dash: [2, 2])).foregroundStyle(RDLColor.borderStrong).frame(width: 20, height: 20)
        }
    }
}

/// Bottom glass dock (replaces the v1 dark tab bar in glass style).
public struct RDLDock: View {
    @Environment(\.rdlAccent) private var accent
    let items: [RDLTabItem]
    @Binding var selection: String
    var accentActive = true
    @Namespace private var ns

    public init(_ items: [RDLTabItem], selection: Binding<String>, accentActive: Bool = true) {
        self.items = items
        self._selection = selection
        self.accentActive = accentActive
    }

    public var body: some View {
        HStack(spacing: 6) {
            ForEach(items) { item in
                let active = item.id == selection
                Image(systemName: item.systemImage)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundStyle(active ? (accentActive ? accent.onAccent : RDLColor.textOnStrong) : RDLColor.textPrimary.opacity(0.7))
                    .frame(width: 52, height: 52)
                    .background {
                        if active { Circle().fill(accentActive ? accent.accent : RDLColor.fillControlStrong).matchedGeometryEffect(id: "dock", in: ns) }
                    }
                    .contentShape(Circle())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = item.id } }
                    .accessibilityLabel(item.id)
                    .accessibilityAddTraits(active ? .isSelected : [])
            }
        }
        .padding(6)
        .background(.ultraThinMaterial, in: Capsule())
        .overlay(Capsule().strokeBorder(Color.white.opacity(0.6), lineWidth: 1))
        .shadow(color: .black.opacity(0.12), radius: 24, y: 14)
    }
}
