import type { RetirementSoulSurveyAnswers } from '@/lib/content/coffee-retirement-page'
import { retirementSoulSurveyQuestions } from '@/lib/content/coffee-retirement-page'

export type RetirementSoulSurveyFeedbackProfile = {
  id: string
  reflection: string
  invite: string
}

export const retirementSoulSurveyFeedbackProfiles: Record<
  string,
  RetirementSoulSurveyFeedbackProfile
> = {
  avoidance: {
    id: 'avoidance',
    reflection:
      '你在多处选择了「还没想」或「以后再说」。养老最怕的不是算错，而是从未把长寿与购买力放进同一张家庭资产负债表。若今晚只能问家人一个问题，你会选：我们最怕哪一种「钱还在、日子难」？',
    invite: '把这个问题留在饭桌，或带到下一次 Coffee Chat。',
  },
  awakening: {
    id: 'awakening',
    reflection:
      '你已经感到疼，但行动还没跟上焦虑——这很正常，也是改变的入口。朗敦道所说的认知定投，首先是诚实面对阶段：该守本金、配压舱石，还是布局传承？你们家现在更像哪一段？',
    invite: '不必一次答完，但值得开始年检这张地图。',
  },
  structural: {
    id: 'structural',
    reflection:
      '你在多处点选了有结构、有对话的选项——这很难得。下一步也许是追问：结构能否扛住三拐点叠加？现金流是账户里的数字，还是跨十年的领取纪律？',
    invite: '把架构画给一个人看，往往比独自安心更可靠。',
  },
  mixed: {
    id: 'mixed',
    reflection:
      '你的答案里既有清醒，也有回避——许多家庭正是这样。比完美规划更重要的，是找到第一个愿意同频的人，把养老从「个人退休题」变成「家族敞口题」。',
    invite: '选一个人、选一个场景、问一个灵魂问题——比标准答案更重要。',
  },
  default: {
    id: 'default',
    reflection:
      '长寿风险与购买力，是同一枚硬币的两面。若把未来二十年的养老现金流画成一条河——哪里是暗礁，哪里还没标出来？',
    invite: '约一杯 Coffee Chat，把这条河描给一个人看。',
  },
}

export function getTriggeredStings(
  answers: RetirementSoulSurveyAnswers
): { prompt: string; sting: string; angle: 'common' | 'langton' }[] {
  const triggered: { prompt: string; sting: string; angle: 'common' | 'langton' }[] =
    []

  for (const question of retirementSoulSurveyQuestions) {
    const selected = answers[question.id]?.[0]
    if (!selected) continue
    if (question.anxiousOptionIds.includes(selected)) {
      triggered.push({
        prompt: question.prompt,
        sting: question.sting,
        angle: question.angle,
      })
    }
  }

  return triggered
}

export function resolveRetirementSoulSurveyFeedback(
  answers: RetirementSoulSurveyAnswers
): RetirementSoulSurveyFeedbackProfile {
  let anxiousCount = 0
  let plannedCount = 0

  for (const question of retirementSoulSurveyQuestions) {
    const selected = answers[question.id]?.[0]
    if (!selected) continue
    if (question.anxiousOptionIds.includes(selected)) anxiousCount += 1
    else plannedCount += 1
  }

  if (anxiousCount >= 5) {
    return retirementSoulSurveyFeedbackProfiles.avoidance
  }

  if (anxiousCount >= 3 && plannedCount <= 1) {
    return retirementSoulSurveyFeedbackProfiles.awakening
  }

  if (plannedCount >= 4) {
    return retirementSoulSurveyFeedbackProfiles.structural
  }

  if (anxiousCount >= 2 && plannedCount >= 2) {
    return retirementSoulSurveyFeedbackProfiles.mixed
  }

  return retirementSoulSurveyFeedbackProfiles.default
}
