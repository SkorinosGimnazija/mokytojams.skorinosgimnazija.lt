import { generatedApi } from '@/services/generatedApi.ts'
import type { RootState } from '@/store/store.ts'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthRole = 'Admin' | 'Manager' | 'Teacher' | 'Social' | 'Tech';

interface State {
  id: number;
  name: string;
  email: string;
  token: string;
  roles: AuthRole[];
}

const initialState: State = {
  id: 0,
  name: '',
  email: '',
  token: '',
  roles: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: () => {
      return initialState
    },
    setAuthState: (state, auth: PayloadAction<State>) => {
      return auth.payload
    },
    setRoles: (state, roles: PayloadAction<AuthRole[]>) => {
      state.roles = roles.payload
    },
    setId: (state, id: PayloadAction<number>) => {
      state.id = id.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(generatedApi.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload) {
          return action.payload as State
        }

        return state
      })
      .addMatcher(generatedApi.endpoints.logout.matchFulfilled, () => {
        return initialState
      })
  },
})

export const { resetAuthState, setAuthState, setRoles, setId } = authSlice.actions

export const selectUserAuth = (state: RootState) => state.auth