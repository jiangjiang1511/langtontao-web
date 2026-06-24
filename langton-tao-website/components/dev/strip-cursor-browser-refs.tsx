import Script from 'next/script'

/**
 * Cursor Browser MCP injects `data-cursor-ref` on DOM nodes for automation.
 * If that happens before React hydrates, Next.js reports a hydration mismatch.
 * Dev-only: strip those attributes until the initial load completes.
 */
const STRIP_CURSOR_REFS_SCRIPT = `
(function () {
  function strip() {
    document.querySelectorAll('[data-cursor-ref]').forEach(function (node) {
      node.removeAttribute('data-cursor-ref')
    })
  }

  strip()

  if (typeof MutationObserver === 'undefined') return

  var observer = new MutationObserver(strip)

  function startObserver() {
    if (!document.documentElement) return
    observer.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-cursor-ref'],
      childList: true,
    })
    window.addEventListener(
      'load',
      function () {
        setTimeout(function () {
          observer.disconnect()
        }, 4000)
      },
      { once: true }
    )
  }

  if (document.documentElement) startObserver()
  else document.addEventListener('DOMContentLoaded', startObserver, { once: true })
})()
`

export function StripCursorBrowserRefs() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <Script id="strip-cursor-browser-refs" strategy="beforeInteractive">
      {STRIP_CURSOR_REFS_SCRIPT}
    </Script>
  )
}
