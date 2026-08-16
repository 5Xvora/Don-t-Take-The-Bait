'use client';

import { Fish, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DecisionButtonsProps {
  disabled: boolean;
  onDecide: (guessIsPhishing: boolean) => void;
}

export function DecisionButtons({ disabled, onDecide }: DecisionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        size="lg"
        disabled={disabled}
        onClick={() => onDecide(false)}
        className={cn('h-16 gap-2 bg-lime-700 text-base font-bold hover:bg-lime-600')}
      >
        <ShieldCheck className="size-5" />
        Legit
      </Button>
      <Button
        type="button"
        size="lg"
        disabled={disabled}
        variant="destructive"
        onClick={() => onDecide(true)}
        className="h-16 gap-2 text-base font-bold"
      >
        <Fish className="size-5" />
        Phishing
      </Button>
    </div>
  );
}
