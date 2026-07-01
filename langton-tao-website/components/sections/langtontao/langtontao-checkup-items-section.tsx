import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { checkupPageMeta } from '@/lib/content/checkup-page'
import { wealthHealthCheckupItems } from '@/lib/content/membership-v2'

export function LangtontaoCheckupItemsSection() {
  return (
    <section
      id="checkup-items"
      className="lt-checkup-items scroll-mt-28"
      aria-labelledby="langtontao-checkup-items-title"
    >
      <LangtontaoSubsectionHeader
        id="langtontao-checkup-items-title"
        eyebrow="Plus 及以上会员"
        title="六项体检内容"
        lead={checkupPageMeta.lead}
        theme="checkup"
        align="center"
      />

      <ul className="lt-checkup-items__grid">
        {wealthHealthCheckupItems.map((item, index) => (
          <Coffee2Reveal key={item.title} delay={60 + index * 40} as="li">
            <article className="lt-checkup-items__card">
              <p className="c2-step-number">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="lt-checkup-items__title">{item.title}</h3>
              <p className="lt-checkup-items__description">{item.description}</p>
            </article>
          </Coffee2Reveal>
        ))}
      </ul>
    </section>
  )
}
