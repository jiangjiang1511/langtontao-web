import type { Metadata } from 'next'
import { Faq2CategoriesSection } from '@/components/sections/faq2/faq2-categories-section'
import { Faq2ContactSection } from '@/components/sections/faq2/faq2-contact-section'
import { Faq2HeroSection } from '@/components/sections/faq2/faq2-hero-section'
import { faq2Hero } from '@/lib/content/faq2-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: 'FAQ | 朗敦道 Langton Tao',
  description: faq2Hero.lead,
}

export default function FaqPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <Faq2HeroSection />
      <Faq2CategoriesSection />
      <Faq2ContactSection />
    </div>
  )
}
