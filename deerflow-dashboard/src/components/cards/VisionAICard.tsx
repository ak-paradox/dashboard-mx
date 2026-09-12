import React, { useEffect, useState } from 'react';
import { VisionAIData } from '../../types';

interface Props {
  data: VisionAIData;
  isSimulating: boolean;
}

export const VisionAICard: React.FC<Props> = ({ data, isSimulating }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [confidence, setConfidence] = useState(data.confidencePct);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
      if (Math.random() > 0.7) {
        setConfidence(prev => Math.min(99, Math.max(89, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="dashboard-card group">
      {/* Top Header with REC indicator */}
      <div className="flex items-center justify-between">
        <div className="card-header-label">
          12 &nbsp;VISION AI
        </div>

        {/* • REC */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#ff7849]">
          <span className="w-1.5 h-1.5 rounded-full dot-coral animate-ping" />
          <span>REC</span>
        </div>
      </div>

      {/* Center Visual: Camera Viewfinder with 3D Dotted Isometric Cube */}
      <div className="my-auto py-2 flex items-center justify-center">
        <div className="relative w-44 h-28 flex items-center justify-center bg-black/25 rounded-lg p-2">
          {/* Top-Left Bracket */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-zinc-400" />
          {/* Top-Right Bracket */}
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-zinc-400" />
          {/* Bottom-Left Bracket */}
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-zinc-400" />
          {/* Bottom-Right Bracket */}
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-zinc-400" />

          {/* 3D Wireframe Cube composed of Dots */}
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <g
              transform={`rotate(${Math.sin((rotationAngle * Math.PI) / 180) * 8} 50 50)`}
              className="transition-transform"
            >
              {[
                [25, 26, 50, 38],
                [50, 38, 75, 26],
                [75, 26, 50, 14],
                [50, 14, 25, 26],
                [25, 26, 25, 62],
                [50, 38, 50, 74],
                [75, 26, 75, 62],
                [50, 14, 50, 50],
                [25, 62, 50, 74],
                [50, 74, 75, 62],
                [25, 62, 50, 50],
                [50, 50, 75, 62],
              ].map(([x1, y1, x2, y2], edgeIdx) => {
                const steps = 4;
                return Array.from({ length: steps + 1 }).map((_, stepIdx) => {
                  const t = stepIdx / steps;
                  const cx = x1 + (x2 - x1) * t;
                  const cy = y1 + (y2 - y1) * t;
                  const isVertex = stepIdx === 0 || stepIdx === steps;

                  return (
                    <circle
                      key={`${edgeIdx}-${stepIdx}`}
                      cx={cx}
                      cy={cy}
                      r={isVertex ? 1.8 : 1.2}
                      className={
                        isVertex
                          ? 'dot-primary drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]'
                          : 'dot-primary opacity-80'
                      }
                    />
                  );
                });
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Metrics: OBJECTS and CONFIDENCE */}
      <div className="grid grid-cols-2 pt-3 border-t card-divider">
        <div>
          <div className="card-stat-label">
            OBJECTS
          </div>
          <div className="mt-1 text-base card-stat-value">
            {data.objectsCount}
          </div>
        </div>

        <div className="text-right">
          <div className="card-stat-label">
            CONFIDENCE
          </div>
          <div className="mt-1 text-base card-stat-value">
            {confidence}%
          </div>
        </div>
      </div>
    </div>
  );
};
