import React, { useState } from 'react'
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Flame,
  ArrowRight,
} from 'lucide-react'

interface Incident {
  id: string
  title: string
  location: string
  badgeText: string
  badgeVariant: 'red' | 'green' | 'cyan' | 'amber'
  timeAgo: string
  iconType: 'flood' | 'heat' | 'water' | 'wildfire'
}

export const TopRiskRegions: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  const incidents: Incident[] = [
    {
      id: 'inc-1',
      title: 'Flood Risk Increased',
      location: 'Asset #2841 • Southeast Asia',
      badgeText: 'Medium - High',
      badgeVariant: 'red',
      timeAgo: '12 min ago',
      iconType: 'flood',
    },
    {
      id: 'inc-2',
      title: 'Extreme Heat Detected',
      location: 'Southern Europe',
      badgeText: '+4.2°C Anomaly',
      badgeVariant: 'green',
      timeAgo: '12 min ago',
      iconType: 'heat',
    },
    {
      id: 'inc-3',
      title: 'Water Stress Increasing',
      location: 'Northern Africa',
      badgeText: '+18% Exposure',
      badgeVariant: 'cyan',
      timeAgo: '12 min ago',
      iconType: 'water',
    },
    {
      id: 'inc-4',
      title: 'Wildfire Exposure Detected',
      location: 'California Portfolio',
      badgeText: '12 Assets Affected',
      badgeVariant: 'amber',
      timeAgo: '12 min ago',
      iconType: 'wildfire',
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm flex-shrink-0">
            <AlertTriangle size={15} />
          </div>
        )
      case 'heat':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm flex-shrink-0">
            <Thermometer size={15} />
          </div>
        )
      case 'water':
        return (
          <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 shadow-sm flex-shrink-0">
            <Droplets size={15} />
          </div>
        )
      case 'wildfire':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shadow-sm flex-shrink-0">
            <Flame size={15} />
          </div>
        )
      default:
        return null
    }
  }

  const getBadgeStyle = (variant: string) => {
    switch (variant) {
      case 'red':
        return 'bg-[#fef2f2] text-[#dc2626] border border-rose-200/60'
      case 'green':
        return 'bg-[#ecfdf5] text-[#16a34a] border border-emerald-200/60'
      case 'cyan':
        return 'bg-[#f0f9ff] text-[#0284c7] border border-sky-200/60'
      case 'amber':
        return 'bg-[#fffbeb] text-[#d97706] border border-amber-200/60'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <h2 className="text-[14px] font-semibold text-slate-800 tracking-tight">
          Top Risk Regions
        </h2>
        <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors">
          <span>View Details</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Incidents List */}
      <div className="divide-y divide-slate-50 flex-1 flex flex-col justify-around py-1">
        {incidents.map((item) => {
          const isSelected = selectedIncident === item.id

          return (
            <div
              key={item.id}
              onClick={() => setSelectedIncident(isSelected ? null : item.id)}
              className={`py-3.5 px-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-150 hover:bg-slate-50/80 ${
                isSelected ? 'bg-slate-50 ring-1 ring-slate-200' : ''
              }`}
            >
              {/* Left: Icon & Title & Location */}
              <div className="flex items-center gap-3.5 min-w-0">
                {getIcon(item.iconType)}

                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-slate-800 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate font-normal mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Right: Badge & Timestamp */}
              <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getBadgeStyle(
                    item.badgeVariant
                  )}`}
                >
                  {item.badgeText}
                </span>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
