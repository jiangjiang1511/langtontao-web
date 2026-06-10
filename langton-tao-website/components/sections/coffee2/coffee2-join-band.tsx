import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2JoinBand } from '@/lib/content/coffee2-page'

export function Coffee2JoinBand() {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby="coffee2-join-band-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p
            id="coffee2-join-band-title"
            className="c2-display text-3xl text-white md:text-5xl lg:text-6xl"
          >
            {coffee2JoinBand.statement}
          </p>
        </Coffee2Reveal>
        <Coffee2Reveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {coffee2JoinBand.tagline}
          </p>
        </Coffee2Reveal>
        <Coffee2Reveal delay={180} className="c2-reveal-fade">
          <Link
            href={coffee2JoinBand.ctaHref}
            className="c2-btn-cta-emphasis mt-10"
          >
            {coffee2JoinBand.ctaLabel}
          </Link>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
