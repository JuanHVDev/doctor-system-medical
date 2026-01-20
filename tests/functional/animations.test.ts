import { describe, it, expect } from 'vitest'
import { fadeInUp, slideInLeft, staggerContainer, scaleIn } from '@/lib/animations'

describe('Animation Variants', () =>
{
  it('staggerContainer should have expected transition', () =>
  {
    expect(staggerContainer.show?.transition).toEqual({
      staggerChildren: 0.1,
      delayChildren: 0.2,
    })
  })

  it('fadeInUp should have expected hidden and show states', () =>
  {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 30 })
    expect(fadeInUp.show).toMatchObject({
      opacity: 1,
      y: 0,
    })
  })

  it('slideInLeft should have expected hidden and show states', () =>
  {
    expect(slideInLeft.hidden).toEqual({ opacity: 0, x: -50 })
    expect(slideInLeft.show).toMatchObject({
      opacity: 1,
      x: 0,
    })
  })

  it('scaleIn should have expected hidden and show states', () =>
  {
    expect(scaleIn.hidden).toEqual({ opacity: 0, scale: 0.9 })
    expect(scaleIn.show).toMatchObject({
      opacity: 1,
      scale: 1,
    })
  })
})
