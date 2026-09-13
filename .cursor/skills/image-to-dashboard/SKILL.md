---
name: image-to-dashboard
description: >-
  Converts UI reference images into production-ready web dashboards that
  always copy the exact font, exact colour theme, and every design aspect;
  always generate dark mode and light mode; always create a new folder;
  and always create a design and colour theme document with html layout.
  Use when the user attaches a
  dashboard mockup/screenshot, asks for /image-to-dashboard, or wants an
  image-to-dashboard conversion. After each conversion, improve this skill.
---

# Image to Dashboard

Turn a UI reference image into a self-contained web dashboard folder that
matches the source, ships both themes, and documents the system in markdown
plus interactive HTML.

## Always (non-negotiable)

Use this wording as the contract. Do not weaken it.

- make sure always been improving the skill
- should always generate dark mode and light mode
- should always copy the exact font, exact colour theme and every design aspect
- should always create a design and colour theme document with html layout
- should always create a new folder

If any of those five would be skipped, the conversion is incomplete. Keep working.

Never drop a new dashboard into an existing app folder, the repo root, or a previous `*-dashboard/` tree. Always create a **new folder** named `<brand-or-topic>-dashboard/` at the repo root and put every deliverable inside it.

## When to use

- User attaches a dashboard / product / admin UI image and asks to build it
- User invokes `/image-to-dashboard`
- User wants fonts and colours matched to a visual reference

## Deliverables (always)

1. **New folder** at repo root: `<name>-dashboard/` (kebab-case from brand or topic)
2. **Working web app** (Vite + React + TypeScript + Tailwind unless the repo already standardizes otherwise)
3. **Dark + light themes** via CSS variables + `data-theme` toggle (persist in `localStorage`)
4. **Design and colour theme document** `DESIGN.md` — every sampled hex, font, radius, shadow, widget, and interaction
5. **HTML layout** `design.html` — interactive colour/type/depth showcase **and** a structural HTML layout of the board (regions, grid, chrome)
6. **Visual fidelity**: exact font (or reconstructed equivalent), exact colours, spacing rhythm, and every widget from the image

Do not invent a different visual language. Prefer matching the reference over generic “AI dashboard” aesthetics.

## Workflow

Copy this checklist and track it:

```
Image → Dashboard:
- [ ] 1. Read the image (and any description) carefully
- [ ] 2. Sample exact colours + identify exact type (do not guess Inter by default)
- [ ] 3. Inventory every widget / region / glyph / chrome (header, footer, LEDs, lockups)
- [ ] 4. Create folder + scaffold (mirror sibling dashboards in this repo)
- [ ] 5. Encode tokens in CSS variables (reference theme + paired opposite theme)
- [ ] 6. Implement layout + every widget + theme toggle
- [ ] 7. Write DESIGN.md (both palettes, exact type, html layout map)
- [ ] 8. Create design.html (tokens + interactive states + HTML layout diagram)
- [ ] 9. Install, build, fix type/lint errors
- [ ] 10. Verify against the image (structure, colour, type, both themes)
- [ ] 11. Improve this skill (examples + any missing step), then sync the global copy
```

### 1. Analyse the image

Read the image file with the Read tool. Extract:

| Category | Capture |
|----------|---------|
| Brand | Name, logo treatment, motif |
| Colours | Sample hex — bg, surface, card, accent, text, muted, LED/status, chart |
| Type | Exact family if identifiable; else reconstruct (dot-matrix renderer, custom display) |
| Shape | Corner radii, pill vs square, 3D vs flat |
| Depth | Studio shadow, neumorph, glass — write the shadow recipe |
| Layout | Columns, rows, bento, header/footer lockups |
| Widgets | Every distinct card/chart/icon — none skipped |
| Interactions | Hover, press, live data, progress, toggles, blinking cursors |

**Exact font protocol**

1. Identify the type (LED/dot-matrix, geometric sans, grotesque, mono, serif, display).
2. Load the exact webfont when it exists.
3. If no webfont matches, **reconstruct** (e.g. 5×7 circular-dot renderer) rather than substituting Inter / system UI.
4. Document the match + rationale in `DESIGN.md`. Never ship a generic UI sans as a stand-in for a distinctive face.

**Exact colour protocol**

Sample hex from the image. Every hex used in code must appear in `DESIGN.md`. Do not invent a new palette. Accent stays the same in both themes unless the reference itself uses two accents.

### 2. Create the folder

```
<name>-dashboard/
├── DESIGN.md
├── design.html          # interactive design system + HTML layout (required)
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css        # :root dark + [data-theme=light]
    ├── vite-env.d.ts
    └── lib/
```

Also place `design.html` in `public/` so Vite serves `/design.html`. Mirror existing dashboard folders in the same monorepo when present (ports, scripts, dependency versions).

### 3. Tokenize before composing (dual theme — always)

Always generate dark mode and light mode. Default theme matches the reference. Derive the opposite pair that keeps accent, radii, and type unchanged — only luminance and shadow polarity flip.

```css
:root, [data-theme='dark'] {
  --dash-bg: /* sampled */;
  --dash-card: /* sampled */;
  --dash-text: /* sampled */;
  --dash-accent: /* sampled */;
  --shadow-tile: /* sampled recipe */;
}

[data-theme='light'] {
  --dash-bg: /* derived, documented */;
  --dash-card: /* derived */;
  --dash-text: /* derived */;
  --dash-accent: /* same accent */;
  --shadow-tile: /* polarity flipped */;
}
```

Wire Tailwind colours to `var(--…)`. Use semantic text tokens — avoid hard-coded `text-white` except on accent CTAs.

### 4. Build the UI

- Match the reference regions (bento / equal tile grid / chrome)
- Reconstruct distinctive type instead of approximating
- Charts: SVG unless the repo already uses a chart library
- Icons: same weight and construction as the reference (stroke, dots, silhouette)
- Motion: 2–4 intentional motions that the image implies (pulse LED, waveform, cursor)
- Responsive: stack on small screens; preserve desktop composition first
- Theme toggle: set `document.documentElement.dataset.theme`; persist `*-theme`

### 5. Design and colour theme document

Write `DESIGN.md` using this structure:

```markdown
# <Name> Dashboard — Design Document

## Brand
## Colour palette — dark (replicated)
## Colour palette — light
## Typography (exact / reconstructed)
## Shape & depth
## HTML layout
## Interaction model
## Components inventory
## Motion
## Implementation map
## Run
```

`## HTML layout` must describe the real DOM/grid (header, board columns, footer) so `design.html` can render the same map.

Every hex and font weight used in code must appear in the doc.

### 6. design.html (required)

Standalone interactive file. Purpose: colour theme, type, depth, **and HTML layout** — not a duplicate of the full app.

Must include:

| Section | What to show |
|---------|----------------|
| Theme switch | Same dark/light tokens as the app (`localStorage` shared if possible) |
| Colour tokens | Swatches; optional click-to-copy |
| Typography | Exact face specimens (including reconstructed LED/dot type) |
| HTML layout | Annotated wireframe of header / board / footer matching the app grid |
| Depth playground | Tile / inset / accent — hover/press demos |
| Component anatomy | Annotated live widgets |
| State matrix | Rest / hover / active / pressed / disabled |
| Principles | Accent job, depth = affordance, theme preserves motif |

Self-contained CSS/JS. Link to the live dashboard and `DESIGN.md`.

### 7. Verify

- [ ] Folder exists and is self-contained
- [ ] `npm install` + `npm run build` succeed
- [ ] Reference theme matches the image; the other theme is usable and token-driven
- [ ] Theme toggle works and persists
- [ ] Accent / bg / text match sampled values
- [ ] Declared font is loaded **or** the reconstructed renderer is used on brand/UI text
- [ ] `DESIGN.md` lists both palettes, exact type, HTML layout, components, interactions
- [ ] `design.html` has colour theme + HTML layout + interactions
- [ ] Every widget from the image is present

### 8. Always been improving the skill

After every conversion, before finishing:

1. Add a row to [examples.md](examples.md) for the new dashboard (folder, font, accent, themes, layout).
2. If you needed a step this file did not mention (new type reconstruction, studio lighting, equal-tile grid, etc.), patch `SKILL.md` or [reference.md](reference.md).
3. Sync **both** copies so the global skill stays current:

   - Project: `.cursor/skills/image-to-dashboard/`
   - Global (all Cursor projects): `~/.cursor/skills/image-to-dashboard/`

   On Windows the global path is `%USERPROFILE%\.cursor\skills\image-to-dashboard\`.

Do not leave the global copy stale. Do not write into `~/.cursor/skills-cursor/` (Cursor-managed).

## Anti-patterns

- Substituting Inter / system UI when the image is LED, pixel, serif, or branded display
- Inventing a new colour palette
- Shipping only one theme
- Skipping `DESIGN.md` or `design.html`
- `design.html` with no HTML layout map
- Skipping widgets, header lockups, or footers
- Updating only the project skill and not the global copy
- Editing an existing dashboard or dumping files at repo root instead of creating a new folder

## Additional resources

- Extraction details: [reference.md](reference.md)
- Completed conversions: [examples.md](examples.md)
