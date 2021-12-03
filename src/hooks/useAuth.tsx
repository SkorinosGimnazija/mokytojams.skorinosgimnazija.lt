import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { AuthRole } from '../store/authSlice';

export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    ...context,
    hasRole: (role: AuthRole) => context.roles?.includes(role),
  };
};
