import { Box } from '@mui/system';
import React from 'react';
import { CircularSpinner } from '../components/loadingSpinners/CircularSpinner';
import { GoogleLoginButton } from '../components/loginButton/GoogleLoginButton';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const auth = useAuth();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {auth.isLoading && <CircularSpinner />}
      {!auth.isLoading && !auth.isAuthenticated && <GoogleLoginButton />}
    </Box>
  );
};
