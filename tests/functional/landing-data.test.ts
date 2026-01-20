import { describe, it, expect } from 'vitest'
import { heroData, featuresData, processSteps, statsData } from '@/lib/landing-data'

describe('Landing Page Data', () =>
{
  it('heroData contains expected title and subtitle', () =>
  {
    expect(heroData.title).toBeDefined()
    expect(heroData.subtitle).toBeDefined()
    expect(heroData.primaryCTA).toBe('Registrarse')
  })

  it('featuresData has exactly 6 features', () =>
  {
    expect(featuresData).toHaveLength(6)
    featuresData.forEach(feature =>
    {
      expect(feature).toHaveProperty('title')
      expect(feature).toHaveProperty('description')
      expect(feature).toHaveProperty('icon')
    })
  })

  it('processSteps has exactly 4 steps', () =>
  {
    expect(processSteps).toHaveLength(4)
    processSteps.forEach((step, index) =>
    {
      expect(step.step).toBe(index + 1)
      expect(step).toHaveProperty('title')
    })
  })

  it('statsData contains key metrics', () =>
  {
    expect(statsData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Pacientes Activos' }),
        expect.objectContaining({ label: 'Médicos Certificados' }),
      ])
    )
  })
})
