import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

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
