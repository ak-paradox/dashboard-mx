import React, { useEffect, useState } from 'react';
import { AgentStatusData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: AgentStatusData;
  isSimulating: boolean;
}

export const AgentStatusCard: React.FC<Props> = ({ data, isSimulating }) => {
  const [waveHeights, setWaveHeights] = useState<number[]>([
    2, 3, 2, 4, 3, 5, 4, 7, 9, 12, 10, 8, 11, 7, 5, 4, 6, 3, 2, 3, 2
  ]);
  const [eyeState, setEyeState] = useState<'open' | 'blink'>('open');
  const [statusText, setStatusText] = useState(data.status);

  // Audio wave animation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setWaveHeights(prev =>
        prev.map((_, i) => {
          const distFromCenter = Math.abs(i - 10);
          const baseMax = Math.max(3, 13 - distFromCenter);
          return Math.floor(Math.random() * baseMax) + 2;
        })
      );
    }, 140);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Eye blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeState('blink');
      setTimeout(() => setEyeState('open'), 180);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    sound.playClick();
    const states: ('THINKING...' | 'EXECUTING' | 'IDLE' | 'ANALYZING')[] = [
      'THINKING...',
      'ANALYZING',
      'EXECUTING',
      'IDLE'
    ];
    const next = states[(states.indexOf(statusText) + 1) % states.length];
    setStatusText(next);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Click to cycle agent status"
      className="dashboard-card group cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          01 &nbsp;AGENT STATUS
        </div>
        <div className="mt-2 text-xl font-pixel tracking-wider text-zinc-900 dark:text-white transition-colors">
          {statusText}
        </div>
      </div>

      {/* Center Dot-Matrix Visual: Face Orb + Sound Wave */}
      <div className="flex flex-col items-center justify-center my-auto py-2">
        {/* Orb Face */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            {/* Outer dotted circular ring */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              const cx = 32 + 24 * Math.cos(rad);
              const cy = 32 + 24 * Math.sin(rad);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="1.4"
                  className="dot-primary"
                />
              );
            })}

            {/* Glowing Orange Eyes */}
            {eyeState !== 'blink' ? (
              <>
                <circle cx="27" cy="30" r="1.8" className="dot-coral" />
                <circle cx="37" cy="30" r="1.8" className="dot-coral" />
              </>
            ) : (
              <>
                <rect x="25" y="30" width="4" height="1.5" rx="0.5" fill="#ff4d29" />
                <rect x="35" y="30" width="4" height="1.5" rx="0.5" fill="#ff4d29" />
              </>
            )}
          </svg>
        </div>

        {/* Audio Waveform: Multi-column dotted soundwave */}
        <div className="flex items-center justify-center gap-[4px] mt-3 h-12">
          {waveHeights.map((h, colIndex) => {
            const isCenter = colIndex >= 6 && colIndex <= 14;

            return (
              <div key={colIndex} className="flex flex-col items-center justify-center gap-[3px]">
                {Array.from({ length: h }).map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`w-[2.5px] h-[2.5px] rounded-full transition-all duration-100 ${
                      isCenter ? 'dot-coral' : 'dot-primary'
                    }`}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Metrics: 3 Columns with Vertical Dividers */}
      <div className="grid grid-cols-3 pt-3 border-t card-divider text-center">
        {/* Steps */}
        <div className="pr-2 border-r card-divider">
          <div className="card-stat-label">
            STEPS
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.steps}
          </div>
        </div>

        {/* Tools */}
        <div className="px-2 border-r card-divider">
          <div className="card-stat-label">
            TOOLS
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.tools}
          </div>
        </div>

        {/* Memory */}
        <div className="pl-2">
          <div className="card-stat-label">
            MEMORY
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.memory}%
          </div>
        </div>
      </div>
    </div>
  );
};
