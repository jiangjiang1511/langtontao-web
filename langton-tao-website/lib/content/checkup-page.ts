export const checkupPageMeta = {
  title: '财富大健康体检',
  lead:
    '从家庭财富体检出发，系统定位风险敞口、梳理保障缺口，搭建并年检专属风控体系，全年陪跑与家庭赋能。以下为 Plus 及以上会员包含的六项体检内容。',
} as const

export const checkupServiceProcess = {
  title: '服务流程：8 步落地 全程省心',
  steps: [
    {
      step: 1,
      label: '启动',
      description:
        '完成支付，正式聘请家庭风险管家，建立专属服务档案。',
    },
    {
      step: 2,
      label: '1~3 days',
      description: '发送高净值家庭专属 KYC 信息收集表。',
    },
    {
      step: 3,
      label: '1~5 days',
      description:
        '收集家庭风控相关资料（保单 / 资产证明等，拍照 / 电子版即可）。',
    },
    {
      step: 4,
      label: '7~15 days',
      description:
        '专属团队深度分析，出具 3 份高净值专属风控报告。',
    },
    {
      step: 5,
      label: '专属沟通',
      description:
        '1 对 1 深度沟通，确认风险画像与风控系统搭建方案。',
    },
    {
      step: 6,
      label: '1~3 days',
      description:
        '保单 / 风控工具录入专属管理系统，实现全家信息同步。',
    },
    {
      step: 7,
      label: '365 days',
      description:
        '进入 1 年专属服务期，日常咨询 / 风控维护随时对接。',
    },
    {
      step: 8,
      label: '年检',
      description:
        '每年 1 次免费风控系统年检，动态优化风控体系。',
    },
  ],
} as const

export type CheckupCommitmentIcon =
  | 'clipboard-check'
  | 'briefcase'
  | 'shield-check'
  | 'headphones'

export const checkupServiceCommitments = {
  title: '服务承诺',
  items: [
    {
      id: 'independent',
      title: '独立客观',
      icon: 'clipboard-check' as const,
      description:
        '全程不接触任何保险产品销售，不赚任何佣金 / 返点，所有分析与建议均基于家庭风控需求，中立无偏向，为风控系统搭建负责；',
    },
    {
      id: 'professional',
      title: '专业兜底',
      icon: 'briefcase' as const,
      description:
        '所有报告 / 方案均由家办财富规划师 + 财险风控专家 + 法律合规顾问联合出具，专业判断有依据，不做无意义的建议；',
    },
    {
      id: 'privacy',
      title: '极致隐私',
      icon: 'shield-check' as const,
      description:
        '所有家庭信息、资产数据、保单资料均严格保密，签订《高净值家庭客户信息保密协议》，专人专档管理，绝不外泄，与专题隐私保护原则高度一致；',
    },
    {
      id: 'dedicated',
      title: '专属对接',
      icon: 'headphones' as const,
      description:
        '1 名客户配备 1 名专属家庭风险管家 + 1 个专业服务团队，全程 1 对 1 服务，确保沟通高效、服务精准；',
    },
  ],
} as const

export const checkupSignup = {
  eyebrow: 'SIGN UP',
  title: '财富体检报名',
  lead: '完成报名后，专属家庭风险管家将尽快联系您，启动 8 步落地服务流程。',
  contactIntent: '财富大健康体检',
  ctaLabel: '立即报名',
} as const
