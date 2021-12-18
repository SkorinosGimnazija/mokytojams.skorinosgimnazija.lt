import { CredentialResponse } from 'google-one-tap';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const GoogleLoginButoon = () => {
  const auth = useAuth();
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCredentialResponse = (response: CredentialResponse) => {
    auth.logIn(response.credential, () => {
      const returnPath = location.state?.from?.pathname || '/';
      navigate(returnPath, { replace: true });
    });
  };

  // todo change to react code or not...
  window.onload = function () {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      cancel_on_tap_outside: false,
      auto_select: true,
    });

    window.google.accounts.id.renderButton(buttonRef.current!, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      locale: 'lt',
    });

    window.google.accounts.id.prompt();
  };

  return <div ref={buttonRef} />;
};
