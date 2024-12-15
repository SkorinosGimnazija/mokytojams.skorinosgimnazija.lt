import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { itemSavedToast } from '../lib/toasts';

export const useResponse = () => {
  const navigate = useNavigate();

  const redirectOnSuccess = (
    response: { data: unknown } | { error: FetchBaseQueryError | SerializedError }
  ): void => {
    if ('data' in response) {
      itemSavedToast();
      navigate('..', { relative: 'path' });
    }
  };

  return { redirectOnSuccess };
};
