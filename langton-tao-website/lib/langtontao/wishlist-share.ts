import type { WishlistAnswers } from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { langtontaoWishlistQuestions } from '@/lib/content/langtontao/langtontao-wishlist-survey'

const WL_PARAM = 'wl'

export function encodeWishlistAnswers(answers: WishlistAnswers): string {
  const pairs = langtontaoWishlistQuestions
    .map((q) => {
      const answer = answers[q.id]
      return answer ? `${q.id}:${answer}` : null
    })
    .filter(Boolean)

  return btoa(pairs.join(','))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function decodeWishlistAnswers(encoded: string): WishlistAnswers | null {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const padLen = (4 - (padded.length % 4)) % 4
    const raw = atob(padded + '='.repeat(padLen))
    const answers: WishlistAnswers = {}

    for (const part of raw.split(',')) {
      const [questionId, optionId] = part.split(':')
      if (questionId && optionId) {
        answers[questionId] = optionId
      }
    }

    const answeredCount = langtontaoWishlistQuestions.filter((q) => answers[q.id]).length
    if (answeredCount === 0) return null
    return answers
  } catch {
    return null
  }
}

export function buildWishlistShareUrl(answers: WishlistAnswers) {
  const encoded = encodeWishlistAnswers(answers)
  if (typeof window === 'undefined') {
    return `/langtontao?${WL_PARAM}=${encoded}#decade-wishlist`
  }
  return `${window.location.origin}/langtontao?${WL_PARAM}=${encoded}#decade-wishlist`
}

export function readWishlistFromUrl(): WishlistAnswers | null {
  if (typeof window === 'undefined') return null
  const param = new URLSearchParams(window.location.search).get(WL_PARAM)
  if (!param) return null
  return decodeWishlistAnswers(param)
}

export const WISHLIST_ANCHOR_ID = 'decade-wishlist'
