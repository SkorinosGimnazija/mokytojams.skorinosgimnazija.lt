import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavigationList } from '../navigation/NavigationList';

export const DesktopDrawer = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
      }}
      open
    >
      <NavigationList />
    </Drawer>
  );
};
