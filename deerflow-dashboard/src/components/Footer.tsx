import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 select-none font-mono">
      {/* BUILD ANYTHING WITH INTELLIGENCE _ */}
      <div>
        <div className="text-base sm:text-lg font-bold tracking-[0.15em] text-zinc-800 dark:text-zinc-300 uppercase font-pixel leading-relaxed">
          BUILD ANYTHING
        </div>
        <div className="text-base sm:text-lg font-bold tracking-[0.15em] text-zinc-800 dark:text-zinc-300 uppercase font-pixel leading-relaxed flex items-center">
          WITH INTELLIGENCE
          <span className="inline-block text-[#ff4d29] ml-1.5 text-xl font-bold animate-cursor">
            _
          </span>
        </div>
      </div>

      {/* DeerFlow by Henry */}
      <div className="text-right font-mono self-end sm:self-auto">
        <div className="text-sm sm:text-base font-pixel tracking-wider text-zinc-800 dark:text-zinc-300">
          DeerFlow
        </div>
        <div className="text-xs sm:text-sm font-mono tracking-wider text-zinc-500">
          by Henry
        </div>
      </div>
    </footer>
  );
};
