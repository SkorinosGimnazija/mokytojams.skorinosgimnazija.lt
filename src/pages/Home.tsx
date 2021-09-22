import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { GoogleLoginButoon } from '../components/loginButton/GoogleLoginButoon';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const auth = useAuth();

  const Success = () => {
    return <Typography marginTop={2}>Sėkmingai prisijungėte</Typography>;
  };

  const LogIn = () => {
    return (
      <>
        <GoogleLoginButoon />
        <Typography marginTop={2}>tik @skorinosgimnazija.lt</Typography>
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {auth.isAuthenticated ? <Success /> : <LogIn />}
    </Box>
  );
};
