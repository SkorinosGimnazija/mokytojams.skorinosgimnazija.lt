import { YearPicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Checkbox, FormControlLabel, Stack, Switch } from '@mui/material';
import { Box } from '@mui/system';
import { addDays, addYears, format } from 'date-fns';
import React, { useState } from 'react';
import { CourseStatsList } from '../../../components/lists/CourseStatsList';
import {
  useGetTeacherCoursesByIdAndDateQuery,
  useGetCoursesStatsByDateQuery,
} from '../../../services/api';

export default function ViewAllCourses() {
  const [year, setYear] = useState(addDays(new Date(), -31));

  const dateRange = {
    start: format(year, 'yyyy-01-01'),
    end: format(year, 'yyyy-12-31'),
  };

  const courseQuery = useGetCoursesStatsByDateQuery(dateRange);

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
        <CourseStatsList
          coursesData={courseQuery.data}
          dateRange={dateRange}
          isLoading={courseQuery.isFetching}
        />
      </Box>
    </Box>
  );
}
