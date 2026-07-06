import Image from 'next/image'
import Link from 'next/link'
import { Coffee2AnnotatedParagraph } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2HeroOrbitBackgroundLazy } from '@/components/sections/coffee2/coffee2-hero-orbit-background-lazy'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { coffee2Hero } from '@/lib/content/coffee2-page'

export function Coffee2HeroSection() {
  return (
    <section
      id="coffee2-hero"
      className="relative scroll-mt-20 overflow-visible border-b border-zinc-200 bg-white jarsy-glow"
      aria-labelledby="coffee2-hero-title"
    >
      <Coffee2HeroOrbitBackgroundLazy />

      <div className="coffee2-hero__content relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-20 md:pt-32 lg:px-8">
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
          <Link href={coffee2Hero.cta.ctaHref} className="coffee2-cta-button">
            {coffee2Hero.cta.ctaLabel}
          </Link>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
