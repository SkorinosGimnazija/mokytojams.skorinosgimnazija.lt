import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ViewAppointments() {
  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Button component={Link} to="create" variant="contained">
          Registracija
        </Button>
      </Stack>
      <Box mt={4}></Box>
    </Box>
  );
}
