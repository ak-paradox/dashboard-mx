import React from 'react'
import { statusColor, statusLabel, services } from '../lib/data'
import type { HealthStatus } from '../types'

const order: HealthStatus[] = ['operational', 'degraded', 'maintenance', 'outage']

export const VendorBeaconRail: React.FC = () => {
  return (
    <div className="dashboard-card px-4 py-3 flex flex-wrap items-center gap-2.5 overflow-x-auto">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-dash-muted mr-1 shrink-0">
        Constellation
      </span>
      {services.map((svc) => (
        <div
          key={svc.id}
          className="flex items-center gap-2 rounded-xl border border-[color:var(--dash-border)] bg-dash-soft/60 px-3 py-2 shrink-0"
        >
          <span
            className="relative flex h-2.5 w-2.5"
            style={{ color: statusColor(svc.status) }}
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
              style={{ backgroundColor: 'currentColor' }}
            />
            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: 'currentColor' }}
            />
          </span>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold text-dash-text">{svc.name}</div>
            <div className="text-[10px] text-dash-muted">{statusLabel(svc.status)}</div>
          </div>
          <div className="text-[11px] font-bold tabular-nums text-dash-text ml-1">
            {svc.uptime90d.toFixed(2)}%
          </div>
        </div>
      ))}
      <div className="ml-auto hidden lg:flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-dash-muted">
        {order.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: statusColor(s) }} />
            {statusLabel(s)}
          </span>
        ))}
      </div>
    </div>
  )
}
