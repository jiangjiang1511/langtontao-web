import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoYitishuangkuaCta } from '@/components/sections/langtontao/langtontao-yitishuangkua-cta'
import {
  langtontaoHongKongMeta,
  langtontaoHongKongNarrative,
  langtontaoYitishuangkua,
} from '@/lib/content/langtontao/langtontao-hong-kong'

export function LangtontaoHongKongSection() {
  return (
    <section
      id="hong-kong"
      className="lt-section lt-section--hk scroll-mt-28 bg-zinc-950 py-16 text-white md:py-24"
      aria-labelledby="hong-kong-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow text-zinc-500">{langtontaoHongKongMeta.eyebrow}</p>
          <h2
            id="hong-kong-title"
            className="c2-display mt-3 text-4xl text-white md:text-5xl"
          >
            {langtontaoHongKongMeta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {langtontaoHongKongMeta.lead}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal delay={80}>
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">
              {langtontaoHongKongNarrative.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
              {langtontaoHongKongNarrative.body}
            </p>
          </div>
        </Coffee2Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {langtontaoHongKongNarrative.advantages.map((item, index) => (
            <Coffee2Reveal
              key={item.id}
              delay={100 + index * 50}
              as="li"
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5"
            >
              <p className="font-semibold text-jarsy-violet">{item.title}</p>
              <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
            </Coffee2Reveal>
          ))}
        </ul>

        <Coffee2Reveal delay={160}>
          <div className="mt-16 border-t border-zinc-800 pt-12">
            <p className="c2-eyebrow text-zinc-500">{langtontaoYitishuangkua.eyebrow}</p>
            <h3 className="c2-display mt-3 text-3xl text-white md:text-4xl">
              {langtontaoYitishuangkua.title}
            </h3>
            <p className="mt-2 text-lg text-zinc-400">{langtontaoYitishuangkua.subtitle}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
              {langtontaoYitishuangkua.definition}
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {[langtontaoYitishuangkua.mainland, langtontaoYitishuangkua.hongkong].map(
                (hub) => (
                  <article
                    key={hub.id}
                    className="rounded-xl border border-zinc-700 bg-zinc-900 p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      {hub.label}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">{hub.address}</h4>
                    <p className="mt-2 text-sm text-zinc-400">{hub.summary}</p>
                  </article>
                )
              )}
            </div>

            <div className="mt-8 rounded-xl border border-jarsy-violet/30 bg-jarsy-violet/5 p-5">
              <h4 className="font-semibold text-jarsy-violet">
                {langtontaoYitishuangkua.synergyTitle}
              </h4>
              <p className="mt-2 text-sm text-zinc-400">{langtontaoYitishuangkua.synergyBody}</p>
            </div>

            <ul className="mt-8 space-y-2">
              {langtontaoYitishuangkua.deliveryMap.map((row) => (
                <li
                  key={row.business}
                  className="flex flex-col gap-1 border-b border-zinc-800 py-3 text-sm sm:flex-row sm:justify-between"
                >
                  <span className="font-medium text-zinc-300">{row.business}</span>
                  <span className="text-zinc-500">{row.node}</span>
                </li>
              ))}
            </ul>

            <LangtontaoYitishuangkuaCta
              cta={langtontaoYitishuangkua.cta}
              className="mt-8"
            />
          </div>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
