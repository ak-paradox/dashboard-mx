import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

export const IntelligenceInsight: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-[14px] font-semibold text-slate-800 tracking-tight">
          Intelligence Insight
        </h2>
        <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors">
          <span>View Intelligence</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Subtitle description */}
      <div className="pt-2">
        <p className="text-xs font-medium text-slate-700">
          Flood risk increased across 14 Southeast Asia assets.
        </p>
      </div>

      {/* Main Content Area: Left KPIs + Right Holographic Polar Orb */}
      <div className="flex items-center justify-between gap-4 py-2 flex-1">
        {/* Left Badges */}
        <div className="flex flex-col gap-5 pl-1">
          {/* 95% Confidence */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-emerald-600 tracking-tight leading-none">
                95%
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                Confidence
              </div>
            </div>
          </div>

          {/* High Potential Impact */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-sm flex-shrink-0">
              <AlertTriangle size={19} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#dc2626] tracking-tight leading-none">
                High
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                Potential Impact
              </div>
            </div>
          </div>
        </div>

        {/* Right: Holographic Polar Lens Orb Graphic */}
        <div
          className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center cursor-pointer select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            <defs>
              {/* Polar Gradient Rings */}
              <radialGradient id="polarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Core Chromatic Gradient */}
              <radialGradient id="coreSphere" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#fde047" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="85%" stopColor="#ef4444" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0.85" />
              </radialGradient>

              {/* Sweeping Conic/Angular Gradient */}
              <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="33%" stopColor="#f59e0b" />
                <stop offset="66%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Background Glow */}
            <circle cx="100" cy="100" r="90" fill="url(#polarGlow)" />

            {/* Orbiting Dotted Outer Ring */}
            <g className="animate-spin-slow">
              <circle
                cx="100"
                cy="100"
                r="82"
                stroke="#cbd5e1"
                strokeWidth="0.8"
                strokeDasharray="2 4"
                fill="none"
              />

              {/* Radiating particle clusters */}
              {Array.from({ length: 36 }, (_, i) => {
                const angle = (i * 10 * Math.PI) / 180
                const r = 88 + (i % 3) * 3
                const x = 100 + r * Math.cos(angle)
                const y = 100 + r * Math.sin(angle)
                const dotColor =
                  i < 9 ? '#f59e0b' : i < 18 ? '#10b981' : i < 27 ? '#06b6d4' : '#ef4444'

                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 4 === 0 ? 1.6 : 0.9}
                    fill={dotColor}
                    opacity={0.65}
                  />
                )
              })}
            </g>

            {/* 4 Directional Triangular Pointer Marks (N, S, E, W) */}
            <polygon points="100,16 97,22 103,22" fill="#eab308" />
            <polygon points="100,184 97,178 103,178" fill="#eab308" />
            <polygon points="16,100 22,97 22,103" fill="#ef4444" />
            <polygon points="184,100 178,97 178,103" fill="#10b981" />

            {/* Outer Concentric Lens Ring */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Intermediate Chromatic Arc Rings */}
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="url(#ringGrad1)"
              strokeWidth="4"
              strokeDasharray="280"
              strokeDashoffset={isHovered ? 40 : 80}
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
              className="transition-all duration-700 ease-out"
            />

            {/* Inner Emerald Ring */}
            <circle
              cx="100"
              cy="100"
              r="45"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.8"
            />

            {/* Inner Crimson Alert Ring */}
            <circle
              cx="100"
              cy="100"
              r="34"
              stroke="#ef4444"
              strokeWidth="2.2"
              fill="none"
              opacity="0.85"
            />

            {/* Central Holographic Multi-Color Core Orb */}
            <circle
              cx="100"
              cy="100"
              r="24"
              fill="url(#coreSphere)"
              className={`transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
              style={{ transformOrigin: 'center' }}
            />

            {/* Core specular highlight */}
            <circle
              cx="93"
              cy="93"
              r="6"
              fill="#ffffff"
              opacity="0.7"
              filter="blur(1px)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
