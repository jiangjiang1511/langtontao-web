'use client'

import { useMemo, useState } from 'react'
import {
  calculateHkSavings,
  estimateIrr,
} from '@/lib/langtontao/calculate-hk-savings'
import { langtontaoHkSavingsDefaults } from '@/lib/content/langtontao/langtontao-tools'

export function LangtontaoHkSavingsCalculator() {
  const [annualPremium, setAnnualPremium] = useState<number>(
    langtontaoHkSavingsDefaults.annualPremium
  )
  const [years, setYears] = useState<number>(langtontaoHkSavingsDefaults.years)
  const [rate, setRate] = useState<number>(langtontaoHkSavingsDefaults.dividendRateMid)

  const result = useMemo(
    () => calculateHkSavings({ annualPremium, years, dividendRate: rate }),
    [annualPremium, years, rate]
  )

  const irr = useMemo(
    () => estimateIrr(annualPremium, years, result.projectedValue),
    [annualPremium, years, result.projectedValue]
  )

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">年缴保费（USD）</span>
          <input
            type="number"
            value={annualPremium}
            onChange={(e) => setAnnualPremium(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">缴费年期</span>
          <input
            type="number"
            value={years}
            min={1}
            max={30}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">
            演示年化回报率（非保证）
          </span>
          <input
            type="range"
            min={3}
            max={8}
            step={0.5}
            value={rate * 100}
            onChange={(e) => setRate(Number(e.target.value) / 100)}
            className="mt-2 w-full"
          />
          <span className="text-xs text-zinc-500">{(rate * 100).toFixed(1)}%</span>
        </label>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          累计保费：<strong>{result.totalPremium.toLocaleString()}</strong> USD
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          演示期末价值：<strong>{result.projectedValue.toLocaleString()}</strong>{' '}
          USD
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          演示红利：<strong>{result.projectedDividend.toLocaleString()}</strong>{' '}
          USD
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          演示 IRR：约 <strong>{(irr * 100).toFixed(2)}%</strong>
        </p>
      </div>
    </div>
  )
}
