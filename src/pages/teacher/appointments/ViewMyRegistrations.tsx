import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { RegistrationsList } from '../../../components/lists/RegistrationsList';
import { useGetMyRegistrationsQuery } from '../../../services/api';

export default function ViewMyRegistrations() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const registrationsQuery = useGetMyRegistrationsQuery({
    items: pageSize,
    page: pageNumber,
    typeSlug: 'yearly',
  });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Button component={Link} to="create" variant="contained">
          Registracija
        </Button>
      </Stack>
      <Box mt={4}>
        <RegistrationsList
          data={registrationsQuery.data?.items}
          totalCount={registrationsQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={registrationsQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
