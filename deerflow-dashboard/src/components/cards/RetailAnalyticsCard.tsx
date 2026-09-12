import React, { useEffect, useState } from 'react';
import { RetailAnalyticsData } from '../../types';

interface Props {
  data: RetailAnalyticsData;
  isSimulating: boolean;
}

export const RetailAnalyticsCard: React.FC<Props> = ({ data, isSimulating }) => {
  const [points, setPoints] = useState<number[]>([
    22, 18, 25, 20, 28, 24, 32, 28, 48, 30, 22, 16, 20
  ]);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setPoints(prev => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const val = Math.min(50, Math.max(15, last + (Math.random() - 0.48) * 8));
        next.push(Math.round(val));
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const maxVal = Math.max(...points);
  const maxIdx = points.lastIndexOf(maxVal);

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          09 &nbsp;RETAIL ANALYTICS
        </div>
      </div>

      {/* Metrics Row: Visitors on left, LIVE badge on right */}
      <div className="flex items-start justify-between mt-2">
        <div>
          <div className="text-3xl font-pixel tracking-wider card-stat-value">
            {data.visitors}
          </div>
          <div className="card-stat-label mt-0.5">
            VISITORS
          </div>
        </div>

        {/* LIVE Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff4d29]/10 border border-[#ff4d29]/30">
          <span className="w-1.5 h-1.5 rounded-full dot-coral animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff7849]">
            LIVE
          </span>
        </div>
      </div>

      {/* Center Visual: Dotted Line Trend Graph with Peak Highlight */}
      <div className="my-auto py-2 flex items-center justify-center">
        <svg className="w-full h-20" viewBox="0 0 240 70">
          {/* Connecting dotted lines */}
          <polyline
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            points={points
              .map((val, idx) => {
                const x = 12 + idx * 18;
                const y = 60 - val;
                return `${x},${y}`;
              })
              .join(' ')}
          />

          {/* Dots on line */}
          {points.map((val, idx) => {
            const x = 12 + idx * 18;
            const y = 60 - val;
            const isPeak = idx === maxIdx;

            return (
              <g key={idx}>
                {isPeak ? (
                  <>
                    {/* Glowing outer ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="none"
                      stroke="#ff4d29"
                      strokeWidth="1.5"
                      className="animate-ping"
                      opacity="0.6"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="none"
                      stroke="#ff4d29"
                      strokeWidth="1.5"
                    />
                    {/* Inner glowing dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r="2.5"
                      className="dot-coral"
                    />
                  </>
                ) : (
                  <circle
                    cx={x}
                    cy={y}
                    r="1.8"
                    className="dot-primary"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Row: SALES and +$23% */}
      <div className="flex items-end justify-between pt-3 border-t card-divider">
        <div className="card-stat-label">
          SALES
        </div>
        <div className="text-base font-mono tracking-wider text-[#ff7849] font-bold">
          {data.salesGrowth}
        </div>
      </div>
    </div>
  );
};
