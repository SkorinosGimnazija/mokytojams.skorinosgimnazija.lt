import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/generated.api';
import { RootState } from '../../store/store';

export interface DrawerState {
  isHidden: boolean;
}

const initialState: DrawerState = {
  isHidden: true,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isHidden = !state.isHidden;
    },
    showDrawer: (state) => {
      state.isHidden = false;
    },
    hideDrawer: (state) => {
      state.isHidden = true;
    },
  },
});

export const { toggleDrawer, showDrawer, hideDrawer } = drawerSlice.actions;

export const selectIsDrawerHidden = (state: RootState) => state.drawer.isHidden;

export default drawerSlice.reducer;
