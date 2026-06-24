'use client'

import { useCallback, useState } from 'react'
import { LangtontaoChallengeCta } from '@/components/sections/langtontao/langtontao-challenge-cta'
import {
  langtontaoWishlistMeta,
  langtontaoWishlistQuestions,
  resolveWishlistProfile,
  getWishlistDimensionLabel,
  type WishlistAnswers,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { cn } from '@/lib/utils'

export function LangtontaoDecadeWishlistDeck() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<WishlistAnswers>({})
  const [done, setDone] = useState(false)

  const question = langtontaoWishlistQuestions[index]
  const profile = done ? resolveWishlistProfile(answers) : null

  const select = useCallback(
    (optionId: string) => {
      if (!question) return
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
    },
    [question]
  )

  if (done && profile) {
    return (
      <div className="lt-wishlist-deck c2-card mx-auto max-w-xl p-6 md:p-8">
        <p className="c2-eyebrow">你的十年愿望画像</p>
        <h3 className="c2-display mt-3 text-2xl text-zinc-950">
          优先维度：{getWishlistDimensionLabel(profile.topDimension)}
        </h3>
        <p className="mt-3 text-sm text-zinc-600">{profile.stageLabel}</p>
        <p className="mt-2 text-sm text-zinc-500">{profile.exposureHint}</p>
        <p className="mt-4 text-xs text-zinc-400">{langtontaoWishlistMeta.thanks}</p>
        <div className="mt-6">
          <LangtontaoChallengeCta
            challengeId={profile.recommendedChallengeId}
            label={langtontaoWishlistMeta.resultsCta}
          />
        </div>
        <button
          type="button"
          className="c2-btn-secondary mt-4"
          onClick={() => {
            setDone(false)
            setIndex(0)
            setAnswers({})
          }}
        >
          重新填写
        </button>
      </div>
    )
  }

  if (!question) return null

  const selected = answers[question.id]

  return (
    <div className="lt-wishlist-deck c2-card mx-auto max-w-xl p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        {String(index + 1).padStart(2, '0')} /{' '}
        {String(langtontaoWishlistQuestions.length).padStart(2, '0')} ·{' '}
        {getWishlistDimensionLabel(question.dimension)}
      </p>
      <h3 className="mt-4 text-xl font-semibold text-zinc-950 md:text-2xl">
        {question.prompt}
      </h3>
      <ul className="mt-5 space-y-2">
        {question.options.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => select(opt.id)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                selected === opt.id
                  ? 'border-zinc-950 bg-zinc-950 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
              )}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          className="c2-btn-secondary disabled:opacity-40"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          {langtontaoWishlistMeta.prevLabel}
        </button>
        <button
          type="button"
          disabled={!selected}
          className="coffee2-cta-button disabled:opacity-40"
          onClick={() => {
            if (index >= langtontaoWishlistQuestions.length - 1) setDone(true)
            else setIndex((i) => i + 1)
          }}
        >
          {index >= langtontaoWishlistQuestions.length - 1
            ? langtontaoWishlistMeta.completeLabel
            : langtontaoWishlistMeta.nextLabel}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-400">
        {langtontaoWishlistMeta.stageHint}
      </p>
    </div>
  )
}
