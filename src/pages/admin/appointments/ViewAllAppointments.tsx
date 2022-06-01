import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function ViewAllAppointments() {
  const auth = useAuth();

  return (
    <Box>
      {auth.hasRole('Admin') && (
        <Stack direction="row" gap={4}>
          <Button component={Link} to="types" variant="contained">
            Nustatymai
          </Button>
        </Stack>
      )}
      <Box mt={4}>LIST TODO</Box>
    </Box>
  );
}
