import React, { useState } from 'react';
import { Play, Target, RefreshCw, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricData } from '../types';
import { playTickSound } from '../utils/audio';

interface MetricCardProps {
  data: MetricData;
  soundEnabled: boolean;
  onUpdateValue?: (id: string, newProgress: number) => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data, soundEnabled, onUpdateValue }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (data.iconType) {
      case 'play':
        return <Play className="w-4 h-4 text-white fill-white/80 translate-x-0.5" />;
      case 'target':
        return <Target className="w-4 h-4 text-white" />;
      case 'refresh':
        return <RefreshCw className="w-4 h-4 text-white" />;
      case 'activity':
        return <Activity className="w-4 h-4 text-white" />;
      default:
        return <Play className="w-4 h-4 text-white" />;
    }
  };

  const isPositive = data.trend.direction === 'up';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (soundEnabled) playTickSound(600 + val * 5, 0.02, 0.02);
    if (onUpdateValue) onUpdateValue(data.id, val);
  };

  return (
    <div
      className="relative rounded-2xl p-5 glass-card-interactive flex flex-col justify-between overflow-hidden group cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        if (soundEnabled) playTickSound(900, 0.02, 0.03);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle top sheen highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Card Header: Icon & Trend */}
      <div className="flex items-center justify-between mb-4">
        {/* Frosted Icon Circle */}
        <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center shadow-inner group-hover:border-white/25 transition-all">
          {getIcon()}
        </div>

        {/* Trend Indicator Pill */}
        <div
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-md ${
            isPositive
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-rose-400 bg-rose-500/10'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          <span>{data.trend.value}</span>
        </div>
      </div>

      {/* Metric Value & Label */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-white font-sans drop-shadow-sm">
            {data.value}
          </span>
          {data.unit && (
            <span className="text-sm font-medium text-slate-400">{data.unit}</span>
          )}
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1 font-sans">
          {data.title}
        </div>
      </div>

      {/* Interactive Progress Slider Track */}
      <div className="relative pt-1">
        <div className="h-1 w-full bg-white/[0.08] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{ width: `${data.progress}%` }}
          />
        </div>

        {/* Hidden Range Input for Scrubbing */}
        <input
          type="range"
          min="0"
          max="100"
          value={data.progress}
          onChange={handleSliderChange}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
          title={`Adjust ${data.title}`}
        />
      </div>

      {/* Subtle bottom indicator dot */}
      <div
        className={`absolute bottom-1 right-2 w-1 h-1 rounded-full transition-opacity duration-300 ${
          isHovered ? 'bg-coral-400 opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
