import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SparklineData } from '../types';
import { playTickSound } from '../utils/audio';

interface WeeklyFormSectionProps {
  soundEnabled: boolean;
}

// Cubic bezier smoothing for organic aesthetic
function generateCubicBezierPath(points: number[], width: number, height: number): string {
  if (points.length === 0) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((val, idx) => ({
    x: (idx / (points.length - 1)) * width,
    y: height - ((val - min) / range) * (height - 16) - 8,
  }));

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i === 0 ? 0 : i - 1];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 4;
    const cp1y = p1.y + (p2.y - p0.y) / 4;
    const cp2x = p2.x - (p3.x - p1.x) / 4;
    const cp2y = p2.y - (p3.y - p1.y) / 4;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export const WeeklyFormSection: React.FC<WeeklyFormSectionProps> = ({ soundEnabled }) => {
  const [activeHoverIdx, setActiveHoverIdx] = useState<{ col: number; pt: number } | null>(null);

  const sparklines: SparklineData[] = [
    {
      id: 'sales-trends',
      label: 'SALES TRENDS',
      sublabel: 'LAST WEEK 22 PTS',
      topTrend: { direction: 'down', value: '12' },
      bottomTrend: { direction: 'up', value: '28' },
      // Organic oscillation matching the screenshot's wave pattern
      points: [18, 26, 15, 29, 21, 38, 30, 48, 42, 60],
    },
    {
      id: 'focus-trend',
      label: 'FOCUS',
      sublabel: 'LAST WEEK 42%',
      topTrend: { direction: 'up', value: '44%' },
      bottomTrend: { direction: 'up', value: '43%' },
      points: [25, 20, 42, 28, 32, 45, 30, 52, 40, 56],
    },
    {
      id: 'production-trend',
      label: 'IN PRODUCTION',
      sublabel: 'LAST WEEK 22',
      topTrend: { direction: 'down', value: '12' },
      bottomTrend: { direction: 'up', value: '19' },
      points: [30, 48, 25, 52, 38, 62, 44, 58, 49, 65],
    },
  ];

  const svgW = 160;
  const svgH = 65;

  return (
    <div className="pt-2 pb-1">
      {/* Section Header */}
      <div className="inline-block mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-sans">
          WEEKLY FORM
        </h3>
        <div className="w-9 h-[2px] bg-slate-500/60 mt-1.5 rounded-full" />
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {sparklines.map((item, colIdx) => {
          const pathD = generateCubicBezierPath(item.points, svgW, svgH);
          const isTopPositive = item.topTrend.direction === 'up';

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between group cursor-default"
              onMouseEnter={() => {
                if (soundEnabled) playTickSound(700 + colIdx * 100, 0.02, 0.02);
              }}
            >
              {/* Top Trend Pill */}
              <div className="flex justify-end pr-2 mb-1">
                <div
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    isTopPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isTopPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span>{item.topTrend.value}</span>
                </div>
              </div>

              {/* Sparkline Canvas / SVG */}
              <div className="relative py-1 flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  className="w-full h-[65px] overflow-visible"
                >
                  <defs>
                    <linearGradient id={`sparkGrad-${colIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e11d48" />
                      <stop offset="50%" stopColor="#ff4d4f" />
                      <stop offset="100%" stopColor="#ff7a59" />
                    </linearGradient>

                    <filter id={`sparkGlow-${colIdx}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Sparkline Stroke */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={`url(#sparkGrad-${colIdx})`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter={`url(#sparkGlow-${colIdx})`}
                    className="transition-all duration-300 group-hover:stroke-width-[3]"
                  />

                  {/* Interactive Nodes */}
                  {item.points.map((val, ptIdx) => {
                    const min = Math.min(...item.points);
                    const max = Math.max(...item.points);
                    const cx = (ptIdx / (item.points.length - 1)) * svgW;
                    const cy = svgH - ((val - min) / (max - min || 1)) * (svgH - 16) - 8;
                    const isHovered = activeHoverIdx?.col === colIdx && activeHoverIdx?.pt === ptIdx;

                    return (
                      <g key={ptIdx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 4.5 : 2}
                          className={`transition-all duration-200 cursor-pointer ${
                            isHovered
                              ? 'fill-white stroke-coral-500 stroke-2'
                              : 'fill-transparent hover:fill-rose-400'
                          }`}
                          onMouseEnter={() => {
                            setActiveHoverIdx({ col: colIdx, pt: ptIdx });
                            if (soundEnabled) playTickSound(1000 + ptIdx * 40, 0.015, 0.02);
                          }}
                          onMouseLeave={() => setActiveHoverIdx(null)}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hover Readout Tooltip */}
                {activeHoverIdx?.col === colIdx && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-obsidian-950/90 border border-white/20 px-2 py-0.5 rounded text-[10px] text-white font-mono shadow-md pointer-events-none">
                    Value: {item.points[activeHoverIdx.pt]}
                  </div>
                )}
              </div>

              {/* Bottom Trend & Labels */}
              <div className="mt-3">
                <div className="flex items-center gap-1 text-emerald-400 font-semibold text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{item.bottomTrend.value}</span>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-sans mt-0.5">
                  {item.label}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  {item.sublabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
