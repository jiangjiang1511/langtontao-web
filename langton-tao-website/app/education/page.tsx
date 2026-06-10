import type { Metadata } from 'next'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { Education2EnglishSection } from '@/components/sections/education2/education2-english-section'
import { Education2HeroSection } from '@/components/sections/education2/education2-hero-section'
import { Education2ReadingSection } from '@/components/sections/education2/education2-reading-section'
import {
  education2EnglishJoin,
  education2Hero,
  education2JoinBand,
} from '@/lib/content/education2-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: '教育 | 朗敦道 Langton Tao',
  description: education2Hero.lead,
}

export default function EducationPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <Education2HeroSection />
      <Education2ReadingSection />
      <JarsyJoinBand
        id="education-reading-join"
        statement={education2JoinBand.statement}
        tagline={education2JoinBand.tagline}
        ctaLabel={education2JoinBand.ctaLabel}
        ctaHref={education2JoinBand.ctaHref}
      />
      <Education2EnglishSection />
      <JarsyJoinBand
        id="education-english-join"
        statement={education2EnglishJoin.statement}
        tagline={education2EnglishJoin.tagline}
        ctaLabel={education2EnglishJoin.ctaLabel}
        ctaHref={education2EnglishJoin.ctaHref}
      />
    </div>
  )
}
