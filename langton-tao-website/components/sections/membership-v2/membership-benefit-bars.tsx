import Image from 'next/image'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipBenefitBars,
  tierColumnLabels,
  wealthHealthCheckupItems,
} from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'

function TierTag({ tierId }: { tierId: MembershipTierId }) {
  return (
    <span className="inline-block border-2 border-pop-black bg-pop-yellow px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-pop-black">
      {tierColumnLabels[tierId]}
    </span>
  )
}

export function MembershipBenefitBars() {
  return (
    <div id="tier-benefits" className="scroll-mt-24 space-y-4">
      <div>
        <h2 className="text-display text-2xl md:text-3xl">权益详情</h2>
        <p className="mt-2 text-sm font-bold text-[color:var(--section-muted)]">
          逐项了解核心权益，标签标示拥有该权益的会员档位
        </p>
      </div>

      {membershipBenefitBars.map((benefit) => (
        <article
          key={benefit.id}
          className="flex flex-col overflow-hidden rounded-lg border-2 border-pop-black bg-pop-white shadow-pop-black sm:flex-row"
        >
          <div className="relative aspect-[21/9] w-full shrink-0 border-b-2 border-pop-black sm:aspect-auto sm:w-[34%] sm:border-b-0 sm:border-r-2 md:min-h-[180px]">
            <div
              className={cn('absolute inset-0', benefit.imageClass)}
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
            <h3 className="mt-3 text-lg font-black leading-tight md:text-xl">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm font-bold leading-relaxed text-pop-black/65">
              {benefit.summary}
            </p>
            {benefit.id === 'health-checkup' ? (
              <ul className="mt-4 space-y-3">
                {wealthHealthCheckupItems.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border-2 border-pop-black bg-pop-paper px-3 py-2"
                  >
                    <p className="text-xs font-black text-pop-black md:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-bold leading-snug text-pop-black/65 md:text-sm">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {benefit.items.map((item) => (
                  <li key={item}>
                    <span className="inline-block border-2 border-pop-black bg-pop-paper px-3 py-1 text-xs font-bold leading-snug md:text-sm">
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
