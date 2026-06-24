import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoDecadeWishlistDeck } from '@/components/sections/langtontao/langtontao-decade-wishlist-deck'
import { LangtontaoExposureShowcase } from '@/components/sections/langtontao/langtontao-exposure-showcase'
import { LangtontaoOpportunityNeeds } from '@/components/sections/langtontao/langtontao-opportunity-needs'
import {
  langtontaoMfoNeedLines,
  langtontaoWhyMfoMeta,
} from '@/lib/content/langtontao/langtontao-why-mfo'

export function LangtontaoWhyMfoSection() {
  return (
    <section
      id="why-mfo"
      className="lt-section lt-section--why-mfo scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="why-mfo-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">{langtontaoWhyMfoMeta.eyebrow}</p>
          <h2
            id="why-mfo-title"
            className="c2-display mt-3 text-4xl text-zinc-950 md:text-5xl"
          >
            {langtontaoWhyMfoMeta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoWhyMfoMeta.lead}
          </p>
        </Coffee2Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {langtontaoMfoNeedLines.map((line, index) => (
            <Coffee2Reveal key={line.id} delay={80 + index * 60} as="article">
              <article className="c2-card h-full p-5">
                <h3 className="font-semibold text-zinc-950">{line.title}</h3>
                <p className="mt-1 text-xs text-zinc-500">{line.summary}</p>
                <ul className="mt-3 space-y-1">
                  {line.items.map((item) => (
                    <li key={item} className="text-xs text-zinc-600">
                      · {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Coffee2Reveal>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="c2-display text-2xl text-zinc-950 md:text-3xl">
            家庭风险敞口
          </h3>
          <p className="mt-2 text-sm text-zinc-600">
            系统化识别与管理家庭资产负债表风险——点击分类筛选，查看关注等级。
          </p>
          <div className="mt-8">
            <LangtontaoExposureShowcase />
          </div>
        </div>

        <div className="mt-16">
          <LangtontaoOpportunityNeeds />
        </div>

        <div className="mt-16">
          <Coffee2Reveal>
            <p className="c2-eyebrow">{langtontaoWhyMfoMeta.eyebrow}</p>
            <h3 className="c2-display mt-2 text-2xl text-zinc-950 md:text-3xl">
              家庭十年愿望清单
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              财富 · 关系 · 教育 · 传承——勾勒你们家未来十年的优先序。
            </p>
          </Coffee2Reveal>
          <div className="mt-8">
            <LangtontaoDecadeWishlistDeck />
          </div>
        </div>
      </div>
    </section>
  )
}
