import { CatalogSection } from '@/components/sections/home/catalog-section'
import { FaqTeaserSection } from '@/components/sections/home/faq-teaser-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { HowItWorksSection } from '@/components/sections/home/how-it-works-section'
import { JoinCtaSection } from '@/components/sections/home/join-cta-section'
import { NetworkSection } from '@/components/sections/home/network-section'
import { OfferingsSection } from '@/components/sections/home/offerings-section'
import { PillarsSection } from '@/components/sections/home/pillars-section'
import { SpotlightSection } from '@/components/sections/home/spotlight-section'
import { StoriesSection } from '@/components/sections/home/stories-section'
import { UpcomingEventsSection } from '@/components/sections/home/upcoming-events-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <OfferingsSection />
      <HowItWorksSection />
      <StoriesSection />
      <CatalogSection />
      <JoinCtaSection />
      <UpcomingEventsSection />
      <NetworkSection />
      <SpotlightSection />
      <FaqTeaserSection />
    </>
  )
}
