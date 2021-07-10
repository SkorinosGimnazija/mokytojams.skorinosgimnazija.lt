import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { httpClient } from '../lib/httpClient';
import { error } from '../lib/notifications';
import { Role, User, UserData } from '../models/auth/User';

interface Context {
  user?: User;
  isLoading: boolean;
  logIn: () => void;
  logOut: () => void;
}

const AuthContext = React.createContext<Context>({} as Context);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await httpClient.get<UserData>('/auth/user', { timeout: 3000 });

        if (data) {
          setUser(new User(data));
        }
      } catch (e) {
        error('Prisijungimo klaida', e);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const logIn = () => {
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      query: { returnUrl: encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}${router.pathname}`) },
    });
  };

  const logOut = async () => {
    httpClient.post('/auth/logout');
    setUser(undefined);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        logOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (role?: Role) => {
  const context = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (context.isLoading || !role) {
      return;
    }

    if (context.user?.is(role) !== true) {
      router.replace('/');
    }
  }, [context, router, role]);

  return context;
};
