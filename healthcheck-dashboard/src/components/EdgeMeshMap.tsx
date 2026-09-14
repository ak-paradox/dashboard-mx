import React, { useState } from 'react'
import { edgeNodes, statusColor, statusLabel } from '../lib/data'
import type { EdgeNode } from '../types'

export const EdgeMeshMap: React.FC = () => {
  const [active, setActive] = useState<EdgeNode | null>(edgeNodes.find((n) => n.status === 'outage') ?? edgeNodes[0])

  return (
    <div className="dashboard-card p-6 flex flex-col h-full min-h-[420px] relative overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div>
          <h2 className="text-[14px] font-semibold text-dash-text tracking-tight">
            Global Edge Mesh
          </h2>
          <p className="text-[11px] text-dash-muted mt-0.5">
            Cloudflare PoPs · API gateways · integration hubs
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-dash-muted">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--status-ok)]" /> Live
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--status-crit)]" /> Fault
          </span>
        </div>
      </div>

      <div className="relative flex-1 rounded-2xl overflow-hidden border border-[color:var(--dash-border)] bg-[color:var(--map-land)] min-h-[280px]">
        {/* Atmospheric wash */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at 20% 35%, rgba(16,185,129,0.18), transparent 45%), radial-gradient(ellipse at 78% 42%, rgba(220,38,38,0.22), transparent 40%), radial-gradient(ellipse at 50% 70%, rgba(14,165,233,0.12), transparent 50%)',
          }}
        />

        {/* Soft scanline */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[color:var(--dash-accent)]/10 to-transparent animate-scanline pointer-events-none opacity-40" />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Abstract continents as soft blobs */}
          <ellipse cx="22" cy="40" rx="14" ry="16" fill="var(--map-stroke)" opacity="0.35" />
          <ellipse cx="48" cy="34" rx="10" ry="12" fill="var(--map-stroke)" opacity="0.3" />
          <ellipse cx="72" cy="48" rx="16" ry="14" fill="var(--map-stroke)" opacity="0.28" />
          <ellipse cx="34" cy="68" rx="9" ry="11" fill="var(--map-stroke)" opacity="0.25" />
          <ellipse cx="82" cy="72" rx="8" ry="7" fill="var(--map-stroke)" opacity="0.22" />

          {/* Mesh links */}
          {edgeNodes.map((a, i) =>
            edgeNodes.slice(i + 1).map((b) => (
              <line
                key={`${a.id}-${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--dash-accent)"
                strokeWidth="0.15"
                opacity={a.status === 'outage' || b.status === 'outage' ? 0.15 : 0.28}
                strokeDasharray={a.status === 'degraded' || b.status === 'degraded' ? '0.8 0.6' : undefined}
              />
            )),
          )}
        </svg>

        {edgeNodes.map((node) => {
          const isActive = active?.id === node.id
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActive(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              title={`${node.name} · ${statusLabel(node.status)}`}
            >
              <span
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ background: statusColor(node.status), opacity: 0.25 }}
              />
              <span
                className={`relative flex items-center justify-center rounded-full border-2 transition-transform ${
                  isActive ? 'scale-125 w-7 h-7' : 'w-5 h-5 group-hover:scale-110'
                }`}
                style={{
                  background: statusColor(node.status),
                  borderColor: 'var(--dash-card)',
                  boxShadow: `0 0 0 3px color-mix(in srgb, ${statusColor(node.status)} 35%, transparent)`,
                }}
              >
                <span className="text-[8px] font-black text-white tracking-tighter">{node.name}</span>
              </span>
            </button>
          )
        })}
      </div>

      {active && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Meta label="Node" value={active.name} />
          <Meta label="Region" value={active.region} />
          <Meta label="Vendor" value={active.vendor} />
          <Meta
            label="Latency"
            value={`${active.latencyMs}ms`}
            accent={statusColor(active.status)}
          />
        </div>
      )}
    </div>
  )
}

const Meta: React.FC<{ label: string; value: string; accent?: string }> = ({
  label,
  value,
  accent,
}) => (
  <div className="rounded-xl border border-[color:var(--dash-border)] bg-dash-soft/50 px-3 py-2">
    <div className="text-[10px] uppercase tracking-wider font-semibold text-dash-muted">{label}</div>
    <div className="text-[13px] font-bold text-dash-text mt-0.5 truncate" style={accent ? { color: accent } : undefined}>
      {value}
    </div>
  </div>
)
