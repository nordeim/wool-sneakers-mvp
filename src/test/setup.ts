import '@testing-library/jest-dom/vitest'

if (typeof window.requestAnimationFrame === 'undefined') {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    window.setTimeout(cb, 16) as unknown as number
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id)
}

class MockIntersectionObserver {
  readonly callback: IntersectionObserverCallback
  readonly options: IntersectionObserverInit | undefined
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
  }
  observe() { return null }
  unobserve() { return null }
  disconnect() { return null }
  takeRecords() { return [] }
}

if (typeof window.IntersectionObserver === 'undefined') {
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
}
