import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { GoogleLogInButton } from '../components/buttons/GoogleLogInButton';

const Home: React.FC = () => {
  const auth = useAuth();

  const Success: React.FC = () => {
    return <span className="text-lg">Sėkmingai prisijungėte!</span>;
  };

  const LogIn: React.FC = () => {
    return (
      <>
        <GoogleLogInButton />
        <span>tik @skorinosgimnazija.lt</span>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {auth.user ? <Success /> : <LogIn />}
    </div>
  );
};

export default Home;
