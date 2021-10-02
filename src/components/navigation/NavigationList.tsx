import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
        .filter((x) => auth.hasRole(x.accessRole))
        .map((group) => {
          return (
            <React.Fragment key={group.name}>
              <List>
                <ListItem>
                  <ListItemText primary={group.name} />
                </ListItem>
                {group.routes.map((route) => {
                  return <NavigationButton key={route.slug} name={route.name} slug={route.slug} />;
                })}
              </List>
              <Divider />
            </React.Fragment>
          );
        })}
    </>
  );
};
