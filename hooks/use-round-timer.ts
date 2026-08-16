'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TIMER_SECONDS = 15;

interface UseRoundTimerOptions {
  active: boolean;       // run only when question is visible and unanswered
  onExpire: () => void;  // called when countdown hits zero
}

export function useRoundTimer({ active, onExpire }: UseRoundTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Reset to full whenever we become active (new question shown)
  useEffect(() => {
    if (active) setTimeLeft(TIMER_SECONDS);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      onExpireRef.current();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [active, timeLeft]);

  const reset = useCallback(() => setTimeLeft(TIMER_SECONDS), []);

  return { timeLeft, maxTime: TIMER_SECONDS, reset };
}
