export type TopicSharePosterScope = 'path' | 'langtontao' | 'coffee'

export function topicSharePosterKey(scope: TopicSharePosterScope, topicId: string): string {
  return `${scope}:${topicId}`
}

/** Central registry — add poster paths as assets become available */
export const topicSharePosters: Record<string, string> = {
  'coffee:wealth-today':
    '/assets/bearbitcoffee/wealthdelema/breakthrough-03poster.png',
}

export function resolveTopicSharePoster(
  scope: TopicSharePosterScope,
  topicId: string,
  inlinePosterSrc?: string | null
): string | null {
  const registry = topicSharePosters[topicSharePosterKey(scope, topicId)]
  return registry ?? inlinePosterSrc ?? null
}
