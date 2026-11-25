"""Generate the site's icon set and social preview image.

The mark is an "F" monogram with a lime terminal cursor ("F_"), echoing the
site's terminal / versioned-release theme. Built only from rectangles so the
SVG and the raster sizes match exactly.

Run from client/:  python scripts/generate-icons.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
BG, BORDER, TEXT, MUTED, ACCENT = "#121310", "#2a2d26", "#f5f5f0", "#a6a99e", "#c4f56a"

# Glyph on a 64-unit grid: (x, y, w, h, color)
GLYPH = [
    (17, 14, 8, 36, TEXT),   # stem
    (17, 14, 26, 8, TEXT),   # top arm
    (17, 29, 19, 7, TEXT),   # middle arm
    (33, 43, 14, 7, ACCENT), # cursor
]

SVG = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14" fill="{BG}" stroke="{BORDER}" stroke-width="1.5"/>
""" + "\n".join(
    f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1" fill="{c}"/>' for x, y, w, h, c in GLYPH
) + "\n</svg>\n"


def draw_mark(size, rounded=True, scale=1.0):
    """Render the mark at `size` px. `scale` < 1 shrinks the glyph (maskable safe zone)."""
    k = 4  # supersample
    s = size * k
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    u = s / 64
    if rounded:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=14 * u, fill=BG, outline=BORDER, width=max(1, round(1.5 * u)))
    else:
        d.rectangle([0, 0, s, s], fill=BG)
    off = 32 * (1 - scale)
    for x, y, w, h, c in GLYPH:
        x0, y0 = (off + x * scale) * u, (off + y * scale) * u
        d.rounded_rectangle([x0, y0, x0 + w * scale * u, y0 + h * scale * u], radius=u * scale, fill=c)
    return img.resize((size, size), Image.LANCZOS)


def font(name, size):
    return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)


def og_image():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, 64):  # faint grid
        d.line([(x, 0), (x, H)], fill=(245, 245, 240, 10))
    for y in range(0, H, 64):
        d.line([(0, y), (W, y)], fill=(245, 245, 240, 10))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r in range(420, 0, -6):  # soft lime glow, top-right
        gd.ellipse([980 - r, -120 - r, 980 + r, -120 + r], fill=(196, 245, 106, max(0, int(14 * (1 - r / 420)))))
    img.paste(glow, (0, 0), glow)
    d = ImageDraw.Draw(img, "RGBA")
    img.paste(draw_mark(112), (80, 80), draw_mark(112))
    d.text((80, 240), "Faizan Safwan", font=font("segoeuib.ttf", 96), fill=TEXT)
    d.text((84, 366), "Full-stack engineer · SaaS & applied AI", font=font("segoeui.ttf", 40), fill=TEXT)
    d.text((84, 426), "CVeezi @ X4 Digital Labs  ·  Co-founder, Aqra Labs (Aqra POS)", font=font("segoeui.ttf", 28), fill=MUTED)
    d.rectangle([84, 498, 84 + 96, 502], fill=ACCENT)
    d.text((84, 530), "faizansafwan.github.io/my-personal-portfolio", font=font("consola.ttf", 26), fill=ACCENT)
    pill = font("consola.ttf", 24)
    d.rounded_rectangle([W - 250, 96, W - 80, 144], radius=24, outline=BORDER, width=2)
    d.text((W - 230, 106), "v2026.5", font=pill, fill=MUTED)
    img.save(PUBLIC / "og-image.png", optimize=True)


def og_motion():
    """Social preview for /motion/: title + the real reel frame (the featured Jelly set)."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, 64):
        d.line([(x, 0), (x, H)], fill=(245, 245, 240, 10))
    for y in range(0, H, 64):
        d.line([(0, y), (W, y)], fill=(245, 245, 240, 10))
    img.paste(draw_mark(72), (72, 64), draw_mark(72))
    d.text((168, 70), "MOTION LAB", font=font("consola.ttf", 26), fill=ACCENT)
    d.text((168, 104), "Faizan Safwan", font=font("segoeui.ttf", 24), fill=MUTED)
    d.text((72, 168), "Motion that ships.", font=font("segoeuib.ttf", 76), fill=TEXT)
    d.text((76, 268), "Jelly set: Lottie UI animations at 18-21 KB  ·  motion graphics",
           font=font("segoeui.ttf", 28), fill=MUTED)
    # Program-monitor frame around the reel still
    reel = Image.open(PUBLIC / "motion" / "posters" / "jelly-reel.webp").convert("RGB")
    rw = W - 144
    reel = reel.resize((rw, round(reel.height * rw / reel.width)), Image.LANCZOS)
    top = 350
    d.rounded_rectangle([70, top - 2, 70 + rw + 3, top + reel.height + 40], radius=12, outline=BORDER, width=2)
    img.paste(reel, (72, top))
    bar_y = top + reel.height + 18
    d.line([(150, bar_y), (W - 160, bar_y)], fill=(245, 245, 240, 40), width=6)
    px = 150 + int((W - 310) * 0.86)
    d.line([(px, bar_y - 10), (px, bar_y + 10)], fill=ACCENT, width=3)
    d.text((92, bar_y - 12), "PGM", font=font("consola.ttf", 20), fill=MUTED)
    d.text((W - 150, bar_y - 12), "60 fps", font=font("consola.ttf", 20), fill=ACCENT)
    img.save(PUBLIC / "og-motion.png", optimize=True)


if __name__ == "__main__":
    (PUBLIC / "favicon.svg").write_text(SVG, encoding="utf-8")
    draw_mark(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    draw_mark(180, rounded=False).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
    draw_mark(192).save(PUBLIC / "icon-192.png", optimize=True)
    draw_mark(512).save(PUBLIC / "icon-512.png", optimize=True)
    draw_mark(512, rounded=False, scale=0.72).convert("RGB").save(PUBLIC / "icon-maskable-512.png", optimize=True)
    og_image()
    og_motion()
    print("icons + og-image written to", PUBLIC)
