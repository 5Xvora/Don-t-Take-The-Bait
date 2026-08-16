'use client';

import { cn } from '@/lib/utils';

interface TimerBarProps {
  timeLeft: number;
  maxTime: number;
}

export function TimerBar({ timeLeft, maxTime }: TimerBarProps) {
  const pct = (timeLeft / maxTime) * 100;
  const urgent = timeLeft <= 5;
  const warning = timeLeft <= 9;

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'w-8 text-right font-mono text-sm font-bold tabular-nums transition-colors',
          urgent ? 'text-red-400' : warning ? 'text-amber-400' : 'text-foreground/70',
        )}
      >
        {timeLeft}s
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-linear',
            urgent  ? 'bg-red-500 shadow-[0_0_8px_theme(colors.red.500)]'
            : warning ? 'bg-amber-400 shadow-[0_0_6px_theme(colors.amber.400)]'
            : 'bg-primary shadow-[0_0_6px_theme(colors.primary/50)]',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
