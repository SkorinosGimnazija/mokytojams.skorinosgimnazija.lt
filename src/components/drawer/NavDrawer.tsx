import { useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import { hideDrawer, selectIsDrawerHidden } from '../../store/drawerSlice';
import { NavigationList } from '../navigation/NavigationList';

export const NavDrawer = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isHidden = useAppSelector(selectIsDrawerHidden);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <Box component="nav" sx={{ width: { sm: '240px' }, flexShrink: { sm: 0 } }}>
      <Drawer
        ModalProps={{ keepMounted: true }}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isMobile || !isHidden}
        onClose={() => isMobile && dispatch(hideDrawer())}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '240px',
            border: '0',
            backgroundColor: 'primary.light',
          },
        }}
      >
        <NavigationList />
      </Drawer>
    </Box>
  );
};
