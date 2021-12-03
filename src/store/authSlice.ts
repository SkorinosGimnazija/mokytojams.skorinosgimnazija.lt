import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { RootState } from './store';

export type AuthRole = 'Admin' | 'Mod' | 'Teacher' | 'Bully';

interface State {
  userName: string | null;
  token: string | null;
  roles: AuthRole[];
  isAuthenticated: boolean;
}

const initialState: State = {
  userName: null,
  roles: [],
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.authorize.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.userName = action.payload.displayName;
        state.roles = action.payload.roles as AuthRole[];
        state.isAuthenticated = true;
      }
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserRoles = (state: RootState) => state.auth.roles;
export const selectUserToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
