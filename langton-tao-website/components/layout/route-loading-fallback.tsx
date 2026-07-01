export function RouteLoadingFallback() {
  return (
    <div
      className="route-loading-fallback flex min-h-[50vh] flex-col items-center justify-center bg-white px-4 py-24"
      role="status"
      aria-live="polite"
      aria-label="页面加载中"
    >
      <div className="route-loading-progress route-loading-progress--inline mb-6 w-full max-w-xs">
        <div className="route-loading-progress__bar" />
      </div>
      <p className="text-sm font-medium text-zinc-500">加载中…</p>
    </div>
  )
}
