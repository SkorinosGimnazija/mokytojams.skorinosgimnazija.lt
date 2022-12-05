import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchForm } from '../../../components/forms/SearchForm';
import { AppointmentsFullList } from '../../../components/lists/AppointmentsFullList';
import { useGetAllAppointmentsQuery } from '../../../services/api';

export default function ViewAllAppointments() {
  const [search, setSearch] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const appointmentsQuery = useGetAllAppointmentsQuery({
    items: pageSize,
    page: pageNumber,
    query: search,
  });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Button component={Link} to="types" variant="contained">
          Nustatymai
        </Button>
        <SearchForm
          onChange={(e) => {
            setPageNumber(0);
            setSearch(e);
          }}
        />
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
