import React, { useState } from 'react';
import { WordPlayData } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  data: WordPlayData;
}

export const WordPlayCard: React.FC<Props> = ({ data }) => {
  const [score, setScore] = useState(data.score);
  const [streak, setStreak] = useState(data.streak);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordList = [
    { prefix: 'C', missing: 'O', suffix: 'D E', full: 'CODE' },
    { prefix: 'D', missing: 'A', suffix: 'T A', full: 'DATA' },
    { prefix: 'N', missing: 'O', suffix: 'D E', full: 'NODE' },
    { prefix: 'L', missing: 'O', suffix: 'O P', full: 'LOOP' },
    { prefix: 'F', missing: 'L', suffix: 'O W', full: 'FLOW' }
  ];

  const current = wordList[currentWordIndex];

  const handleSolve = () => {
    sound.playClick();
    if (!isAnswered) {
      setIsAnswered(true);
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      sound.playSuccess();
    } else {
      setIsAnswered(false);
      setCurrentWordIndex((currentWordIndex + 1) % wordList.length);
    }
  };

  return (
    <div
      onClick={handleSolve}
      role="button"
      tabIndex={0}
      title="Click to play / fill in blank"
      className="dashboard-card group cursor-pointer"
    >
      {/* Top Header */}
      <div>
        <div className="card-header-label">
          08 &nbsp;WORD PLAY
        </div>
        <div className="mt-2 card-stat-label">
          Fill in the blank
        </div>
      </div>

      {/* Center Visual: C _ D E in large dot matrix / pixel font */}
      <div className="my-auto py-2 flex flex-col items-center justify-center">
        <div className="text-3xl sm:text-4xl font-pixel tracking-[0.3em] flex items-baseline justify-center">
          <span className="card-stat-value">{current.prefix} </span>
          {isAnswered ? (
            <span className="text-[#22c55e] font-bold underline decoration-2">{current.missing} </span>
          ) : (
            <span className="text-[#ff4d29] animate-pulse">_ </span>
          )}
          <span className="card-stat-value">{current.suffix}</span>
        </div>

        {/* Great job! */}
        <div className="mt-3 text-xs font-mono tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
          <span>Great job!</span>
          <span className="text-emerald-500">✓</span>
        </div>
      </div>

      {/* Bottom Metrics: SCORE, STREAK, and Smiley */}
      <div className="flex items-center justify-between pt-3 border-t card-divider">
        {/* Score */}
        <div>
          <div className="card-stat-label">
            SCORE
          </div>
          <div className="mt-1 text-base card-stat-value">
            {score}
          </div>
        </div>

        {/* Streak */}
        <div>
          <div className="card-stat-label">
            STREAK
          </div>
          <div className="mt-1 text-base card-stat-value">
            {streak}
          </div>
        </div>

        {/* Dotted Smiley Face */}
        <div className="w-8 h-8 rounded-full border border-zinc-500 flex items-center justify-center p-1 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 20 20">
            <circle cx="6.5" cy="7" r="1.2" fill="currentColor" />
            <circle cx="13.5" cy="7" r="1.2" fill="currentColor" />
            <path
              d="M 5.5 12 Q 10 16 14.5 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
