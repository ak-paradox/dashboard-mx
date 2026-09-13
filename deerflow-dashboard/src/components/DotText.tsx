import { glyphFor } from '../lib/glyphs';
import { cn } from '../lib/utils';

type Tone = 'text' | 'soft' | 'muted' | 'faint' | 'accent' | 'ink' | 'chrome';

const TONE: Record<Tone, string> = {
  text: 'var(--df-text)',
  soft: 'var(--df-text-soft)',
  muted: 'var(--df-muted)',
  faint: 'var(--df-faint)',
  accent: 'var(--df-accent)',
  ink: 'var(--df-ink)',
  chrome: 'var(--df-chrome)',
};

export function DotText({
  text,
  size = 2.1,
  gap = 0.55,
  letterGap,
  tone = 'text',
  color,
  className,
  blinkLast,
}: {
  text: string;
  size?: number;
  gap?: number;
  letterGap?: number;
  tone?: Tone;
  color?: string;
  className?: string;
  blinkLast?: boolean;
}) {
  const fill = color ?? TONE[tone];
  const lg = letterGap ?? size * 1.15;
  const cell = size + gap;
  let x = size * 0.55;
  const letters = [...text].map((ch, i) => {
    const glyph = glyphFor(ch);
    const ox = x;
    x += 5 * cell + lg;
    return { ch, glyph, ox, i };
  });
  const width = Math.max(x - lg + size, size * 2);
  const height = 7 * cell + size;

  return (
    <svg
      className={cn('dot-text', className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label={text}
      role="img"
    >
      {letters.map(({ glyph, ox, i, ch }) =>
        glyph.flatMap((row, r) =>
          [...row].map((bit, c) => {
            if (bit !== '1') return null;
            const isCursor = blinkLast && i === letters.length - 1 && ch === '_';
            return (
              <circle
                key={`${i}-${r}-${c}`}
                cx={ox + c * cell}
                cy={size * 0.55 + r * cell}
                r={size * 0.46}
                fill={fill}
                className={isCursor ? 'dot-cursor' : undefined}
              />
            );
          }),
        ),
      )}
    </svg>
  );
}
