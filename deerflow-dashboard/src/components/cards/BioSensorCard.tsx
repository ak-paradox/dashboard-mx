import React, { useEffect, useState } from 'react';
import { BioSensorData } from '../../types';

interface Props {
  data: BioSensorData;
  isSimulating: boolean;
}

export const BioSensorCard: React.FC<Props> = ({ data, isSimulating }) => {
  const [moisture, setMoisture] = useState(data.moisturePct);
  const [light, setLight] = useState(data.lightLux);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setMoisture(prev => Math.min(80, Math.max(50, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
      if (Math.random() > 0.5) {
        setLight(prev => Math.min(480, Math.max(380, prev + Math.floor((Math.random() - 0.5) * 8))));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const totalDots = 36;
  const orangeStart = 3;
  const orangeEnd = 11;

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          07 &nbsp;BIO SENSOR
        </div>
      </div>

      {/* Center Visual: Dotted Radial Ring with Leaf Icon */}
      <div className="my-auto py-2 flex items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 120 120">
            {/* Outer Circular Ring of Dots */}
            {Array.from({ length: totalDots }).map((_, i) => {
              const angle = (i * 360) / totalDots;
              const rad = ((angle - 90) * Math.PI) / 180;
              const cx = 60 + 44 * Math.cos(rad);
              const cy = 60 + 44 * Math.sin(rad);

              const isOrange = i >= orangeStart && i <= orangeEnd;

              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={isOrange ? 2.3 : 1.8}
                  className={isOrange ? 'dot-coral' : 'dot-primary'}
                />
              );
            })}

            {/* Inner Dot-Matrix Leaf Icon */}
            <g className="dot-primary">
              {/* Leaf Stem & Central Vein */}
              <circle cx="48" cy="72" r="1.3" />
              <circle cx="52" cy="68" r="1.3" />
              <circle cx="56" cy="63" r="1.3" />
              <circle cx="60" cy="58" r="1.3" />
              <circle cx="64" cy="52" r="1.3" />
              <circle cx="68" cy="46" r="1.3" />

              {/* Leaf Blade Outline (Top Arc) */}
              <circle cx="55" cy="52" r="1.3" />
              <circle cx="58" cy="46" r="1.3" />
              <circle cx="63" cy="42" r="1.3" />
              <circle cx="70" cy="42" r="1.3" />
              <circle cx="74" cy="45" r="1.3" />

              {/* Leaf Blade Outline (Bottom Arc) */}
              <circle cx="52" cy="62" r="1.3" />
              <circle cx="56" cy="66" r="1.3" />
              <circle cx="64" cy="66" r="1.3" />
              <circle cx="71" cy="62" r="1.3" />
              <circle cx="75" cy="54" r="1.3" />

              {/* Leaf Tip */}
              <circle cx="76" cy="44" r="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Metrics: Moisture & Light */}
      <div className="flex items-end justify-between pt-3 border-t card-divider">
        <div>
          <div className="card-stat-label">
            MOISTURE
          </div>
          <div className="mt-1 text-base card-stat-value">
            {moisture}%
          </div>
        </div>

        <div className="text-right">
          <div className="card-stat-label">
            LIGHT
          </div>
          <div className="mt-1 flex items-baseline justify-end gap-1">
            <span className="text-base card-stat-value">
              {light}
            </span>
            <span className="text-[9px] font-mono text-zinc-500">lux</span>
          </div>
        </div>
      </div>
    </div>
  );
};
