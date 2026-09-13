import { useEffect, useState, type ReactNode } from 'react';
import {
  Bell,
  Calendar,
  CreditCard,
  Download,
  List,
  MoreHorizontal,
  Smartphone,
  Wallet,
  BarChart2,
  Star,
  Hexagon,
  Plus,
  Moon,
  Sun,
} from 'lucide-react';
import { Money } from './lib/Money';
import { cn } from './lib/utils';

type Theme = 'dark' | 'light';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('nebo-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nebo-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

function Card({
  children,
  className,
  area,
}: {
  children: ReactNode;
  className?: string;
  area?: string;
}) {
  return <section className={cn('nebo-card p-5', area, className)}>{children}</section>;
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      <button type="button" aria-pressed={theme === 'dark'} aria-label="Dark mode" onClick={() => setTheme('dark')}>
        <Moon className="h-3.5 w-3.5" strokeWidth={1.8} />
      </button>
      <button type="button" aria-pressed={theme === 'light'} aria-label="Light mode" onClick={() => setTheme('light')}>
        <Sun className="h-3.5 w-3.5" strokeWidth={1.8} />
      </button>
    </div>
  );
}

function Contactless({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8.5 8.2c1.8 1.6 1.8 6 0 7.6" />
      <path d="M12 6c3 2.6 3 9.4 0 12" />
      <path d="M15.5 4c4 3.6 4 12.4 0 16" />
    </svg>
  );
}

function PyramidMark() {
  return (
    <svg viewBox="0 0 220 180" className="mx-auto h-[140px] w-[170px]">
      <defs>
        <linearGradient id="pyr-top" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FF8F68" />
          <stop offset="40%" stopColor="#FF4D2D" />
          <stop offset="100%" stopColor="#C22710" />
        </linearGradient>
        <linearGradient id="pyr-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a4a4e" />
          <stop offset="100%" stopColor="#242426" />
        </linearGradient>
        <linearGradient id="pyr-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="100%" stopColor="#0e0e10" />
        </linearGradient>
      </defs>
      <polygon points="110,16 198,152 110,168" fill="url(#pyr-right)" />
      <polygon points="110,16 22,152 110,168" fill="url(#pyr-left)" />
      <polygon points="110,16 176,86 44,86" fill="url(#pyr-top)" />
    </svg>
  );
}

function FoldedMark() {
  return (
    <svg viewBox="0 0 240 170" className="h-[120px] w-[168px]">
      <defs>
        <linearGradient id="fold-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d2d2d6" />
        </linearGradient>
        <linearGradient id="fold-red" x1="0.2" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7A58" />
          <stop offset="50%" stopColor="#FF3D22" />
          <stop offset="100%" stopColor="#A81A0C" />
        </linearGradient>
        <filter id="fold-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#fold-shadow)">
        <path d="M22 124 L118 22 L138 48 L54 138 Z" fill="url(#fold-light)" />
        <path d="M118 22 L214 108 L148 148 L54 138 L138 48 Z" fill="url(#fold-red)" />
      </g>
    </svg>
  );
}

function UberMark() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#000] text-[11px] font-semibold text-white shadow-neu-sm">
      U
    </span>
  );
}

function BrandCard() {
  return (
    <Card area="area-brand" className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold tracking-tight">
          NEBO<span className="text-nebo-muted">.</span>Bank
        </h1>
        <Bell className="h-4 w-4 text-nebo-muted" strokeWidth={1.6} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['Instant Payments', 'Card reissues', 'Crypto exchange'].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="nebo-tile aspect-square w-full" />
            <p className="text-center text-[9px] font-medium leading-tight text-nebo-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { name: 'AT&T', amount: '20.00' },
          { name: 'Network', amount: '28.00' },
        ].map((row) => (
          <div key={row.name} className="flex items-center gap-2 rounded-2xl px-1 py-1">
            <Plus className="h-3 w-3 text-nebo-faint" strokeWidth={1.8} />
            <div className="min-w-0">
              <p className="truncate text-[11px] text-nebo-muted">{row.name}</p>
              <Money value={row.amount} size="sm" className="text-[12px] text-nebo-text" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DonutCard() {
  const legend = [
    { label: 'withdrawal', color: '#FF4D2D' },
    { label: 'travels', color: '#8d8d92' },
    { label: 'services', color: '#d8d8dc' },
    { label: 'payments', color: '#5c5c60' },
    { label: 'other', color: '#3a3a3c' },
  ];

  return (
    <Card area="area-donut" className="flex flex-col">
      <div className="flex items-start justify-between">
        <p className="nebo-label">November</p>
        <Money value="980.00" size="lg" />
      </div>

      <div className="relative mx-auto my-5 h-[148px] w-[148px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="38" fill="none" stroke="var(--chart-seg-3)" strokeWidth="20" />
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="var(--chart-seg-1)"
            strokeWidth="20"
            strokeDasharray="85 154"
            strokeDashoffset="-68"
          />
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="var(--chart-seg-2)"
            strokeWidth="20"
            strokeDasharray="36 203"
            strokeDashoffset="-153"
          />
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="#FF4D2D"
            strokeWidth="20"
            strokeDasharray="64 175"
            strokeDashoffset="0"
          />
        </svg>
      </div>

      <ul className="mt-auto grid grid-cols-3 gap-x-2 gap-y-2">
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 text-[10px] text-nebo-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function TransactionsCard() {
  const rows = [
    { brand: 'Uber', amount: '8.60', time: '11:34 AM', total: '2 909.42' },
    { brand: 'YouTube', amount: '4.00', time: '9:34 AM', total: '2 909.42' },
    { brand: 'Starbucks', amount: '3.80', time: '8:14 AM', total: '2 913.42' },
  ];

  return (
    <Card area="area-txns">
      <ul className="space-y-5">
        {rows.map((row) => (
          <li key={row.brand} className="flex items-start gap-3">
            {row.brand === 'Uber' ? (
              <UberMark />
            ) : (
              <span
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] text-white shadow-neu-sm"
                style={{ background: row.brand === 'YouTube' ? '#FF0000' : '#006241' }}
              >
                {row.brand === 'YouTube' ? '▶' : '★'}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-medium">{row.brand}</p>
                <Money value={row.amount} size="sm" className="text-[15px]" />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-nebo-faint">
                <span>{row.time}</span>
                <span>$ {row.total}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function GoalCard() {
  return (
    <Card area="area-goal" className="flex flex-col items-center text-center">
      <PyramidMark />
      <p className="mt-2 max-w-[200px] text-[13px] leading-snug text-nebo-text-soft">
        Divide incoming payments to achieve your goals
      </p>
      <button type="button" className="mt-5 text-[13px] font-medium text-nebo-text">
        Add goal
      </button>
    </Card>
  );
}

function CardsPanel() {
  return (
    <Card area="area-cards" className="flex flex-col">
      <div className="mb-5 flex items-center gap-2 text-[13px] font-medium">
        <List className="h-3.5 w-3.5 text-nebo-muted" strokeWidth={1.8} />
        Cards
      </div>

      <ul className="space-y-4">
        {[
          { last: '4086', name: 'Mastercard Gold', amount: '9 560.00' },
          { last: '8609', name: 'Visa Classic', amount: '28.00' },
        ].map((card) => (
          <li key={card.last} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-nebo-inset shadow-inset">
              <CreditCard className="h-3.5 w-3.5 text-nebo-muted" strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] text-nebo-faint">{card.last}</span>
                <Money value={card.amount} size="sm" className="text-[14px]" />
              </div>
              <p className="text-[11px] text-nebo-muted">{card.name}</p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-nebo-faint" />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-2 text-[13px] font-medium">
        <List className="h-3.5 w-3.5 text-nebo-muted" strokeWidth={1.8} />
        Deposits
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[12px] text-nebo-muted">Account overview</p>
        <div className="flex gap-3">
          {[Wallet, BarChart2, Star, Hexagon].map((Icon, i) => (
            <span
              key={i}
              className="grid h-9 w-9 place-items-center rounded-2xl bg-nebo-inset text-nebo-muted shadow-inset"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function BonusCard() {
  const rows = [
    { name: 'Uber', spent: '8.60', earned: '24' },
    { name: 'Givenchy', spent: '90.00', earned: '280' },
    { name: 'Starbucks', spent: '8.40', earned: '6' },
    { name: 'Lidl', spent: '4.20', earned: '3' },
  ];

  return (
    <Card area="area-bonus">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-10 w-1 rounded-full bg-nebo-accent" />
          <div>
            <p className="text-[34px] font-semibold leading-none tracking-tight">4 860</p>
            <p className="mt-1 text-[12px] text-nebo-muted">bonus points</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[11px] text-nebo-muted">my level</span>
          <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-nebo-inset text-[11px] font-semibold">
            3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 text-[10px] text-nebo-faint">
        <span>Transactions</span>
        <span>Spent</span>
        <span>Earned</span>
      </div>
      <ul className="mt-3 space-y-3">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 text-[13px]">
            <span>{row.name}</span>
            <Money value={row.spent} size="sm" className="text-[13px]" />
            <span className="w-10 text-right text-nebo-muted">{row.earned}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-text" />
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-faint" />
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-faint" />
      </div>
    </Card>
  );
}

function DesignCard() {
  return (
    <Card area="area-design" className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center justify-between text-[11px] text-nebo-faint">
        <span>3 / 4</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-nebo-inset">×</span>
      </div>

      <div className="rounded-[26px] bg-gradient-to-br from-[#2a2a2e] to-[#121214] p-4 shadow-neu-sm">
        <div className="mb-7 text-nebo-muted">
          <Calendar className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <p className="font-mono text-[13px] tracking-[0.16em] text-nebo-text-soft">4276 3800 4290 9864</p>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-[13px]">Sergi M</p>
          <Contactless className="h-5 w-5 text-nebo-muted" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-medium">Choose design</p>
          <p className="mt-1 text-[11px] text-nebo-muted">or upload your →</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-nebo-inset shadow-inset">
          <Download className="h-4 w-4 text-nebo-muted" strokeWidth={1.6} />
        </span>
      </div>

      <div className="relative mt-4 flex min-h-[180px] flex-1 items-center justify-center rounded-[28px] bg-[#0f0f11] px-4 py-6">
        <span className="absolute right-5 top-4 text-[10px] text-nebo-faint">01</span>
        <FoldedMark />
      </div>

      <button type="button" className="mt-5 shrink-0 self-center pb-1 text-[15px] font-medium">
        Next
        <span className="mx-auto mt-1 block h-px w-10 bg-nebo-accent" />
      </button>
    </Card>
  );
}

function BalanceCard() {
  return (
    <Card area="area-bal" className="py-4">
      <div className="mb-1 flex items-baseline justify-between">
        <Money value="8 460.94" size="md" />
        <span className="text-[10px] text-nebo-faint">%</span>
      </div>
      <p className="nebo-label">Month balance</p>
      <svg viewBox="0 0 320 72" className="mt-3 h-14 w-full">
        <path
          d="M0 48 C28 44, 48 52, 72 40 C96 28, 120 46, 150 38 C180 30, 210 18, 240 28 C270 38, 296 22, 320 26"
          fill="none"
          stroke="#FF4D2D"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </Card>
  );
}

function IconRow() {
  const items = [
    { icon: Smartphone, label: 'Phone Number' },
    { icon: CreditCard, label: 'Card' },
    { icon: List, label: 'List' },
  ];

  return (
    <div className="area-icons grid grid-cols-3 gap-3">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="nebo-card flex flex-col items-center justify-center gap-2 px-2 py-4">
          <Icon className="h-4 w-4 text-nebo-muted" strokeWidth={1.5} />
          {label === 'Phone Number' && (
            <span className="text-center text-[8px] leading-tight text-nebo-faint">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function MetalsCard() {
  const rows = [
    { name: 'Gold', buy: '48.98', sell: '44.70', color: '#E8B84A' },
    { name: 'Silver', buy: '0.56', sell: '0.52', color: '#C8C8CC' },
    { name: 'Platinum', buy: '30.44', sell: '27.70', color: '#8BA3B8' },
  ];

  return (
    <Card area="area-metals">
      <div className="mb-3 grid grid-cols-[1fr_auto_auto] gap-x-6 text-[10px] text-nebo-faint">
        <span>Metal</span>
        <span>Buy</span>
        <span>Sell</span>
      </div>
      <ul className="space-y-3.5">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-1 rounded-full" style={{ background: row.color }} />
              <span className="text-[13px]">{row.name}</span>
            </div>
            <Money value={row.buy} size="sm" className="text-[13px]" />
            <Money value={row.sell} size="sm" className="text-[13px] text-nebo-muted" />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-text" />
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-faint" />
        <span className="h-1.5 w-1.5 rounded-full bg-nebo-faint" />
      </div>
    </Card>
  );
}

function IncomeCard() {
  return (
    <Card area="area-income">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Money value="80.00" size="lg" />
          <p className="mt-1 nebo-label">Income</p>
        </div>
        <div className="h-14 w-24 rounded-[22px] bg-nebo-inset shadow-inset" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces"
          alt="Michael Loren"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-nebo-faint">by</p>
          <p className="text-[12px] leading-tight">Michael Loren</p>
        </div>
        <button
          type="button"
          className="rounded-full bg-nebo-inset px-5 py-2 text-[13px] font-medium shadow-inset"
        >
          Ok
        </button>
      </div>
    </Card>
  );
}

function RecurringCard() {
  return (
    <Card area="area-recur" className="flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-nebo-inset text-nebo-muted shadow-inset">
          ✓
        </span>
        <p className="text-[11px] text-nebo-muted">Every Sunday 11:00 AM</p>
      </div>
      <div className="mt-6">
        <Money value="100.94" size="lg" />
        <p className="mt-1 text-[12px] text-nebo-muted">to unicef foundation</p>
      </div>
    </Card>
  );
}

function NewCarCard() {
  return (
    <Card area="area-newcar">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] font-medium">New car</p>
        <MoreHorizontal className="h-4 w-4 text-nebo-faint" />
      </div>
      <div className="flex items-center justify-between text-[13px]">
        <Money value="8 900.00" size="sm" className="text-[15px]" />
        <Money value="14 000.00" size="sm" className="text-[13px] text-nebo-muted" />
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-nebo-inset">
        <div className="h-full w-[64%] rounded-full bg-nebo-text/80" />
      </div>
    </Card>
  );
}

function MiniBrand() {
  return (
    <Card area="area-brand2" className="flex items-center justify-between">
      <p className="text-[16px] font-semibold">
        NEBO<span className="text-nebo-muted">.</span>Bank
      </p>
      <Bell className="h-4 w-4 text-nebo-muted" strokeWidth={1.6} />
    </Card>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen px-4 py-5 md:px-6 lg:px-8">
      <div className="mb-4 flex justify-end">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div className="nebo-board mx-auto max-w-[1440px]">
        <BrandCard />
        <DonutCard />
        <TransactionsCard />
        <GoalCard />
        <CardsPanel />
        <BonusCard />
        <DesignCard />
        <BalanceCard />
        <IconRow />
        <MetalsCard />
        <IncomeCard />
        <RecurringCard />
        <NewCarCard />
        <MiniBrand />
      </div>
    </div>
  );
}
