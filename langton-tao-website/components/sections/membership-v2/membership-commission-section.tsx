import { Suspense } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  MembershipCommissionCalculator,
} from '@/components/sections/membership-v2/membership-commission-calculator'
import {
  formatCommissionRule,
  getCommissionRuleLabel,
  membershipCommissionMatrix,
  membershipCommissionPayoutModel,
  membershipCommissionProducts,
  membershipCommissionSection,
  membershipCommissionTierLabels,
  membershipCommissionTierOrder,
} from '@/lib/content/membership-commission'
import { cn } from '@/lib/utils'

export function MembershipCommissionSection() {
  return (
    <section
      id="commission-overview"
      className="member-section member-section--commission border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
      aria-labelledby="commission-overview-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <div className="max-w-3xl">
            <p className="c2-eyebrow">{membershipCommissionSection.eyebrow}</p>
            <h2
              id="commission-overview-heading"
              className="c2-display mt-3 text-3xl text-zinc-950 md:text-4xl"
            >
              {membershipCommissionSection.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              {membershipCommissionSection.subtitle}
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              {membershipCommissionSection.lead}
            </p>
          </div>
        </Coffee2Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {membershipCommissionPayoutModel.map((item, index) => (
            <Coffee2Reveal
              key={item.title}
              as="article"
              delay={80 + index * 90}
              className="c2-card h-full bg-white p-5"
            >
              <h3 className="text-sm font-semibold text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
            </Coffee2Reveal>
          ))}
        </div>

        <Coffee2Reveal delay={120}>
          <div className="member-commission-matrix mt-10 overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-4 font-semibold text-zinc-950 md:px-6">
                    分享产品
                  </th>
                  {membershipCommissionTierOrder.map((tierId) => (
                    <th
                      key={tierId}
                      className={cn(
                        'px-3 py-4 text-center font-semibold md:px-4',
                        tierId === 'board'
                          ? 'bg-zinc-950 text-pop-yellow'
                          : 'text-zinc-950'
                      )}
                    >
                      {membershipCommissionTierLabels[tierId]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membershipCommissionProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={cn(
                      'border-b border-zinc-100',
                      index % 2 === 1 && 'bg-zinc-50/60'
                    )}
                  >
                    <td className="px-4 py-4 md:px-6">
                      <p className="font-semibold text-zinc-950">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {product.category}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        {product.priceLabel}
                      </p>
                    </td>
                    {membershipCommissionTierOrder.map((tierId) => {
                      const rule = membershipCommissionMatrix[tierId][product.id]
                      return (
                        <td
                          key={tierId}
                          className={cn(
                            'px-3 py-4 text-center md:px-4',
                            tierId === 'board' && 'bg-zinc-950/5'
                          )}
                        >
                          <p className="font-semibold text-zinc-950">
                            {formatCommissionRule(rule)}
                          </p>
                          <p className="mt-1 text-[11px] leading-snug text-zinc-500">
                            {getCommissionRuleLabel(tierId, product.id)}
                          </p>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Coffee2Reveal>

        <Coffee2Reveal delay={160} className="c2-reveal-fade">
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            {membershipCommissionSection.placeholderNote}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal delay={200}>
          <Suspense
            fallback={
              <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-500">
                加载计算器…
              </div>
            }
          >
            <MembershipCommissionCalculator />
          </Suspense>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
