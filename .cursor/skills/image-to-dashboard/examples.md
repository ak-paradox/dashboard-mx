# Image → Dashboard examples

## NEBO.Bank (this repo)

| Item | Value |
|------|-------|
| Folder | `nebo-bank-dashboard/` |
| Design doc | `nebo-bank-dashboard/DESIGN.md` |
| Design HTML | `nebo-bank-dashboard/design.html` |
| Stack | Vite, React 19, TypeScript, Tailwind 3 |
| Font | Inter 300–800 |
| Accent | `#FF4D2D` (both themes) |
| Dark bg | `#121212` |
| Light bg | `#E6E7EC` |
| Depth | Neumorphic outer + inset shadows |
| Layout | Unequal 4-column bento collage |
| Theme | `data-theme` + `localStorage` key `nebo-theme` |

```bash
cd nebo-bank-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5175/
- Design system HTML: http://localhost:5175/design.html

## Deerflow AIoT (this repo)

| Item | Value |
|------|-------|
| Folder | `deerflow-dashboard/` |
| Design doc | `deerflow-dashboard/DESIGN.md` |
| Design HTML | `deerflow-dashboard/design.html` |
| Stack | Vite, React 19, TypeScript, Tailwind 3 |
| Font | Reconstructed 5×7 circular-dot LED (`DotText` + `glyphs.ts`); Doto fallback |
| Accent | `#FF3B12` (both themes) |
| Reference theme | Matte `#141414` tiles on cream studio `#EDD6C0` → `#7D7D7F` |
| Light theme | Cream tiles `#F4EBE3` on charcoal studio |
| Depth | Soft studio drop shadow, 22px tiles |
| Layout | Header + 3×4 equal tile grid + footer lockups |
| Theme | `data-theme` + `localStorage` key `deerflow-theme` |

```bash
cd deerflow-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5176/
- Design + HTML layout: http://localhost:5176/design.html

### What was replicated

- Circular-dot LED type on brand, tiles, metrics, and footer (not Inter)
- Orange status LEDs, REC / LIVEVIEW pulse, blinking tagline cursor
- All 12 instruments: agent face, token bars, device gauge, Tesla, capsule, ECG, leaf, word play, retail spark, rings, ship, vision cube
- Dual theme with unchanged accent and layout

## Pulsewire Healthcheck (this repo)

| Item | Value |
|------|-------|
| Folder | `healthcheck-dashboard/` |
| Design doc | `healthcheck-dashboard/DESIGN.md` |
| Design HTML | `healthcheck-dashboard/design.html` |
| Stack | Vite, React 19, TypeScript, Tailwind 3 |
| Font | Playfair Display (hero) + Plus Jakarta Sans (UI) — from e-risk DNA |
| Accent | `#059669` light / `#34d399` dark |
| Reference theme | Light `#f3f5f8` page, white cards (e-risk) |
| Dark theme | Ink `#0c1117` page, `#151c26` cards |
| Depth | Soft e-risk card shadow, 20px radius, −2px hover lift |
| Layout | Sidebar rail + KPI row + mesh/constellation/latency + incidents/cascade |
| Theme | `data-theme` + `localStorage` key `pulsewire-theme` |

```bash
cd healthcheck-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5177/
- Design + HTML layout: http://localhost:5177/design.html

### What was refactored

- Environmental risk board → live healthcheck for Application APIs, GitHub, Cloudflare, Atlassian, Salesforce, MuleSoft
- Vendor beacon rail, edge mesh map, 45-day status strips, cascade RCA orb
- Dual theme with shared status vocabulary (ok / warn / crit / info)
