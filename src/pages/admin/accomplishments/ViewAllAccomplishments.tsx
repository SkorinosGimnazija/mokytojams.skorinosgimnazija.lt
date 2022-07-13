import { FormControlLabel, Stack, Switch } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearPicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addYears, format } from 'date-fns';
import { useState } from 'react';
import { AccomplishmentsList } from '../../../components/lists/AccomplishmentsList';
import { useGetAccomplishmentsByDateQuery } from '../../../services/api';

export default function ViewAllAccomplishments() {
  const [academicYear, setAcademicYear] = useState(false);
  const [year, setYear] = useState(addDays(new Date(), -31));
  const dateRange = {
    start: format(year, academicYear ? 'yyyy-09-01' : 'yyyy-01-01'),
    end: format(academicYear ? addYears(year, 1) : year, academicYear ? 'yyyy-08-31' : 'yyyy-12-31'),
  };
  const accomplishmentsQuery = useGetAccomplishmentsByDateQuery(dateRange);

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <YearPicker
            date={year}
            minDate={addYears(new Date(), -2)}
            maxDate={new Date()}
            onChange={(x) => setYear(x)}
          />
        </LocalizationProvider>
        <FormControlLabel
          label="Mokslo metai"
          control={<Switch checked={academicYear} onChange={(e) => setAcademicYear(e.target.checked)} />}
        />
      </Stack>
      <Box mt={4}>
        <AccomplishmentsList
          data={accomplishmentsQuery.data}
          isLoading={accomplishmentsQuery.isFetching}
          adminView
        />
      </Box>
    </Box>
  );
}
