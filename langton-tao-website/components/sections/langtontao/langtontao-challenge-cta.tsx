'use client'

import { ArrowRight } from 'lucide-react'
import { getChallengeLink } from '@/lib/content/langtontao/langtontao-challenge-links'
import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'
import { scrollToLangtontaoSolution } from '@/lib/langtontao/scroll-to-solution'
import { cn } from '@/lib/utils'

type LangtontaoChallengeCtaProps = {
  challengeId: LangtontaoChallengeId
  className?: string
  label?: string
}

export function LangtontaoChallengeCta({
  challengeId,
  className,
  label,
}: LangtontaoChallengeCtaProps) {
  const link = getChallengeLink(challengeId)
  if (!link) return null

  return (
    <button
      type="button"
      onClick={() =>
        scrollToLangtontaoSolution(link.solutionAnchor, {
          challenge: challengeId,
        })
      }
      className={cn('coffee2-cta-button gap-2 text-sm', className)}
    >
      {label ?? link.ctaLabel}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </button>
  )
}
