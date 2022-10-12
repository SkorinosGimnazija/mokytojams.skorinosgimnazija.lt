import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { AuthRole } from '../store/authSlice';

export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    ...context,
    isAdmin: context.roles?.includes('Admin'),
    hasRole: (role: AuthRole) => context.roles?.includes(role),
    hasAnyRole: (roles: AuthRole[]) => roles.some((x) => context.roles?.includes(x)),
  };
};
