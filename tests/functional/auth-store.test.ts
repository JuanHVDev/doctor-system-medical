import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/store/auth-store'

describe('auth-store', () =>
{
  beforeEach(() =>
  {
    useAuthStore.getState().clearAuth()
  })

  it('initial state should be unauthenticated', () =>
  {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    // After clearAuth in beforeEach, isLoading is false
    expect(state.isLoading).toBe(false)
  })

  it('setAuth should update user and session', () =>
  {
    const mockUser = { id: '1', email: 'test@test.com', name: 'Test User', role: 'PATIENT' as const }
    const mockSession = { id: 's1', userId: '1', expiresAt: new Date(), token: 'abc', createdAt: new Date(), updatedAt: new Date() }

    useAuthStore.getState().setAuth(mockUser, mockSession)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.session).toEqual(mockSession)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('updateUser should update only user fields', () =>
  {
    const mockUser = { id: '1', email: 'test@test.com', name: 'Test User', role: 'PATIENT' as const }
    useAuthStore.getState().setAuth(mockUser, null)

    useAuthStore.getState().updateUser({ name: 'New Name' })

    expect(useAuthStore.getState().user?.name).toBe('New Name')
    expect(useAuthStore.getState().user?.email).toBe('test@test.com')
  })

  it('clearAuth should reset state', () =>
  {
    useAuthStore.getState().setAuth({ id: '1' } as any, { id: 's1' } as any)
    useAuthStore.getState().clearAuth()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})
