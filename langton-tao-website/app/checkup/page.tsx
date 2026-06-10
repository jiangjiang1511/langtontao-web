import type { Metadata } from 'next'
import { Checkup2CommitmentSection } from '@/components/sections/checkup2/checkup2-commitment-section'
import { Checkup2HeroSection } from '@/components/sections/checkup2/checkup2-hero-section'
import { Checkup2ItemsSection } from '@/components/sections/checkup2/checkup2-items-section'
import { Checkup2ProcessSection } from '@/components/sections/checkup2/checkup2-process-section'
import { Checkup2SignupSection } from '@/components/sections/checkup2/checkup2-signup-section'
import { checkupPageMeta } from '@/lib/content/checkup2-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: '财富大健康体检 | 朗敦道 Langton Tao',
  description: checkupPageMeta.lead,
}

export default function CheckupPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <Checkup2HeroSection />
      <Checkup2ItemsSection />
      <Checkup2ProcessSection />
      <Checkup2CommitmentSection />
      <Checkup2SignupSection />
    </div>
  )
}
