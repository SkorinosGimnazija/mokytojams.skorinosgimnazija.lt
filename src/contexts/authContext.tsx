import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthorizeMutation } from '../services/api';
import {
  AuthRole,
  resetAuthState,
  selectDisplayName,
  selectEmail,
  selectIsAuthenticated,
  selectUserId,
  selectUserRoles,
  selectUserToken,
} from '../store/authSlice';

interface Context {
  logIn: (credential: string, callback?: VoidFunction) => void;
  logOut: (callback?: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: number | null;
  displayName: string | null;
  email: string | null;
  roles: AuthRole[] | null;
}

export const AuthContext = React.createContext<Context>({} as Context);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const displayName = useAppSelector(selectDisplayName);
  const email = useAppSelector(selectEmail);
  const roles = useAppSelector(selectUserRoles);
  const token = useAppSelector(selectUserToken);
  const userId = useAppSelector(selectUserId);

  const [authorize, authStatus] = useAuthorizeMutation();

  React.useEffect(() => {
    if (token) {
      try {
        const payload = jwtDecode(token);
        if (Date.now() >= payload.exp! * 1000) {
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
        userId,
        displayName,
        roles,
        email,
        isAuthenticated,
        isLoading: authStatus.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
