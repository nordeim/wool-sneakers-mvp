import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'

describe('cn()', () => {
  it('merges tailwind classes', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })
  it('resolves tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})

describe('formatPrice()', () => {
  it('formats SGD from cents', () => {
    const actual = formatPrice(18900)
    expect(actual).toContain('189')
    expect(actual).toContain('$')
  })
  it('formats zero cents', () => {
    const actual = formatPrice(0)
    expect(actual).toContain('0')
    expect(actual).toContain('$')
  })
})
