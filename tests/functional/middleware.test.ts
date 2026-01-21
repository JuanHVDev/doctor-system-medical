import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextResponse } from 'next/server'
import middleware from '@/proxy'
import { getSessionCookie } from 'better-auth/cookies'

// Mock better-auth/cookies
vi.mock('better-auth/cookies', () => ({
  getSessionCookie: vi.fn(),
}))

// Mock next/server
vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn().mockReturnValue({ type: 'next' }),
    redirect: vi.fn((url) => ({ type: 'redirect', url })),
  },
}))

describe('Middleware', () =>
{
  const mockRequest = (pathname: string, cookie: string | null = null) => ({
    nextUrl: {
      pathname,
      origin: 'http://localhost:3000',
    },
    url: `http://localhost:3000${pathname}`,
    headers: {
      get: vi.fn().mockReturnValue(cookie),
    },
  } as any)

  beforeEach(() =>
  {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('redirects unauthenticated users from protected routes to login', async () =>
  {
    vi.mocked(getSessionCookie).mockReturnValue(null)

    const res = await middleware(mockRequest('/paciente'))

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
      pathname: '/login'
    }))
  })

  it('redirects authenticated patients from login to /paciente', async () =>
  {
    vi.mocked(getSessionCookie).mockReturnValue('cookie' as any)
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ user: { role: 'PATIENT' } })
    })

    const res = await middleware(mockRequest('/login'))

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
      pathname: '/paciente'
    }))
  })

  it('redirects authenticated doctors from login to /doctor', async () =>
  {
    vi.mocked(getSessionCookie).mockReturnValue('cookie' as any)
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ user: { role: 'DOCTOR' } })
    })

    const res = await middleware(mockRequest('/login'))

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
      pathname: '/doctor'
    }))
  })

  it('allows access to protected routes if authenticated and role matches', async () =>
  {
    vi.mocked(getSessionCookie).mockReturnValue('cookie' as any)
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ user: { role: 'PATIENT' } })
    })

    const res = await middleware(mockRequest('/paciente'))

    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects patients from /doctor to /paciente', async () =>
  {
    vi.mocked(getSessionCookie).mockReturnValue('cookie' as any)
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ user: { role: 'PATIENT' } })
    })

    const res = await middleware(mockRequest('/doctor'))

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
      pathname: '/paciente'
    }))
  })
})
