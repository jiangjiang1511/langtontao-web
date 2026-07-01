import {
  checkupServiceCommitments,
  checkupServiceProcess,
} from '@/lib/content/checkup-page'
import { getLangtontaoMajorSection } from '@/lib/content/langtontao/langtontao-major-sections'
import { wealthHealthCheckupItems } from '@/lib/content/membership-v2'

const majorSection = getLangtontaoMajorSection('wealth-checkup')

export const wealthCheckupDetailMeta = {
  title: majorSection?.title ?? '财富健康体检',
  description:
    majorSection?.lead ??
    '先年检家庭敞口与结构，再谈配置——资产负债表问诊、年度陪跑与真实案例修复。',
  detailHref: '/wealth-checkup',
  backHref: '/langtontao#wealth-checkup',
  backLabel: '返回朗敦道',
  contactIntent: '财富健康体检',
  ctaLabel: '预约体检',
} as const

export const wealthCheckupDetailHero = {
  eyebrow: 'Wealth Health Checkup',
  title: wealthCheckupDetailMeta.title,
  lead: wealthCheckupDetailMeta.description,
} as const

export const wealthCheckupWhyItems = [
  {
    id: 'exposure',
    title: '敞口定位',
    description: '按资产结构、行业特性与财富阶段，识别家庭真实风险敞口。',
  },
  {
    id: 'inventory',
    title: '保障梳理',
    description: '盘点已有保单与风控工具，看清重叠、缺口与理赔盲区。',
  },
  {
    id: 'annual',
    title: '年度年检',
    description: '随家庭结构变化动态优化，避免「一次配置、终身脱节」。',
  },
] as const

export const wealthCheckupDetailItems = {
  title: '六项体检内容',
  subtitle: 'Plus 及以上会员包含',
  items: wealthHealthCheckupItems,
} as const

export const wealthCheckupDetailProcess = {
  title: '服务流程',
  steps: [
    checkupServiceProcess.steps[0],
    {
      step: 2,
      label: '资料收集',
      description:
        '发送 KYC 表并收集保单、资产证明等资料（拍照 / 电子版即可）。',
    },
    {
      step: 3,
      label: '出具报告',
      description:
        '专属团队深度分析，出具风控报告并与您 1 对 1 确认方案。',
    },
    {
      step: 4,
      label: '年度陪跑',
      description:
        '进入专属服务期，日常咨询与每年 1 次免费风控系统年检。',
    },
  ],
} as const

export const wealthCheckupDetailCommitments = {
  title: checkupServiceCommitments.title,
  items: checkupServiceCommitments.items.slice(0, 3),
} as const

export const wealthCheckupAudience = {
  title: '适合谁',
  items: [
    {
      id: 'hnw',
      title: '高净值家庭',
      description: '保单与资产配置复杂，需要一张「家庭风控总图」。',
    },
    {
      id: 'cross-border',
      title: '跨境双居家庭',
      description: '内地与境外保障并行，需打通司法管辖与理赔边界。',
    },
    {
      id: 'succession',
      title: '接班预备家族',
      description: '人身险、信托与股权架构需对齐，避免传承前夜意外纠纷。',
    },
  ],
} as const
