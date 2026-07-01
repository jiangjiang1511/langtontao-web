import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipBenefitBarGroups,
  tierColumnLabels,
  wealthHealthCheckupItems,
  type MembershipBenefitBar,
} from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'

const tierTagClass: Record<MembershipTierId, string> = {
  member: 'member-benefit-catalog__tier--member',
  plus: 'member-benefit-catalog__tier--plus',
  pro: 'member-benefit-catalog__tier--pro',
  board: 'member-benefit-catalog__tier--board',
}

const featuredRowClass: Record<string, string> = {
  'physical-pass': 'member-benefit-catalog__row--featured-pass',
  'channel-commission': 'member-benefit-catalog__row--featured-channel',
  'allocation-toolkit': 'member-benefit-catalog__row--featured-toolkit',
}

function TierTag({ tierId }: { tierId: MembershipTierId }) {
  return (
    <span className={cn('member-benefit-catalog__tier', tierTagClass[tierId])}>
      {tierColumnLabels[tierId]}
    </span>
  )
}

function BenefitRow({ benefit }: { benefit: MembershipBenefitBar }) {
  return (
    <article
      className={cn(
        'member-benefit-catalog__row',
        benefit.featured && featuredRowClass[benefit.id]
      )}
    >
      <div className="member-benefit-catalog__tiers">
        {benefit.tierIds.map((tierId) => (
          <TierTag key={`${benefit.id}-${tierId}`} tierId={tierId} />
        ))}
      </div>

      <div className="member-benefit-catalog__body">
        <h3 className="member-benefit-catalog__title">{benefit.title}</h3>
        <Coffee2AnnotatedText
          text={benefit.summary}
          className="member-benefit-catalog__summary"
          as="span"
        />

        {benefit.id === 'health-checkup' ? (
          <dl className="member-benefit-catalog__checkup-grid">
            {wealthHealthCheckupItems.map((item) => (
              <div key={item.title} className="member-benefit-nested">
                <dt className="text-xs font-semibold text-zinc-950">
                  {item.title}
                </dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-zinc-600 md:text-xs">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="member-benefit-catalog__items">
            {benefit.items.map((item) => (
              <li key={item} className="member-benefit-catalog__item">
                <Coffee2AnnotatedText as="span" text={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function MembershipBenefitBars() {
  return (
    <div id="tier-benefits" className="scroll-mt-28">
      <Coffee2Reveal>
        <div className="mb-5 md:mb-6">
          <h2 className="c2-display text-2xl text-zinc-950 md:text-3xl">
            权益详情
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            按档位范围分组展示 · 私董会权益见下方专属区块
          </p>
        </div>
      </Coffee2Reveal>

      <div className="space-y-5">
        {membershipBenefitBarGroups.map((group, groupIndex) => (
          <Coffee2Reveal key={group.scope} delay={60 + groupIndex * 40}>
            <section
              className={cn(
                'member-benefit-catalog',
                `member-benefit-catalog--${group.scope}`
              )}
              aria-labelledby={`tier-benefits-${group.scope}`}
            >
              <header
                id={`tier-benefits-${group.scope}`}
                className="member-benefit-catalog__group-header"
              >
                <h3 className="member-benefit-catalog__group-title">
                  {group.title}
                </h3>
                <p className="member-benefit-catalog__group-description">
                  {group.description}
                </p>
              </header>

              {group.benefits.map((benefit) => (
                <BenefitRow key={benefit.id} benefit={benefit} />
              ))}
            </section>
          </Coffee2Reveal>
        ))}
      </div>
    </div>
  )
}
