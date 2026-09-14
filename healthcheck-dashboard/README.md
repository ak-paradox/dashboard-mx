# Pulsewire Healthcheck Dashboard

Bold status command surface for Application APIs and the SaaS spine (GitHub, Cloudflare, Atlassian, Salesforce, MuleSoft). Built from the e-risk dashboard structure — same card rhythm, serif title, soft chrome — refactored into a living healthcheck board.

## Run

```bash
cd healthcheck-dashboard
npm install
npm run dev
```

- Dashboard: http://localhost:5177/
- Design system: http://localhost:5177/design.html

## Stack

Vite · React 19 · TypeScript · Tailwind 3 · Lucide

## Themes

Light (reference, e-risk DNA) + dark via `data-theme` / `localStorage.pulsewire-theme`.
