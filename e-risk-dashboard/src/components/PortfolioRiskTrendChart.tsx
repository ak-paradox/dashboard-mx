import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const PortfolioRiskTrendChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('12 months')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activePointIndex, setActivePointIndex] = useState<number | null>(4) // Default to May (index 4)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  // Spline points for the jagged risk trend line
  const linePoints = [
    { month: 'Jan', value: 38, x: 22, y: 154 },
    { month: 'Feb', value: 44, x: 68, y: 140 },
    { month: 'Mar', value: 52, x: 114, y: 124 },
    { month: 'Apr', value: 49, x: 160, y: 130 },
    { month: 'May', value: 76, x: 206, y: 70 }, // The Peak
    { month: 'Jun', value: 65, x: 252, y: 96 },
    { month: 'Jul', value: 72, x: 298, y: 80 },
    { month: 'Aug', value: 84, x: 342, y: 52 },
  ]

  // Dense vertical histogram needles in background
  const needleCount = 64
  const needles = Array.from({ length: needleCount }, (_, i) => {
    const norm = i / (needleCount - 1)
    const x = 16 + norm * 332
    const distToPeak = Math.abs(i - 36)
    const peakEffect = Math.max(0, 1 - distToPeak / 16)
    const baseline = 0.2 + 0.52 * norm + Math.sin(i * 0.8) * 0.07
    const height = Math.min(0.92, baseline + peakEffect * 0.38)
    const isPeakArea = i >= 31 && i <= 43

    return { x, height, isPeakArea }
  })

  // Smooth SVG path generation for the spline
  const pathD = `
    M ${linePoints[0].x} ${linePoints[0].y}
    Q 45 147, ${linePoints[1].x} ${linePoints[1].y}
    Q 91 132, ${linePoints[2].x} ${linePoints[2].y}
    Q 137 127, ${linePoints[3].x} ${linePoints[3].y}
    Q 183 102, ${linePoints[4].x} ${linePoints[4].y}
    Q 229 83, ${linePoints[5].x} ${linePoints[5].y}
    Q 275 88, ${linePoints[6].x} ${linePoints[6].y}
    Q 320 66, ${linePoints[7].x} ${linePoints[7].y}
  `

  const activePoint = activePointIndex !== null ? linePoints[activePointIndex] : linePoints[4]

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full min-h-[420px] relative">
      {/* Header with 12 months dropdown */}
      <div className="flex items-center justify-between z-10">
        <h2 className="text-[14px] font-semibold text-slate-800 tracking-tight">
          Portfolio Risk Trend
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium py-1 px-2.5 rounded-lg hover:bg-slate-50 border border-slate-200/60 transition-colors"
          >
            <span>{selectedRange}</span>
            <ChevronDown size={13} />
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1 z-40 text-xs animate-in fade-in">
                {['3 months', '6 months', '12 months', 'All time'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative flex-1 w-full my-3 flex flex-col justify-end">
        <div className="relative w-full h-[195px] overflow-visible">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 360 195">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="60%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>

              <linearGradient id="peakNeedleGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(244,63,94,0.08)" />
                <stop offset="100%" stopColor="rgba(225,29,72,0.6)" />
              </linearGradient>
            </defs>

            {/* Background Needles (Soundwave / Barcode effect) */}
            {needles.map((n, i) => {
              const y1 = 172
              const y2 = 172 - n.height * 128
              const isPeak = n.isPeakArea

              return (
                <line
                  key={i}
                  x1={n.x}
                  y1={y1}
                  x2={n.x}
                  y2={y2}
                  stroke={isPeak ? 'url(#peakNeedleGrad)' : '#f1f5f9'}
                  strokeWidth={isPeak ? 1.6 : 1.2}
                  strokeLinecap="round"
                />
              )
            })}

            {/* Smooth Spline Trend Line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#trendGradient)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points along the line */}
            {linePoints.map((pt, idx) => {
              const isHovered = activePointIndex === idx
              return (
                <circle
                  key={pt.month}
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 2.8}
                  fill={isHovered ? '#e11d48' : '#ffffff'}
                  stroke="#e11d48"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setActivePointIndex(idx)}
                />
              )
            })}

            {/* Target Ring Highlight at the Active Point (May) */}
            {activePoint && (
              <g>
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="10"
                  fill="rgba(225,29,72,0.15)"
                  className="animate-ping"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="6"
                  fill="#ffffff"
                  stroke="#e11d48"
                  strokeWidth="3"
                />
              </g>
            )}
          </svg>

          {/* Floating Tooltip Box pointing to Active Point */}
          {activePoint && (
            <div
              className="absolute bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 pointer-events-none z-20"
              style={{
                left: `${(activePoint.x / 360) * 100}%`,
                top: `${activePoint.y - 48}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e11d48]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                <span>Risk Up 12.6%</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Over 90 Days</span>
              </div>
            </div>
          )}

          {/* X Axis Month Labels */}
          <div className="flex justify-between px-2 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
            {months.map((m, idx) => (
              <span
                key={m}
                onClick={() => setActivePointIndex(idx)}
                className={`cursor-pointer transition-colors ${
                  activePointIndex === idx ? 'text-slate-900 font-bold' : 'hover:text-slate-700'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Summary Insight Text */}
      <div className="pt-3 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-900">
          Risk exposure increased 12.6% over 90 days.
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
          Flood and heat exposure drive most of the increase.
        </p>
      </div>
    </div>
  )
}
