import React, { useState, useRef, useCallback } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { MetricCard } from './components/MetricCard';
import { RankGauge } from './components/RankGauge';
import { WeeklyFormSection } from './components/WeeklyFormSection';
import { MountainChart } from './components/MountainChart';
import { MetricData } from './types';
import { X } from 'lucide-react';

const initialMetrics: MetricData[] = [
  {
    id: 'succeed-sales',
    title: 'SUCCEED SALES',
    value: '65%',
    trend: { direction: 'down', value: '64%' },
    progress: 65,
    iconType: 'play',
  },
  {
    id: 'focus',
    title: 'FOCUS',
    value: '42%',
    trend: { direction: 'down', value: '39%' },
    progress: 42,
    iconType: 'target',
  },
  {
    id: 'ratio',
    title: 'RATIO',
    value: '1,8',
    trend: { direction: 'up', value: '1.9' },
    progress: 58,
    iconType: 'refresh',
  },
  {
    id: 'active-speed',
    title: 'IN PRODUCTION',
    value: '29%',
    trend: { direction: 'up', value: '31%' },
    progress: 29,
    iconType: 'activity',
  },
];

export const App: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>(initialMetrics);
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [glowIntensity, setGlowIntensity] = useState<'normal' | 'radiant' | 'subtle'>('normal');
  const [showMockupModal, setShowMockupModal] = useState<boolean>(false);

  // Mouse tilt for 3D stage
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!is3DMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: normY * -10, // Up/down tilt
      y: normX * 12,  // Left/right tilt
    });
  }, [is3DMode]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleUpdateValue = (id: string, newProgress: number) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          let formattedVal: string = `${newProgress}%`;
          if (m.id === 'ratio') {
            formattedVal = (1.0 + (newProgress / 100) * 1.5).toFixed(1).replace('.', ',');
          }
          return {
            ...m,
            progress: newProgress,
            value: formattedVal,
          };
        }
        return m;
      })
    );
  };

  const handleReset = () => {
    setMetrics(initialMetrics);
  };

  const glowFilterStyle =
    glowIntensity === 'radiant'
      ? 'filter-neon-glow'
      : glowIntensity === 'subtle'
      ? 'opacity-90'
      : '';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col items-center justify-start py-4 px-2 sm:px-6 relative overflow-x-hidden selection:bg-coral-500/40"
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-coral-500/[0.035] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Top Controls Bar */}
      <div className="w-full z-20">
        <HeaderNav
          is3DMode={is3DMode}
          setIs3DMode={setIs3DMode}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          glowIntensity={glowIntensity}
          setGlowIntensity={setGlowIntensity}
          onReset={handleReset}
          onOpenOriginalModal={() => setShowMockupModal(true)}
        />
      </div>

      {/* Mode Status Pill */}
      <div className="mb-2 z-10 flex items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
          Viewing Mode:
        </span>
        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
            is3DMode
              ? 'bg-coral-500/10 text-coral-400 border-coral-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {is3DMode ? '3D Isometric Perspective (Interactive Tilt)' : '2D Flat Production Dashboard'}
        </span>
      </div>

      {/* Presentation Stage */}
      <main
        className={`w-full max-w-6xl mx-auto flex items-center justify-center transition-all duration-700 z-10 ${
          is3DMode ? 'perspective-stage py-10 sm:py-16' : 'py-4'
        }`}
      >
        {/* Main Dashboard Slab */}
        <div
          style={
            is3DMode
              ? {
                  transform: `rotateX(${40 + tilt.x}deg) rotateY(${-10 + tilt.y}deg) rotateZ(20deg) scale(0.92)`,
                }
              : undefined
          }
          className={`w-full max-w-5xl rounded-[32px] p-6 sm:p-10 transition-all duration-500 bg-[#12141a]/90 backdrop-blur-2xl border border-white/[0.09] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.16)] ${
            is3DMode ? 'isometric-slab' : 'flat-slab'
          } ${glowFilterStyle}`}
        >
          {/* Top Row: Metric Cards + Rank Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center mb-8">
            {/* 4 KPI Cards */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <MetricCard
                  key={m.id}
                  data={m}
                  soundEnabled={soundEnabled}
                  onUpdateValue={handleUpdateValue}
                />
              ))}
            </div>

            {/* Right: Circular Rank Points Gauge */}
            <div className="md:col-span-3 flex justify-center items-center border-t md:border-t-0 md:border-l border-white/[0.06] pt-4 md:pt-0">
              <RankGauge soundEnabled={soundEnabled} />
            </div>
          </div>

          {/* Middle Section: "WEEKLY FORM" */}
          <div className="mb-6 border-t border-white/[0.05] pt-6">
            <WeeklyFormSection soundEnabled={soundEnabled} />
          </div>

          {/* Bottom Section: Hero Mountain Waveform Chart */}
          <div className="border-t border-white/[0.05] pt-4">
            <MountainChart soundEnabled={soundEnabled} />
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center py-6 text-xs text-slate-500 font-mono z-10">
        Re-created from high-fidelity mockup &middot; React 19, TypeScript &amp; Tailwind CSS &middot; Interactive SVG Splines
      </footer>

      {/* Original Mockup Modal */}
      {showMockupModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#12141c] rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Original Mockup Reference
              </h3>
              <button
                onClick={() => setShowMockupModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Mockup Reference"
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-xs text-slate-400 font-mono text-center">
              Target design: Isometric dark glassmorphism analytics dashboard with glowing mountain chart.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
