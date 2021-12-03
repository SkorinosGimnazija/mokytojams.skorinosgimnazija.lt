import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { AuthRole } from '../../store/authSlice';

interface Props {
  authRole: AuthRole;
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<Props> = ({ authRole, children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuthenticated || !auth.hasRole(authRole)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
