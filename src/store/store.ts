import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../services/generated.api';
import drawerSlice from '../components/drawer/drawerSlice';
import authSlice from './authSlice';
import postsSlice from './postsSlice';
import { rtkQueryErrorLogger } from './middleware/errorLogger';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    auth: authSlice,
    posts: postsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
