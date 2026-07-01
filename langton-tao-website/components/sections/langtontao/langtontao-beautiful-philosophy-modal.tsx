'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  langtontaoChallengeSolutionBridge,
  type BeautifulPhilosophyPillar,
} from '@/lib/content/langtontao/langtontao-beautiful-business'

type LangtontaoBeautifulPhilosophyModalProps = {
  pillar: BeautifulPhilosophyPillar | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LangtontaoBeautifulPhilosophyModal({
  pillar,
  open,
  onOpenChange,
}: LangtontaoBeautifulPhilosophyModalProps) {
  if (!pillar) return null

  const bridgeItems = langtontaoChallengeSolutionBridge.filter((item) =>
    pillar.challengeIds.includes(item.challengeId)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lt-beautiful-philosophy-modal max-h-[min(88vh,44rem)] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-bold text-zinc-950">
            {pillar.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-zinc-600">{pillar.summary}</p>
          {pillar.body ? (
            <p className="text-sm leading-relaxed text-zinc-600">{pillar.body}</p>
          ) : null}

          {bridgeItems.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                挑战与方案
              </p>
              <ul className="space-y-3">
                {bridgeItems.map((item) => (
                  <li
                    key={item.challengeId}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <p className="font-semibold text-zinc-950">{item.challenge}</p>
                    <p className="mt-1 text-sm text-zinc-600">{item.philosophy}</p>
                    <p className="mt-2 text-xs text-zinc-500">→ {item.solution}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
