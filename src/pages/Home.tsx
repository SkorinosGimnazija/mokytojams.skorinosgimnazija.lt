import { Box } from '@mui/system';
import React from 'react';
import { CircularSpinner } from '../components/loadingSpinners/CircularSpinner';
import { GoogleLoginButoon } from '../components/loginButton/GoogleLoginButoon';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const auth = useAuth();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {auth.isLoading && <CircularSpinner />}
      {!auth.isLoading && !auth.isAuthenticated && <GoogleLoginButoon />}
    </Box>
  );
};
