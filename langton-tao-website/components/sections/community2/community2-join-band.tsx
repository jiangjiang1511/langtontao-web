import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { community2JoinBand } from '@/lib/content/community2-page'

export function Community2JoinBand() {
  return (
    <JarsyJoinBand
      id="community2-join-band-title"
      statement={community2JoinBand.statement}
      tagline={community2JoinBand.tagline}
      ctaLabel={community2JoinBand.ctaLabel}
      ctaHref={community2JoinBand.ctaHref}
    />
  )
}
