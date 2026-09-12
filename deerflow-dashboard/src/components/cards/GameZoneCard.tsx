import React, { useState } from 'react';
import { GameZoneData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: GameZoneData;
}

export const GameZoneCard: React.FC<Props> = ({ data }) => {
  const [score, setScore] = useState(data.score);
  const [laserAnim, setLaserAnim] = useState(false);
  const [shipX, setShipX] = useState(50); // percentage

  const handleShoot = (e: React.MouseEvent) => {
    sound.playLaser();
    setLaserAnim(true);
    setScore(prev => prev + 100);
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    setShipX(Math.max(25, Math.min(75, clickX)));

    setTimeout(() => setLaserAnim(false), 250);
  };

  return (
    <div
      onClick={handleShoot}
      role="button"
      tabIndex={0}
      title="Click to shoot lasers and score points!"
      className="dashboard-card group cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          11 &nbsp;GAME ZONE
        </div>
      </div>

      {/* Center Visual: Retro Pixel Space Arcade Scene */}
      <div className="my-auto py-1 flex items-center justify-center">
        <div className="relative w-full max-w-[200px] h-28 flex flex-col justify-between">
          {/* Top Enemy Spaceships */}
          <div className="flex justify-around items-center px-4">
            {/* Enemy 1 */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <g className="dot-primary">
                <rect x="10" y="2" width="4" height="2" />
                <rect x="8" y="4" width="8" height="2" />
                <rect x="6" y="6" width="12" height="4" />
                <rect x="4" y="10" width="16" height="4" />
                <rect x="4" y="14" width="4" height="4" />
                <rect x="16" y="14" width="4" height="4" />
                {/* Enemy eyes (card bg) */}
                <rect x="8" y="8" width="2" height="2" className="fill-white dark:fill-[#16171b]" />
                <rect x="14" y="8" width="2" height="2" className="fill-white dark:fill-[#16171b]" />
              </g>
            </svg>

            {/* Enemy 2 */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <g className="dot-primary">
                <rect x="10" y="2" width="4" height="2" />
                <rect x="6" y="4" width="12" height="2" />
                <rect x="4" y="6" width="16" height="4" />
                <rect x="2" y="10" width="20" height="4" />
                <rect x="6" y="14" width="3" height="4" />
                <rect x="15" y="14" width="3" height="4" />
                {/* Enemy eyes */}
                <rect x="8" y="8" width="2" height="2" className="fill-white dark:fill-[#16171b]" />
                <rect x="14" y="8" width="2" height="2" className="fill-white dark:fill-[#16171b]" />
              </g>
            </svg>
          </div>

          {/* Laser Projectile Beam */}
          <div className="flex justify-center my-auto">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`w-1 h-2 rounded-full dot-coral transition-all duration-150 ${
                  laserAnim ? 'opacity-100 scale-125' : 'opacity-75'
                }`}
              />
              <span className="w-1 h-2 rounded-full dot-coral opacity-60" />
              <span className="w-1 h-2 rounded-full dot-coral opacity-40" />
            </div>
          </div>

          {/* Player Ship at Bottom */}
          <div
            className="flex justify-center transition-all duration-200"
            style={{ transform: `translateX(${(shipX - 50) * 0.8}px)` }}
          >
            <svg className="w-10 h-10" viewBox="0 0 32 32">
              <g className="dot-primary">
                {/* Nose tip */}
                <rect x="15" y="4" width="2" height="4" fill="#ff4d29" />
                {/* Upper fuselage */}
                <rect x="14" y="8" width="4" height="4" />
                <rect x="13" y="12" width="6" height="4" />
                {/* Cockpit */}
                <rect x="15" y="12" width="2" height="4" fill="#ff4d29" />
                {/* Wings & body */}
                <rect x="10" y="16" width="12" height="6" />
                <rect x="6" y="22" width="20" height="4" />
                <rect x="4" y="26" width="6" height="4" />
                <rect x="22" y="26" width="6" height="4" />
                {/* Engine flames */}
                <rect x="14" y="28" width="4" height="3" fill="#ff4d29" className="animate-pulse" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Metrics: Score & Pixel Hearts */}
      <div className="flex items-end justify-between pt-3 border-t card-divider">
        {/* Score */}
        <div>
          <div className="card-stat-label">
            SCORE
          </div>
          <div className="mt-1 text-base font-mono tracking-widest card-stat-value">
            {String(score).padStart(5, '0')}
          </div>
        </div>

        {/* 3 Pixel Hearts (2 filled orange/red, 1 empty/grey) */}
        <div className="flex items-center gap-1.5 pb-1">
          {/* Heart 1 */}
          <svg className="w-4 h-4 fill-[#ff4d29] drop-shadow-[0_0_4px_#ff4d29]" viewBox="0 0 16 16">
            <path d="M 2 4 L 5 1 L 8 4 L 11 1 L 14 4 L 14 7 L 8 13 L 2 7 Z" />
          </svg>

          {/* Heart 2 */}
          <svg className="w-4 h-4 fill-[#ff4d29] drop-shadow-[0_0_4px_#ff4d29]" viewBox="0 0 16 16">
            <path d="M 2 4 L 5 1 L 8 4 L 11 1 L 14 4 L 14 7 L 8 13 L 2 7 Z" />
          </svg>

          {/* Heart 3 */}
          <svg className="w-4 h-4 dot-muted" viewBox="0 0 16 16">
            <path d="M 2 4 L 5 1 L 8 4 L 11 1 L 14 4 L 14 7 L 8 13 L 2 7 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
