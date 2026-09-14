import React, { useMemo, useState } from 'react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const LatencyTrendChart: React.FC = () => {
  const points = useMemo(
    () => [118, 124, 131, 128, 142, 155, 148, 160, 172, 198, 186, 214],
    [],
  )
  const [hover, setHover] = useState<number | null>(10)

  const w = 280
  const h = 180
  const pad = 16
  const max = Math.max(...points)
  const min = Math.min(...points) * 0.7

  const coords = points.map((v, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2)
    return { x, y, v }
  })

  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
  const area = `${path} L ${coords[coords.length - 1].x} ${h - pad} L ${coords[0].x} ${h - pad} Z`
  const active = hover ?? points.length - 1

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full min-h-[420px]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-dash-text tracking-tight">
            p99 Latency Trend
          </h2>
          <p className="text-[11px] text-dash-muted mt-0.5">Application APIs · 12 months</p>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center py-2">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[220px] overflow-visible">
          <defs>
            <linearGradient id="latFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={pad}
              x2={w - pad}
              y1={pad + t * (h - pad * 2)}
              y2={pad + t * (h - pad * 2)}
              stroke="var(--dash-border)"
              strokeDasharray="3 4"
            />
          ))}

          <path d={area} fill="url(#latFill)" />
          <path
            d={path}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {coords.map((c, i) => (
            <g key={i}>
              <circle
                cx={c.x}
                cy={c.y}
                r={i === active ? 5.5 : 3}
                fill={i === active ? '#ffffff' : '#0ea5e9'}
                stroke="#0ea5e9"
                strokeWidth={i === active ? 2.5 : 0}
                className="cursor-pointer"
                onMouseEnter={() => setHover(i)}
              />
            </g>
          ))}

          {hover !== null && (
            <g>
              <line
                x1={coords[active].x}
                y1={pad}
                x2={coords[active].x}
                y2={h - pad}
                stroke="var(--dash-muted)"
                strokeDasharray="2 3"
                opacity="0.5"
              />
              <foreignObject
                x={Math.min(coords[active].x - 48, w - 110)}
                y={Math.max(coords[active].y - 48, 4)}
                width="100"
                height="40"
              >
                <div className="rounded-lg bg-[#1e293b] text-white text-[10px] font-semibold px-2 py-1.5 shadow-xl text-center">
                  Latency ↑ {(((points[active] - points[0]) / points[0]) * 100).toFixed(1)}%
                  <div className="text-[9px] font-normal opacity-80">{points[active]}ms p99</div>
                </div>
              </foreignObject>
            </g>
          )}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] font-semibold text-dash-muted px-1">
        {months.filter((_, i) => i % 2 === 0).map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[color:var(--dash-border)] flex items-center justify-between">
        <div>
          <div className="text-[22px] font-bold text-dash-text leading-none tabular-nums">214ms</div>
          <div className="text-[11px] text-dash-muted mt-1">Current p99</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] font-bold text-[color:var(--status-crit)]">+81% YoY</div>
          <div className="text-[11px] text-dash-muted mt-0.5">Spike at NRT failover</div>
        </div>
      </div>
    </div>
  )
}
