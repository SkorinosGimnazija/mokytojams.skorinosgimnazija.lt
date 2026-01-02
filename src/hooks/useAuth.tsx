import { AuthContext } from '@/context/AuthContext.tsx'
import { useContext } from 'react'

export function useAuth() {
  return useContext(AuthContext)
}