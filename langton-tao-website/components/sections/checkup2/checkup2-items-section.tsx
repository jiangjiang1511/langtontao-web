import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  checkupPageMeta,
  wealthHealthCheckupItems,
} from '@/lib/content/checkup2-page'
import { cn } from '@/lib/utils'

type Checkup2ItemsSectionProps = {
  variant?: 'page' | 'embedded'
}

export function Checkup2ItemsSection({ variant = 'page' }: Checkup2ItemsSectionProps) {
  const embedded = variant === 'embedded'

  return (
    <section
      id="checkup-items"
      className={cn(
        'scroll-mt-20',
        embedded
          ? 'lt-checkup-embedded'
          : 'border-b border-zinc-200 py-16 md:py-24'
      )}
      aria-labelledby="checkup2-items-title"
    >
      <div className={cn(!embedded && 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
        <JarsyReveal className={embedded ? 'max-w-3xl' : 'max-w-2xl'}>
          <p className="c2-eyebrow lt-heading-l2__eyebrow">Plus 及以上会员</p>
          <h2
            id="checkup2-items-title"
            className={cn(
              embedded ? 'lt-heading-l2 lt-heading-l2--with-rule' : 'c2-display mt-4 text-4xl text-zinc-950 md:text-5xl'
            )}
          >
            {embedded ? <span className="lt-heading-l2__rule" aria-hidden /> : null}
            六项体检内容
          </h2>
          <p className={cn(embedded ? 'lt-heading-l2__lead' : 'mt-6 text-base leading-relaxed text-zinc-600 md:text-lg')}>
            {checkupPageMeta.lead}
          </p>
        </JarsyReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
          {wealthHealthCheckupItems.map((item, index) => (
            <JarsyReveal
              key={item.title}
              delay={index * 70}
              className="c2-card p-6 md:p-8"
            >
              <p className="c2-step-number text-3xl md:text-4xl">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
            </JarsyReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
