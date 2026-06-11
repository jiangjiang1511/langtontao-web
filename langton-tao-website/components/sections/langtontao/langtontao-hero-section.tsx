import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { langtontaoHero } from '@/lib/content/langtontao-page'

export function LangtontaoHeroSection() {
  return (
    <section
      className="border-b border-zinc-200 bg-white"
      aria-labelledby="langtontao-hero-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <JarsyReveal eager>
          <p className="c2-eyebrow">{langtontaoHero.eyebrow}</p>
        </JarsyReveal>
        <JarsyReveal eager delay={80} className="mt-6">
          <h1
            id="langtontao-hero-title"
            className="c2-display text-4xl text-zinc-950 md:text-6xl"
          >
            {langtontaoHero.titleLines.join(' · ')}
          </h1>
        </JarsyReveal>
        <JarsyReveal eager delay={140} className="mt-6">
          <p className="text-xl font-semibold text-zinc-800 md:text-2xl">
            {langtontaoHero.tagline}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={200} className="mt-4 max-w-3xl">
          <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoHero.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={260} className="mt-8">
          <Link
            href={langtontaoHero.aboutLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
          >
            {langtontaoHero.aboutLink.label}
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-2 text-xs font-medium text-zinc-500">
            {langtontaoHero.aboutLink.description}
          </p>
        </JarsyReveal>
      </div>
    </section>
  )
}
