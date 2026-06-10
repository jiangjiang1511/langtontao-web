import type { Metadata } from 'next'
import { Coffee2HeroSection } from '@/components/sections/coffee2/coffee2-hero-section'
import { Coffee2JoinBand } from '@/components/sections/coffee2/coffee2-join-band'
import { Coffee2NetworkSection } from '@/components/sections/coffee2/coffee2-network-section'
import { Coffee2PhilosophySection } from '@/components/sections/coffee2/coffee2-philosophy-section'
import { Coffee2TopicsWaterfall } from '@/components/sections/coffee2/coffee2-topics-waterfall'
import './coffee.css'

export const metadata: Metadata = {
  title: '熊比特咖啡 | 朗敦道 Langton Tao',
  description:
    '熊比特咖啡：一杯咖啡汇聚宇宙能量。以熊彼特创造性破坏与咖啡对话文化，承载朗敦道诚实投资学与家族同频。',
}

export default function CoffeePage() {
  return (
    <div className="coffee2-page bg-white text-zinc-950">
      <Coffee2HeroSection />
      <Coffee2PhilosophySection />
      <Coffee2TopicsWaterfall />
      <Coffee2NetworkSection />
      <Coffee2JoinBand />
    </div>
  )
}
