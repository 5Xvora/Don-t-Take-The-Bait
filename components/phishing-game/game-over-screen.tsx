'use client';

import { RotateCcw, Skull, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameOverScreenProps {
  score: number;
  bestCombo: number;
  round: number;
  isNewBest: boolean;
  onRestart: () => void;
}

export function GameOverScreen({ score, bestCombo, round, isNewBest, onRestart }: GameOverScreenProps) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <div className="mb-2 rounded-full bg-rose-500/10 p-3">
          <Skull className="size-8 text-rose-500" />
        </div>
        <CardTitle className="text-2xl">Caught by the Phish!</CardTitle>
        {isNewBest && (
          <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-amber-500">
            <Trophy className="size-4" /> New best score!
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <Stat label="Score" value={score} />
          <Stat label="Rounds" value={round} />
          <Stat label="Best Combo" value={bestCombo} />
        </div>
        <Button size="lg" onClick={onRestart} className="w-full gap-2">
          <RotateCcw className="size-4" />
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-muted/40 p-2">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
