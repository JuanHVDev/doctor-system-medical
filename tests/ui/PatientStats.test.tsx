import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PatientStats } from '@/components/dashboard/PatientStats'

describe('PatientStats', () =>
{
  const mockStats = {
    totalAppointments: 10,
    completedAppointments: 7,
    upcomingAppointments: 3
  }

  it('renders all stat cards with correct values', () =>
  {
    render(<PatientStats {...mockStats} />)

    expect(screen.getByText('Citas Totales')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()

    expect(screen.getByText('Próximas Citas')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    expect(screen.getByText('Citas Completadas')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('renders health status card', () =>
  {
    render(<PatientStats {...mockStats} />)
    expect(screen.getByText('Nivel de Salud')).toBeInTheDocument()
    expect(screen.getByText('Excelente')).toBeInTheDocument()
  })
})
