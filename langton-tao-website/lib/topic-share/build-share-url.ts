export type TopicShareContext = {
  pathname: string
  topicId: string
}

export function topicCardHash(topicId: string): string {
  return `topic-card-${topicId}`
}

export function buildTopicShareUrl(ctx: TopicShareContext): string {
  const path = ctx.pathname.startsWith('/') ? ctx.pathname : `/${ctx.pathname}`
  const hash = topicCardHash(ctx.topicId)

  if (typeof window === 'undefined') {
    return `${path}#${hash}`
  }

  return `${window.location.origin}${path}#${hash}`
}

export function parseTopicCardHash(hash: string): string | null {
  const normalized = hash.replace(/^#/, '')
  if (!normalized.startsWith('topic-card-')) return null
  return normalized.slice('topic-card-'.length) || null
}
