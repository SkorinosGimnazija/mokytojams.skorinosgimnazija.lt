import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { NavigationList } from '../navigation/NavigationList';
import { hideDrawer, selectIsDrawerHidden } from './drawerSlice';

export const MobileDrawer = () => {
  const isHidden = useAppSelector(selectIsDrawerHidden);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      variant="temporary"
      open={!isHidden}
      onClose={() => dispatch(hideDrawer())}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
      }}
    >
      <NavigationList />
    </Drawer>
  );
};
