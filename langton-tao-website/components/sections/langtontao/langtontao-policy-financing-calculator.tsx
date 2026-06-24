'use client'

import { useMemo, useState } from 'react'
import { calculatePolicyFinancing } from '@/lib/langtontao/calculate-policy-financing'
import { langtontaoPolicyFinancingDefaults } from '@/lib/content/langtontao/langtontao-tools'

export function LangtontaoPolicyFinancingCalculator() {
  const [cashValue, setCashValue] = useState<number>(
    langtontaoPolicyFinancingDefaults.cashValue
  )
  const [loanRatio, setLoanRatio] = useState<number>(
    langtontaoPolicyFinancingDefaults.loanRatio
  )
  const [loanRate, setLoanRate] = useState<number>(
    langtontaoPolicyFinancingDefaults.loanRate
  )
  const [holdYears, setHoldYears] = useState<number>(
    langtontaoPolicyFinancingDefaults.holdYears
  )
  const [portfolioReturn, setPortfolioReturn] = useState<number>(
    langtontaoPolicyFinancingDefaults.portfolioReturn
  )

  const result = useMemo(
    () =>
      calculatePolicyFinancing({
        cashValue,
        loanRatio,
        loanRate,
        holdYears,
        portfolioReturn,
      }),
    [cashValue, loanRatio, loanRate, holdYears, portfolioReturn]
  )

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">保单现金价值</span>
          <input
            type="number"
            value={cashValue}
            onChange={(e) => setCashValue(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">融资比例</span>
          <input
            type="range"
            min={50}
            max={90}
            value={loanRatio * 100}
            onChange={(e) => setLoanRatio(Number(e.target.value) / 100)}
            className="mt-2 w-full"
          />
          <span className="text-xs text-zinc-500">
            {(loanRatio * 100).toFixed(0)}%
          </span>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">贷款利率</span>
          <input
            type="number"
            step={0.005}
            value={loanRate}
            onChange={(e) => setLoanRate(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">持有年数</span>
          <input
            type="number"
            min={1}
            max={20}
            value={holdYears}
            onChange={(e) => setHoldYears(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-zinc-700">投资组合年化回报（演示）</span>
          <input
            type="number"
            step={0.01}
            value={portfolioReturn}
            onChange={(e) => setPortfolioReturn(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          贷款金额：<strong>{result.loanAmount.toLocaleString()}</strong>
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          年利息：<strong>{result.annualInterest.toLocaleString()}</strong>
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          累计利息：<strong>{result.totalInterest.toLocaleString()}</strong>
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          投资组合增益（演示）：
          <strong>{result.portfolioGain.toLocaleString()}</strong>
        </p>
        <p className="mt-2 text-sm font-semibold text-zinc-950">
          净收益（演示）：{result.netBenefit.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
