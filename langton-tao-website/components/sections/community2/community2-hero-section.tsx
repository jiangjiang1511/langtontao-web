import Link from 'next/link'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { community2Hero } from '@/lib/content/community2-page'

export function Community2HeroSection() {
  return (
    <section
      id="community2-hero"
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="community2-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <Community2Reveal eager delay={0}>
          <p className="c2-eyebrow">{community2Hero.eyebrow}</p>
        </Community2Reveal>

        <Community2Reveal eager delay={80} className="mt-6 overflow-hidden">
          <p
            className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950"
            aria-hidden
          >
            {community2Hero.titleLines[0]}
          </p>
          <p
            className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950"
            aria-hidden
          >
            {community2Hero.titleLines[1]}
          </p>
        </Community2Reveal>

        <h1 id="community2-hero-title" className="sr-only">
          {community2Hero.titleLines.join('')}
        </h1>

        <Community2Reveal eager delay={160}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {community2Hero.lead}
          </p>
        </Community2Reveal>

        <Community2Reveal eager delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={community2Hero.cta.ctaHref} className="c2-btn-primary">
              {community2Hero.cta.ctaLabel}
            </Link>
            <Link href="#superhero-programs" className="c2-btn-secondary">
              探索路径
            </Link>
          </div>
        </Community2Reveal>
      </div>
    </section>
  )
}
