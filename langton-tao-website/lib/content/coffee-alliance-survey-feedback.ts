import type {
  AllianceSurveyAnswers,
  AllianceSurveyId,
} from '@/lib/content/coffee-alliance-page'

export type AllianceSurveyFeedbackProfile = {
  id: string
  reflection: string
  invite: string
}

const partnerProfiles = {
  silent: {
    id: 'silent',
    reflection:
      '财务沉默不一定是冷漠，有时是保护——但若极端斯坦来临，沉默会不会变成一个人的债？今晚能否问一句：我们家若收入减半，能撑几个月？',
    invite: '把这个问题留给下一次散步，或带到熊比特 Coffee Chat。',
  },
  structural: {
    id: 'structural',
    reflection:
      '你在问结构，而不只是浪漫。婚前婚后安排、安全垫与拍板权——哪一块还没被命名，就可能是未来第一次撞车的地方？',
    invite: '命名之争往往比数字之争更早，值得在关系里先对齐语言。',
  },
  aligned: {
    id: 'aligned',
    reflection:
      '你们愿意谈，这本身已是同盟。同频不是永不分歧，而是分歧时有可重复的对话方式——你们家的「谈法」是什么？',
    invite: '约一杯咖啡，把谈法说给伴侣听，看是否真的一致。',
  },
  default: {
    id: 'default',
    reflection:
      '伴侣关系里的财富，从来不只是账户余额。若把未来三年家庭现金流画成一条河——暗礁在哪里，谁最先看见？',
    invite: '选一个人、选一个场景、问一个问题——比标准答案更重要。',
  },
} as const satisfies Record<string, AllianceSurveyFeedbackProfile>

const cofounderProfiles = {
  opaque: {
    id: 'opaque',
    reflection:
      '信息不同频时，任何合伙协议都会在执行层变形。若明天现金流断两个月，双方掌握的是同一套数字吗？',
    invite: '把对齐口径当作同盟的年检，而非危机时才做的补丁。',
  },
  exitGap: {
    id: 'exitGap',
    reflection:
      '退出没谈清，往往是因为「还早」——但还早的时候，才是代价最低谈条款的窗口。若一方明天想走，会发生什么？',
    invite: '在熊比特聊聊：你们的失速条款，活在口头还是纸上？',
  },
  clear: {
    id: 'clear',
    reflection:
      '三钱包分明、信息共享——这是事业同盟的硬通货。下一道考题是：分红与再投入的节奏，能否扛过一轮下行周期？',
    invite: '把节奏问题留给下一次合伙复盘。',
  },
  default: {
    id: 'default',
    reflection:
      '合伙的本质是共享利益与共担风险。你们家个人资产负债表里，有多少敞口其实拴在这家公司上？',
    invite: '画一张家企连接图，往往比争论更有效。',
  },
} as const satisfies Record<string, AllianceSurveyFeedbackProfile>

const companyProfiles = {
  blur: {
    id: 'blur',
    reflection:
      '家企边界模糊时，公司的好坏会直接改写家庭情绪。若公司需要输血，家庭的安全垫是否已被提前透支？',
    invite: '防火墙不是不信任，是给家庭留选择权。',
  },
  guarantee: {
    id: 'guarantee',
    reflection:
      '担保是把关系网络里的信任，翻译成法律责任。家人替公司签字的那一刻，谁算过最坏情形？',
    invite: '把担保条款摊开——哪怕只是家庭内部对齐。',
  },
  owner: {
    id: 'owner',
    reflection:
      '输血若由一人拍板，另一方是信任还是被动？同盟里，重大决策需要可重复的家庭合议机制。',
    invite: '问一句：若这次输血失败，谁承担心理账户？',
  },
  default: {
    id: 'default',
    reflection:
      '公司是家庭资产负债表上的暗线。接班、高管、担保——哪一项还没进家庭风险讨论？',
    invite: '公司议题值得在饭桌上占一席之地，而非只在危机时出现。',
  },
} as const satisfies Record<string, AllianceSurveyFeedbackProfile>

const friendProfiles = {
  strained: {
    id: 'strained',
    reflection:
      '友谊与金钱冲突后变疏，往往不是因为数额，而是规则缺席。若重来一次，你会在哪一步先谈底线？',
    invite: '规则不是伤感情，是给关系留退路。',
  },
  feel: {
    id: 'feel',
    reflection:
      '先看感情、后谈规则——很人性，也很危险。朋友的「内幕消息」与跟投冲动，有没有一次差点改写你的资产负债表？',
    invite: '同频不等于跟投；独立验证是友谊里的成熟。',
  },
  guarded: {
    id: 'guarded',
    reflection:
      '你守住了边界，这很珍贵。也有人因拒绝担保而被误解——你如何向朋友解释「不是不信你，是保护我们双方」？',
    invite: '把解释练成一句话，下次会更从容。',
  },
  default: {
    id: 'default',
    reflection:
      '挚友同盟里，钱从来不是小事。若友谊里只能问一个财务问题，你会问什么？',
    invite: '带到 Coffee Chat，听听别人的版本，再回来看自己的答案。',
  },
} as const satisfies Record<string, AllianceSurveyFeedbackProfile>

function resolvePartnerFeedback(
  answers: AllianceSurveyAnswers
): AllianceSurveyFeedbackProfile {
  if (answers['partner-dialogue']?.includes('silent')) {
    return partnerProfiles.silent
  }
  if (
    answers['partner-structure']?.includes('avoid') ||
    answers['partner-cushion']?.includes('separate')
  ) {
    return partnerProfiles.structural
  }
  if (
    answers['partner-dialogue']?.includes('regular') &&
    answers['partner-decision']?.includes('aligned')
  ) {
    return partnerProfiles.aligned
  }
  return partnerProfiles.default
}

function resolveCofounderFeedback(
  answers: AllianceSurveyAnswers
): AllianceSurveyFeedbackProfile {
  if (answers['cofounder-info']?.includes('opaque')) {
    return cofounderProfiles.opaque
  }
  if (answers['cofounder-exit']?.includes('no')) {
    return cofounderProfiles.exitGap
  }
  if (
    answers['cofounder-wallets']?.includes('clear') &&
    answers['cofounder-info']?.includes('shared')
  ) {
    return cofounderProfiles.clear
  }
  return cofounderProfiles.default
}

function resolveCompanyFeedback(
  answers: AllianceSurveyAnswers
): AllianceSurveyFeedbackProfile {
  if (
    answers['company-books']?.includes('blur') ||
    answers['company-books']?.includes('one')
  ) {
    return companyProfiles.blur
  }
  if (answers['company-guarantee']?.includes('yes')) {
    return companyProfiles.guarantee
  }
  if (answers['company-infusion']?.includes('owner')) {
    return companyProfiles.owner
  }
  return companyProfiles.default
}

function resolveFriendFeedback(
  answers: AllianceSurveyAnswers
): AllianceSurveyFeedbackProfile {
  if (answers['friend-conflict']?.includes('strained')) {
    return friendProfiles.strained
  }
  if (
    answers['friend-rules']?.includes('feel') ||
    answers['friend-tips']?.includes('fomo')
  ) {
    return friendProfiles.feel
  }
  if (
    answers['friend-guarantee']?.includes('refused') ||
    answers['friend-guarantee']?.includes('no')
  ) {
    return friendProfiles.guarded
  }
  return friendProfiles.default
}

export function resolveAllianceSurveyFeedback(
  surveyId: AllianceSurveyId,
  answers: AllianceSurveyAnswers
): AllianceSurveyFeedbackProfile {
  switch (surveyId) {
    case 'partner':
      return resolvePartnerFeedback(answers)
    case 'cofounder':
      return resolveCofounderFeedback(answers)
    case 'company':
      return resolveCompanyFeedback(answers)
    case 'friend':
      return resolveFriendFeedback(answers)
    default:
      return partnerProfiles.default
  }
}
