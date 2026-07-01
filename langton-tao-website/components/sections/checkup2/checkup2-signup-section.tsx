import Link from 'next/link'
import { ContactTrigger } from '@/components/contact-trigger'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { checkupSignup } from '@/lib/content/checkup2-page'
import { wealthCheckupDetailMeta } from '@/lib/content/langtontao/wealth-checkup-detail-page'
import { cn } from '@/lib/utils'

type Checkup2SignupSectionProps = {
  variant?: 'page' | 'embedded'
}

export function Checkup2SignupSection({ variant = 'page' }: Checkup2SignupSectionProps) {
  const embedded = variant === 'embedded'

  return (
    <section
      className={cn(
        embedded
          ? 'lt-checkup-embedded lt-checkup-embedded--signup text-center'
          : 'border-b border-zinc-200 bg-zinc-950 py-20 md:py-28'
      )}
      aria-labelledby="checkup2-signup-title"
    >
      <div className={cn(embedded ? 'lt-checkup-embedded__inner' : 'mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8')}>
        <JarsyReveal className={embedded ? 'w-full' : undefined}>
          <p className={cn('c2-eyebrow lt-heading-l2__eyebrow', embedded ? '' : 'text-zinc-500')}>
            {checkupSignup.eyebrow}
          </p>
          <h2
            id="checkup2-signup-title"
            className={cn(
              embedded
                ? 'lt-heading-l2 lt-heading-l2--with-rule lt-heading-l2--center'
                : 'c2-display mt-4 text-3xl text-white md:text-5xl'
            )}
          >
            {checkupSignup.title}
            {embedded ? (
              <span className="lt-heading-l2__rule lt-heading-l2__rule--center" aria-hidden />
            ) : null}
          </h2>
        </JarsyReveal>
        <JarsyReveal delay={100} className="c2-reveal-fade w-full">
          <p
            className={cn(
              'mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg',
              embedded ? 'lt-heading-l2__lead' : 'text-zinc-400'
            )}
          >
            {checkupSignup.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal delay={180} className="c2-reveal-fade w-full">
          {embedded ? (
            <Link href={wealthCheckupDetailMeta.detailHref} className="c2-btn-cta-emphasis mt-10 inline-flex">
              {checkupSignup.ctaLabel}
            </Link>
          ) : (
            <ContactTrigger
              intent={checkupSignup.contactIntent}
              className="c2-btn-cta-emphasis mt-10"
            >
              {checkupSignup.ctaLabel}
            </ContactTrigger>
          )}
        </JarsyReveal>
      </div>
    </section>
  )
}
