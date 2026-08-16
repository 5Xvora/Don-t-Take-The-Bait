'use client';

import { ShieldAlert, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StartScreenProps {
  onStart: () => void;
  bestScore: number | null;
}

export function StartScreen({ onStart, bestScore }: StartScreenProps) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <div className="mb-2 rounded-full bg-primary/10 p-3">
          <ShieldAlert className="size-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Spot the Phish</CardTitle>
        <p className="text-sm text-muted-foreground">
          Real emails, links, and texts vs. cleverly faked ones. You have 3 lives —
          how far can you get before the scammers catch you off guard?
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {bestScore !== null && (
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Trophy className="size-4 text-amber-500" /> Best score: <span className="font-bold">{bestScore}</span>
          </p>
        )}
        <Button size="lg" onClick={onStart} className="w-full">
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
}
