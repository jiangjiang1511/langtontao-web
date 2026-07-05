import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { coffee2JoinBand } from '@/lib/content/coffee2-page'

export function Coffee2JoinBand() {
  return (
    <JarsyJoinBand
      id="coffee2-join-band-title"
      statement={coffee2JoinBand.statement}
      tagline={coffee2JoinBand.tagline}
      ctaLabel={coffee2JoinBand.ctaLabel}
      ctaHref={coffee2JoinBand.ctaHref}
    />
  )
}
