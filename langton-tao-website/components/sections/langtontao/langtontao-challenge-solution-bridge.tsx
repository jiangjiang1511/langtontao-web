'use client'

import { scrollToLangtontaoSolution } from '@/lib/langtontao/scroll-to-solution'
import { langtontaoChallengeSolutionBridge } from '@/lib/content/langtontao/langtontao-beautiful-business'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'

export function LangtontaoChallengeSolutionBridge() {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="lt-bridge-table w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="px-4 py-3 font-semibold">挑战</th>
            <th className="px-4 py-3 font-semibold">理念</th>
            <th className="px-4 py-3 font-semibold">解决方案</th>
          </tr>
        </thead>
        <tbody>
          {langtontaoChallengeSolutionBridge.map((row) => (
            <tr key={row.challengeId} className="border-b border-zinc-100">
              <td className="px-4 py-3 text-zinc-700">{row.challenge}</td>
              <td className="px-4 py-3 text-zinc-600">{row.philosophy}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className="font-semibold text-zinc-950 underline-offset-2 hover:underline"
                  onClick={() =>
                    scrollToLangtontaoSolution(row.anchor, {
                      challenge: row.challengeId,
                    })
                  }
                >
                  {row.solution} →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LangtontaoChallengeSolutionBridgeMobile() {
  return (
    <ul className="space-y-3 md:hidden">
      {langtontaoChallengeSolutionBridge.map((row, index) => (
        <Coffee2Reveal key={row.challengeId} delay={index * 40} as="li">
          <li className="c2-card p-4">
            <p className="text-xs font-bold uppercase text-zinc-500">挑战</p>
            <p className="mt-1 font-semibold text-zinc-950">{row.challenge}</p>
            <p className="mt-3 text-xs font-bold uppercase text-zinc-500">理念</p>
            <p className="mt-1 text-sm text-zinc-600">{row.philosophy}</p>
            <button
              type="button"
              className="coffee2-cta-button mt-4 !min-w-0 !text-xs"
              onClick={() =>
                scrollToLangtontaoSolution(row.anchor, {
                  challenge: row.challengeId,
                })
              }
            >
              {row.solution}
            </button>
          </li>
        </Coffee2Reveal>
      ))}
    </ul>
  )
}
