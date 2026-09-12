import React from 'react'
import { AlertTriangle, Zap, Bell, Globe } from 'lucide-react'

interface SoundwaveProps {
  color: 'amber' | 'rose' | 'cyan'
  peakIndex: number
}

const SoundwaveHistogram: React.FC<SoundwaveProps> = ({ color, peakIndex }) => {
  const palette = {
    amber: {
      bar: '#f59e0b',
      peakDot: '#d97706',
      glow: 'rgba(245, 158, 11, 0.4)',
      faint: 'rgba(251, 191, 36, 0.15)',
    },
    rose: {
      bar: '#f43f5e',
      peakDot: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.4)',
      faint: 'rgba(253, 164, 175, 0.15)',
    },
    cyan: {
      bar: '#06b6d4',
      peakDot: '#0ea5e9',
      glow: 'rgba(6, 182, 212, 0.4)',
      faint: 'rgba(103, 232, 249, 0.15)',
    },
  }[color]

  const totalBars = 38
  const heights = Array.from({ length: totalBars }, (_, i) => {
    const t = i / (totalBars - 1)
    // Smooth growth curve peaking near the end
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

        {/* Luminous Target Dot at Peak */}
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
      {/* Card 1: Portfolio Risk Score */}
      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div>
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">
            Portfolio Risk Score
          </span>
        </div>

        <div className="flex items-center justify-between my-auto">
          <div>
            <div className="flex items-baseline">
              <span className="text-[34px] font-bold text-[#dc2626] leading-none tracking-tight">
                72
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1">/100</span>
            </div>
            <span className="text-xs font-bold text-[#dc2626] mt-1 block">
              High Risk
            </span>
          </div>

          {/* Radial Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#fee2e2"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#dc2626"
                strokeWidth="5"
                fill="none"
                strokeDasharray="163.36"
                strokeDashoffset={163.36 * (1 - 0.72)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shadow-sm">
                <AlertTriangle size={14} className="text-[#dc2626]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trend */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#e11d48]">
          <Zap size={12} className="fill-[#e11d48] text-[#e11d48]" />
          <span>8.4% vs. previous period</span>
        </div>
      </div>

      {/* Card 2: High-Risk Assets */}
      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">
            High-Risk Assets
          </span>
          <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500">
            <Bell size={12} className="fill-amber-500/20" />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-slate-900 leading-none tracking-tight">
              75%
            </span>
            <span className="text-[11px] text-amber-500 font-bold">▲</span>
          </div>
        </div>

        {/* Golden Soundwave Bars */}
        <SoundwaveHistogram color="amber" peakIndex={35} />

        {/* Bottom stats */}
        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-slate-900">18 High</span>
          <span className="text-[11px] text-slate-400">This month</span>
        </div>
      </div>

      {/* Card 3: Active Alerts */}
      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">
            Active Alerts
          </span>
          <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-500">
            <Bell size={12} className="fill-rose-500/20" />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-slate-900 leading-none tracking-tight">
              75%
            </span>
            <span className="text-[11px] text-rose-500 font-bold">▲</span>
          </div>
        </div>

        {/* Rose Soundwave Bars */}
        <SoundwaveHistogram color="rose" peakIndex={35} />

        {/* Bottom stats */}
        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-slate-900">3 Critical</span>
          <span className="text-[11px] text-slate-400">This month</span>
        </div>
      </div>

      {/* Card 4: Monitored Assets */}
      <div className="dashboard-card p-6 flex flex-col justify-between h-[195px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">
            Monitored Assets
          </span>
          <div className="w-6 h-6 rounded-full bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-500">
            <Globe size={12} />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold text-slate-900 leading-none tracking-tight">
              60%
            </span>
            <span className="text-[11px] text-sky-500 font-bold">▲</span>
          </div>
        </div>

        {/* Cyan Soundwave Bars */}
        <SoundwaveHistogram color="cyan" peakIndex={33} />

        {/* Bottom stats */}
        <div className="flex items-baseline justify-end gap-1.5 text-right">
          <span className="text-xs font-bold text-slate-900">42 Regions</span>
          <span className="text-[11px] text-slate-400">This month</span>
        </div>
      </div>
    </div>
  )
}
