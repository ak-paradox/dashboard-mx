import React, { useState } from 'react'
import {
  AlertTriangle,
  GitBranch,
  Cloud,
  Workflow,
  ArrowRight,
  Wrench,
  CheckCircle2,
} from 'lucide-react'
import { incidents, services, statusColor } from '../lib/data'
import type { HealthStatus } from '../types'

export const IncidentFeed: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(incidents[0]?.id ?? null)

  const badgeStyles: Record<string, string> = {
    red: 'bg-[color:var(--status-crit-soft)] text-[color:var(--status-crit)] border-[color:var(--status-crit)]/20',
    green:
      'bg-[color:var(--status-ok-soft)] text-[color:var(--status-ok)] border-[color:var(--status-ok)]/20',
    cyan: 'bg-[color:var(--status-info-soft)] text-[color:var(--status-info)] border-[color:var(--status-info)]/20',
    amber:
      'bg-[color:var(--status-warn-soft)] text-[color:var(--status-warn)] border-[color:var(--status-warn)]/20',
  }

  const iconFor = (title: string) => {
    if (title.includes('GitHub')) return <GitBranch size={15} />
    if (title.includes('Atlassian')) return <Wrench size={15} />
    if (title.includes('MuleSoft')) return <Workflow size={15} />
    if (title.includes('recovered')) return <CheckCircle2 size={15} />
    if (title.includes('Cloudflare')) return <Cloud size={15} />
    return <AlertTriangle size={15} />
  }

  const softFor = (variant: string) => {
    switch (variant) {
      case 'red':
        return 'bg-[color:var(--status-crit-soft)] text-[color:var(--status-crit)] border-[color:var(--status-crit)]/20'
      case 'green':
        return 'bg-[color:var(--status-ok-soft)] text-[color:var(--status-ok)] border-[color:var(--status-ok)]/20'
      case 'cyan':
        return 'bg-[color:var(--status-info-soft)] text-[color:var(--status-info)] border-[color:var(--status-info)]/20'
      default:
        return 'bg-[color:var(--status-warn-soft)] text-[color:var(--status-warn)] border-[color:var(--status-warn)]/20'
    }
  }

  return (
    <div className="dashboard-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-[color:var(--dash-border)]">
        <div>
          <h2 className="text-[14px] font-semibold text-dash-text tracking-tight">
            Live Incidents & Windows
          </h2>
          <p className="text-[11px] text-dash-muted mt-0.5">
            Cascades across APIs and SaaS vendors
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[color:var(--dash-accent)] hover:opacity-80 flex items-center gap-1 group transition-opacity"
        >
          <span>View Details</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 45-day heartbeat strips */}
      <div className="py-4 space-y-3 border-b border-[color:var(--dash-border)]">
        {services.map((svc) => (
          <div key={svc.id} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-[11px] font-semibold text-dash-text truncate">
              {svc.name}
            </div>
            <div className="flex-1 flex gap-[2px] overflow-hidden">
              {svc.history.map((d) => (
                <span
                  key={d.day}
                  title={`${statusLabelSafe(d.status)} · day ${d.day + 1}`}
                  className="h-3 flex-1 min-w-[3px] max-w-[8px] rounded-[2px] transition-transform hover:scale-y-125"
                  style={{ background: statusColor(d.status) }}
                />
              ))}
            </div>
            <div className="w-14 text-right text-[11px] font-bold tabular-nums text-dash-text">
              {svc.uptime90d.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      <ul className="flex-1 divide-y divide-[color:var(--dash-border)] mt-1">
        {incidents.map((inc) => {
          const isSelected = selected === inc.id
          return (
            <li key={inc.id}>
              <button
                type="button"
                onClick={() => setSelected(inc.id)}
                className={`w-full flex items-center gap-3 py-3.5 text-left transition-colors ${
                  isSelected ? 'bg-dash-soft/70 -mx-2 px-2 rounded-xl' : 'hover:bg-dash-soft/40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-sm flex-shrink-0 ${softFor(inc.badgeVariant)}`}
                >
                  {iconFor(inc.title)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-dash-text truncate">
                    {inc.title}
                  </div>
                  <div className="text-[11px] text-dash-muted mt-0.5 truncate">{inc.service}</div>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeStyles[inc.badgeVariant]}`}
                >
                  {inc.badgeText}
                </span>
                <span className="shrink-0 text-[11px] text-dash-muted w-16 text-right">
                  {inc.timeAgo}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function statusLabelSafe(s: HealthStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
