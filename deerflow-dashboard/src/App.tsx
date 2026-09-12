import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// 12 Cards
import { AgentStatusCard } from './components/cards/AgentStatusCard';
import { ClaudeCodexCard } from './components/cards/ClaudeCodexCard';
import { DeviceOverviewCard } from './components/cards/DeviceOverviewCard';
import { TeslaStatusCard } from './components/cards/TeslaStatusCard';
import { PharmaTrackCard } from './components/cards/PharmaTrackCard';
import { MedicalMonitorCard } from './components/cards/MedicalMonitorCard';
import { BioSensorCard } from './components/cards/BioSensorCard';
import { WordPlayCard } from './components/cards/WordPlayCard';
import { RetailAnalyticsCard } from './components/cards/RetailAnalyticsCard';
import { EntertainmentCard } from './components/cards/EntertainmentCard';
import { GameZoneCard } from './components/cards/GameZoneCard';
import { VisionAICard } from './components/cards/VisionAICard';

export const App: React.FC = () => {
  // Theme state: defaults to 'dark' matching reference image
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('deerflow_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);

  // Sync theme with HTML class and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('deerflow_theme', theme);
  }, [theme]);

  // Initial reference telemetry data
  const [agentData, setAgentData] = useState({
    status: 'THINKING...' as const,
    steps: 128,
    tools: 12,
    memory: 98,
  });

  const [claudeData, setClaudeData] = useState({
    tokens: '12.4K',
    requests: 24,
    growth: '+18%',
  });

  const [deviceData, setDeviceData] = useState({
    totalDevices: 128,
    onlinePct: 96,
    offlinePct: 4,
    alerts: 2,
  });

  const [teslaData, setTeslaData] = useState({
    model: 'Model 3',
    batteryPct: 78,
    rangeKm: 312,
    isLocked: true,
    status: 'PARKED' as const,
  });

  const [pharmaData, setPharmaData] = useState({
    compound: 'COMPOUND AI-07',
    phase: 'PHASE II',
    currentStep: 2,
    totalSteps: 4,
    progressPct: 66,
  });

  const [medicalData, setMedicalData] = useState({
    hrBpm: 72,
    spo2Pct: 98,
    tempCelsius: 36.6,
    status: 'STABLE' as const,
  });

  const [bioData, setBioData] = useState({
    moisturePct: 64,
    lightLux: 420,
  });

  const [wordData, setWordData] = useState({
    word: 'CODE',
    revealed: ['C', ' ', 'D', 'E'],
    missingIndex: 1,
    score: 720,
    streak: 12,
  });

  const [retailData, setRetailData] = useState({
    visitors: '1.28K',
    isLive: true,
    salesGrowth: '+$23%',
  });

  const [entertainmentData, setEntertainmentData] = useState({
    isPlaying: false,
    trackName: 'SYNTHWAVE_01',
    artist: 'DEERFLOW',
    volume: 80,
  });

  const [gameData, setGameData] = useState({
    score: 8920,
    lives: 2,
    maxLives: 3,
  });

  const [visionData, setVisionData] = useState({
    isRecording: true,
    objectsCount: 3,
    confidencePct: 92,
  });

  const resetTelemetry = () => {
    setAgentData({ status: 'THINKING...', steps: 128, tools: 12, memory: 98 });
    setClaudeData({ tokens: '12.4K', requests: 24, growth: '+18%' });
    setDeviceData({ totalDevices: 128, onlinePct: 96, offlinePct: 4, alerts: 2 });
    setTeslaData({ model: 'Model 3', batteryPct: 78, rangeKm: 312, isLocked: true, status: 'PARKED' });
    setPharmaData({ compound: 'COMPOUND AI-07', phase: 'PHASE II', currentStep: 2, totalSteps: 4, progressPct: 66 });
    setMedicalData({ hrBpm: 72, spo2Pct: 98, tempCelsius: 36.6, status: 'STABLE' });
    setBioData({ moisturePct: 64, lightLux: 420 });
    setWordData({ word: 'CODE', revealed: ['C', ' ', 'D', 'E'], missingIndex: 1, score: 720, streak: 12 });
    setRetailData({ visitors: '1.28K', isLive: true, salesGrowth: '+$23%' });
    setEntertainmentData({ isPlaying: false, trackName: 'SYNTHWAVE_01', artist: 'DEERFLOW', volume: 80 });
    setGameData({ score: 8920, lives: 2, maxLives: 3 });
    setVisionData({ isRecording: true, objectsCount: 3, confidencePct: 92 });
  };

  return (
    <div className="relative min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#ff4d29]/30 selection:text-white">
      {/* Dynamic Background with Top-Left Sunset / Sunrise Ambient Glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(1300px 900px at 12% -2%, rgba(224, 98, 45, 0.38) 0%, rgba(182, 68, 30, 0.18) 32%, rgba(18, 19, 23, 0.96) 68%, #111215 100%)'
              : 'radial-gradient(1300px 900px at 12% -2%, rgba(255, 175, 135, 0.42) 0%, rgba(255, 215, 195, 0.22) 32%, rgba(244, 245, 249, 0.96) 68%, #ebedf3 100%)',
        }}
      />

      {/* Subtle overlay vignette */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)'
              : 'radial-gradient(ellipse at 50% 50%, transparent 70%, rgba(0,0,0,0.04) 100%)',
        }}
      />

      {/* Top Header */}
      <Header
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        resetTelemetry={resetTelemetry}
      />

      {/* Main Grid: 3 Columns x 4 Rows (12 Cards) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {/* Row 1 */}
          <AgentStatusCard data={agentData} isSimulating={isSimulating} />
          <ClaudeCodexCard data={claudeData} isSimulating={isSimulating} />
          <DeviceOverviewCard data={deviceData} isSimulating={isSimulating} />

          {/* Row 2 */}
          <TeslaStatusCard data={teslaData} />
          <PharmaTrackCard data={pharmaData} />
          <MedicalMonitorCard data={medicalData} isSimulating={isSimulating} />

          {/* Row 3 */}
          <BioSensorCard data={bioData} isSimulating={isSimulating} />
          <WordPlayCard data={wordData} />
          <RetailAnalyticsCard data={retailData} isSimulating={isSimulating} />

          {/* Row 4 */}
          <EntertainmentCard data={entertainmentData} />
          <GameZoneCard data={gameData} />
          <VisionAICard data={visionData} isSimulating={isSimulating} />
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export default App;
