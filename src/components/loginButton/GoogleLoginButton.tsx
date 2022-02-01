import { CredentialResponse } from 'google-one-tap';
import React from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { useAuth } from '../../hooks/useAuth';

export const GoogleLoginButton = () => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCredentialResponse = (response: CredentialResponse) => {
    auth.logIn(response.credential, () => {
      const locationState = location.state as { from?: Location } | null;
      const returnPath = locationState?.from?.pathname ?? '/';

      navigate(returnPath, { replace: true });
    });
  };

  useMount(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      cancel_on_tap_outside: false,
      auto_select: true,
    });
    window.google.accounts.id.renderButton(buttonRef.current!, {
      theme: 'outline',
      size: 'large',
      locale: 'lt',
    });
    window.google.accounts.id.prompt();
  });

  return <div ref={buttonRef} />;
};
