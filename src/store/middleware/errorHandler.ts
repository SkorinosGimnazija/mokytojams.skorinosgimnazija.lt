import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { ProblemDetails } from '../../services/generatedApi';
import { resetAuthState } from '../authSlice';

export const rtkQueryErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status === 401) {
      api.dispatch(resetAuthState());
    }

    const errorData = action?.payload?.data;
    if (errorData) {
      if (errorData.title) {
        toast.error(errorData.title);
      }

      const errors = errorData.errors;
      if (errors) {
        for (const key in errors) {
          toast.error(`${key}: ${errors[key].join(', ')}`);
        }
      }
    } else {
      toast.error('Klaida!');
    }
  }

  return next(action);
};
