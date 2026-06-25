import {
  educationSurveyQuestions,
  getEducationSurveyOption,
  getEducationSurveyQuestions,
  procreationSurveyQuestions,
  type EducationOutcomeId,
  type EducationSurveyAnswers,
  type EducationSurveyTrack,
} from '@/lib/content/coffee-education-survey'

export type EducationSurveySoftCta =
  | { label: string; href: string }
  | { label: string; comingSoon: true }

export type EducationSurveyFeedbackProfile = {
  id: string
  headline: string
  reflection: string
  invite: string
  softCta?: EducationSurveySoftCta
}

const comingSoonCta = (label: string): EducationSurveySoftCta => ({
  label,
  comingSoon: true,
})

const educationOutcomes: EducationOutcomeId[] = [
  'philo-open-world',
  'philo-global-embodied',
  'philo-sail-confidence',
  'philo-study-path',
]

const procreationOutcomes: EducationOutcomeId[] = [
  'proc-child-security',
  'proc-fertility-support',
  'proc-pet-family',
]

export const educationSurveyFeedbackProfiles: Record<
  string,
  EducationSurveyFeedbackProfile
> = {
  'proc-child-security': {
    id: 'proc-child-security',
    headline: '听起来，你们更在意的是——给孩子留一份看得见的未来',
    reflection:
      '教育金、人生保障，是把不确定性从「会不会发生」变成「发生时家里站得住」。这背后往往是对责任感的具体化：不是今天多花一点，而是为未来留一条可执行的退路。',
    invite: '把保障写成家庭语言，比挂在嘴上的「为孩子好」更诚实。',
    softCta: comingSoonCta('聊聊怎么搭建长期保障'),
  },
  'proc-fertility-support': {
    id: 'proc-fertility-support',
    headline: '听起来，你们更在意的是——生育路上有人帮、有选项',
    reflection:
      '冻卵冻精、备孕养护、辅助生育，本质都是在延长「还可以再想想」的窗口。值得持续追问的是：技术能保留选项，伴侣之间的期待与成本分担是否也已对齐？',
    invite: '保留窗口之前，先对齐「我们要不要」比急着赶路更重要。',
    softCta: comingSoonCta('聊聊生育路上的支持'),
  },
  'proc-pet-family': {
    id: 'proc-pet-family',
    headline: '听起来，你们更在意的是——陪伴也要被认真安排',
    reflection:
      '在丁克或二人结构里，宠物常承担情感节律与照顾练习的角色。你们愿意为它谈大病保障与生命终点——这本身就是一种家庭伦理：成员不限于血缘，责任也不止于日常投喂。',
    invite: '无论是否养育人类幼崽，陪伴关系的边界都值得被认真看见。',
    softCta: comingSoonCta('聊聊宠物家庭的保障'),
  },
  'philo-open-world': {
    id: 'philo-open-world',
    headline: '听起来，你们更在意的是——帮他推开世界的门',
    reflection:
      '你们相信，掌握语言的背后是推开更大的世界。全球节奏加速、挑战不断迭代——只有主动介入世界、打开视野的孩子，才更可能先人一步。英语在此不是科目，而是连接工具。',
    invite: '视野不是天赋，是家庭愿意持续投入的认知底子。',
    softCta: {
      label: '看看我们怎么聊这件事',
      href: '/education',
    },
  },
  'philo-global-embodied': {
    id: 'philo-global-embodied',
    headline: '听起来，你们更在意的是——先和社会轻轻交手',
    reflection:
      '你们看重真实场域里的学习——在不同国家、不同文化背景中，用项目式的方式看世界、认识自己。一年全球游走，本质上是让孩子与社会轻轻交手，而非隔窗观火。',
    invite: '世界不是地图上的点，是身体记住的路线。',
    softCta: {
      label: '看看全球游走式学习',
      href: '/community#borui',
    },
  },
  'philo-sail-confidence': {
    id: 'philo-sail-confidence',
    headline: '听起来，你们更在意的是——在风浪里练出敢扛事的底气',
    reflection:
      '你们相信真实挑战能锻造心性：帆船极度依赖团队协作，城市里的孩子在风浪中分工、信任、共同决策。勇敢不是莽撞，是面对不确定仍能航行的信心。',
    invite: '履历可以增色，但更珍贵的是风暴过后的自我叙事。',
    softCta: {
      label: '看看风浪中的成长路径',
      href: '/community#nezha',
    },
  },
  'philo-study-path': {
    id: 'philo-study-path',
    headline: '听起来，你们更在意的是——把路径拆清楚、管得住',
    reflection:
      '你们希望把留学拆解为可执行的节点：方向、时间线、家庭节奏与风险边界。路径清晰，焦虑才会从「未知」变成「可管理的项目」。',
    invite: '留学不是终点，是家庭战略里的一段结构化旅程。',
    softCta: {
      label: '看看我们怎么聊路径',
      href: '/education',
    },
  },
}

export function getEducationSurveyFeedback(
  outcomeId: string
): EducationSurveyFeedbackProfile | null {
  return educationSurveyFeedbackProfiles[outcomeId] ?? null
}

function getOutcomePriority(
  track: EducationSurveyTrack,
  outcomeId: EducationOutcomeId
): number {
  const list =
    track === 'procreation' ? procreationOutcomes : educationOutcomes
  return list.indexOf(outcomeId)
}

export function resolveEducationSurveyOutcome(
  track: EducationSurveyTrack,
  answers: EducationSurveyAnswers
): EducationSurveyFeedbackProfile {
  const questions = getEducationSurveyQuestions(track)
  const validOutcomes =
    track === 'procreation' ? procreationOutcomes : educationOutcomes

  const scores = new Map<EducationOutcomeId, number>(
    validOutcomes.map((id) => [id, 0])
  )

  const tieBreakOrder: EducationOutcomeId[] = []

  for (const question of questions) {
    const optionId = answers[question.id]
    if (!optionId) continue

    const option = getEducationSurveyOption(track, question.id, optionId)
    if (!option) continue

    for (const [outcomeId, weight] of Object.entries(option.weights)) {
      const id = outcomeId as EducationOutcomeId
      if (!scores.has(id)) continue
      scores.set(id, (scores.get(id) ?? 0) + (weight ?? 0))
      tieBreakOrder.push(id)
    }
  }

  let bestOutcome = validOutcomes[0]
  let bestScore = scores.get(bestOutcome) ?? 0

  for (const outcomeId of validOutcomes) {
    const score = scores.get(outcomeId) ?? 0
    if (score > bestScore) {
      bestScore = score
      bestOutcome = outcomeId
    } else if (score === bestScore && score > 0) {
      const currentPriority = getOutcomePriority(track, bestOutcome)
      const candidatePriority = getOutcomePriority(track, outcomeId)
      const currentLastIndex = tieBreakOrder.lastIndexOf(bestOutcome)
      const candidateLastIndex = tieBreakOrder.lastIndexOf(outcomeId)
      if (candidateLastIndex > currentLastIndex) {
        bestOutcome = outcomeId
      } else if (
        candidateLastIndex === currentLastIndex &&
        candidatePriority < currentPriority
      ) {
        bestOutcome = outcomeId
      }
    }
  }

  return (
    educationSurveyFeedbackProfiles[bestOutcome] ??
    educationSurveyFeedbackProfiles[validOutcomes[0]]
  )
}

// Re-export question counts for UI progress
export const procreationSurveyQuestionCount = procreationSurveyQuestions.length
export const educationSurveyQuestionCount = educationSurveyQuestions.length
