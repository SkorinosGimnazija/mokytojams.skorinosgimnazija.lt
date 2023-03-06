import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addYears, format } from 'date-fns';
import { useState } from 'react';
import { CourseStatsList } from '../../../components/lists/CourseStatsList';
import { useGetCoursesStatsByDateQuery } from '../../../services/api';

export default function ViewAllCourses() {
  const [year, setYear] = useState(addDays(new Date(), -31));
  const dateRange = { start: format(year, 'yyyy-01-01'), end: format(year, 'yyyy-12-31') };
  const courseQuery = useGetCoursesStatsByDateQuery(dateRange);

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <YearCalendar
            value={year}
            minDate={addYears(new Date(), -2)}
            maxDate={new Date()}
            onChange={(x) => setYear(x)}
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
