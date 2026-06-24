'use client'

import { useEffect, useState } from 'react'

type ViewportMetrics = {
  innerWidth: number
  innerHeight: number
  md: boolean
  lg: boolean
}

function readMetrics(): ViewportMetrics {
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    md: window.matchMedia('(min-width: 768px)').matches,
    lg: window.matchMedia('(min-width: 1024px)').matches,
  }
}

export function ViewportDebugBadge() {
  const [metrics, setMetrics] = useState<ViewportMetrics | null>(null)

  useEffect(() => {
    const sync = () => setMetrics(readMetrics())
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  if (!metrics) return null

  const layout =
    metrics.lg ? 'desktop (≥1024)' : metrics.md ? 'tablet (≥768)' : 'mobile (<768)'

  return (
    <div
      className="pointer-events-none fixed bottom-3 right-3 z-[9999] rounded-lg border border-zinc-300 bg-white/95 px-2.5 py-1.5 font-mono text-[10px] leading-snug text-zinc-700 shadow-md backdrop-blur-sm"
      aria-hidden
    >
      <div>
        viewport {metrics.innerWidth}×{metrics.innerHeight}
      </div>
      <div className="text-zinc-500">{layout}</div>
    </div>
  )
}
