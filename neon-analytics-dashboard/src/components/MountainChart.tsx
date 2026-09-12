import React, { useState, useRef, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { playTickSound, playBeaconPulseSound } from '../utils/audio';

interface MountainChartProps {
  soundEnabled: boolean;
}

export const MountainChart: React.FC<MountainChartProps> = ({ soundEnabled }) => {
  // Days from 8 to 30
  const days = useMemo(() => Array.from({ length: 23 }, (_, i) => i + 8), []);

  // Curve profile matching the screenshot's dramatic bell-shaped mountain
  // Peak is precisely at Day 17 with 1.954 points
  const rawPointsMap: Record<number, number> = useMemo(
    () => ({
      8: 0.12,
      9: 0.16,
      10: 0.22,
      11: 0.30,
      12: 0.42,
      13: 0.62,
      14: 0.95,
      15: 1.35,
      16: 1.70,
      17: 1.954, // The screenshot hero peak!
      18: 1.78,
      19: 1.50,
      20: 1.22,
      21: 0.98,
      22: 0.82,
      23: 0.74,
      24: 0.72,
      25: 0.78,
      26: 0.88,
      27: 1.02,
      28: 1.18,
      29: 1.32,
      30: 1.45,
    }),
    []
  );

  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [metricOption, setMetricOption] = useState<string>('Rank points');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const svgW = 900;
  const svgH = 260;
  const bottomPadding = 40;
  const topPadding = 45;
  const chartHeight = svgH - bottomPadding - topPadding;

  // Convert raw points to coordinate points
  const dayCoords = useMemo(() => {
    return days.map((day, idx) => {
      const x = (idx / (days.length - 1)) * (svgW - 80) + 40;
      const pts = rawPointsMap[day] || 1.0;
      // Max points in map is ~1.954, normalized to chart height
      const y = svgH - bottomPadding - (pts / 2.1) * chartHeight;
      return { day, pts, x, y };
    });
  }, [days, rawPointsMap, svgW, svgH, bottomPadding, topPadding, chartHeight]);

  // Construct smooth SVG cubic spline path
  const { pathD, areaD } = useMemo(() => {
    if (dayCoords.length < 2) return { pathD: '', areaD: '' };

    let d = `M ${dayCoords[0].x} ${dayCoords[0].y}`;
    for (let i = 0; i < dayCoords.length - 1; i++) {
      const p0 = dayCoords[i === 0 ? 0 : i - 1];
      const p1 = dayCoords[i];
      const p2 = dayCoords[i + 1];
      const p3 = dayCoords[i + 2 < dayCoords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 3.5;
      const cp1y = p1.y + (p2.y - p0.y) / 3.5;
      const cp2x = p2.x - (p3.x - p1.x) / 3.5;
      const cp2y = p2.y - (p3.y - p1.y) / 3.5;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const firstX = dayCoords[0].x;
    const lastX = dayCoords[dayCoords.length - 1].x;
    const baseFloor = svgH - bottomPadding + 10;
    const area = `${d} L ${lastX} ${baseFloor} L ${firstX} ${baseFloor} Z`;

    return { pathD: d, areaD: area };
  }, [dayCoords, svgH, bottomPadding]);

  // Current active point
  const activeCoord = useMemo(() => {
    return dayCoords.find((c) => c.day === selectedDay) || dayCoords[9];
  }, [dayCoords, selectedDay]);

  const handlePointerInteraction = (clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const scaleFactor = svgW / rect.width;
    const currentSvgX = relativeX * scaleFactor;

    // Find closest day
    let closest = dayCoords[0];
    let minDiff = Infinity;
    for (const c of dayCoords) {
      const diff = Math.abs(c.x - currentSvgX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = c;
      }
    }

    if (closest.day !== selectedDay) {
      setSelectedDay(closest.day);
      if (soundEnabled) {
        if (closest.day === 17) {
          playBeaconPulseSound();
        } else {
          playTickSound(800 + (closest.pts / 2) * 500, 0.02, 0.025);
        }
      }
    }
  };

  const metricOptions = ['Rank points', 'Succeed Sales', 'Focus Index', 'Production Efficiency'];

  return (
    <div className="relative pt-6 pb-2">
      {/* Top Controls Header: Dropdown selector */}
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="text-xs font-semibold text-slate-400 font-sans tracking-wide">
          TIMELINE TRAJECTORY (DAYS 08 — 30)
        </div>

        {/* Dropdown Button matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] text-xs font-medium text-slate-300 transition-all shadow-sm"
          >
            <span>{metricOption}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-obsidian-900/95 backdrop-blur-xl border border-white/10 shadow-2xl py-1 z-30">
              {metricOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setMetricOption(opt);
                    setIsDropdownOpen(false);
                    if (soundEnabled) playTickSound(950, 0.03, 0.03);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                    metricOption === opt
                      ? 'text-coral-400 font-semibold bg-white/[0.05]'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{opt}</span>
                  {metricOption === opt && <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Coordinate Grid & Mountain Waveform Canvas */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseDown={(e) => {
            setIsDragging(true);
            handlePointerInteraction(e.clientX);
          }}
          onMouseMove={(e) => {
            if (isDragging || e.buttons === 1) {
              handlePointerInteraction(e.clientX);
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            if (e.touches[0]) handlePointerInteraction(e.touches[0].clientX);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointerInteraction(e.touches[0].clientX);
          }}
        >
          <defs>
            {/* Luminous Orange/Coral Area Gradient */}
            <linearGradient id="mountainAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff7043" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#ff5722" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#d84315" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#bf360c" stopOpacity="0.0" />
            </linearGradient>

            {/* Radiant Crest Glow Filter */}
            <filter id="crestStrokeGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="5" result="glow1" />
              <feGaussianBlur stdDeviation="10" result="glow2" />
              <feMerge>
                <feMergeNode in="glow2" />
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing Beacon Halo Filter */}
            <filter id="beaconGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subdued Dark Coordinate Grid Lines */}
          <g className="opacity-30">
            {/* Horizontal Grid lines */}
            {[0.2, 0.45, 0.7, 0.95].map((factor, idx) => {
              const lineY = topPadding + factor * chartHeight;
              return (
                <line
                  key={`h-${idx}`}
                  x1={30}
                  y1={lineY}
                  x2={svgW - 30}
                  y2={lineY}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.75"
                  strokeDasharray={idx === 1 ? '3 3' : undefined}
                />
              );
            })}

            {/* Vertical Grid lines corresponding to day markers */}
            {dayCoords.map((c) => (
              <line
                key={`v-${c.day}`}
                x1={c.x}
                y1={topPadding}
                x2={c.x}
                y2={svgH - bottomPadding}
                stroke={c.day === selectedDay ? 'rgba(255, 120, 80, 0.25)' : 'rgba(255, 255, 255, 0.04)'}
                strokeWidth={c.day === selectedDay ? '1' : '0.5'}
              />
            ))}
          </g>

          {/* Glowing Area Fill */}
          <path
            d={areaD}
            fill="url(#mountainAreaGrad)"
            className="transition-all duration-300 pointer-events-none"
          />

          {/* Top Luminous Crest Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#ff7a59"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#crestStrokeGlow)"
            className="pointer-events-none"
          />

          {/* Thin Vertical Tracking Line for Active Day */}
          <line
            x1={activeCoord.x}
            y1={activeCoord.y}
            x2={activeCoord.x}
            y2={svgH - bottomPadding}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            className="pointer-events-none transition-all duration-200"
          />

          {/* Concentric Halo Beacon Node at Active Peak */}
          <g className="pointer-events-none transition-all duration-200" style={{ transform: `translate(${activeCoord.x}px, ${activeCoord.y}px)` }}>
            {/* Outer corona aura */}
            <circle
              r="14"
              fill="rgba(255, 87, 34, 0.35)"
              filter="url(#beaconGlow)"
              className="animate-pulse"
            />
            {/* Mid ring */}
            <circle
              r="6.5"
              fill="#ff6e40"
              stroke="#ffffff"
              strokeWidth="2"
              className="shadow-lg"
            />
            {/* Center luminous white core */}
            <circle r="3" fill="#ffffff" />
          </g>

          {/* Floating Dark Capsule Badge: e.g. "1.954 POINTS" */}
          <g
            className="pointer-events-none transition-all duration-200"
            style={{
              transform: `translate(${activeCoord.x}px, ${Math.max(activeCoord.y - 30, 20)}px)`,
            }}
          >
            {/* Tooltip Capsule Container */}
            <rect
              x="-48"
              y="-14"
              width="96"
              height="26"
              rx="13"
              fill="#0d0e14"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1"
              className="shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            />
            {/* Tooltip text */}
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.05em"
            >
              {activeCoord.pts.toFixed(3)} POINTS
            </text>
          </g>
        </svg>

        {/* X-Axis Timeline Day Labels (8 to 30) */}
        <div className="relative flex justify-between items-center px-6 pt-1 text-[11px] font-mono select-none">
          {dayCoords.map((c) => {
            const isCurrent = c.day === selectedDay;
            return (
              <button
                key={c.day}
                onClick={() => {
                  setSelectedDay(c.day);
                  if (soundEnabled) {
                    if (c.day === 17) playBeaconPulseSound();
                    else playTickSound(850, 0.02, 0.02);
                  }
                }}
                className={`transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'px-2 py-0.5 rounded-full bg-obsidian-800 text-white font-bold border border-white/20 shadow-[0_0_10px_rgba(255,87,34,0.3)] scale-110'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {c.day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
