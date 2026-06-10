import type { Metadata } from 'next'
import { Community2EventsHub } from '@/components/sections/community2/community2-events-hub'
import { Community2HeroSection } from '@/components/sections/community2/community2-hero-section'
import { Community2HowToJoinSection } from '@/components/sections/community2/community2-how-to-join-section'
import { Community2JoinBand } from '@/components/sections/community2/community2-join-band'
import { Community2ProgramsSection } from '@/components/sections/community2/community2-programs-section'
import './community.css'

export const metadata: Metadata = {
  title: '社群 | 朗敦道 Langton Tao',
  description:
    '超级英雄探索之旅、千万富翁养成计划——朗敦道社群的具身认知与财商定投入口。',
}

export default function CommunityPage() {
  return (
    <div className="community2-page bg-white text-zinc-950">
      <Community2HeroSection />
      <Community2ProgramsSection />
      <Community2EventsHub />
      <Community2HowToJoinSection />
      <Community2JoinBand />
    </div>
  )
}
