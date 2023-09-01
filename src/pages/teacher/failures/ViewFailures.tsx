import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, addYears, format } from 'date-fns';
import React, { useState } from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { TechJournalReportsList } from '../../../components/lists/TechJournalReportsList';
import { useGetTechJournalReportsQuery } from '../../../services/api';

export default function ViewFailures() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [year, setYear] = useState(addMonths(new Date(), -8));
  const dateRange = {
    start: format(year, 'yyyy-09-01'),
    end: format(addYears(year, 1), 'yyyy-08-31'),
  };
  const techQuery = useGetTechJournalReportsQuery({
    items: pageSize,
    page: pageNumber,
    ...dateRange,
  });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
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
        <TechJournalReportsList
          data={techQuery.data?.items}
          totalCount={techQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={techQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
