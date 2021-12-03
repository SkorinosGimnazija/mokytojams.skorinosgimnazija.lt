import MenuIcon from '@mui/icons-material/Menu';
import { Link, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleDrawer } from '../../store/drawerSlice';
import { UserProfile } from './UserProfile';

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack width="100%" direction="row" alignItems="center">
          <Link color="inherit" underline="none" component={RouterLink} to="/">
            <Typography
              component="span"
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            >
              P. Skorinos gimnazija
            </Typography>
          </Link>
          <Box flexGrow={1} />
          <UserProfile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
