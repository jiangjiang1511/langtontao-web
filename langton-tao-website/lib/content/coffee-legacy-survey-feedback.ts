import type { LegacySurveyAnswers } from '@/lib/content/coffee-legacy-page'

export type LegacyOutcomeId =
  | 'legacy-estate-transfer'
  | 'legacy-family-peace'
  | 'legacy-containment'
  | 'legacy-same-frequency'

export type LegacySurveySoftCta =
  | { label: string; href: string }
  | { label: string; comingSoon: true }

export type LegacySurveyFeedbackProfile = {
  id: LegacyOutcomeId
  headline: string
  reflection: string
  invite: string
  softCta: LegacySurveySoftCta
}

const comingSoonCta = (label: string): LegacySurveySoftCta => ({
  label,
  comingSoon: true,
})

export const legacySurveyFeedbackProfiles: Record<
  LegacyOutcomeId,
  LegacySurveyFeedbackProfile
> = {
  'legacy-estate-transfer': {
    id: 'legacy-estate-transfer',
    headline: '定向传递：让遗产有名字、有路径',
    reflection:
      '你们更关心的是「钱怎么传、传给谁」——保单、信托、受益人安排，本质是把不确定性从「会不会乱」变成「有名字、有路径」。定向传递不是多买几份文件，而是让每一笔财富知道它要去哪里。',
    invite: '把传承写成家庭语言，比挂在嘴上的「一切为了孩子」更诚实。',
    softCta: comingSoonCta('了解定向传递的理念'),
  },
  'legacy-family-peace': {
    id: 'legacy-family-peace',
    headline: '清晰边界：复杂家庭里的少吵架安排',
    reflection:
      '你们最怕的不是传得少，而是传得乱——再婚、非婚生子、兄弟姐妹各怀心思时，纸面安排若未对齐，诉讼往往比税务更早到来。清晰边界不是冷血，而是给爱留出可执行的形状。',
    invite: '复杂家庭更需要先谈「怎么分」，再谈「分多少」。',
    softCta: comingSoonCta('了解家庭边界如何设计'),
  },
  'legacy-containment': {
    id: 'legacy-containment',
    headline: '防火墙思维：极端情形下的保全',
    reflection:
      '你们在想「万一出事」——企业债务、突发变故、主理人无法履职时，理赔金与控制权会走哪条路？防火墙式保全，是在极端斯坦的门缝出现之前，先给家族资产穿上金钟罩。',
    invite: '压力测试不是咒自己，而是让架构在危机里仍然站得住。',
    softCta: comingSoonCta('了解防火墙式保全理念'),
  },
  'legacy-same-frequency': {
    id: 'legacy-same-frequency',
    headline: '同频传承：家业、资产与价值观',
    reflection:
      '你们更在意下一代愿不愿意接、理念合不合——这比账户数字更决定传承能否落地。观念、价值观、信息三同频，是打破「富不过三代」的软基础设施；不同频的家族，信托条款往往在执行层变形。',
    invite: '同频不是说服，而是愿意花时间在代际之间建立共同语言。',
    softCta: comingSoonCta('了解代际同频如何开始'),
  },
}

const outcomeScores: Record<LegacyOutcomeId, number> = {
  'legacy-estate-transfer': 0,
  'legacy-family-peace': 0,
  'legacy-containment': 0,
  'legacy-same-frequency': 0,
}

function scoreFromQ1(optionId: string | undefined) {
  if (optionId === 'estate') return { 'legacy-estate-transfer': 3 }
  if (optionId === 'family') return { 'legacy-family-peace': 3 }
  if (optionId === 'containment') return { 'legacy-containment': 3 }
  if (optionId === 'alignment') return { 'legacy-same-frequency': 3 }
  return {}
}

function scoreFromQ2(optionId: string | undefined) {
  if (optionId === 'fragmented' || optionId === 'partial') {
    return { 'legacy-family-peace': 2, 'legacy-same-frequency': 1 }
  }
  if (optionId === 'unsure') {
    return { 'legacy-same-frequency': 2 }
  }
  return { 'legacy-family-peace': 1 }
}

function scoreFromQ3(optionId: string | undefined) {
  if (optionId === 'unknown' || optionId === 'personal') {
    return { 'legacy-containment': 2, 'legacy-estate-transfer': 1 }
  }
  if (optionId === 'insurance') {
    return { 'legacy-containment': 2, 'legacy-estate-transfer': 1 }
  }
  return { 'legacy-containment': 1 }
}

function scoreFromQ4(optionId: string | undefined) {
  if (optionId === 'unclear' || optionId === 'passive') {
    return { 'legacy-same-frequency': 3 }
  }
  if (optionId === 'other-path') {
    return { 'legacy-same-frequency': 2, 'legacy-estate-transfer': 1 }
  }
  return { 'legacy-same-frequency': 1, 'legacy-estate-transfer': 1 }
}

export function resolveLegacySurveyFeedback(
  answers: LegacySurveyAnswers
): LegacySurveyFeedbackProfile {
  const scores = { ...outcomeScores }

  const addScores = (partial: Partial<Record<LegacyOutcomeId, number>>) => {
    for (const [key, value] of Object.entries(partial) as [
      LegacyOutcomeId,
      number,
    ][]) {
      scores[key] += value
    }
  }

  addScores(scoreFromQ1(answers['q1-priority']?.[0]))
  addScores(scoreFromQ2(answers['q2-alignment']?.[0]))
  addScores(scoreFromQ3(answers['q3-risk']?.[0]))
  addScores(scoreFromQ4(answers['q4-next-gen']?.[0]))

  const winner = (
    Object.entries(scores) as [LegacyOutcomeId, number][]
  ).sort((a, b) => b[1] - a[1])[0][0]

  return legacySurveyFeedbackProfiles[winner]
}
