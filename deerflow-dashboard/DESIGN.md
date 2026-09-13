# Deerflow AIoT Dashboard — Design Document

Pixel-faithful conversion of the Deerflow / Henryry AIoT board (12 equal floating tiles on a studio cyclorama).

## Brand

| Token | Value |
|-------|-------|
| Product | DEERFLOW |
| Line | AIoT DASHBOARD |
| Author lockup | Deerflow by Henryry |
| Motif | Circular-dot LED type · orange status LED · matte 3D tiles |
| Mood | Soft studio product shot, instrument-cluster AIoT |
| Themes | Dark tiles on cream studio (reference) + Light tiles on charcoal studio |

## Colour palette — dark (replicated)

| Role | Hex | CSS variable |
|------|-----|----------------|
| Studio top | `#F3DDC8` / `#EDD6C0` | `--df-studio-top` |
| Studio mid | `#C8B6A6` | `--df-studio-mid` |
| Studio bottom | `#9A9694` → `#7D7D7F` | `--df-studio-bot` |
| Tile | `#141414` | `--df-card` |
| Tile highlight | `#1C1C1C` | `--df-card-hi` |
| Tile text | `#E8E2D8` | `--df-text` |
| Tile muted | `#8A847C` | `--df-muted` |
| Accent / LED | `#FF3B12` | `--df-accent` / `--df-led` |
| Chrome (on studio) | `#1A1816` | `--df-chrome` |

## Colour palette — light

| Role | Hex | CSS variable |
|------|-----|----------------|
| Studio | `#3D3732` → `#1C1A18` | `--grad-page` |
| Tile | `#F4EBE3` | `--df-card` |
| Tile text | `#1C1A17` | `--df-text` |
| Chrome (on studio) | `#EADFD4` | `--df-chrome` |
| Accent / LED | `#FF3B12` (unchanged) | `--df-accent` |

Theme: `data-theme` + `localStorage.deerflow-theme`. Toggle is chrome only.

## Typography (exact / reconstructed)

The reference is a **5×7 circular-dot LED** face (airport / instrument board), not a geometric UI sans.

| Use | Implementation |
|-----|----------------|
| Brand, tile titles, metrics, footer | Custom 5×7 circular-dot renderer (`src/lib/glyphs.ts` + `DotText`) |
| Fallback for any ungylphed sentence | **Doto** (Google Fonts), same dotted construction |
| Weights | Single optical size; scale via `size` (dot radius) |
| Tracking | 1.15× cell width between letters |

Do not substitute Inter / system UI on this board.

## Shape & depth

| Token | Value |
|-------|-------|
| Tile radius | 24px |
| Tile min height | 280px |
| Board gap | 22px |
| LED | 7px circle + orange glow |
| Shadow | Large soft studio drop (`0 28px 48px` warm black) + 1px top inset highlight |

## HTML layout

```
page.studio
├── header.chrome
│   ├── brand (DEERFLOW / AIoT DASHBOARD)
│   ├── status (LED + All systems operational)
│   └── theme toggle (app chrome)
├── main.board  [CSS grid 3 × 4]
│   ├── tile 01 Agent status
│   ├── tile 02 Claude / Codex
│   ├── tile 03 Device overview
│   ├── tile 04 Tesla status
│   ├── tile 05 Pharma track
│   ├── tile 06 Medical monitor
│   ├── tile 07 Bio sensor
│   ├── tile 08 Word play
│   ├── tile 09 Retail analytics
│   ├── tile 10 Entertainment
│   ├── tile 11 Game zone
│   └── tile 12 Vision AI
└── footer.chrome
    ├── tagline (BUILD ANYTHING / WITH INTELLIGENCE_)
    └── credit (Deerflow / by Henryry)
```

Each tile:

```
article.df-tile
├── header (LED + index + title [+ extra])
├── viz (flex-1)
└── footer metrics (2–3 labelled values)
```

## Interaction model

| Control | Behaviour |
|---------|-----------|
| Theme toggle | Dark = reference; light = inverted tiles; persist `deerflow-theme` |
| Agent waveform | Continuous scale-Y pulse; one orange bar |
| Device gauge | Static tick ring; 128 centered |
| Word play | Click fills `C_DE` → `CODE` |
| Entertainment | Play/pause spins dotted rings; orange play LED |
| Game lives | Click a heart to set remaining lives |
| REC / LIVEVIEW | Pulsing orange LED |
| Footer underscore | Blinking cursor |
| Tile hover | 2px lift |

## Components inventory

| # | Widget | Reference copy |
|---|---------|----------------|
| 01 | Agent | THINKING.. · STEPS 128 · TOOLS 12 · MEMORY 98% |
| 02 | Tokens | 12.4K · REQUESTS 24 · +18% |
| 03 | Devices | 128 · ONLINE 96% · OFFLINE 4% · ALERTS 2 |
| 04 | Tesla | BATTERY 78% · RANGE 312km · PARKED + lock |
| 05 | Pharma | COMPOUND a1-07 · PHASE II · PROGRESS 66% |
| 06 | Medical | HR 72 bpm · SPO2 98% · TEMP 36.6°C · STABLE |
| 07 | Bio | leaf of dots · MOISTURE 64% · LIGHT 4280 lux |
| 08 | Word | Filling in the blankly · Great job! · 720 / 12 |
| 09 | Retail | 1.28K VISITORS · LIVEVIEW · SALES +23% |
| 10 | Media | dotted rings · transport |
| 11 | Game | ship · SCORE 08920 · 3 hearts |
| 12 | Vision | cube in viewfinder · OBJECTS 3 · CONFIDENCE 92% · REC |

## Motion

Waveform, ECG dash, ring spin (while playing), LED pulse, cursor blink. No decorative noise.

## Implementation map

| Artifact | Path |
|----------|------|
| Clone | `src/App.tsx` + `src/widgets.tsx` |
| Tokens | `src/index.css` |
| Type | `src/lib/glyphs.ts`, `src/components/DotText.tsx` |
| Design HTML | `design.html` / `public/design.html` |

## Run

```bash
cd deerflow-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5176/
- Design + HTML layout: http://localhost:5176/design.html
