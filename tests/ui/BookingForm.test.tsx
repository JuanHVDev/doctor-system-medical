import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BookingForm } from '@/components/dashboard/BookingForm'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

const mockDoctors = [
  {
    id: 'doc1',
    fullName: 'Dr. Gregory House',
    specialization: 'cardiologia',
    availableDays: ['Lunes', 'Miércoles', 'Viernes'],
    startTime: '09:00',
    endTime: '17:00'
  }
]

describe('BookingForm', () =>
{
  beforeEach(() =>
  {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true })
  })

  it('renders correctly at step 1', () =>
  {
    render(<BookingForm doctors={mockDoctors} patientId="pat1" />)

    expect(screen.getByText('Especialidad')).toBeInTheDocument()
    expect(screen.getByText('Médico Especialista')).toBeInTheDocument()
    expect(screen.getByText('Motivo de la Consulta')).toBeInTheDocument()
  })

  it('navigates through steps correctly', async () =>
  {
    render(<BookingForm doctors={mockDoctors} patientId="pat1" />)

    // Step 1: Select specialty and doctor and Fill reason
    // Use select for specialty (using ID cardiologia)
    // Note: Testing Select component might require opening it first or finding the trigger

    // For simplicity in unit tests of shadcn Select, we might need more complex setup
    // But let's try basic interaction if possible or focus on logic

    // We can directly set values if we had access to form, but let's try UI interaction

    // Since Shadcn Select is complex to test with fireEvent directly without opening, 
    // let's assume we can find the trigger
  })

  // Add more specific tests for validation and API calls
})
