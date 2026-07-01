import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoDecadeWishlistBook } from '@/components/sections/langtontao/langtontao-decade-wishlist-book'
import { LangtontaoMajorSectionShell } from '@/components/sections/langtontao/langtontao-major-section-shell'
import { LangtontaoPanicWealthContent } from '@/components/sections/langtontao/langtontao-panic-wealth-content'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { WishlistDeepLinkHandler } from '@/components/sections/langtontao/langtontao-wishlist-share-actions'
import { LangtontaoWhyMfoContent } from '@/components/sections/langtontao/langtontao-why-mfo-content'
import { getLangtontaoMajorSection } from '@/lib/content/langtontao/langtontao-major-sections'
import { langtontaoWishlistMeta } from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { LangtontaoBeautifulExplorer } from '@/components/sections/langtontao/langtontao-beautiful-explorer'

export function LangtontaoHomeRootsSection() {
  const meta = getLangtontaoMajorSection('home-roots')
  if (!meta) return null

  return (
    <LangtontaoMajorSectionShell meta={meta}>
      <WishlistDeepLinkHandler />
      <LangtontaoWhyMfoContent />

      <div className="mt-20 border-t border-zinc-200 pt-16">
        <LangtontaoPanicWealthContent />
      </div>

      <div className="mt-20 border-t border-zinc-200 pt-16">
        <LangtontaoSubsectionHeader
          eyebrow={langtontaoWishlistMeta.eyebrow}
          title={langtontaoWishlistMeta.title}
          lead={langtontaoWishlistMeta.lead}
          theme="home"
        />
        <div className="mt-8">
          <LangtontaoDecadeWishlistBook />
        </div>
      </div>

      <div className="mt-20 border-t border-zinc-200 pt-16">
        <LangtontaoBeautifulExplorer />
      </div>
    </LangtontaoMajorSectionShell>
  )
}
