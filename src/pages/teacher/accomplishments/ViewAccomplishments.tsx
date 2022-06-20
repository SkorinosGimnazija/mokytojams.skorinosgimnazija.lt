import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { AccomplishmentsList } from '../../../components/lists/AccomplishmentsList';
import { useGetMyAccomplishmentsQuery } from '../../../services/api';

export default function ViewAccomplishments() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const accomplishmentsQuery = useGetMyAccomplishmentsQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <AccomplishmentsList
          data={accomplishmentsQuery.data?.items}
          totalCount={accomplishmentsQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={accomplishmentsQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
