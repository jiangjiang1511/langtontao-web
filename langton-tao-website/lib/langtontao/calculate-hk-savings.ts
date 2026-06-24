export type HkSavingsInput = {
  annualPremium: number
  years: number
  dividendRate: number
}

export type HkSavingsResult = {
  totalPremium: number
  projectedValue: number
  projectedDividend: number
  simpleReturn: number
}

export function calculateHkSavings(input: HkSavingsInput): HkSavingsResult {
  const { annualPremium, years, dividendRate } = input
  const totalPremium = annualPremium * years
  let value = 0

  for (let y = 1; y <= years; y++) {
    value = (value + annualPremium) * (1 + dividendRate)
  }

  const projectedDividend = value - totalPremium
  const simpleReturn =
    totalPremium > 0 ? (value - totalPremium) / totalPremium : 0

  return {
    totalPremium,
    projectedValue: Math.round(value),
    projectedDividend: Math.round(projectedDividend),
    simpleReturn,
  }
}

export function estimateIrr(
  annualPremium: number,
  years: number,
  terminalValue: number
): number {
  let low = 0
  let high = 0.25
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2
    let npv = -terminalValue
    for (let y = 1; y <= years; y++) {
      npv += annualPremium / Math.pow(1 + mid, y)
    }
    if (npv > 0) low = mid
    else high = mid
  }
  return (low + high) / 2
}
