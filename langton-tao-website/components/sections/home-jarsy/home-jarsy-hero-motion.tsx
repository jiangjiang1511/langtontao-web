'use client'

import { PrefetchLink } from '@/components/navigation/prefetch-link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { homeJarsyHero } from '@/lib/content/home-jarsy-page'

const HERO_STAGGER = {
  eyebrow: 0,
  subtitle: 120,
  lead: 240,
  cta: 380,
} as const

const HERO_TITLE_TYPEWRITER = {
  baseDelay: 500,
  charStagger: 150,
} as const

export function HomeJarsyHeroMotion() {
  return (
    <>
      <div className="home-jarsy-hero__top">
        <JarsyReveal eager delay={HERO_STAGGER.eyebrow}>
          <p className="c2-eyebrow normal-case">{homeJarsyHero.eyebrow}</p>
        </JarsyReveal>

        <div className="home-jarsy-hero__title-wrap mt-4 w-full md:mt-5" aria-hidden>
          <Coffee2TypewriterReveal
            eager
            text={homeJarsyHero.title}
            baseDelay={HERO_TITLE_TYPEWRITER.baseDelay}
            charStagger={HERO_TITLE_TYPEWRITER.charStagger}
            className="home-jarsy-hero-title c2-display mx-auto block text-[clamp(4rem,14vw,10rem)] text-zinc-950"
          />
        </div>
      </div>

      <div className="home-jarsy-hero__spacer" aria-hidden />

      <div className="home-jarsy-hero__bottom">
        <JarsyReveal eager delay={HERO_STAGGER.subtitle} className="w-full">
          <p
            className="home-jarsy-hero-subtitle text-xl font-semibold tracking-tight text-zinc-400 md:text-2xl lg:text-3xl"
            aria-hidden
          >
            {homeJarsyHero.subtitle}
          </p>
        </JarsyReveal>

        <JarsyReveal eager delay={HERO_STAGGER.lead}>
          <Coffee2AnnotatedText
            text={homeJarsyHero.lead}
            className="home-jarsy-hero-lead mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:mt-6 md:text-lg"
          />
        </JarsyReveal>

        <JarsyReveal eager delay={HERO_STAGGER.cta} className="home-jarsy-hero__cta">
          <PrefetchLink href={homeJarsyHero.cta.primaryHref} className="coffee2-cta-button">
            {homeJarsyHero.cta.primaryLabel}
          </PrefetchLink>
        </JarsyReveal>
      </div>
    </>
  )
}
