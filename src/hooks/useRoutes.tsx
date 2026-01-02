import { useAuth } from '@/hooks/useAuth.tsx'
import { routes } from '@/routes.ts'
import { useMemo } from 'react'

export function useRoutes() {
  const auth = useAuth()

  const authorizedRoutes = useMemo(() => {
    return routes
      .map(group => ({
        ...group,
        routes: group.children.filter(route => route.accessRole.some(role => auth.roles.has(role)))
      }))
      .filter(group => group.routes.length > 0)
  }, [auth.roles])

  return { authorizedRoutes }
}