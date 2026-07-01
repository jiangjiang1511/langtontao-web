export type LangtontaoTopicExpandKind = 'body' | 'timeline' | 'structure' | 'nested'

export type LangtontaoTopicNestedItem = {
  title: string
  body: string
}

export type LangtontaoTopicItem = {
  id: string
  title: string
  summary: string
  body?: string
  formula?: string
  coverSrc?: string
  sharePosterSrc?: string
  expandKind?: LangtontaoTopicExpandKind
  nestedItems?: LangtontaoTopicNestedItem[]
}

export type LangtontaoTopicZone = {
  id: string
  title: string
  topics: LangtontaoTopicItem[]
}
