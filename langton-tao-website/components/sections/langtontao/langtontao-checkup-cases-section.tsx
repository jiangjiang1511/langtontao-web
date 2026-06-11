import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Checkup2CommitmentSection } from '@/components/sections/checkup2/checkup2-commitment-section'
import { Checkup2HeroSection } from '@/components/sections/checkup2/checkup2-hero-section'
import { Checkup2ItemsSection } from '@/components/sections/checkup2/checkup2-items-section'
import { Checkup2ProcessSection } from '@/components/sections/checkup2/checkup2-process-section'
import { Checkup2SignupSection } from '@/components/sections/checkup2/checkup2-signup-section'
import { Cases2HeroSection } from '@/components/sections/cases2/cases2-hero-section'
import { Cases2IndexSection } from '@/components/sections/cases2/cases2-index-section'
import { langtontaoCheckupCasesIntro } from '@/lib/content/langtontao-page'

export function LangtontaoCheckupCasesSection() {
  return (
    <>
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <JarsyReveal eager>
            <p className="c2-eyebrow">{langtontaoCheckupCasesIntro.eyebrow}</p>
            <h2 className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl">
              {langtontaoCheckupCasesIntro.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
              {langtontaoCheckupCasesIntro.lead}
            </p>
          </JarsyReveal>
        </div>
      </div>

      <div id="checkup">
        <Checkup2HeroSection />
        <Checkup2ItemsSection />
        <Checkup2ProcessSection />
        <Checkup2CommitmentSection />
        <Checkup2SignupSection />
      </div>

      <div id="cases">
        <Cases2HeroSection />
        <Cases2IndexSection />
      </div>
    </>
  )
}
