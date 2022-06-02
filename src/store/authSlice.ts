import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { RootState } from './store';

export type AuthRole = 'Admin' | 'Manager' | 'Teacher' | 'Bully';

interface State {
  displayName: string | null;
  email: string | null;
  token: string | null;
  roles: AuthRole[];
  isAuthenticated: boolean;
}

const initialState: State = {
  displayName: null,
  email: null,
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
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.roles = action.payload.roles as AuthRole[];
        state.isAuthenticated = true;
      }
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectDisplayName = (state: RootState) => state.auth.displayName;
export const selectUserRoles = (state: RootState) => state.auth.roles;
export const selectUserToken = (state: RootState) => state.auth.token;
export const selectEmail = (state: RootState) => state.auth.email;

export default authSlice.reducer;
