import type { CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { langtontaoSuperheroPillars } from '@/lib/content/langtontao/langtontao-superhero-journey'

export function LangtontaoSuperheroPillars() {
  return (
    <div className="lt-superhero-pillars mt-16 md:mt-20">
      <LangtontaoSubsectionHeader
        eyebrow="Three Dimensions · 三维价值"
        title="走，比读更接近真实决策"
        theme="superhero"
      />

      <ul className="lt-superhero-pillars__grid">
        {langtontaoSuperheroPillars.map((pillar, index) => (
          <Coffee2Reveal key={pillar.id} delay={60 + index * 50} as="li">
            <article
              className="lt-superhero-pillars__card"
              style={{ '--lt-superhero-accent': pillar.accent } as CSSProperties}
            >
              <span className="lt-superhero-pillars__accent" aria-hidden />
              <h4 className="lt-superhero-pillars__title">{pillar.title}</h4>
              <p className="lt-superhero-pillars__summary">{pillar.summary}</p>
            </article>
          </Coffee2Reveal>
        ))}
      </ul>
    </div>
  )
}
