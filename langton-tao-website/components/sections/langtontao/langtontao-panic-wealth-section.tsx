import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoDecadeWishlistBook } from '@/components/sections/langtontao/langtontao-decade-wishlist-book'
import { LangtontaoTopicGrid } from '@/components/sections/langtontao/langtontao-topic-grid'
import { LangtontaoTopicRowGrid } from '@/components/sections/langtontao/langtontao-topic-row-grid'
import {
  langtontaoPanicChannelTopics,
  langtontaoPanicCoreTopics,
} from '@/lib/content/langtontao/langtontao-panic-topics'
import {
  langtontaoPanicMeta,
  langtontaoWealthMeta,
} from '@/lib/content/langtontao/langtontao-panic-wealth'
import { langtontaoWhyMfoMeta } from '@/lib/content/langtontao/langtontao-why-mfo'
import { langtontaoWealthTopicZones } from '@/lib/content/langtontao/langtontao-wealth-topics'

export function LangtontaoPanicWealthSection() {
  return (
    <section
      id="panic-wealth"
      className="lt-section lt-section--panic scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
      aria-labelledby="panic-wealth-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section id="panic" aria-labelledby="panic-title">
          <Coffee2Reveal>
            <p className="c2-eyebrow">{langtontaoPanicMeta.eyebrow}</p>
            <h2
              id="panic-title"
              className="c2-display mt-3 text-4xl text-zinc-950 md:text-5xl"
            >
              {langtontaoPanicMeta.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
              {langtontaoPanicMeta.lead}
            </p>
          </Coffee2Reveal>

          <LangtontaoTopicGrid topics={langtontaoPanicCoreTopics} className="mt-10" />
          <LangtontaoTopicRowGrid
            topics={langtontaoPanicChannelTopics}
            ariaLabel="财富消失的三条通道"
            className="mt-14"
          />
        </section>

        <div className="mt-16 border-t border-zinc-200 pt-16">
          <section id="wealth" aria-labelledby="wealth-title">
            <Coffee2Reveal>
              <p className="c2-eyebrow">{langtontaoWealthMeta.eyebrow}</p>
              <h2
                id="wealth-title"
                className="c2-display mt-3 text-4xl text-zinc-950 md:text-5xl"
              >
                {langtontaoWealthMeta.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
                {langtontaoWealthMeta.lead}
              </p>
            </Coffee2Reveal>

            <div className="mt-10 space-y-12">
              {langtontaoWealthTopicZones.map((zone) => (
                <LangtontaoTopicGrid key={zone.id} zone={zone} topics={zone.topics} />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16">
          <Coffee2Reveal>
            <p className="c2-eyebrow">{langtontaoWhyMfoMeta.eyebrow}</p>
            <h3 className="c2-display mt-2 text-2xl text-zinc-950 md:text-3xl">
              家庭十年愿望清单
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              财富 · 关系 · 教育 · 传承——沿时间轴途经节点作答，勾勒未来十年优先序。
            </p>
          </Coffee2Reveal>
          <div className="mt-8">
            <LangtontaoDecadeWishlistBook />
          </div>
        </div>
      </div>
    </section>
  )
}
