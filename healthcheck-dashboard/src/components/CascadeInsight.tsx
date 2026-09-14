import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

export const CascadeInsight: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3 border-b border-[color:var(--dash-border)]">
        <h2 className="text-[14px] font-semibold text-dash-text tracking-tight">
          Cascade Intelligence
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-[color:var(--dash-accent)] hover:opacity-80 flex items-center gap-1 group transition-opacity"
        >
          <span>View Forecast</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="pt-2">
        <p className="text-xs font-medium text-dash-text leading-relaxed">
          NRT Application API outage is cascading into MuleSoft queue depth — Salesforce writes
          delayed by ~4.2 minutes across APAC.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 py-2 flex-1">
        <div className="flex flex-col gap-5 pl-1">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[color:var(--status-ok-soft)] border border-[color:var(--status-ok)]/30 flex items-center justify-center text-[color:var(--status-ok)] shadow-sm flex-shrink-0">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[color:var(--status-ok)] tracking-tight leading-none">
                91%
              </div>
              <div className="text-[11px] text-dash-muted font-medium mt-1">Confidence</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[color:var(--status-crit-soft)] border border-[color:var(--status-crit)]/30 flex items-center justify-center text-[color:var(--status-crit)] shadow-sm flex-shrink-0">
              <AlertTriangle size={19} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[color:var(--status-crit)] tracking-tight leading-none">
                High
              </div>
              <div className="text-[11px] text-dash-muted font-medium mt-1">Blast Radius</div>
            </div>
          </div>
        </div>

        <div
          className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center cursor-pointer select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            <defs>
              <radialGradient id="cascadeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="coreSphere" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#34d399" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.55" />
              </radialGradient>
            </defs>

            <circle cx="100" cy="100" r="88" fill="url(#cascadeGlow)" />
            <g className="animate-spin-slow origin-center" style={{ transformOrigin: '100px 100px' }}>
              {[72, 56, 40].map((r, i) => (
                <circle
                  key={r}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke={i === 0 ? '#f43f5e' : i === 1 ? '#10b981' : '#0ea5e9'}
                  strokeWidth="1.2"
                  strokeDasharray={`${8 + i * 4} ${6 + i * 2}`}
                  opacity={0.55}
                />
              ))}
            </g>
            <g
              className="animate-spin-reverse origin-center"
              style={{ transformOrigin: '100px 100px' }}
            >
              {[64, 48].map((r) => (
                <circle
                  key={r}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.6"
                  strokeDasharray="2 10"
                  opacity="0.4"
                />
              ))}
            </g>

            <circle
              cx="100"
              cy="100"
              r={isHovered ? 28 : 24}
              fill="url(#coreSphere)"
              className="transition-all duration-300"
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 16px rgba(16,185,129,0.55))'
                  : 'drop-shadow(0 0 10px rgba(14,165,233,0.35))',
              }}
            />
            <text
              x="100"
              y="104"
              textAnchor="middle"
              className="fill-[color:var(--dash-text)]"
              style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}
            >
              RCA
            </text>

            {/* Orbiting vendor ticks */}
            {[
              { a: 20, label: 'API' },
              { a: 95, label: 'MS' },
              { a: 170, label: 'SF' },
              { a: 250, label: 'CF' },
            ].map((t) => {
              const rad = (t.a * Math.PI) / 180
              const x = 100 + Math.cos(rad) * 70
              const y = 100 + Math.sin(rad) * 70
              return (
                <g key={t.label}>
                  <circle cx={x} cy={y} r="8" fill="var(--dash-card)" stroke="var(--dash-border)" />
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    style={{ fontSize: 7, fontWeight: 700, fill: 'var(--dash-muted)' }}
                  >
                    {t.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-xl border border-[color:var(--dash-border)] bg-dash-soft/50 px-3.5 py-3 text-[11px] text-dash-muted leading-relaxed">
        <span className="font-bold text-dash-text">Suggested action: </span>
        Fail open read path on NRT → FRA, pause non-critical MuleSoft consumers, page APAC on-call.
      </div>
    </div>
  )
}
