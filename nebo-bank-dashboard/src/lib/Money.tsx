import { cn } from './utils';

export function Money({
  value,
  className,
  size = 'md',
}: {
  value: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [dollars, cents] = value.replace('$', '').trim().split('.');
  const sizeClass =
    size === 'lg'
      ? 'nebo-amount-lg'
      : size === 'sm'
        ? 'text-sm font-semibold'
        : 'nebo-amount';

  return (
    <span className={cn(sizeClass, className)}>
      <span className="font-medium text-nebo-muted">$</span> {dollars}
      {cents !== undefined && <span className="currency-cents">.{cents}</span>}
    </span>
  );
}
