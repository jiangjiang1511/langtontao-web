'use client'

import { useEffect, useMemo, type CSSProperties } from 'react'
import { Pause, Play } from 'lucide-react'
import {
  CompoundGrowthMultiChart,
  type CompoundGrowthChartSeries,
} from '@/components/sections/coffee2/compound-growth-multi-chart'
import { useCompoundGrowth } from '@/components/sections/coffee2/compound-growth-provider'
import { CompoundGrowthShareActions } from '@/components/sections/coffee2/compound-growth-share-actions'
import { useCompoundGrowthPlayer } from '@/components/sections/coffee2/use-compound-growth-player'
import {
  formatCagrLabel,
  formatPeriodLabel,
  formatTotalReturnFromStats,
} from '@/lib/compound-growth/format-market-cap'

type CompoundGrowthStagePanelProps = {
  inView?: boolean
  replayToken?: number
}

export function CompoundGrowthStagePanel({
  inView = true,
  replayToken = 0,
}: CompoundGrowthStagePanelProps) {
  const { stocks, allSeries, activeSlug, disclaimer } = useCompoundGrowth()

  const activeStock = useMemo(
    () => stocks.find((stock) => stock.slug === activeSlug) ?? null,
    [stocks, activeSlug]
  )

  const activeSeries = useMemo(
    () => allSeries.find((series) => series.slug === activeSlug) ?? null,
    [allSeries, activeSlug]
  )

  const loading = allSeries.length === 0

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const timelinePoints = allSeries[0]?.points ?? []
  const player = useCompoundGrowthPlayer({
    points: timelinePoints,
    autoPlay: false,
    reducedMotion,
  })

  useEffect(() => {
    if (!inView || !allSeries.length || reducedMotion) return
    player.reset()
    player.play()
  }, [inView, allSeries.length, replayToken]) // eslint-disable-line react-hooks/exhaustive-deps

  const chartSeries = useMemo<CompoundGrowthChartSeries[]>(
    () =>
      allSeries.map((series) => ({
        slug: series.slug,
        points: series.points,
        accent: series.accent,
        name: series.name,
      })),
    [allSeries]
  )

  const displaySeries = activeSeries ?? allSeries[0] ?? null

  const accent = activeStock?.accent ?? 'var(--jarsy-violet)'
  const overviewMode = !activeStock

  return (
    <div
      className="cg-stage"
      style={{ '--cg-accent': accent } as CSSProperties}
      data-loading={loading}
      data-overview={overviewMode}
    >
      <div className="cg-stage-grid" aria-hidden />
      <header className="cg-stage-header">
        <div className="cg-stage-header-main">
          {overviewMode ? (
            <>
              <p className="cg-stage-eyebrow">复利对比 · 过去十年</p>
              <h4 className="cg-stage-title">
                七类资产
                <span className="cg-stage-title-en">Ten-Year Returns</span>
              </h4>
              <p className="cg-stage-tagline">
                2016 年分别买入七类资产，回看十年累计收益率
              </p>
            </>
          ) : (
            <>
              <p className="cg-stage-eyebrow">
                复利见证 · {activeStock.ticker}
              </p>
              <h4 className="cg-stage-title">
                {activeStock.name}
                <span className="cg-stage-title-en">{activeStock.nameEn}</span>
              </h4>
              <p className="cg-stage-tagline">{activeStock.tagline}</p>
            </>
          )}
        </div>
        {!loading && displaySeries ? (
          <div className="cg-header-stats">
            <div>
              <p className="cg-stat-label">区间</p>
              <p className="cg-stat-year">2016–2026</p>
            </div>
            <div className="cg-stat-divider" />
            <div className="cg-stat-cap-wrap">
              <p className="cg-stat-label">十年累计收益率</p>
              <p className="cg-stat-cap" style={{ color: accent }}>
                {overviewMode
                  ? '全部曲线'
                  : formatTotalReturnFromStats(
                      displaySeries.stats.startCap,
                      displaySeries.stats.endCap
                    )}
              </p>
            </div>
          </div>
        ) : null}
      </header>

      <div className="cg-stage-body">
        {loading ? (
          <div className="cg-stage-placeholder cg-stage-loading">
            <span className="cg-stage-loading-bar" />
            加载历史收益…
          </div>
        ) : allSeries.length ? (
          <>
            <div className="cg-chart-wrap">
              <CompoundGrowthMultiChart
                seriesList={chartSeries}
                progress={player.progress}
                highlightedSlug={activeSlug}
                className="h-full w-full"
                width={800}
                height={340}
              />
            </div>

            <div className="cg-player">
              <input
                type="range"
                min={0}
                max={1000}
                value={Math.round(player.progress * 1000)}
                onChange={(event) =>
                  player.seek(Number(event.target.value) / 1000)
                }
                className="cg-progress w-full"
                aria-label="播放进度"
              />
              <div className="cg-player-controls">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="cg-player-btn"
                    onClick={player.togglePlay}
                    aria-label={player.playing ? '暂停' : '播放'}
                  >
                    {player.playing ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="cg-speed-btn"
                    onClick={player.toggleSpeed}
                    aria-label={`播放速度 ${player.speed}x`}
                  >
                    {player.speed}x
                  </button>
                </div>
                <div className="cg-player-meta">
                  {activeSeries ? (
                    <>
                      <p>
                        {formatCagrLabel(activeSeries.stats.cagr)}
                        {' · '}
                        {formatPeriodLabel(
                          activeSeries.stats.years,
                          activeSeries.listedYear
                        )}
                      </p>
                      <p className="mt-0.5">
                        十年累计{' '}
                        <span className="font-semibold text-zinc-300">
                          {formatTotalReturnFromStats(
                            activeSeries.stats.startCap,
                            activeSeries.stats.endCap
                          )}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p>
                      {formatPeriodLabel(10, 2016)}
                      {' · '}
                      点选左侧标的高亮对应曲线
                    </p>
                  )}
                </div>
              </div>
            </div>

            {overviewMode ? (
              <CompoundGrowthShareActions mode="overview" seriesList={allSeries} />
            ) : activeSeries ? (
              <CompoundGrowthShareActions mode="single" series={activeSeries} />
            ) : null}
          </>
        ) : null}
      </div>

      <footer className="cg-stage-footer">
        <p>{disclaimer}</p>
      </footer>
    </div>
  )
}
