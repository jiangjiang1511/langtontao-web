export function Coffee2HeroOrbitPlaceholder() {
  return (
    <div className="coffee2-hero-orbit" aria-hidden>
      <div className="coffee2-hero-orbit__stage">
        <svg viewBox="0 0 100 100" className="coffee2-hero-orbit__svg" role="presentation">
          <g className="coffee2-hero-orbit__guides">
            <line x1="50" y1="12" x2="50" y2="88" className="coffee2-hero-orbit__axis" />
            <line x1="12" y1="50" x2="88" y2="50" className="coffee2-hero-orbit__axis" />
          </g>
          <circle cx="50" cy="50" r="38" fill="none" className="coffee2-hero-orbit__ring coffee2-hero-orbit__ring--1" />
          <circle cx="50" cy="50" r="30" fill="none" className="coffee2-hero-orbit__ring coffee2-hero-orbit__ring--2" />
          <circle cx="50" cy="50" r="22" fill="none" className="coffee2-hero-orbit__ring coffee2-hero-orbit__ring--3" />
        </svg>
      </div>
    </div>
  )
}
