import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { TechJournalReportsList } from '../../../components/lists/TechJournalReportsList';
import { useGetTechJournalReportsQuery } from '../../../services/api';

export default function ViewFailures() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const techQuery = useGetTechJournalReportsQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
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
