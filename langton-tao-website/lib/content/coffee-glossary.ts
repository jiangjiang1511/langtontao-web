export type Coffee2GlossarySection = {
  title?: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
}

export const coffee2GlossaryTerms = {
  bearbit: {
    id: 'bearbit',
    label: '熊比特',
    shortLabel: 'BearBit · Schumpeter Coffee',
    definition:
      '「熊比特」取自经济学家约瑟夫·熊彼特（Joseph Schumpeter），致敬他提出的「创造性破坏」。',
    sections: [
      {
        paragraphs: [
          '创造性破坏认为：真正的增长，来自打破旧结构、主动重建，而非在静止均衡里反复优化。',
          '名字里藏着一种态度——在变化里寻找下一步，而不是守住上一版答案。',
        ],
      },
      {
        title: '为什么是一杯咖啡',
        paragraphs: [
          '熊比特把这一脉络落在对话场景里：一张小桌、一杯热饮，让人愿意慢下来，交换还未成形的判断。',
          '我们不急着给标准答案，更想提供一个可以诚实交谈的空间。',
        ],
      },
    ],
  },
  mediocristan: {
    id: 'mediocristan',
    label: '平均斯坦',
    shortLabel: 'Mediocristan',
    definition: '在平均斯坦里，规则是积累、装载燃料、稳定提升。',
    sections: [
      {
        paragraphs: [
          '它的核心任务，是装载燃料。',
          '现金流、信用、健康、专业能力、家庭纪律、基本储蓄，这些都是燃料。',
          '没有这些燃料，一个人没有资格谈跃迁。',
        ],
      },
      {
        title: '在平均斯坦时',
        paragraphs: [
          '做的是现金流、风险隔离、跨币种配置、家庭规则、下一代教育、专业网络。',
          '这些看起来慢，甚至不刺激。但它们是在装燃料。',
        ],
      },
    ],
  },
  extremistan: {
    id: 'extremistan',
    label: '极端斯坦',
    shortLabel: 'Extremistan',
    definition: '在极端斯坦里，规则是不对称点火、赢家通吃、窗口期跃迁。',
    sections: [
      {
        title: '典型场景',
        bullets: [
          '一个关键行业窗口，可能让一家企业突然变大；',
          '一次资产价格重估，可能改变一个家庭的阶层位置；',
          '一次错误担保，可能毁掉多年积累；',
          '一次接班失败，可能让家族企业迅速衰落；',
          '一次制度或身份安排，可能决定未来二十年的选择空间。',
        ],
      },
      {
        title: '在极端斯坦时',
        paragraphs: [
          '等到市场出现错配、行业出现窗口、身份和制度安排出现必要性、家族传承进入关键阶段时，前面这些燃料就决定了你能不能点火。',
        ],
      },
    ],
  },
} as const

export type Coffee2GlossaryTermId = keyof typeof coffee2GlossaryTerms

export type Coffee2GlossaryTerm = (typeof coffee2GlossaryTerms)[Coffee2GlossaryTermId]

export type Coffee2GlossarySegment =
  | { type: 'text'; value: string }
  | { type: 'term'; id: Coffee2GlossaryTermId }

export type Coffee2SectionCopyBlock =
  | string
  | { type: 'annotated'; segments: readonly Coffee2GlossarySegment[] }

export function getCoffee2GlossaryTerm(id: Coffee2GlossaryTermId) {
  return coffee2GlossaryTerms[id]
}

export function isAnnotatedSectionCopyBlock(
  block: Coffee2SectionCopyBlock
): block is Extract<Coffee2SectionCopyBlock, { type: 'annotated' }> {
  return typeof block === 'object' && block.type === 'annotated'
}
