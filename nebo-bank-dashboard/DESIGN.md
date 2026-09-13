# NEBO.Bank Dashboard — Design Document

Pixel-faithful conversion of the NEBO.Bank UI-kit reference (widget collage).

## Brand

| Token | Value |
|-------|-------|
| Product | NEBO.Bank |
| Motifs | 3D tetrahedron (orange top face) · folded page ribbon |
| Mood | Soft-UI / neumorphic dark fintech |
| Themes | Dark (reference) + Light (derived) |

## Colour palette — dark (replicated)

| Role | Hex | CSS variable |
|------|-----|----------------|
| Page | `#0C0C0C` | `--nebo-bg` |
| Card | `#1A1A1C` | `--nebo-card` |
| Inset | `#121214` | `--nebo-inset` |
| Text | `#F5F5F7` | `--nebo-text` |
| Muted | `#8E8E93` | `--nebo-muted` |
| Accent | `#FF4D2D` | `--nebo-accent` |
| Donut light | `#D8D8DC` | `--chart-seg-1` |
| Gold / Silver / Platinum | `#E8B84A` / `#C8C8CC` / `#8BA3B8` | metal bars |

## Colour palette — light

| Role | Hex |
|------|-----|
| Page | `#E6E7EC` |
| Card | `#F2F3F7` |
| Text | `#1C1C1E` |
| Accent | `#FF4D2D` (unchanged) |

Theme: `data-theme` + `localStorage.nebo-theme`. Toggle sits outside the collage so it does not alter the clone.

## Typography

Inter 300–800 (SF Pro–like geometric sans). Amounts use superscript cents. Labels 10–11px muted.

## Layout (exact collage)

4-column board matching the reference artboard:

| Area | Widget | Reference copy |
|------|--------|----------------|
| brand | Header | NEBO.Bank, bell, 3 blank tiles, AT&T $20, Network $28 |
| donut | Spend | November $980.00, empty-hole donut, 5-dot legend |
| txns | Activity | Uber $8.60 · YouTube $4.00 · Starbucks $3.80 |
| goal | Promo | 3D pyramid, “Divide incoming payments…”, text **Add goal** |
| cards | Wallet | Mastercard Gold $9,560 · Visa Classic $28 · Deposits · Account overview |
| bonus | Loyalty | **4 860** bonus points, level 3, Uber/Givenchy/Starbucks/Lidl |
| design | Tall card | 3/4 pager, 4276 3800 4290 9864, Sergi M, Choose design, folded mark, **Next** underline |
| bal | Chart | $8 460.94 Month balance, orange sparkline |
| icons | Utilities | Phone · Card · List |
| metals | Quotes | Gold 48.98/44.70 · Silver 0.56/0.52 · Platinum 30.44/27.70 |
| income | Confirm | $80.00 Income, Michael Loren, **Ok** pill |
| recur | Standing | Every Sunday 11:00 AM, $100.94 to unicef foundation |
| newcar | Goal | $8 900 / $14 000 |
| brand2 | Mini header | NEBO.Bank + bell |

## Interaction (as designed)

| Control | Behaviour |
|---------|-----------|
| Blank action tiles | Recessed; no fill |
| Add goal / Next | Text only — Next has a 2px accent underline |
| Ok | Recessed pill |
| Bell | Quiet icon, no fabricated badge |
| Theme toggle | App chrome only; not part of the kit |

## Implementation map

| Artifact | Path |
|----------|------|
| Clone | `src/App.tsx` |
| Tokens | `src/index.css` |
| Design HTML | `design.html` |

## Run

```bash
cd nebo-bank-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5175/
- Design system: http://localhost:5175/design.html
