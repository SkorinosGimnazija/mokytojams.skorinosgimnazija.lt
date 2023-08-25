import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addYears, format } from 'date-fns';
import { useState } from 'react';
import { useGetClassroomsQuery } from '../../../../services/api';
import { ClassroomList } from '../../../../components/lists/ClassroomList';
import { CreateItemButton } from '../../../../components/links/CreateItemButton';

export default function ViewClassrooms() {
  const classroomQuery = useGetClassroomsQuery();

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <ClassroomList data={classroomQuery.data} isLoading={classroomQuery.isFetching} />
      </Box>
    </Box>
  );
}
