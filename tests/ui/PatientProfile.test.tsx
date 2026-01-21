import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PatientProfile } from '@/components/dashboard/PatientProfile'

// Mock the prisma client enums
vi.mock('../../generated/prisma/client', () => ({
  Gender: {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER'
  },
  BloodType: {
    A_POSITIVE: 'A_POSITIVE',
    A_NEGATIVE: 'A_NEGATIVE',
    B_POSITIVE: 'B_POSITIVE',
    B_NEGATIVE: 'B_NEGATIVE',
    AB_POSITIVE: 'AB_POSITIVE',
    AB_NEGATIVE: 'AB_NEGATIVE',
    O_POSITIVE: 'O_POSITIVE',
    O_NEGATIVE: 'O_NEGATIVE'
  }
}))

describe('PatientProfile', () =>
{
  const mockPatient = {
    fullName: 'Juan Pérez',
    email: 'juan@example.com',
    phoneNumber: '123456789',
    address: 'Calle Falsa 123',
    city: 'Springfield',
    bloodType: 'O_POSITIVE' as any,
    dateOfBirth: new Date('1990-01-01'),
    image: null
  }

  it('renders patient name and email', () =>
  {
    render(<PatientProfile patient={mockPatient} />)

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('juan@example.com')).toBeInTheDocument()
  })

  it('displays correct blood type badge', () =>
  {
    render(<PatientProfile patient={mockPatient} />)
    expect(screen.getByText('O+')).toBeInTheDocument()
  })

  it('formats the date of birth correctly', () =>
  {
    const patientWithLocalDate = {
      ...mockPatient,
      dateOfBirth: new Date(1990, 0, 1) // Jan 1st 1990 local
    }
    render(<PatientProfile patient={patientWithLocalDate} />)
    // Check for the full date string with flexible whitespace
    expect(screen.getByText(/1\s+de\s+enero\s+de\s+1990/i)).toBeInTheDocument()
  })

  it('shows default text when phone or address are missing', () =>
  {
    const incompletePatient = {
      ...mockPatient,
      phoneNumber: null,
      address: null
    }
    render(<PatientProfile patient={incompletePatient} />)

    expect(screen.getByText('No registrado')).toBeInTheDocument()
    expect(screen.getByText('No registrada')).toBeInTheDocument()
  })
})
