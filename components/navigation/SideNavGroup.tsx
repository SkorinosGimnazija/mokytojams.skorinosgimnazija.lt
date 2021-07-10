import React from 'react';
import { useAuth } from '../../context/authContext';
import { Role } from '../../models/auth/User';

interface Props {
  title: string;
  role: Role;
}

export const SideNavGroup: React.FC<Props> = ({ children, title, role }) => {
  const auth = useAuth();

  if (!auth.user!.is(role)) {
    return null;
  }

  return (
    <div className="pb-4">
      <div className="pb-1 text-sm tracking-wider text-gray-300 uppercase">- {title}</div>
      {children}
    </div>
  );
};
