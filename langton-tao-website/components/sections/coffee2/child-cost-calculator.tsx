'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  birthMethodOptions,
  careArrangementOptions,
  childCostSectionMeta,
  childOrderOptions,
  cityTierOptions,
  defaultChildCostInput,
  educationPathOptions,
  healthProfileOptions,
  upbringingStyleOptions,
  urbanRuralOptions,
  type ChildCostInput,
} from '@/lib/content/coffee-child-cost-page'
import { calculateChildCost } from '@/lib/child-cost/calculate-child-cost'
import { formatCny } from '@/lib/child-cost/cost-benchmarks'
import { parseChildCostFromSearchParams } from '@/lib/child-cost/share-url'
import { ChildCostFishbone } from '@/components/sections/coffee2/child-cost-fishbone'
import { ChildCostShareActions } from '@/components/sections/coffee2/child-cost-share-actions'
import { cn } from '@/lib/utils'

type FieldProps<T extends string> = {
  label: string
  value: T
  options: readonly { id: T; label: string }[]
  onChange: (value: T) => void
}

function OptionButtonField<T extends string>({
  label,
  value,
  options,
  onChange,
}: FieldProps<T>) {
  return (
    <div className="child-calc__field" role="group" aria-label={label}>
      <span className="child-calc__label">{label}</span>
      <div className="child-calc__option-pills">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={cn(
              'child-calc__option-pill',
              value === opt.id && 'child-calc__option-pill--active'
            )}
            aria-pressed={value === opt.id}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

type ChildCostCalculatorProps = {
  className?: string
}

export function ChildCostCalculator({ className }: ChildCostCalculatorProps) {
  const searchParams = useSearchParams()
  const [input, setInput] = useState<ChildCostInput>(defaultChildCostInput)

  useEffect(() => {
    const parsed = parseChildCostFromSearchParams(searchParams)
    if (parsed) {
      setInput(parsed)
    }
  }, [searchParams])

  const result = useMemo(() => calculateChildCost(input), [input])

  const update = <K extends keyof ChildCostInput>(
    key: K,
    value: ChildCostInput[K]
  ) => setInput((prev) => ({ ...prev, [key]: value }))

  return (
    <div className={cn('child-calc', className)}>
      <div className="child-calc__grid">
        <div className="child-calc__panel child-calc__panel--inputs">
          <div className="child-calc__fields">
            <OptionButtonField
              label="所在城市"
              value={input.cityTier}
              options={cityTierOptions}
              onChange={(v) => update('cityTier', v)}
            />
            <OptionButtonField
              label="城乡"
              value={input.urbanRural}
              options={urbanRuralOptions}
              onChange={(v) => update('urbanRural', v)}
            />
            <OptionButtonField
              label="孩次"
              value={input.childOrder}
              options={childOrderOptions}
              onChange={(v) => update('childOrder', v)}
            />
            <OptionButtonField
              label="养育风格"
              value={input.upbringingStyle}
              options={upbringingStyleOptions}
              onChange={(v) => update('upbringingStyle', v)}
            />
            <OptionButtonField
              label="教育路径"
              value={input.educationPath}
              options={educationPathOptions}
              onChange={(v) => update('educationPath', v)}
            />
            <OptionButtonField
              label="生育方式"
              value={input.birthMethod}
              options={birthMethodOptions}
              onChange={(v) => update('birthMethod', v)}
            />
            <OptionButtonField
              label="照护安排"
              value={input.careArrangement}
              options={careArrangementOptions}
              onChange={(v) => update('careArrangement', v)}
            />
            <OptionButtonField
              label="健康基础"
              value={input.healthProfile}
              options={healthProfileOptions}
              onChange={(v) => update('healthProfile', v)}
            />
          </div>
        </div>

        <div className="child-calc__panel child-calc__panel--result">
          <p className="child-calc__result-label">
            {childCostSectionMeta.monthlyLabel}
          </p>
          <p className="child-calc__result-value">
            {formatCny(result.monthlyTotal)}
            <span className="child-calc__result-unit">/ 月</span>
          </p>

          <p className="child-calc__lifetime-label">
            {childCostSectionMeta.cumulativeLabel}
          </p>
          <p className="child-calc__lifetime-sublabel">
            {childCostSectionMeta.cumulativeSubLabel}
          </p>
          <p className="child-calc__lifetime-value">
            {formatCny(result.cumulativeTotal)}
          </p>

          <ChildCostFishbone
            monthlyTotal={result.monthlyTotal}
            branches={result.branches}
            className="mt-6"
          />

          <ChildCostShareActions input={input} result={result} />

          {result.notes.length > 0 ? (
            <ul className="child-calc__notes">
              {result.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <p className="child-calc__disclaimer">
        {childCostSectionMeta.calcDisclaimer}
      </p>
    </div>
  )
}
