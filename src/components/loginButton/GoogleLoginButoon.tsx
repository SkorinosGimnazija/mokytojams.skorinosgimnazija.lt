import { Button } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';
import GoogleIcon from '../../assets/icons/google.svg';

export const GoogleLoginButoon = () => {
  const location = useLocation<{ returnUrl: string }>();

  const loginUrl = `${process.env.REACT_APP_API_URL}/auth/login-google`;
  const returnUrl = encodeURIComponent(location.state?.returnUrl ?? window.location.href);

  return (
    <Button
      startIcon={<img src={GoogleIcon} />}
      href={`${loginUrl}?returnUrl=${returnUrl}`}
      variant="outlined"
    >
      Prisijungti
    </Button>
  );
};
