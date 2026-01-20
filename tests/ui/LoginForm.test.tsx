import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginForm from '@/components/auth/LoginForm'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// Mock auth-client
vi.mock('@/lib/auth-client', () => ({
  signIn: {
    email: vi.fn(),
  },
}))

describe('LoginForm', () =>
{
  it('renders the login form', () =>
  {
    render(<LoginForm />)

    const title = screen.getAllByText(/Iniciar Sesión/i)
    expect(title.length).toBeGreaterThanOrEqual(1)

    expect(screen.getByLabelText(/^Correo Electrónico$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })
})
