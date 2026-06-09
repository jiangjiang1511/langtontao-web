export type EnglishPreviewType = 'timeline' | 'skills' | 'pathways'

export type EnglishOffering = {
  id: string
  number: number
  title: string
  summary: string
  previewType: EnglishPreviewType
  previewItems: string[]
  previewMeta?: { label: string; value: string }[]
}

export const readingSectionMeta = {
  eyebrow: 'READING · 围读会',
  title: '读书',
  tagline: '打开认知的入口',
  lead: '悬停翻开金句，按阶段浏览围读书单。',
} as const

export const englishSectionMeta = {
  eyebrow: '北美芝仕 · ENGLISH',
  title: '英语',
  tagline: '是一种思维方式，是一种打开世界的入口',
  showcaseHeading: '通过英语模块，你还能开启哪些路径？',
  note: '所有留学相关内容归属本区块',
} as const

export const englishOfferings: EnglishOffering[] = [
  {
    id: 'planning',
    number: 1,
    title: '留学规划',
    summary:
      '从选校路径到背景提升，为家庭制定可执行的留学战略与时间线。',
    previewType: 'timeline',
    previewItems: [
      '选校与路径评估',
      '背景提升方案',
      '文书与材料准备',
      '申请递交与跟进',
      '签证与行前衔接',
    ],
  },
  {
    id: 'language-learning',
    number: 2,
    title: '语言学习',
    summary:
      '以目标分数与真实场景为导向，构建听说读写系统化训练路径。',
    previewType: 'skills',
    previewItems: ['学术英语', '标化备考', '口语表达', '写作强化'],
    previewMeta: [
      { label: '目标方向', value: 'IELTS / TOEFL' },
      { label: '训练模式', value: '小班 + 1v1 陪练' },
    ],
  },
  {
    id: 'overseas-admissions',
    number: 3,
    title: '海外升学',
    summary:
      '覆盖本科、研究生与身份衔接，连接朗敦道全球教育资源网络。',
    previewType: 'pathways',
    previewItems: ['本科申请', '研究生申请', '转学路径', '身份与升学衔接'],
    previewMeta: [
      { label: '覆盖地区', value: '北美 · 英联邦' },
      { label: '合作网络', value: '普晖国际 · 北美芝仕' },
    ],
  },
]
