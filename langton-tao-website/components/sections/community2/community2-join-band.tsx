import Link from 'next/link'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { community2JoinBand } from '@/lib/content/community2-page'

export function Community2JoinBand() {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby="community2-join-band-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Community2Reveal>
          <p
            id="community2-join-band-title"
            className="c2-display text-3xl text-white md:text-5xl lg:text-6xl"
          >
            {community2JoinBand.statement}
          </p>
        </Community2Reveal>
        <Community2Reveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {community2JoinBand.tagline}
          </p>
        </Community2Reveal>
        <Community2Reveal delay={180} className="c2-reveal-fade">
          <Link
            href={community2JoinBand.ctaHref}
            className="c2-btn-cta-emphasis mt-10"
          >
            {community2JoinBand.ctaLabel}
          </Link>
        </Community2Reveal>
      </div>
    </section>
  )
}
