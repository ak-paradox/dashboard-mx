import React, { useState } from 'react'
import {
  LayoutGrid,
  Map,
  Box,
  Bell,
  BarChart3,
  FileText,
  Database,
  Settings,
} from 'lucide-react'

const navItems = [
  { id: 'overview', icon: LayoutGrid, label: 'Overview' },
  { id: 'map', icon: Map, label: 'Risk Map' },
  { id: 'assets', icon: Box, label: 'Assets' },
  { id: 'alerts', icon: Bell, label: 'Alerts', badge: true },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' },
]

const bottomItems = [
  { id: 'data', icon: Database, label: 'Data Management' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export const Sidebar: React.FC = () => {
  const [active, setActive] = useState('overview')

  return (
    <aside className="w-[72px] flex-shrink-0 bg-white border-r border-slate-200/70 flex flex-col items-center py-6 h-screen sticky top-0 z-40 select-none shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
      {/* Brand Hex-Cluster Logo */}
      <div className="mb-7 cursor-pointer hover:scale-105 transition-transform duration-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="3.2" fill="#111827" />
          <circle cx="14" cy="5.2" r="2.2" fill="#111827" />
          <circle cx="21.6" cy="9.6" r="2.2" fill="#111827" />
          <circle cx="21.6" cy="18.4" r="2.2" fill="#111827" />
          <circle cx="14" cy="22.8" r="2.2" fill="#111827" />
          <circle cx="6.4" cy="18.4" r="2.2" fill="#111827" />
          <circle cx="6.4" cy="9.6" r="2.2" fill="#111827" />
        </svg>
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 flex flex-col items-center gap-2.5 w-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <div key={item.id} className="relative w-full flex justify-center group">
              {/* Active Indicator Bar on Left Edge */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-7 bg-[#111827] rounded-r-full transition-all" />
              )}

              <button
                onClick={() => setActive(item.id)}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#f1f3f6] text-[#111827] shadow-sm font-semibold'
                    : 'text-[#8c9ba8] hover:text-[#111827] hover:bg-[#f8fafc]'
                }`}
                title={item.label}
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />

                {item.badge && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Tooltip on Hover */}
              <div className="absolute left-[70px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1e293b] text-white text-[11px] font-medium rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Bottom Nav Items */}
      <div className="flex flex-col items-center gap-2 w-full pt-4 border-t border-slate-100">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <div key={item.id} className="relative w-full flex justify-center group">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-7 bg-[#111827] rounded-r-full" />
              )}

              <button
                onClick={() => setActive(item.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#f1f3f6] text-[#111827]'
                    : 'text-[#8c9ba8] hover:text-[#111827] hover:bg-[#f8fafc]'
                }`}
                title={item.label}
              >
                <Icon size={19} strokeWidth={1.8} />
              </button>

              <div className="absolute left-[70px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1e293b] text-white text-[11px] font-medium rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
