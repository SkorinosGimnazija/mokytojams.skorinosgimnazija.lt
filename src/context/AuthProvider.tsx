import { AuthContext } from '@/context/AuthContext.tsx'
import { useAppSelector } from '@/hooks/useAppSelector.tsx'
import { useLoginMutation, useLogoutMutation } from '@/services/generatedApi.ts'
import { selectUserAuth } from '@/store/authSlice.ts'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const userAuth = useAppSelector(selectUserAuth)
  const [loginMutation, loginStatus] = useLoginMutation()
  const [logoutMutation, logoutStatus] = useLogoutMutation()

  return (
    <AuthContext
      value={{
        login: loginMutation,
        logout: logoutMutation,
        userId: userAuth.id,
        name: userAuth.name,
        email: userAuth.email,
        roles: new Set(userAuth.roles),
        isAuthenticated: !!userAuth.id,
        isLoading: loginStatus.isLoading || logoutStatus.isLoading,
      }}
    >
      {children}
    </AuthContext>
  )
}