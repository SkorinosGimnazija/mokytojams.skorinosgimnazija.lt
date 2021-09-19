import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../services/generated.api';
import drawerReducer from '../components/drawer/drawerSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
