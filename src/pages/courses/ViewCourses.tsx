import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CreateItemLink } from '../../components/links/CreateItemLink';
import { CoursesList } from '../../components/lists/CoursesList';
import { useGetMyCoursesQuery } from '../../services/api';

export default function ViewCourses() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const courseQuery = useGetMyCoursesQuery({ items: pageSize, page: pageNumber });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemLink to="create" />
      </Stack>
      <Box mt={4}>
        <CoursesList
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
