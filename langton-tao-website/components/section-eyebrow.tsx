interface SectionEyebrowProps {
  children: React.ReactNode
  className?: string
}

export function SectionEyebrow({ children, className = '' }: SectionEyebrowProps) {
  return (
    <span
      className={`mb-4 block text-[12px] font-medium uppercase tracking-[0.2em] text-accent md:text-[13px] ${className}`}
    >
      {children}
    </span>
  )
}
