import React, { useState } from 'react'

interface ColumnData {
  id: number
  totalSlots: number
  activeCount: number
  colorType: 'gray' | 'orange' | 'green' | 'red' | 'cyan'
  tooltip: string
  value: string
}

export const RiskExposureChart: React.FC = () => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  const columns: ColumnData[] = [
    { id: 1, totalSlots: 13, activeCount: 5, colorType: 'gray', tooltip: 'Baseline Assets', value: '18 Units' },
    { id: 2, totalSlots: 13, activeCount: 6, colorType: 'gray', tooltip: 'Monitored Base', value: '21 Units' },
    { id: 3, totalSlots: 13, activeCount: 4, colorType: 'orange', tooltip: 'Supply Chain Nodes', value: '28 Units' },
    { id: 4, totalSlots: 13, activeCount: 7, colorType: 'orange', tooltip: 'Thermal Exposure', value: '42 Units' },
    { id: 5, totalSlots: 13, activeCount: 9, colorType: 'orange', tooltip: 'Flood Exposure', value: '54 Units' },
    { id: 6, totalSlots: 13, activeCount: 10, colorType: 'orange', tooltip: 'Coastal Threats', value: '62 Units' },
    { id: 7, totalSlots: 13, activeCount: 8, colorType: 'green', tooltip: 'Green Zone Units', value: '45 Units' },
    { id: 8, totalSlots: 13, activeCount: 7, colorType: 'green', tooltip: 'Protected Grids', value: '38 Units' },
    { id: 9, totalSlots: 13, activeCount: 5, colorType: 'green', tooltip: 'Energy Network', value: '30 Units' },
    { id: 10, totalSlots: 13, activeCount: 11, colorType: 'red', tooltip: 'Critical Flood Inundation', value: '78 Units' },
    { id: 11, totalSlots: 13, activeCount: 12, colorType: 'red', tooltip: 'Extreme Heatwave Stress', value: '89 Units' },
    { id: 12, totalSlots: 13, activeCount: 10, colorType: 'red', tooltip: 'Storm Surge Exposure', value: '71 Units' },
    { id: 13, totalSlots: 13, activeCount: 7, colorType: 'gray', tooltip: 'Secondary Facilities', value: '44 Units' },
    { id: 14, totalSlots: 13, activeCount: 8, colorType: 'gray', tooltip: 'Logistics Warehouses', value: '52 Units' },
    { id: 15, totalSlots: 13, activeCount: 6, colorType: 'cyan', tooltip: 'Water Reservoirs', value: '39 Units' },
    { id: 16, totalSlots: 13, activeCount: 7, colorType: 'cyan', tooltip: 'Desalination Plants', value: '48 Units' },
    { id: 17, totalSlots: 13, activeCount: 5, colorType: 'cyan', tooltip: 'Freshwater Basins', value: '33 Units' },
  ]

  const getColorClasses = (type: string, isActive: boolean) => {
    if (!isActive) return 'bg-[#e2e8f0]'
    switch (type) {
      case 'orange':
        return 'bg-[#ea580c] shadow-[0_0_6px_rgba(234,88,12,0.35)]'
      case 'green':
        return 'bg-[#16a34a] shadow-[0_0_6px_rgba(22,163,74,0.35)]'
      case 'red':
        return 'bg-[#dc2626] shadow-[0_0_6px_rgba(220,38,38,0.35)]'
      case 'cyan':
        return 'bg-[#0ea5e9] shadow-[0_0_6px_rgba(14,165,233,0.35)]'
      case 'gray':
      default:
        return 'bg-[#94a3b8]'
    }
  }

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full min-h-[420px] relative">
      {/* Card Header */}
      <div>
        <h2 className="text-[14px] font-semibold text-slate-800 tracking-tight">
          Risk Exposure
        </h2>
      </div>

      {/* Matrix Dot Grid Area */}
      <div className="relative flex-1 w-full my-4 flex items-center justify-center">
        <div className="flex items-end justify-between gap-1.5 sm:gap-2 w-full max-w-[340px] h-[210px] px-1">
          {columns.map((col) => {
            const isHovered = hoveredCol === col.id

            return (
              <div
                key={col.id}
                className="relative flex flex-col-reverse items-center gap-[4.5px] h-full justify-end cursor-pointer py-1"
                onMouseEnter={() => setHoveredCol(col.id)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                {/* Dots in column from bottom to top */}
                {Array.from({ length: col.totalSlots }, (_, slotIndex) => {
                  const isActive = slotIndex < col.activeCount
                  const colorClass = getColorClasses(col.colorType, isActive)

                  return (
                    <span
                      key={slotIndex}
                      className={`w-[6.5px] h-[6.5px] rounded-full transition-all duration-200 ${colorClass} ${
                        isHovered && isActive ? 'scale-125' : ''
                      }`}
                    />
                  )
                })}

                {/* Interactive Tooltip Card */}
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none transition-all animate-in fade-in">
                    <div className="font-semibold">{col.tooltip}</div>
                    <div className="text-slate-300 flex justify-between gap-2 mt-0.5">
                      <span>Exposed:</span>
                      <span className="font-bold text-emerald-400">{col.value}</span>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Legend Tags */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-3.5 text-[11px] font-medium text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
          <span>High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
          <span>Moderate</span>
        </div>
      </div>
    </div>
  )
}
