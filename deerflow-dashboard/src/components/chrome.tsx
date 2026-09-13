import type { ReactNode } from 'react';
import { DotText } from './DotText';
import { cn } from '../lib/utils';

export function Led({ pulse = false, className }: { pulse?: boolean; className?: string }) {
  return <span className={cn('df-led', pulse && 'df-led-pulse', className)} aria-hidden />;
}

export function Tile({
  children,
  className,
  onClick,
  label,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <article
      className={cn('df-tile', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={label}
    >
      {children}
    </article>
  );
}

export function TileHead({
  index,
  title,
  extra,
}: {
  index: string;
  title: string;
  extra?: ReactNode;
}) {
  return (
    <header className="mb-2 flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <Led />
        <DotText text={`${index} ${title}`} size={1.85} tone="soft" />
      </div>
      {extra}
    </header>
  );
}

export function Metrics({
  items,
}: {
  items: { k: string; v: string; accent?: boolean }[];
}) {
  return (
    <footer className="mt-auto grid grid-cols-3 gap-1 pt-3">
      {items.map((item) => (
        <div key={item.k} className="min-w-0 overflow-hidden">
          <DotText text={item.k} size={1.05} letterGap={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text={item.v} size={1.55} letterGap={1.55} tone={item.accent ? 'accent' : 'text'} />
          </div>
        </div>
      ))}
    </footer>
  );
}

export function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}) {
  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      <button
        type="button"
        aria-pressed={theme === 'dark'}
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M10.2 9.1A5.2 5.2 0 0 1 5 3.8 4.4 4.4 0 1 0 10.2 9.1Z" />
        </svg>
      </button>
      <button
        type="button"
        aria-pressed={theme === 'light'}
        aria-label="Light mode"
        onClick={() => setTheme('light')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="7" cy="7" r="2.4" />
          <path d="M7 1.4v1.5M7 11.1v1.5M1.4 7h1.5M11.1 7h1.5M3 3l1 1M10 10l1 1M3 11l1-1M10 4l1-1" />
        </svg>
      </button>
    </div>
  );
}
