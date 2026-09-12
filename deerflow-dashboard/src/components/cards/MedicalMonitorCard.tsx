import React, { useEffect, useState } from 'react';
import { MedicalMonitorData } from '../../types';

interface Props {
  data: MedicalMonitorData;
  isSimulating: boolean;
}

export const MedicalMonitorCard: React.FC<Props> = ({ data, isSimulating }) => {
  const [pulseOffset, setPulseOffset] = useState(0);
  const [hr, setHr] = useState(data.hrBpm);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setPulseOffset(prev => (prev + 1) % 24);
      if (Math.random() > 0.6) {
        setHr(prev => Math.min(82, Math.max(68, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 120);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Defined ECG heartbeat pattern
  const ecgPattern = [
    0, 0, 0, 1, 2, 1, 0, 0, -2, 12, -4, 0, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          06 &nbsp;MEDICAL MONITOR
        </div>
      </div>

      {/* Center Visual: ECG Dotted Waveform */}
      <div className="my-auto py-3 flex items-center justify-center">
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-16" viewBox="0 0 240 60">
            {Array.from({ length: 32 }).map((_, i) => {
              const x = 10 + i * 7.1;
              const patternIdx = (i + pulseOffset) % ecgPattern.length;
              const yVal = ecgPattern[patternIdx];
              const y = 30 - yVal * 2.1;

              const isPeak = yVal >= 8;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isPeak ? 2.4 : 1.4}
                    className={isPeak ? 'dot-coral' : 'dot-primary'}
                  />
                  {isPeak && (
                    <>
                      <circle cx={x} cy={y + 5} r="1.2" className="dot-coral" opacity="0.8" />
                      <circle cx={x} cy={y + 10} r="1.2" className="dot-coral" opacity="0.6" />
                      <circle cx={x} cy={y + 15} r="1.2" className="dot-coral" opacity="0.4" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Metrics: HR, SPO2, TEMP */}
      <div className="grid grid-cols-3 pt-3 border-t card-divider text-center">
        {/* Heart Rate */}
        <div className="pr-1">
          <div className="card-stat-label">
            HR
          </div>
          <div className="mt-1 flex items-baseline justify-center gap-1">
            <span className="text-base card-stat-value">
              {hr}
            </span>
            <span className="text-[9px] font-mono text-zinc-500">bpm</span>
          </div>
        </div>

        {/* SPO2 */}
        <div className="px-1 border-x card-divider">
          <div className="card-stat-label">
            SPO2
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.spo2Pct}%
          </div>
        </div>

        {/* Temperature */}
        <div className="pl-1">
          <div className="card-stat-label">
            TEMP
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.tempCelsius}℃
          </div>
        </div>
      </div>

      {/* Status Pill: STABLE • */}
      <div className="mt-3 flex justify-start">
        <div className="badge-pill">
          <span>{data.status}</span>
          <span className="w-1.5 h-1.5 rounded-full dot-coral" />
        </div>
      </div>
    </div>
  );
};
