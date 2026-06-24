export type PolicyFinancingInput = {
  cashValue: number
  loanRatio: number
  loanRate: number
  holdYears: number
  portfolioReturn: number
}

export type PolicyFinancingResult = {
  loanAmount: number
  annualInterest: number
  totalInterest: number
  portfolioGain: number
  netBenefit: number
}

export function calculatePolicyFinancing(
  input: PolicyFinancingInput
): PolicyFinancingResult {
  const { cashValue, loanRatio, loanRate, holdYears, portfolioReturn } = input
  const loanAmount = cashValue * loanRatio
  const annualInterest = loanAmount * loanRate
  const totalInterest = annualInterest * holdYears
  const portfolioGain = loanAmount * (Math.pow(1 + portfolioReturn, holdYears) - 1)
  const netBenefit = portfolioGain - totalInterest

  return {
    loanAmount: Math.round(loanAmount),
    annualInterest: Math.round(annualInterest),
    totalInterest: Math.round(totalInterest),
    portfolioGain: Math.round(portfolioGain),
    netBenefit: Math.round(netBenefit),
  }
}
