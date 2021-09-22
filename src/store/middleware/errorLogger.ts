import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error('Klaida!');
    console.error(action);
  }

  return next(action);
};
