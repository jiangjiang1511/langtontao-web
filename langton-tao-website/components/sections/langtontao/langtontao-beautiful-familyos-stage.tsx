'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { FamilyOsListItem } from '@/components/sections/langtontao/langtontao-beautiful-familyos-rail'

type LangtontaoBeautifulFamilyosStageProps = {
  item: FamilyOsListItem
}

export function LangtontaoBeautifulFamilyosStage({ item }: LangtontaoBeautifulFamilyosStageProps) {
  return (
    <div
      id={`beautiful-familyos-panel-${item.id}`}
      role="region"
      aria-labelledby={`beautiful-familyos-card-${item.id}`}
      className="lt-beautiful-familyos-hub__stage"
    >
      <div
        key={item.id}
        className="lt-beautiful-familyos-hub__stage-inner lt-beautiful-familyos-hub__stage-inner--enter"
      >
        <p className="lt-beautiful-familyos-hub__stage-eyebrow">{item.branchTitle}</p>
        <h5 className="lt-beautiful-familyos-hub__stage-title">{item.title}</h5>
        <p className="lt-beautiful-familyos-hub__stage-lead">
          <Coffee2AnnotatedText text={item.philosophy} as="span" />
        </p>

        {item.detailItems?.length ? (
          <div className="lt-beautiful-familyos-hub__detail-section">
            <p className="lt-beautiful-familyos-hub__detail-label">业务子模块</p>
            <ul className="lt-beautiful-familyos-hub__detail-grid">
              {item.detailItems.map((detail) => (
                <li key={detail.title} className="lt-beautiful-familyos-hub__detail-card">
                  <p className="lt-beautiful-familyos-hub__detail-card-title">{detail.title}</p>
                  <p className="lt-beautiful-familyos-hub__detail-card-body">
                    <Coffee2AnnotatedText text={detail.body} as="span" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
