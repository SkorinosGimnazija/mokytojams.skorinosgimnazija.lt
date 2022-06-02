import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { errorToast } from '../../lib/toasts';
import { resetAuthState } from '../authSlice';

export const rtkQueryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // if (action?.payload?.status === 401) {
    //   api.dispatch(resetAuthState());
    // }

    errorToast();

    const errors = action?.payload?.data?.errors;
    if (errors) {
      for (const key in errors) {
        errorToast(errors[key].join(', '));
      }
    }
  }

  return next(action);
};
