import { useRouter } from 'next/router';
import React from 'react';
import { Header } from '../components/header/Header';
import { SideNavigation } from '../components/navigation/SideNavigation';
import { useAuth } from '../context/authContext';

export const PersistentLayout: React.FC = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return null;
  }

  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="flex flex-row h-full max-h-[calc(theme(height.screen)-theme(spacing.header))]">
          <SideNavigation />
          <main className="w-full p-4 overflow-y-scroll bg-secondary">{children}</main>
        </div>
      </div>
    </>
  );
};
