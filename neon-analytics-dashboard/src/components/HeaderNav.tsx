import React from 'react';
import { Layers, Volume2, VolumeX, Sparkles, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { playTickSound } from '../utils/audio';

interface HeaderNavProps {
  is3DMode: boolean;
  setIs3DMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  glowIntensity: 'normal' | 'radiant' | 'subtle';
  setGlowIntensity: (val: 'normal' | 'radiant' | 'subtle') => void;
  onReset: () => void;
  onOpenOriginalModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  is3DMode,
  setIs3DMode,
  soundEnabled,
  setSoundEnabled,
  glowIntensity,
  setGlowIntensity,
  onReset,
  onOpenOriginalModal,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] mb-4">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-coral-500 to-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,87,34,0.5)]">
          <div className="w-3.5 h-3.5 border-2 border-white rounded-sm rotate-45" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wider uppercase text-white font-sans">
            Neon Glassmorphism Analytics
          </h1>
          <p className="text-[11px] text-slate-400 font-mono">
            High-Fidelity Re-creation &middot; Gemini &amp; Antigravity Engine
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* 3D Mockup vs 2D Flat Toggle */}
        <button
          onClick={() => {
            setIs3DMode(!is3DMode);
            if (soundEnabled) playTickSound(1050, 0.04, 0.04);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            is3DMode
              ? 'bg-coral-500/20 text-coral-300 border-coral-500/40 shadow-[0_0_15px_rgba(255,87,34,0.3)]'
              : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
          }`}
          title="Toggle between 3D isometric mockup view and 2D flat dashboard view"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{is3DMode ? '3D Mockup View' : '2D Flat View'}</span>
        </button>

        {/* Compare with Original Screenshot */}
        <button
          onClick={() => {
            onOpenOriginalModal();
            if (soundEnabled) playTickSound(900, 0.03, 0.03);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/[0.08] transition-all"
          title="View Original Screenshot"
        >
          <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>Original Mockup</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playTickSound(1200, 0.04, 0.05);
          }}
          className={`p-2 rounded-xl border text-xs transition-all ${
            soundEnabled
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'bg-white/[0.04] text-slate-400 border-white/10'
          }`}
          title={soundEnabled ? 'Mute micro-interaction sound' : 'Enable sci-fi synth sound feedback'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Glow Cycle */}
        <button
          onClick={() => {
            const next =
              glowIntensity === 'normal'
                ? 'radiant'
                : glowIntensity === 'radiant'
                ? 'subtle'
                : 'normal';
            setGlowIntensity(next);
            if (soundEnabled) playTickSound(1100, 0.03, 0.03);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/[0.08] transition-all"
          title="Adjust Neon Glow Intensity"
        >
          <Sparkles className="w-3.5 h-3.5 text-coral-400" />
          <span className="capitalize">{glowIntensity} Glow</span>
        </button>

        {/* Reset Metrics */}
        <button
          onClick={() => {
            onReset();
            if (soundEnabled) playTickSound(700, 0.04, 0.04);
          }}
          className="p-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white border border-white/10 hover:bg-white/[0.08] transition-all"
          title="Reset Metrics to Mockup Defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
