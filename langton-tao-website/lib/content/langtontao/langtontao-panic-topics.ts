import {
  langtontaoChaosChannels,
  langtontaoPanicNodes,
} from '@/lib/content/langtontao/langtontao-panic-wealth'
import type { LangtontaoTopicItem } from '@/lib/content/langtontao/langtontao-topic-types'

const PANIC_CORE_COVER_BY_ID: Record<string, string> = {
  'inheritance-essence': '/assets/langtontao/panic/part2-panic-01.jpeg',
  'panic-source': '/assets/langtontao/panic/part2-panic-02.jpg',
  'employment-ice-age': '/assets/langtontao/panic/part2-panic-03.jpg',
  'asset-landslide': '/assets/langtontao/panic/part2-panic-04.jpeg',
  'deflation-shadow': '/assets/langtontao/panic/part2-panic-05.jpeg',
  'order-shakeup': '/assets/langtontao/panic/part2-panic-06.jpg',
}

export function buildLangtontaoPanicTopics(): LangtontaoTopicItem[] {
  return [...buildLangtontaoPanicCoreTopics(), ...buildLangtontaoPanicChannelTopics()]
}

export function buildLangtontaoPanicCoreTopics(): LangtontaoTopicItem[] {
  const mainNodes = langtontaoPanicNodes.filter((node) => node.id !== 'chaos-channels')

  return mainNodes.map((node) => ({
    id: node.id,
    title: node.title,
    summary: node.summary,
    body: node.body,
    coverSrc: PANIC_CORE_COVER_BY_ID[node.id],
    expandKind: 'body',
  }))
}

export function buildLangtontaoPanicChannelTopics(): LangtontaoTopicItem[] {
  return langtontaoChaosChannels.map((channel) => ({
    id: channel.id,
    title: channel.title,
    summary: channel.body,
    body: channel.body,
    expandKind: 'body',
  }))
}

export const langtontaoPanicCoreTopics = buildLangtontaoPanicCoreTopics()
export const langtontaoPanicChannelTopics = buildLangtontaoPanicChannelTopics()
export const langtontaoPanicTopics = buildLangtontaoPanicTopics()
