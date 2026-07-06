import { TopicCardHashScrollHost } from '@/hooks/use-topic-card-hash-scroll'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { LangtontaoHeroSection } from '@/components/sections/langtontao/langtontao-hero-section'
import { LangtontaoSectionNav } from '@/components/sections/langtontao/langtontao-section-nav'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'
import {
  langtontaoJoinBand,
  langtontaoPageMeta,
} from '@/lib/content/langtontao-page'
import '@/app/coffee/coffee.css'
import '@/styles/jarsy-v2.css'
import '@/app/langtontao/langtontao.css'

export const metadata: Metadata = {
  title: '朗敦道 Langton Tao | VFO/MFO Leader in China',
  description: langtontaoPageMeta.description,
}

const LangtontaoPillarsSection = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-pillars-section').then(
      (module) => ({ default: module.LangtontaoPillarsSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载四大板块…" /> }
)

const LangtontaoHomeRootsSection = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-home-roots-section').then(
      (module) => ({ default: module.LangtontaoHomeRootsSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载何以为家…" /> }
)

const LangtontaoSuperheroSection = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-superhero-section').then(
      (module) => ({ default: module.LangtontaoSuperheroSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载超级英雄之旅…" /> }
)

const LangtontaoCheckupMajorSection = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-checkup-major-section').then(
      (module) => ({ default: module.LangtontaoCheckupMajorSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载财富健康体检…" /> }
)

const LangtontaoYitishuangkuaSection = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-yitishuangkua-section').then(
      (module) => ({ default: module.LangtontaoYitishuangkuaSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载一体双跨…" /> }
)

export default function HomePage() {
  return (
    <div className="jarsy-v2-page coffee2-page langtontao-page bg-white text-zinc-950">
      <TopicCardHashScrollHost />
      <LangtontaoSectionNav />
      <LangtontaoHeroSection />
      <LangtontaoPillarsSection />

      <DeferredMount
        anchorId="home-roots"
        minHeight={sectionMinHeight('home-roots')}
        mountStrategy="immediate"
      >
        <LangtontaoHomeRootsSection />
      </DeferredMount>

      <DeferredMount
        anchorId="superhero"
        minHeight={sectionMinHeight('superhero')}
        mountStrategy="idle"
        idleStaggerIndex={0}
      >
        <LangtontaoSuperheroSection />
      </DeferredMount>

      <DeferredMount
        anchorId="wealth-checkup"
        minHeight={sectionMinHeight('wealth-checkup')}
        mountStrategy="idle"
        idleStaggerIndex={1}
      >
        <LangtontaoCheckupMajorSection />
      </DeferredMount>

      <DeferredMount
        anchorId="yitishuangkua"
        minHeight={sectionMinHeight('yitishuangkua')}
        mountStrategy="lazy"
      >
        <LangtontaoYitishuangkuaSection />
      </DeferredMount>

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
