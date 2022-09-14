import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, MonthPicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, format, getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { EventsList } from '../../../components/lists/EventsList';
import { useGetEventsByDateQuery } from '../../../services/api';

export default function ViewEvents() {
  const [date, setDate] = useState(new Date());
  const dateRange = {
    start: format(date, 'yyyy-MM-01'),
    end: format(date, `yyyy-MM-${getDaysInMonth(date)}`),
  };
  const eventsQuery = useGetEventsByDateQuery(dateRange);

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MonthPicker
            date={date}
            minDate={addMonths(new Date(), -1)}
            maxDate={addMonths(new Date(), 1)}
            onChange={(x) => setDate(x)}
            sx={{ 'button:disabled': { display: 'none' } }}
          />
        </LocalizationProvider>
      </Stack>
      <Box mt={4}>
        <EventsList eventsData={eventsQuery.data} isLoading={eventsQuery.isFetching} />
      </Box>
    </Box>
  );
}
