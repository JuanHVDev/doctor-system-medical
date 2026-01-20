import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () =>
{
  it('should merge classes correctly', () =>
  {
    expect(cn('flex', 'bg-red-500')).toBe('flex bg-red-500')
  })

  it('should handle conditional classes', () =>
  {
    expect(cn('flex', true && 'bg-red-500', false && 'text-white')).toBe('flex bg-red-500')
  })

  it('should merge tailwind classes correctly', () =>
  {
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4')
  })
})
