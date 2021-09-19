import Container from '@mui/material/Container';
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Chip, ListItemButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavigationButton } from './NavigationButton';
import { routes } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';

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
