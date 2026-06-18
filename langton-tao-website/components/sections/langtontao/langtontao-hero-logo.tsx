import type { CSSProperties } from 'react'
import Image from 'next/image'
import { langtontaoHero } from '@/lib/content/langtontao-page'

const DUST_SPOKE_COUNT = 16

function DustSpokes({ ghost = false }: { ghost?: boolean }) {
  return (
    <>
      {Array.from({ length: DUST_SPOKE_COUNT }, (_, i) => (
        <div
          key={ghost ? `ghost-${i}` : i}
          className="langtontao-hero__dust-spoke"
          style={{ '--i': i } as CSSProperties}
        >
          <span className="langtontao-hero__dust-line" />
        </div>
      ))}
    </>
  )
}

export function LangtontaoHeroLogo() {
  return (
    <div className="langtontao-hero__logo-slot" aria-hidden="true">
      <div className="langtontao-hero__fx-waves">
        <span className="langtontao-hero__shockwave langtontao-hero__shockwave--1" />
        <span className="langtontao-hero__shockwave langtontao-hero__shockwave--2" />
        <span className="langtontao-hero__shockwave langtontao-hero__shockwave--3" />
      </div>

      <div className="langtontao-hero__logo-stage">
        <div className="langtontao-hero__fx-dust langtontao-hero__fx-dust--ghost">
          <DustSpokes ghost />
        </div>
        <div className="langtontao-hero__fx-dust">
          <DustSpokes />
        </div>

        <Image
          src={langtontaoHero.logoSrc}
          alt=""
          width={640}
          height={640}
          priority
          className="langtontao-hero__logo"
        />
      </div>
    </div>
  )
}
