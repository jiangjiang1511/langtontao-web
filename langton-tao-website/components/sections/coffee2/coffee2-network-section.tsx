import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffeeNetworkHubs,
  coffeeNetworkMeta,
} from '@/lib/content/coffee2-page'
import { cn } from '@/lib/utils'

export function Coffee2NetworkSection() {
  const mainlandHub = coffeeNetworkHubs.find((hub) => hub.id === 'mainland')
  const hongkongHub = coffeeNetworkHubs.find((hub) => hub.id === 'hongkong')

  if (!mainlandHub || !hongkongHub) {
    return null
  }

  return (
    <section
      id="network"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="coffee2-network-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal className="max-w-3xl">
          <p className="c2-eyebrow">{coffeeNetworkMeta.eyebrow}</p>
          <h2
            id="coffee2-network-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            <Coffee2DisplayTypewriter text="一体双跨" charStagger={120} />
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl">
            {coffeeNetworkMeta.subtitle}
          </p>
          <Coffee2AnnotatedText
            text={coffeeNetworkMeta.definition}
            className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg"
          />
        </Coffee2Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <Coffee2Reveal delay={80} className="c2-card p-5 md:p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              {mainlandHub.label}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-950 md:text-xl">
              {mainlandHub.title}
            </h3>
            <Coffee2AnnotatedText
              text={mainlandHub.summary}
              className="mt-3 text-sm leading-relaxed text-zinc-600"
            />
            <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
              {mainlandHub.bullets.map((item, bulletIndex) => (
                <Coffee2Reveal
                  key={item}
                  as="li"
                  delay={120 + bulletIndex * 40}
                  className="text-sm text-zinc-700"
                >
                  {item}
                </Coffee2Reveal>
              ))}
            </ul>
          </Coffee2Reveal>

          <Coffee2Reveal
            delay={160}
            className="rounded-2xl border border-zinc-950 bg-zinc-950 p-5 text-white md:p-6"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              {hongkongHub.label}
            </p>
            <h3 className="mt-2 text-lg font-semibold md:text-xl">
              {hongkongHub.title}
            </h3>
            {hongkongHub.badge ? (
              <p className="mt-2 inline-block rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
                {hongkongHub.badge}
              </p>
            ) : null}
            <Coffee2AnnotatedText
              text={hongkongHub.summary}
              className="mt-4 text-sm leading-relaxed text-zinc-300"
            />
            <ul className="mt-4 space-y-2">
              {hongkongHub.bullets.map((item) => (
                <li key={item} className="text-sm text-zinc-200">
                  {item}
                </li>
              ))}
            </ul>

            {hongkongHub.partners?.length ? (
              <div className="mt-5 border-t border-zinc-800 pt-5">
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                  比元生态协同
                </p>
                <ul className="mt-3 space-y-3">
                  {hongkongHub.partners.map((partner, partnerIndex) => (
                    <Coffee2Reveal
                      key={partner.id}
                      as="li"
                      delay={240 + partnerIndex * 80}
                      id={partner.id}
                      className={cn(
                        'scroll-mt-28 rounded-xl p-4',
                        partner.featured
                          ? 'border border-zinc-600 bg-zinc-900'
                          : 'border border-zinc-800 bg-zinc-900/60'
                      )}
                    >
                      <h4
                        className={cn(
                          'text-sm font-semibold',
                          partner.featured ? 'text-white' : 'text-zinc-200'
                        )}
                      >
                        {partner.title}
                      </h4>
                      <Coffee2AnnotatedText
                        text={partner.summary}
                        className="mt-1.5 text-sm leading-relaxed text-zinc-400"
                      />
                    </Coffee2Reveal>
                  ))}
                </ul>
              </div>
            ) : null}
          </Coffee2Reveal>
        </div>
      </div>
    </section>
  )
}
