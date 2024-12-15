import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthRole } from '../../store/authSlice';

interface Props {
  authRole: AuthRole;
  children: JSX.Element | JSX.Element[];
}

export const ProtectedComponent: React.FC<Props> = ({ authRole, children }) => {
  const auth = useAuth();

  if (!auth.isAuthenticated || !auth.hasRole(authRole)) {
    return null;
  }

  return <>{children}</>;
};
