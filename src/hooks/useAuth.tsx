import React from 'react';
import { useGetUserQuery } from '../services/generated.api';
import {
  AuthRole,
  selectIsAuthenticated,
  selectUserName,
  selectUserRoles,
} from '../store/authSlice';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const userQuery = useGetUserQuery();
  const userName = useAppSelector(selectUserName);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const roles = useAppSelector(selectUserRoles);

  React.useEffect(() => {
    if (!userQuery.isError) {
      return;
    }

    console.error(userQuery.error);
  }, [userQuery.isError, userQuery.error]);

  return {
    userName,
    isAuthenticated,
    isLoading: userQuery.isLoading || userQuery.isError,
    hasRole: (role: AuthRole) => roles.includes(role),
  };
};
