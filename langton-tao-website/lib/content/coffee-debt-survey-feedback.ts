import type { DebtSurveyAnswers } from '@/lib/content/coffee-debt-page'

export type DebtSurveyFeedbackProfile = {
  id: string
  reflection: string
  invite: string
  posterQuestion: string
}

export const debtSurveyFeedbackProfiles: Record<string, DebtSurveyFeedbackProfile> =
  {
    mainstream: {
      id: 'mainstream',
      reflection:
        '你和演示数据里的「主流」很接近——但在平均斯坦远多于极端斯坦的日常里，主流就一定更接近你家真实的资产负债表吗？今晚多问一句：我们还欠着什么没名字的东西，会是谁先开口？',
      invite: '约一杯 Coffee Chat，把这个问题问给一个人听。',
      posterQuestion: '主流就一定更接近你家真实的资产负债表吗？',
    },
    structural: {
      id: 'structural',
      reflection:
        '你在问结构，而不只是数字。结构清晰了，化债就会变容易吗——还是只是把焦虑换了一个名字？若安全垫要有定量，你们家会先量哪一块？',
      invite: '把这个追问留给下一次复盘，或带到熊比特继续拆。',
      posterQuestion: '结构清晰了，化债就会变容易吗？',
    },
    silent: {
      id: 'silent',
      reflection:
        '愿意点进来，本身就是在打破沉默。如果债务只能一个人扛，它会不会悄悄变成关系的债？第一次谈债，你希望发生在饭桌、散步，还是一次不被打断的 Coffee Chat？',
      invite: '选一个人、选一个场景、问一个问题——比标准答案更重要。',
      posterQuestion: '如果债务只能一个人扛，它会不会变成关系的债？',
    },
    light: {
      id: 'light',
      reflection:
        '账本听起来不重。但没有债，是否就等于没有财务上的「共同话题」？在极端斯坦的门缝出现之前，家庭要不要先练习怎么谈钱？',
      invite: '即使敞口很轻，也值得为未来的对话留一杯咖啡的时间。',
      posterQuestion: '没有债，是否就等于没有财务上的共同话题？',
    },
    contrarian: {
      id: 'contrarian',
      reflection:
        '你把某些支出从「负债」里划了出去。这种划分，是家里的共识，还是你一个人心里的账本？若伴侣或父母用的是另一套名字，你们会在哪里第一次撞车？',
      invite: '命名之争往往比数字之争更早——值得在 Coffee Chat 里先对齐语言。',
      posterQuestion: '这种划分，是共识，还是一个人心里的账本？',
    },
    default: {
      id: 'default',
      reflection:
        '没有标准家庭，只有不同的敞口叙事。如果把你家未来三年的现金流画成一条河——哪里是暗礁，哪里还没标出来？',
      invite: '把这条河描给一个人看，往往比独自导航更容易。',
      posterQuestion: '未来三年的现金流，哪里是暗礁，哪里还没标出来？',
    },
  }

export function resolveDebtSurveyFeedback(
  answers: DebtSurveyAnswers
): DebtSurveyFeedbackProfile {
  const q1 = answers['q1-exposure'] ?? []
  const q2 = answers['q2-dialogue'] ?? []
  const q3 = answers['q3-mortgage-frame'] ?? []
  const q4 = answers['q4-education-debt'] ?? []

  if (q2.includes('silent')) {
    return debtSurveyFeedbackProfiles.silent
  }

  if (
    q1.includes('rarely') &&
    !q1.some((id) => ['mortgage', 'business', 'consumer', 'guarantee'].includes(id))
  ) {
    return debtSurveyFeedbackProfiles.light
  }

  if (q3.includes('reframe') && q4.includes('yes')) {
    return debtSurveyFeedbackProfiles.structural
  }

  if (q3.includes('reframe') || q4.includes('no')) {
    return debtSurveyFeedbackProfiles.contrarian
  }

  if (
    (q1.includes('mortgage') || q1.includes('consumer')) &&
    q2.includes('open') &&
    q3.includes('debt')
  ) {
    return debtSurveyFeedbackProfiles.mainstream
  }

  return debtSurveyFeedbackProfiles.default
}
