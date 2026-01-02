import type { generatedApi } from '@/services/generatedApi.ts'
import type { AuthRole } from '@/store/authSlice'
import React from 'react'

interface Context {
  login: ReturnType<typeof generatedApi.endpoints.login.useMutation>[0];
  logout: ReturnType<typeof generatedApi.endpoints.logout.useMutation>[0];
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: number;
  name: string;
  email: string;
  roles: Set<AuthRole>;
}

export const AuthContext = React.createContext<Context>({} as Context)