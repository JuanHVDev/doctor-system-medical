import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RegisterForm from '@/components/auth/RegisterForm'
import { signUp } from "@/lib/auth-client"

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock auth-client
vi.mock('@/lib/auth-client', () => ({
  signUp: {
    email: vi.fn(),
  },
}))

describe('RegisterForm', () =>
{
  it('renders all registration fields', () =>
  {
    render(<RegisterForm />)

    expect(screen.getByText(/Registro/i)).toBeInTheDocument()
    expect(screen.getByText(/Tipo de Usuario/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Correo Electronico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields on submit', async () =>
  {
    render(<RegisterForm />)

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    await waitFor(() =>
    {
      expect(screen.getByText(/El nombre debe de ser completo/i)).toBeInTheDocument()
      expect(screen.getByText(/El correo electrónico es obligatorio/i)).toBeInTheDocument()
      expect(screen.getAllByText(/La contraseña debe de tener al menos 8 caracteres/i).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('shows error if passwords do not match', async () =>
  {
    render(<RegisterForm />)

    fireEvent.change(screen.getByLabelText(/^Nombre Completo$/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/^Correo Electronico$/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/^Confirmar Contraseña$/i), { target: { value: 'password456' } })

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    await waitFor(() =>
    {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument()
    })
  })

  it('calls signUp.email with correct data on valid submission', async () =>
  {
    const signUpMock = vi.mocked(signUp.email).mockResolvedValue({
      data: { user: { id: '1' }, session: { id: 's1' } },
      error: null,
    } as any)

    render(<RegisterForm />)

    fireEvent.change(screen.getByLabelText(/^Nombre Completo$/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/^Correo Electronico$/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/^Confirmar Contraseña$/i), { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    await waitFor(() =>
    {
      expect(signUpMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'john@example.com',
          password: 'password123',
          name: 'John Doe',
          role: 'PATIENT',
        }),
        expect.any(Object)
      )
    })
  })
})
