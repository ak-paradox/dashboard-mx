import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { TeslaStatusData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: TeslaStatusData;
}

export const TeslaStatusCard: React.FC<Props> = ({ data }) => {
  const [isLocked, setIsLocked] = useState(data.isLocked);
  const [status, setStatus] = useState(data.status);

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsLocked(!isLocked);
  };

  const toggleStatus = () => {
    sound.playClick();
    setStatus(prev => (prev === 'PARKED' ? 'CHARGING' : 'PARKED'));
  };

  return (
    <div
      onClick={toggleStatus}
      role="button"
      tabIndex={0}
      title="Click card to toggle status, or click lock icon"
      className="dashboard-card group cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          04 &nbsp;TESLA STATUS
        </div>
      </div>

      {/* Center Visual: Dot-Matrix Tesla Silhouette */}
      <div className="my-auto py-2 flex items-center justify-center">
        <svg className="w-full max-w-[260px] h-20" viewBox="0 0 260 80">
          {/* Car body outline dots */}
          <g className="dot-primary">
            {/* Front Bumper & Nose */}
            <circle cx="20" cy="50" r="1.5" />
            <circle cx="24" cy="47" r="1.5" />
            <circle cx="28" cy="44" r="1.5" />
            <circle cx="34" cy="42" r="1.5" />
            
            {/* Hood */}
            <circle cx="40" cy="40" r="1.5" />
            <circle cx="48" cy="38" r="1.5" />
            <circle cx="56" cy="36" r="1.5" />
            <circle cx="64" cy="34" r="1.5" />
            <circle cx="72" cy="33" r="1.5" />
            
            {/* Windshield */}
            <circle cx="80" cy="30" r="1.5" />
            <circle cx="88" cy="26" r="1.5" />
            <circle cx="96" cy="22" r="1.5" />
            <circle cx="106" cy="20" r="1.5" />
            
            {/* Roofline */}
            <circle cx="118" cy="19" r="1.5" />
            <circle cx="130" cy="19" r="1.5" />
            <circle cx="142" cy="20" r="1.5" />
            <circle cx="154" cy="22" r="1.5" />
            
            {/* Rear Window / Fastback */}
            <circle cx="166" cy="24" r="1.5" />
            <circle cx="178" cy="27" r="1.5" />
            <circle cx="190" cy="30" r="1.5" />
            <circle cx="202" cy="34" r="1.5" />
            <circle cx="214" cy="37" r="1.5" />
            
            {/* Trunk Deck & Rear */}
            <circle cx="224" cy="38" r="1.5" />
            <circle cx="232" cy="39" r="1.5" />
            <circle cx="238" cy="44" r="1.5" />
            <circle cx="240" cy="50" r="1.5" />
            <circle cx="236" cy="54" r="1.5" />

            {/* Front Wheel Arch */}
            <circle cx="36" cy="56" r="1.4" />
            <circle cx="40" cy="52" r="1.4" />
            <circle cx="48" cy="48" r="1.4" />
            <circle cx="58" cy="48" r="1.4" />
            <circle cx="66" cy="52" r="1.4" />
            <circle cx="70" cy="56" r="1.4" />

            {/* Front Wheel */}
            <circle cx="53" cy="56" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
            <circle cx="53" cy="56" r="2.5" fill="currentColor" />

            {/* Rocker panel */}
            <circle cx="78" cy="57" r="1.4" />
            <circle cx="90" cy="57" r="1.4" />
            <circle cx="102" cy="57" r="1.4" />
            <circle cx="114" cy="57" r="1.4" />
            <circle cx="126" cy="57" r="1.4" />
            <circle cx="138" cy="57" r="1.4" />
            <circle cx="150" cy="57" r="1.4" />
            <circle cx="162" cy="57" r="1.4" />
            <circle cx="174" cy="57" r="1.4" />

            {/* Rear Wheel Arch */}
            <circle cx="180" cy="56" r="1.4" />
            <circle cx="185" cy="52" r="1.4" />
            <circle cx="193" cy="48" r="1.4" />
            <circle cx="203" cy="48" r="1.4" />
            <circle cx="211" cy="52" r="1.4" />
            <circle cx="216" cy="56" r="1.4" />

            {/* Rear Wheel */}
            <circle cx="198" cy="56" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
            <circle cx="198" cy="56" r="2.5" fill="currentColor" />
          </g>

          {/* Glowing Red/Orange Taillight Bar */}
          <g className="dot-coral">
            <circle cx="230" cy="39" r="2" />
            <circle cx="235" cy="40" r="2" />
            <circle cx="240" cy="42" r="2" />
          </g>

          {/* Headlight subtle dot */}
          <circle cx="22" cy="49" r="1.8" className="dot-primary" />
        </svg>
      </div>

      {/* Battery & Range Stats */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="card-stat-label">
            BATTERY
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.batteryPct}%
          </div>
        </div>

        {/* Center Divider Dash */}
        <div className="text-zinc-500 text-lg font-mono">—</div>

        <div className="text-right">
          <div className="card-stat-label">
            RANGE
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.rangeKm}km
          </div>
        </div>
      </div>

      {/* Bottom Status Pill & Lock */}
      <div className="flex items-center justify-between pt-3 border-t card-divider">
        {/* Status Pill Badge */}
        <div className="badge-pill">
          <span>{status}</span>
          <span className="w-1.5 h-1.5 rounded-full dot-coral" />
        </div>

        {/* Lock / Unlock Icon */}
        <button
          onClick={toggleLock}
          title={isLocked ? 'Locked (click to unlock)' : 'Unlocked (click to lock)'}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
        >
          {isLocked ? (
            <Lock className="w-4 h-4 text-zinc-400" />
          ) : (
            <Unlock className="w-4 h-4 text-[#ff7849]" />
          )}
        </button>
      </div>
    </div>
  );
};
