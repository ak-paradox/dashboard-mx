# Pulsewire Healthcheck Dashboard — Design Document

Refactored from the **Environmental Risk Overview** (e-risk) board into a bold **healthcheck status** command surface for Application APIs and SaaS vendors.

## Brand

| Token | Value |
|-------|-------|
| Product | **Pulsewire** |
| Motif | Hex-cluster mark with emerald heartbeat core |
| Mood | Soft enterprise chrome + live SRE urgency |
| Tagline | Probe the SaaS spine as one living pulse |
| Themes | Light (reference / e-risk DNA) + Dark (derived) |

## Colour palette — light (replicated from e-risk)

| Role | Hex | CSS variable |
|------|-----|----------------|
| Page | `#f3f5f8` | `--dash-bg` |
| Card | `#ffffff` | `--dash-card` |
| Text | `#111827` | `--dash-text` |
| Muted | `#64748b` | `--dash-muted` |
| Border | `#e7ebf0` | `--dash-border` |
| Accent (healthy) | `#059669` | `--dash-accent` |
| Ink CTA | `#18181b` | `--dash-ink` |
| Operational | `#16a34a` | `--status-ok` |
| Degraded | `#ea580c` | `--status-warn` |
| Outage | `#dc2626` | `--status-crit` |
| Maintenance | `#0ea5e9` | `--status-info` |
| Map land | `#e8edf3` | `--map-land` |
| Idle dots | `#e2e8f0` | `--dot-idle` |

## Colour palette — dark

| Role | Hex |
|------|-----|
| Page | `#0c1117` |
| Card | `#151c26` |
| Text | `#e8eef6` |
| Muted | `#8b9bb0` |
| Border | `#243041` |
| Accent | `#34d399` |
| Ink CTA | `#ecfdf5` |
| Operational / Warn / Crit / Info | `#22c55e` / `#fb923c` / `#f87171` / `#38bdf8` |

Theme: `data-theme` + `localStorage.pulsewire-theme`. Toggle in the top navbar.

## Typography (exact / from e-risk)

| Role | Face | Notes |
|------|------|-------|
| Display title | **Playfair Display** | 32–36px, weight 400 — hero headline |
| UI / data | **Plus Jakarta Sans** | 300–800 — chrome, KPIs, labels |
| Tabular | Plus Jakarta Sans | `tabular-nums` on uptime / latency |

Never substitute Inter / system UI for the display title.

## Shape & depth

| Token | Value |
|-------|-------|
| Card radius | `20px` |
| Control radius | `12px` / `xl` |
| Card shadow | `0 4px 20px -2px rgba(15,23,42,0.05), 0 12px 32px -4px rgba(15,23,42,0.04)` |
| Hover | Translate −2px + deeper shadow |
| Sidebar | 72px sticky rail, left active bar |

## HTML layout

```
┌─ aside.rail (72px) ─┬─ top navbar (search · filters · theme · share · export · bell) ─┐
│  logo heartbeat     │  HeaderTitle + LIVE mesh stamp                                  │
│  nav icons          │  VendorBeaconRail (constellation pills)                         │
│  probes / settings  │  ┌ KPI×4 ─────────────────────────────────────────────────────┐ │
│                     │  │ Health Index │ API Avail │ Incidents │ Surfaces            │ │
│                     │  └────────────────────────────────────────────────────────────┘ │
│                     │  ┌ EdgeMeshMap (6) ┬ Constellation (3) ┬ LatencyTrend (3) ────┐ │
│                     │  └─────────────────┴───────────────────┴──────────────────────┘ │
│                     │  ┌ IncidentFeed + 45d strips (7) ┬ CascadeInsight orb (5) ────┐ │
│                     │  └───────────────────────────────┴────────────────────────────┘ │
└─────────────────────┴─────────────────────────────────────────────────────────────────┘
```

## Interaction model

| Control | Behaviour |
|---------|-----------|
| Theme toggle | Persists light/dark |
| Filter pills | Dropdown replace label |
| Edge nodes | Click to inspect latency / vendor |
| Constellation columns | Hover tooltip |
| Latency chart | Hover month tooltip |
| Incident rows | Select highlight |
| Cascade orb | Hover enlarges core glow |
| Live beacon | Pulse ring on “Live mesh” chip |

## Components inventory

1. **Sidebar** — Pulsewire mark, status-board nav, live activity glyph  
2. **TopNavbar** — Search, region/surface/status/window filters, theme, share/export  
3. **HeaderTitle** — Serif hero + UTC clock  
4. **VendorBeaconRail** — GitHub · Cloudflare · Atlassian · Salesforce · MuleSoft · APIs  
5. **KpiCards** — Health index ring + soundwave histograms  
6. **EdgeMeshMap** — Abstract world mesh with status nodes  
7. **ServiceConstellation** — Dot-matrix probe density  
8. **LatencyTrendChart** — 12-month p99 area chart  
9. **IncidentFeed** — 45-day status strips + incident list  
10. **CascadeInsight** — RCA orb + blast radius forecast  

## Motion

1. Heartbeat on logo core + live activity icon  
2. Pulse rings on edge nodes / live beacon  
3. Soft scanline across the edge mesh  
4. Dual-direction orbital rings on cascade orb  

Respects `prefers-reduced-motion`.

## Implementation map

| Artifact | Path |
|----------|------|
| App shell | `src/App.tsx` |
| Tokens | `src/index.css` |
| Mock telemetry | `src/lib/data.ts` |
| Design HTML | `design.html` + `public/design.html` |

## Run

```bash
cd healthcheck-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5177/
- Design system: http://localhost:5177/design.html
