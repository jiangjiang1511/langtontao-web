import { wealthNarrativeRoot } from '@/lib/content/coffee-wealth-narrative'
import { langtontaoWealthNodes } from '@/lib/content/langtontao/langtontao-panic-wealth'
import type {
  LangtontaoTopicItem,
  LangtontaoTopicZone,
} from '@/lib/content/langtontao/langtontao-topic-types'

const WEALTH_COVER_BY_ID: Record<string, string> = {
  'poverty-norm': '/assets/langtontao/wealth/part3-wealth-01.jpeg',
  'malthusian-trap': '/assets/langtontao/wealth/part3-wealth-02.jpg',
  'bayesian-acceleration': '/assets/langtontao/wealth/part3-breakthrough-01.jpeg',
  'system-upgrade': '/assets/langtontao/wealth/part3-breakthrough-02.jpg',
  'global-471t': '/assets/langtontao/wealth/part3-breakthrough-03.jpg',
  'family-wealth-path': '/assets/langtontao/wealth/part3-breakthrough-04.jpg',
}

function wealthCoverFor(id: string, fallback?: string) {
  return WEALTH_COVER_BY_ID[id] ?? fallback
}

function mapLeaf(node: {
  id: string
  title: string
  summary?: string
  body?: string
  formula?: string
  coverSrc?: string
  children?: { id: string; title: string; body?: string; stats?: unknown[] }[]
}): LangtontaoTopicItem {
  if (node.id === 'system-upgrade' && node.children?.length) {
    return {
      id: node.id,
      title: node.title,
      summary: node.summary ?? '',
      body: '真正改变命运的，是一遍又一遍的系统升级：能源、信用、组织、技术、金融。家庭财富亦然——旧系统扛不住新摩擦，就必须升级。',
      coverSrc: wealthCoverFor(node.id, node.coverSrc),
      expandKind: 'nested',
      nestedItems: node.children
        .filter((child) => child.body)
        .map((child) => ({ title: child.title, body: child.body! })),
    }
  }

  const global471 = node.children?.find((child) => child.id === 'global-471t')
  if (node.id === 'wealth-today' && global471) {
    return {
      id: 'global-471t',
      title: global471.title,
      summary: node.summary ?? '471 万亿宏大叙事——中国国内资产格局的五块拼图。',
      body: global471.body,
      coverSrc: wealthCoverFor('global-471t', node.coverSrc),
      expandKind: 'structure',
    }
  }

  return {
    id: node.id,
    title: node.title,
    summary: node.summary ?? '',
    body: node.body,
    formula: node.formula,
    coverSrc: wealthCoverFor(node.id, node.coverSrc),
    expandKind: node.formula ? 'body' : 'body',
  }
}

const familyWealthPath = langtontaoWealthNodes.find((node) => node.id === 'family-wealth-path')

export function buildLangtontaoWealthTopicZones(): LangtontaoTopicZone[] {
  const zones = wealthNarrativeRoot.children ?? []
  const deadlockZone = zones.find((zone) => zone.id === 'wealth-deadlock')
  const breakthroughZone = zones.find((zone) => zone.id === 'wealth-breakthrough')

  const result: LangtontaoTopicZone[] = []

  if (deadlockZone?.children?.length) {
    result.push({
      id: deadlockZone.id,
      title: deadlockZone.title,
      topics: deadlockZone.children.map((child) => mapLeaf(child)),
    })
  }

  if (breakthroughZone?.children?.length) {
    const topics: LangtontaoTopicItem[] = breakthroughZone.children.map((child) =>
      mapLeaf(child)
    )

    if (familyWealthPath) {
      topics.push({
        id: familyWealthPath.id,
        title: familyWealthPath.title,
        summary: familyWealthPath.summary,
        body: familyWealthPath.body,
        coverSrc: wealthCoverFor(familyWealthPath.id),
        expandKind: 'body',
      })
    }

    result.push({
      id: breakthroughZone.id,
      title: breakthroughZone.title,
      topics,
    })
  }

  return result
}

export const langtontaoWealthTopicZones = buildLangtontaoWealthTopicZones()
