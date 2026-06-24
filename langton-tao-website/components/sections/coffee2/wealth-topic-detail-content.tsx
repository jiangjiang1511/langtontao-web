'use client'

import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { nodeHasDetailContent } from '@/lib/content/wealth-topic-utils'

function WealthStatsList({ stats }: { stats: NonNullable<WealthNarrativeNode['stats']> }) {
  return (
    <ul className="invest-wealth-stats">
      {stats.map((stat) => (
        <li key={stat.id} className="invest-wealth-stats__item">
          <div className="invest-wealth-stats__head">
            <span className="invest-wealth-stats__label">{stat.label}</span>
            <span className="invest-wealth-stats__scale">{stat.scale}</span>
          </div>
          {stat.share ? (
            <p className="invest-wealth-stats__share">占比 {stat.share}</p>
          ) : null}
          <p className="invest-wealth-stats__desc">{stat.description}</p>
        </li>
      ))}
    </ul>
  )
}

function WealthNodeFields({ node }: { node: WealthNarrativeNode }) {
  return (
    <>
      {node.summary ? (
        <Coffee2AnnotatedText
          text={node.summary}
          className="invest-wealth-detail__summary"
        />
      ) : null}
      {node.formula ? (
        <p className="invest-wealth-detail__formula" aria-label="贝叶斯公式">
          {node.formula}
        </p>
      ) : null}
      {node.body ? <p className="invest-wealth-detail__body">{node.body}</p> : null}
      {node.stats?.length ? <WealthStatsList stats={node.stats} /> : null}
    </>
  )
}

function WealthChildItem({ child }: { child: WealthNarrativeNode }) {
  return (
    <article className="invest-wealth-child">
      <h5 className="invest-wealth-child__title">{child.title}</h5>
      <WealthNodeFields node={child} />
      {child.children?.length ? (
        <ul className="invest-wealth-child__nested">
          {child.children.map((nested) => (
            <li key={nested.id} className="invest-wealth-child__nested-item">
              <span className="invest-wealth-child__nested-title">{nested.title}</span>
              {nested.body ? (
                <p className="invest-wealth-child__nested-body">{nested.body}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

type WealthTopicDetailContentProps = {
  node: WealthNarrativeNode
}

export function WealthTopicDetailContent({ node }: WealthTopicDetailContentProps) {
  const hasChildren = Boolean(node.children?.length)
  const hasOwnDetail = nodeHasDetailContent(node)

  return (
    <div className="invest-wealth-detail">
      {hasChildren ? (
        <>
          {node.summary ? (
            <Coffee2AnnotatedText
              text={node.summary}
              className="invest-wealth-detail__summary"
            />
          ) : null}
          <div className="invest-wealth-children">
            {node.children!.map((child) => (
              <WealthChildItem key={child.id} child={child} />
            ))}
          </div>
        </>
      ) : (
        <>
          <WealthNodeFields node={node} />
          {!hasOwnDetail && node.summary ? (
            <p className="invest-wealth-detail__body">{node.summary}</p>
          ) : null}
        </>
      )}
    </div>
  )
}
