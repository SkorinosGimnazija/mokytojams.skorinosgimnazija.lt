import { YearPicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { addDays, addYears, format } from 'date-fns';
import React, { useState } from 'react';
import { AccomplishmentsList } from '../../../components/lists/AccomplishmentsList';
import { CourseStatsList } from '../../../components/lists/CourseStatsList';
import { useGetAccomplishmentsByDateQuery, useGetCoursesStatsByDateQuery } from '../../../services/api';

export default function ViewAllAccomplishments() {
  const [year, setYear] = useState(addDays(new Date(), -31));
  const dateRange = { start: format(year, 'yyyy-01-01'), end: format(year, 'yyyy-12-31') };
  const accomplishmentsQuery = useGetAccomplishmentsByDateQuery(dateRange);

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <YearPicker
            date={year}
            minDate={addYears(new Date(), -2)}
            maxDate={new Date()}
            onChange={(x) => setYear(x!)}
            isDateDisabled={() => false}
          />
        </LocalizationProvider>
      </Stack>
      <Box mt={4}>
        <AccomplishmentsList
          data={accomplishmentsQuery.data}
          isLoading={accomplishmentsQuery.isFetching}
          preview
        />
      </Box>
    </Box>
  );
}
