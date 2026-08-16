'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { CHALLENGES, type Challenge, type Difficulty } from '@/lib/phishing-game/challenges';

const STARTING_LIVES = 3;
const MAX_DIFFICULTY: Difficulty = 5;
// How many correct answers (roughly) before difficulty ramps up by one level.
const LEVEL_UP_EVERY = 3;

export type RoundResult = 'correct' | 'wrong' | null;

interface GameState {
  status: 'idle' | 'playing' | 'game-over';
  lives: number;
  score: number;
  combo: number;
  bestCombo: number;
  round: number;
  difficulty: Difficulty;
  current: Challenge | null;
  lastResult: RoundResult;
  usedIds: string[];
}

function pickChallenge(difficulty: Difficulty, usedIds: string[]): Challenge {
  // Pool priority:
  // 1. Unseen challenges at current difficulty
  // 2. Unseen challenges at any difficulty ≤ current
  // 3. If ALL challenges have been seen this cycle, reset and pick from current difficulty
  // Never returns a challenge that was seen in the current cycle unless the full
  // pool is exhausted — at that point we start a fresh cycle automatically.
  const unseenAtLevel  = CHALLENGES.filter((c) => c.difficulty === difficulty && !usedIds.includes(c.id));
  const unseenAnyLevel = CHALLENGES.filter((c) => c.difficulty <= difficulty  && !usedIds.includes(c.id));
  const allUnseen      = CHALLENGES.filter((c) => !usedIds.includes(c.id));

  const pool = unseenAtLevel.length  > 0 ? unseenAtLevel
             : unseenAnyLevel.length > 0 ? unseenAnyLevel
             : allUnseen.length      > 0 ? allUnseen
             : CHALLENGES; // absolute fallback (all seen globally)

  return pool[Math.floor(Math.random() * pool.length)];
}

export function usePhishingGame() {
  const [state, setState] = useState<GameState>({
    status: 'idle',
    lives: STARTING_LIVES,
    score: 0,
    combo: 0,
    bestCombo: 0,
    round: 0,
    difficulty: 1,
    current: null,
    lastResult: null,
    usedIds: [],
  });
  const correctStreakRef = useRef(0);

  const start = useCallback(() => {
    correctStreakRef.current = 0;
    const first = pickChallenge(1, []);
    setState({
      status: 'playing',
      lives: STARTING_LIVES,
      score: 0,
      combo: 0,
      bestCombo: 0,
      round: 1,
      difficulty: 1,
      current: first,
      lastResult: null,
      usedIds: [first.id],
    });
  }, []);

  const answer = useCallback((guessIsPhishing: boolean) => {
    setState((prev) => {
      if (prev.status !== 'playing' || !prev.current) return prev;
      const isCorrect = guessIsPhishing === prev.current.isPhishing;

      let nextLives = prev.lives;
      let nextCombo = prev.combo;
      let nextScore = prev.score;
      let nextDifficulty = prev.difficulty;

      if (isCorrect) {
        nextCombo = prev.combo + 1;
        correctStreakRef.current += 1;
        const comboBonus = Math.min(nextCombo - 1, 5) * 5;
        const difficultyBonus = prev.difficulty * 10;
        nextScore = prev.score + 20 + comboBonus + difficultyBonus;

        if (correctStreakRef.current % LEVEL_UP_EVERY === 0) {
          nextDifficulty = Math.min(MAX_DIFFICULTY, prev.difficulty + 1) as Difficulty;
        }
      } else {
        nextLives = prev.lives - 1;
        nextCombo = 0;
      }

      const isGameOver = nextLives <= 0;

      return {
        ...prev,
        status: isGameOver ? 'game-over' : 'playing',
        lives: nextLives,
        score: nextScore,
        combo: nextCombo,
        bestCombo: Math.max(prev.bestCombo, nextCombo),
        lastResult: isCorrect ? 'correct' : 'wrong',
        difficulty: nextDifficulty,
      };
    });
  }, []);

  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;
      // When every challenge has been seen, start a fresh cycle so they
      // rotate without repeating within the same cycle.
      const cycleUsedIds = prev.usedIds.length >= CHALLENGES.length ? [] : prev.usedIds;
      const next = pickChallenge(prev.difficulty, cycleUsedIds);
      return {
        ...prev,
        round: prev.round + 1,
        current: next,
        lastResult: null,
        usedIds: [...cycleUsedIds, next.id],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      lives: STARTING_LIVES,
      score: 0,
      combo: 0,
      bestCombo: 0,
      round: 0,
      difficulty: 1,
      current: null,
      lastResult: null,
      usedIds: [],
    });
  }, []);

  const maxLives = STARTING_LIVES;

  return useMemo(
    () => ({ ...state, maxLives, start, answer, nextRound, reset }),
    [state, maxLives, start, answer, nextRound, reset],
  );
}
