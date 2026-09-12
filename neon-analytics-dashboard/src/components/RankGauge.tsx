import React, { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { playTickSound } from '../utils/audio';

interface RankGaugeProps {
  score?: string;
  delta?: string;
  topBadge?: string;
  soundEnabled: boolean;
}

export const RankGauge: React.FC<RankGaugeProps> = ({
  score = '2.057',
  delta = '-7 RP',
  topBadge = '1.488 RP',
  soundEnabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // SVG Gauge calculations
  const size = 130;
  const strokeWidth = 5.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Filled ~75% like the screenshot
  const progressPercent = 74;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div
      className="flex flex-col items-center justify-center p-3 relative group"
      onMouseEnter={() => {
        setIsHovered(true);
        if (soundEnabled) playTickSound(1100, 0.03, 0.04);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badge: ↘ 1.488 RP */}
      <div className="flex items-center gap-0.5 text-[11px] font-semibold text-rose-400 mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <ArrowDownRight className="w-3.5 h-3.5" />
        <span>{topBadge}</span>
      </div>

      {/* Radial Gauge Container */}
      <div className="relative flex items-center justify-center w-[130px] h-[130px]">
        <svg
          width={size}
          height={size}
          className={`transform -rotate-90 origin-center transition-transform duration-500 ${
            isHovered ? 'scale-105 filter drop-shadow-[0_0_12px_rgba(255,87,34,0.4)]' : ''
          }`}
        >
          <defs>
            {/* Coral-to-Pink Radiant Gradient */}
            <linearGradient id="rankGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7043" />
              <stop offset="50%" stopColor="#ff3d71" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>

            {/* Glowing filter for active ring */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
          />

          {/* Active Gradient Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#rankGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#gaugeGlow)"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Readout Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className="text-xl font-bold text-white tracking-tight font-sans">
            {score}
          </span>
          <span className="text-[11px] font-medium text-slate-400 mt-0.5">
            {delta}
          </span>
        </div>
      </div>

      {/* Labels below the gauge */}
      <div className="text-center mt-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white font-sans">
          RANK POINTS
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
          3RD IN GLOBAL RANK
        </div>
      </div>
    </div>
  );
};
