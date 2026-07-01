'use client'

import { LangtontaoChallengeCta } from '@/components/sections/langtontao/langtontao-challenge-cta'
import { WishlistShareActions } from '@/components/sections/langtontao/langtontao-wishlist-share-actions'
import {
  getWishlistDimensionLabel,
  langtontaoWishlistMeta,
  resolveWishlistProfile,
  type WishlistAnswers,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'

const DIMENSION_ORDER = ['wealth', 'relations', 'education', 'legacy'] as const

type LangtontaoWishlistResultsProps = {
  answers: WishlistAnswers
  onRestart: () => void
  readOnly?: boolean
}

export function LangtontaoWishlistResults({
  answers,
  onRestart,
  readOnly = false,
}: LangtontaoWishlistResultsProps) {
  const profile = resolveWishlistProfile(answers)
  const maxScore = Math.max(...Object.values(profile.dimensionScores), 1)

  return (
    <div className="lt-wishlist-results c2-card mx-auto max-w-xl p-6 md:p-8">
      <p className="c2-eyebrow text-center">你的十年愿望画像</p>
      <h3 className="c2-display mt-3 text-center text-2xl text-zinc-950">
        优先维度：{getWishlistDimensionLabel(profile.topDimension)}
      </h3>
      <p className="mt-3 text-center text-sm text-zinc-600">{profile.stageLabel}</p>
      <p className="mt-2 text-center text-sm text-zinc-500">{profile.exposureHint}</p>

      <div className="lt-wishlist-timeline__score-bars mt-6">
        {DIMENSION_ORDER.map((dimension) => (
          <div key={dimension} className="lt-wishlist-timeline__score-row">
            <span className="lt-wishlist-timeline__score-label">
              {getWishlistDimensionLabel(dimension)}
            </span>
            <span className="lt-wishlist-timeline__score-track">
              <span
                className="lt-wishlist-timeline__score-fill"
                style={{
                  width: `${(profile.dimensionScores[dimension] / maxScore) * 100}%`,
                }}
              />
            </span>
            <span className="lt-wishlist-timeline__score-value">
              {profile.dimensionScores[dimension]}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">{langtontaoWishlistMeta.thanks}</p>
      <div className="mt-6 flex justify-center">
        <LangtontaoChallengeCta
          challengeId={profile.recommendedChallengeId}
          label={langtontaoWishlistMeta.resultsCta}
        />
      </div>
      {!readOnly ? <WishlistShareActions answers={answers} /> : null}
      {!readOnly ? (
        <button type="button" className="c2-btn-secondary mx-auto mt-4 block" onClick={onRestart}>
          重新填写
        </button>
      ) : null}
    </div>
  )
}
