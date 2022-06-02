import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { errorToast } from '../../lib/toasts';
import { resetAuthState } from '../authSlice';

export const rtkQueryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // if (action?.payload?.status === 401) {
    //   api.dispatch(resetAuthState());
    // }

    const errorData = action?.payload?.data;
    if (errorData) {
      const errors = errorData.errors;
      if (errors) {
        for (const key in errors) {
          errorToast(`${key}: ${errors[key].join(', ')}`);
        }
      } else if (errorData.title) {
        errorToast(errorData.title);
      }
    } else {
      errorToast();
    }
  }

  return next(action);
};
