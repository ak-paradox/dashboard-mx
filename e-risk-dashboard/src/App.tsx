import React from 'react'
import { Sidebar } from './components/Sidebar'
import { TopNavbar } from './components/TopNavbar'
import { HeaderTitle } from './components/HeaderTitle'
import { KpiCards } from './components/KpiCards'
import { EnvironmentalRiskMap } from './components/EnvironmentalRiskMap'
import { RiskExposureChart } from './components/RiskExposureChart'
import { PortfolioRiskTrendChart } from './components/PortfolioRiskTrendChart'
import { TopRiskRegions } from './components/TopRiskRegions'
import { IntelligenceInsight } from './components/IntelligenceInsight'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f3f5f8] flex text-[#111827] antialiased">
      {/* Left Vertical Dock Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Transparent Top Filter and Search Bar */}
        <TopNavbar />

        {/* Dashboard Content Container */}
        <main className="flex-1 px-8 pb-12 w-full max-w-[1720px] mx-auto">
          {/* Page Heading */}
          <HeaderTitle />

          {/* Main Grid Layout with Generous Spacing */}
          <div className="space-y-6">
            {/* Row 1: KPI Summary Cards */}
            <section aria-label="Key Performance Indicators">
              <KpiCards />
            </section>

            {/* Row 2: Maps and Analytics */}
            <section
              aria-label="Environmental Risk Map and Exposure Trends"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch"
            >
              {/* Environmental Risk Map (Left) */}
              <div className="xl:col-span-6 h-full">
                <EnvironmentalRiskMap />
              </div>

              {/* Risk Exposure Matrix (Center) */}
              <div className="xl:col-span-3 h-full">
                <RiskExposureChart />
              </div>

              {/* Portfolio Risk Trend (Right) */}
              <div className="xl:col-span-3 h-full">
                <PortfolioRiskTrendChart />
              </div>
            </section>

            {/* Row 3: Incidents & Intelligence */}
            <section
              aria-label="Top Risk Regions and Intelligence Insight"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Top Risk Regions (Left) */}
              <div className="lg:col-span-7 h-full">
                <TopRiskRegions />
              </div>

              {/* Intelligence Insight (Right) */}
              <div className="lg:col-span-5 h-full">
                <IntelligenceInsight />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
