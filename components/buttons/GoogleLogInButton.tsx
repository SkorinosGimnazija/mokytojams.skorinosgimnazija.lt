import React from 'react';
import { useAuth } from '../../context/authContext';
import GoogleLogo from './google.svg';

export const GoogleLogInButton = () => {
  const auth = useAuth();

  return (
    <button
      onClick={() => auth.logIn()}
      className="inline-flex items-center gap-2 py-2 pl-2 pr-5 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent hover:bg-blue-50"
    >
      <img src={GoogleLogo.src} width={40} alt="Google" />
      <span>Prisijungti</span>
    </button>
  );
};
