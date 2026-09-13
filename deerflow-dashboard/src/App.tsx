import { useEffect, useState } from 'react';
import { DotText } from './components/DotText';
import { Led, ThemeToggle } from './components/chrome';
import {
  AgentStatus,
  BioSensor,
  ClaudeCodex,
  DeviceOverview,
  Entertainment,
  GameZone,
  MedicalMonitor,
  PharmaTrack,
  RetailAnalytics,
  TeslaStatus,
  VisionAi,
  WordPlay,
} from './widgets';

type Theme = 'dark' | 'light';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('deerflow-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('deerflow-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [playing, setPlaying] = useState(true);

  return (
    <div className="min-h-screen px-5 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <header className="flex items-start justify-between gap-6">
          <div>
            <DotText text="DEERFLOW" size={3.6} tone="chrome" />
            <div className="mt-2">
              <DotText text="AIoT DASHBOARD" size={2.1} tone="chrome" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Led pulse />
              <DotText text="All systems operational" size={1.55} tone="chrome" />
            </div>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <main className="df-board">
          <AgentStatus />
          <ClaudeCodex />
          <DeviceOverview />
          <TeslaStatus />
          <PharmaTrack />
          <MedicalMonitor />
          <BioSensor />
          <WordPlay />
          <RetailAnalytics />
          <Entertainment playing={playing} setPlaying={setPlaying} />
          <GameZone />
          <VisionAi />
        </main>

        <footer className="flex items-end justify-between gap-6 pb-4 pt-2">
          <div>
            <DotText text="BUILD ANYTHING" size={2.4} tone="chrome" />
            <div className="mt-2">
              <DotText text="WITH INTELLIGENCE_" size={2.4} tone="chrome" blinkLast />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <DotText text="Deerflow" size={1.7} tone="chrome" />
            <DotText text="by Henryry" size={1.7} tone="chrome" />
          </div>
        </footer>
      </div>
    </div>
  );
}
