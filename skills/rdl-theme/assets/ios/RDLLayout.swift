// RDL Theme · v3 layout primitives and structural components.
// Requires RDLTokens.swift (generated), RDLComponents.swift and RDLGlassComponents.swift. iOS 17+.
//
// Layout recipe (references/layout.md):
//   RDLScreen(pinned: { RDLActionRow(…) }) {
//       RDLHeader(leading: …, title: "Buy gold", trailing: …)   // every item 48
//       …content…                                               // title-gap 24 after the header
//   }
// Spacing is semantic: stackTight 4 · stack 8 · cardGap 12 · stackLoose 16 · titleGap 24 · sectionGap 32.
import SwiftUI

// MARK: - Screen skeleton

/// Mobile screen: 20 margins, 8 below the status bar, header → content at `titleGap`,
/// scrolling content that keeps `bottomZone` clear, and an optional pinned zone 34 above the home indicator.
public struct RDLScreen<Content: View, Pinned: View>: View {
    let spacing: CGFloat
    let content: Content
    let pinned: Pinned

    public init(spacing: CGFloat = RDLSpace.titleGap, @ViewBuilder content: () -> Content, @ViewBuilder pinned: () -> Pinned) {
        self.spacing = spacing
        self.content = content()
        self.pinned = pinned()
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: spacing) { content }
                .padding(.horizontal, RDLSpace.mobileGutter)
                .padding(.top, RDLSpace.headerTop)
                .padding(.bottom, Pinned.self == EmptyView.self ? RDLSpace.sectionGap : RDLSpace.bottomZone)
        }
        .scrollIndicators(.hidden)
        .overlay(alignment: .bottom) {
            pinned
                .padding(.horizontal, RDLSpace.mobileGutter)
                .padding(.bottom, RDLSpace.s2) // safe area already adds the 34 home-indicator inset
        }
    }
}

public extension RDLScreen where Pinned == EmptyView {
    init(spacing: CGFloat = RDLSpace.titleGap, @ViewBuilder content: () -> Content) {
        self.init(spacing: spacing, content: content, pinned: { EmptyView() })
    }
}

/// Header row: leading · centred title · trailing. Every control in it is `headerHeight` (48).
public struct RDLHeader<Leading: View, Trailing: View>: View {
    let title: String?
    let leading: Leading
    let trailing: Trailing

    public init(title: String? = nil, @ViewBuilder leading: () -> Leading, @ViewBuilder trailing: () -> Trailing) {
        self.title = title
        self.leading = leading()
        self.trailing = trailing()
    }

    public var body: some View {
        ZStack {
            if let title { Text(title).rdlType(RDLType.title) }
            HStack(spacing: RDLSpace.stack) {
                leading
                Spacer(minLength: RDLSpace.stack)
                HStack(spacing: RDLSpace.stack) { trailing }
            }
        }
        .frame(height: RDLSpace.headerHeight)
    }
}

// MARK: - Metric tile (corner-anchored)

/// The canonical RDL card: label top-left · action top-right · instrument middle · figure bottom-left · context bottom-right.
public struct RDLMetricTile<Action: View, Viz: View, Figure: View, Context: View>: View {
    let label: String
    let action: Action
    let viz: Viz
    let figure: Figure
    let context: Context
    var minHeight: CGFloat = 160

    public init(_ label: String, minHeight: CGFloat = 160,
                @ViewBuilder action: () -> Action = { EmptyView() },
                @ViewBuilder viz: () -> Viz = { EmptyView() },
                @ViewBuilder figure: () -> Figure,
                @ViewBuilder context: () -> Context = { EmptyView() }) {
        self.label = label
        self.minHeight = minHeight
        self.action = action()
        self.viz = viz()
        self.figure = figure()
        self.context = context()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: RDLSpace.s3) {
            HStack(alignment: .center, spacing: RDLSpace.stackLoose) {
                Text(label).rdlType(RDLType.meta).foregroundStyle(RDLColor.textSecondary)
                Spacer(minLength: 0)
                action
            }
            Spacer(minLength: 0)
            viz.frame(maxWidth: .infinity, alignment: .leading)
            Spacer(minLength: 0)
            HStack(alignment: .lastTextBaseline, spacing: RDLSpace.stackLoose) {
                figure
                Spacer(minLength: 0)
                context
            }
        }
        .frame(maxWidth: .infinity, minHeight: minHeight, alignment: .topLeading)
    }
}

// MARK: - Status pill (escalations only)

/// Soft tint + same-hue dot + same-hue text. Use `RDLStatus` (dot + word) for ordinary state.
public struct RDLStatusPill: View {
    let text: String
    let kind: RDLStatusKind

    public init(_ text: String, kind: RDLStatusKind = .crit) {
        self.text = text
        self.kind = kind
    }

    private var colors: (fg: Color, bg: Color) {
        switch kind {
        case .ok: (RDLColor.successText, RDLColor.successSoft)
        case .warn: (RDLColor.warningText, RDLColor.warningSoft)
        case .crit: (RDLColor.dangerText, RDLColor.dangerSoft)
        case .info: (RDLColor.infoText, RDLColor.infoSoft)
        case .idle: (RDLColor.textSecondary, RDLColor.fillControl)
        }
    }

    public var body: some View {
        HStack(spacing: RDLSpace.s1_5) {
            Circle().fill(colors.fg).frame(width: 6, height: 6)
            Text(text).font(.system(size: 12, weight: .semibold))
        }
        .foregroundStyle(colors.fg)
        .padding(.horizontal, RDLSpace.s2)
        .frame(height: RDLSize.tag)
        .background(colors.bg, in: Capsule())
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Section header

/// "Title ………… See all" — title 17/500, action is a 32 chip.
public struct RDLSectionHeader: View {
    let title: String
    let detail: String?
    let action: String?
    var onAction: () -> Void

    public init(_ title: String, detail: String? = nil, action: String? = nil, onAction: @escaping () -> Void = {}) {
        self.title = title
        self.detail = detail
        self.action = action
        self.onAction = onAction
    }

    public var body: some View {
        HStack(alignment: .center) {
            Text(title).rdlType(RDLType.title)
            Spacer()
            if let detail { Text(detail).rdlType(RDLType.meta).foregroundStyle(RDLColor.textSecondary) }
            if let action {
                Button(action, action: onAction)
                    .rdlType(RDLType.meta)
                    .padding(.horizontal, RDLSpace.s3)
                    .frame(height: RDLSize.controlXs)
                    .background(RDLColor.fillControl, in: Capsule())
                    .buttonStyle(.plain)
            }
        }
    }
}

// MARK: - Title tabs

/// "Data   Records" — tabs set at the same title size; inactive tabs in tertiary.
public struct RDLTitleTabs: View {
    let tabs: [String]
    @Binding var selection: Int
    var style: RDLTextStyle = RDLType.h1

    public init(_ tabs: [String], selection: Binding<Int>, style: RDLTextStyle = RDLType.h1) {
        self.tabs = tabs
        self._selection = selection
        self.style = style
    }

    public var body: some View {
        HStack(spacing: RDLSpace.stackLoose) {
            ForEach(tabs.indices, id: \.self) { i in
                Button { withAnimation(RDLMotion.standard) { selection = i } } label: {
                    Text(tabs[i]).rdlType(style)
                        .foregroundStyle(i == selection ? RDLColor.textPrimary : RDLColor.textTertiary)
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(i == selection ? .isSelected : [])
            }
        }
    }
}

// MARK: - Field

/// Search / select / prompt field. Height 48 (`.md`), 56 (`.lg`) or 64 (`.prompt` with an inset 48 orb).
public struct RDLField<Trailing: View>: View {
    public enum Size { case md, lg, prompt }
    let icon: String?
    let placeholder: String
    @Binding var text: String
    var size: Size
    let trailing: Trailing

    public init(_ placeholder: String, text: Binding<String>, icon: String? = "magnifyingglass", size: Size = .md, @ViewBuilder trailing: () -> Trailing = { EmptyView() }) {
        self.placeholder = placeholder
        self._text = text
        self.icon = icon
        self.size = size
        self.trailing = trailing()
    }

    private var height: CGFloat {
        switch size { case .md: RDLSize.controlMd; case .lg: RDLSize.controlLg; case .prompt: RDLSize.controlXl }
    }

    public var body: some View {
        HStack(spacing: RDLSpace.stack) {
            if let icon { Image(systemName: icon).font(.system(size: 16)).foregroundStyle(RDLColor.textSecondary) }
            TextField(placeholder, text: $text).rdlType(RDLType.body)
            trailing
        }
        .padding(.leading, size == .md ? RDLSpace.s4 : RDLSpace.s5)
        .padding(.trailing, size == .prompt ? RDLSpace.s2 : RDLSpace.s4)
        .frame(height: height)
        .background(RDLColor.fillControl, in: Capsule())
    }
}

// MARK: - Bottom sheet

public extension View {
    /// Bottom-sheet surface: top radius 48, 36×4 grabber 8 from the top, padding 20.
    func rdlSheet() -> some View {
        self
            .padding(.horizontal, RDLSpace.cardPadding)
            .padding(.top, RDLSpace.s6)
            .padding(.bottom, RDLSpace.cardPadding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                UnevenRoundedRectangle(topLeadingRadius: RDLRadius.sheet, topTrailingRadius: RDLRadius.sheet, style: .continuous)
                    .fill(RDLColor.bgSurface)
            )
            .overlay(alignment: .top) {
                Capsule().fill(RDLColor.borderStrong).frame(width: 36, height: 4).padding(.top, RDLSpace.stack)
            }
    }
}

public extension RDLRadius {
    /// Nested radius rule: inner radius = outer − padding (minimum 8). Pills and circles are exempt.
    static func nested(outer: CGFloat, padding: CGFloat) -> CGFloat { max(sm, outer - padding) }
}

// MARK: - Skeleton

/// Loading placeholder at the final size; shimmers at 1.2s. Respects Reduce Motion.
public struct RDLSkeleton: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var phase: CGFloat = -1
    var radius: CGFloat = RDLRadius.md

    public init(radius: CGFloat = RDLRadius.md) { self.radius = radius }

    public var body: some View {
        RoundedRectangle(cornerRadius: radius, style: .continuous)
            .fill(RDLColor.fillControl)
            .overlay {
                if !reduceMotion {
                    GeometryReader { g in
                        LinearGradient(colors: [.clear, RDLColor.fillControlHover, .clear], startPoint: .leading, endPoint: .trailing)
                            .frame(width: g.size.width)
                            .offset(x: phase * g.size.width)
                    }
                    .clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
                }
            }
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.linear(duration: 1.2).repeatForever(autoreverses: false)) { phase = 1 }
            }
            .accessibilityLabel("Loading")
    }
}
