export function ScribbleAccent({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden
      className={side === 'right' ? 'scale-x-[-1]' : undefined}
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
    >
      <path
        d="M4 16c8-10 16-10 24 0s16 10 24 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-pop-yellow"
      />
      <circle cx="8" cy="8" r="3" fill="currentColor" className="text-pop-black" />
    </svg>
  )
}
