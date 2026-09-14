import React, { useState } from 'react'
import { Search, ChevronDown, Share2, Download, Bell, Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  setTheme: (t: Theme) => void
}

export const TopNavbar: React.FC<Props> = ({ theme, setTheme }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const filters = [
    {
      id: 'region',
      label: 'All Regions',
      options: ['All Regions', 'US-East', 'US-West', 'EU-West', 'EU-Central', 'APAC', 'LATAM'],
    },
    {
      id: 'surface',
      label: 'All Surfaces',
      options: [
        'All Surfaces',
        'Application APIs',
        'GitHub',
        'Cloudflare',
        'Atlassian',
        'Salesforce',
        'MuleSoft',
      ],
    },
    {
      id: 'status',
      label: 'All Status',
      options: ['All Status', 'Operational', 'Degraded', 'Outage', 'Maintenance'],
    },
    {
      id: 'date',
      label: 'Last 24 Hours',
      options: ['Last 1 Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'],
    },
  ]

  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    region: 'All Regions',
    surface: 'All Surfaces',
    status: 'All Status',
    date: 'Last 24 Hours',
  })

  return (
    <div className="w-full pt-6 pb-1 px-8 flex flex-wrap items-center justify-between gap-4 bg-transparent select-none">
      <div className="relative w-64 lg:w-72">
        <div className="relative flex items-center bg-dash-card rounded-xl border border-[color:var(--dash-border)] shadow-pill hover:border-[color:var(--dash-muted)] transition-all">
          <Search className="absolute left-3.5 text-dash-muted" size={15} />
          <input
            type="text"
            placeholder="Search probes, services…"
            className="w-full h-10 pl-9 pr-4 text-[13px] bg-transparent text-dash-text placeholder:text-dash-muted focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {filters.map((f) => (
          <div key={f.id} className="relative hidden md:block">
            <button
              onClick={() => setActiveDropdown(activeDropdown === f.id ? null : f.id)}
              className="h-10 px-3.5 bg-dash-card border border-[color:var(--dash-border)] rounded-xl text-[12px] font-medium text-dash-text flex items-center gap-2 hover:bg-dash-soft shadow-pill transition-all"
              type="button"
            >
              <span>{filterValues[f.id]}</span>
              <ChevronDown size={13} className="text-dash-muted" />
            </button>

            {activeDropdown === f.id && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                <div className="absolute right-0 mt-1.5 w-48 bg-dash-card border border-[color:var(--dash-border)] rounded-xl shadow-card py-1.5 z-50">
                  {f.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFilterValues((prev) => ({ ...prev, [f.id]: opt }))
                        setActiveDropdown(null)
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[12px] font-medium transition-colors ${
                        filterValues[f.id] === opt
                          ? 'text-dash-text bg-dash-soft font-semibold'
                          : 'text-dash-muted hover:bg-dash-soft hover:text-dash-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        <div className="theme-toggle" role="group" aria-label="Colour theme">
          <button
            type="button"
            aria-pressed={theme === 'light'}
            aria-label="Light mode"
            onClick={() => setTheme('light')}
          >
            <Sun size={15} />
          </button>
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            aria-label="Dark mode"
            onClick={() => setTheme('dark')}
          >
            <Moon size={15} />
          </button>
        </div>

        <button
          className="h-10 px-4 bg-dash-card border border-[color:var(--dash-border)] rounded-xl text-[12px] font-medium text-dash-text flex items-center gap-2 hover:bg-dash-soft shadow-pill transition-all"
          title="Share status page"
          type="button"
        >
          <span>Share</span>
          <Share2 size={13} className="text-dash-muted" />
        </button>

        <button
          className="h-10 px-4 bg-dash-ink text-[color:var(--dash-bg)] rounded-xl text-[12px] font-medium flex items-center gap-2 hover:opacity-90 shadow-pill transition-all active:scale-95"
          title="Export incident report"
          type="button"
        >
          <span>Export</span>
          <Download size={13} />
        </button>

        <button
          className="relative w-10 h-10 bg-dash-card border border-[color:var(--dash-border)] rounded-xl flex items-center justify-center text-dash-muted hover:bg-dash-soft shadow-pill transition-all"
          title="Notifications"
          type="button"
        >
          <Bell size={16} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[color:var(--status-crit)] rounded-full ring-2 ring-[color:var(--dash-card)] animate-pulse" />
        </button>

        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[color:var(--dash-card)] shadow-pill cursor-pointer hover:scale-105 transition-transform ml-1 bg-dash-soft flex items-center justify-center text-[11px] font-bold text-dash-accent">
          SRE
        </div>
      </div>
    </div>
  )
}
