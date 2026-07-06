import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { HomeJarsyHeroFormulaOrbitLazy } from '@/components/sections/home-jarsy/home-jarsy-hero-formula-orbit-lazy'
import { HomeJarsyHeroMotion } from '@/components/sections/home-jarsy/home-jarsy-hero-motion'
import { FORMULA_ARIA_LABEL } from '@/lib/content/home-jarsy-hero-formula'
import { homeJarsyHero } from '@/lib/content/home-jarsy-page'

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
        <HomeJarsyHeroMotion />

        <h1 id="home-jarsy-hero-title" className="sr-only">
          {homeJarsyHero.title}
          {homeJarsyHero.subtitle}
          {FORMULA_ARIA_LABEL}
        </h1>
      </div>
    </section>
  )
}
