#!/usr/bin/env python3
"""Calibrate RDL tokens against real shots.

Drop Dribbble shot exports (PNG/JPG/WebP) into a folder and run:

    pip install pillow
    python3 skills/rdl-theme/scripts/extract_palette.py research/shots

It quantizes every image, pools the colours across the set (weighted by area), splits them into
neutrals (canvas / surface / ink candidates) and chromatic accents, and reports the nearest
existing token for each so you can see where tokens.json drifts from the source.
Pass --json to get machine-readable output.
"""
from __future__ import annotations

import argparse
import colorsys
import json
import math
import sys
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required: pip install pillow")

TOKENS = Path(__file__).resolve().parent.parent / "assets" / "tokens" / "tokens.json"
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def rgb_to_hex(c) -> str:
    return "#{:02X}{:02X}{:02X}".format(*c)


def _lin(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def to_lab(rgb):
    r, g, b = (_lin(v) for v in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    fx, fy, fz = f(x), f(y), f(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def delta_e(a, b) -> float:
    return math.dist(to_lab(a), to_lab(b))


def load_primitives() -> dict[str, tuple[int, int, int]]:
    data = json.loads(TOKENS.read_text())
    return {f"{fam}.{step}": hex_to_rgb(h) for fam, steps in data["primitive"].items() for step, h in steps.items()}


def quantize(path: Path, k: int) -> Counter:
    img = Image.open(path).convert("RGB")
    img.thumbnail((400, 400))
    q = img.quantize(colors=k, method=Image.Quantize.MEDIANCUT)
    palette = q.getpalette()
    counts = Counter()
    total = img.width * img.height
    for count, idx in q.getcolors():
        rgb = tuple(palette[idx * 3 : idx * 3 + 3])
        # Snap to a 4-level grid so near-identical colours pool across shots.
        snapped = tuple(min(255, round(v / 4) * 4) for v in rgb)
        counts[snapped] += count / total
    return counts


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder", type=Path)
    ap.add_argument("-k", type=int, default=16, help="colours per image (default 16)")
    ap.add_argument("--top", type=int, default=12)
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    files = sorted(p for p in args.folder.rglob("*") if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"No images found in {args.folder}")

    pooled: Counter = Counter()
    for f in files:
        pooled.update(quantize(f, args.k))
    for c in pooled:
        pooled[c] /= len(files)

    prims = load_primitives()
    neutrals, accents = [], []
    for rgb, share in pooled.most_common():
        h, l, s = colorsys.rgb_to_hls(*(v / 255 for v in rgb))
        nearest, dist = min(((n, delta_e(rgb, p)) for n, p in prims.items()), key=lambda x: x[1])
        row = {"hex": rgb_to_hex(rgb), "share": round(share * 100, 2), "hue": round(h * 360), "light": round(l * 100),
               "sat": round(s * 100), "nearest_token": nearest, "delta_e": round(dist, 1)}
        (neutrals if s < 0.12 or l < 0.08 or l > 0.97 else accents).append(row)

    result = {"images": len(files), "neutrals": neutrals[: args.top], "accents": accents[: args.top]}
    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"Analysed {len(files)} image(s)\n")
    for title, rows in (("NEUTRALS (canvas / surface / ink)", result["neutrals"]), ("ACCENTS", result["accents"])):
        print(title)
        print(f"  {'hex':8} {'area%':>6} {'L':>4} {'S':>4}  nearest token     ΔE")
        for r in rows:
            flag = "  ← drift" if r["delta_e"] > 8 else ""
            print(f"  {r['hex']:8} {r['share']:6.2f} {r['light']:4} {r['sat']:4}  {r['nearest_token']:16} {r['delta_e']:5}{flag}")
        print()
    print("ΔE < 3: identical to the eye · 3–8: close · > 8: consider updating tokens.json, then run build_tokens.mjs")


if __name__ == "__main__":
    main()
