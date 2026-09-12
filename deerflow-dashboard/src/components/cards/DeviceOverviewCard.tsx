import React from 'react';
import { DeviceOverviewData } from '../../types';

interface Props {
  data: DeviceOverviewData;
  isSimulating: boolean;
}

export const DeviceOverviewCard: React.FC<Props> = ({ data }) => {
  const totalDots = 36;
  const orangeStart = 20;
  const orangeEnd = 26;

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          03 &nbsp;DEVICE OVERVIEW
        </div>
      </div>

      {/* Center Layout: Gauge on Left, Stats on Right */}
      <div className="flex items-center justify-between my-auto py-2">
        {/* Radial Dot Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            {Array.from({ length: totalDots }).map((_, i) => {
              const angle = (i * 360) / totalDots;
              const rad = (angle * Math.PI) / 180;
              const cx = 60 + 46 * Math.cos(rad);
              const cy = 60 + 46 * Math.sin(rad);

              const isOrange = i >= orangeStart && i <= orangeEnd;

              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={isOrange ? 2.5 : 2}
                  className={isOrange ? 'dot-coral' : 'dot-primary'}
                />
              );
            })}
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <div className="text-2xl font-pixel tracking-wider card-stat-value">
              {data.totalDevices}
            </div>
            <div className="text-[9px] font-mono tracking-widest card-stat-label mt-0.5">
              DEVICES
            </div>
          </div>
        </div>

        {/* Right Metrics List */}
        <div className="flex flex-col gap-3.5 pr-1">
          {/* Online */}
          <div>
            <div className="flex items-center gap-2 card-stat-label">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-200" />
              ONLINE
            </div>
            <div className="text-sm font-pixel tracking-wider card-stat-value ml-3.5 mt-0.5">
              {data.onlinePct}%
            </div>
          </div>

          {/* Offline */}
          <div>
            <div className="flex items-center gap-2 card-stat-label">
              <span className="w-1.5 h-1.5 rounded-full dot-muted" />
              OFFLINE
            </div>
            <div className="text-sm font-pixel tracking-wider text-zinc-500 ml-3.5 mt-0.5">
              {data.offlinePct}%
            </div>
          </div>

          {/* Alerts */}
          <div>
            <div className="flex items-center gap-2 card-stat-label">
              <span className="w-1.5 h-1.5 rounded-full dot-coral" />
              ALERTS
            </div>
            <div className="text-sm font-pixel tracking-wider text-[#ff7849] ml-3.5 mt-0.5">
              {data.alerts}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom placeholder/status divider */}
      <div className="pt-2 border-t card-divider flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>IOT CLUSTER: ALPHA</span>
        <span className="text-emerald-500 font-semibold">SYNCED</span>
      </div>
    </div>
  );
};
