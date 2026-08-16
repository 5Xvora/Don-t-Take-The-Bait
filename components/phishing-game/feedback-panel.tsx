'use client';

import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Challenge } from '@/lib/phishing-game/challenges';
import type { RoundResult } from '@/hooks/use-phishing-game';

interface FeedbackPanelProps {
  challenge: Challenge;
  result: RoundResult;
  onNext: () => void;
}

export function FeedbackPanel({ challenge, result, onNext }: FeedbackPanelProps) {
  const isCorrect = result === 'correct';

  return (
    <div
      className={cn(
        'space-y-3 rounded-lg border p-4',
        isCorrect
          ? 'border-lime-500/50 bg-lime-100 text-lime-950'
          : 'border-red-500/50 bg-red-100 text-red-950',
      )}
    >
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <CheckCircle2 className="size-5 shrink-0 text-lime-700" />
        ) : (
          <XCircle className="size-5 shrink-0 text-red-700" />
        )}
        <p className="font-semibold">
          {isCorrect ? 'Correct!' : 'Not quite.'}{' '}
          <span className="opacity-80">
            This was actually {challenge.isPhishing ? 'a phishing attempt' : 'legitimate'}.
          </span>
        </p>
      </div>

      <p className="text-sm leading-relaxed opacity-90">{challenge.explanation}</p>

      {challenge.redFlags.length > 0 && (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1 text-xs font-medium opacity-80">
            <AlertTriangle className="size-3.5" /> Red flags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {challenge.redFlags.map((flag) => (
              <Badge
                key={flag}
                variant="outline"
                className={cn(
                  'text-xs',
                  isCorrect
                    ? 'border-lime-700/40 text-lime-950'
                    : 'border-red-700/40 text-red-950',
                )}
              >
                {flag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button type="button" onClick={onNext} className="w-full">
        Next round →
      </Button>
    </div>
  );
}
