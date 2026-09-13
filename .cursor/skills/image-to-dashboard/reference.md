# Image → Dashboard reference

Read this when extracting tokens or choosing how to reconstruct type.

## Colour sampling

1. Read the reference image with the Read tool (vision).
2. Name roles: page, card, raised, inset, text, text-soft, muted, faint, accent, LED, track, success/warn if present.
3. Write hex in `DESIGN.md` **before** composing UI.
4. Studio / cyclorama backgrounds are gradients — record top, mid, and bottom stops, not a single flat fill.
5. Accent is shared across themes unless the source uses two accents.

## Type matching

| What you see | Do this |
|--------------|---------|
| Circular-dot LED / airport board | Reconstruct a 5×7 circular-dot renderer. Do not use Inter. Doto (Google Fonts) is a fallback only for long mixed-case sentences if the renderer lacks glyphs. |
| SF / Inter-like geometric | Inter 300–800 |
| True mono / code | The closest mono already in the source (IBM Plex Mono, JetBrains Mono, etc.) |
| Serif editorial | The closest webfont; document the substitute |
| Pixel / 8-bit | Pixel face or bitmap renderer — not a rounded geometric sans |

Reconstruction beats a “close enough” UI font. Brand titles, tile labels, and metrics must use the matched or reconstructed face.

## Chrome vs tile text

If the reference puts brand/footer on a studio background and widgets on opposite-luminance tiles, use a separate `--*-chrome` token. Tile text and chrome text must not share one colour or one theme will fail.

On equal-tile boards, keep metric labels short or scale the dot face down — 5×7 “MEMORY” overflows a ~360px tile at display sizes.

## Theme pairing

The **default** `data-theme` is the reference (often dark tiles). Always also ship the opposite:

- Keep accent, radius, type, grid, and widget inventory identical.
- Flip page/card/text luminance and shadow polarity.
- If the reference is already dark-on-light (black tiles on a cream studio), default is that look; light mode inverts tiles to cream/ink while preserving orange LEDs and the same layout.

## Layout patterns seen in the wild

| Pattern | Notes |
|---------|--------|
| Bento / collage | Unequal cells; name CSS grid areas after widgets |
| Equal tile grid | Same card size, numbered tiles, header + footer chrome (Deerflow) |
| Soft studio | Large diffuse ground shadow, warm cyclorama gradient, floating matte tiles |
| Neumorph | Outer + inset dual shadows; polarity flips in light mode |

## HTML layout document

`DESIGN.md` § HTML layout and `design.html` § Layout must agree:

- Header regions (brand, status, theme chrome)
- Board: column count, row count, gap, card radius
- Per-tile slots (index, title, viz, metrics)
- Footer lockups

A labelled 12-cell table or CSS grid wireframe is enough; it is not a second app.

## Global skill location

| Copy | Path |
|------|------|
| Project | `.cursor/skills/image-to-dashboard/` |
| Personal / global | `~/.cursor/skills/image-to-dashboard/` |
| Never | `~/.cursor/skills-cursor/` |
