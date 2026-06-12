import Image from 'next/image'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipBenefitBars,
  tierColumnLabels,
  wealthHealthCheckupItems,
} from '@/lib/content/membership-v2'

function TierTag({ tierId }: { tierId: MembershipTierId }) {
  return (
    <span className="c2-chip border-zinc-300 bg-white text-zinc-700">
      {tierColumnLabels[tierId]}
    </span>
  )
}

export function MembershipBenefitBars() {
  return (
    <div id="tier-benefits" className="scroll-mt-28 space-y-4">
      <div>
        <h2 className="c2-display text-3xl text-zinc-950 md:text-4xl">
          权益详情
        </h2>
        <p className="mt-2 text-sm text-zinc-600 md:text-base">
          逐项了解核心权益，标签标示拥有该权益的会员档位
        </p>
      </div>

      {membershipBenefitBars.map((benefit) => (
        <article
          key={benefit.id}
          className="c2-card flex flex-col overflow-hidden sm:flex-row"
        >
          <div className="relative aspect-[21/9] w-full shrink-0 border-b border-zinc-200 sm:aspect-auto sm:w-[34%] sm:border-b-0 sm:border-r md:min-h-[180px]">
            <div
              className={`absolute inset-0 ${benefit.imageClass}`}
              aria-hidden
            />
            <Image
              src={benefit.imageSrc}
              alt={benefit.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 380px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              {benefit.tierIds.map((tierId) => (
                <TierTag key={`${benefit.id}-${tierId}`} tierId={tierId} />
              ))}
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-tight text-zinc-950 md:text-xl">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {benefit.summary}
            </p>
            {benefit.id === 'health-checkup' ? (
              <ul className="mt-4 space-y-3">
                {wealthHealthCheckupItems.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2"
                  >
                    <p className="text-xs font-semibold text-zinc-950 md:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-zinc-600 md:text-sm">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {benefit.items.map((item) => (
                  <li key={item}>
                    <span className="c2-chip bg-zinc-50 text-zinc-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
