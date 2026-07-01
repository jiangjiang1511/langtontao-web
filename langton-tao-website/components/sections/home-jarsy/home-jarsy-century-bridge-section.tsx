'use client'

import { CenturyBridgeCollageMotion } from '@/components/sections/home-jarsy/century-bridge-collage-motion'
import { HomeJarsyStageFooterCta } from '@/components/sections/home-jarsy/home-jarsy-stage-footer-cta'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { centuryPathBridgeMeta } from '@/lib/content/century-horizons'
import { centuryBridgeFooterCta } from '@/lib/content/home-jarsy-stage-ctas'
import { cn } from '@/lib/utils'

export function HomeJarsyCenturyBridgeSection() {
  const { id, eyebrow, title, lines } = centuryPathBridgeMeta
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()
  const motionTotal = 2 + lines.length

  return (
    <section
      id={id}
      className="tao-century-bridge scroll-mt-28 bg-white py-16 md:py-24"
      aria-labelledby={`${id}-title`}
    >
      <div className="tao-century-bridge__glow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <CenturyBridgeCollageMotion className="tao-century-bridge__motion mx-auto mb-8 md:mb-10" />

        <div ref={ref} className="tao-century-bridge__inner">
          <HomeJarsyCenterMotionItem
            visible={visible}
            index={0}
            total={motionTotal}
            className="tao-century-bridge__header"
          >
            <p className="c2-eyebrow">{eyebrow}</p>
            <h2
              id={`${id}-title`}
              className="tao-century-bridge__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl"
            >
              {title}
            </h2>
          </HomeJarsyCenterMotionItem>

          <div className="tao-century-bridge__copy mx-auto mt-8 max-w-3xl md:mt-10">
            {lines.map((line, index) => (
              <HomeJarsyCenterMotionItem
                key={line}
                visible={visible}
                index={index + 1}
                total={motionTotal}
                className={cn(index > 0 && 'mt-5')}
              >
                <Coffee2AnnotatedText
                  className={cn(
                    'tao-century-bridge__line',
                    index === lines.length - 1 && 'tao-century-bridge__line--emphasis'
                  )}
                  text={line}
                  as="p"
                />
              </HomeJarsyCenterMotionItem>
            ))}
          </div>
        </div>

        <HomeJarsyStageFooterCta {...centuryBridgeFooterCta} />
      </div>
    </section>
  )
}
