import { HeroSection } from '@/components/sections/hero-section'
import { MissionSection } from '@/components/sections/mission-section'
import { AboutSection } from '@/components/sections/about-section'
import { ProblemsSection } from '@/components/sections/problems-section'
import { ServeSection } from '@/components/sections/serve-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <AboutSection />
      <ProblemsSection />
      <ServeSection />
    </>
  )
}
