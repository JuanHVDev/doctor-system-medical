import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments'

describe('UpcomingAppointments', () =>
{
  const mockAppointments = [
    {
      id: '1',
      startTime: new Date('2026-05-20T10:00:00'),
      status: 'SCHEDULED',
      doctor: {
        fullName: 'Gregory House',
        specialization: 'Diagnóstico'
      }
    },
    {
      id: '2',
      startTime: new Date('2026-05-22T15:30:00'),
      status: 'CONFIRMED',
      doctor: {
        fullName: 'Wilson',
        specialization: 'Oncología'
      }
    }
  ]

  it('renders progress description with correct count', () =>
  {
    render(<UpcomingAppointments appointments={mockAppointments} />)
    expect(screen.getByText('Tienes 2 citas programadas')).toBeInTheDocument()
  })

  it('renders appointment details correctly', () =>
  {
    render(<UpcomingAppointments appointments={mockAppointments} />)

    expect(screen.getByText('Dr. Gregory House')).toBeInTheDocument()
    expect(screen.getByText('Diagnóstico')).toBeInTheDocument()
    expect(screen.getByText('Programada')).toBeInTheDocument()

    expect(screen.getByText('Dr. Wilson')).toBeInTheDocument()
    expect(screen.getByText('Oncología')).toBeInTheDocument()
    expect(screen.getByText('Confirmada')).toBeInTheDocument()
  })

  it('shows empty state when no appointments are provided', () =>
  {
    render(<UpcomingAppointments appointments={[]} />)

    expect(screen.getByText('No tienes citas próximas')).toBeInTheDocument()
    expect(screen.getByText('Agendar Cita')).toBeInTheDocument()
  })
})
