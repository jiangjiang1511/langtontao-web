import type { Metadata } from 'next'
import { Coffee2HeroSection } from '@/components/sections/coffee2/coffee2-hero-section'
import { Coffee2JoinBand } from '@/components/sections/coffee2/coffee2-join-band'
import { Coffee2CollaborationSection } from '@/components/sections/coffee2/coffee2-collaboration-section'
import { Coffee2ManifestoGallerySection } from '@/components/sections/coffee2/coffee2-manifesto-gallery-section'
import { Coffee2PillarsSection } from '@/components/sections/coffee2/coffee2-pillars-section'
import { Coffee2LifeEventsStickyNav } from '@/components/sections/coffee2/coffee2-life-events-sticky-nav'
import { Coffee2LifeEventsContent } from '@/components/sections/coffee2/coffee2-life-events-content'
import { Coffee2LifeEventsNavSection } from '@/components/sections/coffee2/coffee2-life-events-nav-section'
import { Coffee2NetworkSection } from '@/components/sections/coffee2/coffee2-network-section'
import { Community2EventsHub } from '@/components/sections/community2/community2-events-hub'
import { Education2ReadingSection } from '@/components/sections/education2/education2-reading-section'
import './coffee.css'

export const metadata: Metadata = {
  title: '熊比特咖啡 | 朗敦道 Langton Tao',
  description:
    '熊比特：聊聊人生大事。联动十日谈，用十杯咖啡参透十个人生话题；在周期认知之上诚实拆解投资、保全、化债与传承。',
}

export default function CoffeePage() {
  return (
    <div className="coffee2-page bg-white text-zinc-950">
      <Coffee2LifeEventsStickyNav />
      <Coffee2HeroSection />
      <Coffee2LifeEventsNavSection />
      <Coffee2PillarsSection />
      <Coffee2ManifestoGallerySection />
      <Education2ReadingSection />
      <Community2EventsHub />
      <Coffee2CollaborationSection />
      <Coffee2LifeEventsContent />
      <Coffee2NetworkSection />
      <Coffee2JoinBand />
    </div>
  )
}
