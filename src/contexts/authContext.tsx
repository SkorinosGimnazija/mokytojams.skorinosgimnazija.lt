import jwtDecode from 'jwt-decode';
import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthorizeMutation } from '../services/api';
import {
  AuthRole,
  resetAuthState,
  selectIsAuthenticated,
  selectDisplayName,
  selectUserRoles,
  selectUserToken,
} from '../store/authSlice';

interface Context {
  logIn: (credential: string, callback?: VoidFunction) => void;
  logOut: (callback?: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  displayName: string | null;
  roles: AuthRole[] | null;
}

export const AuthContext = React.createContext<Context>({} as Context);

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const displayName = useAppSelector(selectDisplayName);
  const roles = useAppSelector(selectUserRoles);
  const token = useAppSelector(selectUserToken);

  const [authorize, authStatus] = useAuthorizeMutation();

  React.useEffect(() => {
    if (token) {
      try {
        const payload = jwtDecode<{ exp: number }>(token);
        if (Date.now() >= payload.exp * 1000) {
          dispatch(resetAuthState());
        }
      } catch {
        dispatch(resetAuthState());
      }
    }
  }, [token, dispatch]);

  const logIn = (credential: string, callback?: VoidFunction) => {
    authorize({ googleAuthDto: { token: credential } }).then(() => {
      callback?.();
    });
  };

  const logOut = (callback?: VoidFunction) => {
    window.google.accounts.id.disableAutoSelect();
    dispatch(resetAuthState());
    callback?.();
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        displayName,
        roles,
        isAuthenticated,
        isLoading: authStatus.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
