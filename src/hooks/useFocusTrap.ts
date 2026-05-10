import { useEffect } from 'react'

export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  triggerRef?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const stored =
      triggerRef?.current ?? (document.activeElement as HTMLElement)
    const container = containerRef.current

    const getFocusable = (): HTMLElement[] => {
      const els = container.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      return Array.from(els).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      )
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container) return
      const items = getFocusable()
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement
      if (e.shiftKey) {
        if (active === first || !items.includes(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !items.includes(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const initial = getFocusable()[0]
    if (initial) initial.focus()
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      stored?.focus()
    }
  }, [isActive, containerRef, triggerRef])
}
