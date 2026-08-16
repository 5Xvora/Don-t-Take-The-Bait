'use client';

import { useEffect, useState } from 'react';
import { usePhishingGame } from '@/hooks/use-phishing-game';
import { useRoundTimer } from '@/hooks/use-round-timer';
import { GameHud } from '@/components/phishing-game/game-hud';
import { MessageCard } from '@/components/phishing-game/message-card';
import { DecisionButtons } from '@/components/phishing-game/decision-buttons';
import { FeedbackPanel } from '@/components/phishing-game/feedback-panel';
import { StartScreen } from '@/components/phishing-game/start-screen';
import { GameOverScreen } from '@/components/phishing-game/game-over-screen';
import { TimerBar } from '@/components/phishing-game/timer-bar';
import { cn } from '@/lib/utils';

const BEST_SCORE_KEY = 'spot-the-phish-best-score';

export function PhishingGame() {
  const game = usePhishingGame();
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null);
  // Controls the slide-in animation key — changes on each new question
  const [cardKey, setCardKey] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  const timerActive = game.status === 'playing' && !game.lastResult;

  const { timeLeft, maxTime } = useRoundTimer({
    active: timerActive,
    onExpire: () => {
      // Time ran out → count as wrong answer (picked neither)
      game.answer(game.current?.isPhishing ? false : true);
    },
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(BEST_SCORE_KEY);
    if (stored) setBestScore(Number(stored));
  }, []);

  useEffect(() => {
    if (game.status === 'game-over') {
      setBestScore((prev) => {
        if (prev === null || game.score > prev) {
          window.localStorage.setItem(BEST_SCORE_KEY, String(game.score));
          return game.score;
        }
        return prev;
      });
    }
  }, [game.status, game.score]);

  // Flash ring on answer
  useEffect(() => {
    if (game.lastResult) {
      setFlash(game.lastResult);
      const t = setTimeout(() => setFlash(null), 400);
      return () => clearTimeout(t);
    }
  }, [game.lastResult, game.round]);

  // Slide-out → swap card → slide-in on new round
  const handleNext = () => {
    setCardVisible(false);
    setTimeout(() => {
      game.nextRound();
      setCardKey((k) => k + 1);
      setCardVisible(true);
    }, 220);
  };

  const isNewBest = game.status === 'game-over' && bestScore === game.score && game.score > 0;

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {game.status === 'idle' && <StartScreen onStart={game.start} bestScore={bestScore} />}

      {game.status === 'playing' && game.current && (
        <div
          className={cn(
            'space-y-4 rounded-xl transition-all duration-300',
            flash === 'correct' && 'ring-4 ring-lime-500/50',
            flash === 'wrong'   && 'ring-4 ring-red-500/50',
          )}
        >
          <GameHud
            lives={game.lives}
            maxLives={game.maxLives}
            score={game.score}
            combo={game.combo}
            difficulty={game.difficulty}
            round={game.round}
          />

          {/* Timer — only shown while question is unanswered */}
          {!game.lastResult && (
            <TimerBar timeLeft={timeLeft} maxTime={maxTime} />
          )}

          {/* Animated card area */}
          <div
            key={cardKey}
            className={cn(
              'transition-all duration-200',
              cardVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-3 opacity-0',
            )}
          >
            <MessageCard challenge={game.current} />
          </div>

          {game.lastResult ? (
            <FeedbackPanel
              challenge={game.current}
              result={game.lastResult}
              onNext={handleNext}
            />
          ) : (
            <DecisionButtons disabled={false} onDecide={game.answer} />
          )}
        </div>
      )}

      {game.status === 'game-over' && (
        <GameOverScreen
          score={game.score}
          bestCombo={game.bestCombo}
          round={game.round}
          isNewBest={isNewBest}
          onRestart={game.start}
        />
      )}
    </div>
  );
}
