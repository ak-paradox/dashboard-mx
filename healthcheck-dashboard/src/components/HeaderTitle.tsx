import React, { useEffect, useState } from 'react'

export const HeaderTitle: React.FC = () => {
  const [clock, setClock] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const stamp = clock.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  })

  return (
    <div className="pt-5 pb-2 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="live-beacon inline-flex items-center gap-2 rounded-full bg-[color:var(--status-ok-soft)] text-[color:var(--status-ok)] px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--status-ok)]" />
            Live mesh
          </span>
          <span className="text-[11px] font-semibold text-dash-muted tracking-widest uppercase">
            Pulsewire · UTC {stamp}
          </span>
        </div>
        <h1 className="text-[32px] sm:text-[36px] font-serif font-normal text-dash-text tracking-tight leading-tight">
          Healthcheck Status Overview
        </h1>
        <p className="text-[13.5px] text-dash-muted font-normal mt-1 tracking-wide max-w-2xl">
          Probe Application APIs and the SaaS spine — GitHub, Cloudflare, Atlassian, Salesforce,
          MuleSoft — as one living pulse.
        </p>
      </div>
    </div>
  )
}
