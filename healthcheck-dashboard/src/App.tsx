import React, { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopNavbar } from './components/TopNavbar'
import { HeaderTitle } from './components/HeaderTitle'
import { KpiCards } from './components/KpiCards'
import { EdgeMeshMap } from './components/EdgeMeshMap'
import { ServiceConstellation } from './components/ServiceConstellation'
import { LatencyTrendChart } from './components/LatencyTrendChart'
import { IncidentFeed } from './components/IncidentFeed'
import { CascadeInsight } from './components/CascadeInsight'
import { VendorBeaconRail } from './components/VendorBeaconRail'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('pulsewire-theme')
    return stored === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pulsewire-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export const App: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-dash-bg flex text-dash-text antialiased">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <TopNavbar theme={theme} setTheme={setTheme} />

        <main className="flex-1 px-8 pb-12 w-full max-w-[1720px] mx-auto">
          <HeaderTitle />
          <VendorBeaconRail />

          <div className="space-y-6 mt-6">
            <section aria-label="Healthcheck KPIs">
              <KpiCards />
            </section>

            <section
              aria-label="Edge mesh, service constellation, and latency"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch"
            >
              <div className="xl:col-span-6 h-full">
                <EdgeMeshMap />
              </div>
              <div className="xl:col-span-3 h-full">
                <ServiceConstellation />
              </div>
              <div className="xl:col-span-3 h-full">
                <LatencyTrendChart />
              </div>
            </section>

            <section
              aria-label="Incidents and cascade intelligence"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              <div className="lg:col-span-7 h-full">
                <IncidentFeed />
              </div>
              <div className="lg:col-span-5 h-full">
                <CascadeInsight />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
