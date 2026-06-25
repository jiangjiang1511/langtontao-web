import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { Coffee2LifeEventJoinCtaContent } from '@/lib/content/coffee2-page'

type Coffee2LifeEventJoinCtaProps = {
  content: Coffee2LifeEventJoinCtaContent
}

export function Coffee2LifeEventJoinCta({ content }: Coffee2LifeEventJoinCtaProps) {
  return (
    <div className="coffee2-life-event-join-cta">
      <Coffee2Reveal delay={120} className="coffee2-life-event-join-cta__copy">
        <p className="coffee2-life-event-join-cta__statement">{content.statement}</p>
        <p className="coffee2-life-event-join-cta__tagline">{content.tagline}</p>
      </Coffee2Reveal>

      <Coffee2Reveal delay={200} className="c2-reveal-fade coffee2-life-event-join-cta__action">
        <Link href={content.ctaHref} className="coffee2-cta-button">
          {content.ctaLabel}
        </Link>
      </Coffee2Reveal>
    </div>
  )
}
