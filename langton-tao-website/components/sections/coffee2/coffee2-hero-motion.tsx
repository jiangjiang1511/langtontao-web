'use client'

import Image from 'next/image'
import { PrefetchLink } from '@/components/navigation/prefetch-link'
import { Coffee2AnnotatedParagraph } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { coffee2Hero } from '@/lib/content/coffee2-page'

export function Coffee2HeroMotion() {
  return (
    <>
      <div className="coffee2-hero__headline">
        <Coffee2Reveal eager delay={0} className="coffee2-hero__logo-reveal">
          <Image
            src={coffee2Hero.logoSrc}
            alt={coffee2Hero.logoAlt}
            width={1582}
            height={480}
            priority
            className="coffee2-hero__logo h-auto w-[min(100%,14rem)] md:w-[18rem]"
          />
        </Coffee2Reveal>

        <h1 id="coffee2-hero-title" className="coffee2-hero__title mt-2">
          <Coffee2Reveal
            eager
            delay={120}
            as="span"
            className="coffee2-hero__title-line coffee2-hero__title-line--1 c2-display block text-zinc-950"
          >
            {coffee2Hero.titleLine1}
          </Coffee2Reveal>
          <Coffee2TypewriterReveal
            eager
            baseDelay={480}
            charStagger={150}
            className="coffee2-hero__title-line coffee2-hero__title-line--2 c2-display text-zinc-950"
            text={coffee2Hero.titleLine2}
          />
        </h1>
      </div>

      <Coffee2Reveal eager delay={280}>
        <Coffee2AnnotatedParagraph
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg"
          segments={coffee2Hero.lead}
        />
      </Coffee2Reveal>

      <Coffee2Reveal eager delay={1380} className="coffee2-hero__cta">
        <PrefetchLink href={coffee2Hero.cta.ctaHref} className="coffee2-cta-button">
          {coffee2Hero.cta.ctaLabel}
        </PrefetchLink>
      </Coffee2Reveal>
    </>
  )
}
