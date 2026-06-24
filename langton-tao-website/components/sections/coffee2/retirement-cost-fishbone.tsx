'use client'

import type { RetirementCostBranch } from '@/lib/content/coffee-retirement-page'
import { formatCny } from '@/lib/retirement/cost-benchmarks'
import { cn } from '@/lib/utils'

type RetirementCostFishboneProps = {
  monthlyTotal: number
  branches: RetirementCostBranch[]
  className?: string
}

export function RetirementCostFishbone({
  monthlyTotal,
  branches,
  className,
}: RetirementCostFishboneProps) {
  const positiveBranches = branches.filter((b) => b.amount > 0)
  const negativeBranches = branches.filter((b) => b.amount < 0)
  const maxAmount = Math.max(
    ...positiveBranches.map((b) => b.amount),
    monthlyTotal,
    1
  )

  return (
    <div className={cn('retirement-fishbone', className)}>
      <p className="retirement-fishbone__label">鱼骨费用结构</p>

      <div className="retirement-fishbone__spine" aria-hidden>
        <span className="retirement-fishbone__spine-head">月费</span>
        <span className="retirement-fishbone__spine-value">
          {formatCny(monthlyTotal)}
        </span>
      </div>

      <div className="retirement-fishbone__branches">
        {positiveBranches.map((branch, index) => {
          const widthPct = Math.max(12, (branch.amount / maxAmount) * 100)
          const side = index % 2 === 0 ? 'left' : 'right'

          return (
            <div
              key={branch.id}
              className={cn(
                'retirement-fishbone__branch',
                `retirement-fishbone__branch--${side}`
              )}
            >
              <div className="retirement-fishbone__branch-line" aria-hidden />
              <div className="retirement-fishbone__branch-body">
                <span className="retirement-fishbone__branch-label">
                  {branch.label}
                </span>
                <div className="retirement-fishbone__bar-track">
                  <div
                    className="retirement-fishbone__bar-fill"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="retirement-fishbone__branch-amount">
                  {formatCny(branch.amount)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {negativeBranches.length > 0 ? (
        <div className="retirement-fishbone__deductions">
          {negativeBranches.map((branch) => (
            <div key={branch.id} className="retirement-fishbone__deduction">
              <span>{branch.label}</span>
              <span>{formatCny(branch.amount)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
