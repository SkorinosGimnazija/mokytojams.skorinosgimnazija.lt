import React from 'react';

interface Props {
  isSuccess: boolean;
  isError: boolean;
}

export const useNotification = ({ isError, isSuccess }: Props) => {
  React.useEffect(() => {
    if (!isError) {
      return;
    }

    console.log('ERROR');
  }, [isError]);

  React.useEffect(() => {
    if (!isSuccess) {
      return;
    }

    console.log('SUCCESS');
  }, [isSuccess]);
};
