import { LoginButton } from '@/components/auth/LoginButton.tsx'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Outlet } from 'react-router'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginButton/>
  }

  return <Outlet/>
}