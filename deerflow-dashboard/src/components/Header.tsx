import React from 'react';
import { Sun, Moon, Volume2, VolumeX, Activity, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import { DotMatrixText } from './DotMatrixText';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean | ((prev: boolean) => boolean)) => void;
  resetTelemetry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  isSimulating,
  setIsSimulating,
  resetTelemetry,
}) => {
  const toggleTheme = () => {
    sound.playClick();
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  return (
    <header className="pt-8 sm:pt-12 pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div>
        {/* Authentic Dot-Matrix Title: DEERFLOW */}
        <div className="flex flex-col gap-2 select-none">
          <div className="overflow-x-auto py-1">
            <DotMatrixText
              text="DEERFLOW"
              variant="outline"
              dotSize={2.2}
              gap={5.6}
              charGap={11}
              dotClassName="title-dot-outline transition-colors"
            />
          </div>
          {/* AIoT DASHBOARD */}
          <div className="overflow-x-auto py-1">
            <DotMatrixText
              text="AIoT DASHBOARD"
              variant="outline"
              dotSize={1.6}
              gap={4.2}
              charGap={8}
              dotClassName="subtitle-dot-outline transition-colors"
            />
          </div>
        </div>

        {/* Operational Status line */}
        <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm font-mono tracking-wider transition-colors duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d29] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d29]"></span>
          </span>
          <span className="text-[#ff7849] font-medium tracking-wide">
            All systems operational
          </span>
        </div>
      </div>

      {/* Action Controls: Theme Switcher, Audio, Simulation */}
      <div className="flex items-center gap-2 sm:gap-3 self-start md:self-auto bg-[#17181d]/80 dark:bg-[#17181d]/80 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 dark:border-white/10 border-black/10 shadow-lg transition-all duration-300">
        {/* Light/Dark Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-200"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#ff8a5c]" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Retro Audio' : 'Enable Retro Audio'}
          className={`p-2 rounded-xl transition-all duration-200 ${
            soundEnabled
              ? 'bg-[#ff4d29]/20 text-[#ff7849] border border-[#ff4d29]/30'
              : 'bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Live Simulation Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            setIsSimulating(prev => !prev);
          }}
          title={isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}
          className={`p-2 rounded-xl transition-all duration-200 ${
            isSimulating
              ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
              : 'bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse' : ''}`} />
        </button>

        {/* Reset Telemetry */}
        <button
          onClick={() => {
            sound.playClick();
            resetTelemetry();
          }}
          title="Reset Telemetry Data"
          className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
