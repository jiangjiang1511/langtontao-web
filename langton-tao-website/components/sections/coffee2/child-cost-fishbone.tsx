'use client'

import type { ChildCostBranch } from '@/lib/content/coffee-child-cost-page'
import { formatCny } from '@/lib/child-cost/cost-benchmarks'
import { cn } from '@/lib/utils'

type ChildCostFishboneProps = {
  monthlyTotal: number
  branches: ChildCostBranch[]
  className?: string
}

export function ChildCostFishbone({
  monthlyTotal,
  branches,
  className,
}: ChildCostFishboneProps) {
  const positiveBranches = branches.filter((b) => b.amount > 0)
  const maxAmount = Math.max(
    ...positiveBranches.map((b) => b.amount),
    monthlyTotal,
    1
  )

  return (
    <div className={cn('child-fishbone', className)}>
      <p className="child-fishbone__label">鱼骨费用结构</p>

      <div className="child-fishbone__spine" aria-hidden>
        <span className="child-fishbone__spine-head">月均</span>
        <span className="child-fishbone__spine-value">
          {formatCny(monthlyTotal)}
        </span>
      </div>

      <div className="child-fishbone__branches">
        {positiveBranches.map((branch, index) => {
          const widthPct = Math.max(12, (branch.amount / maxAmount) * 100)
          const side = index % 2 === 0 ? 'left' : 'right'

          return (
            <div
              key={branch.id}
              className={cn(
                'child-fishbone__branch',
                `child-fishbone__branch--${side}`
              )}
            >
              <div className="child-fishbone__branch-line" aria-hidden />
              <div className="child-fishbone__branch-body">
                <span className="child-fishbone__branch-label">
                  {branch.label}
                </span>
                <div className="child-fishbone__bar-track">
                  <div
                    className="child-fishbone__bar-fill"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="child-fishbone__branch-amount">
                  {formatCny(branch.amount)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
