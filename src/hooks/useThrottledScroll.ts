import { useEffect, useRef } from 'react'

export function useThrottledScroll(
  callback: (scrollY: number) => void,
  delay = 100
) {
  const cb = useRef(callback)
  cb.current = callback

  const raf = useRef<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastY = useRef(0)

  useEffect(() => {
    const handler = () => {
      lastY.current = window.scrollY
      if (raf.current !== null) return
      raf.current = requestAnimationFrame(() => {
        raf.current = null
        if (timer.current) return
        timer.current = setTimeout(() => {
          timer.current = null
          cb.current(lastY.current)
        }, delay)
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      if (raf.current) cancelAnimationFrame(raf.current)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [delay])
}
