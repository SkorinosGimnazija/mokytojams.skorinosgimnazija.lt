import { ListSubheader } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { routes } from '../../routes/routes';
import { NavigationButton } from './NavigationButton';

export const NavigationList = () => {
  const auth = useAuth();

  return (
    <>
      <Toolbar />
      <Divider />
      {routes
        .filter((x) => auth.hasAnyRole(x.routes.map((z) => z.accessRole)))
        .map((group) => {
          return (
            <React.Fragment key={group.name}>
              <List
                disablePadding
                dense
                subheader={
                  <ListSubheader disableSticky color="inherit">
                    {group.name}
                  </ListSubheader>
                }
              >
                {group.routes
                  .filter((x) => auth.hasRole(x.accessRole))
                  .map((route) => {
                    return <NavigationButton key={route.path} name={route.name} slug={route.path} />;
                  })}
                {group.name === 'Mokytojams' && (
                  <NavigationButton
                    name="UTA bankas"
                    slug={`https://drive.google.com/drive/u/${auth.email}/folders/0ANgMsvl4XlSlUk9PVA`}
                  />
                )}
              </List>
            </React.Fragment>
          );
        })}
    </>
  );
};
