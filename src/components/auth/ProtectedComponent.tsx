import { useAuth } from '@/hooks/useAuth'
import type { AuthRole } from '@/store/authSlice'
import React from 'react'

interface Props {
  authRole: AuthRole;
  children: React.ReactNode;
}

export function ProtectedComponent({ authRole, children }: Props) {
  const auth = useAuth()

  if (!auth.roles.has(authRole)) {
    return null
  }

  return <>{children}</>
}