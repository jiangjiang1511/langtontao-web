import type { Metadata } from 'next'
import { Cases2HeroSection } from '@/components/sections/cases2/cases2-hero-section'
import { Cases2IndexSection } from '@/components/sections/cases2/cases2-index-section'
import { casesPageMeta } from '@/lib/content/cases2-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: `${casesPageMeta.title} | 朗敦道 Langton Tao`,
  description: casesPageMeta.description,
}

export default function CasesPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <Cases2HeroSection />
      <Cases2IndexSection />
    </div>
  )
}
