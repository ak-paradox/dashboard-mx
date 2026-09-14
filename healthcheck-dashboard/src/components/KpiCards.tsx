import React from 'react'
import { Activity, Zap, Siren, Radar } from 'lucide-react'

interface SoundwaveProps {
  color: 'amber' | 'rose' | 'cyan' | 'emerald'
  peakIndex: number
}

const SoundwaveHistogram: React.FC<SoundwaveProps> = ({ color, peakIndex }) => {
  const palette = {
    amber: {
      bar: '#f59e0b',
      peakDot: '#d97706',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    rose: {
      bar: '#f43f5e',
      peakDot: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.4)',
    },
    cyan: {
      bar: '#06b6d4',
      peakDot: '#0ea5e9',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    emerald: {
      bar: '#10b981',
      peakDot: '#059669',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
  }[color]

  const totalBars = 38
  const heights = Array.from({ length: totalBars }, (_, i) => {
    const t = i / (totalBars - 1)
    return 0.14 + 0.72 * Math.pow(t, 1.25) + Math.sin(i * 0.4) * 0.03
  })

  return (
    <div className="w-full h-[52px] my-1 relative">
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${totalBars * 4.5} 48`}
        preserveAspectRatio="none"
      >
        {heights.map((h, i) => {
          const x = i * 4.5 + 2
          const y2 = 46
          const y1 = 46 - h * 38
          const isPeak = i === peakIndex
          const opacity = isPeak ? 1 : 0.28 + (i / totalBars) * 0.72

          return (
            <line
              key={i}
              x1={x}
              y1={y2}
              x2={x}
              y2={y1}
              stroke={palette.bar}
              strokeWidth={isPeak ? 2.4 : 1.8}
              strokeLinecap="round"
              opacity={opacity}
            />
          )
        })}
        <circle
          cx={peakIndex * 4.5 + 2}
          cy={46 - heights[peakIndex] * 38}
          r="5.5"
          fill={palette.glow}
          className="animate-pulse"
        />
        <circle
          cx={peakIndex * 4.5 + 2}
          cy={46 - heights[peakIndex] * 38}
          r="3"
          fill="#ffffff"
          stroke={palette.peakDot}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export const KpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div>
          <span className="text-[13px] font-semibold text-dash-text tracking-tight">
            Global Health Index
          </span>
        </div>

        <div className="flex items-center justify-between my-auto">
          <div>
            <div className="flex items-baseline">
              <span className="text-[34px] font-bold text-[color:var(--status-warn)] leading-none tracking-tight">
                94
              </span>
              <span className="text-xs font-semibold text-dash-muted ml-1">/100</span>
            </div>
            <span className="text-xs font-bold text-[color:var(--status-warn)] mt-1 block">
              Watch — 2 degraded
            </span>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="var(--status-warn-soft)"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="var(--status-warn)"
                strokeWidth="5"
                fill="none"
                strokeDasharray="163.36"
                strokeDashoffset={163.36 * (1 - 0.94)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[color:var(--status-warn-soft)] border border-[color:var(--status-warn)]/30 flex items-center justify-center shadow-sm">
                <Activity size={14} className="text-[color:var(--status-warn)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[color:var(--dash-border)] flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--status-warn)]">
          <Zap size={12} className="fill-[color:var(--status-warn)]" />
          <span>−1.8 pts vs. prior window</span>
        </div>
      </div>

      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-dash-text tracking-tight">
            API Availability
          </span>
          <div className="w-6 h-6 rounded-full bg-[color:var(--status-warn-soft)] border border-[color:var(--status-warn)]/25 flex items-center justify-center text-[color:var(--status-warn)]">
            <Radar size={12} />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-dash-text leading-none tracking-tight">
              99.42%
            </span>
            <span className="text-[11px] text-[color:var(--status-warn)] font-bold">▼</span>
          </div>
        </div>

        <SoundwaveHistogram color="amber" peakIndex={35} />

        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-dash-text">312ms p99</span>
          <span className="text-[11px] text-dash-muted">Last hour</span>
        </div>
      </div>

      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-dash-text tracking-tight">
            Open Incidents
          </span>
          <div className="w-6 h-6 rounded-full bg-[color:var(--status-crit-soft)] border border-[color:var(--status-crit)]/25 flex items-center justify-center text-[color:var(--status-crit)]">
            <Siren size={12} />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-dash-text leading-none tracking-tight">
              3
            </span>
            <span className="text-[11px] text-[color:var(--status-crit)] font-bold">▲</span>
          </div>
        </div>

        <SoundwaveHistogram color="rose" peakIndex={35} />

        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-dash-text">1 Critical</span>
          <span className="text-[11px] text-dash-muted">Active now</span>
        </div>
      </div>

      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-dash-text tracking-tight">
            Surfaces Monitored
          </span>
          <div className="w-6 h-6 rounded-full bg-[color:var(--status-info-soft)] border border-[color:var(--status-info)]/25 flex items-center justify-center text-[color:var(--status-info)]">
            <Activity size={12} />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-dash-text leading-none tracking-tight">
              48
            </span>
            <span className="text-[11px] text-[color:var(--status-ok)] font-bold">▲</span>
          </div>
        </div>

        <SoundwaveHistogram color="cyan" peakIndex={33} />

        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-dash-text">8 Regions</span>
          <span className="text-[11px] text-dash-muted">Edge mesh</span>
        </div>
      </div>
    </div>
  )
}
