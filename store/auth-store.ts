import { create } from 'zustand';

export interface User
{
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: 'PATIENT' | 'PACIENTE' | 'DOCTOR' | 'NURSE' | 'ADMIN' | 'RECEPTIONIST';
}

export interface Session
{
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

interface AuthState
{
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User | null, session: Session | null) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (user, session) =>
    set({
      user,
      session,
      isAuthenticated: !!user,
      isLoading: false,
    }),
  clearAuth: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
