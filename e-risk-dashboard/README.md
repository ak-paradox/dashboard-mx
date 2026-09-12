# Environmental Risk Overview Dashboard

A pixel-perfect, high-fidelity web replication of the Environmental Risk Overview dashboard, built with React 19, TypeScript, Tailwind CSS, and Lucide React.

## 🌟 Key Features & Visual Components

1. **Precision Typography & Theme**:
   - Editorial Serif header typography (`Playfair Display`) paired with clean geometric sans-serif (`Plus Jakarta Sans`) for data labels and metrics.
   - Exact color grading matching the original design: slate background `#f4f6f9`, crisp white cards with diffused ambient shadows, and semantic severity accents (Emerald, Amber, Rose, Crimson, Cyan).

2. **Left Vertical Dock Navigation**:
   - Sleek floating white dock with active indicator bar.
   - Brand logo (hexagonal node cluster).
   - Core view icons: Overview (Grid), Risk Map (Folded Map), Assets (3D Cube), Alerts (Bell with notification badge), Analytics (Bar Chart), Reports (Document), Data Management (Database stack), and Settings (Cog).

3. **Top Navigation & Filter Bar**:
   - Capsule search input with instant feedback.
   - Interactive dropdown filters: *All Regions*, *All Assets*, *All Risk Type*, *Last 30 Days*.
   - Action controls: Share button, dark pill Export button, notification bell with red alert dot, and user avatar.

4. **KPI Summary Cards (Row 1)**:
   - **Portfolio Risk Score**: Bold 72/100 score in crimson, "High Risk", period delta badge, and a circular radial progress gauge with glowing central alert icon.
   - **High-Risk Assets**: 75% ▲ with 42-needle soundwave frequency histogram in amber gradient with luminous peak marker, "18 High / This month".
   - **Active Alerts**: 75% ▲ with rose gradient soundwave frequency histogram, "3 Critical / This month".
   - **Monitored Assets**: 60% ▲ with cyan gradient soundwave frequency histogram, "42 Regions / This month".

5. **Environmental Risk Map (Row 2, Left)**:
   - 3D relief continental elevation map with textured shading and color-coded risk heat zones.
   - Interactive numbered hotspot pins (1: Southeast Asia Flood Risk, 2: Southern Europe Heatwave, 3: North African Water Stress, 4: California Wildfire Exposure).
   - Interactive hover cards revealing live metrics, risk level, and exposed facility counts.
   - Floating zoom controls (`+`, `-`, and recenter).
   - Bottom legend pill: *Low 18% ↑*, *Moderate 50% ↑*, *High 80% ↓*, *Critical 60% ↑*.

6. **Risk Exposure Dot Matrix Chart (Row 2, Center)**:
   - 17-column circular dot matrix bar chart reproducing the exact visual layout from the screenshots.
   - Inactive dot baseline with color-coded active dots for Low (Green), Moderate (Orange/Cyan), and Critical (Crimson).
   - Hover tooltips displaying exposed asset counts per sector.
   - Bottom status legend.

7. **Portfolio Risk Trend Chart (Row 2, Right)**:
   - Dual-layer visualization: subtle background vertical needle bars overlaid with a smooth jagged spline line.
   - Time-range selector (`12 months ▾`).
   - May peak callout card with concentric target ring indicator: "Risk Up 12.6% / Over 90 Days".
   - Bottom summary insight text: "Risk exposure increased 12.6% over 90 days. Flood and heat exposure drive most of the increase."

8. **Top Risk Regions (Row 3, Left)**:
   - Incident feed with custom status badges:
     - *Flood Risk Increased* (Southeast Asia, Medium-High badge, 12 min ago)
     - *Extreme Heat Detected* (Southern Europe, +4.2°C Anomaly, 12 min ago)
     - *Water Stress Increasing* (Northern Africa, +18% Exposure, 12 min ago)
     - *Wildfire Exposure Detected* (California Portfolio, 12 Assets Affected, 12 min ago)
   - "View Details →" quick action link.

9. **Intelligence Insight (Row 3, Right)**:
   - Key metrics: 95% Confidence (green check badge) and High Potential Impact (red alert badge).
   - Holographic Concentric Polar Radar Orb: multi-layered gradient lens rings, orbiting dashed particle ring, 4 directional pointers (N, S, E, W), and center illuminated core sphere with subtle breathing pulse animation.
   - "View Intelligence →" quick action link.

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```
