'use client'

import { Fragment, useState } from 'react'
import { Check, ChevronDown, Minus } from 'lucide-react'
import { ContactTrigger } from '@/components/contact-trigger'
import { Button } from '@/components/ui/button'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipPricingOverview,
  membershipTierSections,
  membershipV2CollapsedComparison,
  membershipV2FullComparison,
  tierColumnLabels,
  tierColumnOrder,
  type ComparisonCategory,
  type ComparisonCell,
} from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'

/** 移动端计划对比仅展示三档；私董会由下方独立 section 承接 */
const mobileTierColumnOrder = tierColumnOrder.filter(
  (tierId) => tierId !== 'board'
)

function ComparisonCellValue({
  value,
  compact = false,
}: {
  value: ComparisonCell
  compact?: boolean
}) {
  const iconClass = compact ? 'h-4 w-4' : 'h-5 w-5'

  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Check className={cn(iconClass, 'text-pop-black')} aria-label="包含" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-pop-black/30">
        <Minus className={cn(iconClass)} aria-label="不包含" />
      </span>
    )
  }
  return (
    <span
      className={cn(
        'font-black text-pop-black',
        compact ? 'text-xs' : 'text-sm'
      )}
    >
      {value}
    </span>
  )
}

function BoardMysteryCell({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="relative inline-flex items-center justify-center overflow-hidden rounded border border-pop-black/30 bg-pop-black px-2 py-0.5">
        <span
          className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,230,0,0.25)_0px,rgba(255,230,0,0.25)_6px,transparent_6px,transparent_12px)]"
          aria-hidden
        />
        <span className="relative z-10 text-[10px] font-black uppercase tracking-wider text-pop-yellow">
          邀请制
        </span>
      </span>
    )
  }

  return (
    <div className="relative flex min-h-[52px] items-center justify-center overflow-hidden rounded border-2 border-pop-black/20 bg-pop-black px-2 py-3">
      <div
        className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,230,0,0.25)_0px,rgba(255,230,0,0.25)_8px,transparent_8px,transparent_16px)]"
        aria-hidden
      />
      <span className="relative z-10 text-[10px] font-black uppercase tracking-wider text-pop-yellow">
        邀请制
      </span>
    </div>
  )
}

function TierColumnHeader({ tierId }: { tierId: MembershipTierId }) {
  const tier = membershipTierSections.find((t) => t.id === tierId)
  const isBoard = tierId === 'board'

  return (
    <>
      <p className="text-sm font-black">{tierColumnLabels[tierId]}</p>
      <ContactTrigger
        intent={isBoard ? '私董会' : (tier?.contactIntent ?? '了解会员')}
        size="sm"
        variant="default"
        className="mt-3 w-full max-w-[120px] text-xs"
      >
        {isBoard ? '私董会咨询' : '预约咨询'}
      </ContactTrigger>
    </>
  )
}

function ComparisonTableDesktop({
  categories,
}: {
  categories: typeof membershipV2FullComparison
}) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border-2 border-pop-black md:block">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-pop-black bg-pop-black text-pop-white">
            <th className="min-w-[220px] px-4 py-4 text-sm font-black">
              权益项目
            </th>
            {tierColumnOrder.map((tierId) => {
              const isBoard = tierId === 'board'
              return (
                <th
                  key={tierId}
                  className={cn(
                    'min-w-[130px] px-3 py-4 text-center align-top',
                    isBoard && 'bg-zinc-900'
                  )}
                >
                  <TierColumnHeader tierId={tierId} />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <Fragment key={category.title}>
              <tr className="border-b border-pop-black/15 bg-pop-yellow/30">
                <td
                  colSpan={5}
                  className="px-4 py-3 text-sm font-black uppercase tracking-wide"
                >
                  {category.title}
                </td>
              </tr>
              {category.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-pop-black/10 bg-pop-white even:bg-pop-paper/50"
                >
                  <td className="px-4 py-3 text-sm font-bold text-pop-black/80">
                    {row.label}
                  </td>
                  {tierColumnOrder.map((tierId) => (
                    <td
                      key={`${row.label}-${tierId}`}
                      className={cn(
                        'px-3 py-3 text-center',
                        tierId === 'board' && 'bg-zinc-100/80'
                      )}
                    >
                      {tierId === 'board' ? (
                        <BoardMysteryCell />
                      ) : (
                        <ComparisonCellValue value={row.values[tierId]} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type TierBenefitItem = {
  label: string
  detail?: string
}

type TierBenefitCategory = {
  title: string
  items: TierBenefitItem[]
}

function buildTierBenefitCategories(
  categories: ComparisonCategory[],
  tierId: MembershipTierId
): TierBenefitCategory[] {
  return categories
    .map((category) => ({
      title: category.title,
      items: category.rows
        .filter((row) => row.values[tierId] !== false)
        .map((row) => {
          const value = row.values[tierId]
          return {
            label: row.label,
            detail: typeof value === 'string' ? value : undefined,
          }
        }),
    }))
    .filter((category) => category.items.length > 0)
}

function TierBenefitItemRow({
  label,
  detail,
  mystery = false,
}: TierBenefitItem & { mystery?: boolean }) {
  return (
    <li
      className={cn(
        'flex gap-2 text-xs font-bold leading-snug md:text-sm',
        mystery ? 'text-pop-white/85' : 'text-pop-black/80'
      )}
    >
      <Check
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          mystery ? 'text-pop-yellow' : 'text-pop-black'
        )}
        aria-hidden
      />
      <span>
        {label}
        {detail ? (
          <span className={mystery ? 'text-pop-yellow' : 'text-pop-black'}>
            {' '}
            · {detail}
          </span>
        ) : null}
      </span>
    </li>
  )
}

function MobileTierBenefitBox({
  category,
  mystery = false,
}: {
  category: TierBenefitCategory
  mystery?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 p-3',
        mystery
          ? 'border-pop-yellow/40 bg-zinc-900'
          : 'border-pop-black bg-pop-paper/50'
      )}
    >
      <p
        className={cn(
          'text-xs font-black uppercase tracking-wide',
          mystery ? 'text-pop-yellow' : 'text-pop-black'
        )}
      >
        {category.title}
      </p>
      {mystery ? (
        <div className="mt-3">
          <BoardMysteryCell />
        </div>
      ) : (
        <ul className="mt-2 space-y-2">
          {category.items.map((item) => (
            <TierBenefitItemRow key={item.label} {...item} />
          ))}
        </ul>
      )}
    </div>
  )
}

function ComparisonTableMobile({
  categories,
}: {
  categories: typeof membershipV2FullComparison
}) {
  return (
    <div className="space-y-4 md:hidden">
      {mobileTierColumnOrder.map((tierId) => {
        const card = membershipPricingOverview.find((t) => t.id === tierId)

        if (!card) return null

        const benefitCategories = buildTierBenefitCategories(categories, tierId)

        return (
          <article
            key={tierId}
            className="flex flex-col rounded-lg border-2 border-pop-black bg-pop-white p-5 shadow-pop-black"
          >
            <p className="text-xs font-black uppercase tracking-widest text-pop-black/50">
              {card.shortName}
            </p>
            <h3 className="mt-2 text-lg font-black leading-tight">
              {card.title}
            </h3>
            <p className="mt-2 text-sm font-bold leading-snug text-pop-black/70">
              {card.tagline}
            </p>

            {card.includesLabel ? (
              <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded border border-pop-black/25 bg-pop-paper px-2 py-1 text-xs font-bold leading-snug text-pop-black/70">
                <Check
                  className="h-4 w-4 shrink-0 text-pop-black/50"
                  aria-hidden
                />
                {card.includesLabel}
              </span>
            ) : null}

            <ContactTrigger
              intent={card.contactIntent}
              variant="default"
              size="lg"
              className="mt-4 w-full"
            >
              预约咨询
            </ContactTrigger>

            <div className="mt-5 space-y-3">
              {benefitCategories.map((category) => (
                <MobileTierBenefitBox
                  key={category.title}
                  category={category}
                />
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ComparisonTable({
  desktopCategories,
}: {
  desktopCategories: typeof membershipV2FullComparison
}) {
  return (
    <>
      <ComparisonTableMobile categories={membershipV2FullComparison} />
      <ComparisonTableDesktop categories={desktopCategories} />
    </>
  )
}

export function MembershipComparisonTable() {
  const [expanded, setExpanded] = useState(false)
  const categories = expanded
    ? membershipV2FullComparison
    : membershipV2CollapsedComparison

  return (
    <div id="plan-compare" className="scroll-mt-24">
      <div>
        <h2 className="text-display text-3xl md:text-4xl">计划对比</h2>
        <p className="mt-2 text-sm font-bold text-[color:var(--section-muted)]">
          <span className="md:hidden">三层会员权益完整对比</span>
          <span className="hidden md:inline">
            {expanded
              ? '四层会员权益完整对比'
              : '普通会员核心权益对比（展开查看 Plus / Pro 进阶明细）'}
          </span>
        </p>
      </div>

      <div className="mt-8">
        <ComparisonTable desktopCategories={categories} />
      </div>

      <div className="mt-6 hidden justify-center md:flex">
        <Button
          type="button"
          variant={expanded ? 'outline' : 'default'}
          size="lg"
          onClick={() => setExpanded((v) => !v)}
          className="gap-2"
        >
          {expanded ? '收起对比表格' : '查看完整会员权益对比'}
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              expanded && 'rotate-180'
            )}
          />
        </Button>
      </div>
    </div>
  )
}
