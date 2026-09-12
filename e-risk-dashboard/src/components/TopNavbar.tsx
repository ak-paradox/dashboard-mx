import React, { useState } from 'react'
import { Search, ChevronDown, Share2, Download, Bell } from 'lucide-react'

export const TopNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const filters = [
    {
      id: 'region',
      label: 'All Regions',
      options: ['All Regions', 'Southeast Asia', 'Southern Europe', 'Northern Africa', 'North America', 'South America'],
    },
    {
      id: 'assets',
      label: 'All Assets',
      options: ['All Assets', 'Data Centers', 'Manufacturing Plants', 'Logistics Hubs', 'Energy Facilities'],
    },
    {
      id: 'risk',
      label: 'All Risk Type',
      options: ['All Risk Type', 'Flood Risk', 'Extreme Heat', 'Water Stress', 'Wildfire Exposure'],
    },
    {
      id: 'date',
      label: 'Last 30 Days',
      options: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last 12 Months'],
    },
  ]

  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    region: 'All Regions',
    assets: 'All Assets',
    risk: 'All Risk Type',
    date: 'Last 30 Days',
  })

  return (
    /* Completely transparent top bar - no white background, no border-bottom */
    <div className="w-full pt-6 pb-1 px-8 flex flex-wrap items-center justify-between gap-4 bg-transparent select-none">
      {/* Left: Floating Search Capsule */}
      <div className="relative w-64 lg:w-72">
        <div className="relative flex items-center bg-white rounded-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <Search className="absolute left-3.5 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-9 pr-4 text-[13px] bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Floating Filter Pills & Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Dropdown Filters */}
        {filters.map((f) => (
          <div key={f.id} className="relative hidden md:block">
            <button
              onClick={() => setActiveDropdown(activeDropdown === f.id ? null : f.id)}
              className="h-10 px-3.5 bg-white border border-slate-200/80 rounded-xl text-[12px] font-medium text-slate-700 flex items-center gap-2 hover:bg-slate-50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
            >
              <span>{filterValues[f.id]}</span>
              <ChevronDown size={13} className="text-slate-400 transition-transform duration-200" />
            </button>

            {activeDropdown === f.id && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in zoom-in-95">
                  {f.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFilterValues((prev) => ({ ...prev, [f.id]: opt }))
                        setActiveDropdown(null)
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[12px] font-medium transition-colors ${
                        filterValues[f.id] === opt
                          ? 'text-slate-900 bg-slate-50 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
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

        {/* Share Button */}
        <button
          className="h-10 px-4 bg-white border border-slate-200/80 rounded-xl text-[12px] font-medium text-slate-700 flex items-center gap-2 hover:bg-slate-50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
          title="Share Dashboard"
        >
          <span>Share</span>
          <Share2 size={13} className="text-slate-400" />
        </button>

        {/* Export Button (Dark Pill) */}
        <button
          className="h-10 px-4 bg-[#18181b] text-white rounded-xl text-[12px] font-medium flex items-center gap-2 hover:bg-[#27272a] shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all active:scale-95"
          title="Export Report"
        >
          <span>Export</span>
          <Download size={13} />
        </button>

        {/* Notification Bell Button */}
        <button
          className="relative w-10 h-10 bg-white border border-slate-200/80 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
          title="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* User Profile Avatar */}
        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer hover:scale-105 transition-transform ml-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
