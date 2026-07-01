import { TopicCardHashScrollHost } from '@/hooks/use-topic-card-hash-scroll'
import type { Metadata } from 'next'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { LangtontaoHeroSection } from '@/components/sections/langtontao/langtontao-hero-section'
import { LangtontaoHomeRootsSection } from '@/components/sections/langtontao/langtontao-home-roots-section'
import { LangtontaoCheckupMajorSection } from '@/components/sections/langtontao/langtontao-checkup-major-section'
import { LangtontaoPillarsSection } from '@/components/sections/langtontao/langtontao-pillars-section'
import { LangtontaoSectionNav } from '@/components/sections/langtontao/langtontao-section-nav'
import { LangtontaoSuperheroSection } from '@/components/sections/langtontao/langtontao-superhero-section'
import { LangtontaoYitishuangkuaSection } from '@/components/sections/langtontao/langtontao-yitishuangkua-section'
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
      <TopicCardHashScrollHost />
      <LangtontaoSectionNav />
      <LangtontaoHeroSection />
      <LangtontaoPillarsSection />
      <LangtontaoHomeRootsSection />
      <LangtontaoSuperheroSection />
      <LangtontaoCheckupMajorSection />
      <LangtontaoYitishuangkuaSection />
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
