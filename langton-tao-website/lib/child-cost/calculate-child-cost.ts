import type {
  ChildCostInput,
  ChildCostResult,
} from '@/lib/content/coffee-child-cost-page'
import {
  branchShare,
  childOrderMultiplier,
  computeCumulativeTotal,
  getAssistedBirthAddon,
  nationalMonthlyReference,
  urbanMonthlyBaseline,
  urbanMonthlyReference,
  urbanRuralMultiplier,
  upbringingStyleMultiplier,
  cityTierMultiplier,
  careArrangementMultiplier,
  educationPathMultiplier,
  healthProfileMultiplier,
  childCostPlanningMonths,
} from '@/lib/child-cost/cost-benchmarks'

export function calculateChildCost(input: ChildCostInput): ChildCostResult {
  const notes: string[] = []

  const globalMultiplier =
    cityTierMultiplier[input.cityTier] *
    urbanRuralMultiplier[input.urbanRural] *
    upbringingStyleMultiplier[input.upbringingStyle] *
    childOrderMultiplier[input.childOrder]

  const birthAmount = Math.round(
    urbanMonthlyBaseline * branchShare.birth * globalMultiplier +
      getAssistedBirthAddon(input.birthMethod) * globalMultiplier
  )

  const foodAmount = Math.round(
    urbanMonthlyBaseline * branchShare.food * globalMultiplier
  )

  const housingAmount = Math.round(
    urbanMonthlyBaseline * branchShare.housing * globalMultiplier
  )

  const educationAmount = Math.round(
    urbanMonthlyBaseline *
      branchShare.education *
      globalMultiplier *
      educationPathMultiplier[input.educationPath]
  )

  const medicalAmount = Math.round(
    urbanMonthlyBaseline *
      branchShare.medical *
      globalMultiplier *
      healthProfileMultiplier[input.healthProfile]
  )

  const careAmount = Math.round(
    urbanMonthlyBaseline *
      branchShare.care *
      globalMultiplier *
      careArrangementMultiplier[input.careArrangement]
  )

  const goodsAmount = Math.round(
    urbanMonthlyBaseline * branchShare.goods * globalMultiplier
  )

  const experienceAmount = Math.round(
    urbanMonthlyBaseline * branchShare.experience * globalMultiplier
  )

  const branches = [
    { id: 'birth', label: '生育生产', amount: birthAmount },
    { id: 'food', label: '食品营养', amount: foodAmount },
    { id: 'housing', label: '居住分摊', amount: housingAmount },
    { id: 'education', label: '教育学业', amount: educationAmount },
    { id: 'medical', label: '医疗健康', amount: medicalAmount },
    { id: 'care', label: '照护托育', amount: careAmount },
    { id: 'goods', label: '用品服饰', amount: goodsAmount },
    { id: 'experience', label: '体验娱乐', amount: experienceAmount },
  ].filter((branch) => branch.amount > 0)

  const monthlyTotal = branches.reduce((sum, branch) => sum + branch.amount, 0)

  const benchmarkMonthly =
    input.urbanRural === 'urban'
      ? urbanMonthlyReference
      : nationalMonthlyReference
  const benchmarkLabel =
    input.urbanRural === 'urban' ? '城镇参考均值' : '全国参考均值'
  const benchmarkDeltaPct = Math.round(
    ((monthlyTotal - benchmarkMonthly) / benchmarkMonthly) * 100
  )

  if (input.childOrder !== 'first') {
    notes.push(
      '二孩、三孩及以上存在规模经济效应，此处已按育娲报告边际系数折减；首孩全口径对照时仍可能更高。'
    )
  }

  if (input.upbringingStyle === 'necessary') {
    notes.push(
      '「必要开支」口径剔除了大量改善性与选择性支出，更接近报告中的必要生育成本（约分摊成本的 68%）。'
    )
  }

  if (input.birthMethod === 'assisted') {
    notes.push(
      '辅助生殖一次性费用已按 19 年摊销计入「生育生产」分支；实际 IVF 周期与用药差异较大。'
    )
  }

  if (
    input.careArrangement === 'family' ||
    input.careArrangement === 'grandparent'
  ) {
    notes.push(
      '父母/长辈照护的现金支出较低，但机会成本（职业中断、时间、关系压力）未计入。'
    )
  }

  if (input.educationPath === 'international') {
    notes.push(
      '国际路线与留学预备仅覆盖 0-18 岁阶段；18-21 岁高等教育净增成本报告均值约 1413 元/月，另计。'
    )
  } else {
    notes.push(
      '18-21 岁高等教育阶段的学费与生活支出未计入；报告该段净增成本均值约 1413 元/月。'
    )
  }

  notes.push(
    '这是否在你的教育金预算之内？第二天窗口期，建议把累计敞口纳入家庭定投起点。'
  )

  if (benchmarkDeltaPct !== 0) {
    const direction = benchmarkDeltaPct > 0 ? '高于' : '低于'
    notes.push(
      `当前估算月均 ${direction}${benchmarkLabel}（${benchmarkMonthly.toLocaleString('zh-CN')} 元/月）约 ${Math.abs(benchmarkDeltaPct)}%。`
    )
  }

  return {
    monthlyTotal,
    cumulativeTotal: computeCumulativeTotal(monthlyTotal),
    planningMonths: childCostPlanningMonths,
    branches,
    notes,
    benchmarkLabel,
    benchmarkMonthly,
    benchmarkDeltaPct,
  }
}
