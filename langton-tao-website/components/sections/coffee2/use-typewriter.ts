'use client'

import { useEffect, useState } from 'react'

export function useTypewriter(
  text: string,
  active: boolean,
  speedMs = 24
) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setDone(false)
      return
    }

    setDisplayed('')
    setDone(false)
    let index = 0
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      if (now - last >= speedMs) {
        index += 1
        last = now
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          setDone(true)
          return
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, active, speedMs])

  return { displayed, done }
}
