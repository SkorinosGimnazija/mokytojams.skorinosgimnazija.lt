import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';

interface Props {
  disabled: boolean;
}

export const SaveButton: React.FC<Props> = ({ disabled }) => {
  return (
    <LoadingButton loading={disabled} variant="contained" type="submit">
      Išsaugoti
    </LoadingButton>
  );
};
