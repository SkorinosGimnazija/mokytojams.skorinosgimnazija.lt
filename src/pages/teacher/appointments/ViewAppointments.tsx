import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import React, { useEffect, useState, useRef } from 'react';

export default function ViewAppointments() {
  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}></Box>
    </Box>
  );
}
