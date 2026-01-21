import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Navigation } from '@/components/landing/Navigation'
import { useAuthStore } from '@/store/auth-store'
import { authClient } from '@/lib/auth-client'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock auth-store
vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}))

// Mock auth-client
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut: vi.fn(),
  },
}))

describe('Navigation', () =>
{
  beforeEach(() =>
  {
    vi.clearAllMocks()
  })

  it('renders landing page links when not authenticated', () =>
  {
    (useAuthStore as any).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      clearAuth: vi.fn(),
    })

    render(<Navigation />)

    expect(screen.getByText('Características')).toBeInTheDocument()
    expect(screen.getByText('Cómo Funciona')).toBeInTheDocument()
    expect(screen.getByText('Seguridad')).toBeInTheDocument()
    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Súmate')).toBeInTheDocument()
  })

  it('renders loading state', () =>
  {
    (useAuthStore as any).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      clearAuth: vi.fn(),
    })

    render(<Navigation />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders patient options when authenticated as a patient', () =>
  {
    (useAuthStore as any).mockReturnValue({
      user: { name: 'Juan Paciente', role: 'PATIENT' },
      isAuthenticated: true,
      isLoading: false,
      clearAuth: vi.fn(),
    })

    render(<Navigation />)

    expect(screen.getByText('Juan Paciente')).toBeInTheDocument()
    expect(screen.getByText('PATIENT')).toBeInTheDocument()
    expect(screen.getByText('Panel')).toBeInTheDocument()
    expect(screen.getByText('Salir')).toBeInTheDocument()
  })

  it('renders doctor options when authenticated as a doctor', () =>
  {
    (useAuthStore as any).mockReturnValue({
      user: { name: 'Dr. House', role: 'DOCTOR' },
      isAuthenticated: true,
      isLoading: false,
      clearAuth: vi.fn(),
    })

    render(<Navigation />)

    expect(screen.getByText('Dr. House')).toBeInTheDocument()
    expect(screen.getByText('DOCTOR')).toBeInTheDocument()
    expect(screen.getByText('Panel')).toBeInTheDocument()
  })

  it('calls logout and redirects on sign out click', async () =>
  {
    const clearAuth = vi.fn()
      ; (useAuthStore as any).mockReturnValue({
        user: { name: 'Juan Paciente', role: 'PATIENT' },
        isAuthenticated: true,
        isLoading: false,
        clearAuth: clearAuth,
      })

    render(<Navigation />)

    const logoutButton = screen.getByText('Salir')
    fireEvent.click(logoutButton)

    expect(authClient.signOut).toHaveBeenCalled()
    await waitFor(() =>
    {
      expect(clearAuth).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})
