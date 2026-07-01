export function SectionLoadingFallback({ label = '加载中…' }: { label?: string }) {
  return (
    <div
      className="flex min-h-[24vh] items-center justify-center px-4 py-12"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-zinc-400">{label}</p>
    </div>
  )
}
