import { YearPicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { addDays, addYears, format } from 'date-fns';
import React, { useState } from 'react';
import { CoursesAdminList } from '../../../components/lists/CoursesAdminList';
import { useGetAllCoursesByDateQuery, useGetPublicTeachersQuery } from '../../../services/api';

export default function ViewAllCourses() {
  const [year, setYear] = useState(addDays(new Date(), -30));
  const teachersQuery = useGetPublicTeachersQuery();
  const courseQuery = useGetAllCoursesByDateQuery({
    start: format(year, 'yyyy-01-01'),
    end: format(year, 'yyyy-12-31'),
  });

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
        <CoursesAdminList
          teachersData={teachersQuery.data}
          coursesData={courseQuery.data}
          isLoading={courseQuery.isFetching || teachersQuery.isFetching}
        />
      </Box>
    </Box>
  );
}
