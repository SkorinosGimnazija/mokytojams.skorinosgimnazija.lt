import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { api } from '../services/generated.api';

export type AuthRole = 'Admin' | 'Mod' | 'Teacher' | 'Bully';

interface State {
  userName: string | null;
  roles: AuthRole[];
  isAuthenticated: boolean;
}

const initialState: State = {
  userName: null,
  roles: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getUser.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.userName = action.payload.userName;
          state.roles = action.payload.roles as AuthRole[];
          state.isAuthenticated = true;
        }
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, () => initialState);
  },
});

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserRoles = (state: RootState) => state.auth.roles;

export default authSlice.reducer;
