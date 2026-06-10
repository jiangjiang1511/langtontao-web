import Link from 'next/link'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { community2FinalCta } from '@/lib/content/community2-page'

export function Community2FinalCtaSection() {
  return (
    <section
      className="bg-zinc-950 py-20 md:py-28"
      aria-labelledby="community2-final-cta-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Community2Reveal className="c2-reveal-fade">
          <h2
            id="community2-final-cta-title"
            className="c2-display text-3xl text-white md:text-5xl"
          >
            {community2FinalCta.title}
          </h2>
        </Community2Reveal>
        <Community2Reveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {community2FinalCta.body}
          </p>
        </Community2Reveal>
        <Community2Reveal delay={180} className="c2-reveal-fade">
          <Link
            href={community2FinalCta.ctaHref}
            className="c2-btn-primary mt-10 bg-white text-zinc-950 hover:bg-zinc-100"
          >
            {community2FinalCta.ctaLabel}
          </Link>
        </Community2Reveal>
      </div>
    </section>
  )
}
