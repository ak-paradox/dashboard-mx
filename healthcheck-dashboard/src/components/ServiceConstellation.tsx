import React, { useState } from 'react'
import { services, statusColor, statusLabel } from '../lib/data'
import type { HealthStatus } from '../types'

const columns = [
  { id: 'ok', label: 'Stable probes', color: 'green' as const, height: 9 },
  { id: 'cf', label: 'Cloudflare edge', color: 'green' as const, height: 11 },
  { id: 'gh', label: 'GitHub Actions', color: 'green' as const, height: 8 },
  { id: 'api', label: 'App API cluster', color: 'orange' as const, height: 10 },
  { id: 'mule', label: 'MuleSoft MQ', color: 'orange' as const, height: 7 },
  { id: 'sf', label: 'Salesforce CRM', color: 'cyan' as const, height: 9 },
  { id: 'atl', label: 'Atlassian suite', color: 'cyan' as const, height: 6 },
  { id: 'nrt', label: 'NRT gateway', color: 'red' as const, height: 12 },
  { id: 'dns', label: 'DNS / WAF', color: 'green' as const, height: 10 },
  { id: 'id', label: 'Identity APIs', color: 'orange' as const, height: 8 },
  { id: 'bill', label: 'Billing APIs', color: 'gray' as const, height: 5 },
  { id: 'search', label: 'Search APIs', color: 'gray' as const, height: 6 },
  { id: 'hooks', label: 'Webhooks', color: 'cyan' as const, height: 7 },
  { id: 'workers', label: 'Workers', color: 'green' as const, height: 11 },
  { id: 'cdn', label: 'CDN cache', color: 'green' as const, height: 12 },
  { id: 'jira', label: 'Jira Cloud', color: 'cyan' as const, height: 5 },
  { id: 'exp', label: 'Experience Cloud', color: 'gray' as const, height: 4 },
]

const colorMap: Record<string, string> = {
  green: 'bg-[color:var(--status-ok)] shadow-[0_0_6px_rgba(22,163,74,0.35)]',
  orange: 'bg-[color:var(--status-warn)] shadow-[0_0_6px_rgba(234,88,12,0.35)]',
  red: 'bg-[color:var(--status-crit)] shadow-[0_0_6px_rgba(220,38,38,0.35)]',
  cyan: 'bg-[color:var(--status-info)] shadow-[0_0_6px_rgba(14,165,233,0.35)]',
  gray: 'bg-[#94a3b8]',
}

export const ServiceConstellation: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null)
  const slots = 13

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full min-h-[420px] relative">
      <div>
        <h2 className="text-[14px] font-semibold text-dash-text tracking-tight">
          Service Constellation
        </h2>
        <p className="text-[11px] text-dash-muted mt-0.5">Probe density by surface</p>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1.5 py-6 px-1">
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex flex-col-reverse gap-1 flex-1 items-center relative group cursor-pointer"
            onMouseEnter={() => setHovered(col.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {Array.from({ length: slots }).map((_, i) => {
              const active = i < col.height
              return (
                <span
                  key={i}
                  className={`w-full max-w-[10px] aspect-square rounded-full transition-all ${
                    active ? colorMap[col.color] : 'bg-[color:var(--dot-idle)]'
                  } ${hovered === col.id && active ? 'scale-110' : ''}`}
                />
              )
            })}
            {hovered === col.id && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 px-2 py-1 rounded-lg bg-[#1e293b] text-white text-[10px] font-medium shadow-xl">
                {col.label}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-[color:var(--dash-border)] pt-3">
        {services.slice(0, 3).map((svc) => (
          <MiniStatus key={svc.id} name={svc.name} status={svc.status} uptime={svc.uptime90d} />
        ))}
      </div>
    </div>
  )
}

const MiniStatus: React.FC<{ name: string; status: HealthStatus; uptime: number }> = ({
  name,
  status,
  uptime,
}) => (
  <div className="flex items-center justify-between gap-2 text-[11px]">
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: statusColor(status) }} />
      <span className="font-semibold text-dash-text truncate">{name}</span>
    </div>
    <div className="flex items-center gap-2 shrink-0 text-dash-muted">
      <span>{statusLabel(status)}</span>
      <span className="font-bold text-dash-text tabular-nums">{uptime.toFixed(2)}%</span>
    </div>
  </div>
)
