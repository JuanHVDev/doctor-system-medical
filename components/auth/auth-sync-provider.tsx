'use client';

import { useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { useAuthStore, User, Session } from '@/store/auth-store';

export function AuthSyncProvider({ children }: { children: React.ReactNode })
{
  const { data: session, isPending } = useSession();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() =>
  {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() =>
  {
    if (session)
    {
      setAuth(session.user as unknown as User, session.session as unknown as Session);
    } else if (!isPending)
    {
      clearAuth();
    }
  }, [session, isPending, setAuth, clearAuth]);

  return <>{children}</>;
}
