import type { Metadata } from 'next'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { LangtontaoBeautifulSection } from '@/components/sections/langtontao/langtontao-beautiful-section'
import { LangtontaoHeroSection } from '@/components/sections/langtontao/langtontao-hero-section'
import { LangtontaoHongKongSection } from '@/components/sections/langtontao/langtontao-hong-kong-section'
import { LangtontaoPanicWealthSection } from '@/components/sections/langtontao/langtontao-panic-wealth-section'
import { LangtontaoSectionNav } from '@/components/sections/langtontao/langtontao-section-nav'
import { LangtontaoWhyMfoSection } from '@/components/sections/langtontao/langtontao-why-mfo-section'
import {
  langtontaoJoinBand,
  langtontaoPageMeta,
} from '@/lib/content/langtontao-page'
import '@/app/coffee/coffee.css'
import '@/styles/jarsy-v2.css'
import './langtontao.css'

export const metadata: Metadata = {
  title: `${langtontaoPageMeta.title} | 朗敦道 Langton Tao`,
  description: langtontaoPageMeta.description,
}

export default function LangtontaoPage() {
  return (
    <div className="jarsy-v2-page coffee2-page langtontao-page bg-white text-zinc-950">
      <LangtontaoHeroSection />
      <LangtontaoSectionNav />
      <LangtontaoWhyMfoSection />
      <LangtontaoPanicWealthSection />
      <LangtontaoBeautifulSection />
      <LangtontaoHongKongSection />
      <JarsyJoinBand
        id="langtontao-join-band"
        statement={langtontaoJoinBand.statement}
        tagline={langtontaoJoinBand.tagline}
        ctaLabel={langtontaoJoinBand.ctaLabel}
        ctaHref={langtontaoJoinBand.ctaHref}
      />
    </div>
  )
}
