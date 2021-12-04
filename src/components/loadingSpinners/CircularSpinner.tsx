import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const CircularSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        overflow: 'hidden',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
