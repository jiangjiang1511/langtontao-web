import { faqItems } from './home-sections'

export const architectureFaqs = [
  {
    question: '何为家办',
    answer:
      '家族办公室（Family Office）是为高净值家庭提供财富保全、增长、传承与合规的一站式顶层架构。朗敦道以联合 MFO 模式，连接 AI、专家与具身活动。',
  },
  {
    question: '何以为家',
    answer:
      '「家」不仅是资产集合，更是价值观、关系与代际使命的载体。朗敦道陪伴家庭提前思考十年后的路，构建可执行的传承系统。',
  },
  {
    question: '为什么富不过三代',
    answer:
      '财富流失往往源于缺乏系统：单点产品、代际沟通断裂、法税与跨境风险未前置管理。教育 + 财富双螺旋，是穿越周期的关键。',
  },
  {
    question: '为什么需要「一杯咖啡」（十日谈咖啡联名储值卡）',
    answer:
      '咖啡是低压力、高密度的对话场景。熊比特咖啡承载投资、保全、传承等主题交流，让复杂议题在可信赖的氛围中展开。',
  },
] as const

export const allFaqs = [...architectureFaqs, ...faqItems]
