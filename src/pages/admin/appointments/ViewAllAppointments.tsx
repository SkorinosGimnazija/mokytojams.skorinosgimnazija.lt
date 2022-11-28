import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppointmentsFullList } from '../../../components/lists/AppointmentsFullList';
import { useGetAllAppointmentsQuery } from '../../../services/api';

export default function ViewAllAppointments() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const appointmentsQuery = useGetAllAppointmentsQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Button component={Link} to="types" variant="contained">
          Nustatymai
        </Button>
      </Stack>
      <Box mt={4}>
        <AppointmentsFullList
          data={appointmentsQuery.data?.items}
          totalCount={appointmentsQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={appointmentsQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
