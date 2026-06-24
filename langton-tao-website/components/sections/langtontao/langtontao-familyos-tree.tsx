'use client'

import { useEffect } from 'react'
import { scrollToLangtontaoSolution } from '@/lib/langtontao/scroll-to-solution'
import { readChallengeFromUrl } from '@/lib/langtontao/scroll-to-solution'
import { getChallengeLink } from '@/lib/content/langtontao/langtontao-challenge-links'
import { langtontaoFamilyOsTree } from '@/lib/content/langtontao/langtontao-beautiful-business'
import { cn } from '@/lib/utils'

export function LangtontaoFamilyosTree() {
  useEffect(() => {
    const challenge = readChallengeFromUrl()
    if (!challenge) return
    const link = getChallengeLink(challenge)
    if (link) {
      window.setTimeout(() => {
        scrollToLangtontaoSolution(link.solutionAnchor, { highlight: true })
      }, 400)
    }
  }, [])

  return (
    <div className="lt-familyos-tree space-y-6">
      {langtontaoFamilyOsTree.map((branch) => (
        <div key={branch.id}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-violet-700">
            {branch.title}
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {branch.children.map((leaf) => (
              <li key={leaf.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (leaf.anchor) {
                      scrollToLangtontaoSolution(leaf.anchor, {
                        challenge: leaf.challengeIds[0],
                      })
                    }
                  }}
                  className={cn(
                    'lt-familyos-leaf w-full rounded-xl border border-zinc-200 bg-white p-4 text-left transition-shadow hover:shadow-md',
                    leaf.anchor && 'cursor-pointer'
                  )}
                >
                  <p className="font-semibold text-zinc-950">{leaf.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{leaf.philosophy}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
