'use client';

import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface GameHudProps {
  lives: number;
  maxLives: number;
  score: number;
  combo: number;
  difficulty: number;
  round: number;
}

export function GameHud({ lives, maxLives, score, combo, difficulty, round }: GameHudProps) {
  return (
    <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1" aria-label={`${lives} lives remaining`}>
        {Array.from({ length: maxLives }).map((_, i) => (
          <Heart
            key={i}
            className={cn(
              'size-5 transition-all',
              i < lives ? 'fill-rose-500 text-rose-500' : 'fill-none text-muted-foreground/30',
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Score</span>
          <span className="font-bold tabular-nums">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Round</span>
          <span className="font-bold tabular-nums">{round}</span>
        </div>
        {combo > 1 && (
          <Badge className="animate-pulse bg-amber-500 text-black">🔥 {combo}x combo</Badge>
        )}
      </div>

      <Badge variant="outline" className="font-mono">
        LVL {difficulty}
      </Badge>
    </div>
  );
}
