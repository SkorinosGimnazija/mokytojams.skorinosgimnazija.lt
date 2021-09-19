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

    console.log('GGWP', userQuery.error);
  }, [userQuery.isError, userQuery.error]);

  return {
    isLoading: userQuery.isLoading || userQuery.isFetching || userQuery.isError,
    isAuthenticated: isAuthenticated,
    userName: userName,
    hasRole: (role: AuthRole) => roles.includes(role),
  };
};
