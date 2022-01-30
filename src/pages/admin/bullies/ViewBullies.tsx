import { Box } from '@mui/system';
import React from 'react';
import { BullyReportsList } from '../../../components/lists/BullyReportsList';
import { useGetBullyReportsQuery } from '../../../services/api';

export default function ViewBullyReports() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const courseQuery = useGetBullyReportsQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Box mt={4}>
        <BullyReportsList
          data={courseQuery.data?.items}
          totalCount={courseQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={courseQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
