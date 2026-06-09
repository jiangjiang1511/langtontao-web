import type { Metadata } from 'next'
import { Home2CtaSection } from '@/components/sections/home2/home2-cta-section'
import { Home2HeroSection } from '@/components/sections/home2/home2-hero-section'
import { Home2NarrativeSection } from '@/components/sections/home2/home2-narrative-section'
import { fiftyYearPageTitle } from '@/lib/content/fifty-year-narrative'

export const metadata: Metadata = {
  title: '朗敦道 Langton Tao | VFO/MFO Leader in China',
  description: fiftyYearPageTitle,
}

export default function HomePage() {
  return (
    <div className="home2-page bg-white text-zinc-950">
      <Home2HeroSection />
      <Home2NarrativeSection />
      <Home2CtaSection />
    </div>
  )
}
