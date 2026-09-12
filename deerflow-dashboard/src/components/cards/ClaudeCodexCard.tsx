import React, { useEffect, useState } from 'react';
import { ClaudeCodexData } from '../../types';

interface Props {
  data: ClaudeCodexData;
  isSimulating: boolean;
}

export const ClaudeCodexCard: React.FC<Props> = ({ data, isSimulating }) => {
  const [bars, setBars] = useState<number[]>([
    4, 6, 3, 7, 5, 8, 4, 6, 5, 4, 6, 7, 8, 9
  ]);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setBars(prev =>
        prev.map((val, idx) => {
          const min = idx >= 11 ? 5 : 2;
          const max = idx >= 11 ? 10 : 8;
          const delta = (Math.random() - 0.5) * 2;
          return Math.min(max, Math.max(min, Math.round(val + delta)));
        })
      );
    }, 180);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          02 &nbsp;CLAUDE / CODEX
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-pixel tracking-wider card-stat-value">
            {data.tokens}
          </span>
        </div>
        <div className="card-stat-label mt-0.5">
          TOKENS
        </div>
      </div>

      {/* Center Visual: Equalizer Dot-Matrix Bar Chart */}
      <div className="flex items-end justify-between gap-[5px] h-24 my-auto px-1">
        {bars.map((height, colIdx) => {
          const isOrange = colIdx >= 11;

          return (
            <div key={colIdx} className="flex flex-col-reverse items-center gap-[3px] flex-1">
              {Array.from({ length: 10 }).map((_, rowIdx) => {
                const isFilled = rowIdx < height;
                return (
                  <span
                    key={rowIdx}
                    className={`w-[3.5px] h-[3.5px] rounded-full transition-all duration-150 ${
                      isFilled
                        ? isOrange
                          ? 'dot-coral'
                          : 'dot-primary'
                        : 'dot-muted opacity-30'
                    }`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Row: Requests & +18% Badge */}
      <div className="flex items-end justify-between pt-3 border-t card-divider">
        <div>
          <div className="card-stat-label">
            REQUESTS
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.requests}
          </div>
        </div>

        {/* Growth pill badge */}
        <div className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#ff4d29]/15 text-[#ff7849] border border-[#ff4d29]/30 shadow-[0_0_8px_rgba(255,77,41,0.2)]">
          {data.growth}
        </div>
      </div>
    </div>
  );
};
