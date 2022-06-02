import { Box } from '@mui/system';
import React from 'react';
import { AppointmentsList } from '../../../components/lists/AppointmentsList';
import { useGetMyAppointmentsQuery } from '../../../services/api';

export default function ViewMyAppointments() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const appointmentsQuery = useGetMyAppointmentsQuery({
    items: pageSize,
    page: pageNumber,
    typeSlug: 'yearly',
  });

  return (
    <Box>
      <Box mt={4}>
        <AppointmentsList
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
