import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { HomeJarsyHeroFormulaOrbitLazy } from '@/components/sections/home-jarsy/home-jarsy-hero-formula-orbit-lazy'
import { FORMULA_ARIA_LABEL } from '@/lib/content/home-jarsy-hero-formula'
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

export function HomeJarsyHero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-zinc-200"
      aria-labelledby="home-jarsy-hero-title"
      aria-label={FORMULA_ARIA_LABEL}
    >
      <HomeJarsyHeroFormulaOrbitLazy />

      <div className="home-jarsy-hero__content mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-4 pb-16 pt-28 text-center sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
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
            <Link href={homeJarsyHero.cta.primaryHref} className="coffee2-cta-button">
              {homeJarsyHero.cta.primaryLabel}
            </Link>
          </JarsyReveal>
        </div>

        <h1 id="home-jarsy-hero-title" className="sr-only">
          {homeJarsyHero.title}
          {homeJarsyHero.subtitle}
          {FORMULA_ARIA_LABEL}
        </h1>
      </div>
    </section>
  )
}
