import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { AppointmentTypesList } from '../../../components/lists/AppointmentTypesList';
import { useGetAppointmentTypesQuery } from '../../../services/api';

export default function ViewAllAppointmentTypes() {
  const typesQuery = useGetAppointmentTypesQuery();

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <AppointmentTypesList data={typesQuery.data} isLoading={typesQuery.isFetching} />
      </Box>
    </Box>
  );
}
