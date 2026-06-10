import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { checkup2Hero } from '@/lib/content/checkup2-page'

export function Checkup2HeroSection() {
  return (
    <section
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="checkup2-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={0}>
          <p className="c2-eyebrow">{checkup2Hero.eyebrow}</p>
        </JarsyReveal>
        <JarsyReveal eager delay={80} className="mt-6 overflow-hidden">
          <p className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950" aria-hidden>
            {checkup2Hero.titleLines[0]}
          </p>
          <p className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950" aria-hidden>
            {checkup2Hero.titleLines[1]}
          </p>
        </JarsyReveal>
        <h1 id="checkup2-hero-title" className="sr-only">
          {checkup2Hero.titleLines.join('')}
        </h1>
        <JarsyReveal eager delay={160}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {checkup2Hero.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#checkup-items" className="c2-btn-primary">
              查看体检内容
            </Link>
            <Link href="#checkup-process" className="c2-btn-secondary">
              服务流程
            </Link>
          </div>
        </JarsyReveal>
      </div>
    </section>
  )
}
