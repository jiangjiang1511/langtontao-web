'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { langtontaoHero } from '@/lib/content/langtontao-page'

export function LangtontaoHeroMotion() {
  return (
    <>
      <div className="langtontao-hero__headline w-full max-w-3xl">
        <h1 id="langtontao-hero-title" className="langtontao-hero__title">
          <Coffee2Reveal
            eager
            delay={520}
            as="span"
            className="langtontao-hero__title-main c2-display block text-zinc-950"
          >
            {langtontaoHero.title}
          </Coffee2Reveal>
        </h1>
      </div>

      <div className="langtontao-hero__lower">
        <Coffee2TypewriterReveal
          eager
          baseDelay={880}
          charStagger={120}
          className="langtontao-hero__title-sub c2-display mx-auto block max-w-3xl text-zinc-700"
          text={langtontaoHero.tagline}
        />

        <Coffee2Reveal eager delay={680} className="langtontao-hero__lead mt-6 w-full max-w-2xl">
          <p className="langtontao-hero__lead-text text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoHero.lead}
          </p>
        </Coffee2Reveal>
      </div>
    </>
  )
}
