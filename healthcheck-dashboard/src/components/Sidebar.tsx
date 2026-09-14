import React, { useState } from 'react'
import {
  Activity,
  LayoutGrid,
  Globe2,
  Layers,
  Bell,
  BarChart3,
  FileText,
  Database,
  Settings,
  Radio,
} from 'lucide-react'

const navItems = [
  { id: 'overview', icon: LayoutGrid, label: 'Status Board' },
  { id: 'mesh', icon: Globe2, label: 'Edge Mesh' },
  { id: 'services', icon: Layers, label: 'Services' },
  { id: 'alerts', icon: Bell, label: 'Incidents', badge: true },
  { id: 'analytics', icon: BarChart3, label: 'Latency' },
  { id: 'runbooks', icon: FileText, label: 'Runbooks' },
]

const bottomItems = [
  { id: 'probes', icon: Radio, label: 'Probes' },
  { id: 'data', icon: Database, label: 'Telemetry' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export const Sidebar: React.FC = () => {
  const [active, setActive] = useState('overview')

  return (
    <aside className="w-[72px] flex-shrink-0 bg-dash-rail border-r border-[color:var(--dash-rail-border)] flex flex-col items-center py-6 h-screen sticky top-0 z-40 select-none shadow-[var(--shadow-rail)]">
      <div className="mb-7 cursor-pointer hover:scale-105 transition-transform duration-200 relative">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle cx="14" cy="14" r="3.2" fill="var(--dash-accent)" className="animate-heartbeat" />
          <circle cx="14" cy="5.2" r="2.2" fill="var(--dash-text)" />
          <circle cx="21.6" cy="9.6" r="2.2" fill="var(--dash-text)" />
          <circle cx="21.6" cy="18.4" r="2.2" fill="var(--dash-text)" />
          <circle cx="14" cy="22.8" r="2.2" fill="var(--dash-text)" />
          <circle cx="6.4" cy="18.4" r="2.2" fill="var(--dash-text)" />
          <circle cx="6.4" cy="9.6" r="2.2" fill="var(--dash-text)" />
        </svg>
        <span className="sr-only">Pulsewire</span>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-2.5 w-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <div key={item.id} className="relative w-full flex justify-center group">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-7 bg-dash-text rounded-r-full" />
              )}

              <button
                onClick={() => setActive(item.id)}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-dash-soft text-dash-text shadow-sm'
                    : 'text-[color:var(--dash-icon)] hover:text-dash-text hover:bg-dash-soft'
                }`}
                title={item.label}
                type="button"
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.badge && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[color:var(--status-crit)] rounded-full ring-2 ring-[color:var(--dash-rail)]" />
                )}
              </button>

              <div className="absolute left-[70px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1e293b] text-white text-[11px] font-medium rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 w-full pt-4 border-t border-[color:var(--dash-border)]">
        <div className="mb-1 flex items-center justify-center text-[color:var(--dash-accent)]" title="Live probes">
          <Activity size={16} className="animate-heartbeat" />
        </div>
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <div key={item.id} className="relative w-full flex justify-center group">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-7 bg-dash-text rounded-r-full" />
              )}
              <button
                onClick={() => setActive(item.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-dash-soft text-dash-text'
                    : 'text-[color:var(--dash-icon)] hover:text-dash-text hover:bg-dash-soft'
                }`}
                title={item.label}
                type="button"
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
