'use client';

import { Link2, Mail, MessageSquare, ShieldQuestion } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Challenge } from '@/lib/phishing-game/challenges';

interface MessageCardProps {
  challenge: Challenge;
}

export function MessageCard({ challenge }: MessageCardProps) {
  return (
    <Card className="overflow-hidden p-0 text-left" dir="ltr" key={challenge.id}>
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
        <KindIcon kind={challenge.kind} />
        {challenge.kind === 'email' && 'Email'}
        {challenge.kind === 'link' && 'Shared Link'}
        {challenge.kind === 'sms' && 'Text Message'}
      </div>

      {challenge.kind === 'email' && <EmailView challenge={challenge} />}
      {challenge.kind === 'link' && <LinkView challenge={challenge} />}
      {challenge.kind === 'sms' && <SmsView challenge={challenge} />}
    </Card>
  );
}

function KindIcon({ kind }: { kind: Challenge['kind'] }) {
  if (kind === 'email') return <Mail className="size-3.5" />;
  if (kind === 'link') return <Link2 className="size-3.5" />;
  return <MessageSquare className="size-3.5" />;
}

function EmailView({ challenge }: { challenge: Challenge }) {
  return (
    <div className="space-y-3 px-4 py-4 text-left">
      <div className="space-y-1 border-b pb-3 text-sm">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{challenge.fromName}</span>
          <span className="truncate text-xs text-muted-foreground">&lt;{challenge.fromAddress}&gt;</span>
        </div>
        <p className="font-semibold">{challenge.subject}</p>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">{challenge.body}</p>
    </div>
  );
}

function LinkView({ challenge }: { challenge: Challenge }) {
  return (
    <div className="space-y-3 px-4 py-4 text-left">
      <p className="text-sm leading-relaxed text-foreground/90">{challenge.body}</p>
      <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs">
        <ShieldQuestion className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{challenge.displayUrl}</span>
      </div>
    </div>
  );
}

function SmsView({ challenge }: { challenge: Challenge }) {
  return (
    <div className="space-y-2 px-4 py-4 text-left">
      <p className="text-xs text-muted-foreground">From: {challenge.senderLabel}</p>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm leading-relaxed">
        {challenge.body}
      </div>
    </div>
  );
}