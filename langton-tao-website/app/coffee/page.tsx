import type { Metadata } from 'next'
import { Coffee2CyclesSection } from '@/components/sections/coffee2/coffee2-cycles-section'
import { Coffee2HeroSection } from '@/components/sections/coffee2/coffee2-hero-section'
import { Coffee2TimelineSection } from '@/components/sections/coffee2/coffee2-timeline-section'
import { Coffee2JoinBand } from '@/components/sections/coffee2/coffee2-join-band'
import { Coffee2LifeEventsSection } from '@/components/sections/coffee2/coffee2-life-events-section'
import { Coffee2ManifestoSection } from '@/components/sections/coffee2/coffee2-manifesto-section'
import { Coffee2NetworkSection } from '@/components/sections/coffee2/coffee2-network-section'
import { Coffee2PhilosophySection } from '@/components/sections/coffee2/coffee2-philosophy-section'
import { Coffee2TenTopicsSection } from '@/components/sections/coffee2/coffee2-ten-topics-section'
import { Coffee2TopicsWaterfall } from '@/components/sections/coffee2/coffee2-topics-waterfall'
import './coffee.css'

export const metadata: Metadata = {
  title: '熊比特咖啡 | 朗敦道 Langton Tao',
  description:
    '熊比特：聊聊人生大事。联动十日谈，用十天参透十个人生话题；在周期认知之上诚实拆解投资、保全、化债与传承。',
}

export default function CoffeePage() {
  return (
    <div className="coffee2-page bg-white text-zinc-950">
      <Coffee2HeroSection />
      <Coffee2TimelineSection />
      <Coffee2ManifestoSection />
      <Coffee2LifeEventsSection />
      <Coffee2TenTopicsSection />
      <Coffee2CyclesSection />
      <Coffee2PhilosophySection />
      <Coffee2TopicsWaterfall />
      <Coffee2NetworkSection />
      <Coffee2JoinBand />
    </div>
  )
}
