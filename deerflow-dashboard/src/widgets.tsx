import { useMemo, useState } from 'react';
import { DotText } from './components/DotText';
import { Led, Metrics, Tile, TileHead } from './components/chrome';

function Dots({
  points,
  r = 1.6,
  fill = 'var(--df-text)',
}: {
  points: [number, number][];
  r?: number;
  fill?: string;
}) {
  return (
    <>
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill} />
      ))}
    </>
  );
}

export function AgentStatus() {
  const bars = [4, 8, 14, 9, 18, 11, 22, 7, 16, 10, 20, 6, 13, 9, 5];
  return (
    <Tile>
      <TileHead index="01" title="AGENT STATUS" />
      <DotText text="THINKING.." size={3.1} className="mt-1" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <svg viewBox="0 0 200 100" className="h-[100px] w-[200px]">
          <circle cx="74" cy="20" r="3" fill="var(--df-text)" />
          <circle cx="126" cy="20" r="3" fill="var(--df-text)" />
          {bars.map((h, i) => (
            <rect
              key={i}
              className="wave-bar"
              x={22 + i * 10.4}
              y={88 - h}
              width="4"
              height={h}
              rx="1.6"
              fill={i === 8 ? 'var(--df-accent)' : 'var(--df-text)'}
              style={{ animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </svg>
      </div>
      <Metrics
        items={[
          { k: 'STEPS', v: '128' },
          { k: 'TOOLS', v: '12' },
          { k: 'MEMORY', v: '98%' },
        ]}
      />
    </Tile>
  );
}

export function ClaudeCodex() {
  const heights = [10, 16, 12, 22, 18, 14, 26, 20, 16, 24, 18, 14, 28, 22, 12, 20, 16, 10];
  return (
    <Tile>
      <TileHead index="02" title="CLAUDE / CODEX" />
      <DotText text="12.4K" size={4.4} className="mt-2" />
      <DotText text="TOKENS" size={1.5} tone="muted" className="mt-1" />
      <div className="flex flex-1 items-end py-3">
        <svg viewBox="0 0 220 56" className="h-14 w-full">
          {heights.map((h, i) => (
            <rect
              key={i}
              x={6 + i * 12}
              y={56 - h}
              width="6.5"
              height={h}
              rx="2"
              fill={i >= heights.length - 2 ? 'var(--df-accent)' : 'var(--df-text)'}
            />
          ))}
        </svg>
      </div>
      <div className="mt-auto flex items-end justify-between pt-2">
        <div>
          <DotText text="REQUESTS" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="24" size={1.85} />
          </div>
        </div>
        <DotText text="+18%" size={1.85} tone="accent" />
      </div>
    </Tile>
  );
}

export function DeviceOverview() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <Tile>
      <TileHead index="03" title="DEVICE OVERVIEW" />
      <div className="relative flex flex-1 items-center justify-center">
        <svg viewBox="0 0 160 160" className="h-[148px] w-[148px]">
          {ticks.map((i) => {
            const a = ((i / 60) * 360 - 90) * (Math.PI / 180);
            const inner = i % 5 === 0 ? 58 : 62;
            const outer = 70;
            const accent = i < 4 || i > 56;
            return (
              <line
                key={i}
                x1={80 + Math.cos(a) * inner}
                y1={80 + Math.sin(a) * inner}
                x2={80 + Math.cos(a) * outer}
                y2={80 + Math.sin(a) * outer}
                stroke={accent ? 'var(--df-accent)' : 'var(--df-text)'}
                strokeWidth={i % 5 === 0 ? 1.6 : 1}
                strokeLinecap="round"
                opacity={accent ? 1 : 0.85}
              />
            );
          })}
          <circle cx="80" cy="80" r="2" fill="var(--df-accent)" />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
          <DotText text="128" size={3.2} />
          <div className="mt-2">
            <DotText text="DEVICES" size={1.15} tone="muted" />
          </div>
        </div>
      </div>
      <Metrics
        items={[
          { k: 'ONLINE', v: '96%' },
          { k: 'OFFLINE', v: '4%' },
          { k: 'ALERTS', v: '2', accent: true },
        ]}
      />
    </Tile>
  );
}

export function TeslaStatus() {
  return (
    <Tile>
      <TileHead
        index="04"
        title="TESLA STATUS"
        extra={
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="var(--df-muted)" strokeWidth="1.2">
            <rect x="2.5" y="6" width="7" height="6.5" rx="1.2" />
            <path d="M4 6V4.2a2 2 0 0 1 4 0V6" />
          </svg>
        }
      />
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 240 70" className="h-[70px] w-[240px]">
          <path
            d="M16 46 C28 46, 36 34, 62 30 C92 25, 118 22, 150 26 C176 29, 194 36, 208 40 C216 42, 226 44, 228 46 C226 50, 214 51, 16 51 Z"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
          <path
            d="M48 32 C78 18, 130 16, 168 28"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.25"
          />
          <circle cx="64" cy="52" r="7.5" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <circle cx="64" cy="52" r="2.4" fill="var(--df-text)" />
          <circle cx="176" cy="52" r="7.5" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <circle cx="176" cy="52" r="2.4" fill="var(--df-text)" />
        </svg>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-4 pt-2">
        <div>
          <DotText text="BATTERY" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="78%" size={1.85} />
          </div>
        </div>
        <div>
          <DotText text="RANGE" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="312km" size={1.85} />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <DotText text="PARKED" size={1.45} tone="muted" />
      </div>
    </Tile>
  );
}

export function PharmaTrack() {
  return (
    <Tile>
      <TileHead index="05" title="PHARMA TRACK" />
      <div className="mt-1 space-y-1">
        <DotText text="COMPOUND a1-07" size={1.55} tone="soft" />
        <DotText text="PHASE II" size={1.55} tone="muted" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 96 44" className="h-12 w-28">
          <rect x="4" y="8" width="88" height="28" rx="14" fill="var(--df-text)" />
          <rect x="48" y="8" width="44" height="28" rx="14" fill="var(--df-accent)" />
          <rect x="44" y="8" width="10" height="28" fill="var(--df-card)" />
        </svg>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-4 w-4 place-items-center rounded-full border border-current text-[8px] text-df-text">
          ✓
        </span>
        <span className="grid h-4 w-4 place-items-center rounded-full border border-[var(--df-accent)] text-[8px] text-df-accent">
          ✓
        </span>
      </div>
      <div>
        <DotText text="PROGRESS" size={1.35} tone="muted" />
        <div className="mt-1">
          <DotText text="66%" size={1.85} />
        </div>
      </div>
    </Tile>
  );
}

export function MedicalMonitor() {
  return (
    <Tile>
      <TileHead index="06" title="MEDICAL MONITOR" />
      <div className="flex flex-1 items-center">
        <svg viewBox="0 0 240 70" className="h-[70px] w-full">
          <path
            className="ecg-line"
            d="M0 36 H22 L28 36 L34 28 L40 36 H58 L64 36 L70 8 L78 62 L86 36 H120 L126 36 L132 24 L138 36 H158 L164 36 L170 12 L178 58 L186 36 H240"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.55"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <Metrics
        items={[
          { k: 'HR', v: '72 BPM' },
          { k: 'SPO2', v: '98%' },
          { k: 'TEMP', v: '36.6°C' },
        ]}
      />
      <div className="mt-2">
        <DotText text="STABLE" size={1.45} tone="muted" />
      </div>
    </Tile>
  );
}

export function BioSensor() {
  const leaf = useMemo(() => {
    const pts: [number, number][] = [];
    for (let y = 10; y <= 78; y += 3.6) {
      const t = (y - 10) / 68;
      const w = Math.sin(t * Math.PI) * (18 + t * 4);
      for (let x = -w; x <= w; x += 3.6) {
        const taper = 1 - Math.abs(x) / (w + 0.01);
        if (taper > 0.08) pts.push([70 + x * 0.92, y]);
      }
    }
    for (let i = 0; i < 7; i++) pts.push([70, 80 + i * 3.4]);
    return pts;
  }, []);

  return (
    <Tile>
      <TileHead index="07" title="BIO SENSOR" />
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 140 120" className="h-[120px] w-[140px]">
          <Dots points={leaf} r={1.55} />
        </svg>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
        <div>
          <DotText text="MOISTURE" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="64%" size={1.85} />
          </div>
        </div>
        <div>
          <DotText text="LIGHT" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="4280 lux" size={1.7} />
          </div>
        </div>
      </div>
    </Tile>
  );
}

export function WordPlay() {
  const [filled, setFilled] = useState(false);
  return (
    <Tile
      className="cursor-pointer"
      label="Word play, fill the blank"
      onClick={() => setFilled((v) => !v)}
    >
      <TileHead index="08" title="WORD PLAY" />
      <DotText text="Filling in the blankly" size={1.45} tone="muted" className="mt-1" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <DotText text={filled ? '- CODE -' : '- C_DE -'} size={3.8} />
        <DotText text="Great job!" size={1.6} tone="soft" />
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
        <div>
          <DotText text="SCORE" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="720" size={1.85} />
          </div>
        </div>
        <div>
          <DotText text="STREAK" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="12" size={1.85} />
          </div>
        </div>
      </div>
    </Tile>
  );
}

export function RetailAnalytics() {
  return (
    <Tile>
      <TileHead
        index="09"
        title="RETAIL ANALYTICS"
        extra={
          <span className="flex items-center gap-1.5">
            <DotText text="LIVEVIEW" size={1.3} tone="muted" />
            <Led pulse />
          </span>
        }
      />
      <DotText text="1.28K" size={4.2} className="mt-2" />
      <DotText text="VISITORS" size={1.45} tone="muted" className="mt-1" />
      <div className="flex flex-1 items-center py-2">
        <svg viewBox="0 0 220 56" className="h-14 w-full">
          <polyline
            points="4,40 28,36 48,42 72,28 96,32 120,18 148,24 176,14 204,20 216,16"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="216" cy="16" r="3" fill="var(--df-accent)" />
        </svg>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <DotText text="SALES" size={1.35} tone="muted" />
        <DotText text="+23%" size={1.85} tone="accent" />
      </div>
    </Tile>
  );
}

export function Entertainment({ playing, setPlaying }: { playing: boolean; setPlaying: (v: boolean) => void }) {
  return (
    <Tile>
      <TileHead
        index="10"
        title="ENTERTAINMENT"
        extra={
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="var(--df-muted)" strokeWidth="1.2">
            <path d="M1 4h3l3-3v10L4 8H1z" />
            <path d="M10 3.5c1.2 1.2 1.2 3.8 0 5" />
            <path d="M12 2c2.2 2 2.2 6 0 8" />
          </svg>
        }
      />
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 140 140" className="h-[132px] w-[132px]">
          {[18, 28, 38, 48, 58].map((r, i) => (
            <circle
              key={r}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke="var(--df-text)"
              strokeWidth="1.15"
              strokeDasharray="1.6 4.8"
              className={playing ? 'ring-spin' : undefined}
              style={{ animationDuration: `${22 - i * 3}s` }}
            />
          ))}
          <circle cx="70" cy="70" r="5" fill="var(--df-accent)" />
        </svg>
      </div>
      <div className="mt-auto flex items-center justify-center gap-8 pt-1">
        <button type="button" aria-label="Previous" className="text-df-text">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
            <path d="M8 1 2 6l6 5V1Zm6 0-6 5 6 5V1Z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying(!playing)}
          className="grid h-7 w-7 place-items-center rounded-full"
        >
          {playing ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="var(--df-accent)">
              <rect width="3" height="12" />
              <rect x="7" width="3" height="12" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--df-accent)">
              <path d="M2 1v10l9-5Z" />
            </svg>
          )}
        </button>
        <button type="button" aria-label="Next" className="text-df-text">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
            <path d="M0 1l6 5-6 5V1Zm8 0 6 5-6 5V1Z" />
          </svg>
        </button>
      </div>
    </Tile>
  );
}

export function GameZone() {
  const [lives, setLives] = useState(3);
  return (
    <Tile>
      <TileHead index="11" title="GAME ZONE" />
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 120 90" className="h-[90px] w-[120px]">
          <polygon
            points="60,14 50,78 60,66 70,78"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="40" r="1.5" fill="var(--df-text)" />
          <circle cx="94" cy="28" r="1.5" fill="var(--df-text)" />
          <circle cx="86" cy="62" r="1.5" fill="var(--df-accent)" />
        </svg>
      </div>
      <div>
        <DotText text="SCORE" size={1.35} tone="muted" />
        <div className="mt-1">
          <DotText text="08920" size={2.1} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Life ${i + 1}`}
            onClick={() => setLives(i + 1)}
          >
            <svg width="14" height="12" viewBox="0 0 14 12">
              <path
                d="M7 11C3 8 1 6.2 1 3.8 1 2.2 2.2 1 3.8 1 4.8 1 5.7 1.5 7 3c1.3-1.5 2.2-2 3.2-2C11.8 1 13 2.2 13 3.8 13 6.2 11 8 7 11Z"
                fill={i < lives ? 'var(--df-accent)' : 'var(--df-faint)'}
              />
            </svg>
          </button>
        ))}
      </div>
    </Tile>
  );
}

export function VisionAi() {
  return (
    <Tile>
      <TileHead
        index="12"
        title="VISION AI"
        extra={
          <span className="flex items-center gap-1.5">
            <DotText text="REC" size={1.3} tone="muted" />
            <Led pulse />
          </span>
        }
      />
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 140 120" className="h-[120px] w-[140px]">
          <path d="M18 38 V22 H36" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <path d="M104 22 H122 V38" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <path d="M18 82 V98 H36" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <path d="M104 98 H122 V82" fill="none" stroke="var(--df-text)" strokeWidth="1.4" />
          <path
            d="M54 74 L70 40 L86 74 L70 66 Z"
            fill="none"
            stroke="var(--df-text)"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path d="M70 40 L86 50 L86 74" fill="none" stroke="var(--df-text)" strokeWidth="1.2" />
          <circle cx="70" cy="60" r="1.6" fill="var(--df-accent)" />
        </svg>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
        <div>
          <DotText text="OBJECTS" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="3" size={1.85} />
          </div>
        </div>
        <div>
          <DotText text="CONFIDENCE" size={1.35} tone="muted" />
          <div className="mt-1">
            <DotText text="92%" size={1.85} />
          </div>
        </div>
      </div>
    </Tile>
  );
}
