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

const mobileTierColumnOrder = tierColumnOrder.filter(
  (tierId) => tierId !== 'board'
)

const tierCtaClass =
  'mt-3 w-full max-w-[120px] rounded-full border-0 bg-white text-xs font-semibold text-zinc-950 shadow-none hover:bg-zinc-100 hover:translate-y-0 hover:shadow-none'

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
        <Check className={cn(iconClass, 'text-zinc-950')} aria-label="包含" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-zinc-300">
        <Minus className={cn(iconClass)} aria-label="不包含" />
      </span>
    )
  }
  return (
    <span
      className={cn(
        'font-semibold text-zinc-950',
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
      <span className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          邀请制
        </span>
      </span>
    )
  }

  return (
    <div className="flex min-h-[52px] items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
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
      <p className="text-sm font-semibold">{tierColumnLabels[tierId]}</p>
      <ContactTrigger
        intent={isBoard ? '私董会' : (tier?.contactIntent ?? '了解会员')}
        size="sm"
        variant="dark"
        className={tierCtaClass}
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
    <div className="hidden overflow-x-auto rounded-2xl border border-zinc-200 md:block">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-950 text-white">
            <th className="min-w-[220px] px-4 py-4 text-sm font-semibold">
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
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <td
                  colSpan={5}
                  className="px-4 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-700"
                >
                  {category.title}
                </td>
              </tr>
              {category.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-zinc-100 bg-white even:bg-zinc-50/50"
                >
                  <td className="px-4 py-3 text-sm text-zinc-700">
                    {row.label}
                  </td>
                  {tierColumnOrder.map((tierId) => (
                    <td
                      key={`${row.label}-${tierId}`}
                      className={cn(
                        'px-3 py-3 text-center',
                        tierId === 'board' && 'bg-zinc-50'
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
        'flex gap-2 text-xs leading-snug md:text-sm',
        mystery ? 'text-zinc-300' : 'text-zinc-700'
      )}
    >
      <Check
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          mystery ? 'text-zinc-400' : 'text-zinc-950'
        )}
        aria-hidden
      />
      <span>
        {label}
        {detail ? (
          <span className={mystery ? 'text-zinc-400' : 'text-zinc-950'}>
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
        'rounded-xl border p-3',
        mystery
          ? 'border-zinc-700 bg-zinc-900'
          : 'border-zinc-200 bg-zinc-50'
      )}
    >
      <p
        className={cn(
          'text-xs font-semibold uppercase tracking-wide',
          mystery ? 'text-zinc-400' : 'text-zinc-700'
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
  const mobileCtaClass =
    'w-full rounded-full border-0 bg-zinc-950 font-semibold text-white shadow-none hover:bg-zinc-800 hover:translate-y-0 hover:shadow-none'

  return (
    <div className="space-y-4 md:hidden">
      {mobileTierColumnOrder.map((tierId) => {
        const card = membershipPricingOverview.find((t) => t.id === tierId)

        if (!card) return null

        const benefitCategories = buildTierBenefitCategories(categories, tierId)

        return (
          <article key={tierId} className="c2-card flex flex-col p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              {card.shortName}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-zinc-950">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-snug text-zinc-600">
              {card.tagline}
            </p>

            {card.includesLabel ? (
              <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs leading-snug text-zinc-600">
                <Check
                  className="h-4 w-4 shrink-0 text-zinc-500"
                  aria-hidden
                />
                {card.includesLabel}
              </span>
            ) : null}

            <ContactTrigger
              intent={card.contactIntent}
              variant="dark"
              size="lg"
              className={mobileCtaClass}
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
    <div id="plan-compare" className="scroll-mt-28">
      <div>
        <h2 className="c2-display text-3xl text-zinc-950 md:text-4xl">
          计划对比
        </h2>
        <p className="mt-2 text-sm text-zinc-600 md:text-base">
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
          variant="outline"
          size="lg"
          onClick={() => setExpanded((v) => !v)}
          className="gap-2 rounded-full border-zinc-300 bg-white font-semibold text-zinc-950 hover:bg-zinc-50"
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
