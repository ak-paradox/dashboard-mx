import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PharmaTrackData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: PharmaTrackData;
}

export const PharmaTrackCard: React.FC<Props> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(data.currentStep);
  const [progress, setProgress] = useState(data.progressPct);

  const handleNextStep = () => {
    sound.playClick();
    const next = currentStep >= 4 ? 1 : currentStep + 1;
    setCurrentStep(next);
    setProgress(Math.round((next / 4) * 100));
    if (next === 4) {
      sound.playSuccess();
    }
  };

  return (
    <div
      onClick={handleNextStep}
      role="button"
      tabIndex={0}
      title="Click to advance pharma trial step"
      className="dashboard-card group cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          05 &nbsp;PHARMA TRACK
        </div>
        <div className="mt-2 card-stat-label">
          {data.compound}
        </div>
        <div className="card-stat-label">
          {data.phase}
        </div>
      </div>

      {/* Center Visual: 45-degree Dot-Matrix Medicine Capsule */}
      <div className="my-auto py-1 flex items-center justify-center">
        <div className="relative w-28 h-20 flex items-center justify-center">
          <svg className="w-28 h-20" viewBox="0 0 110 80">
            <g transform="rotate(-38 55 40)">
              {/* Left half: Orange dots */}
              {Array.from({ length: 6 }).map((_, col) =>
                Array.from({ length: 7 }).map((_, row) => {
                  const cx = 32 + col * 4;
                  const cy = 28 + row * 4;
                  return (
                    <circle
                      key={`orange-${col}-${row}`}
                      cx={cx}
                      cy={cy}
                      r="1.3"
                      className="dot-coral"
                    />
                  );
                })
              )}

              {/* Dividing center line dots */}
              {Array.from({ length: 7 }).map((_, row) => (
                <circle
                  key={`div-${row}`}
                  cx="56"
                  cy={28 + row * 4}
                  r="1.4"
                  fill="#ff8a5c"
                />
              ))}

              {/* Right half: Primary dots */}
              {Array.from({ length: 6 }).map((_, col) =>
                Array.from({ length: 7 }).map((_, row) => {
                  const cx = 60 + col * 4;
                  const cy = 28 + row * 4;
                  return (
                    <circle
                      key={`white-${col}-${row}`}
                      cx={cx}
                      cy={cy}
                      r="1.3"
                      className="dot-primary"
                    />
                  );
                })
              )}

              {/* Capsule Round Outer Shell Outline */}
              <rect
                x="28"
                y="24"
                width="56"
                height="32"
                rx="16"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Progress Stepper Line */}
      <div className="relative flex items-center justify-between px-2 mb-2">
        {/* Connecting line */}
        <div className="absolute left-6 right-6 h-[1.5px] bg-zinc-700 -z-0" />
        <div
          className="absolute left-6 h-[1.5px] bg-[#ff4d29] -z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 80}%` }}
        />

        {/* 4 Nodes */}
        {[1, 2, 3, 4].map(step => {
          const isDone = step <= currentStep;
          return (
            <div
              key={step}
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDone
                  ? 'bg-[#ff4d29] text-white shadow-[0_0_8px_#ff4d29]'
                  : 'bg-zinc-800 border border-zinc-600'
              }`}
            >
              {isDone ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Progress Label & Percentage */}
      <div className="flex items-baseline justify-between pt-3 border-t card-divider">
        <div className="card-stat-label">
          PROGRESS
        </div>
        <div className="text-xl font-mono tracking-wider text-[#ff7849] font-bold">
          {progress}%
        </div>
      </div>
    </div>
  );
};
