import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { resetAuthState } from '../authSlice';

export const rtkQueryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status === 401) {
      api.dispatch(resetAuthState());
    }

    toast.error('Klaida!');
  }

  return next(action);
};
