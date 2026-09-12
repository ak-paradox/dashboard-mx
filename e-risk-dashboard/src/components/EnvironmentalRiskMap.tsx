import React, { useState } from 'react'
import { Plus, Minus, Crosshair, ArrowUp, ArrowDown } from 'lucide-react'

interface Hotspot {
  id: number
  title: string
  region: string
  riskLevel: 'Critical' | 'High' | 'Moderate' | 'Low'
  score: number
  assets: number
  hazard: string
  x: number // percentage
  y: number // percentage
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    title: 'Southeast Asia Operations',
    region: 'East & Southeast Asia',
    riskLevel: 'Critical',
    score: 88,
    assets: 14,
    hazard: 'Flash Flood & Coastal Inundation',
    x: 68,
    y: 47,
  },
  {
    id: 2,
    title: 'Southern Europe Facilities',
    region: 'Mediterranean Basin',
    riskLevel: 'High',
    score: 74,
    assets: 8,
    hazard: '+4.2°C Thermal Anomaly',
    x: 52,
    y: 34,
  },
  {
    id: 3,
    title: 'North African Infrastructure',
    region: 'Sahara & Nile Basin',
    riskLevel: 'Moderate',
    score: 56,
    assets: 6,
    hazard: 'High Water Stress',
    x: 47,
    y: 52,
  },
  {
    id: 4,
    title: 'California West Coast',
    region: 'Pacific Southwest',
    riskLevel: 'High',
    score: 69,
    assets: 12,
    hazard: 'Wildfire Exposure',
    x: 88,
    y: 30,
  },
]

export const EnvironmentalRiskMap: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.2))
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.8))
  const handleReset = () => {
    setZoomLevel(1)
    setSelectedHotspot(null)
  }

  const activeSpot = hoveredHotspot || selectedHotspot

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full min-h-[420px] relative overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between z-10">
        <h2 className="text-[14px] font-semibold text-slate-800 tracking-tight">
          Environmental Risk Map
        </h2>
      </div>

      {/* Map Interactive Viewport */}
      <div className="relative flex-1 w-full my-3.5 rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/50 to-[#f8fafc] flex items-center justify-center min-h-[270px] overflow-hidden border border-slate-100">
        {/* Transform Container for Smooth Zoom */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Global Continents 3D Vector Terrain Canvas */}
          <div className="relative w-full max-w-[560px] aspect-[16/9]">
            <svg
              className="w-full h-full drop-shadow-sm"
              viewBox="0 0 900 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Topographic Emboss / Elevation Filter */}
                <filter id="terrain-relief" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
                  <feDropShadow dx="-1" dy="-1" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.6" />
                </filter>

                {/* Shading Gradients for Risk Continents */}
                {/* Asia / China / SE Asia: Glowing Crimson / Red 3D Relief */}
                <radialGradient id="risk-asia" cx="65%" cy="45%" r="42%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#dc2626" stopOpacity="0.9" />
                  <stop offset="85%" stopColor="#b91c1c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.75" />
                </radialGradient>

                {/* Europe / Mediterranean: Shaded Golden Olive / Amber */}
                <radialGradient id="risk-europe" cx="50%" cy="40%" r="45%">
                  <stop offset="0%" stopColor="#eab308" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#ca8a04" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#854d0e" stopOpacity="0.75" />
                </radialGradient>

                {/* Africa: Lush Cyan / Teal / Emerald Relief */}
                <radialGradient id="risk-africa" cx="45%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0d9488" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#115e59" stopOpacity="0.75" />
                </radialGradient>

                {/* Americas & Rest of World: Forest / Topographic Green */}
                <linearGradient id="risk-green" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#15803d" stopOpacity="0.75" />
                </linearGradient>

                {/* Topographic Contour Texture Pattern */}
                <pattern id="contour-lines" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20 Q10 15, 20 20 T40 20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  <path d="M0 35 Q10 30, 20 35 T40 35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* 3D Embossed Continents Group */}
              <g filter="url(#terrain-relief)">
                {/* North America */}
                <path
                  d="M110 90 C130 80, 180 75, 210 95 C230 110, 250 140, 220 170 C200 190, 185 220, 175 250 C165 240, 150 215, 140 200 C130 185, 115 150, 110 120 Z"
                  fill="url(#risk-green)"
                />
                <path
                  d="M110 90 C130 80, 180 75, 210 95 C230 110, 250 140, 220 170 C200 190, 185 220, 175 250 C165 240, 150 215, 140 200 C130 185, 115 150, 110 120 Z"
                  fill="url(#contour-lines)"
                />

                {/* South America */}
                <path
                  d="M200 270 C225 270, 250 290, 260 325 C265 355, 245 410, 220 440 C205 455, 195 430, 190 390 C185 350, 180 300, 200 270 Z"
                  fill="url(#risk-green)"
                  opacity="0.85"
                />

                {/* Europe - Olive / Amber Golden Risk Relief */}
                <path
                  d="M420 110 C460 100, 485 115, 495 145 C490 170, 465 195, 440 200 C415 195, 400 170, 410 140 C415 125, 418 115, 420 110 Z"
                  fill="url(#risk-europe)"
                />
                <path
                  d="M420 110 C460 100, 485 115, 495 145 C490 170, 465 195, 440 200 C415 195, 400 170, 410 140 C415 125, 418 115, 420 110 Z"
                  fill="url(#contour-lines)"
                />

                {/* Africa - Lush Cyan / Emerald Relief */}
                <path
                  d="M410 210 C460 210, 490 235, 495 275 C500 320, 480 375, 455 410 C435 430, 415 390, 400 340 C385 290, 385 235, 410 210 Z"
                  fill="url(#risk-africa)"
                />
                <path
                  d="M410 210 C460 210, 490 235, 495 275 C500 320, 480 375, 455 410 C435 430, 415 390, 400 340 C385 290, 385 235, 410 210 Z"
                  fill="url(#contour-lines)"
                />

                {/* Northern Asia */}
                <path
                  d="M500 90 C560 75, 660 70, 750 95 C770 120, 750 150, 710 165 C640 175, 550 180, 500 150 Z"
                  fill="url(#risk-green)"
                  opacity="0.9"
                />

                {/* Southeast Asia & China - Red / Coral High Risk Relief */}
                <path
                  d="M560 175 C620 160, 690 175, 730 220 C745 260, 715 305, 660 320 C610 330, 560 285, 545 235 C540 205, 545 185, 560 175 Z"
                  fill="url(#risk-asia)"
                />
                <path
                  d="M560 175 C620 160, 690 175, 730 220 C745 260, 715 305, 660 320 C610 330, 560 285, 545 235 C540 205, 545 185, 560 175 Z"
                  fill="url(#contour-lines)"
                />

                {/* Archipelagos */}
                <circle cx="680" cy="340" r="13" fill="url(#risk-asia)" />
                <circle cx="715" cy="355" r="10" fill="url(#risk-asia)" />
                <circle cx="650" cy="360" r="8" fill="url(#risk-asia)" />

                {/* Australia */}
                <path
                  d="M710 370 C755 365, 785 390, 780 430 C760 460, 715 460, 690 430 C675 405, 685 375, 710 370 Z"
                  fill="url(#risk-green)"
                  opacity="0.8"
                />
              </g>

              {/* Concentric Subtle Hazard Rings over Asia */}
              <circle cx="640" cy="245" r="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
              <circle cx="640" cy="245" r="110" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.2" />
            </svg>

            {/* Hotspot Pins Overlay */}
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id
              const isHovered = hoveredHotspot?.id === spot.id

              const badgeColors = {
                Critical: 'bg-[#dc2626] text-white border-white ring-rose-200',
                High: 'bg-[#ea580c] text-white border-white ring-amber-200',
                Moderate: 'bg-[#ca8a04] text-white border-white ring-yellow-200',
                Low: 'bg-[#16a34a] text-white border-white ring-emerald-200',
              }[spot.riskLevel]

              return (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer transition-transform duration-200 group"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected || isHovered ? 40 : 20,
                  }}
                  onMouseEnter={() => setHoveredHotspot(spot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  onClick={() => setSelectedHotspot(isSelected ? null : spot)}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing halo */}
                    <span
                      className={`absolute w-7 h-7 rounded-full opacity-35 animate-ping ${
                        spot.riskLevel === 'Critical' ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                    />
                    {/* Outer Badge */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 shadow-md flex items-center justify-center text-[11px] font-bold ring-2 transition-all duration-200 ${badgeColors} ${
                        isHovered || isSelected ? 'scale-125' : ''
                      }`}
                    >
                      {spot.id}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Floating Hotspot Details Popover */}
            {activeSpot && (
              <div
                className="absolute bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-200 text-left pointer-events-auto z-50 w-56 transition-all animate-in fade-in"
                style={{
                  left: `${activeSpot.x}%`,
                  top: `${Math.max(12, activeSpot.y - 18)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {activeSpot.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeSpot.riskLevel === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {activeSpot.riskLevel}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="font-semibold text-slate-800">{activeSpot.score} / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Threat:</span>
                    <span className="font-semibold text-slate-800">{activeSpot.hazard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exposed Assets:</span>
                    <span className="font-semibold text-slate-800">{activeSpot.assets} Units</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Zoom & Center Map Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-200/80 z-30">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            title="Zoom In"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            title="Zoom Out"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <div className="h-[1px] bg-slate-200 mx-1 my-0.5" />
          <button
            onClick={handleReset}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            title="Recenter Map"
          >
            <Crosshair size={13} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Floating Bottom Legend Pill */}
      <div className="pt-2 z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center gap-4 text-[11px] font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Low</span>
            <span className="text-slate-800 font-bold ml-0.5">18%</span>
            <ArrowUp size={11} className="text-[#10b981]" />
          </div>

          <div className="w-[1px] h-3.5 bg-slate-200" />

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span>Moderate</span>
            <span className="text-slate-800 font-bold ml-0.5">50%</span>
            <ArrowUp size={11} className="text-[#f59e0b]" />
          </div>

          <div className="w-[1px] h-3.5 bg-slate-200" />

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span>High</span>
            <span className="text-slate-800 font-bold ml-0.5">80%</span>
            <ArrowDown size={11} className="text-[#ef4444]" />
          </div>

          <div className="w-[1px] h-3.5 bg-slate-200" />

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
            <span>Critical</span>
            <span className="text-slate-800 font-bold ml-0.5">60%</span>
            <ArrowUp size={11} className="text-[#991b1b]" />
          </div>
        </div>
      </div>
    </div>
  )
}
