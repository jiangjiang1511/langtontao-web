import type { Metadata } from 'next'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { Community2HeroSection } from '@/components/sections/community2/community2-hero-section'
import { Community2HowToJoinSection } from '@/components/sections/community2/community2-how-to-join-section'
import { Community2JoinBand } from '@/components/sections/community2/community2-join-band'
import { Community2ProgramsSection } from '@/components/sections/community2/community2-programs-section'
import { Education2EnglishSection } from '@/components/sections/education2/education2-english-section'
import { Education2HeroSection } from '@/components/sections/education2/education2-hero-section'
import { LangtontaoCheckupCasesSection } from '@/components/sections/langtontao/langtontao-checkup-cases-section'
import { LangtontaoHeroSection } from '@/components/sections/langtontao/langtontao-hero-section'
import { LangtontaoSectionNav } from '@/components/sections/langtontao/langtontao-section-nav'
import {
  education2EnglishJoin,
  education2JoinBand,
} from '@/lib/content/education2-page'
import {
  langtontaoJoinBand,
  langtontaoPageMeta,
} from '@/lib/content/langtontao-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: `${langtontaoPageMeta.title} | 朗敦道 Langton Tao`,
  description: langtontaoPageMeta.description,
}

export default function LangtontaoPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <LangtontaoHeroSection />
      <LangtontaoSectionNav />

      <section id="education" className="scroll-mt-28">
        <Education2HeroSection />
        <JarsyJoinBand
          id="langtontao-education-reading-join"
          statement={education2JoinBand.statement}
          tagline={education2JoinBand.tagline}
          ctaLabel={education2JoinBand.ctaLabel}
          ctaHref={education2JoinBand.ctaHref}
        />
        <Education2EnglishSection />
        <JarsyJoinBand
          id="langtontao-education-english-join"
          statement={education2EnglishJoin.statement}
          tagline={education2EnglishJoin.tagline}
          ctaLabel={education2EnglishJoin.ctaLabel}
          ctaHref={education2EnglishJoin.ctaHref}
        />
      </section>

      <section id="community" className="scroll-mt-28">
        <Community2HeroSection />
        <Community2ProgramsSection />
        <Community2HowToJoinSection />
        <Community2JoinBand />
      </section>

      <section id="checkup-cases" className="scroll-mt-28">
        <LangtontaoCheckupCasesSection />
      </section>

      <JarsyJoinBand
        id="langtontao-join-band"
        statement={langtontaoJoinBand.statement}
        tagline={langtontaoJoinBand.tagline}
        ctaLabel={langtontaoJoinBand.ctaLabel}
        ctaHref={langtontaoJoinBand.ctaHref}
      />
    </div>
  )
}
