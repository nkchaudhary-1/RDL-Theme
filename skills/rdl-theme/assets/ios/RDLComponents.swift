// RDL Theme — SwiftUI base components.
// Depends on RDLTokens.swift (generated). Drop both files into your app target.
// Every component reads semantic roles (RDLColor) and the injected accent (`.rdlAccent(...)`),
// so light/dark and accent-pack switching need no per-screen code.

import SwiftUI

// MARK: - Surfaces

public enum RDLCardTone { case surface, muted, hero, accent }

public struct RDLCard: ViewModifier {
    @Environment(\.rdlAccent) private var accent
    var tone: RDLCardTone = .surface
    var radius: CGFloat = RDLRadius.xl
    var padding: CGFloat = RDLSpace.cardPadding

    public func body(content: Content) -> some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundStyle(foreground)
            .background(background, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
    }

    private var background: Color {
        switch tone {
        case .surface: RDLColor.bgSurface
        case .muted: RDLColor.bgSurfaceMuted
        case .hero: RDLColor.bgHero
        case .accent: accent.accent
        }
    }

    private var foreground: Color {
        switch tone {
        case .surface, .muted: RDLColor.textPrimary
        case .hero: RDLColor.textOnHero
        case .accent: accent.onAccent
        }
    }
}

public extension View {
    /// White card on the gray canvas — RDL separates by fill contrast, not borders or heavy shadows.
    func rdlCard(_ tone: RDLCardTone = .surface, radius: CGFloat = RDLRadius.xl, padding: CGFloat = RDLSpace.cardPadding) -> some View {
        modifier(RDLCard(tone: tone, radius: radius, padding: padding))
    }
}

// MARK: - Buttons

public enum RDLButtonKind { case primary, accent, secondary, ghost }

/// Pill buttons. Primary = ink fill, Accent = brand accent, Secondary = control fill.
public struct RDLButtonStyle: ButtonStyle {
    @Environment(\.rdlAccent) private var accent
    @Environment(\.isEnabled) private var isEnabled
    var kind: RDLButtonKind = .primary
    var height: CGFloat = RDLSize.controlLg

    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .rdlType(RDLType.bodyStrong)
            .frame(maxWidth: .infinity, minHeight: height)
            .padding(.horizontal, RDLSpace.s6)
            .foregroundStyle(fg)
            .background(bg, in: Capsule())
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(isEnabled ? 1 : 0.4)
            .animation(RDLMotion.spring, value: configuration.isPressed)
    }

    private var bg: Color {
        switch kind {
        case .primary: RDLColor.fillControlStrong
        case .accent: accent.accent
        case .secondary: RDLColor.fillControl
        case .ghost: .clear
        }
    }

    private var fg: Color {
        switch kind {
        case .primary: RDLColor.textOnStrong
        case .accent: accent.onAccent
        case .secondary, .ghost: RDLColor.textPrimary
        }
    }
}

public extension ButtonStyle where Self == RDLButtonStyle {
    static func rdl(_ kind: RDLButtonKind = .primary, height: CGFloat = RDLSize.controlLg) -> RDLButtonStyle {
        RDLButtonStyle(kind: kind, height: height)
    }
}

/// Circular icon button (back, bell, more). 44pt, control fill.
public struct RDLIconButton: View {
    let systemName: String
    var onHero = false
    let action: () -> Void

    public init(_ systemName: String, onHero: Bool = false, action: @escaping () -> Void) {
        self.systemName = systemName
        self.onHero = onHero
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 17, weight: .medium))
                .frame(width: RDLSize.iconButton, height: RDLSize.iconButton)
                .foregroundStyle(onHero ? RDLColor.textOnHero : RDLColor.textPrimary)
                .background(onHero ? RDLColor.bgHeroRaised : RDLColor.fillControl, in: Circle())
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Money / big numbers

/// "$24,560.<muted>00</muted>" — big medium-weight figure with de-emphasised decimals.
public struct RDLAmount: View {
    let value: Decimal
    var currency = "USD"
    var style: RDLTextStyle = RDLType.display
    var mutedColor: Color = RDLColor.textSecondary

    public init(_ value: Decimal, currency: String = "USD", style: RDLTextStyle = RDLType.display, mutedColor: Color = RDLColor.textSecondary) {
        self.value = value
        self.currency = currency
        self.style = style
        self.mutedColor = mutedColor
    }

    public var body: some View {
        let formatted = value.formatted(.currency(code: currency).precision(.fractionLength(2)))
        let parts = formatted.split(separator: Locale.current.decimalSeparator?.first ?? ".", maxSplits: 1)
        let decimals = parts.count > 1 ? "\(Locale.current.decimalSeparator ?? ".")\(parts[1])" : ""
        return (Text(String(parts.first ?? ""))
            + Text(decimals).font(.system(size: style.size * 0.55, weight: style.weight)).foregroundColor(mutedColor))
            .rdlType(style)
            .monospacedDigit()
            .contentTransition(.numericText())
    }
}

/// Small pill showing a delta: ↑ 12.4% (success) / ↓ 3.1% (danger).
public struct RDLDeltaPill: View {
    let percent: Double
    public init(_ percent: Double) { self.percent = percent }

    public var body: some View {
        let up = percent >= 0
        Label(String(format: "%.1f%%", abs(percent)), systemImage: up ? "arrow.up.right" : "arrow.down.right")
            .rdlType(RDLType.caption)
            .padding(.horizontal, RDLSpace.s2)
            .frame(height: 24)
            .foregroundStyle(up ? RDLColor.successText : RDLColor.dangerText)
            .background(up ? RDLColor.successSoft : RDLColor.dangerSoft, in: Capsule())
    }
}

// MARK: - Segmented pill tabs (Week / Month / Year)

public struct RDLSegmented<T: Hashable>: View {
    let options: [T]
    let title: (T) -> String
    @Binding var selection: T
    @Namespace private var ns

    public init(_ options: [T], selection: Binding<T>, title: @escaping (T) -> String) {
        self.options = options
        self._selection = selection
        self.title = title
    }

    public var body: some View {
        HStack(spacing: 4) {
            ForEach(options, id: \.self) { option in
                let active = option == selection
                Text(title(option))
                    .rdlType(RDLType.label)
                    .foregroundStyle(active ? RDLColor.textOnStrong : RDLColor.textSecondary)
                    .frame(maxWidth: .infinity, minHeight: RDLSize.controlSm)
                    .background {
                        if active { Capsule().fill(RDLColor.fillControlStrong).matchedGeometryEffect(id: "pill", in: ns) }
                    }
                    .contentShape(Capsule())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = option } }
            }
        }
        .padding(4)
        .background(RDLColor.fillControl, in: Capsule())
    }
}

// MARK: - Bar chart with highlighted bar + hatched history

public struct RDLBarDatum: Identifiable {
    public let id = UUID()
    public let label: String
    public let value: Double
    public init(_ label: String, _ value: Double) { self.label = label; self.value = value }
}

public struct RDLBarChart: View {
    @Environment(\.rdlAccent) private var accent
    let data: [RDLBarDatum]
    var highlighted: Int?
    var height: CGFloat = 160
    @State private var appeared = false

    public init(_ data: [RDLBarDatum], highlighted: Int? = nil, height: CGFloat = 160) {
        self.data = data
        self.highlighted = highlighted
        self.height = height
    }

    public var body: some View {
        let maxV = max(data.map(\.value).max() ?? 1, 0.0001)
        HStack(alignment: .bottom, spacing: 8) {
            ForEach(Array(data.enumerated()), id: \.element.id) { i, d in
                VStack(spacing: 8) {
                    ZStack(alignment: .bottom) {
                        Capsule().fill(RDLColor.chartTrack)
                        Group {
                            if i == highlighted {
                                Capsule().fill(accent.accent)
                            } else {
                                Capsule().fill(RDLColor.chartMuted)
                                    .overlay(RDLHatch().stroke(RDLColor.chartHatch, lineWidth: 1).clipShape(Capsule()))
                            }
                        }
                        .frame(height: appeared ? height * d.value / maxV : 0)
                        .animation(RDLMotion.spring.delay(Double(i) * RDLMotion.stagger), value: appeared)
                    }
                    .frame(height: height)
                    Text(d.label)
                        .rdlType(RDLType.caption)
                        .foregroundStyle(i == highlighted ? RDLColor.textPrimary : RDLColor.textTertiary)
                }
            }
        }
        .onAppear { appeared = true }
        .accessibilityElement(children: .combine)
    }
}

/// 45° diagonal hatch — the RDL signature for "past / projected / inactive" data.
public struct RDLHatch: Shape {
    var spacing: CGFloat = 6
    public func path(in rect: CGRect) -> Path {
        var p = Path()
        var x = -rect.height
        while x < rect.width {
            p.move(to: CGPoint(x: x, y: rect.maxY))
            p.addLine(to: CGPoint(x: x + rect.height, y: rect.minY))
            x += spacing
        }
        return p
    }
}

// MARK: - Semi-circle gauge (credit score, goals, portfolio health)

public struct RDLGauge: View {
    @Environment(\.rdlAccent) private var accent
    let progress: Double // 0...1
    var lineWidth: CGFloat = 14

    public init(progress: Double, lineWidth: CGFloat = 14) {
        self.progress = progress
        self.lineWidth = lineWidth
    }

    public var body: some View {
        // Top half of a circle whose centre sits on the bottom edge of a 2:1 frame.
        GeometryReader { geo in
            let d = geo.size.width - lineWidth
            ZStack {
                Circle().trim(from: 0.5, to: 1)
                    .stroke(RDLColor.chartTrack, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                Circle().trim(from: 0.5, to: 0.5 + 0.5 * min(max(progress, 0), 1))
                    .stroke(accent.accent, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                    .animation(RDLMotion.spring, value: progress)
            }
            .frame(width: d, height: d)
            .position(x: geo.size.width / 2, y: geo.size.height)
        }
        .aspectRatio(2, contentMode: .fit)
    }
}

// MARK: - List row (transactions, activity, holdings)

public struct RDLListRow<Leading: View>: View {
    let title: String
    let subtitle: String
    let trailing: String
    var trailingSub: String?
    var trailingPositive: Bool?
    @ViewBuilder let leading: () -> Leading

    public init(title: String, subtitle: String, trailing: String, trailingSub: String? = nil, trailingPositive: Bool? = nil, @ViewBuilder leading: @escaping () -> Leading) {
        self.title = title
        self.subtitle = subtitle
        self.trailing = trailing
        self.trailingSub = trailingSub
        self.trailingPositive = trailingPositive
        self.leading = leading
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s3) {
            leading()
                .frame(width: RDLSize.avatarMd, height: RDLSize.avatarMd)
                .background(RDLColor.fillControl, in: Circle())
            VStack(alignment: .leading, spacing: 2) {
                Text(title).rdlType(RDLType.bodyStrong).foregroundStyle(RDLColor.textPrimary)
                Text(subtitle).rdlType(RDLType.caption).foregroundStyle(RDLColor.textSecondary)
            }
            Spacer(minLength: RDLSpace.s2)
            VStack(alignment: .trailing, spacing: 2) {
                Text(trailing).rdlType(RDLType.bodyStrong).monospacedDigit()
                    .foregroundStyle(trailingPositive == true ? RDLColor.successText : RDLColor.textPrimary)
                if let trailingSub {
                    Text(trailingSub).rdlType(RDLType.caption).foregroundStyle(RDLColor.textSecondary)
                }
            }
        }
        .padding(.vertical, RDLSpace.s2)
    }
}

// MARK: - Floating tab bar

public struct RDLTabItem: Identifiable, Hashable {
    public let id: String
    public let systemImage: String
    public init(_ id: String, systemImage: String) { self.id = id; self.systemImage = systemImage }
}

/// Dark floating capsule; active item sits in an accent circle. Overlay at the bottom of a ZStack.
public struct RDLFloatingTabBar: View {
    @Environment(\.rdlAccent) private var accent
    let items: [RDLTabItem]
    @Binding var selection: String
    @Namespace private var ns

    public init(_ items: [RDLTabItem], selection: Binding<String>) {
        self.items = items
        self._selection = selection
    }

    public var body: some View {
        HStack(spacing: 0) {
            ForEach(items) { item in
                let active = item.id == selection
                Image(systemName: item.systemImage)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundStyle(active ? accent.onAccent : RDLColor.textOnHeroMuted)
                    .frame(width: 48, height: 48)
                    .background {
                        if active { Circle().fill(accent.accent).matchedGeometryEffect(id: "tab", in: ns) }
                    }
                    .frame(maxWidth: .infinity)
                    .contentShape(Rectangle())
                    .onTapGesture { withAnimation(RDLMotion.spring) { selection = item.id } }
                    .accessibilityLabel(item.id)
                    .accessibilityAddTraits(active ? .isSelected : [])
            }
        }
        .padding(8)
        .frame(height: RDLSize.tabBar + 8)
        .background(RDLColor.bgHero, in: Capsule())
        .shadow(color: .black.opacity(0.24), radius: 20, y: 16)
        .padding(.horizontal, RDLSpace.mobileGutter)
    }
}

// MARK: - Chip

public struct RDLChip: View {
    @Environment(\.rdlAccent) private var accent
    let title: String
    var selected = false

    public init(_ title: String, selected: Bool = false) {
        self.title = title
        self.selected = selected
    }

    public var body: some View {
        Text(title)
            .rdlType(RDLType.label)
            .padding(.horizontal, RDLSpace.s4)
            .frame(height: RDLSize.controlSm)
            .foregroundStyle(selected ? RDLColor.textOnStrong : RDLColor.textPrimary)
            .background(selected ? RDLColor.fillControlStrong : RDLColor.fillControl, in: Capsule())
    }
}
