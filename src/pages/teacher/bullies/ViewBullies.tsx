import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { BullyJournalReportsList } from '../../../components/lists/BullyJournalReportsList';
import { useGetBullyJournalReportsQuery } from '../../../services/api';

export default function ViewBullies() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const bulliesQuery = useGetBullyJournalReportsQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <BullyJournalReportsList
          data={bulliesQuery.data?.items}
          totalCount={bulliesQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={bulliesQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
