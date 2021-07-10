import React from 'react';
import { useAuth } from '../../context/authContext';
import { SideNavGroup } from './SideNavGroup';
import { SideNavLink } from './SideNavLink';

export const SideNavigation = () => {
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <aside className="overflow-y-auto text-base text-white bg-primary w-72 direction-reverse">
      <div className="direction-normal">
        <nav className="flex flex-col pl-3 space-y-2">
          <SideNavGroup title="skorinosgimnazija" role="Admin">
            <SideNavLink href="/index2" activeHref="/index2">
              Test
            </SideNavLink>
          </SideNavGroup>
        </nav>
      </div>
    </aside>
  );
};
