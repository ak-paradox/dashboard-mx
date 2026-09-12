import React, { useState } from 'react';
import { Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { EntertainmentData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: EntertainmentData;
}

export const EntertainmentCard: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(data.isPlaying);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlist = [
    { title: 'SYNTHWAVE_01.MID', artist: 'DEERFLOW' },
    { title: 'NEURAL_CHILL.OGG', artist: 'CODEX' },
    { title: 'RETRO_GRID.WAV', artist: 'HENRY' }
  ];

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (!isPlaying) {
      sound.playBeat();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setCurrentTrackIndex((currentTrackIndex - 1 + playlist.length) % playlist.length);
  };

  const ringConfigs = [
    { count: 12, radius: 16 },
    { count: 20, radius: 26 },
    { count: 28, radius: 36 },
    { count: 36, radius: 46 }
  ];

  return (
    <div className="dashboard-card group">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="card-header-label">
          10 &nbsp;ENTERTAINMENT
        </div>
        <Volume2 className="w-4 h-4 text-zinc-400" />
      </div>

      {/* Center Visual: Concentric Dot Rings with Orange Center Dot */}
      <div className="my-auto py-2 flex items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className={`w-36 h-36 transition-transform duration-700 ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''}`}
            viewBox="0 0 120 120"
          >
            {ringConfigs.map((ring, ringIdx) =>
              Array.from({ length: ring.count }).map((_, dotIdx) => {
                const angle = (dotIdx * 360) / ring.count;
                const rad = (angle * Math.PI) / 180;
                const cx = 60 + ring.radius * Math.cos(rad);
                const cy = 60 + ring.radius * Math.sin(rad);

                return (
                  <circle
                    key={`${ringIdx}-${dotIdx}`}
                    cx={cx}
                    cy={cy}
                    r="1.4"
                    className="dot-primary"
                  />
                );
              })
            )}

            {/* Solid glowing center orange dot */}
            <circle
              cx="60"
              cy="60"
              r="4.5"
              className="dot-coral"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Track Controls: |<   ( > )   >| */}
      <div className="flex items-center justify-center gap-8 pt-3 border-t card-divider">
        {/* Previous */}
        <button
          onClick={handlePrev}
          title="Previous Track"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <SkipBack className="w-4 h-4 fill-current" />
        </button>

        {/* Play/Pause Button inside Orange Circle */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
          className="w-10 h-10 rounded-full border border-[#ff4d29] flex items-center justify-center text-[#ff4d29] hover:bg-[#ff4d29]/10 transition-all duration-200 shadow-[0_0_10px_rgba(255,77,41,0.3)]"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          title="Next Track"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
};
