import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'
import { langtontaoChallengeLinkById } from '@/lib/content/langtontao/langtontao-challenge-links'
import { langtontaoWishlistQuestions } from '@/lib/content/langtontao/langtontao-wishlist-survey'

export type WishlistTimelineWaypoint = {
  id: string
  label: string
  y: number
  position: number
  topicIds: LangtontaoChallengeId[]
  mindmapRef?: string
  teaser: string
}

export type WishlistTimelineSegment = {
  questionId: string
  waypoints: WishlistTimelineWaypoint[]
  durationMs: number
}

export const langtontaoWishlistTimelineSegments: WishlistTimelineSegment[] = [
  {
    questionId: 'w1',
    durationMs: 5200,
    waypoints: [
      {
        id: 'w1-purchasing',
        label: '购买力通道',
        y: 0.34,
        position: 0.38,
        topicIds: ['purchasing-power'],
        mindmapRef: 'chaos-channels',
        teaser: '医疗、养老、教育与国际通行成本系统性抬升——现金流与责任需放进同一张表。',
      },
      {
        id: 'w1-shrinkage',
        label: '资产缩水',
        y: 0.62,
        position: 0.72,
        topicIds: ['asset-shrinkage'],
        mindmapRef: 'asset-landslide',
        teaser: '地产与股权重估不是抽象新闻，结构先于收益率。',
      },
    ],
  },
  {
    questionId: 'w2',
    durationMs: 4800,
    waypoints: [
      {
        id: 'w2-checkup',
        label: '财富体检',
        y: 0.4,
        position: 0.42,
        topicIds: ['debt-channel'],
        mindmapRef: 'chaos-channels',
        teaser: '资产缩、债务不缩——体检把隐性担保与现金流缺口摆到桌面上。',
      },
      {
        id: 'w2-471t',
        label: '471T 结构',
        y: 0.68,
        position: 0.76,
        topicIds: ['global-allocation'],
        mindmapRef: 'wealth-471t',
        teaser: '在中国 471 万亿宏观结构中定位自家坐标，再谈工具与交付节点。',
      },
    ],
  },
  {
    questionId: 'r1',
    durationMs: 4600,
    waypoints: [
      {
        id: 'r1-inheritance',
        label: '传承本质',
        y: 0.32,
        position: 0.4,
        topicIds: ['succession'],
        mindmapRef: 'inheritance-essence',
        teaser: '传承不是留下最多的钱，而是让下一代拥有面对不确定性的能力。',
      },
      {
        id: 'r1-alignment',
        label: '同频风险',
        y: 0.58,
        position: 0.74,
        topicIds: ['cognition-gap'],
        teaser: '成员理念不同频时，再好的架构也难执行——认知是关系的底层协议。',
      },
    ],
  },
  {
    questionId: 'r2',
    durationMs: 4600,
    waypoints: [
      {
        id: 'r2-governance',
        label: '家族治理',
        y: 0.44,
        position: 0.45,
        topicIds: ['succession'],
        teaser: '传承不是留多少钱，而是架构、治理与下一代能力的同频传递。',
      },
      {
        id: 'r2-legal',
        label: '法律关系',
        y: 0.7,
        position: 0.78,
        topicIds: ['debt-channel'],
        teaser: '厘清资产归属与担保责任，是家庭一起面对不确定的前提。',
      },
    ],
  },
  {
    questionId: 'e1',
    durationMs: 5000,
    waypoints: [
      {
        id: 'e1-ice-age',
        label: '就业冰河',
        y: 0.36,
        position: 0.4,
        topicIds: ['employment-ice-age'],
        mindmapRef: 'employment-ice-age',
        teaser: '人力资本回报曲线变平，语言与国际路径成为隐形资产。',
      },
      {
        id: 'e1-cognition',
        label: '教育认知',
        y: 0.64,
        position: 0.75,
        topicIds: ['education-cognition'],
        teaser: '教育金与升学路径，是十年愿望清单里最常被低估的长期负债。',
      },
    ],
  },
  {
    questionId: 'e2',
    durationMs: 4600,
    waypoints: [
      {
        id: 'e2-roadmap',
        label: '升学路线图',
        y: 0.38,
        position: 0.43,
        topicIds: ['education-cognition'],
        teaser: '尚未系统规划时，需要一张可执行的升学与身份路径图。',
      },
      {
        id: 'e2-erosion',
        label: '购买力侵蚀',
        y: 0.66,
        position: 0.77,
        topicIds: ['purchasing-power'],
        teaser: '有储备但担心侵蚀——教育金需要与通胀和币种风险一并审视。',
      },
    ],
  },
  {
    questionId: 'l1',
    durationMs: 5000,
    waypoints: [
      {
        id: 'l1-architecture',
        label: '传承架构',
        y: 0.35,
        position: 0.41,
        topicIds: ['succession'],
        teaser: '可执行的信托与治理架构，是好祖先留给下一代的操作系统。',
      },
      {
        id: 'l1-order',
        label: '国际秩序',
        y: 0.63,
        position: 0.76,
        topicIds: ['order-shakeup'],
        mindmapRef: 'order-shakeup',
        teaser: '跨境规则、身份与交付节点的重要性上升——香港是关键节点。',
      },
    ],
  },
  {
    questionId: 'l2',
    durationMs: 4800,
    waypoints: [
      {
        id: 'l2-ancestor',
        label: '好祖先',
        y: 0.48,
        position: 0.5,
        topicIds: ['succession'],
        mindmapRef: 'inheritance-essence',
        teaser: '留下面对不确定性的能力，比留下账户数字更接近传承本质。',
      },
      {
        id: 'l2-isolation',
        label: '风险隔离',
        y: 0.72,
        position: 0.8,
        topicIds: ['debt-channel', 'succession'],
        teaser: '资产、风险隔离与规则一并交接，是传承架构的压舱石。',
      },
    ],
  },
]

export function getWishlistTimelineSegment(index: number) {
  return langtontaoWishlistTimelineSegments[index] ?? null
}

export function getWishlistQuestionForSegment(index: number) {
  const segment = getWishlistTimelineSegment(index)
  if (!segment) return null
  return langtontaoWishlistQuestions.find((q) => q.id === segment.questionId) ?? null
}

export function getTopicPhilosophy(topicId: LangtontaoChallengeId) {
  return langtontaoChallengeLinkById[topicId]?.philosophy ?? ''
}

export function collectSegmentTopicIds(segment: WishlistTimelineSegment) {
  const ids = new Set<LangtontaoChallengeId>()
  segment.waypoints.forEach((waypoint) => {
    waypoint.topicIds.forEach((id) => ids.add(id))
  })
  return [...ids]
}

export type FlattenedTimelineWaypoint = WishlistTimelineWaypoint & {
  segmentIndex: number
  waypointIndex: number
}

export function flattenTimelineWaypoints(): FlattenedTimelineWaypoint[] {
  return langtontaoWishlistTimelineSegments.flatMap((segment, segmentIndex) =>
    segment.waypoints.map((waypoint, waypointIndex) => ({
      ...waypoint,
      segmentIndex,
      waypointIndex,
    }))
  )
}

export const WISHLIST_TIMELINE_WAYPOINT_COUNT = flattenTimelineWaypoints().length

export type WishlistDiscoveredWaypoint = {
  waypointId: string
  segmentIndex: number
  waypointIndex: number
  label: string
  teaser: string
  topicIds: LangtontaoChallengeId[]
}

export function segmentToDiscoveredWaypoints(
  segmentIndex: number
): WishlistDiscoveredWaypoint[] {
  const segment = langtontaoWishlistTimelineSegments[segmentIndex]
  if (!segment) return []

  return segment.waypoints.map((waypoint, waypointIndex) => ({
    waypointId: waypoint.id,
    segmentIndex,
    waypointIndex,
    label: waypoint.label,
    teaser: waypoint.teaser,
    topicIds: [...waypoint.topicIds],
  }))
}

export function flattenToDiscoveredWaypoints(): WishlistDiscoveredWaypoint[] {
  return langtontaoWishlistTimelineSegments.flatMap((_, segmentIndex) =>
    segmentToDiscoveredWaypoints(segmentIndex)
  )
}

export function mergeDiscoveredWaypoints(
  current: WishlistDiscoveredWaypoint[],
  incoming: WishlistDiscoveredWaypoint[]
): WishlistDiscoveredWaypoint[] {
  const seen = new Set(current.map((item) => item.waypointId))
  const added = incoming.filter((item) => !seen.has(item.waypointId))
  return [...current, ...added]
}
