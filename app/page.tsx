import { PhishingGame } from '@/components/phishing-game/phishing-game'
export default function Home() {
  return (
    <div className="phish-theme px-4 py-10 text-foreground sm:py-16">
      <div className="mx-auto mb-6 max-w-lg text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">🎯 Spot the Phish</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A fast-paced game to train your eye for phishing emails, links, and texts.
        </p>
      </div>
      <PhishingGame />
      <footer className="mx-auto mt-8 max-w-lg text-center text-xs text-muted-foreground/70">
        All content is fictional and for educational purposes only. No real data is collected.
      </footer>
    </div>
  );
}
