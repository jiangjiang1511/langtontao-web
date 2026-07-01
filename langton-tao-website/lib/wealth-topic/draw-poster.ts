import { buildTopicShareUrl } from '@/lib/topic-share/build-share-url'

export {
  drawTopicSharePoster as drawWealthTopicSharePoster,
  resolvePosterUrl,
} from '@/lib/topic-share/draw-topic-poster'

export function buildWealthTopicShareUrl(topicId = 'wealth-today') {
  return buildTopicShareUrl({ pathname: '/coffee', topicId })
}
